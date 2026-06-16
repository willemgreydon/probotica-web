import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { importedBots } from '@/features/bots/data/imported-bots.server';
import { toPublicBots } from '@/features/bots/data/public-bots';
import { workflowTemplates } from '@/features/workflows/data/workflow-templates';
import type { BotCategory } from '@/features/bots/lib/bot-types';

const ALL_CATEGORIES: BotCategory[] = [
  'sales', 'ux', 'content', 'marketing', 'real-estate',
  'development', 'learning', 'automation', 'research', 'support', 'strategy', 'other',
];

export function generateStaticParams() {
  return ALL_CATEGORIES.map((category) => ({ category }));
}

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }): Promise<Metadata> {
  const { category } = await params;
  const label = category.charAt(0).toUpperCase() + category.slice(1).replace(/-/g, ' ');
  return {
    title: `${label} Bots | ProBotica`,
    description: `Explore AI bots and workflows in the ${label} category.`,
  };
}

const CATEGORY_COLORS: Record<string, string> = {
  sales: 'var(--neon-lime)', ux: 'var(--neon-cyan)', content: 'var(--secondary)',
  marketing: 'var(--accent)', 'real-estate': 'var(--neon-orange)', development: 'var(--primary)',
  learning: 'var(--neon-violet)', automation: 'var(--neon-cyan)', research: 'var(--secondary)',
  support: 'var(--neon-lime)', strategy: 'var(--neon-orange)', other: 'var(--muted-foreground)',
};

const CATEGORY_ICONS: Record<string, string> = {
  sales: '◈', ux: '⬡', content: '⬟', marketing: '◇',
  'real-estate': '▦', development: '⬢', learning: '◉',
  automation: '⊕', research: '◎', support: '◈',
  strategy: '▲', other: '●',
};

const CATEGORY_DESCRIPTIONS: Record<string, string> = {
  sales: 'Lead qualification, CRM automation, and pipeline acceleration bots.',
  ux: 'UX diagnostics, friction mapping, and onboarding analysis tools.',
  content: 'Content briefs, SEO strategies, and publication-ready deliverables.',
  marketing: 'Campaign planning, audience targeting, and conversion optimization.',
  'real-estate': 'Buyer and seller qualification, property matching, and agent handoff.',
  development: 'Code review, accessibility audits, and frontend quality assurance.',
  learning: 'Skill plans, training programs, and guided learning journeys.',
  automation: 'Process automation, workflow orchestration, and ops efficiency.',
  research: 'Synthesis, analysis, and research-to-insight pipelines.',
  support: 'Support triage, escalation handling, and response generation.',
  strategy: 'Strategic synthesis, cross-domain planning, and executive alignment.',
  other: 'Specialized and emerging AI operation modules.',
};

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  if (!ALL_CATEGORIES.includes(category as BotCategory)) notFound();

  const cat = category as BotCategory;
  const allBots = toPublicBots(importedBots);
  const bots = allBots.filter((b) => b.category === cat);
  const workflows = workflowTemplates.filter((w) => w.category === cat);

  const label = cat.charAt(0).toUpperCase() + cat.slice(1).replace(/-/g, ' ');
  const icon = CATEGORY_ICONS[cat] ?? '●';
  const description = CATEGORY_DESCRIPTIONS[cat] ?? `AI operations for the ${label} domain.`;
  const accentColor = CATEGORY_COLORS[cat] ?? 'var(--primary)';

  const activeBots = bots.filter((b) => b.status === 'active');
  const activeRatio = bots.length > 0 ? Math.round((activeBots.length / bots.length) * 100) : 0;
  const otherCategories = ALL_CATEGORIES.filter((c) => c !== cat).slice(0, 8);

  return (
    <div className="container-x py-8">

      {/* Hero */}
      <div style={{
        position: 'relative', overflow: 'hidden',
        border: '1px solid var(--panel-border)', borderRadius: 'var(--radius-xl)',
        marginBottom: 24,
        background: `radial-gradient(ellipse 55% 70% at 90% 0%, color-mix(in oklab, ${accentColor}, transparent 86%) 0%, transparent 50%),
                     radial-gradient(ellipse 40% 50% at 0% 100%, color-mix(in oklab, var(--neon-violet), transparent 92%) 0%, transparent 40%),
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

          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 20 }}>
            <div style={{
              flexShrink: 0, width: 56, height: 56, borderRadius: 'var(--radius-lg)',
              border: `1px solid color-mix(in oklab, ${accentColor}, transparent 55%)`,
              background: `color-mix(in oklab, ${accentColor}, transparent 88%)`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '1.5rem', color: accentColor,
            }}>
              {icon}
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                <span className="edge-label" style={{ color: accentColor }}>CATEGORY</span>
                <span className="route-marker">{bots.length} bots</span>
              </div>
              <h1 style={{
                fontFamily: 'var(--font-display)', fontSize: 'clamp(1.6rem, 4vw, 2.8rem)',
                fontWeight: 700, letterSpacing: '-0.03em',
                lineHeight: 1.1, marginBottom: 10, color: 'var(--foreground)',
              }}>
                {label}
              </h1>
              <p style={{ fontSize: '0.95rem', lineHeight: 1.65, color: 'var(--muted-foreground)', maxWidth: 480 }}>
                {description}
              </p>
              {/* Stat row */}
              <div style={{ display: 'flex', gap: 20, marginTop: 16, flexWrap: 'wrap' }}>
                {[
                  { label: 'Total Bots', value: bots.length },
                  { label: 'Active', value: activeBots.length },
                  { label: 'Workflows', value: workflows.length },
                  { label: 'Active Ratio', value: `${activeRatio}%` },
                ].map(({ label: l, value: v }) => (
                  <div key={l}>
                    <p className="edge-label">{l}</p>
                    <p style={{ fontFamily: 'var(--font-mono)', fontSize: '1rem', fontWeight: 700, color: 'var(--foreground)', marginTop: 2 }}>{v}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick actions */}
          <div style={{ display: 'flex', gap: 10, marginTop: 24, paddingTop: 20, borderTop: '1px solid var(--panel-border)', flexWrap: 'wrap' }}>
            <Link href={`/bots?category=${cat}`} className="btn btn-primary" style={{ fontSize: '0.82rem' }}>
              Open in Bot Lab
            </Link>
            <Link href="/workspace" className="btn" style={{ fontSize: '0.82rem' }}>
              Launch Workspace
            </Link>
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 20 }} className="lg:grid-cols-[1fr_280px]">

        {/* Main content */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>

          {/* Bots grid */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14, borderBottom: '1px solid var(--panel-border)', paddingBottom: 10 }}>
              <span className="edge-label">Bots</span>
              <span className="route-marker">{bots.length}</span>
            </div>
            {bots.length === 0 ? (
              <div style={{
                padding: '40px 24px', textAlign: 'center',
                border: '1px solid var(--panel-border)', borderRadius: 'var(--radius-lg)',
                background: 'var(--panel-inset)', color: 'var(--muted-foreground)', fontSize: '0.88rem',
              }}>
                No bots in this category yet.
              </div>
            ) : (
              <div style={{ display: 'grid', gap: 10, gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))' }}>
                {bots.map((bot) => (
                  <Link
                    key={bot.slug}
                    href={`/bots/${bot.slug}`}
                    className="hud-link-card"
                    style={{ gap: 8, padding: '16px' }}
                  >
                    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 8 }}>
                      <p style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--foreground)', lineHeight: 1.3 }}>{bot.name}</p>
                      <span style={{
                        width: 6, height: 6, borderRadius: '50%', flexShrink: 0, marginTop: 4,
                        background: bot.status === 'active' ? 'var(--neon-lime)' : 'var(--warning)',
                      }} />
                    </div>
                    <p style={{ fontSize: '0.78rem', color: 'var(--muted-foreground)', lineHeight: 1.5 }}>
                      {bot.description.slice(0, 100)}{bot.description.length > 100 ? '…' : ''}
                    </p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginTop: 2 }}>
                      {bot.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          style={{
                            padding: '2px 7px', borderRadius: 'var(--radius-sm)',
                            border: '1px solid var(--panel-border)', background: 'var(--panel-inset)',
                            fontFamily: 'var(--font-mono)', fontSize: '0.62rem',
                            letterSpacing: '0.08em', color: 'var(--muted-foreground)',
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <p style={{
                      marginTop: 4, fontFamily: 'var(--font-mono)', fontSize: '0.6rem',
                      letterSpacing: '0.14em', textTransform: 'uppercase', color: accentColor,
                    }}>
                      View Bot →
                    </p>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Workflows */}
          {workflows.length > 0 && (
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14, borderBottom: '1px solid var(--panel-border)', paddingBottom: 10 }}>
                <span className="edge-label">Workflows</span>
                <span className="route-marker">{workflows.length}</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {workflows.map((w) => (
                  <Link
                    key={w.id}
                    href={`/workflows/${w.id}`}
                    className="hud-row-card"
                    style={{ alignItems: 'flex-start', padding: '16px 18px' }}
                  >
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--foreground)', marginBottom: 4 }}>{w.title}</p>
                      <p style={{ fontSize: '0.78rem', color: 'var(--muted-foreground)', lineHeight: 1.5 }}>{w.description}</p>
                      <div style={{ display: 'flex', gap: 14, marginTop: 8 }}>
                        <span className="edge-label">{w.steps.length} steps</span>
                        <span className="edge-label">{w.estimatedDurationMin} min</span>
                        <span className="edge-label" style={{ textTransform: 'capitalize' }}>{w.estimatedOutputMode}</span>
                      </div>
                    </div>
                    <span
                      className="mono-chip"
                      style={{
                        flexShrink: 0, color:
                          w.runtimeComplexity === 'high' ? 'var(--danger)' :
                          w.runtimeComplexity === 'medium' ? 'var(--warning)' :
                          'var(--neon-lime)',
                      }}
                    >
                      {w.runtimeComplexity}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

          {/* Active ratio */}
          <div style={{ border: '1px solid var(--panel-border)', borderRadius: 'var(--radius-lg)', background: 'var(--panel-bg)', overflow: 'hidden' }}>
            <div style={{ padding: '10px 14px', borderBottom: '1px solid var(--panel-border)', background: 'var(--panel-inset)' }}>
              <span className="edge-label">Readiness</span>
            </div>
            <div style={{ padding: '14px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                <span className="edge-label">Active bots</span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: accentColor, fontWeight: 700 }}>{activeRatio}%</span>
              </div>
              <div style={{ height: 4, borderRadius: 2, background: 'var(--panel-border)', overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${activeRatio}%`, background: accentColor, borderRadius: 2, transition: 'width 600ms ease' }} />
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8 }}>
                <span className="edge-label">{activeBots.length} active</span>
                <span className="edge-label">{bots.length - activeBots.length} draft/disabled</span>
              </div>
            </div>
          </div>

          {/* Other categories */}
          <div style={{ border: '1px solid var(--panel-border)', borderRadius: 'var(--radius-lg)', background: 'var(--panel-bg)', overflow: 'hidden' }}>
            <div style={{ padding: '10px 14px', borderBottom: '1px solid var(--panel-border)', background: 'var(--panel-inset)' }}>
              <span className="edge-label">Other Categories</span>
            </div>
            <div style={{ padding: '8px' }}>
              {otherCategories.map((c) => {
                const count = allBots.filter((b) => b.category === c).length;
                const color = CATEGORY_COLORS[c] ?? 'var(--primary)';
                return (
                  <Link
                    key={c}
                    href={`/categories/${c}`}
                    className="hud-nav-item"
                    style={{ justifyContent: 'space-between' }}
                  >
                    <span style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                      <span style={{ color, fontSize: '0.8rem' }}>{CATEGORY_ICONS[c]}</span>
                      <span style={{ fontSize: '0.82rem', color: 'var(--foreground)', textTransform: 'capitalize' }}>{c.replace(/-/g, ' ')}</span>
                    </span>
                    <span className="route-marker">{count}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
