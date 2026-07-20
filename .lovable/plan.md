## Phase 10.2a.1 — Pregnancy Topic Image QA Fix

Goal: Resolve the reported duplicate thumbnail on `/pregnancy/diet-and-exercise` (Foods to avoid vs Eating well appearing identical in Start here) and sweep for any other adjacent-thumbnail collisions across the six pregnancy topic pages, before Phase 10.2b.

### Confirmed current state (verified by reading source)

- `PregnancyTopicPage.tsx` renders Start here cards via `resolveImage(item.href, item.image)` — same resolver used by grouped list rows. Start here already reads `HREF_IMAGE_MAP` correctly; no code split between the two card families.
- In `pregnancyTopicData.ts` the diet-and-exercise `startHere` items are `foods-to-avoid`, `eating-well`, `moving-your-body` (no per-item `image` override).
- Current `HREF_IMAGE_MAP` entries:
  - `/articles/foods-to-avoid-in-pregnancy` → `imgFoodsToAvoid` (dedicated `article-hero-foods-to-avoid.jpg`)
  - `/articles/eating-well-in-pregnancy` → `imgSecondEating` (shared generic `article-hero-second-eating.jpg`, also used by heartburn/constipation/antacids fallbacks)
  - `/articles/key-nutrients-in-pregnancy` → `imgKeyNutrients` ✓
  - `/articles/moving-your-body-in-pregnancy` → `imgMovementExercise` ✓ (also used by pelvic-pain and back-pain in Body)

Root cause of the user-reported duplicate: `eating-well-in-pregnancy` has no dedicated hero and reuses the shared `second-eating` asset, which is visually close enough to the food-still-life of `foods-to-avoid` that Start here reads as duplicates. Start here does read `HREF_IMAGE_MAP`; the mapping just doesn't yet give `eating-well` a distinct asset.

### Fix

1. Generate one new premium hero:
   - `src/assets/article-hero-eating-well.jpg` — warm, editorial "eating well in pregnancy" still life clearly distinct from both `article-hero-foods-to-avoid.jpg` (cheese/olives on plate) and `article-hero-second-eating.jpg` (person holding quinoa bowl). Direction: a calm breakfast/lunch spread from above — wholegrain toast, fruit, yoghurt, leafy greens — soft daylight, cream/sage palette, botanical sprig, no faces, no readable text.

2. `src/components/pregnancy/PregnancyTopicPage.tsx`
   - Import `imgEatingWell` from the new asset.
   - Point `/articles/eating-well-in-pregnancy` at `imgEatingWell` in `HREF_IMAGE_MAP`.

3. Adjacent-collision sweep for the six topic pages (Start here row + each grouped column's first ~4 items). Where two visible adjacent cards resolve to the same asset, swap one to a different already-imported asset that still fits the topic. Candidates to check based on current map:
   - **Body**: `stages-of-labour` and `shortness-of-breath` both use `imgThirdMovement`; `back-pain` and `swelling` both use `imgBodyShifts`; `round-ligament-pain` and `watery-discharge` both use `imgSleep`. Only fix if they land adjacent within the same visible group.
   - **Health-and-safety**: `paracetamol` and `medicines` both use `imgMedicines`; `antibiotics` and `hay-fever` both use `imgLifestyle`. Fix only if adjacent in the rendered group.
   - **Preparing-for-baby**: `writing-a-birth-plan` and `birth-preferences` both use `imgBirthPreferences`; `what-happens-if-labour-doesnt-start` and Body's `braxton-hicks` share `imgSignsLabour` but are on different pages.
   - **Baby / Feelings / Diet-and-exercise**: re-check after the eating-well swap.

   For each real adjacent collision found, remap one entry to the nearest topically-appropriate already-imported asset (e.g. swap `stages-of-labour` from `imgThirdMovement` to `imgSignsLabour`; swap `paracetamol-in-pregnancy` from `imgMedicines` to `imgLifestyle` if it sits next to `medicines-in-pregnancy`). No new assets beyond the one above.

### Explicitly out of scope

- No changes to article copy, routes, SEO, sitemap, robots, redirects.
- No changes to TTC or IVF files.
- No structural changes to `pregnancyTopicData.ts` groups or ordering (image map only, in the topic page component).
- No changes to tool logic or calculator formulas.

### Verification

- Confirm Start here on `/pregnancy/diet-and-exercise` now shows three visibly distinct images (foods-to-avoid = cheese still life; eating-well = new wholesome spread; moving-your-body = movement image).
- Walk each of `/pregnancy/body`, `/pregnancy/baby`, `/pregnancy/feelings`, `/pregnancy/health-and-safety`, `/pregnancy/diet-and-exercise`, `/pregnancy/preparing-for-baby` and confirm no two adjacent visible cards (Start here row or grouped list rows) share the same thumbnail.
- Run `bunx tsgo --noEmit`.

### Report at end

- Whether the diet-and-exercise duplicate is fixed and Start here reads the intended mapping.
- List of any other adjacent duplicates found and how each was remapped.
- Files edited and asset created.
- Typecheck result.
