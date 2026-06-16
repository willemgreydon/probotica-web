import type { Metadata } from 'next';
import Link from 'next/link';
import { getServerT } from '@/lib/i18n/server';

export const metadata: Metadata = {
  title: 'Shop | ProBotica Marketplace',
  description: 'Browse prompt packs, AI workflow kits, and industry-ready bot modules from the ProBotica Marketplace.',
};

const SHOP_CATEGORIES = [
  { tag: 'Workflows', title: 'Workflow Automation Packs', desc: 'Pre-built multi-step bot pipelines for sales, UX, content, and operations.', href: '/marketplace', count: '10 templates' },
  { tag: 'Bots', title: 'Expert Bot Collection', desc: '111 domain-tuned AI assistants across 12 business categories. Browse, test, deploy.', href: '/bots', count: '111 bots' },
  { tag: 'Prompts', title: 'Prompt Engineering Systems', desc: 'Structured prompt packs with role definitions, output contracts, and edge-case handling.', href: '/solutions/prompt-packs', count: 'Premium packs' },
  { tag: 'Industries', title: 'Industry Kits', desc: 'Bundled AI modules for real estate, marketing, education, and development teams.', href: '/industries', count: '3 industries' },
];

export default async function ShopPage() {
  const t = await getServerT();
  return (
    <main id="main-content" className="page-shell hud-grid bg-premium">
      <div className="container-x">
        <p className="label-eyebrow mb-4">{t('pages.shopEyebrow')}</p>
        <h1 className="heading-section text-balance" style={{ maxWidth: '640px' }}>
          {t('pages.shopTitle')}
        </h1>
        <p className="text-lead mt-5" style={{ maxWidth: '520px' }}>
          {t('pages.shopLead')}
        </p>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 mb-10">
          {SHOP_CATEGORIES.map((cat) => (
            <Link
              key={cat.title}
              href={cat.href}
              className="module-card group"
              style={{ textDecoration: 'none', minHeight: 180 }}
            >
              <div className="module-card-header">
                <span className="mono-chip">{cat.tag}</span>
                <span className="edge-label">{cat.count}</span>
              </div>
              <div className="module-card-body">
                <h3 style={{ fontSize: '1rem', fontWeight: 800, letterSpacing: '-0.01em', color: 'var(--foreground)', marginBottom: 'var(--space-2)' }}>
                  {cat.title}
                </h3>
                <p className="text-body">{cat.desc}</p>
              </div>
              <div className="module-card-footer">
                <span className="edge-label" style={{ color: 'var(--primary)' }}>Browse →</span>
              </div>
            </Link>
          ))}
        </div>

        <div
          className="p-5 relative overflow-hidden mb-8"
          style={{ border: '1px solid var(--hud-border)', background: 'var(--command-surface)', borderRadius: 'var(--radius-lg)' }}
        >
          <p className="edge-label mb-2">Custom Modules</p>
          <p className="text-body mb-4">Need a custom AI module for your specific business process? Book a briefing and we&apos;ll scope it together.</p>
          <Link href="/contact" className="btn btn-primary" style={{ minHeight: 44 }}>Book Custom Briefing</Link>
        </div>
      </div>
    </main>
  );
}
