import type { Metadata } from 'next';
import Link from 'next/link';
import { getServerLocale } from '@/lib/i18n/server';
import { getPlatformStats } from '@/lib/content/platform-stats';

export const metadata: Metadata = {
  title: 'UX Audit Agents | ProBotica Solutions',
  description: 'Turn qualitative and quantitative UX signals into prioritized next actions. AI-powered usability diagnostics, onboarding audits, and conversion analysis.',
};

const UX_CAPABILITIES_EN = [
  { num: '01', title: 'Onboarding Friction Analysis', desc: 'Map every step of your user onboarding and identify the highest-friction drop-off points with AI.' },
  { num: '02', title: 'Conversion Audit', desc: 'Analyze conversion funnel signals and produce prioritized recommendations by revenue impact.' },
  { num: '03', title: 'Heuristic Evaluation', desc: 'Nielsen\'s 10 heuristics applied systematically to your product, with severity scores and fix suggestions.' },
  { num: '04', title: 'Usability Diagnostics', desc: 'Structured usability analysis from session recordings, heatmaps, or qualitative research notes.' },
];

const UX_CAPABILITIES_DE = [
  { num: '01', title: 'Onboarding-Reibungsanalyse', desc: 'Bilde jeden Schritt deines User-Onboardings ab und identifiziere mit KI die Drop-off-Punkte mit der höchsten Reibung.' },
  { num: '02', title: 'Conversion-Audit', desc: 'Analysiere Signale aus dem Conversion-Funnel und erstelle nach Umsatzwirkung priorisierte Empfehlungen.' },
  { num: '03', title: 'Heuristische Evaluation', desc: 'Nielsens 10 Heuristiken systematisch auf dein Produkt angewendet, mit Schweregrad-Bewertungen und Fix-Vorschlägen.' },
  { num: '04', title: 'Usability-Diagnostik', desc: 'Strukturierte Usability-Analyse aus Session-Recordings, Heatmaps oder qualitativen Research-Notizen.' },
];

export default async function UxAuditAgentsPage() {
  const locale = await getServerLocale();
  const stats = getPlatformStats();
  const UX_CAPABILITIES = locale === 'de' ? UX_CAPABILITIES_DE : UX_CAPABILITIES_EN;
  return (
    <main id="main-content" className="page-shell hud-grid bg-premium">
      <div className="container-x">
        <Link href="/solutions" className="inline-flex items-center gap-2 edge-label hover:text-foreground transition-colors mb-6" style={{ textDecoration: 'none' }}>
          ← {locale === 'de' ? 'Lösungen' : 'Solutions'}
        </Link>
        <p className="label-eyebrow mb-4">{locale === 'de' ? 'Lösungen / UX Audit Agents' : 'Solutions / UX Audit Agents'}</p>
        <h1 className="heading-section text-balance" style={{ maxWidth: '680px' }}>
          UX Audit Agents
        </h1>
        <p className="text-lead mt-5" style={{ maxWidth: '540px' }}>
          {locale === 'de'
            ? 'Verwandle qualitative und quantitative UX-Signale in priorisierte nächste Schritte. KI-gestützte Diagnostik für Onboarding, Conversion und Interface-Usability.'
            : 'Turn qualitative and quantitative UX signals into prioritized next actions. AI-powered diagnostics for onboarding, conversion, and interface usability.'}
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
            <span className="data-rail-value">{stats.avgReadiness}%</span>
            <span className="data-rail-label">{locale === 'de' ? 'Ø Readiness' : 'Avg readiness'}</span>
          </div>
        </div>

        <div className="mt-10 grid gap-3 sm:grid-cols-2 mb-10">
          {UX_CAPABILITIES.map((c) => (
            <div key={c.num} className="process-step" style={{ alignItems: 'flex-start' }}>
              <span className="process-step-num">{c.num}</span>
              <div>
                <b style={{ fontSize: '0.82rem', fontWeight: 800, display: 'block', letterSpacing: '0.02em', color: 'var(--foreground)', marginBottom: 4 }}>
                  {c.title}
                </b>
                <p className="text-body" style={{ fontSize: '0.84rem' }}>{c.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div
          className="p-5 mb-8"
          style={{ border: '1px solid var(--hud-border)', background: 'var(--command-surface)', borderRadius: 'var(--radius-lg)' }}
        >
          <p className="edge-label mb-2">{locale === 'de' ? 'Im Bot Lab' : 'In Bot Lab'}</p>
          <p className="text-body mb-4">
            {locale === 'de'
              ? 'Die UX-Audit-Kategorie in ProBotica enthält mehrere spezialisierte Bots für verschiedene Aspekte der UX-Analyse. Durchsuchen, live testen und in Workflows ausführen.'
              : 'The UX Audit category in ProBotica includes multiple specialized bots for different aspects of UX analysis. Browse, test live, and run in workflows.'}
          </p>
          <Link href="/categories/ux" className="btn btn-primary" style={{ minHeight: 40 }}>{locale === 'de' ? 'UX-Bots durchsuchen' : 'Browse UX Bots'}</Link>
        </div>

        <div className="flex flex-wrap gap-3">
          <Link href="/scenarios/ux-audit" className="btn btn-primary" style={{ minHeight: 44 }}>{locale === 'de' ? 'UX-Audit-Szenario starten' : 'Run UX Audit Scenario'}</Link>
          <Link href="/workflows/ux-audit-pipeline" className="btn" style={{ minHeight: 44 }}>{locale === 'de' ? 'UX-Audit-Pipeline' : 'UX Audit Pipeline'}</Link>
          <Link href="/contact" className="btn" style={{ minHeight: 44 }}>{locale === 'de' ? 'Individuelles Audit-Build' : 'Custom Audit Build'}</Link>
        </div>
      </div>
    </main>
  );
}
