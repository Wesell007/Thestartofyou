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

## Phase 38A.1 evidence (hub section-order correction)

Route checked: `/toddler` only. Viewports: 1280 desktop, 834 tablet and 390 mobile.

| Measure | 1280 | 834 | 390 |
|---|---|---|---|
| Horizontal overflow | 0px | 0px | 0px |
| Console errors | 0 | 0 | 0 |
| Main links (unchanged) | 24 | 24 | 24 |
| Measured section order correct | YES | YES | YES |

The measured DOM order at every width was: hero, "Growing together through every stage", "A few quiet places to start", "Start with what is happening today", "What parents quietly wonder.", the one embedded Companion, then "Where to next". Spacing between the age journey, Start Here and the topic navigation read as intentional section rhythm with no overlap at any width. Screenshots: `/tmp/browser/phase38a1/screenshots/`. The inherited local asset-pointer delivery failure is unchanged and remains documented above.
