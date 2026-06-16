'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect, useCallback } from 'react';
import {
  Bot, Layers, ShoppingBag, LayoutDashboard, BookOpen,
  Cpu, Settings, Home, Menu, X, Command, ChevronRight, Zap,
  PanelLeftClose, PanelLeftOpen,
} from 'lucide-react';
import { RuntimeBreadcrumbs } from './RuntimeBreadcrumbs';
import { ThemeAccessibilityMenu } from './ThemeAccessibilityMenu';
import { SiteFooter } from './SiteFooter';

interface NavItem {
  href: string;
  label: string;
  shortLabel: string;
  icon: React.ReactNode;
  badge?: string;
}

const NAV_ITEMS: NavItem[] = [
  { href: '/bots',           label: 'Bot Lab',         shortLabel: 'BOTS',    icon: <Bot size={14} /> },
  { href: '/workspace',      label: 'Workspace',       shortLabel: 'WORK',    icon: <Layers size={14} /> },
  { href: '/marketplace',    label: 'Marketplace',     shortLabel: 'MKT',     icon: <ShoppingBag size={14} /> },
  { href: '/control-center', label: 'Control Center',  shortLabel: 'CTRL',    icon: <LayoutDashboard size={14} /> },
  { href: '/knowledge',      label: 'Knowledge',       shortLabel: 'KNOW',    icon: <BookOpen size={14} /> },
  { href: '/studio',         label: 'AI Studio',       shortLabel: 'STD',     icon: <Cpu size={14} /> },
];

const SECONDARY_ITEMS: NavItem[] = [
  { href: '/solutions',      label: 'Solutions',       shortLabel: 'SOL',     icon: <Settings size={14} /> },
  { href: '/',               label: 'Home',            shortLabel: 'HOME',    icon: <Home size={14} /> },
];

interface AppShellProps {
  children: React.ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [cmdHint, setCmdHint] = useState(false);

  /* Restore desktop sidebar collapsed preference */
  useEffect(() => {
    setCollapsed(localStorage.getItem('probotica-sidebar-collapsed') === '1');
  }, []);

  const toggleCollapsed = useCallback(() => {
    setCollapsed((v) => {
      const next = !v;
      try { localStorage.setItem('probotica-sidebar-collapsed', next ? '1' : '0'); } catch { /* ignore */ }
      return next;
    });
  }, []);

  /* Show ⌘K hint once after load */
  useEffect(() => {
    const shown = sessionStorage.getItem('probotica-cmd-hint');
    if (!shown) {
      const t = setTimeout(() => {
        setCmdHint(true);
        sessionStorage.setItem('probotica-cmd-hint', '1');
      }, 2000);
      const t2 = setTimeout(() => setCmdHint(false), 6000);
      return () => { clearTimeout(t); clearTimeout(t2); };
    }
  }, []);

  /* Close sidebar on route change (mobile) */
  useEffect(() => {
    setSidebarOpen(false);
    document.body.style.overflow = '';
  }, [pathname]);

  const isActive = useCallback((href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  }, [pathname]);

  /* Emit custom event so CommandPalette knows to open */
  const openCmd = () => window.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', ctrlKey: true, bubbles: true }));

  /* Lock body scroll when mobile sidebar is open */
  useEffect(() => {
    document.body.style.overflow = sidebarOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [sidebarOpen]);

  return (
    <div data-collapsed={collapsed ? 'true' : 'false'} style={{ display: 'flex', minHeight: '100dvh', position: 'relative' }}>
      {/* Sidebar backdrop (mobile) */}
      {sidebarOpen && (
        <div
          style={{
            position: 'fixed', inset: 0, zIndex: 'var(--z-backdrop)',
            background: 'rgba(4,5,6,.6)', backdropFilter: 'blur(4px)',
          }}
          onClick={() => setSidebarOpen(false)}
          aria-hidden
        />
      )}

      {/* ── Tactical Sidebar (desktop) ── */}
      {/* Show/hide is controlled by .app-shell-aside-desktop (CSS media query),
          NOT an inline display — an inline value would override the breakpoint
          rule and the fixed sidebar would overlap content on mobile/tablet. */}
      <aside
        aria-label="Main navigation"
        style={{
          position: 'fixed',
          left: 0,
          top: 0,
          bottom: 0,
          width: 'var(--sidebar-width)',
          zIndex: 'var(--z-sidebar)',
          background: 'var(--panel-bg)',
          borderRight: '1px solid var(--panel-border)',
        }}
        className="app-shell-aside-desktop"
      >
        {/* Sidebar header */}
        <div style={{
          height: 'var(--topbar-height)',
          display: 'flex',
          alignItems: 'center',
          padding: '0 16px',
          borderBottom: '1px solid var(--panel-border)',
          flexShrink: 0,
          gap: '10px',
        }}>
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none', flex: 1, minWidth: 0 }}>
            <div style={{
              width: 26, height: 26, borderRadius: '6px',
              border: '1px solid var(--hud-border)',
              background: 'var(--panel-inset)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0,
            }}>
              <Bot size={12} style={{ color: 'var(--primary)' }} />
            </div>
            <span style={{
              fontFamily: 'var(--font-mono), monospace',
              fontSize: '.65rem',
              letterSpacing: '.22em',
              fontWeight: 700,
              color: 'var(--foreground)',
              textTransform: 'uppercase',
            }}>
              Probotica
            </span>
          </Link>
          <div style={{ width: 6, height: 6, borderRadius: '50%' }} className="status-dot status-dot-online animate-pulse-dot" />
        </div>

        {/* System label */}
        <div style={{ padding: '12px 16px 6px', flexShrink: 0 }}>
          <span style={{
            fontFamily: 'var(--font-mono), monospace',
            fontSize: '.55rem',
            letterSpacing: '.28em',
            textTransform: 'uppercase',
            color: 'var(--telemetry-dim)',
          }}>
            AI Runtime
          </span>
        </div>

        {/* Primary nav */}
        <nav style={{ padding: '4px 8px', flex: 1, overflow: 'y-auto', display: 'flex', flexDirection: 'column', gap: '2px' }}>
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="sidebar-item"
              data-active={isActive(item.href) ? 'true' : 'false'}
              aria-current={isActive(item.href) ? 'page' : undefined}
            >
              <span style={{ color: isActive(item.href) ? 'var(--primary)' : 'var(--muted-foreground)', flexShrink: 0 }}>
                {item.icon}
              </span>
              <span style={{ flex: 1, minWidth: 0 }} className="text-truncate">{item.label}</span>
              {isActive(item.href) && (
                <ChevronRight size={10} style={{ color: 'var(--primary)', flexShrink: 0 }} />
              )}
            </Link>
          ))}

          {/* Separator */}
          <div style={{ height: '1px', background: 'var(--panel-border)', margin: '8px 4px' }} />

          {SECONDARY_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="sidebar-item"
              data-active={isActive(item.href) ? 'true' : 'false'}
            >
              <span style={{ color: isActive(item.href) ? 'var(--primary)' : 'var(--muted-foreground)', flexShrink: 0 }}>
                {item.icon}
              </span>
              <span className="text-truncate">{item.label}</span>
            </Link>
          ))}
        </nav>

        {/* ⌘K hint */}
        <div style={{ padding: '8px 8px', flexShrink: 0 }}>
          <button
            type="button"
            onClick={openCmd}
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '8px 12px',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--panel-border)',
              background: cmdHint ? 'rgba(145,242,255,.04)' : 'transparent',
              color: 'var(--telemetry-dim)',
              fontFamily: 'var(--font-mono), monospace',
              fontSize: '.6rem',
              letterSpacing: '.14em',
              textTransform: 'uppercase',
              cursor: 'none',
              transition: 'all 200ms ease',
              borderColor: cmdHint ? 'var(--panel-border-active)' : 'var(--panel-border)',
            }}
            aria-label="Open command palette"
          >
            <Command size={11} style={{ flexShrink: 0 }} />
            <span style={{ flex: 1, textAlign: 'left' }}>Search</span>
            <span style={{ padding: '2px 5px', border: '1px solid var(--panel-border)', borderRadius: '4px', fontSize: '.55rem' }}>⌘K</span>
          </button>
        </div>

        {/* Telemetry strip */}
        <div className="telemetry-panel" style={{ borderTop: '1px solid var(--telemetry-border)', borderLeft: 'none', borderRight: 'none', borderBottom: 'none', flexShrink: 0 }}>
          <div className="telemetry-row">
            <span className="telemetry-key">runtime</span>
            <span className="telemetry-val telemetry-val-ok">online</span>
          </div>
          <div className="telemetry-row" style={{ borderBottom: 'none' }}>
            <span className="telemetry-key">region</span>
            <span className="telemetry-val">eu-west</span>
          </div>
        </div>
      </aside>

      {/* ── Main content area ── */}
      {/* Offset is token-driven via .app-shell-main (margin-left = --sidebar-width
          at >=lg, 0 below where the sidebar becomes an overlay). Do not set the
          margin inline — an inline value would override the responsive rule. */}
      <div className="app-shell-main">
        {/* Runtime Topbar */}
        <header
          className="app-shell-topbar"
          style={{
            position: 'sticky', top: 0, zIndex: 'var(--z-sticky)',
            paddingLeft: '16px', paddingRight: '16px',
            gap: '12px',
          }}
        >
          {/* Mobile hamburger — opens the overlay drawer (below lg only) */}
          <button
            type="button"
            className="icon-btn app-shell-burger"
            onClick={() => setSidebarOpen((v) => !v)}
            aria-label={sidebarOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={sidebarOpen}
            aria-haspopup="dialog"
            style={{ minWidth: 44, minHeight: 44 }}
          >
            {sidebarOpen ? <X size={14} /> : <Menu size={14} />}
          </button>

          {/* Desktop collapse toggle — gives the content more room (lg+ only) */}
          <button
            type="button"
            className="icon-btn app-shell-collapse"
            onClick={toggleCollapsed}
            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            aria-pressed={collapsed}
            title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            style={{ minWidth: 36, minHeight: 36 }}
          >
            {collapsed ? <PanelLeftOpen size={15} /> : <PanelLeftClose size={15} />}
          </button>

          {/* Mobile logo */}
          <Link href="/" className="flex items-center gap-2 lg:hidden" style={{ textDecoration: 'none', minWidth: 0, overflow: 'hidden' }}>
            <Bot size={14} style={{ color: 'var(--primary)', flexShrink: 0 }} />
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '.65rem', letterSpacing: '.2em', fontWeight: 700, textTransform: 'uppercase', color: 'var(--foreground)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              Probotica
            </span>
          </Link>

          {/* Breadcrumbs — desktop */}
          <div style={{ flex: 1, minWidth: 0 }} className="hidden lg:block">
            <RuntimeBreadcrumbs />
          </div>

          {/* Section title — tablet/mobile spacer */}
          <div style={{ flex: 1, minWidth: 0 }} className="lg:hidden" />

          {/* Right controls */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginLeft: 'auto', flexShrink: 0 }}>
            {/* Runtime indicator */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }} className="hidden md:flex">
              <div style={{ width: 5, height: 5, borderRadius: '50%' }} className="status-dot status-dot-online animate-pulse-dot" />
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '.58rem', letterSpacing: '.18em', textTransform: 'uppercase', color: 'var(--telemetry-dim)' }}>
                Live
              </span>
            </div>

            <div style={{ width: 1, height: 16, background: 'var(--panel-border)' }} className="hidden md:block" />

            <button
              type="button"
              onClick={openCmd}
              className="icon-btn hidden md:inline-flex"
              aria-label="Open command palette (⌘K)"
              title="Command Palette ⌘K"
            >
              <Command size={12} />
            </button>

            <ThemeAccessibilityMenu />
          </div>
        </header>

        {/* Mobile sidebar (overlay) */}
        <aside
          aria-label="Mobile navigation"
          role="dialog"
          aria-modal="true"
          aria-hidden={!sidebarOpen}
          style={{
            position: 'fixed',
            left: 0, top: 0, bottom: 0,
            width: 'min(var(--sidebar-width), 85vw)',
            zIndex: 'var(--z-drawer)',
            background: 'var(--panel-bg)',
            borderRight: '1px solid var(--panel-border)',
            transform: sidebarOpen ? 'translate3d(0,0,0)' : 'translate3d(-100%,0,0)',
            transition: 'transform 280ms var(--ease-out-expo)',
          }}
          className="app-shell-aside-mobile"
        >
          <div style={{ height: 'var(--topbar-height)', display: 'flex', alignItems: 'center', padding: '0 16px', borderBottom: '1px solid var(--panel-border)', justifyContent: 'space-between' }}>
            <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }}>
              <Bot size={14} style={{ color: 'var(--primary)' }} />
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '.65rem', letterSpacing: '.2em', fontWeight: 700, textTransform: 'uppercase', color: 'var(--foreground)' }}>Probotica</span>
            </Link>
            <button type="button" className="icon-btn" onClick={() => setSidebarOpen(false)} aria-label="Close menu"><X size={14} /></button>
          </div>
          <nav style={{ padding: '8px', flex: 1, display: 'flex', flexDirection: 'column', gap: '2px' }}>
            {[...NAV_ITEMS, ...SECONDARY_ITEMS].map((item) => (
              <Link key={item.href} href={item.href} className="sidebar-item" data-active={isActive(item.href) ? 'true' : 'false'}>
                <span style={{ color: isActive(item.href) ? 'var(--primary)' : 'var(--muted-foreground)' }}>{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>
        </aside>

        {/* Page content */}
        <main style={{ flex: 1, minHeight: 0 }}>
          {children}
        </main>

        {/* Global footer — same as marketing routes, at the bottom of the content column */}
        <SiteFooter />
      </div>
    </div>
  );
}
