# Phase 36B — Pregnancy Content Coverage & Journey Audit

Audit only. No new content, no content rewrites, no route/week/AI/grounding/reviewer changes, no deployment. The only files written are the three new audit documents plus a roadmap entry.

## Locked starting state

- Phase 36A and 36A.1 stay closed and unedited; Pregnancy UX is treated as approved.
- TTC workstream stays closed; saved lifecycles remain ttc, pregnancy, first_year.
- Grounding, reviewer governance, Companion runtime and source records are read-only.

## What the audit will cover

**Surface inventory** — every visitor-facing Pregnancy surface traced from real route registration, not filenames: the hub, the six canonical topic routes (/pregnancy/body, /baby, /feelings, /health-and-safety, /diet-and-exercise, /preparing-for-baby), three trimester routes, the parameterised week route with all 42 week modules, the due-date calculator and results pages, the Pregnancy toolkit surfaces, preparing-for-baby and journey-support surfaces, IVF early-pregnancy crossover, loss and postpartum crossovers, saved-journey and Companion surfaces, plus legacy routes, redirects, drafts, duplicates and sitemap-emitted URLs. Each surface gets exactly one type classification (HUB, TOPIC_PAGE, TRIMESTER_PAGE, WEEK_PAGE, ARTICLE, TOOL, SUPPORT_SURFACE, IVF_CROSSOVER, FIRST_YEAR_CROSSOVER, LOSS_CROSSOVER, JOURNEY_SURFACE, REDIRECT, LEGACY).

**Article inventory** — every Pregnancy-specific and Pregnancy-crossover article record with slug, title, topic, status, route, live/draft/unknown, discoverability, placements, inbound and outbound links, image state, source state, sensitivity, grounding metadata state, duplicate/shadow state, and exactly one action (KEEP, EXPAND_EXISTING, MERGE, REPOSITION, INTERNAL_LINK_ONLY, ARCHIVE_CANDIDATE).

**Week inventory** — all 42 modules audited separately: trimester, indexability, baby development, maternal guidance, health/safety, sources, destinations, media, duplication, missing expected sections, broken destinations, recommendation.

**Trimester inventory** — unique value versus duplicated week navigation for each of the three surfaces; no trimester page removed simply because week pages exist.

**Discoverability** — three separate dimensions kept apart: in-site navigation, internal findability, and sitemap/index state. Orphan means no meaningful in-site path. Every WEAK_DISCOVERY call carries a written reason based on link prominence, parent relevance, wording and journey context, not raw inbound-link count.

**Journey coverage** — an end-to-end Pregnancy moment matrix built from repository truth, covering positive test and entry, early pregnancy, first/second/third trimester care, your body, your baby, feelings, health and safety, diet and exercise, antenatal care and tests, common conditions, medication boundaries, loss crossover, IVF boundary, preparing for baby, labour and birth preparation, due date and overdue, First Year handoff, and partner support. Each moment receives exactly one classification and the arithmetic reconciles exactly against the totals.

**Safety and provenance** — unsupported medical/numerical claims counted and broken down by hub/topic, articles, trimester, week pages; medication-safety wording concerns counted; source records classified STRUCTURED_VERIFIED / LABEL_ONLY / MISSING / UNRESOLVED_PROVENANCE. Nothing is repaired in this phase. Any grounding registry drift is reported, not fixed.

**Duplication, tools, Companion, imagery** — cannibalisation register with per-item treatment; tool inventory plus assessment of checklist/tool opportunities (assessed, not built); count of material needs reachable only through Companion; image completeness counts for heroes, fallbacks, body imagery and week media.

**Shortlists and gap register** — new-article shortlist with justification tests applied (no quota, NEW_ARTICLE never the default), expansion shortlist, merge/reposition/archive shortlist, week-remediation shortlist, and one final gap register with P1/P2/P3 priorities. Blockers are separated from future enhancements.

## Deliverables

- `docs/content/phase36b-pregnancy-content-inventory.md`
- `docs/content/phase36b-pregnancy-journey-gap-register.md`
- `docs/content/phase36b-pregnancy-content-coverage-audit.md`
- `roadmap.md` — appended Phase 36B entry only; 36A, 36A.1 and Phase 35 TTC history left untouched.

## Validation

Pregnancy content/data tests, Pregnancy route tests, week and trimester route integrity, article route tests, link integrity, sitemap/indexability checks, full suite, typecheck twice, lint against the existing baseline. Source behaviour changes = 0. Deployment = NO.

## Closure

The completion report returns all required counts and handoff verdicts, then exactly one outcome: A (Pregnancy complete, workstream locked closed), B (mostly sufficient, one smallest justified follow-up phase recommended but not started), or C (material gaps, evidence-backed remediation sequence returned, not started).
