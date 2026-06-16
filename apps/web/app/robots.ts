import type { MetadataRoute } from 'next';

/**
 * robots.txt (PB-019) — allow crawling, keep auth/account out of the index,
 * and point crawlers at the sitemap.
 */
const SITE = process.env.NEXT_PUBLIC_SITE_URL || 'https://probotica.at';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/account', '/login', '/signup', '/api/'],
      },
    ],
    sitemap: `${SITE}/sitemap.xml`,
    host: SITE,
  };
}
