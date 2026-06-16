# Routing & Navigation

## Current routes

**Marketing/content/legal**: `/` (home), `/solutions` (+ `/solutions/*`), `/industries` (+ `/industries/[…]`), `/about`, `/contact`, `/faq`, `/knowledge` (+ `/[slug]`, `/category/[category]`), `/studio`, `/privacy`, `/terms`, `/imprint`. (`/pricing` is planned, PB-025.)

**Product**: `/bots` (+ `/[slug]`), `/workspace` (+ `/[workspaceId]`), `/marketplace`, `/shop` (legacy dup → redirect to `/marketplace`, PB-011), `/control-center`, `/workflows` (+ `/[id]`), `/scenarios/[scenarioId]`, `/categories/[category]`.

**API**: `/api/ai/{lead-qualifier,ux-audit,content-studio}`, `/api/bots/{metadata,test}`, `/api/workflows/run`.

## The route-group plan (Phase 1, PB-001…PB-009)

Today there are **three header systems** and ~17 pages with **no nav chrome**. The fix is App Router **route groups**:

```
app/
├─ (marketing)/layout.tsx   # SiteHeader + SiteFooter wrap ALL public pages
│   └─ home, solutions, industries, about, contact, faq,
│      knowledge, studio, pricing, legal…
├─ (app)/layout.tsx         # AppShell wraps ALL product pages
│   └─ bots, workspace, marketplace, control-center,
│      scenarios, workflows, categories…
└─ (auth)/                  # login, signup (UI-only placeholders, backend deferred)
```

Route groups don't change URLs. Goals: **one** header system sitewide, footer on 100% of pages, no chrome-less dead-ends.

New layout primitives to build: `SiteHeader` (sticky, dropdowns, theme/a11y menu, Sign in / Get started), `SiteFooter` (columns from nav model + newsletter/social/locale), mobile nav drawer (reuse `FullscreenMenu`), branded `not-found.tsx`, `error.tsx` / `global-error.tsx`, `loading.tsx` skeletons, `sitemap.ts`, `robots.ts`, default `opengraph-image`.

## Navigation model — single source of truth

Today nav lives in `lib/content/site.ts` (sprawling: ~8 groups / 46 links + compatibility exports). The plan (PB-010/PB-013) is a **typed `lib/content/navigation.ts`** consumed by header, footer, mobile menu, and sitemap — **no duplicated link lists anywhere**.

**Target top-level taxonomy (6 items)**: `Product` · `Solutions` · `Industries` · `Resources` · `Pricing` · `Company`. Legal moves to the footer. Categories & Scenarios become **facets/filters within Bots**, not top-level destinations (PB-012). `/shop` collapses into `/marketplace` (PB-011) with a 301 (PB-014).

When you add a destination: add it to the nav model once; header/footer/mobile/sitemap pick it up automatically. Never hardcode a second copy of a link list.

## Breadcrumbs & orientation

`components/layout/RuntimeBreadcrumbs.tsx` exists (app-only today). Extend breadcrumbs to deep marketing pages (PB-021); home excluded. Knowledge articles should also expose a table of contents (`KnowledgeTOC`) and prerequisite/related links for orientation.

## Redirects & SEO hygiene

Configure 301s for retired/duplicate routes in `next.config.mjs` (PB-014). Generate `sitemap.ts` from the nav model + dynamic routes (bots, knowledge, workflows, scenarios, industries) and a `robots.ts` referencing it.
