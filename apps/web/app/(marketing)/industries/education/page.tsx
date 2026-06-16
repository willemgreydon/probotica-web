import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Education AI | ProBotica Industries',
  description: 'Learning assistants, skill plan generation, and pedagogy-aligned automation for modern education and training teams.',
};

const FEATURES = [
  { num: '01', title: 'Skill Plan Generation', desc: 'Builds structured 2–12 week learning plans with daily exercises, milestones, and resource maps.' },
  { num: '02', title: 'Learning Coach', desc: 'Personalized coaching prompts that adapt to learner goals, prior knowledge, and preferred formats.' },
  { num: '03', title: 'Training Programs', desc: 'Full training module outlines with objectives, activities, assessments, and facilitator notes.' },
  { num: '04', title: 'Knowledge Pathways', desc: 'Structured learning sequences that connect concepts progressively for self-directed study or team onboarding.' },
];

export default function EducationPage() {
  return (
    <main id="main-content" className="page-shell hud-grid bg-premium">
      <div className="container-x">
        <Link href="/industries" className="inline-flex items-center gap-2 edge-label hover:text-foreground transition-colors mb-6" style={{ textDecoration: 'none' }}>
          ← Industries
        </Link>
        <p className="label-eyebrow mb-4">Industries / Education</p>
        <h1 className="heading-section text-balance" style={{ maxWidth: '680px' }}>
          Education AI
        </h1>
        <p className="text-lead mt-5" style={{ maxWidth: '540px' }}>
          Learning assistants and pedagogy-aligned automation for modern education teams. From skill plan generation to full training program design.
        </p>

        <div className="mt-10 grid gap-3 sm:grid-cols-2 mb-10">
          {FEATURES.map((f) => (
            <div key={f.num} className="process-step" style={{ alignItems: 'flex-start' }}>
              <span className="process-step-num">{f.num}</span>
              <div>
                <b style={{ fontSize: '0.82rem', fontWeight: 800, display: 'block', textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--foreground)', marginBottom: 4 }}>
                  {f.title}
                </b>
                <p className="text-body" style={{ fontSize: '0.84rem' }}>{f.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap gap-3">
          <Link href="/categories/learning" className="btn btn-primary" style={{ minHeight: 44 }}>Learning Bots</Link>
          <Link href="/workflows/learning-coach-journey" className="btn" style={{ minHeight: 44 }}>Learning Coach Workflow</Link>
          <Link href="/scenarios/learning-coach" className="btn" style={{ minHeight: 44 }}>Coach Scenario</Link>
          <Link href="/contact" className="btn" style={{ minHeight: 44 }}>Custom Build</Link>
        </div>
      </div>
    </main>
  );
}
