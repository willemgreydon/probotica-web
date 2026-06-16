'use client';

import { useEffect } from 'react';

/**
 * Global error boundary (PB-016). Replaces the ENTIRE document when the root
 * layout itself throws, so it must render its own <html>/<body> and cannot rely
 * on globals.css or providers — styles are inline and self-contained.
 */
export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: '100dvh',
          display: 'grid',
          placeItems: 'center',
          background: '#040506',
          color: '#d9e1e7',
          fontFamily: 'system-ui, -apple-system, Segoe UI, Roboto, sans-serif',
          padding: '24px',
        }}
      >
        <div style={{ textAlign: 'center', maxWidth: 480 }}>
          <p style={{ fontSize: '.7rem', fontWeight: 700, letterSpacing: '.35em', textTransform: 'uppercase', color: '#ff8f96', margin: 0 }}>
            Critical error
          </p>
          <h1 style={{ fontSize: '1.9rem', fontWeight: 700, margin: '14px 0' }}>The app failed to load</h1>
          <p style={{ color: '#8f9baa', lineHeight: 1.6, margin: '0 0 24px' }}>
            A top-level error occurred. Reloading usually fixes it.
          </p>
          <button
            type="button"
            onClick={reset}
            style={{
              minHeight: 44,
              padding: '0 20px',
              borderRadius: 10,
              border: '1px solid #91f2ff',
              background: '#91f2ff',
              color: '#020406',
              fontWeight: 700,
              cursor: 'pointer',
            }}
          >
            Reload
          </button>
        </div>
      </body>
    </html>
  );
}
