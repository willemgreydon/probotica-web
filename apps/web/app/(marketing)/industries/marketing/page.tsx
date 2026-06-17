import type { Metadata } from 'next';
import Link from 'next/link';
import { getServerLocale } from '@/lib/i18n/server';
import { getPlatformStats } from '@/lib/content/platform-stats';

export const metadata: Metadata = {
  title: 'Marketing AI | ProBotica Industries',
  description: 'Campaign systems, content operations, audience targeting, and conversion optimization AI for growth and marketing teams.',
};

const FEATURES_EN = [
  { num: '01', title: 'Campaign Planning', desc: 'Full campaign plans with channel breakdown, hooks, and CTA variant sets for any target audience and budget.' },
  { num: '02', title: 'Content Operations', desc: 'Content briefs, SEO outlines, and publication-ready articles generated from structured brand inputs.' },
  { num: '03', title: 'Audience Targeting', desc: 'Persona definitions, segment mapping, and messaging frameworks tailored per audience profile.' },
  { num: '04', title: 'Conversion Optimization', desc: 'Landing page, email, and ad copy optimization with A/B variant generation and performance hypotheses.' },
];

const FEATURES_DE = [
  { num: '01', title: 'Kampagnenplanung', desc: 'Vollständige Kampagnenpläne mit Kanal-Aufschlüsselung, Hooks und CTA-Varianten-Sets für jede Zielgruppe und jedes Budget.' },
  { num: '02', title: 'Content-Operations', desc: 'Content-Briefings, SEO-Gliederungen und veröffentlichungsfertige Artikel, erstellt aus strukturierten Brand-Inputs.' },
  { num: '03', title: 'Zielgruppen-Targeting', desc: 'Persona-Definitionen, Segment-Mapping und Messaging-Frameworks, zugeschnitten auf jedes Zielgruppenprofil.' },
  { num: '04', title: 'Conversion-Optimierung', desc: 'Optimierung von Landingpages, E-Mails und Anzeigentexten mit A/B-Varianten-Erstellung und Performance-Hypothesen.' },
];

export default async function MarketingPage() {
  const locale = await getServerLocale();
  const stats = getPlatformStats();
  const FEATURES = locale === 'de' ? FEATURES_DE : FEATURES_EN;
  const KPIS = [
    { value: `${stats.botCount}+`, label: 'Bots' },
    { value: `${stats.workflowCount}`, label: 'Workflows' },
    { value: `${stats.avgReadiness}%`, label: locale === 'de' ? 'Ø Readiness' : 'Avg readiness' },
    { value: `${stats.scenarioCount}`, label: locale === 'de' ? 'Szenarien' : 'Scenarios' },
  ];
  return (
    <main id="main-content" className="page-shell hud-grid bg-premium">
      <div className="container-x">
        <Link href="/industries" className="inline-flex items-center gap-2 edge-label hover:text-foreground transition-colors mb-6" style={{ textDecoration: 'none' }}>
          {locale === 'de' ? '← Branchen' : '← Industries'}
        </Link>
        <p className="label-eyebrow mb-4">{locale === 'de' ? 'Branchen / Marketing' : 'Industries / Marketing'}</p>
        <h1 className="heading-section text-balance" style={{ maxWidth: '680px' }}>
          {locale === 'de' ? 'KI für Marketing' : 'Marketing AI'}
        </h1>
        <p className="text-lead mt-5" style={{ maxWidth: '540px' }}>
          {locale === 'de'
            ? 'Kampagnensysteme, Content-Operations und Conversion-Optimierung für Growth-Teams. KI-gestützte Marketing-Intelligence vom Briefing bis zum Launch.'
            : 'Campaign systems, content operations, and conversion optimization for growth teams. AI-powered marketing intelligence from brief to launch.'}
        </p>

        <div className="data-rail flex-wrap gap-4 mt-8">
          {KPIS.map((k) => (
            <div key={k.label} className="data-rail-item">
              <span className="data-rail-value">{k.value}</span>
              <span className="data-rail-label">{k.label}</span>
            </div>
          ))}
        </div>

        <div className="mt-10 grid gap-3 sm:grid-cols-2 mb-10">
          {FEATURES.map((f) => (
            <div key={f.num} className="process-step" style={{ alignItems: 'flex-start' }}>
              <span className="process-step-num">{f.num}</span>
              <div>
                <b style={{ fontSize: '0.82rem', fontWeight: 800, display: 'block', letterSpacing: '0.02em', color: 'var(--foreground)', marginBottom: 4 }}>
                  {f.title}
                </b>
                <p className="text-body" style={{ fontSize: '0.84rem' }}>{f.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap gap-3">
          <Link href="/categories/marketing" className="btn btn-primary" style={{ minHeight: 44 }}>{locale === 'de' ? 'Marketing-Bots' : 'Marketing Bots'}</Link>
          <Link href="/categories/content" className="btn" style={{ minHeight: 44 }}>{locale === 'de' ? 'Content-Bots' : 'Content Bots'}</Link>
          <Link href="/scenarios/marketing-campaign" className="btn" style={{ minHeight: 44 }}>{locale === 'de' ? 'Kampagnen-Szenario' : 'Campaign Scenario'}</Link>
          <Link href="/contact" className="btn" style={{ minHeight: 44 }}>{locale === 'de' ? 'Individueller Build' : 'Custom Build'}</Link>
        </div>
      </div>
    </main>
  );
}
