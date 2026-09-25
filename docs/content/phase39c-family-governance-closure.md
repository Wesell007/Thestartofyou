# Phase 39C — Family Governance Cleanup, Pregnancy Handoff & Workstream Closure

Status: CLOSED PASS. Deployment: NO.

## 39B governance baseline
Canonical ready Family articles 18. Inventory governance issues 18: 12 existing rows with stale draft / placeholder / publish metadata, 6 ready guides with no row.

## Inventory treatment
- 12 stale rows: only `currentStatus`, `contentState`, `recommendedAction` changed to `live` / `final` / `keep` (12/12).
- 6 missing rows created with the existing Family row shape and the same values (6/6): second-time-parenting, staying-connected-as-parents, calmer-evenings-after-busy-days, family-sick-days-at-home, planning-family-days-out, simple-family-play-ideas.
- Matching rows 18/18. Remaining issues 0. No unrelated rows touched.

## Reviewer provenance
- Records with reviewer metadata 2: `making-your-home-safer`, `when-to-ask-for-help` (`medicallyReviewed: true`).
- Responsible helper: `withFamilyDefaults` derived `reviewedBy: "Jenny Joines"` and a `"2026-07"` date from that flag. Only consumer of the derived fields was the `hasReviewClaim`-gated card badge path; the provenance registry is empty.
- Genuine article-specific provenance 0; unsupported 2. Removed both flags and the Family-only fallback. Editorial `lastUpdated: "July 2026"` values kept. Fabricated provenance 0; valid provenance removed 0.
- Phase 33.5 reviewer count test classified as CURRENT state (it reads live dataset files). Measured count fell from 175 to 174 because the Family helper default was one occurrence. Assertion set to the measured value `toBe(174)` with an explanatory comment. Not a loosened threshold.

## Unresolved provenance reconciliation
39B findings 2: reviewer-related 2, source-related 0, other 0 (the 39B audit ties them to the reviewer metadata). Remaining 0.

## Pregnancy → Family handoff
Before MISSING. One link added in the existing "Getting ready for baby" group of `/pregnancy/preparing-for-baby`, directly after "Preparing siblings for a new baby": "Family life: siblings, relationships and home" → `/family`. After PARTIAL: one contextual editorial path where wider family life naturally arises; the hub and week pages deliberately stay unlinked to avoid presenting Family as a next stage. The discovery gap is resolved; further links would be redundant.

Other handoffs unchanged: First Year → Family PARTIAL / DEFERRED / NON-BLOCKING; Toddler → Family, Family → Pregnancy / First Year / Toddler / Journal COMPLETE.

## Locked deferred items
P3 12 / P4 12 remain deferred and non-blocking. The 2 INTERNAL_LINK_ONLY findings remain editorial findings. Childcare cost government links remain a periodic freshness concern only.

## Validation
Focused (39A, 39B, 39C, reviewer governance, Pregnancy 36A) 5 files / 45 tests PASS. Full suite 144 files / 1,630 tests PASS first run. Typecheck ×2 PASS. Lint 1 error / 10 warnings (baseline). Build PASS. Responsive 3/3: link 64px tall, visible focus, no overflow, 0 console errors, lands on `/family`. 39B historical tests pinned to the locked 39B documents.

## Final state
18 ready, 25 Family URLs, 0 duplicates, 18 well discovered, grounding 18 default deny with 0 candidates / approved / eligible, `AI_SOURCE_ROUTING_VERSION` unchanged, Family saved lifecycle NO.
