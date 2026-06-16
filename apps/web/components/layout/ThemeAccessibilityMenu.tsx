'use client';

import { useEffect, useRef, useState } from 'react';
import { Accessibility, MoonStar, Settings2, Sun, SunMoon } from 'lucide-react';
import { useTheme } from '@/components/providers/ThemeProvider';
import { useAccessibility } from '@/components/providers/AccessibilityProvider';

export function ThemeAccessibilityMenu() {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const { theme, mounted: themeMounted, setTheme } = useTheme();
  const a11y = useAccessibility();
  const mounted = themeMounted && a11y.mounted;

  const lightActive = mounted && theme === 'light';
  const darkActive = mounted && theme === 'dark';
  const systemActive = mounted && theme === 'system';

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    const onPointer = (e: MouseEvent) => {
      if (!rootRef.current) return;
      if (!rootRef.current.contains(e.target as Node)) setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    window.addEventListener('mousedown', onPointer);
    menuRef.current?.focus();
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('mousedown', onPointer);
    };
  }, [open]);

  return (
    <div ref={rootRef} className="relative flex items-center gap-1">
      <button className="header-control" onClick={() => setTheme('light')} aria-label="Use light theme" aria-pressed={lightActive} data-active={lightActive ? 'true' : 'false'}>
        <Sun size={14} />
      </button>
      <button className="header-control" onClick={() => setTheme('dark')} aria-label="Use dark theme" aria-pressed={darkActive} data-active={darkActive ? 'true' : 'false'}>
        <MoonStar size={14} />
      </button>
      <button className="header-control" onClick={() => setTheme('system')} aria-label="Use system theme" aria-pressed={systemActive} data-active={systemActive ? 'true' : 'false'}>
        <SunMoon size={14} />
      </button>
      <span className="header-separator" aria-hidden />
      <button className="header-control" aria-label="Open accessibility settings" aria-expanded={open} aria-controls="a11y-menu" onClick={() => setOpen((v) => !v)} data-active={open ? 'true' : 'false'}>
        <Accessibility size={14} />
      </button>

      {open && (
        <div
          id="a11y-menu"
          ref={menuRef}
          role="menu"
          tabIndex={-1}
          className="absolute right-0 top-11 z-50 w-72 border border-[var(--hud-border)] bg-[var(--command-surface)] p-4 shadow-[var(--shadow)]"
        >
          <div className="mb-3 flex items-center gap-2 text-caption">
            <Settings2 size={14} />
            Accessibility
          </div>
          <MenuRow label="Contrast" value={mounted ? a11y.contrast : 'default'} onToggle={() => a11y.setContrast(a11y.contrast === 'default' ? 'high' : 'default')} />
          <MenuRow label="Motion" value={mounted ? a11y.motion : 'default'} onToggle={() => a11y.setMotion(a11y.motion === 'default' ? 'low' : 'default')} />
          <MenuRow label="Transparency" value={mounted ? a11y.transparency : 'default'} onToggle={() => a11y.setTransparency(a11y.transparency === 'default' ? 'reduced' : 'default')} />
          <MenuRow label="Reading" value={mounted ? a11y.reading : 'default'} onToggle={() => a11y.setReading(a11y.reading === 'default' ? 'dyslexia' : 'default')} />
          <MenuRow label="Color mode" value={mounted ? a11y.colorMode : 'default'} onToggle={() => a11y.setColorMode(a11y.colorMode === 'default' ? 'colorblind-safe' : 'default')} />
        </div>
      )}
    </div>
  );
}

function MenuRow({ label, value, onToggle }: { label: string; value: string; onToggle: () => void }) {
  return (
    <button onClick={onToggle} className="mb-2 flex w-full items-center justify-between border border-[var(--hud-border)] px-3 py-2 text-left text-body">
      <span>{label}</span>
      <span className="text-caption">{value}</span>
    </button>
  );
}
