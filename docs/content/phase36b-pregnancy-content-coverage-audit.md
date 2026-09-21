# Phase 36B — Pregnancy content coverage audit

Audit only. No article, route, week, source, reviewer, grounding, AI or analytics changes were made, and nothing was deployed. Companion documents: `phase36b-pregnancy-content-inventory.md` (surfaces, articles, weeks, tools) and `phase36b-pregnancy-journey-gap-register.md` (journey matrix, gaps, claims, links).

## 1. Verdict

**AUDIT COMPLETE / MOSTLY SUFFICIENT / SMALL GAPS** (Outcome B).

The combined ecosystem — 1 hub, 6 topic pages, 3 trimester surfaces, 42 week modules, 104 article records, 2 tools, 1 public support hub and the IVF crossover — covers the Pregnancy journey adequately and safely. 64 journey moments were audited: 45 covered, 9 partially covered, 0 uncovered. There are no current release blockers. What remains is a small, evidence-backed cleanup rather than a content programme.

## 2. Coverage assessment

Coverage is not thin. Every stage from a positive test to going past due dates has an owning surface, and every week module carries a seek-support block and a disclaimer. The nine partial moments are all cases where real material exists in prose but no surface owns it (hyperemesis, labour pain relief, pre-eclampsia, travel, antenatal classes, telling people, the partner role) or where an existing owner sits in another hub (miscarriage support, the First Year handoff).

New article candidates: **0**. Every thin area already has an owner that would be cannibalised by a new record, so the recommended treatments are expansion, internal linking and two handoffs.

## 3. Discoverability

- **A. In-site navigation** — the hub receives 78 inbound references; health-and-safety 36, body 20, baby 13, feelings 7, diet-and-exercise 12, preparing-for-baby 13; trimesters 22/18/18; the preparing-for-baby hub 15; the calculator 5; the IVF crossover 5. Two articles have no in-site path, and one has only a related-list reference.
- **B. Internal findability** — all 104 records are reachable through article search and related guidance; the 2 orphans remain searchable.
- **C. Indexability** — all Pregnancy surfaces emit into the sitemap; indexable legacy or duplicate surfaces 0; draft leakage 0.

## 4. Handoff verdicts

| Handoff | Verdict |
| --- | --- |
| TTC → Pregnancy | Already locked and unchanged (Phase 35C) |
| IVF → Pregnancy content handoff | COMPLETE |
| Pregnancy → IVF crossover | COMPLETE |
| Pregnancy → Loss support handoff | PARTIAL — one article reference; the dedicated loss records sit on the TTC side and no Pregnancy surface offers a support path |
| Pregnancy → First Year content handoff | PARTIAL — exactly one editorial link, in the third-trimester deeper-reading strip; weeks 40, 41 and 42 end inside Pregnancy |
| Pregnancy → First Year lifecycle routing | COMPLETE — `resolvePublicAccountLink` routes correctly; three lifecycles unchanged (ttc, pregnancy, first_year) |

## 5. Required counts

Surfaces: hub 1; topic routes 6; trimester routes 3; week modules 42/42; tool routes 2; public support surface 1; crossover surfaces 2; legacy or redirect Pregnancy surfaces 0; broken routes 0.

Articles: Pregnancy-specific and crossover records 104; live 85; draft 0; unknown 19; duplicate or shadowed 0; orphaned 2; weak-discovery 1; orphaned non-article surfaces 0; broken internal links 0; stale related references dropped before render 4; wrong-destination links 0; indexable legacy or duplicate surfaces 0.

Imagery: missing explicit hero 92; using fallback hero 92; missing expected body imagery 89; week modules missing expected media 0.

Journey: moments audited 64; covered 45; partially covered 9; uncovered 0; not required standalone 2; better served elsewhere 8; arithmetic reconciled.

Article actions: KEEP 96; EXPAND_EXISTING 5; MERGE 2; REPOSITION 0; INTERNAL_LINK_ONLY 1; ARCHIVE_CANDIDATE 0 (total 104).

Remediation: new article candidates 0; week modules requiring remediation 0; tool opportunities 1; checklist opportunities 2.

Claims and sources: unsupported medical or numerical claims 14 (articles 14, hub/topic 0, trimester 0, week 0); unresolved-provenance week claims 311; medication-safety wording concerns 0; material needs covered only by AI 0; source records 351 — structured verified 225, label-only 126, missing 5 articles with no records, unresolved provenance 42 week modules.

Governance: reviewer claims added 0; grounding changes 0 (approvals 0, candidates 0, no drift found); source behaviour changes 0; current Pregnancy release blockers 0.

## 6. Recommended single follow-up (not started)

**Phase 36C — Pregnancy closure cleanup.** Smallest justified scope: restore the 4 stale related-article references, give the 2 orphans one honest inbound path each, add one loss-support handoff and one Pregnancy → First Year handoff, merge the duplicate birth-plan records, and fold hyperemesis, labour pain relief and pre-eclampsia into their existing owners. No new articles, no new routes, no grounding or reviewer changes. On completion the Pregnancy workstream can be closed for the current strategy.
