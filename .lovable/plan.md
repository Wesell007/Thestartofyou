## Phase 14.12 — Deep Asset Re-import and Pointer Replacement

Replace the 34 Deep `.asset.json` pointers under `src/assets/myweek-weekly-realism-deep/` with pointers to the approved Phase 14.11 Deep files. Canonical unversioned target filenames only. No resolver, wiring, Settings, route, sitemap, analytics, AI, or migration changes. Default / Light / Medium folders are not touched.

### Source-to-target map

Sources read from `/mnt/documents/phase-14-11/images/deep/`. Targets written to `src/assets/myweek-weekly-realism-deep/week-XX.png.asset.json`.

| Week(s) | Source | Target |
|---------|--------|--------|
| 09-14 | `week-{09..14}.v2.png` | `week-{09..14}.png.asset.json` |
| 15-19 | `week-{15..19}.png` | `week-{15..19}.png.asset.json` |
| 20 | `week-20.v2.png` | `week-20.png.asset.json` |
| 21-35 | `week-{21..35}.png` | `week-{21..35}.png.asset.json` |
| 36 | `week-36.png` | `week-36.png.asset.json` |
| 37-42 | `week-{37..42}.png` | `week-{37..42}.png.asset.json` |

Total: 34 uploads overwriting 34 existing pointer files. No `.v2` / `.v3` filenames leak into `src/`.

### Method (per week)

1. Copy the approved source to `/tmp/deep-import/week-XX.png` (normalises the filename even when the source is `.v2.png`).
2. Run `lovable-assets create --file /tmp/deep-import/week-XX.png --filename week-XX.png`.
3. Write the CLI stdout verbatim to `src/assets/myweek-weekly-realism-deep/week-XX.png.asset.json`, overwriting the existing pointer.
4. No hand-editing of pointer JSON. No raw PNGs land in `src/`. No `lovable-assets delete` calls.

### Guardrails

- Only `src/assets/myweek-weekly-realism-deep/` is modified.
- `myweek-weekly-realism/`, `-light/`, `-medium/` untouched.
- `src/lib/myWeekRealismIllustrations.ts`, `SectionBabyThisWeek.tsx`, `BabyIllustrationStyleField.tsx`, `MyWeek.tsx`, routes, sitemap, analytics, AI prompts, migrations, Settings copy untouched.
- Old 3-stage system preserved.

### Verification

- Exactly 34 pointer files remain, named `week-09.png.asset.json` … `week-42.png.asset.json`.
- No `.v2` / `.v3` filename anywhere in `src/`.
- No raw `.png` under `src/assets/myweek-weekly-realism-deep/`.
- Every pointer has a non-empty `url` using the canonical `week-XX.png` filename.
- Where the schema includes them: `content_type` is `image/png` and `size` is non-zero.
- Spot-check the resolver (read-only) resolves W9, W20, W36, W42 through the canonical pointer filenames — no resolver changes expected.
- Run `npm run typecheck`; return the exact command and result.

### Stop point

Stop after the 34 pointer rewrites, guardrail check, spot checks, and typecheck. Do not begin Phase 14.13. Await approval.
