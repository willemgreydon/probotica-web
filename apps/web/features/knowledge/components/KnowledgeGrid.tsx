'use client';

import { motion, useReducedMotion } from 'framer-motion';
import type { KnowledgeArticle } from '../lib/knowledge-types';
import { KnowledgeCard } from './KnowledgeCard';
import { staggerContainer, staggerItem } from '@/lib/motion/transitions';

interface KnowledgeGridProps {
  articles: KnowledgeArticle[];
  variant?: 'default' | 'featured';
  columns?: 2 | 3 | 4;
  title?: string;
  subtitle?: string;
  showAll?: boolean;
}

export function KnowledgeGrid({
  articles,
  variant = 'default',
  columns = 3,
  title,
  subtitle,
}: KnowledgeGridProps) {
  // Framer Motion is JS-driven and ignores the CSS prefers-reduced-motion rule,
  // so disable the stagger animation explicitly when the user prefers reduced motion.
  const reduce = useReducedMotion();
  const gridCols = {
    2: 'repeat(auto-fill, minmax(min(100%, 520px), 1fr))',
    3: 'repeat(auto-fill, minmax(min(100%, 340px), 1fr))',
    4: 'repeat(auto-fill, minmax(min(100%, 260px), 1fr))',
  }[columns];

  return (
    <div>
      {(title || subtitle) && (
        <div style={{ marginBottom: '2rem' }}>
          {title && (
            <h2
              style={{
                fontSize:      'clamp(1.5rem, 3vw, 2.25rem)',
                fontWeight:    900,
                letterSpacing: '-.04em',
                lineHeight:    1.1,
                margin:        '0 0 8px',
              }}
            >
              {title}
            </h2>
          )}
          {subtitle && (
            <p style={{ fontSize: '1rem', color: 'color-mix(in oklab, var(--foreground), transparent 45%)', margin: 0, lineHeight: 1.7 }}>
              {subtitle}
            </p>
          )}
        </div>
      )}

      <motion.div
        variants={reduce ? undefined : staggerContainer(0.07)}
        initial={reduce ? false : 'hidden'}
        whileInView={reduce ? undefined : 'visible'}
        viewport={{ once: true, margin: '-60px' }}
        style={{
          display:             'grid',
          gridTemplateColumns: gridCols,
          gap:                 '16px',
        }}
      >
        {articles.map(article => (
          <motion.div key={article.slug} variants={reduce ? undefined : staggerItem}>
            <KnowledgeCard article={article} variant={variant} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
