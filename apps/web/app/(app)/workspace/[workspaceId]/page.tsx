import type { Metadata } from 'next';
import { importedBots } from '@/features/bots/data/imported-bots.server';
import { toPublicBots } from '@/features/bots/data/public-bots';
import { WorkspaceShell } from '@/features/workspace/components/WorkspaceShell';

interface WorkspaceRouteProps {
  params: Promise<{ workspaceId: string }>;
}

export async function generateMetadata({ params }: WorkspaceRouteProps): Promise<Metadata> {
  const { workspaceId } = await params;
  return {
    title: `Workspace ${workspaceId.slice(0, 8)} | ProBotica`,
    description: 'Workspace runtime, workflow builder, execution telemetry, and memory snapshots.',
  };
}

export default async function WorkspaceDetailPage({ params }: WorkspaceRouteProps) {
  const { workspaceId } = await params;
  const bots = toPublicBots(importedBots);
  return <WorkspaceShell bots={bots} workspaceId={workspaceId} />;
}
