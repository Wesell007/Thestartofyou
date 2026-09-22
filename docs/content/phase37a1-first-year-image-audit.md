# Phase 37A.1 First Year image audit

## Canonical scope

The locked 96 placement baseline reconciles as follows:

| Surface | Baseline | KEEP | RECROP | REPLACE WITH EXISTING APPROVED ASSET | REPLACE WITH NEW JUSTIFIED ASSET | REMOVE |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| Four phase heroes | 4 | 4 | 0 | 0 | 0 | 0 |
| Eight topic heroes | 8 | 8 | 0 | 0 | 0 | 0 |
| Topic featured discovery cards | 21 | 6 | 0 | 0 | 0 | 15 |
| Article heroes | 26 | 11 | 0 | 0 | 0 | 15 |
| Article body images | 37 | 21 | 0 | 0 | 0 | 16 |
| **Total** | **96** | **50** | **0** | **0** | **0** | **46** |

Arithmetic: 50 + 0 + 0 + 0 + 46 = 96. Every baseline placement has exactly one disposition.

The 21 topic featured discovery cards are the Phase 37A baseline previously described as Start Here cards. Repository truth is eight cards carrying the literal `start-here` tag; all 21 featured placements were audited.

## Article hero audit

### KEEP, 11

- teething
- colic-and-evening-crying
- introducing-solid-foods
- newborn-quirks-and-reflexes
- newborn-skin-spots-and-marks
- common-illnesses-in-the-first-year
- stitches-tears-and-perineal-healing
- separated-tummy-muscles
- sex-and-intimacy-after-birth
- when-sleep-suddenly-changes
- when-parenthood-feels-heavy

### REMOVE, 15

- newborn-sleep-expectations
- helping-your-baby-settle
- healing-after-birth
- what-recovery-can-feel-like
- body-changes-after-birth
- hormones-sweat-and-hair-loss
- postnatal-checks-and-appointments
- when-to-ask-for-help-after-birth
- feeling-like-yourself-again
- bottle-and-breastfeeding-questions
- newborn-feeding-rhythms
- baby-development-in-the-first-year
- when-milestones-feel-uneven
- baby-care-basics
- safe-sleep-and-home-safety

All removed heroes have an explicit First Year suppression decision. They render as intentional text-led layouts without fallback photography, placeholders, ratio boxes or reserved whitespace. `Bottle and breastfeeding questions` no longer maps to `firstyear-scene.jpg`.

## Article body audit

All 37 baseline body placements were reviewed. Twenty-one relevant placements remain. Sixteen weak, generic, repeated or irrelevant placements were removed. Body imagery remains optional and no removed body placement creates a blank slot.

## Topic featured discovery cards

All 21 featured placements were reviewed. Six relevant placements retain approved existing imagery. Fifteen use explicit `image: null` and render as text-led cards without category fallback, placeholders or reserved image ratios.

## Separate presentation audit

- `CURRENT_PATHWAY_PRESENTATION_PLACEMENTS = 0`. The Baby's First Year and Postpartum Recovery pathway presentations use styling, not still images.
- The First Year hub video was audited separately and retained. It is not part of the 96 denominator.
- New generated images: 0.

## Shared asset safety

- Image placements removed: 46.
- Underlying asset files made unreferenced: 1.
- Underlying asset files deleted: 1 (`firstyear-body-newborn-quirks-and-reflexes-1.jpg`).
- Shared assets retained because valid references remain: 5 confirmed shared assets, plus `firstyear-scene.jpg` retained for the normal unsuppressed First Year card fallback.
- `firstyear-scene.jpg` references after correction: First Year 1, non First Year 0, other system or test references 1.
- Broken asset references after correction: 0.
- Non First Year asset references changed: 0.
