
# Phase 14.8: Full Personalised Realism Variant Generation (revised)

Review-only image generation under `/mnt/documents/phase-14-8/`. No code, assets, `.asset.json`, resolver, wiring, migrations, routes, sitemap, analytics, or AI-prompt changes. Old 3-stage system stays.

## Scope

- Weeks 9–42 only. Weeks 1–8 stay neutral-only.
- Tones: Light, Medium, Deep.
- Target set: 34 weeks × 3 = 102 images.
- Approved Phase 14.7 pilots (W12, W20, W36 × L/M/D = 9) are copied in, not regenerated.
- **New in Phase 14.8: 93 images.**

## Source strategy (corrected)

Repo path `src/assets/myweek-weekly-realism/` holds `.asset.json` pointers, not raw PNGs. Sources for edit-from-default:

- Primary: approved Phase 14.2 PNGs at `/mnt/documents/phase-14-2/images/`.
- Use the `week-XX.v2.png` file where Phase 14.2b approved a v2 for that week; otherwise use `week-XX.png`.
- In the W9–42 range, v2 applies to: **9, 13, 16, 21, 26, 31, 32, 34**. All other weeks use v1.
- Fallback if any source is missing: fetch the CDN URL from the matching `.asset.json` pointer and use that as the edit source.

Every source path is verified to exist before generation begins.

## Method

- Tool: `imagegen--edit_image`, model `premium.gemini` (Nano Banana 2).
- Edit-from-default only. Never generate from scratch. Omit width/height to preserve source dimensions.
- Prompt template per tone, applied verbatim to every week (archived under `prompts/<tone>/week-XX.md` before generation):

  > "Edit only the baby's skin tone to a natural {tone-specific description}. Preserve exactly: pose, anatomy, composition, framing, crop, scale, sac boundary, cord path, wall-bloom/placenta treatment, warm paper background, in-utero lighting direction, watercolour texture, and developmental maturity. Change nothing else. Blend the skin tone naturally into the existing womb lighting with minimal shading adjustments only."

  Tone-specific descriptions carried forward from Phase 14.7 approval:
  - **Light**: warm, natural light baby skin tone. Never pale, grey, chalky, or washed out.
  - **Medium**: natural medium brown baby skin tone with warm highlights preserved. Not oversaturated.
  - **Deep**: natural deep brown baby skin tone. Preserve watercolour softness and visible highlights. Shadows not too heavy.

## Batches (corrected)

1. **A** — W9, 10, 11, 13 × L/M/D = 12
2. **B** — W14, 15, 16, 17, 18 × L/M/D = 15
3. **C** — W19, 21, 22, 23, 24 × L/M/D = 15
4. **D** — W25, 26, 27, 28, 29, 30 × L/M/D = 18
5. **E** — W31, 32, 33, 34, 35, 37 × L/M/D = 18
6. **F** — W38, 39, 40, 41, 42 × L/M/D = 15

Total: 12 + 15 + 15 + 18 + 18 + 15 = **93**.

Spot-check outputs after each batch before continuing.

## Output layout

```
/mnt/documents/phase-14-8/
  images/
    light/   week-09.png … week-42.png     (34 files incl. copied pilots)
    medium/  week-09.png … week-42.png
    deep/    week-09.png … week-42.png
  sheets/
    light-review-sheet.png                 # W9–42
    medium-review-sheet.png                # W9–42
    deep-review-sheet.png                  # W9–42
    four-up-spot-checks.png                # default|light|medium|deep for W9,12,16,20,26,32,36,40,42
    full-variant-review-sheet.png          # all tones together
  prompts/
    light/week-XX.md
    medium/week-XX.md
    deep/week-XX.md
  notes.md
```

Sheets built with Python/PIL, same pattern as Phase 14.2/14.7.

## Rerun policy

If a variant drifts on pose, face, cord, sac, crop, framing, or maturity stage, rerun once as `week-XX.v2.png` with a stricter preservation prompt. No iteration past v2 — flag for product review in `notes.md`.

## notes.md contents

Per image: source default used (v1 or v2), model, pose preserved (y/n), sac/womb preserved (y/n), cord preserved (y/n), only-skin-tone-changed (y/n), any drift, pass or rerun. Plus: list of reruns, unresolved issues, final recommendation on readiness for Phase 14.9 import planning.

## Stop point

Stop after the 93 new variants, copied 9 pilot images, 5 review sheets, prompt archive, and `notes.md`. No import, no `.asset.json`, no resolver edits, no wiring, no Phase 14.9.
