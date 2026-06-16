/* ─────────────────────────────────────────────────────────────
   PROBOTICA KNOWLEDGE UNIVERSE — Type System
   Single source of truth for all knowledge data shapes.
   Designed to be migrated to Sanity/MDX schemas without refactor.
   ───────────────────────────────────────────────────────────── */

export type Difficulty = 'beginner' | 'intermediate' | 'advanced' | 'expert';

export type TopicCategory =
  | 'artificial-intelligence'
  | 'machine-learning'
  | 'deep-learning'
  | 'neural-networks'
  | 'generative-ai'
  | 'large-language-models'
  | 'ai-agents'
  | 'prompt-engineering'
  | 'robotics'
  | 'humanoid-robots'
  | 'computer-vision'
  | 'reinforcement-learning'
  | 'autonomous-systems'
  | 'ai-ethics'
  | 'ai-safety'
  | 'ai-governance'
  | 'ai-in-business'
  | 'ai-automation'
  | 'human-ai-collaboration'
  | 'future-of-work';

/* ── Topic taxonomy node ── */
export interface KnowledgeTopic {
  slug: TopicCategory;
  title: string;
  shortTitle: string;
  description: string;
  accentColor: string;
  icon: string;
  articleCount: number;
  parentSlug?: TopicCategory;
  relatedSlugs: TopicCategory[];
  tier: 'foundational' | 'applied' | 'frontier' | 'societal';
}

/* ── Article content section ── */
export interface ArticleSection {
  id: string;
  heading: string;
  level: 2 | 3;
  body: string;
  callout?: {
    type: 'info' | 'warning' | 'tip' | 'example';
    text: string;
  };
  codeBlock?: {
    language: string;
    code: string;
    caption?: string;
  };
}

/* ── Full article ── */
export interface KnowledgeArticle {
  slug: string;
  title: string;
  subtitle: string;
  excerpt: string;
  heroLabel: string;
  category: TopicCategory;
  difficulty: Difficulty;
  readingTime: number;
  publishedAt: string;
  updatedAt: string;
  tags: string[];
  sections: ArticleSection[];
  keyTakeaways: string[];
  glossaryTerms: string[];
  relatedSlugs: string[];
  prerequisites?: string[];
  author: {
    name: string;
    role: string;
  };
  seo: {
    metaTitle: string;
    metaDescription: string;
    keywords: string[];
  };
}

/* ── Learning path step ── */
export interface LearningPathStep {
  order: number;
  articleSlug: string;
  title: string;
  description: string;
  estimatedMinutes: number;
  isOptional?: boolean;
}

/* ── Learning path ── */
export interface LearningPath {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  difficulty: Difficulty;
  estimatedHours: number;
  steps: LearningPathStep[];
  tags: string[];
  accentColor: string;
  icon: string;
  targetAudience: string;
}

/* ── Glossary term ── */
export interface GlossaryTerm {
  term: string;
  slug: string;
  shortDefinition: string;
  fullDefinition: string;
  category: TopicCategory;
  relatedTerms: string[];
  firstUsedIn?: string;
  difficulty: Difficulty;
}

/* ── Quiz question (single-best-answer) ── */
export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  /** Index into `options` of the correct answer. */
  correctIndex: number;
  /** Shown after answering — teaches the "why", not just the "what". */
  explanation: string;
}

/* ── Per-path assessment quiz ── */
export interface PathQuiz {
  pathSlug: string;
  title: string;
  /** Fraction (0–1) of correct answers required to pass and earn the badge. */
  passScore: number;
  questions: QuizQuestion[];
}

/* ── Concept relationship edge (for graph) ── */
export interface ConceptEdge {
  from: string;
  to: string;
  weight: number;
  label?: string;
}

/* ── Search index entry ── */
export interface KnowledgeSearchEntry {
  type: 'article' | 'topic' | 'glossary' | 'path';
  slug: string;
  title: string;
  excerpt: string;
  category: TopicCategory;
  tags: string[];
  difficulty?: Difficulty;
}
