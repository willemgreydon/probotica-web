import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { workflowTemplates, workflowTemplateById } from '@/features/workflows/data/workflow-templates';
import { toPublicBots } from '@/features/bots/data/public-bots';
import { importedBots } from '@/features/bots/data/imported-bots.server';

export function generateStaticParams() {
  return workflowTemplates.map((w) => ({ id: w.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const w = workflowTemplateById[id];
  if (!w) return {};
  return {
    title: `${w.title} | Workflows | ProBotica`,
    description: w.description,
  };
}

const COMPLEXITY_COLORS: Record<string, string> = {
  low: 'var(--status-active)',
  medium: 'var(--status-warn)',
  high: 'var(--status-error)',
};

const LANE_LABELS: Record<string, string> = {
  intake: 'Intake',
  analysis: 'Analysis',
  execution: 'Execution',
  review: 'Review',
};

const LANE_ORDER = ['intake', 'analysis', 'execution', 'review'];

export default async function WorkflowDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const workflow = workflowTemplateById[id];
  if (!workflow) notFound();

  const allBots = toPublicBots(importedBots);
  const botMap = Object.fromEntries(allBots.map((b) => [b.slug, b]));

  const stepsByLane = LANE_ORDER.map((lane) => ({
    lane,
    steps: workflow.steps.filter((s) => s.lane === lane),
  })).filter((g) => g.steps.length > 0);

  const relatedWorkflows = workflowTemplates
    .filter((w) => w.id !== workflow.id && w.category === workflow.category)
    .slice(0, 3);

  return (
    <div className="shell-x py-8">
      {/* Hero */}
      <div
        style={{
          position: 'relative',
          overflow: 'hidden',
          border: '1px solid var(--panel-border)',
          borderRadius: 'var(--radius-xl)',
          marginBottom: 24,
          background: `radial-gradient(ellipse 55% 60% at 90% 0%, color-mix(in oklab, var(--accent), transparent 86%) 0%, transparent 50%),
                       radial-gradient(ellipse 40% 50% at 0% 90%, color-mix(in oklab, var(--neon-violet), transparent 92%) 0%, transparent 40%),
                       var(--panel-bg)`,
        }}
      >
        <div className="hud-grid" style={{ position: 'absolute', inset: 0, opacity: 0.2, pointerEvents: 'none' }} />
        <div style={{ position: 'relative', padding: 'clamp(24px, 4vw, 48px)' }}>
          <Link
            href="/marketplace"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              textDecoration: 'none', marginBottom: 24,
              fontFamily: 'var(--font-mono)', fontSize: '0.62rem',
              letterSpacing: '0.18em', textTransform: 'uppercase',
              color: 'var(--muted-foreground)',
            }}
          >
            <svg width="12" height="12" viewBox="0 0 14 14" fill="none" aria-hidden>
              <path d="M9 2L4 7l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Marketplace
          </Link>

          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-start', gap: 24, justifyContent: 'space-between' }}>
            <div style={{ maxWidth: 600, flex: '1 1 320px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16, flexWrap: 'wrap' }}>
                <span className="mono-chip" style={{ textTransform: 'capitalize' }}>{workflow.category}</span>
                <span
                  className="mono-chip"
                  style={{
                    color: COMPLEXITY_COLORS[workflow.runtimeComplexity],
                    borderColor: `color-mix(in oklab, ${COMPLEXITY_COLORS[workflow.runtimeComplexity]}, transparent 55%)`,
                  }}
                >
                  {workflow.runtimeComplexity} complexity
                </span>
              </div>
              <h1
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(1.5rem, 4vw, 2.6rem)',
                  fontWeight: 700,
                  letterSpacing: '-0.03em',
                  textTransform: 'uppercase',
                  lineHeight: 1.1,
                  marginBottom: 14,
                  color: 'var(--foreground)',
                }}
              >
                {workflow.title}
              </h1>
              <p style={{ fontSize: '0.95rem', lineHeight: 1.7, color: 'var(--muted-foreground)', maxWidth: 520 }}>
                {workflow.description}
              </p>

              {workflow.useCases.length > 0 && (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 18 }}>
                  {workflow.useCases.map((uc) => (
                    <span
                      key={uc}
                      style={{
                        padding: '3px 10px',
                        borderRadius: 'var(--radius-sm)',
                        border: '1px solid var(--panel-border)',
                        background: 'var(--panel-inset)',
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.65rem',
                        letterSpacing: '0.1em',
                        color: 'var(--muted-foreground)',
                      }}
                    >
                      {uc}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Stats panel */}
            <div style={{
              flexShrink: 0,
              minWidth: 200,
              border: '1px solid var(--panel-border)',
              borderRadius: 'var(--radius-lg)',
              background: 'var(--panel-inset)',
              overflow: 'hidden',
            }}>
              {[
                ['Duration', `${workflow.estimatedDurationMin} min`],
                ['Steps', String(workflow.steps.length)],
                ['Output', workflow.estimatedOutputMode],
                ['Workflows', String(workflow.workflowCount)],
              ].map(([k, v]) => (
                <div
                  key={k}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '10px 14px',
                    borderBottom: '1px solid var(--panel-border)',
                  }}
                >
                  <span className="edge-label">{k}</span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', fontWeight: 600, color: 'var(--foreground)', textTransform: 'capitalize' }}>{v}</span>
                </div>
              ))}
              <div style={{ padding: '12px 14px' }}>
                <Link
                  href="/workspace"
                  className="btn btn-primary"
                  style={{ width: '100%', justifyContent: 'center', fontSize: '0.8rem' }}
                >
                  Open in Workspace
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Topology */}
        <div className="lg:col-span-2 space-y-4">
          <h2 style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', letterSpacing: '0.28em', textTransform: 'uppercase', color: 'var(--muted-foreground)', marginBottom: 16, fontWeight: 700 }}>Execution Topology</h2>

          {stepsByLane.map(({ lane, steps }) => (
            <div key={lane} className="panel">
              <div className="panel-header">
                <div className="flex items-center gap-2">
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{ background: 'var(--runtime-pulse)' }}
                  />
                  <span className="text-xs font-semibold text-foreground uppercase tracking-wider">{LANE_LABELS[lane]}</span>
                  <span className="text-xs text-muted-foreground">({steps.length} step{steps.length !== 1 ? 's' : ''})</span>
                </div>
              </div>
              <div className="panel-body space-y-3">
                {steps.map((step, i) => {
                  const bot = botMap[step.botSlug];
                  return (
                    <div key={step.id} className="flex items-start gap-3">
                      <div
                        className="flex-shrink-0 w-6 h-6 rounded text-xs font-bold flex items-center justify-center"
                        style={{ background: 'var(--surface-3)', color: 'var(--accent)' }}
                      >
                        {i + 1}
                      </div>
                      <div className="flex-1 min-w-0">
                        {bot ? (
                          <div className="flex items-center gap-2 flex-wrap">
                            <Link
                              href={`/bots/${bot.slug}`}
                              className="text-sm font-medium text-foreground hover:text-accent transition-colors"
                            >
                              {bot.name}
                            </Link>
                            <span className="category-pill capitalize text-xs">{bot.category}</span>
                            <span
                              className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                              style={{
                                background: bot.status === 'active' ? 'var(--status-active)' : 'var(--status-warn)',
                              }}
                            />
                          </div>
                        ) : (
                          <span className="text-sm text-muted-foreground font-mono">{step.botSlug}</span>
                        )}
                        {bot && <p className="text-xs text-muted-foreground mt-0.5 text-clamp-2">{bot.description}</p>}
                        {step.scenarioId && (
                          <div className="mt-1 text-xs text-muted-foreground">
                            Scenario: <span className="text-foreground font-mono">{step.scenarioId}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}

          {/* Animated flow visualization */}
          <div className="panel">
            <div className="panel-header">
              <span className="text-xs font-semibold text-foreground uppercase tracking-wider">Execution Flow</span>
            </div>
            <div className="panel-body overflow-x-auto">
              <svg viewBox={`0 0 ${Math.max(workflow.steps.length * 120 + 40, 400)} 80`} className="w-full" style={{ minWidth: 360, height: 80 }}>
                {workflow.steps.map((step, i) => {
                  const x = 20 + i * 120;
                  const bot = botMap[step.botSlug];
                  const laneColor =
                    step.lane === 'intake' ? 'var(--accent)' :
                    step.lane === 'analysis' ? 'var(--status-warn)' :
                    step.lane === 'execution' ? 'var(--status-active)' :
                    'var(--muted-foreground)';
                  return (
                    <g key={step.id}>
                      {i > 0 && (
                        <line
                          x1={x - 20} y1={40} x2={x} y2={40}
                          stroke="var(--panel-border)" strokeWidth={1.5} strokeDasharray="4 3"
                        />
                      )}
                      <circle cx={x + 40} cy={40} r={18} fill="var(--surface-2)" stroke={laneColor} strokeWidth={1.5} />
                      <text x={x + 40} y={44} textAnchor="middle" fontSize={10} fill={laneColor} fontWeight="600">
                        {i + 1}
                      </text>
                      <text x={x + 40} y={68} textAnchor="middle" fontSize={8} fill="var(--muted-foreground)">
                        {LANE_LABELS[step.lane]}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Deploy CTA */}
          <div style={{
            border: '1px solid var(--panel-border-active)',
            borderRadius: 'var(--radius-lg)',
            background: 'color-mix(in oklab, var(--primary), transparent 94%)',
            padding: '20px',
          }}>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', letterSpacing: '0.24em', textTransform: 'uppercase', color: 'var(--primary)', marginBottom: 8 }}>
              Deploy Workflow
            </p>
            <p style={{ fontSize: '0.82rem', color: 'var(--muted-foreground)', marginBottom: 14, lineHeight: 1.5 }}>
              Launch this workflow in your workspace and start processing in seconds.
            </p>
            <Link href="/workspace" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
              Open in Workspace
            </Link>
          </div>

          {/* Bots in workflow */}
          {workflow.recommendedBotSlugs.length > 0 && (
            <div className="panel">
              <div className="panel-header">
                <span className="text-xs font-semibold text-foreground uppercase tracking-wider">Recommended Bots</span>
              </div>
              <div className="panel-body space-y-2">
                {workflow.recommendedBotSlugs.map((slug) => {
                  const bot = botMap[slug];
                  if (!bot) return null;
                  return (
                    <Link key={slug} href={`/bots/${bot.slug}`} className="flex items-center gap-2 group p-1.5 rounded hover:bg-surface-2 transition-colors">
                      <span
                        className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                        style={{ background: 'var(--status-active)' }}
                      />
                      <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors text-truncate">{bot.name}</span>
                    </Link>
                  );
                })}
              </div>
            </div>
          )}

          {/* Related workflows */}
          {relatedWorkflows.length > 0 && (
            <div className="panel">
              <div className="panel-header">
                <span className="text-xs font-semibold text-foreground uppercase tracking-wider">Related Workflows</span>
              </div>
              <div className="panel-body space-y-2">
                {relatedWorkflows.map((w) => (
                  <Link key={w.id} href={`/workflows/${w.id}`} className="block group">
                    <div className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">{w.title}</div>
                    <div className="text-xs text-muted-foreground mt-0.5">{w.estimatedDurationMin} min · {w.steps.length} steps</div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Telemetry */}
          <div className="telemetry-panel">
            <div className="telemetry-row">
              <span className="telemetry-key">Category</span>
              <span className="telemetry-val-accent capitalize">{workflow.category}</span>
            </div>
            <div className="telemetry-row">
              <span className="telemetry-key">Complexity</span>
              <span className="telemetry-val-warn capitalize">{workflow.runtimeComplexity}</span>
            </div>
            <div className="telemetry-row">
              <span className="telemetry-key">Steps</span>
              <span className="telemetry-val">{workflow.steps.length}</span>
            </div>
            <div className="telemetry-row">
              <span className="telemetry-key">Duration</span>
              <span className="telemetry-val">{workflow.estimatedDurationMin}m</span>
            </div>
            <div className="telemetry-row">
              <span className="telemetry-key">Output</span>
              <span className="telemetry-val capitalize">{workflow.estimatedOutputMode}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
