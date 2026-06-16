# Sprint 1 Stories — Navigation & Shell Unification

User-story view of Phase 1 · Sprint 1. Engineering tasks tracked as **PB-###** in Notion; the
experience framing below follows the [stories convention](./README.md) (INVEST + Gherkin + persona).
Each story cross-references the PB task(s) it satisfies.

Personas: **Lena** (SMB marketer / buyer), **Sophie** (learner), **Tobias** (technical evaluator),
**Mara** (a11y / mobile / reduced-motion), **Maintainer** (internal team).

---

## ST-N01 — Always-present navigation chrome
**PB:** PB-001, PB-002, PB-003, PB-005
**Points:** 8

> As **Lena**, I want a consistent header and footer on every public page so that I never land on a
> dead-end screen and can always get back to the rest of the site.

```gherkin
Given I am on any marketing route (home, about, solutions, industries, knowledge, pricing, legal…)
When  the page loads
Then  a sticky SiteHeader with logo, primary nav and CTAs is visible
And   a SiteFooter with grouped links, legal and social is visible
And   the logo returns me to the home page
```
**Success signal:** 0 marketing pages without header+footer (was ~17).

---

## ST-N02 — One coherent navigation model
**PB:** PB-010, PB-013
**Points:** 3

> As the **Maintainer**, I want a single typed source of truth for navigation so that links are
> defined once and reused by header, footer, mobile menu and sitemap.

```gherkin
Given a developer needs to add or rename a navigation link
When  they edit lib/content/navigation.ts
Then  the change appears in header, footer and mobile menu without editing each
And   the top level is exactly Product, Solutions, Industries, Resources, Pricing, Company
And   Legal links live in the footer, not the top level
```
**Success signal:** 1 nav model; 0 duplicated top-level link lists.

---

## ST-N03 — Keyboard- and screen-reader-friendly navigation
**PB:** PB-001 (a11y acceptance)
**Points:** 3

> As **Mara**, I want the navigation to be fully keyboard and screen-reader accessible so that I can
> use the site without a mouse and without motion discomfort.

```gherkin
Given I navigate with the keyboard
When  I tab to a nav dropdown and press Enter/Space
Then  it opens, its items are reachable, and Escape closes it returning focus to the trigger
And   a "Skip to main content" link is the first focusable element
And   prefers-reduced-motion suppresses non-essential animation
```
**Success signal:** axe smoke pass on header/footer; keyboard-only walkthrough succeeds.

---

## ST-N04 — Mobile navigation
**PB:** PB-001 (mobile), PB-009 (polish, later)
**Points:** 3

> As **Mara** on a phone, I want a usable mobile menu so that I can reach every section on a small
> screen.

```gherkin
Given I am on a viewport between 360px and 768px
When  I open the mobile navigation
Then  a focus-trapped drawer lists all nav groups
And   Escape and the close button dismiss it
```
**Success signal:** mobile nav usable 360–768px.

---

## ST-N05 — Branded, recoverable 404
**PB:** PB-015
**Points:** 2

> As **Sophie**, when I hit a broken or mistyped URL, I want a branded page that helps me get back on
> track so that I don't bounce.

```gherkin
Given I navigate to a URL that does not exist
When  the 404 renders
Then  it shows brand styling with header and footer
And   it offers recovery links to key destinations
```
**Success signal:** 0 unstyled error screens.

---

## ST-N06 — No dead navigation links (pricing & auth entry points)
**PB:** PB-023, PB-024, PB-025
**Points:** 3

> As **Tobias** evaluating the product, I want the "Pricing", "Sign in" and "Get started" links to
> lead somewhere real so that the site feels trustworthy and complete.

```gherkin
Given the SiteHeader exposes Pricing, Sign in and Get started
When  I click any of them
Then  I land on a branded page (pricing comparison, or auth placeholder)
And   no navigation link 404s
```
**Success signal:** every primary nav + footer link resolves.

---

## ST-N07 — Honest, tokenized visual stacking
**PB:** PB-027
**Points:** 2

> As the **Maintainer**, I want stacking order driven by z-index tokens so that overlays, header and
> cursor never collide and the system is predictable.

```gherkin
Given overlays, header, mobile menu and cursor share the screen
When  any two overlap
Then  their order follows named z-index tokens (no hardcoded magic numbers in those layers)
```
**Success signal:** 0 hardcoded z-index in nav/overlay layers.

---

## ST-N08 — Home page on the shared shell
**PB:** PB-007
**Points:** 3

> As **Lena**, I want the home page to use the same header/footer as the rest of the site so that the
> experience is consistent, while still offering quick jumps to its sections.

```gherkin
Given I am on the home page
When  it loads
Then  it uses SiteHeader + SiteFooter (the bespoke header is gone)
And   a scrollspy sub-nav highlights the current section as I scroll
```
**Success signal:** 1 header system sitewide (was 3).

---

## ST-N09 — Green build & walkable site
**PB:** PB-030
**Points:** 2

> As the **Maintainer**, I want typecheck and build to pass and every route to have chrome so that the
> sprint is releasable.

```gherkin
Given the sprint changes are complete
When  pnpm typecheck and pnpm build run
Then  both pass with no errors
And   a walkthrough of key routes shows chrome everywhere and no broken links
```
**Success signal:** build green; 0 broken links.
