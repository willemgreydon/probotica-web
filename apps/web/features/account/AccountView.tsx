'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Bot, Layers, ShoppingBag, LogOut, UserRound } from 'lucide-react';
import { useAuth } from '@/components/providers/AuthProvider';

/**
 * Gated account area — demonstrates logged-in-only functionality. Redirects to
 * /login when there is no session.
 */
export function AccountView() {
  const { user, ready, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (ready && !user) router.replace('/login');
  }, [ready, user, router]);

  if (!ready || !user) {
    return (
      <main id="main-content" className="shell-x py-8" aria-busy="true">
        <div className="section-frame p-6" style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div className="skeleton" style={{ height: 14, width: 120 }} />
          <div className="skeleton" style={{ height: 32, width: 'min(360px,80%)' }} />
          <div className="skeleton" style={{ height: 160 }} />
        </div>
      </main>
    );
  }

  const quick = [
    { label: 'Bot Lab', href: '/bots', icon: <Bot size={16} aria-hidden /> },
    { label: 'Workspaces', href: '/workspaces', icon: <Layers size={16} aria-hidden /> },
    { label: 'Marketplace', href: '/marketplace', icon: <ShoppingBag size={16} aria-hidden /> },
  ];

  return (
    <main id="main-content" className="shell-x py-8 grid gap-6 [&>*]:min-w-0">
      <section className="section-frame p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="label-eyebrow">Account</p>
            <h1 className="heading-section mt-2">Welcome, {user.name}</h1>
            <p className="text-body mt-2">You are signed in as {user.email}. This area is only available to logged-in users.</p>
          </div>
          <button type="button" className="btn focus-ring" onClick={() => { logout(); router.push('/'); }} style={{ gap: 8 }}>
            <LogOut size={15} aria-hidden /> Sign out
          </button>
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-3 [&>*]:min-w-0">
        <div className="section-frame p-5">
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
            <span style={{ width: 38, height: 38, borderRadius: '50%', display: 'grid', placeItems: 'center', background: 'var(--panel-inset)', border: '1px solid var(--hud-border)' }}>
              <UserRound size={18} style={{ color: 'var(--primary)' }} aria-hidden />
            </span>
            <div>
              <p style={{ fontWeight: 700, color: 'var(--foreground)' }}>{user.name}</p>
              <p className="edge-label">{user.email}</p>
            </div>
          </div>
          <p className="text-body" style={{ fontSize: '.84rem' }}>Test account · plan: Pro (demo)</p>
        </div>

        <div className="section-frame p-5" style={{ gridColumn: 'span 2' }}>
          <p className="text-caption mb-3">Quick access</p>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            {quick.map((q) => (
              <Link key={q.href} href={q.href} className="btn focus-ring" style={{ gap: 8, minHeight: 40 }}>
                {q.icon} {q.label}
              </Link>
            ))}
          </div>
          <p className="text-body" style={{ fontSize: '.82rem', marginTop: 14, color: 'var(--muted-foreground)' }}>
            Your workspaces, runs and learning progress are saved locally in this browser. Sign out clears your session (local data remains).
          </p>
        </div>
      </section>
    </main>
  );
}
