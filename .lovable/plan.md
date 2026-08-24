# Phase 29B close-out + 29B.1 — AI answer quality and grounding fallback

Includes the three approved 29B micro-fixes (not yet built) plus the 29B.1 fix.

## Root cause of the bad answer (verified)

`supabase/functions/ai-search/index.ts` routes every non-matching question to just two NHS pages. `selectSources()` has no branch for baby movements, so "When will I feel the baby move?" falls to the default `SOURCES.pregnancy` pair: "common health problems" and "vaginal bleeding". Neither page covers movements.

`GENERAL_SYSTEM_PROMPT` in `supabase/functions/_shared/aiModes.ts` then says: "Use only factual claims explicitly supported by the supplied NHS evidence. If the evidence does not answer the question, say that clearly." The model obeyed literally and produced the refusal that names "the provided NHS evidence". So: retrieval miss plus a strict prompt plus no user-facing fallback wording. `pregnancy_week_companion` also reuses `GENERAL_SYSTEM_PROMPT` verbatim, so it has the same failure.

## Fix 1: topic routing for approved sources (no new infrastructure)

Move source selection into `supabase/functions/_shared/aiSources.ts` (pure, unit-testable from Vitest) and widen the existing approved NHS list with pages that already exist on nhs.uk, including baby movements, antenatal appointments/checks, breastfeeding help, and baby sleep. Keep the mental-health, IVF, baby and TTC branches. Always append a broad topic-hub page so a query never lands on two narrow pages alone. No RAG, no vector search, no article ingestion, no Start of You grounding.

## Fix 2: prompt and fallback wording

In `aiModes.ts`:

- Replace the "only claims supported by the supplied evidence / say the evidence does not answer" rule with: prefer the supplied approved evidence; where it does not cover a routine, well-established point of UK maternity, fertility or infant guidance, answer carefully and generally, staying non-diagnostic and adding professional-care wording where relevant.
- Add an explicit banned-language rule: never mention evidence, sources, retrieval, context, snippets or what was "provided" in the answer text.
- Add the single approved refusal line for genuine inability: "I do not have enough detail to answer that safely here. It would be best to speak with your midwife, GP, health visitor or urgent care service, depending on what is happening."
- Give `pregnancy_week_companion` its own prompt (parity with the TTC and First Year companions) instead of reusing the general prompt.
- Keep all existing safety rules, the urgent-escalation path and `DAY_RECAP` behaviour untouched.

## Fix 3: answer post-processing (front end, both surfaces)

Add `src/lib/aiAnswerSafety.ts`: strips internal retrieval phrasing from streamed answer text and, if a sentence is purely a retrieval-refusal, swaps it for the approved fallback line. Apply it where the answer is rendered on `/ask` and in the companion panel. Urgent-care and professional-care wording is preserved verbatim.

## Fix 4 (29B micro-fix 3): no external links in the companion panel

- `src/lib/companion/companionAnswerText.ts`: strips a trailing "Sources"/"References" block and converts markdown links and bare URLs to plain text.
- Optional `disableLinks` prop on `EditorialAnswer`, default `false`, so `/ask` renders exactly as today.
- Companion panel shows the non-clickable trust line "Guidance is checked against approved UK health sources." and keeps the internal "Open full Ask page" action.

## Fix 5 (29B micro-fix 1): hide the companion on any NotFound render

Session-only suppression flag in `CompanionProvider` plus a `useSuppressCompanion()` hook called once in `src/pages/NotFound.tsx`. Launcher hidden and panel unopenable on all catch-all 404 paths. No route, SEO or sitemap change.

## Fix 6 (29B micro-fix 2): 44px footer tap targets

`min-h-[44px]` and compensating padding on "Start again" and "Open full Ask page" in `CompanionPanel.tsx`, with visible text size and alignment unchanged.

## Tests and verification

- Vitest: banned-phrase guard over the sanitiser and over every mode prompt ("provided NHS evidence", "provided evidence", "retrieved evidence", "source material does not cover", "context provided does not include", "not covered in the evidence", "not covered by the provided sources", "I cannot provide specific information on this topic because").
- Vitest: source-routing checks for the listed pregnancy, TTC and First Year test questions, asserting a topically relevant approved URL is selected for each.
- Live check against the deployed function for "When will I feel the baby move?" and the other listed questions: answer is useful, no internal wording, escalation intact for reduced movements.
- Playwright at 390px and 1440px: NotFound paths hide the launcher, panel cannot open, footer boxes >= 44px, no external links in panel answers, no horizontal overflow, no unexpected console errors.
- Then `npx tsgo --noEmit -p tsconfig.json`, `npx vitest run`, `npm run build`.

## Unchanged

Schema, RLS, storage, auth, routes, sitemap, SEO, voice, persisted chat, RAG (none added), Start of You grounding (none added), old Ask surfaces' behaviour and layout.
