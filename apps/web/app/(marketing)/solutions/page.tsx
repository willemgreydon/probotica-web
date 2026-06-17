import type { Metadata } from 'next';
import Link from 'next/link';
import { getServerT, getServerLocale } from '@/lib/i18n/server';
import { getPlatformStats } from '@/lib/content/platform-stats';
import { DistributionBars } from '@/components/visual/DistributionBars';

export const metadata: Metadata = {
  title: 'Solutions | ProBotica AI Stack',
  description: 'AI assistants, prompt packs, workflow automation, UX audit agents, and development bots. Choose the right ProBotica module for your team.',
};

const SOLUTIONS_EN = [
  {
    href: '/solutions/ai-assistants',
    tag: 'Assistants',
    title: 'AI Assistants',
    desc: 'Role-specific AI copilots for sales, UX, content, support, research, and operations. 500+ expert bots with typed output.',
    stat: '500+ bots',
    color: 'var(--primary)',
  },
  {
    href: '/solutions/prompt-packs',
    tag: 'Prompts',
    title: 'Prompt Packs',
    desc: 'Reusable, versioned prompt systems with role definitions, output contracts, and edge-case handling built in.',
    stat: 'Structured systems',
    color: 'var(--secondary)',
  },
  {
    href: '/solutions/workflow-automation',
    tag: 'Automation',
    title: 'Workflow Automation',
    desc: 'Chain bots into intake → analysis → execution → review pipelines. 10 production templates included.',
    stat: '10 templates',
    color: 'var(--neon-cyan)',
  },
  {
    href: '/solutions/ux-audit-agents',
    tag: 'UX',
    title: 'UX Audit Agents',
    desc: 'Usability diagnostics, onboarding friction analysis, and conversion audits with prioritized recommendations.',
    stat: 'Full diagnostics',
    color: 'var(--accent)',
  },
  {
    href: '/solutions/development-bots',
    tag: 'Dev',
    title: 'Development Bots',
    desc: 'A11y audits, code review, performance analysis, and safe deployment checklists for engineering teams.',
    stat: 'Engineering-grade',
    color: 'var(--neon-lime)',
  },
];

const SOLUTIONS_DE = [
  {
    href: '/solutions/ai-assistants',
    tag: 'Assistenten',
    title: 'KI-Assistenten',
    desc: 'Rollenspezifische KI-Copilots für Sales, UX, Content, Support, Research und Betrieb. 500+ Experten-Bots mit typisierter Ausgabe.',
    stat: '500+ Bots',
    color: 'var(--primary)',
  },
  {
    href: '/solutions/prompt-packs',
    tag: 'Prompts',
    title: 'Prompt-Pakete',
    desc: 'Wiederverwendbare, versionierte Prompt-Systeme mit Rollendefinitionen, Output-Verträgen und integriertem Edge-Case-Handling.',
    stat: 'Strukturierte Systeme',
    color: 'var(--secondary)',
  },
  {
    href: '/solutions/workflow-automation',
    tag: 'Automatisierung',
    title: 'Workflow-Automatisierung',
    desc: 'Bots zu Intake → Analyse → Ausführung → Review-Pipelines verketten. 10 produktionsreife Vorlagen enthalten.',
    stat: '10 Vorlagen',
    color: 'var(--neon-cyan)',
  },
  {
    href: '/solutions/ux-audit-agents',
    tag: 'UX',
    title: 'UX-Audit-Agenten',
    desc: 'Usability-Diagnostik, Analyse von Onboarding-Reibung und Conversion-Audits mit priorisierten Empfehlungen.',
    stat: 'Volle Diagnostik',
    color: 'var(--accent)',
  },
  {
    href: '/solutions/development-bots',
    tag: 'Dev',
    title: 'Entwicklungs-Bots',
    desc: 'A11y-Audits, Code-Reviews, Performance-Analysen und sichere Deployment-Checklisten für Engineering-Teams.',
    stat: 'Engineering-Grade',
    color: 'var(--neon-lime)',
  },
];

export default async function SolutionsPage() {
  const t = await getServerT();
  const locale = await getServerLocale();
  const stats = getPlatformStats();
  const SOLUTIONS = locale === 'de' ? SOLUTIONS_DE : SOLUTIONS_EN;
  const explore = locale === 'de' ? 'Ansehen →' : 'Explore →';
  return (
    <main id="main-content" className="page-shell hud-grid bg-premium">
      <div className="container-x">
        <p className="label-eyebrow mb-4">{t('pages.solutionsEyebrow')}</p>
        <h1 className="heading-section text-balance" style={{ maxWidth: '680px' }}>
          {t('pages.solutionsTitle')}
        </h1>
        <p className="text-lead mt-5" style={{ maxWidth: '540px' }}>
          {t('pages.solutionsLead')}
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
            <span className="data-rail-value">{stats.workflowCount}</span>
            <span className="data-rail-label">Workflows</span>
          </div>
          <div className="data-rail-sep" />
          <div className="data-rail-item">
            <span className="data-rail-value">{stats.avgReadiness}%</span>
            <span className="data-rail-label">{locale === 'de' ? 'Ø Readiness' : 'Avg readiness'}</span>
          </div>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 mb-10">
          {SOLUTIONS.map((s) => (
            <Link
              key={s.href}
              href={s.href}
              className="module-card group"
              style={{ textDecoration: 'none', minHeight: 220 }}
            >
              <div className="module-card-header">
                <span className="tag" style={{ borderColor: `color-mix(in oklab, ${s.color}, transparent 55%)`, color: s.color }}>
                  {s.tag}
                </span>
              </div>
              <div className="module-card-body">
                <h3 style={{ fontSize: '1rem', fontWeight: 800, letterSpacing: '-0.01em', color: 'var(--foreground)', marginBottom: 'var(--space-2)' }}>
                  {s.title}
                </h3>
                <p className="text-body">{s.desc}</p>
              </div>
              <div className="module-card-footer">
                <span style={{ fontSize: '0.62rem', fontWeight: 700, color: s.color, fontFamily: 'var(--font-mono)', letterSpacing: '0.14em', textTransform: 'uppercase' }}>
                  {s.stat}
                </span>
                <span className="ml-auto edge-label">{explore}</span>
              </div>
            </Link>
          ))}
        </div>

        <div className="mb-10">
          <DistributionBars
            title={locale === 'de' ? 'Bots nach Kategorie' : 'Bots by category'}
            data={stats.categoryCounts.slice(0, 8).map((c) => ({ label: c.label, value: c.count }))}
          />
        </div>

        <div className="flex flex-wrap gap-3">
          <Link href="/bots" className="btn btn-primary" style={{ minHeight: 44 }}>{locale === 'de' ? 'Bot Lab öffnen' : 'Open Bot Lab'}</Link>
          <Link href="/marketplace" className="btn" style={{ minHeight: 44 }}>{locale === 'de' ? 'Marktplatz ansehen' : 'View Marketplace'}</Link>
          <Link href="/contact" className="btn" style={{ minHeight: 44 }}>{locale === 'de' ? 'Mit uns sprechen' : 'Talk to Us'}</Link>
        </div>
      </div>
    </main>
  );
}
