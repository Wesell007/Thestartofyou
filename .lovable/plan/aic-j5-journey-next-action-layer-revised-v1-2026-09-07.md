# AIC-J5 — Journey Next-Action Layer (revised V1)

Saved-journey only. Personal authority through the existing J2 resolver. No content or page actions, no entry/action seed, no text parsing.

## J5-1 — Opaque eligibility contract

- `supabase/functions/ai-search/index.ts`: set `X-Companion-Next-Actions: allow` only on an ordinary completed generative response; set `suppress` on the deterministic RED/CRISIS branch, on clarify/unsupported boundaries, on the kill-switch/controlled answers, and whenever the AMBER path applied. Add the header name to the existing `Access-Control-Expose-Headers` list.
- No safety category, score, reason, rule or classification is exposed. AIC-5 rules, wording, thresholds and ordering are untouched; the header only reads the decision already made.
- `useAISearch`: read the header, call a new `onNextActions(eligibility)` option. Unknown, malformed or missing value → `suppress`.
- `useCompanionConversation`: hold it in a ref for the in-flight request, and expose `nextActionsAllowed` only once the assistant message commits with `status: "complete"`. Cleared on send, retry, stop, error, clear/new conversation and restore.
- If plumbing reveals a safety architecture conflict, stop before J5-2.

## J5-2 — Registry and resolver

`src/lib/companion/journeyNextActions.ts`, pure, closed union of route strings:

```ts
type JourneyNextAction = { id: JourneyNextActionId; label: string; to: JourneyNextActionRoute };
resolveJourneyNextActions({ personal, signedIn }): JourneyNextAction[]
```

- `MAX_NEXT_ACTIONS = 2`, shared across layouts. Deduplicate by exact destination, stable registry order.
- TTC (any saved stage, `ivfInTreatment` included): `Open My TTC Journey` → `/my-ttc-journey`. Max 1.
- Pregnancy with valid saved week: `View My Week` → `/my-week`, plus `Read week N guidance` → `/pregnancy/week/N`. Week only from personal context. Unknown week: `Open My Journey` → `/my-journey` only.
- First Year with unambiguous valid age month: `Open Today` → `/my-first-year/today`, plus `Read month N guidance` → the existing month route. Ambiguous or unknown: `Open My First Year` → `/my-first-year` only.
- Signed out, or `personal` null/unknown: `[]`. No memories, journal, toolkit, calculator or support actions.

## J5-3 — Latest-answer transient state

- Lives in `CompanionProvider` runtime state only. No storage, no history, no message metadata, no analytics.
- A new accepted turn clears the action layer immediately, before the next answer arrives.
- A J2 journey-state change clears the layer; it does not recompute actions for the new lifecycle under the old answer. The next eligible completed answer produces fresh actions.
- Failed, aborted, timed-out, streaming or suppressed responses produce no actions.

## J5-4 / J5-5 — Shared UI and integration

`src/components/companion/CompanionNextActions.tsx`, consumed by `CompanionMessageList` (panel) and `/ask`. Compact secondary row using existing companion tokens, group label "Next steps", `nav` with an accessible name, router links, ~44px targets, wraps on mobile, no nested interactive controls. One registry, one resolver, identical IDs and order on both surfaces.

## J5-6 — Tests and validation

Focused suites for: eligibility mapping (standard allow; RED, CRISIS, AMBER, clarify, unsupported, missing/unknown → suppress), authority (saved vs content-only cases for all three journeys, including saved week 24 while reading week 20 and saved month 7 while reading month 4), signed-out and unknown, ambiguous baby age, freshness on TTC → Pregnancy, response lifecycle (clear on send, none on fail/abort/partial/suppressed), panel vs `/ask` parity, dedup/limit/order, zero model, Supabase, mutation and storage effects, and accessibility.

Then reconcile the 98 files / 1138 tests baseline, `npm test` (all pass, 0 timeouts), two cache-defeated typechecks, `DENO_DIR=/tmp/denodir deno check --no-lock supabase/functions/ai-search/index.ts`, `npm run lint` (known baseline only), `npm run build`. No deployment.

## Documentation

Update the companion architecture docs with the saved-journey-only V1 scope, personal authority, opaque eligibility contract, latest-answer lifecycle, transition invalidation, parity, navigation-only and the zero-persistence/analytics stance. Update `roadmap.md`.

## Untouched

`journeySuggestions.ts`, `journeyContext.ts`, `useCompanionPersonalJourney.ts`, `AskAboutThis.tsx` and J4 entry semantics, safety modules, prompts, grounding, memory, persistent history, schema/RLS, voice.
