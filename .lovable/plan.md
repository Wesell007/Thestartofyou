# Phase 32F — Internal linking, intent ownership and cannibalisation

Audit first, then implement only the link changes that are genuinely safe. No new pages, no new URLs, no publishing of the 19 held drafts, no deployment.

## Stage 32F.1 — Audit only (no runtime edits)

1. **Read the authoritative inputs**: the Phase 31 opportunity clusters, existing-content actions, master audit and hub scorecard; the three Phase 32E documents; and the 32B–32D ownership/evidence documents where topics overlap.
2. **Recompute the live/indexable inventory from repository truth** by walking the route table and the content datasets (legacy articles, First Year, Toddler, Family article sets, topic and hub pages, 42 week pages, trimester pages, 13 month pages, First Year phase pages, Toddler age pages, IVF pages, Preparing for Baby, and tools that act as content destinations). Exclude unpublished drafts, setup/authenticated routes, redirects and private utility routes. Report the actual count rather than the Phase 31 figure.
3. **Build the link graph** by extracting every internal link from the runtime datasets and components, separating structural/navigation links from contextual editorial links. Classify each page as TRUE_ORPHAN, WEAKLY_CONNECTED or WELL_CONNECTED using the definitions given.
4. **Resolve the five guaranteed deferrals from source truth** (verified Phase 31 records):
   - C008 — `/pregnancy`, ensure a clear week index entry point.
   - C006 — the 42 week pages, systematic linking architecture around them.
   - C066 — the 13 First Year month pages, discoverability and progression.
   - C082 — routing from physical postpartum/recovery surfaces to `when-parenthood-feels-heavy`.
   - C046 — cross-routing between `pelvic-floor-exercises-in-pregnancy` and `body-changes-after-birth`.
   Each gets cluster ID, domain, original intent, current owner, current problem, target pages, link direction, current state and one terminal disposition.
5. **Map intent ownership** for the named families: pregnancy dating, bleeding/discharge, pelvic pain, body changes, milestones/development, baby sleep, feeding, postpartum recovery, pelvic floor, postnatal mental health. Record primary, supporting, structured-context and future-after-publication owners.
6. **Register cannibalisation** only where user intent materially overlaps, with severity NONE/LOW/MEDIUM/HIGH, reason, current link signals, recommended remediation, runtime-safe flag and final status.
7. **Verify the baseline** (expected 116 test files, 1293 tests, lint 1 error / 10 warnings). If it has drifted, stop after 32F.1 and report the exact difference.
8. **Gate every action** with exactly one terminal status: READY_TO_IMPLEMENT_LINK, ALREADY_RESOLVED, MERGED_WITH_ANOTHER_ACTION, BLOCKED_BY_UNPUBLISHED_TARGET, REVIEW_HOLD, DEFER_SEO_ARCHITECTURE, NO_ACTION_REQUIRED. Stop if `5 + newly discovered = sum of terminal statuses` fails.

Documents produced: `phase32f-link-graph-audit.md`, `phase32f-intent-ownership-map.md`, `phase32f-cannibalisation-register.md`.

## Stage 32F.2 — Link implementation

Only READY_TO_IMPLEMENT_LINK actions, using the smallest useful edit and preferring one shared data/component change over repeating an edit across 42 or 13 pages. Allowed: contextual internal links, related-guidance references, parent/child links, previous/next progression consistent with existing design, neutral anchor clarification, and tiny non-clinical positioning copy that distinguishes two existing owners. Anchors are natural editorial phrases, never keyword-stuffed or "click here". No arbitrary link quotas, no SEO-looking link blocks, no repeated identical paragraph across every week or month.

## Stage 32F.3 — Cannibalisation remediation

Runtime-safe actions only: clarify the primary owner, adjust supporting-page link direction, remove duplicated positioning, strengthen the route toward the primary owner. No deletions, redirects, slug changes, canonical changes, merges, noindex or draft publication.

## Link integrity and validation

Verify every new href resolves, no links point at unpublished drafts, setup/private routes or known redirect sources, no malformed relative or accidental external links, no unintended self-links. Then run the full test suite, typecheck twice, lint against baseline and a production build. Add focused tests only where they carry weight: generated week/month links, absence of links to unpublished routes, destination validity.

## Reporting

`docs/content/phase32f-implementation-report.md` records each changed runtime surface (route, page type, previous state, action, destination, anchor, why useful, cannibalisation impact, risk, files changed). The chat reply returns the full 40-point Phase 32F report including graph metrics before/after, cannibalisation metrics, reconciliation arithmetic and the architecture zeros.

## Boundaries

Saved lifecycles stay exactly `ttc | pregnancy | first_year`. The 19 drafts stay NOT PUBLISHED and never become link destinations; where publication would change ownership, the future link migration is documented instead. Phase 32E review holds are not bypassed through copy changes — anything requiring health, safety, developmental, escalation or clinical wording is classified REVIEW_HOLD. `/preparing-for-baby` stays a supporting editorial surface. IVF completeness stays deferred. Nothing deploys, and no further phase begins.
