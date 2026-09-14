# Phase 33.5 — Final count reconciliation (documentation only)

Reconciliation is complete. The implementation is sound: the after-state is zero on every
measure, so no implementation change is proposed. Only the documented counts need correcting.

## 1. Stored reviewer metadata — authoritative counts

Counted per record (a record with both `reviewedBy` and `medicallyReviewed` counts once).

| Dataset | Records in file | with `reviewedBy` | with `medicallyReviewed: true` | with both | unique records with reviewer metadata |
| --- | --- | --- | --- | --- | --- |
| `articleData.ts` | 165 | 156 | 0 (field not in this dataset) | 0 | 156 |
| `firstYearArticleData.ts` | 24 | 16 | 16 | 16 | 16 |
| `toddlerArticleData.ts` | 16 | 3 | 3 | 3 | 3 |
| `familyArticleData.ts` | 18 | 0 | 2 | 0 | 2 |
| `ttcFlagshipOverrides.ts` | 14 overrides | 14 | 0 | 0 | 14 |

**TOTAL UNIQUE RECORDS WITH REVIEWER METADATA = 191**
(177 article records, matching the Phase 33.4 figure, plus 14 TTC flagship overrides.)

### Why the previous report said 179

179 was a raw string count of `Jenny Joines` across the five datasets: 156 + 17 + 4 + 1 + 1.
Two of those are not records:

- `firstYearArticleData.ts` has 17 raw matches but 16 records — the 17th is a mapper fallback
  expression (`article.medicallyReviewed ? "Jenny Joines" : undefined`).
- `ttcFlagshipOverrides.ts` has 1 raw match because all 14 overrides share one `REVIEWER`
  constant.
- `familyArticleData.ts` has 1 raw match, which is the same mapper fallback, while 2 records
  carry `medicallyReviewed: true`.

The table then mixed metrics: raw string counts for four datasets and the field count (14) for
the TTC overrides, so the row values summed to 192 while the stated total stayed at 179.
Neither figure is the record count. The correct record count is 191.

No dataset is edited.

## 2. Hardcoded reviewer locations — 42 / 13 is correct

Evidence: `git grep -c "Jenny Joines"` at the pre-change commit, restricted to
`src/components` and `src/pages`.

- Week-page hardcoded locations before = **42** (`Week1Page.tsx` … `Week42Page.tsx`, one each)
- Non-week hardcoded locations before = **13** (`WeekNormal`, `StagePage`, `ArticleNormal`,
  `PostpartumNormal`, `FirstYearNormal`, `FYMedicallyReviewed`, `FirstYearTopicPage`,
  `ToddlerTopicPage`, `IVFTopicPage`, `IVFTimelineResult`, `IVFNormal`, `SupportFinalCTA`,
  `DueDateCalculatorResult`)
- Total hardcoded locations before = **55**
- Hardcoded locations after = **0**

The earlier 43 / 12 split counted `src/components/week/WeekNormal.tsx` as a week page. It is a
shared week renderer, not a routed `WeekNPage`. Total is 55 either way.

## 3. Exact visitor-facing before count

A single rendered-page count cannot be calculated meaningfully: shared renderers multiply across
dynamic routes, so the same component produces a different claim count per journey and per
dataset record. The documentation will state this explicitly and use two defined, auditable
metrics instead.

**Metric A — content records capable of displaying an unsupported claim: 191.**

**Metric B — distinct claim-producing rendering locations in source: 72.**
- 42 week pages (one hardcoded claim each)
- 29 non-week visitor-facing claim sites (13 hardcoded plus 16 data-driven sites across
  `ArticleHeader`, `ArticleHero`, `ArticleDeepIntro`, `ArticleTrustBar`, `ArticleQuickAnswer`
  ×2, `ArticleSources`, `FlagshipHero`, `HubArticleView` ×2, `FirstYearArticleCard`,
  `ToddlerArticleCard`, `FamilyArticleCard`, `FamilyArticleImageCard`, `FYTwoTrackEntry`,
  `DueDateCalculatorResult` trust cue)
- 1 machine-facing generator (`ArticlePage.tsx` Article JSON-LD `reviewedBy`)

After: unsupported claim-producing locations = 0. Wording no longer appears anywhere except the
single gated component and the four badge chips, all of which are behind `hasReviewClaim()`.

## 4. Final zero state — reconfirmed

- Hardcoded reviewer identity strings in active rendering code/pages = 0
- Unsupported rendered review wording = 0
- Unsupported JSON-LD `reviewedBy` = 0
- Other machine-facing reviewer claims = 0
- Production provenance registry records = 0
- Rendered production provenance-backed claims = 0
- No fallback from historical dataset metadata = YES

## 5. Pinned-hash clarification

One test file was re-pinned: `src/lib/seo/canonicalBreadcrumbs.test.ts`, containing two hashes —
`ArticleHeader.tsx` and `FlagshipHero.tsx`. The hashes changed because each file's inline
`reviewedBy` block was replaced by the gated `MedicalReviewClaim` component and the now-unused
`Shield` icon import was dropped. The diff touches nothing else: breadcrumb source behaviour
unchanged, routes changed = 0, canonicals changed = 0, discovery changed = 0. The report wording
"one pinned-hash guard" will be corrected to "one pinned-hash test, two file hashes".

## 6. Documentation edits

`docs/content/reviewer-claim-governance-correction.md`
- Section 1 table: replace the 179 row with the 191 record count and add a raw-string-count row
  explaining the 179 / 192 artefact.
- Section 7: change "179 reviewer mentions" to "191 records carrying reviewer metadata
  (179 raw `Jenny Joines` string occurrences)".
- Add a short before-count section using Metric A and Metric B with the note that a universal
  rendered-page count is not calculable.
- Correct the pinned-hash sentence.
- Add a closing reconciliation note.

`docs/content/article-source-and-structure-consistency.md`
- Keep the 177 Phase 33.4 figures as the historical audit result, annotated as article records
  only.
- Update the remediation paragraph: 191 records with reviewer metadata, 42 + 13 = 55 hardcoded
  locations, 72 claim-producing locations, all now 0.

No source, dataset, test or schema change. No deployment. No IVF work.
