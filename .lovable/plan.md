## Phase 14.11 — Deep Completion Cleanup & Tone Consistency Audit

Review-only recovery pass. No `src/` changes, no asset import, no `.asset.json`, no wiring. Do not proceed to Phase 14.12.

### 1. IGNORE placeholder cleanup & quarantine

Search under `/mnt/documents/` (especially `phase-14-11/`, its `images/`, `images/deep/`, `sheets/`, `prompts/`) for files whose name contains any of: `IGNORE`, `ignore`, `placeholder`, `_do_not_use`, `tmp`, `probe`, `scratch`.

For each match:
- Create `/mnt/documents/phase-14-11/quarantine/` if missing.
- Move the file into `quarantine/`, preserving the basename.
- Record the original absolute path and quarantine destination in `notes.md`.

Also inspect the currently generated Deep completion PNGs for any all-black / near-black frame that may be a hidden IGNORE placeholder (mean luminance below a low threshold) and quarantine those too, noting the detection in `notes.md`.

No placeholder file may appear as source, reference, or cell in any sheet, manifest, or deliverable after this step.

### 2. Approved Deep v2 anchor set (locked, do not touch)

```
week-09.v2.png
week-10.v2.png
week-11.v2.png
week-12.v2.png
week-13.v2.png
week-14.v2.png
week-20.v2.png
week-36.png
```

All under `/mnt/documents/phase-14-11/images/deep/`. These define the approved Deep tone family. Never regenerate.

Rejected and unusable as source/reference: any v1 Deep, any v3 Deep, Medium, screenshots, sheets, cache, previews.

### 3. Deep tone consistency audit

Enumerate every Deep file currently in `/mnt/documents/phase-14-11/images/deep/` for W9–W42 after quarantine. For each:
- Compute mean L*, a*, b* in Lab space on the subject region.
- Compare against nearest approved v2 anchor by maturity band:
  - W9–W19 → nearest of W9/10/11/12/13/14 v2
  - W20–W30 → W20 v2
  - W31–W42 → W36 approved Deep
- Also compare against the Medium file for the same week at `/mnt/documents/phase-14-8/images/medium/week-XX.png`.

Assign one verdict per week:
`pass` | `too light` | `too warm/orange` | `too olive/green` | `too grey/ashy` | `too muddy` | `too harsh` | `environment drift` | `needs rerun`.

Rule set for `pass`:
- L* not higher than anchor L* by more than a small tolerance (not lighter than v2 family).
- Clearly darker than Medium at thumbnail size (visible ΔL after downscale to ~96px).
- Hue within the warm-brown band of the anchor (no orange, yellow-gold, olive, green, grey, ashy).
- Pose, sac/no-sac state, cord, wall bloom, background, maturity preserved (visual spot-check against the approved default source).

### 4. Required review sheets (explicit paths only)

Sheet builder must use explicit absolute path lists — no globs, no reads from `/mnt/documents/` root, `/mnt/data`, screenshots, cache, generated previews, placeholders, sheet images, or failed outputs.

**Sheet A** — `/mnt/documents/phase-14-11/sheets/deep-tone-consistency-audit.png`
- Rows: every generated Deep week from Phase 14.11 so far.
- Columns: `medium | approved v2 anchor (nearest by maturity) | generated deep | verdict`.

**Sheet B** — `/mnt/documents/phase-14-11/sheets/deep-tone-consistency-thumbnail-check.png`
- Rendered at Account Settings preview size (~96 px).
- Columns: `medium | generated deep`.
- Same weeks as Sheet A.

### 5. Targeted reruns (failing weeks only)

Only rerun weeks whose verdict is not `pass`. Do not rerun approved anchors. Do not rerun passing weeks.

For each failing week:
- Tool: `imagegen--edit_image`, model `premium.gemini` (Nano Banana 2).
- `image_paths`: the approved Phase 14.2 default source for that week only (use the v2 default source where one exists: W9, 13, 16, 21, 26, 31, 32, 34; otherwise the base default).
- `prompt`: the approved v2 Deep separation prompt already archived at `/mnt/documents/phase-14-11/prompts/week-XX.v2.md`, with this tone-consistency clause appended verbatim (no other edits):

  > Match the approved proposed Deep v2 tone family. The result must look consistent with the approved Deep v2 anchor images, not lighter, not more orange, not more yellow-gold, not olive, not grey, and not washed out. It must remain clearly darker than Medium at thumbnail size while preserving warm premium watercolour softness.

- `target_path`: overwrite `/mnt/documents/phase-14-11/images/deep/week-XX.png` (or the versioned filename already in use for that week; approved v2 anchor filenames are never overwritten).

Never edit from Medium, current Deep, v1, v2, v3, screenshots, sheets, or placeholders. Never generate from scratch.

Re-run Sheet A and Sheet B after reruns using the same explicit-path builder.

### 6. Notes update

Append to `/mnt/documents/phase-14-11/notes.md`:
- IGNORE placeholder original path(s), quarantine destination, likely cause.
- Full list of Deep weeks audited.
- Per-week tone verdict (before rerun).
- List of weeks that failed tone consistency.
- List of weeks rerun and outcome after rerun.
- Final approved Deep file per week (absolute path) for W9–W42.
- Confirmation that all approved Deep files match the v2 direction.
- Confirmation that all sheets were built from explicit absolute paths only.
- Recommendation on whether the Deep set is ready for product review.

### Stop point

Stop after: placeholder cleanup, quarantine, tone consistency audit, targeted reruns for failing weeks only, rebuilt review sheets, notes update. Do not proceed to Phase 14.12. Do not import assets. Do not create `.asset.json`. Do not edit `src/`. Do not wire anything.

### Technical details

- Luminance check for hidden placeholders: PIL `ImageStat.mean` on the greyscale image; treat mean < 8 or std < 4 as suspect.
- Lab conversion for tone metrics: PIL `ImageCms` sRGB→Lab, mean over central 60% crop to avoid halo/background bias.
- Downscale for thumbnail delta: PIL `Image.LANCZOS` to 96 px on the longest edge, then compare mean L*.
- Sheet layout: PIL with a fixed manifest dict `{week: {medium, anchor, deep, verdict}}` built in code from the explicit path lists in this plan.
