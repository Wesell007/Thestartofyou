# Phase 32E — Lane A implementation report

One action met the claim-level risk test and was implemented. Everything else is documented in `phase32e-action-reconciliation.md` and `phase32e-review-hold-expansions.md`.

## Existing articles edited

None. No record in `articleData.ts`, `firstYearArticleData.ts`, `toddlerArticleData.ts` or `familyArticleData.ts` was changed.

## Structured pages improved (42 pregnancy week pages, via one shared file)

**Action:** C007 — weeks-to-months conversion, Phase 31 P1.

**Surface:** `/pregnancy/week/1` … `/pregnancy/week/42`, through the shared builder in `src/data/weekSupportContent.ts` that every week page already uses for its Common Questions block.

**Previous purpose:** unchanged. The week pages remain stage-specific pregnancy guides; the Common Questions block already existed on all 42 pages.

**Exact change:** added `monthsLabelForWeek` and `buildWeeksToMonthsQuestion`, and appended one generated question — "How many months is N weeks pregnant?" — to the end of each week's existing question list. The answer gives the rounded month equivalent and explains that pregnancy is counted in weeks because calendar months vary. A guard prevents a duplicate where a week's own FAQ already answers the question.

**Risk classification:** READY_TO_IMPLEMENT_LOW_RISK. Calendar arithmetic only. No symptom, no clinical interpretation, no escalation wording, no change to how any date is calculated or stored anywhere in the product. Weeks remain the single dating source.

**Duplicate risk before:** none of the 42 week pages answered the conversion intent; no other page owns it. **After:** the answer is week-specific, so no paragraph repeats across pages, and no article-level surface is competing.

**Smallest useful edit:** one shared data file rather than 42 bespoke page edits.

## Incidental contextual links added

**0.** The new answer carries no `readMore` link. All systematic linking is deferred to Phase 32F.

## Tests added

`src/test/weekMonthsConversion.test.ts` — 4 tests: label arithmetic, exactly one conversion question for each of weeks 1–42 with the original questions preserved, no duplication where a week already answers it, and no clinical vocabulary in the generated answer.

## Validation

- Baseline before the change: 115 test files, 1289 tests passing, 0 timeouts; lint 1 error, 10 warnings.
- After the change: 116 test files, 1293 tests passing, 0 timeouts; lint unchanged at 1 error, 10 warnings. The pre-existing lint error is `prefer-const` in the generated `src/integrations/supabase/previewAuthStorage.ts` and was not touched.
- Typecheck run twice, clean both times. Production build succeeded.

## Architecture zeros

New article records 0 · new URLs 0 · slug changes 0 · status changes 0 · lifecycle changes 0 · route architecture 0 · navigation architecture 0 · sitemap architecture 0 · SEO architecture 0 · AI 0 · grounding 0 · journal 0 · memory 0 · voice 0 · database 0 · schema 0 · RLS 0 · deployments 0.

The 19 Phase 32A–32D drafts remain **PUBLICATION STATUS: NOT PUBLISHED**.
