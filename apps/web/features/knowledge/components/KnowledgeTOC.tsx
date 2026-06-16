'use client';

import { useState, useEffect, useRef } from 'react';
import type { KnowledgeArticle } from '../lib/knowledge-types';
import { buildTOC } from '../lib/knowledge-utils';

interface KnowledgeTOCProps {
  article: KnowledgeArticle;
}

export function KnowledgeTOC({ article }: KnowledgeTOCProps) {
  const toc = buildTOC(article);
  const [activeId, setActiveId] = useState<string>(toc[0]?.id ?? '');
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const headings = toc
      .map(item => document.getElementById(item.id))
      .filter((el): el is HTMLElement => el !== null);

    observerRef.current = new IntersectionObserver(
      entries => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
            break;
          }
        }
      },
      { rootMargin: '-20% 0px -70% 0px', threshold: 0 }
    );

    headings.forEach(h => observerRef.current?.observe(h));

    return () => observerRef.current?.disconnect();
  }, [article.slug]); // eslint-disable-line react-hooks/exhaustive-deps

  if (toc.length === 0) return null;

  return (
    <nav
      aria-label="Table of contents"
      style={{
        position:     'sticky',
        top:          '5.5rem',
        padding:      '20px',
        borderRadius: '1.5rem',
        border:       '1px solid rgba(231,239,225,.08)',
        background:   'rgba(231,239,225,.04)',
        backdropFilter: 'blur(16px)',
        maxHeight:    'calc(100dvh - 8rem)',
        overflowY:    'auto',
      }}
    >
      <p
        style={{
          fontSize:      '.5625rem',
          fontWeight:    700,
          letterSpacing: '.4em',
          textTransform: 'uppercase',
          color:         'rgba(220,229,213,.35)',
          marginBottom:  '14px',
        }}
      >
        On this page
      </p>

      <ol style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '2px' }}>
        {toc.map(item => {
          const isActive = activeId === item.id;
          return (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                style={{
                  display:        'block',
                  padding:        item.level === 3 ? '5px 8px 5px 20px' : '6px 8px',
                  borderRadius:   '8px',
                  fontSize:       item.level === 3 ? '.8125rem' : '.875rem',
                  fontWeight:     isActive ? 700 : 500,
                  lineHeight:     1.4,
                  color:          isActive ? 'var(--color-acid)' : 'rgba(220,229,213,.5)',
                  background:     isActive ? 'rgba(185,255,74,.07)' : 'transparent',
                  borderLeft:     isActive ? '2px solid var(--color-acid)' : '2px solid transparent',
                  textDecoration: 'none',
                  transition:     'color 150ms ease, background 150ms ease, border-color 150ms ease',
                }}
              >
                {item.heading}
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
