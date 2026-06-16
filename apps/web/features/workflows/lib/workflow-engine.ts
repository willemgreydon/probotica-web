import { z } from 'zod';
import type { WorkflowExecutionRequest, WorkflowExecutionResult, WorkflowStepResult } from '@/features/workflows/lib/workflow-types';

const StepSchema = z.object({
  id: z.string().min(1).max(120),
  botSlug: z.string().min(1).max(240),
  lane: z.enum(['intake', 'analysis', 'execution', 'review']),
  scenarioId: z.string().max(120).optional(),
  title: z.string().max(180).optional(),
});

const RequestSchema = z.object({
  workflowId: z.string().min(1).max(120),
  title: z.string().min(1).max(160),
  initialInput: z.string().trim().min(1).max(8000),
  mode: z.enum(['auto', 'fallback-only']).optional(),
  steps: z.array(StepSchema).min(1).max(24),
});

interface BotTestLikeResponse {
  ok: boolean;
  fallback: boolean;
  botSlug: string;
  botName: string;
  output: string;
  meta: { model: string; category: string; latencyMs: number; timestamp: string };
  error?: string;
}

export function validateWorkflowExecutionRequest(value: unknown): WorkflowExecutionRequest {
  const parsed = RequestSchema.parse(value);
  return parsed;
}

async function runSingleStep(baseUrl: string, botSlug: string, input: string, signal: AbortSignal): Promise<BotTestLikeResponse> {
  const res = await fetch(`${baseUrl}/api/bots/test`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ botSlug, input }),
    cache: 'no-store',
    signal,
  });
  const json = (await res.json()) as BotTestLikeResponse;
  if (!res.ok || !json.ok) {
    return {
      ok: false,
      fallback: true,
      botSlug,
      botName: 'unknown',
      output: '',
      meta: { model: 'gpt-4.1-mini', category: 'other', latencyMs: 0, timestamp: new Date().toISOString() },
      error: json.error || 'Step failed.',
    };
  }
  return json;
}

export async function executeWorkflow(
  request: WorkflowExecutionRequest,
  baseUrl: string,
  timeoutMs = 20000
): Promise<WorkflowExecutionResult> {
  const startedAt = Date.now();
  const startedAtIso = new Date(startedAt).toISOString();

  const steps: WorkflowStepResult[] = [];
  let contextInput = request.initialInput;
  let fallbackCount = 0;
  let successCount = 0;

  for (const step of request.steps) {
    const stepStarted = Date.now();
    const stepStartedIso = new Date(stepStarted).toISOString();

    if (request.mode === 'fallback-only') {
      const output = [
        `[WORKFLOW FALLBACK] Step ${step.id} (${step.botSlug})`,
        `Input: ${contextInput.slice(0, 240)}`,
        'Next: Validate output manually before operational use.',
      ].join('\n');

      const result: WorkflowStepResult = {
        stepId: step.id,
        botSlug: step.botSlug,
        botName: step.botSlug,
        state: 'fallback',
        input: contextInput,
        output,
        fallback: true,
        model: 'gpt-4.1-mini',
        category: 'other',
        latencyMs: Date.now() - stepStarted,
        startedAt: stepStartedIso,
        finishedAt: new Date().toISOString(),
      };
      steps.push(result);
      contextInput = output;
      fallbackCount += 1;
      successCount += 1;
      continue;
    }

    try {
      const response = await runSingleStep(baseUrl, step.botSlug, contextInput, AbortSignal.timeout(timeoutMs));
      const state: WorkflowStepResult['state'] = response.ok
        ? response.fallback
          ? 'fallback'
          : 'success'
        : 'failed';

      const output = response.output || '[No output]';
      const result: WorkflowStepResult = {
        stepId: step.id,
        botSlug: step.botSlug,
        botName: response.botName || step.botSlug,
        state,
        input: contextInput,
        output,
        fallback: response.fallback,
        model: response.meta.model,
        category: response.meta.category,
        latencyMs: response.meta.latencyMs || Date.now() - stepStarted,
        startedAt: stepStartedIso,
        finishedAt: new Date().toISOString(),
        error: response.error,
      };
      steps.push(result);

      if (state === 'success' || state === 'fallback') {
        contextInput = output;
        successCount += 1;
      }
      if (state === 'fallback') fallbackCount += 1;
    } catch (error) {
      const result: WorkflowStepResult = {
        stepId: step.id,
        botSlug: step.botSlug,
        botName: step.botSlug,
        state: 'failed',
        input: contextInput,
        output: '',
        fallback: true,
        model: 'gpt-4.1-mini',
        category: 'other',
        latencyMs: Date.now() - stepStarted,
        startedAt: stepStartedIso,
        finishedAt: new Date().toISOString(),
        error: error instanceof Error ? error.message : 'Unknown execution error.',
      };
      steps.push(result);
      fallbackCount += 1;
    }
  }

  const runtimeMs = Date.now() - startedAt;
  const successRatio = steps.length ? Number((successCount / steps.length).toFixed(2)) : 0;

  return {
    ok: successCount > 0,
    workflowId: request.workflowId,
    title: request.title,
    runtimeMs,
    fallbackCount,
    successRatio,
    startedAt: startedAtIso,
    finishedAt: new Date().toISOString(),
    steps,
  };
}
