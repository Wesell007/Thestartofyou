# Phase 14.2: Full 42-week Neutral/Default Realism Generation

Review-only generation of pregnancy weeks 1–42 as one premium visual family, following the approved Phase 14.1 pilot.

## Scope

- Review-only images, sheets and prompt archives under `/mnt/documents/phase-14-2/` only.
- Reuse approved pilot outputs for weeks 2, 4, 6, 8, 10, 12, 20, 36 unchanged.
- No `src/` edits, no assets imported, no `.asset.json`, no code, no migrations, no route/sitemap/analytics/AI-prompt changes, no My Week or Account Settings changes, no wiring, no Light/Medium/Deep variants.

## Folder structure

```text
/mnt/documents/phase-14-2/
  images/
    week-01.png ... week-42.png       (42 total; 8 copied from pilot, 34 newly generated)
  sheets/
    batch-1-weeks-01-08.png
    batch-2-weeks-09-13.png
    batch-3-weeks-14-20.png
    batch-4-weeks-21-27.png
    batch-5-weeks-28-34.png
    batch-6-weeks-35-42.png
    full-42-review-sheet.png
    progression-checks.png
  prompts/
    week-01.md ... week-42.md
  notes.md
```

## Pilot anchors reused directly

Copied verbatim from `/mnt/documents/phase-14-1/images/` into `/mnt/documents/phase-14-2/images/`, renamed to canonical filenames:

| Week | Source | Destination |
| --- | --- | --- |
| 2 | `week-02.png` (v1) | `week-02.png` |
| 4 | `week-04.png` (v1) | `week-04.png` |
| 6 | `week-06.png` (v1) | `week-06.png` |
| 8 | `week-08.v3.png` | `week-08.png` |
| 10 | `week-10.v2.png` | `week-10.png` |
| 12 | `week-12.png` (v1) | `week-12.png` |
| 20 | `week-20.v3.png` | `week-20.png` |
| 36 | `week-36.v2.png` | `week-36.png` |

Anchors not regenerated or weakened.

## Model and style

- Tool: `imagegen--generate_image`, `model: "premium.gemini"` (Nano Banana 2), 1024×1024, PNG, non-transparent, warm paper baked in.
- Positive baseline in every prompt: premium watercolour, warm paper background, dusty rose / ochre / sage palette, gentle light, soft womb environment, symbolic realism, developmentally informed, non-clinical, neutral only.
- Negative baseline in every prompt: clinical diagram, scan look, labels, arrows, vessels, hard anatomy, full placenta disc, photoreal medical rendering, text, skin-tone variants, personalised variants, born-baby portrait feel.
- Weeks 17–23: extra softness on face and hands (carry-forward from Phase 14.1c note on W20).
- Weeks 1–8: nothing curled-newborn; W1 and W2 must not imply an embryo/baby is already present.
- Weeks 41–42: gentle and calm, no alarmist or clinical overdue cues.

## Batches (generation order)

Each batch: render new weeks, assemble the batch sheet, log verdicts in `notes.md`, run targeted reruns before advancing.

- **Batch 1 — W1–W8.** New: W1, W3, W5, W7. Reused: W2, W4, W6, W8. Rules: W1 soft endometrial bloom, no embryo/cell cluster/baby form; W3 luminous cell cluster, no baby shape; W5 gestational sac + yolk sac as two nested circles; W7 tiny C-shaped embryo with limb-bud hint.
- **Batch 2 — W9–W13.** New: W9, W11, W13. Reused: W10, W12. W9 sits between W8 and W10; W11 between W10 and W12; W13 bridges toward the second trimester.
- **Batch 3 — W14–W20.** New: W14, W15, W16, W17, W18, W19. Reused: W20. W14 must not look like W20; body length and limb definition increase gradually with generous space and softly anchored cord.
- **Batch 4 — W21–W27.** New: W21–W27. Slightly fuller week by week, more defined but still soft, space reducing slowly, no clinical placenta disc. W27 more developed than W20, much less cramped than W36.
- **Batch 5 — W28–W34.** New: W28–W34. Fuller baby, cheek/body roundness increases, space tightens, cord visible or partly hidden, soft wall bloom only. W34 clearly different from W27 and W40.
- **Batch 6 — W35–W42.** New: W35, W37, W38, W39, W40, W41, W42. Reused: W36. Fuller baby, tighter space, curled mature pose, cord may be naturally occluded, soft placental bloom. W41–W42 calm.

Total: 34 new generations + 8 reused pilot anchors.

## Progression checks

Assemble `progression-checks.png` with side-by-side strips for W1→W8, W8→W10, W10→W12, W12→W20, W20→W27, W27→W34, W34→W36, W36→W40, W40→W42. Must-differ pairs called out in notes: W14 vs W20, W20 vs W27, W27 vs W34, W34 vs W40, W40 vs W42.

## Prompt archive

Every new week's exact prompt saved to `prompts/week-XX.md` before generation. For reused anchors, the archive file records the source pilot filename and the original Phase 14.1 prompt intent so later Light/Medium/Deep variants can be produced from a matching developmental brief.

## Notes (`notes.md`)

Per week: filename, prompt summary, development stage, baby-shape appropriateness, cord treatment, womb/sac treatment, placenta/wall-bloom treatment, drift from the Phase 14.0 matrix, verdict (pass / needs rerun). Plus per-batch summary, progression-risk list, style-consistency risk list, list of any weeks flagged for rerun. Ends with the confirmations block (no `src/` changes, no assets imported, no `.asset.json`, no code/migrations/routes/sitemap/analytics/AI prompts changed, saved illustration preference untouched).

## Personalisation

No Light/Medium/Deep variants generated. Existing preference infrastructure (`profiles.baby_illustration_style`, enum, Account Settings picker, existing resolver and style assets) untouched.

## Risks

- Style drift across 34 generations — mitigated by shared style/negative preamble and per-batch review.
- Developmental drift near anchors (W9, W11, W13, W14, W19, W21, W35, W37) — prompts reference adjacent anchors.
- W17–W23 face/hand drift — softer phrasing baked in.
- W41–W42 tonal risk — calm, non-alarmist wording.
- Cord/placenta creep — standardised soft-anchor phrasing; no full disc.
- Model refusals — retry with softened wording; log any refusals.

## Stop point

Stop after all 42 canonical images, all six batch sheets, `full-42-review-sheet.png`, `progression-checks.png`, all 42 prompt archives, and complete `notes.md` exist. Await user approval before any wiring, asset import, or personalised-variant work.

## Confirmations (locked)

- Pilot anchors reused for W2, W4, W6, W8, W10, W12, W20, W36.
- No `src/` changes.
- No personalised variants.
- Exact prompts archived per week.
- Review-only; no wiring; no asset import.
