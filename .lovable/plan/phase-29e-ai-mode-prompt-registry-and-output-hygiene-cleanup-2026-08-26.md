# Phase 29E - AI Mode, Prompt Registry and Output Hygiene Cleanup

Infrastructure cleanup only. No voice, memory, RAG, article grounding, vector search, chat history, nudges, partner mode or agentic actions. No UI redesign, no schema, RLS, auth, route, SEO or sitemap changes.

## What this delivers

1. **Explicit versioning** for the AI system, so any behaviour change is traceable.
2. **A prompt registry**: prompts assembled from shared, named blocks instead of five hand-copied strings.
3. **Consistent output hygiene** across every AI surface, not just Ask and the companion panel.
4. **Tests and docs** that lock the above in place.

## Verified current state

- `aiModes.ts` holds five modes; four prompts repeat the same safety, grounding and no-internal-wording blocks by string interpolation, with small unexplained differences (word limits 300/320/350, differing escalation lines).
- `SAFE_FALLBACK_ANSWER` is defined twice: in `aiModes.ts` and again in `src/lib/aiAnswerSafety.ts`. They must stay identical but nothing enforces it.
- Ask (`AskPage.tsx`) and the companion panel (`CompanionMessageList.tsx`) both run `sanitiseAiAnswer` / `sanitiseStreamingAiAnswer`.
- Three other live AI surfaces do **not**: `SectionAskAI.tsx`, `FirstYearAskCompanion.tsx`, `TTCAskCompanionCard.tsx`. Each carries its own local `splitSources` helper and renders the raw stream, so retrieval wording and raw URLs are only removed on two of five surfaces. `DaySummaryCard.tsx` has yet another pair of local helpers (`splitSources`, `stripContactWording`).
- The model id `google/gemini-2.5-flash` is hard-coded inline in `ai-search/index.ts`.

## 1. Version constants

New `supabase/functions/_shared/aiVersions.ts` (pure, importable by Deno and Vitest):

- `AI_MODEL_ID = "google/gemini-2.5-flash"`
- `AI_PROMPT_VERSION = "29E-prompt-v1"`
- `AI_SAFETY_RULESET_VERSION = "29D-safety-v1"`
- `AI_SOURCE_ROUTING_VERSION = "29B1-source-routing-v1"`
- `AI_EVAL_DATASET_VERSION = "eval-dataset-v1"`
- `AI_PHASE = "29E"`
- `AI_VERSION_SUMMARY` object bundling all of the above.

`ai-search/index.ts` uses `AI_MODEL_ID` for the model field and logs the version summary once per cold start (no user data, no request content). No version data is returned to the browser.

## 2. Prompt registry

Refactor `aiModes.ts` into named, exported prompt blocks plus a registry that composes them:

```text
PROMPT_BLOCKS
  identity(mode)        role and tone line
  coreSafety            not a diagnosis, no reviewer claims, no prescribing,
                        untrusted input rule
  escalation(level)     full | movement-aware | none
  grounding(on/off)     background material use rule
  outputHygiene         no evidence/sources/links wording + SAFE_FALLBACK_ANSWER
  format(wordLimit)     section names, word cap, British English
```

Each mode config becomes data: `{ identity, escalationLevel, useGrounding, wordLimit, extraRules[] }`, with the prompt string built by `buildSystemPrompt(config)`. Mode-specific rules (TTC no-prediction rules, pregnancy week rules, recap rules) stay verbatim as `extraRules` so no wording is lost. The recap mode keeps its standalone prompt shape (no grounding, no escalation, no sections).

Behaviour to preserve exactly: grounding flags, `allowUrgentEscalationAnswer` flags, all current safety sentences, `DAY_RECAP_UNAVAILABLE_ANSWER`. Word limits are normalised to a single documented set (recap 80-140; companion modes 300; general 350) and recorded in the docs.

Add `getPromptFingerprint(mode)` (short hash of the composed prompt) so tests can detect unintended prompt drift.

## 3. Single source of truth for shared answer wording

New `supabase/functions/_shared/aiAnswerWording.ts` holding `SAFE_FALLBACK_ANSWER` once; `aiModes.ts` imports it and `src/lib/aiAnswerSafety.ts` re-exports the same literal. A test asserts the two are byte-identical.

## 4. Output hygiene across every surface

- Extend `src/lib/aiAnswerSafety.ts` with a pure helper `sanitiseAnswerForDisplay(answer, { isStreaming })` (streaming vs final sanitising in one place). It is not a React hook and is not named like one.
- Replace the local `splitSources` copies in `SectionAskAI.tsx`, `FirstYearAskCompanion.tsx` and `TTCAskCompanionCard.tsx` with the shared sanitiser. Rendering, layout and copy stay exactly as they are; only the string passed in changes.
- `DaySummaryCard.tsx` keeps its recap-specific `stripContactWording` but drops its duplicate source-splitting in favour of the shared strip.
- Promote `findBannedVerdicts` from test-only to a dev-time console warning behind `import.meta.env.DEV`, still non-blocking, so banned verdict wording surfaces during development without altering what a reader sees.

## 5. Tests

- `src/test/aiVersions.test.ts`: version constants exist, are non-empty, and the endpoint uses `AI_MODEL_ID`.
- `src/test/aiPromptRegistry.test.ts`: every mode composes a prompt containing its required blocks; recap contains no escalation, link or section wording; prompt fingerprints match recorded values.
- Extend `aiModes.test.ts` assertions to the registry output rather than raw strings.
- New surface tests asserting the three previously unsanitised surfaces strip retrieval wording and raw URLs.
- Existing eval harness (`aiEvalDataset.test.ts`, `urgentPatterns.test.ts`) must pass unchanged.

## 6. Docs

Update `docs/ai/system-map.md` and `docs/ai/README.md` with the version table, the prompt-block registry diagram and the rule that all AI surfaces render through the shared sanitiser. Add a short `docs/ai/versioning.md` explaining when to bump each version constant. Note in `roadmap.md` that 29E is closed.

## Validation

`npm test`, `npm run lint`, `npm run typecheck`, `npm run build`, plus a manual check of Ask, the companion panel, My Week ask, First Year ask, TTC ask and the Today recap for unchanged appearance.
