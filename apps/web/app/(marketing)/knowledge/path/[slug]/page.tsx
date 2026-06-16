import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { learningPaths, pathBySlug } from '@/features/knowledge/data/learning-paths';
import { quizByPath } from '@/features/knowledge/data/path-quizzes';
import { pathMetadata } from '@/features/knowledge/lib/knowledge-seo';
import { PathJourney } from '@/features/knowledge/components/PathJourney';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return learningPaths.map((path) => ({ slug: path.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const path = pathBySlug[slug];
  if (!path) return {};
  return pathMetadata(path);
}

export default async function LearningPathPage({ params }: Props) {
  const { slug } = await params;
  const path = pathBySlug[slug];
  if (!path) notFound();

  return <PathJourney path={path} quiz={quizByPath[slug]} />;
}
