# Phase 3 — Hardening

> Status: **planned** · Gated on Phase 1 (PB-030); informed by Phase 2 telemetry (PB-034).
> PB tasks: PB-035 (Accessibility), PB-036 (Motion Tokens), PB-037 (Content Hub).
> Stories: SE9, SE10, SE12, SE15, SE16, SE19.

## Why this phase

With foundations and product depth in place, Phase 3 makes ProBotica **inclusive, polished, and
discoverable** — the difference between "works" and "godtier". It pays down the accessibility and
design-system debt called out in `CLAUDE.md` and opens an organic growth channel.

## Workstreams

### E11 · Accessibility (PB-035) — *highest priority*
Today ~5 of 14 accessibility modes are implemented. Bring it to 14/14 and verify WCAG AA.

- Implement remaining modes via the existing `data-*` attribute system on `<html>`
  (`data-contrast`, `data-motion`, `data-transparency`, `data-reading`, `data-color-mode`).
- **Font scaling**, **contrast-safe focus ring**, full keyboard paths, screen-reader labels.
- Add an **`axe` smoke check** to the QA gate (extend the PB-030 verification pattern).
- Acceptance: 14/14 modes; WCAG AA verified; font scaling works; contrast-safe focus ring.

### E12 · Motion Tokens (PB-036)
- Move hardcoded cursor/shader/scroll-reveal timings into **motion tokens** (`--duration-*`,
  `--ease-*` already exist in `globals.css` — extend and adopt everywhere).
- Every animation must honor `prefers-reduced-motion` and the accessibility provider.
- Acceptance: 0 hardcoded motion durations in the cursor/shader/scroll layers; reduced-motion honored.

### E13 · Content Hub & SEO (PB-037, with PB-018/019/020)
- Blog + case-studies hub with **CMS-ready structure** (mirror the knowledge content-model shape).
- Per-route **Open Graph** images (PB-020), **sitemap** (PB-018) and **robots** (PB-019) — some of
  these may already land late in Phase 1; finish the full set here.
- Schema.org structured data (reuse the `buildArticleSchema` pattern from knowledge).
- Acceptance: blog + case studies live, CMS-ready, per-route OG, indexed in sitemap.

## Carry-over polish (from Phase 1/2)

- **Skeletons & loading** (PB-017) and **error boundaries** (PB-016) across app routes.
- **Mobile** (SE16): every surface first-class on 360–768px; touch targets ≥44px; the app sidebar
  overlap fix (done in Sprint 1) is the pattern — verify no other inline overrides remain.
- **Localization** (SE15): de-AT-first content + i18n scaffolding for the DACH market.

## Dependency order

```
PB-035 a11y modes ── (independent, start first)
PB-036 motion tokens ── (independent; coordinate with reduced-motion in PB-035)
PB-037 content hub ── builds on PB-018/019/020 (sitemap/robots/OG)
```

## Definition of done (M4)

- 14/14 accessibility modes; WCAG AA verified on audited flows; keyboard-only walkthrough passes.
- Motion fully tokenized; reduced-motion respected everywhere.
- Blog + case-studies hub live with per-route OG, sitemap, robots, and schema.org.
- Core Web Vitals green (LCP/CLS/INP); `pnpm typecheck` + `pnpm build` green.

## Risks specific to Phase 3

- **A11y regressions** elsewhere: bake the `axe` smoke into CI/QA so new pages can't regress.
- **Motion token migration** is broad: do it per-layer (cursor → shader → scroll-reveal) with visual
  QA at each step; never change behavior, only source of timing values.
- **Content hub maintenance**: keep it CMS-ready (typed `data/*` + `lib/*-types.ts`) so a later
  Sanity/MDX migration is mechanical (SE20 Admin & Content Ops).
