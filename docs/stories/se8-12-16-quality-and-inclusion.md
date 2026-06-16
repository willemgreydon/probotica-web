# Quality & Inclusion Stories — SE8, SE9, SE10, SE11, SE12, SE16

User-story view of the cross-cutting **quality** epics: orientation, accessibility, motion,
trust, performance and mobile. Engineering plumbing is tracked as **PB-###** in Notion; the
experience framing below follows the [stories convention](./README.md) (INVEST + Gherkin + persona).
Each story cross-references the PB task(s) it satisfies and names a measurable success signal.

These stories **extend** the Sprint 1 navigation shell ([sprint-1-navigation-shell.md](./sprint-1-navigation-shell.md)),
which already shipped the SiteHeader/SiteFooter, the `(marketing)` shell, the branded 404 and
z-index tokens. SE8 here builds on that foundation rather than re-litigating it.

Personas: **Lena** (SMB marketer / buyer), **Sophie** (learner), **Tobias** (technical evaluator),
**Markus** (automator), **Mara** (a11y / mobile / reduced-motion), **Maintainer** (internal team).

| Epic | Theme | Persona focus |
| --- | --- | --- |
| **SE8 — Navigation & Orientation** | Always know where you are / what's next — breadcrumbs, active states, unified command palette | all |
| **SE9 — Accessibility & Inclusion** | WCAG AA, all 14 a11y modes (PB-035), keyboard, reduced motion, focus ring, font scaling | Mara |
| **SE10 — Motion, Delight & Polish** | Satisfying, performant, honest motion driven by motion tokens (PB-036) | all |
| **SE11 — Trust, Safety & Compliance** | GDPR, safety notes, demo-vs-live honesty, data export/delete | Lena, Tobias |
| **SE12 — Performance & Resilience** | Speed, skeletons (PB-017), error boundaries (PB-016), Core Web Vitals | all |
| **SE16 — Mobile & Responsive** | First-class small-screen; sidebar never overlaps content; touch targets ≥ 44px | all |

---

## SE8 — Navigation & Orientation

---

## ST-301 — Breadcrumbs on every deep marketing page
**Epic:** SE8
**Persona:** Lena
**Points:** 3

> As **Lena**, I want a breadcrumb trail on solution, industry and resource sub-pages so that I always
> understand where I am in the site hierarchy and can step back one level without hunting in the nav.

```gherkin
Given I am on a deep marketing route (e.g. Solutions › Marketing Automation, or Industries › Retail)
When  the page renders
Then  a breadcrumb trail shows Home › <Section> › <Current page> below the SiteHeader
And   every segment except the current one is a working link
And   the current segment is marked aria-current="page" and is not a link
And   the trail is driven by the single nav model, not hand-authored per page
```
**Success signal:** 100% of marketing routes ≥ 2 levels deep show a correct, link-resolving breadcrumb (PB-021).

---

## ST-302 — Active-section indicators across header and sub-navs
**Epic:** SE8
**Persona:** all
**Points:** 3

> As any visitor, I want the navigation to highlight the section I'm currently in so that I can orient
> myself at a glance instead of re-reading every label.

```gherkin
Given I am viewing any route under a top-level section
When  I look at the SiteHeader
Then  the matching top-level item carries an active state (aria-current and a visible indicator)
And   the indicator distinguishes the section root from a child page when both are reachable
And   the active state is computed from the current pathname, not duplicated per page
```
**Success signal:** for every route, the correct top-level nav item is marked active; 0 false positives in a route sweep.

---

## ST-303 — One unified command palette for the whole app
**Epic:** SE8
**Persona:** Tobias
**Points:** 5

> As **Tobias**, I want a single command palette that reaches bots, workflows, scenarios, knowledge and
> navigation so that I can jump anywhere from the keyboard instead of learning four different search boxes.

```gherkin
Given I press Cmd/Ctrl+K anywhere in the app
When  the command palette opens
Then  I can search across bots, workflows, scenarios, knowledge articles and primary navigation in one list
And   results are grouped by source and labelled with their type
And   arrow keys move selection, Enter navigates, and Escape closes returning focus to the trigger
And   the same palette is reachable from a visible affordance in the header for mouse/touch users
```
**Success signal:** 1 command palette replaces the fragmented per-surface search entry points; reachable on 100% of app routes.

---

## ST-304 — Scrollspy sub-nav on long content pages
**Epic:** SE8
**Persona:** Sophie
**Points:** 3

> As **Sophie**, I want a contents sub-nav on long knowledge articles that highlights my current section
> so that I never lose my place in a long read and can jump between sections.

```gherkin
Given I am reading a long article or sectioned marketing page
When  I scroll through the content
Then  an in-page contents list highlights the section currently in view
And   clicking an entry smooth-scrolls to that section (or jumps instantly under reduced motion)
And   the highlighted entry is exposed as aria-current to assistive tech
```
**Success signal:** scrollspy active section matches the viewport on all pages with ≥ 4 headed sections; CLS unaffected.

---

## ST-305 — "Where next" wayfinding at the end of pages
**Epic:** SE8
**Persona:** Lena
**Points:** 2

> As **Lena**, I want a clear "what's next" block at the bottom of key pages so that I'm never left at a
> dead end wondering what to do after I finish reading.

```gherkin
Given I reach the end of a marketing or knowledge page
When  I view the footer area above the SiteFooter
Then  I see 1–3 contextual next-step links (related page, try-it handoff, or next in a learning path)
And   the suggestions are relevant to the current page, not a generic list
```
**Success signal:** 0 key pages end in a dead end; ≥ 90% of pages surface at least one contextual next step.

---

## ST-306 — Page titles and metadata reflect location
**Epic:** SE8
**Persona:** Maintainer
**Points:** 2

> As the **Maintainer**, I want each route to set an accurate document title and breadcrumb-aligned
> metadata so that browser tabs, history and shared links communicate location consistently.

```gherkin
Given I open or share any route
When  the page loads
Then  the document <title> reflects the page and its section (e.g. "Marketing Automation — Solutions — ProBotica")
And   the title matches the breadcrumb trail for that route
And   open-graph metadata names the same page, so shared links preview correctly
```
**Success signal:** 100% of routes have a unique, location-accurate title matching their breadcrumb.

---

## SE9 — Accessibility & Inclusion

---

## ST-307 — All 14 accessibility modes implemented and persistent
**Epic:** SE9
**Persona:** Mara
**Points:** 8

> As **Mara**, I want every accessibility mode the menu advertises to actually work and to be remembered
> so that I configure my experience once and trust that it sticks.

```gherkin
Given I open the Theme & Accessibility menu
When  I toggle any of the 14 modes (reduced motion, high contrast, font scaling, dyslexia font,
      increased spacing, link underlines, focus-ring emphasis, reduced transparency, large targets,
      color-blind-safe palette, calm mode, keyboard-only affordances, reading guide, …)
Then  the mode takes visible effect immediately across the app
And   my choices persist across reloads and route changes via accessibility-storage
And   no advertised mode is a no-op
```
**Success signal:** 14 of 14 modes functional and persisted (was ~5 of 14) per PB-035.

---

## ST-308 — Contrast-safe focus ring nothing can obscure
**Epic:** SE9
**Persona:** Mara
**Points:** 3

> As **Mara**, I want a visible, contrast-safe focus indicator on every interactive element so that I
> always know where keyboard focus is, even over shaders, grain and overlays.

```gherkin
Given I navigate with the keyboard in any theme
When  focus lands on any interactive element
Then  a focus ring meeting WCAG AA non-text contrast is visible
And   the ring is never hidden behind the cursor layer, shaders, grain or modal overlays
And   the focus-ring-emphasis mode strengthens it further without breaking layout
```
**Success signal:** focus ring visible and AA-contrast on 100% of interactive elements across all themes; axe focus checks pass.

---

## ST-309 — Full keyboard operability with focus traps and skip link
**Epic:** SE9
**Persona:** Mara
**Points:** 5

> As **Mara**, I want to operate the entire app with a keyboard so that I never need a mouse to reach,
> use or escape any control.

```gherkin
Given I use only the keyboard
When  I tab through any page
Then  a "Skip to main content" link is the first focusable element
And   tab order is logical and follows visual order
And   menus, drawers and dialogs trap focus while open and release it to the trigger on Escape
And   no interactive element is reachable only by mouse or hover
```
**Success signal:** keyboard-only walkthrough completes every primary task on every top-level route with 0 traps or unreachable controls.

---

## ST-310 — Reduced-motion honored everywhere with static fallbacks
**Epic:** SE9
**Persona:** Mara
**Points:** 3

> As **Mara**, I want every animation to respect reduced-motion so that the cinematic layer never causes
> discomfort or blocks me from using the page.

```gherkin
Given prefers-reduced-motion is set OR the in-app reduced-motion / calm mode is on
When  I visit any animated surface (cursor, scroll reveals, horizontal agents, shader field, grain, home FX)
Then  each renders a calm static fallback with no parallax, auto-play or large transforms
And   essential content is fully visible without waiting for an animation
And   the custom cursor is disabled
```
**Success signal:** 0 animated components ignore reduced-motion; manual reduced-motion pass shows no involuntary movement.

---

## ST-311 — Font scaling and 200% zoom without breakage
**Epic:** SE9
**Persona:** Mara
**Points:** 3

> As **Mara**, I want to scale text and zoom the page without losing content so that I can read
> comfortably on any device.

```gherkin
Given I increase the in-app font scale or zoom the browser to 200%
When  I view any route
Then  text reflows without truncation, clipping or horizontal scrolling at 320px CSS width
And   no content or control becomes hidden or overlapped
And   font scaling persists across routes and reloads
```
**Success signal:** all routes usable at 200% zoom and max font scale with 0 clipped controls or horizontal scrollbars.

---

## ST-312 — Semantic structure, landmarks and accessible names
**Epic:** SE9
**Persona:** Mara
**Points:** 3

> As **Mara** using a screen reader, I want correct landmarks, ordered headings and labelled controls so
> that I can understand and navigate each page by structure.

```gherkin
Given I navigate any route with a screen reader
When  I move by landmark, heading or control
Then  header/nav/main/footer landmarks are present exactly once where expected
And   headings descend in order with no skipped levels
And   every icon-only button (lucide icons) has an accessible name
And   decorative shaders and grain canvases are aria-hidden
```
**Success signal:** axe smoke pass with 0 critical violations on every changed route; VoiceOver landmark/heading walkthrough succeeds.

---

## ST-313 — Live regions announce async results
**Epic:** SE9
**Persona:** Mara
**Points:** 2

> As **Mara**, I want AI runs, search results and toasts announced politely so that I'm aware of dynamic
> changes without watching the screen.

```gherkin
Given an asynchronous result occurs (an AI run completes, search results update, a toast appears)
When  the content changes
Then  the change is announced via an appropriate aria-live region (polite for results, assertive for errors)
And   announcements are not so frequent that they spam the screen reader
And   form errors are tied to their field via aria-describedby
```
**Success signal:** AI run, search and toast updates are announced in a screen-reader pass on 100% of relevant surfaces.

---

## SE10 — Motion, Delight & Polish

---

## ST-314 — Motion driven by shared tokens, not magic numbers
**Epic:** SE10
**Persona:** Maintainer
**Points:** 3

> As the **Maintainer**, I want all timings and easings to come from motion tokens so that motion feels
> coherent and is tunable in one place.

```gherkin
Given a developer adjusts an animation's duration or easing
When  they edit the motion tokens in lib/motion (easings.ts, transitions.ts)
Then  cursor, scroll reveals, horizontal agents and route transitions update consistently
And   no animated component hardcodes inline duration/easing magic numbers
```
**Success signal:** 0 hardcoded timing/easing values in motion components; all reference motion tokens (PB-036).

---

## ST-315 — Honest, performant route transitions
**Epic:** SE10
**Persona:** Lena
**Points:** 3

> As **Lena**, I want page transitions that feel intentional but never make me wait so that the product
> feels alive without feeling slow.

```gherkin
Given I navigate between routes
When  the transition plays
Then  it completes within the token-defined duration and never blocks interaction
And   content does not shift after the transition settles (CLS < 0.1)
And   under reduced motion the transition is an instant, fade-free swap
```
**Success signal:** route-transition CLS < 0.1 and no transition longer than the motion-token max on mid-tier hardware.

---

## ST-316 — Shader and grain layers gated on capability
**Epic:** SE10
**Persona:** Tobias
**Points:** 5

> As **Tobias** evaluating on varied hardware, I want heavy visual effects to gate themselves on device
> capability so that the experience stays smooth on mid- and low-end machines.

```gherkin
Given I load a page with the shader field and grain overlay
When  the device is low-end, on a touch screen, on data-saver, or has reduced motion enabled
Then  the 3D shader lazy-loads only when justified and degrades to a static gradient otherwise
And   the grain overlay stays GPU-cheap or disables under calm mode
And   sustained frame rate stays at or above 50fps on mid-tier hardware
```
**Success signal:** ≥ 50fps sustained with shaders on mid-tier hardware; static fallback confirmed on low-end/data-saver/touch.

---

## ST-317 — Every interactive surface has full state coverage
**Epic:** SE10
**Persona:** all
**Points:** 3

> As any user, I want every control to respond with clear hover, focus, active, disabled, loading and
> error states so that the interface always tells me what's happening.

```gherkin
Given I interact with any button, link, card or input
When  I hover, focus, press, or it becomes disabled/loading
Then  each state is visually distinct and uses design tokens
And   loading shows progress rather than a frozen control
And   the happy path is not the only designed state
```
**Success signal:** audit of shared interactive components shows hover/focus/active/disabled/loading/error designed for 100% of them.

---

## ST-318 — Custom cursor adapts and never gets in the way
**Epic:** SE10
**Persona:** Mara
**Points:** 2

> As **Mara**, I want the magnetic cursor to disappear on touch and under reduced motion so that it
> never obscures focus or content.

```gherkin
Given I am on a touch device, or have reduced motion / calm mode enabled
When  any page loads
Then  the custom cursor is fully disabled and the native cursor is used
And   on pointer devices the custom cursor never overlaps or hides the focus ring
And   the cursor sits at its own z-index token below modal overlays
```
**Success signal:** custom cursor absent on touch and reduced-motion; 0 reports of cursor obscuring focus or overlays.

---

## ST-319 — Micro-feedback confirms meaningful actions
**Epic:** SE10
**Persona:** Markus
**Points:** 2

> As **Markus**, I want immediate, subtle feedback when I save, copy, run or complete an action so that
> I trust the action registered.

```gherkin
Given I perform a meaningful action (save a run, copy a prompt, start a workflow)
When  the action succeeds
Then  I get immediate token-driven micro-feedback (a state change, toast, or check) within 100ms of confirmation
And   the feedback is announced to assistive tech and respects reduced motion
And   no action completes silently with no acknowledgement
```
**Success signal:** 100% of save/copy/run actions provide perceptible feedback within 100ms; all announce to screen readers.

---

## SE11 — Trust, Safety & Compliance

---

## ST-320 — Demo-vs-live state is always honest
**Epic:** SE11
**Persona:** Tobias
**Points:** 3

> As **Tobias**, I want the app to clearly mark when AI output is the no-key demo fallback versus a live
> model so that I never mistake canned output for a real run.

```gherkin
Given I run an AI bot or studio demo
When  OPENAI_API_KEY is absent and the demo fallback responds
Then  a clear, persistent "Demo response" badge accompanies the output
And   when a live model responds, the output is marked live with the model name
And   the demo path stays fully usable and never silently pretends to be live
```
**Success signal:** 100% of AI outputs labelled demo or live; 0 unlabelled fallback responses.

---

## ST-321 — Safety notes surfaced before and with bot runs
**Epic:** SE11
**Persona:** Lena
**Points:** 3

> As **Lena**, I want each bot's safety notes shown where I run it so that I understand limits and risks
> before relying on the output.

```gherkin
Given a bot defines safety notes in its BotDefinition
When  I view its detail page or run panel
Then  the safety notes are visible without expanding hidden sections
And   outputs carry a brief reminder that AI can be wrong and should be reviewed
And   bots with sensitive use cases show their notes prominently, not buried
```
**Success signal:** 100% of bots with safety notes display them on the run surface; usability test confirms Lena can find them unprompted.

---

## ST-322 — GDPR-compliant consent and cookie handling
**Epic:** SE11
**Persona:** Lena
**Points:** 5

> As **Lena** in the DACH region, I want clear consent for any tracking and accessible privacy
> information so that I trust the platform handles my data lawfully.

```gherkin
Given I visit the site for the first time
When  any non-essential cookie or analytics would load
Then  a consent banner asks before loading them, with equal-weight accept and reject options
And   no non-essential tracking runs until I consent
And   a linked privacy policy explains what is collected and why, in German-first language
And   I can change my consent later from a persistent control
```
**Success signal:** 0 non-essential trackers fire before consent; reject is as easy as accept; consent state persists and is editable.

---

## ST-323 — Export my workspace data
**Epic:** SE11
**Persona:** Markus
**Points:** 3

> As **Markus**, I want to export my workspace and saved runs so that I own my data and can move it or
> keep a record.

```gherkin
Given I have saved runs and workspace state
When  I choose "Export my data"
Then  I receive a structured, machine-readable export (e.g. JSON) of my workspaces and runs
And   the export includes everything stored about me, not a partial subset
And   the action works on the client-only persistence model and is documented as such
```
**Success signal:** export produces a complete, valid file covering 100% of stored user data; verified round-trip readable.

---

## ST-324 — Delete my data with confirmation
**Epic:** SE11
**Persona:** Lena
**Points:** 3

> As **Lena**, I want to delete my saved data so that I can exercise my right to erasure and clean up
> when I'm done.

```gherkin
Given I have stored workspace data
When  I choose "Delete my data" and confirm an explicit warning
Then  all my locally persisted workspaces, runs and accessibility/consent state are removed
And   the UI confirms the deletion and returns me to a clean empty state
And   nothing I deleted reappears after a reload
```
**Success signal:** deletion removes 100% of user-stored keys with no orphaned data after reload; confirmation prevents accidental loss.

---

## ST-325 — Transparent statements about what's real vs. roadmap
**Epic:** SE11
**Persona:** Tobias
**Points:** 2

> As **Tobias**, I want the product to be honest where data or features are synthetic or roadmap so that
> I can evaluate it accurately.

```gherkin
Given I view a surface backed by synthetic data (e.g. Control Center telemetry)
When  the page renders
Then  a clear note states the data is illustrative/synthetic, not real usage
And   roadmap-only features are labelled rather than implying full functionality
And   no synthetic chart is presented as live telemetry
```
**Success signal:** 100% of synthetic/roadmap surfaces carry an honesty label; 0 synthetic data presented as real.

---

## SE12 — Performance & Resilience

---

## ST-326 — Skeletons for every async surface
**Epic:** SE12
**Persona:** all
**Points:** 3

> As any user, I want meaningful loading skeletons instead of blank screens or layout jumps so that the
> app feels fast and stable while data loads.

```gherkin
Given a route or panel is loading data (bots, workflows, knowledge, AI runs)
When  the content is not yet ready
Then  a skeleton matching the final layout is shown
And   the skeleton reserves space so content does not shift in (CLS < 0.1)
And   under reduced motion the skeleton does not shimmer aggressively
```
**Success signal:** 100% of async surfaces show a layout-matched skeleton; route-load CLS < 0.1 (PB-017).

---

## ST-327 — Error boundaries that recover gracefully
**Epic:** SE12
**Persona:** Lena
**Points:** 3

> As **Lena**, I want a friendly recoverable error state when something fails so that one broken
> component never gives me a blank or crashed page.

```gherkin
Given a component or route throws at runtime
When  the error is caught by an error boundary
Then  a branded error panel appears with a plain-language message and a retry/back action
And   the rest of the app shell (header, footer, nav) stays intact
And   the error does not leak a stack trace to the user
```
**Success signal:** 0 white-screen crashes; every route segment is wrapped in an error boundary with a retry path (PB-016).

---

## ST-328 — Core Web Vitals within budget
**Epic:** SE12
**Persona:** all
**Points:** 5

> As any visitor, I want pages to load and become interactive quickly so that I'm not waiting on a slow,
> jumpy experience.

```gherkin
Given I load a key route on a mid-tier device over a typical connection
When  performance is measured
Then  LCP is under 2.5s, CLS under 0.1, and INP under 200ms
And   heavy 3D and motion assets lazy-load and do not block first paint
And   the targets hold on the home page and at least one app and one knowledge route
```
**Success signal:** LCP < 2.5s, CLS < 0.1, INP < 200ms on home + a representative app + knowledge route in lab measurement.

---

## ST-329 — Resilient AI runs with timeouts and retry
**Epic:** SE12
**Persona:** Markus
**Points:** 3

> As **Markus**, I want AI runs to fail gracefully with a retry option so that a slow or failed model
> call doesn't strand me with a frozen panel.

```gherkin
Given I start an AI run
When  the request is slow, times out, or errors
Then  the panel shows a clear status and a retry action rather than hanging indefinitely
And   a sensible timeout prevents an endless spinner
And   the no-key demo fallback path is equally resilient
```
**Success signal:** 0 indefinite spinners; every AI error/timeout offers retry and clears within the configured timeout.

---

## ST-330 — Graceful offline and flaky-network behavior
**Epic:** SE12
**Persona:** Mara
**Points:** 3

> As **Mara** on a low-end mobile with a flaky connection, I want the app to degrade gracefully when the
> network drops so that I'm informed instead of stuck.

```gherkin
Given my connection drops or becomes unreliable
When  a data request fails
Then  I see a clear offline/connection message with a retry, not a silent failure
And   already-loaded content and my client-side workspace state remain usable
And   the app recovers automatically when the connection returns
```
**Success signal:** simulated offline shows an informative state on 100% of data surfaces; no data loss to client-side state.

---

## ST-331 — Bundle and asset budgets enforced
**Epic:** SE12
**Persona:** Maintainer
**Points:** 3

> As the **Maintainer**, I want route bundle and asset sizes kept within budget so that performance
> doesn't regress silently as the app grows.

```gherkin
Given a change adds code or assets to a route
When  the build runs
Then  heavy dependencies (three, R3F, GSAP) are code-split and lazy-loaded off the critical path
And   images are served in modern formats at appropriate sizes
And   a route exceeding its size budget is surfaced rather than shipped unnoticed
```
**Success signal:** critical-path JS per marketing route stays within an agreed budget; 3D/motion libs absent from initial chunks where not needed.

---

## SE16 — Mobile & Responsive

---

## ST-332 — App sidebar never overlaps content on small screens
**Epic:** SE16
**Persona:** Lena
**Points:** 5

> As **Lena** on a phone, I want the app sidebar to collapse into an off-canvas drawer so that it never
> overlaps or hides the main content.

```gherkin
Given I am in the app shell on a viewport below the desktop breakpoint
When  the layout renders
Then  the sidebar is hidden off-canvas and the main content uses the full width with no overlap
And   a toggle opens the sidebar as a focus-trapped drawer over a scrim
And   Escape, the close button and tapping the scrim dismiss it, restoring focus to the toggle
And   content beneath the open drawer does not scroll
```
**Success signal:** 0 sidebar/content overlap from 360–768px; app content fully reachable on mobile.

---

## ST-333 — Touch targets meet the 44px minimum
**Epic:** SE16
**Persona:** Mara
**Points:** 3

> As **Mara** on a touch device, I want every tappable control to be large enough so that I can hit it
> reliably without mis-taps.

```gherkin
Given I use the app on a touch screen
When  I tap any interactive control (nav items, buttons, icon buttons, links in lists)
Then  each has a touch target of at least 44x44px
And   adjacent targets have enough spacing to avoid accidental taps
And   the large-click-targets accessibility mode increases them further
```
**Success signal:** 100% of interactive controls meet the 44px minimum target on touch viewports.

---

## ST-334 — Content reflows cleanly from 360px up
**Epic:** SE16
**Persona:** all
**Points:** 3

> As any mobile visitor, I want every page to reflow to a single, readable column on small screens so
> that I never scroll horizontally or see clipped content.

```gherkin
Given I view any route at 360px width
When  the page renders
Then  content reflows to fit with no horizontal scrolling
And   tables, code blocks and cards adapt (wrap, scroll-within, or stack) rather than overflow the viewport
And   text remains readable without pinch-zoom
```
**Success signal:** 0 horizontal-scroll or clipped-content issues on a 360px sweep of all top-level routes.

---

## ST-335 — Touch-friendly alternatives to hover and pinned scroll
**Epic:** SE16
**Persona:** Tobias
**Points:** 3

> As **Tobias** on a tablet, I want hover-only and pinned-scroll interactions to have touch equivalents
> so that I can access everything without a pointer.

```gherkin
Given a surface relies on hover (tooltips, hover menus) or pinned horizontal scroll (HorizontalAgents)
When  I use it on a touch device
Then  hover content is reachable via tap/expand
And   the horizontal agents showcase becomes a swipeable or stacked layout that no-ops the pin gracefully
And   no functionality is reachable only via hover
```
**Success signal:** 0 hover-only or pin-only interactions without a working touch equivalent on tablet/phone.

---

## ST-336 — Mobile forms and inputs are comfortable
**Epic:** SE16
**Persona:** Lena
**Points:** 2

> As **Lena** filling out a form on my phone, I want inputs that bring up the right keyboard and don't
> get covered by it so that data entry is painless.

```gherkin
Given I focus a form field on a mobile device
When  the on-screen keyboard appears
Then  the focused field stays visible above the keyboard
And   inputs declare appropriate types/inputmode so the correct keyboard shows (email, number, url)
And   labels and error messages remain visible while typing
```
**Success signal:** all forms keep the active field visible above the keyboard and use correct input types on mobile.

---

## ST-337 — Safe-area and orientation handling
**Epic:** SE16
**Persona:** Mara
**Points:** 2

> As **Mara** on a notched phone, I want the layout to respect device safe areas and both orientations so
> that controls are never hidden behind the notch or home indicator.

```gherkin
Given I use the app on a device with a notch/home indicator, in portrait or landscape
When  any page renders
Then  fixed elements (header, drawers, toasts) respect the device safe-area insets
And   rotating to landscape keeps all content and controls reachable without clipping
And   sticky elements never cover the only copy of a control
```
**Success signal:** 0 controls obscured by notch/safe-area or lost on orientation change across tested devices.
