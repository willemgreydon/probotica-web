import type { Metadata } from 'next';
import Link from 'next/link';
import { getServerLocale } from '@/lib/i18n/server';
import { getPlatformStats } from '@/lib/content/platform-stats';

export const metadata: Metadata = {
  title: 'Development Bots | ProBotica Solutions',
  description: 'Engineering AI copilots for code review, accessibility audits, frontend quality assurance, and safe deployment workflows.',
};

const DEV_CAPABILITIES_EN = [
  { num: '01', title: 'A11y Review', desc: 'Systematic accessibility audit across React/Next.js components. WCAG 2.1 compliance checks with prioritized fixes.' },
  { num: '02', title: 'Performance Audit', desc: 'Render optimization analysis, bundle size review, and Core Web Vitals improvement recommendations.' },
  { num: '03', title: 'Code Quality Review', desc: 'Architecture review, naming consistency, anti-pattern detection, and refactoring suggestions.' },
  { num: '04', title: 'Safe Deployment Check', desc: 'Pre-deployment checklist generation with migration safety, rollback plans, and monitoring notes.' },
];

const DEV_CAPABILITIES_DE = [
  { num: '01', title: 'A11y Review', desc: 'Systematisches Accessibility-Audit über React/Next.js-Komponenten. WCAG-2.1-Compliance-Checks mit priorisierten Fixes.' },
  { num: '02', title: 'Performance-Audit', desc: 'Analyse der Render-Optimierung, Bundle-Size-Review und Empfehlungen zur Verbesserung der Core Web Vitals.' },
  { num: '03', title: 'Code-Quality-Review', desc: 'Architektur-Review, Namens-Konsistenz, Anti-Pattern-Erkennung und Refactoring-Vorschläge.' },
  { num: '04', title: 'Safe-Deployment-Check', desc: 'Generierung einer Pre-Deployment-Checkliste mit Migrationssicherheit, Rollback-Plänen und Monitoring-Notizen.' },
];

export default async function DevelopmentBotsPage() {
  const locale = await getServerLocale();
  const stats = getPlatformStats();
  const DEV_CAPABILITIES = locale === 'de' ? DEV_CAPABILITIES_DE : DEV_CAPABILITIES_EN;
  return (
    <main id="main-content" className="page-shell hud-grid bg-premium">
      <div className="container-x">
        <Link href="/solutions" className="inline-flex items-center gap-2 edge-label hover:text-foreground transition-colors mb-6" style={{ textDecoration: 'none' }}>
          ← {locale === 'de' ? 'Lösungen' : 'Solutions'}
        </Link>
        <p className="label-eyebrow mb-4">{locale === 'de' ? 'Lösungen / Development Bots' : 'Solutions / Development Bots'}</p>
        <h1 className="heading-section text-balance" style={{ maxWidth: '680px' }}>
          Development Bots
        </h1>
        <p className="text-lead mt-5" style={{ maxWidth: '540px' }}>
          {locale === 'de'
            ? 'Engineering-KI-Copilots mit Fokus auf Qualität, Tempo und sicheres Deployment. Accessibility-Audits, Code-Review und Performance-Analyse, gebaut für Frontend- und Fullstack-Teams.'
            : 'Engineering AI copilots focused on quality, speed, and safe deployment. Accessibility audits, code review, and performance analysis built for frontend and fullstack teams.'}
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
          {DEV_CAPABILITIES.map((c) => (
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
              ? 'Durchsuche die Development-Kategorie nach Frontend-Review-Bots, A11y-Auditoren und Deployment-Safety-Checkern.'
              : 'Browse the Development category for frontend review bots, A11y auditors, and deployment safety checkers.'}
          </p>
          <Link href="/categories/development" className="btn btn-primary" style={{ minHeight: 40 }}>{locale === 'de' ? 'Development-Bots durchsuchen' : 'Browse Development Bots'}</Link>
        </div>

        <div className="flex flex-wrap gap-3">
          <Link href="/scenarios/frontend-review" className="btn btn-primary" style={{ minHeight: 44 }}>{locale === 'de' ? 'Frontend-Review-Szenario' : 'Frontend Review Scenario'}</Link>
          <Link href="/workflows/frontend-review-chain" className="btn" style={{ minHeight: 44 }}>{locale === 'de' ? 'Review-Chain-Workflow' : 'Review Chain Workflow'}</Link>
          <Link href="/contact" className="btn" style={{ minHeight: 44 }}>{locale === 'de' ? 'Individuelles Dev-Build' : 'Custom Dev Build'}</Link>
        </div>
      </div>
    </main>
  );
}
