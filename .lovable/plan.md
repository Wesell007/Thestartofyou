# Phase 9.5e — TTC Calendar and Logging MVP (ready to build)

The database migration for `public.ttc_logs` has already been approved and applied (table, indexes, grants to authenticated + service_role, RLS enabled, 4 owner-scoped policies, `set_updated_at` trigger). Remaining work is code only. Please switch to **build mode** to proceed.

## Files to create
- `src/lib/ttcLogs.ts` — types + `getTTCLogsForJourney`, `getRecentTTCLogs`, `createTTCLog`, `updateTTCLog`, `deleteTTCLog`, `groupTTCLogsByDate`, plus shared label maps.
- `src/components/ttc/journey/TTCJourneyCalendar.tsx` — month grid (prev/next/today), milestone chips (soft), user-log icon markers (solid), click a day to open panel, "Add log" button. Mobile-safe at 375px.
- `src/components/ttc/journey/TTCLogEntryPanel.tsx` — shadcn `Sheet` with native `<input type="date">` (per your clarification, no new dependency), Type select, adaptive Value select, optional Notes; create + edit modes; neutral copy; after-save gentle suggestions for `period=started` and `pregnancy_test=positive`.
- `src/components/ttc/journey/TTCLogList.tsx` — "Recent notes" list (latest 5–8), gentle labels, edit + delete (with confirm dialog), neutral styling for pregnancy tests.

## Files to edit
- `src/lib/savedTTCJourney.ts` — add `id: string` to `ActiveTTCJourney` and include `id` in the select.
- `src/lib/analyticsEvents.ts` — add `TTC_LOG_CREATED`, `TTC_LOG_DELETED` (common envelope only).
- `src/pages/MyTTCJourney.tsx` — insert new "Cycle calendar & logging" section (heading + privacy note + calendar + recent logs) after Timeline and before Focus. Wire selected-date/panel state, fetch logs for the visible month, refetch on save/delete. Load journey `id` (already available via updated helper).
- `src/integrations/supabase/types.ts` — add `ttc_logs` entry only if the regen doesn't cover it after the migration.

## Guardrails (confirmed)
No auto-recalc, no pregnancy-journey creation, no archival, no reminders/notifications, no intercourse tracking, no fertility score, no "safe/unsafe days", no clinical interpretation, no changes to SEO, sitemap, robots, calculators, or public hubs. Analytics carry no log type/value/date/notes/cycle data.

## Verification plan
- `bunx tsgo --noEmit`
- `psql` checks: table exists, RLS on, 4 policies, grants correct, no anon, trigger present.
- Playwright smoke on `/my-ttc-journey` + regression HTTP status pass on all listed routes.
- 375px viewport screenshot of the calendar.
- Signed-in DB flow: will report as an unverified limitation if no session is injected in this environment.

Approve/switch to build mode to proceed.
