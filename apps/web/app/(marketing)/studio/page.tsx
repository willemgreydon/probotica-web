import type { Metadata } from 'next';
import Link from 'next/link';
import { getServerT, getServerLocale } from '@/lib/i18n/server';
import { getPlatformStats } from '@/lib/content/platform-stats';

export const metadata: Metadata = {
  title: 'AI Studio | ProBotica',
  description: 'Design, test, and deploy production-ready AI agents. Live API demo with OpenAI GPT-4o, structured JSON output, and safe fallback states.',
};

const STUDIO_FEATURES_EN = [
  { num: '01', title: 'Live API Demo', desc: 'Test AI bots with real OpenAI API calls. No mock data — actual GPT-4o inference with your input.' },
  { num: '02', title: 'Structured Output', desc: 'All bot responses are typed and validated. JSON, text, or mixed output modes with Zod contracts.' },
  { num: '03', title: 'Safe Fallback', desc: 'Every bot has a deterministic fallback state for when the API is unavailable. Demo mode always works.' },
  { num: '04', title: 'Bot Categories', desc: 'Sales, UX, content, marketing, real estate, development, learning — all categories.' },
  { num: '05', title: 'Workflow Builder', desc: 'Chain bots into multi-step pipelines. Intake → Analysis → Execution → Review lanes.' },
  { num: '06', title: 'Server Boundary', desc: 'System prompts never reach the browser. All prompt logic is server-only for security.' },
];

const STUDIO_FEATURES_DE = [
  { num: '01', title: 'Live-API-Demo', desc: 'Teste KI-Bots mit echten OpenAI-API-Aufrufen. Keine Mock-Daten — echte GPT-4o-Inferenz mit deiner Eingabe.' },
  { num: '02', title: 'Strukturierte Ausgabe', desc: 'Alle Bot-Antworten sind typisiert und validiert. JSON-, Text- oder Mischmodus mit Zod-Verträgen.' },
  { num: '03', title: 'Sicherer Fallback', desc: 'Jeder Bot hat einen deterministischen Fallback-Zustand, falls die API nicht verfügbar ist. Der Demo-Modus funktioniert immer.' },
  { num: '04', title: 'Bot-Kategorien', desc: 'Vertrieb, UX, Content, Marketing, Immobilien, Entwicklung, Lernen — alle Kategorien.' },
  { num: '05', title: 'Workflow-Builder', desc: 'Verkette Bots zu mehrstufigen Pipelines. Intake → Analyse → Ausführung → Review-Bahnen.' },
  { num: '06', title: 'Server-Grenze', desc: 'System-Prompts erreichen niemals den Browser. Die gesamte Prompt-Logik bleibt aus Sicherheitsgründen serverseitig.' },
];

export default async function StudioPage() {
  const t = await getServerT();
  const locale = await getServerLocale();
  const stats = getPlatformStats();
  const STUDIO_FEATURES = locale === 'de' ? STUDIO_FEATURES_DE : STUDIO_FEATURES_EN;
  const STUDIO_KPIS = [
    { value: `${stats.botCount}+`, label: 'Bots' },
    { value: `${stats.categoryCount}`, label: locale === 'de' ? 'Kategorien' : 'Categories' },
    { value: `${stats.avgReadiness}%`, label: locale === 'de' ? 'Ø Readiness' : 'Avg readiness' },
    { value: `${stats.scenarioCount}`, label: locale === 'de' ? 'Szenarien' : 'Scenarios' },
  ];
  return (
    <main id="main-content" className="page-shell hud-grid bg-premium">
      <div className="container-x">
        <p className="label-eyebrow mb-4">{t('pages.studioEyebrow')}</p>
        <h1 className="heading-section text-balance" style={{ maxWidth: '640px' }}>
          {t('pages.studioTitle')}
        </h1>
        <p className="text-lead mt-5" style={{ maxWidth: '560px' }}>
          {t('pages.studioLead')}
        </p>

        <div className="data-rail flex-wrap gap-4 mt-8">
          {STUDIO_KPIS.map((s) => (
            <div key={s.label} className="data-rail-item">
              <span className="data-rail-value">{s.value}</span>
              <span className="data-rail-label">{s.label}</span>
            </div>
          ))}
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 mb-10">
          {STUDIO_FEATURES.map((f) => (
            <div key={f.num} className="module-card">
              <div className="module-card-header">
                <span className="route-marker">{f.num}</span>
                <span
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ background: 'var(--status-online)', boxShadow: '0 0 5px var(--status-online)' }}
                />
              </div>
              <div className="module-card-body">
                <h3 style={{ fontSize: '0.88rem', fontWeight: 800, letterSpacing: '-0.01em', color: 'var(--foreground)', marginBottom: 'var(--space-2)' }}>
                  {f.title}
                </h3>
                <p className="text-body" style={{ fontSize: '0.84rem' }}>{f.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div
          className="p-6 relative overflow-hidden mb-8"
          style={{ border: '1px solid var(--hud-border)', background: 'var(--command-surface)', borderRadius: 'var(--radius-xl)' }}
        >
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{ background: 'radial-gradient(ellipse 50% 60% at 70% 30%, color-mix(in oklab, var(--neon-cyan), transparent 87%), transparent)' }}
          />
          <div className="relative z-10">
            <p className="edge-label mb-3">{locale === 'de' ? 'STUDIO-STATUS' : 'STUDIO STATUS'}</p>
            <p style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--foreground)', lineHeight: 1.5 }}>
              {locale === 'de'
                ? 'Das KI-Studio-Demo-Panel ist in die Startseite integriert. Wähle einen Bot, gib einen Prompt ein und starte einen Live-API-Aufruf direkt aus der ProBotica-Oberfläche.'
                : 'The AI Studio demo panel is integrated into the homepage. Select a bot, enter a prompt, and run a live API call directly from the ProBotica interface.'}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          <Link href="/#openai-api" className="btn btn-primary" style={{ minHeight: 44 }}>{locale === 'de' ? 'Live-Studio-Demo' : 'Live Studio Demo'}</Link>
          <Link href="/bots" className="btn" style={{ minHeight: 44 }}>{locale === 'de' ? 'Bot Lab öffnen' : 'Open Bot Lab'}</Link>
          <Link href="/workspace" className="btn" style={{ minHeight: 44 }}>{locale === 'de' ? 'Workspace starten' : 'Launch Workspace'}</Link>
        </div>
      </div>
    </main>
  );
}
