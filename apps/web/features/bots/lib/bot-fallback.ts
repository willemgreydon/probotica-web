import type { BotCategory } from './bot-types';

/**
 * Bot-specific simulated output. When no OPENAI_API_KEY is configured (or a live
 * call fails), this produces output tailored to the selected bot — its category,
 * capabilities and the user's actual input — instead of a generic "[DEMO]" stub.
 * Real model output is still used whenever a key is present (see the API route).
 */

interface FallbackBot {
  name: string;
  category: BotCategory | string;
  capabilities: string[];
  outputMode: 'text' | 'json' | 'mixed';
}

interface Framing {
  lens: string;
  actions: string[];
}

const FRAMINGS: Record<string, Framing> = {
  sales: { lens: 'qualification and pipeline impact', actions: ['Confirm budget, authority, need and timeline (BANT)', 'Draft the personalized follow-up', 'Log to CRM with a dated next action'] },
  ux: { lens: 'usability and friction', actions: ['Rank issues by severity × effort', 'Validate with 5 quick usability tests', 'Ship the top-3 fixes this sprint'] },
  content: { lens: 'clarity, voice and SEO', actions: ['Sharpen the hook and headline', 'Add one clear call-to-action', 'Optimize for the target keyword'] },
  marketing: { lens: 'audience, message and funnel', actions: ['A/B test two distinct angles', 'Define the conversion event', 'Set a weekly growth metric'] },
  'real-estate': { lens: 'buyer fit and market context', actions: ['Match to 3 comparable listings', 'Prepare viewing logistics', 'Clarify financing and timeline'] },
  development: { lens: 'correctness, clarity and risk', actions: ['Add tests for the change', 'Refactor the riskiest path', 'Document the public interface'] },
  learning: { lens: 'comprehension and retention', actions: ['Self-quiz on the key idea', 'Space the review across 3 sessions', 'Apply it to one real example'] },
  automation: { lens: 'triggers, steps and failure modes', actions: ['Map trigger → action → output', 'Add error handling and retries', 'Log every run for observability'] },
  research: { lens: 'evidence and synthesis', actions: ['Triangulate with a second source', 'State an explicit confidence level', 'Turn findings into one decision'] },
  support: { lens: 'resolution and sentiment', actions: ['Resolve or route within SLA', 'Update the knowledge base', 'Confirm customer satisfaction'] },
  strategy: { lens: 'leverage and trade-offs', actions: ['Frame the 2-3 real options', 'Define the success metric', 'Decide and set a review date'] },
  other: { lens: 'structured guidance', actions: ['Clarify the goal', 'Break the task into steps', 'Review the output before use'] },
};

function preview(input: string, max = 240): string {
  const compact = input.replace(/\s+/g, ' ').trim();
  return compact.length > max ? `${compact.slice(0, max)}…` : compact;
}

export interface BotOutput {
  output: string;
  structured?: unknown;
}

export function generateBotOutput(bot: FallbackBot, input: string): BotOutput {
  const framing = FRAMINGS[bot.category] ?? FRAMINGS.other;
  const snippet = preview(input);
  const caps = (bot.capabilities.length ? bot.capabilities : ['structured assistance']).slice(0, 4);

  const summary = `${bot.name} reviewed your request through a ${framing.lens} lens and produced a structured plan tailored to: “${preview(input, 120)}”.`;
  const keyPoints = caps.map((cap) => `${cap} — applied to your input.`);
  const recommendations = framing.actions;
  const note = 'Simulated preview — set OPENAI_API_KEY for live model output. Always human-review business-critical results.';

  if (bot.outputMode === 'json') {
    const obj = {
      bot: bot.name,
      category: bot.category,
      summary,
      keyPoints,
      recommendations,
      confidence: 'medium',
      simulated: true,
    };
    return { output: JSON.stringify(obj, null, 2), structured: obj };
  }

  const prose = [
    summary,
    '',
    'Key points',
    ...keyPoints.map((k) => `• ${k}`),
    '',
    'Recommended next steps',
    ...recommendations.map((r, i) => `${i + 1}. ${r}`),
    '',
    `Input considered: ${snippet}`,
    '',
    note,
  ].join('\n');

  if (bot.outputMode === 'mixed') {
    const obj = { bot: bot.name, category: bot.category, summary, keyPoints, recommendations, simulated: true };
    return {
      output: `${prose}\n\n\`\`\`json\n${JSON.stringify(obj, null, 2)}\n\`\`\``,
      structured: obj,
    };
  }

  return { output: prose };
}
