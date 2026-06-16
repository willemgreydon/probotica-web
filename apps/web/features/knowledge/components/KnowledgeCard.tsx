import Link from 'next/link';
import { ArrowRight, Clock } from 'lucide-react';
import type { KnowledgeArticle } from '../lib/knowledge-types';
import { DifficultyBadge } from './DifficultyBadge';
import { readingTimeLabel } from '../lib/knowledge-utils';
import { topicBySlug } from '../data/knowledge-topics';

interface KnowledgeCardProps {
  article: KnowledgeArticle;
  variant?: 'default' | 'compact' | 'featured';
}

export function KnowledgeCard({ article, variant = 'default' }: KnowledgeCardProps) {
  const topic = topicBySlug[article.category];
  const accentColor = topic?.accentColor ?? 'var(--primary)';

  if (variant === 'compact') {
    return (
      <Link href={`/knowledge/${article.slug}`} style={{ display: 'block', textDecoration: 'none' }}>
        <div className="card-lift surface-glass" style={{ padding: '16px 20px', borderRadius: '1.25rem', cursor: 'none' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
            <DifficultyBadge difficulty={article.difficulty} size="sm" />
            <span className="text-caption" style={{ display: 'flex', alignItems: 'center', gap: 4 }}><Clock size={10} />{readingTimeLabel(article.readingTime)}</span>
          </div>
          <h4 className="text-body" style={{ fontWeight: 800, color: 'var(--foreground)', margin: 0 }}>{article.title}</h4>
        </div>
      </Link>
    );
  }

  if (variant === 'featured') {
    return (
      <Link href={`/knowledge/${article.slug}`} style={{ display: 'block', textDecoration: 'none' }}>
        <article className="card-lift surface-glass relative overflow-hidden" style={{ borderRadius: '2rem', padding: '32px', minHeight: '320px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', cursor: 'none' }}>
          <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse 80% 50% at 50% 0%, ${accentColor}1c, transparent)`, pointerEvents: 'none' }} />
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
              <span className="text-caption" style={{ color: accentColor }}>{topic?.shortTitle ?? article.category}</span>
              <span style={{ fontSize: '1.5rem', lineHeight: 1 }}>{topic?.icon}</span>
            </div>
            <span className="text-caption" style={{ color: accentColor, opacity: .8 }}>{article.heroLabel}</span>
            <h3 className="text-section" style={{ fontSize: 'clamp(1.25rem, 2vw, 1.625rem)', margin: '10px 0 0' }}>{article.title}</h3>
            <p className="text-body" style={{ marginTop: 12 }}>{article.excerpt.slice(0, 120)}...</p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 24 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <DifficultyBadge difficulty={article.difficulty} size="sm" />
              <span className="text-caption" style={{ display: 'flex', alignItems: 'center', gap: 4 }}><Clock size={11} />{readingTimeLabel(article.readingTime)}</span>
            </div>
            <ArrowRight size={16} style={{ color: accentColor }} />
          </div>
        </article>
      </Link>
    );
  }

  return (
    <Link href={`/knowledge/${article.slug}`} style={{ display: 'block', textDecoration: 'none' }}>
      <article className="card-lift surface-glass" style={{ overflow: 'hidden', borderRadius: '1.75rem', padding: '24px', cursor: 'none' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
          <span className="text-caption" style={{ color: accentColor }}>{topic?.shortTitle ?? article.category}</span>
          <span style={{ fontSize: '1.25rem' }}>{topic?.icon}</span>
        </div>
        <h3 className="text-section" style={{ fontSize: 'clamp(1rem, 1.8vw, 1.25rem)', margin: '0 0 10px' }}>{article.title}</h3>
        <p className="text-body" style={{ margin: '0 0 20px' }}>{article.excerpt.slice(0, 100)}...</p>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
          <DifficultyBadge difficulty={article.difficulty} size="sm" />
          <span className="text-caption" style={{ display: 'flex', alignItems: 'center', gap: 3 }}><Clock size={10} />{readingTimeLabel(article.readingTime)}</span>
          {article.tags.slice(0, 2).map((tag) => (
            <span key={tag} className="text-caption" style={{ padding: '2px 8px', border: '1px solid var(--border)', borderRadius: '999px' }}>{tag}</span>
          ))}
        </div>
      </article>
    </Link>
  );
}
