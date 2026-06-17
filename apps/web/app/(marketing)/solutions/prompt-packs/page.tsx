import type { Metadata } from 'next';
import Link from 'next/link';
import { getServerLocale } from '@/lib/i18n/server';
import { getPlatformStats } from '@/lib/content/platform-stats';

export const metadata: Metadata = {
  title: 'Prompt Packs | ProBotica Solutions',
  description: 'Reusable, versioned prompt systems for repeatable high-quality AI output. Role definitions, output contracts, and edge-case handling included.',
};

const PACK_FEATURES_EN = [
  { num: '01', title: 'Role Definitions', desc: 'Each pack includes a structured persona with domain expertise, behavioral constraints, and tone guidelines.' },
  { num: '02', title: 'Output Contracts', desc: 'Prompts produce typed, predictable output — JSON, structured text, or mixed modes with Zod-style validation.' },
  { num: '03', title: 'Edge Case Handling', desc: 'Every prompt system includes fallback instructions for ambiguous input, missing data, and boundary conditions.' },
  { num: '04', title: 'Version Control', desc: 'Prompt systems are versioned. Changes are tracked so you can audit prompt evolution and rollback if needed.' },
];

const PACK_FEATURES_DE = [
  { num: '01', title: 'Rollendefinitionen', desc: 'Jeder Pack enthält eine strukturierte Persona mit Domänen-Expertise, Verhaltensgrenzen und Tonalitäts-Richtlinien.' },
  { num: '02', title: 'Output-Verträge', desc: 'Prompts liefern typisierte, vorhersehbare Outputs — JSON, strukturierter Text oder gemischte Modi mit Zod-artiger Validierung.' },
  { num: '03', title: 'Edge-Case-Handling', desc: 'Jedes Prompt-System enthält Fallback-Anweisungen für mehrdeutige Eingaben, fehlende Daten und Grenzfälle.' },
  { num: '04', title: 'Versionskontrolle', desc: 'Prompt-Systeme sind versioniert. Änderungen werden nachverfolgt, sodass du die Prompt-Entwicklung auditieren und bei Bedarf zurücksetzen kannst.' },
];

export default async function PromptPacksPage() {
  const locale = await getServerLocale();
  const stats = getPlatformStats();
  const PACK_FEATURES = locale === 'de' ? PACK_FEATURES_DE : PACK_FEATURES_EN;
  return (
    <main id="main-content" className="page-shell hud-grid bg-premium">
      <div className="container-x">
        <Link href="/solutions" className="inline-flex items-center gap-2 edge-label hover:text-foreground transition-colors mb-6" style={{ textDecoration: 'none' }}>
          ← {locale === 'de' ? 'Lösungen' : 'Solutions'}
        </Link>
        <p className="label-eyebrow mb-4">{locale === 'de' ? 'Lösungen / Prompt Packs' : 'Solutions / Prompt Packs'}</p>
        <h1 className="heading-section text-balance" style={{ maxWidth: '680px' }}>
          Prompt Packs
        </h1>
        <p className="text-lead mt-5" style={{ maxWidth: '540px' }}>
          {locale === 'de'
            ? 'Wiederverwendbare, versionierte Prompt-Systeme für reproduzierbare Ergebnisse in höchster Qualität. Gebaut für Teams, die konsistente KI-Ergebnisse über viele Use Cases hinweg brauchen.'
            : 'Reusable, versioned prompt systems for repeatable high-quality output. Built for teams who need consistent AI results across multiple use cases.'}
        </p>

        <div className="data-rail flex-wrap gap-4 mt-8">
          <div className="data-rail-item">
            <span className="data-rail-value">{stats.botCount}+</span>
            <span className="data-rail-label">Bots</span>
          </div>
          <div className="data-rail-sep" />
          <div className="data-rail-item">
            <span className="data-rail-value">{stats.categoryCount}</span>
            <span className="data-rail-label">{locale === 'de' ? 'Kategorien' : 'Categories'}</span>
          </div>
          <div className="data-rail-sep" />
          <div className="data-rail-item">
            <span className="data-rail-value">{stats.scenarioCount}</span>
            <span className="data-rail-label">{locale === 'de' ? 'Szenarien' : 'Scenarios'}</span>
          </div>
        </div>

        <div className="mt-10 grid gap-3 sm:grid-cols-2 mb-10">
          {PACK_FEATURES.map((f) => (
            <div key={f.num} className="process-step">
              <span className="process-step-num">{f.num}</span>
              <div>
                <b style={{ fontSize: '0.8rem', fontWeight: 800, display: 'block', letterSpacing: '0.02em', color: 'var(--foreground)', marginBottom: 4 }}>
                  {f.title}
                </b>
                <p className="text-body" style={{ fontSize: '0.84rem' }}>{f.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div
          className="p-5 mb-8 relative overflow-hidden"
          style={{ border: '1px solid var(--hud-border)', background: 'var(--command-surface)', borderRadius: 'var(--radius-lg)' }}
        >
          <p className="edge-label mb-2">{locale === 'de' ? 'ProBotica Ansatz' : 'ProBotica Approach'}</p>
          <p className="text-body">
            {locale === 'de'
              ? 'Alle 500+ importierten Bots in ProBotica basieren auf strukturierten Prompt-Systemen. Durchsuche das Bot Lab, um Prompt-Architekturen in Aktion zu sehen, sie live zu testen und die passenden für deinen Use Case zu deployen.'
              : 'All 500+ imported bots in ProBotica are built on structured prompt systems. Browse the Bot Lab to see prompt architectures in action, test them live, and deploy the ones that fit your use case.'}
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <Link href="/bots" className="btn btn-primary" style={{ minHeight: 44 }}>{locale === 'de' ? 'Bot-Prompts durchsuchen' : 'Browse Bot Prompts'}</Link>
          <Link href="/scenarios/lead-qualification" className="btn" style={{ minHeight: 44 }}>{locale === 'de' ? 'Szenario-Beispiele ansehen' : 'View Scenario Examples'}</Link>
          <Link href="/contact" className="btn" style={{ minHeight: 44 }}>{locale === 'de' ? 'Individuelles Prompt-Build' : 'Custom Prompt Build'}</Link>
        </div>
      </div>
    </main>
  );
}
