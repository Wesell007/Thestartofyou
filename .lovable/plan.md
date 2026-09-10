# Phase 32F — Reconciliation and correction pass (documentation only)

Verification pass. No runtime, route, canonical, sitemap, publication or
deployment changes. Only `docs/content/phase32f-*` files are edited.

## Confirmed cause of the failed equation

The action register in `docs/content/phase32f-implementation-report.md`
contains eleven rows, A1 to A11:

- ALREADY_RESOLVED: A1 (C008), A2 (C006) = 2
- IMPLEMENTED: A3, A4, A5, A6, A7, A8, A9 = **7**
- DEFER_SEO_ARCHITECTURE: A10 = 1
- NO_ACTION_REQUIRED: A11 = 1

7 + 2 + 1 + 1 = 11 = GROSS. The register is already correct; only the summary
sentence beneath it mis-states IMPLEMENTED as 8. The correction is to the
summary text, not to the action model or to any runtime work.

Derived: GUARANTEED 5, NEWLY_DISCOVERED 6 (A6 grouped broken destinations,
A7 grouped redirect-source link, A8 grouped orphan remediation, A9 topic-group
truncation, A10 milestones canonical, A11 `/` and `/about` weak connectivity),
GROSS 11.

## Work to do

### 1. Correct the terminal arithmetic
Fix the equation line in the implementation report to
`IMPLEMENTED 7 + ALREADY_RESOLVED 2 + MERGED 0 + BLOCKED 0 + REVIEW_HOLD 0 +
DEFER_SEO_ARCHITECTURE 1 + NO_ACTION_REQUIRED 1 = 11 = GROSS`.

### 2. Expand the register to the required column set
Rewrite the A1–A11 table with one row per gross action and the columns:
Action ID, Source, Description, Guaranteed/New, Terminal status, Runtime
change, Evidence. Add an explicit note that A6 (six broken destinations),
A7 (one redirect-source link across four surfaces) and A8 (five orphaned
guides) were each defined in 32F.1 as a single systematic remediation, so
affected-URL counts are not action counts.

### 3. Evidence rows for C008 and C006
State each issue, the evidence that the week index entry point and the 42
week-page architecture were already in place before 32F, and confirm zero
runtime change for both. They stay two separate guaranteed rows.

### 4. Evidence rows for C066, C082, C046
Record for each the exact remediation already shipped: phase-to-month
navigation on four First Year phase pages; neutral routing from the two
physical-recovery articles to `when-parenthood-feels-heavy`; reciprocal
pelvic-floor and postnatal body-change links. Confirm no new health, safety
or developmental claim, and no Phase 32E held content, was introduced.

### 5. Cannibalisation reconciliation table
Rewrite `docs/content/phase32f-cannibalisation-register.md` with the columns:
Intent family, Severity before, Primary owner, Supporting owner(s), 32F
action, Final status, Residual risk. Replace the blanket "REMEDIATED" with
precise terminal statuses, so CAN-04 (milestones) reads
`DEFERRED_SEO_ARCHITECTURE` rather than resolved, and add totals that
reconcile to 7.

### 6. Milestone canonical residual issue
Record the two routes involved, the intended primary owner, the current
canonical state (each route self-canonical, both indexed, inventory role
`needs-decision`), why 32F did not touch canonical architecture, and the
residual duplicate-intent risk. Keep it as explicit future work.

### 7. Nineteen-draft future-publication reconciliation
`phase32f-intent-ownership-map.md` currently has only a short narrative.
Add a full section covering all 19 held drafts (3 from 32A, 4 from 32B,
3 from 32C, 9 from 32D), each with: draft title, current live owner, future
owner, links to add after publication, links to retarget, coverage that must
stay live until publication, and a launch-time cannibalisation check. Report
totals for "changes ownership" versus "no link migration", reconciling to 19.
No links are added now; the drafts stay NOT PUBLISHED.

### 8. Metrics and validation
Graph, inventory and validation figures are preserved as reported unless a
targeted re-read of the repository contradicts them. Since no runtime file
changes, no re-run of the full suite is manufactured; a targeted verification
of the final repository state is recorded instead.

## Files changed by this pass

- `docs/content/phase32f-implementation-report.md`
- `docs/content/phase32f-cannibalisation-register.md`
- `docs/content/phase32f-intent-ownership-map.md`

`docs/content/phase32f-link-graph-audit.md` unchanged unless verification
disproves a value.

## Closure

If all three reconciliations (terminal equation = 11, cannibalisation = 7,
drafts = 19) are exact, close as
`PHASE 32F — INTERNAL LINKING + INTENT OWNERSHIP + CANNIBALISATION
REMEDIATION CLOSED PASS`. Otherwise report
`PHASE 32F — RECONCILIATION HOLD`. No next phase, no deployment.
