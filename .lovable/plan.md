## Phase 14.11 — Final Manifest Verification and Closeout

Read-only verification pass plus a single append to `notes.md`. No `src/`, no asset import, no `.asset.json`, no resolver or Settings changes. Do not begin Phase 14.12.

### 1. Manifest scan

Enumerate every file under:

- `/mnt/documents/phase-14-11/images/deep/`
- `/mnt/documents/phase-14-11/sheets/`
- `/mnt/documents/phase-14-11/prompts/`
- `/mnt/documents/phase-14-11/quarantine/`

For each file, record: absolute path, size in bytes, and (for PNGs) whether PIL can open and verify it.

Flag and list any:

- `IGNORE*` files
- files named or resembling placeholders (e.g. `_do_not_use_placeholder*`, `placeholder*`)
- zero-byte files
- unreadable/corrupt PNGs (PIL `verify()` failure)
- broken or stray JPGs
- screenshots (`Screenshot*`, `.DS_Store`, editor previews)
- cache files (`__pycache__`, `.cache`, `Thumbs.db`)
- generated preview files not part of the canonical set

Expected clean result: only the 34 Deep PNGs (W9-W42), the four final sheets, the 11 tone-consistent prompt markdowns (plus any earlier prompt archive), and whatever the quarantine folder legitimately holds.

### 2. Final Deep file map confirmation

Confirm exactly one approved Deep PNG resolves per week W9-W42, matching:

```text
W9-W14   -> approved .v2.png anchors
W15-W19  -> corrected Phase 14.11 outputs
W20      -> approved .v2.png anchor
W21-W30  -> corrected Phase 14.11 outputs
W31-W35  -> completed missing-weeks batch
W36      -> approved week-36.png anchor
W37-W42  -> completed missing-weeks batch
```

Report the resolved absolute path per week. Any missing or duplicated week is a blocker.

### 3. Final sheets confirmation

Confirm these four files exist, are non-zero, and open cleanly in PIL:

- `/mnt/documents/phase-14-11/sheets/deep-final-medium-vs-approved-deep.png`
- `/mnt/documents/phase-14-11/sheets/deep-final-four-up.png`
- `/mnt/documents/phase-14-11/sheets/deep-final-settings-thumbnail-check.png`
- `/mnt/documents/phase-14-11/sheets/deep-final-replacement-comparison.png`

### 4. Notes closeout

Append a "Phase 14.11 Closeout" section to `/mnt/documents/phase-14-11/notes.md` covering:

- Phase 14.11 visually approved
- v2 remains the final Deep direction
- v3 rejected; no further darkening experiments
- final manifest checked; no IGNORE, placeholder, broken, zero-byte, unreadable, stray screenshot, cache, or preview files in the final package
- final Deep file map confirmed for W9-W42 (single canonical file per week)
- four final sheets confirmed present and clean
- recommendation: ready for Phase 14.12 Deep asset re-import planning

### Stop point

Stop after the manifest scan, map confirmation, sheet confirmation, and notes append. Await Phase 14.12 approval.
