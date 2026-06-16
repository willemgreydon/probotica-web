import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { botScenarios } from '@/features/bots/data/bot-scenarios';
import { importedBots } from '@/features/bots/data/imported-bots.server';
import { toPublicBots } from '@/features/bots/data/public-bots';
import { workflowTemplates } from '@/features/workflows/data/workflow-templates';

export function generateStaticParams() {
  return botScenarios.map((s) => ({ scenarioId: s.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ scenarioId: string }> }): Promise<Metadata> {
  const { scenarioId } = await params;
  const scenario = botScenarios.find((s) => s.id === scenarioId);
  if (!scenario) return {};
  return {
    title: `${scenario.label} | Scenarios | ProBotica`,
    description: `Run the ${scenario.label} scenario — ${scenario.prompt.slice(0, 120)}`,
  };
}

const RISK_COLORS: Record<string, string> = {
  low: 'var(--status-active)',
  medium: 'var(--status-warn)',
  high: 'var(--status-error)',
};

export default async function ScenarioDetailPage({ params }: { params: Promise<{ scenarioId: string }> }) {
  const { scenarioId } = await params;
  const scenario = botScenarios.find((s) => s.id === scenarioId);
  if (!scenario) notFound();

  const allBots = toPublicBots(importedBots);
  const matchingBots = allBots.filter(
    (b) => b.category === scenario.categoryHint && b.status === 'active'
  ).slice(0, 6);

  const relatedWorkflows = workflowTemplates.filter(
    (w) => w.steps.some((s) => s.scenarioId === scenario.id)
  );

  const otherScenarios = botScenarios
    .filter((s) => s.id !== scenario.id && s.categoryHint === scenario.categoryHint)
    .slice(0, 4);

  return (
    <div className="container-x py-8">
      {/* Hero */}
      <div style={{
        position: 'relative', overflow: 'hidden',
        border: '1px solid var(--panel-border)', borderRadius: 'var(--radius-xl)',
        marginBottom: 24,
        background: `radial-gradient(ellipse 55% 60% at 90% 0%, color-mix(in oklab, var(--secondary), transparent 86%) 0%, transparent 50%),
                     var(--panel-bg)`,
      }}>
        <div className="hud-grid" style={{ position: 'absolute', inset: 0, opacity: 0.2, pointerEvents: 'none' }} />
        <div style={{ position: 'relative', padding: 'clamp(24px, 4vw, 48px)' }}>
          <Link href="/bots" style={{
            display: 'inline-flex', alignItems: 'center', gap: 6, textDecoration: 'none',
            marginBottom: 24, fontFamily: 'var(--font-mono)', fontSize: '0.62rem',
            letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--muted-foreground)',
          }}>
            <svg width="12" height="12" viewBox="0 0 14 14" fill="none" aria-hidden>
              <path d="M9 2L4 7l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Bot Lab
          </Link>

          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-start', gap: 16, marginBottom: 16 }}>
            <span className="mono-chip" style={{ textTransform: 'capitalize' }}>{scenario.categoryHint}</span>
            <span className="mono-chip" style={{ color: RISK_COLORS[scenario.riskLevel], borderColor: `color-mix(in oklab, ${RISK_COLORS[scenario.riskLevel]}, transparent 55%)` }}>
              {scenario.riskLevel} risk
            </span>
            <span className="mono-chip" style={{ textTransform: 'capitalize' }}>{scenario.expectedOutputMode} output</span>
          </div>

          <h1 style={{
            fontFamily: 'var(--font-display)', fontSize: 'clamp(1.5rem, 4vw, 2.6rem)',
            fontWeight: 700, letterSpacing: '-0.03em',
            lineHeight: 1.1, marginBottom: 14, color: 'var(--foreground)',
          }}>
            {scenario.label}
          </h1>
          <p style={{ fontSize: '0.95rem', lineHeight: 1.7, color: 'var(--muted-foreground)', maxWidth: 580 }}>
            {scenario.prompt}
          </p>

          {scenario.recommendedTags.length > 0 && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 18 }}>
              {scenario.recommendedTags.map((tag) => (
                <span key={tag} style={{
                  padding: '3px 10px', borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--panel-border)', background: 'var(--panel-inset)',
                  fontFamily: 'var(--font-mono)', fontSize: '0.65rem',
                  letterSpacing: '0.1em', color: 'var(--muted-foreground)',
                }}>{tag}</span>
              ))}
            </div>
          )}

          <div style={{ display: 'flex', gap: 10, marginTop: 20, paddingTop: 18, borderTop: '1px solid var(--panel-border)', flexWrap: 'wrap' }}>
            <Link href="/workspace" className="btn btn-primary" style={{ fontSize: '0.82rem' }}>
              ▶ Run in Workspace
            </Link>
            <Link href={`/categories/${scenario.categoryHint}`} className="btn" style={{ fontSize: '0.82rem', textTransform: 'capitalize' }}>
              {scenario.categoryHint} Category
            </Link>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Prompt Panel */}
          <div style={{ border: '1px solid var(--panel-border)', borderRadius: 'var(--radius-lg)', background: 'var(--panel-bg)', overflow: 'hidden' }}>
            <div style={{ padding: '10px 16px', borderBottom: '1px solid var(--panel-border)', background: 'var(--panel-inset)', display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--primary)', display: 'inline-block' }} />
              <span className="edge-label">Scenario Prompt</span>
            </div>
            <div style={{ padding: '16px' }}>
              <pre style={{
                margin: 0, padding: '14px 16px',
                borderRadius: 'var(--radius-md)',
                background: 'var(--panel-inset)',
                borderLeft: '3px solid var(--primary)',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.82rem', lineHeight: 1.65,
                color: 'var(--foreground)',
                whiteSpace: 'pre-wrap', wordBreak: 'break-word',
              }}>
                {scenario.prompt}
              </pre>
            </div>
          </div>

          {/* Compatible bots */}
          {matchingBots.length > 0 && (
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14, borderBottom: '1px solid var(--panel-border)', paddingBottom: 10 }}>
                <span className="edge-label">Compatible Bots</span>
                <span className="route-marker">{matchingBots.length} active</span>
              </div>
              <div style={{ display: 'grid', gap: 10, gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))' }}>
                {matchingBots.map((bot) => (
                  <Link key={bot.slug} href={`/bots/${bot.slug}`} className="hud-link-card">
                    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 8 }}>
                      <p style={{ fontWeight: 700, fontSize: '0.88rem', color: 'var(--foreground)' }}>{bot.name}</p>
                      <span style={{ width: 6, height: 6, borderRadius: '50%', flexShrink: 0, marginTop: 4, background: 'var(--neon-lime)' }} />
                    </div>
                    <p style={{ fontSize: '0.76rem', color: 'var(--muted-foreground)', lineHeight: 1.45 }}>
                      {bot.description.slice(0, 90)}{bot.description.length > 90 ? '…' : ''}
                    </p>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--primary)', marginTop: 2 }}>
                      Open Bot →
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Workflows using this scenario */}
          {relatedWorkflows.length > 0 && (
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14, borderBottom: '1px solid var(--panel-border)', paddingBottom: 10 }}>
                <span className="edge-label">Workflows Using This Scenario</span>
                <span className="route-marker">{relatedWorkflows.length}</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {relatedWorkflows.map((w) => (
                  <Link key={w.id} href={`/workflows/${w.id}`} className="hud-row-card">
                    <div>
                      <p style={{ fontWeight: 700, fontSize: '0.88rem', color: 'var(--foreground)', marginBottom: 4 }}>{w.title}</p>
                      <span className="edge-label">{w.steps.length} steps · {w.estimatedDurationMin} min</span>
                    </div>
                    <span className="mono-chip" style={{ textTransform: 'capitalize', flexShrink: 0 }}>{w.category}</span>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {/* Telemetry */}
          <div className="telemetry-panel">
            {[
              { key: 'Category', val: scenario.categoryHint, style: { color: 'var(--primary)', textTransform: 'capitalize' as const } },
              { key: 'Risk Level', val: scenario.riskLevel, style: { color: RISK_COLORS[scenario.riskLevel], textTransform: 'capitalize' as const } },
              { key: 'Output Mode', val: scenario.expectedOutputMode, style: { textTransform: 'capitalize' as const } },
              { key: 'Compatible Bots', val: String(matchingBots.length), style: {} },
              { key: 'In Workflows', val: String(relatedWorkflows.length), style: {} },
            ].map(({ key, val, style }) => (
              <div key={key} className="telemetry-row">
                <span className="telemetry-key">{key}</span>
                <span className="telemetry-val" style={style}>{val}</span>
              </div>
            ))}
          </div>

          {/* Other scenarios */}
          {otherScenarios.length > 0 && (
            <div style={{ border: '1px solid var(--panel-border)', borderRadius: 'var(--radius-lg)', background: 'var(--panel-bg)', overflow: 'hidden' }}>
              <div style={{ padding: '10px 14px', borderBottom: '1px solid var(--panel-border)', background: 'var(--panel-inset)' }}>
                <span className="edge-label">Related Scenarios</span>
              </div>
              <div style={{ padding: '8px' }}>
                {otherScenarios.map((s) => (
                  <Link key={s.id} href={`/scenarios/${s.id}`} className="hud-nav-item">
                    <span style={{ width: 6, height: 6, borderRadius: '50%', flexShrink: 0, marginTop: 5, background: RISK_COLORS[s.riskLevel] }} />
                    <div>
                      <p style={{ fontSize: '0.82rem', color: 'var(--foreground)', fontWeight: 600 }}>{s.label}</p>
                      <p className="edge-label" style={{ marginTop: 2, textTransform: 'capitalize' }}>{s.riskLevel} risk</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          <div style={{ border: '1px solid var(--panel-border)', borderRadius: 'var(--radius-lg)', background: 'var(--panel-bg)', padding: '16px', textAlign: 'center' }}>
            <Link href="/bots" style={{
              fontFamily: 'var(--font-mono)', fontSize: '0.68rem',
              letterSpacing: '0.14em', textTransform: 'uppercase',
              color: 'var(--primary)', textDecoration: 'none',
            }}>
              All Scenarios in Bot Lab →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
