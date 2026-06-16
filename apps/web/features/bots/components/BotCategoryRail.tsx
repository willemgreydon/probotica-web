'use client';

import type { BotCategory } from '@/features/bots/lib/bot-types';

const CATEGORY_META: Record<BotCategory | 'all', { label: string; color: string }> = {
  all:          { label: 'All',          color: 'var(--foreground)' },
  sales:        { label: 'Sales',        color: 'var(--neon-lime)' },
  ux:           { label: 'UX',           color: 'var(--neon-cyan)' },
  content:      { label: 'Content',      color: 'var(--secondary)' },
  marketing:    { label: 'Marketing',    color: 'var(--accent)' },
  'real-estate':{ label: 'Real Estate',  color: 'var(--neon-orange)' },
  development:  { label: 'Dev',          color: 'var(--primary)' },
  learning:     { label: 'Learning',     color: 'var(--neon-violet)' },
  automation:   { label: 'Automation',   color: 'var(--neon-cyan)' },
  research:     { label: 'Research',     color: 'var(--secondary)' },
  support:      { label: 'Support',      color: 'var(--neon-lime)' },
  strategy:     { label: 'Strategy',     color: 'var(--neon-orange)' },
  other:        { label: 'Other',        color: 'var(--muted-foreground)' },
};

interface BotCategoryRailProps {
  value: BotCategory | 'all';
  counts: Partial<Record<BotCategory, number>>;
  total: number;
  onChange: (value: BotCategory | 'all') => void;
}

export function BotCategoryRail({ value, counts, total, onChange }: BotCategoryRailProps) {
  const categories = Object.keys(CATEGORY_META) as Array<BotCategory | 'all'>;
  const activeCats = categories.filter((cat) => cat === 'all' || (counts[cat as BotCategory] ?? 0) > 0);

  return (
    <div style={{ overflowX: 'auto', paddingBottom: 4 }}>
      <div style={{ display: 'flex', gap: 4, minWidth: 'max-content' }}>
        {activeCats.map((cat) => {
          const meta = CATEGORY_META[cat];
          const count = cat === 'all' ? total : (counts[cat as BotCategory] ?? 0);
          const active = value === cat;

          return (
            <button
              key={cat}
              type="button"
              onClick={() => onChange(cat)}
              aria-pressed={active}
              style={{
                padding: '4px 9px',
                borderRadius: 'var(--radius-sm)',
                border: `1px solid ${active ? meta.color : 'var(--panel-border)'}`,
                background: active ? `color-mix(in oklab, ${meta.color}, transparent 85%)` : 'transparent',
                color: active ? meta.color : 'var(--muted-foreground)',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.62rem',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                cursor: 'none',
                transition: 'all 140ms ease',
                whiteSpace: 'nowrap',
                display: 'flex',
                alignItems: 'center',
                gap: 5,
              }}
            >
              {meta.label}
              <span style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.58rem',
                opacity: 0.7,
                background: active ? `color-mix(in oklab, ${meta.color}, transparent 75%)` : 'var(--panel-inset)',
                padding: '0 4px',
                borderRadius: 3,
              }}>
                {count}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
