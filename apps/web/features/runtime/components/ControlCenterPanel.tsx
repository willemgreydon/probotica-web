'use client';

import Link from 'next/link';
import { useMemo } from 'react';
import { Activity, Bot, Cpu, Database, Layers, ShoppingBag, Zap, AlertTriangle, CheckCircle2, Clock, BarChart2 } from 'lucide-react';
import type { PublicBotDefinition } from '@/features/bots/lib/bot-types';
import { workflowTemplates } from '@/features/workflows/data/workflow-templates';
import { getBotReadiness } from '@/features/bots/lib/bot-readiness';
import { getMemorySnapshots } from '@/features/memory/memory-store';
import { listWorkspaceSummaries } from '@/features/workspace/workspace-persistence';

interface ControlCenterPanelProps {
  bots: PublicBotDefinition[];
}

/* ── Mini bar chart (SVG) ── */
function MiniBarChart({ values, color = 'var(--primary)' }: { values: number[]; color?: string }) {
  const max = Math.max(...values, 1);
  const w = 100 / values.length;
  return (
    <svg viewBox={`0 0 100 32`} style={{ width: '100%', height: '32px', display: 'block' }} preserveAspectRatio="none">
      {values.map((v, i) => {
        const h = (v / max) * 28;
        return (
          <rect
            key={i}
            x={i * w + 0.5}
            y={32 - h}
            width={w - 1}
            height={h}
            rx={1}
            fill={color}
            opacity={0.7 + (i / values.length) * 0.3}
          />
        );
      })}
    </svg>
  );
}

/* ── Readiness heatmap cell ── */
function HeatCell({ score }: { score: number }) {
  const color = score >= 90 ? 'var(--status-online)' :
                score >= 75 ? 'var(--primary)' :
                score >= 55 ? 'var(--status-warning)' :
                              'var(--status-error)';
  const opacity = 0.2 + (score / 100) * 0.65;
  return (
    <div
      title={`${score}%`}
      style={{
        width: '100%', aspectRatio: '1',
        borderRadius: '3px',
        background: color,
        opacity,
      }}
    />
  );
}

/* ── Runtime pressure bar ── */
function PressureBar({ label, value, max, color }: { label: string; value: number; max: number; color: string }) {
  const pct = Math.round((value / Math.max(max, 1)) * 100);
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '.6rem', letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--telemetry-dim)' }}>{label}</span>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '.65rem', fontWeight: 700, color }}>{value}/{max}</span>
      </div>
      <div className="runtime-bar-track">
        <div className="runtime-bar-fill" style={{ width: `${pct}%`, background: color }} />
      </div>
    </div>
  );
}

/* ── Metric card ── */
function MetricCard({ value, label, delta, icon, accent = 'var(--primary)' }: {
  value: number | string; label: string; delta?: string; icon: React.ReactNode; accent?: string;
}) {
  return (
    <div className="metric-card" style={{ borderColor: `color-mix(in oklab, ${accent}, transparent 75%)` }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <div>
          <div className="metric-card-value">{value}</div>
          <div className="metric-card-label" style={{ marginTop: '6px' }}>{label}</div>
        </div>
        <div style={{
          width: 36, height: 36, borderRadius: 'var(--radius-md)',
          border: '1px solid var(--panel-border)',
          background: `color-mix(in oklab, ${accent}, transparent 90%)`,
          display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
          color: accent,
        }}>
          {icon}
        </div>
      </div>
      {delta && (
        <div className={`metric-card-delta ${delta.startsWith('+') ? 'metric-delta-up' : 'metric-delta-flat'}`}>
          {delta}
        </div>
      )}
    </div>
  );
}

/* ── Alert item ── */
function AlertItem({ level, message }: { level: 'ok' | 'warn' | 'error'; message: string }) {
  const config = {
    ok:    { icon: <CheckCircle2 size={12} />, color: 'var(--status-online)',  bg: 'rgba(125,221,180,.06)' },
    warn:  { icon: <AlertTriangle size={12} />, color: 'var(--status-warning)', bg: 'rgba(255,203,116,.06)' },
    error: { icon: <AlertTriangle size={12} />, color: 'var(--status-error)',   bg: 'rgba(255,143,150,.06)' },
  }[level];

  return (
    <div style={{
      display: 'flex', alignItems: 'flex-start', gap: '10px',
      padding: '10px 14px',
      borderRadius: 'var(--radius-md)',
      border: `1px solid color-mix(in oklab, ${config.color}, transparent 72%)`,
      background: config.bg,
    }}>
      <span style={{ color: config.color, flexShrink: 0, marginTop: '1px' }}>{config.icon}</span>
      <span style={{ fontSize: '.8125rem', lineHeight: 1.45, color: 'var(--foreground)' }}>{message}</span>
    </div>
  );
}

export function ControlCenterPanel({ bots }: ControlCenterPanelProps) {
  const stats = useMemo(() => {
    const workspaces = listWorkspaceSummaries();
    const memory = getMemorySnapshots();
    const readinessScores = bots.map((bot) => getBotReadiness(bot).score);
    const ready = readinessScores.filter((s) => s >= 75).length;
    const strong = readinessScores.filter((s) => s >= 90).length;
    const weak = readinessScores.filter((s) => s < 55).length;

    const categoryMap = new Map<string, number>();
    for (const bot of bots) {
      categoryMap.set(bot.category, (categoryMap.get(bot.category) ?? 0) + 1);
    }
    const topCategories = Array.from(categoryMap.entries()).sort((a, b) => b[1] - a[1]).slice(0, 8);

    const statusMap = { active: 0, draft: 0, disabled: 0 };
    for (const bot of bots) statusMap[bot.status]++;

    /* Synthetic trend data — 7 day bar chart simulation */
    const trendBase = Math.max(1, Math.floor(bots.length / 7));
    const trend = Array.from({ length: 7 }, (_, i) => trendBase + Math.floor(Math.sin(i) * trendBase * 0.3 + trendBase * 0.2));

    return {
      workspaceCount: workspaces.length,
      workflowTemplateCount: workflowTemplates.length,
      memoryCount: memory.length,
      readinessStrong: ready,
      readinessProduction: strong,
      readinessWeak: weak,
      topCategories,
      statusMap,
      readinessScores,
      trend,
    };
  }, [bots]);

  /* Derived alerts */
  const alerts = useMemo(() => {
    const list: { level: 'ok' | 'warn' | 'error'; message: string }[] = [];

    if (stats.readinessProduction >= Math.floor(bots.length * 0.5)) {
      list.push({ level: 'ok', message: `${stats.readinessProduction} bots are production-candidate. Runtime is healthy.` });
    }
    if (stats.readinessWeak > 0) {
      list.push({ level: 'warn', message: `${stats.readinessWeak} bot${stats.readinessWeak > 1 ? 's have' : ' has'} weak metadata readiness (< 55%). Enrich descriptions, capabilities, or sample inputs.` });
    }
    if (stats.statusMap.disabled > 0) {
      list.push({ level: 'warn', message: `${stats.statusMap.disabled} bot${stats.statusMap.disabled > 1 ? 's are' : ' is'} disabled. Check configuration or set to draft.` });
    }
    if (stats.workspaceCount === 0) {
      list.push({ level: 'warn', message: 'No workspaces created. Open the Workspace module to start orchestrating workflows.' });
    }
    if (stats.memoryCount > 0) {
      list.push({ level: 'ok', message: `${stats.memoryCount} memory snapshot${stats.memoryCount > 1 ? 's' : ''} stored. Execution context is available.` });
    }
    return list;
  }, [bots.length, stats]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

      {/* ── Hero header ── */}
      <div
        style={{
          position: 'relative', overflow: 'hidden',
          borderRadius: 'var(--radius-xl)', border: '1px solid var(--panel-border)',
        }}
      >
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: 'radial-gradient(ellipse at 75% -20%, color-mix(in oklab, var(--neon-cyan), transparent 84%) 0%, transparent 45%), radial-gradient(ellipse at -5% 75%, color-mix(in oklab, var(--neon-violet), transparent 90%) 0%, transparent 38%)',
        }} />
        <div className="hud-grid" style={{ position: 'absolute', inset: 0, opacity: 0.22, pointerEvents: 'none' }} />

        <div style={{ position: 'relative', padding: 'clamp(24px,3.5vw,48px)' }}>
          <div className="section-eyebrow">
            <span className="label-eyebrow">Control Center</span>
          </div>
          <h1 className="heading-section mt-2" style={{ marginBottom: '10px' }}>AI Runtime HQ</h1>
          <p className="text-lead" style={{ maxWidth: '580px' }}>
            Monitor runtime readiness, workspace activity, deployment quality signals, and execution telemetry.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <div className="status-dot status-dot-online animate-pulse-dot" />
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '.6rem', letterSpacing: '.18em', textTransform: 'uppercase', color: 'var(--telemetry-dim)' }}>
                Runtime Online
              </span>
            </div>
            <span className="mono-chip">{bots.filter(b => b.status === 'active').length} active bots</span>
            <span className="mono-chip">eu-west region</span>
          </div>
        </div>
      </div>

      {/* ── KPI Metrics ── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '14px' }}>
        <MetricCard value={bots.length}                     label="Imported Bots"       icon={<Bot size={14} />}           accent="var(--primary)" />
        <MetricCard value={stats.workflowTemplateCount}     label="Workflow Packs"       icon={<Zap size={14} />}           accent="var(--neon-lime)" />
        <MetricCard value={stats.workspaceCount}            label="Workspaces"           icon={<Layers size={14} />}        accent="var(--secondary)" />
        <MetricCard value={stats.memoryCount}               label="Memory Snapshots"     icon={<Database size={14} />}      accent="var(--accent)" />
        <MetricCard value={stats.readinessStrong}           label="High Readiness"       icon={<CheckCircle2 size={14} />}  accent="var(--status-online)" delta={`${stats.readinessProduction} prod-candidate`} />
        <MetricCard value={stats.statusMap.active}          label="Active Bots"          icon={<Activity size={14} />}      accent="var(--status-active)" />
      </div>

      {/* ── Middle row ── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(340px, 100%), 1fr))', gap: '20px' }}>

        {/* Runtime Pressure */}
        <div className="panel" style={{ borderRadius: 'var(--radius-lg)' }}>
          <div className="panel-header">
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <BarChart2 size={13} style={{ color: 'var(--primary)' }} />
              <span className="text-caption">Runtime Pressure</span>
            </div>
          </div>
          <div className="panel-body" style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <PressureBar label="Active Bots"   value={stats.statusMap.active}           max={bots.length}                          color="var(--status-active)" />
            <PressureBar label="Ready ≥75%"    value={stats.readinessStrong}             max={bots.length}                          color="var(--primary)" />
            <PressureBar label="Prod Ready"    value={stats.readinessProduction}          max={bots.length}                          color="var(--status-online)" />
            <PressureBar label="Workspaces"    value={stats.workspaceCount}              max={Math.max(stats.workspaceCount, 5)}    color="var(--secondary)" />
            <PressureBar label="Workflows"     value={stats.workflowTemplateCount}        max={Math.max(stats.workflowTemplateCount, 10)} color="var(--neon-lime)" />
            <div style={{ paddingTop: '8px', borderTop: '1px solid var(--panel-border)' }}>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '.58rem', letterSpacing: '.16em', textTransform: 'uppercase', color: 'var(--telemetry-dim)', marginBottom: '8px' }}>
                7-day Activity Trend
              </p>
              <MiniBarChart values={stats.trend} />
            </div>
          </div>
        </div>

        {/* Alerts */}
        <div className="panel" style={{ borderRadius: 'var(--radius-lg)' }}>
          <div className="panel-header">
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <AlertTriangle size={13} style={{ color: 'var(--status-warning)' }} />
              <span className="text-caption">Tactical Alerts</span>
            </div>
            <span className="route-marker">{alerts.length} signals</span>
          </div>
          <div className="panel-body" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {alerts.map((alert, i) => (
              <AlertItem key={i} level={alert.level} message={alert.message} />
            ))}
            {alerts.length === 0 && (
              <div style={{ textAlign: 'center', padding: '24px 0' }}>
                <CheckCircle2 size={24} style={{ color: 'var(--status-online)', margin: '0 auto 8px', display: 'block' }} />
                <p className="text-caption">All systems nominal</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── Readiness Heatmap ── */}
      <div className="panel" style={{ borderRadius: 'var(--radius-lg)' }}>
        <div className="panel-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Cpu size={13} style={{ color: 'var(--primary)' }} />
            <span className="text-caption">Bot Readiness Heatmap</span>
          </div>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            {[['≥90%', 'var(--status-online)'], ['≥75%', 'var(--primary)'], ['≥55%', 'var(--status-warning)'], ['<55%', 'var(--status-error)']].map(([label, color]) => (
              <span key={label} style={{ display: 'flex', alignItems: 'center', gap: '4px', fontFamily: 'var(--font-mono)', fontSize: '.56rem', letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--telemetry-dim)' }}>
                <span style={{ width: 8, height: 8, borderRadius: '2px', background: color, display: 'inline-block', opacity: 0.8 }} />{label}
              </span>
            ))}
          </div>
        </div>
        <div className="panel-body">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(18px, 1fr))', gap: '3px' }}>
            {stats.readinessScores.map((score, i) => <HeatCell key={i} score={score} />)}
          </div>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '.58rem', letterSpacing: '.18em', textTransform: 'uppercase', color: 'var(--telemetry-dim)', marginTop: '10px' }}>
            Each cell = 1 bot · {stats.readinessScores.length} total · {stats.readinessStrong} deployment-ready
          </p>
        </div>
      </div>

      {/* ── Category Distribution ── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(320px, 100%), 1fr))', gap: '20px' }}>
        <div className="panel" style={{ borderRadius: 'var(--radius-lg)' }}>
          <div className="panel-header">
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <ShoppingBag size={13} style={{ color: 'var(--primary)' }} />
              <span className="text-caption">Category Distribution</span>
            </div>
          </div>
          <div className="panel-body" style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {stats.topCategories.map(([cat, count]) => (
              <div key={cat}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '.62rem', letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--foreground)' }}>{cat}</span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '.62rem', color: 'var(--telemetry-dim)' }}>{count}</span>
                </div>
                <div className="runtime-bar-track">
                  <div className="runtime-bar-fill" style={{ width: `${(count / bots.length) * 100}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Status distribution */}
        <div className="panel" style={{ borderRadius: 'var(--radius-lg)' }}>
          <div className="panel-header">
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Activity size={13} style={{ color: 'var(--primary)' }} />
              <span className="text-caption">Bot Status Distribution</span>
            </div>
          </div>
          <div className="panel-body" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {([
              ['Active',   stats.statusMap.active,   'var(--status-online)', 'status-dot-online'],
              ['Draft',    stats.statusMap.draft,     'var(--status-warning)', 'status-dot-warning'],
              ['Disabled', stats.statusMap.disabled,  'var(--status-error)', 'status-dot-error'],
            ] as const).map(([label, count, color, dotClass]) => (
              <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div className={`status-dot ${dotClass}`} />
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '.62rem', letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--foreground)' }}>{label}</span>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '.62rem', color }}>{count}</span>
                  </div>
                  <div className="runtime-bar-track">
                    <div className="runtime-bar-fill" style={{ width: `${(count / Math.max(bots.length, 1)) * 100}%`, background: color }} />
                  </div>
                </div>
              </div>
            ))}

            <div style={{ height: '1px', background: 'var(--panel-border)', margin: '4px 0' }} />

            {/* Quick links */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {[
                { label: 'Open Bot Lab',     href: '/bots',           icon: <Bot size={11} /> },
                { label: 'Open Workspace',   href: '/workspace',      icon: <Layers size={11} /> },
                { label: 'Open Marketplace', href: '/marketplace',    icon: <ShoppingBag size={11} /> },
              ].map(({ label, href, icon }) => (
                <Link key={href} href={href} className="sidebar-item" data-active="false" style={{ fontSize: '.68rem' }}>
                  <span style={{ color: 'var(--muted-foreground)' }}>{icon}</span>
                  <span>{label}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Telemetry footer ── */}
      <div className="telemetry-panel" style={{ borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
        <div style={{ padding: '10px 18px', borderBottom: '1px solid var(--telemetry-border)', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Clock size={11} style={{ color: 'var(--telemetry-dim)' }} />
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '.58rem', letterSpacing: '.24em', textTransform: 'uppercase', color: 'var(--telemetry-dim)' }}>
            System Telemetry
          </span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))' }}>
          {[
            ['runtime',     'online'],
            ['environment', 'production'],
            ['region',      'eu-west'],
            ['storage',     'local-first'],
            ['ai-models',   'openai gpt-4.1'],
            ['security',    'hardened'],
          ].map(([key, val]) => (
            <div key={key} className="telemetry-row" style={{ borderBottom: 'none', borderRight: '1px solid rgba(145,178,212,.06)' }}>
              <span className="telemetry-key">{key}</span>
              <span className={`telemetry-val${key === 'runtime' ? ' telemetry-val-ok' : key === 'security' ? ' telemetry-val-ok' : ''}`}>{val}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
