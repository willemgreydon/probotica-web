import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Marketing AI | ProBotica Industries',
  description: 'Campaign systems, content operations, audience targeting, and conversion optimization AI for growth and marketing teams.',
};

const FEATURES = [
  { num: '01', title: 'Campaign Planning', desc: 'Full campaign plans with channel breakdown, hooks, and CTA variant sets for any target audience and budget.' },
  { num: '02', title: 'Content Operations', desc: 'Content briefs, SEO outlines, and publication-ready articles generated from structured brand inputs.' },
  { num: '03', title: 'Audience Targeting', desc: 'Persona definitions, segment mapping, and messaging frameworks tailored per audience profile.' },
  { num: '04', title: 'Conversion Optimization', desc: 'Landing page, email, and ad copy optimization with A/B variant generation and performance hypotheses.' },
];

export default function MarketingPage() {
  return (
    <main id="main-content" className="page-shell hud-grid bg-premium">
      <div className="container-x">
        <Link href="/industries" className="inline-flex items-center gap-2 edge-label hover:text-foreground transition-colors mb-6" style={{ textDecoration: 'none' }}>
          ← Industries
        </Link>
        <p className="label-eyebrow mb-4">Industries / Marketing</p>
        <h1 className="heading-section text-balance" style={{ maxWidth: '680px' }}>
          Marketing AI
        </h1>
        <p className="text-lead mt-5" style={{ maxWidth: '540px' }}>
          Campaign systems, content operations, and conversion optimization for growth teams. AI-powered marketing intelligence from brief to launch.
        </p>

        <div className="mt-10 grid gap-3 sm:grid-cols-2 mb-10">
          {FEATURES.map((f) => (
            <div key={f.num} className="process-step" style={{ alignItems: 'flex-start' }}>
              <span className="process-step-num">{f.num}</span>
              <div>
                <b style={{ fontSize: '0.82rem', fontWeight: 800, display: 'block', letterSpacing: '0.02em', color: 'var(--foreground)', marginBottom: 4 }}>
                  {f.title}
                </b>
                <p className="text-body" style={{ fontSize: '0.84rem' }}>{f.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap gap-3">
          <Link href="/categories/marketing" className="btn btn-primary" style={{ minHeight: 44 }}>Marketing Bots</Link>
          <Link href="/categories/content" className="btn" style={{ minHeight: 44 }}>Content Bots</Link>
          <Link href="/scenarios/marketing-campaign" className="btn" style={{ minHeight: 44 }}>Campaign Scenario</Link>
          <Link href="/contact" className="btn" style={{ minHeight: 44 }}>Custom Build</Link>
        </div>
      </div>
    </main>
  );
}
