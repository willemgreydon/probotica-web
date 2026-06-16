import Link from 'next/link';
import { ArrowLeft, ArrowRight, Bot, Zap, Shield, Tag, Cpu, GitBranch, Activity, CheckCircle2, XCircle, Clock, Terminal } from 'lucide-react';
import type { PublicBotDefinition } from '@/features/bots/lib/bot-types';
import { getBotReadiness } from '@/features/bots/lib/bot-readiness';

interface BotDetailPageProps {
  bot: PublicBotDefinition;
  relatedBots: PublicBotDefinition[];
}

const CATEGORY_COLORS: Record<string, string> = {
  sales:        'var(--neon-lime)',
  ux:           'var(--neon-cyan)',
  content:      'var(--neon-violet)',
  marketing:    'var(--neon-orange)',
  'real-estate':'#88ffcc',
  development:  'var(--secondary)',
  learning:     '#ffcb74',
  automation:   'var(--primary)',
  research:     '#be9bff',
  support:      '#8ac9ff',
  strategy:     '#ff8f96',
  other:        'var(--muted-foreground)',
};

const STATUS_CONFIG = {
  active:   { color: 'var(--status-online)',  label: 'Active',   dot: 'status-dot-online' },
  draft:    { color: 'var(--status-warning)', label: 'Draft',    dot: 'status-dot-warning' },
  disabled: { color: 'var(--status-error)',   label: 'Disabled', dot: 'status-dot-error' },
};

function ReadinessBar({ score }: { score: number }) {
  const fill = score >= 90 ? 'var(--status-online)' :
               score >= 75 ? 'var(--primary)' :
               score >= 55 ? 'var(--status-warning)' : 'var(--status-error)';
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '.6rem', letterSpacing: '.2em', textTransform: 'uppercase', color: 'var(--telemetry-dim)' }}>
          Metadata Readiness
        </span>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '.72rem', fontWeight: 700, color: fill }}>
          {score}%
        </span>
      </div>
      <div className="readiness-track">
        <div className="readiness-fill" style={{ width: `${score}%`, background: fill }} />
      </div>
    </div>
  );
}

export function BotDetailPage({ bot, relatedBots }: BotDetailPageProps) {
  const readiness = getBotReadiness(bot);
  const accentColor = CATEGORY_COLORS[bot.category] ?? 'var(--primary)';
  const statusCfg = STATUS_CONFIG[bot.status];

  return (
    <div className="shell-x py-8">

      {/* ── Cinematic Hero ── */}
      <div
        style={{
          position: 'relative',
          overflow: 'hidden',
          borderRadius: 'var(--radius-xl)',
          border: '1px solid var(--panel-border)',
          marginBottom: '24px',
        }}
      >
        {/* Background atmosphere */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: `radial-gradient(ellipse at 90% -10%, color-mix(in oklab, ${accentColor}, transparent 80%) 0%, transparent 40%),
                       radial-gradient(ellipse at -5% 90%, color-mix(in oklab, var(--neon-violet), transparent 90%) 0%, transparent 35%)`,
        }} />
        <div className="hud-grid" style={{ position: 'absolute', inset: 0, opacity: 0.25, pointerEvents: 'none' }} />

        <div style={{ position: 'relative', padding: 'clamp(28px,4vw,56px)' }}>
          {/* Back nav */}
          <Link
            href="/bots"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', textDecoration: 'none', marginBottom: '24px' }}
          >
            <ArrowLeft size={12} style={{ color: 'var(--muted-foreground)' }} />
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '.62rem', letterSpacing: '.18em', textTransform: 'uppercase', color: 'var(--muted-foreground)' }}>
              Bot Lab
            </span>
          </Link>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '24px', alignItems: 'flex-start' }}>
            <div>
              {/* Category + status row */}
              <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                <span
                  className="category-pill"
                  style={{ color: accentColor, borderColor: `color-mix(in oklab, ${accentColor}, transparent 60%)`, background: `color-mix(in oklab, ${accentColor}, transparent 90%)` }}
                >
                  {bot.category}
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <div className={`status-dot ${statusCfg.dot}`} />
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '.6rem', letterSpacing: '.18em', textTransform: 'uppercase', color: statusCfg.color }}>
                    {statusCfg.label}
                  </span>
                </span>
                <span className="mono-chip">{bot.outputMode}</span>
                <span className="mono-chip">{bot.model}</span>
              </div>

              <h1
                className="heading-section"
                style={{ fontSize: 'clamp(1.6rem, 4vw, 3rem)', marginBottom: '12px', maxWidth: '720px' }}
              >
                {bot.name}
              </h1>

              <p className="text-lead" style={{ maxWidth: '600px', marginBottom: '24px' }}>
                {bot.description}
              </p>

              {/* Tags */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {bot.tags.map((tag) => (
                  <span key={tag} className="tag" style={{ fontSize: '.58rem' }}>{tag}</span>
                ))}
              </div>
            </div>

            {/* Readiness badge */}
            <div
              className="panel-sm"
              style={{ padding: '16px 20px', minWidth: '180px', flexShrink: 0 }}
            >
              <ReadinessBar score={readiness.score} />
              <div style={{ marginTop: '12px' }}>
                <span style={{
                  fontFamily: 'var(--font-mono)', fontSize: '.6rem', letterSpacing: '.18em',
                  textTransform: 'uppercase', color: 'var(--telemetry-dim)',
                }}>
                  Level
                </span>
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: '.72rem', fontWeight: 700, color: 'var(--foreground)', marginTop: '3px', textTransform: 'uppercase', letterSpacing: '.1em' }}>
                  {readiness.level.replace('-', ' ')}
                </p>
              </div>
              <div style={{ height: '1px', background: 'var(--panel-border)', margin: '12px 0' }} />
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <div className="telemetry-row" style={{ padding: '3px 0', borderBottom: 'none' }}>
                  <span className="telemetry-key">Temp</span>
                  <span className="telemetry-val">{bot.temperature}</span>
                </div>
                <div className="telemetry-row" style={{ padding: '3px 0', borderBottom: 'none' }}>
                  <span className="telemetry-key">Source</span>
                  <span className="telemetry-val" style={{ maxWidth: '90px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{bot.sourceFile}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Action strip */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginTop: '28px', paddingTop: '24px', borderTop: '1px solid var(--panel-border)' }}>
            <Link href={`/bots?select=${bot.slug}`} className="btn btn-primary" style={{ gap: '8px' }}>
              <Terminal size={13} />
              Run in Bot Lab
            </Link>
            <Link href="/workspace" className="btn" style={{ gap: '8px' }}>
              <Zap size={13} />
              Add to Workflow
            </Link>
            <Link href="/marketplace" className="btn" style={{ gap: '8px' }}>
              <GitBranch size={13} />
              Browse Packs
            </Link>
          </div>
        </div>
      </div>

      {/* ── Main grid ── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr)', gap: '20px', alignItems: 'start' }} className="bot-detail-grid">
        <style>{`
          @media (min-width: 1024px) { .bot-detail-grid { grid-template-columns: 1fr min(320px, 30%) !important; } }
        `}</style>

        {/* Left — Capabilities + Checks + Samples */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

          {/* Capability Matrix */}
          <div className="panel">
            <div className="panel-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Activity size={13} style={{ color: 'var(--primary)' }} />
                <span className="text-caption">Capability Matrix</span>
              </div>
              <span className="route-marker">{bot.capabilities.length} capabilities</span>
            </div>
            <div className="panel-body">
              <div className="capability-grid">
                {bot.capabilities.map((cap, i) => (
                  <div key={i} className="capability-item">
                    <div className="capability-icon" />
                    <span className="text-body" style={{ fontSize: '.875rem' }}>{cap}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sample Inputs */}
          <div className="panel">
            <div className="panel-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Terminal size={13} style={{ color: 'var(--primary)' }} />
                <span className="text-caption">Sample Inputs</span>
              </div>
              <span className="route-marker">{bot.sampleInputs.length} samples</span>
            </div>
            <div className="panel-body" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {bot.sampleInputs.map((sample, i) => (
                <Link
                  key={i}
                  href={`/bots?select=${bot.slug}`}
                  className="panel-inset"
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    gap: '10px', padding: '10px 14px', textDecoration: 'none',
                    transition: 'border-color var(--duration-base) ease',
                    cursor: 'none',
                  }}
                >
                  <span className="text-body text-clamp-2" style={{ fontSize: '.875rem', flex: 1, minWidth: 0 }}>
                    {sample}
                  </span>
                  <ArrowRight size={12} style={{ color: 'var(--muted-foreground)', flexShrink: 0 }} />
                </Link>
              ))}
            </div>
          </div>

          {/* Metadata Readiness Checks */}
          <div className="panel">
            <div className="panel-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Shield size={13} style={{ color: 'var(--primary)' }} />
                <span className="text-caption">Readiness Checks</span>
              </div>
              <span className="route-marker">{readiness.checks.filter(c => c.passed).length}/{readiness.checks.length} passed</span>
            </div>
            <div className="panel-body" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(200px, 100%), 1fr))', gap: '8px' }}>
              {readiness.checks.map((check) => (
                <div
                  key={check.label}
                  className="panel-inset"
                  style={{
                    display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 12px',
                    borderColor: check.passed ? 'rgba(125,221,180,.15)' : 'rgba(255,143,150,.12)',
                  }}
                >
                  {check.passed
                    ? <CheckCircle2 size={12} style={{ color: 'var(--status-online)', flexShrink: 0 }} />
                    : <XCircle size={12} style={{ color: 'var(--status-error)', flexShrink: 0 }} />
                  }
                  <span style={{ fontSize: '.75rem', color: check.passed ? 'var(--foreground)' : 'var(--muted-foreground)', lineHeight: 1.3 }}>
                    {check.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right sidebar */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

          {/* Runtime Telemetry */}
          <div className="telemetry-panel" style={{ borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
            <div style={{ padding: '10px 16px', borderBottom: '1px solid var(--telemetry-border)', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Cpu size={11} style={{ color: 'var(--telemetry-dim)' }} />
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '.58rem', letterSpacing: '.24em', textTransform: 'uppercase', color: 'var(--telemetry-dim)' }}>
                Runtime Telemetry
              </span>
            </div>
            {[
              ['Model',    bot.model],
              ['Output',   bot.outputMode],
              ['Temp',     String(bot.temperature)],
              ['Status',   bot.status],
              ['Category', bot.category],
              ['ID',       bot.id.slice(0, 12) + '…'],
            ].map(([key, val]) => (
              <div key={key} className="telemetry-row">
                <span className="telemetry-key">{key}</span>
                <span className={`telemetry-val${bot.status === 'active' && key === 'Status' ? ' telemetry-val-ok' : ''}`}>{val}</span>
              </div>
            ))}
          </div>

          {/* Safety Notes */}
          <div className="panel-sm">
            <div style={{ padding: '10px 14px', borderBottom: '1px solid var(--panel-border)', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Shield size={11} style={{ color: 'var(--status-warning)' }} />
              <span className="text-caption">Safety Notes</span>
            </div>
            <div style={{ padding: '12px 14px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {bot.safetyNotes.map((note, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                  <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'var(--status-warning)', flexShrink: 0, marginTop: '7px' }} />
                  <span className="text-body" style={{ fontSize: '.8125rem' }}>{note}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Related Bots */}
          {relatedBots.length > 0 && (
            <div className="panel-sm">
              <div style={{ padding: '10px 14px', borderBottom: '1px solid var(--panel-border)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Bot size={11} style={{ color: 'var(--primary)' }} />
                <span className="text-caption">Related Bots</span>
                <span className="route-marker" style={{ marginLeft: 'auto' }}>{bot.category}</span>
              </div>
              <div style={{ padding: '8px' }}>
                {relatedBots.map((entry) => {
                  const rel = getBotReadiness(entry);
                  return (
                    <Link
                      key={entry.slug}
                      href={`/bots/${entry.slug}`}
                      className="sidebar-item"
                      data-active="false"
                      style={{ marginBottom: '2px' }}
                    >
                      <Bot size={11} style={{ color: 'var(--muted-foreground)', flexShrink: 0 }} />
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <p className="text-truncate" style={{ fontSize: '.8125rem', fontWeight: 600, color: 'var(--foreground)' }}>{entry.shortName}</p>
                        <p style={{ fontFamily: 'var(--font-mono)', fontSize: '.58rem', color: 'var(--telemetry-dim)', letterSpacing: '.1em', textTransform: 'uppercase' }}>
                          {rel.score}% ready
                        </p>
                      </div>
                      <ArrowRight size={10} style={{ color: 'var(--muted-foreground)', flexShrink: 0 }} />
                    </Link>
                  );
                })}
              </div>
            </div>
          )}

          {/* CTA */}
          <div className="panel-sm" style={{ padding: '16px', background: `color-mix(in oklab, ${accentColor}, transparent 94%)`, borderColor: `color-mix(in oklab, ${accentColor}, transparent 70%)` }}>
            <p style={{ fontSize: '.6rem', fontFamily: 'var(--font-mono)', letterSpacing: '.24em', textTransform: 'uppercase', color: accentColor, marginBottom: '8px' }}>
              Ready to deploy
            </p>
            <p className="text-body" style={{ fontSize: '.8125rem', marginBottom: '12px' }}>
              Add this bot to a workflow and automate production tasks.
            </p>
            <Link href="/workspace" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', gap: '6px' }}>
              <Zap size={12} />
              Open Workspace
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
