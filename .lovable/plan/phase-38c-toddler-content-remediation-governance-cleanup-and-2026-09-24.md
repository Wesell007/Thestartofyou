# Phase 38C — Toddler content remediation, governance cleanup and workstream closure

Scope: fix only the closure-level findings from 38B. No new articles, redesign, image changes, AI or grounding changes, database or lifecycle changes, and no deployment. The 38B documents stay as they are.

## 1. Owners confirmed from the repository (before editing)
- TAN = `understanding-toddler-tantrums`, topic `behaviour-emotions`, status ready, explicit hero mapping present.
- PTP = `potty-training-without-pressure`, topic `potty-learning`, status ready, explicit hero mapping present.
- HOM = `toddler-home-safety`, topic `health-safety`, status ready, explicit hero mapping present. It is also one of the three records with reviewer-metadata debt.
- Each article's current source records will be listed in the remediation doc before any edit.

## 2. The three expansions (additions only, in the existing voice)
- TAN: one new section on hitting and biting. It covers why it can happen, staying safe in the moment, calm and consistent boundaries without shame, co-regulation, realistic expectations of impulse control, and when to ask a health visitor or GP. No labels and no diagnosis.
- PTP: one new section on withholding. It covers fear, pressure and discomfort, keeping things calm, the link with constipation, and when to seek a GP or health visitor (NHS sourced). Night dryness is carried along only if one short NHS-supported paragraph fits naturally; otherwise it stays deferred.
- HOM: one new food-choking section built strictly from current NHS and St John Ambulance or British Red Cross guidance. It covers reducing risk (food preparation and eating while seated and supervised), gagging versus choking only where the source supports it, and calling 999. It links to the authoritative first-aid page rather than improvising step counts or sequences. Outdoor safety is carried along only if it is small and sourced; otherwise it stays deferred.
- Every new claim maps to a real, verified source record (the URL is fetched to confirm it). Gate: unsupported claims 0, NEEDS_SOURCE 0, new unresolved provenance 0.

## 3. Governance
- Inventory: update the 16 Toddler rows in `articleInventory.ts` to the existing values `currentStatus: "live"`, `contentState: "final"`, `recommendedAction: "keep"`. No other fields change.
- Reviewer debt: three records set `medicallyReviewed: true` and `reviewedBy: "Jenny Joines"`, and `withToddlerDefaults` fills in the same reviewer and a date. The repository holds no article-specific provenance, so the fix is to remove those fields from the three records and remove the reviewer/date defaulting from `withToddlerDefaults`, using the existing absence pattern. Nothing will be fabricated or rendered.

## 4. Deferred and untouched
BED cot to bed (DEFERRED P3), SPH, PLY, the friendships decision, A6/A8, sharing, and Toddler to Family (PARTIAL / DEFERRED / NON-BLOCKING). The 38A/38A.1 visuals, imagery, routes, sitemap strategy, TTC, Pregnancy and First Year all stay locked.

## 5. Validation
- New `src/test/phase38cToddlerRemediation.test.ts`: 16 ready articles; TAN/PTP/HOM section evidence with real sources; inventory 16/16 live/final/keep; reviewer fields absent (0 medicallyReviewed) and nothing rendered; routes and sitemap at 30 with no duplicates; related links valid with no orphans; grounding registry and `AI_SOURCE_ROUTING_VERSION` unchanged; 38A hub order unchanged.
- The 38B audit test is historical and asserts pre-remediation state (3 medically reviewed). It will be pinned to the 38B snapshot so it still passes, without changing the 38B docs or counts. That test file is the one exception to "38B untouched", and it will be reported.
- Run focused tests, Toddler regressions, the full suite, typecheck twice, lint against the baseline (1 error, 10 warnings) and a build. Report any first-run flake alongside the rerun.
- Playwright: the 3 articles at 1280, 834 and 390 (9 checks) for overflow, headings, lists, sources, related guidance, hero and Companion.

## 6. Documentation and closure
- Create `docs/content/phase38c-toddler-remediation.md` (finding, treatment, location, source, validation) and `docs/content/phase38c-toddler-closure.md` (measured final state).
- Append Phase 38C to `roadmap.md` only.
- Return the Section 21 report. Close as CLOSED PASS only if every Section 22 gate passes; otherwise report BLOCKED with the exact gate. No further phase is started.

## 7. Final governance safeguards (approved)
- `withToddlerDefaults` check before editing: report the records using the helper, the records that get reviewer data from it, and the records with and without genuine article-specific provenance. Remove only unsupported reviewer data: explicit `medicallyReviewed`, `reviewedBy` and the defaulted review date. Stop the helper from recreating them. Keep any proven provenance (targets: debt 0/3 remaining, fabricated 0, valid metadata removed 0).
- The 38B test stays historical. Its pre-remediation assertions (3 reviewer records, 16 stale rows) move to explicit 38B snapshot constants, labelled PRE-REMEDIATION. The 38C test asserts the CURRENT state. No app data is changed to satisfy 38B, and the 38B documents stay unchanged.
- Source verification: each new TAN, PTP or HOM claim is checked against the fetched source text, not just a working URL. Choking emergency steps are never reconstructed; the section links to the authoritative first-aid page instead.
- Inventory: only the 16 Toddler rows change (16/16 corrected, 0 remaining). No other records are touched.
- Phase 38C gets added to roadmap.md as the first build step.
