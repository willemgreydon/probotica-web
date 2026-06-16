'use client';

import Link from 'next/link';
import { useState } from 'react';
import type { PublicBotDefinition } from '@/features/bots/lib/bot-types';
import { getBotReadiness } from '@/features/bots/lib/bot-readiness';

interface BotCardProps {
  bot: PublicBotDefinition;
  selected: boolean;
  compareSelected: boolean;
  onSelect: (slug: string) => void;
  onToggleCompare: (slug: string) => void;
}

const CATEGORY_COLORS: Record<string, string> = {
  sales: 'var(--neon-lime)',
  ux: 'var(--neon-cyan)',
  content: 'var(--secondary)',
  marketing: 'var(--accent)',
  'real-estate': 'var(--neon-orange)',
  development: 'var(--primary)',
  learning: 'var(--neon-violet)',
  automation: 'var(--neon-cyan)',
  research: 'var(--secondary)',
  support: 'var(--neon-lime)',
  strategy: 'var(--neon-orange)',
  other: 'var(--muted-foreground)',
};

export function BotCard({ bot, selected, compareSelected, onSelect, onToggleCompare }: BotCardProps) {
  const readiness = getBotReadiness(bot);
  const [hovered, setHovered] = useState(false);
  const accentColor = CATEGORY_COLORS[bot.category] ?? 'var(--primary)';

  return (
    <article
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        border: `1px solid ${selected ? accentColor : hovered ? 'var(--panel-border-active)' : 'var(--panel-border)'}`,
        borderRadius: 'var(--radius-lg)',
        background: selected
          ? `color-mix(in oklab, ${accentColor}, var(--panel-bg) 92%)`
          : hovered
            ? 'var(--panel-inset)'
            : 'var(--panel-bg)',
        transition: 'border-color 160ms ease, background 160ms ease, box-shadow 160ms ease',
        boxShadow: selected ? `0 0 0 1px color-mix(in oklab, ${accentColor}, transparent 60%)` : hovered ? 'var(--shadow-sm)' : 'none',
        overflow: 'hidden',
        cursor: 'none',
        flexShrink: 0,
      }}
    >
      {/* Color accent top line */}
      <div style={{
        height: 2,
        background: selected || hovered ? accentColor : 'transparent',
        transition: 'background 200ms ease',
      }} />

      <button
        type="button"
        className="w-full text-left focus-ring"
        onClick={() => onSelect(bot.slug)}
        aria-pressed={selected}
        style={{ padding: '10px 12px', display: 'block', width: '100%', background: 'none', border: 'none', cursor: 'none' }}
      >
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 8 }}>
          <p style={{ fontWeight: 700, fontSize: '0.88rem', lineHeight: 1.3 }}>{bot.shortName}</p>
          <span
            className="route-marker"
            style={{ color: accentColor, flexShrink: 0, fontSize: '0.6rem' }}
          >
            {bot.category}
          </span>
        </div>
        <p style={{ fontSize: '0.76rem', color: 'var(--muted-foreground)', marginTop: 4, lineHeight: 1.45 }}>
          {bot.description.slice(0, 90)}{bot.description.length > 90 ? '…' : ''}
        </p>
      </button>

      {/* Status + readiness row */}
      <div style={{
        padding: '6px 12px',
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        borderTop: '1px solid var(--panel-border)',
        background: 'var(--panel-inset)',
      }}>
        <span style={{
          width: 5, height: 5, borderRadius: '50%',
          background: bot.status === 'active' ? 'var(--neon-lime)' : bot.status === 'draft' ? 'var(--warning)' : 'var(--muted-foreground)',
          flexShrink: 0,
        }} />
        <span className="edge-label">{bot.status}</span>
        <span className="edge-label" style={{ opacity: 0.4 }}>·</span>
        <span className="edge-label">{bot.outputMode}</span>

        {/* Readiness bar */}
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 5, justifyContent: 'flex-end' }}>
          <div style={{ width: 40, height: 2, borderRadius: 1, background: 'var(--panel-border)', overflow: 'hidden' }}>
            <div style={{
              height: '100%',
              width: `${readiness.score}%`,
              background: readiness.score > 80 ? 'var(--neon-lime)' : readiness.score > 50 ? 'var(--warning)' : 'var(--muted-foreground)',
              transition: 'width 400ms ease',
            }} />
          </div>
          <span className="edge-label">{readiness.score}%</span>
        </div>
      </div>

      {/* Actions */}
      <div style={{ padding: '8px 12px', display: 'flex', gap: 6 }}>
        <button
          type="button"
          className="btn"
          onClick={() => onToggleCompare(bot.slug)}
          style={{
            fontSize: '0.68rem',
            minHeight: 28,
            padding: '0 10px',
            borderColor: compareSelected ? 'var(--primary)' : undefined,
            color: compareSelected ? 'var(--primary)' : undefined,
          }}
        >
          {compareSelected ? '✓ In Compare' : 'Compare'}
        </button>
        <Link
          href={`/bots/${bot.slug}`}
          className="btn focus-ring"
          style={{ fontSize: '0.68rem', minHeight: 28, padding: '0 10px' }}
        >
          Open →
        </Link>
      </div>
    </article>
  );
}
