# Phase 33.5 — Reviewer claim governance correction

Remove every visitor-facing medical-review claim that has no provenance behind it, while leaving article content, sources, imagery, routes and governance untouched. No deployment. No IVF work.

## 1. What the audit found (verified in the repository)

The Phase 33.4 figure of 177 counted article-record claims only. The real surface is wider, and it splits into two different mechanisms.

**A. Data-driven claims** — article records carry `reviewedBy` / `medicallyReviewed`, and renderers print them.

| Dataset | Records naming a reviewer |
| --- | --- |
| `src/data/articleData.ts` | 156 |
| `src/data/firstYearArticleData.ts` | 17 |
| `src/data/ttcFlagshipOverrides.ts` | 14 |
| `src/data/toddlerArticleData.ts` | 4 |
| `src/data/familyArticleData.ts` | 1 |
| Total reviewer mentions in data | 179 |

Renderers reading those fields: `ArticleHeader`, `ArticleHero`, `FlagshipHero`, `ArticleQuickAnswer` (twice), `ArticleDeepIntro`, `ArticleTrustBar`, `ArticleSources`, `HubArticleView` (twice), plus "Medically reviewed" chips on `FirstYearArticleCard`, `ToddlerArticleCard`, `FamilyArticleCard`, `FamilyArticleImageCard`, `FYTwoTrackEntry`, and topic-level badges in `FirstYearTopicPage` and `ToddlerTopicPage`.

**B. Hardcoded claims** — the name "Jenny Joines" is typed directly into 55 places across 55 code files, none of which consults any data or provenance: 43 individual week pages, plus `WeekNormal`, `StagePage`, `ArticleNormal`, `PostpartumNormal`, `FirstYearNormal`, `FYMedicallyReviewed`, `FirstYearTopicPage`, `ToddlerTopicPage`, `IVFNormal`, `IVFTopicPage`, `IVFTimelineResult`, `SupportFinalCTA`, `DueDateCalculatorResult`.

**C. Structured data** — `src/pages/ArticlePage.tsx` also emits `reviewedBy: { "@type": "Person", name: ... }` into article JSON-LD, asserting the same unsupported review to search engines.

Root cause: the claim was treated as a brand trust signal (a hardcoded default, and a reviewer name copied onto records) rather than as the output of a review record. `docs/ai/article-grounding-health-review.md` already states the reviewer metadata is context only and is not review evidence. Provenance-backed reviews in the repository: **0**.

## 2. The rule to implement

A medical-review claim renders only when a provenance-backed review record exists for that specific article: reviewer identity, the article reviewed, review completion state, and a review date or traceable record reference. Everything else renders nothing — no softer wording, no alternative reviewer, no "expert reviewed".

Since no such record exists today, every review claim on the site stops rendering.

## 3. Work to do

1. **Add one gate** — a small module holding the review-provenance type, an empty provenance registry (there is nothing genuine to put in it), and a lookup that returns a claim or `null`. Plus a single shared claim component that renders the badge when the lookup returns a record and renders nothing otherwise. No database, no new review system.
2. **Route every surface through the gate** — replace the 55 hardcoded strings and every data-driven review block and chip with the shared component. With the registry empty, all of them render nothing, and the site is future-proofed: adding a genuine record later restores the badge in one place.
3. **Stop emitting the unsupported JSON-LD `reviewedBy`** — same governance rule, machine-facing.
4. **Keep the stored metadata** — `reviewedBy`, `medicallyReviewed` and `lastUpdated` stay in the datasets as historical metadata, flagged in documentation as unsupported and pending governance remediation. Nothing is deleted, nothing is invented.
5. **Tidy the gap the badge leaves** — where the claim sat inside a metadata row (updated date, read time), the row must still read cleanly with the claim gone; where it was a standalone strip, the strip disappears entirely rather than leaving empty padding.

## 4. Not touched

Article titles, descriptions, body copy, guidance, FAQs, source citations, imagery, alt text, routes, canonicals, topics, discovery, related links, AI, grounding, journal, memory features, voice, database, schema, RLS. Human reviews completed: 0. Deployment: 0. The global Phase 33 deployment block stays active.

## 5. Tests

New focused test file asserting: zero rendered review claims across legacy, flagship, deep, week, First Year, Toddler and Family surfaces; zero rendered reviewer names; zero hardcoded reviewer strings left in components and pages; article copy, sources and routes unchanged; the gate does render a claim when given a provenance record (exercised in isolation, without touching production data); JSON-LD carries no `reviewedBy`.

## 6. QA and validation

Browser QA at 1280×1800, 768×1200 and 390×844 on representative TTC, Pregnancy legacy, Pregnancy flagship, Pregnancy week, First Year, Toddler and Family pages: claim absent, no empty metadata gap, updated-date and read-time still aligned, hero spacing intact, no overflow, no console errors.

Then: focused tests, full suite, typecheck twice, lint against the 1-error/10-warning baseline, production build. Actual numbers reported against the 120 files / 1,320 tests baseline.

## 7. Documentation

Create `docs/content/reviewer-claim-governance-correction.md` (previous counts, rendering sources, root cause, provenance result, correction, retained metadata, future display rule, tests, QA, changed files) and update `docs/content/article-source-and-structure-consistency.md` section 7 with the remediation outcome.

## 8. One conflict to confirm

Stored project memory currently carries the rule: *"All medically relevant pages MUST include ✔ Medically reviewed by Jenny Joines."* This phase directly reverses it. On approval that memory rule will be replaced with the provenance-gated rule, so the badge is not reintroduced in future work.

## Technical notes

- New: `src/lib/reviewClaims.ts` (type, empty registry, lookup) and `src/components/shared/MedicalReviewClaim.tsx` (gated renderer).
- Edited: 43 `src/pages/Week*.tsx`, `StagePage.tsx`, `ArticlePage.tsx` (JSON-LD), and the article/week/hub/IVF/postpartum/first-year/toddler/family/support components listed in section 1.
- Datasets are not edited. Type definitions keep `reviewedBy?` / `medicallyReviewed?`.
- New test file `src/test/reviewerClaimGovernance.test.tsx`; existing tests that assert badge presence, if any, are updated to assert the governed behaviour.
