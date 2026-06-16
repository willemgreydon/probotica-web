import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { BotDetailPage } from '@/features/bots/components/BotDetailPage';
import { importedBots } from '@/features/bots/data/imported-bots.server';
import { toPublicBots } from '@/features/bots/data/public-bots';

export const dynamic = 'force-dynamic';

interface BotDetailRouteProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: BotDetailRouteProps): Promise<Metadata> {
  const { slug } = await params;
  const bot = importedBots.find((entry) => entry.slug === slug);
  if (!bot) {
    return { title: 'Bot Not Found | ProBotica' };
  }
  return {
    title: `${bot.name} | ProBotica Bot Lab`,
    description: bot.description,
  };
}

export default async function BotDetailRoute({ params }: BotDetailRouteProps) {
  const { slug } = await params;
  const publicBots = toPublicBots(importedBots);
  const bot = publicBots.find((entry) => entry.slug === slug);
  if (!bot) notFound();

  const relatedBots = publicBots
    .filter((entry) => entry.category === bot.category && entry.slug !== bot.slug)
    .slice(0, 6);

  return <BotDetailPage bot={bot} relatedBots={relatedBots} />;
}
