import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Solutions | ProBotica AI Stack',
  description: 'AI assistants, prompt packs, workflow automation, UX audit agents, and development bots. Choose the right ProBotica module for your team.',
};

const SOLUTIONS = [
  {
    href: '/solutions/ai-assistants',
    tag: 'Assistants',
    title: 'AI Assistants',
    desc: 'Role-specific AI copilots for sales, UX, content, support, research, and operations. 111 expert bots with typed output.',
    stat: '111 bots',
    color: 'var(--primary)',
  },
  {
    href: '/solutions/prompt-packs',
    tag: 'Prompts',
    title: 'Prompt Packs',
    desc: 'Reusable, versioned prompt systems with role definitions, output contracts, and edge-case handling built in.',
    stat: 'Structured systems',
    color: 'var(--secondary)',
  },
  {
    href: '/solutions/workflow-automation',
    tag: 'Automation',
    title: 'Workflow Automation',
    desc: 'Chain bots into intake → analysis → execution → review pipelines. 10 production templates included.',
    stat: '10 templates',
    color: 'var(--neon-cyan)',
  },
  {
    href: '/solutions/ux-audit-agents',
    tag: 'UX',
    title: 'UX Audit Agents',
    desc: 'Usability diagnostics, onboarding friction analysis, and conversion audits with prioritized recommendations.',
    stat: 'Full diagnostics',
    color: 'var(--accent)',
  },
  {
    href: '/solutions/development-bots',
    tag: 'Dev',
    title: 'Development Bots',
    desc: 'A11y audits, code review, performance analysis, and safe deployment checklists for engineering teams.',
    stat: 'Engineering-grade',
    color: 'var(--neon-lime)',
  },
];

export default function SolutionsPage() {
  return (
    <main id="main-content" className="page-shell hud-grid bg-premium">
      <div className="container-x">
        <p className="label-eyebrow mb-4">Solutions</p>
        <h1 className="heading-section text-balance" style={{ maxWidth: '680px' }}>
          AI Solution Stack
        </h1>
        <p className="text-lead mt-5" style={{ maxWidth: '540px' }}>
          Choose assistants, prompt products, and automation systems built for measurable business outcomes. Every module is production-safe and cross-linked.
        </p>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 mb-10">
          {SOLUTIONS.map((s) => (
            <Link
              key={s.href}
              href={s.href}
              className="module-card group"
              style={{ textDecoration: 'none', minHeight: 220 }}
            >
              <div className="module-card-header">
                <span className="tag" style={{ borderColor: `color-mix(in oklab, ${s.color}, transparent 55%)`, color: s.color }}>
                  {s.tag}
                </span>
              </div>
              <div className="module-card-body">
                <h3 style={{ fontSize: '1rem', fontWeight: 800, letterSpacing: '-0.01em', textTransform: 'uppercase', color: 'var(--foreground)', marginBottom: 'var(--space-2)' }}>
                  {s.title}
                </h3>
                <p className="text-body">{s.desc}</p>
              </div>
              <div className="module-card-footer">
                <span style={{ fontSize: '0.62rem', fontWeight: 700, color: s.color, fontFamily: 'var(--font-mono)', letterSpacing: '0.14em', textTransform: 'uppercase' }}>
                  {s.stat}
                </span>
                <span className="ml-auto edge-label">Explore →</span>
              </div>
            </Link>
          ))}
        </div>

        <div className="flex flex-wrap gap-3">
          <Link href="/bots" className="btn btn-primary" style={{ minHeight: 44 }}>Open Bot Lab</Link>
          <Link href="/marketplace" className="btn" style={{ minHeight: 44 }}>View Marketplace</Link>
          <Link href="/contact" className="btn" style={{ minHeight: 44 }}>Talk to Us</Link>
        </div>
      </div>
    </main>
  );
}
