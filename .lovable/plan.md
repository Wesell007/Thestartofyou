# AIC-5A — CLOSURE ADDENDUM (validation only)

No production code, assets, configuration or dependencies were changed during this validation. No plan work is pending beyond the one optional documentation note in item 5/6 below.

1. **companionSurfaces isolated** — PASS, 7/7 (4.45s).
2. **Complete suite** — PASS, 82 test files, 827/827 tests (50.27s).
3. **Repeated timeout** — NO. The dynamic-import timeout did not reproduce.
4. **Timeout root cause** — not reproduced, so no fix applied and no assertion or timeout was weakened. Evidence points to transform/import contention under concurrent load (the failing run showed 79.6s transform and 174s import versus 26.7s / 83.4s in the clean run), not test pollution, provider lifecycle or application behaviour. Retained as a harness watch item, not an AIC-5A defect.
5. **Urgent-path abuse-protection classification** — **B. CHEAP DETERMINISTIC ROUTE ACCEPTABLY UNMETERED.** No new mechanism proposed, no migration, no second limiter.
6. **Exact protection relied upon** —
   - Supabase Edge Runtime platform-level request handling and per-project infrastructure limits (the only quota mechanism in front of this branch).
   - Request-shape constraints in `_shared/validation.ts`: POST-only, JSON body, bounded query length, bounded optional fields; malformed bodies are rejected before `decideSafety`.
   - CORS allowlist (`thestartofyou.com`, `www`, `localhost:8080`, plus `ALLOWED_ORIGINS`) — constrains browser callers only, not direct clients.
   - `verify_jwt = false` on `ai-search` is unchanged and required for anonymous readers.
   - Cost profile justifying B: model calls 0, grounding fetches 0, memory retrieval 0, history enrichment 0, LLM spend 0; the branch returns fixed text. Optional follow-up (documentation only, no code): record this acceptance in `docs/ai/companion-safety-emotional-continuity.md`.
7. **CRISIS live smoke** — PASS. `"I cannot keep myself safe"` against the deployed endpoint returned the deterministic crisis answer (`## Please get urgent help now`, 999/A&E and urgent mental-health routing). No model call in the stream, no error frames, no runtime/console errors in function logs.
8. **Abuse/safeguarding live smoke** — PASS. `"Someone at home is hurting me"` returned the distinct deterministic safeguarding answer (`## Please get help with this now`, 999 silent-call guidance). Subtypes remain distinguishable live.
9. **Kill-switch proof type** — deterministic test (`src/test/aiSearchSafetyRouting.test.ts`). Production `AI_SEARCH_DISABLED` was not toggled. RED/CRISIS + disabled → deterministic escalation; GREEN + disabled → `AI_PAUSED_ANSWER`.
10. **Final endpoint ordering** — unchanged: CORS/method/body validation → `decideSafety` → RED/CRISIS deterministic answer (no quota check, no enrichment, no grounding, no model, no kill-switch suppression) → GREEN: 12/min + 100/hour rate limit → conversation → `AI_SEARCH_DISABLED` → grounding/context/model.
11. **Urgent regex changes** — 0.
12. **Deterministic wording changes** — 0 (asserted byte-identical against `urgentAnswer` in `safetyRouter.test.ts`).
13. **Model calls on RED/CRISIS** — 0.
14. **Grounding calls on RED/CRISIS** — 0.
15. **Ordinary GREEN quota** — unchanged and proven: 429 with `Retry-After` when exhausted, 503 when the limiter is unavailable.
16. **Safety-state persistence** — 0. No state, label, score, flag or metadata written anywhere.
17. **Raw safety logging** — 0. No query text, safety decision or transcript logged; only the cold-start version line.
18. **Grounding state** — `AI_SOURCE_ROUTING_VERSION = 30B-source-routing-v1` unchanged; grounding-expansion candidates 0, approvals 0, eligible slugs `[]`. The pre-existing NHS `APPROVED_SOURCES` map is untouched.
19. **Memory / history flags** — both OFF, unchanged. AMBER emitted 0, UNSUPPORTED emitted 0, JourneyContext changes 0, UI changes 0.
20. **Tests** — PASS, 827/827 across 82 files.
21. **Lint** — 1 pre-existing `prefer-const` error (`src/integrations/supabase/previewAuthStorage.ts`, generated) and 10 pre-existing react-refresh warnings. 0 new findings.
22. **Typecheck** — PASS.
23. **Build** — PASS.
24. **Additional production changes** — NO.
25. **Additional deployment** — NO.
26. **AIC-5A — CLOSED PASS.**
27. **AIC-5B — SAFE TO BEGIN** (not started).
