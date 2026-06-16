'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { homeAnchors } from '@/lib/content/navigation';

/**
 * Home scrollspy sub-nav (PB-007).
 * Replaces the section anchors that used to live in the bespoke home Header.
 * Sticks just below the SiteHeader and highlights the section in view.
 * Hidden on small screens; honors reduced motion (no scroll animation forced).
 */
export function HomeSectionNav() {
  const [active, setActive] = useState('');

  useEffect(() => {
    const targets = homeAnchors
      .map((n) => document.getElementById(n.href.split('#')[1] ?? ''))
      .filter(Boolean) as HTMLElement[];
    if (targets.length === 0) return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
            break;
          }
        }
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 }
    );
    targets.forEach((t) => io.observe(t));
    return () => io.disconnect();
  }, []);

  return (
    <nav
      aria-label="Page sections"
      className="hidden lg:flex"
      style={{
        position: 'sticky',
        top: '64px', /* clears the fixed SiteHeader (h-16) */
        zIndex: 'var(--z-base)',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 4,
        minHeight: 44,
        padding: '0 16px',
        borderBottom: '1px solid var(--hud-border)',
        background: 'color-mix(in oklab, var(--command-surface), transparent 14%)',
        backdropFilter: 'var(--glass)',
        WebkitBackdropFilter: 'var(--glass)',
      }}
    >
      {homeAnchors.map((n, idx) => {
        const key = n.href.split('#')[1] ?? '';
        const isActive = active === key;
        return (
          <Link
            key={n.href}
            href={n.href}
            className="header-nav-link text-mono focus-ring"
            data-active={isActive ? 'true' : 'false'}
            style={{ fontSize: '.66rem', letterSpacing: '.16em', padding: '0 10px', display: 'inline-flex', alignItems: 'center', height: 32, lineHeight: 1 }}
            aria-current={isActive ? 'true' : undefined}
          >
            {String(idx + 1).padStart(2, '0')} {n.label}
          </Link>
        );
      })}
    </nav>
  );
}
