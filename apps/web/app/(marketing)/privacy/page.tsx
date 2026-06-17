import type { Metadata } from 'next';
import Link from 'next/link';
import { getServerLocale } from '@/lib/i18n/server';

export const metadata: Metadata = {
  title: 'Privacy Policy | ProBotica',
  description: 'How ProBotica handles personal data, session storage, AI model interactions, and GDPR compliance.',
};

const SECTIONS_EN = [
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

const SECTIONS_DE = [
  {
    title: 'Verantwortlicher',
    body: 'Verantwortlicher für die Datenverarbeitung (Art. 4 Z 7 DSGVO) ist Claus Nisslmüller e.U. (Inhaber: Claus Rainer Nisslmüller), Mitterbergerweg 6/EG/G02, 4040 Linz, Österreich. E-Mail: office@mitterbergerlab.at. ProBotica ist eine Marke/ein Projekt von Claus Nisslmüller e.U.',
  },
  {
    title: 'Erhobene Daten',
    body: 'Wir erheben nur die zum Betrieb der Plattform notwendigen Daten. Wenn du die KI-Demo oder das Bot Lab nutzt, wird deine Eingabe zur Inferenz über unseren Server an die OpenAI-API gesendet. Wir speichern keinen Prompt-Verlauf über die aktuelle Anfrage/Sitzung hinaus.',
  },
  {
    title: 'Lokaler & Sitzungsspeicher',
    body: 'Workspaces, Lernfortschritt und Einstellungen (Theme, Sprache) werden lokal in deinem Browser gespeichert (localStorage/Cookies). Sie werden nicht an unsere Server oder an Drittanbieter-Analytics übertragen. Das Leeren deines Browser-Speichers entfernt diese Daten.',
  },
  {
    title: 'Einsatz von KI-Systemen',
    body: 'Bei aktivierter Live-KI werden Prompts zur Modell-Inferenz an OpenAI (ein EU/US-Auftragsverarbeiter) weitergeleitet; unser Server fungiert als Vermittler und verknüpft Prompts nicht mit einer Nutzeridentität. Es gelten die Auftragsverarbeitungs-Bedingungen von OpenAI. Ohne API-Schlüssel wird eine deterministische lokale Demo-Ausgabe verwendet und kein Prompt verlässt die serverseitige Route.',
  },
  {
    title: 'Hosting',
    body: 'Die Website wird bei Vercel (Vercel Inc.) gehostet. Vercel verarbeitet Server-Logs (z. B. IP-Adresse, Request-Metadaten) als Auftragsverarbeiter in unserem Auftrag, um die Seite bereitzustellen und abzusichern.',
  },
  {
    title: 'Rechtsgrundlage',
    body: 'Die Verarbeitung stützt sich auf unser berechtigtes Interesse am Betrieb eines sicheren, funktionsfähigen Dienstes (Art. 6 Abs. 1 lit. f DSGVO), auf die Erfüllung eines Vertrags bzw. vorvertragliche Maßnahmen, soweit zutreffend (Art. 6 Abs. 1 lit. b), und auf deine Einwilligung, soweit eingeholt (Art. 6 Abs. 1 lit. a).',
  },
  {
    title: 'Kein Werbe-Tracking',
    body: 'Wir verwenden kein Google Analytics, kein Meta Pixel, keine Werbe-Cookies und kein sitzungsübergreifendes Fingerprinting.',
  },
  {
    title: 'Speicherdauer',
    body: 'Server-Logs werden zum Betriebs-/Sicherheits-Debugging maximal 7 Tage aufbewahrt. E-Mail-Korrespondenz wird nur während der aktiven Bearbeitung aufbewahrt, vorbehaltlich gesetzlicher Aufbewahrungspflichten.',
  },
  {
    title: 'Deine Rechte',
    body: 'Du hast das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung, Datenübertragbarkeit und Widerspruch (Art. 15–21 DSGVO). Zur Ausübung eines Rechts kontaktiere office@mitterbergerlab.at.',
  },
  {
    title: 'Beschwerderecht',
    body: 'Du kannst eine Beschwerde bei der Österreichischen Datenschutzbehörde einreichen (Barichgasse 40-42, 1030 Wien, dsb.gv.at).',
  },
];

const COPY = {
  en: {
    eyebrow: 'Legal',
    title: 'Privacy Policy',
    lead: 'How ProBotica handles personal data, analytics, and model interaction records.',
    imprint: 'Imprint',
    terms: 'Terms',
    contact: 'Contact',
  },
  de: {
    eyebrow: 'Rechtliches',
    title: 'Datenschutzerklärung',
    lead: 'Wie ProBotica mit personenbezogenen Daten, Analytics und Aufzeichnungen von Modell-Interaktionen umgeht.',
    imprint: 'Impressum',
    terms: 'AGB',
    contact: 'Kontakt',
  },
};

export default async function PrivacyPage() {
  const locale = await getServerLocale();
  const SECTIONS = locale === 'de' ? SECTIONS_DE : SECTIONS_EN;
  const c = locale === 'de' ? COPY.de : COPY.en;
  return (
    <main id="main-content" className="page-shell hud-grid bg-premium">
      <div className="container-x" style={{ maxWidth: '820px' }}>
        <p className="label-eyebrow mb-4">{c.eyebrow}</p>
        <h1 className="heading-section" style={{ maxWidth: '560px' }}>
          {c.title}
        </h1>
        <p className="text-lead mt-5 mb-10">
          {c.lead}
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
          <Link href="/imprint" className="btn" style={{ minHeight: 40 }}>{c.imprint}</Link>
          <Link href="/terms" className="btn" style={{ minHeight: 40 }}>{c.terms}</Link>
          <a href="mailto:office@mitterbergerlab.at" className="btn" style={{ minHeight: 40 }}>{c.contact}</a>
        </div>
      </div>
    </main>
  );
}
