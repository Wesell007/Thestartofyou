# Article source and structure consistency (Phase 33.4)

Status: **PHASE 33.4 — ARTICLE TRUST & STRUCTURE CONSISTENCY — CLOSED PASS**
Deployment: none. `GLOBAL PHASE 33 DEPLOYMENT BLOCK = ACTIVE`. No IVF content work performed.

## 1. Rendering systems audited

| System | Renderer | Source presentation before | After |
| --- | --- | --- | --- |
| Legacy articles (TTC, Pregnancy, IVF, flagship and deep templates) | `src/components/article/ArticleSources.tsx` | Clickable external anchors (`target="_blank"`) | Plain citation text |
| Hub articles (First Year, Toddler, Family) | `src/components/shared/HubArticleView.tsx` | Clickable anchors + `ExternalLink` icon + "External links open in a new tab. Content on external sites is not controlled by us." | Plain citation text, no icon, no disclaimer |
| Pregnancy week pages | `src/components/week/WeekSources.tsx` | Clickable external anchors | Plain citation text |
| Flagship article shell | `src/components/article/flagship/ArticleFlagshipTemplate.tsx` | `FlagshipSummaryRow` (At a glance + In this article) **and** `ArticleContents` (In this article again) | Single navigation, carried by `FlagshipSummaryRow` |

No other component renders an article Sources & References block. Navigation, legal, product and other intentional external links elsewhere on the site are untouched.

## 2. Source presentation standard

`Title — Organisation (Year)` where the record carries that data; `Title — Organisation` when no year; `Title` alone when no organisation. Numbering, ordered-list semantics, hub colours and spacing are unchanged. No organisation, year or title was invented or rewritten.

## 3. Source URLs preserved = YES

No source record was edited. `url`, `publisher`, `year` and `label` remain in `src/data/articleData.ts`, `src/data/familyArticleData.ts`, `src/data/firstYearArticleData.ts`, `src/data/toddlerArticleData.ts` and `src/data/weekSupportContent.ts`, and remain available to JSON-LD citations, grounding and editorial provenance. A test asserts every structured source record still has a URL.

## 4. Family provenance matrix

Repository truth differs from the brief's stated inventory: there are **18** Family records, not 19.

| Provenance | Count | Records |
| --- | --- | --- |
| Source data exists | 4 | `managing-childcare-costs`, `making-your-home-safer`, `when-to-ask-for-help`, `family-sick-days-at-home` |
| `SOURCE PROVENANCE MISSING` | 14 | all remaining Family records |

The shared hub renderer only renders the Sources block when `sources.length > 0`, so provenance-missing records show no empty container. No citations were fabricated and no research was performed.

## 5. Duplicate navigation findings

| Template | TOC blocks before | After |
| --- | --- | --- |
| Flagship | 2 | 1 |
| Legacy deep | 1 | 1 |
| Legacy short | 1 | 1 |
| Hub (First Year / Toddler / Family) | 1 | 1 |
| Pregnancy week | jump nav only | unchanged |

Defects found = 1 (flagship path, visible on Preconception GP appointment). Fixed = 1. `ArticleContents` remains available to the deep template, which relies on it.

## 6. At-a-glance findings

Accidental duplicates found = 0, fixed = 0. The opening "At a glance" summary and the "Key takeaways — the essentials, at a glance" section serve different functions and both remain. On week pages the two matches are a jump-nav label and its target section, not duplicate rendering.

## 7. Reviewer-claim audit (read only, no changes)

Displayed wording:
- Legacy templates (`ArticleHeader`, `ArticleHero`, `ArticleDeepIntro`): "Medically reviewed by {reviewer}" / "Reviewed by {reviewer}"
- Hub renderer: "Medically reviewed by {reviewer}" and "✔ Medically reviewed by {reviewer}. Guidance is informational…"

| Surface | Visitor-facing claims | Reviewer metadata | Review date | Repository provenance/evidence |
| --- | --- | --- | --- | --- |
| Legacy articles | 156 | YES (`reviewedBy`, all "Jenny Joines") | partial (`lastUpdated`) | NO |
| First Year articles | 16 | YES | partial | NO |
| Toddler articles | 3 | YES | partial | NO |
| Family articles | 2 | YES | partial | NO |
| **Total** | **177** | | | **0 with provenance** |

`docs/ai/article-grounding-health-review.md` §10 records explicitly that this reviewer metadata is context only and is not review evidence, and §12 records reviewer/approval governance as Missing.

Classification: **REVIEW CLAIM REQUIRES GOVERNANCE CHECK** for all 177 visitor-facing claims. Nothing was added, removed, certified or reworded in this phase.

### Remediation outcome (Phase 33.5)

Remediated in Phase 33.5. A deeper trace found 179 stored reviewer mentions in the datasets, 55 hardcoded reviewer strings in rendering code and pages, and one machine-facing assertion (Article JSON-LD `reviewedBy`). All unsupported claims now render only through a single provenance gate (`src/lib/reviewClaims.ts` + `src/components/shared/MedicalReviewClaim.tsx`) whose production registry is empty, so unsupported visitor-facing claims = 0, hardcoded reviewer strings = 0 and unsupported JSON-LD claims = 0. Historical dataset metadata is preserved untouched. Full record: `docs/content/reviewer-claim-governance-correction.md`.

## 8. Audit counts

| # | Metric | Value |
| --- | --- | --- |
| 1 | Article records inspected | 225 (165 legacy, 26 First Year, 16 Toddler, 18 Family) |
| 2 | Article rendering systems inspected | 4 (legacy deep/short, flagship, hub, week) |
| 3 | Articles rendering source blocks before | 194 (148 legacy, 26 First Year, 16 Toddler, 4 Family) |
| 4 | Articles rendering source blocks after | 194 (unchanged) |
| 5 | Visible external source links before | 1 per source entry across all 194 articles, plus week pages |
| 6 | Visible external source links after | 0 |
| 7 | Family articles inspected | 18 |
| 8 | Family articles with existing provenance | 4 |
| 9 | Family articles missing provenance | 14 |
| 10 | Empty Family source blocks after | 0 |
| 11 | Duplicate In-this-article defects found | 1 |
| 12 | Duplicate In-this-article defects fixed | 1 |
| 13 | Duplicate At-a-glance defects found | 0 |
| 14 | Duplicate At-a-glance defects fixed | 0 |
| 15 | Visitor-facing reviewer claims found | 177 |
| 16 | Reviewer claims with confirmed repository provenance | 0 |
| 17 | Reviewer claims requiring governance check | 177 |

## 9. Responsive QA

Checked at 1280×1800, 768×1200 and 390×844 on: TTC flagship (`/articles/preconception-gp-appointment`), Pregnancy legacy (`/articles/itching-in-pregnancy`), Pregnancy flagship (`/articles/hair-dye-and-beauty-treatments-in-pregnancy`), Pregnancy week (`/pregnancy/week/12`), First Year (`/first-year/care-and-safety/teething`), Toddler (`/toddler/behaviour-emotions/understanding-toddler-tantrums`), Family (`/family/health-safety/making-your-home-safer`).

Every route, every viewport: source block visible = YES, source anchors = 0, source icons = 0, obsolete disclaimer = 0, TOC count ≤ 1 (article templates = 1), key takeaways preserved, one `h1`, horizontal overflow = 0, page errors = 0.

## 10. Tests

`src/test/articleSourceAndStructure.test.tsx` (9 tests): plain-text rendering in all three source renderers, titles/organisations/years still visible, source URLs still stored, disclaimer absent, Family inventory and provenance counts with no empty block, flagship TOC = 1 with anchors mapped to real section ids, deep and hub TOC ≤ 1, key takeaways and single opening At a glance preserved.

## 11. Changed files

- `src/components/article/ArticleSources.tsx`
- `src/components/shared/HubArticleView.tsx`
- `src/components/week/WeekSources.tsx`
- `src/components/article/flagship/ArticleFlagshipTemplate.tsx`
- `src/test/articleSourceAndStructure.test.tsx` (new)
- `docs/content/article-source-and-structure-consistency.md` (new)

## 12. Exceptions

1. Family inventory is 18 records, not the 19 stated in the brief; provenance-missing count is therefore 14, not 15.
2. IVF articles use the shared legacy renderer, so their citations also became plain text — shared source presentation consistency, not IVF content work.
3. 177 reviewer claims carry no repository provenance and are flagged for governance, unchanged.

## 13. Boundaries held

Article copy, imagery, routes, canonicals, topics, discovery, related links, AI runtime, grounding eligibility/approvals, journal, memory, voice, database, schema, RLS and saved lifecycles: 0 changes. Deployment: 0.
