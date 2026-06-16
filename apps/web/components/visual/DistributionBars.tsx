'use client';

import { useEffect, useState } from 'react';

export interface DistributionDatum {
  label: string;
  value: number;
  color?: string;
  href?: string;
}

/**
 * Accessible, animated horizontal bar chart. Bars grow from 0 on mount (width
 * transition is neutralized under prefers-reduced-motion via the global rule).
 * Exposes a text alternative through role="img" + aria-label.
 */
export function DistributionBars({ title, data, max }: { title?: string; data: DistributionDatum[]; max?: number }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const peak = max ?? Math.max(...data.map((d) => d.value), 1);
  const summary = `${title ? `${title}: ` : ''}${data.map((d) => `${d.label} ${d.value}`).join(', ')}`;

  return (
    <section className="panel" aria-label={title || 'Distribution'}>
      {title && (
        <div className="panel-header">
          <span className="text-caption">{title}</span>
        </div>
      )}
      <div className="panel-body" role="img" aria-label={summary} style={{ display: 'grid', gap: 10 }}>
        {data.map((d) => {
          const pct = Math.round((d.value / peak) * 100);
          const color = d.color ?? 'var(--primary)';
          return (
            <div key={d.label} style={{ display: 'grid', gridTemplateColumns: '120px 1fr 40px', alignItems: 'center', gap: 10 }}>
              <span style={{ fontSize: '.72rem', color: 'var(--muted-foreground)', textTransform: 'capitalize', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {d.label}
              </span>
              <div style={{ height: 8, borderRadius: 999, background: 'var(--runtime-track)', overflow: 'hidden' }}>
                <div
                  style={{
                    height: '100%',
                    width: mounted ? `${pct}%` : '0%',
                    background: color,
                    borderRadius: 999,
                    transition: 'width 700ms var(--ease-out-expo)',
                  }}
                />
              </div>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '.72rem', color: 'var(--foreground)', textAlign: 'right' }}>
                {d.value}
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
