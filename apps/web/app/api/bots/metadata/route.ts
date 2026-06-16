import { NextResponse } from 'next/server';
import { importedBots } from '@/features/bots/data/imported-bots.server';
import { listCategoriesWithCounts, listOutputModesWithCounts, toPublicBots } from '@/features/bots/data/public-bots';

export const runtime = 'nodejs';

export function GET() {
  const publicBots = toPublicBots(importedBots);
  const payload = {
    ok: true,
    bots: publicBots,
    counts: {
      total: publicBots.length,
      byCategory: listCategoriesWithCounts(publicBots),
      byOutputMode: listOutputModesWithCounts(publicBots),
      active: publicBots.filter((bot) => bot.status === 'active').length,
      draft: publicBots.filter((bot) => bot.status === 'draft').length,
      disabled: publicBots.filter((bot) => bot.status === 'disabled').length,
    },
  };
  return NextResponse.json(payload, {
    headers: { 'Cache-Control': 'no-store' },
  });
}
