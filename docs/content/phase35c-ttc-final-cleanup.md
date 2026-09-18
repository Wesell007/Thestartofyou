# Phase 35C — TTC final cleanup

Scope: resolve the small evidence-backed issues recorded by Phase 35B. No new
articles, no new routes beyond redirects, no new topic architecture, no tools,
no AI or grounding changes, no database changes, no deployment.

## 1. Phase 35B journey count reconciliation

The stored Phase 35B totals line read "62 audited / 53 covered", which did not
sum with the remaining categories (1 + 0 + 2 + 5 = 61). The matrix rows in
`docs/content/phase35b-ttc-journey-gap-register.md` were re-counted section by
section. The eleven journey sections contain **83** classified moments:

| Classification | Count |
| --- | --- |
| COVERED | 75 |
| PARTIALLY_COVERED | 1 |
| UNCOVERED | 0 |
| NOT_REQUIRED_STANDALONE | 2 |
| BETTER_SERVED_BY_TOOL | 2 |
| BETTER_SERVED_BY_TOPIC_PAGE | 1 |
| BETTER_SERVED_BY_IVF | 1 |
| BETTER_SERVED_BY_PREGNANCY | 1 |
| BETTER_SERVED_BY_COMPANION | 0 |
| **Total** | **83** |

Sum of classifications = total journey moments. The error was in the summary
sentence, not in the matrix: no moment was invented, added or removed. Only the
count sentences in the two Phase 35B documents and the roadmap were corrected.
The Phase 35B strategic conclusion (mostly sufficient, small gaps, no blockers)
is unchanged.

PHASE 35B JOURNEY COUNT RECONCILED = YES.

## 2. Legacy TTC stage route disposition

Mechanism audited first: the project's established pattern is a React Router
`<Navigate ... replace />` element mounted above the generic `/:journey/:stage`
route (as used by `/trying-to-conceive/legacy` and `/postpartum`). The hosting
layer does not return an HTTP 301 or 308 for these, so they are described here
as **client-side canonical route redirects**.

| Old route | Current status before | Canonical replacement | Final disposition | Redirect target | Sitemap after | Indexable duplicate after |
| --- | --- | --- | --- | --- | --- | --- |
| /trying-to-conceive/understanding-your-cycle | Indexable, sitemap-listed, linked only from unmounted legacy code | Ovulation pillar | REDIRECT | /trying-to-conceive/ovulation | REMOVED | NO |
| /trying-to-conceive/timing-and-tracking | Same | Cycle tracking topic | REDIRECT | /trying-to-conceive/cycle-tracking | REMOVED | NO |
| /trying-to-conceive/waiting-and-testing | Same | Two-week wait topic | REDIRECT | /trying-to-conceive/two-week-wait | REMOVED | NO |

Destinations were chosen on visitor intent, not on a one-stage-one-article rule:
cycle understanding maps to the ovulation pillar, timing and tracking to the
cycle-tracking topic, waiting and testing to the two-week wait topic.

Supporting changes:

- `src/App.tsx` — three redirect routes above `/:journey/:stage`.
- `src/pages/StagePage.tsx` — the stage SEO allowlist and the breadcrumb
  allowlist are now intentionally empty; the mechanism is retained.
- `scripts/generate-sitemap.ts` — the three entries removed (TTC entries 14 → 11,
  total 356 → 353).
- `src/data/stageData.ts` and the unmounted legacy components are left in place;
  a redirect is sufficient and no code was deleted.

LEGACY REDIRECT MECHANISM = CLIENT-SIDE CANONICAL ROUTE REDIRECT.
REDIRECT LOOPS = 0. ORPHANED LEGACY TTC STAGE ROUTES AFTER = 0. BROKEN ROUTES = 0.

## 3. TTC → Pregnancy positive-result handoff

- Placements: **1**, on `/trying-to-conceive/pregnancy-tests`, the strongest
  testing-context surface. No second placement: no other TTC surface is
  contextually distinct enough to justify repeating the call to action.
- Destination: `/pregnancy` (existing Pregnancy hub route).
- Copy: "Got a positive test? Start with pregnancy guidance."
- Implementation: an optional presentation-only `handoff` field on
  `TTCPageConfig`, rendered by `TTCSubtopicPage` after the guidance library and
  before the Companion section, preserving the CTA hierarchy.

NEW ARTICLE = NO. NEW ROUTE = NO. LIFECYCLE LOGIC CHANGES = 0.
TTC → PREGNANCY EDITORIAL HANDOFF = COMPLETE.

## 4. Discoverability recheck

- Orphaned TTC articles = 0
- Orphaned legacy TTC stage routes = 0
- Broken TTC routes = 0
- Broken internal links = 0 (link-integrity suite passing)
- Wrong-destination links = 0
- TTC → IVF handoff = COMPLETE
- TTC → Pregnancy handoff = COMPLETE
- Weak-discovery records re-assessed honestly and unchanged at 2
  (`can-you-get-pregnant-on-your-period`, `hcg-levels-explained`). Both remain
  reachable; no artificial inbound links were added to reduce the count.

## 5. Deferred

The Phase 35B P3 opportunities (cycle helper, preconception checklist, GP
question prompts, fertility investigation helper, additional Companion prompts)
remain FUTURE OPTIONAL ENHANCEMENTS. They are not implemented and do not block
TTC closure.
