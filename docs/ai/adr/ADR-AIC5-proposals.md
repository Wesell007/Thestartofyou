ADR lifecycle at the time of writing (AIC-5D build):

- ACCEPTED: 01, 02 (partially implemented), 08, 09, 10
- RESOLVED (historical): 06 — the probe question it raised was answered by AIC-5B
- PROPOSED: 03, 04, 05, 07

Each record carries its own authoritative status line. There is no blanket status.
Accepting a PROPOSED record requires the corresponding AIC-5 build slice and its
own approval.

Context shared by all records: `docs/ai/companion-safety-emotional-continuity.md`
(AIC-5 audit).

---

## ADR-AIC5-01 — Deterministic safety routing is authoritative

**Status: ACCEPTED (AIC-5A).** Implemented as `decideSafety` in `_shared/safetyRouter.ts`, running before rate limiting, persistence, mode behaviour and the kill switch.


**Decision.** Safety routing is decided by deterministic server-side rules. A
language model may never be the sole reason a high-risk turn is treated as safe.
The existing `matchUrgent` result stays authoritative and is wrapped, not
rewritten, by an explicit safety-state contract.

**Consequences.** Safety continues to work when the provider is down, rate
limited, or returns malformed output. Coverage is bounded by the regex corpus,
so gaps are addressed by adding rules and tests rather than by trusting the
model.

---

## ADR-AIC5-02 — Five explicit safety states

**Status: ACCEPTED (AIC-5A), partially implemented.** The five-state vocabulary is reserved in `_shared/safetyState.ts`; only `green`, `red` and `crisis` are emitted by the deterministic router. `unsupported` is served by the AIC-5C boundary layer and `amber` by the AIC-5D selective assessment, both outside the deterministic router and both additive only.


**Decision.** Introduce GREEN, AMBER, RED, CRISIS and UNSUPPORTED as an explicit
shared runtime contract, defined in the audit document. RED maps to the existing
clinical urgent path; CRISIS keeps distinct self-harm, harm-to-another,
immediate-danger and safeguarding wording; AMBER is new; UNSUPPORTED is an
explicit capability boundary rather than "cannot diagnose".

**Consequences.** The current three-answer / two-category mismatch is made
explicit. State is a runtime value only; it is never displayed as a label to a
reader and never persisted.

---

## ADR-AIC5-03 — Severity may rise, never silently fall

**Status:** PROPOSED

**Decision.** A deterministic current-turn RED or CRISIS result cannot be
downgraded by conversation history, journey context, permissioned memory, page
context or model judgement. Additional evidence may only increase caution. Page
and entry context identify topic, never personal clinical severity.

**Consequences.** Personalisation can never suppress escalation. Some cautious
answers will be more cautious than strictly necessary; that is the accepted
trade.

---

## ADR-AIC5-04 — AMBER is the principal missing state

**Status:** PROPOSED

**Decision.** Add a middle state for concerns where professional input is
appropriate or uncertainty makes plain reassurance unsafe, with proportionate,
non-emergency, non-diagnostic behaviour and no invented clinical thresholds.

**Consequences.** Requires new behaviour rules and evaluation cases. Risk of
over-triggering is managed by measuring benign-query impact before rollout.

---

## ADR-AIC5-05 — LLM classification is optional and additive only

**Status:** PROPOSED

**Decision.** Any model-assisted classifier may only raise GREEN to AMBER. It
may not downgrade any state, and the system must ship and remain safe without
it. Classifier failure of any kind resolves to cautious handling, never GREEN.

**Consequences.** One additional model request per classified turn, sharing the
same provider budget. Deterministic behaviour remains the contract under load.

---

## ADR-AIC5-06 — Structured output is unproven and must be probed

**Status: RESOLVED by AIC-5B.** The probe established provider-backed strict
`json_schema` enforcement on the production gateway path and model (25/25 valid
under adversarial synthetic input; malformed schema rejected with 400; plain
`json_object` mode 0/8 valid). The gate the record demanded is satisfied; the
prohibition on prose parsing stands permanently.


**Decision.** No classifier ships before a dev/test-only probe establishes
strict structured-output support on the current gateway model and path. Parsing
safety signals out of generated prose, or inspecting a completed answer after
the fact, is rejected.

**Consequences.** AIC-5B gates AIC-5D's classifier option. If the probe fails,
AMBER ships with deterministic rules and prompt contracts only.

---

## ADR-AIC5-07 — Emotional continuity is ephemeral

**Status: ACCEPTED (AIC-5E).** Implemented as a deterministic, request-scoped
explicit-emotion evidence layer (`_shared/emotionalEvidence.ts`) plus fixed
trusted tone guidance (`_shared/emotionalGuidance.ts`). No model call, no
persistence, no analytics, no client exposure.

**Decision.** Respond to emotion the person explicitly states, using only the
current turn and the existing bounded conversation history. No emotion table, no
mood, distress or risk scores, no sentiment history, no automatic capture of
emotional disclosures into permissioned memory, no inferred clinical labels.

**Consequences.** Emotional and safety-state records persisted stay at 0.
Continuity is limited to the retained history window, which is accepted.

---

## ADR-AIC5-08 — Safety is transport-independent

**Status: ACCEPTED (AIC-5B).** Adopted as a standing principle alongside the
structured-output gate it depends on: no model-assisted classification may ship
until a reliable machine-readable contract is proven, and all safety routing
stays in shared server-side runtime code. Accepting this record does **not**
approve a GREEN → AMBER classifier; that remains an AIC-5D decision.

**Decision.** All safety routing lives in shared server-side runtime code so
text and any future voice transport share one path. No Green/Amber/Red/Crisis/
Unsupported logic in `AskPage`, `CompanionPanel` or any other surface. The
client-side clarification helper is assessed for migration in AIC-5C.

**Consequences.** Voice work inherits safety unchanged. Client-only shortcuts
must be re-homed before they can be relied on.


## ADR-AIC5-09 — Clarification and capability boundaries are server-owned (ACCEPTED, AIC-5C)

**Context.** Clarification ran in the browser and short-circuited the request, so
it escaped the GREEN quota and the kill switch and would have to be duplicated
for every future transport.

**Decision.** One shared server boundary router owns the clarify/unsupported
decision for every surface. It runs on the GREEN path only, after deterministic
safety, ordinary rate limiting and `AI_SEARCH_DISABLED`, and before any grounding
or model call. Results travel as explicit response headers; the client is
display-only with zero decision authority.

**Consequences.** Panel, `/ask` and any future voice transport receive the same
decision from the same owner. Clarified turns are now correctly metered and
correctly paused. Adding a transport costs a display mapping, not a rules copy.

## ADR-AIC5-10 — UNSUPPORTED is precision-first and honest (ACCEPTED, AIC-5C)

**Context.** A capability boundary that fires on ordinary guidance questions is
more damaging than one that misses.

**Decision.** UNSUPPORTED covers exactly two narrow categories — a professional
act requested of the companion (diagnose, prescribe) and an external action it
cannot perform (call, contact, book, send, access records) — and only when the
companion itself is asked to perform the act. Anything ambiguous continues to
the model. Every boundary answer states plainly that nothing happened, names the
real-world route, and offers what the companion can do instead. No model call,
no classifier, no persistence.

---

## ADR-AIC5-11 — AMBER is a selective hybrid, and caution may only rise

**Status: ACCEPTED (AIC-5D) as an engineering decision**, confirmed at AIC-5D
closure validation. Implemented in `_shared/amberEligibility.ts`,
`_shared/amberClassifier.ts` and `_shared/amberGuidance.ts`. Engineering
acceptance is not a release: PRODUCTION AMBER CLASSIFIER RELEASE — GATED, with
`AI_AMBER_CLASSIFIER_ENABLED` OFF in production and no ordinary user exposed to
the assessment.

**Decision.** AMBER is not a deterministic clinical threshold and not a
universal classification of every turn. Deterministic rules decide only
*eligibility* for an optional structured assessment; the assessment may return
`green` or `amber` and nothing else. It can raise GREEN to AMBER and can never
lower any state, never touches RED, CRISIS, clarify or unsupported, and an
assessment that cannot be completed produces cautious guidance rather than
reassurance. The assessment receives the user's message, the minimum
user-authored prior turn(s) when the wording depends on them, and the broad
journey family only — never memory, page context, grounding, detailed stage
data or identifiers. Nothing about the assessment is persisted, logged with
content, or exposed to the client.

**Consequences.** Routine traffic costs nothing extra. Eligible turns cost one
bounded, non-streaming, single-attempt call with a 1500 ms budget. Provider
failure degrades towards caution, never towards false reassurance.
