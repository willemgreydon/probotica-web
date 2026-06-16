'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import type { PublicBotDefinition } from '@/features/bots/lib/bot-types';
import { workflowTemplates } from '@/features/workflows/data/workflow-templates';
import type { WorkflowDefinition, WorkflowExecutionResult } from '@/features/workflows/lib/workflow-types';
import { WorkflowBuilder } from '@/features/workflows/components/WorkflowBuilder';
import { ExecutionTelemetry } from '@/features/runtime/components/ExecutionTelemetry';
import { addMemorySnapshot, getMemorySnapshots } from '@/features/memory/memory-store';
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
    return <main className="shell-x py-8"><p className="text-body">Loading workspace...</p></main>;
  }

  const memoryCount = getMemorySnapshots(workspace.id).length;

  return (
    <main className="shell-x py-8 grid gap-6">
      <section className="section-frame p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="label-eyebrow">AI Workspace</p>
            <h1 className="heading-section mt-2">{workspace.name}</h1>
            <p className="text-body mt-2">Persistent local-first orchestration workspace with runtime history and memory snapshots.</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              className="btn"
              onClick={() => {
                const next = createWorkspace(`Workspace ${summaries.length + 1}`);
                next.workflows = [buildDefaultWorkflow(bots)];
                persist(next);
              }}
            >
              New Workspace
            </button>
            <Link className="btn" href="/workspace">Workspace Index</Link>
          </div>
        </div>
      </section>

      <section className="grid gap-4 xl:grid-cols-[1.8fr_1fr] [&>*]:min-w-0">
        <WorkflowBuilder
          bots={bots}
          templates={workflowTemplates}
          workflow={activeWorkflow}
          onWorkflowChange={onWorkflowChange}
          onExecution={onExecution}
        />

        <aside className="grid gap-4">
          <section className="section-frame p-4">
            <p className="text-caption">Workspace Registry</p>
            <div className="mt-3 grid gap-2">
              {summaries.map((summary) => (
                <Link key={summary.id} href={`/workspace/${summary.id}`} className="command-card p-3" style={{ textDecoration: 'none' }}>
                  <p style={{ fontWeight: 700, color: 'var(--foreground)' }}>{summary.name}</p>
                  <p className="edge-label mt-1">flows: {summary.workflowCount} / history: {summary.historyCount}</p>
                </Link>
              ))}
            </div>
            <button
              className="btn mt-3"
              type="button"
              onClick={() => {
                deleteWorkspace(workspace.id);
                const next = listWorkspaceSummaries()[0];
                if (next) setWorkspace(getWorkspace(next.id));
              }}
            >
              Delete Current
            </button>
          </section>

          <section className="section-frame p-4">
            <p className="text-caption">Operational Notes</p>
            <textarea className="mt-2 w-full" rows={4} value={note} onChange={(e) => setNote(e.target.value)} style={{ border: '1px solid var(--hud-border)', background: 'var(--surface)', padding: '10px' }} />
            <button
              className="btn mt-2"
              type="button"
              onClick={() => {
                if (!note.trim()) return;
                persist(addWorkspaceNote(workspace, note.trim()));
                setNote('');
              }}
            >
              Save Note
            </button>
            <div className="mt-3 grid gap-2 max-h-[200px] overflow-y-auto">
              {workspace.notes.map((item) => (
                <article key={item.id} className="command-card p-3">
                  <p className="text-body">{item.text}</p>
                  <div className="mt-2 flex items-center justify-between">
                    <p className="edge-label">{new Date(item.createdAt).toLocaleString()}</p>
                    <button className="btn" onClick={() => persist(removeWorkspaceNote(workspace, item.id))}>Delete</button>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="section-frame p-4">
            <p className="text-caption">Memory Layer</p>
            <p className="text-body mt-2">Snapshots: {memoryCount}</p>
            <p className="edge-label mt-1">Scope: workspace / local-first</p>
          </section>
        </aside>
      </section>

      <ExecutionTelemetry executions={workspace.executionHistory} />
    </main>
  );
}
