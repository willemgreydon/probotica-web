import type { WorkspaceRecord, WorkspaceSummary } from '@/features/workspace/workspace-types';

const KEY = 'probotica.workspace.records.v1';

function parse(value: string | null): WorkspaceRecord[] {
  if (!value) return [];
  try {
    const parsed = JSON.parse(value) as WorkspaceRecord[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function listWorkspaces(): WorkspaceRecord[] {
  if (typeof window === 'undefined') return [];
  return parse(window.localStorage.getItem(KEY));
}

export function listWorkspaceSummaries(): WorkspaceSummary[] {
  return listWorkspaces().map((workspace) => ({
    id: workspace.id,
    name: workspace.name,
    updatedAt: workspace.updatedAt,
    workflowCount: workspace.workflows.length,
    historyCount: workspace.executionHistory.length,
  }));
}

export function getWorkspace(id: string): WorkspaceRecord | null {
  return listWorkspaces().find((workspace) => workspace.id === id) ?? null;
}

export function saveWorkspace(record: WorkspaceRecord) {
  if (typeof window === 'undefined') return;
  const records = listWorkspaces();
  const next = records.filter((entry) => entry.id !== record.id);
  next.unshift({ ...record, updatedAt: new Date().toISOString() });
  window.localStorage.setItem(KEY, JSON.stringify(next.slice(0, 40)));
}

export function deleteWorkspace(id: string) {
  if (typeof window === 'undefined') return;
  const next = listWorkspaces().filter((entry) => entry.id !== id);
  window.localStorage.setItem(KEY, JSON.stringify(next));
}

export function createWorkspace(name: string): WorkspaceRecord {
  const now = new Date().toISOString();
  return {
    id: crypto.randomUUID(),
    name,
    createdAt: now,
    updatedAt: now,
    selectedBotSlugs: [],
    selectedScenarioIds: [],
    workflows: [],
    outputs: [],
    executionHistory: [],
    notes: [],
  };
}
