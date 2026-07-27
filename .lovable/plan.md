# Phase 13.7a — Personalised Visuals Review Pack (Final)

**Status:** review-only planning pack. No code, no migration, no UI, no assets in the repo, no product wiring. This pack is to be handed to Jenny Joines (or the agreed editorial reviewer) for sign-off before any Nano Banana pilot generation.

## 1. Approved product copy

**Setting prompt:**
> Would you like your journey illustrations to feel more personalised?

**Section subline:**
> A gentle visual preference for the baby illustrations shown on your weekly page.

**Disclaimer:**
> These illustrations are symbolic and may not reflect exactly how your baby will look.

**Save confirmation toast:**
> Illustration style updated.

**Reset link:**
> Use the default illustrations

## 2. Approved chip labels

**Long form (first exposure, used inside the picker):**
- Use the default illustrations
- Lighter skin tone style
- Medium skin tone style
- Deeper skin tone style
- Mixed or varied illustration set
- Skip for now

**Short form (compact contexts only when the heading and disclaimer are visible):**
- Default
- Lighter
- Medium
- Deeper
- Varied

## 3. Rejected wording (never use in any surface, alt text, tooltip, or analytics)

- ethnicity, ethnicity accuracy, ethnicity match
- accurate, exact, exact skin tone, real baby colour, real skin colour
- predicted, prediction, predicted appearance
- what your baby will look like
- guarantee, guaranteed
- race, racial, mixed-race, biracial
- realistic, lifelike, true-to-life
- match your baby, match your family
- light-skinned baby, dark-skinned baby (noun forms attach identity to a person)

## 4. Approved disclaimer placement

- Directly beneath the picker chips in Account Settings.
- Once per session as a small muted caption beneath the first personalised illustration on `/my-week`, not repeated on every image.
- Never on public pages. Never inside AI answers.

## 5. Approved privacy rules (future build must follow)

- No `ethnicity` field.
- No free-text stored alongside the preference.
- No race or identity labels stored.
- The preference is never used in any AI prompt (`ai-search`, `ai-reflect`, or future functions).
- The preference is never sent as an analytics property or event name.
- No per-user image generation. All personalised assets are reusable, reviewed, shipped sets.
- The preference is never rendered on any public page or export.
- User can skip during selection.
- User can clear the preference at any time from Account Settings; clearing returns to the default set.

## 6. Surfaces included in v1 (if the feature proceeds later)

- Symbolic baby stand-in illustrations on `/my-week` only (the trimester-level baby stand-in imagery, e.g. the current `myweek-baby-early/mid/late.png` family).

## 7. Surfaces excluded from v1 (do not touch)

- Fetus development images (`myweek-weekly-babies`, `WeekIllustration`, `MyWeekBabyImage`, biology detail images).
- Size cues (`src/assets/size-cues/`).
- Article hero images (`ArticleHeroImage`, `articleHeroImage.ts`).
- Weekly Reads card imagery (`SectionWeeklyReads`).
- Journey Support (`JourneySupport.tsx`).
- User-uploaded photos and videos (`week_photos`, `week_media_memories`).
- Setup onboarding (`Setup.tsx`).

## 8. Approved future home

- If built later, the setting lives first in **Account Settings**, placed after Companion and before Journey Status.
- Not added to Setup onboarding in v1.

## 9. Corrected "varied" direction

- **Do not** generate a single baby illustration with blended skin tones across its form.
- **Do not** place text labels inside any generated image.
- **"Varied" is a mixed illustration set**, not a single image.
- For the review, the varied preview is a layout composition that shows the **default** + **light** + **medium** + **deep** images side by side.
- Any labels ("Default", "Light", "Medium", "Deep") are added **outside the images** in the review document, not baked into the images.

## 10. Nano Banana pilot brief

**Images to generate with Nano Banana:** exactly **3**.
- Mid pregnancy baby stand-in in **light** skin tone style.
- Mid pregnancy baby stand-in in **medium** skin tone style.
- Mid pregnancy baby stand-in in **deeper** skin tone style.

**Control:** the existing `myweek-baby-mid.png` (default) is kept untouched for side-by-side comparison.

**Varied preview:** not generated. It is a review-only layout composed of the default control + the three generated images, with labels placed outside the images.

**Shared style rules:**
- Premium soft watercolour style, matching the current `myweek-baby-*` family.
- Symbolic baby stand-in only, non-clinical, non-medical.
- No clothing, jewellery, flags, cultural markers, culturally specific hairstyles, or exaggerated features.
- No photorealism, no text, no watermark.
- Same pose, framing, lighting, composition and canvas dimensions as the existing `myweek-baby-mid.png`.
- Legible at card size (~120px) and at hero size (~480px+).

**Pilot prompts (starter for reviewer):**

Shared negative prompt for all generated images:
> No text, no watermark, no clothing, no jewellery, no flags, no cultural markers, no hairstyles, no exaggerated features, no photorealism, no medical illustration, no anatomical labels, no logo, no labels, no typography.

Light:
> Soft, premium watercolour-style illustration of a symbolic baby form in a curled resting pose, matching the existing `myweek-baby-mid.png` composition, framing, lighting and background. Neutral warm background. Skin tone palette: soft, warm ivory to light peach undertones. Symbolic and gentle, not medical.

Medium:
> Soft, premium watercolour-style illustration of a symbolic baby form in a curled resting pose, matching the existing `myweek-baby-mid.png` composition, framing, lighting and background. Neutral warm background. Skin tone palette: warm honey to soft caramel undertones. Symbolic and gentle, not medical.

Deep:
> Soft, premium watercolour-style illustration of a symbolic baby form in a curled resting pose, matching the existing `myweek-baby-mid.png` composition, framing, lighting and background. Neutral warm background. Skin tone palette: warm deep cocoa to soft umber undertones. Symbolic and gentle, not medical.

**Output requirements:**
- Same aspect ratio and canvas dimensions as `myweek-baby-mid.png`.
- Saved to a review-only scratch folder (not `src/assets/`).
- Filenames for review only: `pilot-myweek-baby-mid-{light|medium|deep}.png`.

## 11. Approved alt text

- Light: `Symbolic baby illustration in a lighter skin tone style.`
- Medium: `Symbolic baby illustration in a medium skin tone style.`
- Deep: `Symbolic baby illustration in a deeper skin tone style.`
- Default set: `Symbolic baby illustration.`
- Varied preview (layout): `Preview of the symbolic baby illustration set showing default, lighter, medium and deeper styles.`

Avoid: `accurate`, `exact`, `real`, `predicted`, `ethnicity`, `race`, `looks like your baby`, `varied skin tone`.

## 12. Side-by-side review checklist

Display the four images (default control + light + medium + deep) at both small (~120px) and large (~480px) sizes, plus the varied preview layout (default + light + medium + deep with labels outside the images).

- [ ] Light, medium and deep images share identical pose, framing, composition, lighting and background.
- [ ] Only the skin tone palette differs between light, medium and deep.
- [ ] No generated image contains clothing, jewellery, cultural markers, hairstyles, patterns, text, labels, watermarks or logos.
- [ ] No image reads as medical, anatomical, clinical, photorealistic or predictive.
- [ ] Each generated image is pleasant and legible at 120px card size.
- [ ] Each generated image is pleasant and legible at hero size (≥480px).
- [ ] The three pilot styles feel like siblings of the default, not a different product.
- [ ] No style feels visibly lesser in quality, warmth or finish than another.
- [ ] The varied preview layout clearly shows four distinct images without any blended gradient skin tones.
- [ ] The varied preview layout uses labels placed **outside** the images.
- [ ] Recommended chip labels read appropriately next to each image.
- [ ] The disclaimer reads appropriately next to the picker.
- [ ] Reviewer records any changes required before green-lighting the full 12-image set.

## 13. Risks and mitigations

- **Editorial drift:** labels or alt text could slip into identity or accuracy claims. Mitigated by §2–§3 and §11.
- **Visual inconsistency:** style drift between light/medium/deep sets. Mitigated by the shared prompt and §12.
- **Sensitivity of "varied":** a single blended baby could feel unnatural. Mitigated by the corrected direction in §9 and the outside-label rule in §10.
- **Text in images:** AI-generated text can be messy or misspelled. Mitigated by the no-text rule in §10.
- **Scope creep:** personalisation leaking into fetus, article, AI or analytics surfaces. Mitigated by §6–§7 exclusion list and §5 privacy rules.
- **Exclusion risk:** users may not feel represented. Mitigated by keeping the default inclusive, offering "Varied" and "Skip", and treating the option as a visual preference, not identity data.

## 14. Review gate

Before any Nano Banana generation, the reviewer must sign off on:
- Product copy (§1)
- Chip labels (§2)
- Disclaimer (§4)
- Alt text (§11)
- Nano Banana pilot brief (§10)
- Side-by-side review checklist (§12)

After sign-off, proceed **only** to the 3-image review-only pilot. The varied preview is assembled from the control + the three generated images. Do not proceed to data model, migration, Account Settings UI, or `/my-week` wiring until the pilot passes the side-by-side review.

## 15. Explicit non-goals for this phase

- No `profiles.illustration_style` column or enum.
- No migration.
- No Account Settings UI.
- No resolver, hook or library.
- No new assets in `src/assets/`.
- No changes to `/my-week`, `/my-journey`, or any toolkit surface.
- No AI, no analytics, no storage changes, no route changes.
