'use client';

import { Trophy } from 'lucide-react';
import type { LearningPath } from '../lib/knowledge-types';
import { useKnowledgeProgress } from '../lib/knowledge-progress';

/**
 * Compact live progress indicator for a learning path, used in rails/cards.
 * Renders nothing until hydrated (avoids SSR/client mismatch) and when the
 * journey hasn't been started.
 */
export function PathProgressBadge({ path }: { path: LearningPath }) {
  const { hydrated, getPathStats } = useKnowledgeProgress();
  if (!hydrated) return null;

  const stats = getPathStats(path);
  if (!stats.started) return null;

  if (stats.achieved) {
    return (
      <span
        style={{
          display: 'inline-flex', alignItems: 'center', gap: 5, padding: '2px 9px', borderRadius: 999,
          border: '1px solid var(--success)', background: 'color-mix(in oklab, var(--success), transparent 86%)',
          color: 'var(--success)', fontSize: '.55rem', fontWeight: 800, letterSpacing: '.14em', textTransform: 'uppercase', whiteSpace: 'nowrap',
        }}
      >
        <Trophy size={10} aria-hidden /> Achieved
      </span>
    );
  }

  return (
    <span
      style={{
        display: 'inline-flex', alignItems: 'center', gap: 4, padding: '2px 9px', borderRadius: 999,
        border: `1px solid ${path.accentColor}40`, background: `${path.accentColor}14`,
        color: path.accentColor, fontSize: '.55rem', fontWeight: 800, letterSpacing: '.1em', whiteSpace: 'nowrap',
      }}
    >
      {stats.stepsDone}/{stats.stepsTotal}
    </span>
  );
}
