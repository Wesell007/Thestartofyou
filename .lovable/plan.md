# Phase 29B close-out + 29B.1 — AI answer quality and grounding fallback

Includes the three approved 29B micro-fixes (not yet built) plus the 29B.1 fix.

## Root cause of the bad answer (verified)

`supabase/functions/ai-search/index.ts` routes every non-matching question to just two NHS pages. `selectSources()` has no branch for baby movements, so "When will I feel the baby move?" falls to the default `SOURCES.pregnancy` pair: "common health problems" and "vaginal bleeding". Neither page covers movements.

`GENERAL_SYSTEM_PROMPT` in `supabase/functions/_shared/aiModes.ts` then says: "Use only factual claims explicitly supported by the supplied NHS evidence. If the evidence does not answer the question, say that clearly." The model obeyed literally and produced the refusal that names "the provided NHS evidence". So: retrieval miss plus a strict prompt plus no user-facing fallback wording. `pregnancy_week_companion` also reuses `GENERAL_SYSTEM_PROMPT` verbatim, so it has the same failure.

## Fix 1: topic routing for approved sources (no new infrastructure)

Move source selection into `supabase/functions/_shared/aiSources.ts` (pure, unit-testable from Vitest) and widen the approved NHS allowlist with the routine topics that currently miss: baby movements, antenatal appointments and checks, signs of labour, breastfeeding/feeding cues and feeding support, baby sleep, and doing a pregnancy test. Keep the mental-health, IVF, baby-unwell and TTC branches, and always include a broad hub page so a question never lands on two narrow pages alone. Still static keyword routing: no RAG, no vector search, no article ingestion, no Start of You grounding.

Routing tests cover: "When will I feel the baby move?", "What can baby movements feel like?", "When should I call about reduced movements?", "What should I ask my midwife at an appointment?", "Feeding cues", "When should I ask for help with feeding?", "What can help with night waking?", "When might testing make sense?", "What can help during the two-week wait?" — each must select a topically relevant approved page, and a non-urgent question must not route to an emergency-only page.

## Fix 2: prompt and fallback wording

In `aiModes.ts`:

- Remove the "only claims supported by the supplied evidence / say clearly that the evidence does not answer" rule. Replace with: prefer the supplied approved evidence; where it does not cover a routine, well-established point of UK maternity, fertility or infant guidance, answer carefully and generally, non-diagnostic, with professional-care wording where relevant.
- Add a banned-language rule: never mention evidence, sources, retrieval, snippets, context or what was "provided" in the answer, and drop the required "Sources" section from the output format.
- Single approved refusal line for genuine inability: "I do not have enough detail to answer that safely here. It would be best to speak with your midwife, GP, health visitor or urgent care service, depending on what is happening."
- Give `pregnancy_week_companion` its own prompt instead of reusing the general one.
- Keep urgent escalation, safety routing, day-recap behaviour, and the TTC and First Year safety rules unchanged.

## Fix 3: answer post-processing (safety net, both surfaces)

`src/lib/aiAnswerSafety.ts`: strips internal retrieval phrasing, swapping a pure retrieval-refusal for the approved fallback line, and preserving urgent-care and professional-care wording. It is a net behind the routing and prompt fixes, not the primary fix, so tests cover the raw prompt/routing behaviour as well as the rendered output.

## Fix 4: no external source links after answers on `/ask` AND the companion panel

`src/lib/answerSourceLinks.ts` (shared): strips a trailing "Sources"/"References" block and converts markdown links and bare external URLs to plain text. `EditorialAnswer` gains an optional `disableLinks` prop so anchors render as plain text. Applied on both `/ask` and the companion panel, each showing the non-clickable line "Guidance is checked against approved UK health sources." Internal navigation (follow-up prompts, journey links, "Open full Ask page") is untouched, and backend grounding is unchanged.


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
