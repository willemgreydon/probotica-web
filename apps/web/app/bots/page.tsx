import type { Metadata } from 'next';
import { BotLab } from '@/features/bots/components/BotLab';
import { importedBots } from '@/features/bots/data/imported-bots.server';
import { BOT_IMPORT_STATS, toPublicBots } from '@/features/bots/data/public-bots';

export const metadata: Metadata = {
  title: 'ProBotica Bot Lab',
  description:
    'Test bench for imported AI assistants, prompt systems, workflow bots, and agent modules.',
};

interface BotsPageProps {
  searchParams: Promise<{ select?: string }>;
}

export default async function BotsPage({ searchParams }: BotsPageProps) {
  const publicBots = toPublicBots(importedBots);
  const { select } = await searchParams;
  const initialSelectedSlug =
    select && publicBots.some((bot) => bot.slug === select) ? select : undefined;

  return (
    <div className="shell-x py-8">
      {/* Page header */}
      <div className="hero-strip panel mb-6" style={{ borderRadius: 'var(--radius-xl)', overflow: 'hidden' }}>
        <div className="hero-strip-bg" />
        <div className="hero-strip-content" style={{ padding: 'clamp(20px, 4vw, 40px) clamp(20px, 4vw, 40px) clamp(18px, 3vw, 36px)' }}>
          <div className="section-eyebrow">
            <span className="label-eyebrow">Bot Lab</span>
          </div>
          <h1 className="heading-section mt-2" style={{ maxWidth: '820px' }}>
            Test imported assistants and workflow bots in a command-center sandbox.
          </h1>
          <p className="text-lead mt-4" style={{ maxWidth: '640px' }}>
            Validate prompts, compare outputs, and prototype automation behavior before deployment.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '20px' }}>
            <span className="mono-chip">{publicBots.length} bots imported</span>
            <span className="mono-chip">{BOT_IMPORT_STATS.skippedCount} skipped</span>
            <span className="complexity-badge complexity-medium">live runtime</span>
          </div>
        </div>
      </div>

      <BotLab
        bots={publicBots}
        importStats={BOT_IMPORT_STATS}
        initialSelectedSlug={initialSelectedSlug}
      />

      <div className="panel-sm mt-6 panel-body-sm">
        <p className="text-caption mb-3">Safety & Compliance</p>
        <ul className="text-body" style={{ margin: 0, paddingLeft: '1rem' }}>
          <li>Demo outputs may be AI-generated and can contain inaccuracies.</li>
          <li>Do not enter sensitive personal data or confidential business data.</li>
          <li>Business-critical outputs require human verification before use.</li>
          <li>GDPR-aware workflows should only process scoped and lawful data.</li>
        </ul>
      </div>
    </div>
  );
}
