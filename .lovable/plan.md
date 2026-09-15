# Phase 34B — Apply final documentation reconciliation

Apply the approved documentation-only correction to `docs/content/phase34b-ivf-remediation-report.md`. No implementation files, data, tests, routes, discovery behaviour, sitemap, schemas, AI, grounding, review governance or runtime behaviour will change. No deployment.

## Corrections to apply

1. **Internal contextual links**
   - Change the completion-counts table row from `Contextual link occurrences implemented | 3` to `Internal contextual link occurrences implemented | 2`.
   - Add a short subsection listing the two 34B-added internal contextual links:
     - `/ivf/after-transfer` → `/articles/chemical-pregnancy`, occurrences added = 1
     - `/ivf/early-pregnancy` → `/articles/twins-and-multiples-in-pregnancy`, occurrences added = 1

2. **Pregnancy after loss**
   - Record `/articles/pregnancy-after-loss` separately.
   - Existing IVF source surfaces: `/ivf/after-transfer` and `/ivf/early-pregnancy`.
   - Pre-existing occurrences = 2.
   - New Phase 34B occurrences = 0.
   - Do not count these as newly implemented Phase 34B links.

3. **Embryo freezing / storage**
   - Record `/ivf/before-transfer` contains one plain-text authoritative HFEA signpost.
   - This is not an internal link, not a new article, not a normal-discovery destination, and not a clickable external citation.
   - Plain-text external-authority signposts added = 1.
   - Do not count this within the internal-link total.

4. **Phase 34A rows 14–17**
   - Row 14 — Fertility tests for women: IMPLEMENTED = NO, STATUS = DEFERRED, 34B occurrences = 0.
   - Row 15 — Fertility tests for men: IMPLEMENTED = NO, STATUS = DEFERRED, 34B occurrences = 0.
   - Row 16 — Male fertility when trying to conceive: IMPLEMENTED = NO, STATUS = DEFERRED, 34B occurrences = 0. Reason: pre-treatment assessment subjects owned by the TTC journey, outside the approved 34B smallest batch.
   - Row 17 — Chemical pregnancy: IMPLEMENTED = YES, source `/ivf/after-transfer`, destination `/articles/chemical-pregnancy`, occurrences added = 1.
   - Do not alter the historical Phase 34A classifications.

5. **Normal discovery**
   - Keep normal-discovery additions = 1.
   - `moving-from-ttc-to-ivf` occurrences on `/ivf` = 1.
   - Duplicate IVF hub discovery = 0.

6. **Tablet QA**
   - Add completed tablet QA evidence at 834px viewport.
   - Routes checked: `/ivf`, `/ivf/before-transfer`, `/ivf/after-transfer`, `/ivf/early-pregnancy`, IVF timeline article, emotional-impact IVF article, `moving-from-ttc-to-ivf`.
   - Results: horizontal overflow = 0, broken images = 0, images loaded = 107, broken layout = 0, source citations visible = YES where applicable, clickable anchors inside source sections = 0, reviewer claims = 0, contextual link targets checked = 9, broken contextual link targets = 0, IVF hub occurrence of `moving-from-ttc-to-ivf` = 1, console = one pre-existing React `fetchPriority` warning only, no new runtime error.

7. **Review classifications**
   - HEALTH_REVIEW_REQUIRED changed items = 3: `/articles/ivf-timeline-what-to-expect`, `/articles/emotional-impact-of-ivf`, `/ivf/after-transfer`.
   - SAFETY_REVIEW_REQUIRED changed items = 2: OHSS safety signpost/callout within the timeline article, after-transfer escalation and test-result interpretation wording.
   - Human reviews completed = 0.
   - Do not imply these reviews are complete.

8. **Final authoritative counts**
   - Update the completion-counts table to:
     - IVF articles source-remediated = 2
     - Existing articles expanded = 1
     - Existing stage surfaces expanded = 1
     - Deferred EXPAND_EXISTING records = 1
     - Shadowed stage records = 3 -> 0
     - Public IVF stage routes = 3 -> 3
     - New IVF article records = 0
     - New routes = 0
     - New internal contextual link occurrences = 2
     - Pre-existing pregnancy-after-loss occurrences = 2
     - Plain-text HFEA authoritative signposts added = 1
     - Normal-discovery additions = 1
     - IVF hub occurrences of `moving-from-ttc-to-ivf` = 1
     - HEALTH_REVIEW_REQUIRED changed items = 3
     - SAFETY_REVIEW_REQUIRED changed items = 2
     - Human reviews completed = 0
     - Reviewer claims rendered = 0
     - Unsupported JSON-LD `reviewedBy` = 0
     - Production deployed = 0
     - GLOBAL PHASE 33 DEPLOYMENT BLOCK = ACTIVE

9. **Closure**
   - End the report with the closure line:
     `PHASE 34B — IVF SOURCE REMEDIATION & EXISTING-CONTENT EXPANSION CLOSED PASS / HUMAN REVIEW REQUIRED BEFORE DEPLOYMENT — CLOSURE RECONCILED`

## Boundaries

- Only `docs/content/phase34b-ivf-remediation-report.md` will be edited.
- No source code, article data, tests, routes, canonicals, discovery behaviour, sitemap behaviour, schemas, AI, grounding, review governance or runtime behaviour changes.
- No deployment.
- Phase 34C will not be started automatically.
