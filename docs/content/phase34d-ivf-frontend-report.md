# Phase 34D — IVF Frontend QA Report

Preview only. Nothing deployed. Global Phase 33 deployment block ACTIVE.

## Viewports

Desktop 1280px, tablet 834px, mobile 390px.

## Routes inspected

1. `/articles/ivf-vs-icsi`
2. `/articles/fresh-vs-frozen-embryo-transfer`
3. `/ivf/before-transfer`
4. `/ivf`
5. `/articles/what-ivf-is-uk-guide` (contextual-link source)
6. `/articles/ivf-timeline-what-to-expect` (contextual-link source)

## Results

| Check | Result |
| --- | --- |
| New articles render | 2 / 2 at all three viewports |
| Existing stage surfaces expanded | 1 (`/ivf/before-transfer`) |
| Standalone embryo-development article | 0 (not created) |
| Clinic-questions checklist | 0 (not created) |
| Hero images | 2 / 2 |
| Body images | 4 |
| Broken images | 0 (confirmed after forcing every lazy image to load and scrolling to the foot of each page; first-pass zero-width readings were unloaded lazy images, not failures) |
| Horizontal overflow | 0 at 1280px, 834px and 390px on every route |
| Sources visible | YES |
| Sources clickable | NO — 0 anchors to hfea.gov.uk, nhs.uk or nice.org.uk on any inspected route |
| External-link icons / new-tab disclaimers | 0 |
| Reviewer claims rendered | 0 on every route |
| JSON-LD reviewedBy | 0 |
| Normal discovery per new article | 1 |
| Duplicate normal discovery | 0 |
| Contextual links resolve | 8 / 8 |
| Duplicate "In this article" blocks | 0 |
| Duplicate "At a glance" blocks | 0 |
| New console errors | 0 |

## Console note

The only console output on the new routes is the pre-existing React development warning about the `fetchPriority` prop on `<img>`, emitted by the shared flagship hero and the IVF topic hero. It appears identically on pre-existing routes such as `/articles/ivf-timeline-what-to-expect`, is development-only, and is not introduced by Phase 34D.

## Verdict

Frontend QA PASS.
