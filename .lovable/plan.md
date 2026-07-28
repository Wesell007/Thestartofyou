## Phase 14.11 — Deep Missing-Weeks Completion (W31-35, W37-42)

Complete Deep coverage for the 11 remaining weeks under the approved v2 Deep direction. Review-only image generation. No `src/` changes, no asset import, no `.asset.json`, no resolver or Settings changes. Do not begin Phase 14.12.

### Scope

Generate Deep only for W31, W32, W33, W34, W35, W37, W38, W39, W40, W41, W42.

Do not touch W9-W30, W36, Default, Light, Medium, or any approved v2 anchor.

### Source map (edit-from-default only)

Approved Phase 14.2b default v2 sources:

- W31 -> `/mnt/documents/phase-14-2/images/week-31.v2.png`
- W32 -> `/mnt/documents/phase-14-2/images/week-32.v2.png`
- W34 -> `/mnt/documents/phase-14-2/images/week-34.v2.png`

Base defaults:

- W33 -> `/mnt/documents/phase-14-2/images/week-33.png`
- W35 -> `/mnt/documents/phase-14-2/images/week-35.png`
- W37 -> `/mnt/documents/phase-14-2/images/week-37.png`
- W38 -> `/mnt/documents/phase-14-2/images/week-38.png`
- W39 -> `/mnt/documents/phase-14-2/images/week-39.png`
- W40 -> `/mnt/documents/phase-14-2/images/week-40.png`
- W41 -> `/mnt/documents/phase-14-2/images/week-41.png`
- W42 -> `/mnt/documents/phase-14-2/images/week-42.png`

Never edit from Medium, current Deep, proposed v1/v2, rejected v3, screenshots, sheets, cache files, generated previews, or placeholders. No generation from scratch.

### Prompt

Approved v2 Deep separation prompt with the tone-consistency clause already used for W15-W30, only the week number substituted. Do not push darker. Do not create a new v3 direction. Do not rewrite the prompt.

Archive exact prompts to:

- `/mnt/documents/phase-14-11/prompts/week-31.tone-consistent.md`
- ... through `week-42.tone-consistent.md` (skipping W36)

### Method

For each of the 11 weeks, call `imagegen--edit_image`:

- `image_paths`: `["<approved default source above>"]`
- `prompt`: verbatim tone-consistent v2 Deep prompt for that week
- `target_path`: `/mnt/documents/phase-14-11/images/deep/week-XX.png`

Model: `premium.gemini` (Nano Banana 2). No other tool.

### Acceptance and rerun rule

Accept only if the output is clearly darker than Medium, matches the approved v2 Deep direction, and preserves pose, face, cord, sac/no-sac state, womb environment, wall bloom (if present), crop, scale, and week maturity. Reject if muddy, grey, olive, ashy, overly red, burnt, harsh, or heavy-shadowed.

One rerun allowed per failing week, saved as `week-XX.v2.png` (edited from the same approved default source, same prompt). No v3 experiments.

### Final Deep file map (post-batch)

- W9-W14: approved `.v2.png` anchors
- W15-W19: corrected Phase 14.11 outputs
- W20: approved `.v2.png` anchor
- W21-W30: corrected Phase 14.11 outputs
- W31-W35: this batch
- W36: approved `week-36.png` anchor
- W37-W42: this batch

Every week from W9 to W42 must resolve to exactly one approved Deep file.

### Final review sheets

Build from explicit absolute per-week paths only. No globs, no placeholders, no screenshots, no cache files, no generated previews.

1. `/mnt/documents/phase-14-11/sheets/deep-final-medium-vs-approved-deep.png`
   - Rows: W9-W42
   - Columns: medium | approved deep

2. `/mnt/documents/phase-14-11/sheets/deep-final-settings-thumbnail-check.png`
   - Rows: W9-W42
   - Columns: medium | approved deep
   - Rendered at Account Settings preview size (~96px)

3. `/mnt/documents/phase-14-11/sheets/deep-final-four-up.png` (product family confirmation)
   - Rows: W9, W12, W16, W20, W26, W32, W36, W40, W42
   - Columns: default | light | medium | approved deep

4. `/mnt/documents/phase-14-11/sheets/deep-final-replacement-comparison.png`
   - Rows: W9-W42
   - Columns: medium | previous/current deep | approved deep
   - Previous/current Deep from `/mnt/documents/phase-14-8/images/deep/week-XX.png`
   - Approved Deep from the final approved file map above

### Notes update

Append to `/mnt/documents/phase-14-11/notes.md`:

- the 11 missing Deep weeks were completed
- source file used per week
- final approved Deep file per week from W9 to W42 (single canonical map)
- any reruns and why
- confirmation final Deep coverage is complete for W9-W42
- confirmation all final sheets were built from explicit absolute paths only
- confirmation v2 remains the final Deep direction
- confirmation v3 remains rejected
- recommendation on readiness for product review before Phase 14.12

### Stop point

Stop after the 11 missing Deep images, any required reruns, the four final review sheets, and the notes update. Do not import assets, create `.asset.json`, edit `src/`, change the resolver, change Settings, wire anything, or begin Phase 14.12. Await review approval.