# Phase 33.3 — final exception reconciliation

Reconciliation only. No deployment, no new phase, no rebuild of the completed article work.

## 1. Grounding: what actually changed (verified)

Exact files changed under grounding during Phase 33.3 (commit `6b29c804`, diff against `406304fd`):

- `src/lib/grounding/articleGroundingRegistry.ts` — 17 metadata rows appended, one per new Phase 33.3 article slug, all `editorialStatus: "draft"`, `approvalStatus: "blocked_draft"`, `archived: false`, `deprecated: false`. No sensitivity, owner, reviewer, contentVersion, approvedBy or approvedAt fields set.
- `src/test/articleGrounding.test.ts` — pinned counts updated 208 to 225, draft 45 to 62.
- `src/test/articleGroundingApproval.test.ts` — same two pinned counts.

Nothing else grounding-related changed. `supabase/functions/_shared/aiVersions.ts` is untouched: `AI_SOURCE_ROUTING_VERSION` remains `30B-source-routing-v1`. No file under `docs/ai/grounding-approvals/` changed. No eligibility helper, prompt, mode, source-routing rule or edge function changed.

Why it was made: `src/test/articleGroundingDrift.test.ts` requires exactly one registry record for every article slug in the datasets and zero orphans. Adding 17 runtime article records without registry rows breaks that guard. The rows are default-deny governance metadata, not approvals.

Effect: eligible slugs stay `[]`, candidates 0, approved 0, runtime grounding behaviour unchanged, classifications unchanged, routing unchanged.

Conclusion to record: **GROUNDING RUNTIME CHANGES = 0**, with a documented registry-coverage exception (metadata rows only, default deny). Nothing to revert. Verification to re-run and quote in the report: registry length 225, approved count 0, candidate count 0, `listGroundingEligibleSlugs()` empty, `AI_SOURCE_ROUTING_VERSION` string pinned.

## 2. Teething migration: month-page findings

Verified in `src/data/firstYearMonthData.ts` and `src/components/firstyear/month/FirstYearMonthPage.tsx`:

- Teething context appears at 4 months and 5 months (mouthing described as "not usually about teething alone") and more substantively in the sleep copy at 7, 8, 9 and 11 months.
- Month pages already have two rendered link mechanisms: `MonthQuestion.readMore` and the `related` list (`MonthRelated { label, kicker, href }`). Both are rendered today.
- So the approved intent **can** be satisfied on the month pages with existing architecture. No new component, field, renderer or template is required.
- Constraint: at 4 and 5 months every existing question already carries a `readMore`, and repointing one would delete an approved link. Adding a `related` entry is therefore the correct existing mechanism.

## 3. Proposed teething correction

Add one existing-mechanism `related` entry linking to `/first-year/care-and-safety/teething` on the month guides carrying teething context: `4-months` and `5-months` (the originally approved surfaces).

Then re-classify:

- TEETHING MIGRATION INTENT = SATISFIED_AS_APPROVED
- Approved Phase 32F intents = 5, satisfied exactly as approved = 5, implementation exceptions = 0.

The existing sleep-guide cross-link (`when-sleep-suddenly-changes` to teething) is editorially relevant and stays, reported as an additional contextual occurrence, not as the intent's source surface.

If you would rather not touch the month data at all, the fallback is to keep the sleep-guide link only and report:

- TEETHING MIGRATION INTENT = IMPLEMENTATION_EXCEPTION / ALTERNATIVE_CONTEXTUAL_LINK
- intents 5, satisfied as approved 4, exceptions 1.

## 4. Boundary reconciliation

Full changed-file list for the phase will be reconciled against the boundary table (new hub, navigation, renderer, template, design token, database, schema, RLS, AI runtime, grounding runtime, journal, memory, voice, lifecycle, deployment — all expected 0). The only files touched were article/topic data, the First Year image map, assets, tests, the grounding registry metadata rows above, docs and the generated sitemap.

## 5. Validation after the correction

- `src/test/phase33Remaining17Integrity.test.ts` updated so the teething intent asserts the month-page surface.
- Full test suite, typecheck twice, lint (baseline 1 error / 10 warnings), build, sitemap count.
- Preserved results re-confirmed: 19 records (Legacy 9, First Year 10), 19 routes, 19 discovery entries, 0 duplicates, 19 heroes, 38 body images, 57 approved assets, sitemap 350 unique / 0 duplicates.

## 6. Documentation

Update `docs/content/phase33-remaining17-frontend-report.md` with the grounding exception explanation and the corrected teething classification; leave the publication register and human-review pack governance unchanged (19 held, 0 reviews, 0 deployment eligible, deployment block active).

Closure on pass: **PHASE 33.3 — CLOSED PASS / HUMAN REVIEW REQUIRED BEFORE DEPLOYMENT**. No deployment.
