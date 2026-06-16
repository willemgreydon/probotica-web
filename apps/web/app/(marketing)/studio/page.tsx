import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'AI Studio | ProBotica',
  description: 'Design, test, and deploy production-ready AI agents. Live API demo with OpenAI GPT-4o, structured JSON output, and safe fallback states.',
};

const STUDIO_FEATURES = [
  { num: '01', title: 'Live API Demo', desc: 'Test AI bots with real OpenAI API calls. No mock data — actual GPT-4o inference with your input.' },
  { num: '02', title: 'Structured Output', desc: 'All bot responses are typed and validated. JSON, text, or mixed output modes with Zod contracts.' },
  { num: '03', title: 'Safe Fallback', desc: 'Every bot has a deterministic fallback state for when the API is unavailable. Demo mode always works.' },
  { num: '04', title: 'Bot Categories', desc: 'Sales, UX, content, marketing, real estate, development, learning — 12 specialized domains.' },
  { num: '05', title: 'Workflow Builder', desc: 'Chain bots into multi-step pipelines. Intake → Analysis → Execution → Review lanes.' },
  { num: '06', title: 'Server Boundary', desc: 'System prompts never reach the browser. All prompt logic is server-only for security.' },
];

export default function StudioPage() {
  return (
    <main id="main-content" className="page-shell hud-grid bg-premium">
      <div className="container-x">
        <p className="label-eyebrow mb-4">AI Studio</p>
        <h1 className="heading-section text-balance" style={{ maxWidth: '640px' }}>
          Agent Studio
        </h1>
        <p className="text-lead mt-5" style={{ maxWidth: '560px' }}>
          Design, deploy, and monitor production-ready AI agent systems. Start with a live bot test, chain into a workflow, save outputs to workspace.
        </p>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 mb-10">
          {STUDIO_FEATURES.map((f) => (
            <div key={f.num} className="module-card">
              <div className="module-card-header">
                <span className="route-marker">{f.num}</span>
                <span
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ background: 'var(--status-online)', boxShadow: '0 0 5px var(--status-online)' }}
                />
              </div>
              <div className="module-card-body">
                <h3 style={{ fontSize: '0.88rem', fontWeight: 800, letterSpacing: '-0.01em', textTransform: 'uppercase', color: 'var(--foreground)', marginBottom: 'var(--space-2)' }}>
                  {f.title}
                </h3>
                <p className="text-body" style={{ fontSize: '0.84rem' }}>{f.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div
          className="p-6 relative overflow-hidden mb-8"
          style={{ border: '1px solid var(--hud-border)', background: 'var(--command-surface)', borderRadius: 'var(--radius-xl)' }}
        >
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{ background: 'radial-gradient(ellipse 50% 60% at 70% 30%, color-mix(in oklab, var(--neon-cyan), transparent 87%), transparent)' }}
          />
          <div className="relative z-10">
            <p className="edge-label mb-3">STUDIO STATUS</p>
            <p style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--foreground)', lineHeight: 1.5 }}>
              The AI Studio demo panel is integrated into the homepage. Select a bot, enter a prompt, and run a live API call directly from the ProBotica interface.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          <Link href="/#openai-api" className="btn btn-primary" style={{ minHeight: 44 }}>Live Studio Demo</Link>
          <Link href="/bots" className="btn" style={{ minHeight: 44 }}>Open Bot Lab</Link>
          <Link href="/workspace" className="btn" style={{ minHeight: 44 }}>Launch Workspace</Link>
        </div>
      </div>
    </main>
  );
}
