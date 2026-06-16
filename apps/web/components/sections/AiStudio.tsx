'use client';

import Link from 'next/link';
import { AiDemoPanel } from '@/components/ai/AiDemoPanel';
import { ScrollReveal } from '@/components/motion/ScrollReveal';
import { useT } from '@/components/providers/LocaleProvider';

const CAPABILITIES = [
  { label: 'Structured JSON', desc: 'Type-safe output with Zod validation', color: 'var(--primary)' },
  { label: 'Safe Fallbacks', desc: 'Demo mode runs without API key', color: 'var(--secondary)' },
  { label: 'Server Boundary', desc: 'System prompts never reach the client', color: 'var(--neon-lime)' },
  { label: 'Domain-tuned Models', desc: 'Per-category temperature + prompt tuning', color: 'var(--accent)' },
];

export function AiStudio() {
  const t = useT();
  return (
    <section id="openai-api" className="hud-grid section-y">
      <div className="container-x grid items-start gap-10 lg:grid-cols-[1fr_1.4fr]">
        <ScrollReveal>
          <div className="section-header" style={{ marginBottom: 'var(--space-8)' }}>
            <p className="section-header-eyebrow">{t('home.studioEyebrow')}</p>
            <h2 className="section-header-title" style={{ maxWidth: '480px' }}>
              {t('home.studioTitle')}
            </h2>
            <p className="section-header-body" style={{ maxWidth: '420px' }}>
              {t('home.studioBody')}
            </p>
          </div>

          <ul className="grid gap-2" style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {CAPABILITIES.map((c, idx) => (
              <li key={c.label} className="process-step">
                <span className="process-step-num" style={{ color: c.color, minWidth: 24 }}>
                  {String(idx + 1).padStart(2, '0')}
                </span>
                <span>
                  <b style={{ fontSize: '0.8rem', fontWeight: 800, display: 'block', textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--foreground)' }}>
                    {c.label}
                  </b>
                  <span className="text-body" style={{ fontSize: '0.8rem' }}>{c.desc}</span>
                </span>
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/bots" className="btn btn-primary" style={{ minHeight: 44 }}>
              {t('home.openBotLab')}
            </Link>
            <Link href="/workspace" className="btn" style={{ minHeight: 44 }}>
              {t('home.goWorkspace')}
            </Link>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <div
            className="relative overflow-hidden"
            style={{
              border: '1px solid var(--hud-border)',
              background: 'var(--command-surface)',
              borderRadius: 'var(--radius-xl)',
              padding: 'clamp(16px, 3vw, 24px)',
            }}
          >
            <div
              className="mb-4 flex items-center gap-2"
              style={{ borderBottom: '1px solid var(--hud-border)', paddingBottom: 'var(--space-3)' }}
            >
              <span className="w-2 h-2 rounded-full status-dot status-dot-online animate-pulse-dot" />
              <span className="edge-label">LIVE DEMO TERMINAL</span>
            </div>
            <AiDemoPanel />
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
