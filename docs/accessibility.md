# Accessibility

Persona: **Mara** — uses a screen reader and/or is motion-sensitive, may be on a low-end mobile. ProBotica's accessibility is a product feature with its own menu (`components/layout/ThemeAccessibilityMenu.tsx`) and provider (`components/providers/AccessibilityProvider.tsx`), backed by `lib/accessibility/`.

## Current state

- `lib/accessibility/accessibility-modes.ts` defines the taxonomy; `accessibility-storage.ts` loads/saves it and applies `data-*` attributes (init script avoids FOUC). Preferences persist to localStorage under `probotica-a11y-preferences` (`ACCESSIBILITY_STORAGE_KEY`).
- The model is **largely realized**, not a stub. `accessibility-modes.ts` ships **14 `AccessibilityVisualMode` values** (`default`, `high-contrast`, `soft-contrast`, `dark-high-contrast`, `light-high-contrast`, `monochrome`, `deuteranopia`, `protanopia`, `tritanopia`, `low-vision`, `dyslexia-friendly`, `focus-mode`, `reduced-motion`, `migraine-safe`), each with a human label in `VISUAL_MODE_BADGES`, **plus four independent axes** — `FontScale`, `DensityMode`, `MotionMode`, `TransparencyMode` — and five boolean toggles (`focusEnhancement`, `underlineLinks`, `reduceGlow`, `increaseBorders`, `simplifyInterface`).
- **CSS coverage is the remaining gap, not the taxonomy** (PB-035). The styled effects in `app/globals.css` currently key off the `AccessibilityProvider` attributes (`data-contrast`, `data-motion`, `data-transparency`, `data-reading`, `data-color-mode`) rather than the richer `data-a11y-mode`/`data-font-scale`/… dataset, so not every visual mode and axis yet has full CSS effect. Reconcile these two attribute systems and round out the per-mode styling, verified to **WCAG 2.1 AA**.

## The taxonomy (visual modes + axes)

- **14 visual modes** (the enum above): contrast variants, color-blind-safe palettes (deuteranopia/protanopia/tritanopia/monochrome), low-vision, dyslexia-friendly, focus-mode, reduced-motion, and migraine-safe ("calm" — tames grain/shaders/glow).
- **Separate axes** (not modes): `FontScale` (`normal`/`large`/`x-large`), `DensityMode` (`comfortable`/`compact`/`spacious`), `MotionMode` (`full`/`reduced`/`none`), `TransparencyMode` (`full`/`reduced`/`none`).
- **Boolean toggles**: focus-ring emphasis, link underlining, reduced glow, increased borders, simplified interface.

Still on the list regardless of taxonomy: large click targets, keyboard-only affordances, and a reading-guide/spotlight.

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
