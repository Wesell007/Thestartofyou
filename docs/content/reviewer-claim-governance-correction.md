# Reviewer claim governance correction (Phase 33.5)

Status: **CLOSED PASS**. No deployment. Global Phase 33 deployment block remains ACTIVE.

## 1. Why this correction was needed

The Phase 33.4 trust audit counted **177** visitor-facing "Medically reviewed by
Jenny Joines" claims and **0** with repository provenance. A deeper trace in this
phase showed the surface was wider and split into two mechanisms.

| Mechanism | Count before | Detail |
| --- | --- | --- |
| Unique records carrying reviewer metadata | 191 | `articleData.ts` 156, `firstYearArticleData.ts` 16, `ttcFlagshipOverrides.ts` 14, `toddlerArticleData.ts` 3, `familyArticleData.ts` 2 |
| Raw "Jenny Joines" string occurrences in datasets | 179 | 156 + 17 + 1 + 4 + 1 (includes mapper fallbacks and the shared TTC `REVIEWER` constant; this is not a record count) |
| Hardcoded reviewer strings in rendering code/pages | 55 | 42 routed `WeekNPage.tsx` files plus 13 non-week locations: `WeekNormal`, `StagePage`, `ArticleNormal`, `PostpartumNormal`, `FirstYearNormal`, `FYMedicallyReviewed`, `FirstYearTopicPage`, `ToddlerTopicPage`, `IVFTopicPage`, `IVFTimelineResult`, `IVFNormal`, `SupportFinalCTA`, `DueDateCalculatorResult` |
| Distinct unsupported claim-producing source locations | 72 | 42 week-page locations + 29 other visitor-facing locations + 1 machine-facing JSON-LD generator (`ArticlePage.tsx`) |
| Machine-facing claims | 1 generator | `ArticlePage.tsx` emitted `reviewedBy: { "@type": "Person" }` into Article JSON-LD |
| Provenance-backed reviews in the repository | 0 | Human reviews completed: 0 |

Root cause: the review claim was treated as a brand trust signal — a hardcoded
default in renderers, plus a reviewer name copied onto dataset records — rather
than as the output of a completed review record.

## 2. Rendering surfaces traced

Data-driven (read `reviewedBy` / `medicallyReviewed`): `ArticleHeader`,
`ArticleHero`, `FlagshipHero`, `ArticleQuickAnswer` (two variants),
`ArticleDeepIntro`, `ArticleTrustBar`, `ArticleSources`, `HubArticleView`
(meta row and trust card), `FirstYearArticleCard`, `ToddlerArticleCard`,
`FamilyArticleCard`, `FamilyArticleImageCard`, `FirstYearTopicPage`,
`ToddlerTopicPage`.

Hardcoded: the 55 locations listed above, including the standalone
`FYMedicallyReviewed` trust strip on `/first-year`.

## 3. The new binding rule

A visitor-facing or machine-facing medical-review claim may render **only** when
genuine provenance exists for the exact content surface claimed as reviewed:
reviewer identity, exact surface, completed review state, and a review date or a
traceable completed-review record.

No provenance = no claim. No substitution is permitted: not dataset reviewer
fields, not a default reviewer, not source quality, not article evidence, and
not softer wording ("expert reviewed", "clinically checked", "medically
verified").

Implementation:

- `src/lib/reviewClaims.ts` — `ReviewProvenance` type, `reviewSurfaceKey()`,
  `isValidReviewProvenance()`, `getReviewClaim()` (claim or `null`),
  `hasReviewClaim()`, and `REVIEW_PROVENANCE_REGISTRY`, which is
  **intentionally empty**.
- `src/components/shared/MedicalReviewClaim.tsx` — the sole display authority.
  Renders nothing when the lookup returns `null`, with no fallback path.

Every remaining review surface now calls that single lookup. No renderer holds
its own review rule.

## 4. What changed

- All 55 hardcoded reviewer strings removed from rendering code and pages.
  Hardcoded reviewer strings in active rendering code/pages: **0**.
- `FYMedicallyReviewed` (a standalone trust strip that was nothing but the
  unsupported claim) deleted, and removed from `/first-year`.
- Data-driven surfaces routed through the gate. Badge-only chips on First Year,
  Toddler and Family cards now render only when `hasReviewClaim()` is true.
- `ArticleSources` editorial note keeps the "last updated" sentence and drops
  the "reviewed for accuracy by" sentence.
- `DueDateCalculatorResult` trust cue "Medically reviewed guidance" removed.
- `FYTwoTrackEntry` hardcoded "Medically reviewed" chip removed.
- `ArticlePage.tsx` Article JSON-LD now emits `reviewedBy` only from a
  provenance-backed record; with an empty registry it is absent.
- Unused icon imports left behind by the removals cleaned up. Layout gaps
  checked: no empty strips, doubled separators or misaligned metadata rows.
- `canonicalBreadcrumbs.test.ts` — one pinned-hash test containing two file hashes
  (`ArticleHeader.tsx` and `FlagshipHero.tsx`) — re-pinned; breadcrumb behaviour in both files unchanged.

## 5. Structured-data sweep

`reviewedBy`, reviewer `Person` objects, `lastReviewed` and `MedicalWebPage`
assertions were searched across all structured-data generators. Only
`ArticlePage.tsx` emitted a reviewer assertion, and it is now gated. Grounding
metadata (`src/lib/grounding/*`) holds an internal `reviewer` governance field
that is never emitted to visitors or machines.

## 6. Wording variants audited

| Wording | In rendering code after correction |
| --- | --- |
| Medically reviewed by | 0 (except inside the gated component) |
| Reviewed by | 0 |
| Reviewed for accuracy by | 0 |
| Clinically reviewed / clinically checked | 0 |
| Expert reviewed / medically verified | 0 |
| Medical review / accuracy review | 0 |
| "Jenny Joines" | 0 |

Out of scope and deliberately retained: disclaimers in `Terms.tsx` and
`SupportAISupport.tsx` stating that AI output is **not** individually medically
reviewed, and the source-quality sentence in `answerSourceLinks.ts` describing
UK health sources rather than claiming review of our own content.

## 7. Retained historical metadata

`reviewedBy`, `medicallyReviewed` and `lastUpdated` remain in
`src/data/*` as **HISTORICAL / UNSUPPORTED REVIEW METADATA PENDING GOVERNANCE
REMEDIATION** (179 reviewer mentions). They are not deleted, are never used as a
display fallback, and do not satisfy the gate.

## 8. Adding a genuine review in future

1. Complete a real review of one specific content surface.
2. Record it in `REVIEW_PROVENANCE_REGISTRY` with reviewer identity, the exact
   `reviewSurfaceKey(...)`, `reviewState: "completed"`, and a review date or a
   traceable record reference.
3. The claim then renders automatically on that surface only, in visitor-facing
   and machine-facing output alike. Never add a record without the review.

## 9. Tests

`src/test/reviewerClaimGovernance.test.tsx` (10 tests): empty production
registry; no claim for any surface; renders nothing without provenance;
positive gate test with an isolated test-only registry; exact-surface match and
incomplete-provenance rejection; zero hardcoded reviewer identities in rendering
code; zero ungated review wording; every remaining badge gated; JSON-LD
`reviewedBy` absent without provenance; historical dataset metadata preserved.
No test provenance is added to production data.

## 10. QA and validation

Responsive QA with Playwright at 1280×1800, 768×1200 and 390×844 across TTC,
Pregnancy legacy, Pregnancy flagship, Pregnancy week, First Year article, First
Year hub, Toddler, Family, IVF and the due-date calculator — 30 page/viewport
combinations: unsupported claims 0, reviewer names 0, horizontal overflow 0,
JSON-LD `reviewedBy` 0, console errors 0, read time and updated dates preserved,
no empty reviewer strips.

Validation: full suite 121 files / 1,330 tests passed, typecheck clean twice,
lint at the 1 error / 10 warnings baseline (pre-existing generated file),
production build passed.

## 11. Boundaries held

Article copy 0, sources 0, imagery 0, routes 0, canonicals 0, topics 0,
discovery 0, AI 0, grounding runtime 0, journal 0, memory 0, voice 0, database 0,
schema 0, RLS 0, human reviews completed 0, deployment 0.
