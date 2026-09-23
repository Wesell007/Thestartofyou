# Phase 38A Toddler responsive evidence

## Pre-change evidence

Representative routes checked:

- `/toddler`
- `/toddler/12-17-months`
- `/toddler/development-milestones`

Viewports checked: 1280 desktop, 834 tablet and 390 mobile. Horizontal overflow was zero. The hub loaded without console errors. Representative age and topic routes showed local asset request errors; the existing asset references will be rechecked after implementation before any regression conclusion.

## Post-change evidence

| Route | 1280 | 834 | 390 |
|---|---|---|---|
| `/toddler` | No overflow, hierarchy passed, one Companion | No overflow, hierarchy passed, one Companion | No overflow, hierarchy passed, one Companion |
| `/toddler/12-17-months` | No overflow, editorial content precedes Companion | No overflow, editorial content precedes Companion | No overflow, editorial content precedes Companion |
| `/toddler/development-milestones` | No overflow, age strip and both guidance pieces precede Companion | No overflow, age strip and both guidance pieces precede Companion | No overflow, age strip and both guidance pieces precede Companion |

The chapter-based hub age journey, age-page support grid and topic-page age strip remained readable and free of incoherent overlap. Keyboard focus treatments and semantic navigation labels were retained or added.

The hub had no console errors. Representative age and topic pages retained one React image-priority warning. Their existing asset pointers also returned the app HTML shell rather than image bytes in local preview, so the preserved age and topic images did not render locally. This is recorded as inherited asset-delivery evidence, not silently counted as a passed image check. No image was replaced in this phase.
