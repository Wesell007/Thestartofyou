# Phase 26G — Parent-set Reminders Foundation

Parents choose their own reminders on `/my-first-year/today`. Nothing is suggested, predicted or automated.

## Discovery findings

1. No reminder table, hook, component or migration exists anywhere in the project.
2. No browser notification or service worker code exists anywhere (`Notification.requestPermission`, `serviceWorker` return nothing).
3. First Year tables follow `first_year_*` naming, `id uuid` primary key, `user_id uuid references auth.users`, `baby_id uuid references public.babies`, `created_at`/`updated_at` timestamps with a `set_updated_at` trigger.
4. RLS pattern on `first_year_care_events`: grants to `authenticated` and `service_role`, RLS enabled, four `auth.uid() = user_id` policies (select, insert, update, delete). No anon access.
5. Toast pattern: `useToast` from `@/hooks/use-toast`. Validation pattern: pure schema modules (`firstYearCareEventsSchema.ts`, `firstYearEntriesSchema.ts`) returning ok/message results, tested with Vitest.
6. Today section order: quick add row, sleep link, `TodaySoFar`, `ActiveCard`, `BreastTimer`, `DaySummaryCard`, `RhythmTimeline`, day note, `RecentDays`.
7. Date helpers exist: `src/lib/dateOnly.ts`, `localDateKey` in `firstYearEntriesSchema.ts`, `dayBounds` in `firstYearCareEvents.ts`.
8. "Moment" is the existing label for the `note` care type. Pump is dormant in the interface, so it is excluded here.

## Schema

New migration creating `public.first_year_reminders`:

- `id uuid primary key default gen_random_uuid()`
- `user_id uuid not null references auth.users(id) on delete cascade`
- `baby_id uuid null references public.babies(id) on delete cascade` (nullable so single-baby and whole-family reminders work)
- `reminder_type text not null check (reminder_type in ('feed','sleep','nappy','moment'))`
- `label text null` with a length check (max 140)
- `due_at timestamptz not null`
- `status text not null default 'active' check (status in ('active','done'))`
- `created_at`, `updated_at` timestamptz with the shared `set_updated_at` trigger

Indexes: `(user_id, due_at)` and `(user_id, status, due_at)`.

No push, device token, permission or AI fields.

## RLS

Grants to `authenticated` (select/insert/update/delete) and `service_role`, RLS enabled, four policies scoped to `auth.uid() = user_id`. No anon grant. Baby ownership is enforced by a validation trigger following the existing `validate_first_year_care_event` pattern, so a reminder cannot point at another parent's baby.

## New files

- `src/lib/firstYearRemindersSchema.ts` — pure types, labels, validation (`validateReminderDraft`), and grouping (`groupReminders` into Due now, Later today, Tomorrow, Later).
- `src/lib/firstYearReminders.ts` — Supabase reads and writes: list, create, update, mark done, remove.
- `src/components/firstyear/today/RemindersCard.tsx` — the card, list and per-item actions.
- `src/components/firstyear/today/ReminderSheet.tsx` — add/edit sheet mirroring `LogSheet` structure and styling.
- Tests: `firstYearRemindersSchema.test.ts` for validation and grouping.

## UI

Card sits after `TodaySoFar` and before `DaySummaryCard`.

- Title: "Gentle reminders"
- Helper: "Choose what you want to be reminded about and when."
- Control line: "You choose the time."
- Empty state: "No reminders set for today."
- Primary action: "Add reminder"

Each item shows the type, time, baby label where multiples exist, the optional label and its status, with "Mark done", "Edit" and "Remove" actions. Remove uses the existing `ConfirmDialog`.

Sheet: title "Add reminder", helper "Choose what you want to remember and when.", fields for type, baby (multiples only), date, time, optional short label ("Add a short note"), then "Save reminder" and "Cancel". Validation messages: "Choose what this reminder is for." and "Choose a time for this reminder."

Due labels refresh on a light interval while the page is open. No notification API is touched.

## Styling

Existing First Year constants only (`FY_CARD_RADIUS`, `FY_SHADOW_SOFT`, `FY_FOCUS_RING`, sheet field styles) and HSL tokens. The card stays quieter than the active timer card. No hex values, no new dependencies.

## What stays untouched

Care event schema and handlers, Cindy summary, Memories, First Year home, app shell and bottom nav, AI prompts and endpoint, storage, sitemap, public routes, pregnancy chapter, setup flow. No push, permissions, service worker, background scheduling, snooze, or automatic linking between reminders and logged care events.

## Verification

Browser checks at 390px and 1440px covering create, edit, mark done, remove, grouping, sheet layering above the bottom nav, overflow, console and focus rings; plus typecheck, targeted tests, full `vitest run` and `npm run build`.

## Agreed clarifications

- `due_at` is stored as `timestamptz`. The date and time fields are entered and displayed in the parent's local time, converted at the boundary. No timezone copy or settings.
- Empty state reads "No reminders set yet." whenever future reminders could be displayed; "No reminders set for today." only when nothing at all is shown.
- Client queries filter by the signed-in `user_id` as well as relying on row level security.
- Supabase generated types are extended only for the reminder table surface.
- The refresh interval only updates visible due labels while the page is open and clears on unmount. No background scheduling, notifications, service worker or permission prompts.
