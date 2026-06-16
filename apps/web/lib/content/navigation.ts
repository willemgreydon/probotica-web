/**
 * Single typed source of truth for site navigation (PB-010, PB-013).
 *
 * Consumed by SiteHeader, SiteFooter, the mobile drawer and (later) the sitemap.
 * Replaces the duplicated link lists previously spread across `site.ts`, the
 * AppShell nav and per-component arrays.
 *
 * Top-level taxonomy (PB-013): Product · Solutions · Industries · Resources ·
 * Pricing · Company. Legal links live in the footer, not the top level.
 */

export interface NavLink {
  label: string;
  href: string;
  /** Optional short description, used by mega-menu / dropdown panels. */
  description?: string;
  /** Marks an external link (renders with rel/target + visual hint). */
  external?: boolean;
}

export interface NavGroup {
  /** Top-level label shown in the header / footer column heading. */
  label: string;
  /** Optional landing page for the group itself (e.g. /solutions). */
  href?: string;
  links: NavLink[];
}

/* ------------------------------------------------------------------ *
 * Primary navigation — the 6-item top-level taxonomy (PB-013).
 * `Pricing` is a single destination (no children) but kept in the same
 * shape so the header can render it uniformly.
 * ------------------------------------------------------------------ */
export const primaryNav: NavGroup[] = [
  {
    label: 'Product',
    href: '/bots',
    links: [
      { label: 'Bot Lab', href: '/bots', description: 'Discover, configure and run AI bots.' },
      { label: 'Workspace', href: '/workspace', description: 'Save, chain and resume your agents.' },
      { label: 'Marketplace', href: '/marketplace', description: 'Buy bots, prompt packs and workflows.' },
      { label: 'Control Center', href: '/control-center', description: 'Observe runs, usage and health.' },
      { label: 'Workflows', href: '/workflows', description: 'Build and reuse multi-agent pipelines.' },
      { label: 'AI Studio', href: '/studio', description: 'Prototype prompts against the live API.' },
    ],
  },
  {
    label: 'Solutions',
    href: '/solutions',
    links: [
      { label: 'AI Assistants', href: '/solutions/ai-assistants', description: 'Role-based copilots.' },
      { label: 'Prompt Packs', href: '/solutions/prompt-packs', description: 'Sellable prompt systems.' },
      { label: 'Workflow Automation', href: '/solutions/workflow-automation', description: 'Connect outputs to your tools.' },
      { label: 'UX Audit Agents', href: '/solutions/ux-audit-agents', description: 'Turn findings into actions.' },
      { label: 'Development Bots', href: '/solutions/development-bots', description: 'Ship code review and build help.' },
      { label: 'All Solutions', href: '/solutions' },
    ],
  },
  {
    label: 'Industries',
    href: '/industries',
    links: [
      { label: 'Real Estate AI', href: '/industries/real-estate' },
      { label: 'Marketing AI', href: '/industries/marketing' },
      { label: 'Education AI', href: '/industries/education' },
      { label: 'All Industries', href: '/industries' },
    ],
  },
  {
    label: 'Resources',
    href: '/knowledge',
    links: [
      { label: 'Knowledge Universe', href: '/knowledge', description: 'Learn the concepts, then run them.' },
      { label: 'Scenarios', href: '/scenarios', description: 'Worked end-to-end examples.' },
      { label: 'FAQ', href: '/faq', description: 'Common questions, answered.' },
    ],
  },
  {
    label: 'Pricing',
    href: '/pricing',
    links: [{ label: 'Pricing', href: '/pricing' }],
  },
  {
    label: 'Company',
    href: '/about',
    links: [
      { label: 'About', href: '/about' },
      { label: 'Contact', href: '/contact' },
    ],
  },
];

/* ------------------------------------------------------------------ *
 * Auth entry points (PB-023/024) — wired to the header CTAs.
 * ------------------------------------------------------------------ */
export const authLinks = {
  signIn: { label: 'Sign in', href: '/login' } as NavLink,
  getStarted: { label: 'Get started', href: '/signup' } as NavLink,
};

/* ------------------------------------------------------------------ *
 * Footer columns (PB-002). Mirrors the primary taxonomy plus a Legal
 * column that is intentionally absent from the top-level nav.
 * ------------------------------------------------------------------ */
export const footerColumns: NavGroup[] = [
  { label: 'Product', links: primaryNav[0].links },
  { label: 'Solutions', links: primaryNav[1].links },
  { label: 'Industries', links: primaryNav[2].links },
  { label: 'Resources', links: primaryNav[3].links },
  {
    label: 'Company',
    links: [
      { label: 'About', href: '/about' },
      { label: 'Contact', href: '/contact' },
      { label: 'Pricing', href: '/pricing' },
    ],
  },
  {
    label: 'Legal',
    links: [
      { label: 'Privacy', href: '/privacy' },
      { label: 'Terms', href: '/terms' },
      { label: 'Imprint', href: '/imprint' },
    ],
  },
];

export const socialLinks: NavLink[] = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/', external: true },
  { label: 'GitHub', href: 'https://github.com/', external: true },
  { label: 'X', href: 'https://x.com/', external: true },
];

/** Home-page section anchors, used by the scrollspy sub-nav (PB-007). */
export const homeAnchors: NavLink[] = [
  { label: 'Top', href: '/#top' },
  { label: 'Solutions', href: '/#solutions' },
  { label: 'AI Studio', href: '/#ai-studio' },
  { label: 'OpenAI API', href: '/#openai-api' },
  { label: 'Contact', href: '/#contact' },
];

/** Quick-launch destinations surfaced in the mobile drawer. */
export const quickLaunch: NavLink[] = [
  { label: 'Open Bot Lab', href: '/bots' },
  { label: 'Launch Workspace', href: '/workspace' },
  { label: 'View Marketplace', href: '/marketplace' },
  { label: 'Control Center', href: '/control-center' },
];

export const siteMeta = {
  name: 'ProBotica',
  tagline: 'AI Operating Systems',
  location: 'Vienna, Austria',
  locale: 'en',
};

/** Flat list of all internal nav destinations — handy for sitemap generation (PB-018). */
export const allNavLinks: NavLink[] = [
  ...primaryNav.flatMap((g) => g.links),
  ...footerColumns.flatMap((g) => g.links),
].filter((l) => !l.external);
