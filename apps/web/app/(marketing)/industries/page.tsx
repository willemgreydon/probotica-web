import type { Metadata } from 'next';
import Link from 'next/link';
import { getServerT, getServerLocale } from '@/lib/i18n/server';

export const metadata: Metadata = {
  title: 'Industries | ProBotica Applied AI',
  description: 'Applied AI operating models for real estate, marketing, and education teams. Domain-tuned bots, workflows, and industry kits.',
};

const INDUSTRIES_EN = [
  {
    href: '/industries/real-estate',
    tag: 'Real Estate',
    title: 'Real Estate AI',
    desc: 'Lead qualification, listing intelligence, buyer/seller inquiry handling, and automated agent communications.',
    color: 'var(--primary)',
  },
  {
    href: '/industries/marketing',
    tag: 'Marketing',
    title: 'Marketing AI',
    desc: 'Campaign systems, content operations, audience targeting, and conversion optimization for growth teams.',
    color: 'var(--accent)',
  },
  {
    href: '/industries/education',
    tag: 'Education',
    title: 'Education AI',
    desc: 'Learning assistants, skill plan generation, and pedagogy-aligned automation for modern education teams.',
    color: 'var(--neon-cyan)',
  },
];

const INDUSTRIES_DE = [
  {
    href: '/industries/real-estate',
    tag: 'Immobilien',
    title: 'KI für Immobilien',
    desc: 'Lead-Qualifizierung, Listing-Intelligence, Bearbeitung von Käufer-/Verkäuferanfragen und automatisierte Makler-Kommunikation.',
    color: 'var(--primary)',
  },
  {
    href: '/industries/marketing',
    tag: 'Marketing',
    title: 'KI für Marketing',
    desc: 'Kampagnensysteme, Content-Operations, Zielgruppen-Targeting und Conversion-Optimierung für Growth-Teams.',
    color: 'var(--accent)',
  },
  {
    href: '/industries/education',
    tag: 'Bildung',
    title: 'KI für Bildung',
    desc: 'Lernassistenten, Erstellung von Skill-Plänen und didaktisch ausgerichtete Automatisierung für moderne Bildungsteams.',
    color: 'var(--neon-cyan)',
  },
];

export default async function IndustriesPage() {
  const t = await getServerT();
  const locale = await getServerLocale();
  const INDUSTRIES = locale === 'de' ? INDUSTRIES_DE : INDUSTRIES_EN;
  return (
    <main id="main-content" className="page-shell hud-grid bg-premium">
      <div className="container-x">
        <p className="label-eyebrow mb-4">{t('pages.industriesEyebrow')}</p>
        <h1 className="heading-section text-balance" style={{ maxWidth: '680px' }}>
          {t('pages.industriesTitle')}
        </h1>
        <p className="text-lead mt-5" style={{ maxWidth: '520px' }}>
          {t('pages.industriesLead')}
        </p>

        <div className="mt-10 grid gap-4 sm:grid-cols-3 mb-10">
          {INDUSTRIES.map((ind) => (
            <Link
              key={ind.href}
              href={ind.href}
              className="module-card group"
              style={{ textDecoration: 'none', minHeight: 200 }}
            >
              <div className="module-card-header">
                <span className="tag" style={{ borderColor: `color-mix(in oklab, ${ind.color}, transparent 55%)`, color: ind.color }}>
                  {ind.tag}
                </span>
              </div>
              <div className="module-card-body">
                <h3 style={{ fontSize: '1rem', fontWeight: 800, letterSpacing: '-0.01em', color: 'var(--foreground)', marginBottom: 'var(--space-2)' }}>
                  {ind.title}
                </h3>
                <p className="text-body">{ind.desc}</p>
              </div>
              <div className="module-card-footer">
                <span className="edge-label" style={{ color: ind.color }}>{locale === 'de' ? 'Playbook ansehen →' : 'View Playbook →'}</span>
              </div>
            </Link>
          ))}
        </div>

        <div className="flex flex-wrap gap-3">
          <Link href="/bots" className="btn btn-primary" style={{ minHeight: 44 }}>{locale === 'de' ? 'Alle Bots entdecken' : 'Explore All Bots'}</Link>
          <Link href="/contact" className="btn" style={{ minHeight: 44 }}>{locale === 'de' ? 'Individueller Branchen-Build' : 'Custom Industry Build'}</Link>
        </div>
      </div>
    </main>
  );
}
