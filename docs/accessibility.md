# Accessibility

Persona: **Mara** — uses a screen reader and/or is motion-sensitive, may be on a low-end mobile. ProBotica's accessibility is a product feature with its own menu (`components/layout/ThemeAccessibilityMenu.tsx`) and provider (`components/providers/AccessibilityProvider.tsx`), backed by `lib/accessibility/`.

## Current state

- `lib/accessibility/accessibility-modes.ts` defines modes; `accessibility-storage.ts` persists the user's choice.
- **~5 of 14 modes implemented** (PB-035). Target: all 14 modes + font scaling + contrast-safe focus ring, verified to **WCAG 2.1 AA**.

## Target capabilities (the 14-mode goal)

Reduced motion, high contrast, font scaling, dyslexia-friendly font, increased letter/line spacing, link underlining, focus-ring emphasis, reduced transparency, large click targets, color-blind-safe palettes, "calm mode" (kills grain/shaders/cursor), keyboard-only affordances, and reading-guide/spotlight — finalize the exact 14 in `accessibility-modes.ts`.

## Hard rules (apply to every change)

1. **Keyboard**: everything operable without a mouse; logical tab order; focus traps in menus/drawers/dialogs with ESC to close; skip-to-content link.
2. **Visible focus**: a contrast-safe focus ring that motion/overlays never obscure.
3. **Semantics**: correct landmarks (`header`/`nav`/`main`/`footer`), headings in order, ARIA only where native semantics fall short, accessible names on icon buttons (lucide icons need labels).
4. **Reduced motion**: honor `prefers-reduced-motion` *and* the in-app toggle; static fallbacks for all GSAP/R3F/cursor effects.
5. **Contrast**: AA contrast in every theme; never rely on color alone (e.g. difficulty badges also carry text).
6. **Forms**: labels, error messages tied via `aria-describedby`, no placeholder-as-label.
7. **Media/3D**: shaders and decorative canvases are `aria-hidden`; meaningful images have alt text.
8. **Live regions**: AI runs, search results, and toasts announce via polite live regions.

## Testing

- `axe` smoke pass on every new/changed route (PB-001 acceptance criteria already require this for the header).
- Manual: keyboard-only walkthrough, screen-reader pass (VoiceOver), 200% zoom, 360px width, reduced-motion on.
- Knowledge content: ensure reading order, TOC links, and code blocks are screen-reader friendly.

Accessibility stories live under the **A11y & Inclusion** epic in [`stories/`](./stories/README.md).
