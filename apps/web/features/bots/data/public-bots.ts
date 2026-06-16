import type { BotDefinition, BotOutputMode, PublicBotDefinition } from '@/features/bots/lib/bot-types';

export const BOT_IMPORT_STATS = {
  importedCount: 111,
  skippedCount: 56,
} as const;

export function stripBotForClient(bot: BotDefinition): PublicBotDefinition {
  const { systemPrompt: _systemPrompt, ...publicBot } = bot;
  return publicBot;
}

export function toPublicBots(bots: BotDefinition[]): PublicBotDefinition[] {
  return bots.map(stripBotForClient);
}

export function listCategoriesWithCounts(bots: PublicBotDefinition[]): Array<{
  key: PublicBotDefinition['category'];
  count: number;
}> {
  const map = new Map<PublicBotDefinition['category'], number>();
  for (const bot of bots) {
    map.set(bot.category, (map.get(bot.category) ?? 0) + 1);
  }
  return Array.from(map.entries()).map(([key, count]) => ({ key, count }));
}

export function listOutputModesWithCounts(bots: PublicBotDefinition[]): Array<{
  key: BotOutputMode;
  count: number;
}> {
  const map = new Map<BotOutputMode, number>();
  for (const bot of bots) {
    map.set(bot.outputMode, (map.get(bot.outputMode) ?? 0) + 1);
  }
  return Array.from(map.entries()).map(([key, count]) => ({ key, count }));
}
