# Phase 10.1 — Pregnancy Visual and Structural Polish

Polish the six pregnancy topic pages so each article feels distinct and the groupings read cleanly. Content strategy, routes, articles and the Map card design stay untouched.

## Part 1 — Distinct thumbnails

Eleven new topic-appropriate JPGs have already been generated in `src/assets/`:

- `article-hero-foods-to-avoid.jpg`
- `article-hero-key-nutrients.jpg`
- `article-hero-medicines.jpg`
- `article-hero-vaccinations.jpg`
- `article-hero-booking-appointment.jpg`
- `article-hero-anti-d.jpg`
- `article-hero-gestational-diabetes.jpg`
- `article-hero-discharge.jpg`
- `article-hero-bleeding-reassurance.jpg`
- `article-hero-induction.jpg`
- `article-hero-birth-preferences.jpg`

`src/components/pregnancy/PregnancyTopicPage.tsx` — extend `HREF_IMAGE_MAP` with new + reused-existing assignments so no two adjacent cards share an image inside a topic:

- Body: `heartburn-in-pregnancy` → `flagship-heartburn-hero`, `pelvic-pain` → `imgMovementExercise`, `round-ligament-pain` → `imgSleep`, `swelling` → `imgBodyShifts` (keep back-pain), `stages-of-labour` → `imgThirdMovement`, `when-to-go-in-for-labour` → `imgHospitalBag`, `mucus-plug` → `imgThirdSleep`, `show-in-pregnancy` → `imgThirdEmotional`, `bleeding-in-early-pregnancy` → `imgImplantation`, `spotting` → new `imgBleedingReassurance`, `discharge` → new `imgDischarge`, `watery-discharge` → `imgSleep`, `leaking-fluid` → `imgThirdMovement`, `when-to-worry-about-cramps` → `imgBodyShifts`.
- Baby: `anterior-placenta` → `flagship-anterior-hero`, `low-lying-placenta` → `imgAnatomyScan`, `breech-baby` → `imgThirdMovement`, `measuring-big-or-small` → `imgPregnancyBump`, `twins-and-multiples` → `imgPregnancyJourney`.
- Feelings: `pregnancy-after-loss` → `article-hero-perinatal-anxiety`, `the-first-trimester-emotionally` → `article-hero-emotional-feeling-like-yourself`.
- Health & safety: `booking-appointment` → new booking JPG, `dating-scan` → `imgTestsScans`, `combined-screening-test` → `imgAnatomyScan`, `nipt-in-pregnancy` → `imgTestsScans`, `20-week-anomaly-scan` → `imgAnatomyScan`, `glucose-tolerance-test` → new GD JPG, `anti-d-injection` → new anti-D JPG, `what-if-a-scan-shows-something-unexpected` → `imgSecondAnxiety`, `medicines-in-pregnancy` → new medicines JPG, `vaccinations` → new vaccinations JPG, `paracetamol` → `imgSecondEating` reused sparingly (or medicines JPG variant), `antibiotics` → `imgLifestyle`, `antacids` → `imgSecondEating`, `laxatives` → `imgFoodAversions`, `hay-fever` → `article-hero-lifestyle`, `cold-and-flu` → `imgSecondAnxiety`, `uti-in-pregnancy` → `imgSleep`, `thrush-in-pregnancy` → new discharge JPG, `bleeding-in-early-pregnancy` → new bleeding-reassurance JPG, `leaking-fluid` → `imgThirdMovement`, `weight-changes` → `imgBodyShifts`.
- Diet & exercise: `foods-to-avoid` → new foods-to-avoid JPG, `key-nutrients` → new key-nutrients JPG (keep `eating-well` on `imgSecondEating`).
- Preparing: `/preparing-for-baby` → `preparing-journey`, `birth-preferences` → new birth-preferences JPG, `hospital-bag` → `imgHospitalBag`, `the-space-your-baby-will-come-home-to` → `imgNursery`, `the-36-week-appointment` → `guidance-preparing`, `group-b-strep` → `article-hero-anti-d` (soft calm hands), `external-cephalic-version` → `imgThirdMovement`, `membrane-sweep` → `guidance-card-emotional`, `induction-of-labour` → new induction JPG, `what-happens-if-labour-doesnt-start` → `imgSignsLabour`, `hand-expressing-colostrum` → `preparing-card`, `preparing-emotionally-for-birth` → `article-hero-emotional-supportive-moment` (differentiate from Feelings).

## Part 2 — Structural polish (`src/data/pregnancyTopicData.ts`)

- **Body** — add `fatigue-in-early-pregnancy` to "Nausea, fatigue and the early weeks". Rename all `&` labels to `and` (Nausea/Aches/Digestion/Bleeding/Late signs).
- **Baby** — delete duplicate "Development and growth" group (its one article is already in Start here). Merge "Twins and multiples" into "Growth and scans" and rename to "Growth, scans and multiples".
- **Feelings** — merge single-item "Looking towards birth" and "Harder experiences" into one group "Preparing for what comes next" holding both `preparing-emotionally-for-birth` and `pregnancy-after-loss`.
- **Health & safety** — rename "Appointments, scans & screening" → "Appointments, scans and screening". Merge "Vaccinations" into "Medicines & common illnesses" and rename "Medicines and vaccinations". Trim "Bleeding, discharge & reassurance" to `bleeding-in-early-pregnancy`, `when-to-worry-about-cramps`, `leaking-fluid` and rename "Bleeding and reassurance" (removes duplication with Body). Remove `foods-to-avoid` from "Staying well day to day" (owned by Diet).
- **Preparing** — collapse five groups into three: "Getting ready for baby" (guide + space + emotionally), "Birth planning" (preferences + hospital bag), "Late-pregnancy decisions" (unchanged).

## Part 3 — Existing article added

`fatigue-in-early-pregnancy` inserted into Body → early weeks group (image already mapped).

## Part 4 — Label consistency

Group labels use "and" not "&" across all six pregnancy topics. Map card labels on `/pregnancy` remain untouched (Map redesign is out of scope).

## Part 5 — Preservation

- No routes, sitemap, redirects, article files, SEO, calculators, TTC, IVF, or auth changes.
- No Map redesign — only data groupings and image assignments.
- Reviewer credit, canonical work, and 9.14.1b IVF pathway panel untouched.

## Verification

- `bunx tsgo --noEmit` clean.
- Visually spot-check each topic page: no two adjacent thumbnails share an image; single-item groups are gone; label style is uniform.
