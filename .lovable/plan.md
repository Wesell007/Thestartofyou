## Phase 13.7b.1 — Nano Banana Pilot Rerun (Lighter + Medium)

Review-only rerun. No code, no migrations, no `src/assets/` changes, no product wiring. All output stays under `/mnt/documents/phase-13-7b-pilot/`.

### Locked decisions
- Default control stays as the default. Not renamed to lighter/medium/deep, not treated as a skin tone category. Chip label remains "Use the default illustrations".
- Existing deep pilot is kept as-is. Only Lighter and Medium are regenerated.
- Varied preview is not generated — it is a layout composition only.

### Steps

1. **Archive** existing pilots (review-only folder, not `src/assets/`):
   - `/mnt/documents/phase-13-7b-pilot/archive/pilot-myweek-baby-mid-light-v1.png`
   - `/mnt/documents/phase-13-7b-pilot/archive/pilot-myweek-baby-mid-medium-v1.png`

2. **Regenerate** using `imagegen--edit_image` with `src/assets/myweek-baby-mid.png` as the edit input (inherits canvas, pose, framing, lighting, watercolour finish, sac colour, cream background):

   - `pilot-myweek-baby-mid-light.png` — prompt:
     > Generate a lighter skin tone style version of the existing control image. Keep the original pink/coral amniotic sac and cream paper background unchanged. Keep the same pose, framing, lighting, composition and watercolour finish. Only adjust the baby skin tone to a soft warm ivory to light peach palette. Symbolic and gentle, not medical.

   - `pilot-myweek-baby-mid-medium.png` — prompt:
     > Generate a medium skin tone style version of the existing control image. Keep the original pink/coral amniotic sac and cream paper background unchanged. Keep the same pose, framing, lighting, composition and watercolour finish. Only adjust the baby skin tone to a warm honey to soft caramel palette. Symbolic and gentle, not medical.

   Shared negative prompt appended to both:
   > No text, no labels, no watermark, no logo, no clothing, no jewellery, no flags, no cultural markers, no hairstyles, no exaggerated features, no photorealism, no medical illustration, no anatomical labels, no background wash changes, no sac colour changes.

3. **Not rerun**: default control, deep pilot, varied preview.

4. **Rebuild review sheets** from control + revised lighter + revised medium + existing deep, labels ("Default", "Lighter", "Medium", "Deeper") placed outside panels, no text baked into images:
   - `/mnt/documents/phase-13-7b-pilot/review-sheet-small.png` (~120px panels)
   - `/mnt/documents/phase-13-7b-pilot/review-sheet-large.png` (~480px panels)

5. **Update** `/mnt/documents/phase-13-7b-pilot/generation-notes.md` with:
   - control SHA-256 before and after (must be identical)
   - old lighter/medium SHA-256 (from archive)
   - new lighter/medium SHA-256
   - deep SHA-256 with note that it was not regenerated
   - prompts used and output filenames
   - drift observations (worded as "visually consistent with the control" rather than "exact match" unless comparison supports it)
   - hygiene confirmations: no source files changed, nothing added to `src/assets/`, no migrations/AI/analytics/routes/UI wiring changed

### Deliverables returned
- Revised lighter image path
- Revised medium image path
- Unchanged deep image path
- Updated small and large review sheet paths
- Updated generation notes path
- Hygiene confirmation
- Any visual issues flagged for Jenny to review

### Sign-off gate
Stop after this rerun. No data model, Account Settings UI, resolver, or `/my-week` wiring until the revised Lighter and Medium pass side-by-side review with Jenny.
