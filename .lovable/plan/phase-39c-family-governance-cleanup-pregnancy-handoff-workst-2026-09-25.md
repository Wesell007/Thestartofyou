# Phase 39C — Family Governance Cleanup, Pregnancy Handoff & Workstream Closure

Record keeping plus one contextual link. No new articles, expansions, redesign, AI, grounding, database, lifecycle or deployment changes.

## Verified baseline (read before planning)
- 18 ready Family articles in `familyArticleData.ts`.
- Inventory: 12 existing Family rows are `draft` / `placeholder` / `publish`; 6 ready guides have no row (second-time-parenting, staying-connected-as-parents, calmer-evenings-after-busy-days, family-sick-days-at-home, planning-family-days-out, simple-family-play-ideas). Governance issues = 18 (12 stale + 6 missing).
- Reviewer metadata: 2 records set `medicallyReviewed: true` (`making-your-home-safer`, `when-to-ask-for-help`). No explicit `reviewedBy` in the raw records; `withFamilyDefaults` fabricates `reviewedBy: "Jenny Joines"` and a `"2026-07"` fallback date from that flag. Provenance registry is empty, so genuine provenance = 0, unsupported = 2, rendered claims = 0.
- 39B audit states "UNRESOLVED_PROVENANCE 2 (the reviewer metadata above)", so reviewer-related 2, source-related 0, other 0.
- Pregnancy → Family: MISSING. The Pregnancy "Preparing for baby" topic has a "Getting ready for baby" group that already links "Preparing siblings for a new baby" and ends with a First Year look-ahead group.

## Changes
1. **Inventory** (`articleInventory.ts`): set the 12 Family rows to `live` / `final` / `keep` (only those three fields). Add 6 rows using the exact Family row shape and the same values. No other rows touched.
2. **Reviewer cleanup** (`familyArticleData.ts`): remove `medicallyReviewed: true` from the two records and remove the Family-only `reviewedBy` / date fallback in `withFamilyDefaults` after confirming all consumers (Family cards already gated by `hasReviewClaim`). Explicit `lastUpdated: "July 2026"` editorial dates stay. Other datasets untouched.
   - **Phase 33.5 reviewer-count test:** first classify it. It reads live dataset files, so it is treated as CURRENT state unless inspection shows otherwise. Measure the real count after cleanup; change the assertion only if it now fails, set it to the measured supported count (not a looser threshold), update the comment explaining the drop (Family helper default removed, like 38C), and document it. If it proves HISTORICAL, preserve the 33.5 count in a locked snapshot rather than reading current Family data. No threshold changed only to pass; historical evidence rewritten 0; current assertion falsified 0.
3. **Pregnancy handoff** (`pregnancyTopicData.ts`): add one link in the existing "Getting ready for baby" group, directly after "Preparing siblings for a new baby": label "Family life: siblings, relationships and home", href `/family`. Uses the existing group link pattern; no new section, no lifecycle wording.

## Tests
- New `src/test/phase39cFamilyClosure.test.ts`: 18 ready; 18/18 matching rows all live/final/keep; 0 missing; 0 `medicallyReviewed`/`reviewedBy` in Family; 0 review claims; provenance arithmetic; Pregnancy handoff to `/family` present exactly once in Pregnancy topic data; saved lifecycles remain ttc/pregnancy/first_year; 25 unique Family sitemap URLs; all 18 discovered with image mappings; grounding 18 default-deny, 0 candidate/approved/eligible; `AI_SOURCE_ROUTING_VERSION` unchanged; 39A/39A.1 hub order unchanged.
- Pin `phase39bFamilyAudit.test.ts` stale inventory and reviewer assertions to the locked 39B documents instead of live data (the grounding assertions stay live since grounding is unchanged).

## Validation
Focused, Family and Pregnancy regressions, full suite, typecheck x2, lint vs baseline (1 error / 10 warnings), build. Responsive check of `/pregnancy/preparing-for-baby` at 1280/834/390: link visible, destination, focus, touch target, no overflow, no console errors. Flakes reported as first run and rerun.

## Documentation
Create `docs/content/phase39c-family-governance-closure.md`; append 39C to `roadmap.md` only. 39A, 39A.1 and 39B docs untouched.

## Expected closure
First Year → Family stays PARTIAL / DEFERRED / NON-BLOCKING. Pregnancy → Family after = PARTIAL (one contextual path from the preparing topic; hub and weeks deliberately not linked) with the discovery gap resolved. If all gates pass, close with the exact required wording; otherwise report BLOCKED with the failed gate. Deployment NO. No further phase started.
