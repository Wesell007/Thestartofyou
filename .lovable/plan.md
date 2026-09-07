# AIC-J6 — Full Journey AI Evaluation (audit report)

No source files were changed. Evidence is repository truth plus the full automated suite, lint and typecheck. Items that can only be proven by live runtime against a deployed `ai-search` are marked NOT RUNTIME-VERIFIED rather than claimed as passing.

## Method and honesty note

Verified by execution: full test suite, lint, typecheck, route table, registry/resolver source, header plumbing, flag state.
Verified by code reading: matrices 6–14, 17–28, 31–33, 43–45.
Not verified: live browser behaviour of panel/`/ask` at mobile and desktop, real model output quality (30), and any end-to-end J5 behaviour against a deployed function (the header is not deployed).

## 1–7. Baseline and phase status

1. Actual baseline: **100 test files, 1153 tests, 1153 passing, 0 failures, 0 timeouts** (matches the stated baseline). Lint: 1 pre-existing error (`previewAuthStorage.ts:38 prefer-const`) + 10 pre-existing react-refresh warnings. Typecheck clean.
2. J1 — CLOSED PASS. 3. J2 — CLOSED PASS. 4. J3 — CLOSED PASS. 5. J4 — CLOSED PASS.
6. J5 engineering — CLOSED PASS. 7. J5 production activation — **NOT DEPLOYED**; `X-Companion-Next-Actions` exists only in the repository copy of `ai-search`.

## 8–14. Context matrices

8. **TTC** — PASS. All four stages plus generic saved state resolve to one action (`/my-ttc-journey`); `ivfInTreatment` refines starters only, never lifecycle; malformed/absent state → no personal starters, no actions; IVF content never manufactures `in_treatment`. IVF lifecycle creation count = 0.
9. **Pregnancy** — PASS. Registry accepts weeks 1–42; canonical trimester boundaries 12/13/27/28 asserted in existing tests; unknown or malformed week → `Open My Journey` only; saved week always beats displayed week.
10. **First Year** — PASS with one divergence. Bands 0–2/3–5/6–8/9–11 correct; negative, fractional, NaN, null → journey-level fallback; ambiguity → `Open My First Year` only. **Divergence:** the brief calls month 12 unsupported, but `/first-year/12-months` exists (`App.tsx:289`) and the J5 registry maps 12 → that route. Repository truth is "supported". Needs a product decision, not a silent change (P2).
11. **Transitions** — PASS by construction. `notifyJourneyStateChanged()` fires after every authoritative commit (`savedJourney.ts:120,261,309`, `savedTTCJourney.ts:134,168`, `firstYearJourney.ts:65`); `resetPersonalJourneyCache()` bumps an epoch synchronously, discards obsolete in-flight resolutions and re-loads; `CompanionProvider` additionally blocks next actions until the following eligible answer, so a new lifecycle can never appear under an old answer. History is not rewritten.
12. **Signed out** — PASS. `resolveJourneyNextActions` requires `signedIn && personal`; signed-out action count = 0; content-mode starters only.
13. **Unknown personal** — PASS. Null stays null; no fallback lifecycle; content entry still works.
14. **Content vs personal cross-matrix** — PASS. Entry descriptors are provenance-tagged content only (`AskAboutThis.tsx`); `journeySuggestions.ts` explicitly refuses to derive personal starters from entry topics. Route/content → personal lifecycle inference count = **0**.

## 15–18. Surfaces, runtime, registries, J5

15. J3 starter result — PASS (one canonical registry, stable order, max preserved, British English).
16. J4 entry-point result — PASS across TTC, Pregnancy and First Year hubs, topics, weeks, trimesters, months, phases and saved-journey screens; labels correctly distinguish topic/week/trimester/month/stage; no hidden turn, no model call on open.
17. **AI answer surfaces = 2** (companion panel, `/ask`). Inline journey answer surfaces = 0. `DaySummaryCard` direct AI execution = 0. Note: `NoteShapingSuggestion.tsx` and `SlotReflectionAssistant.tsx` call the separate `ai-reflect` function — a journal-shaping feature, not a companion answer surface, and it renders no companion answer. Documented, not a defect.
18. AI answer runtime count = 1 (`useCompanionConversation` over `useAISearch`).
19. Personal resolver = 1. 20. Personal cache = 1. 21. J3 registry = 1. 22. J5 registry = 1. 23. J5 resolver = 1.
24. **J5 route validity — PASS.** `/my-ttc-journey`, `/my-week`, `/my-journey`, `/my-first-year`, `/my-first-year/today`, `/pregnancy/week/:week` and all thirteen `/first-year/*` month routes exist. No arbitrary URLs; closed union enforced at type level.
25. **Safety eligibility matrix — PASS.** Ordinary → `allow` only (`index.ts:680`, and only when no AMBER/cautious guidance applied); deterministic RED/CRISIS, kill-switch, controlled, clarify and unsupported → `suppress` (`index.ts:472,481`); missing/malformed/unknown → client fails closed (`readNextActionsEligibility`). No category, score, reason or classifier output crosses the wire.
26. RED/CRISIS composition — PASS; wording untouched, no navigation chips.
27. AMBER — PASS; suppressed, never labelled, no extra classifier call.
28. Clarification/unsupported — PASS; suppressed, no stale actions, no content fallback.
29. Kill switch/controlled — PASS.
30. Failure/abort/timeout/partial — PASS; only a committed complete answer may host actions.
31. J5 stale-action defects = 0.
32. Route/content personal-inference count = 0.

## 33–45. Quality audits

33. **False-personalisation defects = 3 (all P2, all signed-out copy, none in the AI answer path):**
    - `src/components/article/ArticleAISupport.tsx:25` — "guidance tailored to your stage" shown to every visitor, signed out included.
    - `src/components/ivf/IVFAISupport.tsx:40` — "Ask about your stage" ungated.
    - `src/pages/AskPage.tsx:1049` — "Continue your journey" heading over generic tail links, not personal ones.
    (Marketing hero copy across `home/` uses "your baby"/"your journey" as brand voice; classified B, not a defect.)
34. Stale-state defects = 0.
35. Duplication defects = 0.
36. Panel vs `/ask` parity — PASS on authority (same resolver, IDs, order, suppression); presentation differs by design.
37. Mobile defects — NOT RUNTIME-VERIFIED. Static reading shows wrapping next-action links and ~44px targets, but the Next steps row plus composer plus journey bottom nav plus launcher stack has not been observed on a device. Flagged as an open verification item, not a pass.
38. Desktop defects — NOT RUNTIME-VERIFIED, same reason.
39. Accessibility defects = 0 found in J1–J5 UI (labelled `nav`, real links, no nested interactives, visible focus). No site-wide claim made.
40. Performance defects = 0 evidenced: one module-level cache, one signal listener, single-flight resolution, no added AI calls, no storage churn. No bundle measurement taken.
41. Network/error defects = 0; every failure path fails closed with no stale personal claim.
42. Auth-transition defects = 0; `onAuthStateChange` resets the cache both ways.
43. Multiple babies — PASS; ambiguity yields `Open My First Year` only, never a guessed month or baby.
44. Boundary values — PASS for pregnancy 1/12/13/27/28/42 and first year 0/2/3/5/6/8/9/11 plus all invalid inputs; month 12 passes as supported (see item 10).
45. Copy-quality defects = the three in item 33; tone, British English and non-medical framing otherwise hold. J5 is never framed as an AI recommendation.
46. Route protection — PASS; all personal destinations stay behind `ProtectedRoute` and RLS. J5 visibility is not a security boundary.

## 47–53. Programme state

47. Grounding — unchanged, `30B-source-routing-v1`, parked. Ungrounded ordinary journey answers are a medical-grounding programme item, not a journey-awareness release blocker.
48. Memory — OFF (`AI_MEMORY_ENABLED` kill switch; no J2–J5 feature depends on it).
49. Persistent history — OFF/gated; session continuity independent; J5 state never persisted.
50. Voice — AIC-6 closed, 7A closed, 7B provider gate closed, 7B build not started.
51. Engineering release readiness — **READY** (P0 = 0, P1 = 0).
52. Production release readiness — **NOT READY**: `ai-search` in production has no `X-Companion-Next-Actions`, so J5 is invisible there.
53. Deployment dependencies — deploy `ai-search` only; no migration, no flag, no secret.
54. **Recommended release order: Option A, backend first.** Deploy `ai-search`, verify the header on an ordinary answer and its absence on controlled answers, then ship the client. The client fails closed, so any interleaving is safe; A simply avoids a silent dead feature.
55. Rollback — fully compatible both ways. Old client + new header: header ignored. New client + old function: no header, every response suppresses, no actions render, no errors. Rollback = redeploy the previous function; no client rollback required.
56. Existing coverage — registry/resolver, eligibility header, safety composition, entry points, freshness, surfaces, parity: 1153 tests.
57. Missing J6 coverage — (a) an end-to-end suppression composition test that drives the real header through the runtime into the UI, (b) auth sign-out mid-answer, (c) transition-during-stream, (d) mobile layout regression coverage for the Next steps + composer + bottom nav stack.
58. P0 = 0. 59. P1 = 0. 60. P2 = 5. 61. P3 = 1.
62. **Defect inventory:** P2-1..3 the three false-personalisation copy items (item 33); P2-4 month-12 spec/repository divergence; P2-5 mobile/desktop runtime UX unverified; P3-1 redundant duplicate suppression assignment in `ai-search` (`suppressNextActions` helper and `sendControlled` both set the same header).
63. Prompt tuning required — **NO**, on current evidence. 64. Evidence: no observed prompt failure; the audit was static and the model path is unchanged since AIC-5F. A judgement either way needs recorded transcripts, which is a separate evaluation slice.
65. Unresolved release blockers — none of blocker class; item 52 is a deployment step, not a defect.
66. Proposed remediation slices — **J6-R1** copy gating (three items), **J6-R2** month-12 decision recorded in the registry docs, **J6-R3** the four missing evaluation tests, **J6-R4** mobile/desktop runtime verification.
67. Files likely to change: `ArticleAISupport.tsx`, `IVFAISupport.tsx`, `AskPage.tsx` (copy only), `docs/ai/companion-journey-next-actions.md`, new test files.
68. Frozen: prompts, AIC-5, grounding, memory, history, `JourneyContextV1`, J2 resolver, J3 registry, J4 entry architecture, J5 registry/resolver, `ai-search` logic, backend, schema/RLS, voice, AssemblyAI, analytics.
69. **AIC-J6 — REMEDIATION REQUIRED** (P2 only; closable immediately after J6-R1 to J6-R4, or by explicit written acceptance of the five P2s).
70. **AIC-J6 — SAFE to enter the final release gate** once J6-R1/R4 are settled; no blocker class remains.
71. **AIC-7B BUILD — SAFE to resume later**, after J5 is deployed and J6 closes. The journey foundation voice depends on (one runtime, one context authority, one safety path) is stable.

## Next step

Awaiting your decision: approve the J6-R1 to J6-R4 remediation slices, or accept the five P2 findings in writing and close J6 as is. No fixes, deployments or voice work will start until you choose.
