import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Imprint | ProBotica',
  description: 'Publisher information, contact details, and legal disclosures for ProBotica.',
};

export default function ImprintPage() {
  return (
    <main id="main-content" className="page-shell hud-grid bg-premium">
      <div className="container-x" style={{ maxWidth: '680px' }}>
        <p className="label-eyebrow mb-4">Legal</p>
        <h1 className="heading-section" style={{ maxWidth: '480px' }}>
          Imprint
        </h1>
        <p className="text-lead mt-5 mb-10">
          Publisher, contact information, and company disclosures as required by Austrian law (§ 5 ECG).
        </p>

        <div
          className="p-6 space-y-6 mb-10"
          style={{ border: '1px solid var(--hud-border)', background: 'var(--command-surface)', borderRadius: 'var(--radius-xl)' }}
        >
          <div>
            <p className="edge-label mb-2">Publisher / Medieninhaber</p>
            <p style={{ fontSize: '0.9rem', color: 'var(--foreground)', fontWeight: 600 }}>ProBotica</p>
            <p className="text-body">Vienna, Austria</p>
          </div>

          <div className="hud-line" />

          <div>
            <p className="edge-label mb-2">Contact</p>
            <p className="text-body">
              Email: <a href="mailto:hello@probotica.at" style={{ color: 'var(--primary)', textDecoration: 'none' }}>hello@probotica.at</a>
            </p>
            <p className="text-body mt-1">
              Phone: <a href="tel:+4369910873781" style={{ color: 'var(--primary)', textDecoration: 'none' }}>+43 699 108 737 81</a>
            </p>
          </div>

          <div className="hud-line" />

          <div>
            <p className="edge-label mb-2">Purpose of Platform</p>
            <p className="text-body">ProBotica is a commercial AI platform providing AI bot testing, workflow automation tools, and operational AI modules for business users.</p>
          </div>

          <div className="hud-line" />

          <div>
            <p className="edge-label mb-2">Applicable Law</p>
            <p className="text-body">Austrian law applies. Jurisdiction: Vienna, Austria.</p>
          </div>

          <div className="hud-line" />

          <div>
            <p className="edge-label mb-2">Disclaimer</p>
            <p className="text-body">
              Despite careful review, ProBotica accepts no liability for the content of external links. The operators of linked pages are solely responsible for their content.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          <Link href="/privacy" className="btn" style={{ minHeight: 40 }}>Privacy Policy</Link>
          <Link href="/terms" className="btn" style={{ minHeight: 40 }}>Terms</Link>
        </div>
      </div>
    </main>
  );
}
