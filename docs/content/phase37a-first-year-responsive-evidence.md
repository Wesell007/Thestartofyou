# Phase 37A First Year responsive and validation evidence

## Browser review

The hub, all four phase pages and all eight topic pages were checked at 1280, 834 and 390 pixel widths: 13 surfaces × 3 widths = 39 route and viewport combinations.

At every route and width:

- HTTP status: 200
- horizontal overflow: 0
- browser console errors: 0
- broken content images: 0
- pages with an incorrect H1 count: 0
- empty Start Here sections: 0

Visual inspection covered the hub, one Baby topic, one Postpartum topic and the early phase at desktop and mobile. It confirmed readable hierarchy, viable hero crops, balanced Baby and Postpartum styling, wrapped month controls, touch-sized primary discovery controls, and no unexplained reserved space from removed cards.

The first browser pass exposed one React development warning caused by `fetchPriority` on the shared topic hero image. The unsupported attribute was removed. The complete repeat pass returned zero console errors across all 39 combinations.

Companion headings totalled 9 at each width in this DOM check: one hub module and eight topic handoffs. The four phase handoffs use the contextual Companion control and are covered by focused regression assertions and source composition.

## Automated validation

- Focused Phase 37A and adjacent TTC, Pregnancy, Companion and link-integrity regressions: 5 files / 50 tests PASS during implementation
- Full suite: 134 files / 1,543 tests PASS
- Typecheck first pass: PASS
- Typecheck second pass: PASS
- Lint: established generated-file baseline of 1 pre-existing error and 10 warnings after the new warning was removed
- Production validation build: PASS
- Deployment: NO

## Final responsive accounting

- route and viewport combinations: 39 of 39 PASS
- overflow failures: 0
- console errors: 0
- broken images: 0
- empty editorial sections: 0
- placeholder editorial cards: 0
- AI used to fill empty slots: 0
- artificial destinations for layout symmetry: 0