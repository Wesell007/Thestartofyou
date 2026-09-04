# AIC-5D — Closure Validation Addendum: what can be answered now, and what is still missing

Read-only inspection of the shipped AIC-5D code and tests shows the architecture is sound and unchanged, but the addendum cannot be returned as an all-PASS report yet. Five of the sixty-three points have no evidence in the repository today. This plan closes exactly those gaps and nothing else. No architecture redesign, no AIC-5E.

## Already verified read-only (no work needed)

- Ordering: eligibility and classifier sit after the AIC-5C boundary and before grounding/model, in `ai-search/index.ts`.
- Call matrix: endpoint tests already assert routine = 0, flag-OFF eligible = 0, flag-ON eligible = 1, RED/CRISIS = 0, clarify = 0, unsupported = 0; retries = 0 asserted in the unit tests.
- Timeout mechanism: a real `AbortController` with a 1500 ms timer aborts the network request (not a promise race).
- Failure contract: non-2xx, provider error, malformed JSON, invalid state, extra keys and missing state all resolve to `unavailable`, never `green`.
- Client contract: no new headers, no AMBER label reaches the browser, `X-Companion-Boundary` and `X-Companion-Clarification-Topic` untouched.
- Classifier inputs: broad journey family only, no pregnancy week, no baby age, no memory, no page context, no grounding, no IDs.
- No persistence, no telemetry, no migration.

## Gaps that must be closed before "CLOSED PASS"

1. **Classifier-enabled integration proof (addendum item 1).** No proof exists that the new `amberClassifier.ts` works against the live gateway. Requires an isolated run with the flag ON.
2. **First-year conflict proof (item 9).** `GLOBAL_REASSURANCE_RULE` and the AMBER block are gated on `modeConfig.allowUrgentEscalationAnswer`. Only the recap mode sets that false; ordinary first-year answering keeps it true. No test proves the two required behaviours yet.
3. **Flag-OFF semantics (item 13).** The gating test asserts no AMBER block, but does not assert that the cautious-uncertainty block is absent, i.e. that disabled is not treated as failure.
4. **Timeout case (item 5).** Abort-path `unavailable` is not covered by a direct test.
5. **No-substring-censorship proof (item 10).** No test yet shows that "normal", "fine" and "okay" remain usable in ordinary informational wording.
6. **ADR-11 status (item 18).** Must be set to ACCEPTED (engineering) only once the above pass, with production release recorded separately as GATED.

## Work to perform (validation and evidence only)

- Add focused tests to the existing two AIC-5D test files:
  - first-year ordinary mode + AMBER assessment → AMBER guidance present; routine first-year GREEN → no AMBER guidance, mode restraint intact; recap mode unchanged.
  - flag OFF + eligible query → 0 classifier calls **and** no cautious-uncertainty block.
  - classifier abort/timeout → `unavailable`, cautious block injected exactly once, answer stream still runs, one attempt only.
  - guidance blocks contain no blanket ban on the words normal/fine/okay, and the rule is behavioural rather than a substring filter.
  - injection-count assertions: AMBER exactly once, GREEN zero, unavailable exactly once.
- No production source changes are expected. If a genuine defect surfaces, it is reported rather than silently redesigned.
- ADR file: set ADR-AIC5-11 to ACCEPTED (engineering only), keep ADR-07 PROPOSED and ADR-06 historical/resolved.
- Run `npm test`, `npm run lint`, `npm run typecheck`, `npm run build`, and reconcile the 84/891 → final file and test arithmetic exactly.

## Item 1 needs your decision

The live classifier-enabled proof cannot be done without flipping `AI_AMBER_CLASSIFIER_ENABLED` somewhere real. Two options:

- **A. Direct isolated gateway proof (recommended).** Call the deployed `amberClassifier` contract directly against `ai.gateway.lovable.dev` from a dev-only harness with a synthetic eligible fixture and a synthetic AMBER fixture. Production function config is never touched, so production stays OFF throughout. Proves the module, model, schema, token budget and latency end to end, but not the deployed endpoint wiring.
- **B. Temporary flag-ON window on the deployed function.** Set the secret ON, run the two fixtures against the live endpoint, then set it back OFF. Proves the full deployed path, but ordinary traffic in that window would be exposed to the classifier.

Everything else in this plan is unaffected by the choice.

## Report

After the work, return only the 63-point closure addendum, with item 1 answered by whichever proof route you approve, production `AI_AMBER_CLASSIFIER_ENABLED` recorded as OFF, and AIC-5E not started.
