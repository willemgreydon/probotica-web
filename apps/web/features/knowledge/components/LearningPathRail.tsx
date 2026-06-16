import Link from 'next/link';
import { CheckCircle2, Circle, Clock, ArrowRight } from 'lucide-react';
import type { LearningPath } from '../lib/knowledge-types';
import { DifficultyBadge } from './DifficultyBadge';
import { PathProgressBadge } from './PathProgressBadge';
import { pathTotalMinutes } from '../lib/knowledge-utils';

interface LearningPathRailProps {
  paths: LearningPath[];
  currentArticleSlug?: string;
  compact?: boolean;
}

export function LearningPathRail({ paths, currentArticleSlug, compact = false }: LearningPathRailProps) {
  if (paths.length === 0) return null;

  if (compact) {
    return (
      <div
        style={{
          padding:      '20px',
          borderRadius: '1.5rem',
          border:       '1px solid rgba(185,255,74,.15)',
          background:   'rgba(185,255,74,.04)',
        }}
      >
        <p
          style={{
            fontSize:      '.5625rem',
            fontWeight:    700,
            letterSpacing: '.4em',
            textTransform: 'uppercase',
            color:         'var(--color-acid)',
            opacity:       .7,
            marginBottom:  12,
          }}
        >
          Part of {paths.length} path{paths.length !== 1 ? 's' : ''}
        </p>
        {paths.map(path => (
          <Link
            key={path.slug}
            href={`/knowledge/path/${path.slug}`}
            style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none', marginBottom: 8 }}
          >
            <span style={{ fontSize: '1.1rem' }}>{path.icon}</span>
            <span style={{ fontSize: '.875rem', fontWeight: 700, color: 'var(--color-fog)' }}>
              {path.title}
            </span>
            <PathProgressBadge path={path} />
            <ArrowRight size={13} style={{ color: 'color-mix(in oklab, var(--foreground), transparent 65%)', marginLeft: 'auto' }} />
          </Link>
        ))}
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {paths.map(path => {
        const totalMinutes = pathTotalMinutes(path);
        const hours = Math.floor(totalMinutes / 60);
        const mins  = totalMinutes % 60;
        const timeLabel = hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;

        return (
          <div
            key={path.slug}
            style={{
              padding:      '24px',
              borderRadius: '1.75rem',
              border:       `1px solid ${path.accentColor}25`,
              background:   `linear-gradient(135deg, ${path.accentColor}06, transparent)`,
              backdropFilter: 'blur(16px)',
            }}
          >
            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12, marginBottom: 16 }}>
              <span style={{ fontSize: '1.5rem', lineHeight: 1 }}>{path.icon}</span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap', marginBottom: 4 }}>
                  <Link
                    href={`/knowledge/path/${path.slug}`}
                    style={{
                      fontSize:      '1rem',
                      fontWeight:    900,
                      letterSpacing: '-.02em',
                      color:         'var(--color-fog)',
                      textDecoration: 'none',
                    }}
                  >
                    {path.title}
                  </Link>
                  <PathProgressBadge path={path} />
                </div>
                <p style={{ fontSize: '.8125rem', color: 'color-mix(in oklab, var(--foreground), transparent 50%)', margin: 0, lineHeight: 1.5 }}>
                  {path.subtitle}
                </p>
              </div>
            </div>

            {/* Meta */}
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 16 }}>
              <DifficultyBadge difficulty={path.difficulty} size="sm" />
              <span
                style={{
                  display:    'flex',
                  alignItems: 'center',
                  gap:        4,
                  fontSize:   '.6875rem',
                  color:      'color-mix(in oklab, var(--foreground), transparent 65%)',
                }}
              >
                <Clock size={11} />
                {timeLabel} total
              </span>
              <span
                style={{
                  fontSize:      '.6rem',
                  fontWeight:    700,
                  letterSpacing: '.2em',
                  textTransform: 'uppercase',
                  color:         'color-mix(in oklab, var(--foreground), transparent 72%)',
                }}
              >
                {path.steps.length} articles
              </span>
            </div>

            {/* Steps */}
            <ol style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '4px' }}>
              {path.steps.map(step => {
                const isCurrent = step.articleSlug === currentArticleSlug;
                return (
                  <li
                    key={step.order}
                    style={{
                      display:      'flex',
                      alignItems:   'center',
                      gap:          '10px',
                      padding:      '8px 10px',
                      borderRadius: '10px',
                      background:   isCurrent ? `${path.accentColor}12` : 'transparent',
                      border:       `1px solid ${isCurrent ? `${path.accentColor}30` : 'transparent'}`,
                    }}
                  >
                    {isCurrent
                      ? <CheckCircle2 size={14} style={{ color: path.accentColor, flexShrink: 0 }} />
                      : <Circle       size={14} style={{ color: 'color-mix(in oklab, var(--foreground), transparent 80%)', flexShrink: 0 }} />
                    }
                    <span
                      style={{
                        fontSize:   '.875rem',
                        fontWeight: isCurrent ? 700 : 500,
                        color:      isCurrent ? path.accentColor : 'color-mix(in oklab, var(--foreground), transparent 45%)',
                        lineHeight: 1.3,
                      }}
                    >
                      {step.title}
                    </span>
                    <span style={{ marginLeft: 'auto', fontSize: '.6rem', color: 'color-mix(in oklab, var(--foreground), transparent 75%)', whiteSpace: 'nowrap' }}>
                      {step.estimatedMinutes}m
                    </span>
                  </li>
                );
              })}
            </ol>

            {/* CTA */}
            <Link
              href={`/knowledge/path/${path.slug}`}
              style={{
                display:       'inline-flex',
                alignItems:    'center',
                gap:           6,
                marginTop:     16,
                fontSize:      '.75rem',
                fontWeight:    800,
                letterSpacing: '.04em',
                color:         path.accentColor,
                textDecoration: 'none',
              }}
            >
              Start journey <ArrowRight size={13} />
            </Link>
          </div>
        );
      })}
    </div>
  );
}
