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
- Final closure regressions covering global link integrity, Phase 35C TTC closure and Phase 36A Pregnancy behaviour: 3 files / 27 tests PASS
- Five distinct journey account states and four unique destinations: PASS
- Full suite: 132 files / 1,522 tests PASS
- Typecheck x2: PASS
- Lint: unchanged baseline, 1 pre-existing generated-file `prefer-const` error and 10 warnings
- Production validation build: PASS with 353 sitemap entries
- Application deployment: NO

Pre-existing stale TTC internal references discovered during Phase 36A validation and canonicalised to the already-approved Phase 35C destinations.

Final integrity results: stale internal TTC references before 4 and after 0; canonical replacements 4; legacy redirects preserved 3; broken TTC routes 0; broken Pregnancy routes 0; broken internal links 0; wrong-destination links 0.

PHASE 36A — PREGNANCY HUB & TOPIC UX, DISCOVERY AND AI SEPARATION

CLOSED PASS / PREGNANCY PUBLIC EXPERIENCE REFINED / NO NEW CONTENT

TTC WORKSTREAM — CLOSED FOR CURRENT STRATEGY