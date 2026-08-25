# Phase 29C — AI Foundation, Safety Governance and Evaluation Framework

Documentation and specification only. No new AI features, no voice, memory, RAG, article grounding, vector search, persisted chat, nudges, partner mode, agentic tools. No changes to the Ask UI, schema, RLS, auth, routes, SEO or sitemap. No production behaviour changes.

## What already exists (confirmed by reading the code)

- Single AI endpoint: `supabase/functions/ai-search/index.ts` (`verify_jwt = false`), streaming SSE, `google/gemini-2.5-flash`, temperature 0.2, max 700 tokens, IP+UA hashed rate limit (12/min, 100/hour) via `consume_ai_rate_limit`, CORS origin allowlist.
- Five modes in `supabase/functions/_shared/aiModes.ts`: `general`, `pregnancy_week_companion`, `first_year_companion`, `ttc_companion`, `first_year_day_recap` (grounding off, escalation answer off, controlled `DAY_RECAP_UNAVAILABLE_ANSWER`). Unknown modes fall back to `general`.
- Grounding: static keyword routing over a fixed NHS allowlist in `_shared/aiSources.ts` (max 3 URLs, hub page always added, safety branch first). Page HTML is stripped to text; source URLs are never passed to the model.
- Safety routing: `URGENT_PATTERN` in the edge function short-circuits before the model, with a separate crisis (999 / NHS 111 mental health) and clinical escalation answer.
- Client safety net: `src/lib/aiAnswerSafety.ts` (retrieval-wording removal, single approved fallback line), `src/lib/answerSourceLinks.ts` (source blocks, markdown links, bare URLs, trust line).
- Ask surface `src/pages/AskPage.tsx` plus `src/lib/askClarification.ts` for ambiguous short queries; site-wide companion in `src/components/companion/*` with `companionMode.ts` (route to mode), `companionPanelContext.ts` (allowlist, 500-char cap), session-only turns, 404 suppression.
- Existing tests: `src/test/aiModes.test.ts`, `aiSearchEndpoint.test.ts`, `aiSearchCallerModes.test.ts(x)`, `edgeFunctionValidation.test.ts`, `src/lib/aiAnswerSafety.test.ts`, `askClarification.test.ts`, `askTrustCopy.test.ts`, `companionMode.test.ts`, `EditorialAnswer.test.tsx`.

## Deliverables (new documentation files only)

Create a `docs/ai/` folder:

1. `docs/ai/README.md` — index of the framework, phase status, how to use these documents.
2. `docs/ai/system-map.md` — full current AI system map: entry points, modes and their configs, source routing table, safety routing, Ask behaviour, companion panel behaviour, context passed in (and what is deliberately excluded), sanitisation and link stripping, ambiguity handling, urgent escalation. Includes a request-flow diagram in a ```text block.
3. `docs/ai/purpose-and-scope.md` — intended purpose statement (calm parenting and pregnancy companion; supportive, navigational, reflective, practical next steps; not a clinician, not diagnostic, not an emergency service, not a replacement for a midwife, GP, health visitor, fertility specialist or urgent care), supported scope per journey, and the unsupported list (no diagnosis, no guarantees, no clinical replacement, no emergency management beyond escalation, no image interpretation, no pregnancy or ovulation confirmation, no risk scoring, no medication instructions beyond signposting, no safe/unsafe claims without escalation context). The phrase "symptom checker" is used only in the banned list.
4. `docs/ai/safety-taxonomy.md` — Green, Amber, Red, Crisis, Unsupported, Ambiguous. Each with triggers, example questions, expected answer behaviour, escalation wording, and must-not-say wording. Maps each category to where it is currently enforced (edge `URGENT_PATTERN`, prompts, clarifier, client sanitiser) and flags gaps.
5. `docs/ai/escalation-matrix.md` — per-journey matrix (TTC, pregnancy, postpartum, newborn and first year, feeding, sleep, emotional wellbeing, general parenting, future toddler) with the listed concern examples, required category, required escalation route, required wording, and current coverage status against `URGENT_PATTERN` and the mode prompts.
6. `docs/ai/answer-patterns.md` — banned user-facing phrases (including the full list in the request) with approved alternatives, plus which are already enforced in code and which are documentation-only for now.
7. `docs/ai/eval-dataset-v1.md` plus `docs/ai/eval-dataset-v1.json` — at least 80 prompts across routine pregnancy, urgent pregnancy, TTC, first year, feeding, sleep, emotional wellbeing, ambiguous, unsupported, crisis, adversarial (prompt injection, "just tell me it's fine", asking for doses), link and source suppression, retrieval wording, and companion-name checks. Each record: `id`, `prompt`, `journey`, `expected_category`, `expected_behaviour`, `banned_behaviours`, `escalation_required`, `links_must_be_suppressed`, `should_ask_clarifying_question`. The JSON is a data file only; no harness is wired up in this phase.
8. `docs/ai/release-gate.md` — the checklist every future AI change must pass (scope, data used, privacy impact, no real user data in QA, source routing review, escalation review, banned-phrase tests, no external links or raw URLs, no retrieval wording, ambiguity handling, mobile and desktop QA, companion panel regression, `/ask` regression, typecheck, full tests, build, rollback plan).
9. `docs/ai/observability-and-incidents.md` — what to track later (answer failures, unsafe-answer reports, escalation failures, repeated fallbacks, hallucinated source wording, link leakage, urgent handling, feedback, rate-limit events, cost and latency, model and prompt version) with a note that analytics stays consent-gated and health-free per `src/lib/analyticsEvents.ts`; plus the incident plan (kill switch, route to Ask or support, rollback prompt/model/source, review failed prompts, update eval set, retest before re-release). Documents that no kill switch exists today as a gap for 29D/29E.
10. `docs/ai/privacy-notes.md` — sensitivity of fertility and health data, data minimisation, the current no-private-content guarantee in the context builders, no persisted chat history, permissioned memory as a precondition for future memory work, user control, deletion and export considerations, log hygiene, no real user data in QA.
11. `docs/ai/roadmap.md` — recommended 29D to 29J sequence with entry and exit criteria for each, explicitly not started.

## Report

Chat report covering: files inspected, system map summary, purpose statement, supported and unsupported scope, taxonomy, escalation matrix, banned phrases and alternatives, eval dataset v1 summary, release gate, observability, incident and rollback plan, privacy notes, risks and gaps, next phases, and whether 29C can close.

## Verification

Documentation and one JSON data file only, so no runtime behaviour changes. Run `npx tsgo --noEmit -p tsconfig.json`, `npx vitest run` and `npm run build` to confirm nothing regressed, and report the results.
