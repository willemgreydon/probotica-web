import type { Metadata } from 'next';
import { importedBots } from '@/features/bots/data/imported-bots.server';
import { toPublicBots } from '@/features/bots/data/public-bots';
import { workflowTemplates } from '@/features/workflows/data/workflow-templates';
import { MarketplaceView } from '@/features/marketplace/components/MarketplaceView';

export const metadata: Metadata = {
  title: 'Marketplace | ProBotica',
  description: 'Premium AI products, workflow packs, industry kits, and operational modules.',
};

export default function MarketplacePage() {
  const bots = toPublicBots(importedBots);
  return (
    <div className="shell-x py-8">
      <MarketplaceView bots={bots} templates={workflowTemplates} />
    </div>
  );
}
