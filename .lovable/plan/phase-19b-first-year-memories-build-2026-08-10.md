# Phase 19B — First Year Memories Build

Text-only keepsake space for the First Year journey. No media, AI, sharing, scoring, trackers or public pages.

## Route

New protected, noindex route `/my-first-year/memories`, using the same lifecycle guard chain as `/my-first-year/today`:

| User state | Result |
| --- | --- |
| signed out | `/auth`, returning to `/my-first-year/memories` |
| First Year with journey and babies | render |
| First Year missing journey or babies | `/setup/first-year` |
| pregnancy, given birth | `/setup/first-year` |
| pregnancy, active | `/my-week` |
| pregnancy, sensitive status | `/my-journey` |
| TTC | `/my-ttc-journey` |
| no journey pointer | `/due-date-calculator` |

`SeoHead` with `noindex`. Not added to the sitemap.

## Database migration

New table `public.first_year_memories`:

`id`, `user_id` (cascade from auth users), `memory_scope` default `family`, `baby_id` nullable (set null on baby delete), `memory_date`, `title` nullable, `note`, `source_entry_id` nullable (set null on entry delete), `created_at`, `updated_at`.

Check constraints: scope in `family` / `baby` / `all_babies`; `baby` requires a `baby_id` and the other two require none; note non-empty and 2000 max after trim; title 120 max after trim. Index on `(user_id, memory_date desc, created_at desc)`.

Trigger `validate_first_year_memory` (BEFORE INSERT OR UPDATE) enforces: row belongs to the signed-in actor, `journeys.lifecycle = 'first_year'`, trimmed note and title, `baby_id` owned by the same user, `source_entry_id` owned by the same user, date not before the earliest baby's date of birth, and date not after UTC today plus one day. Plus the existing `set_updated_at` trigger.

Grants and RLS: `GRANT SELECT, INSERT, UPDATE, DELETE` to `authenticated`; `GRANT ALL` to `service_role`; `REVOKE ALL` from `anon`; RLS enabled with four owner-scoped policies on `auth.uid() = user_id`.

## Client modules

- `src/lib/firstYearMemoriesSchema.ts` — memory scope union, note and title validation, scope/baby validation, local-date helpers reusing the check-in approach (never `toISOString` for calendar dates).
- `src/lib/firstYearMemories.ts` — list memories, recent memories for the home card, create, update, delete, and fetch a source check-in entry by id for "Keep this as a memory".

Existing First Year entries save logic is untouched.

## Memory scope and multiples

One baby: selector hidden, scope defaults to `baby` with that baby's id.

Twins or more: small accessible selector offering Family, All babies, and each named baby. "All babies" saves one row with `memory_scope = 'all_babies'` and no `baby_id` — never fanned out.

## Keep this as a memory

A quiet "Keep this as a memory" action on saved Daily Check-in note rows. It navigates to the memories page carrying only a source entry id (route state, never note text in the URL). The page fetches that entry from the user-owned table, confirms ownership, and pre-fills the form with the note text and date. Saving writes a new memory row with `source_entry_id` set.

Copy-forward semantics: editing the source note never changes the memory; deleting the source note leaves the memory intact and nulls `source_entry_id`.

## UX

`src/pages/firstyear/FirstYearMemories.tsx`: back link to `/my-first-year`, title "Memories", intro "A place to keep the little things you want to look back on.", a "Save a moment" form (optional title, required note with counter, date defaulting to today, selector for multiples only), memories list newest first grouped by month, empty state, edit and remove actions, and a live region for save, update and remove.

Buttons: "Save this memory" / "Update this memory". Remove confirmation: "Remove this memory?" / "This memory will be removed from your keepsakes." / "Remove memory".

## /my-first-year Memories card

New `MemoriesCard`, lighter than the Today card, placed after the recently-saved preview and before the kept pregnancy chapter. Copy: "A place to keep the small things you want to remember." Shows the most recent one or two memory titles when they exist, no counts, and links through to the memories page.

Order: hero, baby summary, Today, recent preview, Memories, kept chapter, baby lane, parent lane, what comes next.

## Export

Account Settings data download gains `first_year_memories` raw rows: `id`, `baby_id`, `memory_scope`, `memory_date`, `title`, `note`, `source_entry_id`, `created_at`, `updated_at`. No media fields or URLs.

## Files changing

New migration; `src/lib/firstYearMemoriesSchema.ts`; `src/lib/firstYearMemories.ts`; `src/pages/firstyear/FirstYearMemories.tsx`; `src/components/firstyear/memories/*`; `src/components/firstyear/journey/MemoriesCard.tsx`; `src/pages/firstyear/MyFirstYear.tsx`; `src/pages/firstyear/FirstYearToday.tsx`; `src/pages/AccountSettings.tsx`; `src/App.tsx`; regenerated `src/integrations/supabase/types.ts`; co-located schema tests. `src/lib/authIntent.ts` only if the existing `/my-first-year` prefix does not already cover the new path.

Not changing: sitemap script, robots, public First Year pages, article data, pregnancy and TTC surfaces, the toolkit, existing check-in save behaviour, AI companion context, analytics definitions, media, trackers.

## QA

Disposable accounts only, live account untouched. Covers schema and validation rejections (empty note, over-length note and title, future date in UI and database, pre-birth date, other user's baby or source entry, non-First-Year user, anon access), single baby flows, twins scope flows, the check-in connection and source independence, route guards and noindex, signed-out return, export contents, copy safety grep, accessibility and keyboard flows, 390px and 1440px layout, and a clean console/network. All disposable rows and auth users removed afterwards.

Commands: `npx tsgo --noEmit -p tsconfig.json`, targeted tests, `npx vitest run`, `npm run build`, with sitemap and dist results reported.

## Note

The migration needs build mode to run. Approving this plan lets me apply it and build the rest.
