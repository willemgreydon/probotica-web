'use client';

import { useMemo, useState } from 'react';
import type { PublicBotDefinition } from '@/features/bots/lib/bot-types';
import type { WorkflowDefinition, WorkflowExecutionResult, WorkflowStepDefinition, WorkflowStepState, WorkflowTemplate } from '@/features/workflows/lib/workflow-types';
import { getBotReadiness } from '@/features/bots/lib/bot-readiness';

interface WorkflowBuilderProps {
  bots: PublicBotDefinition[];
  templates: WorkflowTemplate[];
  workflow: WorkflowDefinition;
  onWorkflowChange: (next: WorkflowDefinition) => void;
  onExecution: (result: WorkflowExecutionResult) => void;
}

const LANES: Array<WorkflowStepDefinition['lane']> = ['intake', 'analysis', 'execution', 'review'];

const LANE_COLORS: Record<string, string> = {
  intake:    'var(--accent)',
  analysis:  'var(--status-warn)',
  execution: 'var(--status-active)',
  review:    'var(--muted-foreground)',
};

const STEP_STATE_COLORS: Record<WorkflowStepState, string> = {
  idle:     'var(--muted-foreground)',
  queued:   'var(--status-warn)',
  running:  'var(--accent)',
  success:  'var(--status-active)',
  fallback: 'var(--status-warn)',
  failed:   'var(--status-error)',
};

function createStep(botSlug: string, lane: WorkflowStepDefinition['lane']): WorkflowStepDefinition {
  return { id: crypto.randomUUID(), botSlug, lane };
}

export function WorkflowBuilder({ bots, templates, workflow, onWorkflowChange, onExecution }: WorkflowBuilderProps) {
  const [input, setInput] = useState('Run this workflow with operational clarity and tactical output.');
  const [running, setRunning] = useState(false);
  const [error, setError] = useState<string>('');
  const [stepStates, setStepStates] = useState<Record<string, WorkflowStepState>>({});
  const [selectedLane, setSelectedLane] = useState<WorkflowStepDefinition['lane']>('analysis');
  const [selectedBot, setSelectedBot] = useState(bots[0]?.slug ?? '');
  const [dragLane, setDragLane] = useState<WorkflowStepDefinition['lane'] | null>(null);

  const botBySlug = useMemo(() => Object.fromEntries(bots.map((bot) => [bot.slug, bot])), [bots]);

  const stepsByLane = useMemo(() => {
    return LANES.map((lane) => ({
      lane,
      steps: workflow.steps.filter((step) => step.lane === lane),
    }));
  }, [workflow.steps]);

  function setSteps(nextSteps: WorkflowStepDefinition[]) {
    onWorkflowChange({ ...workflow, steps: nextSteps });
  }

  function addStep(botSlug: string, lane: WorkflowStepDefinition['lane']) {
    setSteps([...workflow.steps, createStep(botSlug, lane)]);
  }

  function removeStep(stepId: string) {
    setSteps(workflow.steps.filter((step) => step.id !== stepId));
  }

  /** Drag-and-drop: move a step into a different lane (drop target). */
  function moveStepToLane(stepId: string, lane: WorkflowStepDefinition['lane']) {
    setSteps(workflow.steps.map((step) => (step.id === stepId ? { ...step, lane } : step)));
  }

  function reorderStep(stepId: string, direction: 'up' | 'down') {
    const idx = workflow.steps.findIndex((step) => step.id === stepId);
    if (idx < 0) return;
    const target = direction === 'up' ? idx - 1 : idx + 1;
    if (target < 0 || target >= workflow.steps.length) return;
    const copy = [...workflow.steps];
    const [moved] = copy.splice(idx, 1);
    copy.splice(target, 0, moved);
    setSteps(copy);
  }

  function applyTemplate(templateId: string) {
    const template = templates.find((entry) => entry.id === templateId);
    if (!template) return;
    onWorkflowChange({
      id: template.id,
      title: template.title,
      description: template.description,
      category: template.category,
      runtimeComplexity: template.runtimeComplexity,
      estimatedDurationMin: template.estimatedDurationMin,
      steps: template.steps.filter((step) => botBySlug[step.botSlug]),
      notes: `Template loaded: ${template.title}`,
    });
  }

  async function runWorkflow() {
    if (!workflow.steps.length || !input.trim()) return;
    setRunning(true);
    setError('');
    setStepStates(Object.fromEntries(workflow.steps.map((step) => [step.id, 'queued' as const])));

    try {
      const payload = {
        workflowId: workflow.id,
        title: workflow.title,
        initialInput: input,
        steps: workflow.steps,
        mode: 'auto' as const,
      };

      const res = await fetch('/api/workflows/run', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const json = (await res.json()) as WorkflowExecutionResult & { error?: string };
      if (!res.ok || !json.ok) {
        setError(json.error || 'Workflow execution failed.');
        return;
      }

      const states: Record<string, WorkflowStepState> = {};
      for (const step of json.steps) states[step.stepId] = step.state;
      setStepStates(states);
      onExecution(json);
    } catch {
      setError('Network/runtime error while executing workflow.');
    } finally {
      setRunning(false);
    }
  }

  const runtimeSummary = useMemo(() => {
    return {
      totalSteps: workflow.steps.length,
      readinessAvg:
        workflow.steps.length > 0
          ? Math.round(
              workflow.steps.reduce((sum, step) => {
                const bot = botBySlug[step.botSlug];
                return sum + (bot ? getBotReadiness(bot).score : 0);
              }, 0) / workflow.steps.length
            )
          : 0,
    };
  }, [workflow.steps, botBySlug]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div
        className="panel relative overflow-hidden"
        style={{ background: 'radial-gradient(ellipse 60% 80% at 90% 20%, color-mix(in srgb, var(--accent) 7%, transparent), transparent), var(--surface-1)' }}
      >
        <div className="panel-body">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span
                  className="text-xs px-2 py-0.5 rounded border font-medium uppercase tracking-wider"
                  style={{ color: 'var(--accent)', borderColor: 'color-mix(in srgb, var(--accent) 30%, transparent)' }}
                >
                  {workflow.runtimeComplexity}
                </span>
                <span className="category-pill capitalize">{workflow.category}</span>
              </div>
              <h2 className="text-xl font-bold text-foreground">{workflow.title}</h2>
              <p className="text-muted-foreground text-sm mt-1">{workflow.description}</p>
            </div>
            <div className="telemetry-panel" style={{ minWidth: 180 }}>
              <div className="telemetry-row">
                <span className="telemetry-key">Steps</span>
                <span className="telemetry-val">{runtimeSummary.totalSteps}</span>
              </div>
              <div className="telemetry-row">
                <span className="telemetry-key">Readiness</span>
                <span className="telemetry-val-accent">{runtimeSummary.readinessAvg}%</span>
              </div>
              <div className="telemetry-row" style={{ borderBottom: 'none' }}>
                <span className="telemetry-key">ETA</span>
                <span className="telemetry-val">{workflow.estimatedDurationMin}m</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {/* Controls toolbar — above the pipeline, full width */}
        <aside className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 items-start">
          {/* Template loader */}
          <div className="panel">
            <div className="panel-header">
              <span className="text-xs font-semibold text-foreground uppercase tracking-wider">Load Template</span>
            </div>
            <div className="panel-body">
              <select
                className="w-full text-sm px-3 py-2 rounded-lg border border-panel-border bg-surface-2 text-foreground focus:outline-none focus:border-accent transition-colors"
                onChange={(e) => applyTemplate(e.target.value)}
                defaultValue=""
                aria-label="Load workflow template"
              >
                <option value="" disabled>Select template…</option>
                {templates.map((template) => (
                  <option key={template.id} value={template.id}>{template.title}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Add step */}
          <div className="panel">
            <div className="panel-header">
              <span className="text-xs font-semibold text-foreground uppercase tracking-wider">Add Step</span>
            </div>
            <div className="panel-body space-y-2">
              <select
                value={selectedLane}
                onChange={(e) => setSelectedLane(e.target.value as WorkflowStepDefinition['lane'])}
                className="w-full text-sm px-3 py-2 rounded-lg border border-panel-border bg-surface-2 text-foreground focus:outline-none focus:border-accent transition-colors"
                aria-label="Choose lane"
              >
                {LANES.map((lane) => <option key={lane} value={lane}>{lane.charAt(0).toUpperCase() + lane.slice(1)}</option>)}
              </select>
              <select
                value={selectedBot}
                onChange={(e) => setSelectedBot(e.target.value)}
                className="w-full text-sm px-3 py-2 rounded-lg border border-panel-border bg-surface-2 text-foreground focus:outline-none focus:border-accent transition-colors"
                aria-label="Choose bot"
              >
                {bots.map((bot) => <option key={bot.slug} value={bot.slug}>{bot.shortName}</option>)}
              </select>
              <button
                type="button"
                onClick={() => addStep(selectedBot, selectedLane)}
                className="w-full text-sm font-semibold py-2 px-4 rounded-lg transition-all"
                style={{ background: 'var(--accent)', color: 'var(--background)' }}
              >
                + Add Step
              </button>
            </div>
          </div>

          {/* Readiness bar */}
          <div className="panel">
            <div className="panel-header">
              <span className="text-xs font-semibold text-foreground uppercase tracking-wider">Readiness</span>
            </div>
            <div className="panel-body">
              <div className="flex justify-between text-xs mb-1">
                <span className="text-muted-foreground">Average</span>
                <span className="text-foreground font-medium">{runtimeSummary.readinessAvg}%</span>
              </div>
              <div className="runtime-bar-track">
                <div
                  className="runtime-bar-fill"
                  style={{ width: `${runtimeSummary.readinessAvg}%` }}
                />
              </div>
            </div>
          </div>
        </aside>

        {/* Topology + execution */}
        <div className="space-y-4">
          {/* Execution Topology — drag step cards between lanes */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 items-start">
            {stepsByLane.map(({ lane, steps }) => (
              <div
                key={lane}
                className="panel"
                style={{
                  borderTop: `2px solid ${LANE_COLORS[lane]}`,
                  outline: dragLane === lane ? `2px dashed ${LANE_COLORS[lane]}` : 'none',
                  outlineOffset: 2,
                  background: dragLane === lane ? `color-mix(in oklab, ${LANE_COLORS[lane]}, transparent 92%)` : undefined,
                  transition: 'background 140ms ease',
                }}
                onDragOver={(e) => { e.preventDefault(); e.dataTransfer.dropEffect = 'move'; if (dragLane !== lane) setDragLane(lane); }}
                onDragLeave={(e) => { if (!e.currentTarget.contains(e.relatedTarget as Node)) setDragLane((l) => (l === lane ? null : l)); }}
                onDrop={(e) => {
                  e.preventDefault();
                  const id = e.dataTransfer.getData('text/plain');
                  if (id) moveStepToLane(id, lane);
                  setDragLane(null);
                }}
              >
                <div className="panel-header" style={{ paddingTop: 10 }}>
                  <div className="flex items-center justify-between">
                    <span
                      className="text-xs font-semibold uppercase tracking-wider"
                      style={{ color: LANE_COLORS[lane] }}
                    >
                      {lane}
                    </span>
                    <span
                      className="text-xs w-5 h-5 rounded flex items-center justify-center font-bold"
                      style={{ background: 'var(--surface-3)', color: LANE_COLORS[lane] }}
                    >
                      {steps.length}
                    </span>
                  </div>
                </div>
                <div className="panel-body space-y-2">
                  {steps.length === 0 && (
                    <div
                      className="text-xs text-center py-4 rounded border border-dashed"
                      style={{ color: 'var(--muted-foreground)', borderColor: 'var(--panel-border)' }}
                    >
                      Drop step here
                    </div>
                  )}
                  {steps.map((step) => {
                    const bot = botBySlug[step.botSlug];
                    const readiness = bot ? getBotReadiness(bot).score : 0;
                    const state = stepStates[step.id] ?? 'idle';
                    return (
                      <div
                        key={step.id}
                        className="panel-inset"
                        draggable
                        onDragStart={(e) => { e.dataTransfer.setData('text/plain', step.id); e.dataTransfer.effectAllowed = 'move'; }}
                        onDragEnd={() => setDragLane(null)}
                        style={{ padding: '10px 12px', cursor: 'grab' }}
                        title="Drag to move between lanes"
                      >
                        <div className="flex items-start justify-between gap-2 mb-1.5">
                          <span className="text-sm font-medium text-foreground" style={{ lineHeight: 1.35 }}>
                            {bot?.shortName ?? step.botSlug}
                          </span>
                          <span
                            className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-1"
                            style={{ background: STEP_STATE_COLORS[state] }}
                            title={state}
                          />
                        </div>
                        <div className="flex items-center gap-1 mb-2">
                          <span className="text-xs" style={{ color: 'var(--muted-foreground)', fontFamily: 'var(--font-mono)' }}>
                            {readiness}%
                          </span>
                          <div className="flex-1 runtime-bar-track" style={{ height: 2 }}>
                            <div
                              className="runtime-bar-fill"
                              style={{ width: `${readiness}%`, height: '100%' }}
                            />
                          </div>
                        </div>
                        <div className="flex gap-1">
                          <button
                            type="button"
                            onClick={() => reorderStep(step.id, 'up')}
                            className="text-xs px-1.5 py-0.5 rounded border border-panel-border text-muted-foreground hover:text-foreground transition-colors"
                            aria-label="Move step up"
                          >↑</button>
                          <button
                            type="button"
                            onClick={() => reorderStep(step.id, 'down')}
                            className="text-xs px-1.5 py-0.5 rounded border border-panel-border text-muted-foreground hover:text-foreground transition-colors"
                            aria-label="Move step down"
                          >↓</button>
                          <button
                            type="button"
                            onClick={() => removeStep(step.id)}
                            className="text-xs px-1.5 py-0.5 rounded border border-panel-border ml-auto transition-colors"
                            style={{ color: 'var(--status-error)', borderColor: 'color-mix(in srgb, var(--status-error) 30%, transparent)' }}
                            aria-label="Remove step"
                          >×</button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* SVG flow rail */}
          {workflow.steps.length > 0 && (
            <div className="panel">
              <div className="panel-header">
                <span className="text-xs font-semibold text-foreground uppercase tracking-wider">Execution Rail</span>
                {running && (
                  <span className="text-xs text-muted-foreground flex items-center gap-1.5 ml-auto">
                    <span className="w-1.5 h-1.5 rounded-full animate-pulse-dot" style={{ background: 'var(--accent)' }} />
                    Running…
                  </span>
                )}
              </div>
              <div className="panel-body overflow-x-auto">
                <svg
                  viewBox={`0 0 ${workflow.steps.length * 100 + 20} 60`}
                  style={{ width: '100%', minWidth: workflow.steps.length * 100, height: 60 }}
                >
                  {workflow.steps.map((step, i) => {
                    const x = 10 + i * 100;
                    const state = stepStates[step.id] ?? 'idle';
                    const color = STEP_STATE_COLORS[state];
                    const laneColor = LANE_COLORS[step.lane];
                    const bot = botBySlug[step.botSlug];
                    return (
                      <g key={step.id}>
                        {i > 0 && (
                          <line
                            x1={x - 10} y1={30} x2={x} y2={30}
                            stroke="var(--panel-border)" strokeWidth={1.5}
                            strokeDasharray={state === 'running' ? '4 2' : undefined}
                          >
                            {state === 'running' && (
                              <animate attributeName="stroke-dashoffset" from="0" to="-12" dur="0.5s" repeatCount="indefinite" />
                            )}
                          </line>
                        )}
                        <circle cx={x + 40} cy={30} r={16} fill="var(--surface-2)" stroke={color} strokeWidth={1.5} />
                        <circle cx={x + 40} cy={30} r={8} fill={laneColor} opacity={0.3} />
                        <text x={x + 40} y={34} textAnchor="middle" fontSize={9} fill={color} fontWeight="700">
                          {i + 1}
                        </text>
                        <text x={x + 40} y={54} textAnchor="middle" fontSize={7} fill="var(--muted-foreground)">
                          {(bot?.shortName ?? step.botSlug).slice(0, 10)}
                        </text>
                      </g>
                    );
                  })}
                </svg>
              </div>
            </div>
          )}

          {/* Execution input */}
          <div className="panel">
            <div className="panel-header">
              <span className="text-xs font-semibold text-foreground uppercase tracking-wider">Execution Input</span>
            </div>
            <div className="panel-body space-y-3">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                rows={5}
                className="w-full text-sm px-3 py-2 rounded-lg border border-panel-border bg-surface-2 text-foreground focus:outline-none focus:border-accent transition-colors resize-y"
                style={{ fontFamily: 'var(--font-mono)' }}
                aria-label="Workflow execution input"
              />
              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={runWorkflow}
                  disabled={running || workflow.steps.length === 0 || !input.trim()}
                  className="inline-flex items-center gap-2 text-sm font-semibold py-2 px-5 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{ background: 'var(--accent)', color: 'var(--background)' }}
                >
                  {running ? (
                    <>
                      <span className="w-2 h-2 rounded-full animate-pulse-dot" style={{ background: 'var(--background)' }} />
                      Running…
                    </>
                  ) : (
                    <>
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><polygon points="2,1 11,6 2,11" fill="currentColor"/></svg>
                      Run Workflow
                    </>
                  )}
                </button>
                <span
                  className="text-xs font-mono px-2 py-1 rounded border border-panel-border"
                  style={{ color: 'var(--muted-foreground)' }}
                >
                  {workflow.steps.length} step{workflow.steps.length !== 1 ? 's' : ''} queued
                </span>
              </div>
              {error && (
                <div
                  className="text-sm px-3 py-2 rounded-lg border"
                  style={{ color: 'var(--status-error)', borderColor: 'color-mix(in srgb, var(--status-error) 30%, transparent)', background: 'color-mix(in srgb, var(--status-error) 8%, transparent)' }}
                >
                  {error}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
