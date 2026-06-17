import 'server-only';

import { importedBots } from '@/features/bots/data/imported-bots.server';
import {
  toPublicBots,
  listCategoriesWithCounts,
  listOutputModesWithCounts,
} from '@/features/bots/data/public-bots';
import { getBotReadiness } from '@/features/bots/lib/bot-readiness';
import { workflowTemplates } from '@/features/workflows/data/workflow-templates';
import { botScenarios } from '@/features/bots/data/bot-scenarios';
import { knowledgeArticles } from '@/features/knowledge/data/knowledge-articles';
import { knowledgeTopics } from '@/features/knowledge/data/knowledge-topics';
import { learningPaths } from '@/features/knowledge/data/learning-paths';
import { glossaryTerms } from '@/features/knowledge/data/glossary';

/**
 * Single source of truth for derived platform metrics (PB / task #55).
 *
 * Server-only (it pulls in `imported-bots.server.ts`, which reads the markdown
 * export from disk). Every KPI / chart across the marketing + product surfaces
 * should derive from this so the numbers are real and never drift between pages.
 * Computed once and memoized for the process lifetime.
 */
export interface CategoryCount {
  /** raw slug, e.g. `real-estate` */
  key: string;
  /** human label, e.g. `Real estate` */
  label: string;
  count: number;
}

export interface PlatformStats {
  botCount: number;
  categoryCount: number;
  categoryCounts: CategoryCount[];
  outputModeCounts: Array<{ key: string; label: string; count: number }>;
  /** rounded mean readiness score (0–100) across all bots */
  avgReadiness: number;
  /** bots scoring ≥75 ("strong" or "production-candidate") */
  productionReadyCount: number;
  workflowCount: number;
  scenarioCount: number;
  articleCount: number;
  topicCount: number;
  pathCount: number;
  glossaryCount: number;
  /** total estimated learning hours across all paths (rounded) */
  learningHours: number;
}

function titleCase(slug: string): string {
  const s = slug.replace(/-/g, ' ');
  return s.charAt(0).toUpperCase() + s.slice(1);
}

let cached: PlatformStats | null = null;

export function getPlatformStats(): PlatformStats {
  if (cached) return cached;

  const bots = toPublicBots(importedBots);
  const categoryCounts: CategoryCount[] = listCategoriesWithCounts(bots)
    .map((c) => ({ key: String(c.key), label: titleCase(String(c.key)), count: c.count }))
    .sort((a, b) => b.count - a.count);
  const outputModeCounts = listOutputModesWithCounts(bots).map((m) => ({
    key: String(m.key),
    label: String(m.key).toUpperCase(),
    count: m.count,
  }));

  const scores = bots.map((b) => getBotReadiness(b).score);
  const avgReadiness = scores.length
    ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length)
    : 0;
  const productionReadyCount = scores.filter((s) => s >= 75).length;

  const learningHours = Math.round(
    learningPaths.reduce((sum, p) => sum + (Number((p as { estimatedHours?: number }).estimatedHours) || 0), 0),
  );

  cached = {
    botCount: bots.length,
    categoryCount: categoryCounts.length,
    categoryCounts,
    outputModeCounts,
    avgReadiness,
    productionReadyCount,
    workflowCount: workflowTemplates.length,
    scenarioCount: botScenarios.length,
    articleCount: knowledgeArticles.length,
    topicCount: knowledgeTopics.length,
    pathCount: learningPaths.length,
    glossaryCount: glossaryTerms.length,
    learningHours,
  };
  return cached;
}
