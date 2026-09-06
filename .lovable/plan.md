# AIC-J2 — Journey context correctness and freshness

Scope: TTC, pregnancy, first year only. No prompt rewrite, no new journey type, no safety, grounding, memory or history change, no voice work. AIC-J3 to J6 not started.

## The one real defect

Personal journey context is resolved once per browser session and cached in a module-level value, invalidated only when the auth session changes. Every in-app journey change therefore leaves stale context in place until reload: saving or editing a pregnancy (including the pending-journey commit after sign-up), changing pregnancy status (given birth, loss, no longer pregnant, paused), deleting a pregnancy, saving or deleting a TTC journey, and starting first year or changing baby details. A person who moves from TTC to pregnancy keeps sending TTC context to the companion.

## Fix: an explicit journey-state change signal

Add a tiny shared notifier module, `src/lib/journeyStateSignal.ts`:

- `notifyJourneyStateChanged()` and `subscribeJourneyStateChanged(listener)`, a plain in-memory emitter, no storage, no network, no payload. It carries no journey data, so it cannot become a second source of truth.

Call `notifyJourneyStateChanged()` from every authoritative write path, after the write succeeds:

- `savedJourney.ts`: `commitPendingJourneyToDB`, `saveActivePregnancyJourney`, `updatePregnancyJourneyStatus`, `deletePregnancyJourney`.
- `savedTTCJourney.ts`: the TTC save path and `deleteTTCJourney`.
- `firstYearJourney.ts`: first-year journey creation/update and the baby record write that determines age (including primary-baby selection).

`useCompanionPersonalJourney` subscribes on mount and, on each signal, clears the cache (`resetPersonalJourneyCache`) and re-resolves once. The existing auth-change reset stays. Resolution remains fail-open and bounded by the current 1.5s submit timeout.

Atomic replacement: because resolution always starts from the single `journeys.lifecycle` pointer and returns one discriminated personal object, a re-resolve replaces the whole context. Nothing merges or accumulates across journeys, and no lifecycle is remembered after the pointer moves.

## Verification work (no behaviour change expected)

- Confirm each of the three journeys' surfaces feeds the correct `JourneyContextV1`: pregnancy (my week, my journey, week pages, toolkit, due-date tools), TTC (TTC journey, hub and subtopics, ovulation tool), first year (my first year, today, memories, month and topic pages).
- Confirm page and entry context can never overwrite personal lifecycle, including the named cases: pregnancy user on a family article, TTC user on IVF content, first-year user on postpartum content.
- Confirm page and entry context refresh on navigation for both surfaces — the panel reads a live route ref; `/ask` builds its own entry context and needs the same check.
- Confirm unknown stays unknown: signed out, no pointer, non-active pregnancy status, TTC with no stage recorded, first year with ambiguous babies, first year beyond twelve months.

## Tests

Focused additions, no weakening of existing suites:

- Signal: each write path emits exactly once on success and not on failure.
- Hook: a signal clears the cache and the next request resolves fresh; auth change still resets; concurrent signals share one in-flight resolution.
- Transition: TTC context followed by a pregnancy save yields pregnancy context on the next request, with no TTC field surviving.
- Precedence: personal context wins over conflicting page/entry journeys in the three named cases.
- Unknown: each of the unknown cases produces no personal layer rather than a guess.
- Navigation: page context follows the current route on both surfaces without mutating earlier turns.

## Validation

`npm test` (default config, arithmetic reconciled), `npm run typecheck` twice with the incremental cache cleared, `deno check` on `ai-search` unchanged, `npm run lint` at known baseline, `npm run build`. Docs and `roadmap.md` updated with the J2 outcome and the confirmed frozen states: AIC-5 unchanged, grounding `30B-source-routing-v1` / 0 / 0 / [], memory and persistent history OFF, AMBER OFF, voice paused with AssemblyAI selection preserved and both voice flags OFF.

Files that must remain untouched: all AIC-5 modules, grounding and source routing, memory and history gating, every voice module and ADR, and `ai-search` prompt assembly.
