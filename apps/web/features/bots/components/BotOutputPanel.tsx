'use client';

import { useMemo, useState } from 'react';

interface BotOutputPanelProps {
  output: string;
  fallback: boolean;
  model: string;
  category: string;
  latencyMs: number;
  timestamp: string;
  error?: string;
  onCopyOutput: () => void;
}

function download(filename: string, content: string, type: string) {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

export function BotOutputPanel({ output, fallback, model, category, latencyMs, timestamp, error, onCopyOutput }: BotOutputPanelProps) {
  const [copied, setCopied] = useState(false);

  const parsed = useMemo(() => {
    if (!output.trim()) return null;
    try { return JSON.parse(output); } catch { return null; }
  }, [output]);

  const isJson = parsed !== null;
  const displayed = isJson ? JSON.stringify(parsed, null, 2) : output;
  const hasOutput = Boolean(displayed.trim());

  function handleCopy() {
    onCopyOutput();
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <div style={{
      border: '1px solid var(--panel-border)',
      borderRadius: 'var(--radius-xl)',
      background: 'var(--panel-bg)',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      flex: 1,
    }}>
      {/* Header */}
      <div style={{
        padding: '10px 14px',
        borderBottom: '1px solid var(--panel-border)',
        background: 'var(--panel-inset)',
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        flexWrap: 'wrap',
      }}>
        <span className="edge-label">Output</span>
        <span style={{ width: 1, height: 12, background: 'var(--panel-border)' }} />
        <span className="route-marker">{category}</span>
        <span className="route-marker">{model}</span>
        {latencyMs > 0 && (
          <span
            className="route-marker"
            style={{ color: latencyMs < 1000 ? 'var(--neon-lime)' : latencyMs < 3000 ? 'var(--warning)' : 'var(--danger)' }}
          >
            {latencyMs}ms
          </span>
        )}
        <span className="route-marker">{new Date(timestamp).toLocaleTimeString()}</span>

        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 6 }}>
          <span
            style={{
              padding: '2px 7px',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid var(--panel-border)',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.6rem',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: isJson ? 'var(--neon-cyan)' : 'var(--muted-foreground)',
            }}
          >
            {isJson ? 'JSON' : 'TXT'}
          </span>
          <span
            style={{
              padding: '2px 7px',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid var(--panel-border)',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.6rem',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: fallback ? 'var(--warning)' : 'var(--neon-lime)',
            }}
          >
            {fallback ? 'Demo' : 'Live'}
          </span>
        </div>
      </div>

      {/* Toolbar */}
      {hasOutput && (
        <div style={{
          padding: '6px 14px',
          borderBottom: '1px solid var(--panel-border)',
          display: 'flex',
          gap: 6,
          background: 'var(--panel-bg)',
        }}>
          <button
            type="button"
            className="btn"
            onClick={handleCopy}
            style={{ minHeight: 28, fontSize: '0.68rem', padding: '0 10px' }}
          >
            {copied ? '✓ Copied' : 'Copy'}
          </button>
          <button
            type="button"
            className="btn"
            onClick={() => download(
              isJson ? 'bot-output.json' : 'bot-output.txt',
              displayed || '',
              isJson ? 'application/json' : 'text/plain'
            )}
            style={{ minHeight: 28, fontSize: '0.68rem', padding: '0 10px' }}
          >
            Download
          </button>
          <span className="edge-label" style={{ marginLeft: 'auto', alignSelf: 'center' }}>
            {displayed.length} chars · {displayed.split('\n').length} lines
          </span>
        </div>
      )}

      {/* Output area */}
      <div style={{
        flex: 1,
        padding: '14px',
        overflowY: 'auto',
        minHeight: 180,
        maxHeight: '55vh',
        position: 'relative',
      }}>
        {!hasOutput && !error && (
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
            minHeight: 140,
            gap: 10,
          }}>
            <div style={{
              width: 36, height: 36,
              borderRadius: '50%',
              border: '1px solid var(--panel-border)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--muted-foreground)' }}>▶</span>
            </div>
            <p className="edge-label" style={{ textAlign: 'center' }}>Run a bot to see output</p>
          </div>
        )}

        {error && (
          <div style={{
            padding: '12px 14px',
            border: '1px solid color-mix(in oklab, var(--danger), transparent 60%)',
            borderRadius: 'var(--radius-md)',
            background: 'color-mix(in oklab, var(--danger), transparent 92%)',
            marginBottom: 12,
          }}>
            <p className="edge-label" style={{ color: 'var(--danger)', marginBottom: 4 }}>Error</p>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: 'var(--danger)', lineHeight: 1.5 }}>{error}</p>
          </div>
        )}

        {fallback && hasOutput && (
          <div style={{
            padding: '8px 12px',
            border: '1px solid color-mix(in oklab, var(--warning), transparent 60%)',
            borderRadius: 'var(--radius-md)',
            background: 'color-mix(in oklab, var(--warning), transparent 92%)',
            marginBottom: 12,
          }}>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--warning)', lineHeight: 1.4 }}>
              Demo mode — deterministic fallback output. Add OPENAI_API_KEY for live responses.
            </p>
          </div>
        )}

        {hasOutput && (
          <pre style={{
            margin: 0,
            fontFamily: 'var(--font-mono)',
            fontSize: '0.78rem',
            lineHeight: 1.6,
            color: 'var(--foreground)',
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-word',
          }}>
            {displayed}
          </pre>
        )}
      </div>
    </div>
  );
}
