# Overview

## What ProBotica is

ProBotica (**probotica.at**, an Austrian/DACH-rooted brand) is an **AI platform that teaches and sells AI**. It pairs a sellable product surface with a genuinely educational one, and bets that the two compound: a visitor who *understands* prompt engineering converts better and churns less than one who was merely sold a "bot."

## The two surfaces

### 1. Product (the "do" surface)
- **Bot Lab** (`/bots`, `/bots/[slug]`) — browse, configure, and run AI bots (sales, UX, content, marketing, dev, strategy, learning…). Each bot is a typed `BotDefinition` with a system prompt, model, temperature, sample inputs, capabilities, and **safety notes**.
- **Workspace** (`/workspace`, `/workspace/[workspaceId]`) — a personal space to save and chain bot runs. *Currently client-side only; persistence is roadmap.*
- **Marketplace** (`/marketplace`) — catalog of bots/prompt packs. (`/shop` is a legacy duplicate slated to redirect here.)
- **Control Center** (`/control-center`) — usage/telemetry dashboards. *Currently synthetic data; real telemetry is roadmap.*
- **Workflows** (`/workflows`, `/workflows/[id]`) — multi-step agent pipelines (lead funnel, UX audit pipeline, SEO content engine, research synthesizer, multi-agent strategy, frontend review).
- **Scenarios** (`/scenarios/[scenarioId]`) & **Categories** (`/categories/[category]`) — discovery facets over bots; planned to become filters rather than top-level destinations.
- **AI Studio** (`/studio`) — interactive demo surface (`components/ai/AiDemoPanel.tsx`).

### 2. Knowledge Universe (the "understand" surface)
`/knowledge`, `/knowledge/[slug]`, `/knowledge/category/[category]` — a structured curriculum: **topics** (taxonomy across AI/ML/robotics/ethics/business), **articles** (sectioned, with callouts, code blocks, key takeaways, prerequisites, difficulty, reading time), a **glossary**, **learning paths**, a **concept graph**, and difficulty badges. The type system (`features/knowledge/lib/knowledge-types.ts`) is explicitly designed to migrate to Sanity/MDX without refactor. See [knowledge-universe.md](./knowledge-universe.md).

## Personas

These anchor every user story. Use them by name.

| Persona | Who | Primary jobs | Cares about |
| --- | --- | --- | --- |
| **Lena — the SMB marketer** | Non-technical marketing manager / small-business owner in the DACH region. The primary *buyer*. | "Find a bot that saves me time and trust that it's safe/GDPR-OK." | Clarity, trust, German content, fast time-to-value, no jargon. |
| **Sophie — the learner** | Student / career-switcher / curious professional. The *education* persona. | "Understand AI well enough to use and discuss it." | Accurate, well-sequenced, satisfying learning; progress; depth on demand. |
| **Tobias — the technical evaluator** | Developer / agency engineer evaluating integration. | "Can I customize bots, hit the API, and trust the architecture?" | API clarity, customization, performance, correctness. |
| **Markus — the automator** | Ops / growth person building pipelines. | "Chain agents into a repeatable workflow that plugs into my tools." | Workflow reliability, integrations, observability. |
| **Mara — the inclusive user** | Uses a screen reader and/or is motion-sensitive; may browse on a low-end mobile. | "Use everything without barriers." | WCAG AA, reduced motion, keyboard, contrast, mobile. |
| **The maintainer** | Internal eng/design/content team. | "Ship quickly without regressions." | Consistency, typed content, no dead code, green build. |

## What "best-practice educational" means here

Not "has articles." It means the learning experience follows evidence-based pedagogy:

- **Scaffolding & sequencing** — prerequisites and learning paths so concepts build in order (beginner → expert).
- **Active recall & retrieval** — quizzes, self-checks, "try it" handoffs into the Bot Lab.
- **Worked examples + transfer** — runnable code/prompts and a clear bridge from concept to product.
- **Spaced & visible progress** — the learner can see what they know and what's next.
- **Plain language first, depth on demand** — Lena and Sophie are never blocked by jargon; the glossary and progressive disclosure carry the depth.
- **Accurate & current** — claims are sourced/dated; nothing teaches a misconception for the sake of a hook.

## What "usable and satisfying" means here

- **Usable**: every page has navigation chrome; one coherent nav model; unified search; clear empty/error/loading states; WCAG AA; fast and responsive from 360px up; predictable IA.
- **Satisfying**: the cinematic motion *rewards* rather than blocks; transitions feel intentional; feedback is immediate; the product feels alive (without ever sacrificing performance, accessibility, or honesty about what's real vs. demo).

The story backlog in [`stories/`](./stories/README.md) operationalizes all of the above.
