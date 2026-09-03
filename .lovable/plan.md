# AIC-2 — Journey Context

Give both companion surfaces structured, minimal, provenance-separated journey context. Layer 1 only: no memory, no history, no emotional state, no voice, no UI redesign.

## Source audit (verified in code before planning)

Authoritative personal sources found:

| Journey | Source | Auth | Explicit? | Notes |
|---|---|---|---|---|
| Active journey pointer | `journeys.lifecycle` (`pregnancy` / `ttc` / `first_year`) via `getActivePregnancyJourney`, `getActiveTTCJourney`, `getActiveFirstYearJourney`, `useLifecycle` | authenticated only | yes | single row per user, no ambiguity |
| Pregnancy | `pregnancy_journeys` (lmp_date, due_date, status) with legacy `saved_journeys` fallback | authenticated | yes | status may be `given_birth` / `loss` / `paused` — only `active` yields personal stage |
| TTC | `ttc_journeys` (stage, support_status, ivf_consideration, cycle dates) | authenticated | yes | user-picked enums |
| IVF | no separate IVF journey record; only `ttc_journeys.ivf_consideration = in_treatment` | authenticated | yes | treated as TTC journey + `ivf` stage flag, not a separate journey type |
| First Year | `journeys.lifecycle = first_year` + `babies` (date_of_birth, is_primary, birth_order) | authenticated | yes | multiple babies possible; `is_primary` is the authoritative active selection |
| Toddler / Family / Postpartum | no personal journey record exists | — | — | classified UNAVAILABLE, never sent as personal |

Derivation utilities:
- First Year / postpartum age: `getFirstYearAge` in `src/lib/firstYearDates.ts` (canonical, reused as-is).
- Pregnancy week: currently duplicated verbatim in `MyWeek.tsx:49`, `MyJourney.tsx:75`, `KeptChapter.tsx:65` — identical formula, no discrepancy. AIC-2 adds one shared pure helper with the same formula and unit tests; existing pages are not refactored in this slice (recorded as debt).
- Trimester label: existing `trimesterLabel` in `src/lib/companionContext.ts`.

Existing freeform `context?: string`: panel uses `buildCompanionPanelContext` (route-derived only); `/ask` uses page context plus the `Previous question:` / `Previous answer:` pseudo-continuity. Pseudo-continuity stays untouched (AIC-4).

Backend logging audit: `ai-search` logs only version summary, provider status codes and error messages — no request body. No redaction change needed; a test will lock this in.

## Contract

`JourneyContextV1` (new, `src/lib/companion/journeyContext.ts`):

```ts
{
  version: 1,
  personal?: {
    journey: "pregnancy" | "trying-to-conceive" | "first-year",
    stage?: string,          // e.g. "week 24", "second trimester" handled below
    week?: number,           // pregnancy only, 1-42
    trimester?: "first" | "second" | "third",
    ageMonths?: number,      // first year only, 0-11
    ttcStage?: string,       // authoritative enum only
    ivf?: true               // only when ivf_consideration === "in_treatment"
  },
  page?: { journey?, pageType?, topic?, title?, week?, month? },
  entry?: { topic?, title?, journey?, stage? }
}
```

Hard rules encoded in the builder: page/entry never populate `personal`; no due date, DOB, email, user id, record id or profile object is ever included; ambiguous multi-baby state (more than one baby with no `is_primary`) omits `personal.ageMonths`; non-active pregnancy status omits personal pregnancy stage.

## Client work

1. `src/lib/companion/journeyContext.ts` — pure types + `buildJourneyContext({ personalSource, page, entry })`, plus derivation guards. No React, no Supabase.
2. `src/lib/companion/journeyPersonalSource.ts` + `useCompanionPersonalJourney()` — one authenticated read of the existing helpers (`getActivePregnancyJourney`, `getActiveTTCJourney`, `getActiveFirstYearJourney` / `getPrimaryBaby`), returning the minimal derived personal shape. Anonymous → `null`. No new tables, no caching layer beyond React state.
3. `src/lib/companion/companionRequest.ts` — extend `CompanionRequest` and `buildCompanionRequest` with optional `journeyContext`. Still pure; no network.
4. `src/hooks/useAISearch.ts` — accept optional `journeyContext` in `AISearchOptions` and include it in the existing single fetch body. Remains the sole executor; zero new fetch clients.
5. `CompanionProvider.tsx` — build `page` context from the route (reusing existing route resolvers) and attach personal context from the shared hook.
6. `AskPage.tsx` — build `entry` context from existing `stage`/`journey`/`topic` params and router state, attach the same personal context. Pseudo-continuity string untouched. Mode resolution unchanged.
7. `src/lib/askNavigation.ts` — small optional extension so CTAs may pass semantic entry info (topic/title) through existing router state; direct `/ask` with no state must keep working. No sensitive query strings.

Freeform `context` is left in place; duplicates are only removed if parity tests prove exact duplication.

## Backend work

8. `supabase/functions/_shared/validation.ts` — extend `parseAiSearchBody` to accept optional `journeyContext`: strict version check, enum allowlists, bounded strings, numeric range checks (week 1-42, month 0-11), rejection of unknown keys, nested objects and arrays. Requests without it stay valid.
9. `supabase/functions/_shared/aiJourneyContext.ts` (new) — deterministic renderer producing one small block, e.g.

```text
<journey_details>
Saved journey details (from the person's own saved profile):
- Journey: Pregnancy
- Current stage: Week 24 (second trimester)
Current content they are viewing:
- Topic: Sleep during pregnancy
Use these only when relevant. Page content is not a personal fact...
</journey_details>
```

plus the fixed interpretation rules (current message overrides saved context for this answer only, no persistence implied, never expose internal labels, safety rules win).

10. `ai-search/index.ts` — insert the rendered block as its own segment in `userContent`, between the question and the existing `<journey_context>` freeform block, before `<background_material>`. Urgent matching, kill switch, rate limiting, grounding and mode prompts are unchanged and still run first. Deploy `ai-search` only.

## Tests

Focused tests (no large snapshots) covering: contract validation accept/reject, backwards compatibility without `journeyContext`, builder personal/page separation, pregnancy derived week/trimester, first-year derived month, ambiguous-baby omission, IVF-with-general-mode, anonymous route ≠ personal, personal/page disagreement, no-data fallback, exclusion of due date / DOB / ids from the payload, panel↔`/ask` personal parity, renderer output appearing exactly once, safety and grounding paths unchanged, no raw context logging, precedence instruction present.

## Docs

- Update `docs/ai/companion-architecture.md` with the AIC-2 flow and exact prompt insertion point.
- New `docs/ai/companion-journey-context.md` with the contract, provenance, minimisation, precedence, ambiguity rules, validation, rendering, privacy guarantees and scenarios.
- ADR-AIC2-01 … ADR-AIC2-06 recorded.

## Out of scope (unchanged)

AIC-3 memory, AIC-4 continuity, AIC-5 emotion, AIC-6/7 voice, aiModes expansion, grounding version `30B-source-routing-v1`, NHS source governance, `useCompanionIdentity`, memory settings prototype, all UI structure.

## Validation

`npm test`, `npm run lint` (baseline 1 prefer-const error, 10 react-refresh warnings), `npm run typecheck`, `npm run build`, then `ai-search` deployment and a live non-emergency smoke test on both surfaces. Full 57-point report returned at the end.
