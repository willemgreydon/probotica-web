import type { Metadata } from 'next';
import Link from 'next/link';
import { getServerLocale } from '@/lib/i18n/server';
import { getPlatformStats } from '@/lib/content/platform-stats';

export const metadata: Metadata = {
  title: 'Education AI | ProBotica Industries',
  description: 'Learning assistants, skill plan generation, and pedagogy-aligned automation for modern education and training teams.',
};

const FEATURES_EN = [
  { num: '01', title: 'Skill Plan Generation', desc: 'Builds structured 2–12 week learning plans with daily exercises, milestones, and resource maps.' },
  { num: '02', title: 'Learning Coach', desc: 'Personalized coaching prompts that adapt to learner goals, prior knowledge, and preferred formats.' },
  { num: '03', title: 'Training Programs', desc: 'Full training module outlines with objectives, activities, assessments, and facilitator notes.' },
  { num: '04', title: 'Knowledge Pathways', desc: 'Structured learning sequences that connect concepts progressively for self-directed study or team onboarding.' },
];

const FEATURES_DE = [
  { num: '01', title: 'Erstellung von Skill-Plänen', desc: 'Erstellt strukturierte Lernpläne über 2–12 Wochen mit täglichen Übungen, Meilensteinen und Ressourcen-Maps.' },
  { num: '02', title: 'Lern-Coach', desc: 'Personalisierte Coaching-Prompts, die sich an Lernziele, Vorwissen und bevorzugte Formate anpassen.' },
  { num: '03', title: 'Trainingsprogramme', desc: 'Vollständige Modul-Gliederungen für Trainings mit Lernzielen, Aktivitäten, Assessments und Notizen für Trainer:innen.' },
  { num: '04', title: 'Wissenspfade', desc: 'Strukturierte Lernsequenzen, die Konzepte schrittweise verknüpfen – für selbstgesteuertes Lernen oder Team-Onboarding.' },
];

export default async function EducationPage() {
  const locale = await getServerLocale();
  const stats = getPlatformStats();
  const FEATURES = locale === 'de' ? FEATURES_DE : FEATURES_EN;
  const KPIS = [
    { value: `${stats.botCount}+`, label: 'Bots' },
    { value: `${stats.workflowCount}`, label: 'Workflows' },
    { value: `${stats.avgReadiness}%`, label: locale === 'de' ? 'Ø Readiness' : 'Avg readiness' },
    { value: `${stats.scenarioCount}`, label: locale === 'de' ? 'Szenarien' : 'Scenarios' },
  ];
  return (
    <main id="main-content" className="page-shell hud-grid bg-premium">
      <div className="container-x">
        <Link href="/industries" className="inline-flex items-center gap-2 edge-label hover:text-foreground transition-colors mb-6" style={{ textDecoration: 'none' }}>
          {locale === 'de' ? '← Branchen' : '← Industries'}
        </Link>
        <p className="label-eyebrow mb-4">{locale === 'de' ? 'Branchen / Bildung' : 'Industries / Education'}</p>
        <h1 className="heading-section text-balance" style={{ maxWidth: '680px' }}>
          {locale === 'de' ? 'KI für Bildung' : 'Education AI'}
        </h1>
        <p className="text-lead mt-5" style={{ maxWidth: '540px' }}>
          {locale === 'de'
            ? 'Lernassistenten und didaktisch ausgerichtete Automatisierung für moderne Bildungsteams. Von der Erstellung von Skill-Plänen bis zum Design kompletter Trainingsprogramme.'
            : 'Learning assistants and pedagogy-aligned automation for modern education teams. From skill plan generation to full training program design.'}
        </p>

        <div className="data-rail flex-wrap gap-4 mt-8">
          {KPIS.map((k) => (
            <div key={k.label} className="data-rail-item">
              <span className="data-rail-value">{k.value}</span>
              <span className="data-rail-label">{k.label}</span>
            </div>
          ))}
        </div>

        <div className="mt-10 grid gap-3 sm:grid-cols-2 mb-10">
          {FEATURES.map((f) => (
            <div key={f.num} className="process-step" style={{ alignItems: 'flex-start' }}>
              <span className="process-step-num">{f.num}</span>
              <div>
                <b style={{ fontSize: '0.82rem', fontWeight: 800, display: 'block', letterSpacing: '0.02em', color: 'var(--foreground)', marginBottom: 4 }}>
                  {f.title}
                </b>
                <p className="text-body" style={{ fontSize: '0.84rem' }}>{f.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap gap-3">
          <Link href="/categories/learning" className="btn btn-primary" style={{ minHeight: 44 }}>{locale === 'de' ? 'Lern-Bots' : 'Learning Bots'}</Link>
          <Link href="/workflows/learning-coach-journey" className="btn" style={{ minHeight: 44 }}>{locale === 'de' ? 'Lern-Coach-Workflow' : 'Learning Coach Workflow'}</Link>
          <Link href="/scenarios/learning-coach" className="btn" style={{ minHeight: 44 }}>{locale === 'de' ? 'Coach-Szenario' : 'Coach Scenario'}</Link>
          <Link href="/contact" className="btn" style={{ minHeight: 44 }}>{locale === 'de' ? 'Individueller Build' : 'Custom Build'}</Link>
        </div>
      </div>
    </main>
  );
}
