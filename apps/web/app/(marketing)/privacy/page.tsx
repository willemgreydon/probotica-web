import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Privacy Policy | ProBotica',
  description: 'How ProBotica handles personal data, session storage, AI model interactions, and GDPR compliance.',
};

const SECTIONS = [
  {
    title: 'Controller',
    body: 'The controller responsible for data processing (Art. 4(7) GDPR) is Claus Nisslmüller e.U. (owner: Claus Rainer Nisslmüller), Mitterbergerweg 6/EG/G02, 4040 Linz, Austria. Email: office@mitterbergerlab.at. ProBotica is a brand/project of Claus Nisslmüller e.U.',
  },
  {
    title: 'Data we collect',
    body: 'We collect only the data necessary to operate the platform. When you use the AI demo or Bot Lab, your input prompt is sent to the OpenAI API via our server for inference. We do not store prompt history beyond the current request/session.',
  },
  {
    title: 'Local & session storage',
    body: 'Workspaces, learning progress and preferences (theme, language) are stored locally in your browser (localStorage/cookies). They are not transmitted to our servers or to third-party analytics. Clearing your browser storage removes this data.',
  },
  {
    title: 'Use of AI systems',
    body: 'When live AI is enabled, prompts are forwarded to OpenAI (an EU/US processor) for model inference; our server acts as an intermediary and does not attach prompts to a user identity. OpenAI’s data-processing terms apply. Without an API key, deterministic on-device demo output is used and no prompt leaves the server-side route.',
  },
  {
    title: 'Hosting',
    body: 'The website is hosted on Vercel (Vercel Inc.). Vercel processes server logs (e.g. IP address, request metadata) as a processor on our behalf to deliver and secure the site.',
  },
  {
    title: 'Legal basis',
    body: 'Processing is based on our legitimate interest in operating a secure, functional service (Art. 6(1)(f) GDPR), on the performance of a contract or pre-contractual steps where applicable (Art. 6(1)(b)), and on your consent where requested (Art. 6(1)(a)).',
  },
  {
    title: 'No advertising tracking',
    body: 'We do not use Google Analytics, Meta Pixel, advertising cookies, or cross-session fingerprinting.',
  },
  {
    title: 'Retention',
    body: 'Server logs are retained for operational/security debugging for a maximum of 7 days. Email correspondence is retained only while the matter is active, subject to statutory retention obligations.',
  },
  {
    title: 'Your rights',
    body: 'You have the right to access, rectification, erasure, restriction, data portability and objection (Art. 15–21 GDPR). To exercise any right, contact office@mitterbergerlab.at.',
  },
  {
    title: 'Right to complain',
    body: 'You may lodge a complaint with the Austrian Data Protection Authority (Österreichische Datenschutzbehörde, Barichgasse 40-42, 1030 Vienna, dsb.gv.at).',
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
                  <h3 style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--foreground)', marginBottom: 'var(--space-2)' }}>
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
          <a href="mailto:office@mitterbergerlab.at" className="btn" style={{ minHeight: 40 }}>Contact</a>
        </div>
      </div>
    </main>
  );
}
