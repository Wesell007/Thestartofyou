## Phase 13.7c — Full Nano Banana Trimester Illustration Set (Review Only)

Review-only generation. No code, no migrations, no `src/assets/` changes, no product/route/UI/analytics/AI wiring. All output under `/mnt/documents/phase-13-7c-full-illustration-set/`.

### Locked decisions (carried from 13.7b.1)
- Default control stays as the default; not renamed, not treated as a skin tone category. Chip label remains "Use the default illustrations".
- Approved mid-stage set (Lighter v2, Medium v2, existing Deep pilot) is **copied** into the new folder from `/mnt/documents/phase-13-7b-pilot/` — the live v2 files, not the archived v1 files. Mid is not regenerated.
- Only Early and Late variants are generated now (6 new images).
- No Varied image is generated.

### Steps

1. **Verify controls** (confirmed present in `src/assets/`):
   - `myweek-baby-early.png`
   - `myweek-baby-mid.png`
   - `myweek-baby-late.png`
   
   Record SHA-256 before and after; they must match.

2. **Copy approved mid-stage v2** into the new folder:
   - `/mnt/documents/phase-13-7b-pilot/pilot-myweek-baby-mid-light.png` → `myweek-baby-mid-light.png`
   - `/mnt/documents/phase-13-7b-pilot/pilot-myweek-baby-mid-medium.png` → `myweek-baby-mid-medium.png`
   - `/mnt/documents/phase-13-7b-pilot/pilot-myweek-baby-mid-deep.png` → `myweek-baby-mid-deep.png`

   Do not pull from `/mnt/documents/phase-13-7b-pilot/archive/` (v1 files stay archived for reference only).

3. **Generate 6 new images** via `imagegen--edit_image`, using the matching default trimester control as the edit input. Full prompts (no ellipses):

   - **Early Lighter** → `myweek-baby-early-light.png`
     > Generate a lighter skin tone style version of the existing early control image. Keep the original sac colour and cream paper background unchanged. Keep the same pose, framing, lighting, composition and watercolour finish. Only adjust the baby skin tone to a soft warm ivory to light peach palette. Symbolic and gentle, not medical.
   - **Early Medium** → `myweek-baby-early-medium.png`
     > Generate a medium skin tone style version of the existing early control image. Keep the original sac colour and cream paper background unchanged. Keep the same pose, framing, lighting, composition and watercolour finish. Only adjust the baby skin tone to a warm honey to soft caramel palette. Symbolic and gentle, not medical.
   - **Early Deeper** → `myweek-baby-early-deep.png`
     > Generate a deeper skin tone style version of the existing early control image. Keep the original sac colour and cream paper background unchanged. Keep the same pose, framing, lighting, composition and watercolour finish. Only adjust the baby skin tone to a warm deep cocoa to soft umber palette. Symbolic and gentle, not medical.
   - **Late Lighter** → `myweek-baby-late-light.png`
     > Generate a lighter skin tone style version of the existing late control image. Keep the original sac colour and cream paper background unchanged. Keep the same pose, framing, lighting, composition and watercolour finish. Only adjust the baby skin tone to a soft warm ivory to light peach palette. Symbolic and gentle, not medical.
   - **Late Medium** → `myweek-baby-late-medium.png`
     > Generate a medium skin tone style version of the existing late control image. Keep the original sac colour and cream paper background unchanged. Keep the same pose, framing, lighting, composition and watercolour finish. Only adjust the baby skin tone to a warm honey to soft caramel palette. Symbolic and gentle, not medical.
   - **Late Deeper** → `myweek-baby-late-deep.png`
     > Generate a deeper skin tone style version of the existing late control image. Keep the original sac colour and cream paper background unchanged. Keep the same pose, framing, lighting, composition and watercolour finish. Only adjust the baby skin tone to a warm deep cocoa to soft umber palette. Symbolic and gentle, not medical.

   Shared negative prompt appended to every generation:
   > No text, no labels, no watermark, no logo, no clothing, no jewellery, no flags, no cultural markers, no culturally specific hairstyles, no exaggerated features, no photorealism, no medical illustration, no anatomical labels, no background wash changes, no sac colour changes.

4. **Build 7 review sheets** (labels outside panels; nothing baked in). Each row: Default | Lighter | Medium | Deeper.
   - `review-sheet-early-small.png` (~120px panels)
   - `review-sheet-early-large.png` (~480px panels)
   - `review-sheet-mid-small.png`
   - `review-sheet-mid-large.png`
   - `review-sheet-late-small.png`
   - `review-sheet-late-large.png`
   - `review-sheet-all-large.png` (3 rows × 4 columns: Early / Mid / Late)

5. **Write** `/mnt/documents/phase-13-7c-full-illustration-set/generation-notes.md` with:
   - control filenames + dimensions
   - control SHA-256 before and after (must match)
   - confirmation Lighter v2, Medium v2, and existing Deep pilot were used for mid (source SHA-256s; v1 archive not used)
   - full prompts used for the 6 new early/late generations
   - output filenames
   - confirmations: exactly 6 new images generated; full set contains 9 production-candidate images; no varied image; no text/labels/watermark/logo in outputs
   - hygiene: nothing added to `src/assets/`, no source files edited, no migrations / AI / analytics / route / UI wiring changes
   - drift observations per trimester set, worded as "visually consistent with the control" unless comparison supports stronger claims

### Deliverables returned
- Paths to all 9 production-candidate images
- Paths to all 7 review sheets
- Path to `generation-notes.md`
- Hygiene confirmation
- Visual drift or defects flagged for Jenny

### Sign-off gate
Stop after this review-only set. No data model, Account Settings UI, resolver, hooks, `/my-week` wiring, migrations, or product integration until the full 9-image set passes visual review with Jenny.
