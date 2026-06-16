import { AppShell } from '@/components/layout/AppShell';
import { CommandPalette } from '@/components/command/CommandPalette';
import { importedBots } from '@/features/bots/data/imported-bots.server';
import { toPublicBots } from '@/features/bots/data/public-bots';
import { workflowTemplates } from '@/features/workflows/data/workflow-templates';

export default function WorkflowsLayout({ children }: { children: React.ReactNode }) {
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
