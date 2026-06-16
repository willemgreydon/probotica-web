import type { WorkflowExecutionResult } from '@/features/workflows/lib/workflow-types';
import type { WorkspaceRecord } from '@/features/workspace/workspace-types';

export function appendWorkspaceExecution(
  workspace: WorkspaceRecord,
  execution: { workflowId: string; preview: string; raw: WorkflowExecutionResult }
): WorkspaceRecord {
  const now = new Date().toISOString();
  return {
    ...workspace,
    updatedAt: now,
    outputs: [
      {
        id: crypto.randomUUID(),
        workflowId: execution.workflowId,
        preview: execution.preview.slice(0, 320),
        createdAt: now,
      },
      ...workspace.outputs,
    ].slice(0, 40),
    executionHistory: [execution.raw, ...workspace.executionHistory].slice(0, 30),
  };
}

export function addWorkspaceNote(workspace: WorkspaceRecord, text: string): WorkspaceRecord {
  const now = new Date().toISOString();
  return {
    ...workspace,
    updatedAt: now,
    notes: [{ id: crypto.randomUUID(), text, createdAt: now }, ...workspace.notes].slice(0, 80),
  };
}

export function removeWorkspaceNote(workspace: WorkspaceRecord, noteId: string): WorkspaceRecord {
  return {
    ...workspace,
    updatedAt: new Date().toISOString(),
    notes: workspace.notes.filter((note) => note.id !== noteId),
  };
}
