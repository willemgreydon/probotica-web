# Routing & Navigation

## Current routes

**Marketing/content/legal** (`app/(marketing)`): `/` (home), `/solutions` (+ `/solutions/*`), `/industries` (+ `/industries/[…]`), `/about`, `/contact`, `/faq`, `/pricing`, `/shop`, `/knowledge` (+ `/[slug]`, `/category/[category]`, `/path/[slug]`), `/studio`, `/privacy`, `/terms`, `/imprint`.

**Product** (`app/(app)`): `/bots` (+ `/[slug]`), `/workspaces`, `/workspace` (+ `/[workspaceId]`), `/marketplace`, `/control-center`, `/workflows` (+ `/[id]`), `/scenarios` (+ `/[scenarioId]`), `/categories/[category]`.

**Auth/account** (`app/(auth)`): `/login`, `/signup`, `/account`.

**API**: `/api/ai/{lead-qualifier,ux-audit,content-studio}`, `/api/bots/{metadata,test}`, `/api/workflows/run`.

## Route groups (Phase 1, PB-001…PB-009 — shipped)

The App Router **route groups** are in place; the old three-header split is gone. One header system wraps the whole site:

```
app/
├─ (marketing)/layout.tsx   # SiteHeader + SiteFooter wrap ALL public pages
│   └─ home, solutions, industries, about, contact, faq,
│      knowledge, studio, pricing, shop, legal…
├─ (app)/layout.tsx         # AppShell wraps ALL product pages
│   └─ bots, workspaces, workspace, marketplace, control-center,
│      scenarios, workflows, categories…
└─ (auth)/layout.tsx        # login (mock auth), signup, account
```

Route groups don't change URLs. Result: **one** header system sitewide, footer on every public page, no chrome-less dead-ends.

The layout primitives exist: `SiteHeader` (sticky, dropdowns, theme/a11y menu, `LanguageSwitch`, Sign in / Get started), `SiteFooter` (columns from the nav model + locale), mobile nav drawer (`FullscreenMenu`), `HomeSectionNav`, branded `not-found.tsx` (with `NotFoundSearch`), `error.tsx` / `global-error.tsx`, `loading.tsx` skeletons, `sitemap.ts`, `robots.ts`, and a default `opengraph-image.tsx`.

`/login` is functional against a test account via `AuthProvider` (`components/auth/LoginForm.tsx`); `/signup` renders but its submit is disabled ("coming soon"); `/account` is gated behind auth.

## Navigation model — single source of truth

Nav lives in the **typed `lib/content/navigation.ts`**, consumed by `SiteHeader`, `SiteFooter`, `FullscreenMenu`, `HomeSectionNav`, `sitemap.ts`, `not-found.tsx`, and `/pricing` — **no duplicated link lists anywhere**. The old `lib/content/site.ts` is dead (no importers) and can be removed.

**Top-level taxonomy (6 items)**: `Product` · `Solutions` · `Industries` · `Resources` · `Pricing` · `Company`. Legal lives in the footer. Categories & Scenarios are **facets/filters within Bots**, not top-level destinations (PB-012). `/shop` is its own standalone marketing page (DE/EN), separate from `/marketplace`.

When you add a destination: add it to the nav model once; header/footer/mobile/sitemap pick it up automatically. Never hardcode a second copy of a link list.

## Breadcrumbs & orientation

`components/layout/RuntimeBreadcrumbs.tsx` exists (app-only today). Extend breadcrumbs to deep marketing pages (PB-021); home excluded. Knowledge articles should also expose a table of contents (`KnowledgeTOC`) and prerequisite/related links for orientation.

## Redirects & SEO hygiene

`sitemap.ts` is generated from the nav model + dynamic routes (bots, knowledge, workflows, scenarios, industries) and `robots.ts` references it. Add 301s for any future retired/duplicate routes in `next.config.mjs` (none today — `/shop` is a real page, not a redirect).
