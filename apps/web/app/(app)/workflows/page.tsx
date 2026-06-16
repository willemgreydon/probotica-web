import type { Metadata } from 'next';
import Link from 'next/link';
import { workflowTemplates } from '@/features/workflows/data/workflow-templates';

export const metadata: Metadata = {
  title: 'Workflows | ProBotica',
  description:
    'Reusable multi-agent workflow templates — chain bots across intake, analysis, execution and review, then run them in your workspace.',
};

const COMPLEXITY_COLORS: Record<string, string> = {
  low: 'var(--status-active)',
  medium: 'var(--status-warn)',
  high: 'var(--status-error)',
};

export default function WorkflowsIndexPage() {
  return (
    <div className="container-x py-8">
      {/* Hero */}
      <div
        style={{
          position: 'relative',
          overflow: 'hidden',
          border: '1px solid var(--panel-border)',
          borderRadius: 'var(--radius-xl)',
          marginBottom: 24,
          background: `radial-gradient(ellipse 55% 60% at 90% 0%, color-mix(in oklab, var(--accent), transparent 86%) 0%, transparent 50%), var(--panel-bg)`,
        }}
      >
        <div className="hud-grid" style={{ position: 'absolute', inset: 0, opacity: 0.2, pointerEvents: 'none' }} />
        <div style={{ position: 'relative', padding: 'clamp(24px, 4vw, 48px)' }}>
          <span className="edge-label">Workflow Templates</span>
          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.6rem, 4vw, 2.6rem)',
              fontWeight: 700,
              letterSpacing: '-0.03em',
              textTransform: 'uppercase',
              lineHeight: 1.1,
              margin: '12px 0 12px',
              color: 'var(--foreground)',
            }}
          >
            Chain bots into pipelines
          </h1>
          <p style={{ fontSize: '0.95rem', lineHeight: 1.7, color: 'var(--muted-foreground)', maxWidth: 600 }}>
            Pre-built multi-agent workflows across intake → analysis → execution → review. Open one to inspect its steps,
            or load it into your workspace to run and customise.
          </p>
          <div style={{ display: 'flex', gap: 14, marginTop: 18, flexWrap: 'wrap' }}>
            <span className="route-marker">{workflowTemplates.length} templates</span>
            <Link href="/workspace" className="btn btn-primary" style={{ fontSize: '0.8rem' }}>Open Workspace</Link>
          </div>
        </div>
      </div>

      {/* Template grid */}
      <div style={{ display: 'grid', gap: 14, gridTemplateColumns: 'repeat(auto-fill, minmax(min(320px, 100%), 1fr))' }}>
        {workflowTemplates.map((w) => (
          <Link key={w.id} href={`/workflows/${w.id}`} className="hud-link-card">
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 8 }}>
              <p style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--foreground)' }}>{w.title}</p>
              {w.spotlight && (
                <span className="mono-chip" style={{ flexShrink: 0, color: 'var(--primary)', borderColor: 'color-mix(in oklab, var(--primary), transparent 55%)' }}>
                  spotlight
                </span>
              )}
            </div>
            <p style={{ fontSize: '0.8rem', color: 'var(--muted-foreground)', lineHeight: 1.5, marginTop: 6 }}>
              {w.description}
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 12, alignItems: 'center' }}>
              <span className="mono-chip" style={{ textTransform: 'capitalize' }}>{w.category}</span>
              <span
                className="mono-chip"
                style={{
                  color: COMPLEXITY_COLORS[w.runtimeComplexity],
                  borderColor: `color-mix(in oklab, ${COMPLEXITY_COLORS[w.runtimeComplexity]}, transparent 55%)`,
                }}
              >
                {w.runtimeComplexity}
              </span>
              <span className="edge-label">{w.steps.length} steps</span>
              <span className="edge-label">~{w.estimatedDurationMin} min</span>
            </div>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.6rem',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: 'var(--primary)',
                marginTop: 10,
                display: 'inline-block',
              }}
            >
              Open workflow →
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
