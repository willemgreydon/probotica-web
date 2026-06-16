import type { BotCategory, BotDefinition, BotOutputMode } from '@/features/bots/lib/bot-types';

/**
 * Deterministic catalog generator. The markdown import only yields ~167 bots,
 * heavily skewed toward a few business fields. This expands the catalog toward
 * ~500 bots and, crucially, brings sparse categories up to parity by filling
 * every category to PER_CATEGORY_TARGET. Output is deterministic (stable slugs,
 * no randomness) so SSG stays reproducible.
 */

const PER_CATEGORY_TARGET = 46;

const SAFETY_NOTES = [
  'AI output may contain errors. Human review required.',
  'Do not include personal, confidential, or regulated data.',
  'Use scoped data for GDPR-aware workflows only.',
];

interface CategorySpec {
  label: string;
  roles: string[];
  domains: string[];
  capabilities: string[];
  output: BotOutputMode;
}

const SPECS: Record<Exclude<BotCategory, 'other'>, CategorySpec> = {
  sales: {
    label: 'Sales',
    roles: ['Lead Qualifier', 'Cold Outreach Writer', 'Pipeline Forecaster', 'Proposal Drafter', 'Objection Handler', 'Upsell Strategist', 'Discovery Call Planner', 'Quote Builder', 'Renewal Manager', 'CRM Hygiene Assistant'],
    domains: ['SaaS', 'B2B', 'Retail', 'Fintech', 'Healthcare', 'Manufacturing', 'Agency', 'Startup', 'Enterprise', 'E-commerce'],
    capabilities: ['Qualify and score inbound leads', 'Draft personalized outreach', 'Summarize discovery calls', 'Suggest next best action', 'Forecast pipeline health'],
    output: 'mixed',
  },
  ux: {
    label: 'UX',
    roles: ['UX Auditor', 'Usability Reviewer', 'Accessibility Checker', 'Heuristic Evaluator', 'User Flow Mapper', 'Microcopy Writer', 'Onboarding Optimizer', 'Form Designer', 'Journey Mapper', 'Wireframe Critic'],
    domains: ['Mobile App', 'SaaS Dashboard', 'E-commerce', 'Checkout', 'Landing Page', 'Onboarding', 'Navigation', 'Design System', 'Web App', 'Customer Portal'],
    capabilities: ['Audit flows against usability heuristics', 'Flag accessibility issues', 'Prioritize friction points', 'Rewrite microcopy', 'Propose concrete fixes'],
    output: 'text',
  },
  content: {
    label: 'Content',
    roles: ['Blog Writer', 'Copy Editor', 'SEO Strategist', 'Headline Generator', 'Newsletter Writer', 'Social Caption Writer', 'Product Description Writer', 'Tone Adjuster', 'Content Repurposer', 'Script Writer'],
    domains: ['B2B', 'Lifestyle', 'Tech', 'Finance', 'Travel', 'SaaS', 'E-commerce', 'Healthcare', 'Education', 'Nonprofit'],
    capabilities: ['Draft on-brand long-form content', 'Optimize for target keywords', 'Tighten and edit copy', 'Generate headline variants', 'Repurpose across channels'],
    output: 'text',
  },
  marketing: {
    label: 'Marketing',
    roles: ['Campaign Planner', 'Ad Copywriter', 'Audience Segmenter', 'Funnel Architect', 'Email Sequencer', 'Brand Strategist', 'Growth Experimenter', 'Landing Page Optimizer', 'PPC Analyst', 'Influencer Scout'],
    domains: ['DTC', 'B2B', 'App', 'Local', 'Global', 'SaaS', 'Retail', 'Event', 'Product Launch', 'Seasonal'],
    capabilities: ['Plan multi-channel campaigns', 'Write and test ad variants', 'Segment audiences', 'Design conversion funnels', 'Propose growth experiments'],
    output: 'mixed',
  },
  'real-estate': {
    label: 'Real Estate',
    roles: ['Listing Optimizer', 'Buyer Matcher', 'Market Analyst', 'Inquiry Responder', 'Valuation Assistant', 'Neighborhood Guide', 'Tenant Screener', 'Open House Planner', 'Investment Advisor', 'Contract Explainer'],
    domains: ['Residential', 'Commercial', 'Luxury', 'Rental', 'Vienna', 'Urban', 'Suburban', 'Vacation', 'Office', 'Mixed-Use'],
    capabilities: ['Write compelling listings', 'Match buyers to properties', 'Summarize local market data', 'Respond to buyer inquiries', 'Explain contract terms plainly'],
    output: 'mixed',
  },
  development: {
    label: 'Development',
    roles: ['Code Reviewer', 'Bug Triage Assistant', 'API Designer', 'Test Generator', 'Refactoring Advisor', 'Performance Profiler', 'Frontend Helper', 'Backend Architect', 'DevOps Assistant', 'Docs Writer'],
    domains: ['React', 'Next.js', 'Node', 'Python', 'TypeScript', 'Go', 'Database', 'Cloud', 'Mobile', 'API'],
    capabilities: ['Review diffs for bugs and clarity', 'Generate tests', 'Suggest refactors', 'Draft API contracts', 'Explain and document code'],
    output: 'mixed',
  },
  learning: {
    label: 'Learning',
    roles: ['Concept Explainer', 'Quiz Generator', 'Study Planner', 'Flashcard Maker', 'Lesson Designer', 'Tutor', 'Curriculum Builder', 'Skill Coach', 'Exam Prep Assistant', 'Summary Writer'],
    domains: ['AI', 'Math', 'Language', 'Coding', 'Business', 'Science', 'History', 'Design', 'Marketing', 'Finance'],
    capabilities: ['Explain concepts at the right level', 'Generate practice questions', 'Build study plans', 'Summarize source material', 'Adapt to learner progress'],
    output: 'text',
  },
  automation: {
    label: 'Automation',
    roles: ['Workflow Designer', 'Task Orchestrator', 'Integration Builder', 'Trigger Architect', 'Data Pipeline Assistant', 'Scheduler', 'Process Mapper', 'Ops Automator', 'RPA Planner', 'Bot Supervisor'],
    domains: ['Zapier', 'Make', 'CRM', 'Email', 'Reporting', 'Onboarding', 'Inventory', 'Support', 'Finance', 'HR'],
    capabilities: ['Design multi-step automations', 'Map triggers and actions', 'Plan integrations across tools', 'Flag failure points', 'Document the workflow'],
    output: 'mixed',
  },
  research: {
    label: 'Research',
    roles: ['Market Researcher', 'Data Analyst', 'Survey Designer', 'Competitive Analyst', 'Trend Spotter', 'Literature Reviewer', 'Insight Synthesizer', 'Metrics Interpreter', 'Hypothesis Tester', 'Report Writer'],
    domains: ['Market', 'Product', 'UX', 'Academic', 'Financial', 'Consumer', 'B2B', 'Tech', 'Health', 'Policy'],
    capabilities: ['Synthesize findings into insights', 'Design surveys', 'Analyze competitive landscape', 'Interpret metrics', 'Draft structured reports'],
    output: 'mixed',
  },
  support: {
    label: 'Support',
    roles: ['FAQ Responder', 'Ticket Triager', 'Escalation Assistant', 'Knowledge Base Writer', 'Chat Deflector', 'Onboarding Helper', 'Complaint Handler', 'Returns Assistant', 'Status Updater', 'Sentiment Analyzer'],
    domains: ['SaaS', 'E-commerce', 'Telecom', 'Banking', 'Travel', 'Healthcare', 'Utility', 'Gaming', 'Retail', 'B2B'],
    capabilities: ['Answer common questions', 'Triage and route tickets', 'Draft knowledge-base articles', 'De-escalate complaints', 'Summarize customer sentiment'],
    output: 'mixed',
  },
  strategy: {
    label: 'Strategy',
    roles: ['Product Strategist', 'Roadmap Planner', 'OKR Coach', 'Competitive Strategist', 'Pricing Advisor', 'GTM Planner', 'Prioritization Assistant', 'Business Model Designer', 'Risk Assessor', 'Vision Synthesizer'],
    domains: ['Startup', 'Enterprise', 'SaaS', 'Product', 'Platform', 'Marketplace', 'B2B', 'Consumer', 'Growth', 'Turnaround'],
    capabilities: ['Shape product strategy', 'Prioritize the roadmap', 'Define OKRs', 'Pressure-test pricing', 'Plan go-to-market'],
    output: 'text',
  },
};

function slugify(input: string): string {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

function countByCategory(bots: BotDefinition[]): Partial<Record<BotCategory, number>> {
  const counts: Partial<Record<BotCategory, number>> = {};
  for (const bot of bots) counts[bot.category] = (counts[bot.category] ?? 0) + 1;
  return counts;
}

function makeBot(category: Exclude<BotCategory, 'other'>, role: string, domain: string, spec: CategorySpec, seen: Set<string>, i: number): BotDefinition {
  const name = `${domain} ${role}`;
  let slug = slugify(name);
  if (seen.has(slug)) slug = `${slug}-${i}`;
  seen.add(slug);

  const shortName = name.length > 30 ? `${name.slice(0, 27).trim()}...` : name;
  const description = `A ${role.toLowerCase()} for ${domain} teams — ${spec.capabilities[0].toLowerCase()} and ship faster.`;
  const lower = role.toLowerCase();

  return {
    id: `bot-${slug}`,
    slug,
    name,
    shortName,
    category,
    description,
    systemPrompt: `You are a ${name}, an expert AI assistant specialized in ${domain} ${lower} work. Be concrete, actionable and concise. Ask for missing context, flag assumptions, and never fabricate facts.`,
    starterPrompt: `Help me with ${lower} for a ${domain} project.`,
    inputPlaceholder: `Describe your ${spec.label.toLowerCase()} task…`,
    outputMode: spec.output,
    tags: Array.from(new Set([domain.toLowerCase(), category, ...lower.split(' ')])),
    model: 'gpt-4.1-mini',
    temperature: 0.5,
    status: 'active',
    sourceFile: 'generated/catalog',
    sampleInputs: spec.capabilities.slice(0, 4),
    capabilities: spec.capabilities,
    safetyNotes: SAFETY_NOTES,
  };
}

/** Build the generated bots that bring every category up to PER_CATEGORY_TARGET. */
export function buildGeneratedBots(existing: BotDefinition[]): BotDefinition[] {
  const counts = countByCategory(existing);
  const seen = new Set(existing.map((b) => b.slug));
  const out: BotDefinition[] = [];

  for (const cat of Object.keys(SPECS) as Array<Exclude<BotCategory, 'other'>>) {
    const spec = SPECS[cat];
    const need = Math.max(0, PER_CATEGORY_TARGET - (counts[cat] ?? 0));
    for (let i = 0; i < need; i++) {
      const role = spec.roles[i % spec.roles.length];
      const domain = spec.domains[Math.floor(i / spec.roles.length) % spec.domains.length];
      out.push(makeBot(cat, role, domain, spec, seen, i));
    }
  }

  return out;
}
