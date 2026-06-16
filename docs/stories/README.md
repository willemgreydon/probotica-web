# ProBotica User Stories — godtier backlog

A large, opinionated backlog of **user stories** (not engineering tasks) aimed at one outcome: make probotica.at **best-practice educational, genuinely usable, and satisfying to use.**

The engineering roadmap (PB-### in `probotica-*.csv`) covers *plumbing* (route groups, SEO files, telemetry). This backlog covers the **experience**. They complement each other: many stories depend on PB foundation work.

- **Readable specs**: this folder.
- **Importable backlog**: `probotica-stories-godtier.csv` at repo root — same Notion column schema as the existing CSVs, IDs prefixed **`ST-`**.

## How a story is written

```
As a <persona>, I want <capability> so that <benefit>.

Acceptance criteria (Gherkin):
  Given <context>
  When  <action>
  Then  <observable outcome>
```

We follow **INVEST**: Independent, Negotiable, Valuable, Estimable, Small, Testable. Every story names a persona, a measurable success signal, and concrete acceptance criteria. Story points use a Fibonacci scale (1/2/3/5/8/13).

## Personas (full definitions in ../overview.md)

- **Lena** — non-technical SMB marketer (DACH). Primary buyer.
- **Sophie** — learner using the Knowledge Universe.
- **Tobias** — technical evaluator / developer.
- **Markus** — automator building workflows.
- **Mara** — screen-reader / motion-sensitive / mobile user.
- **Maintainer** — internal team.

## Epics in this backlog

| Epic | Theme | Persona focus |
| --- | --- | --- |
| **SE1 — Onboarding & First-Run** | Time-to-value, guided start, empty states | Lena, Sophie |
| **SE2 — Knowledge Universe & Pedagogy** | Best-practice learning: paths, recall, progress, depth-on-demand | Sophie, Lena |
| **SE3 — Education ↔ Product Bridge** | "Learn it → try it" handoffs | Sophie, Lena, Markus |
| **SE4 — Bot Lab Experience** | Discover, configure, run, trust, reuse | Lena, Tobias |
| **SE5 — Workspace & Continuity** | Save, organize, resume, never lose work | Lena, Markus |
| **SE6 — Workflows & Automation** | Build, observe, reuse pipelines | Markus, Tobias |
| **SE7 — Search & Discovery** | One coherent way to find anything | all |
| **SE8 — Navigation & Orientation** | Always know where you are / what's next | all |
| **SE9 — Accessibility & Inclusion** | WCAG AA, 14 modes, keyboard, reduced motion | Mara |
| **SE10 — Motion, Delight & Polish** | Satisfying, performant, honest motion | all |
| **SE11 — Trust, Safety & Compliance** | GDPR, safety notes, demo-vs-live honesty | Lena, Tobias |
| **SE12 — Performance & Resilience** | Speed, skeletons, error recovery | all |
| **SE13 — Personalization & Progress** | Remember me, recommend, resume | Sophie, Lena |
| **SE14 — Gamified Learning & Motivation** | Streaks, badges, quizzes, mastery | Sophie |
| **SE15 — Localization (de-AT first)** | German-first DACH experience | Lena, Sophie |
| **SE16 — Mobile & Responsive** | First-class small-screen experience | all |
| **SE17 — Feedback, Community & Social Proof** | Ratings, sharing, testimonials, contact | Lena, Markus |
| **SE18 — Developer & API Experience** | Docs, customization, integration | Tobias |
| **SE19 — Content Hub & SEO** | Blog, case studies, discoverability | Lena, marketing |
| **SE20 — Admin & Content Ops** | Author/maintain content safely | Maintainer |

## Working from this backlog

1. Pick a story; confirm its persona and acceptance criteria.
2. Read the matching domain doc in `../`.
3. Check PB dependencies (route groups, nav model, auth) — many UX stories sit on PB foundations.
4. Build to the acceptance criteria; verify with the per-story success signal.
5. Definition of done from [`../conventions.md`](../conventions.md) applies.

## Story files

The backlog is split into readable files by epic group (IDs are stable, prefixed **ST-**):

| File | Epics | Stories |
| --- | --- | --- |
| [sprint-1-navigation-shell.md](./sprint-1-navigation-shell.md) | SE8 (Sprint 1 cut) | ST-N01…N09 (delivered) |
| [se1-3-onboarding-and-education.md](./se1-3-onboarding-and-education.md) | SE1, SE2, SE3 | ST-101…120 |
| [se4-7-product-experience.md](./se4-7-product-experience.md) | SE4, SE5, SE6, SE7 | ST-201…224 |
| [se8-12-16-quality-and-inclusion.md](./se8-12-16-quality-and-inclusion.md) | SE8, SE9, SE10, SE11, SE12, SE16 | ST-301…337 |
| [se13-15-17-20-growth-and-platform.md](./se13-15-17-20-growth-and-platform.md) | SE13, SE14, SE15, SE17, SE18, SE19, SE20 | ST-401…437 |

~127 stories across all 20 experience epics. Plans that sequence the engineering work behind these
stories live in [`../plans/`](../plans/README.md).
