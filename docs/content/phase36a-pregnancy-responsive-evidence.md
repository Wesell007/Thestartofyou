# Phase 36A Pregnancy responsive and validation evidence

## Browser review

The canonical Pregnancy hub and all six canonical topic pages were checked at 1280, 834 and 390 pixel widths: 21 route/viewport combinations.

At every width and route:

- horizontal overflow: 0
- broken content images: 0
- topic-page contextual Companion handoffs: exactly 1 per topic
- misleading group `View all` actions: 0

The hub checks confirmed six pathway cards and six loaded approved images, three trimester links, 42 week links, six editorial questions, one embedded Companion, and editorial questions before Companion before the final journey action. Visual inspection confirmed the compact hierarchy and readable desktop and mobile layouts.

An initial browser pass exposed the existing React 18 `fetchPriority` development warning on the reused topic hero image. The unsupported DOM prop was removed from this Pregnancy template; the repeat pass recorded zero console errors at every tested width and route.

## Automated validation

- Focused Pregnancy, lifecycle, calculator and Companion regressions: 6 files / 46 tests PASS
- Five distinct journey account states and four unique destinations: PASS
- Full suite: pending final closure run
- Typecheck x2: pending final closure run
- Lint baseline comparison: pending final closure run
- Production validation build: pending final closure run
- Application deployment: NO