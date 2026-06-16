import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Workflow Automation | ProBotica Solutions',
  description: 'Chain AI bots into multi-step workflows. 10 production templates for sales, UX, content, and operations with intake → analysis → execution → review pipelines.',
};

const WORKFLOW_TEMPLATES = [
  { id: 'lead-funnel-automation', title: 'Lead Funnel Automation', cat: 'Sales', steps: 3, duration: '4 min' },
  { id: 'ux-audit-pipeline', title: 'UX Audit Pipeline', cat: 'UX', steps: 3, duration: '5 min' },
  { id: 'seo-content-engine', title: 'SEO Content Engine', cat: 'Content', steps: 1, duration: '3 min' },
  { id: 'customer-support-escalation', title: 'Support Escalation', cat: 'Support', steps: 1, duration: '4 min' },
  { id: 'research-synthesizer', title: 'Research Synthesizer', cat: 'Research', steps: 1, duration: '3 min' },
  { id: 'multi-agent-strategy-chain', title: 'Multi-Agent Strategy', cat: 'Strategy', steps: 3, duration: '8 min' },
];

const LANES = ['Intake', 'Analysis', 'Execution', 'Review'];

export default function WorkflowAutomationPage() {
  return (
    <main id="main-content" className="page-shell hud-grid bg-premium">
      <div className="container-x">
        <Link href="/solutions" className="inline-flex items-center gap-2 edge-label hover:text-foreground transition-colors mb-6" style={{ textDecoration: 'none' }}>
          ← Solutions
        </Link>
        <p className="label-eyebrow mb-4">Solutions / Workflow Automation</p>
        <h1 className="heading-section text-balance" style={{ maxWidth: '720px' }}>
          Workflow Automation
        </h1>
        <p className="text-lead mt-5" style={{ maxWidth: '560px' }}>
          Chain AI bots into production pipelines. 10 workflow templates for sales, UX, content, and strategy — each with configurable step topology and runtime telemetry.
        </p>

        {/* Lane visualization */}
        <div className="mt-10 mb-8 flex items-center gap-3 overflow-x-auto pb-2">
          {LANES.map((lane, i) => (
            <div key={lane} className="flex items-center gap-3 flex-shrink-0">
              <div
                className="px-4 py-3 text-center"
                style={{ border: '1px solid var(--hud-border)', background: 'var(--command-surface)', borderRadius: 'var(--radius-md)', minWidth: 120 }}
              >
                <div className="route-marker mb-1">{String(i + 1).padStart(2, '0')}</div>
                <div style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--foreground)' }}>{lane}</div>
              </div>
              {i < LANES.length - 1 && (
                <svg width="20" height="16" viewBox="0 0 20 16" aria-hidden>
                  <path d="M0 8h16M12 4l4 4-4 4" stroke="var(--hud-border)" strokeWidth="1.5" strokeLinecap="round" fill="none" />
                </svg>
              )}
            </div>
          ))}
        </div>

        <p className="label-eyebrow mb-5">Production Templates</p>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 mb-10">
          {WORKFLOW_TEMPLATES.map((w) => (
            <Link
              key={w.id}
              href={`/workflows/${w.id}`}
              className="module-card group"
              style={{ textDecoration: 'none' }}
            >
              <div className="module-card-header">
                <span className="mono-chip">{w.cat}</span>
              </div>
              <div className="module-card-body">
                <h3 style={{ fontSize: '0.92rem', fontWeight: 800, letterSpacing: '-0.01em', textTransform: 'uppercase', color: 'var(--foreground)', marginBottom: 'var(--space-2)' }}>
                  {w.title}
                </h3>
                <div className="data-rail mt-3" style={{ padding: 'var(--space-3) var(--space-3)' }}>
                  <div className="data-rail-item">
                    <span className="data-rail-value">{w.steps}</span>
                    <span className="data-rail-label">Steps</span>
                  </div>
                  <div className="data-rail-sep" />
                  <div className="data-rail-item">
                    <span className="data-rail-value">{w.duration}</span>
                    <span className="data-rail-label">Est. Duration</span>
                  </div>
                </div>
              </div>
              <div className="module-card-footer">
                <span className="edge-label" style={{ color: 'var(--primary)' }}>View Workflow →</span>
              </div>
            </Link>
          ))}
        </div>

        <div className="flex flex-wrap gap-3">
          <Link href="/marketplace" className="btn btn-primary" style={{ minHeight: 44 }}>All Workflows</Link>
          <Link href="/workspace" className="btn" style={{ minHeight: 44 }}>Build in Workspace</Link>
          <Link href="/contact" className="btn" style={{ minHeight: 44 }}>Custom Workflow</Link>
        </div>
      </div>
    </main>
  );
}
