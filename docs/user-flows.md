# User flows

How people actually move through ProBotica — entry points, the ordered steps,
the UI element that triggers each step, the route/component it lands on, and the
client state that persists along the way.

This is **descriptive of current reality** (not aspiration). ProBotica has **no
backend yet** — every flow's state lives in the browser (`localStorage` +
cookies). When real auth/persistence lands (PB-031), update this doc and the
"Known truths" list in [`CLAUDE.md`](../CLAUDE.md).

## Conventions used below

- `→` = navigation / state transition.
- **Bold** = a clickable UI element (button / link) and its visible label.
- `route` = an App Router path; `(group)` segments are route groups, not URL parts.
- `key.v1` = a `localStorage` key; cookies are named explicitly.
- Route groups: `(marketing)` = public chrome, `(app)` = product chrome,
  `(auth)` = bare auth screens. See [`routing-navigation.md`](./routing-navigation.md).

## Client-state map (single source of truth for persistence)

| Concern | Mechanism | Key | Owner |
| --- | --- | --- | --- |
| Auth session | localStorage | `probotica-auth` | `components/providers/AuthProvider.tsx` |
| Locale (EN/DE) | cookie (1 yr, lax) | `probotica-locale` | `components/layout/LanguageSwitch.tsx`, `lib/i18n/config.ts` |
| Theme | localStorage | `probotica-theme` | `components/providers/ThemeProvider.tsx` |
| Accessibility modes | localStorage (JSON) | `probotica-accessibility` | `components/providers/AccessibilityProvider.tsx` |
| Bot run history | localStorage (max 10) | `probotica.botlab.runs.v1` | `features/bots/lib/bot-history.ts` |
| Workspaces | localStorage (max 40) | `probotica.workspace.records.v1` | `features/workspace/workspace-persistence.ts` |
| Learning progress | localStorage | `probotica-knowledge-progress` | `features/knowledge/lib/knowledge-progress.tsx` |

---

## 1. Bot discovery → test → workspace

The spine of the product: find a bot, prove it works, put it to work.

**Entry:** `/bots` (Bot Lab) — also reachable from the command palette, header
mega-menu, `/categories/[category]`, `/marketplace`, and `/shop`.

```
/bots  (features/bots/components/BotLab.tsx)
  │  filter (category / status / output mode) · search · sort · compare (≤3)
  │
  ├─▶ select a bot inline
  │      input prefilled from bot.starterPrompt
  │      ▶ Run  → POST /api/bots/test {botSlug, input}
  │              → output + latency/model telemetry
  │              → saveBotRun() appends to probotica.botlab.runs.v1
  │
  └─▶ open bot detail            → /bots/[slug]
         (features/bots/components/BotDetailPage.tsx)
         capability matrix · sample inputs · readiness checks · related bots
            │
            ├─ **Run in Bot Lab**   → /bots?select={slug}   (preselects in BotLab)
            ├─ **Add to Workflow**  → /workspace?bot={slug}  (see preselect handoff)
            └─ **Browse Packs**     → /marketplace
```

**Workspace preselect handoff** (`WorkspaceShell.tsx`, reads `?bot=` via
`useSearchParams`, wrapped in `<Suspense>`):

- If the active workspace is **fresh** (no execution history, no notes, only the
  seed workflow) → the bot is added straight to the intake step.
- If the workspace **already has work** → a confirmation popup
  (`pendingBot` state) asks before mutating; confirm calls
  `addBotToWorkspace(slug)`.
- Either way the URL is cleaned with `router.replace('/workspace')`.

**Terminal state:** a bot is queued as an intake step in a persisted workspace,
ready to chain into a workflow (flow 2).

---

## 2. Workspace & workflows

Where bots become pipelines. State persists to
`probotica.workspace.records.v1` (a `WorkspaceRecord[]`); each record carries
`workflows`, `outputs`, `executionHistory`, `notes`, plus selected bot/scenario refs.

### 2a. Workspaces overview (manage many)

```
/workspaces  (features/workspace/components/WorkspacesOverview.tsx)
  ├─ **Create New**  → createWorkspace(name) → /workspace
  ├─ **Open**        → /workspace/[workspaceId]
  ├─ rename (inline) → saveWorkspace()
  └─ delete          → deleteWorkspace(id)
```

### 2b. Build & run a workflow

```
/workflows                 template gallery
   └─▶ /workflows/[id]      topology (intake→analysis→execution→review lanes),
        │                   bot matrix, execution-flow SVG, stats
        └─ **Open in Workspace** → /workspace (template loaded as active workflow)

/workspace  (WorkspaceShell + features/workflows/components/WorkflowBuilder.tsx)
   │  add/remove steps · assign bot slug · assign lane
   │  changes → onWorkflowChange() → persist() → saveWorkspace()
   │
   ├─ **Execute** → POST /api/workflows/execute {workflow}
   │                → results into workspace.executionHistory[]
   │                → addMemorySnapshot() (tags + output preview)
   │
   ├─ notes:  addWorkspaceNote / removeWorkspaceNote → saveWorkspace()
   └─ **Export** → ZIP of workflows/outputs/notes (features/bots/lib/bot-export.ts)
```

The four lanes — **intake → analysis → execution → review** — are the canonical
pipeline shape; templates are pre-arranged into them and custom steps pick a lane.

**Terminal state:** an executed workflow with output + memory snapshot saved to
the workspace, optionally exported as a ZIP.

---

## 3. Knowledge Universe learning

The educator surface. Teach the concept (`/knowledge`) so the user can then run
it (flows 1–2). Lives under `(marketing)` because it's public-facing.

```
/knowledge  (hub: ConceptGraph · LearningPathRail · KnowledgeGrid)
  │   counts: articles / topics / paths
  │
  ├─▶ /knowledge/category/[category]   topic view → articles in topic
  │        getArticlesForCategory() · related-topic grid · breadcrumb to /knowledge
  │
  ├─▶ /knowledge/[slug]                article (KnowledgeArticleLayout)
  │        body · related learning paths · glossary terms · JSON-LD schema
  │
  └─▶ /knowledge/path/[slug]           learning path (PathJourney)
           ordered articles + end-of-path quiz (data/path-quizzes.ts)
```

Data sources (typed, CMS-shaped — see [`content-model.md`](./content-model.md)):
`knowledge-articles.ts`, `knowledge-topics.ts`, `learning-paths.ts`,
`path-quizzes.ts`, `glossary.ts`.

Progress (articles completed, path/quiz state) is tracked client-side via
`features/knowledge/lib/knowledge-progress.tsx` → localStorage key
`probotica-knowledge-progress`. UI surfaces it through `ArticleCompleteButton`,
`PathProgressBadge`, `PathJourney`, and `PathQuiz`.

**Terminal state:** article marked complete / path quiz finished, with progress
persisted across reloads.

---

## 4. Auth & gated features

Mock auth only — no backend (PB-031). Validates one hard-coded test account.

```
/login  (components/auth/LoginForm.tsx)
   email + password → login() (AuthProvider)
   test account: test@probotica.at / probotica
   success → persist {email,name} to probotica-auth → redirect /account
   failure → inline error

/signup → form present but submit DISABLED ("coming soon"); link → /login

/account  (features/account/AccountView.tsx)   [GATED]
   guard: if !user && ready → redirect /login
   shows name, email, plan "Pro (demo)", quick links (Bot Lab / Workspaces / Marketplace)
   **Sign out** → logout() (clears probotica-auth) → redirect /
```

**Header reflects auth state** (`SiteHeader.tsx`): logged-in shows an account
button → `/account`; logged-out shows **Sign in** → `/login` and
**Get started** → `/signup`.

**Note:** signing out clears the *session* only — workspaces, runs, and any local
data remain in the browser.

---

## 5. Marketplace, scenarios & shop

Discovery surfaces that all funnel back into Bot Lab / Workspace.

```
/marketplace  (MarketplaceView: bots + workflow templates)

/scenarios                       grouped by categoryHint; cards show risk + output mode
   └─▶ /scenarios/[scenarioId]   full prompt · compatible bots · workflows using it
         ├─ **Run in Workspace** → /workspace
         ├─ compatible bot       → /bots/[slug]
         └─ workflow             → /workflows/[id]

/shop  (i18n EN/DE)  four category cards →
   Workflows → /marketplace · Bots → /bots · Prompts → /solutions/prompt-packs ·
   Industries → /industries ;  **Book Custom Briefing** → /contact
```

## 5b. Category pages

```
/categories/[category]   (sales, ux, content, marketing, real-estate, development,
                          learning, automation, research, support, strategy, other)
   stats (total/active/workflow counts, active ratio) · bots grid · workflows
   ├─ **Open in Bot Lab**   → /bots?category={category}
   ├─ **Launch Workspace**  → /workspace
   ├─ bot card              → /bots/[slug]
   └─ workflow card         → /workflows/[id]
```

---

## 6. Cross-cutting interactions

These layer over every flow above.

- **Language (EN/DE)** — `LanguageSwitch` writes the `probotica-locale` cookie
  and calls `router.refresh()`; the root layout re-reads it so server components
  re-render translated. Client components translate via `useT()`
  (`LocaleProvider`); server components via `getServerT()`/`getServerLocale()`
  (`lib/i18n/server.ts`). See [`conventions.md`](./conventions.md).
- **Theme (dark/light/system)** — `ThemeProvider` + a `beforeInteractive` init
  script sets `data-theme` on `<html>` (no flash). Persisted to `probotica-theme`.
- **Accessibility modes** — `AccessibilityProvider` sets `data-contrast`,
  `data-motion`, `data-transparency`, `data-reading`, `data-color-mode`; persisted
  as JSON in `probotica-accessibility`. Motion always honors
  `prefers-reduced-motion`. See [`accessibility.md`](./accessibility.md).
- **Command palette (⌘K / Ctrl+K / `/`)** — `components/command/CommandPalette.tsx`
  jumps to pages, bots (`/bots/[slug]`), and workflows; search filters by
  title/subtitle/keywords.
- **Global chrome** — `SiteHeader` (logo home, mega-menu nav, language switch,
  auth-aware CTAs) and `SiteFooter` (Privacy / Terms / Imprint).

---

## Known gaps (don't mistake these for finished)

- **Scenario → workspace handoff is lossy** — **Run in Workspace** navigates to
  `/workspace` without passing the scenario id in the URL, so the scenario isn't
  auto-loaded the way `?bot=` is for bots (flow 1). Unify with the bot preselect
  mechanism.
- **Command-palette workflows** link to `/workspace` generically, not to a
  specific workflow.
- **No real auth/backend** — all persistence is local; clearing browser storage
  or switching devices loses everything (PB-031).

---

_Maintenance: when a flow changes (a CTA moves, a storage key is added, a handoff
is unified), update the relevant section **and** the client-state map above. Keep
diagrams ASCII so they diff cleanly._
