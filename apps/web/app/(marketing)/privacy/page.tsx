import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Privacy Policy | ProBotica',
  description: 'How ProBotica handles personal data, session storage, AI model interactions, and GDPR compliance.',
};

const SECTIONS = [
  {
    title: 'Data We Collect',
    body: 'ProBotica collects only the data necessary to operate the platform. When you use the AI demo or Bot Lab, your input prompt is sent to the OpenAI API via our server. We do not store prompt history beyond the current session.',
  },
  {
    title: 'Session Storage',
    body: 'Workspace data is stored locally in your browser session only. It is not transmitted to any server, third-party service, or analytics system. Closing the browser clears all session data.',
  },
  {
    title: 'OpenAI API Usage',
    body: 'Your prompts are forwarded to OpenAI for model inference. ProBotica\'s server acts as an intermediary — your prompts are never attached to any user identity. OpenAI\'s privacy policy applies to model processing.',
  },
  {
    title: 'No Tracking',
    body: 'ProBotica does not use Google Analytics, Meta Pixel, or any behavioral tracking. No cookies are set for advertising purposes. No cross-session fingerprinting is performed.',
  },
  {
    title: 'GDPR Rights',
    body: 'As an EU-based service, ProBotica respects GDPR rights: access, rectification, erasure, portability, and restriction of processing. Contact hello@probotica.at to exercise any right.',
  },
  {
    title: 'Data Retention',
    body: 'We retain server logs for operational debugging for a maximum of 7 days. No personal data is retained beyond this period. Contact information submitted via email is retained only while the correspondence is active.',
  },
  {
    title: 'Contact',
    body: 'For any data protection questions, contact hello@probotica.at. Our Data Protection contact is located in Vienna, Austria.',
  },
];

export default function PrivacyPage() {
  return (
    <main id="main-content" className="page-shell hud-grid bg-premium">
      <div className="container-x" style={{ maxWidth: '820px' }}>
        <p className="label-eyebrow mb-4">Legal</p>
        <h1 className="heading-section" style={{ maxWidth: '560px' }}>
          Privacy Policy
        </h1>
        <p className="text-lead mt-5 mb-10">
          How ProBotica handles personal data, analytics, and model interaction records.
        </p>

        <div className="space-y-4 mb-10">
          {SECTIONS.map((s, i) => (
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
          <Link href="/imprint" className="btn" style={{ minHeight: 40 }}>Imprint</Link>
          <Link href="/terms" className="btn" style={{ minHeight: 40 }}>Terms</Link>
          <a href="mailto:hello@probotica.at" className="btn" style={{ minHeight: 40 }}>Contact DPO</a>
        </div>
      </div>
    </main>
  );
}
