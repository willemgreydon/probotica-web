# Phase 2 — Product Depth

> Status: **planned** · Gated on Phase 1 verification (PB-030).
> PB tasks: PB-031 (Auth & Backend Persistence), PB-032 (Marketplace Commerce),
> PB-033 (Unified Search), PB-034 (Telemetry). Stories: SE4–SE7, SE13, SE17, SE18.

## Why this phase

Phase 1 makes the site coherent and walkable. Phase 2 makes the product **real**: accounts that
persist, work that is never lost, a marketplace that can transact, one search that finds anything,
and dashboards backed by actual usage instead of sine-wave placeholders.

## Workstreams

### E7 · Auth & Backend Persistence (PB-031) — *foundation of the phase*
The single most important unlock. Everything personal (saved workspaces, progress, purchases,
recommendations) depends on identity + a backend.

- **Choose a provider** (e.g. Auth.js/Clerk/Supabase Auth) and a persistence layer (Postgres/Supabase).
- Wire the existing UI stubs: `/login`, `/signup`, `/account` (shipped as placeholders in Sprint 1).
- **Workspace persistence**: server-side save, **export/import**, and **versioning**; eliminate the
  client-only state that can be lost today.
- Migrate `knowledge-progress` (currently localStorage) to sync to the account when signed in, with
  graceful local-first fallback when signed out.
- Acceptance: real auth; workspace persists with export/import + versioning; **0 data-loss**.

### E10 · Telemetry (PB-034) — *after PB-031*
- Emit real usage events (runs, failures, latency) from the AI routes and workspace.
- Replace Control Center's synthetic metrics with real aggregates; dashboards reflect actual runs.
- Acceptance: 100% real metrics (0 synthetic).

### E8 · Marketplace Commerce (PB-032)
- Pagination, sorting, pricing tiers, and a working cart/purchase flow.
- Builds on the `/pricing` placeholder and the marketplace catalog (post Shop→Marketplace merge).
- Acceptance: first transaction completed end-to-end.

### E9 · Unified Search (PB-033)
- One search surface across bots / workflows / scenarios / knowledge; retire the 4 fragmented searches.
- Reuse the command palette as the entry point; keyboard-navigable results grouped by type.
- Acceptance: 1 search surface (was 4); relevant results + keyboard nav.

## Dependency order

```
PB-031 Auth + persistence ─┬─► PB-034 Real telemetry
                           └─► PB-032 Commerce (accounts → carts/purchases)
PB-033 Unified search  (independent of auth; can run in parallel)
```

Recommended sequence: **PB-031 → PB-033 (parallel) → PB-032 → PB-034.**

## Definition of done (M2 + M3)

- Sign up / sign in works; protected routes gate correctly.
- Workspace state persists server-side with export/import + versioning; no data-loss across sessions.
- A purchase completes end-to-end; pricing tiers reflected.
- A single search returns relevant, keyboard-navigable results across all entity types.
- Control Center shows real usage; no synthetic series remain.
- `pnpm typecheck` + `pnpm build` green; no-key AI demo path still works.

## Risks specific to Phase 2

- **Scope**: PB-031 is 21 story points. Slice it: provider + session first, then workspace persistence,
  then progress sync. Ship behind the existing stubs incrementally.
- **Secrets/PII & GDPR**: DACH-first; design data export/delete from day one (ties to SE11 Trust).
- **Search relevance**: start with a typed in-memory index built from existing `data/*` (the
  `buildSearchIndex()` pattern already exists in knowledge) before introducing external search infra.
