'use client';

import Link from 'next/link';
import { ArrowLeft, ArrowRight, CheckCircle2, Circle, Clock, Trophy, RotateCcw } from 'lucide-react';
import type { LearningPath, PathQuiz as PathQuizType } from '../lib/knowledge-types';
import { DifficultyBadge } from './DifficultyBadge';
import { PathQuiz } from './PathQuiz';
import { useKnowledgeProgress } from '../lib/knowledge-progress';
import { pathTotalMinutes } from '../lib/knowledge-utils';

interface PathJourneyProps {
  path: LearningPath;
  quiz?: PathQuizType;
}

export function PathJourney({ path, quiz }: PathJourneyProps) {
  const { hydrated, isStepDone, setStepDone, resetPath, getPathStats } = useKnowledgeProgress();
  const stats = getPathStats(path);
  const accent = path.accentColor;

  const totalMinutes = pathTotalMinutes(path);
  const hours = Math.floor(totalMinutes / 60);
  const mins = totalMinutes % 60;
  const timeLabel = hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;

  // Progress bar reflects steps + (if a quiz exists) the quiz as one extra unit.
  const totalUnits = path.steps.length + (quiz ? 1 : 0);
  const doneUnits = stats.stepsDone + (quiz && stats.quizPassed ? 1 : 0);
  const pct = totalUnits ? Math.round((doneUnits / totalUnits) * 100) : 0;

  return (
    <div style={{ width: 'min(1180px, calc(100% - 32px))', marginInline: 'auto', paddingTop: '5rem' }}>
      {/* Breadcrumb */}
      <nav style={{ display: 'flex', alignItems: 'center', gap: 8, paddingTop: '2rem', paddingBottom: '1rem' }}>
        <Link
          href="/knowledge"
          style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '.75rem', fontWeight: 600, color: 'var(--muted-foreground)', textDecoration: 'none' }}
        >
          <ArrowLeft size={12} /> Knowledge
        </Link>
        <span style={{ color: 'var(--muted-foreground)', fontSize: '.75rem' }}>/</span>
        <span style={{ fontSize: '.75rem', color: 'var(--muted-foreground)' }}>Journey</span>
      </nav>

      {/* Header */}
      <header
        style={{
          padding: 'clamp(20px, 3vw, 32px)',
          borderRadius: '1.75rem',
          border: `1px solid ${accent}25`,
          background: `linear-gradient(135deg, ${accent}0c, transparent)`,
          marginBottom: '2rem',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16, flexWrap: 'wrap' }}>
          <span style={{ fontSize: '2.5rem', lineHeight: 1 }} aria-hidden>{path.icon}</span>
          <div style={{ flex: 1, minWidth: 220 }}>
            <p style={{ fontSize: '.5625rem', fontWeight: 700, letterSpacing: '.4em', textTransform: 'uppercase', color: accent, opacity: 0.8, margin: '0 0 8px' }}>
              Structured Journey
            </p>
            <h1 style={{ fontSize: 'clamp(1.75rem, 4vw, 2.75rem)', fontWeight: 900, letterSpacing: '-.04em', lineHeight: 1.05, color: 'var(--foreground)', margin: '0 0 8px' }}>
              {path.title}
            </h1>
            <p style={{ fontSize: '1rem', color: 'var(--muted-foreground)', margin: 0, maxWidth: 640, lineHeight: 1.6 }}>
              {path.description}
            </p>
          </div>

          {/* Achieved badge */}
          {hydrated && stats.achieved && (
            <span
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 8, padding: '8px 14px', borderRadius: 999,
                border: '1px solid var(--success)', background: 'color-mix(in oklab, var(--success), transparent 85%)',
                color: 'var(--success)', fontSize: '.7rem', fontWeight: 800, letterSpacing: '.12em', textTransform: 'uppercase', whiteSpace: 'nowrap',
              }}
            >
              <Trophy size={14} aria-hidden /> Achieved
            </span>
          )}
        </div>

        {/* Meta */}
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center', marginTop: 18 }}>
          <DifficultyBadge difficulty={path.difficulty} size="md" />
          <span style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: '.75rem', color: 'var(--muted-foreground)' }}>
            <Clock size={12} /> {timeLabel}
          </span>
          <span style={{ fontSize: '.65rem', fontWeight: 700, letterSpacing: '.2em', textTransform: 'uppercase', color: 'var(--muted-foreground)' }}>
            {path.steps.length} steps{quiz ? ' + quiz' : ''}
          </span>
          <span style={{ fontSize: '.72rem', color: 'var(--telemetry-dim)' }}>For: {path.targetAudience}</span>
        </div>

        {/* Progress bar */}
        <div style={{ marginTop: 18 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
            <span style={{ fontSize: '.7rem', fontWeight: 700, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--muted-foreground)' }}>
              Progress
            </span>
            <span style={{ fontSize: '.7rem', fontWeight: 800, color: accent }}>{hydrated ? `${pct}%` : '—'}</span>
          </div>
          <div style={{ height: 8, borderRadius: 999, background: 'var(--runtime-track)', overflow: 'hidden' }} role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100}>
            <div style={{ height: '100%', width: `${hydrated ? pct : 0}%`, background: accent, borderRadius: 999, transition: 'width 320ms var(--ease-out-expo)' }} />
          </div>
        </div>

        {/* Redo */}
        {hydrated && stats.started && (
          <button
            type="button"
            onClick={() => resetPath(path)}
            className="btn focus-ring"
            style={{ marginTop: 16, minHeight: 38, gap: 6, fontSize: '.78rem' }}
          >
            <RotateCcw size={13} aria-hidden /> Reset journey
          </button>
        )}
      </header>

      {/* Steps */}
      <h2 style={{ fontSize: '1.25rem', fontWeight: 900, letterSpacing: '-.02em', color: 'var(--foreground)', margin: '0 0 16px' }}>
        Steps
      </h2>
      <ol style={{ listStyle: 'none', margin: '0 0 3rem', padding: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
        {path.steps.map((step) => {
          const done = hydrated && isStepDone(path.slug, step.articleSlug);
          return (
            <li
              key={step.order}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 14,
                padding: '14px 16px',
                borderRadius: 'var(--radius-lg)',
                border: `1px solid ${done ? `${accent}40` : 'var(--hud-border)'}`,
                background: done ? `${accent}0c` : 'var(--command-surface)',
              }}
            >
              <button
                type="button"
                onClick={() => setStepDone(path.slug, step.articleSlug, !done)}
                className="focus-ring"
                aria-pressed={done}
                aria-label={done ? `Mark "${step.title}" as not done` : `Mark "${step.title}" as done`}
                style={{ background: 'none', border: 'none', padding: 4, cursor: 'pointer', flexShrink: 0, color: done ? accent : 'var(--muted-foreground)' }}
              >
                {done ? <CheckCircle2 size={22} /> : <Circle size={22} />}
              </button>

              <Link
                href={`/knowledge/${step.articleSlug}`}
                style={{ flex: 1, minWidth: 0, textDecoration: 'none', display: 'flex', flexDirection: 'column', gap: 2 }}
              >
                <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '.65rem', color: accent, fontWeight: 700 }}>
                    {String(step.order).padStart(2, '0')}
                  </span>
                  <span style={{ fontSize: '.98rem', fontWeight: 700, color: 'var(--foreground)' }}>{step.title}</span>
                </span>
                <span style={{ fontSize: '.82rem', color: 'var(--muted-foreground)', lineHeight: 1.5 }}>{step.description}</span>
              </Link>

              <span style={{ display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
                <span style={{ fontSize: '.65rem', color: 'var(--telemetry-dim)', whiteSpace: 'nowrap' }}>{step.estimatedMinutes}m</span>
                <Link href={`/knowledge/${step.articleSlug}`} className="focus-ring" aria-label={`Read ${step.title}`} style={{ color: 'var(--muted-foreground)', display: 'inline-flex' }}>
                  <ArrowRight size={16} />
                </Link>
              </span>
            </li>
          );
        })}
      </ol>

      {/* Quiz */}
      {quiz && (
        <div style={{ marginBottom: '4rem' }}>
          <PathQuiz quiz={quiz} accentColor={accent} />
        </div>
      )}
    </div>
  );
}
