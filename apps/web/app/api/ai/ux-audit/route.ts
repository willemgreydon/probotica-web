import { NextResponse } from 'next/server';
import { runStructuredAI } from '@/lib/ai/openai';
export const runtime = 'nodejs';
export async function POST(req: Request){
  const body = await req.json().catch(()=>({}));
  const input = String(body.input || '').slice(0,6000);
  const result = await runStructuredAI('You are ProBotica AI. Return strict JSON with summary, recommendations, risks, nextSteps, estimatedImpact.', input);
  return NextResponse.json({ scenario: 'ux-audit', ...result });
}
