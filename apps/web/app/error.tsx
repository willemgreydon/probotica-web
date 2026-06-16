'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { RotateCcw, Home } from 'lucide-react';

/**
 * Route-segment error boundary (PB-016). Renders inside the root layout, so the
 * brand styles and chrome tokens apply. Offers retry + a way home instead of a
 * raw stack / white screen.
 */
export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    // Surface for logging/telemetry (PB-034 will consume this later).
    console.error(error);
  }, [error]);

  return (
    <main id="main-content" className="page-shell hud-grid bg-premium">
      <div className="container-x" style={{ textAlign: 'center', maxWidth: 560, marginInline: 'auto' }}>
        <p className="text-mono" style={{ fontSize: '.62rem', fontWeight: 700, letterSpacing: '.35em', textTransform: 'uppercase', color: 'var(--danger)' }}>
          Something broke
        </p>
        <h1 className="text-display" style={{ marginTop: 14, marginBottom: 14 }}>
          This view hit an unexpected error
        </h1>
        <p className="text-body" style={{ marginBottom: 8 }}>
          The rest of the app is fine. Try again, or head back to a known page.
        </p>
        {error?.digest && (
          <p className="text-mono" style={{ fontSize: '.66rem', color: 'var(--telemetry-dim)', marginBottom: 24 }}>
            ref: {error.digest}
          </p>
        )}
        <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap', marginTop: 8 }}>
          <button type="button" onClick={reset} className="btn btn-primary focus-ring" style={{ minHeight: 44, gap: 8 }}>
            <RotateCcw size={15} aria-hidden /> Try again
          </button>
          <Link href="/" className="btn focus-ring" style={{ minHeight: 44, gap: 8 }}>
            <Home size={15} aria-hidden /> Go home
          </Link>
        </div>
      </div>
    </main>
  );
}
