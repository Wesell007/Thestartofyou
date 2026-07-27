## Phase 14.11C — Batch 1 only

Review-only rerun of the Deep variant for Weeks 9, 10, 11, 13, 14 using `imagegen--edit_image` with model `premium.gemini` (Nano Banana 2). No `src/` changes, no `.asset.json`, no wiring.

### Pre-flight cleanup

Confirm no stray files remain from the previous turn under `/mnt/documents/`:

```sh
ls /mnt/documents/*.png 2>/dev/null || true
rm -f /mnt/documents/should-not-exist.png /mnt/documents/tmp-err.png \
      /mnt/documents/_probe.png /mnt/documents/_probe2.png \
      /mnt/documents/nope-a.png /mnt/documents/nope-b.png
```

Only proceed once the scratch area is clean.

### Sources (approved defaults from Phase 14.2)

| Week | Source file |
| --- | --- |
| 9  | `/mnt/documents/phase-14-2/images/week-09.v2.png` |
| 10 | `/mnt/documents/phase-14-2/images/week-10.png` |
| 11 | `/mnt/documents/phase-14-2/images/week-11.png` |
| 13 | `/mnt/documents/phase-14-2/images/week-13.v2.png` |
| 14 | `/mnt/documents/phase-14-2/images/week-14.png` |

Do not use current Deep images, generated files, screenshots, or cache files as inputs.

### Prompt

Use the previously archived strong Deep separation prompt at
`/mnt/documents/phase-14-11/prompts/week-XX.md` verbatim, with the sac/womb branch already chosen per week during prompt archival. No edits to the prompt.

### Method

For each of the five weeks, call `imagegen--edit_image`:

- `image_paths`: `["<approved default source path above>"]`
- `prompt`: verbatim contents of the archived prompt file
- `target_path`: `/mnt/documents/phase-14-11/images/deep/week-XX.png`

Model: `premium.gemini` (Nano Banana 2). No other tool. No generation from scratch.

If a result preserves anatomy but is still too close to Medium at thumbnail size, one rerun allowed, saved as `week-XX.v2.png`. If it breaks pose/face/cord/sac/crop/maturity, reject and rerun once from the same default source.

### Review deliverables

Build with Python/PIL after all five images exist:

1. `/mnt/documents/phase-14-11/sheets/deep-batch-1-comparison.png`
   - Columns: default | medium | current deep | proposed deep
   - Rows: W9, W10, W11, W13, W14
   - Medium source: `/mnt/documents/phase-14-8/images/medium/week-XX.png` (verify path during build; use the accepted Phase 14.8 medium set)
   - Current Deep source: `/mnt/documents/phase-14-8/images/deep/week-XX.png`
2. `/mnt/documents/phase-14-11/sheets/deep-batch-1-thumbnail-check.png`
   - Columns: medium | current deep | proposed deep
   - Rendered at Settings preview size (~96px)
   - Same five weeks

Append per-week verdicts and any reruns to `/mnt/documents/phase-14-11/notes.md`.

### Stop point

Stop after Batch 1 images, both sheets, and notes are written. Do not touch Batches 2–6. Do not import assets, create `.asset.json`, edit `src/`, or wire anything. Await review before Batch 2.
