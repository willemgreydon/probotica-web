import Link from 'next/link';
import { SiteHeader } from '@/components/layout/SiteHeader';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { NotFoundSearch } from '@/components/layout/NotFoundSearch';
import { quickLaunch } from '@/lib/content/navigation';

/**
 * Branded 404 (PB-015).
 * Lives at the app root (outside the route groups), so it renders the marketing
 * shell directly. Offers search + recovery links instead of a dead end.
 */
export default function NotFound() {
  const recovery = [
    { label: 'Home', href: '/' },
    ...quickLaunch.slice(0, 3),
    { label: 'Knowledge Universe', href: '/knowledge' },
    { label: 'Contact', href: '/contact' },
  ];

  return (
    <>
      <SiteHeader />
      <main id="main-content" className="page-shell hud-grid bg-premium">
        <div className="container-x" style={{ textAlign: 'center', maxWidth: 640, marginInline: 'auto' }}>
          <p className="text-mono" style={{ fontSize: '.62rem', fontWeight: 700, letterSpacing: '.35em', textTransform: 'uppercase', color: 'var(--primary)' }}>
            Error 404
          </p>
          <h1 className="text-display" style={{ marginTop: 14, marginBottom: 14 }}>
            This route went off the grid
          </h1>
          <p className="text-body" style={{ marginBottom: 28 }}>
            The page you&rsquo;re looking for doesn&rsquo;t exist or has moved. Try a search, or jump back to a known destination.
          </p>

          <NotFoundSearch />

          <nav aria-label="Recovery links" style={{ marginTop: 32, display: 'flex', flexWrap: 'wrap', gap: 10, justifyContent: 'center' }}>
            {recovery.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="btn focus-ring"
                style={{ minHeight: 40, fontSize: '.8rem' }}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
