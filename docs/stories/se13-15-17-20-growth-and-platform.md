# Growth & Platform Stories — SE13–SE20

User-story view of the growth-and-platform epics: how probotica.at remembers people, motivates
learners, speaks German first, earns trust through social proof, opens up to developers, gets found
by search engines, and stays maintainable by its team. The framing follows the
[stories convention](./README.md) (INVEST + Gherkin + persona). Engineering plumbing is tracked as
**PB-###** in the roadmap CSVs; each story cross-references the PB task(s) it sits on.

Personas: **Lena** (SMB marketer / buyer), **Sophie** (learner), **Tobias** (technical evaluator),
**Markus** (automator), **Maintainer** (internal team).

| Epic | Theme | Persona focus |
| --- | --- | --- |
| **SE13 — Personalization & Progress** | Remember me, recommend, resume | Sophie, Lena |
| **SE14 — Gamified Learning & Motivation** | Streaks, badges, mastery, XP, spaced recall | Sophie |
| **SE15 — Localization (de-AT first)** | German-first DACH experience + i18n scaffolding | Lena, Sophie |
| **SE17 — Feedback, Community & Social Proof** | Ratings, sharing, testimonials, contact, reviews | Lena, Markus |
| **SE18 — Developer & API Experience** | Docs, customization, API keys, OpenAI-backed routes | Tobias |
| **SE19 — Content Hub & SEO** | Blog, case studies, OG, sitemap, schema.org | Lena, marketing |
| **SE20 — Admin & Content Ops** | Author/maintain content safely, CMS-ready | Maintainer |

---

## ST-401 — Remember me across visits
**Epic:** SE13
**Persona:** Sophie
**Points:** 5

> As **Sophie**, I want the site to remember who I am between visits so that my learning context
> follows me instead of resetting every time I return.

```gherkin
Given I have signed in once (auth from PB-031)
When  I close the browser and return later on the same device
Then  I am still recognized and greeted by name
And   my progress, recommendations and saved items are present without re-entry
And   if I am signed out my prior local progress is offered for merge on next sign-in
```
**Success signal:** returning-user recognition rate > 90% on same device; 0 silent progress loss after sign-in.

---

## ST-402 — Resume exactly where I left off
**Epic:** SE13
**Persona:** Sophie
**Points:** 3

> As **Sophie**, I want a "Continue" entry point that jumps me back to my last article, path step, or
> bot run so that I never have to re-find my place.

```gherkin
Given I have an in-progress learning path or a recent bot run
When  I open the home page or my dashboard
Then  a "Continue where you left off" card shows the exact item and my position in it
And   selecting it deep-links to that article section, path step, or workspace run
And   the card disappears once that item is completed
```
**Success signal:** > 60% of returning learners with in-progress items use Continue within first two screens.

---

## ST-403 — Personalized recommendations
**Epic:** SE13
**Persona:** Lena
**Points:** 5

> As **Lena**, I want recommendations tuned to what I have read and run so that I discover the next
> useful bot or article without hunting.

```gherkin
Given I have viewed at least one bot and one knowledge article
When  I visit the home page or a relevant index
Then  a "Recommended for you" rail shows items related to my interests and difficulty level
And   each recommendation states why it was suggested (e.g. "because you read Prompt Engineering")
And   with no history I see a sensible curated default, never an empty rail
```
**Success signal:** recommendation click-through > 15%; rail never renders empty.

---

## ST-404 — A personal dashboard
**Epic:** SE13
**Persona:** Sophie
**Points:** 5

> As **Sophie**, I want one place that shows my progress, saved items, recent activity and what's next
> so that I have a home base inside the platform.

```gherkin
Given I am signed in
When  I open my dashboard
Then  I see progress across started learning paths, saved bots, recent runs and recommended next steps
And   each tile links to the underlying item
And   an empty dashboard shows guided first-steps rather than a blank screen
```
**Success signal:** dashboard reachable in 1 click from any signed-in page; empty state has 0 dead tiles.

---

## ST-405 — Privacy-respecting personalization controls
**Epic:** SE13
**Persona:** Lena
**Points:** 3

> As **Lena**, I want to see and control what the site remembers about me so that personalization
> never feels like surveillance and stays GDPR-honest.

```gherkin
Given personalization stores my activity and preferences
When  I open privacy or personalization settings
Then  I can view, export and clear my stored progress and preferences
And   I can turn personalization off and fall back to a neutral experience
And   clearing data takes effect immediately on both client and (when signed in) server
```
**Success signal:** export + clear available in settings; clearing removes all personalization within one session.

---

## ST-406 — Cross-device progress sync
**Epic:** SE13
**Persona:** Sophie
**Points:** 8

> As **Sophie**, I want my progress to follow me from laptop to phone so that I can learn on whichever
> device is at hand.

```gherkin
Given I am signed in (PB-031) and complete an article on my laptop
When  I open the same path on my phone shortly after
Then  that step shows as completed without re-doing it
And   conflicting offline edits are merged by most-recent-completion
And   while signed out, progress still persists locally and syncs on next sign-in
```
**Success signal:** completion made on device A appears on device B within one refresh; no overwrite of newer progress.

---

## ST-407 — Streaks that reward consistent learning
**Epic:** SE14
**Persona:** Sophie
**Points:** 5

> As **Sophie**, I want a learning streak that counts days I make progress so that I am motivated to
> come back regularly. This extends the existing knowledge-progress store and the PathJourney/PathQuiz
> feature rather than adding a parallel one.

```gherkin
Given the existing per-path progress store records completion timestamps
When  I complete at least one article or pass a quiz on a given day
Then  my streak count for that day increments and is persisted alongside path records
And   the header or dashboard shows my current and longest streak
And   a missed day resets the current streak but preserves the longest, with no guilt-heavy framing
```
**Success signal:** streak visible on dashboard; streak logic reuses the existing progress store, not a parallel one.

---

## ST-408 — Badge gallery and earned achievements
**Epic:** SE14
**Persona:** Sophie
**Points:** 5

> As **Sophie**, I want a gallery of badges I can earn and have earned so that my accomplishments are
> visible and worth chasing. This extends the existing "Achieved" journey badge and PathProgressBadge.

```gherkin
Given the existing journey "Achieved" badge marks a finished path
When  I open the badge gallery
Then  I see all available badges with earned ones highlighted and locked ones showing their criteria
And   completing a path, hitting a streak milestone, or quiz mastery unlocks the matching badge with a reduced-motion-safe cue
And   badges persist and reflect the same source of truth as path progress
```
**Success signal:** every earnable badge has visible criteria; 0 duplicate badge state outside the progress store.

---

## ST-409 — Mastery levels per topic
**Epic:** SE14
**Persona:** Sophie
**Points:** 5

> As **Sophie**, I want a mastery level per topic that grows as I learn and recall so that I can see my
> depth of understanding, not just completion. This extends the existing PathQuiz scoring.

```gherkin
Given I complete articles and pass quizzes within a topic
When  I view that topic or my dashboard
Then  a mastery level (e.g. Novice -> Practitioner -> Expert) is shown for the topic
And   the level reflects both coverage and quiz performance, not completion alone
And   levels can rise with stronger quiz scores and decay only via the spaced-recall rules below
```
**Success signal:** mastery level derivable from existing quiz/progress data; level shown on at least topic and dashboard surfaces.

---

## ST-410 — XP that quantifies effort
**Epic:** SE14
**Persona:** Sophie
**Points:** 3

> As **Sophie**, I want to earn XP for learning actions so that progress feels tangible and comparable
> over time.

```gherkin
Given I read an article, pass a quiz, maintain a streak, or earn a badge
When  the action completes
Then  XP is awarded with a clear amount and reason
And   my total XP and recent gains are visible on the dashboard
And   XP is persisted in the same progress store and never awarded twice for the same action
```
**Success signal:** XP awards are idempotent per action; total XP visible and consistent across reloads.

---

## ST-411 — Spaced repetition for durable recall
**Epic:** SE14
**Persona:** Sophie
**Points:** 8

> As **Sophie**, I want the platform to resurface concepts I learned a while ago so that knowledge
> sticks instead of fading. This extends PathQuiz and the quiz records in the knowledge-progress store.

```gherkin
Given I passed a quiz some days ago and have not revisited the topic
When  the spaced-recall interval for that concept elapses
Then  my dashboard surfaces a short "Review" prompt drawn from the existing path quizzes
And   passing the review extends the interval and may raise mastery; failing shortens it and nudges a re-read
And   reviews never block new learning and respect a daily cap
```
**Success signal:** at least one review surfaces on schedule for revisited learners; intervals widen on success, narrow on failure.

---

## ST-412 — Mastery-aware "try it" handoff
**Epic:** SE14
**Persona:** Sophie
**Points:** 3

> As **Sophie**, I want my mastery to unlock or recommend the matching bot to run so that learning a
> concept earns me a concrete next action in the product.

```gherkin
Given I reach a mastery threshold for a topic with a related bot
When  I view the topic or earn the milestone
Then  a "You're ready to try it" handoff links to the matching bot in the Bot Lab
And   the handoff explains the connection between the concept and the bot
And   the no-key AI fallback still lets me run the bot without an API key
```
**Success signal:** mastery milestones produce a working bot handoff; handoff respects the no-key fallback.

---

## ST-413 — German-first content by default
**Epic:** SE15
**Persona:** Lena
**Points:** 8

> As **Lena** in Austria, I want the site to speak de-AT by default so that the product feels made for
> the DACH market and I never have to mentally translate.

```gherkin
Given I visit probotica.at from a German-language context
When  the site loads
Then  navigation, marketing copy, CTAs and key knowledge content render in de-AT
And   Austrian spelling and tone are used (not generic machine German)
And   no English-only string leaks into primary German surfaces
```
**Success signal:** primary marketing + nav surfaces 100% de-AT; 0 untranslated strings on the German default path.

---

## ST-414 — i18n scaffolding for maintainable translation
**Epic:** SE15
**Persona:** Maintainer
**Points:** 5

> As the **Maintainer**, I want a typed i18n scaffold so that copy lives in message catalogs and new
> languages can be added without touching components.

```gherkin
Given a developer adds or changes user-facing copy
When  they edit the locale message catalog (de-AT as source)
Then  components read strings by key, not hardcoded literals
And   a missing key surfaces a visible warning in development, not a blank or crash
And   adding a new locale requires only a new catalog, not component edits
```
**Success signal:** 0 hardcoded user-facing strings in scaffolded components; missing-key warnings visible in dev.

---

## ST-415 — Language switcher with remembered preference
**Epic:** SE15
**Persona:** Sophie
**Points:** 3

> As **Sophie**, I want to switch language and have my choice remembered so that I read in whichever
> language I am most comfortable with.

```gherkin
Given the language switcher is available in the header or footer
When  I select a different available language
Then  the current page re-renders in that language without losing my place
And   my choice persists across pages and visits
And   the switcher only offers locales that are actually translated
```
**Success signal:** language choice persists across navigation and reloads; switcher hides untranslated locales.

---

## ST-416 — Localized formats, SEO and metadata
**Epic:** SE15
**Persona:** Lena
**Points:** 5

> As **Lena**, I want dates, numbers and search metadata localized so that the site reads naturally and
> ranks for German queries in the DACH region.

```gherkin
Given content renders in de-AT
When  a page shows dates, numbers or reading times, and search engines crawl it
Then  formats follow Austrian conventions (e.g. 16.06.2026, decimal comma)
And   hreflang and localized meta tags declare the page language and region
And   localized OG/meta titles are used (ties to PB-020)
```
**Success signal:** de-AT formats throughout; valid hreflang on localized routes; localized OG titles present.

---

## ST-417 — Localized knowledge content fallback
**Epic:** SE15
**Persona:** Sophie
**Points:** 5

> As **Sophie**, I want untranslated articles to degrade gracefully so that a missing translation never
> hides knowledge from me.

```gherkin
Given a knowledge article exists in de-AT but not yet in another selected locale
When  I view it in that locale
Then  I see the available language with a clear "not yet translated" notice and an offer to read de-AT
And   the content model carries a per-locale translation status (CMS-ready, ties to SE20)
And   navigation and chrome remain in my selected language even when the body falls back
```
**Success signal:** 0 broken/empty article bodies due to missing translations; fallback notice shown when used.

---

## ST-418 — Star ratings and reviews on bots
**Epic:** SE17
**Persona:** Lena
**Points:** 5

> As **Lena**, I want to see and leave ratings and reviews on bots so that I can judge quality from real
> users before I rely on a bot.

```gherkin
Given I am viewing a bot in the Bot Lab or marketplace
When  the page loads
Then  an aggregate star rating and recent reviews are shown
And   as a signed-in user I can leave a star rating and short review
And   reviews are attributed, dated, and moderatable, with an empty state inviting the first review
```
**Success signal:** ratings visible on bot and marketplace cards; first-review empty state present; 0 unattributed reviews.

---

## ST-419 — Share what I made or learned
**Epic:** SE17
**Persona:** Markus
**Points:** 3

> As **Markus**, I want to share a bot, workflow, or article via link and social so that I can show
> colleagues what the platform does.

```gherkin
Given I am on a shareable bot, workflow, or article
When  I use the share control
Then  I get a copyable canonical link and native/social share targets
And   the shared link renders a rich preview with a localized OG image and title (ties to PB-020)
And   shared deep links resolve directly to the item, not a generic landing page
```
**Success signal:** share control on key item pages; shared links produce valid OG previews and resolve deep.

---

## ST-420 — Testimonials and social proof on marketing pages
**Epic:** SE17
**Persona:** Lena
**Points:** 3

> As **Lena**, I want credible testimonials and proof points on marketing pages so that I trust the
> product enough to start.

```gherkin
Given I am on the home, pricing, or solutions page
When  the page loads
Then  I see real attributed testimonials and trust markers (e.g. logos, outcomes)
And   testimonials are typed, centralized content (CMS-ready, ties to SE20)
And   proof claims are honest and dated, with no fabricated metrics
```
**Success signal:** testimonials present on >= 3 marketing surfaces; all attributed; 0 invented numbers.

---

## ST-421 — Reliable contact and feedback channel
**Epic:** SE17
**Persona:** Lena
**Points:** 3

> As **Lena**, I want a clear way to contact the team and send feedback so that I can ask questions or
> report issues without leaving the site.

```gherkin
Given I want to reach the team or report a problem
When  I open the contact or feedback form
Then  I can submit a message with email and category, validated with zod
And   I receive a confirmation and a stated response expectation
And   submissions reach the team (or, with no backend, are stored/queued with an honest notice)
```
**Success signal:** contact + feedback form submits with validation; user always gets a confirmation state.

---

## ST-422 — Case studies as social proof
**Epic:** SE17
**Persona:** Markus
**Points:** 5

> As **Markus**, I want to read concrete case studies so that I can see how others built workflows and
> what results they got.

```gherkin
Given case-study content exists (ties to PB-037)
When  I browse the case-studies index and open one
Then  I see the problem, the bots/workflows used, and the measured outcome
And   each case study links to the relevant bots or workflow templates to try
And   case studies are typed, centralized content shared with the content hub (SE19/SE20)
```
**Success signal:** >= 3 case studies live, each linking to a runnable bot/workflow; outcomes stated honestly.

---

## ST-423 — Clear developer documentation
**Epic:** SE18
**Persona:** Tobias
**Points:** 5

> As **Tobias**, I want developer docs that explain the architecture, bot model, and integration points
> so that I can evaluate building on ProBotica quickly.

```gherkin
Given I am evaluating the platform as a developer
When  I open the developer docs
Then  I find the bot/workflow data model, the OpenAI-backed route contract, and the no-key fallback explained
And   examples are copy-pasteable and reflect the real typed contracts in the codebase
And   docs state what is live vs. roadmap honestly (e.g. persistence, telemetry)
```
**Success signal:** docs cover bot model + route contract + fallback; examples match shipped types; live-vs-roadmap labeled.

---

## ST-424 — API keys for programmatic access
**Epic:** SE18
**Persona:** Tobias
**Points:** 8

> As **Tobias**, I want to generate and manage API keys so that I can call ProBotica endpoints from my
> own application securely.

```gherkin
Given I am a signed-in developer (PB-031)
When  I open the API keys section
Then  I can create, name, copy-once, and revoke keys
And   keys are scoped and never displayed in full after creation
And   requests authenticated with a key are rate-limited and attributed to me
```
**Success signal:** keys can be created/revoked; secret shown once; authenticated requests are rate-limited and attributed.

---

## ST-425 — Documented, OpenAI-backed API routes
**Epic:** SE18
**Persona:** Tobias
**Points:** 5

> As **Tobias**, I want stable, documented API routes for running bots so that I can integrate without
> reverse-engineering the UI.

```gherkin
Given a documented "run a bot" endpoint exists (nodejs runtime, OpenAI-backed)
When  I POST a valid request with an API key
Then  I receive a typed, versioned response with the bot output and usage metadata
And   invalid input returns a clear zod-validated error, not a stack trace
And   without OPENAI_API_KEY the endpoint returns the demo fallback, never a hard failure
```
**Success signal:** documented endpoint returns typed responses; zod errors on bad input; fallback path never errors.

---

## ST-426 — Customize a bot's behavior
**Epic:** SE18
**Persona:** Tobias
**Points:** 5

> As **Tobias**, I want to override a bot's system prompt, model, and temperature so that I can adapt it
> to my use case.

```gherkin
Given a bot has a typed BotDefinition with prompt, model, and temperature
When  I supply overrides via the UI or API
Then  the run uses my overrides while preserving the bot's safety notes
And   overrides are validated and bounded (e.g. temperature range)
And   I can save a customized variant for reuse without mutating the original definition
```
**Success signal:** overrides apply and validate; original BotDefinition stays immutable; safety notes always enforced.

---

## ST-427 — Integration recipes for common tools
**Epic:** SE18
**Persona:** Markus
**Points:** 5

> As **Markus**, I want ready-made integration recipes so that I can plug ProBotica workflows into my
> existing stack quickly.

```gherkin
Given I want to connect a workflow to an external tool (e.g. webhook, Zapier-style trigger, Slack)
When  I open the integrations or recipes section
Then  I find step-by-step recipes with payload examples for at least the most common targets
And   each recipe states required scopes/keys and links to the relevant API route docs
And   recipes clearly mark what is available now vs. roadmap
```
**Success signal:** >= 3 integration recipes with working payload examples; each links to API docs and labels availability.

---

## ST-428 — Blog as a content hub
**Epic:** SE19
**Persona:** Lena
**Points:** 5

> As **Lena**, I want a blog with useful, well-structured posts so that I learn from ProBotica before
> buying and keep coming back.

```gherkin
Given a blog exists (ties to PB-037)
When  I open the blog index and a post
Then  posts are typed, centralized content with author, date, tags, and reading time
And   the index supports tag/topic filtering and pagination
And   posts link into relevant knowledge articles and bots, reinforcing learn-then-run
```
**Success signal:** blog index + post template live; posts typed and filterable; each post links to >= 1 bot or article.

---

## ST-429 — Generated sitemap and robots
**Epic:** SE19
**Persona:** Maintainer
**Points:** 3

> As the **Maintainer**, I want an auto-generated sitemap and robots policy so that search engines crawl
> every public route and skip the private ones.

```gherkin
Given public routes (marketing, knowledge, blog, case studies) and private routes (workspace, control-center) exist
When  sitemap.xml and robots.txt are generated (ties to PB-018, PB-019)
Then  every canonical public URL appears in the sitemap with sensible lastmod and priority
And   robots disallows private/app routes and points to the sitemap
And   localized routes declare hreflang (ties to SE15)
```
**Success signal:** sitemap covers 100% of public canonical routes; robots blocks app routes; 0 private URLs in sitemap.

---

## ST-430 — Rich social previews via OG images
**Epic:** SE19
**Persona:** Lena
**Points:** 5

> As **Lena** in marketing, I want every shareable page to produce a branded social preview so that
> links look credible when shared.

```gherkin
Given a page is shared on social or chat
When  the preview is fetched (ties to PB-020)
Then  a dynamic, branded OG image with the page title and type is generated
And   knowledge, bots, blog and case studies each get an appropriate template
And   the OG title/description are localized to match the page language (SE15)
```
**Success signal:** valid OG image + tags on all shareable templates; previews render correctly in major platforms.

---

## ST-431 — Structured data (schema.org)
**Epic:** SE19
**Persona:** Maintainer
**Points:** 3

> As the **Maintainer**, I want schema.org structured data on content pages so that search engines
> understand and richly display our articles, courses, and reviews.

```gherkin
Given a knowledge article, blog post, learning path, or rated bot renders
When  the page is crawled
Then  appropriate JSON-LD (Article, Course, FAQ, AggregateRating/Review, Organization) is emitted
And   the structured data validates against schema.org with no errors
And   the data reflects real on-page content, not stuffed or fabricated values
```
**Success signal:** key content types emit valid JSON-LD; 0 validator errors; data matches visible content.

---

## ST-432 — Discoverable, internally-linked content
**Epic:** SE19
**Persona:** Sophie
**Points:** 3

> As **Sophie**, I want content to be cross-linked and surfaced through related items so that I can
> follow a topic deeper and search engines see a coherent topic cluster.

```gherkin
Given an article, blog post, or case study
When  I reach the end of it
Then  I see related articles, the matching learning path, and relevant bots
And   internal links use canonical URLs and descriptive anchor text
And   orphan content (no inbound internal links) is flagged for the content team (SE20)
```
**Success signal:** every content page links to >= 3 related items; 0 orphan pages in the published set.

---

## ST-433 — Author content without breaking the build
**Epic:** SE20
**Persona:** Maintainer
**Points:** 5

> As the **Maintainer**, I want to author and edit content against the typed model so that I can publish
> confidently without risking the build.

```gherkin
Given content lives in typed, centralized data files (lib/*-types.ts + data/*.ts), CMS-ready for Sanity/MDX
When  I add or edit an article, bot, blog post, or testimonial
Then  type checks catch missing or malformed fields before build
And   the content shape is preserved for a future CMS migration (no shape drift)
And   pnpm typecheck and pnpm build stay green after my edit
```
**Success signal:** malformed content fails typecheck pre-build; content shape stays CMS-compatible; build green.

---

## ST-434 — Draft, preview, and publish workflow
**Epic:** SE20
**Persona:** Maintainer
**Points:** 5

> As the **Maintainer**, I want to mark content as draft and preview it before it goes live so that
> unfinished content never reaches visitors.

```gherkin
Given content carries a status field (draft / published / archived)
When  I set an item to draft
Then  it is viewable in a preview context but excluded from public lists, sitemap, and search
And   publishing makes it appear everywhere it belongs, including the sitemap (SE19)
And   archiving hides it from listings while keeping its URL resolvable or redirected
```
**Success signal:** 0 draft items in public lists or sitemap; published items appear consistently across surfaces.

---

## ST-435 — Content validation and health checks
**Epic:** SE20
**Persona:** Maintainer
**Points:** 3

> As the **Maintainer**, I want automated checks on content quality so that broken links, missing
> metadata, and orphan pages are caught before they ship.

```gherkin
Given content is added or changed
When  the content health check runs (locally or in CI)
Then  it reports broken internal links, missing required SEO metadata, untranslated required strings, and orphan pages
And   each issue names the file and field to fix
And   critical issues block publish; warnings are advisory
```
**Success signal:** health check flags broken links/missing-meta/orphans with file+field; critical issues block publish.

---

## ST-436 — Manage testimonials, reviews, and case studies
**Epic:** SE20
**Persona:** Maintainer
**Points:** 3

> As the **Maintainer**, I want to curate social-proof content so that what appears on the site stays
> accurate, approved, and on-brand.

```gherkin
Given user reviews (SE17) and editorial testimonials/case studies exist
When  I review the moderation/curation queue
Then  I can approve, edit, feature, or remove items against the typed content model
And   only approved items appear publicly, with attribution and date intact
And   removing or unfeaturing an item updates every surface that referenced it
```
**Success signal:** only approved social proof renders publicly; curation actions propagate to all referencing surfaces.

---

## ST-437 — Roles and safe content access (PB-034)
**Epic:** SE20
**Persona:** Maintainer
**Points:** 5

> As the **Maintainer**, I want content-ops actions gated by role so that only authorized team members
> can publish or moderate, in line with the auth/roles foundation.

```gherkin
Given roles exist on top of auth (ties to PB-031, PB-034)
When  a user without the editor/admin role attempts a content-ops action
Then  the action is denied with a clear message and no partial change
And   editors can author and publish, admins can manage roles and moderation
And   every publish, moderation, and role change is recorded in an audit trail
```
**Success signal:** content-ops actions enforce role checks; 0 unauthorized publishes; audit trail captures every change.
