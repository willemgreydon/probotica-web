'use client';

import { useRouter } from 'next/navigation';
import { useLocale } from '@/components/providers/LocaleProvider';
import { LOCALES, LOCALE_COOKIE, LOCALE_LABELS } from '@/lib/i18n/config';

/**
 * EN/DE language switch. Persists the choice to a cookie and refreshes so server
 * components re-render in the new locale (the root layout reads the cookie).
 */
export function LanguageSwitch() {
  const { locale } = useLocale();
  const router = useRouter();

  function setLocale(next: string) {
    if (next === locale) return;
    document.cookie = `${LOCALE_COOKIE}=${next};path=/;max-age=31536000;samesite=lax`;
    router.refresh();
  }

  return (
    <div role="group" aria-label="Language" style={{ display: 'inline-flex', border: '1px solid var(--hud-border)', borderRadius: 'var(--radius-md)', overflow: 'hidden' }}>
      {LOCALES.map((l) => {
        const active = l === locale;
        return (
          <button
            key={l}
            type="button"
            onClick={() => setLocale(l)}
            aria-pressed={active}
            aria-label={LOCALE_LABELS[l]}
            className="text-mono focus-ring"
            style={{
              padding: '4px 8px',
              fontSize: '.6rem',
              letterSpacing: '.12em',
              textTransform: 'uppercase',
              border: 'none',
              cursor: 'none',
              background: active ? 'var(--primary)' : 'transparent',
              color: active ? 'var(--primary-foreground)' : 'var(--muted-foreground)',
            }}
          >
            {l}
          </button>
        );
      })}
    </div>
  );
}
