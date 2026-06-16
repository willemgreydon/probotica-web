'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { Search, Zap, Bot, ArrowRight, Clock, Layers, Filter } from 'lucide-react';
import type { PublicBotDefinition } from '@/features/bots/lib/bot-types';
import { getBotReadiness } from '@/features/bots/lib/bot-readiness';
import type { WorkflowTemplate } from '@/features/workflows/lib/workflow-types';

interface MarketplaceViewProps {
  bots: PublicBotDefinition[];
  templates: WorkflowTemplate[];
}

const COMPLEXITY_CLASS: Record<string, string> = {
  low:      'complexity-low',
  medium:   'complexity-medium',
  high:     'complexity-high',
  critical: 'complexity-critical',
};

const CATEGORY_COLORS: Record<string, string> = {
  sales:         'var(--neon-lime)',
  ux:            'var(--neon-cyan)',
  content:       'var(--neon-violet)',
  marketing:     'var(--neon-orange)',
  'real-estate': 'var(--success)',
  development:   'var(--secondary)',
  learning:      'var(--warning)',
  automation:    'var(--primary)',
  research:      'var(--accent)',
  support:       'var(--info)',
  strategy:      'var(--danger)',
  other:         'var(--muted-foreground)',
};

function ComplexityBadge({ level }: { level: string }) {
  return (
    <span className={`complexity-badge ${COMPLEXITY_CLASS[level] ?? 'complexity-medium'}`}>
      <span>{level}</span>
    </span>
  );
}

function BotProductCard({ bot }: { bot: PublicBotDefinition }) {
  const readiness = getBotReadiness(bot);
  const accent = CATEGORY_COLORS[bot.category] ?? 'var(--primary)';

  return (
    <Link href={`/bots/${bot.slug}`} style={{ textDecoration: 'none', display: 'block' }}>
      <article
        className="panel card-lift"
        style={{
          borderRadius: 'var(--radius-lg)',
          overflow: 'hidden',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          transition: 'transform 240ms ease, border-color 240ms ease, box-shadow 240ms ease',
        }}
        onMouseEnter={(e) => {
          const el = e.currentTarget as HTMLElement;
          el.style.borderColor = `color-mix(in oklab, ${accent}, transparent 55%)`;
          el.style.boxShadow = `0 0 0 1px color-mix(in oklab, ${accent}, transparent 80%), var(--shadow)`;
        }}
        onMouseLeave={(e) => {
          const el = e.currentTarget as HTMLElement;
          el.style.borderColor = 'var(--panel-border)';
          el.style.boxShadow = 'none';
        }}
      >
        {/* Card header */}
        <div style={{
          padding: '16px 18px 14px',
          borderBottom: '1px solid var(--panel-border)',
          background: `linear-gradient(135deg, color-mix(in oklab, ${accent}, transparent 93%) 0%, transparent 60%)`,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
            <span className="category-pill" style={{ color: accent, borderColor: `color-mix(in oklab, ${accent}, transparent 60%)`, background: `color-mix(in oklab, ${accent}, transparent 90%)` }}>
              {bot.category}
            </span>
            <span className={`status-dot ${bot.status === 'active' ? 'status-dot-online' : bot.status === 'draft' ? 'status-dot-warning' : 'status-dot-idle'}`} />
          </div>
          <h3 style={{ fontWeight: 800, fontSize: '.9375rem', letterSpacing: '-.02em', color: 'var(--foreground)', lineHeight: 1.25, marginBottom: '6px' }}>
            {bot.shortName}
          </h3>
          <p className="text-clamp-2" style={{ fontSize: '.8125rem', lineHeight: 1.55, color: 'var(--muted-foreground)' }}>
            {bot.description}
          </p>
        </div>

        {/* Card body */}
        <div style={{ padding: '12px 18px', flex: 1 }}>
          {/* Readiness */}
          <div style={{ marginBottom: '10px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '.56rem', letterSpacing: '.2em', textTransform: 'uppercase', color: 'var(--telemetry-dim)' }}>Readiness</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '.62rem', color: readiness.score >= 75 ? 'var(--status-online)' : 'var(--status-warning)' }}>{readiness.score}%</span>
            </div>
            <div className="runtime-bar-track">
              <div className="runtime-bar-fill" style={{
                width: `${readiness.score}%`,
                background: readiness.score >= 75 ? 'var(--status-online)' : 'var(--status-warning)',
              }} />
            </div>
          </div>

          {/* Tags */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
            {Array.from(new Set(bot.tags ?? [])).slice(0, 3).map((tag) => (
              <span key={`${bot.id ?? bot.slug ?? bot.name}-${tag}`} className="tag" style={{ fontSize: '.55rem' }}>{tag}</span>
            ))}
          </div>
        </div>

        {/* Card footer */}
        <div style={{ padding: '10px 18px', borderTop: '1px solid var(--panel-border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '.6rem', letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--telemetry-dim)' }}>
            {bot.outputMode} · {bot.model.split('-').slice(0, 2).join('-')}
          </span>
          <ArrowRight size={12} style={{ color: 'var(--muted-foreground)' }} />
        </div>
      </article>
    </Link>
  );
}

function WorkflowPackCard({ template }: { template: WorkflowTemplate }) {
  return (
    <Link href="/workspace" style={{ textDecoration: 'none', display: 'block' }}>
      <article
        className="panel card-lift"
        style={{ borderRadius: 'var(--radius-lg)', overflow: 'hidden', height: '100%', display: 'flex', flexDirection: 'column' }}
      >
        <div style={{ padding: '16px 18px 14px', borderBottom: '1px solid var(--panel-border)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
            <ComplexityBadge level={template.runtimeComplexity} />
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '.58rem', letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--telemetry-dim)' }}>
              {template.category}
            </span>
          </div>
          <h3 style={{ fontWeight: 800, fontSize: '.9375rem', letterSpacing: '-.02em', color: 'var(--foreground)', lineHeight: 1.25, marginBottom: '6px' }}>
            {template.title}
          </h3>
          <p className="text-clamp-2" style={{ fontSize: '.8125rem', lineHeight: 1.55, color: 'var(--muted-foreground)' }}>
            {template.description}
          </p>
        </div>

        <div style={{ padding: '12px 18px', flex: 1 }}>
          <div style={{ display: 'flex', gap: '14px', marginBottom: '10px' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontFamily: 'var(--font-mono)', fontSize: '.6rem', letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--telemetry-dim)' }}>
              <Layers size={10} /> {template.steps.length} steps
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontFamily: 'var(--font-mono)', fontSize: '.6rem', letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--telemetry-dim)' }}>
              <Clock size={10} /> {template.estimatedDurationMin}m
            </span>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
            {template.useCases.slice(0, 2).map((uc) => (
              <span key={uc} className="tag" style={{ fontSize: '.55rem' }}>{uc}</span>
            ))}
          </div>
        </div>

        <div style={{ padding: '10px 18px', borderTop: '1px solid var(--panel-border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '.6rem', letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--telemetry-dim)' }}>
            {template.estimatedOutputMode}
          </span>
          <ArrowRight size={12} style={{ color: 'var(--muted-foreground)' }} />
        </div>
      </article>
    </Link>
  );
}

export function MarketplaceView({ bots, templates }: MarketplaceViewProps) {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<'all' | PublicBotDefinition['category']>('all');
  const [tab, setTab] = useState<'bots' | 'workflows'>('bots');

  const categories = useMemo(() => Array.from(new Set(bots.map((bot) => bot.category))).sort(), [bots]);

  const filteredBots = useMemo(() => {
    const q = query.trim().toLowerCase();
    return bots.filter((bot) => {
      const categoryMatch = category === 'all' ? true : bot.category === category;
      const queryMatch = q ? `${bot.name} ${bot.description} ${bot.tags.join(' ')}`.toLowerCase().includes(q) : true;
      return categoryMatch && queryMatch;
    });
  }, [bots, category, query]);

  const filteredTemplates = useMemo(() => {
    const q = query.trim().toLowerCase();
    return templates.filter((t) =>
      q ? `${t.title} ${t.description} ${t.useCases.join(' ')}`.toLowerCase().includes(q) : true
    );
  }, [templates, query]);

  const spotlightBots = filteredBots.slice(0, 4);
  const gridBots = filteredBots.slice(0, 12);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

      {/* ── Hero ── */}
      <div
        style={{
          position: 'relative', overflow: 'hidden',
          borderRadius: 'var(--radius-xl)', border: '1px solid var(--panel-border)',
        }}
      >
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: 'radial-gradient(ellipse at 85% -15%, color-mix(in oklab, var(--neon-cyan), transparent 82%) 0%, transparent 42%), radial-gradient(ellipse at -8% 85%, color-mix(in oklab, var(--neon-violet), transparent 88%) 0%, transparent 38%)',
        }} />
        <div className="hud-grid" style={{ position: 'absolute', inset: 0, opacity: 0.2, pointerEvents: 'none' }} />

        <div style={{ position: 'relative', padding: 'clamp(28px,4vw,52px)' }}>
          <div className="section-eyebrow">
            <span className="label-eyebrow">AI Marketplace</span>
          </div>
          <h1 className="heading-section mt-2" style={{ maxWidth: '780px', marginBottom: '12px' }}>
            Operational AI Products &amp; Workflow Packs
          </h1>
          <p className="text-lead" style={{ maxWidth: '580px', marginBottom: '28px' }}>
            Curated modules for tactical deployment across sales, UX, automation, and development.
          </p>

          {/* Stats */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
            {[
              { value: bots.length,      label: 'AI Bots' },
              { value: templates.length, label: 'Workflow Packs' },
              { value: categories.length, label: 'Categories' },
              { value: bots.filter(b => b.status === 'active').length, label: 'Active' },
            ].map(({ value, label }) => (
              <div key={label} className="panel-sm" style={{ padding: '10px 16px', display: 'flex', gap: '8px', alignItems: 'baseline' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: '1.1rem', color: 'var(--foreground)' }}>{value}</span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '.6rem', letterSpacing: '.2em', textTransform: 'uppercase', color: 'var(--telemetry-dim)' }}>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Search + Filter bar ── */}
      <div className="panel" style={{ borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
        <div style={{ padding: '14px 18px', display: 'flex', flexWrap: 'wrap', gap: '10px', alignItems: 'center' }}>
          <div style={{ position: 'relative', flex: 1, minWidth: '200px' }}>
            <Search size={13} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--muted-foreground)', pointerEvents: 'none' }} />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search modules, workflows, capabilities..."
              style={{
                width: '100%', paddingLeft: '36px', paddingRight: '14px', paddingTop: '9px', paddingBottom: '9px',
                border: '1px solid var(--panel-border)', background: 'var(--panel-inset)',
                color: 'var(--foreground)', borderRadius: 'var(--radius-md)', fontFamily: 'var(--font-body)',
                fontSize: '.875rem',
              }}
            />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Filter size={12} style={{ color: 'var(--muted-foreground)' }} />
            <select
              className="btn"
              value={category}
              onChange={(e) => setCategory(e.target.value as typeof category)}
              style={{ height: '38px', paddingLeft: '12px', paddingRight: '28px', fontSize: '.72rem' }}
            >
              <option value="all">All categories</option>
              {categories.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          {/* Tabs */}
          <div role="tablist" aria-label="Marketplace catalog" style={{ display: 'flex', gap: '2px', border: '1px solid var(--panel-border)', borderRadius: 'var(--radius-md)', padding: '2px' }}>
            {(['bots', 'workflows'] as const).map((t) => (
              <button
                key={t}
                type="button"
                role="tab"
                aria-selected={tab === t}
                aria-label={t === 'bots' ? 'Show bots' : 'Show workflow packs'}
                onClick={() => setTab(t)}
                className="focus-ring"
                style={{
                  padding: '5px 14px', borderRadius: '8px', border: 'none',
                  fontFamily: 'var(--font-mono)', fontSize: '.62rem', letterSpacing: '.14em', textTransform: 'uppercase',
                  cursor: 'none', transition: 'all var(--duration-base) ease',
                  background: tab === t ? 'var(--primary)' : 'transparent',
                  color: tab === t ? 'var(--primary-foreground)' : 'var(--muted-foreground)',
                }}
              >
                {t === 'bots' ? <><Bot size={10} style={{ display: 'inline', marginRight: '5px' }} />Bots</> : <><Zap size={10} style={{ display: 'inline', marginRight: '5px' }} />Workflows</>}
              </button>
            ))}
          </div>
        </div>

        {/* Result count */}
        <div style={{ padding: '8px 18px', borderTop: '1px solid var(--panel-border)', background: 'var(--panel-inset)' }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '.6rem', letterSpacing: '.18em', textTransform: 'uppercase', color: 'var(--telemetry-dim)' }}>
            {tab === 'bots' ? `${filteredBots.length} bots` : `${filteredTemplates.length} workflow packs`} found
            {query && <span> for &ldquo;{query}&rdquo;</span>}
          </span>
        </div>
      </div>

      {/* ── Bot grid ── */}
      {tab === 'bots' && (
        <>
          {/* Spotlight row (featured 4) */}
          {spotlightBots.length > 0 && (
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                <div className="section-eyebrow" style={{ margin: 0 }}>
                  <span className="text-caption">Spotlight</span>
                </div>
                <span className="route-marker">{spotlightBots.length} featured</span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '14px' }}>
                {spotlightBots.map((bot) => <BotProductCard key={bot.slug} bot={bot} />)}
              </div>
            </div>
          )}

          {/* Full grid */}
          {gridBots.length > 4 && (
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                <div className="section-eyebrow" style={{ margin: 0 }}>
                  <span className="text-caption">All Bots</span>
                </div>
                <Link href="/bots" className="btn" style={{ height: '32px', fontSize: '.62rem' }}>View in Lab</Link>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '10px' }}>
                {gridBots.slice(4).map((bot) => <BotProductCard key={bot.slug} bot={bot} />)}
              </div>
            </div>
          )}

          {filteredBots.length === 0 && (
            <div className="panel" style={{ padding: '48px', textAlign: 'center', borderRadius: 'var(--radius-xl)' }}>
              <Bot size={28} style={{ color: 'var(--muted-foreground)', margin: '0 auto 12px' }} />
              <p className="text-caption mb-2">No bots found</p>
              <p className="text-body">Try adjusting your search or category filter.</p>
            </div>
          )}
        </>
      )}

      {/* ── Workflow packs grid ── */}
      {tab === 'workflows' && (
        <div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
            <div className="section-eyebrow" style={{ margin: 0 }}>
              <span className="text-caption">Workflow Packs</span>
            </div>
            <span className="route-marker">{filteredTemplates.length} packs</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '14px' }}>
            {filteredTemplates.map((template) => <WorkflowPackCard key={template.id} template={template} />)}
          </div>
          {filteredTemplates.length === 0 && (
            <div className="panel" style={{ padding: '48px', textAlign: 'center', borderRadius: 'var(--radius-xl)' }}>
              <Zap size={28} style={{ color: 'var(--muted-foreground)', margin: '0 auto 12px' }} />
              <p className="text-caption mb-2">No workflow packs found</p>
              <p className="text-body">Try adjusting your search.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
