'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import type { BotCategory, BotOutputMode, BotTestResponse, PublicBotDefinition } from '@/features/bots/lib/bot-types';
import { BotCard } from '@/features/bots/components/BotCard';
import { BotConsole } from '@/features/bots/components/BotConsole';
import { BotCategoryRail } from '@/features/bots/components/BotCategoryRail';
import { BotOutputPanel } from '@/features/bots/components/BotOutputPanel';
import { BotStateBlock } from '@/features/bots/components/BotStateBlock';
import { botScenarios, type BotScenarioPreset } from '@/features/bots/data/bot-scenarios';
import { clearBotRuns, deleteBotRun, getBotRuns, saveBotRun, type BotRunHistoryItem } from '@/features/bots/lib/bot-history';
import { getBotReadiness } from '@/features/bots/lib/bot-readiness';

type StatusFilter = 'all' | 'active' | 'draft' | 'disabled';
type SortMode = 'name' | 'category' | 'status';

interface BotLabProps {
  bots: PublicBotDefinition[];
  importStats: { importedCount: number; skippedCount: number };
  initialSelectedSlug?: string;
}

function copyText(value: string) {
  return navigator.clipboard.writeText(value);
}

function RegistryHeader({ count, total }: { count: number; total: number }) {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '10px 14px',
      borderBottom: '1px solid var(--panel-border)',
      background: 'var(--panel-inset)',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={{
          width: 7, height: 7, borderRadius: '50%',
          background: 'var(--neon-lime)',
          boxShadow: '0 0 6px var(--neon-lime)',
          display: 'inline-block',
          animation: 'pulse-dot 2s ease-in-out infinite',
        }} />
        <span className="edge-label">Bot Registry</span>
      </div>
      <span className="route-marker">{count} / {total}</span>
    </div>
  );
}

export function BotLab({ bots, importStats, initialSelectedSlug }: BotLabProps) {
  const initialSlug = useMemo(() => {
    if (!bots.length) return '';
    if (initialSelectedSlug && bots.some((bot) => bot.slug === initialSelectedSlug)) {
      return initialSelectedSlug;
    }
    return bots[0]?.slug ?? '';
  }, [bots, initialSelectedSlug]);

  const [category, setCategory] = useState<BotCategory | 'all'>('all');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
  const [outputModeFilter, setOutputModeFilter] = useState<BotOutputMode | 'all'>('all');
  const [sortMode, setSortMode] = useState<SortMode>('name');
  const [query, setQuery] = useState('');
  const [selectedSlug, setSelectedSlug] = useState(initialSlug);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<BotTestResponse | null>(null);
  const [apiError, setApiError] = useState<string>('');
  const [history, setHistory] = useState<BotRunHistoryItem[]>([]);
  const [compareSlugs, setCompareSlugs] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<'console' | 'compare' | 'history'>('console');
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setHistory(getBotRuns());
  }, []);

  const categoryCounts = useMemo(() => {
    const counts: Partial<Record<BotCategory, number>> = {};
    for (const bot of bots) {
      counts[bot.category] = (counts[bot.category] ?? 0) + 1;
    }
    return counts;
  }, [bots]);

  const filtered = useMemo(() => {
    const lowered = query.trim().toLowerCase();
    const list = bots.filter((bot) => {
      const matchesCategory = category === 'all' ? true : bot.category === category;
      const matchesStatus = statusFilter === 'all' ? true : bot.status === statusFilter;
      const matchesOutput = outputModeFilter === 'all' ? true : bot.outputMode === outputModeFilter;
      const hay = `${bot.name} ${bot.description} ${bot.tags.join(' ')} ${bot.capabilities.join(' ')}`.toLowerCase();
      const matchesQuery = lowered ? hay.includes(lowered) : true;
      return matchesCategory && matchesStatus && matchesOutput && matchesQuery;
    });

    list.sort((a, b) => {
      if (sortMode === 'name') return a.name.localeCompare(b.name);
      if (sortMode === 'category') return a.category.localeCompare(b.category);
      return a.status.localeCompare(b.status);
    });

    return list;
  }, [bots, category, statusFilter, outputModeFilter, query, sortMode]);

  const selectedBot = useMemo(() => {
    const inFiltered = filtered.find((bot) => bot.slug === selectedSlug);
    if (inFiltered) return inFiltered;
    return bots.find((bot) => bot.slug === selectedSlug) ?? filtered[0] ?? bots[0] ?? null;
  }, [bots, filtered, selectedSlug]);

  useEffect(() => {
    if (!selectedBot) return;
    setInput((current) => (current.trim().length > 0 ? current : selectedBot.starterPrompt));
  }, [selectedBot]);

  const compareBots = useMemo(
    () => compareSlugs.map((slug) => bots.find((bot) => bot.slug === slug)).filter((bot): bot is PublicBotDefinition => Boolean(bot)),
    [bots, compareSlugs]
  );

  function toggleCompare(slug: string) {
    setCompareSlugs((current) => {
      if (current.includes(slug)) return current.filter((entry) => entry !== slug);
      if (current.length >= 3) return current;
      return [...current, slug];
    });
  }

  function selectBot(slug: string) {
    setSelectedSlug(slug);
    const next = bots.find((entry) => entry.slug === slug);
    if (next) {
      setInput(next.starterPrompt);
      setResult(null);
      setApiError('');
    }
  }

  function onScenarioMatch(scenario: BotScenarioPreset) {
    setCategory(scenario.categoryHint);
    setQuery(scenario.recommendedTags[0] ?? scenario.label);
  }

  async function runBot() {
    if (!selectedBot || !input.trim()) return;
    setApiError('');
    setLoading(true);

    try {
      const res = await fetch('/api/bots/test', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ botSlug: selectedBot.slug, input }),
      });
      const json = (await res.json()) as BotTestResponse & { error?: string };

      if (!res.ok || json.ok === false) {
        setApiError(json.error || 'Bot run failed.');
        setResult(null);
        return;
      }

      setResult(json);
      saveBotRun({
        botSlug: json.botSlug,
        botName: json.botName,
        input,
        output: json.output,
        fallback: json.fallback,
        model: json.meta.model,
        category: json.meta.category,
        latencyMs: json.meta.latencyMs,
        createdAt: json.meta.timestamp,
      });
      setHistory(getBotRuns());
    } catch {
      setApiError('Network error while running bot.');
      setResult(null);
    } finally {
      setLoading(false);
    }
  }

  const outputTimestamp = result?.meta.timestamp ?? new Date().toISOString();

  return (
    <div style={{ display: 'grid', gap: 16, gridTemplateColumns: '1fr', minWidth: 0 }}>

      {/* ── Three-column lab grid ── */}
      <div style={{
        display: 'grid',
        gap: 16,
        gridTemplateColumns: '1fr',
        gridTemplateRows: 'auto',
      }}
        className="lab-grid"
      >
        <style>{`
          .lab-grid > * { min-width: 0; }
          @media (min-width: 1024px) {
            .lab-grid { grid-template-columns: 280px 1fr !important; }
          }
          @media (min-width: 1440px) {
            .lab-grid { grid-template-columns: 300px 1fr 420px !important; }
          }
        `}</style>

        {/* ── Col 1: Bot Registry ── */}
        <div style={{
          border: '1px solid var(--panel-border)',
          borderRadius: 'var(--radius-xl)',
          background: 'var(--panel-bg)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          minWidth: 0,
        }}>
          <RegistryHeader count={filtered.length} total={bots.length} />

          {/* Search + filters */}
          <div style={{ padding: '12px 12px 0' }}>
            <div style={{ position: 'relative' }}>
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search bots, tags, capabilities…"
                aria-label="Search bots"
                style={{
                  width: '100%',
                  border: '1px solid var(--panel-border)',
                  borderRadius: 'var(--radius-md)',
                  background: 'var(--panel-inset)',
                  color: 'var(--foreground)',
                  padding: '9px 36px 9px 12px',
                  fontSize: '0.82rem',
                  fontFamily: 'var(--font-mono)',
                  outline: 'none',
                  transition: 'border-color 160ms ease',
                }}
                onFocus={(e) => { e.currentTarget.style.borderColor = 'var(--panel-border-active)'; }}
                onBlur={(e) => { e.currentTarget.style.borderColor = 'var(--panel-border)'; }}
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery('')}
                  aria-label="Clear search"
                  style={{
                    position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)',
                    background: 'none', border: 'none', color: 'var(--muted-foreground)',
                    cursor: 'none', fontSize: '1rem', lineHeight: 1, padding: '2px 4px',
                  }}
                >×</button>
              )}
            </div>

            {/* Filter row */}
            <div style={{ display: 'flex', gap: 6, marginTop: 8, flexWrap: 'wrap' }}>
              <select
                className="btn"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as StatusFilter)}
                aria-label="Status filter"
                style={{ minHeight: 32, fontSize: '0.7rem', padding: '0 10px', flex: 1, minWidth: 80 }}
              >
                <option value="all">Status: all</option>
                <option value="active">Active</option>
                <option value="draft">Draft</option>
                <option value="disabled">Disabled</option>
              </select>
              <select
                className="btn"
                value={outputModeFilter}
                onChange={(e) => setOutputModeFilter(e.target.value as BotOutputMode | 'all')}
                aria-label="Output mode"
                style={{ minHeight: 32, fontSize: '0.7rem', padding: '0 10px', flex: 1, minWidth: 80 }}
              >
                <option value="all">Output: all</option>
                <option value="text">Text</option>
                <option value="json">JSON</option>
                <option value="mixed">Mixed</option>
              </select>
              <select
                className="btn"
                value={sortMode}
                onChange={(e) => setSortMode(e.target.value as SortMode)}
                aria-label="Sort order"
                style={{ minHeight: 32, fontSize: '0.7rem', padding: '0 10px', flex: 1, minWidth: 80 }}
              >
                <option value="name">Sort: name</option>
                <option value="category">Category</option>
                <option value="status">Status</option>
              </select>
            </div>
          </div>

          {/* Category rail */}
          <div style={{ padding: '10px 12px 0' }}>
            <BotCategoryRail value={category} counts={categoryCounts} total={bots.length} onChange={setCategory} />
          </div>

          {/* Bot list */}
          <div
            ref={listRef}
            style={{
              flex: 1,
              overflowY: 'auto',
              padding: '10px 12px 12px',
              display: 'flex',
              flexDirection: 'column',
              gap: 6,
              maxHeight: '65vh',
            }}
          >
            {filtered.length === 0 ? (
              <BotStateBlock
                title="EMPTY SEARCH"
                message="No bots match your filters. Try adjusting the search, category, or status."
                tone="warning"
              />
            ) : (
              filtered.map((bot) => (
                <BotCard
                  key={bot.slug}
                  bot={bot}
                  selected={selectedBot?.slug === bot.slug}
                  compareSelected={compareSlugs.includes(bot.slug)}
                  onSelect={selectBot}
                  onToggleCompare={toggleCompare}
                />
              ))
            )}
          </div>

          {/* Import stats footer */}
          <div style={{
            borderTop: '1px solid var(--panel-border)',
            padding: '10px 14px',
            background: 'var(--panel-inset)',
            display: 'flex',
            gap: 12,
          }}>
            <span className="edge-label">{importStats.importedCount} imported</span>
            <span className="edge-label" style={{ opacity: 0.5 }}>·</span>
            <span className="edge-label">{importStats.skippedCount} skipped</span>
          </div>
        </div>

        {/* ── Col 2: Center panel ── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, minWidth: 0 }}>

          {/* Bot profile card */}
          {selectedBot ? (
            <div style={{
              border: '1px solid var(--panel-border)',
              borderRadius: 'var(--radius-xl)',
              background: 'var(--panel-bg)',
              overflow: 'hidden',
            }}>
              {/* Profile header */}
              <div style={{
                padding: '14px 16px',
                borderBottom: '1px solid var(--panel-border)',
                background: 'var(--panel-inset)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 8,
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span className="edge-label">Selected Bot</span>
                  <span className="route-marker" style={{ color: 'var(--primary)' }}>{selectedBot.category}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{
                    width: 6, height: 6, borderRadius: '50%',
                    background: selectedBot.status === 'active' ? 'var(--neon-lime)' : selectedBot.status === 'draft' ? 'var(--warning)' : 'var(--muted-foreground)',
                  }} />
                  <span className="edge-label">{selectedBot.status}</span>
                </div>
              </div>
              {/* Profile body */}
              <div style={{ padding: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12 }}>
                  <div>
                    <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.15rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                      {selectedBot.name}
                    </h2>
                    <p style={{ fontSize: '0.8rem', color: 'var(--muted-foreground)', marginTop: 4, lineHeight: 1.55 }}>
                      {selectedBot.description}
                    </p>
                  </div>
                  {/* Readiness gauge */}
                  <div style={{ flexShrink: 0, textAlign: 'center', minWidth: 52 }}>
                    <div style={{
                      width: 52, height: 52,
                      borderRadius: '50%',
                      border: '2px solid var(--panel-border)',
                      background: `conic-gradient(var(--primary) ${getBotReadiness(selectedBot).score * 3.6}deg, var(--panel-inset) 0deg)`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      position: 'relative',
                    }}>
                      <div style={{
                        width: 38, height: 38, borderRadius: '50%',
                        background: 'var(--panel-bg)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                      }}>
                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', fontWeight: 700, color: 'var(--primary)' }}>
                          {getBotReadiness(selectedBot).score}%
                        </span>
                      </div>
                    </div>
                    <span className="edge-label" style={{ marginTop: 4, display: 'block' }}>quality</span>
                  </div>
                </div>

                {/* Tags */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, marginTop: 12 }}>
                  {selectedBot.tags.map((tag) => (
                    <span
                      key={tag}
                      onClick={() => setQuery(tag)}
                      className="mono-chip"
                      style={{ cursor: 'none', transition: 'border-color 140ms ease' }}
                      title={`Filter by ${tag}`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Meta row */}
                <div style={{
                  display: 'flex', gap: 16, flexWrap: 'wrap', marginTop: 14,
                  padding: '10px 12px',
                  background: 'var(--panel-inset)',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--panel-border)',
                }}>
                  <div>
                    <p className="edge-label">Model</p>
                    <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--foreground)', marginTop: 2 }}>{selectedBot.model}</p>
                  </div>
                  <div>
                    <p className="edge-label">Output</p>
                    <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--foreground)', marginTop: 2 }}>{selectedBot.outputMode}</p>
                  </div>
                  <div>
                    <p className="edge-label">Temp</p>
                    <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--foreground)', marginTop: 2 }}>{selectedBot.temperature}</p>
                  </div>
                  <div>
                    <p className="edge-label">Capabilities</p>
                    <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--foreground)', marginTop: 2 }}>{selectedBot.capabilities.length}</p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div style={{
              border: '1px solid var(--panel-border)',
              borderRadius: 'var(--radius-xl)',
              background: 'var(--panel-bg)',
              padding: '32px 24px',
              textAlign: 'center',
            }}>
              <BotStateBlock title="NO BOT SELECTED" message="Select a bot from the registry to begin testing." />
            </div>
          )}

          {/* Tab bar: Console / Compare / History */}
          <div style={{
            border: '1px solid var(--panel-border)',
            borderRadius: 'var(--radius-xl)',
            background: 'var(--panel-bg)',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            flex: 1,
          }}>
            {/* Tabs */}
            <div style={{
              display: 'flex',
              borderBottom: '1px solid var(--panel-border)',
              background: 'var(--panel-inset)',
            }}>
              {([
                { id: 'console', label: 'Console' },
                { id: 'compare', label: `Compare (${compareBots.length}/3)` },
                { id: 'history', label: `History (${history.length})` },
              ] as const).map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  style={{
                    padding: '10px 16px',
                    background: 'none',
                    border: 'none',
                    borderBottom: activeTab === tab.id ? '2px solid var(--primary)' : '2px solid transparent',
                    color: activeTab === tab.id ? 'var(--primary)' : 'var(--muted-foreground)',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.7rem',
                    letterSpacing: '0.14em',
                    textTransform: 'uppercase',
                    cursor: 'none',
                    transition: 'color 140ms ease, border-color 140ms ease',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Console tab */}
            {activeTab === 'console' && selectedBot && (
              <BotConsole
                bot={selectedBot}
                scenarios={botScenarios}
                value={input}
                setValue={setInput}
                onRun={runBot}
                onScenarioMatch={onScenarioMatch}
                onClearOutput={() => { setResult(null); setApiError(''); }}
                onCopyMetadata={() => copyText(JSON.stringify({
                  id: selectedBot.id, slug: selectedBot.slug, name: selectedBot.name,
                  category: selectedBot.category, status: selectedBot.status,
                  outputMode: selectedBot.outputMode, tags: selectedBot.tags,
                  model: selectedBot.model, temperature: selectedBot.temperature,
                  capabilities: selectedBot.capabilities, safetyNotes: selectedBot.safetyNotes,
                  sourceFile: selectedBot.sourceFile,
                }, null, 2))}
                loading={loading}
              />
            )}
            {activeTab === 'console' && !selectedBot && (
              <div style={{ padding: '24px' }}>
                <BotStateBlock title="NO BOT SELECTED" message="Select a bot from the registry to use the console." />
              </div>
            )}

            {/* Compare tab */}
            {activeTab === 'compare' && (
              <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: 12 }}>
                {compareBots.length === 0 ? (
                  <BotStateBlock title="COMPARE EMPTY" message="Use the Compare toggle on any bot card to add up to 3 bots here." />
                ) : (
                  <>
                    <div style={{ display: 'grid', gap: 10, gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))' }}>
                      {compareBots.map((bot) => {
                        const readiness = getBotReadiness(bot);
                        return (
                          <div
                            key={bot.slug}
                            style={{
                              border: '1px solid var(--panel-border)',
                              borderRadius: 'var(--radius-lg)',
                              background: 'var(--panel-inset)',
                              padding: '14px',
                              position: 'relative',
                            }}
                          >
                            <button
                              type="button"
                              onClick={() => toggleCompare(bot.slug)}
                              aria-label={`Remove ${bot.name}`}
                              style={{
                                position: 'absolute', top: 8, right: 8,
                                background: 'none', border: '1px solid var(--panel-border)',
                                borderRadius: 'var(--radius-sm)', color: 'var(--muted-foreground)',
                                fontSize: '0.65rem', padding: '2px 6px', cursor: 'none',
                              }}
                            >×</button>
                            <p style={{ fontWeight: 700, fontSize: '0.88rem', paddingRight: 24 }}>{bot.shortName}</p>
                            <div style={{ marginTop: 10, display: 'flex', flexDirection: 'column', gap: 4 }}>
                              {[
                                ['Category', bot.category],
                                ['Status', bot.status],
                                ['Output', bot.outputMode],
                                ['Model', bot.model],
                                ['Temp', String(bot.temperature)],
                                ['Caps', String(bot.capabilities.length)],
                                ['Quality', `${readiness.score}%`],
                              ].map(([k, v]) => (
                                <div key={k} style={{ display: 'flex', justifyContent: 'space-between', gap: 8 }}>
                                  <span className="edge-label">{k}</span>
                                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--foreground)' }}>{v}</span>
                                </div>
                              ))}
                            </div>
                            {/* Mini quality bar */}
                            <div style={{ marginTop: 10, height: 3, borderRadius: 2, background: 'var(--panel-border)' }}>
                              <div style={{ height: '100%', borderRadius: 2, width: `${readiness.score}%`, background: 'var(--primary)', transition: 'width 600ms ease' }} />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    <button className="btn" type="button" onClick={() => setCompareSlugs([])} style={{ alignSelf: 'flex-start' }}>
                      Clear All
                    </button>
                  </>
                )}
              </div>
            )}

            {/* History tab */}
            {activeTab === 'history' && (
              <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: 10 }}>
                {history.length > 0 && (
                  <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <button className="btn" type="button" onClick={() => { clearBotRuns(); setHistory([]); }} style={{ fontSize: '0.72rem', minHeight: 32 }}>
                      Clear History
                    </button>
                  </div>
                )}
                {history.length === 0 ? (
                  <BotStateBlock title="NO HISTORY" message="Run a bot to store the latest 10 test previews locally." />
                ) : (
                  history.map((entry) => (
                    <div
                      key={entry.id}
                      style={{
                        border: '1px solid var(--panel-border)',
                        borderRadius: 'var(--radius-lg)',
                        background: 'var(--panel-inset)',
                        padding: '12px 14px',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
                        <p style={{ fontWeight: 700, fontSize: '0.85rem' }}>{entry.botName}</p>
                        <span
                          className="edge-label"
                          style={{ color: entry.fallback ? 'var(--warning)' : 'var(--neon-lime)' }}
                        >
                          {entry.fallback ? 'demo' : 'live'}
                        </span>
                      </div>
                      <p className="edge-label" style={{ marginTop: 4 }}>
                        {new Date(entry.createdAt).toLocaleString()} · {entry.model} · {entry.latencyMs}ms
                      </p>
                      <p style={{ fontSize: '0.78rem', color: 'var(--muted-foreground)', marginTop: 6, lineHeight: 1.4 }}>
                        in: {entry.inputPreview}
                      </p>
                      <p style={{ fontSize: '0.78rem', color: 'var(--muted-foreground)', marginTop: 2, lineHeight: 1.4 }}>
                        out: {entry.outputPreview}
                      </p>
                      <div style={{ display: 'flex', gap: 6, marginTop: 8, flexWrap: 'wrap' }}>
                        <button type="button" className="btn" style={{ fontSize: '0.7rem', minHeight: 30 }}
                          onClick={() => { selectBot(entry.botSlug); setInput(entry.inputPreview); setActiveTab('console'); }}>
                          Restore
                        </button>
                        <button type="button" className="btn" style={{ fontSize: '0.7rem', minHeight: 30 }} onClick={() => copyText(entry.outputPreview)}>
                          Copy
                        </button>
                        <button type="button" className="btn" style={{ fontSize: '0.7rem', minHeight: 30 }}
                          onClick={() => { deleteBotRun(entry.id); setHistory(getBotRuns()); }}>
                          Delete
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        </div>

        {/* ── Col 3: Output panel (hidden until 1440px) ── */}
        <div
          style={{ display: 'flex', flexDirection: 'column', gap: 16, minWidth: 0 }}
          className="hidden-until-xl3"
        >
          <style>{`.hidden-until-xl3 { display: none !important; } @media (min-width: 1440px) { .hidden-until-xl3 { display: flex !important; } }`}</style>

          {/* Status indicators */}
          {loading && <BotStateBlock title="RUNNING" message="Executing bot test request…" tone="neutral" />}
          {apiError && <BotStateBlock title="API ERROR" message={apiError} tone="error" />}
          {!apiError && result?.fallback && (
            <BotStateBlock
              title="FALLBACK MODE"
              message="No live API key — deterministic demo output shown."
              tone="warning"
            />
          )}

          <BotOutputPanel
            output={result?.output ?? ''}
            fallback={result?.fallback ?? true}
            model={result?.meta.model ?? selectedBot?.model ?? 'gpt-4.1-mini'}
            category={result?.meta.category ?? selectedBot?.category ?? 'other'}
            latencyMs={result?.meta.latencyMs ?? 0}
            timestamp={outputTimestamp}
            error={apiError || undefined}
            onCopyOutput={() => copyText(result?.output ?? '')}
          />
        </div>
      </div>

      {/* ── Output panel (visible below 1440px) ── */}
      <div className="visible-until-xl3">
        <style>{`.visible-until-xl3 { display: flex; flex-direction: column; gap: 12px; } @media (min-width: 1440px) { .visible-until-xl3 { display: none !important; } }`}</style>
        {loading && <BotStateBlock title="RUNNING" message="Executing bot test request…" tone="neutral" />}
        {apiError && <BotStateBlock title="API ERROR" message={apiError} tone="error" />}
        {!apiError && result?.fallback && (
          <BotStateBlock title="FALLBACK MODE" message="No live API key — deterministic demo output shown." tone="warning" />
        )}
        <BotOutputPanel
          output={result?.output ?? ''}
          fallback={result?.fallback ?? true}
          model={result?.meta.model ?? selectedBot?.model ?? 'gpt-4.1-mini'}
          category={result?.meta.category ?? selectedBot?.category ?? 'other'}
          latencyMs={result?.meta.latencyMs ?? 0}
          timestamp={outputTimestamp}
          error={apiError || undefined}
          onCopyOutput={() => copyText(result?.output ?? '')}
        />
      </div>
    </div>
  );
}
