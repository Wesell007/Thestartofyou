# AIC-J2 — Journey context correctness and freshness

Scope: TTC, pregnancy, first year only. No prompt change, no new journey type, no AIC-5, grounding, memory, history or voice change. J3 to J6 not started.

## Confirmed defect

Personal journey context is cached at module level in `useCompanionPersonalJourney` and invalidated only on auth change. Any in-app journey mutation therefore leaves stale context until reload.

Audited authoritative write paths (all of them, verified in the repository):

- `savedJourney.ts` — `upsertPregnancyJourney` (the single inner authority behind `commitPendingJourneyToDB` and `saveActivePregnancyJourney`), `updatePregnancyJourneyStatus`, `deletePregnancyJourney`.
- `savedTTCJourney.ts` — `commitPendingTTCJourneyToDB`, `deleteTTCJourney`.
- `firstYearJourney.ts` — `saveFirstYearJourney` (one RPC writes journey, babies, primary and lifecycle together, so one signal covers baby age and primary-baby changes). No other baby write path exists outside account deletion.

## The change signal

New `src/lib/journeyStateSignal.ts`: `notifyJourneyStateChanged()` and `subscribeJourneyStateChanged(listener)`, plus a test-only listener reset. In-memory emitter, no payload, no storage, no network, no analytics, no journey data. It means only "cached personal journey context is no longer trustworthy" and never becomes a second source of truth.

Emission rule: once per completed logical mutation, after success. Emission sits inside `upsertPregnancyJourney` (not in both callers), so the nested pregnancy path emits exactly once. Failures throw before the emit, so failed mutations emit zero. The opportunistic legacy backfill inside `getActivePregnancyJourney` is a read path that does not change the resolved journey, so it does not emit; this is documented.

## Immediate invalidation, no stale fallback

`useCompanionPersonalJourney` keeps the single cache and adds an epoch counter:

- invalidation bumps the epoch and clears cache and in-flight reference synchronously;
- a resolution that started before an invalidation can no longer write back; it is discarded and a fresh resolution is started;
- concurrent reads after a signal coalesce on one fresh in-flight resolution;
- a failed refresh returns `null`, never the previous journey.

One module-level listener owns invalidation, so mounting both companion surfaces cannot create duplicate listeners or duplicate database work. Existing auth invalidation stays and is tested independently of the journey signal.

No new caches anywhere. Personal remains a discriminated union from the `journeys.lifecycle` pointer, so TTC to pregnancy replaces rather than merges.

## Verification (no behaviour change expected)

Surfaces for the three journeys (TTC journey/hub/subtopics and ovulation tools; my week, my journey, week pages, toolkit, due-date tools; my first year, today, memories, month and topic pages). Personal versus page/entry separation for the three named conflicts. Page/entry freshness after navigation on both the panel and `/ask`, with no mutation of historical turns. Unknown stays unknown for signed out, no pointer, inactive pregnancy statuses, missing TTC stage, ambiguous babies and out-of-range age.

## Tests

New focused suite covering: exactly-one emission per logical mutation, zero on failure, no duplicate on the nested pregnancy path, subscribe/unsubscribe, payload-free signal; TTC cached then pregnancy save with zero TTC fields surviving; failed refresh after invalidation returning null; concurrent reads coalescing; auth and journey invalidation in both orders; the three precedence conflicts; navigation freshness.

## Validation

Reconcile the starting baseline, run the focused suite, then `npm test` (all pass, zero timeouts), `npm run typecheck` twice cache-defeated, `deno check` on `ai-search`, `npm run lint` at known baseline, `npm run build`. Update the journey/companion architecture doc and `roadmap.md`. No deployment; server source untouched.
