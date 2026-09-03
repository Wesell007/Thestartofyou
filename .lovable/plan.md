# AIC-5 — Emotional Continuity & Safety Intelligence (audit + architecture gate)

Audit only. No safety/emotion system is built in this slice. No voice, no memory changes, no conversation-runtime redesign, no grounding change.

## A. Verified current safety path (read from source)

Request flow, in order, in `supabase/functions/ai-search/index.ts`:

```text
useCompanionConversation → companionRequest → useAISearch → POST /functions/v1/ai-search
  1 parseAiSearchBody (validation.ts)        deterministic, 400 on bad shape
  2 consumeRateLimit (RPC, IP+UA hash)       deterministic, 429/503
  3 establishConversation (AIC-4)            gated, never affects safety
  4 persistMessage(user)                     only when persistent history is on
  5 matchUrgent(query)  ← SAFETY DECISION    deterministic, bypasses the model
  6 isAiDisabled(AI_SEARCH_DISABLED)         deterministic pause answer
  7 selectSources + fetchGrounding (NHS)     503 when all sources fail
  8 renderJourneyContextBlock (AIC-2)
  9 loadPermissionedMemory (AIC-3, flag off)
 10 loadConversationTurns / sessionHistory (AIC-4)
 11 system prompt = mode prompt + trusted instruction blocks
 12 google/gemini-2.5-flash chat/completions, stream:true, temp 0.2
 13 SSE passthrough (persistOnComplete when persisting)
 14 client sanitiseAnswerForDisplay (aiAnswerSafety.ts) + link stripping
```

Confirmed safety-decision points: only steps 5, 6, 11 and 14. Steps 5/6 are the only ones that can bypass the model.

**Deterministic urgent owner:** `supabase/functions/_shared/urgentPatterns.ts` — `CRISIS_PATTERN`, `URGENT_PATTERN` (union of GENERAL / PREGNANCY / POSTPARTUM / BABY red-flag groups), `matchUrgent()`, `urgentAnswer()` with three fixed answers (crisis, abuse, clinical) plus `AI_PAUSED_ANSWER`. Matching is current-turn regex only: history, journey context, memory and grounding play no part. Recap mode receives `DAY_RECAP_UNAVAILABLE_ANSWER` instead of escalation. Tests: `src/test/urgentPatterns.test.ts` (16 positives, 7 negatives, wording bans) and `src/test/aiEvalDataset.test.ts`.

**Safety prompt inventory:** `aiModes.ts` — `SAFETY_BLOCKS` (10 lines), `ESCALATION_BLOCKS` (4 variants), `GROUNDING_USE_RULE`, `OUTPUT_HYGIENE_RULES`, `SAFE_FALLBACK_ANSWER`; plus trusted instruction blocks for journey context, memory and conversation history. Client-side display sanitisation and `BANNED_VERDICT_PATTERNS` (dev warning only, not enforced) live in `src/lib/aiAnswerSafety.ts`. Duplication found: reassurance bans exist as prompt text (`noFalseHope`, `noPredictionPregnancy`) and again as unenforced client patterns; escalation wording exists both in prompt blocks and in the deterministic urgent answers.

**State matrix against current behaviour:**

| State | Status | Evidence |
| --- | --- | --- |
| GREEN | IMPLICIT | the default path; no explicit state exists |
| AMBER | ABSENT | no mechanism between "urgent regex" and "ordinary answer"; only prompt text |
| RED | IMPLEMENTED | `matchUrgent → "clinical"` |
| CRISIS | PARTIAL | crisis and abuse answers exist, but share the urgent regex path and the same request branch |
| UNSUPPORTED | PARTIAL | only `SAFE_FALLBACK_ANSWER` chosen by the model, plus clarification in `askClarification.ts` (client, `/ask` and panel) |

Other verified points: no safety state, emotion label or risk score is stored anywhere (0 occurrences); no raw transcript logging (error paths log error names only); panel and `/ask` share one runtime and one endpoint, so safety parity is structural; no third chat surface exists (inline Ask CTAs navigate to `/ask`).

**AIC-4 checks:** `AskPage.tsx` no longer builds `Previous question:` / `Previous answer:` context — it explicitly strips that shape from the display label, and continuity comes from the shared conversation runtime. `Back to previous question` is a router `navigate(-1)` affordance driven by `navigationState.previousQuestion` — a navigation label, not a continuity mechanism. Three legacy inline components (`TTCAskCompanionCard`, `FirstYearAskCompanion`, `SectionAskAI`) still append `Previous answer:` into freeform context — recorded as debt, not an AIC-4 reopen. Raw Markdown in the earlier-turn preview is already handled by `previewText()`; remaining leakage is cosmetic backlog only.

**Voice readiness:** all safety logic already lives server-side in shared modules, so a future voice transport reuses it unchanged. The only coupling is `askClarification.ts`, which runs client-side and would need to move or be duplicated for voice.

**Open runtime finding (not in scope to fix here):** a `useCompanion must be used inside CompanionProvider` error appears in preview logs; to be triaged separately.

## B. Proposed architecture (for approval, not built here)

1. **Safety router, deterministic first.** Option B: deterministic high-risk rules stay authoritative; a model-assisted classifier is considered only for the ambiguous middle. No model output may downgrade a deterministic match.
2. **State definitions.** GREEN = routine informational/supportive, personalisation allowed. AMBER = concern needing professional input but no red-flag match; bans certainty and requires a clear "contact X" route, never a clinical threshold invented in code. RED = the existing urgent pathway, unchanged and unduplicated. CRISIS = its own deterministic route, separate from clinical urgency (mental health, self-harm, harm to another, safeguarding). UNSUPPORTED = an explicit product boundary (diagnosis requests, certainty the companion cannot give, policy conflicts), distinct from "the model does not know".
3. **Structured output feasibility = UNKNOWN.** The endpoint uses gateway chat completions with `stream: true` and never requests `response_format`; nothing in the repo proves structured-output support. First build task is a probe. No prose regex over the streamed answer, ever.
4. **Extra model call = only if the probe passes**, run before the answer stream, on a strict schema, with a conservative failure policy: classifier error, timeout or rate limit resolves to AMBER-style cautious handling, never GREEN.
5. **Emotional continuity = ephemeral.** Derived from the existing bounded conversation history plus the current turn only. No table, no score, no auto-memory. Explicit self-described emotion may shape tone; inferred emotional or clinical labels are forbidden.
6. **Precedence rule.** Current turn > history > journey context > page context > memory. Page context never evidences a personal symptom; memory never lowers escalation; journey context informs relevance, never risk.
7. **Boundaries preserved.** Grounding stays `30B-source-routing-v1` with zero candidates/approvals; NHS routing, source stripping and the trust line unchanged; all four memory/history flags stay off.

## C. Deliverables of this slice (on approval)

- Create `docs/ai/companion-safety-emotional-continuity.md` with the full audit, matrix, state definitions, routing architecture, failure policy, emotion rules, privacy and voice readiness, and the proposed build slices.
- Update `docs/ai/companion-architecture.md` with a pointer and the safety-path summary.
- Add ADR proposals `ADR-AIC5-01` … `ADR-AIC5-07` as **Proposed**, plus `ADR-AIC5-08` (structured-output feasibility must be proven before any classifier is built).
- Record the 62-point completion report in chat.
- No production code, no test changes expected; baseline stays 80 files / 794 tests.

## D. Recommended build sequence (evidence-based, for later approval)

- **AIC-5A** shared safety-state contract + router module wrapping the existing `matchUrgent`, with crisis split from clinical. No behaviour change.
- **AIC-5B** structured-output probe and go/no-go on model-assisted classification.
- **AIC-5C** UNSUPPORTED route consolidated with the existing fallback and clarification logic (moved server-side for voice reuse).
- **AIC-5D** AMBER handling: uncertainty and reassurance rules, prompt-block level first, enforcement second.
- **AIC-5E** emotional-continuity response guidance from existing bounded history.
- **AIC-5F** cross-surface verification, deterministic safety tests, eval-dataset extension.

Missing tests to add before build: AMBER/uncertainty behaviour, unsupported routing, precedence (memory/page/history cannot lower severity), crisis-versus-clinical separation, classifier failure policy.

## E. Binding clarifications accepted (approval message)

- The principal gap is recorded as **AMBER absent**: the runtime distinguishes only "ordinary model path" vs "deterministic urgent bypass".
- No single global precedence chain. Explicit safety-evidence rules instead: current turn is primary; history may add caution; journey context informs relevance not risk; memory personalises but never lowers severity; page context is never personal symptom evidence. **No context may downgrade a deterministic current-turn match** — severity may increase, never silently decrease.
- AIC-5A wraps the existing `matchUrgent` result into an explicit state; existing regexes are not rewritten. Mismatches (abuse/safeguarding is selected inside the answer builder, not by the matcher) are documented rather than forced.
- CRISIS audited separately from clinical RED, keeping self-harm/suicide, harm to another, immediate danger and abuse/safeguarding distinguishable.
- AIC-5B probe is dev/test only: no production routing, no real-user classification, no flag, no prose parsing. Reports SUPPORTED / UNSUPPORTED / INCONCLUSIVE.
- Prose-token classifiers and post-hoc inspection of the streamed answer are rejected outright. Classifier dependency is OPTIONAL; failure never resolves to GREEN.
- GREEN is not a clinical verdict. UNSUPPORTED is a capability boundary, not "cannot diagnose".
- `BANNED_VERDICT_PATTERNS` recorded as development detection only, not enforcement.
- `askClarification.ts` client-side placement recorded as a voice-readiness seam for AIC-5C; clarification need stays separable from safety state.
- Emotional/safety persistence stays 0; all four memory and history flags stay OFF; grounding stays frozen at `30B-source-routing-v1` with 0 candidates, 0 approvals, empty eligible list.
- Preview `useCompanion` error triaged: all routes render inside `CompanionProvider`, and a live check of `/`, `/trying-to-conceive`, `/ask`, `/pregnancy`, `/first-year` and a 404 route reproduced nothing — recorded as NOT REPRODUCIBLE, re-check before build.
- Expected production code changes 0, test changes 0; baseline stays 80 files / 794 tests.

Deliverables unchanged: `docs/ai/companion-safety-emotional-continuity.md`, an update to `docs/ai/companion-architecture.md`, ADR proposals `ADR-AIC5-01`…`ADR-AIC5-08` (Proposed only), a roadmap entry, and the 62-point completion report plus the additional explicit findings requested.
