# ADR 0001 — Design-system & brand-color audit

- **Status:** Accepted
- **Date:** 2026-06-17
- **Scope (PB / task #54):** Audit the token system in `apps/web/app/globals.css`,
  document the palette and its WCAG contrast behavior, and fix only clear bugs
  (failing contrast, duplicate/conflicting tokens). No broad visual restyling —
  a bolder art-direction pass is deliberately out of scope (see Recommendations).

## Context

All design tokens live as CSS custom properties in `app/globals.css`:
`:root` (dark, the default) and `[data-theme="light"]`, plus accessibility
overrides (`[data-contrast="high"]`, `[data-color-mode="colorblind-safe"]`,
`[data-transparency="reduced"]`). The system is well-organized — named z-index
ladder, 6-step surface elevation, spacing/radius scales, motion tokens — but it
grew organically and had drifted in a few places. This ADR records the audit and
the surgical fixes applied.

## Token inventory (what exists)

| Group | Tokens | Notes |
| --- | --- | --- |
| Z-index | `--z-below … --z-cursor` (12 steps) | Single named ladder (PB-027). Good — components should reference these, never magic numbers. |
| Core palette | `--background`, `--foreground`, `--muted`, `--muted-foreground`, `--surface*`, `--border*`, `--primary`, `--secondary`, `--accent`, `--success/warning/danger/info` | Theme-aware. |
| Semantic status | `--status-online/-warning/-error/-idle/-active` (+ `--status-warn` alias, added) | Now aliased to the brand palette (see Decisions). |
| Surface elevation | `--surface-0 … --surface-5` | 6 levels, both themes. |
| Panel / HUD / Telemetry | `--panel-*`, `--hud-*`, `--telemetry-*`, `--runtime-*` | The "tactical" visual language. |
| Spacing | `--space-1 … --space-24` (12 steps) | 4px base. |
| Radius | `--radius-sm … --radius-2xl`, `--radius-pill` | |
| Layout | `--sidebar-width`, `--topbar-height`, `--content-max`, `--panel-max` | |
| Effects | `--glow*`, `--glass`, `--shadow*`, `--focus-ring`, grain/noise | |
| Neon accents | `--neon-cyan/violet/lime/orange/pink` | Used as **text** (tags, stats, category labels) and as glow/border bases. |
| Motion | `--duration-fast/base/slow`, `--ease-out-expo`, `--ease-spring` | Mirrors `lib/motion/`. |
| Typography | (loaded in `app/layout.tsx`) `--font-display` Syne, `--font-body` Inter, `--font-mono` JetBrains Mono | |

## WCAG contrast findings

Ratios computed against the realistic backgrounds (dark `#040506` / surface-1
`#080b10`; light `#eef2f7` / card `~#f3f7fe`). Target: **AA 4.5:1** for normal
text, **3:1** for large/UI.

### Dark theme — healthy

| Pair | Ratio | Verdict |
| --- | --- | --- |
| foreground on bg | 15.4 | AA |
| muted-foreground on bg / surface-1 | 7.2 / 7.0 | AA |
| primary, secondary, accent as text | 15.9 / 9.1 / 9.1 | AA |
| success / warning / danger / info as text | 12.5 / 13.6 / 9.4 / 11.5 | AA |
| primary-foreground on primary (button) | 16.0 | AA |
| neon-cyan / neon-lime as text | 15.9 / 17.1 | AA |
| **telemetry-dim on surface-1** | **2.5** | **FAIL → fixed** |

### Light theme — multiple failures (now fixed)

| Pair | Before | After | Verdict |
| --- | --- | --- | --- |
| foreground / muted-foreground | 16.2 / 6.3 | — | AA (unchanged) |
| primary / secondary / accent as text | 5.0 / 5.0 / 5.3 | — | AA (unchanged) |
| primary-foreground on primary (button) | 5.3 | — | AA (unchanged) |
| **neon-cyan as text** | **1.15** | **~5.0** | fixed (`#0e7490`) |
| **neon-lime as text** | **1.06** | **~6.3** | fixed (`#3f6212`) |
| **neon-violet / orange / pink as text** | 1.1–2.x | 4.5–6.6 | fixed |
| **success as text** | **1.45** | **~4.9** | fixed (`#047857`) |
| **warning as text** | **1.33** | **~4.6** | fixed (`#854d0e`) |
| **danger / info as text** | 2.x | 5.6 / 4.6 | fixed (`#be123c` / `#2563eb`) |
| **telemetry-dim** | **~2.7** | **~4.7** | fixed |

## Inconsistencies & bugs found

1. **`--status-warn` was never defined** but referenced in 9 places
   (`workflows/page.tsx`, `workflows/[id]/page.tsx`, `scenarios/*`,
   `WorkflowBuilder.tsx`) for medium-risk chips, the analysis lane, and
   queued/fallback statuses → those elements rendered with no/inherited color.
   **Real bug.**
2. **Semantic status tokens were hardcoded duplicates** of the brand palette
   (`--status-online` = `--success` = `#7dddb4`, etc.) **but were not covered by
   the `colorblind-safe` override**, which only re-maps `--success/-warning/
   -danger/-info`. So in colorblind-safe mode, status dots/telemetry text kept
   the non-CVD colors — a silent divergence.
3. **Neon accents used as text had no light-mode variant** → systemic light-mode
   contrast failures on solution/industry/category cards and the AI Studio
   section (neon as tag/stat/label text on near-white).
4. **Semantic status colors had no light-mode variant** → success/warning/danger
   as text (telemetry values, metric deltas, complexity chips) failed AA on light.
5. **`telemetry-dim` failed AA** in both themes (decorative-but-real micro-labels:
   locale code, edge labels, error-page meta).
6. **Near-duplicate hues (cosmetic, left as-is):** `--primary #91f2ff` vs
   `--neon-cyan #89f2ff`; `--accent #be9bff` vs `--neon-violet #b092ff`. Two
   barely-different cyans/violets. Not a bug; flagged for a future consolidation.

## Decisions (changes applied — token-level only)

All edits are in `app/globals.css`; no component files were touched, so the fixes
propagate everywhere the tokens are used.

1. **Define `--status-warn: var(--warning)`** — fixes the 9 colorless usages
   without editing 9 files.
2. **Alias status tokens to the brand palette** — `--status-online: var(--success)`,
   `--status-warning: var(--warning)`, `--status-error: var(--danger)`,
   `--status-idle: var(--muted-foreground)`, `--status-active: var(--primary)`.
   Dedups, and lets colorblind-safe / theme overrides flow through. Removed the
   now-redundant `--status-active` hardcode in the light block.
3. **Light-mode semantic status variants** — `--success #047857`,
   `--warning #854d0e`, `--danger #be123c`, `--info #2563eb` (all AA as text on
   light; status dots stay legible).
4. **Light-mode neon variants** — `--neon-cyan #0e7490`, `--neon-violet #6d28d9`,
   `--neon-lime #3f6212`, `--neon-orange #92400e`, `--neon-pink #be185d`
   (hue-true, AA as text; `--color-acid` inherits the fixed lime, which also
   improves knowledge eyebrows in light mode).
5. **`telemetry-dim` opacity** — dark `0.5 → 0.78`, light `0.7 → 0.92` (≈4.6–4.7:1).

## Recommendations (deferred — not done here)

- **Make `colorblind-safe` overrides theme-aware.** They're applied globally, so
  in *light + colorblind-safe* the CVD warning (`#b78300`, ~3.0:1) and the CVD
  palette generally aren't tuned for light backgrounds. Split into
  `[data-theme="light"][data-color-mode="colorblind-safe"]`.
- **Consolidate the duplicate hues** (`--primary`/`--neon-cyan`,
  `--accent`/`--neon-violet`) into one source each, or document why two exist.
- **Lint for undefined `var(--token)`** in CI to catch the next `--status-warn`.
- **z-index / motion**: the ladders exist; finish migrating any remaining
  hardcoded `z-index`/durations onto the tokens (PB-027).
- A bolder **art-direction** pass (new palette, gradients, surfaces, glows) was
  explicitly out of scope for this audit; revisit as a separate, review-heavy task.

## Verification

`pnpm typecheck` and `pnpm build` pass after the changes. Contrast ratios above
were computed with the WCAG 2.x relative-luminance formula against composited
(alpha-flattened) colors.
