import JSZip from 'jszip';
import type { PublicBotDefinition } from './bot-types';

/**
 * Export a selection of bots as a downloadable ZIP pack — one JSON (metadata)
 * and one Markdown brief per bot, plus a manifest and README. Client-only.
 */
function botBrief(b: PublicBotDefinition): string {
  return [
    `# ${b.name}`,
    '',
    `- Category: ${b.category}`,
    `- Model: ${b.model} · Temperature: ${b.temperature} · Output: ${b.outputMode}`,
    `- Status: ${b.status}`,
    '',
    '## Description',
    b.description,
    '',
    '## Starter prompt',
    '```',
    b.starterPrompt,
    '```',
    '',
    '## Capabilities',
    ...b.capabilities.map((c) => `- ${c}`),
    '',
    '## Sample inputs',
    ...b.sampleInputs.map((s) => `- ${s}`),
    '',
    '## Safety notes',
    ...b.safetyNotes.map((s) => `- ${s}`),
    '',
  ].join('\n');
}

function triggerDownload(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

export async function exportBotsZip(bots: PublicBotDefinition[], stamp?: string): Promise<void> {
  if (!bots.length) return;
  const zip = new JSZip();
  const exportedAt = stamp ?? new Date().toISOString();

  zip.file(
    'manifest.json',
    JSON.stringify(
      { product: 'ProBotica', exportedAt, count: bots.length, bots: bots.map((b) => ({ slug: b.slug, name: b.name, category: b.category })) },
      null,
      2,
    ),
  );
  zip.file(
    'README.md',
    `# ProBotica bot pack\n\n${bots.length} bot(s) exported from probotica.at on ${exportedAt}.\nEach bot ships a \`.json\` (full metadata) and a \`.md\` (prompt brief) under \`bots/\`.\n`,
  );

  const folder = zip.folder('bots');
  for (const b of bots) {
    folder?.file(`${b.slug}.json`, JSON.stringify(b, null, 2));
    folder?.file(`${b.slug}.md`, botBrief(b));
  }

  const blob = await zip.generateAsync({ type: 'blob' });
  triggerDownload(blob, `probotica-bots-${bots.length}.zip`);
}
