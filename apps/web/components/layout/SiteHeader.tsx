'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ChevronDown, Menu, UserRound } from 'lucide-react';
import { authLinks, type NavGroup } from '@/lib/content/navigation';
import { FullscreenMenu } from '@/components/layout/FullscreenMenu';
import { LanguageSwitch } from '@/components/layout/LanguageSwitch';
import { useT } from '@/components/providers/LocaleProvider';
import { useAuth } from '@/components/providers/AuthProvider';

/**
 * SiteHeader (PB-001) — the single sticky header for all public/marketing routes.
 * Logo → home, primary nav dropdowns (keyboard accessible), theme & accessibility
 * menu, Sign in + Get started CTAs, and a focus-trapped mobile drawer.
 * Consumes the typed navigation model (PB-010).
 */
export function SiteHeader() {
  const t = useT();
  const { user } = useAuth();
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
      <a href="#main-content" className="skip-link">{t('common.skipToContent')}</a>

      <header
        className="fixed left-0 right-0 top-0 animate-in-fade"
        style={{ zIndex: 'var(--z-header)' }}
        role="banner"
      >
        <div
          style={{
            borderBottom: '1px solid var(--hud-border)',
            background: scrolled
              ? 'color-mix(in oklab, var(--command-surface), transparent 4%)'
              : 'color-mix(in oklab, var(--command-surface), transparent 22%)',
            backdropFilter: 'var(--glass)',
            WebkitBackdropFilter: 'var(--glass)',
            transition: 'background 240ms ease, border-color 240ms ease',
          }}
        >
          <div className="container-x flex h-16 items-center justify-between gap-3">
            {/* Logo */}
            <Link
              href="/"
              className="header-logo focus-ring"
              aria-label="ProBotica — home"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}
            >
              <span className="brand-emblem" aria-hidden />
              <span className="brand-wordmark">ProBotica</span>
            </Link>

            {/* Right controls — nav + mode switch live in the mega menu */}
            <div className="flex items-center gap-1">
              <LanguageSwitch />

              <div
                aria-hidden
                style={{ width: 1, height: 18, background: 'var(--hud-border)', margin: '0 4px' }}
              />

              {user ? (
                <Link
                  href="/account"
                  className="btn focus-ring hidden sm:inline-flex"
                  style={{ fontSize: '.67rem', letterSpacing: '.12em', height: 34, padding: '0 12px', gap: 6 }}
                  aria-label="Your account"
                >
                  <UserRound size={13} aria-hidden />
                  {user.name.split(' ')[0]}
                </Link>
              ) : (
                <>
                  <Link
                    href={authLinks.signIn.href}
                    className="header-nav-link text-mono focus-ring hidden sm:inline-flex"
                    style={{ fontSize: '.67rem', letterSpacing: '.16em', padding: '0 10px' }}
                  >
                    {t('auth.signIn')}
                  </Link>

                  <Link
                    href={authLinks.getStarted.href}
                    className="btn btn-primary focus-ring hidden sm:inline-flex"
                    style={{ fontSize: '.67rem', letterSpacing: '.16em', height: 34, padding: '0 14px' }}
                  >
                    {t('auth.getStarted')}
                  </Link>
                </>
              )}

              {/* Menu trigger — opens the mega menu (primary nav + mode switch) */}
              <button
                type="button"
                className="header-control text-mono focus-ring"
                style={{ fontSize: '.67rem', letterSpacing: '.18em', gap: 6 }}
                onClick={() => setMenuOpen(true)}
                aria-label="Open navigation menu"
                aria-expanded={menuOpen}
                aria-haspopup="dialog"
              >
                <Menu size={13} aria-hidden />
                <span className="hidden sm:inline">{t('common.menu')}</span>
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
  const t = useT();
  const label = t(`nav.${group.label}`);
  // Single-destination groups (e.g. Pricing) render as a plain link.
  if (group.links.length === 1 && group.href) {
    return (
      <Link
        href={group.href}
        className="header-nav-link text-mono focus-ring"
        style={{ fontSize: '.66rem', letterSpacing: '.16em', padding: '0 10px' }}
      >
        {label}
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
        {label}
        <ChevronDown size={11} aria-hidden style={{ transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 160ms ease' }} />
      </button>

      <div
        role="menu"
        aria-label={label}
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
