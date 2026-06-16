import type { Metadata } from 'next';
import { importedBots } from '@/features/bots/data/imported-bots.server';
import { toPublicBots } from '@/features/bots/data/public-bots';
import { ControlCenterPanel } from '@/features/runtime/components/ControlCenterPanel';

export const metadata: Metadata = {
  title: 'Control Center | ProBotica',
  description: 'Operational AI dashboard for runtime readiness, workspaces, and telemetry.',
};

export default function ControlCenterPage() {
  const bots = toPublicBots(importedBots);
  return (
    <div className="shell-x py-8">
      <ControlCenterPanel bots={bots} />
    </div>
  );
}
