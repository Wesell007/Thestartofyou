# Phase 16.3B close-gate checks

Two verification runs only. No feature work, no Phase 16.4.

## 1. Throwaway-account transition pass

- Create a disposable signed-in account (never the live account).
- Seed for that account only: pregnancy journey with status `given_birth`, `journeys.lifecycle = pregnancy`, plus one small pregnancy memory row to check readability.
- Drive the real UI with Playwright: complete `/setup/first-year`, save one baby.
- Confirm redirect lands on `/my-first-year`.
- Confirm the landing surface renders: hero, baby summary, For baby / For you lanes, kept pregnancy chapter.
- Confirm `/my-journey` bounces First Year users to `/my-first-year`, not `/due-date-calculator`.
- Capture console and page errors.
- Delete every seeded row and the throwaway user, then report the user id and cleanup result.
- Only fix a defect if the pass exposes a real user-facing break (including the month-slug clamp).

## 2. Production build

- Run the project's production build command as-is.
- Report exact command and output.
- Report whether `public/sitemap.xml` changed (with diff first if it did), whether `dist/` changed, whether any source files changed, and whether anything generated should be reverted or ignored.
- No intentional changes to sitemap, robots, or public pages.

## Why build mode is needed

Both checks write outside `.lovable/plan.md`: temporary Playwright scripts and screenshots, throwaway database rows, and the build regenerating `public/sitemap.xml` and `dist/`. Plan mode blocks all of these.

## Return

Throwaway account used, transition result, setup save result, `/my-first-year` render result, `/my-journey` bounce result, console/page errors, cleanup result, build command and output, sitemap and dist change results, whether any code changes were needed, remaining blockers, and whether Phase 16.3B can close.
