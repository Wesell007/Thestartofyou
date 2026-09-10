# Phase 32F — Implementation report

Link implementation (32F.2) and runtime-safe cannibalisation remediation
(32F.3). No new articles, URLs, routes or hubs. No deployment.

## Action arithmetic

Gross actions = 5 guaranteed + 6 newly discovered = **11**.

| Action | Cluster | Surface | Terminal status |
| --- | --- | --- | --- |
| A1 | C008 | `/pregnancy` week index entry point | ALREADY_RESOLVED |
| A2 | C006 | 42 week pages, systematic architecture | ALREADY_RESOLVED |
| A3 | C066 | 13 First Year month pages, discoverability | IMPLEMENTED |
| A4 | C082 | Physical recovery → `when-parenthood-feels-heavy` | IMPLEMENTED |
| A5 | C046 | Pelvic floor ↔ body changes after birth | IMPLEMENTED |
| A6 | new | 6 broken internal destinations | IMPLEMENTED |
| A7 | new | Link to redirect source `/articles/signs-of-ovulation` | IMPLEMENTED |
| A8 | new | 5 orphaned legacy primary guides | IMPLEMENTED |
| A9 | new | Pregnancy topic groups truncated to 4 links | IMPLEMENTED |
| A10 | new | Milestones canonical decision (CAN-04) | DEFER_SEO_ARCHITECTURE |
| A11 | new | `/` and `/about` contextual thinness | NO_ACTION_REQUIRED |

`IMPLEMENTED 8 + ALREADY_RESOLVED 2 + MERGED 0 + BLOCKED_BY_UNPUBLISHED_TARGET 0
+ REVIEW_HOLD 0 + DEFER_SEO_ARCHITECTURE 1 + NO_ACTION_REQUIRED 1 = 11 = GROSS`.

## Changed runtime surfaces

| Route / surface | Type | Previous state | Action | Destination | Anchor | Why useful | Cannibalisation impact | Risk |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 4 First Year phase pages | Phase | No month links | Added month navigation | 13 month pages | Age labels | Closes the phase→month gap (C066) | None | Low |
| `/first-year/postpartum-recovery/healing-after-birth` | Article | No mental-health route | Added related link + primary link | `when-parenthood-feels-heavy`, `/articles/postpartum-recovery-timeline` | Titles | C082, CAN-01 | Resolves | Low |
| `/first-year/postpartum-recovery/what-recovery-can-feel-like` | Article | No mental-health route | Added related link | `when-parenthood-feels-heavy` | Title | C082 | Resolves | Low |
| `/first-year/body-and-hormones/body-changes-after-birth` | Article | No cross-stage route | Added 2 cross links | pelvic floor guide, `/articles/your-body-after-birth` | Titles | C046, CAN-02 | Resolves | Low |
| `/articles/pelvic-floor-exercises-in-pregnancy` | Article | No postpartum route | Added cross link | `body-changes-after-birth` | Title | C046 | Resolves | Low |
| `/first-year/sleep/newborn-sleep-expectations` | Article | Orphaned primary above it | Added cross link | `/articles/baby-sleep-first-year` | Title | CAN-03 | Resolves | Low |
| `/first-year/development/baby-development-in-the-first-year` | Article | Orphaned primary above it | Added cross link | `/articles/baby-milestones-first-year` | Title | CAN-04 | Partially resolves | Low |
| 6 pregnancy topic pages | Topic | Groups truncated to 4 links | Render all configured links | Various | Existing labels | Restores configured discovery | None | Low |
| `/pregnancy/preparing-for-baby` | Topic | Missing 2 destinations | Added 2 links | `what-to-buy-for-a-new-baby`, `preparing-for-baby-complete-guide` | Titles | CAN-05 | Resolves | Low |
| `/pregnancy/week/*` support content | Week | Broken "waters" link | Repointed | `/articles/signs-of-labour#waters-contractions-and-show` | Existing | Broken link | None | Low |
| First Year stage data | Stage | Broken development link | Repointed | `/first-year/development` | Existing | Broken link | None | Low |
| Postpartum legacy surfaces | Legacy | Linked to redirect sources | Repointed to final destinations | First Year recovery articles | Existing | Removes redirect hops | None | Low |
| TTC/legacy related lists | Article | Linked to redirect source | Repointed | `/articles/how-to-know-when-you-are-ovulating` | n/a | Removes redirect hop | None | Low |

## Files changed

- `src/data/articleData.ts`
- `src/data/firstYearArticleData.ts`
- `src/data/firstYearStageData.ts`
- `src/data/pregnancyTopicData.ts`
- `src/data/postpartumStageData.ts`
- `src/data/weekSupportContent.ts`
- `src/data/ttcFlagshipOverrides.ts`
- `src/components/article/flagship/ArticleFlagshipTemplate.tsx`
- `src/components/firstyear/article/FirstYearArticlePage.tsx`
- `src/components/firstyear/phase/FirstYearPhasePage.tsx`
- `src/components/pregnancy/PregnancyTopicPage.tsx`
- `src/components/postpartum/PostpartumStages.tsx`
- `src/components/postpartum/PostpartumFinalCTA.tsx`
- `src/test/phase32fLinkIntegrity.test.ts` (new)
- `docs/content/phase32f-*.md` (4 documents)

## Validation

- Tests: 117 files, 1,297 passing, 0 timeouts (baseline 116/1,293 + 1 new file
  with 4 tests).
- Typecheck: clean, run twice.
- Lint: 1 error, 10 warnings — unchanged from baseline.
- Production build: pass.
- Post-change crawl: 331 routes, 0 errors, 0 orphans, 0 broken destinations,
  0 redirect-source links, 0 links to unpublished drafts.

## Future publication migration

If any of the 19 held drafts is published later, the supporting→primary link
direction recorded in the cannibalisation register must be re-evaluated for
CAN-01 through CAN-04. No link in this phase points at a draft, so no
migration is blocking.

## Architecture zero checks

New articles 0, new drafts published 0, new URLs 0, new routes 0, new hubs 0,
slug changes 0, status changes 0, canonical changes 0, navigation architecture
changes 0, sitemap architecture changes 0, SEO architecture changes 0,
lifecycle changes 0 (`ttc | pregnancy | first_year`), AI 0, grounding 0,
journal 0, memory 0, voice 0, database 0, schema 0, RLS 0, deployments 0.
The 19 Phase 32A–32D drafts remain `PUBLICATION STATUS: NOT PUBLISHED`.
