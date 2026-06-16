import type { WorkflowDefinition, WorkflowExecutionResult } from '@/features/workflows/lib/workflow-types';

export interface WorkspaceNote {
  id: string;
  text: string;
  createdAt: string;
}

export interface WorkspaceRecord {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  selectedBotSlugs: string[];
  selectedScenarioIds: string[];
  workflows: WorkflowDefinition[];
  outputs: Array<{ id: string; workflowId: string; preview: string; createdAt: string }>;
  executionHistory: WorkflowExecutionResult[];
  notes: WorkspaceNote[];
}

export interface WorkspaceSummary {
  id: string;
  name: string;
  updatedAt: string;
  workflowCount: number;
  historyCount: number;
}
