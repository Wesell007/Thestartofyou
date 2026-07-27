## Phase 13.7c.1 — Early Variant Background Fix

Rerun only the three Early skin-tone style variants. The v1 Early outputs baked in a transparency checkerboard because the Early control PNG has a transparent background. Fix by generating from a temporary cream-background composite of the Early control. Mid and Late remain untouched. Nothing written to `src/assets`, no code changes.

### Steps

1. **Archive v1 Early checkerboard files** into `/mnt/documents/phase-13-7c-full-illustration-set/archive/`:
   - `myweek-baby-early-light-v1-checkerboard.png`
   - `myweek-baby-early-medium-v1-checkerboard.png`
   - `myweek-baby-early-deep-v1-checkerboard.png`

2. **Build temporary cream-background edit input** by compositing `src/assets/myweek-baby-early.png` onto a clean cream paper background at original canvas size. Save to `/mnt/documents/phase-13-7c-full-illustration-set/_tmp/early-control-cream.png`. Original `src/assets/myweek-baby-early.png` is not modified.

3. **Generate three Early variants** with `imagegen--edit_image`, using the temp cream input, one call per variant, applying the user-supplied prompts and shared negative prompt. Overwrite the v1 files at:
   - `/mnt/documents/phase-13-7c-full-illustration-set/myweek-baby-early-light.png`
   - `/mnt/documents/phase-13-7c-full-illustration-set/myweek-baby-early-medium.png`
   - `/mnt/documents/phase-13-7c-full-illustration-set/myweek-baby-early-deep.png`

4. **Visual check** each new file: no checkerboard, cream background matches temp input, pose/framing/composition unchanged, only skin tone shifts, no baked-in labels.

5. **Rebuild review sheets** (labels outside panels, Default column uses the cream-composite Early control, not the transparent checkerboard):
   - `review-sheet-early-small.png`
   - `review-sheet-early-large.png`
   - `review-sheet-all-large.png` — Early row rebuilt; Mid and Late rows copied unchanged.
   
   Do not rebuild Mid-only or Late-only sheets.

6. **Update `generation-notes.md`** with: rerun reason (checkerboard bake-in), archived v1 paths, confirmation that `src/assets/myweek-baby-early.png` was not modified, confirmation temp cream input is review-only, new SHA-256 for each revised Early variant, confirmation Mid/Late not regenerated, confirmation nothing added to `src/assets`, confirmation no code/migration/UI/route/analytics/AI/product wiring changes, any residual visual drift for Jenny.

### Hygiene

No code edits, no migrations, no `src/assets` additions, no route/UI/analytics/AI changes. All output stays under `/mnt/documents/phase-13-7c-full-illustration-set/`.

### Stop point

Stop after the Early fix and return updated review materials. Do not proceed further.

### Return

Paths for the three revised Early files, the three rebuilt review sheets, the archived v1 paths, the updated `generation-notes.md`, hygiene confirmation, and any residual visual drift.
