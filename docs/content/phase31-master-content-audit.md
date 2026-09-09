# Phase 31 — Master Content Coverage Audit

What to Expect UK organic demand map versus The Start of You. Audit and documentation only.

## 1. Executive answer

**Does The Start of You have the right content coverage across its journey hubs?**

Largely yes on the journeys it was built around, and not yet on the one it grew into.

Trying to Conceive and Pregnancy are structurally strong and close to complete: 142 live indexable articles, 42 week pages, 13 TTC topic and stage pages, trimester pages and two calculators cover almost every intent the competitor dataset surfaces that fits the brand. Toddler and Family are complete for the current strategy — most of the competitor demand there is baby names, star signs and product reviews, which the brand should not chase.

The real gaps are after birth. First Year and Postpartum/Recovery have excellent structure (26 month, phase and topic pages) but thin depth against genuinely high, calmly answerable demand: teething, colic, starting solids, sleep regressions, milestone timing, newborn skin, diastasis recti and perineal recovery all have no owning page. IVF cannot be judged from this source, which barely serves it in the UK.

Every meaningful gap is an addition inside an existing hub. Nothing here calls for a fourth journey, a new lifecycle, or a structural rebuild.

## 2. Source dataset

10,000 raw rows · 8,485 unique keywords · 911 unique URLs · 8,914 unique keyword+URL pairs · 1,086 duplicate rows beyond the unique pair set. Historical UK snapshot, 6–7 August 2025. Full method and limitations: `phase31-source-normalisation.md`.

## 3. Repository inventory versus public coverage

| | Repository records | Live indexable | Not owning intent |
| --- | --- | --- | --- |
| Legacy articles (`articleData.ts`) | 156 | 155 | 1 redirect |
| Family hub articles | 18 | 18 | 0 |
| First Year hub articles | 16 | 16 | 0 |
| Toddler hub articles | 16 | 16 | 0 |
| **Total article records** | **206** | **205** | **1** |

Two corrections to the approved figures, both verified in `phase31-source-normalisation.md` §7: the true record total is **206, not 210** (the interface line `slug: string;` was counted as a record in each dataset), and there are **no draft articles** (the `"draft"` string in each hub dataset is part of the type union).

Non-article live surfaces: 134 indexable structured pages and tools, plus 42 pregnancy week pages, totalling **331 URLs in the sitemap** — every one verified publicly reachable, self-canonical and free of `noindex`.

Non-owning surfaces by design: 31 page components emit `noindex` (saved journeys, setup routes, toolkit, results, auth, account, 404, legacy postpartum hub). None appear in the sitemap. Five legacy postpartum and TTC routes redirect into live destinations.

One unresolved surface: `/preparing-for-baby` is live, indexable and in the sitemap, while the brief states Preparing for Baby is not an active hub. Classified `UNKNOWN_OR_UNRESOLVED`. No change made.

## 4. Method

URL-first clustering of competitor demand, then coverage classification against resolved Start of You surface status. Sitemap membership was never used as sole proof of indexability; each surface was resolved through route, auth gating, `SeoHead` behaviour, canonical, redirect, data-layer gating and body availability. Full rules in `phase31-source-normalisation.md` §5–6.

89 relevant intent clusters were mapped and classified. Deliverable: `phase31-opportunity-clusters.csv`.

## 5. Domain verdicts

| Domain | Verdict | New pages proposed |
| --- | --- | --- |
| Trying to Conceive | TARGETED_TOP_UPS | 2 |
| Pregnancy | TARGETED_TOP_UPS | 11 + 1 tool |
| IVF | MATERIAL_GAPS (low confidence — source under-serves IVF) | 0 from this evidence |
| First Year | MATERIAL_GAPS | 11 |
| Postpartum / Recovery | MATERIAL_GAPS | 3 |
| Toddler | COMPLETE_FOR_CURRENT_STRATEGY | 0 |
| Family | COMPLETE_FOR_CURRENT_STRATEGY | 0 |

Detail per domain: `phase31-hub-scorecard.md`.

## 6. Cross-hub gaps

- **After-birth depth.** First Year and Postpartum together account for 14 of the 27 proposed new pages. The structure is built; the depth is not.
- **Physical recovery under-served relative to emotional recovery.** Emotional wellbeing is a brand strength. Bodily recovery — abdominal separation, perineal healing, bleeding red flags, sex after birth — is comparatively thin.
- **Named-phase queries.** Parents search for named things ("4 month sleep regression", "witching hour", "cluster feeding") that the calm hub pages describe without naming. Naming them is a coverage act, not a tone compromise.
- **Weeks-to-months and unit conversions.** A large, boring, persistent intent the week pages could answer inline.
- **Safety-critical UK gap.** Itching in pregnancy has no owner. In UK practice this routes to obstetric cholestasis assessment. Highest-priority single item in this audit.

## 7. Cannibalisation

Existing overlaps to resolve editorially, not by deletion:

- Discharge: `discharge-in-pregnancy` versus `watery-discharge-in-pregnancy`.
- Early symptoms: `early-pregnancy-symptoms-explained` versus `symptoms-stopping-early-pregnancy`.
- Ovulation cluster: `ovulation-signs`, `how-to-know-when-you-are-ovulating`, `using-ovulation-tests`, `fertile-window`, `understanding-your-fertile-window`. The `signs-of-ovulation` redirect is already correct.
- Fertile window: `fertile-window` versus `understanding-your-fertile-window`.

New pages carrying MEDIUM cannibalisation risk (milestone timing, sleep regressions, newborn skin, gestational diabetes, conception-date tool) must be built as depth pages linked from the structured pages, never as replacements for them.

## 8. New content

27 proposed new pages and tools: `phase31-new-content-backlog.csv`. 9 are P0, 12 P1, 6 P2. Every entry carries UK adaptation as required, since the source is a US publisher's UK-facing content.

P0 set: itching in pregnancy · caesarean birth · gestational diabetes · colic and evening crying · teething · starting solids and weaning · sleep regressions · milestone timing · diastasis recti.

## 9. Existing content actions

52 actions against live surfaces: `phase31-existing-content-actions.csv` — 28 expansions, 16 no-action confirmations, 5 internal-linking improvements, 2 tool content improvements, 1 canonical confirmation. Zero `PUBLISH_OR_RESOLVE_EXISTING_CONTENT` items were required: no useful content was found trapped in a draft, preview or unresolved state. The one status question, `/preparing-for-baby`, is a possible over-exposure rather than a hidden asset.

## 10. Skips

10 clusters deliberately skipped: `phase31-skip-register.csv`. The largest by volume are baby names, gender prediction and reveals, celebration and star-sign content, and product review guides. Together they represent a large share of the competitor's captured demand and none of them fit a calm, evidence-led UK health brand.

## 11. Suggested sequencing

1. Safety and clinical gaps: itching, caesarean, gestational diabetes, lochia red flags.
2. First Year depth: colic, teething, weaning, sleep regressions, milestone timing.
3. Recovery depth: diastasis recti, perineal care, sex after birth, pelvic floor linking.
4. Structural top-ups: weeks-to-months, internal linking, discharge canonical decision.
5. Optional tooling: conception-date calculator reusing existing date logic.

## 12. Reconciled metrics

| # | Metric | Value |
| --- | --- | --- |
| 1 | Raw source rows | 10,000 |
| 2 | Unique keywords | 8,485 |
| 3 | Unique source URLs | 911 |
| 4 | Unique keyword+URL pairs | 8,914 |
| 5 | Duplicate rows beyond unique pairs | 1,086 |
| 6 | Legacy article records | 156 |
| 7 | Family article records | 18 |
| 8 | First Year article records | 16 |
| 9 | Toddler article records | 16 |
| 10 | Total article records (corrected) | 206 |
| 11 | Draft articles | 0 |
| 12 | Live indexable articles | 205 |
| 13 | Article records not owning intent | 1 |
| 14 | Total sitemap URLs | 331 |
| 15 | Pregnancy week pages (live) | 42 |
| 16 | Other structured/tool pages (live) | 134 |
| 17 | `noindex` page components | 31 |
| 18 | `noindex` pages present in sitemap | 0 |
| 19 | Surfaces classified `UNKNOWN_OR_UNRESOLVED` | 1 |
| 20 | Intent clusters mapped | 89 |
| 21 | `COVERED_STRONG` | 22 |
| 22 | `COVERED_PARTIAL` | 21 |
| 23 | Covered by structured page / tool / hub | 6 |
| 24 | `NEW_ARTICLE_GAP` | 22 |
| 25 | `NEW_TOOL_OR_FEATURE_OPPORTUNITY` | 1 |
| 26 | `SUPPORTING_CONTENT_OPPORTUNITY` | 7 |
| 27 | Skipped or out of scope | 10 |
| 28 | New content backlog items | 27 |
| 29 | Existing content actions | 52 |
| 30 | `PUBLISH_OR_RESOLVE_EXISTING_CONTENT` items | 0 |

Reconciliation: 22 + 21 + 6 + 22 + 1 + 7 + 10 = 89 clusters. 27 backlog + 52 actions + 10 skips = 89. Articles 205 live + 1 non-owning = 206 records.

## 13. Phase boundary

Application source changes 0 · article records changed 0 · article statuses changed 0 · routes changed 0 · SEO changed 0 · sitemap changed 0 · AI changed 0 · grounding changed 0 · database changed 0 · deployments 0. Only the seven files in `docs/content/` were created.

## 14. Final verdict

**TARGETED_TOP_UPS overall, with MATERIAL_GAPS concentrated after birth.** The site's architecture is sound and its pre-birth coverage is competitive. Closing 27 additions inside existing hubs — half of them in First Year and recovery — would make coverage complete for the current strategy without adding a single new lifecycle.
