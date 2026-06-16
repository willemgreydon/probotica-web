import { SiteHeader } from '@/components/layout/SiteHeader';
import { SiteFooter } from '@/components/layout/SiteFooter';

/**
 * Marketing route-group layout (PB-003).
 * Wraps every public route with the unified SiteHeader + SiteFooter shell.
 * URLs are unchanged — the (marketing) segment is a route group, not a path.
 *
 * Each page supplies its own <main className="page-shell"> landmark (which
 * already carries the fixed-header top offset), so the layout intentionally
 * does not add a second <main>.
 */
export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SiteHeader />
      {children}
      <SiteFooter />
    </>
  );
}
