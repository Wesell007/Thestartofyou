# Phase 32E — Existing Content Improvement Remediation

No new articles, no new URLs, no deployment. Phases 31 and 32A–32D stay closed; their drafts stay unpublished and are read only for ownership and duplicate checking.

## Confirmed inputs (read before planning)

`phase31-existing-content-actions.csv` holds exactly 52 rows: 28 EXPAND_EXISTING, 16 NO_ACTION, 5 IMPROVE_INTERNAL_LINKING, 2 IMPROVE_TOOL_CONTENT, 1 RESOLVE_CANONICAL. Priorities: P0 4, P1 12, P2 13, P3 23. Domains: Pregnancy 28, First Year 9, TTC 8, Postpartum 3, Toddler 2, IVF 1, Family 1.

The four P0 rows are C006 (week-page linking), C001 (due-date tool content), C017 (pelvic girdle pain expansion) and C080 (lochia — already a Phase 32C safety-hold item).

Additional expansion records to fold in: 32B (milestone timing on `baby-development-in-the-first-year`, escalation clarity on `when-milestones-feel-uneven`, teething age context, sleep-change age context), 32C (lochia on `healing-after-birth`, pelvic floor/bladder/bowel on `body-changes-after-birth`, two internal-link actions), 32D conversions (C074 tummy time, C063 sleep training, C028 brown discharge, C016 rhinitis, C029 subchorionic haematoma) plus the earlier converted C065.

## 32E.1 — Reconciliation and risk gate (no edits)

Build `docs/content/phase32e-action-reconciliation.md`: one register, unique ID per action, with source phase, source cluster, domain, route/slug, page type, current owner, improvement intent, original action, overlap yes/no, merged ID, publication state, review state, risk classification, priority, exactly one implementation status, and reason.

Statuses used: READY_TO_IMPLEMENT_LOW_RISK, READY_TO_IMPLEMENT_EDITORIAL, HOLD_HEALTH_REVIEW, HOLD_SAFETY_REVIEW, HOLD_DEVELOPMENT_REVIEW, HOLD_EDITORIAL_REVIEW, MERGED_WITH_ANOTHER_ACTION, NO_LONGER_REQUIRED, DEFER_TO_32F_INTERNAL_LINKING, DEFER_TOOL_WORK.

Known overlaps to merge rather than double-count: C080 (Phase 31) with the 32C lochia expansion; C046 (Phase 31 linking) with the 32C postnatal pelvic-floor expansion; C065 with the 32B milestone work; C061 baby vision with the milestone/development owner; C071 and C073 both targeting `bottle-and-breastfeeding-questions`; C020 and C024 both targeting `/pregnancy/body`; the 32C link actions and the five Phase 31 IMPROVE_INTERNAL_LINKING rows, which all defer to 32F.

Before any edit each surviving action is re-tested against current repository content: what the page owns now, the exact remaining gap, whether another page has absorbed the intent, whether the expansion is still needed, and whether the edit would create overlap. Old recommendations that current content already satisfies become NO_LONGER_REQUIRED.

Arithmetic is reported in full: 52 original, plus 32B, 32C and 32D records, gross considered, merged, no-longer-required, deferred to 32F, final unique actions, then the Lane A / Lane B split. If it does not reconcile, the phase stops there.

## Lane assignment

Lane A (implement in runtime content): low-risk and editorial improvements that add no new health, safety or developmental claim. Expected candidates include weeks-to-months context, metallic taste, breast and skin changes on `/pregnancy/body`, nesting on the third-trimester page, bathing a newborn, sun safety, travelling with a baby, twins, weight changes, potty training, cycle cramps, ovulation-test edge cases, conception-chance questions, and stage context on month pages.

Lane B (documentation only): lochia (SAFETY), pelvic floor postnatal (HEALTH), subchorionic haematoma (HEALTH, escalating to SAFETY if escalation wording changes), brown discharge if escalation wording expands (SAFETY), rhinitis (HEALTH), milestone timing and uneven-milestone escalation (DEVELOPMENT), sleep-training framing and any safe-sleep additions (EDITORIAL or SAFETY per evidence), SPD/pelvic pain, bleeding after sex, induction, safe sleep and SIDS, growth spurts, feeding amounts. These go into `docs/content/phase32e-review-hold-expansions.md` with route, current owner, missing intent, exact proposed section, sources, claims supported, claims excluded, escalation wording, classification and publication recommendation. Human reviews completed in 32E = 0.

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
