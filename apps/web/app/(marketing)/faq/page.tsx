import type { Metadata } from 'next';
import Link from 'next/link';
import { getServerT, getServerLocale } from '@/lib/i18n/server';
import { getPlatformStats } from '@/lib/content/platform-stats';

export const metadata: Metadata = {
  title: 'FAQ | ProBotica',
  description: 'Answers about ProBotica pricing, rollout, GDPR compliance, AI integrations, bot safety, and support.',
};

const FAQS_EN = [
  {
    q: 'What is ProBotica?',
    a: 'ProBotica is an AI operating system that combines 500+ expert bots, a workflow engine, workspace memory, a marketplace, and a control-center telemetry dashboard into one practical platform for business AI operations.',
  },
  {
    q: 'Do I need an OpenAI API key to use ProBotica?',
    a: 'For live model output, yes — a valid OpenAI API key is required. Without one, every bot returns a deterministic, bot-specific simulated preview so the platform always works.',
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
    a: 'Sales, UX, content, marketing, real estate, development, learning, automation, research, support, strategy, and more — across all categories with 500+ expert bots.',
  },
  {
    q: 'Can I chain multiple bots together?',
    a: 'Yes. The Workflow Engine lets you chain bots into intake → analysis → execution → review pipelines. Production workflow templates are included and fully configurable.',
  },
  {
    q: 'What is the Workspace?',
    a: 'The Workspace is a local-first session memory layer. You can save bot outputs, replay history, and build multi-bot context without any data leaving the current session.',
  },
  {
    q: 'How do I get started?',
    a: 'Open the Bot Lab to browse all bots, or jump directly to the Workspace to start a workflow session. The homepage includes a live AI demo you can run immediately.',
  },
];

const FAQS_DE = [
  {
    q: 'Was ist ProBotica?',
    a: 'ProBotica ist ein KI-Betriebssystem, das 500+ Experten-Bots, eine Workflow-Engine, Workspace-Speicher, einen Marktplatz und ein Control-Center-Telemetrie-Dashboard zu einer praktischen Plattform für KI-Geschäftsabläufe vereint.',
  },
  {
    q: 'Brauche ich einen OpenAI-API-Schlüssel?',
    a: 'Für echte Modellausgaben ja — ein gültiger OpenAI-API-Schlüssel ist erforderlich. Ohne Schlüssel liefert jeder Bot eine deterministische, bot-spezifische, simulierte Vorschau, sodass die Plattform immer funktioniert.',
  },
  {
    q: 'Sind System-Prompts sicher?',
    a: 'Ja. Alle System-Prompts werden ausschließlich serverseitig gespeichert und ausgeführt. Sie erscheinen nie in API-Antworten, Client-JavaScript-Bundles oder Browser-Netzwerk-Logs. ProBotica erzwingt dies über eine Next.js-Server-Grenze.',
  },
  {
    q: 'Ist ProBotica DSGVO-konform?',
    a: 'ProBotica ist für den EU-Markt gebaut. Kein sitzungsübergreifendes Tracking, kein Opt-in für Trainingsdaten und standardmäßig keine Drittanbieter-Analytics. Datenflüsse sind eingegrenzt und dokumentiert.',
  },
  {
    q: 'Welche Bereiche decken die Bots ab?',
    a: 'Sales, UX, Content, Marketing, Immobilien, Entwicklung, Lernen, Automatisierung, Research, Support, Strategie und mehr — über alle Kategorien hinweg mit 500+ Experten-Bots.',
  },
  {
    q: 'Kann ich mehrere Bots verketten?',
    a: 'Ja. Die Workflow-Engine verkettet Bots zu Intake → Analyse → Ausführung → Review-Pipelines. Produktionsreife Workflow-Vorlagen sind enthalten und vollständig konfigurierbar.',
  },
  {
    q: 'Was ist der Workspace?',
    a: 'Der Workspace ist eine local-first Sitzungs-Speicherschicht. Du kannst Bot-Ausgaben speichern, den Verlauf erneut abspielen und Multi-Bot-Kontext aufbauen, ohne dass Daten die aktuelle Sitzung verlassen.',
  },
  {
    q: 'Wie fange ich an?',
    a: 'Öffne das Bot Lab, um alle Bots zu durchsuchen, oder gehe direkt zum Workspace, um eine Workflow-Sitzung zu starten. Die Startseite enthält eine Live-KI-Demo, die du sofort ausführen kannst.',
  },
];

export default async function FaqPage() {
  const t = await getServerT();
  const locale = await getServerLocale();
  const stats = getPlatformStats();
  const faqs = locale === 'de' ? FAQS_DE : FAQS_EN;
  const KPIS = [
    { value: `${stats.botCount}+`, label: 'Bots' },
    { value: `${stats.workflowCount}`, label: 'Workflows' },
    { value: `${stats.articleCount}`, label: locale === 'de' ? 'Artikel' : 'Articles' },
    { value: `${stats.categoryCount}`, label: locale === 'de' ? 'Kategorien' : 'Categories' },
  ];
  return (
    <main id="main-content" className="page-shell hud-grid bg-premium">
      <div className="container-x">
        <p className="label-eyebrow mb-4">{t('pages.faqEyebrow')}</p>
        <h1 className="heading-section text-balance" style={{ maxWidth: '640px' }}>
          {t('pages.faqTitle')}
        </h1>
        <p className="text-lead mt-5" style={{ maxWidth: '520px' }}>
          {t('pages.faqLead')}
        </p>

        <div className="data-rail flex-wrap gap-4 mt-8">
          {KPIS.map((k) => (
            <div key={k.label} className="data-rail-item">
              <span className="data-rail-value">{k.value}</span>
              <span className="data-rail-label">{k.label}</span>
            </div>
          ))}
        </div>

        <div className="mt-10 space-y-3 mb-10">
          {faqs.map((item, i) => (
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
          <Link href="/bots" className="btn btn-primary" style={{ minHeight: 44 }}>
            {locale === 'de' ? 'Bot Lab öffnen' : 'Open Bot Lab'}
          </Link>
          <Link href="/contact" className="btn" style={{ minHeight: 44 }}>
            {locale === 'de' ? 'Noch Fragen?' : 'Still have questions?'}
          </Link>
        </div>
      </div>
    </main>
  );
}
