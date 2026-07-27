# Phase 13.7h.2b — Targeted Mid Light and Mid Medium Rerun

Review-only image rerun. No code, no `src/assets` changes, no `.asset.json`, no imports, no routes/sitemap/analytics/AI/UI edits. Phase 13.7 stays open.

## Scope

Rerun only two Mid variants from the approved originals:

- `src/assets/myweek-baby-styles/light-mid.png`
- `src/assets/myweek-baby-styles/medium-mid.png`

Do not iterate from prior retouched outputs. Do not touch Late. Do not re-run Early or Mid Default/Deep.

## Visual direction

Preserve original composition, pose, framing, palette, sac shape, baby proportions, and premium watercolour finish. Only the cord termination changes.

- **Mid Light** — softer, less prominent, more blended anchor. Cord clearly connected but not a visible placenta structure.
- **Mid Medium** — softly connected cord with reduced background drift/speckling. Preserve original pose, framing, sac shape, proportions, colour balance, watercolour finish.

Negative: no full placenta disc, no clinical diagram, no labels, no arrows, no text, no major pose/framing change, no new anatomy, no strong anchor blob, no heavy wall structure.

## Outputs (under `/mnt/documents/phase-13-7h-2/`)

1. `mid/light-mid.retouch.final-candidate.png`
2. `mid/medium-mid.retouch.final-candidate.png`
3. Rebuilt `sheets/mid-before-after.png` — uses approved Mid Default, new Mid Light candidate, new Mid Medium candidate, approved Mid Deep.
4. Rebuilt `sheets/all-stages-updated.png` — approved Early row, updated Mid row (Default kept, Light new, Medium new, Deep kept), Late unchanged.
5. Updated `notes.md` — rerun rationale for Mid Light and Mid Medium, confirmation other retouches kept, any residual drift, and confirmation that no code/assets/config/routes/sitemap/analytics/AI/UI were changed.

## Steps

1. Run `imagegen--edit_image` on `light-mid.png` with the softer-anchor prompt → save as `light-mid.retouch.final-candidate.png`.
2. Run `imagegen--edit_image` on `medium-mid.png` with the reduced-drift soft-anchor prompt → save as `medium-mid.retouch.final-candidate.png`.
3. Inspect both candidates. If drift or over-strong anchor recurs, one additional targeted retry per image with tuned prompt.
4. Rebuild the two composite sheets with Python/PIL using the approved final set.
5. Update `notes.md`.

## Stop point

Stop after the two revised Mid candidates, rebuilt sheets, and updated notes. No production asset replacement this phase.
