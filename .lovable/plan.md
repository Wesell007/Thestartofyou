## Phase 14.11C: Full Deep Tone Rerun (Weeks 9–42, excluding anchors)

Regenerate the remaining Deep variants using the approved rerun prompt and Nano Banana 2, edited only from the approved default sources. Review-only under `/mnt/documents/phase-14-11/`. No `src/`, asset, or wiring changes.

### Scope

- **Regenerate**: Deep variants for Weeks 9, 10, 11, 13–19, 21–35, 37–42 (31 weeks total).
- **Do NOT regenerate**: Weeks 12, 20, 36 — already approved in Phases 14.11A/B (Week 12 v2, Week 20 v2, Week 36 proposed).
- **Do NOT touch**: Default, Light, Medium sets. Weeks 1–8 (neutral only).

### Method

- Tool: `imagegen--edit_image`, model: `premium.gemini` (Nano Banana 2).
- Source per week: `/mnt/documents/phase-14-2/images/week-XX.png` (the approved default canonical file; use v2 default where v2 exists per Phase 14.2b cleanup: W7, W9, W13, W16, W21, W26, W31, W32, W34).
- Prompt: the exact user-supplied strong Deep separation prompt, with `{week}` interpolated per week and the sac/womb guardrail branch chosen based on whether the default source shows a sac/womb environment (early no-sac weeks vs sac-present weeks).
- Output path: `/mnt/documents/phase-14-11/images/deep/week-XX.png` (v1). Reruns saved as `week-XX.v2.png` per stop rule.

### Batching

Six batches of ~5 weeks each to keep runs bounded and allow mid-flight inspection:
1. W9, W10, W11, W13, W14
2. W15, W16, W17, W18, W19
3. W21, W22, W23, W24, W25
4. W26, W27, W28, W29, W30
5. W31, W32, W33, W34, W35
6. W37, W38, W39, W40, W41, W42

### Per-image acceptance

For each generated Deep:
- Pose, face, cord, sac, womb env, wall bloom, crop, scale, maturity preserved vs default source.
- Clearly darker than the current Medium at both card size and thumbnail size.
- No green/olive/grey/ashy/muddy/red/black cast; no crushed shadows; no added background elements.

If preserved but too close to Medium at thumbnail: one rerun with stronger separation, save as `.v2.png`.
If darker but drift in pose/face/cord/sac/crop/maturity: reject, rerun from default with the same prompt.

### Deliverables

- 31 new Deep PNGs (plus any `.v2.png` reruns) under `/mnt/documents/phase-14-11/images/deep/`.
- Prompt archive per week under `/mnt/documents/phase-14-11/prompts/week-XX.md` (and `.v2.md` for reruns).
- Review sheets (Python/PIL) under `/mnt/documents/phase-14-11/sheets/`:
  - `deep-full-medium-vs-proposed-deep.png` — grid of Medium vs Proposed Deep for all 34 weeks (W9–42), including the 3 approved anchors for context.
  - `deep-full-settings-thumbnail-check.png` — 96px thumbnail grid to verify separation at Settings preview size.
  - `deep-full-four-up.png` — spot-check 4-ups (Default, Light, Medium, Proposed Deep) for 6–8 representative weeks.
- `/mnt/documents/phase-14-11/notes.md` appended with per-week verdicts, any reruns, and a final recommendation on adoption.

### Guardrails

- Review-only. No asset import, no `.asset.json` writes, no `src/` edits, no resolver changes, no wiring to `/my-week` or Settings.
- Do not modify the approved default, Light, or Medium images.
- Do not edit from the current Deep — always edit from the approved default source.

### Stop point

Stop after all 31 weeks are generated (with any needed reruns), sheets are built, and `notes.md` is updated. Await approval before the Phase 14.11D asset re-import / resolver swap.
