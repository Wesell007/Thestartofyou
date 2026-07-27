## Phase 14 Model Verification Audit (Read-Only)

Confirm whether the already-generated fetus / baby realism images were produced via `imagegen--edit_image` with `premium.gemini` (Nano Banana 2), or via a different tool/model. Nothing regenerated, nothing wired.

### Scope

Audit these folders and any prompt archives, `notes.md`, sheet-build scripts, or metadata inside them:

- `/mnt/documents/phase-14-1/` — pilot images (W2, 4, 6, 8, 10, 12, 20, 36 plus v2/v3 reruns)
- `/mnt/documents/phase-14-2/` — full 42-week default set + v2 cleanup files
- `/mnt/documents/phase-14-6/` — Phase 14.7 personalised pilot (W12/20/36 × light/medium/deep)
- `/mnt/documents/phase-14-8/` — full 102 Light/Medium/Deep variants (W9–42)
- `/mnt/documents/phase-14-11/` — any Deep separation pilot output, if present

### Method

1. `ls -R` each folder; enumerate PNGs, `notes.md`, `prompts/`, and any build scripts.
2. Read every `notes.md` and prompt archive for explicit model / tool references (`imagegen--edit_image`, `imagegen--generate_image`, `premium.gemini`, `premium.gpt`, `google/gemini-3.1-flash-image`, `google/gemini-3-pro-image`, `Nano Banana 2`).
3. Cross-check against phase-by-phase summary of tool invocations (edit-from-default vs generate-from-scratch).
4. For any image without an explicit model reference in its phase notes/prompt archive, mark it as **unverified** — do not infer.
5. Distinguish edit-from-source (Phase 14.7, 14.8 variants) from generate-from-scratch (Phase 14.1 pilot, 14.2 defaults).

### Deliverable

Write `/mnt/documents/phase-14-model-audit.md` with:

- Per-phase section documenting: folder, tool (`imagegen--edit_image` vs `imagegen--generate_image`), model tier (`premium.gemini` / `premium.gpt` / other), whether Nano Banana 2 is confirmed, source of evidence (notes.md line, prompt file path), and any unverified entries.
- Summary table:

  ```text
  Phase | Image set | Tool | Model | Nano Banana 2 confirmed? | Evidence | Issues
  ```

- Explicit "unverified" list if any set lacks a written model reference.
- Recommendation on whether Phase 14.11 can proceed on the current baseline.

### Guardrails

- No image generation, edit, regeneration, or deletion.
- No `.asset.json` creation, no `src/` changes, no wiring, no imports.
- Read-only tool use only (`ls`, file reads, `rg`).

### Stop point

Stop after `phase-14-model-audit.md` is written. Await approval before resuming Phase 14.11 Deep separation work.
