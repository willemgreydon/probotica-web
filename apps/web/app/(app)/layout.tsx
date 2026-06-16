import { AppShell } from '@/components/layout/AppShell';
import { CommandPalette } from '@/components/command/CommandPalette';
import { importedBots } from '@/features/bots/data/imported-bots.server';
import { toPublicBots } from '@/features/bots/data/public-bots';
import { workflowTemplates } from '@/features/workflows/data/workflow-templates';

/**
 * Shared product-app layout (PB-004/006). One AppShell + CommandPalette wraps
 * every product route via the (app) route group, replacing the seven identical
 * per-section layouts that previously duplicated this exact wiring.
 */
export default function AppLayout({ children }: { children: React.ReactNode }) {
  const bots = toPublicBots(importedBots);
  const botItems = bots.map((b) => ({ slug: b.slug, name: b.name, category: b.category, shortName: b.shortName }));
  const wfItems = workflowTemplates.map((w) => ({ id: w.id, title: w.title, category: w.category }));

  return (
    <>
      <CommandPalette bots={botItems} workflows={wfItems} />
      <AppShell>{children}</AppShell>
    </>
  );
}
