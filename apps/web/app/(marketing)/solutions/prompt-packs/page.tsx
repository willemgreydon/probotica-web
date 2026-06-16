import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Prompt Packs | ProBotica Solutions',
  description: 'Reusable, versioned prompt systems for repeatable high-quality AI output. Role definitions, output contracts, and edge-case handling included.',
};

const PACK_FEATURES = [
  { num: '01', title: 'Role Definitions', desc: 'Each pack includes a structured persona with domain expertise, behavioral constraints, and tone guidelines.' },
  { num: '02', title: 'Output Contracts', desc: 'Prompts produce typed, predictable output — JSON, structured text, or mixed modes with Zod-style validation.' },
  { num: '03', title: 'Edge Case Handling', desc: 'Every prompt system includes fallback instructions for ambiguous input, missing data, and boundary conditions.' },
  { num: '04', title: 'Version Control', desc: 'Prompt systems are versioned. Changes are tracked so you can audit prompt evolution and rollback if needed.' },
];

export default function PromptPacksPage() {
  return (
    <main id="main-content" className="page-shell hud-grid bg-premium">
      <div className="container-x">
        <Link href="/solutions" className="inline-flex items-center gap-2 edge-label hover:text-foreground transition-colors mb-6" style={{ textDecoration: 'none' }}>
          ← Solutions
        </Link>
        <p className="label-eyebrow mb-4">Solutions / Prompt Packs</p>
        <h1 className="heading-section text-balance" style={{ maxWidth: '680px' }}>
          Prompt Packs
        </h1>
        <p className="text-lead mt-5" style={{ maxWidth: '540px' }}>
          Reusable, versioned prompt systems for repeatable high-quality output. Built for teams who need consistent AI results across multiple use cases.
        </p>

        <div className="mt-10 grid gap-3 sm:grid-cols-2 mb-10">
          {PACK_FEATURES.map((f) => (
            <div key={f.num} className="process-step">
              <span className="process-step-num">{f.num}</span>
              <div>
                <b style={{ fontSize: '0.8rem', fontWeight: 800, display: 'block', textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--foreground)', marginBottom: 4 }}>
                  {f.title}
                </b>
                <p className="text-body" style={{ fontSize: '0.84rem' }}>{f.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div
          className="p-5 mb-8 relative overflow-hidden"
          style={{ border: '1px solid var(--hud-border)', background: 'var(--command-surface)', borderRadius: 'var(--radius-lg)' }}
        >
          <p className="edge-label mb-2">ProBotica Approach</p>
          <p className="text-body">
            All 111 imported bots in ProBotica are built on structured prompt systems. Browse the Bot Lab to see prompt architectures in action, test them live, and deploy the ones that fit your use case.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <Link href="/bots" className="btn btn-primary" style={{ minHeight: 44 }}>Browse Bot Prompts</Link>
          <Link href="/scenarios/lead-qualification" className="btn" style={{ minHeight: 44 }}>View Scenario Examples</Link>
          <Link href="/contact" className="btn" style={{ minHeight: 44 }}>Custom Prompt Build</Link>
        </div>
      </div>
    </main>
  );
}
