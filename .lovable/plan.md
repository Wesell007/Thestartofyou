# Phase 35C — TTC final cleanup and workstream closure

Audit-backed cleanup only. No new articles, no new routes beyond redirects, no AI, grounding, database or lifecycle changes. Nothing is deployed.

## 1. Reconcile the Phase 35B journey count

Re-derive the journey-moment matrix from the Phase 35B register and find whether the missing item is a mis-tallied row or a documentation error (53 + 1 + 0 + 2 + 5 = 61 against a stated 62). No moment is invented to balance the sum. Only the affected count and its evidence wording in the 35B documents are corrected; the 35B conclusion (mostly sufficient, small gaps, zero new articles, zero blockers) stays exactly as it is.

## 2. Legacy stage routes

Three routes render through the generic stage page and are indexable and sitemap-listed, but their only links live in unmounted legacy code:

- /trying-to-conceive/understanding-your-cycle
- /trying-to-conceive/timing-and-tracking
- /trying-to-conceive/waiting-and-testing

Each is matched against its canonical replacement in the current hub/topic system (cycle tracking, ovulation, two-week wait / pregnancy testing) and given a disposition. Where a clear canonical replacement exists the route becomes a permanent redirect using the same pattern already used for the postpartum stage URLs and /trying-to-conceive/legacy, and its metadata and sitemap entry are withdrawn. No replacement content is written and no historical stage data is deleted.

Target after: orphaned legacy stage routes = 0, broken routes = 0.

## 3. Positive-result handoff into Pregnancy

A single calm handoff link is added on the contextually correct testing surfaces only (pregnancy testing topic page, and the closest testing-related placement if the evidence supports it), pointing to the existing Pregnancy entry destination. Wording follows the existing copy system, for example "Got a positive test? Start with pregnancy guidance". No new pregnancy article, no new route, no change to lifecycle or journey routing.

## 4. Source normalisation (data only)

Two distinct counts are preserved: 20 label-only TTC articles, of which 7 contain the 8 flagged numerical or medical claims.

Label-only entries are converted to the existing structured-source shape (label, publisher, year, url) only where the repository already holds the exact matching source record elsewhere. Nothing is invented: no URLs, organisations, titles, review dates or reviewers. Anything that cannot be resolved from repository evidence is left as-is and reported as unresolved.

Source rendering behaviour is not changed. No grounding registry, approval, candidate or routing change. No reviewer or medical-review claim is added anywhere.

## 5. The 8 flagged claims

Each claim is checked for genuine repository source evidence. Where evidence exists the claim is tied to a structured source. Where it does not, the smallest safe edit is made: drop the unsupported numeric precision or soften the assertion, preserving meaning and introducing no new medical claim. TTC does not close while any unresolved unsupported claim remains.

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
