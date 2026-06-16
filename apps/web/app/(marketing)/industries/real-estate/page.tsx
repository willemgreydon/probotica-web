import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Real Estate AI | ProBotica Industries',
  description: 'AI lead qualification, buyer/seller inquiry handling, listing intelligence, and agent-ready communications for property teams.',
};

const FEATURES = [
  { num: '01', title: 'Lead Qualification', desc: 'Budget, timeline, location, and intent extraction from inbound buyer and seller inquiries. Returns structured next action.' },
  { num: '02', title: 'Buyer Inquiry Handling', desc: 'Handles property inquiries with qualification questions, feature matching, and agent-ready summaries.' },
  { num: '03', title: 'Seller Lead Scoring', desc: 'Scores seller motivation, timeline urgency, and listing readiness to prioritize agent follow-up.' },
  { num: '04', title: 'Property Matching', desc: 'Matches buyer criteria against available listings with weighted scoring and recommendation output.' },
];

export default function RealEstatePage() {
  return (
    <main id="main-content" className="page-shell hud-grid bg-premium">
      <div className="container-x">
        <Link href="/industries" className="inline-flex items-center gap-2 edge-label hover:text-foreground transition-colors mb-6" style={{ textDecoration: 'none' }}>
          ← Industries
        </Link>
        <p className="label-eyebrow mb-4">Industries / Real Estate</p>
        <h1 className="heading-section text-balance" style={{ maxWidth: '680px' }}>
          Real Estate AI
        </h1>
        <p className="text-lead mt-5" style={{ maxWidth: '540px' }}>
          Lead qualification, listing intelligence, and automated communications for property teams. AI-powered inquiry handling from first contact to agent handoff.
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
          <Link href="/categories/real-estate" className="btn btn-primary" style={{ minHeight: 44 }}>Real Estate Bots</Link>
          <Link href="/workflows/real-estate-qualification" className="btn" style={{ minHeight: 44 }}>Qualification Workflow</Link>
          <Link href="/scenarios/real-estate-inquiry" className="btn" style={{ minHeight: 44 }}>Run Inquiry Scenario</Link>
          <Link href="/contact" className="btn" style={{ minHeight: 44 }}>Custom Build</Link>
        </div>
      </div>
    </main>
  );
}
