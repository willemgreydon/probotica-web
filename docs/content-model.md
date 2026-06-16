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
Data: `data/public-bots.ts`, `data/imported-bots.server.ts` (server-only), `data/bot-scenarios.ts`. Helpers: `lib/bot-readiness.ts`, `lib/bot-history.ts`. Raw exports staged in `_imports/bot-export/`.

## Workflows — `features/workflows/lib/workflow-types.ts`

Multi-step agent pipelines. Engine: `lib/workflow-engine.ts`. Templates: `data/workflow-templates.ts` (lead-funnel-automation, ux-audit-pipeline, seo-content-engine, research-synthesizer, multi-agent-strategy-chain, frontend-review-chain). Builder UI: `components/WorkflowBuilder.tsx`. Run via `POST /api/workflows/run`.

## Scenarios

Concrete, demoable use-cases that map to AI endpoints/bots: lead-qualification, ux-audit, content-brief, marketing-campaign, frontend-review, research-summary. Surfaced at `/scenarios/[scenarioId]`.

## Knowledge — `features/knowledge/lib/knowledge-types.ts`

`KnowledgeTopic`, `KnowledgeArticle`, `ArticleSection`, plus glossary, learning paths. Full detail in [knowledge-universe.md](./knowledge-universe.md). Designed for Sanity/MDX migration.

## Workspace — `features/workspace/workspace-types.ts`

Personal space for saved/chained runs. Store: `workspace-store.ts`; persistence shell: `workspace-persistence.ts`. **Client-side today** — server persistence + export/import + versioning is roadmap (PB-031). Treat current state as potentially ephemeral until then.

## Memory — `features/memory/memory-store.ts`

Holds agent/run context so chained steps and the workspace can reference prior outputs.

## Navigation — `lib/content/site.ts` (→ `lib/content/navigation.ts`)

Nav groups + links + solutions/agents copy. Being consolidated into one typed model consumed by header/footer/mobile/sitemap (see [routing-navigation.md](./routing-navigation.md)).

## Cross-links — `features/navigation/cross-links.ts`

Relationships between entities (e.g. a knowledge article ↔ the bot that demonstrates it, a scenario ↔ its workflow). This is the backbone of the education↔product bridge — extend it rather than hardcoding links in components.

## Adding content — checklist

1. Find/extend the right `*-types.ts`. 2. Add typed literal to `data/*.ts`. 3. Use stable kebab-case slugs. 4. Wire cross-links. 5. Ensure it appears in nav/sitemap if it's a destination. 6. `pnpm typecheck`.
