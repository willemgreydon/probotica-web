import { NextResponse } from 'next/server';
import { ZodError } from 'zod';
import { executeWorkflow, validateWorkflowExecutionRequest } from '@/features/workflows/lib/workflow-engine';

export const runtime = 'nodejs';

function noStoreJson(payload: unknown, status = 200) {
  return NextResponse.json(payload, {
    status,
    headers: { 'Cache-Control': 'no-store' },
  });
}

function resolveBaseUrl(req: Request): string {
  const url = new URL(req.url);
  return `${url.protocol}//${url.host}`;
}

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const request = validateWorkflowExecutionRequest(body);
    const result = await executeWorkflow(request, resolveBaseUrl(req));
    return noStoreJson(result);
  } catch (error) {
    if (error instanceof ZodError) {
      return noStoreJson({ ok: false, error: 'Invalid workflow payload.' }, 400);
    }
    return noStoreJson({ ok: false, error: 'Workflow execution failed.' }, 500);
  }
}

export function GET() {
  return noStoreJson({ ok: false, error: 'Method not allowed.' }, 405);
}
