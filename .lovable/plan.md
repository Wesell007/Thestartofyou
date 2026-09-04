# AIC-5F — Final Safety Verification

Verification-only phase. No new safety architecture, no production source changes expected, AMBER stays OFF, no voice work, AIC-6 not started.

## What this phase produces

1. A cross-phase adversarial test suite that proves the 5A–5E stack composes safely.
2. A final verification document that becomes the baseline for AIC-6.
3. An ADR reconciliation pass (01–11) with honest statuses.
4. A full validation run and a completion report answering all 85 requested items.

## Confirmed starting facts (already read)

Shipped `ai-search` order, by line:

```text
validation
-> decideSafety(query)                       (450)  RED/CRISIS terminal
-> consumeRateLimit                          (490)  ordinary quota only
-> conversation setup
-> AI_SEARCH_DISABLED kill switch            (514)
-> bounded recent history
-> AIC-5C boundary: clarify / unsupported    (530-551) terminal
-> AIC-5D AMBER eligibility + gated classifier
-> AIC-5E emotional evidence + guidance      (573-576)
-> grounding (582), memory (593)
-> model call, prompt assembly               (614-630, GLOBAL_REASSURANCE_RULE at 630)
```

This matches the expected precedence; the report will restate it from source, not from the brief.

ADR statuses today: 01 ACCEPTED (5A), 02 ACCEPTED (5A, partial), 03 PROPOSED, 04 PROPOSED, 05 PROPOSED, 06 RESOLVED (5B), 07 ACCEPTED (5E), 08 ACCEPTED (5B), 09 ACCEPTED (5C), 10 ACCEPTED (5C), 11 ACCEPTED (5D).

## Work

### 1. Source audit (no edits)

Re-read `ai-search/index.ts`, `safetyRouter.ts`, `safetyState.ts`, `urgentPatterns.ts`, `companionBoundaryRules.ts`, `clarificationRules.ts`, `amberEligibility.ts`, `amberClassifier.ts`, `amberGuidance.ts`, `emotionalEvidence.ts`, `emotionalGuidance.ts`, `aiConversationHistory.ts`, `aiJourneyContext.ts`, `aiSources.ts`, plus the two client surfaces. Record: exact route order, exact trusted prompt block order, header set, log inventory, and a wording diff of deterministic RED/CRISIS answers against AIC-5A accepted text (expected diff: none).

### 2. New cross-phase test file

`src/test/aiSearchSafetyComposition.test.ts` — endpoint-level, using the existing `denoStdServe` harness convention and non-literal dynamic endpoint import. Matrix:

- Terminal proofs: RED, CRISIS, safeguarding, clarify, unsupported each assert 0 model calls, 0 classifier calls, 0 grounding fetches, no emotional tone block.
- Kill switch: GREEN disabled vs RED/CRISIS still deterministic.
- Quota: GREEN limited; RED/CRISIS unaffected; exactly one user-facing quota event per request even with the classifier ON.
- AMBER (flag ON in-test only): call matrix 0/0/1/0, and timeout, 5xx, invalid JSON, invalid enum, extra fields, missing state each -> unavailable, cautious guidance injected exactly once, no retry, never silently green, no 999/A&E language.
- Emotion composition: emotion + GREEN / AMBER / RED / CRISIS / clarify / unsupported; explicit fear does not create AMBER; positive emotion does not create reassurance; overwhelm does not bypass clarification.
- Evidence boundaries: assistant-authored emotion excluded, third-party emotion excluded, current-turn override, history injection and prompt injection cannot disable safety or reveal system text.
- Trust boundary: assert zero raw user substrings appear in the trusted guidance block.
- Prompt precedence: assert index ordering of identity < mode < journey < emotion < AMBER < global reassurance.
- Headers: exactly the existing header set, no safety/AMBER/emotion header.
- Global reassurance behaviour: refuses definitive personal verdicts while "normal/fine/okay" stay usable informationally (behavioural assertions, no substring censorship).

### 3. Eval dataset

Audit `src/test/aiEvalDataset.test.ts` and report the real counts of safety / emotional / boundary / adversarial cases. Add AIC-5F fixtures only where they add coverage the unit tests do not already give; no mechanical duplication.

### 4. Documentation

- New `docs/ai/companion-safety-final-verification.md`: route precedence, terminal routes, AMBER gated state, emotional boundary, persistence/privacy posture, cross-phase matrix, validation results, remaining gated items, voice readiness.
- ADR file: assess 03, 04, 05 individually — resolve those the shipped 5D/5E work genuinely settles, leave the rest PROPOSED or reclassify as future work. No blanket ACCEPTED.
- `roadmap.md`: AIC-5F entry.

### 5. Validation

`npm test` (default config, all pass, 0 timeouts), `npm run typecheck` twice with cache defeated, `DENO_DIR=/tmp/denodir deno check --no-lock supabase/functions/ai-search/index.ts`, `npm run lint` (baseline only), `npm run build`. No redeploy if production source is unchanged; minimal production smoke for ordinary / RED / clarify / unsupported only.

### 6. Defect handling

If any invariant fails, stop closure and report the failing invariant, reproduction, severity and the smallest correction. No redesign folded into this phase.

## Constraints

No new safety categories, classifier, taxonomy, boundary, memory, grounding, UI, schema, analytics or voice. No `.skip`/`.todo`, no timeout inflation, no concurrency changes, no weakening of any 5A–5E assertion. Frozen state reconfirmed at the end: AMBER OFF and GATED, grounding `30B-source-routing-v1` with 0/0/[], memory and persistent-history flags OFF, 0 emotion persistence/analytics/model calls.
