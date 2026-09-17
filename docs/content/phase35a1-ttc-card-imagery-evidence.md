# Phase 35A.1: TTC Explore topic card imagery evidence

## Scope result

- Explore TTC topic cards with imagery: 7 / 7
- Unique and relevant image treatment: YES
- Existing destinations preserved: YES
- Topic grouping and order unchanged: YES
- Topic page compact libraries changed: NO
- New content: 0
- New routes: 0
- Application deployed: NO

## Image mapping

| Card | Existing approved image |
| --- | --- |
| Cycle tracking | `ttc-stage-cycle.jpg` |
| The two-week wait | `ttc-stage-waiting.jpg` |
| Pregnancy testing in TTC | `ttc-pregnancy-tests.jpg` |
| Conditions that can affect TTC | `ttc-conditions.jpg` |
| Age and fertility | `ttc-age-and-fertility.jpg` |
| Male fertility | `ttc-male-fertility.jpg` |
| IVF and fertility treatment | `ttc-ivf-treatment.jpg` |

All seven assets were already associated with their matching TTC destination. Each image is unique within the hub and uses the existing local asset pipeline. No image was generated or downloaded.

## Responsive review

The canonical `/trying-to-conceive` hub was reviewed in Chromium with reduced motion enabled.

| Width | Columns | Cards | Image height | Horizontal overflow | Console errors | Result |
| --- | ---: | ---: | ---: | --- | ---: | --- |
| 1280px | 3 | 7 | 160px | No | 0 | PASS |
| 834px | 2 | 7 | 160px | No | 0 | PASS |
| 390px | 1 | 7 | 160px | No | 0 | PASS |

Visual inspection confirmed editorial crops without stretching, readable complete titles and descriptions, visible `Explore topic` actions, balanced row rhythm, and appropriately compact mobile images. All seven lazy loaded images completed successfully at each viewport.

Keyboard traversal reached the first supporting card with `:focus-visible` active and a visible outline. Images are decorative within the existing fully labelled card links, use empty alternative text, and do not create separate destinations.

The hub card marker is absent from `/trying-to-conceive/ovulation`, `/trying-to-conceive/preconception-health`, and `/trying-to-conceive/fertility`, confirming their compact libraries were not given the new hub treatment.

## Automated validation

- Focused TTC and link coverage: 4 files, 35 tests passed
- Final focused Phase 35A test: 10 tests passed
- Full suite: 130 files, 1,499 tests passed
- Typecheck: passed twice
- Production validation build: passed, 356 sitemap entries
- Changed file lint: passed
- Repository lint: unchanged baseline of one generated file `prefer-const` error and ten existing warnings before the metadata extraction; no Phase 35A.1 lint issue remains

## Closure

`PHASE 35A.1 — TTC EXPLORE TOPIC CARD IMAGERY`

`CLOSED PASS / VISUAL REFINEMENT COMPLETE`