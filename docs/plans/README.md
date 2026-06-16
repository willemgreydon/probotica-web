# ProBotica — Plans

Documented, dependency-ordered execution plans. The **engineering roadmap** lives in
Notion (*ProBotica | Task List*, PB-001…PB-037); these documents turn it into a readable,
sequenced plan and connect it to the experience backlog in [`../stories/`](../stories/README.md).

## Index

| Plan | Scope | Status |
| --- | --- | --- |
| [roadmap-overview.md](./roadmap-overview.md) | The whole picture: vision, phases, epics, milestones, metrics, risks | living |
| [phase-1-sprint-1.md](./phase-1-sprint-1.md) | Navigation & Shell Unification (PB-001…030 Sprint 1 cut) | **done** |
| [phase-2-product-depth.md](./phase-2-product-depth.md) | Auth, persistence, commerce, unified search, telemetry (PB-031…034) | planned |
| [phase-3-hardening.md](./phase-3-hardening.md) | Accessibility, motion tokens, content hub, polish (PB-035…037) | planned |

## How these relate

```
Notion PB-### (engineering tasks)  ──┐
                                     ├──►  docs/plans/*  (sequenced execution)
docs/stories/ST-### (experience)  ──┘            │
                                                 ▼
                                     build → verify → mark % Complete in Notion
```

- **Plans** answer *what to build, in what order, and when it's done*.
- **Stories** answer *who it's for and how we'll know it's good* (INVEST + Gherkin).
- A plan item usually satisfies one or more PB tasks and one or more ST stories.

## Working rule

Before a large change, skim [roadmap-overview.md](./roadmap-overview.md) and the relevant phase
plan. Build to the acceptance criteria, verify with `pnpm typecheck` + `pnpm build`, then record
progress in Notion via the `% Complete` field (the Status select has no "Done" option).
