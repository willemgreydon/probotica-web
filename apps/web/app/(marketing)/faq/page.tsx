import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'FAQ | ProBotica',
  description: 'Answers about ProBotica pricing, rollout, GDPR compliance, AI integrations, bot safety, and support.',
};

const FAQS = [
  {
    q: 'What is ProBotica?',
    a: 'ProBotica is an AI operating system that combines 111 imported expert bots, a workflow engine, workspace memory, a marketplace, and a control-center telemetry dashboard into one practical platform for business AI operations.',
  },
  {
    q: 'Do I need an OpenAI API key to use ProBotica?',
    a: 'For the live demo and bot testing features, yes — a valid OpenAI API key is required. The platform includes safe fallback states for every bot so demos always work, even without a key.',
  },
  {
    q: 'Are system prompts secure?',
    a: 'Yes. All system prompts are stored and executed server-side only. They never appear in API responses, client JavaScript bundles, or browser network logs. ProBotica uses a Next.js server boundary to enforce this.',
  },
  {
    q: 'Is ProBotica GDPR-compliant?',
    a: 'ProBotica is built for the EU market. There is no cross-session tracking, no training data opt-in, and no third-party analytics by default. Data flows are scoped and documented.',
  },
  {
    q: 'What domains do the bots cover?',
    a: 'Sales, UX, content, marketing, real estate, development, learning, automation, research, support, strategy, and other specialized domains — 12 categories total with 111 expert bots.',
  },
  {
    q: 'Can I chain multiple bots together?',
    a: 'Yes. The Workflow Engine lets you chain bots into intake → analysis → execution → review pipelines. 10 production workflow templates are included and fully configurable.',
  },
  {
    q: 'What is the Workspace?',
    a: 'The Workspace is a local-first session memory layer. You can save bot outputs, replay history, and build multi-bot context without any data leaving the current session.',
  },
  {
    q: 'How do I get started?',
    a: 'Open the Bot Lab to browse all 111 bots, or jump directly to the Workspace to start a workflow session. The homepage includes a live AI demo you can run immediately.',
  },
];

export default function FaqPage() {
  return (
    <main id="main-content" className="page-shell hud-grid bg-premium">
      <div className="container-x">
        <p className="label-eyebrow mb-4">FAQ</p>
        <h1 className="heading-section text-balance" style={{ maxWidth: '640px' }}>
          Frequently Asked Questions
        </h1>
        <p className="text-lead mt-5" style={{ maxWidth: '520px' }}>
          Answers on ProBotica features, AI safety, compliance, integrations, and how to get started.
        </p>

        <div className="mt-10 space-y-3 mb-10">
          {FAQS.map((item, i) => (
            <div
              key={i}
              className="p-5 relative overflow-hidden"
              style={{ border: '1px solid var(--hud-border)', background: 'var(--command-surface)', borderRadius: 'var(--radius-lg)' }}
            >
              <div className="flex items-start gap-4">
                <span className="route-marker mt-0.5 flex-shrink-0">{String(i + 1).padStart(2, '0')}</span>
                <div>
                  <h3 style={{ fontSize: '0.92rem', fontWeight: 800, color: 'var(--foreground)', marginBottom: 'var(--space-2)', lineHeight: 1.3 }}>
                    {item.q}
                  </h3>
                  <p className="text-body" style={{ fontSize: '0.88rem' }}>{item.a}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap gap-3">
          <Link href="/bots" className="btn btn-primary" style={{ minHeight: 44 }}>Open Bot Lab</Link>
          <Link href="/contact" className="btn" style={{ minHeight: 44 }}>Still have questions?</Link>
        </div>
      </div>
    </main>
  );
}
