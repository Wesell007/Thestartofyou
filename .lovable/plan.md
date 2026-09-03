# AIC-5A — Deterministic Safety Foundation

Build-mode approval is recorded; this card exists only because the workspace is still in plan mode. Approve it to start the build exactly as scoped below.

## Pre-build gates (run before any production edit)

1. Run `companionSurfaces.test.tsx` alone, then the full suite. Proceed only if clean; record the baseline as 80 files / 794 passing. If the dynamic-import timeout repeats, stop and diagnose instead of editing safety code.
2. Re-check `/`, `/trying-to-conceive`, `/ask`, `/pregnancy`, `/first-year` and a 404 route for the `useCompanion must be used inside CompanionProvider` error. Not reproducible leaves it a watch item; reproducible stops the slice.

## What gets built

New shared server modules consumed only by `ai-search`:

- `supabase/functions/_shared/safetyState.ts` — `SafetyState` type reserving `green | amber | red | crisis | unsupported`, with only `green`, `red`, `crisis` emitted in this slice.
- `supabase/functions/_shared/safetyRouter.ts` — one `decideSafety(query)` returning a discriminated decision: `{ state: "green", route: "model" }`, `{ state: "red", route: "deterministic", kind: "clinical" }`, or `{ state: "crisis", route: "deterministic", kind: "crisis" | "abuse" }`, plus the fixed deterministic answer text. It wraps the existing `matchUrgent` / `urgentAnswer` machinery.

`urgentPatterns.ts` keeps every regex byte-identical. The only permitted change is exposing the existing abuse selector (currently internal to `urgentAnswer`) as a minimal helper so the router can report the subtype; matching semantics stay unchanged. Expected urgent regex changes: 0.

## Endpoint reordering in `ai-search/index.ts`

Current order: CORS/parse → rate limit (line ~427) → `matchUrgent` (line ~459, mode may downgrade to the recap fallback) → kill switch (line ~469) → model path.

New order:

```text
1. CORS + body parse
2. deterministic safety router
3. if RED/CRISIS: stream the deterministic answer
   - no model call, no grounding fetch
   - mode config cannot substitute DAY_RECAP_UNAVAILABLE_ANSWER
   - ordinary quota exhaustion or limiter RPC failure cannot suppress it
4. if GREEN: consume the ordinary rate limit (12/min, 100/hour unchanged; 429/503 unchanged)
5. if GREEN: AI_SEARCH_DISABLED handling (AI_PAUSED_ANSWER)
6. normal conversation/context/grounding/model path
```

Conversation bookkeeping (AIC-4, flags still OFF) keeps storing only visible turns and never influences severity. The limiter may still count urgent requests, but its verdict can no longer block the deterministic branch; no new rate-limit infrastructure and no migration. If implementation shows a migration is genuinely needed, stop and report.

## Tests

Focused deterministic tests covering: GREEN/RED/CRISIS/abuse decision mapping and zero AMBER/UNSUPPORTED emissions; no downgrade by mode, kill switch, journey/page context, memory or history fixtures; rate-limit exhausted and limiter-unavailable both still returning safety guidance while GREEN keeps 429/503; crafted recap payloads escalating and real DaySummaryCard payloads staying GREEN; kill-switch ordering; wording parity with existing answers; no new safety persistence or transcript logging. Existing `urgentPatterns`, `aiEvalDataset` and `aiSearchEndpoint` assertions stay untouched.

## Explicitly out of scope

No classifier or structured-output probe, no AMBER, no UNSUPPORTED consolidation, no emotional continuity, no grounding/NHS/JourneyContext change, no client sanitisation or `BANNED_VERDICT_PATTERNS` enforcement, no UI change, memory and history flags stay OFF.

## Docs and closure

Update `docs/ai/companion-safety-emotional-continuity.md` and `docs/ai/companion-architecture.md` with the implemented router and order after validation; move only ADR-AIC5-01 and ADR-AIC5-02 to ACCEPTED if the build supports them, leaving the rest PROPOSED.

Validation: `npm test`, `npm run lint` (baseline 1 error / 10 warnings, no new findings), `npm run typecheck`, `npm run build`, then deploy `ai-search` only and run controlled smoke checks (GREEN, clinical RED, CRISIS, kill switch where safe). Then the 48-point completion report; AIC-5B is not started.
