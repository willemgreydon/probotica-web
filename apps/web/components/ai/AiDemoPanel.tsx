'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronRight, Play, RotateCcw } from 'lucide-react';
import { fadeUpVariants } from '@/lib/motion/transitions';

type Mode = 'lead-qualifier' | 'ux-audit' | 'content-studio';

interface AiResult {
  scenario: string;
  ok?: boolean;
  fallback?: boolean;
  data?: Record<string, unknown>;
  error?: string;
  detail?: string;
}

const MODE_META: Record<Mode, { label: string; placeholder: string; color: string }> = {
  'lead-qualifier': {
    label: 'Lead Qualifier',
    placeholder: 'We sell AI automation to real estate and UX teams. Budget ~EUR 5k/month.',
    color: 'var(--primary)',
  },
  'ux-audit': {
    label: 'UX Audit',
    placeholder: 'Our checkout flow has a 68% drop-off rate. Users cite confusion at step 3.',
    color: 'var(--secondary)',
  },
  'content-studio': {
    label: 'Content Studio',
    placeholder: 'Write 3 LinkedIn posts for a B2B SaaS targeting startup founders.',
    color: 'var(--accent)',
  },
};

const MODES = Object.keys(MODE_META) as Mode[];

export function AiDemoPanel() {
  const [mode, setMode] = useState<Mode>('lead-qualifier');
  const [input, setInput] = useState(MODE_META['lead-qualifier'].placeholder);
  const [result, setResult] = useState<AiResult | null>(null);
  const [loading, setLoading] = useState(false);
  const meta = MODE_META[mode];

  const run = async () => {
    setLoading(true);
    setResult(null);
    try {
      const r = await fetch(`/api/ai/${mode}`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ input }),
      });
      setResult((await r.json()) as AiResult);
    } catch (e) {
      setResult({ scenario: mode, error: 'Request failed', detail: String(e) });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="surface-glass" style={{ borderRadius: '2rem', padding: '28px', height: '100%' }}>
      <div className="flex flex-wrap gap-2 pb-5" style={{ borderBottom: '1px solid var(--border)' }}>
        {MODES.map((m) => {
          const isActive = mode === m;
          return (
            <button
              key={m}
              onClick={() => {
                setMode(m);
                setInput(MODE_META[m].placeholder);
                setResult(null);
              }}
              className="btn"
              data-magnetic
              style={{
                fontSize: '.6875rem',
                background: isActive ? MODE_META[m].color : undefined,
                color: isActive ? 'var(--primary-foreground)' : undefined,
                borderColor: isActive ? 'transparent' : undefined,
                fontWeight: isActive ? 800 : 600,
              }}
            >
              {MODE_META[m].label}
            </button>
          );
        })}
      </div>

      <div className="mt-5">
        <label className="text-caption" style={{ display: 'block', marginBottom: '8px' }}>Input</label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          rows={4}
          style={{
            width: '100%',
            borderRadius: '1.25rem',
            border: '1px solid var(--border)',
            background: 'var(--surface-elevated)',
            padding: '16px',
            color: 'var(--foreground)',
            fontSize: '.9375rem',
            lineHeight: 1.7,
            outline: 'none',
            resize: 'vertical',
            fontFamily: 'inherit',
            transition: 'border-color 200ms ease',
          }}
          onFocus={(e) => (e.currentTarget.style.borderColor = meta.color)}
          onBlur={(e) => (e.currentTarget.style.borderColor = 'var(--border)')}
        />
      </div>

      <div className="mt-4 flex items-center gap-3">
        <button
          onClick={run}
          disabled={loading || !input.trim()}
          className="btn btn-primary"
          data-magnetic
          style={{ background: loading ? 'color-mix(in oklab, var(--primary), transparent 45%)' : undefined, cursor: loading ? 'wait' : undefined }}
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <span style={{ width: 14, height: 14, borderRadius: '50%', border: '2px solid color-mix(in oklab, var(--foreground), transparent 70%)', borderTopColor: 'var(--foreground)', display: 'inline-block', animation: 'spin 0.7s linear infinite' }} />
              Thinking...
            </span>
          ) : (
            <span className="flex items-center gap-2"><Play size={13} />Run Scenario</span>
          )}
        </button>
        {result && <button onClick={() => { setResult(null); setInput(meta.placeholder); }} className="btn" data-magnetic><RotateCcw size={13} className="mr-1.5" />Reset</button>}
      </div>

      <AnimatePresence>
        {result && (
          <motion.div key="output" variants={fadeUpVariants} initial="hidden" animate="visible" className="mt-5">
            <label className="text-caption" style={{ display: 'block', marginBottom: '8px', color: result.error ? 'var(--danger)' : meta.color }}>
              {result.error ? 'Error' : 'Output'}{result.fallback ? ' · Demo Fallback' : ''}
            </label>
            <pre style={{ maxHeight: '280px', overflowY: 'auto', borderRadius: '1.25rem', border: `1px solid ${result.error ? 'color-mix(in oklab, var(--danger), transparent 60%)' : 'var(--border)'}`, background: 'var(--surface-elevated)', padding: '16px', fontSize: '.8125rem', lineHeight: 1.7, color: result.error ? 'var(--danger)' : 'var(--secondary)', fontFamily: 'var(--font-mono)', whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
              {JSON.stringify(result, null, 2)}
            </pre>
            {!result.error && <a href="#contact" className="mt-4 flex items-center gap-1.5 cursor-none" style={{ fontSize: '.8125rem', color: meta.color, fontWeight: 700, letterSpacing: '.04em', textDecoration: 'none' }}><ChevronRight size={14} />Connect this to your workflow</a>}
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
