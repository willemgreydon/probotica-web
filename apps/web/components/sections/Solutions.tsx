'use client';

import Link from 'next/link';
import { ScrollReveal } from '@/components/motion/ScrollReveal';
import { useT } from '@/components/providers/LocaleProvider';

const MODULES = [
  {
    tag: 'BOT LAB',
    num: '01',
    title: 'Bot Lab',
    href: '/bots',
    text: '500+ imported expert bots across 12 domains. Test with live API, inspect capabilities, view safety notes and sample inputs.',
    stat: '500+ bots',
    color: 'var(--primary)',
  },
  {
    tag: 'WORKSPACE',
    num: '02',
    title: 'Workspace',
    href: '/workspace',
    text: 'Local-first session memory for bot results. Save outputs, replay history, and build multi-bot contexts without data leakage.',
    stat: 'Session memory',
    color: 'var(--secondary)',
  },
  {
    tag: 'WORKFLOWS',
    num: '03',
    title: 'Workflow Engine',
    href: '/marketplace',
    text: 'Chain bots into intake → analysis → execution → review pipelines. 10 production templates with configurable step topology.',
    stat: '10 templates',
    color: 'var(--neon-cyan)',
  },
  {
    tag: 'MARKETPLACE',
    num: '04',
    title: 'Marketplace',
    href: '/marketplace',
    text: 'Premium AI workflow packs, prompt systems, and industry kits. Operational modules packaged for real business use cases.',
    stat: 'Production kits',
    color: 'var(--accent)',
  },
  {
    tag: 'CONTROL CENTER',
    num: '05',
    title: 'Control Center',
    href: '/control-center',
    text: 'Runtime heatmap, readiness scoring, tactical alerts, category distribution, and system telemetry across all active bots.',
    stat: 'Full telemetry',
    color: 'var(--neon-lime)',
  },
  {
    tag: 'KNOWLEDGE',
    num: '06',
    title: 'Knowledge Universe',
    href: '/knowledge',
    text: 'Deep-dive AI concepts, prompt engineering guides, robotics primers, and learning paths — integrated into the OS layer.',
    stat: '10+ articles',
    color: 'var(--neon-orange)',
  },
];

export function Solutions() {
  const t = useT();
  return (
    <section id="solutions" className="hud-grid section-y">
      <div className="container-x">
        <ScrollReveal>
          <div className="section-header">
            <p className="section-header-eyebrow">{t('home.solEyebrow')}</p>
            <h2 className="section-header-title" style={{ maxWidth: '780px' }}>
              {t('home.solTitle')}
            </h2>
            <p className="section-header-body">
              {t('home.solBody')}
            </p>
          </div>
        </ScrollReveal>

        <div className="hud-line mb-8" />

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {MODULES.map((mod, i) => (
            <ScrollReveal key={mod.title} delay={i * 0.06}>
              <Link
                href={mod.href}
                className="module-card group relative overflow-hidden"
                style={{ minHeight: 240, textDecoration: 'none' }}
              >
                {/* Atmospheric glow on hover */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background: `radial-gradient(ellipse 60% 50% at 50% 0%, color-mix(in oklab, ${mod.color}, transparent 88%), transparent)`,
                  }}
                />
                <div className="module-card-header relative z-10">
                  <span className="tag" style={{ borderColor: `color-mix(in oklab, ${mod.color}, transparent 55%)`, color: mod.color }}>
                    {mod.tag}
                  </span>
                  <span className="route-marker">{mod.num}</span>
                </div>
                <div className="module-card-body relative z-10">
                  <h3
                    style={{
                      fontSize: 'clamp(1.05rem, 2vw, 1.22rem)',
                      fontWeight: 800,
                      letterSpacing: '-0.02em',
                      lineHeight: 1.2,
                      textTransform: 'uppercase',
                      color: 'var(--foreground)',
                      marginBottom: 'var(--space-3)',
                    }}
                  >
                    {mod.title}
                  </h3>
                  <p className="text-body">{mod.text}</p>
                </div>
                <div className="module-card-footer relative z-10">
                  <span
                    className="text-xs font-mono font-bold"
                    style={{ color: mod.color, letterSpacing: '0.12em', textTransform: 'uppercase', fontSize: '0.62rem' }}
                  >
                    {mod.stat}
                  </span>
                  <span
                    className="ml-auto flex items-center gap-1 text-xs"
                    style={{ color: 'var(--muted-foreground)', fontFamily: 'var(--font-mono)', fontSize: '0.62rem', letterSpacing: '0.12em', textTransform: 'uppercase' }}
                  >
                    Explore →
                  </span>
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
