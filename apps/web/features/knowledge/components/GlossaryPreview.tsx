import type { GlossaryTerm } from '../lib/knowledge-types';
import { DifficultyBadge } from './DifficultyBadge';

interface GlossaryPreviewProps {
  terms: GlossaryTerm[];
  title?: string;
}

export function GlossaryPreview({ terms, title = 'Key Terms' }: GlossaryPreviewProps) {
  if (terms.length === 0) return null;

  return (
    <div
      style={{
        padding:      '24px',
        borderRadius: '1.75rem',
        border:       '1px solid rgba(231,239,225,.08)',
        background:   'rgba(231,239,225,.03)',
        backdropFilter: 'blur(16px)',
      }}
    >
      <h3
        style={{
          fontSize:      '.5625rem',
          fontWeight:    700,
          letterSpacing: '.4em',
          textTransform: 'uppercase',
          color:         'rgba(220,229,213,.35)',
          marginBottom:  '16px',
        }}
      >
        {title}
      </h3>

      <dl style={{ display: 'flex', flexDirection: 'column', gap: '14px', margin: 0 }}>
        {terms.map(term => (
          <div
            key={term.slug}
            style={{
              paddingBottom: '14px',
              borderBottom:  '1px solid rgba(231,239,225,.06)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '5px' }}>
              <dt
                style={{
                  fontSize:      '.9375rem',
                  fontWeight:    800,
                  letterSpacing: '-.01em',
                  color:         'var(--color-fog)',
                }}
              >
                {term.term}
              </dt>
              <DifficultyBadge difficulty={term.difficulty} size="sm" />
            </div>
            <dd
              style={{
                margin:     0,
                fontSize:   '.875rem',
                lineHeight: 1.65,
                color:      'rgba(220,229,213,.52)',
              }}
            >
              {term.shortDefinition}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
