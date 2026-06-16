import type { KnowledgeArticle, Difficulty, KnowledgeTopic, LearningPath, GlossaryTerm, KnowledgeSearchEntry } from './knowledge-types';
import { knowledgeArticles, articleBySlug } from '../data/knowledge-articles';
import { knowledgeTopics, topicBySlug } from '../data/knowledge-topics';
import { learningPaths } from '../data/learning-paths';
import { glossaryTerms } from '../data/glossary';

/* ── Reading time label ── */
export function readingTimeLabel(minutes: number): string {
  if (minutes < 2) return '1 min read';
  return `${minutes} min read`;
}

/* ── Difficulty display config ── */
export const difficultyConfig: Record<Difficulty, { label: string; color: string; bg: string }> = {
  beginner:     { label: 'Beginner',     color: '#b9ff4a', bg: 'rgba(185,255,74,.12)' },
  intermediate: { label: 'Intermediate', color: '#88ffcc', bg: 'rgba(136,255,204,.12)' },
  advanced:     { label: 'Advanced',     color: '#8b5cf6', bg: 'rgba(139,92,246,.12)' },
  expert:       { label: 'Expert',       color: '#ec4899', bg: 'rgba(236,72,153,.12)' },
};

/* ── Get related articles by slug list ── */
export function getRelatedArticles(slugs: string[]): KnowledgeArticle[] {
  return slugs
    .map(s => articleBySlug[s])
    .filter((a): a is KnowledgeArticle => Boolean(a));
}

/* ── Get topic for article ── */
export function getTopicForArticle(article: KnowledgeArticle): KnowledgeTopic | undefined {
  return topicBySlug[article.category];
}

/* ── Get articles for a topic category ── */
export function getArticlesForCategory(category: string): KnowledgeArticle[] {
  return knowledgeArticles.filter(a => a.category === category);
}

/* ── Get featured articles (first 6) ── */
export function getFeaturedArticles(limit = 6): KnowledgeArticle[] {
  return knowledgeArticles.slice(0, limit);
}

/* ── Build table of contents from article sections ── */
export function buildTOC(article: KnowledgeArticle) {
  return article.sections.map(section => ({
    id:       section.id,
    heading:  section.heading,
    level:    section.level,
  }));
}

/* ── Get learning path articles in order ── */
export function getPathArticles(path: LearningPath): KnowledgeArticle[] {
  return path.steps
    .sort((a, b) => a.order - b.order)
    .map(step => articleBySlug[step.articleSlug])
    .filter((a): a is KnowledgeArticle => Boolean(a));
}

/* ── Get learning paths that include an article ── */
export function getPathsForArticle(articleSlug: string): LearningPath[] {
  return learningPaths.filter(path =>
    path.steps.some(step => step.articleSlug === articleSlug)
  );
}

/* ── Get glossary terms for an article ── */
export function getGlossaryForArticle(slugs: string[]): GlossaryTerm[] {
  return slugs
    .map(s => glossaryTerms.find(g => g.slug === s))
    .filter((t): t is GlossaryTerm => Boolean(t));
}

/* ── Build search index ── */
export function buildSearchIndex(): KnowledgeSearchEntry[] {
  const entries: KnowledgeSearchEntry[] = [];

  for (const article of knowledgeArticles) {
    entries.push({
      type:       'article',
      slug:       article.slug,
      title:      article.title,
      excerpt:    article.excerpt,
      category:   article.category,
      tags:       article.tags,
      difficulty: article.difficulty,
    });
  }

  for (const topic of knowledgeTopics) {
    entries.push({
      type:     'topic',
      slug:     topic.slug,
      title:    topic.title,
      excerpt:  topic.description,
      category: topic.slug,
      tags:     [topic.tier],
    });
  }

  for (const term of glossaryTerms) {
    entries.push({
      type:       'glossary',
      slug:       term.slug,
      title:      term.term,
      excerpt:    term.shortDefinition,
      category:   term.category,
      tags:       [term.difficulty],
      difficulty: term.difficulty,
    });
  }

  for (const path of learningPaths) {
    entries.push({
      type:       'path',
      slug:       path.slug,
      title:      path.title,
      excerpt:    path.description,
      category:   'artificial-intelligence',
      tags:       path.tags,
      difficulty: path.difficulty,
    });
  }

  return entries;
}

/* ── Format published date ── */
export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', {
    year:  'numeric',
    month: 'long',
    day:   'numeric',
  });
}

/* ── Get all unique tags across articles ── */
export function getAllTags(): string[] {
  const tagSet = new Set<string>();
  knowledgeArticles.forEach(a => a.tags.forEach(t => tagSet.add(t)));
  return Array.from(tagSet).sort();
}

/* ── Get articles by difficulty ── */
export function getArticlesByDifficulty(difficulty: Difficulty): KnowledgeArticle[] {
  return knowledgeArticles.filter(a => a.difficulty === difficulty);
}

/* ── Calculate total reading time for a path ── */
export function pathTotalMinutes(path: LearningPath): number {
  return path.steps.reduce((sum, step) => sum + step.estimatedMinutes, 0);
}

/* ── Get prev/next articles in same category ── */
export function getAdjacentArticles(
  currentSlug: string,
  category: string
): { prev: KnowledgeArticle | null; next: KnowledgeArticle | null } {
  const catArticles = knowledgeArticles.filter(a => a.category === category);
  const idx = catArticles.findIndex(a => a.slug === currentSlug);
  return {
    prev: idx > 0 ? catArticles[idx - 1] : null,
    next: idx < catArticles.length - 1 ? catArticles[idx + 1] : null,
  };
}

/* ── Schema.org Article JSON-LD ── */
export function buildArticleSchema(article: KnowledgeArticle, baseUrl: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.excerpt,
    datePublished: article.publishedAt,
    dateModified: article.updatedAt,
    author: {
      '@type': 'Organization',
      name: article.author.name,
    },
    publisher: {
      '@type': 'Organization',
      name: 'ProBotica',
      url: baseUrl,
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${baseUrl}/knowledge/${article.slug}`,
    },
    keywords: article.tags.join(', '),
    timeRequired: `PT${article.readingTime}M`,
  };
}
