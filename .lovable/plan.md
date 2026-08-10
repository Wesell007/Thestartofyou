# Phase 19B — Memories page mobile spacing fix (final close)

## Scope

One file: `src/pages/firstyear/FirstYearMemories.tsx`. No other files, no global header/footer changes, no logic changes.

## Root cause (verified)

`MyWeekHeader` is `fixed top-0`, height `h-14` (56px) on mobile / `sm:h-16` (64px) on desktop. The memories page currently has no top padding on `<main>` and only `pt-8` (32px) on the inner `<header>`, so the "Memories" H1 starts at 32px from the viewport top — tucked behind the 56px mobile header.

The canonical pattern across the app puts the header-clearing padding on `<main>` itself:
- `src/pages/MyWeek.tsx:167` — `main ... pt-16 sm:pt-20`
- `src/pages/KeptChapter.tsx:332` — `main ... pt-12 sm:pt-16 lg:pt-20`

## The change

`src/pages/firstyear/FirstYearMemories.tsx`, lines 319-320:

```diff
-      <main className="relative mx-auto w-full max-w-[720px] px-4 sm:px-8 md:px-10 pb-6">
-        <header className="pt-8 pb-8">
+      <main className="relative mx-auto w-full max-w-[720px] px-4 sm:px-8 md:px-10 pt-16 sm:pt-20 pb-6">
+        <header className="pb-8">
```

Why: move the clearance onto `<main>` to match `MyWeek` exactly (`pt-16 sm:pt-20`), and drop the now-redundant `pt-8` from the inner `<header>` so the H1 isn't double-padded. Result:
- Mobile (390px): H1 at 64px, header bottom 56px → 8px gap (matches MyWeek).
- Desktop (1440px): H1 at 80px, header bottom 64px → 16px gap (matches MyWeek).

Internal header layout (H1 → intro → back link) is unchanged; only the top clearance moves.

## Verification

1. `npx tsgo --noEmit -p tsconfig.json` — typecheck.
2. `npm run build` — build + sitemap (memories route stays noindex / excluded).
3. Visual at 390px and 1440px — **blocked this turn**: `LOVABLE_BROWSER_AUTH_STATUS` is `signed_out`, so `/my-first-year/memories` (protected) redirects to `/auth` and cannot be screenshotted. The fix is verified structurally against the canonical `MyWeek` pattern. I will ask you to sign in via the preview so the session injects next turn, then I capture 390px + 1440px screenshots to confirm clearance.
4. Code-level confirm that `<main>` now carries `pt-16 sm:pt-20` and the inner header no longer carries `pt-8`.

## Final close-item confirmations

- **Export**: `src/pages/AccountSettings.tsx` already includes `first_year_memories` raw rows in the data download (id, baby_id, memory_scope, memory_date, title, note, source_entry_id, created_at, updated_at). No media fields. Re-confirm by reading the export payload block.
- **Auth return**: `/my-first-year/memories` is under `ProtectedRoute`, which sends signed-out users to `/auth` with `return_to` set to the original path (verified in `ProtectedRoute.tsx`). The page's own loader also `navigate("/auth")` on missing session.
- **Banned wording grep**: `rg -i "milestone|dashboard|tracker|symptom checker" src/lib/firstYearMemoriesSchema.ts src/lib/firstYearMemories.ts src/components/firstyear/memories src/pages/firstyear/FirstYearMemories.tsx` — expect no hits.
- **Cleanup**: disposable QA accounts (qa19b-single, qa19b-twins, qa19b-other) and their rows were already removed from `auth.users` and `public.profiles`. Re-confirm no `qa19b-*` rows remain in `first_year_memories` / `first_year_entries` / `babies`.

## Out of scope (noted, not changed)

`FirstYearToday.tsx` uses the same `pt-8` inner-header pattern with no `<main>` top padding, so it shares the latent cramping. Per your instruction this turn is memories-page only — flagged for a later pass if you want it.

## Note

The spacing edit is build mode. Approving this plan lets me apply it and run the checks.
