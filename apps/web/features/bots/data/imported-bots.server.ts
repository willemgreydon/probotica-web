import 'server-only';
import fs from 'node:fs';
import path from 'node:path';
import type { BotCategory, BotDefinition } from '@/features/bots/lib/bot-types';

const IMPORT_DIR = path.join(process.cwd(), '_imports', 'bot-export', 'part-1');

const FIELD_RX = {
  title: /^#\s*(.+)$/m,
  businessField: /^Business Field:\s*(.+)$/m,
  shortDescription: /^Short Description:\s*(.+)$/m,
  systemPrompt: /^System Prompt:\s*([\s\S]*?)(?:\n[A-Z][A-Za-z -]+:|\nPrompt-only:|\nSetup:|\nConfiguration:|\nAvailable:|\n$)/m,
  keyCapabilities: /^Key Capabilities:\s*([\s\S]*?)(?:\nEfficiency Gains:|\nPrompt-only:|\nSetup:|\nConfiguration:|\nOutput Format:|\nAvailable:|\n$)/m,
  outputFormat: /^Output Format:\s*(.+)$/m,
  available: /^Available:\s*(.+)$/m,
  configModel: /^Configuration:\s*Model:\s*(.+)$/m,
  configTemp: /Temperature:\s*([0-9.]+)(?:[–-]([0-9.]+))?/m,
} as const;

function cleanText(value: string): string {
  return value
    .replace(/\r/g, '')
    .replace(/[ \t]+/g, ' ')
    .replace(/\u00a0/g, ' ')
    .replace(/âœ¦/g, '-')
    .replace(/ðŸ—²/g, '-')
    .replace(/â€“/g, '-')
    .replace(/â€”/g, '-')
    .replace(/â€"/g, '-')
    .replace(/Â/g, '')
    .trim();
}

function slugify(input: string): string {
  return cleanText(input)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

function parseList(value: string): string[] {
  return cleanText(value)
    .split('\n')
    .map((line) => line.replace(/^[\-\u2022]\s*/, '').trim())
    .map((line) => line.replace(/^- /, '').trim())
    .filter(Boolean);
}

function mapCategory(fieldRaw: string, nameRaw: string): BotCategory {
  const value = `${fieldRaw} ${nameRaw}`.toLowerCase();
  if (value.includes('real estate')) return 'real-estate';
  if (value.includes('ux') || value.includes('ui')) return 'ux';
  if (value.includes('marketing')) return 'marketing';
  if (value.includes('content') || value.includes('copy')) return 'content';
  if (value.includes('product') || value.includes('strategy')) return 'strategy';
  if (value.includes('support') || value.includes('faq') || value.includes('employee support')) return 'support';
  if (value.includes('frontend') || value.includes('backend') || value.includes('code') || value.includes('developer')) return 'development';
  if (value.includes('research') || value.includes('analytics') || value.includes('metrics')) return 'research';
  if (value.includes('automation') || value.includes('robot') || value.includes('autonomous') || value.includes('mechatronics')) return 'automation';
  if (value.includes('sales') || value.includes('lead') || value.includes('crm')) return 'sales';
  if (value.includes('learning') || value.includes('education')) return 'learning';
  return 'other';
}

function mapOutputMode(format: string): BotDefinition['outputMode'] {
  const f = format.toLowerCase();
  if (f.includes('json') && (f.includes('conversation') || f.includes('text'))) return 'mixed';
  if (f.includes('json')) return 'json';
  return 'text';
}

function parseBot(filePath: string): BotDefinition | null {
  const raw = fs.readFileSync(filePath, 'utf8');
  const systemPromptMatch = raw.match(FIELD_RX.systemPrompt);
  if (!systemPromptMatch) return null;

  const title = cleanText(raw.match(FIELD_RX.title)?.[1] ?? path.basename(filePath, '.md'));
  const businessField = cleanText(raw.match(FIELD_RX.businessField)?.[1] ?? 'Other');
  const description = cleanText(raw.match(FIELD_RX.shortDescription)?.[1] ?? 'Imported assistant from bot export.');
  const systemPrompt = cleanText(systemPromptMatch[1] ?? '');
  const capabilitiesRaw = raw.match(FIELD_RX.keyCapabilities)?.[1] ?? '';
  const capabilities = parseList(capabilitiesRaw);
  const sampleInputs = capabilities.slice(0, 4).map((line) => line.replace(/^i('?| a)m\s+/i, '').trim());
  const outputFormat = cleanText(raw.match(FIELD_RX.outputFormat)?.[1] ?? 'Conversational response');
  const availableRaw = cleanText(raw.match(FIELD_RX.available)?.[1] ?? 'No');
  const model = cleanText(raw.match(FIELD_RX.configModel)?.[1] ?? 'gpt-4.1-mini');
  const tempMatch = raw.match(FIELD_RX.configTemp);
  const minTemp = tempMatch?.[1] ? Number(tempMatch[1]) : 0.4;
  const maxTemp = tempMatch?.[2] ? Number(tempMatch[2]) : minTemp;
  const temperature = Number.isFinite(minTemp) && Number.isFinite(maxTemp)
    ? Number(((minTemp + maxTemp) / 2).toFixed(2))
    : 0.4;
  const category = mapCategory(businessField, title);
  const shortName = title.length > 30 ? `${title.slice(0, 27).trim()}...` : title;
  const slugSeed = `${title}-${path.basename(filePath, '.md').split(' ').pop() ?? ''}`;
  const slug = slugify(slugSeed);
  const id = `bot-${slug}`;

  return {
    id,
    slug,
    name: title,
    shortName,
    category,
    description,
    systemPrompt,
    starterPrompt: sampleInputs[0] ?? `Help me with ${title.toLowerCase()}.`,
    inputPlaceholder: `Describe your ${businessField.toLowerCase()} task...`,
    outputMode: mapOutputMode(outputFormat),
    tags: Array.from(
      new Set(
        [businessField, category, availableRaw.toLowerCase() === 'yes' ? 'available' : 'draft']
          .map((tag) => cleanText(tag).toLowerCase())
          .filter(Boolean),
      ),
    ),
    model,
    temperature: Number.isFinite(temperature) ? temperature : 0.4,
    status: availableRaw.toLowerCase() === 'yes' ? 'active' : 'draft',
    sourceFile: path.relative(process.cwd(), filePath).replace(/\\/g, '/'),
    sampleInputs: sampleInputs.length > 0 ? sampleInputs : [`Give me a workflow for ${title}.`],
    capabilities: capabilities.length > 0 ? capabilities : ['Prompt-based assistance'],
    safetyNotes: [
      'AI output may contain errors. Human review required.',
      'Do not include personal, confidential, or regulated data.',
      'Use scoped data for GDPR-aware workflows only.',
    ],
  };
}

function loadImportedBots(): BotDefinition[] {
  if (!fs.existsSync(IMPORT_DIR)) return [];
  const files = fs.readdirSync(IMPORT_DIR)
    .filter((name) => name.toLowerCase().endsWith('.md'))
    .map((name) => path.join(IMPORT_DIR, name));

  return files
    .map((filePath) => parseBot(filePath))
    .filter((bot): bot is BotDefinition => Boolean(bot))
    .sort((a, b) => a.name.localeCompare(b.name));
}

export const importedBots: BotDefinition[] = loadImportedBots();

export const botBySlug: Record<string, BotDefinition> = Object.fromEntries(
  importedBots.map((bot) => [bot.slug, bot])
);
