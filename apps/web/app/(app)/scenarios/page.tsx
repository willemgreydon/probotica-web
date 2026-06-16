import type { Metadata } from 'next';
import Link from 'next/link';
import { botScenarios } from '@/features/bots/data/bot-scenarios';

export const metadata: Metadata = {
  title: 'Scenarios | ProBotica',
  description:
    'Worked, end-to-end AI scenarios — ready-made prompts you can run against compatible bots and chain into workflows.',
};

const RISK_COLORS: Record<string, string> = {
  low: 'var(--status-active)',
  medium: 'var(--status-warn)',
  high: 'var(--status-error)',
};

export default function ScenariosIndexPage() {
  // Group by category for scannable structure.
  const categories = Array.from(new Set(botScenarios.map((s) => s.categoryHint))).sort();

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
          background: `radial-gradient(ellipse 55% 60% at 90% 0%, color-mix(in oklab, var(--secondary), transparent 86%) 0%, transparent 50%), var(--panel-bg)`,
        }}
      >
        <div className="hud-grid" style={{ position: 'absolute', inset: 0, opacity: 0.2, pointerEvents: 'none' }} />
        <div style={{ position: 'relative', padding: 'clamp(24px, 4vw, 48px)' }}>
          <span className="edge-label">Scenario Library</span>
          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.6rem, 4vw, 2.6rem)',
              fontWeight: 700,
              letterSpacing: '-0.03em',
                            lineHeight: 1.1,
              margin: '12px 0 12px',
              color: 'var(--foreground)',
            }}
          >
            Run a scenario end-to-end
          </h1>
          <p style={{ fontSize: '0.95rem', lineHeight: 1.7, color: 'var(--muted-foreground)', maxWidth: 600 }}>
            Each scenario is a ready-made prompt with a recommended category, risk profile and output mode. Open one to
            see compatible bots and the workflows that use it.
          </p>
          <div style={{ display: 'flex', gap: 14, marginTop: 18, flexWrap: 'wrap' }}>
            <span className="route-marker">{botScenarios.length} scenarios</span>
            <span className="route-marker">{categories.length} categories</span>
          </div>
        </div>
      </div>

      {/* Grouped scenario grid */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
        {categories.map((cat) => {
          const items = botScenarios.filter((s) => s.categoryHint === cat);
          return (
            <section key={cat} aria-label={`${cat} scenarios`}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  marginBottom: 14,
                  borderBottom: '1px solid var(--panel-border)',
                  paddingBottom: 10,
                }}
              >
                <span className="edge-label" style={{ textTransform: 'capitalize' }}>{cat}</span>
                <span className="route-marker">{items.length}</span>
              </div>
              <div style={{ display: 'grid', gap: 12, gridTemplateColumns: 'repeat(auto-fill, minmax(min(300px, 100%), 1fr))' }}>
                {items.map((s) => (
                  <Link key={s.id} href={`/scenarios/${s.id}`} className="hud-link-card">
                    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 8 }}>
                      <p style={{ fontWeight: 700, fontSize: '0.92rem', color: 'var(--foreground)' }}>{s.label}</p>
                      <span
                        className="mono-chip"
                        style={{
                          flexShrink: 0,
                          color: RISK_COLORS[s.riskLevel],
                          borderColor: `color-mix(in oklab, ${RISK_COLORS[s.riskLevel]}, transparent 55%)`,
                        }}
                      >
                        {s.riskLevel}
                      </span>
                    </div>
                    <p style={{ fontSize: '0.78rem', color: 'var(--muted-foreground)', lineHeight: 1.5, marginTop: 6 }}>
                      {s.prompt.slice(0, 120)}{s.prompt.length > 120 ? '…' : ''}
                    </p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, marginTop: 10 }}>
                      <span className="edge-label" style={{ textTransform: 'capitalize' }}>{s.expectedOutputMode} output</span>
                    </div>
                    <span
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.6rem',
                        letterSpacing: '0.14em',
                        textTransform: 'uppercase',
                        color: 'var(--primary)',
                        marginTop: 8,
                        display: 'inline-block',
                      }}
                    >
                      Open scenario →
                    </span>
                  </Link>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
