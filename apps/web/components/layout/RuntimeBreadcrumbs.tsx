'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbSegment {
  label: string;
  href: string;
}

const LABEL_MAP: Record<string, string> = {
  bots:              'Bot Lab',
  workspace:         'Workspace',
  marketplace:       'Marketplace',
  'control-center':  'Control Center',
  knowledge:         'Knowledge',
  studio:            'AI Studio',
  solutions:         'Solutions',
  industries:        'Industries',
  shop:              'Shop',
  faq:               'FAQ',
  about:             'About',
  contact:           'Contact',
  privacy:           'Privacy',
  terms:             'Terms',
  imprint:           'Imprint',
  category:          'Category',
  workflows:         'Workflows',
  categories:        'Categories',
  scenarios:         'Scenarios',
};

function segmentLabel(seg: string): string {
  if (LABEL_MAP[seg]) return LABEL_MAP[seg];
  // Slug → title case (e.g. "what-is-artificial-intelligence" → "What Is Artificial Intelligence")
  return seg
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}

export function RuntimeBreadcrumbs() {
  const pathname = usePathname();

  if (pathname === '/') return null;

  const segments = pathname.split('/').filter(Boolean);
  const crumbs: BreadcrumbSegment[] = [{ label: 'Home', href: '/' }];

  segments.forEach((seg, i) => {
    crumbs.push({
      label: segmentLabel(seg),
      href: '/' + segments.slice(0, i + 1).join('/'),
    });
  });

  return (
    <nav aria-label="Breadcrumb" className="breadcrumb">
      {crumbs.map((crumb, i) => {
        const isLast = i === crumbs.length - 1;
        return (
          <span key={crumb.href} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            {i === 0 ? (
              <Link href={crumb.href} className="breadcrumb-link" aria-label="Home">
                <Home size={10} />
              </Link>
            ) : isLast ? (
              <span className="breadcrumb-active" aria-current="page">
                {crumb.label}
              </span>
            ) : (
              <Link href={crumb.href} className="breadcrumb-link">
                {crumb.label}
              </Link>
            )}
            {!isLast && (
              <ChevronRight size={9} className="breadcrumb-sep" aria-hidden />
            )}
          </span>
        );
      })}
    </nav>
  );
}
