'use client';

import { createContext, useContext, useEffect, useMemo, useState } from 'react';

type ContrastMode = 'default' | 'high';
type MotionMode = 'default' | 'low';
type TransparencyMode = 'default' | 'reduced';
type ReadingMode = 'default' | 'dyslexia';
type ColorMode = 'default' | 'colorblind-safe';

interface AccessibilityState {
  contrast: ContrastMode;
  motion: MotionMode;
  transparency: TransparencyMode;
  reading: ReadingMode;
  colorMode: ColorMode;
}

interface AccessibilityContextValue extends AccessibilityState {
  mounted: boolean;
  setContrast: (value: ContrastMode) => void;
  setMotion: (value: MotionMode) => void;
  setTransparency: (value: TransparencyMode) => void;
  setReading: (value: ReadingMode) => void;
  setColorMode: (value: ColorMode) => void;
}

const STORAGE_KEY = 'probotica-accessibility';
const defaultState: AccessibilityState = {
  contrast: 'default',
  motion: 'default',
  transparency: 'default',
  reading: 'default',
  colorMode: 'default',
};

const AccessibilityContext = createContext<AccessibilityContextValue | null>(null);

export function AccessibilityProvider({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);
  const [state, setState] = useState<AccessibilityState>(() => {
    if (typeof window === 'undefined') return defaultState;
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (!saved) return defaultState;
    try {
      const parsed = JSON.parse(saved) as Partial<AccessibilityState>;
      return { ...defaultState, ...parsed };
    } catch {
      return defaultState;
    }
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    root.dataset.contrast = state.contrast;
    root.dataset.motion = state.motion;
    root.dataset.transparency = state.transparency;
    root.dataset.reading = state.reading;
    root.dataset.colorMode = state.colorMode;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const value = useMemo<AccessibilityContextValue>(
    () => ({
      ...state,
      mounted,
      setContrast: (contrast) => setState((s) => ({ ...s, contrast })),
      setMotion: (motion) => setState((s) => ({ ...s, motion })),
      setTransparency: (transparency) => setState((s) => ({ ...s, transparency })),
      setReading: (reading) => setState((s) => ({ ...s, reading })),
      setColorMode: (colorMode) => setState((s) => ({ ...s, colorMode })),
    }),
    [state, mounted]
  );

  return <AccessibilityContext.Provider value={value}>{children}</AccessibilityContext.Provider>;
}

export function useAccessibility() {
  const ctx = useContext(AccessibilityContext);
  if (!ctx) throw new Error('useAccessibility must be used within AccessibilityProvider');
  return ctx;
}
