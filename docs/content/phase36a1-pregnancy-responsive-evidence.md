# Phase 36A.1 Pregnancy responsive evidence

## Browser matrix

Fresh browser evidence covers seven Pregnancy surfaces at three widths, for 21 route and viewport combinations.

| Surface | Desktop 1280 | Tablet 834 | Mobile 390 |
| --- | --- | --- | --- |
| Pregnancy hub | PASS | PASS | PASS |
| Your body | PASS | PASS | PASS, breadcrumb refined |
| Your baby | PASS | PASS | PASS, breadcrumb refined |
| Your feelings | PASS | PASS | PASS, breadcrumb refined |
| Health and safety | PASS | PASS | PASS, breadcrumb refined |
| Diet and exercise | PASS | PASS | PASS, breadcrumb refined |
| Preparing for baby | PASS | PASS | PASS, breadcrumb refined |

Across all 21 checks:

- horizontal overflow: 0
- console errors: 0
- broken images: 0
- broken Pregnancy destinations: 0
- excessive unexplained vertical gaps: 0

At 390 pixels, all six topic breadcrumbs were measured 31 pixels below the fixed header. Each retained its Home and Pregnancy links, current-page semantics and visible browser focus outline. At 834 and 1280 pixels the existing breakpoint rules, breadcrumb colour and hero composition remain unchanged.

## Reconfirmed experience gates

- canonical Pregnancy pathways: 6
- distinct approved pathway images: 6
- trimester destinations: 3
- week destinations: 42
- editorial FAQ rows: 6
- FAQ AI actions: 0
- embedded hub Companion modules: 1
- topic contextual Companion handoffs: 6
- calculator changes: 0

## Automated validation

- Focused Pregnancy UI, route, calculator, trimester and week, Companion boundary and breadcrumb accessibility regressions: 11 files / 114 tests PASS
- Full suite: 132 files / 1,523 tests PASS
- Typecheck x2: PASS
- Lint: unchanged baseline, 1 pre-existing generated-file `prefer-const` error and 10 warnings
- Production validation build: PASS with 353 sitemap entries
- Application deployment: NO

## Boundaries

New content 0; new guidance 0; new routes 0; new images 0; week model 0; calculator 0; lifecycle 0; database 0; schema 0; analytics 0; AI runtime 0; AI prompts 0; context builder 0; grounding 0; memory 0; reviewer claims 0; TTC changes 0.

PHASE 36A.1 — PREGNANCY VISUAL QA & PREMIUM POLISH

CLOSED PASS / PREGNANCY UX VISUALLY APPROVED
