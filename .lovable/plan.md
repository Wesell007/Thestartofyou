# AIC-5E — Closure Validation Addendum

No production implementation changes were made during this addendum. Validation was re-run from a clean state in this session.

## Test arithmetic
1. Starting: 86 test files / 931 tests
2. Final: 88 test files / 990 tests
3. Added 59 (`src/test/emotionalEvidence.test.ts` = 47, `src/test/aiSearchEmotionalContinuity.test.ts` = 12, both verified as 59 passing in a focused run). Removed 0. Rewritten/replaced 0. `.skip` 0, `.todo` 0, timeout inflation 0. AIC-5A / 5C / 5D assertions weakened: 0 (no existing test file appears in the AIC-5E diff).

Full-suite note: the 990-run reported 3 timeouts in `MemorySettingsPrototype.test.tsx` and `companionSurfaces.test.tsx` under full parallel load (234s wall clock). Re-run in isolation: 19/19 PASS in 10.9s. Load-induced flake, unrelated to AIC-5E; no AIC-5E test flaked.

## Type and build proof
4. `npm run typecheck` run 1 — PASS, 0 errors
5. `npm run typecheck` run 2 — PASS, 0 errors. Incremental caches (`tsconfig.app.tsbuildinfo`, `tsconfig.node.tsbuildinfo`) could not be deleted in this mode, so a cache-defeating `tsc -b --force --pretty false` was run instead: exit 0, 0 errors. That is the stale-cache-proof result.
6. Deno: `DENO_DIR=/tmp/denodir deno check --no-lock supabase/functions/ai-search/index.ts` — PASS, 0 errors (run now, after AIC-5E).

## Evidence contract
7. Shipped contract (`_shared/emotionalEvidence.ts`): `{ kind: "none" }` or `{ kind: "explicit"; categories: EmotionCategory[]; source: "current" | "recent_user"; continuity: "new" | "continued" | "changed"; direction?: "eased" | "increased"; repeatedFromPrevious: boolean }`. `direction` is emitted only on explicit user-stated easing/worsening. Absent: confidence, severity, sentiment score, diagnosis, raw matched phrase, persistent identifier.
8. Categories: fear, overwhelm, low, self_blame, frustration, positive.
9. `MAX_EMOTION_CATEGORIES = 2`.
10. Self-report matcher: per-clause. The turn is split into clauses; within a clause an emotion word counts only when a user subject token (`i / i'm / i've / me / myself / we`) occurs before it and no third-party subject occurs before it. Quoted/definitional turns are excluded.
11. Ellipsis rule: a bare clause with no subject (only filler around the emotion word) inherits user ownership only if an earlier clause in the same turn was user-owned, or the whole turn is a short standalone self-report (≤ 60 chars, no `?`).
12. Third-party experiencer false positives: 0.
13. "I'm worried about my baby" → fear.
14. Generic/hypothetical: "What should a worried parent do?", "What are signs of anxiety?", "Is feeling nervous common?", "Why do people feel guilty?", "What does grief feel like?" → all none. Precision over recall retained.
15. History rule: last 2 USER turns only (`EMOTION_HISTORY_MAX_USER_TURNS = 2`), scanned newest-first, stopping at the first qualifying turn. Fixture "I'm scared" → "I'm frustrated" → "What should I do next?" yields frustration only.
16. Continuity trigger: a fixed regex of explicit continuation phrases ("what do i do/should i do next/now", "what should i do about it/this/that", "i don't know what to do next", "what about now", "does that change anything", "it's still on my mind", "where do i start", "what now"). No embeddings, no semantic or topic model, no extra model call.
17. Unrelated history: "I'm terrified about giving birth." → "What should I pack in my hospital bag?" → evidence = none.
18. Historical category accumulation: 0 (only one prior turn is ever used; categories are never merged).
19. Current-turn directional override: PASS. "I'm calmer now." after "I'm terrified." → positive-path result with continuity `changed`, direction `eased`, no retained fear. "I'm even more worried." → fear / changed / increased. "I'm still overwhelmed." → overwhelm / continued.
20. Assistant-authored evidence: 0 (assistant turns filtered out; "You sound worried." + "What should I do?" → none).
21. Mixed ordering: order of explicit mention. "I'm excited but terrified." → positive, fear. "I'm worried but relieved." → fear, positive. Cap 2, no dominance ranking.
22. Anti-repetition: carried context instructs "do not open with another acknowledgement"; explicit persistence ("I'm still scared") permits a brief, differently worded acknowledgement; explicit change permits acknowledging the change. There is no "seen once, never acknowledge again" rule.
23. Raw user text in trusted guidance: 0. `emotionalGuidance.ts` contains only build-time fixed strings selected by structured evidence.

## Guidance content
24. Fear: brief calm acknowledgement, answer the question, no catastrophising, no "try not to worry", no unsupported reassurance.
25. Overwhelm: one clear first step, remaining items in priority order, fewer parallel recommendations, never dropping safety information.
26. Frustration: acknowledge briefly, be clear and direct, non-defensive, explicitly "do not treat frustration as overwhelm: keep the usual level of detail".
27. Positive: light reflection, no over-celebration, explicitly not medical evidence and never converted into reassurance, prediction or verdict.

## Safety and interaction
28. RED — deterministic answer unchanged, tone block absent, 0 model prompts (test asserts the answer contains `urgentAnswer(query)` exactly). TEST-PROVEN.
29. CRISIS — identical result. TEST-PROVEN.
30. Clarification — `X-Companion-Boundary: clarify` unchanged, no tone block. TEST-PROVEN.
31. Unsupported — `X-Companion-Boundary: unsupported` unchanged, no tone block. TEST-PROVEN.
32. AIC-5D: eligibility, schema, call count, timeout, cautious fallback and the global reassurance rule all unchanged (0 diffs in those files). With the classifier fixture enabled, AMBER guidance remains present and is placed after the tone block, so safety is last and strongest.
33. Emotion model calls: 0 (asserted: exactly one gateway call for an emotional ordinary question).

## Persistence and privacy
34. Emotion persistence 0. 35. Memory writes 0. 36. Hidden conversation metadata 0. 37. Client state/headers 0 (asserted no emotion/mood header). 38. Analytics 0. 39. Raw emotional logging 0 (`console.error` asserted uncalled). DB migrations 0; no local/sessionStorage emotion state.

## External evidence roles
40. JourneyContext 0. 41. Page context 0. 42. Memory 0. 43. Grounding 0. 44. TTC mood log 0 — that journal remains separate and untouched.

## Gates
45. Grounding unchanged: `AI_SOURCE_ROUTING_VERSION = 30B-source-routing-v1`, candidates 0, approvals 0, eligible slugs `[]`. No governance change.
46. Memory flags OFF; persistent-history flags OFF.
47. ADR-AIC5-07 — "Emotional continuity is ephemeral", **Status: ACCEPTED (AIC-5E)**, recording deterministic request-scoped explicit user evidence, current turn overriding history, bounded recent USER history, assistant evidence 0, persistence 0, analytics 0, extra model calls 0, safety outranking tone.

## Change surface
48. Files created: `supabase/functions/_shared/emotionalEvidence.ts`, `supabase/functions/_shared/emotionalGuidance.ts`, `src/test/emotionalEvidence.test.ts`, `src/test/aiSearchEmotionalContinuity.test.ts`, `docs/ai/companion-safety-emotional-continuity.md`.
49. Files modified: `supabase/functions/ai-search/index.ts` (+12 lines), `docs/ai/adr/ADR-AIC5-proposals.md`, `roadmap.md`.
50. Production source changes: one file, 12 added lines — two imports, one fail-open resolve on the ordinary model path, one prompt slot before the safety blocks.
51. Deployment: `ai-search` only. No migration, no client deployment change. `AI_AMBER_CLASSIFIER_ENABLED = OFF`.

## Smoke / test matrix
52. neutral → ordinary answer (TEST-PROVEN, no tone block injected); fear → tone acknowledgement (TEST-PROVEN, live anxious-scan smoke also observed); overwhelm → prioritised structure (TEST-PROVEN); positive → light acknowledgement without certainty (TEST-PROVEN); RED / CRISIS / clarify / unsupported → deterministic unchanged (TEST-PROVEN, plus the live urgent and vague smokes already run). No real user emotional data used.

## Final validation
53. `npm test` — 88 files / 990 tests; 987 pass first run with 3 load-induced timeouts in two pre-existing files, both PASS on isolated re-run (19/19). AIC-5E suites: 59/59 PASS.
54. `npm run lint` — baseline only: 1 error (`previewAuthStorage.ts` generated `prefer-const`) + 10 react-refresh warnings. 0 new.
55. `npm run typecheck` run 1 — PASS.
56. Deno check — PASS, 0 errors.
57. `npm run build` — PASS (built in 13.99s; pre-existing chunk-size warning only).
58. Production `AI_AMBER_CLASSIFIER_ENABLED` = OFF.
59. Production behaviour changes outside emotional tone: 0.

## Verdict
60. AIC-5E ENGINEERING — **CLOSED PASS**, with one caveat for the record: the full-suite run showed two pre-existing test files timing out under parallel load; they pass in isolation and are unrelated to AIC-5E.
61. AIC-5F — SAFE to begin (not begun).
