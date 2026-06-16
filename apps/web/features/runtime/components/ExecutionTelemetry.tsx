'use client';

import { useMemo } from 'react';
import type { WorkflowExecutionResult } from '@/features/workflows/lib/workflow-types';

interface ExecutionTelemetryProps {
  executions: WorkflowExecutionResult[];
}

export function ExecutionTelemetry({ executions }: ExecutionTelemetryProps) {
  const stats = useMemo(() => {
    const total = executions.length;
    const runtimeAvg = total
      ? Math.round(executions.reduce((sum, run) => sum + run.runtimeMs, 0) / total)
      : 0;
    const fallback = executions.reduce((sum, run) => sum + run.fallbackCount, 0);
    const ratio = total
      ? Math.round((executions.reduce((sum, run) => sum + run.successRatio, 0) / total) * 100)
      : 0;

    return { total, runtimeAvg, fallback, ratio };
  }, [executions]);

  return (
    <section className="section-frame p-4">
      <div className="flex items-center justify-between gap-2">
        <p className="text-caption">Execution Telemetry</p>
        <span className="route-marker">live feed</span>
      </div>

      <div className="mt-3 grid gap-2 md:grid-cols-4">
        <div className="command-card p-3"><p className="edge-label">Active Queue</p><p className="text-mono mt-1">{stats.total}</p></div>
        <div className="command-card p-3"><p className="edge-label">Avg Runtime</p><p className="text-mono mt-1">{stats.runtimeAvg} ms</p></div>
        <div className="command-card p-3"><p className="edge-label">Fallback Count</p><p className="text-mono mt-1">{stats.fallback}</p></div>
        <div className="command-card p-3"><p className="edge-label">Success Ratio</p><p className="text-mono mt-1">{stats.ratio}%</p></div>
      </div>

      <div className="mt-4 grid gap-2 max-h-[280px] overflow-y-auto">
        {executions.slice(0, 10).map((execution) => (
          <article key={`${execution.workflowId}-${execution.finishedAt}`} className="command-card p-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p style={{ fontWeight: 700 }}>{execution.title}</p>
              <span className="route-marker">{Math.round(execution.successRatio * 100)}%</span>
            </div>
            <p className="edge-label mt-1">runtime: {execution.runtimeMs}ms / fallback: {execution.fallbackCount}</p>
            <p className="text-body mt-2">latest: {execution.steps.at(-1)?.output?.slice(0, 180) || 'No output'}</p>
          </article>
        ))}
        {executions.length === 0 ? <p className="text-body">No executions yet.</p> : null}
      </div>
    </section>
  );
}
