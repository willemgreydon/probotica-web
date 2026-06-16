import type { Metadata } from 'next';
import type { KnowledgeArticle, KnowledgeTopic, LearningPath } from './knowledge-types';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://probotica.at';
const SITE_NAME = 'ProBotica Knowledge';

export function articleMetadata(article: KnowledgeArticle): Metadata {
  return {
    title:       `${article.seo.metaTitle} | ProBotica`,
    description: article.seo.metaDescription,
    keywords:    article.seo.keywords,
    authors:     [{ name: article.author.name }],
    openGraph: {
      title:       article.seo.metaTitle,
      description: article.seo.metaDescription,
      type:        'article',
      publishedTime: article.publishedAt,
      modifiedTime:  article.updatedAt,
      authors:     [article.author.name],
      url:         `${SITE_URL}/knowledge/${article.slug}`,
      siteName:    SITE_NAME,
    },
    twitter: {
      card:        'summary_large_image',
      title:       article.seo.metaTitle,
      description: article.seo.metaDescription,
    },
    alternates: {
      canonical: `${SITE_URL}/knowledge/${article.slug}`,
    },
  };
}

export function topicMetadata(topic: KnowledgeTopic): Metadata {
  const title = `${topic.title} — AI Knowledge | ProBotica`;
  const description = `Explore all ProBotica articles on ${topic.title}. ${topic.description}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type:     'website',
      url:      `${SITE_URL}/knowledge/category/${topic.slug}`,
      siteName: SITE_NAME,
    },
    twitter: {
      card:        'summary_large_image',
      title,
      description,
    },
    alternates: {
      canonical: `${SITE_URL}/knowledge/category/${topic.slug}`,
    },
  };
}

export function hubMetadata(): Metadata {
  const title = 'AI Knowledge Universe — ProBotica';
  const description =
    'A structured library of AI knowledge — covering machine learning, neural networks, generative AI, robotics, prompt engineering, and the future of work. Clear, practical, expert-written.';

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type:     'website',
      url:      `${SITE_URL}/knowledge`,
      siteName: SITE_NAME,
    },
    twitter: {
      card:        'summary_large_image',
      title,
      description,
    },
    alternates: {
      canonical: `${SITE_URL}/knowledge`,
    },
  };
}

export function pathMetadata(path: LearningPath): Metadata {
  const title = `${path.title} Learning Path — ProBotica Knowledge`;
  const description = path.description;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type:     'website',
      url:      `${SITE_URL}/knowledge/path/${path.slug}`,
      siteName: SITE_NAME,
    },
  };
}
