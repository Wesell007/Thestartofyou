# Phase 13.7h.3 — Approved Cord-Anchor Asset Replacement

Isolated asset replacement only. No code, resolver, routes, sitemap, analytics, AI, Account Settings, My Week, or `.asset.json` changes.

## Files replaced (8 total, in `src/assets/myweek-baby-styles/`)

Copy the approved retouches from `/mnt/documents/phase-13-7h-2/` over the existing PNGs, preserving filenames:

**Early (from Phase 13.7h.2)**
- `default-early.png` ← `early/default-early.retouch.png`
- `light-early.png` ← `early/light-early.retouch.png`
- `medium-early.png` ← `early/medium-early.retouch.png`
- `deep-early.png` ← `early/deep-early.retouch.png`

**Mid (Default + Deep from 13.7h.2; Light + Medium from 13.7h.2b)**
- `default-mid.png` ← `mid/default-mid.retouch.png`
- `light-mid.png` ← `mid/light-mid.retouch.final-candidate.png`
- `medium-mid.png` ← `mid/medium-mid.retouch.final-candidate.png`
- `deep-mid.png` ← `mid/deep-mid.retouch.png`

## Not touched

- Late variants (`default-late.png`, `light-late.png`, `medium-late.png`, `deep-late.png`) — untouched.
- `src/lib/myWeekBabyIllustrations.ts` — untouched.
- No new `.asset.json` files created (PNGs are direct imports, not CDN assets).

## Steps

1. Record SHA-256 of all 12 existing files in `src/assets/myweek-baby-styles/` for verification.
2. `cp` each of the 8 approved retouches over the target filenames.
3. Re-hash all 12 files; confirm exactly the 8 Early+Mid hashes changed and all 4 Late hashes are identical to step 1.
4. `git status` scoped to confirm only those 8 PNGs are modified and no other files changed.
5. Run `bunx tsgo --noEmit`.

## Return

Replaced-files list, Late-untouched confirmation, no-code/`.asset.json`/routes/sitemap/analytics/AI changes confirmation, and typecheck result.
