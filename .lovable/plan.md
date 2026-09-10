# Phase 32E — Existing Content Improvement Remediation

No new articles, no new URLs, no deployment. Phases 31 and 32A–32D stay closed; their drafts stay unpublished and are read only for ownership and duplicate checking.

## Confirmed inputs (read before planning)

`phase31-existing-content-actions.csv` holds exactly 52 rows: 28 EXPAND_EXISTING, 16 NO_ACTION, 5 IMPROVE_INTERNAL_LINKING, 2 IMPROVE_TOOL_CONTENT, 1 RESOLVE_CANONICAL. Priorities: P0 4, P1 12, P2 13, P3 23. Domains: Pregnancy 28, First Year 9, TTC 8, Postpartum 3, Toddler 2, IVF 1, Family 1.

The four P0 rows are C006 (week-page linking), C001 (due-date tool content), C017 (pelvic girdle pain expansion) and C080 (lochia — already a Phase 32C safety-hold item).

Additional expansion records to fold in: 32B (milestone timing on `baby-development-in-the-first-year`, escalation clarity on `when-milestones-feel-uneven`, teething age context, sleep-change age context), 32C (lochia on `healing-after-birth`, pelvic floor/bladder/bowel on `body-changes-after-birth`, two internal-link actions), 32D conversions (C074 tummy time, C063 sleep training, C028 brown discharge, C016 rhinitis, C029 subchorionic haematoma) plus the earlier converted C065.

## 32E.1 — Reconciliation and risk gate (no edits)

Build `docs/content/phase32e-action-reconciliation.md`: one register, unique ID per action, with source phase, source cluster, domain, route/slug, page type, current owner, improvement intent, original action, overlap yes/no, merged ID, publication state, review state, risk classification, priority, exactly one implementation status, and reason.

Statuses used: READY_TO_IMPLEMENT_LOW_RISK, READY_TO_IMPLEMENT_EDITORIAL, HOLD_HEALTH_REVIEW, HOLD_SAFETY_REVIEW, HOLD_DEVELOPMENT_REVIEW, HOLD_EDITORIAL_REVIEW, MERGED_WITH_ANOTHER_ACTION, NO_LONGER_REQUIRED, DEFER_TO_32F_INTERNAL_LINKING, DEFER_SEO_ARCHITECTURE, DEFER_TOOL_WORK, OTHER (explained).

Gross records: 52 Phase 31 rows + 4 distinct 32B records + 4 distinct 32C records + 5 distinct 32D conversions = 65 expected. C065 is provenance only and contributes 0 additional records, since its milestone work is already represented in the 32B package. If the 32B or 32C documents prove a different number of distinct records, repository truth wins and the discrepancy is reported rather than forced to 65.

All 16 Phase 31 NO_ACTION rows stay in the register and receive a terminal status (normally NO_LONGER_REQUIRED after a current-content re-check). They never count as Lane A work.

C052 RESOLVE_CANONICAL is inspected and answered in writing: route involved, canonical currently rendered, canonical that should own the intent, and whether the issue persists. Resolved becomes NO_LONGER_REQUIRED; still present becomes DEFER_SEO_ARCHITECTURE, never OTHER and never folded into the 32F linking bucket. Canonical architecture is not changed in this phase.

The two IMPROVE_TOOL_CONTENT rows (C001, C002) are inspected separately. Copy-only improvements that touch no calculation, business logic, saved state, medical interpretation or routing may enter Lane A after the claim-level risk check; anything altering tool behaviour becomes DEFER_TOOL_WORK. C004 stays outside 32E entirely.

Known overlaps to test, merging only where the same page change is required: C080 with the 32C lochia expansion; C046 with the 32C postnatal pelvic-floor work; C065 provenance with the 32B milestone expansions; C061 baby vision with development/milestone ownership; C071 with C073 on `bottle-and-breastfeeding-questions`; C020 with C024 on `/pregnancy/body`; the five Phase 31 link rows with the 32B/32C link recommendations, all normally DEFER_TO_32F_INTERNAL_LINKING and merged before counting.

Before any edit each surviving action is re-tested against current repository content: what the page owns now, the exact remaining gap, whether another page has absorbed the intent, whether the expansion is still needed, and whether the edit would create overlap.

Arithmetic reported in full: 52, 32B additions, 32C additions, 32D additions = 5, C065 double-count prevented, gross, merged, no-longer-required, 32F deferrals, SEO/canonical deferrals, tool deferrals, final unique actions, then the Lane A / Lane B split by review type. If it does not reconcile, the phase stops there.

## Lane assignment

Every surviving action passes one claim-level test before implementation: does this edit introduce or materially change a factual claim that could affect health, safety, development or clinical decision-making? No means Lane A; yes means the matching Lane B hold. Topic tone is never the test, and no existing review classification is weakened to raise the count of runtime edits. Conception-chance questions, ovulation-test edge cases, bathing a newborn, sun safety, travelling with a baby, weight changes, twins, any feeding amounts and any symptom interpretation are each examined against this test rather than assumed editorial.

Lane A (implement in runtime content): only actions that pass the test, such as structure, terminology, stage context and clearer intent coverage that repeat claims already carried by the page.

Lane B (documentation only): lochia (SAFETY), pelvic floor postnatal (HEALTH), subchorionic haematoma (HEALTH, escalating to SAFETY if escalation wording changes), brown discharge where escalation wording expands (SAFETY), rhinitis (HEALTH), milestone timing and uneven-milestone escalation (DEVELOPMENT), sleep-training framing and any safe-sleep additions (EDITORIAL or SAFETY per evidence), plus SPD/pelvic pain, bleeding after sex, induction, safe sleep and SIDS, growth spurts and feeding amounts as the risk check decides. These go into `docs/content/phase32e-review-hold-expansions.md` with route, current owner, missing intent, exact proposed section, sources, claims supported, claims excluded, escalation wording, classification and publication recommendation. Human reviews completed in 32E = 0.


## Ownership rules carried in

- Milestones: broad timing context on `baby-development-in-the-first-year`; variation and comparison anxiety on `when-milestones-feel-uneven`. No third milestone page, no duplicated tables.
- Tummy time: expansion inside the development owner only; month pages get one line of age context and a link.
- Sleep training: `helping-your-baby-settle` owns settling approaches; the unpublished sleep-changes draft owns regressions. No named-method manual, no guaranteed outcomes.
- Brown discharge: TTC context to `spotting-during-the-two-week-wait`, pregnancy context to `discharge-in-pregnancy`.
- Rhinitis: bounded section in `cold-and-flu-in-pregnancy`, keeping cold, flu, allergy and rhinitis distinct.
- Subchorionic haematoma: bounded section in `bleeding-in-early-pregnancy`, non-diagnostic and safety-forward.
- Structured pages give stage-specific context and links, never copies of evergreen bodies. No repeated paragraph across 13 month pages or 42 week pages.
- Toddler and Family stay complete for current strategy: quality only, no scope broadening.

## 32E.2 / 32E.3 — Lane A implementation

Edit only the article and structured-page data the register names, in priority order P0 to P2, P3 only where trivially useful. Preserve slug, canonical, route, status, purpose, design system and voice. Smallest useful change; no rewrites of already-strong articles. Pure internal-link work is deferred to 32F.

## 32E.4 — Hold pack and reporting

Write the hold pack, then `docs/content/phase32e-implementation-report.md` listing every page actually edited with route, previous purpose, action, exact sections changed, review classification, why it was safe, and duplicate risk before and after. No empty files.

## Validation

Before runtime edits, confirm the baseline (expected 115 test files, 1289 tests passing, lint 1 error / 10 warnings). If it has drifted, stop and report the exact difference rather than forcing the old numbers. After Lane A: full test suite, typecheck twice, lint against baseline, production build. Then confirm zeros for new articles, new URLs, status changes, lifecycle states, routes, navigation, sitemap, SEO, AI, grounding, journal, memory, voice, database/schema/RLS and deployments.

Close with the 34-point report, the exact 32F internal-linking and cannibalisation workload, and stop before Phase 32F.
