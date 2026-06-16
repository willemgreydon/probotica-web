'use client';

import { createContext, useContext, useMemo } from 'react';
import type { Locale } from '@/lib/i18n/config';
import { getDict, translate, type Dict } from '@/lib/i18n/dictionaries';

interface LocaleContextValue {
  locale: Locale;
  dict: Dict;
  /** Dot-path translation lookup; returns the path itself if missing. */
  t: (path: string) => string;
}

const LocaleContext = createContext<LocaleContextValue | null>(null);

export function LocaleProvider({ locale, children }: { locale: Locale; children: React.ReactNode }) {
  const value = useMemo<LocaleContextValue>(() => {
    const dict = getDict(locale);
    return { locale, dict, t: (path) => translate(dict, path) };
  }, [locale]);

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useLocale(): LocaleContextValue {
  const ctx = useContext(LocaleContext);
  if (!ctx) throw new Error('useLocale must be used within a LocaleProvider');
  return ctx;
}

export function useT(): (path: string) => string {
  return useLocale().t;
}
