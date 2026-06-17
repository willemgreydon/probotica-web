import type { Metadata } from 'next';
import Link from 'next/link';
import { Check } from 'lucide-react';
import { authLinks } from '@/lib/content/navigation';
import { getServerT, getServerLocale } from '@/lib/i18n/server';
import { getPlatformStats } from '@/lib/content/platform-stats';

export const metadata: Metadata = {
  title: 'Pricing',
  description: 'Simple, transparent plans for running AI bots, prompt packs and workflow automation. Start free, scale when you need to.',
};

/**
 * Pricing page (PB-025) — placeholder tier structure + contact CTA.
 * Real billing is deferred; this establishes the nav destination and IA.
 */
const TIERS_EN = [
  {
    name: 'Starter',
    price: '€0',
    cadence: '/ month',
    blurb: 'Explore the platform and the Knowledge Universe.',
    cta: { label: 'Get started', href: authLinks.getStarted.href },
    featured: false,
    features: ['Run demo bots', 'Full Knowledge Universe access', 'Community support', '1 workspace'],
  },
  {
    name: 'Pro',
    price: '€39',
    cadence: '/ month',
    blurb: 'For solo operators shipping real AI output.',
    cta: { label: 'Start Pro', href: authLinks.getStarted.href },
    featured: true,
    features: ['Live AI runs', 'Prompt packs & marketplace', 'Workflow automation', 'Unlimited workspaces', 'Export & versioning'],
  },
  {
    name: 'Team',
    price: 'Custom',
    cadence: '',
    blurb: 'For teams that need scale, control and compliance.',
    cta: { label: 'Contact sales', href: '/contact' },
    featured: false,
    features: ['Everything in Pro', 'Shared workspaces & roles', 'Control Center telemetry', 'GDPR & audit support', 'Priority support'],
  },
];

const TIERS_DE = [
  {
    name: 'Starter',
    price: '€0',
    cadence: '/ Monat',
    blurb: 'Plattform und Knowledge Universe erkunden.',
    cta: { label: 'Loslegen', href: authLinks.getStarted.href },
    featured: false,
    features: ['Demo-Bots ausführen', 'Voller Knowledge-Universe-Zugang', 'Community-Support', '1 Workspace'],
  },
  {
    name: 'Pro',
    price: '€39',
    cadence: '/ Monat',
    blurb: 'Für Einzelanwender:innen mit echtem KI-Output.',
    cta: { label: 'Pro starten', href: authLinks.getStarted.href },
    featured: true,
    features: ['Live-KI-Läufe', 'Prompt-Pakete & Marktplatz', 'Workflow-Automatisierung', 'Unbegrenzte Workspaces', 'Export & Versionierung'],
  },
  {
    name: 'Team',
    price: 'Individuell',
    cadence: '',
    blurb: 'Für Teams mit Bedarf an Skalierung, Kontrolle und Compliance.',
    cta: { label: 'Sales kontaktieren', href: '/contact' },
    featured: false,
    features: ['Alles aus Pro', 'Geteilte Workspaces & Rollen', 'Control-Center-Telemetrie', 'DSGVO- & Audit-Support', 'Priorisierter Support'],
  },
];

export default async function PricingPage() {
  const t = await getServerT();
  const locale = await getServerLocale();
  const stats = getPlatformStats();
  const tiers = locale === 'de' ? TIERS_DE : TIERS_EN;
  const PLAN_INCLUDES = [
    { value: `${stats.botCount}+`, label: 'Bots' },
    { value: `${stats.workflowCount}`, label: 'Workflows' },
    { value: `${stats.articleCount}`, label: locale === 'de' ? 'Wissensartikel' : 'Knowledge articles' },
    { value: `${stats.categoryCount}`, label: locale === 'de' ? 'Kategorien' : 'Categories' },
  ];
  return (
    <main id="main-content" className="page-shell hud-grid bg-premium">
      <div className="container-x">
        <p className="text-mono" style={{ fontSize: '.5625rem', fontWeight: 700, letterSpacing: '.35em', textTransform: 'uppercase', color: 'var(--muted-foreground)' }}>
          {t('pages.pricingEyebrow')}
        </p>
        <h1 className="text-display" style={{ marginTop: 12, marginBottom: 12 }}>
          {t('pages.pricingTitle')}
        </h1>
        <p className="text-body" style={{ maxWidth: 560, color: 'var(--muted-foreground)', marginBottom: 24 }}>
          {t('pages.pricingLead')}
        </p>

        <p className="label-eyebrow mb-4">{locale === 'de' ? 'In jedem Plan enthalten' : 'In every plan'}</p>
        <div className="data-rail flex-wrap gap-4" style={{ marginBottom: 40 }}>
          {PLAN_INCLUDES.map((s) => (
            <div key={s.label} className="data-rail-item">
              <span className="data-rail-value">{s.value}</span>
              <span className="data-rail-label">{s.label}</span>
            </div>
          ))}
        </div>

        <div
          style={{
            display: 'grid',
            gap: 20,
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            alignItems: 'stretch',
          }}
        >
          {tiers.map((tier) => (
            <section
              key={tier.name}
              aria-label={`${tier.name} plan`}
              style={{
                display: 'flex',
                flexDirection: 'column',
                padding: 24,
                borderRadius: 'var(--radius-xl)',
                border: `1px solid ${tier.featured ? 'var(--panel-border-active)' : 'var(--hud-border)'}`,
                background: 'var(--command-surface)',
                boxShadow: tier.featured ? 'var(--glow-sm)' : 'none',
              }}
            >
              <h2 className="text-mono" style={{ fontSize: '.66rem', fontWeight: 700, letterSpacing: '.24em', textTransform: 'uppercase', color: 'var(--muted-foreground)' }}>
                {tier.name}
              </h2>
              <div style={{ marginTop: 12, marginBottom: 8 }}>
                <span style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--foreground)' }}>{tier.price}</span>
                <span style={{ fontSize: '.8rem', color: 'var(--muted-foreground)' }}> {tier.cadence}</span>
              </div>
              <p className="text-body" style={{ fontSize: '.86rem', color: 'var(--muted-foreground)', minHeight: 44 }}>
                {tier.blurb}
              </p>
              <ul style={{ listStyle: 'none', margin: '16px 0 24px', padding: 0, display: 'grid', gap: 10 }}>
                {tier.features.map((feature) => (
                  <li key={feature} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, fontSize: '.84rem' }}>
                    <Check size={15} aria-hidden style={{ color: 'var(--primary)', flexShrink: 0, marginTop: 2 }} />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <Link
                href={tier.cta.href}
                className={`btn focus-ring ${tier.featured ? 'btn-primary' : ''}`}
                style={{ marginTop: 'auto', minHeight: 42, justifyContent: 'center' }}
              >
                {tier.cta.label}
              </Link>
            </section>
          ))}
        </div>

        <p className="text-body" style={{ marginTop: 32, fontSize: '.84rem', color: 'var(--muted-foreground)' }}>
          {locale === 'de' ? 'Etwas Spezielles nötig? ' : 'Need something specific? '}
          <Link href="/contact" className="focus-ring" style={{ color: 'var(--primary)' }}>
            {locale === 'de' ? 'Sprich mit uns' : 'Talk to us'}
          </Link>.
        </p>
      </div>
    </main>
  );
}
