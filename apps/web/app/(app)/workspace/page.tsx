import type { Metadata } from 'next';
import { Suspense } from 'react';
import { importedBots } from '@/features/bots/data/imported-bots.server';
import { toPublicBots } from '@/features/bots/data/public-bots';
import { WorkspaceShell } from '@/features/workspace/components/WorkspaceShell';

export const metadata: Metadata = {
  title: 'AI Workspace | ProBotica',
  description: 'Persistent AI orchestration workspace for workflows, execution history, outputs, and notes.',
};

export default function WorkspacePage() {
  const bots = toPublicBots(importedBots);
  return (
    <Suspense>
      <WorkspaceShell bots={bots} />
    </Suspense>
  );
}
