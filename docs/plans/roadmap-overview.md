# ProBotica — Roadmap Overview (GODTIER plan)

> Living document. Source of truth for tasks: Notion *ProBotica | Task List* (PB-001…PB-037).
> Experience backlog: [`../stories/`](../stories/README.md) (ST-### , 100+ stories across SE1–SE20).

## Vision

**Teach the concept, then let the user run the concept.** ProBotica is two reinforcing surfaces:

1. **Product** — sellable AI bots, prompt packs, workflow automation, and a workspace where
   customers run and chain agents (`/bots`, `/workspace`, `/marketplace`, `/control-center`,
   `/workflows`, `/scenarios`).
2. **Educator** — the *Knowledge Universe* (`/knowledge`): topics → articles → glossary →
   **learning journeys with quizzes & persisted progress** → concept graph.

The win condition: a learner (Sophie) becomes a confident user (Lena), and a technical evaluator
(Tobias) can verify depth — all on one coherent, accessible, fast, trustworthy platform.

## Operating principles

- **Foundations before features.** One nav model, one shell, system pages — before depth.
- **Typed, centralized content** that can migrate to a CMS (Sanity/MDX) without a refactor.
- **Never break the no-key AI path.** Live AI needs `OPENAI_API_KEY`; the demo fallback must stay usable.
- **Accessibility & honest motion are features, not afterthoughts.** Honor `prefers-reduced-motion`.
- **Verify before "done":** `pnpm typecheck` + `pnpm build`, then record `% Complete` in Notion.

## Phase map

| Phase | Theme | PB range | Outcome |
| --- | --- | --- | --- |
| **Phase 1 — Foundation** | Navigation, shell, system pages, design-system hygiene | PB-001…030 | Every route has chrome; one nav model; branded 404/errors; tokens |
| **Phase 2 — Product Depth** | Auth, backend persistence, commerce, unified search, real telemetry | PB-031…034 | The product becomes real: accounts, saved work, transactions, one search |
| **Phase 3 — Hardening** | Accessibility (14 modes), motion tokens, content hub & SEO | PB-035…037 | WCAG AA, tokenized motion, blog/case-studies for growth |

### Epics (engineering, E1–E13)

E1 Navigation & Shell · E2 Information Architecture · E3 System & SEO Pages · E4 SaaS Scaffolding ·
E5 Design-System Hygiene · E6 QA & Release · E7 Auth & Backend Persistence · E8 Marketplace Commerce ·
E9 Unified Search · E10 Telemetry · E11 Accessibility · E12 Motion Tokens · E13 Content Hub.

### Experience epics (SE1–SE20)

Mapped in [`../stories/`](../stories/README.md): onboarding, pedagogy, education↔product bridge, bot
lab, workspace continuity, workflows, search, navigation, accessibility, motion, trust, performance,
personalization, gamified learning, localization (de-AT), mobile, social proof, developer/API,
content hub, admin/ops.

## Sequencing (critical path)

```
Phase 1  Foundation
  PB-010/013 nav model ─► PB-001/002 header/footer ─► PB-003 (marketing) shell ─► PB-005/007 migrate + home
                                                  └► PB-015 404 ─► PB-016/017 errors+skeletons
  PB-027 z-index tokens (parallel) · PB-018/019/020 sitemap/robots/OG · PB-004/006 (app) group
  PB-030 verify ─────────────────────────────────────────────────────────────────────► gate to Phase 2
Phase 2  Product Depth   (all gated on PB-030)
  PB-031 auth+persistence ─► PB-034 real telemetry
  PB-031 ─► PB-032 marketplace commerce
  PB-033 unified search (retires fragmented search)
Phase 3  Hardening       (gated on PB-030; PB-034 informs telemetry-driven a11y/perf)
  PB-035 accessibility modes · PB-036 motion tokens · PB-037 content hub + OG set
```

## Milestones & exit criteria

| Milestone | Definition of done |
| --- | --- |
| **M1 — Walkable site** (Phase 1) | 0 chrome-less pages; 1 nav model; branded 404/errors; typecheck+build green; a11y smoke pass |
| **M2 — Real accounts** (Phase 2) | Auth works; workspace persists server-side with export/import + versioning; 0 data-loss |
| **M3 — Commerce + one search** (Phase 2) | First purchase E2E; single search across all entities; real Control Center telemetry |
| **M4 — Inclusive & discoverable** (Phase 3) | 14/14 a11y modes, WCAG AA; motion tokenized; blog + case studies live, indexed |

## North-star metrics

- **Time-to-first-value** (signup → first successful bot run) ↓
- **Journey completion rate** (Knowledge journeys started → "Achieved") ↑
- **Education→product conversion** (article → runs the related bot) ↑
- **Search success** (query → click → task complete) on the unified surface ↑
- **WCAG AA conformance** = 100% of audited flows; **Core Web Vitals** green (LCP/CLS/INP)
- **Workspace data-loss incidents** = 0

## Top risks & mitigations

| Risk | Mitigation |
| --- | --- |
| Repo is **not under git** | Make atomic, verifiable changes; alias imports survive moves; rely on `pnpm build` as the safety net; recommend `git init` |
| **Route-group moves** break relative imports | Convert to `@/` alias on move (caught in `knowledge/*`); verify with build |
| **Inline styles override responsive classes** (header/sidebar bugs) | Own show/hide + offsets in CSS tokens/classes, never inline `display`/`margin` |
| Auth/persistence scope creep (PB-031, 21 pts) | Ship UI placeholders first (login/signup/account already stubbed), pick provider, then wire |
| Telemetry currently **synthetic** | Replace sine-wave placeholders only after real usage events exist (PB-034 after PB-031) |
| Accessibility debt (5/14 modes) | Token-driven modes; add `axe` smoke to QA gate (PB-030 pattern) |

## Progress so far

- **Phase 1 · Sprint 1 — DONE** (2026-06-16): nav model, SiteHeader/SiteFooter, `(marketing)` shell,
  branded 404, z-index tokens, route migration, home on shell, login/signup/pricing placeholders.
  See [phase-1-sprint-1.md](./phase-1-sprint-1.md).
- **Knowledge journeys — DONE**: real `/knowledge/path/[slug]` routes, per-journey quizzes,
  persisted progress (localStorage), "Achieved" badges, redo/reset, article "mark complete".
  (Extends SE2/SE14 — see those stories for the next increments: streaks, badges, mastery.)
- **AppShell responsiveness — FIXED**: sidebar no longer overlaps content on L/M/S
  (offset + show/hide moved off inline styles into tokenized CSS).
