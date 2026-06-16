# ProBotica Docs

Documentation that lets Claude — and any contributor — make the most of this codebase.
Start with the root [`CLAUDE.md`](../CLAUDE.md) for the one-page orientation, then dive here.

## Table of contents

| Doc | What it covers |
| --- | --- |
| [overview.md](./overview.md) | Product vision, the two surfaces, personas, what "best-practice educational" means here |
| [architecture.md](./architecture.md) | Monorepo, App Router layout, feature-based structure, data flow |
| [conventions.md](./conventions.md) | Code style, naming, imports, server/client rules, content-as-data pattern |
| [routing-navigation.md](./routing-navigation.md) | Routes, dynamic segments, the planned `(marketing)`/`(app)` groups, IA & nav model |
| [design-system.md](./design-system.md) | Tokens, theming, motion layer, the cinematic aesthetic, hygiene rules |
| [accessibility.md](./accessibility.md) | Accessibility modes, WCAG targets, reduced-motion, inclusive defaults |
| [ai-integration.md](./ai-integration.md) | OpenAI lib, scenario/bot endpoints, the no-key demo fallback, safety |
| [knowledge-universe.md](./knowledge-universe.md) | The educational engine: content model, pedagogy, didactic patterns |
| [content-model.md](./content-model.md) | Canonical data shapes for bots, workflows, scenarios, knowledge, workspace |
| [glossary.md](./glossary.md) | Domain & codebase vocabulary (read this to speak ProBotica) |
| [stories/](./stories/README.md) | The godtier user-story backlog (education / usability / delight / trust / a11y) |

## How to use these docs

- **Before a feature**: read `overview.md` (personas), the relevant domain doc, and the matching stories in `stories/`.
- **Before a refactor**: read `architecture.md` + `conventions.md` so you move *with* the grain.
- **Before touching AI**: read `ai-integration.md` — the no-key fallback is a hard requirement.
- **Before touching content/education**: read `knowledge-universe.md` + `content-model.md`.

## Maintenance

These docs describe intent and current reality. When reality changes (e.g. route groups land, telemetry becomes real, auth ships), update the relevant doc *and* the "Known truths" list in `CLAUDE.md`. Keep docs short, true, and link-rich.
