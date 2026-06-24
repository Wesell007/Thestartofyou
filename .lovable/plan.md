# /first-year — final top-of-page correction

Surgical pass on the top of `/first-year` only. Nothing from `FYAISupport` downward changes. No new sections, no route changes, no Step 3.

## Changes

### 1. `FYHero.tsx` — rebuild as the single premium opening
- Full-bleed still image using `src/assets/firstyear-scene.jpg` (no video).
- Soft parchment veil over the image. Desktop: left-to-right gradient (content-left, image-right). Mobile: top-to-bottom veil so the image reads as a softer top backdrop.
- Heights: `min-h-[70vh]` mobile, `min-h-[78vh]` desktop.
- Subtle dual-tone wash at the bottom edge: `--stage-firstyear-soft` on the left third, `--stage-recovery-soft` on the right third, very low opacity, blurred.
- Content (minimal):
  - Eyebrow: `First year`
  - Serif headline: *Their first year, and **your recovery**.* (italic on "your recovery", coloured `--stage-recovery-deep`)
  - One support line: *Your baby will change quickly. You're healing too. Both belong here.*
  - Two equal pill CTAs, identical size/padding/weight:
    - **Baby's first year** → `#baby-topics` (filled `--stage-firstyear-deep`)
    - **Your recovery** → `#recovery-topics` (filled `--stage-recovery-deep`)
- Removed from hero: the two inner bands with their own eyebrows / sub-headlines / descriptions / inner CTAs. The dual logic now lives in the headline + support line + two equal CTAs + dual-tone wash only.

### 2. `src/pages/FirstYear.tsx` — remove duplicated paired intro
- Remove the `FYTwoTrackEntry` import and its usage from the render tree.
- Leave `FYTwoTrackEntry.tsx` on disk (unused) — do not delete the file.
- Section order after change:
  1. `FYHero`
  2. `FYStickyTrackNav`
  3. `FYWhatThisCovers` (simplified, see #3)
  4. `FYAISupport` → `FYPhaseNav` → `FYTopicsParallel` → `FYCommonQuestions` → `FYMedicallyReviewed` → `FYReflection` → `FYPathways` → `FYFinalCTA` (all untouched)

### 3. `FYWhatThisCovers.tsx` — light bridging strip
- Keep the small heading: `What you'll find here`.
- Replace the two-column dual block with **one short calm paragraph**:
  *"Month-by-month guidance for your baby, from feeding and sleep to development and care. Alongside it, equal space for your recovery, including healing, hormones, mood and the check-ups that matter."*
- Remove the two coloured accent rails, the `For your baby` / `For you` sub-eyebrows, and any restatement of the split in two columns.
- Tighter vertical padding so it reads as a bridge, not a section.

### 4. Anchor placement
- `FYTopicsParallel` (`FYTopicClusters.tsx`): change the baby column anchor `id="baby"` → `id="baby-topics"` and the recovery column anchor `id="recovery"` → `id="recovery-topics"`. Both already have `scroll-mt-24`.
- `FYStickyTrackNav.tsx`: update the two `href` values from `#baby` / `#recovery` to `#baby-topics` / `#recovery-topics` so the sticky nav and hero CTAs land on the same equivalent destinations.

## Files touched
- `src/pages/FirstYear.tsx`
- `src/components/firstyear/new/FYHero.tsx`
- `src/components/firstyear/new/FYWhatThisCovers.tsx`
- `src/components/firstyear/new/FYTopicClusters.tsx` (anchor IDs only)
- `src/components/firstyear/new/FYStickyTrackNav.tsx` (href values only)
- `src/components/firstyear/new/FYTwoTrackEntry.tsx` left on disk, not rendered.

## Guardrails honoured
- Hero is the only place baby + recovery are introduced as a pair.
- Recovery CTA equal in weight, size, padding and prominence to baby CTA.
- No new sections, no Step 3, no topic-page work, no route changes.
- No TTC / IVF / Pregnancy files touched.

## Return after build
A. Changed files · B. Duplication removed (FYTwoTrackEntry unmounted) · C. Hero rebuild summary · D. Hero uses **`firstyear-scene.jpg` still image only** · E. Bridging section simplification · F. Confirmation rest of hub stayed untouched.
