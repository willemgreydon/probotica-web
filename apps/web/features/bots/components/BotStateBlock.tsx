'use client';

interface BotStateBlockProps {
  title: string;
  message: string;
  tone?: 'neutral' | 'warning' | 'error' | 'success';
}

export function BotStateBlock({ title, message, tone = 'neutral' }: BotStateBlockProps) {
  const toneColor =
    tone === 'error' ? 'var(--danger)' :
    tone === 'warning' ? 'var(--warning)' :
    tone === 'success' ? 'var(--neon-lime)' :
    'var(--muted-foreground)';

  const toneBg =
    tone === 'error' ? 'color-mix(in oklab, var(--danger), transparent 92%)' :
    tone === 'warning' ? 'color-mix(in oklab, var(--warning), transparent 92%)' :
    tone === 'success' ? 'color-mix(in oklab, var(--neon-lime), transparent 92%)' :
    'var(--panel-inset)';

  return (
    <div style={{
      padding: '14px 16px',
      border: `1px solid color-mix(in oklab, ${toneColor}, transparent 65%)`,
      borderRadius: 'var(--radius-lg)',
      background: toneBg,
    }}>
      <p style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '0.62rem',
        letterSpacing: '0.22em',
        textTransform: 'uppercase',
        color: toneColor,
        fontWeight: 700,
      }}>
        {title}
      </p>
      <p style={{ fontSize: '0.8rem', color: 'var(--muted-foreground)', marginTop: 6, lineHeight: 1.5 }}>
        {message}
      </p>
    </div>
  );
}
