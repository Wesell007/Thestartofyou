# Phase 35A responsive and validation evidence

## Browser review

The canonical TTC hub, Ovulation, Preconception Health and Fertility pages were checked at 1280, 834 and 390 pixel widths.

At every width:

- horizontal overflow: 0
- console errors: 0
- static `You are here`: 0
- one Companion entry per surface: YES
- direct `Ask more` actions in editorial questions: 0
- hub editorial questions: 6 and keyboard expansion passed
- signed-out final journey action: `/start-your-journey`
- Ovulation and Preconception Health calculator label: `Open calculator`
- Fertility AMH destination rendered: YES

Visual inspection confirmed the locked hub section order, unchanged calculator form and estimate wording, neutral three-stage journey, primary pathway and supporting library separation, IVF pathway, editorial questions before Companion, and final journey action.

## Automated validation

- Focused TTC, Companion, breadcrumb and link integrity tests: 4 files / 33 tests PASS
- Five distinct journey account states: PASS
- Full suite: 130 files / 1,497 tests PASS
- Typecheck x2: PASS
- Lint: unchanged baseline, 1 generated-file `prefer-const` error and 10 warnings
- Production validation build: PASS
- Application deployment: NO