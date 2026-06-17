# Architecture

## Monorepo

```
probotica-web-main/
├─ apps/web/                # the only app today — @probotica/web
├─ packages/                # (declared in workspace glob, none yet)
├─ turbo.json               # dev/build/lint/typecheck pipeline
├─ pnpm-workspace.yaml      # apps/*  packages/*
└─ *.csv                    # Notion-importable roadmap + stories
```

Turbo tasks: `dev` (persistent, uncached), `build` (depends on `^build`, caches `.next/**` minus cache), `lint`, `typecheck`. Global env passed through Turbo: `OPENAI_API_KEY`, `NEXT_PUBLIC_SITE_URL`, `CONTACT_EMAIL` (also `OPENAI_MODEL`, `OPENAI_TEMPERATURE` via `.env`).

## `apps/web` layout

```
apps/web/
├─ app/                     # App Router — ROUTING ONLY, keep thin
│  ├─ (marketing)/          # SiteHeader/SiteFooter shell (layout.tsx)
│  │  ├─ page.tsx           # home (unified header now)
│  │  └─ …                  # solutions, industries, about, contact, faq,
│  │                        #   knowledge, studio, pricing, privacy, terms, imprint
│  ├─ (app)/                # AppShell (layout.tsx)
│  │  └─ …                  # bots, workspace, marketplace, control-center,
│  │                        #   workflows, scenarios, categories, shop, account
│  ├─ (auth)/               # login, signup (layout.tsx)
│  └─ api/                  # route handlers (nodejs runtime)
│     ├─ ai/{lead-qualifier,ux-audit,content-studio}/route.ts
│     ├─ bots/{metadata,test}/route.ts
│     └─ workflows/run/route.ts
├─ features/<domain>/       # the real code lives here
│  ├─ components/           # domain UI
│  ├─ lib/                  # domain types + logic (*-types.ts = source of truth)
│  └─ data/                 # typed content (*.ts; *.server.ts = server-only)
├─ components/              # shared, cross-cutting UI
│  ├─ layout/   sections/   motion/   ai/   visual/   providers/   command/
├─ lib/                     # cross-cutting utilities
│  ├─ ai/openai.ts          # OpenAI wrapper + structured AI + fallback
│  ├─ accessibility/        # accessibility-modes.ts, accessibility-storage.ts
│  ├─ config/env.ts         # env access
│  ├─ i18n/                 # config.ts, dictionaries.ts, server.ts (DE/EN)
│  ├─ motion/               # easings.ts, transitions.ts
│  └─ content/navigation.ts # nav model (SSOT; site.ts is now dead)
└─ _imports/                # raw imported bot exports staged for processing
```

## Dynamic routes (present today)

```
app/bots/[slug]
app/workspace/[workspaceId]
app/workflows/[id]
app/knowledge/[slug]
app/knowledge/category/[category]
app/scenarios/[scenarioId]
app/categories/[category]
```

## Feature domains

| Domain | Path | Responsibility |
| --- | --- | --- |
| **bots** | `features/bots` | Bot definitions, Bot Lab UI (`BotLab`, `BotConsole`, `BotCard`, `BotDetailPage`…), readiness/history/export logic, public + generated + imported bot data |
| **workspace** | `features/workspace` | Workspace store, types, client-side persistence (`WorkspacesOverview`, ZIP export) |
| **account** | `features/account` | Account view (`AccountView`) backed by mock auth |
| **marketplace** | `features/marketplace` | Catalog view |
| **runtime** | `features/runtime` | Execution telemetry, Control Center panel |
| **workflows** | `features/workflows` | Workflow types, engine, templates, builder UI |
| **knowledge** | `features/knowledge` | The educational engine (topics, articles, glossary, paths, concept graph, SEO) |
| **memory** | `features/memory` | Memory store for agent context |
| **navigation** | `features/navigation` | Cross-links between related entities |

## Data flow

1. **Content** is authored as **typed TS** in `features/*/data/*.ts`, conforming to interfaces in `features/*/lib/*-types.ts`. Types are CMS-migration-ready by design.
2. **Pages** (`app/*`) import feature components and pass data; they stay thin.
3. **AI calls** go from a client component → an `app/api/...` route handler → `lib/ai/openai.ts`. The wrapper returns **structured JSON** (zod-shaped) and a **demo fallback** when `OPENAI_API_KEY` is absent — so the UI always renders something useful.
4. **Workspace/memory** state is held client-side (store modules) with localStorage persistence (`probotica.workspace.records.v1`) + ZIP export; server persistence is roadmap (PB-031).

## Rendering & runtime

- Server Components by default; `'use client'` for interactive/motion components.
- API/AI routes set `export const runtime = 'nodejs'`.
- Heavy visual layers (GSAP, R3F shaders, custom cursor) are client-only and **must** degrade under reduced motion.
- Client-tree providers (`components/providers/`): `ThemeProvider`, `AccessibilityProvider`, `AuthProvider` (mock auth), `LocaleProvider` (DE/EN).

## Known architectural debt (roadmap)

See `CLAUDE.md` → "Known truths." Headline items: header/shell fragmentation (fixed by `(marketing)`/`(app)`/`(auth)` route groups + `SiteHeader`/`SiteFooter`/`AppShell`), fragmented search, synthetic telemetry, partial accessibility modes, hardcoded z-index, dead `PageShell.tsx` + dead `lib/content/site.ts`. Auth is mock (`AuthProvider`, localStorage) and workspace persistence is client-side only — a real backend is still absent.
