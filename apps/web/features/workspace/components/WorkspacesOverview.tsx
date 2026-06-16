'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Plus, Pencil, Trash2, ArrowRight, Layers } from 'lucide-react';
import { useT } from '@/components/providers/LocaleProvider';
import {
  listWorkspaceSummaries,
  createWorkspace,
  deleteWorkspace,
  getWorkspace,
  saveWorkspace,
} from '@/features/workspace/workspace-persistence';
import type { WorkspaceSummary } from '@/features/workspace/workspace-types';

/**
 * Workspaces overview (the "All Workspaces" destination). Lists every saved
 * workspace with create / open / rename / delete actions. Client-only, backed
 * by localStorage persistence.
 */
export function WorkspacesOverview() {
  const router = useRouter();
  const t = useT();
  const [items, setItems] = useState<WorkspaceSummary[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setItems(listWorkspaceSummaries());
    setHydrated(true);
  }, []);

  const refresh = () => setItems(listWorkspaceSummaries());

  function onNew() {
    const ws = createWorkspace(`Workspace ${listWorkspaceSummaries().length + 1}`);
    saveWorkspace(ws);
    router.push(`/workspace/${ws.id}`);
  }

  function onRename(id: string) {
    const ws = getWorkspace(id);
    if (!ws || typeof window === 'undefined') return;
    const name = window.prompt('Rename workspace', ws.name);
    if (name && name.trim()) {
      saveWorkspace({ ...ws, name: name.trim() });
      refresh();
    }
  }

  function onDelete(id: string, name: string) {
    if (typeof window !== 'undefined' && !window.confirm(`Delete "${name}"? This permanently removes its workflows, notes and history.`)) return;
    deleteWorkspace(id);
    refresh();
  }

  return (
    <main id="main-content" className="shell-x py-8 grid gap-6">
      <section className="section-frame p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="label-eyebrow">{t('product.allWorkspaces')}</p>
            <h1 className="heading-section mt-2">{t('product.workspacesTitle')}</h1>
            <p className="text-body mt-2">{t('product.workspacesIntro')}</p>
          </div>
          <button type="button" className="btn btn-primary focus-ring" onClick={onNew} style={{ gap: 8 }}>
            <Plus size={15} aria-hidden /> {t('product.newWorkspaceShort')}
          </button>
        </div>
      </section>

      {!hydrated ? (
        <div className="grid gap-3" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(min(280px,100%),1fr))' }}>
          {Array.from({ length: 3 }).map((_, i) => <div key={i} className="skeleton" style={{ height: 120 }} />)}
        </div>
      ) : items.length === 0 ? (
        <div className="section-frame p-6" style={{ textAlign: 'center' }}>
          <Layers size={26} style={{ color: 'var(--muted-foreground)', margin: '0 auto 10px' }} aria-hidden />
          <p className="text-caption mb-2">No workspaces yet</p>
          <p className="text-body mb-4">Create your first workspace to start building AI workflows.</p>
          <button type="button" className="btn btn-primary focus-ring" onClick={onNew} style={{ gap: 8 }}>
            <Plus size={15} aria-hidden /> {t('product.newWorkspaceShort')}
          </button>
        </div>
      ) : (
        <div className="grid gap-3" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(min(300px,100%),1fr))' }}>
          {items.map((ws) => (
            <article
              key={ws.id}
              className="section-frame p-4"
              style={{ display: 'flex', flexDirection: 'column', gap: 12 }}
            >
              <Link href={`/workspace/${ws.id}`} style={{ textDecoration: 'none' }}>
                <p style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--foreground)' }}>{ws.name}</p>
                <p className="edge-label mt-1">
                  {ws.workflowCount} flow{ws.workflowCount !== 1 ? 's' : ''} · {ws.historyCount} run{ws.historyCount !== 1 ? 's' : ''}
                </p>
                <p className="edge-label mt-1" style={{ color: 'var(--telemetry-dim)' }}>
                  updated {new Date(ws.updatedAt).toLocaleDateString()}
                </p>
              </Link>
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 'auto' }}>
                <Link href={`/workspace/${ws.id}`} className="btn btn-primary focus-ring" style={{ minHeight: 34, fontSize: '.78rem', gap: 6 }}>
                  {t('product.open')} <ArrowRight size={13} aria-hidden />
                </Link>
                <button type="button" className="btn focus-ring" onClick={() => onRename(ws.id)} aria-label={`Rename ${ws.name}`} style={{ minHeight: 34, fontSize: '.78rem', gap: 6 }}>
                  <Pencil size={13} aria-hidden /> {t('product.rename')}
                </button>
                <button type="button" className="btn focus-ring" onClick={() => onDelete(ws.id, ws.name)} aria-label={`Delete ${ws.name}`} style={{ minHeight: 34, fontSize: '.78rem', gap: 6, marginLeft: 'auto', color: 'var(--danger)' }}>
                  <Trash2 size={13} aria-hidden /> {t('product.delete')}
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </main>
  );
}
