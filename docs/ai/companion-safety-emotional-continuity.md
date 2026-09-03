# Companion safety and emotional continuity (AIC-5 audit)

Status: **audit and architecture only**. Nothing in the "proposed" sections is
implemented, and no production safety behaviour changed in this slice.
Everything in the "current state" sections was read from source, not inferred.

---

## 1. Verified current safety path

```text
useCompanionConversation → companionRequest → useAISearch
  → POST /functions/v1/ai-search   (supabase/functions/ai-search/index.ts)

 1  parseAiSearchBody                _shared/validation.ts       deterministic, 400
 2  consumeRateLimit                 index.ts                    deterministic, 429/503
 3  establishConversation (AIC-4)    index.ts                    gated; no safety role
 4  persistMessage(user)             index.ts                    persistent mode only
 5  matchUrgent(query)               _shared/urgentPatterns.ts   SAFETY DECISION, bypasses model
 6  isAiDisabled(AI_SEARCH_DISABLED) _shared/urgentPatterns.ts   pause answer, bypasses model
 7  selectSources + fetchGrounding   _shared/aiSources.ts        NHS allowlist only; 503 on total failure
 8  renderJourneyContextBlock        _shared/aiJourneyContext.ts escaped DATA block
 9  loadPermissionedMemory           index.ts                    AI_MEMORY_ENABLED off
10  loadConversationTurns / sessionHistory                       bounded, escaped
11  system prompt composition        _shared/aiModes.ts          TRUSTED PROMPT RULES
12  google/gemini-2.5-flash chat/completions, stream:true, max_tokens 700, temperature 0.2
13  SSE passthrough (persistOnComplete when persisting)
14  sanitiseAnswerForDisplay         src/lib/aiAnswerSafety.ts   DISPLAY SANITISATION
```

Safety decisions occur only at steps 5, 6, 11 and 14. Only steps 5 and 6 can
bypass the model. Steps 1–14 are identical for the panel and for `/ask`: both
use one runtime and one endpoint, so safety parity is structural, not
duplicated.

### Mechanism table

| Mechanism | File / function | Input | Rule type | Bypasses model | Output | Tests |
| --- | --- | --- | --- | --- | --- | --- |
| Body validation | `_shared/validation.ts` `parseAiSearchBody` | raw JSON | deterministic | yes (400) | JSON error | `edgeFunctionValidation.test.ts` |
| Rate limit | `index.ts` `consumeRateLimit` | hashed IP + UA | deterministic | yes (429/503) | JSON error | endpoint tests |
| Urgent routing | `_shared/urgentPatterns.ts` `matchUrgent` / `urgentAnswer` | current turn only | deterministic | yes | fixed SSE answer | `urgentPatterns.test.ts`, `aiSearchEndpoint.test.ts`, `aiEvalDataset.test.ts` |
| Kill switch | `isAiDisabled` + `AI_SEARCH_DISABLED` | env | deterministic | yes | pause answer | `urgentPatterns.test.ts`, `aiSearchEndpoint.test.ts` |
| Mode safety prompt | `_shared/aiModes.ts` | mode | trusted prompt | no | model behaviour | `aiModes.test.ts`, `aiPromptRegistry.test.ts` |
| Source routing | `_shared/aiSources.ts` | query/context | deterministic | no | NHS evidence | `aiSourceRouting.test.ts` |
| Display sanitisation | `src/lib/aiAnswerSafety.ts` | answer text | display | no | cleaned answer | `aiAnswerDisplay.test.ts` |
| Clarification | `src/lib/askClarification.ts` | query (client) | deterministic | yes (no request) | clarifying question | ask clarification tests |

Logging: error names and provider status codes only. No raw query, answer,
conversation, memory value or emotional classification is logged. Raw
transcript logging count: **0**.

---

## 2. Deterministic urgent architecture

Owner: `supabase/functions/_shared/urgentPatterns.ts`.

- `CRISIS_PATTERN` — suicide/self-harm, harm to the baby, "cannot keep myself
  safe", abuse, immediate danger.
- `URGENT_PATTERN` — union of `GENERAL_RED_FLAGS`, `PREGNANCY_RED_FLAGS`,
  `POSTPARTUM_RED_FLAGS`, `BABY_RED_FLAGS`.
- `matchUrgent(query)` → `"crisis" | "clinical" | null`; crisis wins.
- `urgentAnswer(query)` → `CRISIS_ANSWER`, `ABUSE_ANSWER` (chosen by a separate
  `ABUSE_PATTERN` **inside the answer builder**, not by the matcher) or
  `CLINICAL_ANSWER`.
- Recap-only modes receive `DAY_RECAP_UNAVAILABLE_ANSWER` instead.

Matching is **current-turn regex only**. Conversation history, journey context,
permissioned memory, page context and grounding play no part, and the model is
not called on a match. False-positive protection is pattern shaping plus seven
negative tests.

**Documented taxonomy mismatch:** the runtime has three deterministic outcomes
(clinical, crisis, safeguarding) behind two match categories, and safeguarding
selection lives in `urgentAnswer`, not in `matchUrgent`. AIC-5A must expose this
explicitly without changing which answer is produced. Harm-to-another (including
harm to the baby) is currently folded into `CRISIS_ANSWER` and has no distinct
wording.

---

## 3. Safety prompt inventory

`_shared/aiModes.ts`: `SAFETY_BLOCKS` (notADiagnosis, noReviewerClaim,
noPredictionPregnancy, noPrescribing / noPrescribingFull, keepGeneral,
noPregnancyVerdict, noOvulationVerdict, noTestInterpretation, noFalseHope,
noFearOrBlame, untrustedInput), `ESCALATION_BLOCKS` (full, movementAware,
onlyWhenRaised, encourage), `GROUNDING_USE_RULE`, `OUTPUT_HYGIENE_RULES`,
`SAFE_FALLBACK_ANSWER`. Trusted instruction blocks are appended only when their
data block exists: `JOURNEY_CONTEXT_INSTRUCTIONS`, `MEMORY_INSTRUCTIONS`,
`CONVERSATION_HISTORY_INSTRUCTIONS`.

Classification: all of the above are **TRUSTED PROMPT RULES**, except source
selection (**SOURCE/GROUNDING RULE**) and `aiAnswerSafety.ts` (**DISPLAY
SANITISATION**). The only **DETERMINISTIC APPLICATION RULES** are validation,
rate limiting, urgent routing, the kill switch and client clarification.
Everything else is **MODEL JUDGEMENT**.

Duplication and conflicts:

1. Reassurance control exists twice — prompt text (`noFalseHope`,
   `noPredictionPregnancy`, `noPregnancyVerdict`) and `BANNED_VERDICT_PATTERNS`
   in `aiAnswerSafety.ts`, which only emits a development console warning.
   **Development detection only — not runtime enforcement, not a guarantee.**
2. Escalation wording exists both in prompt blocks and in the deterministic
   urgent answers, with different phrasing per mode.
3. `ESCALATION_BLOCKS.onlyWhenRaised` (first year) suppresses default
   professional-help wording while `ESCALATION_BLOCKS.encourage` (TTC) adds it,
   so "when to point at a professional" is mode-dependent rather than
   state-dependent.

---

## 4. Gap matrix

| State | Current | Evidence |
| --- | --- | --- |
| GREEN | IMPLICIT | the default path; no runtime state object exists |
| AMBER | ABSENT | nothing between the urgent regex and the ordinary model answer; only prompt text |
| RED | IMPLEMENTED | `matchUrgent → "clinical"` + `CLINICAL_ANSWER` |
| CRISIS | PARTIAL | `CRISIS_ANSWER` and `ABUSE_ANSWER` exist, but share the urgent branch and have no separate state |
| UNSUPPORTED | PARTIAL | only `SAFE_FALLBACK_ANSWER`, chosen by the model, plus client-side clarification |

**Principal gap: AMBER.** The runtime distinguishes only "ordinary model path"
from "deterministic urgent bypass".

---

## 5. Deterministic-path findings that precede AMBER work

### 5.1 Rate limit versus urgent routing — REACHABLE (AIC-5 BUILD SAFETY GAP)

`consumeRateLimit` executes before `matchUrgent`. A caller over 12/minute or
100/hour receives a 429, and a limiter outage returns 503, in both cases before
any deterministic RED, CRISIS or safeguarding routing can run. Deterministic
high-risk guidance is therefore silently unavailable because a generative-AI
quota was exceeded. Not fixed here.

Options for AIC-5A (assess, do not assume): run the deterministic safety match
before ordinary rate-limit rejection and serve the fixed answer with no model
call and no grounding fetch; or keep the order and add a separate, tightly
bounded urgent-path allowance. Rate limiting is not removed, and any change must
keep abuse and denial-of-service protection intact — the urgent path is
attractive to abuse precisely because it is cheap and uncached.

### 5.2 Recap mode versus escalation — CONDITIONALLY REACHABLE (AIC-5 BUILD SAFETY GAP)

Only `first_year_day_recap` sets `allowUrgentEscalationAnswer: false`.
`matchUrgent` runs first, but in that mode a match returns
`DAY_RECAP_UNAVAILABLE_ANSWER` instead of escalation. The single UI caller is
`DaySummaryCard`, which composes structured recap text from logged entries
rather than free user input, and `resolveCompanionMode` never returns recap, so
standard product usage is **safe by construction**. A crafted request carrying
`mode: "first_year_day_recap"` with red-flag text can still suppress escalation,
because the endpoint trusts the client-supplied mode. Not fixed here.

### 5.3 Persistence before safety — retention observation, no current impact

With persistent history enabled, the user turn is stored before `matchUrgent`,
and the deterministic escalation answer is stored too. Both history flags are
OFF, so production impact today is none. Intended policy: visible urgent and
crisis turns are stored like any other visible conversation turn, under the
separate conversation-history privacy gate. No safety state, crisis flag or risk
score is persisted, and none may be.

### 5.4 Kill switch after urgent routing — positive property to preserve

`matchUrgent` runs before the `AI_SEARCH_DISABLED` check, so generative
answering can be paused while deterministic urgent and crisis guidance stays
available (`aiSearchEndpoint.test.ts` locks this in). No AIC-5 change may
reverse this ordering.

---

## 6. Proposed state definitions (not implemented)

**GREEN** — no safety concern requiring escalation was identified on the
available runtime path: education, preparation, general support, development,
ordinary journey questions, non-safety emotional support. Normal personalisation
operates. GREEN is **not** a clinical verdict, does not mean "medically safe",
and is never surfaced to a reader as a reassurance label.

**AMBER** — a concern where professional input is appropriate, or where
uncertainty makes simple reassurance unsafe, and no deterministic RED/CRISIS
rule matched. Behaviour: calm, proportionate, uncertainty-aware, non-diagnostic,
clear about who to contact, no emergency language unless warranted, no invented
clinical thresholds.

**RED** — the existing deterministic clinical urgent pathway, unchanged: a
recognised current-turn red flag where the companion does not continue normal
generative reassurance.

**CRISIS** — deterministic immediate safety and safeguarding routes distinct
from clinical urgency. Four sub-cases are distinguishable in source or intent:
self-harm/suicide, harm to another (including the baby), immediate danger, and
abuse/safeguarding. They keep distinct wording and help routes; a shared router
must not merge them.

**UNSUPPORTED** — an explicit capability boundary: diagnosis demands, demands
for certainty beyond the product's capability, professional judgement it cannot
safely provide, policy or safety conflicts. It is **not** "the companion cannot
diagnose" — ordinary health questions still receive safe general information,
honest uncertainty and support routes.

---

## 7. Safety evidence rules (binding; not a single global precedence chain)

1. **Current-turn user evidence** is the primary safety signal.
2. **Recent conversation history** may add context and *increase* caution where
   prior turns materially clarify the current concern.
3. **Authoritative journey context** improves relevance, wording and support
   route. It is not independent evidence of a symptom or of severity, and no
   pregnancy-week clinical thresholds may be invented from it.
4. **Permissioned memory** may personalise and may never lower severity: a
   remembered "I prefer reassurance" or "I avoid contacting doctors" cannot
   suppress escalation.
5. **Page / entry context** identifies topic only. Reading about ectopic
   pregnancy, miscarriage, postpartum bleeding or self-harm support is never
   evidence that the person has that condition, and can neither raise nor lower
   personal clinical severity.
6. **Nothing may downgrade a deterministic current-turn RED or CRISIS result.**
   Severity may increase where additional evidence justifies caution; it may
   never silently decrease. Model judgement can never convert RED to AMBER or
   CRISIS to GREEN.

---

## 8. Recommended routing architecture

Deterministic first, classifier optional:

```text
request → deterministic router
            ├─ crisis / safeguarding / clinical → existing fixed answers (authoritative)
            ├─ kill switch                      → pause answer
            ├─ unsupported route                → explicit capability-boundary answer
            └─ otherwise                        → GREEN or AMBER handling → model answer
```

AIC-5A wraps the existing `matchUrgent` result rather than rewriting any regex.
Mapping: `"clinical"` → RED; `"crisis"` matching `ABUSE_PATTERN` → CRISIS
(safeguarding); `"crisis"` otherwise → CRISIS (self-harm / harm to another).

Deterministic responsibilities: validation, rate limiting, kill switch, RED and
CRISIS routing, unsupported routing, mode selection, source selection, and
enforcement of the never-downgrade rule.

Possible model-assisted responsibility: recognising an AMBER concern the
deterministic rules do not cover. Strictly additive — it may raise GREEN to
AMBER and do nothing else.

The router is transport-independent shared runtime code. No safety state logic
may live in `AskPage` or `CompanionPanel`.

---

## 9. Structured output feasibility and classifier policy

Status: **UNKNOWN / INCONCLUSIVE**. `ai-search` calls
`https://ai.gateway.lovable.dev/v1/chat/completions` with `stream: true` and
never sends `response_format`; no repository evidence establishes strict schema
support on this model and path. No probe was run in this audit. AIC-5B is a
dev/test-only probe: no production routing, no user traffic, no flag, no change
to ordinary SSE answers. It reports SUPPORTED / UNSUPPORTED / INCONCLUSIVE with
runtime evidence.

Rejected outright: `SAFETY_LEVEL: AMBER`-style tokens in generated prose, regex
over streamed text, and post-hoc inspection of a completed answer to decide
whether escalation should have happened.

Classifier dependency: **OPTIONAL**. Safety must not fail without an LLM
classifier. Without proven structured output, AIC-5 ships deterministic routing,
trusted AMBER behaviour rules, explicit unsupported routing and strengthened
prompt contracts.

Failure policy for any future classifier — timeout, rate limit, provider error,
invalid schema, parser failure or unsupported structured output must never
resolve to GREEN. Conservative default is AMBER-style cautious handling,
assessed against benign-query impact, latency, repetitive professional-contact
advice and trust. A classifier adds one extra model request before the stream,
so the classification hop roughly doubles request count and shares the same
provider rate-limit budget as the answer call.

---

## 10. Reassurance and uncertainty

Paths that could still produce "that's normal", "you're fine", "nothing to worry
about" or "this is definitely…": the model answer in every mode; the
`onlyWhenRaised` escalation variant, which suppresses default professional-help
wording; and grounded answers that generalise NHS material to the individual.
Nothing enforces the ban at runtime — `BANNED_VERDICT_PATTERNS` is a
development-only console warning.

Future rule: supportive language about feelings, effort and experience is always
allowed; certainty about a personal clinical state never is. Uncertainty by
state — GREEN: answer plainly, no ritual disclaimers; AMBER: name the
uncertainty once and the professional route once; RED and CRISIS: no uncertainty
language, only the deterministic escalation. Where enforcement belongs (shared
server-side deterministic post-processing versus prompt contract) is an AIC-5D
decision; blanket text censorship is rejected.

---

## 11. Emotional continuity

Definition: the companion may respond appropriately to emotion the person has
**explicitly stated**, within the current conversation. Source is the existing
bounded conversation history plus the current turn. The audit finds no evidence
that a separate emotional-state object is required; AIC-5E should first attempt
response guidance from existing history alone.

Forbidden: emotion, mood, anxiety, distress or risk scores; emotional profiles;
emotion or sentiment tables; sentiment history; automatic extraction of
emotional disclosures into memory; and any inferred clinical label ("user has
anxiety", "user sounds depressed"). Limited inference is acceptable only for
tone — pacing, warmth, acknowledgement — never for a label that is shown, stored
or used in routing.

Emotional data persisted: **0**. Safety state persisted: **0**. Both stay 0
unless a person separately uses the AIC-3 permission model after its release
gate opens.

Clarification need and safety state remain separable: a vague question is not
automatically AMBER.

---

## 12. Grounding, sources and unsupported knowledge

Frozen and unchanged: `AI_SOURCE_ROUTING_VERSION = 30B-source-routing-v1`,
grounding candidates 0, grounding approvals 0, `listGroundingEligibleSlugs()`
`[]`. NHS allowlist routing, source stripping, raw-URL suppression and the trust
line are untouched. When all NHS sources fail the endpoint returns 503; when the
model cannot answer safely it is instructed to return `SAFE_FALLBACK_ANSWER`.
UNSUPPORTED must integrate with that existing fallback rather than introduce a
second refusal vocabulary. RED and CRISIS already bypass generative grounding
entirely, which is the correct pattern for any future deterministic state.

---

## 13. Transport and voice readiness

All safety logic except clarification already lives in shared server modules, so
a future voice transport reuses it unchanged: `input → shared safety router →
shared intelligence → response → surface-specific output`. The single coupling
issue is `src/lib/askClarification.ts`, which runs client-side and is therefore
unreachable from voice; AIC-5C should assess moving unsupported and clarification
decisions into the shared server runtime.

---

## 14. Open runtime watch item

`useCompanion must be used inside CompanionProvider` was reported in preview
logs. Source: every route in `src/App.tsx` renders inside `<CompanionProvider>`
(lines 219–385) and `useSuppressCompanion` is provider-safe by design. Runtime:
a headless pass over `/`, `/trying-to-conceive`, `/ask`, `/pregnancy`,
`/first-year` and a 404 route produced no such error. Status: **NOT
REPRODUCIBLE** on any reachable production path; consistent with a stale
hot-reload during AIC-4 provider work. Kept as a **WATCH ITEM**, to be
re-checked once immediately before AIC-5 build.

---

## 15. AIC-4 verification

`AskPage.tsx` no longer constructs `Previous question:` / `Previous answer:`
context; it explicitly refuses that shape for the display label, and continuity
comes from the shared conversation runtime. "Back to previous question" is a
router `navigate(-1)` navigation affordance only. Three inline single-shot
components (`TTCAskCompanionCard`, `FirstYearAskCompanion`, `SectionAskAI`) still
append `Previous answer:` to freeform context — backlog debt, not an AIC-4
reopen. Raw Markdown in the earlier-turn preview is handled by `previewText()`;
any residue is **cosmetic backlog**, because primary answer rendering is
sanitised and rendered correctly.

---

## 16. Recommended build sequence

1. **AIC-5A — Deterministic Safety Foundation** (first, blocking): shared
   explicit safety-state contract and transport-independent router wrapping
   `matchUrgent`; existing regexes preserved; clinical / crisis / safeguarding
   mapped cleanly; rate-limit versus urgent routing resolved; crafted
   recap-mode suppression resolved; urgent-before-kill-switch preserved;
   deterministic regression tests. No model classifier.
2. **AIC-5B — Structured Output Feasibility**: dev/test-only strict probe;
   classifier go/no-go; no prose parsing; classifier stays optional.
3. **AIC-5C — Unsupported + Clarification**: move the relevant decisions to the
   shared server runtime for voice reuse; clarification stays separate from
   severity.
4. **AIC-5D — AMBER / uncertainty / reassurance**: the missing middle state and
   the enforceable reassurance strategy; no invented clinical thresholds.
5. **AIC-5E — Emotional continuity**: ephemeral, from current turn plus existing
   bounded history; no store, score, memory write or diagnosis.
6. **AIC-5F — Verification**: cross-surface parity, safety regression suite,
   eval-dataset expansion, severity-precedence tests, voice-readiness check.

No AMBER, classifier, emotional-continuity or voice work begins before AIC-5A
closes.

Tests missing before build: AMBER behaviour, unsupported routing,
never-downgrade precedence (history, memory and page context cannot lower
severity), clinical/crisis/safeguarding separation, rate-limited urgent
availability, crafted-mode escalation, classifier failure policy.

ADR proposals: `docs/ai/adr/ADR-AIC5-proposals.md`.
