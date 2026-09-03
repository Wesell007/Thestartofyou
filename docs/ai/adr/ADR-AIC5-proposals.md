# ADR-AIC5-01 … 08 — Safety intelligence and emotional continuity

ADR-AIC5-01 and ADR-AIC5-02 are ACCEPTED as of AIC-5A. ADR-AIC5-03 … 08 remain PROPOSED.

Status of every record below: **PROPOSED**. None is implemented. Accepting any
of them requires the corresponding AIC-5 build slice and its own approval.

Context shared by all eight: `docs/ai/companion-safety-emotional-continuity.md`
(AIC-5 audit).

---

## ADR-AIC5-01 — Deterministic safety routing is authoritative

**Status: ACCEPTED (AIC-5A).** Implemented as `decideSafety` in `_shared/safetyRouter.ts`, running before rate limiting, persistence, mode behaviour and the kill switch.

**Status:** PROPOSED

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

**Status: ACCEPTED (AIC-5A), partially implemented.** The five-state vocabulary is reserved in `_shared/safetyState.ts`; only `green`, `red` and `crisis` are emitted. `amber` (AIC-5D) and `unsupported` (AIC-5C) remain unimplemented.

**Status:** PROPOSED

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

**Status:** PROPOSED

**Decision.** No classifier ships before a dev/test-only probe establishes
strict structured-output support on the current gateway model and path. Parsing
safety signals out of generated prose, or inspecting a completed answer after
the fact, is rejected.

**Consequences.** AIC-5B gates AIC-5D's classifier option. If the probe fails,
AMBER ships with deterministic rules and prompt contracts only.

---

## ADR-AIC5-07 — Emotional continuity is ephemeral

**Status:** PROPOSED

**Decision.** Respond to emotion the person explicitly states, using only the
current turn and the existing bounded conversation history. No emotion table, no
mood, distress or risk scores, no sentiment history, no automatic capture of
emotional disclosures into permissioned memory, no inferred clinical labels.

**Consequences.** Emotional and safety-state records persisted stay at 0.
Continuity is limited to the retained history window, which is accepted.

---

## ADR-AIC5-08 — Safety is transport-independent

**Status:** PROPOSED

**Decision.** All safety routing lives in shared server-side runtime code so
text and any future voice transport share one path. No Green/Amber/Red/Crisis/
Unsupported logic in `AskPage`, `CompanionPanel` or any other surface. The
client-side clarification helper is assessed for migration in AIC-5C.

**Consequences.** Voice work inherits safety unchanged. Client-only shortcuts
must be re-homed before they can be relied on.
