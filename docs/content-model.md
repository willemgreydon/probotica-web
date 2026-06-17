# Content Model — canonical data shapes

All content is **typed TS**, centralized per domain, and shaped for a future CMS. This is the reference for the shapes you'll touch most. Source of truth is always the `*-types.ts` file cited.

## Bots — `features/bots/lib/bot-types.ts`

```ts
type BotCategory = 'sales'|'ux'|'content'|'marketing'|'real-estate'
  |'development'|'learning'|'automation'|'research'|'support'|'strategy'|'other';
type BotOutputMode = 'text'|'json'|'mixed';
type BotRunState  = 'idle'|'running'|'done'|'error';

interface BotDefinition {
  id; slug; name; shortName; category; description;
  systemPrompt; starterPrompt; inputPlaceholder; outputMode;
  tags[]; model; temperature; status: 'active'|'draft'|'disabled';
  sourceFile; sampleInputs[]; capabilities[]; safetyNotes[];
}
interface BotTestRequest { botSlug; input; }
interface BotTestResponse { ok; fallback; botSlug; botName; output; … }
```
Data: `data/generated-bots.ts` (the ~500-bot generator, `PER_CATEGORY_TARGET = 46` per non-`other` category), `data/public-bots.ts`, `data/imported-bots.server.ts` (server-only), `data/bot-scenarios.ts`. Helpers: `lib/bot-readiness.ts`, `lib/bot-history.ts`, `lib/bot-export.ts` (ZIP via JSZip), `lib/bot-fallback.ts`. Raw exports staged in `_imports/bot-export/part-1/`.

## Workflows — `features/workflows/lib/workflow-types.ts`

Multi-step agent pipelines. Engine: `lib/workflow-engine.ts`. Templates: `data/workflow-templates.ts` (lead-funnel-automation, ux-audit-pipeline, seo-content-engine, research-synthesizer, multi-agent-strategy-chain, frontend-review-chain). Builder UI: `components/WorkflowBuilder.tsx`. Run via `POST /api/workflows/run`.

## Scenarios

Concrete, demoable use-cases that map to AI endpoints/bots: lead-qualification, ux-audit, content-brief, marketing-campaign, frontend-review, research-summary. Surfaced at `/scenarios/[scenarioId]`.

## Knowledge — `features/knowledge/lib/knowledge-types.ts`

`KnowledgeTopic`, `KnowledgeArticle`, `ArticleSection`, plus glossary, learning paths. Full detail in [knowledge-universe.md](./knowledge-universe.md). Designed for Sanity/MDX migration.

## Workspace — `features/workspace/workspace-types.ts`

Personal space for saved/chained runs. Store: `workspace-store.ts`; persistence: `workspace-persistence.ts` (localStorage key `probotica.workspace.records.v1`), surfaced via `WorkspacesOverview.tsx`, with ZIP export. **Client-side persistence is shipped** — only server persistence (+ cross-device sync/versioning) is roadmap (PB-031).

## Memory — `features/memory/memory-store.ts`

Holds agent/run context so chained steps and the workspace can reference prior outputs.

## Auth — `components/providers/AuthProvider.tsx`

Mock auth only (no backend). `AuthUser` shape: `{ email; name }`. Session persists to localStorage key `probotica-auth`; test account `test@probotica.at` / `probotica`. Routes: `/login`, `/signup`, `/account` (`features/account/AccountView.tsx`).

## i18n — `lib/i18n/`

`Locale = 'de' | 'en'` (default `en`), resolved from the `probotica-locale` cookie. Copy lives in a single dictionary (`dictionaries.ts`); `config.ts` defines locales, `server.ts` exposes `getServerT()` / `getServerLocale()`.

## Navigation — `lib/content/navigation.ts`

The live, single typed nav model (groups + links + solutions/agents copy) consumed by `SiteHeader`/`SiteFooter`/`FullscreenMenu`/`HomeSectionNav`/sitemap/not-found/pricing (see [routing-navigation.md](./routing-navigation.md)). The older `lib/content/site.ts` is now dead (0 importers).

## Cross-links — `features/navigation/cross-links.ts`

Relationships between entities (e.g. a knowledge article ↔ the bot that demonstrates it, a scenario ↔ its workflow). This is the backbone of the education↔product bridge — extend it rather than hardcoding links in components.

## Adding content — checklist

1. Find/extend the right `*-types.ts`. 2. Add typed literal to `data/*.ts`. 3. Use stable kebab-case slugs. 4. Wire cross-links. 5. Ensure it appears in nav/sitemap if it's a destination. 6. `pnpm typecheck`.
