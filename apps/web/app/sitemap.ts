import type { MetadataRoute } from 'next';
import { allNavLinks } from '@/lib/content/navigation';
import { knowledgeArticles } from '@/features/knowledge/data/knowledge-articles';
import { learningPaths } from '@/features/knowledge/data/learning-paths';
import { knowledgeTopics } from '@/features/knowledge/data/knowledge-topics';

/**
 * Sitemap (PB-018) — generated from the typed nav model plus dynamic knowledge
 * routes (articles, journeys, categories). Add more dynamic sets here as they
 * become indexable.
 */
const SITE = process.env.NEXT_PUBLIC_SITE_URL || 'https://probotica.at';

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const url = (path: string) => `${SITE}${path === '/' ? '' : path}`;

  const staticRoutes = Array.from(new Set(allNavLinks.map((l) => l.href)))
    .filter((href) => href.startsWith('/'))
    .map((href) => ({ url: url(href), lastModified, changeFrequency: 'weekly' as const, priority: href === '/' ? 1 : 0.7 }));

  const articleRoutes = knowledgeArticles.map((a) => ({
    url: url(`/knowledge/${a.slug}`),
    lastModified: new Date(a.updatedAt || a.publishedAt || lastModified),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  const journeyRoutes = learningPaths.map((p) => ({
    url: url(`/knowledge/path/${p.slug}`),
    lastModified,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  const categoryRoutes = knowledgeTopics.map((t) => ({
    url: url(`/knowledge/category/${t.slug}`),
    lastModified,
    changeFrequency: 'monthly' as const,
    priority: 0.5,
  }));

  return [...staticRoutes, ...articleRoutes, ...journeyRoutes, ...categoryRoutes];
}
