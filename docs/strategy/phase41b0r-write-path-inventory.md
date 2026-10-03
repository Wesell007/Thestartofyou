# Phase 41B.0-R — Write-path inventory

Companion to `phase41b0r-family-entity-architecture-reconciliation.md` (D9, D8, D7).
Rebuilt from the repository at commit `9593d13`. Read-only. No code changed.

Replaces the "Client write paths to migrate = 17" list in `phase41b-family-entity-migration-plan.md` §7.

## How it was built, and its limit

Five readers each took one area (pregnancy core, week keepsakes, toolkit, First Year and babies, context and server) and followed imports from every page, hook and library file, quoting each write. About 300 file reads in total, with overlap. The findings that drive design decisions were then checked directly against `savedJourney.ts`, `20260803231512` and `20260804110355`.

The repository connector has no search. A write in a file nobody opened would be missing from this list. The first step of 41B.1C, on a real clone, is a repository-wide search for `.from(`, `.rpc(` and `.storage.from(` against the 24 tables and two buckets, reconciled against this inventory. Until then the list is treated as complete for design and incomplete for sign-off.

Subphase codes: **1B** backfill and compatibility. **1C-1** readers. **1C-2** singleton writers and binding. **1C-3** enabling constraints. **1C-4** journey functions. **1C-5** context. **1D** final tightening. **—** no change in 41B.

"Current chapter" means the episode named by `journeys.current_pregnancy_episode_id` while lifecycle is `pregnancy`.

---

## 1. Journey and lifecycle — 8 paths

| # | File · function | Current write | Reached from | Target | Subphase |
|---|---|---|---|---|---|
| J1 | `lib/savedJourney.ts` · `upsertPregnancyJourney` | RPC `save_pregnancy_journey(lmp, due)` | `commitPendingJourneyToDB` (`Auth.tsx` route, `Setup.tsx` mount); `saveActivePregnancyJourney` (`PregnancySetup.handleSave`, `DueDateCalculatorResult.handleSaveJourney`) | Same call, new behaviour: create when none open, no-op on same dates, bounded date correction, result code instead of an exception. Callers handle `needs_confirmation`. | 1C-4 |
| J2 | `lib/savedJourney.ts` · `mirrorToLegacy` | upsert `saved_journeys`, `onConflict: "user_id"`, errors swallowed | after every J1 | Removed from the client. The legacy mirror, while it lives, is written by the server function. | 1C-4 |
| J3 | `lib/savedJourney.ts` · `getActivePregnancyJourney` | RPC `save_pregnancy_journey` **inside a read**, from the legacy `saved_journeys` row | eleven callers: post-login routing, Setup, PregnancySetup, due-date result, My Week, My Journey, kept week, Journey Support, status section, toolkit notice, TTC setup | Write removed. Read-only fallback kept until retirement, bounded to plausible dates. The hard-coded `status: "active"` on the fallback result goes with it. | 1C-4 |
| J4 | `lib/savedJourney.ts` · `deletePregnancyJourney` | RPC `delete_active_journey('pregnancy')`; the `false` return is ignored | `AccountSettings.removeJourney` | New removal semantics (reconciliation §6, decision 6). Client checks the result. | 1C-4 |
| J5 | `lib/savedJourney.ts` · `updatePregnancyJourneyStatus` | direct `update pregnancy_journeys set status, status_changed_at (browser clock), outcome_date where user_id` | `JourneyStatusSection.commit` (loss, given birth, paused, no longer pregnant, return to active) | One server function for every status change on the pointed episode; server clock; refuses an illegal transition; mirrors to the legacy row. | 1C-4 |
| J6 | `lib/firstYearJourney.ts` · `saveFirstYearJourney` | RPC `save_first_year_journey(p_babies)` | `FirstYearSetup.handleSubmit` | Same call, non-destructive function: earlier cohort archived, never deleted; server-side lifecycle guard; repeat-safe; children linked to the episode when there is one. | 1C-4 |
| J7 | `lib/savedTTCJourney.ts` · `commitPendingTTCJourneyToDB` | RPC `save_ttc_journey`; returns `pregnancy_active` for any lifecycle `pregnancy` | `SetupTTC.handleSubmit` | Refuses only when the pointed episode is open. | 1C-4 |
| J8 | `lib/savedTTCJourney.ts` · `deleteTTCJourney` | RPC `delete_active_journey('ttc')` | `AccountSettings`, `MyTTCJourney` | Unchanged for TTC. Listed because it shares the function replaced for J4. | 1C-4 |

Not in 41B: `saveIVFTimelineContext` and `clearIVFTimelineContext` (update `ttc_journeys` by user; flag off; parked as IVF-SAVE-R).

## 2. Week keepsakes — 23 paths

Bucket `weekly-photos`. All rows keyed today by `(user_id, week)` or `(user_id, week, media_type)`.

| # | File · function | Current write | Target | Subphase |
|---|---|---|---|---|
| K1–K4 | `components/myweek/SlotReflection.tsx` · autosave, `flushLatest`, `acceptShapedDraft`, `retrySave` | upsert `reflections`, `onConflict: "user_id,week"` | One reflection writer keyed by current chapter and week. Editing a legacy unbound row updates that row by id and leaves it unbound. | 1C-2 |
| K5 | `SlotPhotoMemory.tsx` · `handleFiles` upload | storage upload to `{userId}/{week}.{ext}`, `upsert: true` | Unique path `{userId}/{week}/photo/{id}.{ext}`, `upsert: false`. | 1C-2 |
| K6 | `SlotPhotoMemory.tsx` · `handleFiles` row | upsert `week_photos`, `onConflict: "user_id,week"` | Photo writer keyed by current chapter and week. | 1C-2 |
| K7 | `SlotPhotoMemory.tsx` · rollback on row error | storage remove of the new object | Unchanged in intent; acts on the new unique path. | 1C-2 |
| K8 | `SlotPhotoMemory.tsx` · old object cleanup | storage remove of the previous object when the extension changed | Removes the path stored on the row being replaced, after the new row is saved. | 1C-2 |
| K9 | `SlotPhotoMemory.tsx` · `handleRemove` row | delete `week_photos where user_id, week` | Delete by row id. | 1C-2 |
| K10 | `SlotPhotoMemory.tsx` · `handleRemove` object | storage remove of the loaded row's path | Unchanged. | — |
| K11 | `SlotPhotoMemory.tsx` · `handleRemove` restore | upsert `week_photos`, `onConflict: "user_id,week"` | Restore through the photo writer. | 1C-2 |
| K12 | `SlotPhotoMemory.tsx` · `saveCaption` | update `week_photos where user_id, week` | Update by row id. | 1C-2 |
| K13 | `hooks/useWeekMedia.ts` · `upload` object | storage upload `{userId}/{week}/{mediaType}/{id}.{ext}`, `upsert: false` | Unchanged. | — |
| K14 | `useWeekMedia.ts` · `upload` row | upsert `week_media_memories`, `onConflict: "user_id,week,media_type"` | Media writer keyed by current chapter, week and type. | 1C-2 |
| K15 | `useWeekMedia.ts` · `upload` rollback | storage remove of the new object | Unchanged. | — |
| K16 | `useWeekMedia.ts` · previous object cleanup | storage remove of the path loaded from the `(user, week, type)` row | Must use the path of the row in the same chapter. Today it would delete an earlier pregnancy's file. | 1C-2 |
| K17 | `useWeekMedia.ts` · `uploadVoice` object | storage upload, unique id | Unchanged. | — |
| K18 | `useWeekMedia.ts` · `uploadVoice` row | upsert, `onConflict: "user_id,week,media_type"` | Media writer. | 1C-2 |
| K19 | `useWeekMedia.ts` · `uploadVoice` rollback and cleanup | storage remove | As K15 and K16. | 1C-2 |
| K20 | `useWeekMedia.ts` · `remove` row | delete `where user_id, week, media_type` | Delete by row id. | 1C-2 |
| K21 | `useWeekMedia.ts` · `remove` object | storage remove | Unchanged. | — |
| K22 | `useWeekMedia.ts` · `remove` restore | upsert with a placeholder file size | Restore through the media writer with the real size. | 1C-2 |
| K23 | `useWeekMedia.ts` · `saveCaption` | update `where user_id, week, media_type` | Update by row id. | 1C-2 |

Not a database write, recorded for PX-B: signed-out week reflection drafts live only in the browser under `tsoy:public-week-{week}:reflection-draft` and never reach the account.

## 3. Pregnancy toolkit — 20 paths

No table carries a pregnancy key today. Two have unique keys that collide across pregnancies. None is gated on lifecycle, so First Year and TTC accounts can write to them.

| # | File · function | Current write | Target | Subphase |
|---|---|---|---|---|
| T1 | `hooks/useBirthPlan.ts` · `saveAnswers` | upsert `birth_plans`, `onConflict: "user_id"` | Birth plan writer keyed by current chapter. | 1C-2 |
| T2 | `hooks/useHospitalBag.ts` · load-effect seeding | upsert defaults, `onConflict: "user_id,category,item_key"`, only when the person has zero rows | Seed per chapter when the chapter has zero rows, through the hospital bag writer. | 1C-2 |
| T3 | `useHospitalBag.ts` · `togglePacked` | update by `id` | Unchanged. | — |
| T4 | `useHospitalBag.ts` · `addCustomItem` | insert | Bound by the binding trigger. | 1C-2 |
| T5 | `useHospitalBag.ts` · `deleteCustomItem` | delete by `id` | Unchanged. | — |
| T6–T8 | `hooks/usePregnancyAppointments.ts` · create, update, remove | insert with `user_id` only; update and delete by `id` | Insert bound by the trigger. Update and delete unchanged. | 1C-2 |
| T9–T11 | `hooks/usePregnancySymptomNotes.ts` · create, update, remove | as above | as above | 1C-2 |
| T12–T14 | `hooks/useBabyMovementNotes.ts` · create, update, remove | as above | as above | 1C-2 |
| T15–T18 | `hooks/useMidwifeQuestions.ts` · create, update, patch, remove | insert with optional `appointment_id` (no foreign key) | Insert bound by the trigger, which also refuses an `appointment_id` from another chapter. | 1C-2 |
| T19 | `hooks/useContractionTimer.ts` · `saveSession` step 1 | insert `contraction_sessions` | Bound by the trigger. | 1C-2 |
| T20 | `useContractionTimer.ts` · `saveSession` step 2 | bulk insert `contraction_events` in a second request | Episode copied from the session by the trigger. The two inserts are not one transaction today; a failed second request leaves an empty session. Recorded, not changed in 41B. | 1C-2 |

Updates and deletes by `id` rely on row-level security alone. That stays correct under the episode model.

## 4. First Year, child-scoped — 20 paths

These do not gain a pregnancy link. They are here because the child model changes underneath them (reconciliation §3) and four foreign keys change in 41B.1D.

| # | File · function | Current write | Target | Subphase |
|---|---|---|---|---|
| F1–F2 | `lib/firstYearEntries.ts` · `saveEntry` update and insert | lookup, then update by `id` or insert; partial unique indexes | Unchanged. This lookup-then-write idiom already works against partial unique indexes and is the model for the singleton writers. | — |
| F3–F4 | `firstYearEntries.ts` · `saveEntryForBabies`, `deleteEntry` | no call site found | Unchanged. | — |
| F5 | `lib/firstYearMemories.ts` · `createMemory` | insert; `baby_id` only when scope is `baby` | Unchanged. | — |
| F6 | `firstYearMemories.ts` · `updateMemory` | update; rewrites `memory_scope` and `baby_id` on every edit | Must not rebind a memory to a different child when the visible list is the current cohort only. | 1C-4 |
| F7–F11 | `firstYearMemories.ts` · `deleteMemory`, `removeMemoryPhotoObject`, `attachMemoryPhoto` upload and row, `clearMemoryPhoto` | row writes by `id`; bucket `first-year-memories`, path `{userId}/{memoryId}/{id}.{ext}` | Unchanged. | — |
| F12–F15 | `lib/firstYearReminders.ts` · create, update, set status, delete | by `id`; `baby_id` optional | Unchanged. | — |
| F16–F20 | `lib/firstYearCareEvents.ts` · `saveCareEvent`, `updateCareEvent`, `deleteCareEvent`, `stopSleep`, `patchFeed` | by `id`; `baby_id` required | Unchanged. | — |

Implicit writes through foreign keys when a `babies` row is deleted, all removed as a route in 41B.1C and made impossible in 41B.1D:

| Table | Today | 41B.1D |
|---|---|---|
| `first_year_entries.baby_id` | CASCADE | composite RESTRICT |
| `first_year_care_events.baby_id` | CASCADE | composite RESTRICT |
| `first_year_reminders.baby_id` | CASCADE | composite RESTRICT |
| `first_year_memories.baby_id` | SET NULL, which the scope CHECK forbids for a baby-scoped memory | composite RESTRICT |

## 5. Account deletion — 3 paths

| # | File · function | Current write | Target | Subphase |
|---|---|---|---|---|
| A1 | `pages/AccountSettings.tsx` · `deleteAccount` | invokes `delete-account` | Unchanged. | — |
| A2 | `supabase/functions/delete-account` · storage sweep | removes every object under `{userId}/` in both buckets; fixed depth, 1,000 per folder, no paging | Unchanged in 41B. New storage paths stay inside its limits. | — |
| A3 | `delete-account` · account deletion | `admin.deleteUser`; every table row goes by cascade from the account | Unchanged. Must be proven against the new RESTRICT links at rehearsal. Storage is removed before the account; the order is a known weakness. | 1A-C1 test |

## 6. Database functions and triggers behind these paths — 8

| Object | Latest definition | What it does today | Target | Subphase |
|---|---|---|---|---|
| `save_pregnancy_journey` | `20260803231512`, SECURITY INVOKER | Upserts the single row; on conflict changes only the dates; sets lifecycle to `pregnancy` unconditionally | Reconciliation §9 | 1C-4 |
| `save_ttc_journey` | `20260803231512` | Refuses when lifecycle is `pregnancy`, whatever the status | Refuses only an open pregnancy | 1C-4 |
| `save_first_year_journey` | `20260804110355`, never redefined | Archives when lifecycle is `pregnancy`; deletes all babies; reinserts; no lifecycle guard | Non-destructive, guarded, repeat-safe | 1C-4 |
| `delete_active_journey` | `20260804110355` | Hard-deletes by lifecycle; the `first_year` branch has no caller in the app | Decision 6 | 1C-4 |
| `validate_first_year_entry` | `20260806202830` | Requires lifecycle `first_year`; date floor is the earliest birth across all babies | Current cohort | 1C-4 |
| `validate_first_year_memory` | `20260813213004` | Same; also fires on the foreign-key SET NULL update | Current cohort | 1C-4 |
| `validate_first_year_care_event` | `20260818174001` | Same | Current cohort | 1C-4 |
| `first_year_reminders_validate` | `20260819193611` | Ownership only; no lifecycle requirement | Unchanged | — |

## 7. Readers that must change before a second row can exist

Subphase 1C-1 unless stated. Each reads by person only today.

| File · function | Reads | Why it breaks |
|---|---|---|
| `SlotReflection`, `SlotPhotoMemory`, `useWeekMedia`, `SectionKeepThisWeek`, `KeptChapter` | `.maybeSingle()` on `(user_id, week)` | Two pregnancies sharing a week return two rows and the call errors |
| `useBirthPlan` | `.maybeSingle()` on `user_id` | Same |
| `MyJourney`, memory film | all reflections, photos, media by person | Mixes pregnancies under one title and due date |
| `firstyear/MyPregnancyChapter` | all week records by person, under one archived snapshot | Mixes pregnancies; would go empty under the closed "active episode only" rule |
| `getKeptPregnancyChapter`, `useLifecycle` | the referenced archive, else the most recent | Picks one chapter by recency; becomes the kept pointer |
| Toolkit list hooks (appointments, symptom notes, movement notes, questions, contraction history, hospital bag) | all rows by person | Merge pregnancies; the printable mixes them with the current due date |
| `getActivePregnancyJourney` | `journeys`, `pregnancy_journeys`, `saved_journeys` with `.maybeSingle()` | Becomes the pointed-episode reader; stays the single contract for pages |
| `getBabies` and First Year pages | all babies by birth order; pages take `babies[0]` | Reconciliation §3 |
| `getRunningSleeps`, `getRunningFeeds` | every unfinished timer for the person, no time bound | An earlier child's unfinished timer would surface on Today |
| `AccountSettings.exportData` | fixed list of 24 tables | Omits care events, reminders, the legacy journey row and, later, episodes (1C-4) |
| `companion/journeyPersonalSource.ts` | pregnancy row and babies by person | 1C-5 |
| `_shared/aiJournalContext.ts`, `_shared/aiSelectedJournalEntry.ts` | `pregnancy_journeys?limit=1`; babies `limit=4`; two different episode boundaries | 1C-5; frozen area, changed only in that approved subphase |

## 8. Writes confirmed out of scope

Person-level, not pregnancy- or child-scoped; unchanged by 41B.

- `profiles` upserts: `Setup.handleSubmit`, `AccountSettings.saveCompanion` and `resetCompanion`, `BabyIllustrationStyleField.persist`, `FirstYearSetup` companion step, `journalPermission.writeJournalPermission`.
- Companion memory, conversation and message writes, and the rate-limit function in `ai-search`. These are person-wide by design. Their scope across pregnancies and children is a Phase 44 and 45 question (reconciliation N13).
- TTC logs and the TTC journey row.

## 9. Counts

| | Closed 41B.0 | Rebuilt |
|---|---|---|
| Client and edge write paths | 17 | 74 |
| of which change behaviour in 41B | — | 35 (journey 7, keepsakes 18, toolkit 9, First Year 1) |
| of which are storage operations | 0 | 13 |
| Client upserts naming a conflict target that will stop existing | not recorded | 11 |
| Reads that perform a write | not recorded | 1 |
| Database functions and validators behind them | 5 | 8 existing, 7 changed |

---

## 10. Recovery addendum (3 October 2026)

Provenance. Sections above are the original 41B.0-R text, authored on 2 October 2026 in a Claude session that had read access to the repository but no write path to it. The files were staged in that session's handover folder and never committed. On 3 October 2026 the text was restored into this repository by replaying the session's recorded Write and Edit operations in order; the restored content is byte-identical to the final staged version. Nothing above this addendum has been rewritten.

Owner decisions recorded after this inventory (see section 27 of the reconciliation document) that change target wording here, with the original rows kept as written:

- **J1** target "bounded date correction": SUPERSEDED. No automatic date threshold. Same dates → `unchanged`; explicit "update my dates" → update the open episode after validation; explicit "start a new pregnancy" → the new-pregnancy transition; a legacy or background save with different dates → `needs_confirmation`.
- **J4** and the `delete_active_journey` row of section 6: decision 6 is now resolved at the product level (closed and hidden, records retained, episode-local, no automatic widening of the shared status enum). The concrete episode-local representation is confirmed at the 41B.1A amendment gate.

The limit stated in "How it was built, and its limit" is unchanged: 74 paths is the recorded count, and a repository-wide search on a real clone is still required before 41B.1C sign-off.
