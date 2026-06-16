import Link from 'next/link';
import { Bot } from 'lucide-react';

/**
 * Auth route-group layout (PB-023/024).
 * A focused, chrome-light shell for login/signup — intentionally without the
 * full marketing nav. Backend wiring is deferred; these are UI placeholders.
 */
export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <main
      id="main-content"
      className="hud-grid bg-premium"
      style={{ minHeight: '100dvh', display: 'grid', placeItems: 'center', padding: 'clamp(24px, 5vw, 64px)' }}
    >
      <div style={{ width: '100%', maxWidth: 420 }}>
        <Link href="/" className="header-logo text-caption focus-ring" aria-label="ProBotica — home" style={{ display: 'inline-flex', marginBottom: 24 }}>
          <Bot size={15} aria-hidden />
          <span className="text-mono" style={{ letterSpacing: '.2em' }}>PROBOTICA</span>
        </Link>
        {children}
      </div>
    </main>
  );
}
