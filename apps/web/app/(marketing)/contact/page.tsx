import type { Metadata } from 'next';
import Link from 'next/link';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';
import { getServerT, getServerLocale } from '@/lib/i18n/server';

export const metadata: Metadata = {
  title: 'Contact ProBotica | Book AI Briefing',
  description: 'Book a 30-minute AI workflow briefing. Map your highest-leverage automation path and ship a practical execution plan.',
};

const CONTACT_INFO_EN = [
  { icon: Mail, label: 'Email', value: 'hello@probotica.at', href: 'mailto:hello@probotica.at' },
  { icon: Phone, label: 'Phone', value: '+43 699 108 737 81', href: 'tel:+4369910873781' },
  { icon: MapPin, label: 'Location', value: 'Vienna, Austria', href: null },
  { icon: Clock, label: 'Response SLA', value: 'Under 24 hours', href: null },
];

const CONTACT_INFO_DE = [
  { icon: Mail, label: 'E-Mail', value: 'hello@probotica.at', href: 'mailto:hello@probotica.at' },
  { icon: Phone, label: 'Telefon', value: '+43 699 108 737 81', href: 'tel:+4369910873781' },
  { icon: MapPin, label: 'Standort', value: 'Wien, Österreich', href: null },
  { icon: Clock, label: 'Reaktions-SLA', value: 'Unter 24 Stunden', href: null },
];

const BRIEFING_INCLUDES_EN = [
  'Map your highest-leverage automation path',
  'Define system boundaries and data flows',
  'Identify which bots and workflows fit your use case',
  'Ship a practical execution plan',
  'Answer all technical and compliance questions',
];

const BRIEFING_INCLUDES_DE = [
  'Den wirkungsstärksten Automatisierungspfad kartieren',
  'Systemgrenzen und Datenflüsse definieren',
  'Passende Bots und Workflows für deinen Use Case identifizieren',
  'Einen praktischen Umsetzungsplan liefern',
  'Alle technischen und Compliance-Fragen beantworten',
];

const C_COPY = {
  en: {
    briefingTitle: '30-Minute Workflow Briefing',
    briefingLead: 'In one session we deliver a complete automation roadmap for your business.',
    callUs: 'Call Us',
    exploreFirst: 'Or explore first',
    openBotLab: '→ Open Bot Lab',
    viewMarketplace: '→ View Marketplace',
  },
  de: {
    briefingTitle: '30-minütiges Workflow-Briefing',
    briefingLead: 'In einer Sitzung liefern wir eine vollständige Automatisierungs-Roadmap für dein Unternehmen.',
    callUs: 'Anrufen',
    exploreFirst: 'Oder erst erkunden',
    openBotLab: '→ Bot Lab öffnen',
    viewMarketplace: '→ Marktplatz ansehen',
  },
};

export default async function ContactPage() {
  const t = await getServerT();
  const locale = await getServerLocale();
  const CONTACT_INFO = locale === 'de' ? CONTACT_INFO_DE : CONTACT_INFO_EN;
  const BRIEFING_INCLUDES = locale === 'de' ? BRIEFING_INCLUDES_DE : BRIEFING_INCLUDES_EN;
  const c = locale === 'de' ? C_COPY.de : C_COPY.en;
  return (
    <main id="main-content" className="page-shell hud-grid bg-premium">
      <div className="container-x">
        <p className="label-eyebrow mb-4">{t('pages.contactEyebrow')}</p>
        <h1 className="heading-section text-balance" style={{ maxWidth: '640px' }}>
          {t('pages.contactTitle')}
        </h1>
        <p className="text-lead mt-5" style={{ maxWidth: '520px' }}>
          {t('pages.contactLead')}
        </p>

        <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_360px]">
          {/* Briefing section */}
          <div
            className="relative overflow-hidden p-6 md:p-8"
            style={{ border: '1px solid var(--hud-border)', background: 'var(--command-surface)', borderRadius: 'var(--radius-xl)' }}
          >
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0"
              style={{ background: 'radial-gradient(ellipse 60% 70% at 80% 0%, color-mix(in oklab, var(--neon-cyan), transparent 86%), transparent)' }}
            />
            <div className="relative z-10">
              <p className="label-eyebrow mb-4">{c.briefingTitle}</p>
              <p className="text-lead mb-6" style={{ maxWidth: '480px' }}>
                {c.briefingLead}
              </p>
              <ul className="space-y-2 mb-8">
                {BRIEFING_INCLUDES.map((item) => (
                  <li key={item} className="process-step" style={{ flexDirection: 'row', gap: 'var(--space-3)' }}>
                    <span className="process-step-num" style={{ marginTop: 0 }}>→</span>
                    <span className="text-body" style={{ fontSize: '0.88rem' }}>{item}</span>
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-3">
                <a href="mailto:hello@probotica.at" className="btn btn-primary" style={{ minHeight: 48 }}>
                  <Mail size={14} className="mr-2" aria-hidden />
                  hello@probotica.at
                </a>
                <a href="tel:+4369910873781" className="btn" style={{ minHeight: 48 }}>
                  <Phone size={14} className="mr-2" aria-hidden />
                  {c.callUs}
                </a>
              </div>
            </div>
          </div>

          {/* Contact details */}
          <div className="space-y-3">
            {CONTACT_INFO.map((item) => (
              <div key={item.label} className="kpi-card">
                <div className="flex items-center gap-2 mb-1">
                  <item.icon size={12} style={{ color: 'var(--primary)' }} aria-hidden />
                  <span className="kpi-label">{item.label}</span>
                </div>
                {item.href ? (
                  <a href={item.href} style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--foreground)', fontFamily: 'var(--font-mono)', textDecoration: 'none' }}
                    className="hover:text-primary transition-colors">
                    {item.value}
                  </a>
                ) : (
                  <span style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--foreground)', fontFamily: 'var(--font-mono)' }}>
                    {item.value}
                  </span>
                )}
              </div>
            ))}

            <div className="kpi-card" style={{ marginTop: 'var(--space-4)' }}>
              <span className="kpi-label mb-2 block">{c.exploreFirst}</span>
              <div className="flex flex-col gap-2">
                <Link href="/bots" className="btn" style={{ minHeight: 40, justifyContent: 'flex-start', fontSize: '0.72rem' }}>{c.openBotLab}</Link>
                <Link href="/marketplace" className="btn" style={{ minHeight: 40, justifyContent: 'flex-start', fontSize: '0.72rem' }}>{c.viewMarketplace}</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
