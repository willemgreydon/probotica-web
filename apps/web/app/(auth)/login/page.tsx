import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Sign in',
  description: 'Sign in to your ProBotica workspace.',
};

/**
 * Login placeholder (PB-023). UI only — authentication backend is deferred (PB-031).
 */
export default function LoginPage() {
  return (
    <section
      aria-label="Sign in"
      style={{ padding: 28, borderRadius: 'var(--radius-xl)', border: '1px solid var(--hud-border)', background: 'var(--command-surface)', boxShadow: 'var(--shadow)' }}
    >
      <h1 className="text-heading" style={{ marginBottom: 6 }}>Welcome back</h1>
      <p className="text-body" style={{ fontSize: '.86rem', color: 'var(--muted-foreground)', marginBottom: 22 }}>
        Sign in to run bots and resume your workspace.
      </p>

      <form style={{ display: 'grid', gap: 14 }} aria-describedby="auth-note">
        <label style={{ display: 'grid', gap: 6 }}>
          <span className="text-mono" style={{ fontSize: '.62rem', letterSpacing: '.18em', textTransform: 'uppercase', color: 'var(--muted-foreground)' }}>Email</span>
          <input type="email" name="email" autoComplete="email" placeholder="you@company.com" className="input focus-ring" required />
        </label>
        <label style={{ display: 'grid', gap: 6 }}>
          <span className="text-mono" style={{ fontSize: '.62rem', letterSpacing: '.18em', textTransform: 'uppercase', color: 'var(--muted-foreground)' }}>Password</span>
          <input type="password" name="password" autoComplete="current-password" placeholder="••••••••" className="input focus-ring" required />
        </label>
        <button type="submit" className="btn btn-primary focus-ring" style={{ minHeight: 44, justifyContent: 'center' }} disabled>
          Sign in
        </button>
      </form>

      <p id="auth-note" className="text-body" style={{ fontSize: '.72rem', color: 'var(--telemetry-dim)', marginTop: 14 }}>
        Authentication is coming soon — this is a preview.
      </p>
      <p className="text-body" style={{ fontSize: '.84rem', marginTop: 18 }}>
        New here? <Link href="/signup" className="focus-ring" style={{ color: 'var(--primary)' }}>Create an account</Link>
      </p>
    </section>
  );
}
