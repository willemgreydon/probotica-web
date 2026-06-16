'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { useT } from '@/components/providers/LocaleProvider';

const KPI_ITEMS = [
  { value: '500+', label: 'Imported Bots', desc: 'Expert AI assistants across 12 domains', accent: true },
  { value: '10', label: 'Workflow Templates', desc: 'Chain bots into multi-step operations', accent: false },
  { value: 'Local-first', label: 'Workspaces', desc: 'Session memory, no data leakage', accent: false },
  { value: 'Server', label: 'Prompt Boundary', desc: 'System prompts never reach the client', accent: true },
  { value: 'Live', label: 'Bot Lab Testing', desc: 'Test any bot with real API calls', accent: false },
  { value: 'Full', label: 'Control Telemetry', desc: 'Runtime heatmap, readiness, alerts', accent: false },
];

const PROCESS_STEPS = [
  {
    n: '01',
    label: 'Test AI Assistants',
    sub: 'Open Bot Lab, pick from 500+ imported experts, run live API calls with real-time output.',
    href: '/bots',
    cta: 'Open Bot Lab',
  },
  {
    n: '02',
    label: 'Chain Workflows',
    sub: 'Connect bots into intake → analysis → execution → review pipelines. 10 templates ready.',
    href: '/workspace',
    cta: 'Launch Workspace',
  },
  {
    n: '03',
    label: 'Save & Replay',
    sub: 'Workspace keeps session memory, run history, and output snapshots locally — no leakage.',
    href: '/workspace',
    cta: 'Open Workspace',
  },
  {
    n: '04',
    label: 'Package for Business',
    sub: 'Export as Marketplace modules, prompt packs, or industry kits for client deployment.',
    href: '/marketplace',
    cta: 'View Marketplace',
  },
];

const STATUS_CHIPS = [
  { id: 'SYS', value: 'OPERATIONAL', ok: true },
  { id: 'BOTS', value: '500+ ACTIVE', ok: true },
  { id: 'REG', value: 'GDPR-EU', ok: false },
];

export function Hero() {
  const t = useT();
  return (
    <section
      id="top"
      className="relative overflow-hidden hud-grid"
      style={{ paddingTop: 'clamp(88px, 12vw, 120px)', paddingBottom: 'clamp(56px, 8vw, 88px)' }}
    >
      {/* Atmospheric glows */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 50% 60% at 80% 0%, color-mix(in oklab, var(--neon-cyan), transparent 82%) 0%, transparent 55%),
            radial-gradient(ellipse 40% 50% at 10% 60%, color-mix(in oklab, var(--neon-violet), transparent 88%) 0%, transparent 45%)
          `,
        }}
      />

      <div className="container-x relative z-10">
        {/* Status rail */}
        <div
          className="tech-rail mb-8 flex items-center gap-3 overflow-x-auto py-2"
          style={{ borderLeft: 'none', borderRight: 'none', paddingInline: 0 }}
        >
          {STATUS_CHIPS.map((chip) => (
            <span key={chip.id} className="mono-chip shrink-0 flex items-center gap-2">
              <span
                className="inline-block w-1.5 h-1.5 rounded-full"
                style={{
                  background: chip.ok ? 'var(--status-online)' : 'var(--muted-foreground)',
                  boxShadow: chip.ok ? '0 0 5px var(--status-online)' : 'none',
                }}
              />
              {chip.id}: {chip.value}
            </span>
          ))}
          <span className="mono-chip shrink-0">PROBOTICA AI OS</span>
        </div>

        {/* ── Two-column hero grid ── */}
        <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:gap-14 lg:items-start">

          {/* Left — headline + CTAs */}
          <div className="animate-in-up flex flex-col">
            <p className="label-eyebrow mb-4">{t('home.heroEyebrow')}</p>
            <h1 className="text-display text-balance" style={{ fontSize: 'clamp(2.2rem, 6.5vw, 5.8rem)' }}>
              <span className="block">{t('home.heroLine1')}</span>
              <span className="block" style={{ color: 'var(--primary)' }}>{t('home.heroLine2')}</span>
              <span className="block">{t('home.heroLine3')}</span>
              <span className="block" style={{ color: 'var(--secondary)' }}>{t('home.heroLine4')}</span>
            </h1>

            <p className="text-lead mt-6" style={{ maxWidth: '500px' }}>
              {t('home.heroLead')}
            </p>

            {/* Primary CTAs */}
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/bots" className="btn btn-primary group" style={{ minHeight: 48, paddingInline: 24 }}>
                {t('home.openBotLab')}
                <ArrowRight size={14} className="ml-2 transition-transform group-hover:translate-x-1" aria-hidden />
              </Link>
              <Link href="/workspace" className="btn" style={{ minHeight: 48, paddingInline: 24 }}>
                {t('home.launchWorkspace')}
              </Link>
              <Link
                href="/marketplace"
                className="inline-flex items-center gap-1.5 hover:text-foreground transition-colors"
                style={{
                  color: 'var(--muted-foreground)',
                  fontSize: '0.72rem',
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  fontFamily: 'var(--font-mono)',
                  minHeight: 48,
                  padding: '0 8px',
                }}
              >
                View Marketplace
                <ArrowRight size={11} aria-hidden />
              </Link>
            </div>
          </div>

          {/* Right — KPI command dashboard */}
          <div className="animate-in-up" style={{ animationDelay: '120ms' }}>
            <div
              className="relative overflow-hidden"
              style={{
                background: 'var(--command-surface)',
                border: '1px solid var(--hud-border)',
                borderRadius: 'var(--radius-xl)',
              }}
            >
              {/* Dashboard header bar */}
              <div
                className="flex items-center justify-between gap-3 px-5 py-3"
                style={{
                  borderBottom: '1px solid var(--hud-border)',
                  background: 'color-mix(in oklab, var(--command-surface), black 6%)',
                }}
              >
                <span className="edge-label">PROBOTICA / SYSTEM DASHBOARD</span>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full status-dot status-dot-online animate-pulse-dot" />
                  <span className="edge-label">LIVE</span>
                </div>
              </div>

              {/* KPI grid */}
              <div className="grid grid-cols-2 gap-px" style={{ background: 'var(--hud-border)' }}>
                {KPI_ITEMS.map((kpi, i) => (
                  <div
                    key={kpi.label}
                    className="flex flex-col gap-1 p-4"
                    style={{
                      background: 'var(--command-surface)',
                      borderRadius:
                        i === 0 ? '0' :
                        i === KPI_ITEMS.length - 1 ? '0 0 var(--radius-xl) 0' :
                        i === KPI_ITEMS.length - 2 ? '0 0 0 var(--radius-xl)' :
                        '0',
                    }}
                  >
                    <span
                      className="kpi-number"
                      style={{
                        color: kpi.accent ? 'var(--primary)' : 'var(--foreground)',
                        fontSize: 'clamp(1.1rem, 2vw, 1.5rem)',
                      }}
                    >
                      {kpi.value}
                    </span>
                    <span className="kpi-label">{kpi.label}</span>
                    <span className="kpi-desc">{kpi.desc}</span>
                  </div>
                ))}
              </div>

              {/* Dashboard footer */}
              <div
                className="flex flex-wrap items-center gap-4 px-5 py-3"
                style={{
                  borderTop: '1px solid var(--hud-border)',
                  background: 'color-mix(in oklab, var(--command-surface), black 6%)',
                }}
              >
                <Link
                  href="/control-center"
                  className="edge-label hover:text-foreground transition-colors"
                  style={{ textDecoration: 'none' }}
                >
                  → Control Center
                </Link>
                <Link
                  href="/knowledge"
                  className="edge-label hover:text-foreground transition-colors"
                  style={{ textDecoration: 'none' }}
                >
                  → Knowledge Universe
                </Link>
                <Link
                  href="/marketplace"
                  className="edge-label hover:text-foreground transition-colors ml-auto"
                  style={{ textDecoration: 'none' }}
                >
                  → Marketplace
                </Link>
              </div>

              {/* Decorative route marker */}
              <div
                className="route-marker absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none select-none hidden xl:block"
                style={{ writingMode: 'vertical-rl', opacity: 0.3 }}
              >
                MODULE / HERO / 01
              </div>
            </div>

            {/* Data rail below dashboard */}
            <div className="data-rail mt-4 flex-wrap gap-4">
              <div className="data-rail-item">
                <span className="data-rail-value">12</span>
                <span className="data-rail-label">Categories</span>
              </div>
              <div className="data-rail-sep" />
              <div className="data-rail-item">
                <span className="data-rail-value">10</span>
                <span className="data-rail-label">Workflows</span>
              </div>
              <div className="data-rail-sep" />
              <div className="data-rail-item">
                <span className="data-rail-value">EU</span>
                <span className="data-rail-label">GDPR Region</span>
              </div>
              <div className="data-rail-sep" />
              <div className="data-rail-item">
                <span className="data-rail-value" style={{ color: 'var(--status-online)' }}>Online</span>
                <span className="data-rail-label">Runtime Status</span>
              </div>
            </div>
          </div>
        </div>

        {/* ── Full-width process rail ── */}
        <div style={{ marginTop: 'clamp(32px, 5vw, 52px)' }}>
          {/* Rail header */}
          <div
            className="flex items-center gap-3 mb-5"
            style={{ borderBottom: '1px solid var(--hud-border)', paddingBottom: 12 }}
          >
            <span className="edge-label">HOW IT WORKS</span>
            <div style={{ flex: 1, height: 1, background: 'var(--hud-border)' }} />
            <span className="route-marker">4 STEPS</span>
          </div>

          <div className="process-rail">
            {PROCESS_STEPS.map((step) => (
              <Link
                key={step.n}
                href={step.href}
                className="process-card"
                aria-label={`Step ${step.n}: ${step.label} — ${step.cta}`}
              >
                <span className="process-card-index">{step.n}</span>
                <span className="process-card-title">{step.label}</span>
                <span className="process-card-body">{step.sub}</span>
                <span className="process-card-cta">→ {step.cta}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
