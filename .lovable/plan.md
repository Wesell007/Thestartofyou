# AIC-5D — AMBER build (approve to unlock Build Mode)

The architecture gate is closed and Option C is approved. I am still held in plan mode, so
this card exists only to release the build; approving it starts the implementation exactly as
specified in your final build approval. No further planning pass will follow.

## What gets built

1. **ADR reconciliation (docs only, first).** Retitle to `ADR-AIC5-01 … 10`, delete the stale
   blanket "everything PROPOSED" paragraph and the duplicate `Status: PROPOSED` lines, give
   every record one authoritative status. ADR-07 (emotional continuity is ephemeral) reverts
   to PROPOSED until AIC-5E. ADR-06 becomes RESOLVED-HISTORICAL (probe complete, not an open
   dependency). New ADR-AIC5-11 records selective structured AMBER assessment, ACCEPTED on a
   clean engineering build, release-gated.

2. **`_shared/amberEligibility.ts`** — deterministic gate returning
   `{ eligibleForAmberAssessment: boolean }` from three signals: existing concern wording
   (reused), a narrow first-person symptom/experience matcher, and urgent-family vocabulary
   present without a RED match. No deterministic AMBER floor; new clinical thresholds: 0.

3. **`_shared/amberClassifier.ts`** — non-streaming strict `json_schema` call
   (`google/gemini-2.5-flash`, temperature 0, one attempt, 1.5 s timeout, no retry) plus
   mandatory application-side validation reusing the AIC-5B contract `{"state":"green"|"amber"}`.
   Result is `green | amber | unavailable`. Inputs: query, broad journey family only, and a
   prior turn only when a deterministic anaphoric/worsening check fires. Memory, page context,
   grounding, ids, exact week/baby age: 0.

4. **`_shared/amberGuidance.ts` + `aiModes.ts`** — one trusted AMBER safety block and one
   cautious-uncertainty fallback block, injected once, ranked above mode/tone/journey/memory/
   history/page context, so first-year escalation suppression cannot defeat AMBER. Plus a
   shared global no-definitive-medical-verdict rule applied across companion modes,
   consolidating the TTC-only `noFalseHope` without disclaimer overload.

5. **`ai-search/index.ts`** — after AIC-5C `continue`: eligibility → flag
   `AI_AMBER_CLASSIFIER_ENABLED` (default OFF, 0 calls when off) → optional classifier →
   trusted block → existing grounding/context/streamed answer. One user-facing quota event per
   request; no new headers, no client change, no persistence, no telemetry, no migration.

6. **Tests and evals** covering eligibility, bypass proofs (RED/CRISIS/clarify/unsupported/
   routine/flag-off = 0 classifier calls), schema accept/reject, timeout and 5xx → unavailable,
   prompt-injection-once assertions, no-emergency-wording, professional routes per journey, and
   page-context/memory neutrality. Existing evals untouched.

7. **Validation and close** — `npm test`, lint (baseline only), typecheck, build, deploy only
   `ai-search`, controlled synthetic smoke tests, then the 67-point completion report.
