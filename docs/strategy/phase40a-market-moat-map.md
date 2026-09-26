# Phase 40A — Market commodity test, moat map and anti-roadmap

Three evidence classes are kept apart:

- REPOSITORY EVIDENCE (R): what this codebase contains (capability map #).
- EXTERNAL MARKET EVIDENCE (E): dated sources below.
- STRATEGIC INFERENCE (I): reasoning from R and E.

Every competitive claim carries one label: VERIFIED_CURRENT_MARKET_EVIDENCE (VME), SUPPORTED_STRATEGIC_INFERENCE (SSI) or STRATEGIC_HYPOTHESIS_NOT_MARKET_VERIFIED (HYP).

## External evidence register (checked 2026-09-26)

| ID | Source | Published / updated | Supports exactly |
|---|---|---|---|
| E1 | Huckleberry, "Berry: 24/7 guidance", huckleberrycare.com/blog/berry | published 2025-10-15, updated 2026-01-13 | a parenting app shipped an AI chat that uses a child's logged data |
| E2 | PR Newswire, "Huckleberry Launches Berry" | 2026-02-05 | a competitor markets "context-aware AI" using family context and reducing mental load |
| E3 | Huckleberry Premium page | undated | Berry "remembers key details and context" (current claim only; not proof of when) |
| E4 | trymycocoon.com "Flo vs BabyCenter" (third party) | updated 2026-08-23 | Flo ships an AI feature (Ask Flo) and a clinician-reviewed library; BabyCenter tracks beyond birth |

Undated pages are not used as proof of history or leadership. No source was found or used that measures UK market share.

## Commodity test

| Capability | Class | Label |
|---|---|---|
| AI chat | COMMODITY | VME (E1, E4) |
| Pregnancy-week content | COMMODITY | VME (E4) |
| Baby-age content | COMMODITY | SSI |
| Calculators | COMMODITY | SSI |
| Trackers (feeds, sleep, cycle) | COMMODITY | VME (E1) |
| Journalling by itself | COMMODITY | SSI |
| Saved journey / stage context for AI | EXPECTED_CATEGORY_FEATURE | VME (E2) |
| AI memory by itself | EXPECTED_CATEGORY_FEATURE | VME (E3, current claim) |
| Expert-sourced content | EXPECTED_CATEGORY_FEATURE | VME (E4) |
| Safety escalation wording | EXPECTED_CATEGORY_FEATURE | SSI |
| Preparation checklists (bag, birth plan) | EXPECTED_CATEGORY_FEATURE | SSI |
| Journey-aware Companion + calm editorial + next actions across three lifecycles | DIFFERENTIATING_WHEN_COMBINED | HYP |
| Deterministic safety routing + provenance governance made visible | DIFFERENTIATING_WHEN_COMBINED | HYP |
| Answer → action into the user's own preparation tools | DIFFERENTIATING_WHEN_COMBINED | HYP |
| Physical keepsake + private digital memories | DIFFERENTIATING_WHEN_COMBINED | HYP |
| Longitudinal, permissioned continuity across lifecycles | POTENTIAL_SYSTEM_MOAT | HYP |
| Trust and safety governance system | POTENTIAL_SYSTEM_MOAT | HYP |

Counts: COMMODITY 6, EXPECTED 5, DIFFERENTIATING 4, POTENTIAL MOAT 2.

Key inference (SSI): "AI that knows your child/journey" is no longer distinctive (E1–E3). Distinctiveness must come from what a trusted, calm, cross-stage system does with context, not from having context.

## Moat map

| # | Moat | Foundation | Copyability | Compound value | Dependencies | Privacy/safety cost | Recommendation |
|---|---|---|---|---|---|---|---|
| 1 | Structured parenthood knowledge graph | PARTIAL (typed datasets, inventory, topics; R) | MODERATE | MEDIUM | grounding approvals | low | STRENGTHEN |
| 2 | Longitudinal journey context | PARTIAL (#15, #34, #37) | MODERATE | HIGH | TTC → pregnancy handoff | medium | BUILD |
| 3 | Permissioned user memory | WEAK (built, OFF #21) | EASY (E3) | MEDIUM alone | privacy release | high | HOLD until #2 and trust UI |
| 4 | Trust / safety routing | PARTIAL (#12 live; #27, #28 blocked) | DIFFICULT to do honestly | HIGH | human review capacity | reduces risk | STRENGTHEN |
| 5 | Cross-product Companion orchestration | PARTIAL (#14) | MODERATE | HIGH | #43 | medium | BUILD (narrow) |
| 6 | Guidance → action conversion | WEAK (#43 absent; toolkit exists) | EASY per feature | HIGH as system | toolkit tables | low | BUILD |
| 7 | Digital + physical memory continuity | WEAK (#10 live, #36 absent) | MODERATE | MEDIUM | export, packaging | medium | HOLD |
| 8 | Calm / low-mental-load philosophy | STRONG (no streaks, design rules) | EASY to claim, hard to keep | MEDIUM | discipline | none | STRENGTHEN |

### Six questions for each potential system moat

**Longitudinal, permissioned continuity (moats 2 + 3 + 5)**
1. Value that compounds: every stage starts already understood; less re-explaining; answers reflect what was chosen to be kept.
2. Accumulating asset: the user's own consented record across TTC → pregnancy → first year (archived chapters, reflections, saved preferences).
3. Why copying the feature is insufficient: the value is the user's history with this product, which a competitor cannot import.
4. Easy to reproduce: memory UI, stage context in prompts (E2, E3).
5. Still hard after copying: earning consent for long-lived sensitive context, and doing transitions (including loss) with care.
6. Evidence: R (#34, #37 transition live partial); E2/E3 show the category moving here. Label: HYP.

**Trust and safety governance system (moat 4)**
1. Value: people know when to rely on an answer and when to call someone.
2. Asset: provenance registry, approval records, eval dataset, deterministic routing rules.
3. Why copying is insufficient: labels without real review behind them are just words; the governance record is the asset.
4. Easy: disclaimers and "sources" footers.
5. Hard: refusing to claim what is not reviewed, and maintaining per surface provenance over time.
6. Evidence: R (#12, #27, #28, governance docs). No external measure of competitor governance quality found. Label: HYP.

## Anti-roadmap

| Item | Decision |
|---|---|
| Social network / community feed | DO NOT BUILD |
| Gamification | DO NOT BUILD |
| Streaks | DO NOT BUILD |
| Autonomous health decisions | DO NOT BUILD |
| Uncontrolled AI memory | DO NOT BUILD |
| Features built only because competitors have them | DO NOT BUILD |
| More lifecycle breadth for its own sake | REVISIT AFTER continuity across the existing three is complete |
| Every possible tracker | REVISIT AFTER a tracker can show a clear value return |
| Voice before core continuity | REVISIT AFTER continuity and trust layers ship |
| Always-on proactive nudges | REVISIT AFTER permissioned memory ships with explicit opt-in |
| Complex family management software | DEFER |

Do not build 6. Deferred / revisit 5.
