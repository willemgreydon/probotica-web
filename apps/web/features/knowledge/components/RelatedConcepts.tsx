import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import type { KnowledgeArticle } from '../lib/knowledge-types';
import { DifficultyBadge } from './DifficultyBadge';
import { readingTimeLabel } from '../lib/knowledge-utils';
import { topicBySlug } from '../data/knowledge-topics';

interface RelatedConceptsProps {
  articles: KnowledgeArticle[];
  title?: string;
}

export function RelatedConcepts({ articles, title = 'Related Concepts' }: RelatedConceptsProps) {
  if (articles.length === 0) return null;

  return (
    <aside>
      <h3
        style={{
          fontSize:      '.5625rem',
          fontWeight:    700,
          letterSpacing: '.4em',
          textTransform: 'uppercase',
          color:         'rgba(220,229,213,.35)',
          marginBottom:  '14px',
        }}
      >
        {title}
      </h3>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {articles.map(article => {
          const topic = topicBySlug[article.category];
          const accentColor = topic?.accentColor ?? '#b9ff4a';

          return (
            <Link
              key={article.slug}
              href={`/knowledge/${article.slug}`}
              style={{ textDecoration: 'none' }}
            >
              <div
                className="group"
                style={{
                  padding:      '14px 16px',
                  borderRadius: '1.25rem',
                  border:       '1px solid rgba(231,239,225,.08)',
                  background:   'rgba(231,239,225,.03)',
                  transition:   'border-color 200ms ease, background 200ms ease',
                  cursor:       'none',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 8 }}>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <span
                      style={{
                        display:       'block',
                        fontSize:      '.5rem',
                        fontWeight:    700,
                        letterSpacing: '.3em',
                        textTransform: 'uppercase',
                        color:         accentColor,
                        opacity:       .7,
                        marginBottom:  '4px',
                      }}
                    >
                      {topic?.shortTitle}
                    </span>
                    <h4
                      style={{
                        fontSize:      '.9375rem',
                        fontWeight:    800,
                        letterSpacing: '-.02em',
                        lineHeight:    1.3,
                        color:         'var(--color-fog)',
                        margin:        0,
                        whiteSpace:    'nowrap',
                        overflow:      'hidden',
                        textOverflow:  'ellipsis',
                      }}
                    >
                      {article.title}
                    </h4>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 8 }}>
                      <DifficultyBadge difficulty={article.difficulty} size="sm" />
                      <span style={{ fontSize: '.6rem', color: 'rgba(220,229,213,.3)' }}>
                        {readingTimeLabel(article.readingTime)}
                      </span>
                    </div>
                  </div>
                  <ArrowRight size={14} style={{ color: 'rgba(220,229,213,.25)', flexShrink: 0, marginTop: 2 }} />
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </aside>
  );
}
