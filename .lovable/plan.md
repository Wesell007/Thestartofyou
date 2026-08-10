# Phase 19A — First Year Memories Strategy Report

Planning only. Nothing built in this phase.

## 1. Recommended product approach

A memory is a **short written moment a parent chose to keep**. Not a milestone, not a checklist item, not a scored event.

One shape only:

- an optional short title ("first proper giggle")
- a short note in the parent's own words
- a date (defaults to today, editable)
- an optional baby association

A memory can be about the baby, about the parent, or about the family. The product does not label which; the parent writes whatever they want to remember. This keeps the model simple and avoids anything that feels like categorising a child.

## 2. Text-only first

Yes. Text only for Phase 19B. No photo, video, file storage or media fields, and no media-shaped columns reserved "for later". Photos can be revisited as a separate phase once the keepsake surface has proven itself.

## 3. Connection to Daily Check-in

Both, but with a deliberately small first version:

- **Primary path:** write a memory directly on the Memories page.
- **Secondary path:** a quiet "Keep this as a memory" action on a saved Daily Check-in note, which pre-fills the memory form with that note's text and date and records where it came from.

The secondary path is a copy-forward, not a link. Editing or deleting the original check-in note never changes the memory. This avoids two surfaces fighting over the same row and means a parent can safely tidy their notes without losing a keepsake.

## 4. Route and placement

- New protected, noindex route: **`/my-first-year/memories`**.
- On `/my-first-year`, a single **Memories card** placed **after** the Daily Check-in card and the recently-saved preview, and **before** the kept pregnancy chapter and the support lanes.

Daily Check-in stays the primary action. Memories is the warm second surface, never competing for the top slot.

The card shows a count-free line ("A place to keep the small things you want to remember"), the most recent one or two memory titles when they exist, and a single link through to the full page.

## 5. Multiples

A memory has one optional baby association with three choices:

- one named baby
- all babies (stored as a family memory, not duplicated per baby)
- no baby / family and parent

For twins or more, the selector appears; for a single baby it is hidden entirely and the memory is simply associated with that baby by default. Unlike Daily Check-in, "all babies" does **not** fan out into multiple rows — a keepsake is one moment, not one row per child.

## 6. First version scope

In:

- create memory (title optional, note required, date defaults to today)
- view memories, newest first, grouped by month
- edit memory
- remove memory, with a confirm step
- optional baby association (multiples only)
- "Keep this as a memory" from a saved Daily Check-in note
- Memories card on `/my-first-year`
- empty state

Out of Phase 19B: search, tags, filters, pinning, favourites, sharing, printing, exports beyond the JSON data download, any media.

## 7. Export

Yes — include memories in the Account Settings data download, alongside the existing First Year notes.

Exported fields: `id`, `baby_id`, `memory_date`, `title`, `note`, `source_entry_id`, `created_at`, `updated_at`. Raw rows only, matching the existing export pattern.

## 8. Copy direction

Warm, keepsake-led, short. Uses: remember, moment, little thing, firsts, today, your baby, your family, save, keepsake, look back.

Examples:

- Page title: "Memories"
- Page intro: "A place to keep the little things you want to look back on."
- Empty state: "Nothing kept yet. When something happens that you want to remember, save it here."
- Save button: "Save this memory" / "Update this memory"
- From a check-in note: "Keep this as a memory"
- Delete confirm: "Remove this memory? You will not be able to get it back."

Banned throughout: safe, unsafe, normal, abnormal, low risk, high risk, everything is okay, no need to call, baby is fine, symptom checker, diagnosis, delayed, behind, advanced. Also avoided: milestone, progress, streak, complete.

## 9. Data model

A new table is needed. `first_year_entries` is date-and-kind keyed with a uniqueness rule per day and a lifecycle trigger; memories are free-form, can repeat on a date, and must survive note edits. Reusing it would corrupt both surfaces.

Proposed `public.first_year_memories`:

| column | type | notes |
| --- | --- | --- |
| id | uuid pk | default gen_random_uuid() |
| user_id | uuid not null | references auth.users(id) on delete cascade |
| baby_id | uuid null | references public.babies(id) on delete set null |
| memory_date | date not null | local calendar date, defaults to today client-side |
| title | text null | trimmed, max 120 |
| note | text not null | trimmed, max 2000 |
| source_entry_id | uuid null | references public.first_year_entries(id) on delete set null |
| created_at | timestamptz not null | default now() |
| updated_at | timestamptz not null | maintained by the existing `set_updated_at` trigger |

No unique constraint: several memories can share a date. Index on `(user_id, memory_date desc)`.

**Grants and RLS**, following the existing First Year pattern exactly:

- `GRANT SELECT, INSERT, UPDATE, DELETE ON public.first_year_memories TO authenticated;`
- `GRANT ALL ON public.first_year_memories TO service_role;`
- no `anon` grant
- RLS enabled, four policies all scoped to `auth.uid() = user_id`

**Validation** mirrors the existing two-layer approach: a pure client module (`firstYearMemoriesSchema.ts`) plus a database trigger. Rules:

- note non-empty after trim, 2000 max; title 120 max
- `memory_date` not in the future
- `memory_date` not before the earliest baby's date of birth
- `baby_id`, when set, must belong to the same user
- trigger also enforces the `first_year` lifecycle guard, matching `validate_first_year_entry`

**Delete behaviour:** hard delete of the memory row. Deleting a baby nulls `baby_id` rather than removing the memory. Deleting the source check-in note nulls `source_entry_id` and leaves the memory intact. Account deletion cascades as today.

## 10. UX structure

`/my-first-year/memories`:

1. Header with a short warm intro and a back link to `/my-first-year`
2. "Save a moment" form: note field with character counter, optional title, date field defaulting to today, baby selector for multiples only, one save button
3. Memories list, newest first, grouped by month heading; each item shows the date, title if present, note, baby name if associated, and Edit / Remove actions
4. Empty state when nothing is kept yet
5. Live region announcing saves, edits and removals, matching the Daily Check-in pattern

On `/my-first-year/today`, each saved note row gains a quiet "Keep this as a memory" action which navigates to the memories page with the note text and date pre-filled.

## 11. Files likely to change in Phase 19B

- new migration for `first_year_memories`
- `src/lib/firstYearMemoriesSchema.ts` (new, pure)
- `src/lib/firstYearMemories.ts` (new, data access)
- `src/pages/firstyear/FirstYearMemories.tsx` (new)
- `src/components/firstyear/memories/*` (new: form, list, item, empty state)
- `src/components/firstyear/journey/MemoriesCard.tsx` (new)
- `src/pages/firstyear/MyFirstYear.tsx` (add the card and its data load)
- `src/pages/firstyear/FirstYearToday.tsx` (add the keep-as-memory action)
- `src/pages/AccountSettings.tsx` (add memories to the export)
- `src/App.tsx` (register the protected route)
- `src/integrations/supabase/types.ts` (regenerated)
- new co-located tests for the schema module

## 12. Files that must not change

- `scripts/generate-sitemap.ts`, `public/robots.txt` (memories is protected and noindex)
- `src/lib/firstYearEntries.ts` and `src/lib/firstYearEntriesSchema.ts` behaviour (read-only from the memories flow)
- `src/integrations/supabase/client.ts`
- pregnancy, TTC and toolkit surfaces
- existing article and content data
- analytics event definitions, unless a new consent-gated event is agreed separately

## 13. QA plan

- schema unit tests: empty note, over-length note and title, future date, pre-birth date, cross-lane and cross-user baby association
- signed-in browser QA on disposable accounts only: single baby, twins, transition user, direct-start
- verify create, edit, remove, empty state, and keep-as-memory pre-fill
- verify deleting a source check-in note leaves the memory intact
- verify the memories page is noindex and behind `ProtectedRoute`
- verify export includes memories and no storage paths or URLs
- 390px and 1440px layout, tab order, focus visibility, heading order, live region announcements
- banned-word sweep across new copy
- typecheck, lint, tests, build

## 14. Risks and open questions

- **Drift into a milestone log.** Mitigated by keeping the title optional and free text, with no suggested milestone list.
- **Overlap with Daily Check-in.** Mitigated by copy-forward rather than shared rows, and by keeping Memories below Check-in on the home page.
- **Date confusion for backdated memories.** The date field defaults to today and is bounded by the earliest date of birth.
- Open: should a memory list eventually cover the kept pregnancy chapter too? Recommend no for 19B.
- Open: should the home card show a memory count? Recommend no — counts invite streak thinking.

## 15. Recommendation

Phase 19B should proceed, with the scope above.
