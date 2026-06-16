# SE4–SE7 Stories — Bot Lab, Workspace, Workflows & Unified Search

User-story view of the **product ("do") surface**: discovering and running bots, keeping work safe and resumable, building and observing automation pipelines, and finding anything from one place. Engineering tasks are tracked as **PB-###** in Notion; the framing here follows the [stories convention](./README.md) (INVEST + Gherkin + persona). These four epics turn the platform thesis — *teach the concept, then let the user run the concept* — into the run-it half of the product.

The run surface already exists: the Bot Lab registry and console live in `features/bots/components` (`BotLab.tsx`, `BotConsole.tsx`, `BotOutputPanel.tsx`, `BotDetailPage.tsx`, `BotCompare`-style rails), the Workspace in `features/workspace` (`WorkspaceShell.tsx`, `workspace-store.ts`, `workspace-persistence.ts`, `workspace-types.ts`), and Workflows in `features/workflows` (`WorkflowBuilder.tsx`, `workflow-engine.ts`, `workflow-templates.ts`). SE4–SE7 **extend** that base rather than rebuilding it. Every run-touching story honors the **no-key AI demo fallback**. Personas: **Lena** (SMB marketer / buyer), **Markus** (automator), **Tobias** (technical evaluator), and for search, all.

| Epic | Theme | Persona focus |
| --- | --- | --- |
| **SE4 — Bot Lab Experience** | Discover, configure, run, trust, reuse bots | Lena, Tobias |
| **SE5 — Workspace & Continuity** | Save, organize, resume, never lose work (persistence ties to PB-031) | Lena, Markus |
| **SE6 — Workflows & Automation** | Build, observe, reuse agent pipelines | Markus, Tobias |
| **SE7 — Search & Discovery** | One unified search across bots, workflows, scenarios, knowledge (PB-033) | all |

---

## ST-201 — Filterable Bot Lab discovery
**Epic:** SE4
**Persona:** Lena
**Points:** 5

As a Lena, I want to browse and filter the Bot Lab by category, use case and difficulty so that I can find a bot that fits my marketing task without reading every card.

```gherkin
Given I open the Bot Lab registry rendered by BotLab.tsx
When  I apply a category, use-case or difficulty filter
Then  the visible BotCard set narrows to matching bots in plain German-friendly language
And   each card states what the bot does and who it is for in one line
And   clearing all filters restores the full catalog without a reload
```
**Success signal:** over 60 percent of Bot Lab sessions apply at least one filter and reach a bot detail view.

---

## ST-202 — Configure a bot before running
**Epic:** SE4
**Persona:** Tobias
**Points:** 5

As a Tobias, I want to inspect and adjust a bot's configurable parameters (model, temperature, system prompt context) before I run it so that I can evaluate how the bot behaves under my own settings.

```gherkin
Given I am on BotDetailPage.tsx for a typed BotDefinition with exposed parameters
When  I open the configuration panel and change a supported parameter
Then  the change is validated against the bot's allowed ranges before the run
And   a "reset to defaults" control restores the published configuration
And   unsupported or locked parameters are clearly marked read-only, not hidden
```
**Success signal:** over 40 percent of Tobias-persona sessions adjust at least one parameter before their first run.

---

## ST-203 — Run a bot with a pre-filled sample
**Epic:** SE4
**Persona:** Lena
**Points:** 3

As a Lena, I want to run a bot from a pre-filled sample input with one action so that I see a real result before writing my own prompt.

```gherkin
Given I open a bot whose definition carries sample inputs
When  I activate "Run" in BotConsole.tsx without editing the input
Then  the sample input runs and BotOutputPanel.tsx renders a coherent result
And   if no OPENAI_API_KEY is configured the run produces the demo fallback instead of erroring
And   the run is one action away from the bot detail view
```
**Success signal:** median time from opening a bot to first rendered result under 20 seconds; no-key runs never error.

---

## ST-204 — Honest demo-vs-live run labelling
**Epic:** SE4
**Persona:** Lena
**Points:** 2

As a Lena, I want every bot result to make clear whether it was a live AI generation or a demo fallback so that I trust what I am evaluating.

```gherkin
Given I run a bot in BotConsole.tsx
When  the result returns to BotOutputPanel.tsx
Then  a live generation is labelled live and a no-key demo result is labelled demo
And   the labelling informs without blocking, nagging or hiding the result
And   the demo fallback still looks useful and complete
```
**Success signal:** demo results are labelled in 100 percent of no-key runs; zero unlabelled results in QA.

---

## ST-205 — Bot safety notes surfaced at run time
**Epic:** SE4
**Persona:** Lena
**Points:** 3

As a Lena, I want a bot's safety notes shown where I run it so that I understand limits and GDPR considerations before relying on the output.

```gherkin
Given a BotDefinition carries safety notes
When  I view the bot detail or run it in BotConsole.tsx
Then  the safety notes are visible alongside the run controls, not buried in a sub-page
And   notes about data handling or accuracy limits are shown before the first run
And   the notes travel with the result if it is saved to the Workspace
```
**Success signal:** over 90 percent of bots with safety notes show them on the run surface; zero saved results lose their notes.

---

## ST-206 — Compare bots side by side
**Epic:** SE4
**Persona:** Tobias
**Points:** 5

As a Tobias, I want to compare two or more bots on capabilities, model and sample output so that I can choose the right one for an integration.

```gherkin
Given I select multiple bots from the BotLab.tsx registry
When  I open the compare view
Then  capabilities, model, temperature and sample inputs are shown column by column
And   I can run the same input across the compared bots and see results side by side
And   comparison runs honor the no-key demo fallback per bot
```
**Success signal:** over 25 percent of Tobias-persona evaluations use compare before selecting a bot.

---

## ST-207 — Bot run history and reuse
**Epic:** SE4
**Persona:** Lena
**Points:** 5

As a Lena, I want a history of my recent bot runs that I can reopen and re-run so that I can reuse a good result instead of recreating it.

```gherkin
Given I have run bots in earlier sessions on this device
When  I open the bot run history
Then  recent runs are listed with their bot, input summary and timestamp
And   I can reopen a past run to view its full output in BotOutputPanel.tsx
And   I can re-run a past input, optionally tweaking it first
```
**Success signal:** over 30 percent of returning Bot Lab users reopen or re-run from history within a week.

---

## ST-208 — Save a bot run to the Workspace
**Epic:** SE5
**Persona:** Lena
**Points:** 3

As a Lena, I want to save a bot result into my Workspace with one action so that I can keep and organize outputs I want to use later.

```gherkin
Given I have produced a result in BotOutputPanel.tsx
When  I choose "Save to Workspace"
Then  the run is stored via workspace-store.ts as a typed workspace item including its bot and input
And   a confirmation shows where the item landed with a link to open it
And   saving works the same for live and demo-fallback results
```
**Success signal:** over 35 percent of satisfied runs are saved to the Workspace.

---

## ST-209 — Organize Workspace items
**Epic:** SE5
**Persona:** Markus
**Points:** 5

As a Markus, I want to rename, group and remove items in my Workspace so that a growing collection of runs stays findable.

```gherkin
Given I have multiple saved items in WorkspaceShell.tsx
When  I rename, group into a collection, or delete an item
Then  the change is reflected immediately in the Workspace view and the underlying workspace-store.ts state
And   deletions ask for confirmation and can be undone within the session
And   empty collections render a helpful empty state, never a bare blank panel
```
**Success signal:** over 40 percent of multi-item Workspace users rename or group at least one item.

---

## ST-210 — Durable Workspace persistence
**Epic:** SE5
**Persona:** Lena
**Points:** 8

As a Lena, I want my Workspace to survive closing the tab and returning so that I never lose work that is only held client-side today.

```gherkin
Given Workspace state is currently client-side and can be lost (depends on PB-031 persistence)
When  I save items, then close the browser and return later on the same device
Then  workspace-persistence.ts restores my saved items and their order
And   a save indicator shows when work is persisted versus only in memory
And   restore degrades gracefully if stored data is partial, never wiping good items
```
**Success signal:** zero reported "lost my Workspace" incidents after PB-031 ships; over 95 percent successful restores on return.

---

## ST-211 — Resume an in-progress Workspace session
**Epic:** SE5
**Persona:** Markus
**Points:** 5

As a Markus, I want a "pick up where you left off" entry into my Workspace so that I can resume a chain of runs without retracing my steps.

```gherkin
Given I left a Workspace session with an in-progress chain of saved runs
When  I return to the Workspace
Then  WorkspaceShell.tsx surfaces my most recent context with a "Resume" affordance
And   following it reopens the last item I was working on, not the top of the list
And   resume relies on persisted state (depends on PB-031) and works on the same device
```
**Success signal:** over 45 percent of returning Workspace users resume via the prompt rather than browsing from scratch.

---

## ST-212 — Chain a saved run into the next bot
**Epic:** SE5
**Persona:** Markus
**Points:** 5

As a Markus, I want to feed a saved Workspace result as the input to another bot so that I can chain agents without copying text by hand.

```gherkin
Given I have a saved result in WorkspaceShell.tsx
When  I choose "Use as input" and pick a target bot
Then  the target bot opens in BotConsole.tsx pre-filled with the saved result
And   the chained run honors the no-key demo fallback
And   the resulting output can be saved back into the same Workspace, preserving the chain
```
**Success signal:** over 20 percent of Workspace sessions create at least one chained run.

---

## ST-213 — Never-lose-work safety net
**Epic:** SE5
**Persona:** Lena
**Points:** 3

As a Lena, I want an unsaved draft or in-flight run to be protected from accidental loss so that a stray refresh or navigation never destroys my work.

```gherkin
Given I have an unsaved bot input or an unsaved result in view
When  I attempt to navigate away or refresh
Then  I am warned about unsaved work with options to save or discard
And   a recoverable draft is retained so I can restore it after an accidental reload
And   the warning never fires for already-persisted state (depends on PB-031)
```
**Success signal:** over 80 percent of accidental-navigation events offer a recovery path; zero silent losses in QA.

---

## ST-214 — Build a workflow from a template
**Epic:** SE6
**Persona:** Markus
**Points:** 5

As a Markus, I want to start a workflow from a proven template so that I can build a multi-step pipeline without wiring every step from zero.

```gherkin
Given templates exist in workflow-templates.ts (lead funnel, UX audit, SEO engine, research synthesizer)
When  I pick a template in WorkflowBuilder.tsx
Then  the pipeline loads with its steps, each step bound to a bot and its inputs
And   I can add, remove or reorder steps and the builder validates step connections
And   an empty builder offers templates rather than a blank canvas
```
**Success signal:** over 60 percent of new workflows start from a template rather than an empty pipeline.

---

## ST-215 — Run and observe a workflow
**Epic:** SE6
**Persona:** Markus
**Points:** 8

As a Markus, I want to run a workflow and watch each step execute so that I can see where a pipeline succeeds or stalls.

```gherkin
Given I have a valid pipeline in WorkflowBuilder.tsx
When  I run it through workflow-engine.ts
Then  each step shows a live status (pending, running, done, failed) as it executes
And   per-step inputs and outputs are inspectable while the run progresses
And   with no OPENAI_API_KEY the whole pipeline runs end to end on the demo fallback
```
**Success signal:** over 70 percent of workflow runs are observed step by step; no-key pipelines complete without erroring.

---

## ST-216 — Recover from a failed workflow step
**Epic:** SE6
**Persona:** Markus
**Points:** 5

As a Markus, I want a failed step to be explained and re-runnable so that one bad step does not force me to restart the whole pipeline.

```gherkin
Given a step fails during a workflow-engine.ts run
When  the failure surfaces in WorkflowBuilder.tsx
Then  the failed step shows a plain-language reason and the input that caused it
And   I can retry just that step or resume the pipeline from it
And   downstream steps wait rather than running on missing input
```
**Success signal:** over 50 percent of failed runs are recovered via step retry rather than a full restart.

---

## ST-217 — Inspect and reuse step output
**Epic:** SE6
**Persona:** Tobias
**Points:** 3

As a Tobias, I want to inspect the raw output of any workflow step and reuse it so that I can debug a pipeline and verify what each agent produced.

```gherkin
Given a workflow run has completed or partially completed
When  I open a step's output in WorkflowBuilder.tsx
Then  I see the step's full input and output, not just a truncated summary
And   I can copy the output or save it to the Workspace
And   the view distinguishes live output from demo-fallback output
```
**Success signal:** over 30 percent of Tobias-persona workflow sessions open at least one step's raw output.

---

## ST-218 — Save and reuse a workflow
**Epic:** SE6
**Persona:** Markus
**Points:** 5

As a Markus, I want to save a workflow I built and re-run it later so that a repeatable pipeline becomes a reusable asset.

```gherkin
Given I have built and run a workflow in WorkflowBuilder.tsx
When  I save it with a name
Then  the pipeline definition is stored and listed for later reuse
And   reopening it restores all steps and their bot bindings
And   I can duplicate a saved workflow to create a variant without altering the original
```
**Success signal:** over 25 percent of built workflows are saved and re-run at least once.

---

## ST-219 — Typed, observable workflow runs
**Epic:** SE6
**Persona:** Tobias
**Points:** 3

As a Tobias, I want workflow definitions and run state to be typed and observable so that I can trust pipeline behavior and reason about it.

```gherkin
Given workflows are defined against workflow-types.ts as the single source of truth
When  a pipeline is built or run
Then  step bindings, inputs and outputs conform to the typed schema
And   invalid pipelines are rejected at build time with a clear reason, not at run time
And   the run exposes a typed status per step suitable for future telemetry
```
**Success signal:** zero workflow runs failing on type-mismatch at run time; one types source, not many.

---

## ST-220 — One unified search across surfaces
**Epic:** SE7
**Persona:** Lena
**Points:** 8

As a Lena, I want one search that returns bots, workflows, scenarios and knowledge articles together so that I do not have to learn a different search on every surface.

```gherkin
Given search is fragmented across bots, workflows, scenarios and knowledge today (depends on PB-033)
When  I open the unified search and type a query
Then  results are grouped by type (bots, workflows, scenarios, knowledge) in one panel
And   each result states its type and a one-line description
And   selecting a result lands me on the right surface with context preserved
```
**Success signal:** over 70 percent of searches start from the unified entry rather than a per-surface search.

---

## ST-221 — Keyboard-first command search
**Epic:** SE7
**Persona:** Tobias
**Points:** 5

As a Tobias, I want to open and drive the unified search entirely from the keyboard so that I can navigate the platform without reaching for the mouse.

```gherkin
Given the unified search exists (depends on PB-033)
When  I press the documented command shortcut anywhere in the app
Then  the search palette opens focused, with arrow keys to move and Enter to select
And   Escape closes it and returns focus to where I was
And   the palette is screen-reader announced and fully operable without a pointer
```
**Success signal:** axe smoke pass on the palette; over 30 percent of Tobias-persona searches are keyboard-initiated.

---

## ST-222 — Filter and scope search results
**Epic:** SE7
**Persona:** Markus
**Points:** 3

As a Markus, I want to scope unified search to a single type or filter by facet so that I can zero in on, say, only workflows.

```gherkin
Given unified search returns mixed result types (depends on PB-033)
When  I select a type scope or a facet such as category or difficulty
Then  results narrow to that scope without losing my query
And   the active scope is clearly shown and removable in one action
And   an empty scoped result explains the gap and suggests broadening the search
```
**Success signal:** over 35 percent of multi-result searches apply a scope or facet.

---

## ST-223 — Helpful empty and recent search states
**Epic:** SE7
**Persona:** Lena
**Points:** 3

As a Lena, I want the search to help me when I have typed nothing or matched nothing so that I am never stranded at an empty box.

```gherkin
Given I open the unified search (depends on PB-033)
When  the query is empty or returns no matches
Then  an empty query shows recent searches and suggested entry points across surfaces
And   a no-match result explains it plainly and suggests close alternatives or a broader query
And   neither state renders as a bare blank panel or a raw error
```
**Success signal:** zero blank or raw-error search states; over 25 percent of empty-state sessions click a suggestion.

---

## ST-224 — Search that knows demo from live
**Epic:** SE7
**Persona:** Lena
**Points:** 2

As a Lena, I want search results that lead to runnable bots or workflows to set honest expectations about live versus demo so that I trust what I will get when I open them.

```gherkin
Given a unified search result targets a runnable bot or workflow (depends on PB-033)
When  the result is shown
Then  results indicate that running is available, and respect the no-key demo fallback on arrival
And   opening a runnable result lands on a surface where the first run works without a key
And   the result never promises a live capability the environment cannot deliver
```
**Success signal:** zero search-to-run handoffs that error on the no-key path; honest run labelling preserved on arrival.
