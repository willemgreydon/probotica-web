import type { Difficulty } from '../lib/knowledge-types';
import { difficultyConfig } from '../lib/knowledge-utils';

interface DifficultyBadgeProps {
  difficulty: Difficulty;
  size?: 'sm' | 'md';
}

export function DifficultyBadge({ difficulty, size = 'md' }: DifficultyBadgeProps) {
  const cfg = difficultyConfig[difficulty];
  const fontSize = size === 'sm' ? '.5625rem' : '.625rem';
  const padding  = size === 'sm' ? '2px 8px'  : '3px 10px';

  return (
    <span
      style={{
        display:       'inline-flex',
        alignItems:    'center',
        gap:           '5px',
        borderRadius:  '999px',
        border:        `1px solid ${cfg.color}30`,
        background:    cfg.bg,
        color:         cfg.color,
        fontSize,
        fontWeight:    700,
        letterSpacing: '.22em',
        textTransform: 'uppercase',
        padding,
        whiteSpace:    'nowrap',
      }}
    >
      <span
        style={{
          width:        5,
          height:       5,
          borderRadius: '50%',
          background:   cfg.color,
          flexShrink:   0,
        }}
      />
      {cfg.label}
    </span>
  );
}
