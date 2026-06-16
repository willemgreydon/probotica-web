'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth, TEST_CREDENTIALS } from '@/components/providers/AuthProvider';

export function LoginForm() {
  const { login } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const res = login(email, password);
    if (res.ok) router.push('/account');
    else setError(res.error ?? 'Login failed.');
  }

  return (
    <section
      aria-label="Sign in"
      style={{ padding: 28, borderRadius: 'var(--radius-xl)', border: '1px solid var(--hud-border)', background: 'var(--command-surface)', boxShadow: 'var(--shadow)' }}
    >
      <h1 className="text-heading" style={{ marginBottom: 6 }}>Welcome back</h1>
      <p className="text-body" style={{ fontSize: '.86rem', color: 'var(--muted-foreground)', marginBottom: 22 }}>
        Sign in to run bots and resume your workspace.
      </p>

      <form style={{ display: 'grid', gap: 14 }} onSubmit={onSubmit}>
        <label style={{ display: 'grid', gap: 6 }}>
          <span className="text-mono" style={{ fontSize: '.62rem', letterSpacing: '.18em', textTransform: 'uppercase', color: 'var(--muted-foreground)' }}>Email</span>
          <input type="email" name="email" autoComplete="email" placeholder="you@company.com" className="input focus-ring" required value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <label style={{ display: 'grid', gap: 6 }}>
          <span className="text-mono" style={{ fontSize: '.62rem', letterSpacing: '.18em', textTransform: 'uppercase', color: 'var(--muted-foreground)' }}>Password</span>
          <input type="password" name="password" autoComplete="current-password" placeholder="••••••••" className="input focus-ring" required value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>

        {error && (
          <p role="alert" style={{ fontSize: '.8rem', color: 'var(--danger)', margin: 0 }}>{error}</p>
        )}

        <button type="submit" className="btn btn-primary focus-ring" style={{ minHeight: 44, justifyContent: 'center' }}>
          Sign in
        </button>
      </form>

      {/* Test account helper */}
      <div
        style={{ marginTop: 18, padding: 12, borderRadius: 'var(--radius-md)', border: '1px dashed var(--hud-border)', background: 'var(--panel-inset)' }}
      >
        <p className="text-mono" style={{ fontSize: '.6rem', letterSpacing: '.18em', textTransform: 'uppercase', color: 'var(--muted-foreground)', marginBottom: 6 }}>
          Test account
        </p>
        <p className="text-body" style={{ fontSize: '.8rem', margin: 0 }}>
          {TEST_CREDENTIALS.email} · {TEST_CREDENTIALS.password}
        </p>
        <button
          type="button"
          className="btn focus-ring"
          style={{ marginTop: 10, minHeight: 34, fontSize: '.76rem' }}
          onClick={() => { setEmail(TEST_CREDENTIALS.email); setPassword(TEST_CREDENTIALS.password); setError(''); }}
        >
          Fill test credentials
        </button>
      </div>

      <p className="text-body" style={{ fontSize: '.84rem', marginTop: 18 }}>
        New here? <Link href="/signup" className="focus-ring" style={{ color: 'var(--primary)' }}>Create an account</Link>
      </p>
    </section>
  );
}
