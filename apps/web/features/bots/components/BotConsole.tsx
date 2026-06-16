'use client';

import { useMemo, useState } from 'react';
import type { PublicBotDefinition } from '@/features/bots/lib/bot-types';
import type { BotScenarioPreset } from '@/features/bots/data/bot-scenarios';
import { getBotReadiness } from '@/features/bots/lib/bot-readiness';

interface BotConsoleProps {
  bot: PublicBotDefinition;
  scenarios: BotScenarioPreset[];
  value: string;
  setValue: (value: string) => void;
  onRun: () => void;
  onClearOutput: () => void;
  onCopyMetadata: () => void;
  onScenarioMatch: (scenario: BotScenarioPreset) => void;
  loading: boolean;
}

export function BotConsole({
  bot,
  scenarios,
  value,
  setValue,
  onRun,
  onClearOutput,
  onCopyMetadata,
  onScenarioMatch,
  loading,
}: BotConsoleProps) {
  const samples = useMemo(() => bot.sampleInputs.slice(0, 5), [bot.sampleInputs]);
  const readiness = useMemo(() => getBotReadiness(bot), [bot]);
  const [selectedScenarioId, setSelectedScenarioId] = useState<string>('');
  const [focused, setFocused] = useState(false);
  const canRun = value.trim().length > 0 && !loading && bot.status !== 'disabled';

  const selectedScenario = scenarios.find((entry) => entry.id === selectedScenarioId);
  const charCount = value.length;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
      {/* Capabilities + Safety (compact) */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(min(180px, 100%), 1fr))',
        gap: 10,
        padding: '14px 16px',
        borderBottom: '1px solid var(--panel-border)',
      }}>
        <div>
          <p className="edge-label" style={{ marginBottom: 6 }}>Capabilities</p>
          <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 3 }}>
            {bot.capabilities.slice(0, 4).map((cap) => (
              <li key={cap} style={{ fontSize: '0.74rem', color: 'var(--muted-foreground)', display: 'flex', alignItems: 'baseline', gap: 5 }}>
                <span style={{ color: 'var(--primary)', flexShrink: 0 }}>›</span>
                {cap}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="edge-label" style={{ marginBottom: 6 }}>Safety Notes</p>
          <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 3 }}>
            {bot.safetyNotes.slice(0, 3).map((note) => (
              <li key={note} style={{ fontSize: '0.74rem', color: 'var(--muted-foreground)', display: 'flex', alignItems: 'baseline', gap: 5 }}>
                <span style={{ color: 'var(--warning)', flexShrink: 0 }}>⚠</span>
                {note}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Scenario presets */}
      <div style={{ padding: '12px 16px', borderBottom: '1px solid var(--panel-border)' }}>
        <p className="edge-label" style={{ marginBottom: 8 }}>Scenario Presets</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
          {scenarios.slice(0, 6).map((scenario) => (
            <button
              key={scenario.id}
              type="button"
              onClick={() => {
                setSelectedScenarioId(scenario.id);
                setValue(scenario.prompt);
              }}
              style={{
                padding: '4px 10px',
                borderRadius: 'var(--radius-sm)',
                border: `1px solid ${selectedScenarioId === scenario.id ? 'var(--primary)' : 'var(--panel-border)'}`,
                background: selectedScenarioId === scenario.id ? 'color-mix(in oklab, var(--primary), transparent 85%)' : 'var(--panel-inset)',
                color: selectedScenarioId === scenario.id ? 'var(--primary)' : 'var(--muted-foreground)',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.65rem',
                letterSpacing: '0.1em',
                cursor: 'none',
                transition: 'all 140ms ease',
              }}
            >
              {scenario.label}
            </button>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 6, marginTop: 8, alignItems: 'center' }}>
          <select
            className="btn"
            value={selectedScenarioId}
            onChange={(e) => {
              const next = scenarios.find((entry) => entry.id === e.target.value);
              setSelectedScenarioId(e.target.value);
              if (next) setValue(next.prompt);
            }}
            aria-label="Select scenario"
            style={{ minHeight: 32, fontSize: '0.7rem', padding: '0 10px', flex: 1 }}
          >
            <option value="">All scenarios…</option>
            {scenarios.map((scenario) => (
              <option key={scenario.id} value={scenario.id}>{scenario.label}</option>
            ))}
          </select>
          <button
            type="button"
            className="btn"
            onClick={() => { if (selectedScenario) onScenarioMatch(selectedScenario); }}
            disabled={!selectedScenario}
            style={{ minHeight: 32, fontSize: '0.7rem', whiteSpace: 'nowrap' }}
          >
            Match Bots
          </button>
        </div>
      </div>

      {/* Sample inputs */}
      {samples.length > 0 && (
        <div style={{ padding: '10px 16px', borderBottom: '1px solid var(--panel-border)' }}>
          <p className="edge-label" style={{ marginBottom: 6 }}>Sample Inputs</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
            {samples.map((sample) => (
              <button
                key={sample}
                type="button"
                onClick={() => setValue(sample)}
                style={{
                  padding: '3px 8px',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--panel-border)',
                  background: 'var(--panel-inset)',
                  color: 'var(--muted-foreground)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.62rem',
                  cursor: 'none',
                  transition: 'border-color 140ms ease',
                  maxWidth: 220,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
                title={sample}
              >
                {sample.slice(0, 52)}{sample.length > 52 ? '…' : ''}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Terminal input */}
      <div style={{ padding: '12px 16px', display: 'flex', flexDirection: 'column', flex: 1 }}>
        {/* Terminal header bar */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 6,
          padding: '6px 10px',
          background: 'var(--panel-inset)',
          borderRadius: 'var(--radius-md) var(--radius-md) 0 0',
          border: `1px solid ${focused ? 'var(--panel-border-active)' : 'var(--panel-border)'}`,
          borderBottom: 'none',
          transition: 'border-color 160ms ease',
        }}>
          <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--danger)', opacity: 0.8 }} />
          <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--warning)', opacity: 0.8 }} />
          <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--neon-lime)', opacity: 0.8 }} />
          <span className="edge-label" style={{ marginLeft: 6 }}>test_input.txt</span>
          <span className="edge-label" style={{ marginLeft: 'auto' }}>{charCount} chars</span>
        </div>

        <textarea
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder={bot.inputPlaceholder}
          aria-label="Bot test input"
          rows={6}
          style={{
            width: '100%',
            resize: 'vertical',
            border: `1px solid ${focused ? 'var(--panel-border-active)' : 'var(--panel-border)'}`,
            borderRadius: '0 0 var(--radius-md) var(--radius-md)',
            background: 'color-mix(in oklab, var(--panel-inset), transparent 20%)',
            color: 'var(--foreground)',
            padding: '12px',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.8rem',
            lineHeight: 1.55,
            outline: 'none',
            transition: 'border-color 160ms ease',
          }}
        />

        {/* Run controls */}
        <div style={{ display: 'flex', gap: 8, marginTop: 10, flexWrap: 'wrap', alignItems: 'center' }}>
          <button
            type="button"
            className="btn btn-primary"
            onClick={onRun}
            disabled={!canRun}
            style={{
              flex: 1,
              minWidth: 120,
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {loading ? (
              <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{
                  width: 10, height: 10, borderRadius: '50%',
                  border: '2px solid transparent',
                  borderTopColor: 'currentColor',
                  animation: 'spin 700ms linear infinite',
                  display: 'inline-block',
                }} />
                Running…
              </span>
            ) : (
              '▶ Run Bot'
            )}
          </button>
          <button type="button" className="btn" onClick={onClearOutput} style={{ fontSize: '0.75rem' }}>
            Clear
          </button>
          <button type="button" className="btn" onClick={onCopyMetadata} style={{ fontSize: '0.75rem' }}>
            Copy Meta
          </button>
          {bot.status === 'disabled' && (
            <span className="edge-label" style={{ color: 'var(--danger)' }}>bot disabled</span>
          )}
        </div>

        {/* Readiness bar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 10 }}>
          <span className="edge-label">Metadata quality</span>
          <div style={{ flex: 1, height: 2, borderRadius: 1, background: 'var(--panel-border)', overflow: 'hidden' }}>
            <div style={{
              height: '100%',
              width: `${readiness.score}%`,
              background: readiness.score > 80 ? 'var(--neon-lime)' : readiness.score > 50 ? 'var(--warning)' : 'var(--muted-foreground)',
              transition: 'width 600ms ease',
            }} />
          </div>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--primary)' }}>{readiness.score}%</span>
        </div>
      </div>
    </div>
  );
}
