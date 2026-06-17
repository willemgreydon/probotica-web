import type { Metadata } from 'next';
import Link from 'next/link';
import { getServerT, getServerLocale } from '@/lib/i18n/server';

export const metadata: Metadata = {
  title: 'About ProBotica | AI Operating System',
  description: 'ProBotica builds practical AI operating systems — expert bots, workflow execution, workspace memory, and control-center telemetry for real business tasks.',
};

const VALUES_EN = [
  { title: 'Practical First', text: 'Every module ships with real API integration, typed outputs, and safe fallbacks. No vaporware.' },
  { title: 'Server-Safe', text: 'System prompts never reach the client. All sensitive logic lives behind a Next.js server boundary.' },
  { title: 'GDPR-Native', text: 'Built for the EU. No training data opt-in, no cross-session tracking, scoped data flows.' },
  { title: 'Modular by Design', text: 'Use Bot Lab standalone, chain into Workflows, monitor in Control Center. Each module works independently.' },
];

const VALUES_DE = [
  { title: 'Praxis zuerst', text: 'Jedes Modul kommt mit echter API-Integration, typisierten Ausgaben und sicheren Fallbacks. Keine Luftschlösser.' },
  { title: 'Server-sicher', text: 'System-Prompts erreichen nie den Client. Sämtliche sensible Logik liegt hinter einer Next.js-Server-Grenze.' },
  { title: 'DSGVO-nativ', text: 'Für die EU gebaut. Kein Opt-in für Trainingsdaten, kein sitzungsübergreifendes Tracking, eingegrenzte Datenflüsse.' },
  { title: 'Modular by Design', text: 'Bot Lab eigenständig nutzen, in Workflows verketten, im Control Center überwachen. Jedes Modul funktioniert unabhängig.' },
];

const STACK_EN = [
  { label: 'Runtime', value: 'Next.js 15' },
  { label: 'AI', value: 'OpenAI GPT-4o' },
  { label: 'Region', value: 'EU / GDPR' },
  { label: 'Bots', value: '500+ experts' },
  { label: 'Workflows', value: '10 templates' },
  { label: 'Security', value: 'Server boundary' },
];

const STACK_DE = [
  { label: 'Runtime', value: 'Next.js 15' },
  { label: 'KI', value: 'OpenAI GPT-4o' },
  { label: 'Region', value: 'EU / DSGVO' },
  { label: 'Bots', value: '500+ Experten' },
  { label: 'Workflows', value: '10 Vorlagen' },
  { label: 'Sicherheit', value: 'Server-Grenze' },
];

const COPY = {
  en: {
    mission: 'Mission',
    missionQuote: '"Turn expert-level AI prompts into deployable, production-safe operating modules that any business team can use without an AI engineer."',
    coreValues: 'Core Values',
    technicalFoundation: 'Technical Foundation',
    openBotLab: 'Open Bot Lab',
    launchWorkspace: 'Launch Workspace',
    talk: 'Talk to ProBotica',
  },
  de: {
    mission: 'Mission',
    missionQuote: '„Experten-KI-Prompts in einsatzfertige, produktionssichere Betriebsmodule verwandeln, die jedes Business-Team ohne KI-Engineer nutzen kann."',
    coreValues: 'Grundwerte',
    technicalFoundation: 'Technisches Fundament',
    openBotLab: 'Bot Lab öffnen',
    launchWorkspace: 'Workspace starten',
    talk: 'Mit ProBotica sprechen',
  },
};

export default async function AboutPage() {
  const t = await getServerT();
  const locale = await getServerLocale();
  const VALUES = locale === 'de' ? VALUES_DE : VALUES_EN;
  const STACK = locale === 'de' ? STACK_DE : STACK_EN;
  const c = locale === 'de' ? COPY.de : COPY.en;
  return (
    <main id="main-content" className="page-shell hud-grid bg-premium">
      <div className="container-x">
        <p className="label-eyebrow mb-4">{t('pages.aboutEyebrow')}</p>
        <h1 className="heading-section text-balance" style={{ maxWidth: '720px' }}>
          {t('pages.aboutTitle')}
        </h1>
        <p className="text-lead mt-5" style={{ maxWidth: '580px' }}>
          {t('pages.aboutLead')}
        </p>

        <div
          className="mt-10 mb-10 p-6 relative overflow-hidden"
          style={{ border: '1px solid var(--hud-border)', background: 'var(--command-surface)', borderRadius: 'var(--radius-xl)' }}
        >
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{ background: 'radial-gradient(ellipse 60% 80% at 80% 0%, color-mix(in oklab, var(--neon-cyan), transparent 85%), transparent)' }}
          />
          <div className="relative z-10">
            <p className="label-eyebrow mb-3">{c.mission}</p>
            <p style={{ fontSize: 'clamp(1.05rem, 2vw, 1.25rem)', fontWeight: 700, lineHeight: 1.55, color: 'var(--foreground)', maxWidth: '640px' }}>
              {c.missionQuote}
            </p>
          </div>
        </div>

        <p className="label-eyebrow mb-5">{c.coreValues}</p>
        <div className="grid gap-4 sm:grid-cols-2 mb-10">
          {VALUES.map((v) => (
            <div key={v.title} className="kpi-card">
              <span className="kpi-label">{v.title}</span>
              <p className="text-body mt-2">{v.text}</p>
            </div>
          ))}
        </div>

        <p className="label-eyebrow mb-4">{c.technicalFoundation}</p>
        <div className="data-rail flex-wrap gap-4 mb-10">
          {STACK.map((s) => (
            <div key={s.label} className="data-rail-item">
              <span className="data-rail-value">{s.value}</span>
              <span className="data-rail-label">{s.label}</span>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap gap-3">
          <Link href="/bots" className="btn btn-primary" style={{ minHeight: 44 }}>{c.openBotLab}</Link>
          <Link href="/workspace" className="btn" style={{ minHeight: 44 }}>{c.launchWorkspace}</Link>
          <Link href="/contact" className="btn" style={{ minHeight: 44 }}>{c.talk}</Link>
        </div>
      </div>
    </main>
  );
}
