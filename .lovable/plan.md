# Phase 13.7h.2 — Early and Mid Cord-Anchor Retouch

This phase remains a controlled, review-only image pass.

Your clarification is now part of the plan:
- the chat images are visual direction only
- they are not source assets
- they will not be copied, imported, or added to `src/assets`
- production asset replacement is explicitly out of scope for this phase

## Confirmed source set

The current live personalised illustration system resolves its images from `src/assets/myweek-baby-styles/`, with the Early, Mid, and Late variants referenced in `src/lib/myWeekBabyIllustrations.ts`.

This phase will use only these approved source files as edit inputs:

### Early
- `src/assets/myweek-baby-styles/default-early.png`
- `src/assets/myweek-baby-styles/light-early.png`
- `src/assets/myweek-baby-styles/medium-early.png`
- `src/assets/myweek-baby-styles/deep-early.png`

### Mid
- `src/assets/myweek-baby-styles/default-mid.png`
- `src/assets/myweek-baby-styles/light-mid.png`
- `src/assets/myweek-baby-styles/medium-mid.png`
- `src/assets/myweek-baby-styles/deep-mid.png`

Late is unchanged and out of scope.

## Goal

Improve the most visible realism issue in the current symbolic system by making the umbilical cord feel naturally connected to the womb wall rather than appearing to stop in fluid.

This is a premium symbolic retouch, not a realism rebuild.

## Visual direction

Apply the same artistic intent across all 8 retouches:
- soft cord continuation
- gentle wall-anchor
- warmer watercolour bloom where the cord meets the womb wall
- premium watercolour softness
- no full placenta disc
- no clinical diagram feel
- no labels
- no hard medical detail

### Early direction
- softer and more delicate than Mid
- anchor should remain subtle and airy
- connection should feel present, not diagrammed

### Mid direction
- slightly clearer wall-anchor than Early
- still symbolic and painterly
- avoid any visible clinical placenta structure

## Deliverables

All outputs will be written to `/mnt/documents/phase-13-7h-2/` only.

### Retouched review-only image outputs
- 8 retouched review images, one for each Early and Mid source above

### Review sheets
- `early-before-after.png`
- `mid-before-after.png`
- `all-stages-updated.png`

### Notes
- `notes.md`
- explicit note of any drift or defects found during review

## Output rules

Do not:
- save anything into `src/assets`
- create `.asset.json`
- run asset import
- update code
- update routes, AI, analytics, sitemap, or settings
- close Phase 13.7

## Technical details

- Edit inputs come only from the existing `src/assets/myweek-baby-styles/` files listed above.
- Retouch outputs are scratch review files under `/mnt/documents/phase-13-7h-2/`.
- Composite before/after sheets will be assembled after the retouch pass so review is possible before any asset replacement decision.
- The all-stage sheet will include Late only as unchanged context.

## Stop point

Stop immediately after the 8 review-only retouches, the three review sheets, and `notes.md` are produced.

A separate later phase can handle approval and final asset replacement if the review passes.