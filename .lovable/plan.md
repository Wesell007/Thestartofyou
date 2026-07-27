# Phase 13.7c.3 — Early Default Alignment (review-only)

## Goal
Produce a single review-only Early **Default** candidate that adopts the approved v3 Early womb/sac enclosure style, while keeping the default (non-tone-labelled) baby appearance. Rebuild affected review sheets and update notes. No code, no `src/assets`, no product wiring.

## Labelling clarification
- Review sheet column label: **"Default"** (unchanged).
- Product/user-facing copy: **"Use the default illustrations"** (unchanged; not touched in this phase since no code is edited).
- Default is not a skin tone category and is not renamed Lighter, Medium or Deeper anywhere.

## Steps

1. **Confirm inputs (read-only)**
   - Verify `_tmp/early-control-cream-clean.png` still exists as the edit input.
   - Confirm `src/assets/myweek-baby-early.png` SHA-256 unchanged (`4afec6c6…`).

2. **Generate one candidate via `imagegen--edit_image`**
   - Input: `/mnt/documents/phase-13-7c-full-illustration-set/_tmp/early-control-cream-clean.png`.
   - Output: `/mnt/documents/phase-13-7c-full-illustration-set/myweek-baby-early-default.png`.
   - Prompt: exactly as supplied — keep default baby skin tone and default illustration feel; strengthen surrounding form to match the approved Early Lighter/Medium/Deeper womb/sac enclosure; clean cream paper background; same pose/framing/lighting/composition/watercolour finish; soft curved boundary, gentle internal warmth; softer than Mid and Late; symbolic, not medical.
   - Negative prompt: as supplied (no checkerboard/grid/text/labels/watermark/logo/clothing/jewellery/flags/cultural markers/photorealism/clinical diagram/harsh wash/loss of watercolour feel).
   - Only this one image is generated. Early v3 Lighter/Medium/Deeper untouched. Mid and Late untouched.

3. **Visual check**
   - Compare candidate against the three approved v3 variants.
   - Confirm: clear curved sac boundary, gentle internal warmth, cream background preserved, watercolour finish intact, softer than Mid/Late, no baked labels/text/checkerboard, no clothing/jewellery/cultural markers.
   - One regeneration allowed only on hard failure (checkerboard reintroduced, labels baked, harsh clinical read). Otherwise proceed.

4. **Rebuild review sheets** (labels outside panels only; nothing baked into images)
   - `review-sheet-early-small.png` — Early row: **Default (new candidate)**, Lighter v3, Medium v3, Deeper v3.
   - `review-sheet-early-large.png` — same row, larger cell size.
   - `review-sheet-all-large.png` — Early row uses new Default candidate; Mid and Late rows copied unchanged (Mid v2, Late v1).
   - Reuse the existing Python sheet builder (cream canvas, column labels above panels).

5. **Update `generation-notes.md`** (append Phase 13.7c.3 section)
   - Jenny approved the Phase 13.7c.2 Early v3 womb/sac direction.
   - Reason: Early Default needed to match the approved Early variants' womb/sac read.
   - Labelling note: review sheet keeps "Default"; product copy remains "Use the default illustrations".
   - Confirm `src/assets/myweek-baby-early.png` not modified (SHA-256 unchanged).
   - Confirm Early v3 Lighter/Medium/Deeper **not** regenerated (SHAs unchanged from Phase 13.7c.2 section).
   - Confirm Mid and Late **not** regenerated.
   - Record new SHA-256 for `myweek-baby-early-default.png`.
   - Hygiene confirmation: no code, no migrations, no `src/assets`, no UI, no routes, no analytics, no AI, no product wiring; all output under `/mnt/documents/phase-13-7c-full-illustration-set/`.
   - Note any residual drift (sac ring weight vs v3 variants, warmth balance, pose fidelity).

## Deliverables (stop after these)
- `phase-13-7c-full-illustration-set/myweek-baby-early-default.png`
- `phase-13-7c-full-illustration-set/review-sheet-early-small.png`
- `phase-13-7c-full-illustration-set/review-sheet-early-large.png`
- `phase-13-7c-full-illustration-set/review-sheet-all-large.png`
- `phase-13-7c-full-illustration-set/generation-notes.md` (Phase 13.7c.3 section appended)
- Hygiene confirmation + residual drift notes in the reply

## Explicit non-goals
- No edits to `src/assets/*`.
- No regeneration of Early v3 Lighter/Medium/Deeper.
- No regeneration of Mid or Late.
- No code, migration, route, UI, analytics, AI, or product-wiring changes.
- No rename of Default anywhere.
