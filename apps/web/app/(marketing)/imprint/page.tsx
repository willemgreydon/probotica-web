import type { Metadata } from 'next';
import Link from 'next/link';
import { getServerLocale } from '@/lib/i18n/server';

export const metadata: Metadata = {
  title: 'Imprint | ProBotica',
  description: 'Publisher information, contact details, and legal disclosures for ProBotica.',
};

const COPY = {
  en: {
    eyebrow: 'Legal',
    title: 'Imprint',
    lead: 'Publisher, contact information, and company disclosures as required by Austrian law (§ 5 ECG).',
    operatedBy: 'ProBotica is a brand/project operated by Claus Nisslmüller e.U.',
    owner: 'Owner (Inhaber): Claus Rainer Nisslmüller · Legal form: Einzelunternehmen (e.U.)',
    address: 'Address',
    contact: 'Contact',
    email: 'Email',
    phone: 'Phone',
    register: 'Company Register & Tax',
    authority: 'Trade & Supervisory Authority',
    purpose: 'Purpose of Platform',
    purposeBody: 'ProBotica is a commercial AI platform providing AI bot testing, workflow automation tools, and operational AI modules for business users.',
    law: 'Applicable Law & Disclaimer',
    lawBody: 'Austrian law applies; place of jurisdiction is Linz, Austria. Despite careful review, no liability is accepted for the content of external links — the operators of linked pages are solely responsible for their content.',
    privacy: 'Privacy Policy',
    terms: 'Terms',
  },
  de: {
    eyebrow: 'Rechtliches',
    title: 'Impressum',
    lead: 'Medieninhaber, Kontaktdaten und Unternehmensangaben gemäß österreichischem Recht (§ 5 ECG).',
    operatedBy: 'ProBotica ist eine Marke/ein Projekt von Claus Nisslmüller e.U.',
    owner: 'Inhaber: Claus Rainer Nisslmüller · Rechtsform: Einzelunternehmen (e.U.)',
    address: 'Adresse',
    contact: 'Kontakt',
    email: 'E-Mail',
    phone: 'Telefon',
    register: 'Firmenbuch & Steuer',
    authority: 'Gewerbe & Aufsichtsbehörde',
    purpose: 'Zweck der Plattform',
    purposeBody: 'ProBotica ist eine kommerzielle KI-Plattform, die KI-Bot-Tests, Workflow-Automatisierungs-Tools und operative KI-Module für Geschäftskund:innen bereitstellt.',
    law: 'Anwendbares Recht & Haftungsausschluss',
    lawBody: 'Es gilt österreichisches Recht; Gerichtsstand ist Linz, Österreich. Trotz sorgfältiger Prüfung wird keine Haftung für die Inhalte externer Links übernommen — für deren Inhalte sind ausschließlich die Betreiber der verlinkten Seiten verantwortlich.',
    privacy: 'Datenschutz',
    terms: 'AGB',
  },
};

export default async function ImprintPage() {
  const locale = await getServerLocale();
  const c = locale === 'de' ? COPY.de : COPY.en;
  return (
    <main id="main-content" className="page-shell hud-grid bg-premium">
      <div className="container-x" style={{ maxWidth: '680px' }}>
        <p className="label-eyebrow mb-4">{c.eyebrow}</p>
        <h1 className="heading-section" style={{ maxWidth: '480px' }}>
          {c.title}
        </h1>
        <p className="text-lead mt-5 mb-10">
          {c.lead}
        </p>

        <div
          className="p-6 space-y-6 mb-10"
          style={{ border: '1px solid var(--hud-border)', background: 'var(--command-surface)', borderRadius: 'var(--radius-xl)' }}
        >
          <div>
            <p className="edge-label mb-2">Medieninhaber & Diensteanbieter</p>
            <p style={{ fontSize: '0.9rem', color: 'var(--foreground)', fontWeight: 600 }}>Claus Nisslmüller e.U.</p>
            <p className="text-body">{c.operatedBy}</p>
            <p className="text-body mt-1">{c.owner}</p>
          </div>

          <div className="hud-line" />

          <div>
            <p className="edge-label mb-2">{c.address}</p>
            <p className="text-body">Mitterbergerweg 6/EG/G02, 4040 Linz, {locale === 'de' ? 'Österreich' : 'Austria'}</p>
          </div>

          <div className="hud-line" />

          <div>
            <p className="edge-label mb-2">{c.contact}</p>
            <p className="text-body">
              {c.email}: <a href="mailto:office@mitterbergerlab.at" style={{ color: 'var(--primary)', textDecoration: 'none' }}>office@mitterbergerlab.at</a>
            </p>
            <p className="text-body mt-1">
              {c.phone}: <a href="tel:+4369910873781" style={{ color: 'var(--primary)', textDecoration: 'none' }}>+43 699 108 737 81</a>
            </p>
          </div>

          <div className="hud-line" />

          <div>
            <p className="edge-label mb-2">{c.register}</p>
            <p className="text-body">UID-Nr.: ATU83081317</p>
            <p className="text-body mt-1">Firmenbuchnummer: FN 675809m · Firmenbuchgericht: Landesgericht Linz</p>
            <p className="text-body mt-1">GISA-Zahl: 39439086</p>
          </div>

          <div className="hud-line" />

          <div>
            <p className="edge-label mb-2">{c.authority}</p>
            <p className="text-body">Gewerbe: Dienstleistungen in der automatischen Datenverarbeitung und Informationstechnik</p>
            <p className="text-body mt-1">Mitgliedschaft: Wirtschaftskammer Oberösterreich</p>
            <p className="text-body mt-1">Aufsichtsbehörde: Magistrat der Stadt Linz · Gewerbeordnung: <a href="https://www.ris.bka.gv.at" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary)', textDecoration: 'none' }}>ris.bka.gv.at</a></p>
          </div>

          <div className="hud-line" />

          <div>
            <p className="edge-label mb-2">{c.purpose}</p>
            <p className="text-body">{c.purposeBody}</p>
          </div>

          <div className="hud-line" />

          <div>
            <p className="edge-label mb-2">{c.law}</p>
            <p className="text-body">{c.lawBody}</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          <Link href="/privacy" className="btn" style={{ minHeight: 40 }}>{c.privacy}</Link>
          <Link href="/terms" className="btn" style={{ minHeight: 40 }}>{c.terms}</Link>
        </div>
      </div>
    </main>
  );
}
