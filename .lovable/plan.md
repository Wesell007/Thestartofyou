# Phase 35C — TTC final cleanup and workstream closure

Audit-backed cleanup only. No new articles, no new routes beyond redirects, no AI, grounding, database or lifecycle changes. Nothing is deployed.

## 1. Reconcile the Phase 35B journey count (already re-counted)

I re-counted the actual rows in the Phase 35B matrix. The eleven journey sections contain 83 classified moments, not 62: COVERED 75, PARTIALLY_COVERED 1, UNCOVERED 0, NOT_REQUIRED_STANDALONE 2, BETTER_SERVED_* 5. That sums exactly to 83, so the stored totals line (and the same figures echoed in the coverage audit and roadmap) is a summary error, not a missing moment. No moment is invented or added. Only those count sentences in the 35B documents are corrected; the 35B strategic conclusion is unchanged.

## 2. Legacy stage routes

Three routes render through the generic stage page and are indexable and sitemap-listed, but their only links live in unmounted legacy code. Each gets a client-side canonical redirect (the same React Router `Navigate replace` pattern used for `/trying-to-conceive/legacy` and the postpartum stage URLs — described accurately as a client-side route redirect, not an HTTP 301):

- /trying-to-conceive/understanding-your-cycle → /trying-to-conceive/ovulation
- /trying-to-conceive/timing-and-tracking → /trying-to-conceive/cycle-tracking
- /trying-to-conceive/waiting-and-testing → /trying-to-conceive/two-week-wait

Destinations are chosen on visitor intent against the stage content. The three entries are removed from the sitemap list and from the stage SEO and breadcrumb allowlists, so no indexable duplicate remains. Stage data and legacy components are left in place; nothing is deleted recklessly.

Target after: orphaned legacy stage routes = 0, redirect loops = 0, broken routes = 0.

## 3. Positive-result handoff into Pregnancy

One calm handoff is added at the strongest testing-context surface, the pregnancy testing topic page, pointing to the existing Pregnancy entry destination. Wording in the existing voice, e.g. "Got a positive test? Start with pregnancy guidance". A second placement only if the evidence shows it is contextually distinct; no scattered repeat CTAs. No new pregnancy article, no new route, no lifecycle change.

## 4. Source normalisation (data only)

Two distinct counts are preserved and never conflated: 20 label-only TTC articles, of which 7 contain the 8 flagged numerical or medical claims.

A label-only entry becomes a structured source only where repository evidence establishes the same underlying source — matching title, publisher, year where present and URL. No pairing with a different document from the same publisher, no publisher-homepage URLs, no substituted newer editions, no invented years, no provenance inferred from topic similarity. Anything short of exact provenance stays label-only and is reported honestly; remaining label-only records are a governance state, not a release blocker, unless they leave an unsupported live claim.

Source rendering behaviour is unchanged. No grounding registry, approval, candidate, eligible-slug or routing change. No reviewer or medical-review claim added.

## 5. The 8 flagged claims

Each claim gets exactly one resolution: supported with verified source, safely removed, safely reworded, or unresolved. Rewording preserves meaning and introduces no new medical precision. The four outcomes must sum to 8, and TTC does not close while any unresolved claim remains.

## 6. Discoverability recheck and closure audit

Re-run the TTC link and route checks after the changes: orphaned articles, the two previously flagged weak-discovery records (documented, not padded with artificial links), broken links, wrong destinations, and the IVF and Pregnancy handoffs. Reconfirm male fertility, age and fertility, zero new article candidates and zero release blockers.

P3 tool and checklist ideas are explicitly not built and are recorded as future enhancements.

## 7. Documentation and validation

New: docs/content/phase35c-ttc-final-cleanup.md, phase35c-ttc-source-normalisation-evidence.md, phase35c-ttc-final-closure.md. roadmap.md updated. Phase 35A and 35A.1 history untouched.

Validation: focused TTC route, redirect, sitemap, handoff, structured-source, article and link-integrity tests; full suite; typecheck twice; lint against the established baseline; production validation build; browser sanity check on the surfaces whose visible links changed. Application deployed = NO.

## Closure gate

Close as CLOSED PASS / TTC COMPLETE FOR CURRENT STRATEGY and lock the TTC workstream only if the arithmetic reconciles, orphaned legacy routes are 0, the Pregnancy handoff is complete, unresolved unsupported claims are 0, and broken routes, broken links and blockers are all 0. Otherwise the phase closes as partial with the exact remaining item named.

## Technical notes

- Redirects added in src/App.tsx above the generic /:journey/:stage route; matching removals from the SEO and breadcrumb allowlists in src/pages/StagePage.tsx and from scripts/generate-sitemap.ts extraction.
- Source records edited in src/data/articleData.ts using the existing ArticleSource interface; ArticleSources.tsx and JSON-LD citation behaviour unchanged.
- Handoff link placed in the existing TTC topic data / testing surface components, reusing current link styling.
