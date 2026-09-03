# AIC-5C — Unsupported + Clarification Consolidation

Move clarification decision-making out of the browser and into the shared server intelligence path used by `ai-search`, and add an explicit, narrow UNSUPPORTED capability boundary. No classifier, no AMBER, no UI redesign, no schema changes.

## Pre-edit audit (already confirmed)

- Owner today: `src/lib/askClarification.ts` — pure client module. `resolveAskClarification(query)` returns `{ topic, question, chips }` or `null`; `hasConcernWording(query)` blocks clarification for any concern/urgency wording.
- Rules: normalise → reject >3 words → reject concern wording → strip fillers → require exactly one core word → match one of six bare topic terms (`milestones`, `feeding`, `sleep`, `symptoms`, `movement`, `testing`). Each returns fixed UK-English wording plus chips, including a "Something I am worried about" chip.
- Callers: `src/lib/companion/conversation/useCompanionConversation.ts` (intercepts before the request), `src/pages/AskPage.tsx` (intercepts and renders a clarification card with chips), types in `conversationTypes.ts`, display plumbing in `CompanionProvider.tsx`.
- It prevents the network call entirely, so it currently bypasses server rate limiting and the `AI_SEARCH_DISABLED` kill switch. It also drives a special chip UI.
- Tests: `src/lib/askClarification.test.ts`, plus references in `aiEvalDataset.test.ts` and `askTrustCopy.test.ts`.

## What changes

1. **New shared module** `supabase/functions/_shared/companionBoundaryRouter.ts` returning the smallest contract: `{ kind: "continue" }` | `{ kind: "clarify", topic, answer }` | `{ kind: "unsupported", unsupportedKind, answer }`.
   - Clarification rules are ported verbatim from `askClarification.ts` (same six topics, same concern-wording guard, same UK-English question text). Chip labels/questions are ported as the clarification answer's suggested follow-ups where the wording already exists; no new copy is invented.
   - Clarification is suppressed when bounded conversation history supplies a usable referent (a preceding assistant turn in the same conversation), so AIC-4 continuity reduces rather than increases clarification.
   - UNSUPPORTED categories, precision-first, explicit-request only:
     - **A. diagnosis/prescribing action** — "diagnose me", "give me a diagnosis", "prescribe me…", "write me a prescription". Explicitly not triggered by educational mentions ("what does a gestational diabetes diagnosis mean?", "my doctor prescribed this — what is it for?").
     - **B. external action** — call/contact a clinician, message on the user's behalf, book an appointment, access a medical record.
   - Answers state the boundary briefly and offer what the companion can help with. No fake tool use.

2. **`supabase/functions/ai-search/index.ts` ordering.** Current: validation → `decideSafety` (RED/CRISIS return) → rate limit → conversation setup → `AI_SEARCH_DISABLED` → grounding/model. New: identical up to the kill switch, then the boundary router runs before grounding/model. Bounded AIC-4 history load is moved only as far forward as needed for referent checking, preserving existing bounds and semantics; if history load fails, the router falls back to "no referent available" and never fabricates context. Deterministic clarify/unsupported responses stream through the existing conversation stream — 0 model calls, 0 grounding fetches — after ordinary quota and kill-switch checks.

3. **Retire the client authority.** `useCompanionConversation.ts` and `AskPage.tsx` stop calling `resolveAskClarification` to decide anything. The clarification card/chips remain as display only, rendered from the server-provided response; `askClarification.ts` is reduced to display types/chips or removed if nothing legitimate remains. Final production decision-authority count: 0.

## Boundaries preserved

AIC-5A deterministic RED/CRISIS runs first and always wins (including "urgent symptom + diagnose me" and "crisis + call 999 for me"). Ordinary 12/min and 100/hour limiting applies to GREEN clarify/unsupported — no second unmetered route. `AI_SEARCH_DISABLED` still returns `AI_PAUSED_ANSWER`. `SAFE_FALLBACK_ANSWER` and grounding-failure behaviour unchanged. No AMBER, no classifier, 0 production imports of the AIC-5B probe parser, no `response_format`, no DB migration, no analytics, no raw logging, no hidden decision persistence. Grounding stays `30B-source-routing-v1` with 0 candidates/approvals; memory and history flags stay OFF; JourneyContext untouched. UI changes: 0 new surfaces.

## Tests

Focused suites for the boundary router (clarification parity with the ported rules, continue cases, vague-with-history vs vague-without-history), unsupported precision (trigger cases and the educational/prescribed-medication false-positive cases), safety precedence, quota/kill-switch ordering, and zero model/grounding calls on deterministic branches. All existing AIC-5A suites stay unweakened.

## Documentation

Update `docs/ai/companion-safety-emotional-continuity.md` and `docs/ai/companion-architecture.md` with the shared intelligence boundary, UNSUPPORTED vs fallback distinction, and voice readiness. ADR-AIC5-07 moves to ACCEPTED if fully implemented; ADR-AIC5-06 status corrected to PROPOSED (voice not accepted before AIC-6); 01/02/08 remain ACCEPTED; 03/04/05 unchanged.

## Validation and closure

`npm test`, `npm run lint`, `npm run typecheck`, `npm run build` against the 83-file/849-test baseline (lint: known baseline only). Deploy `ai-search` only, then run the five controlled smoke tests. Finish with the 56-point completion report. AIC-5D is not started.
