'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { Bot, ChevronDown, Menu } from 'lucide-react';
import { primaryNav, authLinks, type NavGroup } from '@/lib/content/navigation';
import { ThemeAccessibilityMenu } from '@/components/layout/ThemeAccessibilityMenu';
import { FullscreenMenu } from '@/components/layout/FullscreenMenu';

/**
 * SiteHeader (PB-001) — the single sticky header for all public/marketing routes.
 * Logo → home, primary nav dropdowns (keyboard accessible), theme & accessibility
 * menu, Sign in + Get started CTAs, and a focus-trapped mobile drawer.
 * Consumes the typed navigation model (PB-010).
 */
export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const navRef = useRef<HTMLElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        setScrolled(window.scrollY > 18);
        ticking = false;
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close any open dropdown on Escape, and on outside click.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpenGroup(null);
    };
    const onClick = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) setOpenGroup(null);
    };
    window.addEventListener('keydown', onKey);
    window.addEventListener('click', onClick);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('click', onClick);
    };
  }, []);

  const openNow = (label: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpenGroup(label);
  };
  const closeSoon = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpenGroup(null), 120);
  };

  return (
    <>
      <a href="#main-content" className="skip-link">Skip to main content</a>

      <header
        className="fixed left-0 right-0 top-0 animate-in-fade"
        style={{ zIndex: 'var(--z-header)' }}
        role="banner"
      >
        <div
          style={{
            borderBottom: `1px solid ${scrolled ? 'var(--hud-border)' : 'transparent'}`,
            background: scrolled ? 'color-mix(in oklab, var(--command-surface), transparent 8%)' : 'transparent',
            backdropFilter: scrolled ? 'var(--glass)' : 'none',
            WebkitBackdropFilter: scrolled ? 'var(--glass)' : 'none',
            transition: 'background 240ms ease, border-color 240ms ease',
          }}
        >
          <div className="container-x flex h-16 items-center justify-between gap-3">
            {/* Logo */}
            <Link
              href="/"
              className="header-logo text-caption focus-ring"
              aria-label="ProBotica — home"
            >
              <Bot size={15} aria-hidden />
              <span className="text-mono" style={{ letterSpacing: '.2em' }}>PROBOTICA</span>
            </Link>

            {/* Desktop primary nav */}
            <nav
              ref={navRef}
              className="hidden items-center gap-1 lg:flex"
              aria-label="Primary"
            >
              {primaryNav.map((group) => (
                <NavDropdown
                  key={group.label}
                  group={group}
                  open={openGroup === group.label}
                  onOpen={() => openNow(group.label)}
                  onClose={closeSoon}
                  onToggle={() => setOpenGroup((g) => (g === group.label ? null : group.label))}
                />
              ))}
            </nav>

            {/* Right controls */}
            <div className="flex items-center gap-1">
              <ThemeAccessibilityMenu />

              <div
                aria-hidden
                style={{ width: 1, height: 18, background: 'var(--hud-border)', margin: '0 4px' }}
              />

              <Link
                href={authLinks.signIn.href}
                className="header-nav-link text-mono focus-ring hidden sm:inline-flex"
                style={{ fontSize: '.67rem', letterSpacing: '.16em', padding: '0 10px' }}
              >
                {authLinks.signIn.label.toUpperCase()}
              </Link>

              <Link
                href={authLinks.getStarted.href}
                className="btn btn-primary focus-ring hidden sm:inline-flex"
                style={{ fontSize: '.67rem', letterSpacing: '.16em', height: 34, padding: '0 14px' }}
              >
                {authLinks.getStarted.label}
              </Link>

              {/* Mobile menu trigger */}
              <button
                type="button"
                className="header-control text-mono focus-ring lg:hidden"
                style={{ fontSize: '.67rem', letterSpacing: '.18em', gap: 6 }}
                onClick={() => setMenuOpen(true)}
                aria-label="Open navigation menu"
                aria-expanded={menuOpen}
                aria-haspopup="dialog"
              >
                <Menu size={13} aria-hidden />
                <span className="hidden sm:inline">MENU</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <FullscreenMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}

function NavDropdown({
  group,
  open,
  onOpen,
  onClose,
  onToggle,
}: {
  group: NavGroup;
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
  onToggle: () => void;
}) {
  // Single-destination groups (e.g. Pricing) render as a plain link.
  if (group.links.length === 1 && group.href) {
    return (
      <Link
        href={group.href}
        className="header-nav-link text-mono focus-ring"
        style={{ fontSize: '.66rem', letterSpacing: '.16em', padding: '0 10px' }}
      >
        {group.label.toUpperCase()}
      </Link>
    );
  }

  return (
    <div
      style={{ position: 'relative' }}
      onMouseEnter={onOpen}
      onMouseLeave={onClose}
    >
      <button
        type="button"
        className="header-nav-link text-mono focus-ring"
        style={{ fontSize: '.66rem', letterSpacing: '.16em', padding: '0 10px', display: 'inline-flex', alignItems: 'center', gap: 4 }}
        aria-expanded={open}
        aria-haspopup="menu"
        onClick={onToggle}
        onFocus={onOpen}
      >
        {group.label.toUpperCase()}
        <ChevronDown size={11} aria-hidden style={{ transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 160ms ease' }} />
      </button>

      <div
        role="menu"
        aria-label={group.label}
        hidden={!open}
        style={{
          position: 'absolute',
          top: 'calc(100% + 8px)',
          left: 0,
          minWidth: 260,
          padding: 8,
          border: '1px solid var(--hud-border)',
          borderRadius: 'var(--radius-lg)',
          background: 'var(--command-surface)',
          backdropFilter: 'var(--glass)',
          WebkitBackdropFilter: 'var(--glass)',
          boxShadow: 'var(--shadow)',
        }}
      >
        {group.links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            role="menuitem"
            className="focus-ring"
            onClick={onClose}
            style={{
              display: 'block',
              padding: '8px 10px',
              borderRadius: 'var(--radius-md)',
              textDecoration: 'none',
              minHeight: 40,
            }}
          >
            <span style={{ display: 'block', fontSize: '.82rem', fontWeight: 600, color: 'var(--foreground)' }}>
              {link.label}
            </span>
            {link.description && (
              <span style={{ display: 'block', fontSize: '.68rem', color: 'var(--muted-foreground)', marginTop: 2 }}>
                {link.description}
              </span>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
}
