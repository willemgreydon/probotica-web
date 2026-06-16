import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'About ProBotica | AI Operating System',
  description: 'ProBotica builds practical AI operating systems — expert bots, workflow execution, workspace memory, and control-center telemetry for real business tasks.',
};

const VALUES = [
  { title: 'Practical First', text: 'Every module ships with real API integration, typed outputs, and safe fallbacks. No vaporware.' },
  { title: 'Server-Safe', text: 'System prompts never reach the client. All sensitive logic lives behind a Next.js server boundary.' },
  { title: 'GDPR-Native', text: 'Built for the EU. No training data opt-in, no cross-session tracking, scoped data flows.' },
  { title: 'Modular by Design', text: 'Use Bot Lab standalone, chain into Workflows, monitor in Control Center. Each module works independently.' },
];

const STACK = [
  { label: 'Runtime', value: 'Next.js 15' },
  { label: 'AI', value: 'OpenAI GPT-4o' },
  { label: 'Region', value: 'EU / GDPR' },
  { label: 'Bots', value: '111 experts' },
  { label: 'Workflows', value: '10 templates' },
  { label: 'Security', value: 'Server boundary' },
];

export default function AboutPage() {
  return (
    <main id="main-content" className="page-shell hud-grid bg-premium">
      <div className="container-x">
        <p className="label-eyebrow mb-4">Company</p>
        <h1 className="heading-section text-balance" style={{ maxWidth: '720px' }}>
          About ProBotica
        </h1>
        <p className="text-lead mt-5" style={{ maxWidth: '580px' }}>
          We build cinematic AI operating systems that are practical, performant, and production-safe. ProBotica is an AI OS for real business operations — not a chatbot wrapper.
        </p>

        <div
          className="mt-10 mb-10 p-6 relative overflow-hidden"
          style={{ border: '1px solid var(--hud-border)', background: 'var(--command-surface)', borderRadius: 'var(--radius-xl)' }}
        >
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{ background: 'radial-gradient(ellipse 60% 80% at 80% 0%, color-mix(in oklab, var(--neon-cyan), transparent 85%), transparent)' }}
          />
          <div className="relative z-10">
            <p className="label-eyebrow mb-3">Mission</p>
            <p style={{ fontSize: 'clamp(1.05rem, 2vw, 1.25rem)', fontWeight: 700, lineHeight: 1.55, color: 'var(--foreground)', maxWidth: '640px' }}>
              "Turn expert-level AI prompts into deployable, production-safe operating modules that any business team can use without an AI engineer."
            </p>
          </div>
        </div>

        <p className="label-eyebrow mb-5">Core Values</p>
        <div className="grid gap-4 sm:grid-cols-2 mb-10">
          {VALUES.map((v) => (
            <div key={v.title} className="kpi-card">
              <span className="kpi-label">{v.title}</span>
              <p className="text-body mt-2">{v.text}</p>
            </div>
          ))}
        </div>

        <p className="label-eyebrow mb-4">Technical Foundation</p>
        <div className="data-rail flex-wrap gap-4 mb-10">
          {STACK.map((s) => (
            <div key={s.label} className="data-rail-item">
              <span className="data-rail-value">{s.value}</span>
              <span className="data-rail-label">{s.label}</span>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap gap-3">
          <Link href="/bots" className="btn btn-primary" style={{ minHeight: 44 }}>Open Bot Lab</Link>
          <Link href="/workspace" className="btn" style={{ minHeight: 44 }}>Launch Workspace</Link>
          <Link href="/contact" className="btn" style={{ minHeight: 44 }}>Talk to ProBotica</Link>
        </div>
      </div>
    </main>
  );
}
