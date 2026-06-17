import type { Metadata } from 'next';
import Link from 'next/link';
import { getServerT, getServerLocale } from '@/lib/i18n/server';
import { getPlatformStats } from '@/lib/content/platform-stats';

export const metadata: Metadata = {
  title: 'Shop | ProBotica Marketplace',
  description: 'Browse prompt packs, AI workflow kits, and industry-ready bot modules from the ProBotica Marketplace.',
};

const SHOP_CATEGORIES_EN = (botCount: number) => [
  { tag: 'Workflows', title: 'Workflow Automation Packs', desc: 'Pre-built multi-step bot pipelines for sales, UX, content, and operations.', href: '/marketplace', count: 'Templates', browse: 'Browse →' },
  { tag: 'Bots', title: 'Expert Bot Collection', desc: `${botCount}+ domain-tuned AI assistants across every business category. Browse, test, deploy.`, href: '/bots', count: `${botCount}+ bots`, browse: 'Browse →' },
  { tag: 'Prompts', title: 'Prompt Engineering Systems', desc: 'Structured prompt packs with role definitions, output contracts, and edge-case handling.', href: '/solutions/prompt-packs', count: 'Premium packs', browse: 'Browse →' },
  { tag: 'Industries', title: 'Industry Kits', desc: 'Bundled AI modules for real estate, marketing, education, and development teams.', href: '/industries', count: 'Industries', browse: 'Browse →' },
];

const SHOP_CATEGORIES_DE = (botCount: number) => [
  { tag: 'Workflows', title: 'Workflow-Automatisierungs-Pakete', desc: 'Vorgefertigte mehrstufige Bot-Pipelines für Sales, UX, Content und Betrieb.', href: '/marketplace', count: 'Vorlagen', browse: 'Ansehen →' },
  { tag: 'Bots', title: 'Experten-Bot-Sammlung', desc: `${botCount}+ domänen-optimierte KI-Assistenten über alle Geschäftsbereiche. Durchsuchen, testen, einsetzen.`, href: '/bots', count: `${botCount}+ Bots`, browse: 'Ansehen →' },
  { tag: 'Prompts', title: 'Prompt-Engineering-Systeme', desc: 'Strukturierte Prompt-Pakete mit Rollendefinitionen, Output-Verträgen und Edge-Case-Handling.', href: '/solutions/prompt-packs', count: 'Premium-Pakete', browse: 'Ansehen →' },
  { tag: 'Industries', title: 'Branchen-Kits', desc: 'Gebündelte KI-Module für Immobilien-, Marketing-, Bildungs- und Entwicklungsteams.', href: '/industries', count: 'Branchen', browse: 'Ansehen →' },
];

export default async function ShopPage() {
  const t = await getServerT();
  const locale = await getServerLocale();
  const stats = getPlatformStats();
  const categories = (locale === 'de' ? SHOP_CATEGORIES_DE : SHOP_CATEGORIES_EN)(stats.botCount);
  const KPIS = [
    { value: `${stats.botCount}+`, label: 'Bots' },
    { value: `${stats.workflowCount}`, label: locale === 'de' ? 'Workflows / Vorlagen' : 'Workflows / Templates' },
    { value: `${stats.scenarioCount}`, label: locale === 'de' ? 'Szenarien' : 'Scenarios' },
    { value: `${stats.categoryCount}`, label: locale === 'de' ? 'Kategorien' : 'Categories' },
  ];
  return (
    <main id="main-content" className="page-shell hud-grid bg-premium">
      <div className="container-x">
        <p className="label-eyebrow mb-4">{t('pages.shopEyebrow')}</p>
        <h1 className="heading-section text-balance" style={{ maxWidth: '640px' }}>
          {t('pages.shopTitle')}
        </h1>
        <p className="text-lead mt-5" style={{ maxWidth: '520px' }}>
          {t('pages.shopLead')}
        </p>

        <div className="data-rail flex-wrap gap-4 mt-8 mb-2">
          {KPIS.map((k) => (
            <div key={k.label} className="data-rail-item">
              <span className="data-rail-value">{k.value}</span>
              <span className="data-rail-label">{k.label}</span>
            </div>
          ))}
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 mb-10">
          {categories.map((cat) => (
            <Link
              key={cat.title}
              href={cat.href}
              className="module-card group"
              style={{ textDecoration: 'none', minHeight: 180 }}
            >
              <div className="module-card-header">
                <span className="mono-chip">{cat.tag}</span>
                <span className="edge-label">{cat.count}</span>
              </div>
              <div className="module-card-body">
                <h3 style={{ fontSize: '1rem', fontWeight: 800, letterSpacing: '-0.01em', color: 'var(--foreground)', marginBottom: 'var(--space-2)' }}>
                  {cat.title}
                </h3>
                <p className="text-body">{cat.desc}</p>
              </div>
              <div className="module-card-footer">
                <span className="edge-label" style={{ color: 'var(--primary)' }}>{cat.browse}</span>
              </div>
            </Link>
          ))}
        </div>

        <div
          className="p-5 relative overflow-hidden mb-8"
          style={{ border: '1px solid var(--hud-border)', background: 'var(--command-surface)', borderRadius: 'var(--radius-lg)' }}
        >
          <p className="edge-label mb-2">{locale === 'de' ? 'Individuelle Module' : 'Custom Modules'}</p>
          <p className="text-body mb-4">
            {locale === 'de'
              ? 'Brauchst du ein individuelles KI-Modul für deinen spezifischen Geschäftsprozess? Buche ein Briefing und wir scopen es gemeinsam.'
              : 'Need a custom AI module for your specific business process? Book a briefing and we’ll scope it together.'}
          </p>
          <Link href="/contact" className="btn btn-primary" style={{ minHeight: 44 }}>
            {locale === 'de' ? 'Individuelles Briefing buchen' : 'Book Custom Briefing'}
          </Link>
        </div>
      </div>
    </main>
  );
}
