# Phase 14.3: Default Realism Asset Import and Resolver Foundation

Import the approved neutral/default 42-week realism set as CDN asset pointers and add an unused resolver module. Nothing user-visible changes.

## Source selection

From `/mnt/documents/phase-14-2/images/`:
- Use `week-XX.v2.png` for weeks 7, 9, 13, 16, 21, 26, 31, 32, 34.
- Use canonical `week-XX.png` for the remaining 33 weeks.
- Rename every staged file to `week-01.png` … `week-42.png`.

Confirmed via `ls`: all required files (canonical 42 + the 9 v2 variants) are present.

## Steps

1. **Stage** the 42 files to `/tmp/wr/week-XX.png` using the selection rule above.
2. **Upload** each staged file with `lovable-assets create --file /tmp/wr/week-XX.png --filename week-XX.png` and write the CLI stdout verbatim to `src/assets/myweek-weekly-realism/week-XX.png.asset.json`. No raw PNG binaries land in the repo.
3. **Resolver** — create `src/lib/myWeekRealismIllustrations.ts`:
   - Use `import.meta.glob("../assets/myweek-weekly-realism/*.png.asset.json", { eager: true })` and read the `url` field (matches the existing `.asset.json` shape verified against `src/assets/size-cues/pumpkin.png.asset.json`).
   - `resolveDefaultRealismForWeek(week: number): { src: string; week: number }` — clamp to 1–42, round, zero-pad, return `{ src, week }`. Non-finite input clamps to week 1. Missing pointer falls back to the nearest available week's URL (never throws, never returns empty string).
   - `defaultRealismAltForWeek(week: number): string`:
     - weeks 1–2 → `"Symbolic pregnancy illustration for week {n}, before conception."`
     - weeks 41–42 → `"Symbolic pregnancy illustration for week {n}, gentle transition toward birth."`
     - otherwise → `"Symbolic pregnancy illustration for week {n}."`
   - No imports of the module from any page/component this phase.
4. **Typecheck** — run `npm run typecheck` (falling back to `bunx tsgo --noEmit` if that isn't wired) and report the exact command and result.

## Verification checklist

- 42 `.asset.json` files under `src/assets/myweek-weekly-realism/`, one per week.
- Each parses as JSON and has a `/__l5e/assets-v1/...` `url`.
- No PNG binaries added to `src/assets/myweek-weekly-realism/`.
- No edits to: `SectionBabyThisWeek`, `useBabyIllustrationStyle`, `myWeekBabyIllustrations.ts`, `MyWeekBabyImage.tsx`, `WeekIllustration.tsx`, Account Settings, routes, sitemap, analytics, AI prompts, migrations.
- No deletions of `src/assets/myweek-baby-styles/`, the 3-stage resolver, or `profiles.baby_illustration_style`.
- No Light/Medium/Deep variants generated.

## Stop point

Stop after the 42 pointers, resolver module, and passing typecheck. Do not wire `/my-week`. Do not begin Phase 14.4.
