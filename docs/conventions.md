# Conventions

Move *with* the grain of the codebase. When in doubt, copy the nearest existing pattern.

## Project structure rules

- **`app/` is for routing only.** Page files stay thin: import a feature component, pass data, set metadata. Business logic, state, and complex UI belong in `features/<domain>/`.
- **One domain, one folder.** A new domain gets `features/<domain>/{components,lib,data}`. Don't scatter a feature across `components/` and `lib/` root unless it is genuinely cross-cutting.
- **`components/` is for shared/cross-cutting UI only** (layout, sections, motion, providers, visual, ai, command).

## Types & content-as-data

- Every domain has a **`lib/<domain>-types.ts` = single source of truth** for its data shapes. Add fields there first.
- Content lives in **`data/*.ts`** as typed literals. Keep it shaped so it could move to **Sanity/MDX** later (the knowledge types call this out explicitly). Don't inline ad-hoc content shapes in components.
- `*.server.ts` = server-only module (e.g. `imported-bots.server.ts`). Never import it into a client component.
- Use **`zod`** for runtime validation at boundaries (API input, AI output).

## Imports

- Use the **`@/` alias** for the `apps/web` root (e.g. `@/lib/ai/openai`, `@/features/bots/...`).
- Group: external packages → `@/` aliases → relative. Match neighboring files.

## Server vs client

- Default to **Server Components**. Add `'use client'` only when you need interactivity, browser APIs, GSAP/Framer/R3F, or hooks.
- API and AI route handlers: `export const runtime = 'nodejs';`.
- Keep client bundles lean — heavy 3D/motion imports stay in client-only leaf components.

## i18n (DE/EN)

- One dictionary in `lib/i18n/dictionaries.ts`; locale resolves from the `probotica-locale` cookie (default `en`).
- **Server components** read copy via `getServerT()` / `getServerLocale()` (`lib/i18n/server.ts`) — the page becomes `async`.
- **Client components** use `useT()` from `LocaleProvider`. Never hardcode user-facing strings; add a key to the dictionary instead.

## AI code (hard rules)

- All AI goes through `lib/ai/openai.ts` (`runStructuredAI` and friends). Don't call the OpenAI SDK directly from routes/components.
- **The no-key path must always work.** If `OPENAI_API_KEY` is missing, return the demo fallback — never throw a blank screen.
- Clamp/limit user input (existing routes slice input, e.g. `.slice(0, 6000)`).
- Surface each bot's **`safetyNotes`** in the UI; respect GDPR/"no training on user data" messaging.

## Accessibility & motion (hard rules)

- Honor **`prefers-reduced-motion`** and the `AccessibilityProvider` everywhere motion appears.
- All interactive elements: keyboard-reachable, visible focus ring, correct roles/labels. Target **WCAG 2.1 AA**.
- Motion is additive delight, never a gate to content or function.

## Styling

- Tailwind (v4) utility-first; design tokens in `app/globals.css`. Prefer tokens over magic numbers.
- Use the **motion tokens** in `lib/motion/` (`easings.ts`, `transitions.ts`) instead of inline durations; use the z-index token scale once introduced (PB-027) — avoid hardcoded `z-9999`.
- Reuse the page-level `shell-x` utility (`app/globals.css`) for gutters instead of repeating inline style blocks; shared `ContentPage`/`SectionHeader` primitives are not extracted yet (PB-029).

## Naming

- Components `PascalCase.tsx`; libs/data `kebab-case.ts`; types `*-types.ts`; route segments lowercase, dynamic as `[slug]`/`[id]`.
- Bot/knowledge slugs are kebab-case and **stable** (they're URLs and cross-link keys).

## Definition of done

1. `pnpm typecheck` clean. 2. `pnpm build` green. 3. `pnpm lint` clean. 4. Every touched route still renders nav chrome. 5. Reduced-motion + keyboard smoke-checked. 6. No-key AI path verified if AI touched. 7. No new dead code / hardcoded tokens.
