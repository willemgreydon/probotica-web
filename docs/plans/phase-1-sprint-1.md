# Phase 1 · Sprint 1 — Navigation & Shell Unification

> Status: **done** (completed 2026-06-16) — typecheck + build green; all marketing routes on the shared shell.
> Source of truth: Notion **ProBotica | Task List** (PB-001 … PB-037).
> Scope of this plan: the Sprint-1 cut of **Phase 1 — Foundation**.

## Why this sprint

Three known structural defects block everything else (see `CLAUDE.md` → *Known truths*):

1. **3 different header systems** and ~17 pages render with **no navigation chrome** (dead-end pages).
2. **Navigation is duplicated** across a sprawling `lib/content/site.ts` (8 groups / 46 links) plus a separate `AppShell` nav and home `homeAnchors`.
3. **System pages are missing/unstyled** (no branded 404), and stacking is governed by **hardcoded z-index** values.

The fix is a **route-group unification**: one typed nav model feeds one marketing shell (`SiteHeader` + `SiteFooter`), applied to every public route via an `app/(marketing)` route group. URLs do not change.

## Scope (this sprint)

| PB | Task | Why it's in this cut |
| --- | --- | --- |
| PB-010 | Typed navigation source of truth (`lib/content/navigation.ts`) | Dependency root — everything consumes it |
| PB-013 | Define top-level nav model (6-item taxonomy) | Shapes PB-010 |
| PB-027 | z-index token scale | Header/footer/overlays need tokens, not magic numbers |
| PB-001 | `SiteHeader` (marketing) | The one public header |
| PB-002 | `SiteFooter` | The one public footer (replaces hardcoded home footer) |
| PB-003 | `app/(marketing)/layout.tsx` | Applies the shell |
| PB-015 | Branded 404 (`app/not-found.tsx`) | No more unstyled dead-ends |
| PB-005 | Migrate marketing/content/legal routes into `(marketing)` | Fixes the ~17 chrome-less pages |
| PB-007 | Refactor home onto the marketing shell | Removes bespoke `Header` (header system #1) |
| PB-023/024/025 | login / signup / pricing placeholders | Pulled forward so the new nav has **no dead links** (`Sign in`, `Get started`, `Pricing`) |
| PB-030 | Verify: typecheck, build, route walkthrough | Definition of done |

**Deferred to later in Phase 1 / Sprint 2** (not this cut): `(app)` group migration (PB-004/006), AppShell topbar alignment (PB-008), mobile drawer polish (PB-009), Shop→Marketplace merge + redirects (PB-011/014), facets (PB-012), error boundaries / loading / sitemap / robots / OG (PB-016–020), breadcrumbs on marketing (PB-021), studio demo (PB-022), account stub (PB-026), inline-style extraction (PB-028/029).

## Dependency-ordered execution

```
PB-010 ── PB-013        (nav model: source of truth + taxonomy)
   │
   ├── PB-027            (z-index tokens — independent, done early)
   │
   ├── PB-001 SiteHeader ─┐
   ├── PB-002 SiteFooter ─┼── PB-003 (marketing) layout ── PB-015 404
   │                      │
   └── PB-023/024/025 (login/signup/pricing) keeps nav links live
                          │
                          └── PB-005 migrate routes ── PB-007 home onto shell
                                              │
                                              └── PB-030 verify (typecheck + build)
```

## Design decisions

- **One nav model, additive migration.** `lib/content/navigation.ts` becomes canonical. `lib/content/site.ts` is kept temporarily so `FullscreenMenu`/`AppShell` keep building; they migrate onto the new model as their tasks come up. No big-bang rename.
- **Route groups don't change URLs.** Moving `app/about` → `app/(marketing)/about` keeps `/about`. All internal imports use the `@/` alias, so moves don't break imports.
- **`(app)` product routes stay put this sprint.** Route groups are independent; the marketing group can land without touching the product shell.
- **No dead links.** The new header exposes `Pricing`, `Sign in`, `Get started`; we ship minimal `/pricing`, `/login`, `/signup` placeholders so the IA is fully walkable.
- **Accessibility & motion preserved.** Reuse `ThemeAccessibilityMenu`; honor `prefers-reduced-motion`; keep the skip-link; keyboard-accessible dropdowns + focus-trapped mobile drawer.

## Top-level taxonomy (PB-013)

`Product · Solutions · Industries · Resources · Pricing · Company` — **Legal lives in the footer**.

## Definition of done (PB-030)

- `pnpm typecheck` and `pnpm build` pass.
- Every marketing route renders `SiteHeader` + `SiteFooter`.
- Home no longer uses the bespoke `Header`; its hardcoded footer is gone.
- Unknown routes render the branded 404.
- No broken links in the primary nav or footer.

## Stories

User-story form of this work lives in [`../stories/sprint-1-navigation-shell.md`](../stories/sprint-1-navigation-shell.md).
