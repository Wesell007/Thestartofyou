# AIC-5E — Emotional Continuity: architecture gate report and build proposal

Architecture only. No production runtime change is proposed in this gate. AMBER classifier stays OFF, memory OFF, persistent history OFF, grounding `30B-source-routing-v1`, DB migrations 0.

## A. Audit of what exists today (read from source)

1. **Current emotional behaviour** — tone is prompt-only. Identity lines in `aiModes.ts` carry it: general "concise, calm"; pregnancy "warm, steady, non-clinical"; first year "gentle, calm"; TTC "warm, steady, non-clinical" plus "begin with a direct, kind answer". There is no acknowledgement rule, no continuity rule, no mirroring rule anywhere.
2. **Existing emotional prompt rules** — `SAFETY_BLOCKS.noFearOrBlame` and `noFalseHope` (TTC only), `GLOBAL_REASSURANCE_RULE`, `AMBER_SAFETY_GUIDANCE` ("Acknowledge the concern plainly and warmly before anything else" — the only acknowledgement instruction in the system, and it is gated OFF), `CAUTIOUS_UNCERTAINTY_GUIDANCE`. Gap: general, pregnancy and first-year modes have no no-fear/no-blame line, so tone quality varies by mode.
3. **Existing deterministic emotion logic** — three places, none of them an emotion system: `clarificationRules.hasConcernWording` (worried/scared/frightened/anxious/panic → suppresses clarification), `amberEligibility` (reuses concern wording as signal A), `aiSources` (`anxious|anxiety` → NHS mental-health source; `suicid|self-harm|depress|can't cope` → safety family). `urgentPatterns` owns crisis. No emotion categories, no scores.
4. **Persisted emotion state** — companion side: **0** (no column, table or conversation metadata). Outside the companion, the TTC cycle log has a user-entered `mood` log type (`ttcLogs.ts`, migration `20260713233226`), which is journal data the user typed, never read by `ai-search`. Do not touch it.
5. **Emotional analytics** — 0 events, 0 properties. No transcript logging.
6. **Emotional UI behaviour** — 0. No mood chips, no tone switches, no emotion state in `useCompanionConversation`.

## B. Definitions this gate fixes

7. **Emotional continuity** = request-scoped tone adaptation to emotion the user has explicitly stated in the current turn or in recent user-authored turns of the same thread. Never a fact, never a profile.
8. **Evidence** = user-authored explicit self-report only ("I'm scared", "I feel guilty", "I'm still overwhelmed").
9. **Inference prohibited** — punctuation, caps, length, typing style, repetition, silence, page, week, baby age, prior assistant wording. No "seems anxious".
10. **Clinical boundary** — emotional words are words, never a diagnosis, condition, severity or mental-health profile.
11-13. **Safety relations** — GREEN: tone only. AMBER (when it ships): softens *how*, never *what*; contact guidance is never removed. RED/CRISIS: deterministic wording untouched, never delayed, softened or prefixed.
14. **Current turn wins** — explicit change language replaces earlier emotional context ("I'm calmer now" cancels "I'm terrified").
15-16. **History** — reuse AIC-4 bounded turns only (10 / 1,200 / 4,000). Lookback for emotion: last 2 user turns. Assistant turns are never emotional evidence.
17-20. **Evidence role 0** for JourneyContext, page context, memory and grounding.
21. **Positive emotion** — first-class: brief acknowledgement, no false medical reassurance, no outcome prediction.
22. **Mixed emotion** — supported by carrying up to two categories, never forced into one label.
23. **Change** — recomputed per request; nothing to update because nothing is stored.
24. **Taxonomy** — smallest useful set of five: `fear`, `overwhelm`, `low` (sadness/grief/loneliness), `self_blame` (guilt/shame), `positive` (relief/hope/excitement/pride). Frustration/anger maps to `overwhelm`. No confidence, no severity.
25. **Runtime contract** — `{ hasExplicitEmotion: boolean; categories: EmotionCategory[]; guidance: string }`, request-scoped, never serialised, never returned to the client.

## C. Options

26. **A — no layer.** Zero cost, but acknowledgement is inconsistent across modes, there is no anti-repetition rule and no current-turn-override rule; the model cannot be relied on for either. Rejected.
27. **B — deterministic explicit-language detector + trusted tone block.** ~0 ms, no network call, reviewable regexes, transport-independent, fully testable. Risk is vocabulary coverage; mitigated by fail-open (no match = today's behaviour exactly).
28. **C — model classifier.** Adds a second provider call (AIC-5D measured 1.0–1.2 s), cost, timeout paths and voice delay to read words the user already typed literally. Rejected.
29. **D — n/a.**
30. **PRIMARY RECOMMENDATION — B.**

## D. Proposed build design (for a later slice, not this one)

31-34. **Gate** — new pure module `supabase/functions/_shared/emotionalEvidence.ts`. A match requires (a) a first-person self-report frame (`I am / I'm / I feel / I've been / I get / feeling` + optional intensifier) immediately bound to (b) an emotion word. Third-party subjects (`my friend`, `my partner`, `my baby`, `she/he/they`) and hypothetical/definitional frames (`what should a worried parent…`, `signs of…`, `is it normal to feel…`) are excluded. Assistant turns are excluded by role filter.
35. **Bounded history** — the last 2 *user* turns only, and only when the current turn contains no emotion word of its own; any explicit change phrase in the current turn discards history entirely.
36. **Anti-repetition** — if the same category was already present in the immediately preceding user turn, the injected block instructs "do not restate the acknowledgement; continue naturally".
37. **Overwhelm** — bounded structure rule: one clear first step, fewer parallel recommendations, no optional detail. Applies only to `overwhelm`, never as a global shortener.
38. **Fear/worry** — brief acknowledgement, answer the question, proportionate next step; no catastrophising, no "don't worry", never AMBER by itself.
39. **Guilt/shame** — no blame, no automatic "it's not your fault", no factual claim about responsibility.
40. **Positive** — one light reflection, no certainty, no outcome claim; existing TTC/pregnancy verdict bans stay stronger.
41-42. **Precedence** — the emotional block is injected after safety blocks and above mode/tone, and its own first line states it may never alter, delay, soften or remove safety guidance, escalation routes or factual standards.
43-45. **Deterministic responses** — AIC-5E applies to model answers **only**. Clarification (5C), UNSUPPORTED (5C) and RED/CRISIS (5A) wording stays byte-identical; a seam for softening 5C wording is recorded as future work, not built.
46. **Extra model calls — 0.** 47. **Latency — sub-millisecond regex work, no network.**
48. **Flag** — none needed (deterministic, non-persistent, tone-only, fail-open); if release wants one, a single server env check reusing the existing pattern.
49. **Failure** — fail-open: any error or no match yields exactly today's prompt; emotion never blocks safety or answering.
50-52. **Persistence 0, logging 0, telemetry 0.** 53. **Voice** — text/transcript only, shared module, so AIC-6 reuses it with no voice sentiment detector.

## E. Evals and status

54. **Current coverage** — thin: 3 emotional items in `eval-dataset-v1.json` (TTC support, overwhelmed parent, "so tired I am scared I will drop the baby"). No positive, mixed, change, continuity or third-party fixtures.
55. **Gaps** — everything in the requested matrix except the three above.
56. **Future matrix** — the 24 cases listed in the brief, as a new `emotionalEvidence` unit suite plus endpoint assertions that RED/CRISIS/clarify/unsupported wording is unchanged and no storage or logging occurs.
57. **ADR-AIC5-07** — stays PROPOSED; updated with the chosen Option B architecture, marked ACCEPTED only after the build ships and validates.

## F. Scope of this gate

58. **Docs changed** — `docs/ai/companion-safety-emotional-continuity.md` (new AIC-5E architecture section replacing the placeholder in §11), `docs/ai/adr/ADR-AIC5-proposals.md` (ADR-07 body, status unchanged), `roadmap.md`. `companion-architecture.md` gets one pipeline line only if the build is approved.
59. **Production files changed — 0.** 60. **Tests changed — 0.**
61. Grounding unchanged. 62. Memory and history flags remain OFF.
63. **AIC-5E ARCHITECTURE GATE — CLOSE on approval of this document.**
64. **PRIMARY RECOMMENDATION — B.**
65. **AIC-5E BUILD — SAFE TO APPROVE** as a separate slice. AIC-5F and AIC-6 not started.
