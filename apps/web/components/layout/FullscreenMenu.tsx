'use client';

import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { X, Bot } from 'lucide-react';
import { navGroups } from '@/lib/content/site';

interface FullscreenMenuProps {
  open: boolean;
  onClose: () => void;
}

export function FullscreenMenu({ open, onClose }: FullscreenMenuProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    /* Keyboard handler */
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }
      /* Trap focus inside menu */
      if (e.key === 'Tab') {
        const focusable = panelRef.current?.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );
        if (!focusable || focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault();
            last.focus();
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      }
    };

    window.addEventListener('keydown', onKey);
    /* Move focus to close button on open */
    requestAnimationFrame(() => closeRef.current?.focus());

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKey);
    };
  }, [open, onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Site navigation"
      aria-hidden={!open}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 'var(--z-overlay)',
        opacity: open ? 1 : 0,
        pointerEvents: open ? 'auto' : 'none',
        transition: 'opacity 220ms ease',
        background: 'var(--background)',
        overflow: 'hidden',
      }}
    >
      {/* HUD grid background */}
      <div
        aria-hidden
        className="hud-grid absolute inset-0 opacity-30"
        style={{ pointerEvents: 'none' }}
      />

      {/* Atmospheric glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 45% 50% at 85% 10%, color-mix(in oklab, var(--neon-cyan), transparent 88%), transparent 50%),
            radial-gradient(ellipse 35% 40% at 5% 85%, color-mix(in oklab, var(--neon-violet), transparent 90%), transparent 40%)
          `,
        }}
      />

      {/* Panel — full viewport scroll */}
      <div
        ref={panelRef}
        tabIndex={-1}
        style={{
          position: 'relative',
          width: '100%',
          minHeight: '100dvh',
          overflowY: 'auto',
          padding: 'clamp(16px, 4vw, 52px)',
          paddingTop: 'clamp(64px, 8vw, 80px)',
          transform: open ? 'translate3d(0,0,0)' : 'translate3d(0,12px,0)',
          transition: 'transform 240ms var(--ease-out-expo)',
        }}
      >
        {/* Close button */}
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Close navigation menu"
          style={{
            position: 'absolute',
            right: 'clamp(16px, 4vw, 40px)',
            top: 'clamp(16px, 3vw, 28px)',
            zIndex: 10,
            minWidth: 44,
            minHeight: 44,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '1px solid var(--hud-border)',
            borderRadius: 'var(--radius-md)',
            background: 'var(--surface)',
            color: 'var(--foreground)',
            cursor: 'none',
            transition: 'border-color 160ms ease',
          }}
          className="focus-ring"
        >
          <X size={16} aria-hidden />
        </button>

        {/* Header row */}
        <div className="mb-8 flex items-center gap-3">
          <Link href="/" onClick={onClose} className="flex items-center gap-2 focus-ring" style={{ textDecoration: 'none' }}>
            <Bot size={16} style={{ color: 'var(--primary)' }} aria-hidden />
            <span className="text-mono" style={{ fontSize: '.72rem', letterSpacing: '.22em', fontWeight: 700, textTransform: 'uppercase', color: 'var(--foreground)' }}>
              Probotica
            </span>
          </Link>
          <div
            aria-hidden
            style={{ width: 1, height: 16, background: 'var(--hud-border)', marginInline: 4 }}
          />
          <p className="text-mono" style={{ fontSize: '.6rem', letterSpacing: '.22em', color: 'var(--muted-foreground)', textTransform: 'uppercase' }}>
            Route Matrix
          </p>
          <div className="ml-auto flex items-center gap-2">
            <span
              className="w-1.5 h-1.5 rounded-full status-dot status-dot-online animate-pulse-dot"
              aria-hidden
            />
            <span className="edge-label">Live</span>
          </div>
        </div>

        {/* Nav grid */}
        <div className="grid gap-4 lg:grid-cols-[1.5fr_1fr]">
          {/* Left: nav groups */}
          <div className="grid gap-4 sm:grid-cols-2">
            {navGroups.map((group, groupIndex) => (
              <section key={group.title} aria-label={group.title}>
                <div
                  className="mb-3 flex items-center justify-between px-1"
                >
                  <h3 style={{ fontSize: '0.62rem', fontWeight: 700, letterSpacing: '0.28em', textTransform: 'uppercase', color: 'var(--muted-foreground)', fontFamily: 'var(--font-mono)' }}>
                    {group.title}
                  </h3>
                  <span className="route-marker">{String(groupIndex + 1).padStart(2, '0')}</span>
                </div>
                <div className="space-y-1">
                  {group.links.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={onClose}
                      className="focus-ring"
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: 8,
                        padding: '8px 12px',
                        borderRadius: 'var(--radius-md)',
                        border: '1px solid transparent',
                        background: 'transparent',
                        textDecoration: 'none',
                        transition: 'background 140ms ease, border-color 140ms ease',
                        minHeight: 44,
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLElement).style.background = 'rgba(145,242,255,.05)';
                        (e.currentTarget as HTMLElement).style.borderColor = 'var(--hud-border)';
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLElement).style.background = 'transparent';
                        (e.currentTarget as HTMLElement).style.borderColor = 'transparent';
                      }}
                    >
                      <span style={{ fontSize: '0.84rem', fontWeight: 600, color: 'var(--foreground)' }}>
                        {link.label}
                      </span>
                      <span style={{ fontSize: '0.6rem', color: 'var(--telemetry-dim)', fontFamily: 'var(--font-mono)', letterSpacing: '0.12em' }}>
                        {link.href}
                      </span>
                    </Link>
                  ))}
                </div>
              </section>
            ))}
          </div>

          {/* Right: status + CTA */}
          <aside>
            <div
              className="p-5 mb-4"
              style={{ border: '1px solid var(--hud-border)', background: 'var(--command-surface)', borderRadius: 'var(--radius-xl)' }}
            >
              <p className="edge-label mb-4">System Status</p>
              <div className="space-y-2">
                {[
                  { key: 'runtime', val: 'online', ok: true },
                  { key: 'bots', val: '111 active', ok: true },
                  { key: 'location', val: 'vienna/eu', ok: false },
                  { key: 'gdpr', val: 'compliant', ok: true },
                ].map((row) => (
                  <div
                    key={row.key}
                    className="telemetry-row"
                    style={{ borderBottom: 'none', padding: '4px 0' }}
                  >
                    <span className="telemetry-key">{row.key}</span>
                    <span className={`telemetry-val${row.ok ? '-ok' : ''}`}>{row.val}</span>
                  </div>
                ))}
              </div>
              <div className="hud-line my-4" />
              <p className="text-body mb-4" style={{ fontSize: '0.84rem' }}>
                Book a tactical AI workflow briefing for your team.
              </p>
              <Link
                href="/contact"
                onClick={onClose}
                className="btn btn-primary focus-ring"
                style={{ width: '100%', minHeight: 44 }}
              >
                Launch Briefing
              </Link>
            </div>

            {/* Quick launch links */}
            <div className="space-y-2">
              {[
                { label: 'Open Bot Lab', href: '/bots' },
                { label: 'Launch Workspace', href: '/workspace' },
                { label: 'View Marketplace', href: '/marketplace' },
                { label: 'Control Center', href: '/control-center' },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={onClose}
                  className="btn focus-ring"
                  style={{ width: '100%', minHeight: 40, justifyContent: 'flex-start', fontSize: '0.75rem' }}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
