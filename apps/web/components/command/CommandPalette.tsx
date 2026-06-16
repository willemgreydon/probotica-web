'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Bot, Zap, BookOpen, LayoutDashboard, ShoppingBag, Settings, ArrowRight, Search, Cpu, Layers } from 'lucide-react';

interface CommandItem {
  id: string;
  title: string;
  subtitle: string;
  href: string;
  type: 'bot' | 'workflow' | 'page' | 'action' | 'knowledge';
  icon: React.ReactNode;
  keywords?: string;
}

const PAGE_COMMANDS: CommandItem[] = [
  { id: 'p-bots',     title: 'Bot Lab',          subtitle: 'Browse and test all AI bots',          href: '/bots',           type: 'page',    icon: <Bot size={13} /> },
  { id: 'p-work',     title: 'Workspace',         subtitle: 'Persistent orchestration workspace',   href: '/workspace',      type: 'page',    icon: <Layers size={13} /> },
  { id: 'p-market',   title: 'Marketplace',       subtitle: 'Curated AI products and workflow packs', href: '/marketplace',  type: 'page',    icon: <ShoppingBag size={13} /> },
  { id: 'p-ctrl',     title: 'Control Center',    subtitle: 'Runtime HQ and operational telemetry', href: '/control-center', type: 'page',    icon: <LayoutDashboard size={13} /> },
  { id: 'p-know',     title: 'Knowledge Universe', subtitle: 'AI documentation and learning paths', href: '/knowledge',      type: 'page',    icon: <BookOpen size={13} /> },
  { id: 'p-studio',   title: 'AI Studio',         subtitle: 'Live AI demo interface',               href: '/studio',         type: 'page',    icon: <Cpu size={13} /> },
  { id: 'p-solutions', title: 'Solutions',        subtitle: 'AI products and service offerings',    href: '/solutions',      type: 'page',    icon: <Settings size={13} /> },
];

function typeLabel(type: CommandItem['type']): string {
  const map: Record<CommandItem['type'], string> = {
    bot: 'bot', workflow: 'workflow', page: 'page', action: 'action', knowledge: 'article',
  };
  return map[type];
}

interface CommandPaletteProps {
  bots?: { slug: string; name: string; category: string; shortName: string }[];
  workflows?: { id: string; title: string; category: string }[];
}

export function CommandPalette({ bots = [], workflows = [] }: CommandPaletteProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const botItems: CommandItem[] = bots.map((b) => ({
    id: `bot-${b.slug}`,
    title: b.name,
    subtitle: `${b.category} bot`,
    href: `/bots/${b.slug}`,
    type: 'bot',
    icon: <Bot size={13} />,
    keywords: `${b.slug} ${b.category}`,
  }));

  const workflowItems: CommandItem[] = workflows.map((w) => ({
    id: `wf-${w.id}`,
    title: w.title,
    subtitle: `${w.category} workflow`,
    href: `/workspace`,
    type: 'workflow',
    icon: <Zap size={13} />,
    keywords: `${w.id} ${w.category}`,
  }));

  const allItems = [...PAGE_COMMANDS, ...botItems, ...workflowItems];

  const filtered = query.trim()
    ? allItems.filter((item) => {
        const hay = `${item.title} ${item.subtitle} ${item.keywords ?? ''}`.toLowerCase();
        return hay.includes(query.trim().toLowerCase());
      })
    : allItems;

  /* Group for display */
  const groups: { label: string; items: CommandItem[] }[] = [];
  const byType = (type: CommandItem['type']) => filtered.filter((i) => i.type === type);
  const pages = byType('page');
  const bItems = byType('bot');
  const wItems = byType('workflow');
  const kItems = byType('knowledge');
  if (pages.length)   groups.push({ label: 'Pages',     items: pages });
  if (bItems.length)  groups.push({ label: 'Bots',      items: bItems });
  if (wItems.length)  groups.push({ label: 'Workflows', items: wItems });
  if (kItems.length)  groups.push({ label: 'Knowledge', items: kItems });

  const flatFiltered = groups.flatMap((g) => g.items);

  const navigate = useCallback((href: string) => {
    setOpen(false);
    setQuery('');
    setSelected(0);
    router.push(href);
  }, [router]);

  /* Keyboard open/close */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  /* Focus input on open */
  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 20);
      setSelected(0);
    }
  }, [open]);

  /* Arrow navigation + enter */
  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelected((s) => Math.min(s + 1, flatFiltered.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelected((s) => Math.max(s - 1, 0));
    } else if (e.key === 'Enter') {
      const item = flatFiltered[selected];
      if (item) navigate(item.href);
    } else if (e.key === 'Escape') {
      setOpen(false);
    }
  };

  if (!open) return null;

  let cursor = 0;

  return (
    <div
      className="cmd-overlay animate-in-fade"
      onClick={(e) => { if (e.target === e.currentTarget) setOpen(false); }}
      role="dialog"
      aria-modal
      aria-label="Command palette"
    >
      <div className="cmd-panel" onKeyDown={onKeyDown}>
        {/* Search input */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', paddingLeft: '20px' }}>
          <Search size={14} style={{ color: 'var(--muted-foreground)', flexShrink: 0 }} />
          <input
            ref={inputRef}
            className="cmd-input"
            placeholder="Search bots, workflows, pages..."
            value={query}
            onChange={(e) => { setQuery(e.target.value); setSelected(0); }}
            spellCheck={false}
            autoComplete="off"
          />
          <span
            style={{
              marginRight: '16px',
              padding: '3px 8px',
              border: '1px solid var(--panel-border)',
              borderRadius: '6px',
              fontFamily: 'var(--font-mono)',
              fontSize: '.58rem',
              letterSpacing: '.1em',
              color: 'var(--telemetry-dim)',
              flexShrink: 0,
            }}
          >
            ESC
          </span>
        </div>
        <div className="cmd-divider" />

        {/* Results */}
        <div className="cmd-results" role="listbox">
          {flatFiltered.length === 0 ? (
            <div style={{ padding: '32px 20px', textAlign: 'center' }}>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '.7rem', letterSpacing: '.18em', textTransform: 'uppercase', color: 'var(--telemetry-dim)' }}>
                No results for &ldquo;{query}&rdquo;
              </p>
            </div>
          ) : (
            groups.map((group) => (
              <div key={group.label}>
                <div className="cmd-section-label">{group.label}</div>
                {group.items.map((item) => {
                  const isSelected = flatFiltered[selected]?.id === item.id;
                  cursor++;
                  return (
                    <div
                      key={item.id}
                      role="option"
                      aria-selected={isSelected}
                      data-selected={isSelected ? 'true' : 'false'}
                      className="cmd-result-item"
                      onClick={() => navigate(item.href)}
                    >
                      <div className="cmd-result-icon">{item.icon}</div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <p className="cmd-result-title text-truncate">{item.title}</p>
                        <p className="cmd-result-sub">{typeLabel(item.type)} — {item.subtitle}</p>
                      </div>
                      {isSelected && (
                        <ArrowRight size={12} style={{ color: 'var(--primary)', flexShrink: 0 }} />
                      )}
                    </div>
                  );
                })}
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="cmd-divider" />
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '10px 20px' }}>
          {[['↑↓', 'navigate'], ['↵', 'open'], ['⌘K', 'close']].map(([key, label]) => (
            <span key={key} style={{ display: 'flex', alignItems: 'center', gap: '5px', fontFamily: 'var(--font-mono)', fontSize: '.58rem', letterSpacing: '.1em', color: 'var(--telemetry-dim)', textTransform: 'uppercase' }}>
              <span style={{ padding: '2px 6px', border: '1px solid var(--panel-border)', borderRadius: '4px', color: 'var(--muted-foreground)' }}>{key}</span>
              {label}
            </span>
          ))}
          <span style={{ marginLeft: 'auto', fontFamily: 'var(--font-mono)', fontSize: '.58rem', letterSpacing: '.16em', color: 'var(--telemetry-dim)', textTransform: 'uppercase' }}>
            {flatFiltered.length} result{flatFiltered.length !== 1 ? 's' : ''}
          </span>
        </div>
      </div>
    </div>
  );
}
