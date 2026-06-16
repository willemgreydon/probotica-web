'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import type { KnowledgeTopic } from '../lib/knowledge-types';
import { knowledgeTopics } from '../data/knowledge-topics';

const TIER_LAYOUT: Record<string, { x: number; y: number }[]> = {
  foundational: [
    { x: 50,  y: 15 },
    { x: 20,  y: 35 },
    { x: 80,  y: 35 },
    { x: 50,  y: 55 },
  ],
  frontier: [
    { x: 25,  y: 72 },
    { x: 50,  y: 80 },
    { x: 75,  y: 72 },
  ],
  applied: [
    { x: 15,  y: 55 },
    { x: 85,  y: 55 },
    { x: 10,  y: 72 },
    { x: 90,  y: 72 },
    { x: 38,  y: 88 },
    { x: 62,  y: 88 },
  ],
  societal: [
    { x: 20,  y: 92 },
    { x: 50,  y: 95 },
    { x: 80,  y: 92 },
    { x: 50,  y: 8 },
  ],
};

function assignPositions(topics: KnowledgeTopic[]) {
  const tierCounts: Record<string, number> = {};
  return topics.map(topic => {
    const tier   = topic.tier;
    const idx    = tierCounts[tier] ?? 0;
    tierCounts[tier] = idx + 1;
    const positions = TIER_LAYOUT[tier] ?? [{ x: 50, y: 50 }];
    const pos = positions[idx % positions.length];
    return { topic, x: pos.x, y: pos.y };
  });
}

export function ConceptGraph() {
  const [hovered, setHovered] = useState<string | null>(null);
  const positioned = useMemo(() => assignPositions(knowledgeTopics), []);

  return (
    <div
      style={{
        position:     'relative',
        width:        '100%',
        paddingBottom: '70%',
        borderRadius: '2rem',
        border:       '1px solid rgba(231,239,225,.08)',
        background:   'rgba(7,9,7,.6)',
        backdropFilter: 'blur(20px)',
        overflow:     'hidden',
      }}
    >
      {/* SVG connection lines */}
      <svg
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
        aria-hidden
      >
        {positioned.map(({ topic, x, y }) =>
          topic.relatedSlugs.slice(0, 2).map(relSlug => {
            const target = positioned.find(p => p.topic.slug === relSlug);
            if (!target) return null;
            const isActive = hovered === topic.slug || hovered === relSlug;
            return (
              <line
                key={`${topic.slug}-${relSlug}`}
                x1={`${x}%`}
                y1={`${y}%`}
                x2={`${target.x}%`}
                y2={`${target.y}%`}
                stroke={isActive ? topic.accentColor : 'rgba(231,239,225,.07)'}
                strokeWidth={isActive ? 1.5 : 0.5}
                style={{ transition: 'stroke 200ms ease, stroke-width 200ms ease' }}
              />
            );
          })
        )}
      </svg>

      {/* Topic nodes */}
      {positioned.map(({ topic, x, y }) => {
        const isHovered = hovered === topic.slug;
        return (
          <Link
            key={topic.slug}
            href={`/knowledge/category/${topic.slug}`}
            style={{
              position:    'absolute',
              left:        `${x}%`,
              top:         `${y}%`,
              transform:   'translate(-50%, -50%)',
              textDecoration: 'none',
              zIndex:      isHovered ? 10 : 1,
            }}
            onMouseEnter={() => setHovered(topic.slug)}
            onMouseLeave={() => setHovered(null)}
          >
            <div
              style={{
                display:     'flex',
                flexDirection: 'column',
                alignItems:  'center',
                gap:         '4px',
                transition:  'transform 200ms ease',
                transform:   isHovered ? 'scale(1.15)' : 'scale(1)',
              }}
            >
              <div
                style={{
                  width:        isHovered ? '40px' : '32px',
                  height:       isHovered ? '40px' : '32px',
                  borderRadius: '50%',
                  border:       `1.5px solid ${isHovered ? topic.accentColor : topic.accentColor + '50'}`,
                  background:   isHovered ? `${topic.accentColor}20` : 'rgba(7,9,7,.8)',
                  display:      'grid',
                  placeItems:   'center',
                  fontSize:     isHovered ? '1rem' : '.875rem',
                  boxShadow:    isHovered ? `0 0 20px ${topic.accentColor}40` : 'none',
                  transition:   'all 200ms ease',
                  backdropFilter: 'blur(8px)',
                }}
              >
                {topic.icon}
              </div>
              {isHovered && (
                <span
                  style={{
                    fontSize:      '.5rem',
                    fontWeight:    700,
                    letterSpacing: '.15em',
                    textTransform: 'uppercase',
                    color:         topic.accentColor,
                    whiteSpace:    'nowrap',
                    background:    'rgba(7,9,7,.9)',
                    padding:       '2px 6px',
                    borderRadius:  '4px',
                    border:        `1px solid ${topic.accentColor}30`,
                  }}
                >
                  {topic.shortTitle}
                </span>
              )}
            </div>
          </Link>
        );
      })}

      {/* Legend */}
      <div
        style={{
          position:    'absolute',
          bottom:      12,
          left:        16,
          display:     'flex',
          gap:         '12px',
          flexWrap:    'wrap',
        }}
      >
        {(['foundational', 'applied', 'frontier', 'societal'] as const).map(tier => (
          <span
            key={tier}
            style={{
              fontSize:      '.5rem',
              fontWeight:    700,
              letterSpacing: '.2em',
              textTransform: 'uppercase',
              color:         'rgba(220,229,213,.3)',
            }}
          >
            {tier}
          </span>
        ))}
      </div>
    </div>
  );
}
