# SE1–SE3 Stories — Onboarding, Knowledge Universe & the Education ↔ Product Bridge

User-story view of the first-run and education experience. Engineering tasks are tracked as **PB-###** in Notion; the framing here follows the [stories convention](./README.md) (INVEST + Gherkin + persona). These three epics turn the platform thesis — *teach the concept, then let the user run the concept* — into shippable stories.

A learning-journeys feature already exists (`features/knowledge`: `PathJourney`, `PathQuiz`, `knowledge-progress`, route `/knowledge/path/[slug]`, the "Achieved" badge). SE2 **extends** that base (resume, spaced recall, depth-on-demand, glossary hover) rather than rebuilding it. Personas: **Lena** (SMB marketer / buyer), **Sophie** (learner), **Markus** (automator).

| Epic | Theme | Persona focus |
| --- | --- | --- |
| **SE1 — Onboarding & First-Run** | Time-to-value, guided start, empty states | Lena, Sophie |
| **SE2 — Knowledge Universe & Pedagogy** | Learning paths, recall, progress, depth-on-demand, glossary, concept graph | Sophie, Lena |
| **SE3 — Education ↔ Product Bridge** | "Learn it → try it" handoffs from articles to runnable bots | Sophie, Lena, Markus |

---

## ST-101 — Sub-90-second first run
**Epic:** SE1
**Persona:** Lena
**Points:** 5

As a Lena, I want to land on probotica.at and run a useful bot within a minute and a half so that I see real value before deciding to commit.

```gherkin
Given I arrive on the home page as a first-time visitor
When  I follow the primary "Try it now" call to action
Then  I reach a pre-filled, runnable bot with a sample input already loaded
And   I can produce a real (or demo-fallback) result without signing up
And   the path from landing to first result is at most three clicks
```
**Success signal:** median time-to-first-result for new visitors under 90 seconds.

---

## ST-102 — Guided first-run tour
**Epic:** SE1
**Persona:** Lena
**Points:** 5

As a Lena, I want an optional short tour that points out the core surfaces (Bots, Knowledge, Workspace) so that I understand what the platform offers without reading documentation.

```gherkin
Given I am a first-time visitor who has not dismissed the tour
When  the app loads
Then  a dismissible, keyboard-navigable tour highlights Bot Lab, Knowledge Universe and Workspace
And   each step has a "Skip tour" and a "Next" control
And   dismissing or completing it sets a preference so it never re-appears unprompted
And   it can be re-launched later from a help affordance
```
**Success signal:** tour completion or deliberate skip rate above 70 percent; under 5 percent re-show complaints.

---

## ST-103 — Two-door split for buyer vs learner
**Epic:** SE1
**Persona:** Sophie
**Points:** 3

As a Sophie, I want the first-run experience to ask whether I want to *use* AI or *learn* AI so that I am routed to the surface that matches my intent.

```gherkin
Given I am on the first-run screen
When  I am asked "Run AI now" or "Learn AI first"
Then  choosing "Learn AI first" routes me into a recommended beginner learning path
And   choosing "Run AI now" routes me into a curated starter bot
And   my choice is remembered to bias future recommendations (depends on PB-010 nav model)
```
**Success signal:** over 60 percent of new sessions make an explicit door choice rather than bouncing.

---

## ST-104 — Helpful empty states everywhere
**Epic:** SE1
**Persona:** Lena
**Points:** 3

As a Lena, I want every empty area (no saved runs, no workspace items, no search results) to tell me what it is and what to do next so that I never face a blank, confusing screen.

```gherkin
Given I open a surface that currently has no content (empty Workspace, no saved bots, no results)
When  the empty state renders
Then  it explains in plain German-friendly language what belongs here
And   it offers a primary action to fill it (e.g. "Run your first bot", "Browse the Bot Lab")
And   it never renders as a bare blank panel or a raw error
```
**Success signal:** 0 surfaces rendering an unexplained blank state; every empty state offers a next action.

---

## ST-105 — Resumable first session
**Epic:** SE1
**Persona:** Sophie
**Points:** 3

As a Sophie, I want my in-progress first session (a draft run, a started path) to still be there when I come back so that I am not punished for leaving and returning.

```gherkin
Given I started something in my first session (a bot run draft or a learning path)
When  I close the tab and return later on the same device
Then  a "Pick up where you left off" prompt surfaces my last activity
And   following it restores my context (depends on Workspace persistence, roadmap)
```
**Success signal:** returning-within-7-days users see and use the resume prompt in over 40 percent of cases.

---

## ST-106 — Honest demo-vs-live first impression
**Epic:** SE1
**Persona:** Lena
**Points:** 2

As a Lena, I want it made clear when a result is a demo fallback versus a live AI run so that I trust the product and understand what I am evaluating.

```gherkin
Given the platform has no OPENAI_API_KEY configured (demo mode)
When  I run a bot during first-run
Then  the result is clearly labelled as a demo example, not a live generation
And   the no-key fallback still produces a coherent, useful-looking result
And   the labelling never blocks or nags, it simply informs
```
**Success signal:** demo results are labelled in 100 percent of no-key runs; the no-key path never errors.

---

## ST-107 — Personalized starter recommendations
**Epic:** SE1
**Persona:** Lena
**Points:** 3

As a Lena, I want my first-run choices to produce a small set of "start here" recommendations so that I do not have to evaluate the whole catalog cold.

```gherkin
Given I have indicated my role or intent during first-run
When  I land on the home or Bot Lab surface afterwards
Then  a "Recommended for you" rail shows 3–5 relevant bots or paths
And   each recommendation states in one line why it fits me
And   I can dismiss the rail and browse the full catalog instead
```
**Success signal:** over 35 percent of first sessions engage with a recommended item.

---

## ST-108 — Resume an in-flight learning path
**Epic:** SE2
**Persona:** Sophie
**Points:** 5

As a Sophie, I want the existing learning-journey to remember exactly where I stopped so that I can resume a multi-step path without losing my place.

```gherkin
Given I previously started a path at /knowledge/path/[slug] and progress is stored via knowledge-progress
When  I return to that path
Then  PathJourney opens on the next incomplete step, not the beginning
And   a visible "Resume" affordance and a step-by-step progress indicator are shown
And   already-completed steps are marked done and remain re-openable
```
**Success signal:** over 50 percent of multi-session path learners resume via the saved position rather than restarting.

---

## ST-109 — Spaced recall prompts for retention
**Epic:** SE2
**Persona:** Sophie
**Points:** 8

As a Sophie, I want to be re-quizzed on earlier concepts at spaced intervals so that knowledge sticks instead of fading after one pass.

```gherkin
Given I completed a PathQuiz and earned progress on a concept some days ago
When  I return to the Knowledge Universe after a spacing interval
Then  I am offered a short "Quick recall" check drawing on previously-learned concepts
And   correct answers lengthen the next interval and incorrect ones shorten it
And   recall checks reuse the existing PathQuiz mechanics, not a parallel quiz engine
And   I can decline a recall check without losing my path progress
```
**Success signal:** learners who accept recall checks score over 20 percent higher on later mastery than those who do not.

---

## ST-110 — Depth-on-demand in articles
**Epic:** SE2
**Persona:** Lena
**Points:** 5

As a Lena, I want plain-language explanations by default with optional "go deeper" disclosure so that jargon never blocks me but depth is one click away when I want it.

```gherkin
Given I am reading a knowledge article that contains an advanced or technical aside
When  the article renders by default
Then  the plain-language version is shown and deeper technical detail is collapsed
And   a clear "Go deeper" control expands the advanced explanation in place
And   the expand state persists per concept and respects prefers-reduced-motion
```
**Success signal:** Lena-persona readers complete articles at over 80 percent without bouncing on jargon; "go deeper" used by Sophie-persona readers on 30 percent of asides.

---

## ST-111 — Glossary hover and tap definitions
**Epic:** SE2
**Persona:** Sophie
**Points:** 5

As a Sophie, I want glossary terms inside articles to reveal their definition on hover or tap so that I can decode unfamiliar words without leaving the page.

```gherkin
Given an article references a term that exists in the glossary
When  I hover (desktop) or tap (touch) the highlighted term
Then  a popover shows the definition with a link to the full glossary entry
And   the popover is keyboard-focusable and dismissible with Escape
And   it extends GlossaryPreview rather than introducing a second glossary surface
```
**Success signal:** over 25 percent of readers use at least one inline definition per article session; axe smoke pass on the popover.

---

## ST-112 — Visible mastery and progress map
**Epic:** SE2
**Persona:** Sophie
**Points:** 5

As a Sophie, I want a single view of what I have learned, what is in progress and what is next so that I always know my standing and my next best step.

```gherkin
Given I have progress recorded across multiple paths and articles via knowledge-progress
When  I open my learning progress view
Then  I see completed, in-progress and recommended-next items grouped clearly
And   the existing "Achieved" badge appears on fully-completed paths
And   each in-progress item links straight back to its resume point
```
**Success signal:** over 45 percent of returning learners open the progress view at least once per week.

---

## ST-113 — Concept graph as a navigable map
**Epic:** SE2
**Persona:** Sophie
**Points:** 5

As a Sophie, I want the concept graph to show how topics relate and what to learn next so that I can navigate the curriculum by understanding, not just by lists.

```gherkin
Given the ConceptGraph renders the topic-to-topic relationships
When  I select a concept node
Then  I see its prerequisites, its dependents and any article or path that teaches it
And   nodes I have completed are visually distinguished from unlearned ones
And   the graph is keyboard-traversable and degrades to a list when reduced motion is set
```
**Success signal:** over 20 percent of learners enter at least one article or path via the concept graph.

---

## ST-114 — Prerequisite-aware sequencing
**Epic:** SE2
**Persona:** Sophie
**Points:** 3

As a Sophie, I want to be warned when I open an article above my current level so that I learn concepts in a sensible order.

```gherkin
Given an article declares prerequisites I have not yet completed
When  I open that article
Then  a non-blocking notice lists the recommended prerequisites with direct links
And   I can proceed anyway if I choose
And   the notice disappears once the prerequisites are marked complete
```
**Success signal:** over 60 percent of out-of-order opens click at least one suggested prerequisite.

---

## ST-115 — Learn-it-then-try-it handoff from articles
**Epic:** SE3
**Persona:** Sophie
**Points:** 8

As a Sophie, I want a "Try this concept" button in an article that opens a matching bot pre-loaded with a relevant example so that I can immediately apply what I just read.

```gherkin
Given I finish reading an article that maps to a runnable bot
When  I activate "Try this concept now"
Then  I land in the Bot Lab on the mapped bot with a concept-relevant sample input pre-filled
And   the bot run is one action away and works in demo mode without a key
And   a back link returns me to the exact article section I came from
```
**Success signal:** over 30 percent of completed-article sessions follow the "try it" handoff into a bot run.

---

## ST-116 — Return-to-learning after a bot run
**Epic:** SE3
**Persona:** Sophie
**Points:** 3

As a Sophie, I want a clear way back to the lesson after experimenting with a bot so that the try-it detour reinforces the concept instead of stranding me.

```gherkin
Given I arrived at a bot via a "Try this concept" handoff
When  I finish or abandon the run
Then  a "Back to the lesson" affordance returns me to the originating article and section
And   my learning progress reflects that I applied the concept (recorded via knowledge-progress)
```
**Success signal:** over 50 percent of handoff sessions return to the originating article.

---

## ST-117 — Worked-example prompts inside articles
**Epic:** SE3
**Persona:** Lena
**Points:** 5

As a Lena, I want copy-and-runnable example prompts shown in articles so that I can reuse a proven prompt without writing one from scratch.

```gherkin
Given an article contains a worked-example prompt
When  I view that example
Then  I can copy it with one action
And   I can "Run this prompt" to open the relevant bot with it pre-filled
And   the example carries any safety notes from the bot definition
```
**Success signal:** over 40 percent of article readers copy or run at least one worked-example prompt.

---

## ST-118 — Concept-to-bot mapping registry
**Epic:** SE3
**Persona:** Markus
**Points:** 5

As a Markus, I want a typed, centralized mapping from concepts to bots and workflows so that "try it" links stay correct as content and bots change.

```gherkin
Given concepts, bots and workflows each have stable identifiers
When  a developer authors a new article or bot
Then  the concept-to-bot mapping lives in one typed source of truth (lib/*-types.ts shape)
And   a build-time check flags any "try it" link whose target bot or workflow no longer exists
And   the mapping is shaped to migrate to a CMS later without refactor
```
**Success signal:** 0 broken "try it" handoff links in build; 1 mapping source, not many.

---

## ST-119 — From concept to a runnable workflow
**Epic:** SE3
**Persona:** Markus
**Points:** 5

As a Markus, I want a learned multi-step concept to hand off into a matching workflow so that I can go from understanding a pipeline to running one in my own context.

```gherkin
Given an article or path teaches a multi-agent or pipeline concept
When  I choose "Build this as a workflow"
Then  I land in Workflows on a starter pipeline that mirrors the taught steps
And   each step references the concept section it came from
And   the pipeline is runnable in demo mode without a key
```
**Success signal:** over 20 percent of pipeline-concept completions open the matching workflow.

---

## ST-120 — Try-it suggestions on the concept graph
**Epic:** SE3
**Persona:** Sophie
**Points:** 3

As a Sophie, I want each concept-graph node to offer the bot or workflow that lets me apply it so that exploration always has an actionable next step.

```gherkin
Given I am exploring a node in the ConceptGraph
When  the node has a mapped bot or workflow (via the ST-118 registry)
Then  the node panel shows a "Try it" action alongside its teaching links
And   selecting it carries the concept context into the destination
And   nodes without a runnable mapping omit the action rather than showing a dead link
```
**Success signal:** over 15 percent of concept-graph node interactions trigger a "try it" handoff.
