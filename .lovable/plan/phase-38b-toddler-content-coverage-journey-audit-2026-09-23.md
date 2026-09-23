# Phase 38B — Toddler Content Coverage & Journey Audit

Audit only. No content, UX, route, sitemap, inventory, image, AI, grounding, reviewer, database, lifecycle, analytics or deployment changes. 38A/38A.1, TTC, Pregnancy and First Year records stay untouched.

## 1. Re-measure repository truth (before any judgement)
Read-only scripts over the Toddler datasets, templates, route table, redirects and `public/sitemap.xml` to report every Section 2 count: hub, age and topic destinations, article records by status, canonical concrete public URLs, sitemap URLs and duplicates, broken routes, legacy/redirect routes, per-topic ownership, embedded Companion surfaces, discovery surfaces and image placements. Expected figures (1/5/8/16/30) are checked against measurements, never forced.

## 2. Article inventory (16 expected, measured denominator used)
One row per article: slug, title, topic, route, dataset status, inventory status, discovery surfaces, age relevance, editorial role, source state, related state, overlap state, and exactly one action (KEEP / EXPAND_EXISTING / MERGE / REPOSITION / INTERNAL_LINK_ONLY / ARCHIVE_CANDIDATE). Arithmetic has to reconcile.

## 3. Inventory drift ledger
Listed separately from content coverage: ready canonical articles, matching inventory rows, stale status rows, stale recommendedAction rows, publicly hidden articles, and the source of truth for public availability. Stale rows repaired = 0.

## 4. Journey model and classification
Every journey moment in Sections 5 to 9 gets one row: age, topic, parent intent, evidence, one coverage classification, owner, discovery strength, issue category, treatment and priority (P1 to P4). Shared cross-age moments are counted separately so the per-age totals and the overall total reconcile.

## 5. Surface and specialist audits
- All 5 age pages (Section 11) and all 8 topics (Section 12).
- Development safety, speech, behaviour, sleep, food, potty, health and safety, and play audits (Sections 13 to 20).
- Duplication, with technical duplicates kept separate from editorial overlap.
- Discovery and orphans, including a rendered link-integrity check.
- Claim risk and source record quality: structured vs label-only records, articles with no sources, and provenance concerns.
- AI-only needs, both handoffs (First Year to Toddler, Toddler to Family), and how editorial guidance, Companion and journal relate.
- New article candidates only where all five strict tests pass, plus tool, checklist and support opportunities.

## 6. Documents
- Create `docs/content/phase38b-toddler-content-coverage-audit.md` (measured truth, specialist audits, governance, completion report, outcome).
- Create `docs/content/phase38b-toddler-journey-gap-register.md` (journey rows, priorities, candidates, AI-only needs).
- Create `docs/content/phase38b-toddler-content-inventory.md` (article ledger, drift ledger, source records, discovery).
- Append the Phase 38B entry to `roadmap.md` only.

## 7. Validation
- Add a focused read-only audit test (`src/test/phase38bToddlerAudit.test.ts`). It checks routes, the article, age and topic inventories, link integrity, source counts, journey and priority arithmetic, and sitemap consistency. This is the only non-doc file added and it changes no product behaviour.
- Then run Toddler regressions, the full suite, typecheck twice, lint against the baseline (1 error, 10 warnings) and a production build. Any first-run failure is reported alongside the rerun.

## 8. Report and closure
Return the Section 34 completion report with measured values. Choose one outcome (A to D) only once the article, journey, priority, source and drift arithmetic all reconcile. Close as "PHASE 38B — TODDLER CONTENT COVERAGE & JOURNEY AUDIT / AUDIT COMPLETE / [OUTCOME]". Phase 38C does not start and no remediation begins.
