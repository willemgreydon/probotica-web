import { NextResponse } from 'next/server';
import { z } from 'zod';
import { openai } from '@/lib/ai/openai';
import { botBySlug } from '@/features/bots/data/imported-bots.server';
import type { BotTestResponse } from '@/features/bots/lib/bot-types';

export const runtime = 'nodejs';

const RequestSchema = z.object({
  botSlug: z.string().min(1).max(200),
  input: z.string().trim().min(1).max(8000),
});

const SAFE_MODEL_FALLBACK = 'gpt-4.1-mini';
const SAFE_MODEL_PATTERN = /^[a-z0-9._:-]{3,80}$/i;

function noStoreJson(payload: unknown, status = 200) {
  return NextResponse.json(payload, {
    status,
    headers: { 'Cache-Control': 'no-store' },
  });
}

function nowMeta(model: string, category: string, startedAt: number) {
  return {
    model,
    category,
    latencyMs: Date.now() - startedAt,
    timestamp: new Date().toISOString(),
  };
}

function deterministicFallback(botName: string, input: string, capabilities: string[]): string {
  const compact = input.replace(/\s+/g, ' ').trim();
  const preview = compact.length > 220 ? `${compact.slice(0, 220)}...` : compact;
  const selectedCaps = capabilities.slice(0, 3);
  const capLine = selectedCaps.length > 0
    ? `Capabilities: ${selectedCaps.join(' | ')}`
    : 'Capabilities: prompt-based guidance';

  return [
    `[DEMO MODE] ${botName} executed with deterministic fallback.`,
    `Input Summary: ${preview}`,
    capLine,
    'Next Steps:',
    '1) Refine the input with business context.',
    '2) Run again with OPENAI_API_KEY enabled for live output.',
    '3) Human-review all business-critical decisions.',
  ].join('\n');
}

function getSafeModel(modelRaw: string): string {
  const clean = modelRaw.trim();
  return SAFE_MODEL_PATTERN.test(clean) ? clean : SAFE_MODEL_FALLBACK;
}

export async function POST(req: Request) {
  const startedAt = Date.now();
  const parsed = RequestSchema.safeParse(await req.json().catch(() => ({})));
  if (!parsed.success) {
    return noStoreJson({ ok: false, error: 'Invalid request payload.' }, 400);
  }

  const { botSlug, input } = parsed.data;
  const bot = botBySlug[botSlug];
  if (!bot) {
    return noStoreJson({ ok: false, error: 'Bot not found.' }, 404);
  }

  if (bot.status === 'disabled') {
    return noStoreJson({
      ok: false,
      error: 'This bot is disabled and cannot run.',
      botSlug: bot.slug,
      botName: bot.name,
      fallback: true,
      output: '',
      meta: nowMeta(SAFE_MODEL_FALLBACK, bot.category, startedAt),
    }, 403);
  }

  const model = getSafeModel(bot.model || SAFE_MODEL_FALLBACK);

  if (!openai || bot.status === 'draft') {
    const response: BotTestResponse = {
      ok: true,
      fallback: true,
      botSlug: bot.slug,
      botName: bot.name,
      output: deterministicFallback(bot.name, input, bot.capabilities),
      meta: nowMeta(model, bot.category, startedAt),
    };
    return noStoreJson(response);
  }

  try {
    const completion = await openai.chat.completions.create(
      {
        model,
        temperature: bot.temperature,
        messages: [
          { role: 'system', content: bot.systemPrompt },
          { role: 'user', content: input },
        ],
      },
      { signal: AbortSignal.timeout(15000) }
    );

    const output = completion.choices[0]?.message?.content?.trim() || 'No output generated.';
    let structured: unknown = undefined;
    if (bot.outputMode === 'json' || bot.outputMode === 'mixed') {
      try {
        structured = JSON.parse(output);
      } catch {
        structured = undefined;
      }
    }

    const response: BotTestResponse = {
      ok: true,
      fallback: false,
      botSlug: bot.slug,
      botName: bot.name,
      output,
      structured,
      meta: nowMeta(model, bot.category, startedAt),
    };
    return noStoreJson(response);
  } catch {
    const response: BotTestResponse = {
      ok: true,
      fallback: true,
      botSlug: bot.slug,
      botName: bot.name,
      output: deterministicFallback(bot.name, input, bot.capabilities),
      meta: nowMeta(model, bot.category, startedAt),
    };
    return noStoreJson(response);
  }
}

export function GET() {
  return noStoreJson({ ok: false, error: 'Method not allowed.' }, 405);
}
