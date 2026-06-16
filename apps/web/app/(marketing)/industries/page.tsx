import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Industries | ProBotica Applied AI',
  description: 'Applied AI operating models for real estate, marketing, and education teams. Domain-tuned bots, workflows, and industry kits.',
};

const INDUSTRIES = [
  {
    href: '/industries/real-estate',
    tag: 'Real Estate',
    title: 'Real Estate AI',
    desc: 'Lead qualification, listing intelligence, buyer/seller inquiry handling, and automated agent communications.',
    color: 'var(--primary)',
  },
  {
    href: '/industries/marketing',
    tag: 'Marketing',
    title: 'Marketing AI',
    desc: 'Campaign systems, content operations, audience targeting, and conversion optimization for growth teams.',
    color: 'var(--accent)',
  },
  {
    href: '/industries/education',
    tag: 'Education',
    title: 'Education AI',
    desc: 'Learning assistants, skill plan generation, and pedagogy-aligned automation for modern education teams.',
    color: 'var(--neon-cyan)',
  },
];

export default function IndustriesPage() {
  return (
    <main id="main-content" className="page-shell hud-grid bg-premium">
      <div className="container-x">
        <p className="label-eyebrow mb-4">Industries</p>
        <h1 className="heading-section text-balance" style={{ maxWidth: '680px' }}>
          Industry Playbooks
        </h1>
        <p className="text-lead mt-5" style={{ maxWidth: '520px' }}>
          Applied AI operating models for real estate, marketing, education, and operations teams. Domain-tuned bots, workflows, and industry kits built for fast deployment.
        </p>

        <div className="mt-10 grid gap-4 sm:grid-cols-3 mb-10">
          {INDUSTRIES.map((ind) => (
            <Link
              key={ind.href}
              href={ind.href}
              className="module-card group"
              style={{ textDecoration: 'none', minHeight: 200 }}
            >
              <div className="module-card-header">
                <span className="tag" style={{ borderColor: `color-mix(in oklab, ${ind.color}, transparent 55%)`, color: ind.color }}>
                  {ind.tag}
                </span>
              </div>
              <div className="module-card-body">
                <h3 style={{ fontSize: '1rem', fontWeight: 800, letterSpacing: '-0.01em', textTransform: 'uppercase', color: 'var(--foreground)', marginBottom: 'var(--space-2)' }}>
                  {ind.title}
                </h3>
                <p className="text-body">{ind.desc}</p>
              </div>
              <div className="module-card-footer">
                <span className="edge-label" style={{ color: ind.color }}>View Playbook →</span>
              </div>
            </Link>
          ))}
        </div>

        <div className="flex flex-wrap gap-3">
          <Link href="/bots" className="btn btn-primary" style={{ minHeight: 44 }}>Explore All Bots</Link>
          <Link href="/contact" className="btn" style={{ minHeight: 44 }}>Custom Industry Build</Link>
        </div>
      </div>
    </main>
  );
}
