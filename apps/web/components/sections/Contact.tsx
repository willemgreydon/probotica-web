'use client';

import Link from 'next/link';
import { ScrollReveal } from '@/components/motion/ScrollReveal';
import { ArrowRight, Mail, Phone, MapPin, Clock } from 'lucide-react';
import { useT } from '@/components/providers/LocaleProvider';

const CONTACT_FACTS = [
  { icon: MapPin, label: 'Location', value: 'Vienna / Austria' },
  { icon: Clock, label: 'Response SLA', value: '< 24h' },
  { icon: Mail, label: 'Compliance', value: 'GDPR Ready' },
];

const QUICK_LINKS = [
  { label: 'Book AI Briefing', href: '/contact', primary: true },
  { label: 'View Bot Lab', href: '/bots', primary: false },
  { label: 'Open Workspace', href: '/workspace', primary: false },
];

export function Contact() {
  const t = useT();
  return (
    <section id="contact" className="hud-grid section-y">
      <div className="container-x">
        <div
          className="relative overflow-hidden"
          style={{
            border: '1px solid var(--hud-border)',
            background: 'var(--command-surface)',
            borderRadius: 'var(--radius-xl)',
            padding: 'clamp(28px, 5vw, 56px)',
          }}
        >
          {/* Background glow */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              background: `
                radial-gradient(ellipse 50% 60% at 90% 10%, color-mix(in oklab, var(--neon-cyan), transparent 88%), transparent 50%),
                radial-gradient(ellipse 40% 50% at 10% 90%, color-mix(in oklab, var(--neon-violet), transparent 90%), transparent 40%)
              `,
            }}
          />

          <div className="relative z-10">
            <div className="hud-line mb-8" />

            <div className="grid gap-10 lg:grid-cols-[1fr_auto]">
              <ScrollReveal>
                <div>
                  <p className="section-header-eyebrow">{t('home.contactEyebrow')}</p>
                  <h2 className="section-header-title text-balance mt-3" style={{ maxWidth: '720px' }}>
                    {t('home.contactTitle')}
                  </h2>
                  <p className="section-header-body" style={{ maxWidth: '520px' }}>
                    {t('home.contactBody')}
                  </p>

                  <div className="mt-8 flex flex-wrap items-center gap-3">
                    <a
                      href="mailto:hello@probotica.at"
                      className="btn btn-primary group"
                      style={{ minHeight: 48 }}
                    >
                      <Mail size={14} className="mr-2" aria-hidden />
                      hello@probotica.at
                      <ArrowRight size={13} className="ml-2 transition-transform group-hover:translate-x-1" aria-hidden />
                    </a>
                    <a href="tel:+4369910873781" className="btn" style={{ minHeight: 48 }}>
                      <Phone size={14} className="mr-2" aria-hidden />
                      +43 699 108 737 81
                    </a>
                  </div>
                </div>
              </ScrollReveal>

              {/* Contact facts */}
              <ScrollReveal delay={0.1}>
                <div className="grid gap-3 lg:w-56">
                  {CONTACT_FACTS.map((fact) => (
                    <div key={fact.label} className="kpi-card" style={{ gap: 'var(--space-2)' }}>
                      <div className="flex items-center gap-2">
                        <fact.icon size={12} style={{ color: 'var(--primary)', flexShrink: 0 }} aria-hidden />
                        <span className="kpi-label">{fact.label}</span>
                      </div>
                      <span style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--foreground)', fontFamily: 'var(--font-mono)', letterSpacing: '0.06em' }}>
                        {fact.value}
                      </span>
                    </div>
                  ))}
                </div>
              </ScrollReveal>
            </div>

            <div className="hud-line mt-8 mb-6" />

            <div className="flex flex-wrap gap-3">
              {QUICK_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={link.primary ? 'btn btn-primary' : 'btn'}
                  style={{ minHeight: 40 }}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
