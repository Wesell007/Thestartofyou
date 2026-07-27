## Phase 13.7c.2 — Early Womb/Sac Read Rerun

Review-only rerun of the three Early skin-tone variants. Goal: strengthen the surrounding form so Early clearly reads as a stage-appropriate womb/sac enclosure — premium illustrated, symbolic, non-clinical — while remaining softer and more delicate than Mid and Late. Uploaded chat reference images are visual direction only, never used as final assets. Mid and Late are not regenerated (they will be re-reviewed under the same womb-read standard in a later pass).

### Steps

1. **Verify temp input** at `/mnt/documents/phase-13-7c-full-illustration-set/_tmp/early-control-cream-clean.png`. If missing, recreate from `src/assets/myweek-baby-early.png` by cleaning the checkerboard and compositing on a clean cream paper background at original canvas size. `src/assets/myweek-baby-early.png` is not modified.

2. **Archive current Early files** into `/mnt/documents/phase-13-7c-full-illustration-set/archive/` with suffix `-v2-halo-weak`:
   - `myweek-baby-early-light-v2-halo-weak.png`
   - `myweek-baby-early-medium-v2-halo-weak.png`
   - `myweek-baby-early-deep-v2-halo-weak.png`

3. **Regenerate three Early variants** in parallel with `imagegen--edit_image`, using the temp cream-clean input, the user-supplied per-tone prompts, and the shared negative prompt. Overwrite:
   - `/mnt/documents/phase-13-7c-full-illustration-set/myweek-baby-early-light.png`
   - `/mnt/documents/phase-13-7c-full-illustration-set/myweek-baby-early-medium.png`
   - `/mnt/documents/phase-13-7c-full-illustration-set/myweek-baby-early-deep.png`

4. **Visual check** each new file against the review standard: reads clearly as a womb/sac environment; softer than Mid and Late; consistent visual family (pose, framing, composition, cream background, watercolour finish unchanged); realistic without becoming clinical; premium; no checkerboard, labels, or cultural markers; only skin tone + sac form adjusted.

5. **Rebuild three review sheets only** (labels outside panels; Early Default column uses the cream-clean control):
   - `review-sheet-early-small.png`
   - `review-sheet-early-large.png`
   - `review-sheet-all-large.png` — Early row rebuilt; Mid and Late rows copied unchanged.

6. **Update `generation-notes.md`** with:
   - Rerun reason (womb/sac enclosure needed strengthening; halo previously read too soft).
   - Note that uploaded chat images were visual direction only, not final assets.
   - Confirmation Early stays softer than Mid and Late.
   - Note Mid and Late will be re-reviewed under this standard later; not regenerated here.
   - Archived v2 paths.
   - Confirmation `src/assets/myweek-baby-early.png` not modified.
   - Confirmation temp cream-clean input is review-only.
   - New SHA-256 for each revised Early variant.
   - Confirmation Mid and Late not regenerated.
   - Hygiene confirmation: no code, no migrations, no `src/assets` additions, no route/UI/analytics/AI/product wiring changes.
   - Any residual visual drift for Jenny.

### Hygiene

No code edits, no migrations, no `src/assets` additions, no route/UI/analytics/AI/product wiring changes. All output stays under `/mnt/documents/phase-13-7c-full-illustration-set/`.

### Stop point

Stop after the Early rerun and return updated review materials. Do not proceed to build or integration.

### Return

Paths for the three revised Early files, the three rebuilt review sheets, the archived v2 paths, the updated `generation-notes.md`, hygiene confirmation, and any residual visual drift for Jenny.