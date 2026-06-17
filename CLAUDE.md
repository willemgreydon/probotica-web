# CLAUDE.md — ProBotica operating manual

This file is auto-loaded into Claude's context. It is the **entry point**; deeper detail lives in [`docs/`](./docs/README.md).

## What this is

**probotica.at** is an AI platform with two faces:

1. **A product** — sellable AI bots, prompt packs, workflow automation, and a workspace where customers run and chain agents (`/bots`, `/workspace`, `/marketplace`, `/control-center`, `/workflows`, `/scenarios`).
2. **An educator** — the *Knowledge Universe* (`/knowledge`): a structured, didactic library that teaches AI concepts (topics → articles → glossary → learning paths → concept graph). This is a first-class surface, not an afterthought.

The thesis: **teach the concept, then let the user run the concept.** Education and product are meant to reinforce each other.

## Stack (verify before assuming versions)

- **Next.js (App Router)** + React, strict TypeScript — single app at `apps/web` (`@probotica/web`).
- **Monorepo**: pnpm workspaces + Turbo (`turbo.json`). Workspace glob: `apps/*`, `packages/*` (no packages yet).
- **Styling**: Tailwind (v4 via `@tailwindcss/postcss`), tokens in `app/globals.css`.
- **Motion**: GSAP + `@gsap/react` (ScrollTrigger, pinned horizontal scroll), Framer Motion, custom cursor.
- **3D / shaders**: `three`, `@react-three/fiber`, `@react-three/drei` (`components/visual/ShaderField.tsx`).
- **Theming**: `next-themes`. **Validation**: `zod`. **Icons**: `lucide-react`.
- **AI**: `openai` SDK via `lib/ai/openai.ts`. Live AI needs `OPENAI_API_KEY`; without it a **demo fallback** stays usable — never break the no-key path.

## Commands

```bash
pnpm install
cp .env.example .env.local      # set OPENAI_API_KEY for live AI (optional)
pnpm dev                        # turbo dev  -> http://localhost:3000
pnpm build                      # turbo build
pnpm lint                       # turbo lint  (next lint)
pnpm typecheck                  # turbo typecheck (tsc --noEmit)
```

**Before claiming a change works**: run `pnpm typecheck` and `pnpm build`. The repo is currently **not under git** — do not assume version control history exists.

## Architecture in one breath

`app/` = routing only (thin). Real logic lives in **`features/<domain>/`**, each with `components/`, `lib/`, `data/`. Shared cross-cutting UI is in `components/` (`layout/`, `sections/`, `motion/`, `ai/`, `visual/`, `providers/`, `command/`). Cross-cutting utilities in `lib/` (`ai/`, `accessibility/`, `config/`, `motion/`, `content/`).

Domains: `bots`, `workspace`, `marketplace`, `runtime`, `workflows`, `knowledge`, `memory`, `navigation`. See [`docs/architecture.md`](./docs/architecture.md).

## Conventions (do as the codebase does)

- Use the `@/` import alias for `apps/web` root. Keep `app/*` files thin; push logic into `features/`.
- Data is **typed and centralized**: every domain has a `lib/*-types.ts` (single source of truth) and a `data/*.ts`. Content types are deliberately shaped to migrate to a CMS (Sanity/MDX) later — preserve that shape.
- Server vs client: AI/route handlers are `runtime = 'nodejs'`. Mark client components `'use client'`. `*.server.ts` denotes server-only data.
- **Always honor `prefers-reduced-motion`** and the accessibility provider. Motion is a feature, never a barrier.
- Respect the **no-key AI fallback** in any AI-touching change.
- Full list: [`docs/conventions.md`](./docs/conventions.md).

## Known truths & active roadmap (don't re-discover these)

The roadmap CSVs at repo root (`probotica-*.csv`, importable to Notion) track engineering work PB-001…PB-037. What has **shipped** and what **remains**:

Shipped (don't re-discover or re-plan these):
- **Route-group unification is done** — `app/(marketing)`, `app/(app)`, `app/(auth)` each have a `layout.tsx`; one `SiteHeader`/`SiteFooter` (marketing) + `AppShell` (app). The old "3 header systems" problem is resolved.
- **DE/EN i18n** — cookie `probotica-locale`; `lib/i18n/{config,dictionaries,server}.ts`; client `useT()` (`LocaleProvider`), server `getServerT()`/`getServerLocale()`. Marketing chrome + bodies are bilingual; knowledge **article bodies** are still EN-only.
- **Mock auth + client persistence** — `AuthProvider` (test account, localStorage `probotica-auth`); `/login` `/signup` `/account`; workspaces persist to `probotica.workspace.records.v1` (+ `/workspaces` overview, ZIP export); knowledge progress to `probotica-knowledge-progress`.
- **Nav SSOT is `lib/content/navigation.ts`** (`lib/content/site.ts` is now dead). Syne display font + single-emblem `.brand-emblem`/`.brand-wordmark` lockup. Motion tokens in `lib/motion/`.

Still open:
- **Search is fragmented** across bots/workflows/scenarios/knowledge (unify later).
- **Control Center telemetry is synthetic** (sine-wave placeholders), not real usage data.
- **No backend** — all persistence is client-side and device-local; can be lost (server persistence still roadmap, PB-031).
- **Accessibility modes**: the model is rich (14 visual modes + font/density/motion/transparency axes in `lib/accessibility/accessibility-modes.ts`, key `probotica-a11y-preferences`), but `globals.css` only styles a subset of the data-attributes — CSS coverage is the gap (PB-035).
- Dead code: `components/layout/PageShell.tsx` (0 importers); some hardcoded z-index values remain (PB-027).

When you touch these areas, prefer the direction set in the roadmap rather than inventing a parallel approach.

## User stories

The product-quality backlog (education, usability, delight, trust, a11y) lives in [`docs/stories/`](./docs/stories/README.md) and as a Notion CSV at `probotica-stories-godtier.csv`. Use the **personas** and **INVEST** framing defined there for any new feature work.

## Docs map

[`docs/README.md`](./docs/README.md) is the table of contents. Skim it before large changes.
