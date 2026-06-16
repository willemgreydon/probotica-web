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
            <p className="edge-label mb-2">Medieninhaber & Diensteanbieter</p>
            <p style={{ fontSize: '0.9rem', color: 'var(--foreground)', fontWeight: 600 }}>Claus Nisslmüller e.U.</p>
            <p className="text-body">ProBotica is a brand/project operated by Claus Nisslmüller e.U.</p>
            <p className="text-body mt-1">Owner (Inhaber): Claus Rainer Nisslmüller · Legal form: Einzelunternehmen (e.U.)</p>
          </div>

          <div className="hud-line" />

          <div>
            <p className="edge-label mb-2">Address</p>
            <p className="text-body">Mitterbergerweg 6/EG/G02, 4040 Linz, Austria</p>
          </div>

          <div className="hud-line" />

          <div>
            <p className="edge-label mb-2">Contact</p>
            <p className="text-body">
              Email: <a href="mailto:office@mitterbergerlab.at" style={{ color: 'var(--primary)', textDecoration: 'none' }}>office@mitterbergerlab.at</a>
            </p>
            <p className="text-body mt-1">
              Phone: <a href="tel:+4369910873781" style={{ color: 'var(--primary)', textDecoration: 'none' }}>+43 699 108 737 81</a>
            </p>
          </div>

          <div className="hud-line" />

          <div>
            <p className="edge-label mb-2">Company Register & Tax</p>
            <p className="text-body">UID-Nr.: ATU83081317</p>
            <p className="text-body mt-1">Firmenbuchnummer: FN 675809m · Firmenbuchgericht: Landesgericht Linz</p>
            <p className="text-body mt-1">GISA-Zahl: 39439086</p>
          </div>

          <div className="hud-line" />

          <div>
            <p className="edge-label mb-2">Trade & Supervisory Authority</p>
            <p className="text-body">Gewerbe: Dienstleistungen in der automatischen Datenverarbeitung und Informationstechnik</p>
            <p className="text-body mt-1">Mitgliedschaft: Wirtschaftskammer Oberösterreich</p>
            <p className="text-body mt-1">Aufsichtsbehörde: Magistrat der Stadt Linz · Gewerbeordnung: <a href="https://www.ris.bka.gv.at" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary)', textDecoration: 'none' }}>ris.bka.gv.at</a></p>
          </div>

          <div className="hud-line" />

          <div>
            <p className="edge-label mb-2">Purpose of Platform</p>
            <p className="text-body">ProBotica is a commercial AI platform providing AI bot testing, workflow automation tools, and operational AI modules for business users.</p>
          </div>

          <div className="hud-line" />

          <div>
            <p className="edge-label mb-2">Applicable Law & Disclaimer</p>
            <p className="text-body">Austrian law applies; place of jurisdiction is Linz, Austria. Despite careful review, no liability is accepted for the content of external links — the operators of linked pages are solely responsible for their content.</p>
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
