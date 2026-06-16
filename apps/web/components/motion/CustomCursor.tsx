'use client';

import { useEffect, useRef } from 'react';

type CursorState = 'default' | 'hover' | 'text' | 'click';

const LERP_MIN = 0.18;
const LERP_MAX = 0.42;
const VEL_SCALE = 0.012;

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(pointer: coarse)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (!dotRef.current || !ringRef.current) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;
    let prevMouseX = mouseX;
    let prevMouseY = mouseY;
    let raf = 0;
    let running = true;
    let state: CursorState = 'default';
    let isVisible = false;

    const applyState = (next: CursorState) => {
      if (next === state) return;
      state = next;
      if (next === 'hover') {
        dot.style.opacity = '0';
        ring.style.width = '52px';
        ring.style.height = '52px';
        ring.style.borderColor = 'var(--cursor-ring-border)';
        ring.style.boxShadow = 'var(--cursor-glow)';
        ring.style.background = 'var(--cursor-ring)';
        return;
      }
      if (next === 'text') {
        dot.style.opacity = '1';
        dot.style.width = '2px';
        dot.style.height = '20px';
        dot.style.borderRadius = '1px';
        ring.style.opacity = '0.35';
        ring.style.width = '32px';
        ring.style.height = '32px';
        ring.style.borderColor = 'var(--cursor-ring-border)';
        ring.style.boxShadow = 'none';
        ring.style.background = 'transparent';
        return;
      }
      if (next === 'click') {
        dot.style.opacity = '1';
        ring.style.width = '44px';
        ring.style.height = '44px';
        ring.style.borderColor = 'var(--cursor-ring-border)';
        ring.style.boxShadow = 'var(--cursor-glow)';
        ring.style.background = 'var(--cursor-ring)';
        return;
      }
      dot.style.opacity = '1';
      dot.style.width = '8px';
      dot.style.height = '8px';
      dot.style.borderRadius = '50%';
      ring.style.opacity = '1';
      ring.style.width = '32px';
      ring.style.height = '32px';
      ring.style.borderColor = 'var(--cursor-ring-border)';
      ring.style.boxShadow = 'none';
      ring.style.background = 'transparent';
    };

    const tick = () => {
      if (!running) return;
      const dx = mouseX - prevMouseX;
      const dy = mouseY - prevMouseY;
      const vel = Math.sqrt(dx * dx + dy * dy);
      const lerp = Math.min(LERP_MAX, LERP_MIN + vel * VEL_SCALE);
      prevMouseX = mouseX;
      prevMouseY = mouseY;

      const dotScale = state === 'click' ? 0.4 : state === 'hover' ? 0 : 1;
      dot.style.transform = `translate3d(calc(${mouseX}px - 50%), calc(${mouseY}px - 50%), 0) scale(${dotScale})`;

      ringX += (mouseX - ringX) * lerp;
      ringY += (mouseY - ringY) * lerp;
      ring.style.transform = `translate3d(calc(${ringX}px - 50%), calc(${ringY}px - 50%), 0)`;
      raf = requestAnimationFrame(tick);
    };

    const onMove = (e: PointerEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!isVisible) {
        isVisible = true;
        dot.style.opacity = '1';
        ring.style.opacity = '1';
        ringX = mouseX;
        ringY = mouseY;
      }
      if (state === 'click') return;
      const target = e.target as HTMLElement | null;
      if (!target) return;
      if (target.closest('a, button, [role="button"], [data-magnetic], .btn')) applyState('hover');
      else if (target.closest('p, h1, h2, h3, h4, li, label, input, textarea, [data-text-cursor]')) applyState('text');
      else applyState('default');
    };

    const onDown = () => applyState('click');
    const onUp = () => {
      const el = document.elementFromPoint(mouseX, mouseY) as HTMLElement | null;
      applyState(el?.closest('a, button, [role="button"], [data-magnetic], .btn') ? 'hover' : 'default');
    };
    const onLeave = () => {
      isVisible = false;
      dot.style.opacity = '0';
      ring.style.opacity = '0';
    };
    const onEnter = () => {
      isVisible = true;
    };
    const onVisibilityChange = () => {
      if (document.hidden) {
        running = false;
        cancelAnimationFrame(raf);
      } else if (!running) {
        running = true;
        raf = requestAnimationFrame(tick);
      }
    };

    dot.style.opacity = '0';
    ring.style.opacity = '0';
    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('pointerdown', onDown);
    window.addEventListener('pointerup', onUp);
    document.addEventListener('mouseleave', onLeave);
    document.addEventListener('mouseenter', onEnter);
    document.addEventListener('visibilitychange', onVisibilityChange);
    raf = requestAnimationFrame(tick);

    return () => {
      running = false;
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerdown', onDown);
      window.removeEventListener('pointerup', onUp);
      document.removeEventListener('mouseleave', onLeave);
      document.removeEventListener('mouseenter', onEnter);
      document.removeEventListener('visibilitychange', onVisibilityChange);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        aria-hidden
        className="hidden md:block"
        style={{ position: 'fixed', top: 0, left: 0, width: '8px', height: '8px', borderRadius: '50%', background: 'var(--cursor-dot)', pointerEvents: 'none', zIndex: 'var(--z-cursor)', willChange: 'transform', transition: 'width 100ms ease, height 100ms ease, border-radius 80ms ease, opacity 80ms ease' }}
      />
      <div
        ref={ringRef}
        aria-hidden
        className="hidden md:block"
        style={{ position: 'fixed', top: 0, left: 0, width: '32px', height: '32px', borderRadius: '50%', border: '1.5px solid var(--cursor-ring-border)', pointerEvents: 'none', zIndex: 'calc(var(--z-cursor) - 1)', willChange: 'transform', transition: 'width 180ms cubic-bezier(0.34,1.56,0.64,1), height 180ms cubic-bezier(0.34,1.56,0.64,1), border-color 150ms ease, box-shadow 150ms ease, opacity 80ms ease, background 150ms ease' }}
      />
    </>
  );
}
