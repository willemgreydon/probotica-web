import Link from 'next/link';
import { ScrollReveal } from '@/components/motion/ScrollReveal';

const AGENT_CARDS = [
  {
    tag: 'Sales',
    id: 'AG-01',
    title: 'Lead Qualifier',
    desc: 'Structured lead scoring with budget, timeline and intent extraction. Returns qualified summary and next action.',
    href: '/categories/sales',
    status: 'active',
    output: 'Mixed',
  },
  {
    tag: 'UX',
    id: 'AG-02',
    title: 'UX Audit Agent',
    desc: 'Prioritized usability diagnostics for onboarding, conversion funnels, and interface friction.',
    href: '/categories/ux',
    status: 'active',
    output: 'Text',
  },
  {
    tag: 'Content',
    id: 'AG-03',
    title: 'Content Studio',
    desc: 'Content briefs, SEO outlines, and publication-ready article generation from a single prompt.',
    href: '/categories/content',
    status: 'active',
    output: 'Text',
  },
  {
    tag: 'Strategy',
    id: 'AG-04',
    title: 'Prompt Pack Generator',
    desc: 'Produces structured prompt systems for teams — role, context, output format and edge-case handling.',
    href: '/categories/strategy',
    status: 'active',
    output: 'JSON',
  },
  {
    tag: 'Real Estate',
    id: 'AG-05',
    title: 'Real Estate Assistant',
    desc: 'Buyer/seller qualification, property matching, and agent-ready inquiry summaries.',
    href: '/categories/real-estate',
    status: 'active',
    output: 'Mixed',
  },
  {
    tag: 'Marketing',
    id: 'AG-06',
    title: 'Campaign Optimizer',
    desc: 'Campaign plans with channel breakdown, hooks, and CTA variant sets for launch-ready execution.',
    href: '/categories/marketing',
    status: 'active',
    output: 'Text',
  },
  {
    tag: 'Development',
    id: 'AG-07',
    title: 'Frontend Review Bot',
    desc: 'A11y, performance, and consistency audit across React/Next.js components. Prioritized issue lists.',
    href: '/categories/development',
    status: 'active',
    output: 'Text',
  },
  {
    tag: 'Learning',
    id: 'AG-08',
    title: 'Learning Coach',
    desc: 'Builds guided skill plans with daily exercises, resource maps, and progress checkpoints.',
    href: '/categories/learning',
    status: 'active',
    output: 'Text',
  },
];

export function HorizontalAgents() {
  return (
    <section id="ai-studio" className="hud-grid section-y">
      <div className="container-x">
        <ScrollReveal>
          <div className="section-header">
            <p className="section-header-eyebrow">Agent Arsenal</p>
            <h2 className="section-header-title" style={{ maxWidth: '680px' }}>
              Deployable agent modules<br />by domain.
            </h2>
            <p className="section-header-body">
              Expert AI assistants with structured outputs, safe fallbacks, and domain-tuned system prompts.
              Each links to its full category in the Bot Lab.
            </p>
          </div>
        </ScrollReveal>

        <div className="hud-line mb-8" />

        {/* Scrollable horizontal track on mobile / grid on desktop */}
        <div
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
          style={{ overflowX: 'auto' }}
        >
          {AGENT_CARDS.map((agent, i) => (
            <ScrollReveal key={agent.id} delay={i * 0.04}>
              <Link
                href={agent.href}
                className="module-card group"
                style={{ minHeight: 220, textDecoration: 'none' }}
              >
                <div className="module-card-header">
                  <span className="mono-chip">{agent.tag}</span>
                  <span className="route-marker">{agent.id}</span>
                </div>
                <div className="module-card-body" style={{ paddingTop: 'var(--space-4)' }}>
                  <h3
                    style={{
                      fontSize: 'clamp(0.95rem, 1.5vw, 1.08rem)',
                      fontWeight: 800,
                      letterSpacing: '-0.02em',
                      lineHeight: 1.2,
                      textTransform: 'uppercase',
                      color: 'var(--foreground)',
                      marginBottom: 'var(--space-2)',
                    }}
                  >
                    {agent.title}
                  </h3>
                  <p className="text-body" style={{ fontSize: '0.84rem' }}>{agent.desc}</p>
                </div>
                <div className="module-card-footer" style={{ gap: 'var(--space-2)' }}>
                  <span
                    className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                    style={{ background: 'var(--status-online)', boxShadow: '0 0 5px var(--status-online)' }}
                  />
                  <span className="edge-label">PIPELINE: {agent.status.toUpperCase()}</span>
                  <span className="ml-auto edge-label">{agent.output}</span>
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-4">
          <Link href="/bots" className="btn btn-primary" style={{ minHeight: 44 }}>
            Browse All 111 Bots
          </Link>
          <Link href="/categories/sales" className="btn" style={{ minHeight: 44 }}>
            Explore by Category
          </Link>
        </div>
      </div>
    </section>
  );
}
