# Phase 37C — First Year Content Coverage & Journey Audit

Audit only. No content created or edited, no UX, route, image, AI, grounding, database, lifecycle or analytics changes, no deployment. Phases 37A, 37A.1, 37B and 37B.1 remain locked.

## Verified baseline (read from the repository just now)

- Hub `/first-year`, pathways `/first-year/baby` and `/first-year/postpartum`
- 4 phase routes, 13 month destinations, 8 topic routes (4 Baby, 4 Postpartum)
- Article route pattern `/first-year/:topic/:slug`
- Legacy `/postpartum*` redirects present
- Article record count and Baby/Postpartum ownership will be measured in step 1 rather than assumed; the expected figure is 26 (15 Baby, 11 Postpartum) with 26/26 heroes, 0 suppressions and a 354-URL sitemap.

## What the audit will do

1. Re-measure baseline truth: routes, topics, phases, months, article records, ownership split, hero/suppression counts, sitemap total. Report measured truth before any expected figure.
2. Build the complete First Year surface inventory: hub, pathways, topics, phases, months, articles, cross-stage and support surfaces, legacy/redirect surfaces, any indexable duplicates.
3. Article inventory audit: for every record capture slug, title, ownership, topic, status, route, discovery surfaces, canonical role, content state, source state, related-guidance state and exactly one recommendation (KEEP, EXPAND_EXISTING, MERGE, REPOSITION, INTERNAL_LINK_ONLY, ARCHIVE_CANDIDATE). Actions must reconcile exactly to the measured article total.
4. Baby journey coverage matrix across newborn/early weeks, 3–6, 6–9 and 9–12 months, using the listed intents as audit prompts only.
5. Postpartum coverage matrix across early postpartum, ongoing recovery and later first year, tested across the whole year rather than assuming a six-week end.
6. Classify every journey moment as COVERED, PARTIALLY_COVERED, UNCOVERED, NOT_REQUIRED_STANDALONE or BETTER_SERVED_ELSEWHERE, with side, stage, intent, evidence surfaces, current owner, discovery strength, recommended treatment and P1–P4 priority. Arithmetic must reconcile.
7. Month-by-month audit of all 13 destinations: route validity, meaningful content, stage progression, baby and parent context, link integrity, stale slugs, wrong destinations, duplication, provenance, visuals unchanged.
8. Phase-page audit of all four pages, specifically looking for repeated material, missing later-stage guidance and early-postpartum overrepresentation versus thin later recovery.
9. Topic audit of all eight pages: Start Here quality, library completeness, orphans, weak discovery, duplicated intent, ownership, missing high-value intent, AI-only dependency.
10. Duplication audit separating technical duplicates from editorial overlap, with a recommendation per overlap group and nothing merged.
11. Discovery/orphan audit per article (inbound links, pathway, topic, phase, related guidance, article-to-article) classified WELL_DISCOVERED, WEAK_DISCOVERY or ORPHANED, plus broken, wrong-destination and silently dropped references.
12. Source and claim risk audit, classifying each finding SUPPORTED, REWORD, REMOVE, NEEDS_SOURCE or UNRESOLVED_PROVENANCE, with no remediation and no invented sources.
13. Source record quality counts: structured/verified, label-only, none, and phase/month provenance concerns.
14. Milestone safety review, feeding coverage, sleep coverage, care/safety coverage and postpartum safety/support coverage, each separating true content gaps from weak discovery.
15. AI-only need audit: needs answerable only through Companion/Ask/AI search, classified EDITORIAL CONTENT SHOULD EXIST, BETTER SERVED BY AI or NOT REQUIRED.
16. Handoff audit: Pregnancy → First Year (verify still intact), First Year → Toddler content and lifecycle routing, First Year → Family discoverability, Baby ↔ Postpartum cross-linking.
17. New article candidates only where the strict five-part test passes, each recorded with intent, stage, evidence, why no existing owner works, and priority. Backlog kept small.
18. Tool/checklist/journey-feature/support-surface opportunities where an article is the wrong answer.

## Route definitions versus concrete public URLs

Route patterns such as `/first-year/:topic/:slug` are counted separately from the concrete URLs they serve, and a pattern is never counted as an extra visitor-facing surface on top of its articles. Month destinations stay their own inventory field at 13, counted as canonical routes only where repository truth shows 13 distinct public URLs; if any are anchors, stateful destinations, parameter values or shared-route variants, the exact mechanism is reported instead of inflating the count.

Reported: canonical route definitions, concrete canonical First Year public URLs, hub URLs, pathway URLs, topic URLs, phase URLs, month destinations (13), month destinations that are distinct public URLs, article URLs, legacy/redirect URLs, indexable canonical duplicate URLs, sitemap URLs attributable to First Year.

## Legacy / canonical route accounting (separate ledger)

The `/postpartum*` redirects are audited separately from canonical First Year surfaces. For each legacy route: legacy route, canonical destination, redirect mechanism, indexable YES/NO, sitemap presence YES/NO, inbound internal references YES/NO, redirect loop YES/NO, stale destination YES/NO.

A working legacy redirect is never counted as a canonical surface, duplicate article, extra topic, extra pathway or journey-coverage owner unless evidence shows it still renders independent indexable content. Reported fields: canonical First Year public routes, legacy/redirect routes, indexable legacy surfaces, legacy routes in sitemap, internal links still pointing at legacy routes, redirect loops, broken legacy destinations, canonical duplicate surfaces — all kept out of the hub/pathway/topic/phase/month/article counts.

## Audit principle: categories stay distinct

CONTENT GAP, DISCOVERY GAP, SOURCE/PROVENANCE GAP, ROUTING/LEGACY GAP, EDITORIAL OVERLAP and AI-ONLY NEED are never converted into one another to simplify the outcome. An article that exists but is hard to find is a discovery gap, not uncovered content; unclear provenance is a provenance gap, not a new-article requirement; a legacy redirect is routing state, not duplicate content.

## Governance held at zero

Grounding changes, approvals and candidates = 0; reviewer claims and provenance = 0; AI source-routing changes = 0; `AI_SOURCE_ROUTING_VERSION` unchanged. Publication quality stays separate from grounding eligibility.

## Documents produced

- `docs/content/phase37c-first-year-content-coverage-audit.md`
- `docs/content/phase37c-first-year-journey-gap-register.md`
- `docs/content/phase37c-first-year-content-inventory.md`
- `roadmap.md` — new Phase 37C audit record only; locked 37A/37A.1/37B/37B.1 history untouched

## Validation

First Year route checks, article/topic/phase/month inventory checks, related-guidance and link-integrity checks, source/provenance checks, journey arithmetic checks, sitemap consistency, relevant First Year regressions, full suite, typecheck twice, lint against the established baseline (1 pre-existing error, 10 warnings), production validation build. No deployment. Any flake reported as FIRST RUN plus RERUN, with the first failure shown.

## Closure

Full completion report in the required field-by-field format, then exactly one of OUTCOME A–D, chosen only after all arithmetic reconciles, closing as:

PHASE 37C — FIRST YEAR CONTENT COVERAGE & JOURNEY AUDIT — AUDIT COMPLETE / [OUTCOME]

No articles created, no cleanup implemented, no merges, no claim repairs, no link changes and no next phase started. Findings returned first; the smallest justified remediation phase is decided afterwards.
