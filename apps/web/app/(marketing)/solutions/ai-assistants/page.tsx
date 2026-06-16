import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'AI Assistants | ProBotica Solutions',
  description: 'Role-specific AI assistants for sales, UX, content, support, research, and operations. 111 expert bots with typed outputs and server-safe boundaries.',
};

const ASSISTANT_TYPES = [
  { cat: 'Sales', title: 'Lead Qualifier', desc: 'Budget, timeline, and intent extraction. Returns structured qualification summary and next action step.', href: '/categories/sales' },
  { cat: 'UX', title: 'UX Audit Agent', desc: 'Prioritized usability diagnostics for onboarding, conversion funnels, and interface friction points.', href: '/categories/ux' },
  { cat: 'Content', title: 'Content Studio', desc: 'SEO outlines, article briefs, and publication-ready content from structured prompts.', href: '/categories/content' },
  { cat: 'Support', title: 'Support Escalation Bot', desc: 'Triages support requests and produces escalation-safe response plans with empathy and policy bounds.', href: '/categories/support' },
  { cat: 'Research', title: 'Research Synthesizer', desc: 'Converts interview and discovery notes into themes, risks, and next experiments.', href: '/categories/research' },
  { cat: 'Strategy', title: 'Strategy Chain', desc: 'Cross-domain strategic synthesis for execution planning, OKRs, and governance frameworks.', href: '/categories/strategy' },
];

export default function AiAssistantsPage() {
  return (
    <main id="main-content" className="page-shell hud-grid bg-premium">
      <div className="container-x">
        <Link href="/solutions" className="inline-flex items-center gap-2 edge-label hover:text-foreground transition-colors mb-6" style={{ textDecoration: 'none' }}>
          ← Solutions
        </Link>
        <p className="label-eyebrow mb-4">Solutions / AI Assistants</p>
        <h1 className="heading-section text-balance" style={{ maxWidth: '680px' }}>
          Role-specific AI Assistants
        </h1>
        <p className="text-lead mt-5" style={{ maxWidth: '540px' }}>
          111 imported expert bots across 12 business domains. Every assistant has typed outputs, safe fallbacks, server-only system prompts, and domain-tuned temperature settings.
        </p>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 mb-10">
          {ASSISTANT_TYPES.map((a) => (
            <Link key={a.title} href={a.href} className="module-card group" style={{ textDecoration: 'none' }}>
              <div className="module-card-header">
                <span className="mono-chip">{a.cat}</span>
              </div>
              <div className="module-card-body">
                <h3 style={{ fontSize: '0.92rem', fontWeight: 800, letterSpacing: '-0.01em', color: 'var(--foreground)', marginBottom: 'var(--space-2)' }}>
                  {a.title}
                </h3>
                <p className="text-body">{a.desc}</p>
              </div>
              <div className="module-card-footer">
                <span className="edge-label" style={{ color: 'var(--primary)' }}>View Category →</span>
              </div>
            </Link>
          ))}
        </div>

        <div className="flex flex-wrap gap-3">
          <Link href="/bots" className="btn btn-primary" style={{ minHeight: 44 }}>Browse All 111 Bots</Link>
          <Link href="/workspace" className="btn" style={{ minHeight: 44 }}>Test in Workspace</Link>
          <Link href="/contact" className="btn" style={{ minHeight: 44 }}>Book Custom Build</Link>
        </div>
      </div>
    </main>
  );
}
