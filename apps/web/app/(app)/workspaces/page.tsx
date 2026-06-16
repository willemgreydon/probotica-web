import type { Metadata } from 'next';
import { WorkspacesOverview } from '@/features/workspace/components/WorkspacesOverview';

export const metadata: Metadata = {
  title: 'Workspaces | ProBotica',
  description: 'All your AI workspaces — create, open, rename and delete orchestration workspaces.',
};

export default function WorkspacesPage() {
  return <WorkspacesOverview />;
}
