# Phase 13.7d — Approved Illustration Asset Import and Resolver Foundation

## Goal
Copy the approved Phase 13.7c illustration set into the codebase and add a pure resolver + alt-text foundation. No product wiring, no UI change, no DB, no analytics, no AI, no routes, no sitemap.

## Corrections applied
- No rejected wording anywhere — not in code, alt text, constants, helper names, JSDoc, or inline comments. Clean neutral wording only.
- Resolver accepts `unknown` for style inputs and normalises internally via `isBabyIllustrationStyle`.
- No `varied` branch anywhere.

## Steps

### 1. Create asset folder and copy 12 approved PNGs
- New folder: `src/assets/myweek-baby-styles/`.
- Copy sources:
  - `phase-13-7c-full-illustration-set/myweek-baby-early-default.png` → `src/assets/myweek-baby-styles/default-early.png`
  - `src/assets/myweek-baby-mid.png` → `src/assets/myweek-baby-styles/default-mid.png`
  - `src/assets/myweek-baby-late.png` → `src/assets/myweek-baby-styles/default-late.png`
  - `phase-13-7c-full-illustration-set/myweek-baby-early-light.png` → `light-early.png`
  - `phase-13-7c-full-illustration-set/myweek-baby-mid-light.png` → `light-mid.png`
  - `phase-13-7c-full-illustration-set/myweek-baby-late-light.png` → `light-late.png`
  - `…-early-medium.png` → `medium-early.png`
  - `…-mid-medium.png` → `medium-mid.png`
  - `…-late-medium.png` → `medium-late.png`
  - `…-early-deep.png` → `deep-early.png`
  - `…-mid-deep.png` → `deep-mid.png`
  - `…-late-deep.png` → `deep-late.png`
- All copies via `cp`. Existing `src/assets/myweek-baby-early.png|mid.png|late.png` untouched; SHAs verified before/after.

### 2. Create `src/lib/myWeekBabyIllustrations.ts` (pure module)

Exports:
- `type BabyIllustrationStyle = "default" | "light" | "medium" | "deep"`
- `type BabyIllustrationStage = "early" | "mid" | "late"`
- `const BABY_ILLUSTRATION_STYLES: readonly BabyIllustrationStyle[]`
- `function isBabyIllustrationStyle(value: unknown): value is BabyIllustrationStyle`
- `function babyIllustrationStageForWeek(week: number | null | undefined): BabyIllustrationStage`
  - `1..13 → early`, `14..27 → mid`, `28..42 → late`, missing/NaN/non-integer/out-of-range → `mid`
- `function resolveBabyIllustration(style: unknown, stage: BabyIllustrationStage): string`
  - Normalises via `isBabyIllustrationStyle(style) ? style : "default"`
- `function resolveBabyIllustrationForWeek(style: unknown, week: number | null | undefined): { src: string; style: BabyIllustrationStyle; stage: BabyIllustrationStage }`
- `function babyIllustrationAlt(style: BabyIllustrationStyle): string`
  - `default` → `"Symbolic baby illustration."`
  - `light`   → `"Symbolic baby illustration in a lighter skin tone style."`
  - `medium`  → `"Symbolic baby illustration in a medium skin tone style."`
  - `deep`    → `"Symbolic baby illustration in a deeper skin tone style."`

Module imports the 12 PNGs from `@/assets/myweek-baby-styles/` and maps them via `{ [style]: { [stage]: src } }`. No React, no side effects, no fetch, no window access.

### 3. Verification
- `ls src/assets/myweek-baby-styles/` shows exactly 12 PNG files.
- SHA-256 of `src/assets/myweek-baby-early.png`, `myweek-baby-mid.png`, `myweek-baby-late.png` unchanged.
- `rg` to confirm no edits to: `SectionBabyThisWeek`, `MyWeek.tsx`, `AccountSettings.tsx`, `Setup.tsx`, article images, `SectionWeeklyReads`, Journey Support, routes, `scripts/generate-sitemap.ts`, `supabase/migrations/**`, `src/lib/analytics*.ts`, AI prompt files.
- `rg "varied"` on the new resolver returns nothing.
- `rg "ethnicity|race|predicted|accurate|exact|real |looks like your baby"` on the new resolver returns nothing.
- Run `bunx tsgo --noEmit`.

### 4. Deliverables in reply
- Files created (resolver + 12 assets).
- Files edited: none outside the new files.
- Original-asset SHA confirmations (before + after).
- Final resolver API surface.
- Confirmation no UI, DB, analytics, AI, route or sitemap changes.
- `bunx tsgo --noEmit` result.
- Defects, if any.

## Explicit non-goals
- No migration, no `profiles.illustration_style`, no Account Settings UI.
- No hook, no analytics event, no AI prompt change.
- No route or sitemap change.
- No changes to `SectionBabyThisWeek`, `MyWeek`, `Setup`, article images, Weekly Reads, or Journey Support.
- No `varied` style.
- No `.asset.json` externalisation — raw PNGs in `src/assets/` match the existing pattern.
