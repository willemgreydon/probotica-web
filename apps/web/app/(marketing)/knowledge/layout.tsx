import { KnowledgeProgressProvider } from '@/features/knowledge/lib/knowledge-progress';

/**
 * Wraps the entire Knowledge Universe (hub, articles, journeys) in the
 * progress provider so completion + quiz state is shared and persisted.
 */
export default function KnowledgeLayout({ children }: { children: React.ReactNode }) {
  return <KnowledgeProgressProvider>{children}</KnowledgeProgressProvider>;
}
