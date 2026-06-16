# Glossary — speak ProBotica

Domain and codebase vocabulary. (Distinct from the *learner* glossary in `features/knowledge/data/glossary.ts`, which teaches AI terms to users.)

## Product surfaces

- **Bot Lab** — `/bots`; browse/configure/run AI bots.
- **Workspace** — `/workspace`; user's personal space for saved & chained runs (client-side today).
- **Marketplace** — `/marketplace`; catalog of bots/prompt packs. `/shop` is a legacy duplicate.
- **Control Center** — `/control-center`; telemetry dashboards (synthetic data today).
- **Workflows** — multi-step agent pipelines.
- **Scenarios** — concrete demoable use-cases mapping to AI endpoints.
- **Categories** — bot groupings; becoming filters, not top-level nav.
- **AI Studio** — `/studio`; interactive demo surface.
- **Knowledge Universe** — `/knowledge`; the educational library.

## Core entities

- **BotDefinition** — typed config for one bot (prompt, model, temperature, safety notes…).
- **Workflow** — ordered steps chaining bots/agents; run via the workflow engine.
- **Scenario** — a packaged use-case (input → AI → structured result).
- **KnowledgeTopic / KnowledgeArticle / ArticleSection** — the educational content tree.
- **Learning path** — a recommended ordered sequence of articles.
- **Concept graph** — the related-topics network powering exploration.
- **Memory store** — per-session/agent context carried across runs.

## Codebase terms

- **Feature domain** — a folder under `features/` owning one area (`components/`, `lib/`, `data/`).
- **`*-types.ts`** — single source of truth for a domain's data shapes.
- **`*.server.ts`** — server-only module; never import client-side.
- **Route group** — `(marketing)` / `(app)` / `(auth)`; shares a layout without changing URLs.
- **Nav model** — the single typed source for all navigation links.
- **Demo fallback** — the realistic output returned when `OPENAI_API_KEY` is absent.
- **Accessibility mode** — a user-selectable inclusive setting (14 planned).
- **Motion tokens / z-index tokens** — design tokens replacing hardcoded values.
- **Cross-links** — typed relationships between entities (`features/navigation/cross-links.ts`).
- **Education→product bridge** — the "try it" handoff from a knowledge article to a matching bot/scenario.

## Status / planning terms (CSV)

- **PB-###** — engineering task in the roadmap CSVs.
- **ST-###** — user story in `probotica-stories-godtier.csv` / [`docs/stories/`](./stories/README.md).
- **Phase 1 / 2 / 3** — Foundation → Product Depth → Hardening.
- **P0–P3** — priority. **Epic (E#)** — grouped initiative.

## Brand

- **DACH / de-AT** — Germany-Austria-Switzerland region; Austrian-German locale. ProBotica is `.at`-rooted; German-first content matters.
- **AI Compliance Layer** — the GDPR-aware, "no training on your data," audit-friendly trust positioning.
