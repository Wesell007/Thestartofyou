# AIC-5D — Architecture / Classifier Adoption Gate (report + doc-only plan)

No production code was read-modified. Everything below is audit and recommendation.

## 1–2. ADR reconciliation and exact current statuses

`docs/ai/adr/ADR-AIC5-proposals.md` has three real defects: a stale file title
(`ADR-AIC5-01 … 08`), a stale blanket line ("Status of every record below: **PROPOSED**.
None is implemented"), and duplicate `**Status:** PROPOSED` lines under records 01 and 02
whose authoritative headers already say ACCEPTED.

Exact titles/statuses as they stand today:

| # | Title | Status |
|---|---|---|
| 01 | Deterministic safety routing is authoritative | ACCEPTED (AIC-5A) |
| 02 | Five explicit safety states | ACCEPTED (AIC-5A), partially implemented (green/red/crisis only) |
| 03 | Severity may rise, never silently fall | PROPOSED |
| 04 | AMBER is the principal missing state | PROPOSED |
| 05 | LLM classification is optional and additive only | PROPOSED |
| 06 | Structured output is unproven and must be probed | RESOLVED by AIC-5B probe; dependency decision not taken |
| 07 | Emotional continuity is ephemeral | ACCEPTED in principle (AIC-5C) |
| 08 | Safety is transport-independent | ACCEPTED (AIC-5B) |
| 09 | Clarification and capability boundaries are server-owned | ACCEPTED (AIC-5C) |
| 10 | UNSUPPORTED is precision-first and honest | ACCEPTED (AIC-5C) |

Numbering mismatch to note: the request's binding principles for 06/07/08 correspond to
this repository's 08 (transport-independent/voice), 10 (unsupported → safe route) and 06
(structured-output gate). No renumbering is proposed; the doc fix will state the mapping.

Doc-only corrections proposed (this gate): retitle to `ADR-AIC5-01 … 10`, delete the stale
blanket status paragraph, delete the two duplicate `Status: PROPOSED` lines, keep 06 as a
resolved-probe/undecided-dependency record.

## 3–5. Current reassurance mechanisms

- PROMPT GUIDANCE (not enforced): `SAFETY_BLOCKS` (notADiagnosis, noPredictionPregnancy,
  noFalseHope, noPregnancyVerdict, noOvulationVerdict, noTestInterpretation, noFearOrBlame,
  noPrescribing*, untrustedInput), `ESCALATION_BLOCKS` (full, movementAware, onlyWhenRaised,
  encourage), `GROUNDING_USE_RULE` uncertainty line, word limits/format lines.
- DETERMINISTIC ENFORCEMENT: `decideSafety` → RED/CRISIS fixed answers; AIC-5C clarify/
  unsupported fixed answers; `SAFE_FALLBACK_ANSWER` when a route genuinely cannot answer;
  retrieval-wording sentence removal and link stripping in `sanitiseAiAnswer`.
- DISPLAY DETECTION ONLY: `BANNED_VERDICT_PATTERNS` / `findBannedVerdicts` — dev-console
  warning, never alters what a reader sees, and never runs in production.
- NOT ENFORCED: everything about false reassurance on the GREEN path. Gap: between GREEN
  and RED there is no state, no AMBER prompt layer, and no runtime check that "you're fine"
  wording did not ship. `noFalseHope` is applied only in `ttc_companion`;
  `first_year_companion` actively suppresses professional-help wording unless raised.

## 6–7. Definitions

AMBER: a safety-sensitive concern on the normal path where no deterministic RED/CRISIS rule
matched, the available evidence cannot establish that ordinary reassurance is safe, and
professional input or explicit uncertainty is the proportionate response. Not a diagnosis,
not a severity score, never labelled to the reader, never persisted.

GREEN: no identified safety reason, under the implemented safety system, to escalate or to
withhold ordinary supportive guidance. Not "medically safe", not "normal", never displayed.

## 8–10. AMBER response behaviour and professional routes

Behaviour contract: acknowledge the concern → say what can be said generally → state plainly
that the cause cannot be judged from here → name one appropriate route → separate "contact
routinely/soon" from "if X changes, treat as urgent" without inventing thresholds → keep the
existing warm tone and word limits → at most one uncertainty statement per answer.

Routes already established in production copy: maternity unit/triage and midwife
(pregnancy), GP, NHS 111, health visitor, fertility clinician (TTC), 999/A&E — reserved for
deterministic RED/CRISIS only. Journey/mode (`pregnancy_week_companion`,
`first_year_companion`, `ttc_companion`) may choose WHICH route is named; it may never
influence whether a concern is treated as AMBER.

## 11–15. Architecture options

- Option A (no classifier): lowest latency/cost, no outage surface, but false reassurance
  remains prompt-only and unmeasurable. Insufficient alone.
- Option B (classifier on every CONTINUE): +~1.27 s median before first token on every
  routine question ("what should I pack in my hospital bag?"), doubles model calls and quota
  pressure, and makes provider outage a whole-product event. Rejected.
- Option C (selective hybrid): deterministic eligibility gate, classifier only on
  safety-sensitive ambiguous turns. Preserves routine latency, bounds cost and blast radius.
  **Recommended**, with a deterministic AMBER floor so safety never depends on the model.
- Grounding/source routing rejected as an eligibility signal: family selection is keyword
  topic routing over an NHS allowlist, would couple grounding policy to safety, and its
  "generic" family would silently produce GREEN. Signal only, never authority.

## 16–21. Eligibility gate (exact proposal)

Invoke the classifier only when ALL hold: safety returned GREEN; boundary returned continue;
mode is a companion/general mode; and at least one of these deterministic signals fires:

1. `hasConcernWording` (AIC-5C, already production-authoritative) — broad recall, weak
   precision on its own (fires on "worried about sleep"); suitable strictly as "consider
   assessment", never as AMBER.
2. First-person symptom framing: a new narrow matcher requiring a first-person subject
   ("I have / I'm getting / my baby has / she has") plus a bodily-experience noun, so
   third-person and informational phrasing is excluded.
3. Near-miss of the urgent families: a symptom term from `urgentPatterns` families present
   without the qualifier that makes it RED (e.g. "bleeding" without heavy/soaking/severe).
   RED matches themselves never reach this layer.

Bypassed with no classifier call: RED, CRISIS, clarify, unsupported, recap mode, product/
account questions, purely informational questions with no first-person symptom framing.
Deterministic AMBER floor: signal 3 alone routes to AMBER prompt handling even if the
classifier is disabled or fails. False-positive cost is a slightly more cautious answer;
false-negative cost is bounded by the floor plus unchanged RED coverage.

## 22–31. Classifier contract (if approved for build)

Inputs: current query; up to the existing bounded last 4 turns, only when the current turn is
anaphoric/worsening ("it's getting worse"); journey type/stage only where needed for topic
relevance. Excluded, all set to zero input: permissioned memory, page context, grounding
documents, full history, user/profile ids. Page context may never alter severity.

Schema: exactly `{ "state": "green" | "amber" }`, provider strict `json_schema` plus
application-side strict validation (AIC-5B proven, 25/25). Prompt: short, fixed,
non-diagnostic, one question only, no reasoning field. Authority: raise GREEN→AMBER only;
no downgrade path exists because RED/CRISIS/clarify/unsupported already returned.

Failure/timeout policy — option B-with-floor: on timeout (proposed 1.5 s), provider error,
schema or validation failure, proceed to ordinary generation with the AMBER guidance block
applied. Never silent GREEN, never a canned AMBER wall, no retry. Outage therefore degrades
to "more cautious answers", not to an error surface.

Cost/latency: classifier calls are expected on a minority of turns; routine questions keep
today's time-to-first-token. Voice (AIC-6) is the strongest argument against Option B — a
fixed ~1.27 s pre-speech delay on every utterance would be very perceptible. Second call is
non-streaming, temperature 0; quota accounting stays as-is in this gate, but the build must
count both calls against the same GREEN budget.

## 32–40. Prompt layer, streaming, enforcement

AMBER guidance is a trusted SAFETY layer inserted after core safety blocks and above journey,
mode, preferences, context and memory. It is a short block, not a duplicate prompt. Rules:
never assert "you're fine / nothing to worry about / that's definitely normal" when the
information cannot establish it; prefer explicit uncertainty plus a named route; keep
emergency framing (999/A&E) out unless the deterministic RED route matched; one uncertainty
statement, no stacked disclaimers.

Streaming finding: post-generation correction is architecturally too late — the unsafe
sentence has already been shown. Therefore enforcement must be pre-generation
(classification + trusted AMBER block). Recommendation for post-generation: detect and report
only (promote `findBannedVerdicts` to a server-side counter), no rewriting, no substring
censorship, no buffer-before-display.

## 41–45. Persistence, gating, telemetry, tests, eval

Safety persistence stays 0: AMBER is a request-scoped value only. Feature gate: one narrow
server env flag (proposed `AI_AMBER_CLASSIFIER_ENABLED`, default off) that disables only the
model call, leaving deterministic safety, the AMBER floor, clarification/unsupported and
normal answering untouched. Telemetry (subject to separate approval): counters only —
`classifier_invoked`, `classifier_failure`, `amber_route`, no raw text, no identifiers.

Future test matrix: routine GREEN; non-RED concern; uncertain symptom; worsening across
turns; page context cannot create AMBER; memory cannot lower AMBER; RED/CRISIS/clarify/
unsupported each bypass the classifier; classifier failure, timeout, invalid JSON; AMBER
reassurance wording; professional-contact wording; no emergency wording on AMBER; model-call
count per path; flag off behaviour.

Eval dataset already carries 94 prompts including 12 `amber` and 7 `ambiguous`, so the
category exists but is unrouted. Gaps: no false-reassurance-wording cases, no worsening
multi-turn cases, no page-context-must-not-escalate cases, no classifier-failure fixtures.
Expansion designed for the build slice; no existing evaluation weakened.

## 46–53. Gate result

Docs to change in this gate (doc-only, after approval): ADR file corrections above, and an
AIC-5D decision section in `docs/ai/companion-safety-emotional-continuity.md`.
`docs/ai/companion-architecture.md` gains one pipeline line for the eligibility gate.
Production files changed: 0. Tests changed: 0. Grounding frozen
(`30B-source-routing-v1`, 0 candidates, 0 approvals, eligible slugs `[]`). Memory and
persistent-history flags remain OFF. No migration, no persistence, no client change, no voice.

- AIC-5D ARCHITECTURE GATE — **CLOSED** (recommendation delivered)
- PRIMARY RECOMMENDATION — **C, selective hybrid with a deterministic AMBER floor and
  fail-cautious classifier policy**
- AIC-5D BUILD — **SAFE TO APPROVE**, conditional on approving the eligibility gate in
  section 16–21 and the failure policy in 22–31 before implementation.
