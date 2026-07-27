
# Phase 14.9: Personalised Variant Asset Import and Resolver Extension

Import approved Light/Medium/Deep variants (Weeks 9–42) as CDN `.asset.json` pointers and extend the realism resolver to be tone-aware. No `/my-week` wiring, no Settings copy, no code deletions.

## Sources (verified present)

```text
/mnt/documents/phase-14-8/images/light/week-09.png … week-42.png   (34)
/mnt/documents/phase-14-8/images/medium/week-09.png … week-42.png  (34)
/mnt/documents/phase-14-8/images/deep/week-09.png … week-42.png    (34)
```

`lovable-assets` CLI verified on PATH.

## Steps

1. **Create target folders**
   - `src/assets/myweek-weekly-realism-light/`
   - `src/assets/myweek-weekly-realism-medium/`
   - `src/assets/myweek-weekly-realism-deep/`

2. **Upload 102 assets.** For each tone × week (9–42):
   ```
   lovable-assets create --file <source> --filename week-XX.png \
     > src/assets/myweek-weekly-realism-<tone>/week-XX.png.asset.json
   ```
   Write CLI stdout verbatim. No hand-written JSON. No raw PNGs committed.

3. **Extend `src/lib/myWeekRealismIllustrations.ts`.**
   - Add `export type RealismTone = "default" | "light" | "medium" | "deep";`
   - Build three additional `import.meta.glob` maps (light/medium/deep) using the same pattern as the existing default map. Import shape stays tolerant of `module.url` (existing pattern).
   - Keep `resolveDefaultRealismForWeek` and `defaultRealismAltForWeek` unchanged.
   - Add `resolveRealismForWeek(week, tone): DefaultRealismResolution`:
     - Clamp week (same helper).
     - `tone === "default"` OR `resolvedWeek <= 8` → default resolution.
     - Otherwise return the tone map entry.
     - Missing tone asset → silent fallback to default. Never throws. Never returns empty `src`.
   - Add `export function normaliseRealismTone(value: unknown): RealismTone` — returns `light`/`medium`/`deep` on exact match, else `default`.
   - Alt text unchanged (tone-agnostic via `defaultRealismAltForWeek`).

4. **Verify**
   - 34 pointer files in each new folder (102 total).
   - Every pointer has non-empty `url` starting with `/__l5e/assets-v1/`.
   - No `.png` binaries under the new folders.
   - `src/assets/myweek-weekly-realism/` untouched.
   - `src/assets/myweek-baby-styles/` untouched.
   - No changes to `SectionBabyThisWeek.tsx`, `BabyIllustrationStyleField.tsx`, routes, sitemap, analytics, AI prompts, migrations.

5. **Typecheck.** Run `npm run typecheck` and report the exact command and result.

## Stop point

After 102 pointers written, resolver extended with `resolveRealismForWeek` and `normaliseRealismTone`, and typecheck green. No `/my-week` wiring. No Phase 14.10.
