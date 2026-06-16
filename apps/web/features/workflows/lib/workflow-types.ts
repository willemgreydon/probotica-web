import type { BotCategory, BotOutputMode } from '@/features/bots/lib/bot-types';

export type WorkflowStepState = 'idle' | 'queued' | 'running' | 'success' | 'fallback' | 'failed';

export interface WorkflowStepDefinition {
  id: string;
  botSlug: string;
  lane: 'intake' | 'analysis' | 'execution' | 'review';
  scenarioId?: string;
  title?: string;
}

export interface WorkflowDefinition {
  id: string;
  title: string;
  description: string;
  category: BotCategory;
  runtimeComplexity: 'low' | 'medium' | 'high';
  estimatedDurationMin: number;
  steps: WorkflowStepDefinition[];
  notes?: string;
}

export interface WorkflowExecutionRequest {
  workflowId: string;
  title: string;
  steps: WorkflowStepDefinition[];
  initialInput: string;
  mode?: 'auto' | 'fallback-only';
}

export interface WorkflowStepResult {
  stepId: string;
  botSlug: string;
  botName: string;
  state: WorkflowStepState;
  input: string;
  output: string;
  fallback: boolean;
  model: string;
  category: string;
  latencyMs: number;
  startedAt: string;
  finishedAt: string;
  error?: string;
}

export interface WorkflowExecutionResult {
  ok: boolean;
  workflowId: string;
  title: string;
  runtimeMs: number;
  fallbackCount: number;
  successRatio: number;
  startedAt: string;
  finishedAt: string;
  steps: WorkflowStepResult[];
}

export interface WorkflowTemplate extends WorkflowDefinition {
  recommendedBotSlugs: string[];
  workflowCount: number;
  useCases: string[];
  spotlight?: boolean;
  estimatedOutputMode: BotOutputMode;
}
