# Phase 34C — Small IVF new-article batch

Status: COMPLETE IN PREVIEW / NOT DEPLOYED / HUMAN REVIEW OUTSTANDING.
Closure reconciled.

## Scope delivered

Exactly four new IVF guides, available in frontend preview only:

| Route | Phase 34A gap row | Review classification |
| --- | --- | --- |
| `/articles/what-ivf-is-uk-guide` | Row 1, new article on the IVF hub | HEALTH_REVIEW_REQUIRED |
| `/articles/nhs-ivf-funding-and-eligibility` | Row 2, new article on the IVF hub | HEALTH_REVIEW_REQUIRED |
| `/articles/ohss-and-ivf-side-effects` | Row 12, new article on the IVF hub | SAFETY_REVIEW_REQUIRED |
| `/articles/when-an-ivf-cycle-does-not-work` | Row 15, new article on the IVF hub | SAFETY_REVIEW_REQUIRED |

Classifications are taken verbatim from `docs/content/phase34a-ivf-gap-register.csv`.

Totals: HEALTH_REVIEW_REQUIRED = 2, SAFETY_REVIEW_REQUIRED = 2,
LOW_RISK_GENERAL = 0. Human reviews completed = 0. Deployment eligible = 0.

No other Phase 34A NEW_ARTICLE opportunity was implemented. The held backlog
(IVF vs ICSI, embryo development, fresh vs frozen transfer, clinic-questions
checklist, deeper `/ivf/before-transfer` expansion) remains untouched.

## What changed

- `src/data/articleData.ts` — four new flagship article records. No `reviewedBy`
  field on any new record.
- `src/data/articleInventory.ts` — four inventory rows, hub `ivf`,
  `currentStatus: "draft"`.
- `src/lib/grounding/articleGroundingRegistry.ts` — four default-deny rows
  (`editorialStatus: "draft"`, `approvalStatus: "blocked_draft"`).
- `src/components/ivf/IVFGuides.tsx` — one new hub discovery section holding all
  four guides, rendered once from `src/pages/IVF.tsx`.
- `src/data/ivfTopicData.ts` — the after-transfer "difficult news" group now
  links to the unsuccessful-cycle guide instead of an AI prompt for the same
  question. Three link constants added during implementation but never
  referenced (`whatIvfIs`, `nhsFunding`, `ohss`) were removed at closure as
  dead code; rendered output, routes and discovery are unchanged.
- Timeline guide gains one contextual cross-link to the OHSS guide.
- `src/test/phase34cIvfNewArticles.test.ts` — 38 new tests.
- Pinned registry-count guards in `articleGrounding.test.ts` and
  `articleGroundingApproval.test.ts` updated 225 → 229, draft 62 → 66.

## Grounding registry reconciliation

- GROUNDING REGISTRY RECORDS BEFORE PHASE 34C = 225
- GROUNDING REGISTRY RECORDS AFTER PHASE 34C = 229
- PHASE 34C COVERAGE ROWS ADDED = 4

The "226 records" figure quoted in the implementation plan was a counting
artefact, not a real row. A loose grep for `slug:` also matches the helper
parameter `slug: string,` near the end of the registry file. Therefore:

- loose `slug:` matches after 34C = 230
- actual registry record literals (`{ slug: "`) after 34C = 229

The historical 225 baseline remains correct and is not revised. No additional
row ever entered the registry.

Final grounding state: approved records = 0; candidate records = 0; eligible
slugs = []; `AI_SOURCE_ROUTING_VERSION` = `30B-source-routing-v1`;
GROUNDING REGISTRY METADATA CHANGES = 4; GROUNDING RUNTIME BEHAVIOUR
CHANGES = 0.

## Contextual-link reconciliation

| # | Source | Destination | Occurrences |
| --- | --- | --- | --- |
| 1 | `/articles/ivf-timeline-what-to-expect` | `/articles/ohss-and-ivf-side-effects` | 1 |
| 2 | `/articles/what-ivf-is-uk-guide` | `/articles/nhs-ivf-funding-and-eligibility` | 2 |
| 3 | `/articles/nhs-ivf-funding-and-eligibility` | `/articles/what-ivf-is-uk-guide` | 2 |
| 4 | `/ivf/after-transfer` | `/articles/when-an-ivf-cycle-does-not-work` | 1 |

New contextual-link occurrences = 6. Held separate from normal discovery
placements = 4 and duplicate normal discovery = 0.

## Final authoritative counts

- New IVF articles = 4. New IVF routes = 4. Aliases = 0. Redirects = 0.
- Normal-discovery placements = 4. Duplicate normal discovery = 0.
- Contextual-link occurrences added = 6.
- Structured-source articles = 4. Clickable source citations = 0.
- Hero images = 4; body images = 8; total new Phase 34C assets = 12
  (hero 1 and body 2 per article). Broken images = 0.
- HEALTH_REVIEW_REQUIRED = 2; SAFETY_REVIEW_REQUIRED = 2; LOW_RISK_GENERAL = 0.
- Human reviews completed = 0. Reviewer claims rendered = 0. Unsupported
  JSON-LD `reviewedBy` = 0.
- Grounding registry 225 → 229; rows added = 4; approvals = 0; candidates = 0;
  eligible slugs = [].
- Sitemap 350 → 354, 0 duplicates.
- Production deployed = 0. GLOBAL PHASE 33 DEPLOYMENT BLOCK = ACTIVE.

## Validation

Full suite 123 files / 1,384 tests pass; typecheck clean; lint unchanged from
baseline (1 pre-existing error, 10 pre-existing warnings); production build
passes; browser QA at 1280px, 834px and 390px across all seven affected routes
with 0 horizontal overflow, 0 broken images, one H1 per page and no new console
errors. Closure reconciliation re-ran the focused Phase 34C tests, the full
suite, typecheck and lint after the dead-code removal.

## Closure

PHASE 34C — SMALL IVF NEW-ARTICLE BATCH CLOSED PASS / HUMAN REVIEW REQUIRED
BEFORE DEPLOYMENT — CLOSURE RECONCILED. The global Phase 33 deployment block
remains ACTIVE.

Recommendation: B. SMALL 34D FOLLOW-UP STILL JUSTIFIED. Phase 34D is not
started.
