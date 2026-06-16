# Design System & Motion

ProBotica's look is **cinematic editorial**: glass cards, animated grain/noise, dynamic gradients, scanline overlays, a custom magnetic cursor, GSAP scroll reveals, and a sticky horizontal-scroll agent showcase. The bar is "premium and alive" — but never at the cost of performance, accessibility, or honesty.

## Tokens

- Source: `app/globals.css` (Tailwind v4 via `@tailwindcss/postcss`).
- **Color/theme** via `next-themes` (`components/providers/ThemeProvider.tsx`).
- **z-index**: introduce and use a **token scale** (PB-027). No hardcoded `9999` in header/menu/overlay/cursor layers.
- **Motion tokens**: cursor/shader/scroll-reveal timings should be driven by tokens in `lib/motion/` (`easings.ts`, `transitions.ts`), not inline magic numbers (PB-036).
- **Layout primitives**: `ContentPage`, `SectionHeader` (to be extracted, PB-029) replace the 40–53 inline style blocks per page. Prefer primitives.

## Motion layer

| Piece | Where | Notes |
| --- | --- | --- |
| Custom cursor | `components/motion/CustomCursor.tsx`, `CursorProvider.tsx` | Magnetic-style; must hide/disable on touch + reduced motion |
| Scroll reveal | `components/motion/ScrollReveal.tsx` | GSAP ScrollTrigger text/card reveals |
| Horizontal agents | `components/sections/HorizontalAgents.tsx` | Pinned horizontal scroll showcase |
| Shader field | `components/visual/ShaderField.tsx` | R3F/Three background; perf-gate on low-end devices |
| Home FX | `components/layout/HomeClientFx.tsx` | Client-only orchestration of home effects |
| Grain/noise | global overlay | Subtle texture; keep GPU-cheap |

## Non-negotiables

1. **Reduced motion**: every animated component checks `prefers-reduced-motion` and the `AccessibilityProvider`, and renders a calm static fallback. The README already promises this — keep the promise.
2. **Performance budget**: target CLS < 0.1 on route transitions (skeletons, PB-017), no jank from shaders on mid-tier hardware, lazy-load 3D, respect data-saver where possible.
3. **Touch & mobile**: custom cursor and pinned scroll must gracefully no-op or adapt down to 360px.
4. **Focus visibility**: motion must never hide the focus ring; provide a contrast-safe focus indicator.

## Components catalog (shared)

- `layout/`: `Header`, `AppShell`, `FullscreenMenu`, `ThemeAccessibilityMenu`, `RuntimeBreadcrumbs`, `HomeClientFx`, `PageShell` (dead — delete, PB-028).
- `sections/`: `Hero`, `Solutions`, `AiStudio`, `HorizontalAgents`, `Contact`.
- `motion/`: `CustomCursor`, `CursorProvider`, `ScrollReveal`.
- `ai/`: `AiDemoPanel`. `visual/`: `ShaderField`. `command/`: `CommandPalette`.
- `providers/`: `ThemeProvider`, `AccessibilityProvider`.

## Design hygiene rules

- New visual states reuse tokens + primitives; don't add a fourth header or a new inline-style island.
- Keep the marketing header and the app topbar **visually unified** (PB-008).
- Every interactive surface has hover / focus / active / disabled / loading / empty / error states designed, not just the happy path.
