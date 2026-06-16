'use client';

import { CheckCircle2, Circle } from 'lucide-react';
import { useKnowledgeProgress } from '../lib/knowledge-progress';

interface ArticleCompleteButtonProps {
  articleSlug: string;
  /** Slugs of the learning paths that contain this article. */
  pathSlugs: string[];
  accentColor: string;
}

/**
 * "Mark as complete" toggle shown on an article. Marks the article done across
 * every journey it belongs to, so path progress updates everywhere at once.
 */
export function ArticleCompleteButton({ articleSlug, pathSlugs, accentColor }: ArticleCompleteButtonProps) {
  const { hydrated, isStepDone, markArticleInPaths } = useKnowledgeProgress();

  if (pathSlugs.length === 0) return null;

  const done = hydrated && pathSlugs.some((p) => isStepDone(p, articleSlug));

  return (
    <div
      style={{
        marginTop: '2.5rem',
        padding: '18px 20px',
        borderRadius: '1.5rem',
        border: `1px solid ${done ? `${accentColor}45` : 'var(--hud-border)'}`,
        background: done ? `${accentColor}0d` : 'var(--command-surface)',
        display: 'flex',
        alignItems: 'center',
        gap: 14,
        flexWrap: 'wrap',
      }}
    >
      <div style={{ flex: 1, minWidth: 200 }}>
        <p style={{ margin: 0, fontWeight: 800, color: 'var(--foreground)' }}>
          {done ? 'Completed' : 'Finished reading?'}
        </p>
        <p style={{ margin: '2px 0 0', fontSize: '.82rem', color: 'var(--muted-foreground)' }}>
          {done
            ? 'This step counts toward your journeys. You can undo it anytime.'
            : 'Mark it complete to track progress across your learning journeys.'}
        </p>
      </div>
      <button
        type="button"
        onClick={() => markArticleInPaths(pathSlugs, articleSlug, !done)}
        className={`btn focus-ring ${done ? '' : 'btn-primary'}`}
        style={{ minHeight: 44, gap: 8 }}
        aria-pressed={done}
      >
        {done ? <CheckCircle2 size={16} aria-hidden /> : <Circle size={16} aria-hidden />}
        {done ? 'Completed' : 'Mark as complete'}
      </button>
    </div>
  );
}
