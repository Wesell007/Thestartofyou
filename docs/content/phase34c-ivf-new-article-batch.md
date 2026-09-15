# Phase 34C — Small IVF new-article batch

Status: COMPLETE IN PREVIEW / NOT DEPLOYED / HUMAN REVIEW OUTSTANDING.

## Scope delivered

Exactly four new IVF guides, available in frontend preview only:

| Route | Phase 34A gap row | Review classification |
| --- | --- | --- |
| `/articles/what-ivf-is-uk-guide` | Row 1, new article on the IVF hub | HEALTH |
| `/articles/nhs-ivf-funding-and-eligibility` | Row 2, new article on the IVF hub | LOW RISK |
| `/articles/ohss-and-ivf-side-effects` | Row 12, new article on the IVF hub | SAFETY |
| `/articles/when-an-ivf-cycle-does-not-work` | Row 15, new article on the IVF hub | HEALTH |

No other Phase 34A NEW_ARTICLE opportunity was implemented. The held backlog
(IVF vs ICSI, embryo development, fresh vs frozen transfer, clinic-questions
checklist, deeper `/ivf/before-transfer` expansion) remains untouched.

## What changed

- `src/data/articleData.ts` — four new flagship article records. No `reviewedBy`
  field on any new record.
- `src/data/articleInventory.ts` — four inventory rows, hub `ivf`,
  `currentStatus: "draft"`.
- `src/lib/grounding/articleGroundingRegistry.ts` — four default-deny rows
  (`editorialStatus: "draft"`, `approvalStatus: "blocked_draft"`). Registry
  count 225 → 229.
- `src/components/ivf/IVFGuides.tsx` — one new hub discovery section holding all
  four guides, rendered once from `src/pages/IVF.tsx`.
- `src/data/ivfTopicData.ts` — four new link constants; the after-transfer
  "difficult news" group now links to the unsuccessful-cycle guide instead of an
  AI prompt for the same question.
- Timeline guide gains one contextual cross-link to the OHSS guide.
- `src/test/phase34cIvfNewArticles.test.ts` — 38 new tests.
- Pinned registry-count guards in `articleGrounding.test.ts` and
  `articleGroundingApproval.test.ts` updated 225 → 229, draft 62 → 66.

## Counts

- New articles: 4. Additional IVF articles created: 0.
- Public IVF stage routes: 3 (unchanged).
- Discovery placements per guide: 1. Duplicate placements: 0.
- Images: 12 (4 heroes, 8 body), all with descriptive alt text.
- Reviewer claims rendered: 0. Review provenance records: 0. Human reviews
  completed: 0.
- Sitemap URLs: 350 → 354, 0 duplicates.
- Grounding eligibility for the four guides: not eligible (`draft`).

## Validation

Full suite 123 files / 1,384 tests pass; typecheck clean; lint unchanged from
baseline (1 pre-existing error, 10 pre-existing warnings); production build
passes; browser QA at 1280px, 834px and 390px across all seven affected routes
with 0 horizontal overflow, 0 broken images, one H1 per page and no new console
errors.

## Closure

PHASE 34C — SMALL IVF NEW-ARTICLE BATCH CLOSED PASS / HUMAN REVIEW REQUIRED
BEFORE DEPLOYMENT. The global Phase 33 deployment block remains ACTIVE.
