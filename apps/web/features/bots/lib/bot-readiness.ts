import type { BotDefinition, PublicBotDefinition } from '@/features/bots/lib/bot-types';

type AnyBot = BotDefinition | PublicBotDefinition;

export interface BotReadinessCheck {
  label: string;
  passed: boolean;
}

export interface BotReadinessResult {
  score: number;
  level: 'prototype' | 'ready' | 'strong' | 'production-candidate';
  checks: BotReadinessCheck[];
}

export function getBotReadiness(bot: AnyBot): BotReadinessResult {
  const checks: BotReadinessCheck[] = [
    { label: 'Description present', passed: bot.description.trim().length > 0 },
    { label: 'Capabilities present', passed: bot.capabilities.length > 0 },
    { label: 'Sample inputs present', passed: bot.sampleInputs.length > 0 },
    { label: 'Status active', passed: bot.status === 'active' },
    { label: 'Output mode set', passed: ['text', 'json', 'mixed'].includes(bot.outputMode) },
    { label: 'Model defined', passed: bot.model.trim().length > 0 },
    { label: 'Safety notes present', passed: bot.safetyNotes.length > 0 },
    { label: 'Category defined', passed: bot.category.trim().length > 0 },
  ];

  const passed = checks.filter((c) => c.passed).length;
  const score = Math.round((passed / checks.length) * 100);

  let level: BotReadinessResult['level'] = 'prototype';
  if (score >= 90) level = 'production-candidate';
  else if (score >= 75) level = 'strong';
  else if (score >= 55) level = 'ready';

  return { score, level, checks };
}
