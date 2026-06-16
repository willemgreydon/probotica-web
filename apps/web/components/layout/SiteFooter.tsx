'use client';

import Link from 'next/link';
import { footerColumns, socialLinks, authLinks, siteMeta } from '@/lib/content/navigation';
import { useT } from '@/components/providers/LocaleProvider';

/**
 * SiteFooter (PB-002) — the single global footer for all public routes.
 * Columns are derived from the typed navigation model (PB-010); replaces the
 * footer that was previously hardcoded into the home page.
 */
export function SiteFooter() {
  const t = useT();
  const year = 2026;

  return (
    <footer
      role="contentinfo"
      style={{
        borderTop: '1px solid var(--border)',
        background: 'var(--surface-1)',
      }}
    >
      <div className="container-x" style={{ paddingBlock: 'clamp(40px, 6vw, 72px)' }}>
        <div
          style={{
            display: 'grid',
            gap: 'clamp(28px, 4vw, 48px)',
            gridTemplateColumns: 'minmax(220px, 1.4fr) repeat(auto-fit, minmax(140px, 1fr))',
          }}
        >
          {/* Brand + newsletter CTA */}
          <div>
            <Link href="/" className="header-logo focus-ring" aria-label="ProBotica — home" style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
              <img src="/brand/emblem-dark.png" alt="" aria-hidden className="brand-asset-dark" width={24} height={24} style={{ height: 24, width: 'auto' }} />
              <img src="/brand/emblem-light.png" alt="" aria-hidden className="brand-asset-light" width={24} height={24} style={{ height: 24, width: 'auto' }} />
              <span className="text-mono" style={{ letterSpacing: '.2em', fontWeight: 700 }}>PROBOTICA</span>
            </Link>
            <p className="text-body" style={{ marginTop: 14, maxWidth: 320, fontSize: '.86rem', color: 'var(--muted-foreground)' }}>
              {t('footer.tagline')}
            </p>
            <Link
              href={authLinks.getStarted.href}
              className="btn btn-primary focus-ring"
              style={{ marginTop: 18, height: 36, padding: '0 16px' }}
            >
              {authLinks.getStarted.label}
            </Link>
          </div>

          {/* Link columns */}
          {footerColumns.map((column) => (
            <nav key={column.label} aria-label={column.label}>
              <h2
                className="text-mono"
                style={{ fontSize: '.62rem', fontWeight: 700, letterSpacing: '.28em', textTransform: 'uppercase', color: 'var(--muted-foreground)', marginBottom: 12 }}
              >
                {t(`nav.${column.label}`)}
              </h2>
              <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'grid', gap: 8 }}>
                {column.links.map((link) => (
                  <li key={`${column.label}-${link.href}`}>
                    <Link
                      href={link.href}
                      className="footer-link focus-ring"
                      style={{ fontSize: '.84rem', color: 'var(--foreground)', textDecoration: 'none' }}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        {/* Bottom row: copyright, locale, social */}
        <div
          className="hud-line"
          style={{ marginBlock: 'clamp(24px, 4vw, 40px) 20px' }}
        />
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 16,
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <p
            className="text-mono"
            style={{ fontSize: '.66rem', letterSpacing: '.16em', textTransform: 'uppercase', color: 'var(--muted-foreground)' }}
          >
            © {year} {siteMeta.name} · {siteMeta.tagline} · {siteMeta.location}
          </p>

          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <span
              className="text-mono"
              style={{ fontSize: '.62rem', letterSpacing: '.18em', textTransform: 'uppercase', color: 'var(--telemetry-dim)' }}
            >
              {siteMeta.locale.toUpperCase()}
            </span>
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="footer-link focus-ring"
                style={{ fontSize: '.72rem', color: 'var(--muted-foreground)', textDecoration: 'none' }}
              >
                {social.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
