import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { articleBySlug, knowledgeArticles } from '@/features/knowledge/data/knowledge-articles';
import { articleMetadata } from '@/features/knowledge/lib/knowledge-seo';
import { buildArticleSchema, getPathsForArticle, getGlossaryForArticle } from '@/features/knowledge/lib/knowledge-utils';
import { KnowledgeArticleLayout } from '@/features/knowledge/components/KnowledgeArticleLayout';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return knowledgeArticles.map(article => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = articleBySlug[slug];
  if (!article) return {};
  return articleMetadata(article);
}

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://probotica.at';

export default async function KnowledgeArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = articleBySlug[slug];
  if (!article) notFound();

  const relatedPaths   = getPathsForArticle(article.slug);
  const glossaryTerms  = getGlossaryForArticle(article.glossaryTerms);
  const articleSchema  = buildArticleSchema(article, SITE_URL);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <KnowledgeArticleLayout
        article={article}
        relatedPaths={relatedPaths}
        glossaryTerms={glossaryTerms}
      />
    </>
  );
}
