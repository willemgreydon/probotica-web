'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import type { PublicBotDefinition } from '@/features/bots/lib/bot-types';
import { workflowTemplates } from '@/features/workflows/data/workflow-templates';
import type { WorkflowDefinition, WorkflowExecutionResult } from '@/features/workflows/lib/workflow-types';
import { WorkflowBuilder } from '@/features/workflows/components/WorkflowBuilder';
import { ExecutionTelemetry } from '@/features/runtime/components/ExecutionTelemetry';
import { addMemorySnapshot, getMemorySnapshots, clearMemorySnapshots } from '@/features/memory/memory-store';
import { addWorkspaceNote, appendWorkspaceExecution, removeWorkspaceNote } from '@/features/workspace/workspace-store';
import { createWorkspace, deleteWorkspace, listWorkspaceSummaries, saveWorkspace, getWorkspace } from '@/features/workspace/workspace-persistence';
import type { WorkspaceRecord } from '@/features/workspace/workspace-types';

interface WorkspaceShellProps {
  bots: PublicBotDefinition[];
  workspaceId?: string;
}

function buildDefaultWorkflow(bots: PublicBotDefinition[]): WorkflowDefinition {
  const first = bots[0]?.slug ?? 'unknown-bot';
  return {
    id: 'ops-seed',
    title: 'Operational Seed Workflow',
    description: 'Base chain for intake, analysis, execution, and review in ProBotica runtime.',
    category: 'automation',
    runtimeComplexity: 'medium',
    estimatedDurationMin: 4,
    steps: [
      { id: crypto.randomUUID(), botSlug: first, lane: 'intake' },
      { id: crypto.randomUUID(), botSlug: first, lane: 'analysis' },
      { id: crypto.randomUUID(), botSlug: first, lane: 'review' },
    ],
  };
}

export function WorkspaceShell({ bots, workspaceId }: WorkspaceShellProps) {
  const [summaries, setSummaries] = useState(listWorkspaceSummaries());
  const [workspace, setWorkspace] = useState<WorkspaceRecord | null>(null);
  const [note, setNote] = useState('');

  useEffect(() => {
    const selected = workspaceId ? getWorkspace(workspaceId) : listWorkspaceSummaries()[0] ? getWorkspace(listWorkspaceSummaries()[0].id) : null;
    if (selected) {
      setWorkspace(selected);
      return;
    }
    const created = createWorkspace('Primary AI Workspace');
    created.workflows = [buildDefaultWorkflow(bots)];
    saveWorkspace(created);
    setWorkspace(created);
    setSummaries(listWorkspaceSummaries());
  }, [workspaceId, bots]);

  const activeWorkflow = useMemo(() => workspace?.workflows[0] ?? buildDefaultWorkflow(bots), [workspace, bots]);

  function persist(next: WorkspaceRecord) {
    setWorkspace(next);
    saveWorkspace(next);
    setSummaries(listWorkspaceSummaries());
  }

  function onWorkflowChange(nextWorkflow: WorkflowDefinition) {
    if (!workspace) return;
    persist({ ...workspace, workflows: [nextWorkflow, ...workspace.workflows.slice(1)] });
  }

  function onExecution(result: WorkflowExecutionResult) {
    if (!workspace) return;
    const preview = result.steps.at(-1)?.output ?? 'No output';
    const next = appendWorkspaceExecution(workspace, {
      workflowId: result.workflowId,
      preview,
      raw: result,
    });
    persist(next);
    addMemorySnapshot({
      scope: 'workspace',
      scopeId: workspace.id,
      tags: [result.title, 'workflow-run'],
      outputPreview: preview,
    });
  }

  if (!workspace) {
    return (
      <main className="shell-x py-8" aria-busy="true">
        <div className="section-frame p-6" style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div className="skeleton" style={{ height: 14, width: 140 }} />
          <div className="skeleton" style={{ height: 32, width: 'min(420px, 80%)' }} />
          <div className="skeleton" style={{ height: 240 }} />
        </div>
      </main>
    );
  }

  const ws = workspace;
  const snapshots = getMemorySnapshots(ws.id);
  const hasRun = ws.executionHistory.length > 0;

  function handleNewWorkspace() {
    const next = createWorkspace(`Workspace ${summaries.length + 1}`);
    next.workflows = [buildDefaultWorkflow(bots)];
    persist(next);
  }

  function handleDeleteWorkspace() {
    if (typeof window !== 'undefined' && !window.confirm(`Delete "${ws.name}"? This permanently removes its workflows, notes and history.`)) {
      return;
    }
    deleteWorkspace(ws.id);
    clearMemorySnapshots(ws.id);
    const next = listWorkspaceSummaries()[0];
    if (next) {
      const loaded = getWorkspace(next.id);
      setWorkspace(loaded);
      setSummaries(listWorkspaceSummaries());
    } else {
      // Never leave the user on a deleted workspace — seed a fresh one.
      const fresh = createWorkspace('Primary AI Workspace');
      fresh.workflows = [buildDefaultWorkflow(bots)];
      persist(fresh);
    }
  }

  function handleClearMemory() {
    if (typeof window !== 'undefined' && !window.confirm('Clear all memory snapshots for this workspace?')) return;
    clearMemorySnapshots(ws.id);
    setWorkspace({ ...ws });
  }

  return (
    <main className="shell-x py-8 grid gap-6">
      <section className="section-frame p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="label-eyebrow">AI Workspace</p>
            <h1 className="heading-section mt-2">{ws.name}</h1>
            <p className="text-body mt-2">Persistent local-first orchestration workspace with runtime history and memory snapshots.</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button className="btn focus-ring" type="button" onClick={handleNewWorkspace} aria-label="Create a new workspace">
              New Workspace
            </button>
            <Link className="btn focus-ring" href="/workspace" aria-label="View all workspaces">All Workspaces</Link>
          </div>
        </div>

        {/* First-run guidance */}
        {!hasRun && (
          <div
            role="note"
            style={{
              marginTop: 16,
              padding: '12px 14px',
              borderRadius: 'var(--radius-md)',
              border: '1px solid color-mix(in oklab, var(--primary), transparent 65%)',
              background: 'color-mix(in oklab, var(--primary), transparent 92%)',
              display: 'flex',
              gap: 10,
              alignItems: 'flex-start',
            }}
          >
            <span aria-hidden style={{ fontSize: '1rem', lineHeight: 1.2 }}>💡</span>
            <p className="text-body" style={{ margin: 0, fontSize: '.84rem' }}>
              <strong style={{ color: 'var(--foreground)' }}>Getting started:</strong> build a pipeline in the workflow
              builder (add steps across intake → analysis → execution → review), then <strong style={{ color: 'var(--foreground)' }}>Run</strong> it.
              Results, history and memory snapshots appear below — your work is saved locally as you go.
            </p>
          </div>
        )}
      </section>

      {/* Pipeline builder — full content width so the 4 lanes have room */}
      <WorkflowBuilder
        bots={bots}
        templates={workflowTemplates}
        workflow={activeWorkflow}
        onWorkflowChange={onWorkflowChange}
        onExecution={onExecution}
      />

      {/* Workspace panels row */}
      <section className="grid gap-4 lg:grid-cols-3 [&>*]:min-w-0" style={{ alignItems: 'start' }} aria-label="Workspace panels">
          {/* Workspace registry */}
          <section className="section-frame p-4">
            <div className="flex items-center justify-between">
              <p className="text-caption">Workspace Registry</p>
              <span className="route-marker">{summaries.length}</span>
            </div>
            <div className="mt-3 grid gap-2" style={{ maxHeight: 240, overflowY: 'auto' }}>
              {summaries.map((summary) => {
                const isCurrent = summary.id === ws.id;
                return (
                  <Link
                    key={summary.id}
                    href={`/workspace/${summary.id}`}
                    className="command-card p-3 focus-ring"
                    aria-current={isCurrent ? 'page' : undefined}
                    style={{
                      textDecoration: 'none',
                      flexShrink: 0,
                      borderColor: isCurrent ? 'var(--panel-border-active)' : undefined,
                    }}
                  >
                    <p style={{ fontWeight: 700, color: isCurrent ? 'var(--primary)' : 'var(--foreground)' }}>{summary.name}</p>
                    <p className="edge-label mt-1">flows: {summary.workflowCount} · history: {summary.historyCount}</p>
                  </Link>
                );
              })}
            </div>
            <button className="btn mt-3 focus-ring" type="button" onClick={handleDeleteWorkspace} aria-label={`Delete workspace ${ws.name}`}>
              Delete Current
            </button>
          </section>

          {/* Operational notes */}
          <section className="section-frame p-4">
            <p className="text-caption">Operational Notes</p>
            <label htmlFor="ws-note" className="sr-only">New note</label>
            <textarea
              id="ws-note"
              className="input mt-2"
              rows={3}
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Capture a decision, blocker or next action…"
              style={{ resize: 'vertical' }}
            />
            <button
              className="btn btn-primary mt-2 focus-ring"
              type="button"
              disabled={!note.trim()}
              onClick={() => {
                if (!note.trim()) return;
                persist(addWorkspaceNote(ws, note.trim()));
                setNote('');
              }}
              aria-label="Save note"
              style={{ opacity: note.trim() ? 1 : 0.5 }}
            >
              Save Note
            </button>
            <div className="mt-3 grid gap-2" style={{ maxHeight: 220, overflowY: 'auto' }}>
              {ws.notes.length === 0 ? (
                <p className="edge-label" style={{ opacity: 0.7 }}>No notes yet.</p>
              ) : (
                ws.notes.map((item) => (
                  <article key={item.id} className="command-card p-3" style={{ flexShrink: 0 }}>
                    <p className="text-body" style={{ fontSize: '.86rem' }}>{item.text}</p>
                    <div className="mt-2 flex items-center justify-between">
                      <p className="edge-label">{new Date(item.createdAt).toLocaleString()}</p>
                      <button
                        className="btn focus-ring"
                        type="button"
                        onClick={() => persist(removeWorkspaceNote(ws, item.id))}
                        aria-label="Delete note"
                        style={{ minHeight: 28, fontSize: '.7rem' }}
                      >
                        Delete
                      </button>
                    </div>
                  </article>
                ))
              )}
            </div>
          </section>

          {/* Memory layer */}
          <section className="section-frame p-4">
            <div className="flex items-center justify-between">
              <p className="text-caption">Memory Layer</p>
              <span className="route-marker">{snapshots.length}</span>
            </div>
            <p className="edge-label mt-1">Scope: workspace · local-first</p>
            {snapshots.length === 0 ? (
              <p className="edge-label mt-3" style={{ opacity: 0.7 }}>No snapshots yet — run a workflow to capture one.</p>
            ) : (
              <>
                <div className="mt-3 grid gap-2" style={{ maxHeight: 200, overflowY: 'auto' }}>
                  {snapshots.slice(0, 8).map((snap) => (
                    <article key={snap.id} className="command-card p-3" style={{ flexShrink: 0 }}>
                      <div className="flex flex-wrap" style={{ gap: 4, marginBottom: 6 }}>
                        {snap.tags.slice(0, 3).map((tag) => (
                          <span key={tag} className="mono-chip" style={{ fontSize: '.55rem' }}>{tag}</span>
                        ))}
                      </div>
                      <p className="text-body" style={{ fontSize: '.8rem' }}>
                        {snap.outputPreview.slice(0, 120)}{snap.outputPreview.length > 120 ? '…' : ''}
                      </p>
                      <p className="edge-label mt-1">{new Date(snap.createdAt).toLocaleString()}</p>
                    </article>
                  ))}
                </div>
                <button className="btn mt-3 focus-ring" type="button" onClick={handleClearMemory} aria-label="Clear memory snapshots" style={{ minHeight: 30, fontSize: '.72rem' }}>
                  Clear Memory
                </button>
              </>
            )}
          </section>
      </section>

      <ExecutionTelemetry executions={ws.executionHistory} />
    </main>
  );
}
