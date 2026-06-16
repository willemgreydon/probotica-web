import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Terms of Service | ProBotica',
  description: 'Usage terms for ProBotica AI products, bot testing, workflow execution, and managed AI services.',
};

const TERMS = [
  {
    title: 'Acceptance of Terms',
    body: 'By accessing ProBotica, you agree to these terms. If you do not agree, do not use the platform. These terms apply to all features including Bot Lab, Workspace, Marketplace, and the AI demo.',
  },
  {
    title: 'Permitted Use',
    body: 'ProBotica is licensed for business and professional use. You may use the bots, workflows, and demo features for your own operational purposes. Redistribution, reselling, or sublicensing of bot outputs as a standalone product requires written agreement.',
  },
  {
    title: 'AI Output Disclaimer',
    body: 'AI-generated outputs are provided as-is. ProBotica makes no guarantees about the accuracy, completeness, or suitability of any AI output for any specific business decision. Always review outputs before acting on them.',
  },
  {
    title: 'API Usage',
    body: 'When using ProBotica\'s AI features, your prompts are processed via the OpenAI API. You are responsible for compliance with OpenAI\'s usage policies. ProBotica acts as an intermediary and is not responsible for OpenAI\'s availability or policy changes.',
  },
  {
    title: 'Prohibited Use',
    body: 'You may not use ProBotica to generate illegal content, harass individuals, circumvent safety systems, or violate any applicable laws. Attempts to extract system prompts or reverse-engineer the bot boundary are prohibited.',
  },
  {
    title: 'Intellectual Property',
    body: 'The ProBotica platform, design system, and code are proprietary. Bot definitions, workflow templates, and knowledge articles are owned by ProBotica. Your own prompt inputs remain your property.',
  },
  {
    title: 'Limitation of Liability',
    body: 'ProBotica\'s liability is limited to the extent permitted by Austrian law. We are not liable for indirect, incidental, or consequential damages arising from AI output, service interruptions, or data loss.',
  },
  {
    title: 'Governing Law',
    body: 'These terms are governed by Austrian law. Disputes are subject to the exclusive jurisdiction of the courts in Vienna, Austria.',
  },
];

export default function TermsPage() {
  return (
    <main id="main-content" className="page-shell hud-grid bg-premium">
      <div className="container-x" style={{ maxWidth: '820px' }}>
        <p className="label-eyebrow mb-4">Legal</p>
        <h1 className="heading-section" style={{ maxWidth: '560px' }}>
          Terms of Service
        </h1>
        <p className="text-lead mt-5 mb-10">
          Usage terms for ProBotica products, AI demos, bot testing, and managed services.
        </p>

        <div className="space-y-4 mb-10">
          {TERMS.map((s, i) => (
            <div
              key={s.title}
              className="p-5"
              style={{ border: '1px solid var(--hud-border)', background: 'var(--command-surface)', borderRadius: 'var(--radius-lg)' }}
            >
              <div className="flex items-start gap-4">
                <span className="route-marker mt-0.5 flex-shrink-0">{String(i + 1).padStart(2, '0')}</span>
                <div>
                  <h3 style={{ fontSize: '0.88rem', fontWeight: 800, color: 'var(--foreground)', marginBottom: 'var(--space-2)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                    {s.title}
                  </h3>
                  <p className="text-body" style={{ fontSize: '0.88rem' }}>{s.body}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap gap-3">
          <Link href="/privacy" className="btn" style={{ minHeight: 40 }}>Privacy Policy</Link>
          <Link href="/imprint" className="btn" style={{ minHeight: 40 }}>Imprint</Link>
          <a href="mailto:hello@probotica.at" className="btn" style={{ minHeight: 40 }}>Legal Contact</a>
        </div>
      </div>
    </main>
  );
}
