# Phase 41B.0-R — Family Entity Architecture Reconciliation

Corrective design addendum. Documentation and design only.
Date: 2 October 2026. Repository state: commit `9593d13`. Implementation owner from here on: Claude Code.

Database changes 0. Customer rows read 0. Product code changes 0. Migrations edited 0. Deployment NO. 41B.1B NOT STARTED.

The historical Phase 41B.0 closure stands as recorded. This addendum supersedes specific parts of the five 41B.0 documents; section 22 lists each superseded passage. Where this document and a 41B.0 document disagree, this document governs.

Evidence used: the five 41B.0 documents, the four 41A documents, the three 41B.1A documents, the pending SQL, all 47 committed migrations, the 27 September live catalogue snapshot (structure only), generated types, and about 150 client and edge-function files. Detailed write-path evidence is in `phase41b0r-write-path-inventory.md`. Nothing was executed against a database; runtime statements are reasoned from the files and marked as such.

---

## 1. Corrected model in one page

```text
USER (auth.users)                         owner of everything below; single-user ownership
 ├── PREGNANCY EPISODE (many)             durable; own id; dates required; status; expected_count
 │     ├── pregnancy records              reflections, week photo, week media, toolkit — bound to the episode
 │     └── CHILD (0..4)                   multiples share one episode
 ├── CHILD with no episode                intentional: legacy, direct add, adoption, surrogacy
 └── CURRENT CONTEXT (one row)            lifecycle + current pregnancy chapter pointer
```

Five things change from the closed design:

1. **One open pregnancy, not one active pregnancy.** `active` and `paused` are both open. At most one open episode per person.
2. **The pointer names the current pregnancy chapter, not the active pregnancy.** It survives loss, pause and birth, so loss-aware screens keep working. Personal context for the Companion still requires `status = 'active'`.
3. **Eleven legacy constraints change, not five**, and seven of them must change before or with the 41B.1C write paths.
4. **Old data stays visible.** Unbound legacy rows keep showing under a bounded compatibility rule until the person confirms or hides them. Nothing is attached by guesswork.
5. **Every 41B migration is reversible by SQL without restoring a backup.** No customer value is overwritten and no populated object is dropped inside 41B. Backups become defence in depth, not the rollback mechanism.

---

## 2. D1 — pregnancy-specific singleton data

Exact constraints from the live snapshot and creating migrations.

| Table | Current unique scope (constraint) | Target unique scope | Episode required on new writes | Constraint must change | Subphase |
|---|---|---|---|---|---|
| `reflections` | `reflections_user_id_week_key` UNIQUE (user_id, week) | bound: (pregnancy_episode_id, week); unbound: (user_id, week) | YES | YES | 41B.1C |
| `week_photos` | `week_photos_user_id_week_key` UNIQUE (user_id, week) | bound: (pregnancy_episode_id, week); unbound: (user_id, week) | YES | YES | 41B.1C |
| `week_media_memories` | `week_media_memories_user_id_week_media_type_key` UNIQUE (user_id, week, media_type) | bound: (pregnancy_episode_id, week, media_type); unbound: (user_id, week, media_type) | YES | YES | 41B.1C |
| `birth_plans` | `birth_plans_user_id_key` UNIQUE (user_id) | bound: (pregnancy_episode_id); unbound: (user_id) | YES | YES | 41B.1C |
| `hospital_bag_items` | `hospital_bag_items_user_id_category_item_key_key` UNIQUE (user_id, category, item_key) | bound: (pregnancy_episode_id, category, item_key); unbound: (user_id, category, item_key) | YES | YES | 41B.1C |
| `pregnancy_appointments` | primary key only | no uniqueness needed | YES | NO | — |
| `pregnancy_symptom_notes` | primary key only | no uniqueness needed | YES | NO | — |
| `baby_movement_notes` | primary key only | no uniqueness needed | YES | NO | — |
| `midwife_questions` | primary key only | no uniqueness needed | YES | NO | — |
| `contraction_sessions` | primary key; UNIQUE (id, user_id) as FK target | unchanged | YES | NO | — |
| `contraction_events` | primary key; FK (session_id, user_id) to sessions, CASCADE | unchanged; episode always equals its session's | YES (server-filled from session) | NO | — |

Each "bound / unbound" pair is two partial unique indexes on `pregnancy_episode_id IS NOT NULL` and `IS NULL`, the pattern already approved for reflections (ledger rows 20 and 21). Useful uniqueness is kept: one reflection per week per pregnancy, one birth plan per pregnancy, one checklist per pregnancy.

Three consequences the closed design did not record:

- **Client upserts stop working.** Eleven client upserts name a conflict target: four on `reflections` and two on `week_photos` (`"user_id,week"`), three on `week_media_memories` (`"user_id,week,media_type"`), one on `birth_plans` (`"user_id"`) and one on `hospital_bag_items` (`"user_id,category,item_key"`). A partial unique index cannot be an `ON CONFLICT` target through the API. These writes must move to server functions before the constraints change.
- **Readers break first.** `SlotReflection`, `SlotPhotoMemory`, `useWeekMedia`, `SectionKeepThisWeek`, `KeptChapter` and `useBirthPlan` call `.maybeSingle()` on user-only keys. Two pregnancies sharing a week number return two rows and the page errors. Caption updates and deletes filtered by user and week would hit both pregnancies' rows. Readers must be episode-scoped before a second row can exist.
- **Files are overwritten, not only rows.** Week photos are stored at `{userId}/{week}.{ext}` with `upsert: true`. A second pregnancy replaces the first pregnancy's file. New photo uploads need a unique path (section 19). Video and voice paths already carry a unique id and are not overwritten.

---

## 3. D2 — archived children and existing uniqueness

Current constraints: `babies_user_birth_order_idx` UNIQUE (user_id, birth_order); `babies_one_primary_per_user_idx` UNIQUE (user_id) WHERE is_primary; `babies_birth_order_range` CHECK 1–4.

Meaning fixed by this addendum: `archived_at` records that a child has left the **current First Year cohort**. It does not mean the child is gone, and interface copy must never say "archived child".

| Question | Answer |
|---|---|
| Can archived children retain their original birth order | YES. Birth order is the order within one birth. It is history and is never rewritten. |
| How is one current primary child represented | `is_primary = true AND archived_at IS NULL`, at most one per person. |
| Can an archived child remain historically primary | YES. The flag is kept as it was; uniqueness applies only to the current cohort. |
| Should uniqueness be partial over non-archived children | YES. Replace both indexes with the same definitions plus `WHERE archived_at IS NULL`. |
| What happens when a user later has another baby | New First Year setup sets `archived_at` on the previous cohort, then inserts the new cohort starting at birth order 1 with its own primary. Nothing is deleted; entries, care events, reminders and memories stay attached to the earlier children. |
| What happens with twins or triplets | One episode, one cohort, birth order 1..n, one primary. Unchanged from today. |
| Does `birth_order BETWEEN 1 AND 4` remain appropriate | YES. It caps one birth at four and matches `expected_count`. |

Code that reads "all of this person's babies" today and must read "the current cohort" once a child can be archived:

| Where | Today | Why it matters |
|---|---|---|
| `getBabies` and every First Year page | all babies by `birth_order`; pages take `babies[0]` | An earlier child would become "the baby" on the home, Today and guidance views |
| `validate_first_year_entry`, `_memory`, `_care_event` | date floor is the earliest date of birth across all babies | The floor would be the older child's birth |
| Companion context (client resolver and both server readers) | unique primary among the first four rows | Could send the older child's age or notes |
| `FirstYearMemories` in single-baby mode | every edit rewrites `baby_id` to `babies[0]` | Editing an earlier child's memory would move it to the current baby |
| First Year pages with no babies | redirect to setup, which redirects back | A cohort filter that returns nothing causes a loop. The archive step must only ever run inside the function that inserts the new cohort. |

Rows with no child (`baby_id` null: parent notes, family memories, "just for me" reminders) stay owned by the person and are not cohort-bound. They are keyed by date and do not collide.

Row-level security lets a signed-in client delete a `babies` row directly today. No screen does. When `delete_baby_permanently` lands in 41B.1D, direct delete is revoked.

Limit recorded, not solved here: 41B keeps one current cohort. Two cohorts current at once (for example an eleven-month-old and a newborn both in the First Year view) is Phase 43 work. The data model above does not prevent it later.

Subphase: `babies.archived_at` and the two index replacements land in 41B.1C with the non-destructive `save_first_year_journey`.

---

## 4. D3 — transitioned pregnancy backfill

Reconstructed behaviour, verified in `20260804110355` and `20260803231512`:

- `save_first_year_journey` inserts an `archived_journeys` row (`lifecycle = 'pregnancy'`, `ended_reason = 'transitioned'`, snapshot of `lmp_date`, `due_date`, `status`, `started_at`) **and leaves the `pregnancy_journeys` row in place**.
- `save_pregnancy_journey` updates only `lmp_date`, `due_date`, `updated_at` on conflict. `status`, `outcome_date` and `started_at` are never reset.
- Babies are inserted in the same transaction as the archive row, so `babies.created_at = archived_journeys.ended_at` exactly for that first setup.

**Identity rule.** A historic pregnancy is identified by `(user_id, lmp_date)`. An archive row and the surviving `pregnancy_journeys` row are the same pregnancy when the user matches and `snapshot.lmp_date = pregnancy_journeys.lmp_date`. Two archive rows with the same `(user_id, lmp_date)` are one pregnancy.

| Legacy state | Classification | Backfill result |
|---|---|---|
| Lifecycle `pregnancy`, row `active`, no archive row | DETERMINISTIC | One open episode from the row. Pointer set. |
| Lifecycle `pregnancy`, row `paused` | DETERMINISTIC | One open episode, status `paused`. Pointer set. |
| Lifecycle `pregnancy`, row ended (`pregnancy_loss`, `no_longer_pregnant`, `given_birth`), dates not saved again after the status was set | Identity DETERMINISTIC; `ended_at` HIGH-CONFIDENCE DERIVABLE | One ended episode. `ended_at` taken from `status_changed_at`, else `outcome_date`, else `updated_at`; the rule used is logged. Pointer set so loss-aware screens keep working. |
| Lifecycle `pregnancy`, row ended, **dates saved again after the status was set** (`updated_at` later than `status_changed_at` by more than a tolerance) | AMBIGUOUS — DO NOT AUTO-ASSIGN | No episode. The row holds a new pregnancy's dates with an earlier pregnancy's status (see below). Counted and reported. Resolved by the person at their next visit after 41B.1C. |
| Lifecycle `first_year`, archive row and retained row with the same `lmp_date` | DETERMINISTIC identity | **One** ended episode, from the archive row. Status `given_birth`; `ended_at` = archive `ended_at`. The retained row creates nothing. |
| Lifecycle `first_year`, archive row and retained row with different `lmp_date` | Archive: HIGH-CONFIDENCE. Retained row: AMBIGUOUS | One ended episode from the archive row. No episode from the retained row; counted and reported. |
| Lifecycle `first_year`, no archive row (joined at First Year) | DETERMINISTIC | No episode. Children stay without an episode by design. |
| Archive row with no `lmp_date` in the snapshot | AMBIGUOUS | Skipped, as the closed plan already says. |
| Lifecycle `ttc` or none, with a `pregnancy_journeys` row that is ended | HIGH-CONFIDENCE | One ended episode. No pointer. |
| Lifecycle `ttc` or none, with a `pregnancy_journeys` row still `active` or `paused` (stale) | AMBIGUOUS — DO NOT AUTO-ASSIGN | No episode. Counted and reported. An episode is created at the person's next explicit save. |
| Lifecycle `pregnancy` with no `pregnancy_journeys` row | AMBIGUOUS | No episode, no pointer. Counted and reported. |
| `saved_journeys` row only (legacy) | AMBIGUOUS | No episode. The read-only legacy fallback continues until retirement. |

Child links: `babies.pregnancy_episode_id` is set only where `first_year_journeys.archived_pregnancy_journey_id` resolves to exactly one backfilled episode. Otherwise the child stays unbound.

The ten pregnancy record tables stay unbound, as approved. `contraction_events` inherits from its session; with no bound sessions this is a no-op at backfill.

One historic pregnancy can never become two episodes: the backfill inserts at most one episode per `(user_id, lmp_date)` and is re-runnable.

**Why one row can describe two pregnancies.** Two existing routes overwrite the dates on an ended row and keep its status: a pending pregnancy committed at sign-in over a `pregnancy_loss` or `given_birth` row, and a First Year parent saving a new pregnancy onto the retained `given_birth` row. The backfill must not turn that row into an ended episode with the new dates. The signal is the order of the two timestamps. `status_changed_at` is written from the browser clock and `updated_at` by the database, and a status change also moves `updated_at`, so the comparison needs a tolerance. The tolerance is fixed at the 41B.1B dry run from the aggregate distribution, not guessed here.

`ended_at` for a transitioned pregnancy is the archive time, which is when First Year setup was completed, not the birth. The birth date lives on the child.

Consequence for 41B.1D: people left without an episode by the ambiguous rules have lifecycle `pregnancy` and no pointer. Ledger row 19 is therefore added `NOT VALID`, so it binds new writes, and is validated only when the aggregate count of such journeys is zero.

**Drift window between backfill and write-path migration.** After the backfill and before 41B.1C, the app still writes `pregnancy_journeys` directly, including status changes made by a plain client update. Episodes would go stale. 41B.1B therefore includes a one-way sync from `pregnancy_journeys` to the pointed episode (a trigger on the legacy table). In 41B.1C the direction flips: the episode becomes authoritative and `pregnancy_journeys` becomes the mirror, as the closed design intended.

---

## 5. D4 — backfill rollback identification

| Field | Decision |
|---|---|
| BACKFILLED ROW IDENTIFICATION | A service-only audit table, `family_entity_backfill_log`: `batch_id`, `table_name`, `row_id`, `column_name` (null for inserted rows), `rule`, `created_at`. One row per inserted episode and per link column set. No customer content. RLS enabled with no policies; no grants to `anon` or `authenticated`. |
| ROLLBACK IDENTIFICATION | By `batch_id`: null the logged link columns, then delete the logged episodes that have no dependants. Source rows are never touched. |
| CAN USER-CREATED AND BACKFILLED EPISODES BE DISTINGUISHED | YES. A backfilled episode has a log row; a user-created one does not. |

A marker column on the episode was rejected: it puts migration bookkeeping on a durable entity and cannot describe link-column backfills on other tables.

The rollback window closes when 41B.1C switches the write paths. After that, backfilled episodes carry live user changes and are corrected forward, not deleted.

---

## 6. D5 — loss-aware context

Three things are separated:

| Concept | Where it lives | Meaning |
|---|---|---|
| Journey state | `pregnancy_episodes.status`, `ended_at` | What happened in this pregnancy. Durable. |
| Current chapter | `journeys.lifecycle` plus the pointer | Which pregnancy the pregnancy screens show now. |
| History | every other episode | Past chapters. Readable, never current context. |

The pointer column is renamed in the pending SQL from `active_pregnancy_episode_id` to **`current_pregnancy_episode_id`**. The old name invites code to assume "pointer means active".

| Question | Answer |
|---|---|
| What pointer or state survives after loss | Lifecycle stays `pregnancy`. The pointer stays on the episode. The episode has `status = 'pregnancy_loss'` and `ended_at` set. |
| When does it stop being the active pregnancy | At the status change. The one-open rule frees immediately. The Companion receives no pregnancy context from it from that moment (existing safeguard, unchanged). |
| How can the UI still reference it | Through the pointer. My Week's quiet state, the reveal-gated memories, the toolkit status notice and "return to active" read the pointed episode and branch on its status, as they do today on the single row. |
| What happens when a new pregnancy begins | A new episode is created and the pointer moves to it. The earlier episode is unchanged and reachable as a past chapter. No question is asked about the earlier pregnancy, because it is already ended. |
| How does `paused` behave | Open, not ended, not active. Pointer stays. No Companion context. "Return to active" sets status back to `active`. Starting a new pregnancy while one is paused requires stating what happened to it first. |
| How does `given_birth` behave | Ended. Lifecycle stays `pregnancy` with the pointer until the person chooses First Year setup; this is a valid resting state. On transition the lifecycle becomes `first_year` and the pointer is **kept** as the reference for the kept pregnancy chapter. |
| What does "Return to active pregnancy" do from an ended state | It exists today for every non-active status and is kept as the way to undo a mistaken change. It reopens the same episode: status `active`, `ended_at` cleared. It is refused if another episode is open. It never creates an episode. |
| Can TTC start after a loss | YES. Today any lifecycle `pregnancy` blocks TTC setup, whatever the status. Target: `save_ttc_journey` refuses only when the pointed episode is open. |

**"Remove this journey".** Today it deletes the single pregnancy row and leaves every reflection, photo and toolkit record behind, where the next pregnancy inherits them. The closed design said "ends and archives" without saying which status. With RESTRICT links an episode that has records cannot simply be deleted, and ending it as a loss or a birth would state an outcome the person did not give. Recommended: an extra ended status on episodes only, `removed`, meaning "closed by the person, no outcome stated". The chapter is hidden from view; its records are kept, stay exportable, are never shown under another pregnancy and go when the account is deleted. An episode with nothing saved in it is deleted outright. Permanent deletion of one pregnancy's records is a later feature. This is owner decision 6 in section 24 and a conditional amendment to the pending SQL (S13).

Resolver rule, restated: personal pregnancy context is produced only when lifecycle is `pregnancy` and the pointed episode is `active`. It never falls back to "latest" or "only". A positive outcome is never assumed.

Ledger row 19 is amended: lifecycle `pregnancy` requires a pointer; any other lifecycle permits one.

---

## 7. D6 — kept pregnancy chapter and unbound legacy data

Evidence: `MyPregnancyChapter` reads reflections, photos and media by `user_id` only, for a person whose lifecycle is `first_year`. The closed rule ("unbound rows shown only with the current active episode") would show that person nothing.

| Field | Decision |
|---|---|
| LEGACY READ COMPATIBILITY | Unbound rows remain readable. If the person has **at most one** episode, unbound rows appear in that pregnancy's chapter, labelled as saved before pregnancies were kept separately. This holds whatever the episode's status and whatever the lifecycle, so First Year kept chapters and loss states keep their content. If the person has **two or more** episodes, unbound rows appear in a separate "earlier notes" area and inside no pregnancy's chapter. |
| NEW WRITE BEHAVIOUR | Every new pregnancy record is bound to the **current pregnancy chapter**: the pointed episode, while lifecycle is `pregnancy`. An insert trigger on the eleven tables fills the link from the pointer when the client sends none, and refuses the row when there is no current chapter. When the client sends an episode id, the composite link already guarantees it belongs to the same person. Nothing is ever bound to "latest" or "only". Behaviour after an ended status is unchanged in 41B: the pages keep their existing notice and records bind to the pointed episode. |
| PERMANENT OWNERSHIP | Only by the person's explicit confirmation. Never automatic. |
| USER CONFIRMATION PATH | A confirm-or-hide step, designed in PX-B: "these belong to this pregnancy" binds the rows; "hide" removes them from view and keeps them stored and exportable. |
| END CONDITION FOR COMPATIBILITY | Per person: when they have no unbound rows left in view. For the code path: when the aggregate unbound count reaches zero, or by a later owner decision at retirement. |

Unbound rows are never sent to the Companion, in any state. That rule is unchanged.

---

## 8. D7 — server-side context readers

| Field | Answer |
|---|---|
| SERVER-SIDE CONTEXT READERS ACCOUNTED FOR | YES: `aiJournalContext` (background journal) and `aiSelectedJournalEntry` (explicitly selected entry). Also in scope for review: `aiJourneyContext` (prints client-supplied week or age) and the memory and history loaders (user-wide). |
| IMPLEMENTATION SUBPHASE | 41B.1C, with the client resolver. They are not modified in 41B.0-R. |
| CURRENT RUNTIME IMPACT | None while `AI_JOURNAL_CONTEXT_ENABLED` is unset. It defaults off in code and is documented off in production. The production value cannot be observed from the repository. |

Findings to carry into 41B.1C:

- Both readers fetch `pregnancy_journeys` with `limit=1` and no key.
- They use different episode boundaries. The background reader uses the later of LMP and the latest archive `ended_at`. The selected-entry reader uses `pregnancy_journeys.started_at`, which the save function never resets, so an earlier pregnancy's reflection can pass as current.
- Both pick "the baby" as the unique primary among the first four rows by birth order, across all of the person's children.

Target: both read the episode named by the pointer and only rows bound to it; child-scoped rows only for the current cohort's unambiguous child. Release rule added: the journal flag must not be turned on before 41B.1C is complete.

---

## 9. D8 — idempotent save behaviour

Callers of `save_pregnancy_journey` today:

| Caller | When | Needs |
|---|---|---|
| `commitPendingJourneyToDB` via `Auth.tsx` and `Setup.tsx` | every signed-in arrival with a device-held pending pregnancy, before the account's existing state is looked at | idempotent; must not raise |
| `saveActivePregnancyJourney` via `PregnancySetup` and `DueDateCalculatorResult` | explicit "Save my pregnancy journey" / "Save your journey"; also where the TTC positive-test handover lands | create or update |
| `getActivePregnancyJourney` | inside a read, whenever only the legacy row exists; reached from eleven callers including My Week, My Journey, toolkit pages, TTC setup, the due-date results page and the Companion resolver | idempotent; errors swallowed |

"Reject any save over an active pregnancy" would break the first and third. It would also lock people out: `Auth.tsx` does not navigate when the commit throws and clears the pending item only on success, so a raised error repeats at every sign-in. `DueDateCalculatorResult` has no error branch at all.

Rule added: for expected outcomes the function **returns a result code and does not raise** (`created`, `unchanged`, `updated`, `needs_confirmation`), as `save_ttc_journey` already does with `pregnancy_active`.

Target behaviour:

| Intent | Target |
|---|---|
| CREATE NEW PREGNANCY | No open episode: create one and point to it. A save never modifies an ended episode. This closes 41A finding 1 without a rejection. |
| UPDATE CURRENT PREGNANCY | An explicit "update my dates" action updates the open episode's dates. |
| IDEMPOTENT RE-SAVE | Open episode with the same dates: success, no change. |
| Legacy call with different dates over an open episode | Treated as a date correction when the LMP moves by 60 days or less. A larger move is refused with a distinct code and the interface asks what happened to the earlier pregnancy. The threshold refuses; it never assigns ownership. |
| Any save for an account whose lifecycle is `first_year` or `ttc` | The function never changes lifecycle on its own. It returns `needs_confirmation`; the interface asks, then calls the explicit start. Today the function sets lifecycle to `pregnancy` unconditionally, so a First Year account is flipped at sign-in or by one tap on a save button, and First Year writes then fail their validation. |
| READ HELPER THAT CURRENTLY WRITES | The write is removed. Reads do not write. |
| OPPORTUNISTIC BACKFILL | REMOVE. The read-only legacy fallback stays until retirement, limited to dates within a plausible pregnancy length; outside that it returns nothing. |

Status changes move from a direct client update to a server function in 41B.1C, so each transition is one transaction.

---

## 10. D9 — write-path inventory

The closed list of 17 is replaced. It counted three files that do not write (`useLifecycle.ts`, `usePublicAccountLink.ts`, `SectionKeepThisWeek.tsx`) and omitted `useWeekMedia.ts`, the status update, the due-date save and the storage writes.

The rebuilt inventory, with file, function, current write, target write and subphase for each path, is in `phase41b0r-write-path-inventory.md`.

| Group | Write paths |
|---|---|
| Journey and lifecycle | 8 |
| Week keepsakes, rows and storage objects | 23 |
| Pregnancy toolkit | 20 |
| First Year, child-scoped | 20 |
| Account deletion | 3 |
| **In scope for 41B** | **74** |
| Database functions and validation triggers that write or gate these paths | 8 |

Limit of this inventory: the repository connector has no search. The inventory was built by five readers covering about 300 file reads, following imports from every page and hook. A write in a file nobody opened would be missed. The first step of 41B.1C, once there is a real clone, is a repository-wide search for every `.from(`, `.rpc(` and `.storage.from(` against the 24 tables and two buckets, reconciled against this list.

---

## 11. D10 — recovery precondition

| Field | Decision |
|---|---|
| PITR REQUIRED | NO |
| WHY | The platform does not offer it and a logical dump cannot be produced, so the precondition can never pass. Keeping it would either block 41B permanently or invite it to be waved through. The risk it was meant to cover is handled better by making every 41B change reversible in SQL. |

Design rule that replaces it: **no 41B migration overwrites a customer value or drops a populated object.** Backfill only sets NULL columns and inserts new rows, all logged. Constraint changes are schema-only. Retirement of `pregnancy_journeys` and the `saved_journeys` fallback is outside 41B.

MINIMUM ACCEPTABLE RECOVERY EVIDENCE:

| Before | Required |
|---|---|
| Every production migration | Isolated rehearsal passed twice from a fresh project, including the rollback file. Catalogue parity diff classified. Rehearsed file byte-identical to the production file. `lock_timeout` set and a quiet window agreed. Explicit approval. |
| Additionally, schema-only steps (41B.1A, constraint changes) | A platform backup observed by the owner, dated within 24 hours. The restore procedure written down, with its consequence stated: an in-place restore loses every write made after the snapshot. |
| Additionally, data-writing steps (41B.1B backfill) | Aggregate before-and-after counts. The audit log rollback rehearsed. A dry run reporting how many rows fall into each rule of section 4, including the ambiguous ones. |
| Additionally, any later destructive retirement | A restore that has actually been exercised, or a full logical export. Not in 41B. |

The two open support questions (restore into a separate project; full logical dump) stay open. They no longer block 41B.1A.

---

## 12. Pending SQL reconciliation — S1 to S8

| Issue | Current SQL | Target decision | Amend | Reason |
|---|---|---|---|---|
| **S1** validation and locks | 13 FKs added validated, one transaction, no timeout; `babies` locked before `journeys` | Add FKs `NOT VALID` in the foundation file. `VALIDATE CONSTRAINT` in a second file. `SET LOCAL lock_timeout` in both. Alter `journeys` before the loop. Non-concurrent index builds are accepted while the tables are small; record aggregate row counts first. | YES | Matches the approved plan, bounds lock waits, and matches the lock order the First Year functions use. |
| **S2** revoke | no revoke | `REVOKE ALL ON public.pregnancy_episodes FROM PUBLIC, anon` before the grants | YES | Tables created with this grant pattern show full `anon` privileges in the live snapshot. Verify the effect at rehearsal. |
| **S3** index shape | `(user_id)`; child indexes `(pregnancy_episode_id, user_id)` | Keep the SQL. The design text is superseded. | NO | The partial unique index serves the open-episode lookup; the composite child index serves the composite FK. |
| **S4** dates and direct writes | `lmp_date`, `due_date` nullable; `authenticated` may insert, update, delete | Both `NOT NULL`. Add the function's date rule as a CHECK. Grant `SELECT` only to `authenticated` in 41B.1A. Policies stay. In 41B.1C the journey functions stay `SECURITY INVOKER`, the repository's deliberate standard since `20260803231512`, so signed-in clients then receive `INSERT` and `UPDATE`, never `DELETE`, and a table trigger enforces legal transitions whichever path writes. | YES | Mirror parity, and no client can create or alter an episode before the transition rules exist. |
| **S5** `paused` | index covers `status = 'active'` only | One **open** episode: predicate `status IN ('active','paused')` | YES | Section 6. |
| **S6** transaction control | own `BEGIN` / `COMMIT` | Remove. Prove atomicity at rehearsal with a forced failure. | YES | None of the 47 committed migrations has it; behaviour would depend on the runner. |
| **S7** rollback | prose only | A real `41b1a_rollback.sql`, guarded: abort unless the table is empty and every link column is null. Rehearsed. | YES | Required by the rehearsal sequence. |
| **S8** static test | counts its own array; no RESTRICT check on `journeys`; misses DML inside `EXECUTE` strings | Count links parsed from the SQL; assert RESTRICT on all 13, the CASCADE from `auth.users`, both CHECKs, the revoke, `NOT NULL` dates, the open-episode predicate, no transaction control, no DML anywhere in the text, and that the rollback file names every created object. | YES | The test must be able to fail. Runtime proof remains the rehearsal. |

Further amendments found in this review:

| Issue | Decision |
|---|---|
| **S9** pointer name | `current_pregnancy_episode_id` (section 6). Constraint and index names follow. |
| **S10** existence guards | Scope `pg_constraint` checks by table, as the committed migrations do. |
| **S11** `CREATE OR REPLACE TRIGGER` | Needs Postgres 14 or later. Confirm the version at rehearsal; otherwise use drop-and-create. |
| **S12** `contraction_events` link | Keep the column. It is always server-filled from the session in 41B.1C. |
| **S13** `removed` status | Conditional on owner decision 6: the status list and the ended-state CHECK accept `removed` as an ended status. |

The SQL is not edited in 41B.0-R.

---

## 13. Pending SQL — statement classification

| Statement | Classification |
|---|---|
| `BEGIN` / `COMMIT` | REMOVE |
| `CREATE TABLE pregnancy_episodes` | AMEND BEFORE REHEARSAL (dates `NOT NULL`, date CHECK) |
| One-active partial unique index | AMEND (open-episode predicate; name) |
| `pregnancy_episodes_user_id_idx` | KEEP AS-IS |
| `updated_at` trigger | KEEP AS-IS (subject to S11) |
| `GRANT … TO authenticated` | AMEND (`SELECT` only; add the revoke) |
| `GRANT ALL … TO service_role` | KEEP AS-IS |
| `ENABLE ROW LEVEL SECURITY` and the four policies | KEEP AS-IS |
| Loop: 12 link columns | KEEP AS-IS |
| Loop: 12 composite FKs | AMEND (`NOT VALID`; table-scoped guard) |
| Loop: 12 indexes | KEEP AS-IS |
| `journeys` pointer column, FK, index | AMEND (rename; `NOT VALID`; moved before the loop) |
| `babies_id_user_id_key` | KEEP AS-IS |
| New: `lock_timeout`; validate file; rollback file | ADD |
| Moved to a later subphase | none |

| Field | Value |
|---|---|
| CURRENT PENDING SQL STILL REHEARSABLE | NO. Rehearsing it would rehearse a file that will not ship. |
| AMENDMENTS REQUIRED | S1, S2, S4, S5, S6, S7, S8, S9, S10; S11 and S13 conditional |
| PENDING SQL STATUS | NEEDS AMENDMENT |

Counts after amendment: 19 ledger controls still prepared in 41B.1A; 13 ownership links; 4 policies. The amendment adds two `NOT NULL` rules and one date CHECK.

---

## 14. Repository and live schema drift

Baseline for the rehearsal: **the repository replay**, diffed against the recorded live snapshot. The objects 41B touches match in both, so the rehearsal is valid for 41B. Live is not altered to match the repository, and the rehearsal is not silently made to match either side.

| Object or area | Repository | Live | Intended state | Rehearsal handling | 41B impact |
|---|---|---|---|---|---|
| `email_delivery_claims`, three delivery functions, `rate_limited` status | created by `20260720110000` | absent | UNRESOLVED | Replay as committed; list as a known difference | NON-BLOCKING |
| `first-year-memories` bucket | policies only; no creation | in use by the app; not in the snapshot (public schema only) | exists | Create by hand as an approved out-of-band object; needed for the account deletion test | NON-BLOCKING |
| Email cron job and vault secrets | not in migrations | applied by the platform's setup tool | live state | Do not reproduce | NON-BLOCKING |
| Eleven early tables without explicit grants | rely on default privileges | `anon` and `authenticated` hold full table privileges | UNRESOLVED | Record the fresh project's defaults; classify | UNKNOWN until rehearsal |
| `sandbox_exec` grants | absent | present on every table | platform artefact | Expected difference | NON-BLOCKING |
| `email_queue_dispatch`, `email_queue_wake` bodies | bootstrap migration | hashes only in the snapshot | UNRESOLVED | Expected difference | NON-BLOCKING |
| Two migrations deleting rows for hard-coded user ids | committed | already run | historical | No-ops on synthetic data | NON-BLOCKING |
| Auth and storage configuration | not in the repository | platform-managed | live state | Project defaults; database-only rehearsal | NON-BLOCKING |
| Postgres version | unknown | unknown | — | Record on both; needed for S11 | UNKNOWN |
| Generated types | follow live (no email objects) | — | — | Not regenerated until a schema is live | NON-BLOCKING |

Production action in 41B.0-R: none.

The parity precondition in the closed plan ("catalogue matches the repository") is superseded: the requirement is that every difference is listed and classified, and that none touches a 41B object.

---

## 15. D11 — saved lifecycle CHECK

`journeys_lifecycle_check` permits `ttc`, `ivf`, `pregnancy`, `postpartum`, `first_year`. Code and functions write only three.

| Field | Value |
|---|---|
| 41B BLOCKING | NO |
| RECOMMENDED FUTURE PHASE | A separate schema-governance task, SG-1, scheduled alongside 41B.1D because row 19 touches the same table. It needs an aggregate count of rows holding the two retired values before the CHECK is replaced. |

Not changed in 41B.0-R.

---

## 16. Partner and co-parent direction

Owner decision recorded: single-user ownership now; a future access-grant layer over the existing pregnancy and child entities; no household entity in 41B.

| Question | Answer |
|---|---|
| Would future partner access require replacing core pregnancy ids | NO. `pregnancy_episodes.id` is a surrogate key independent of the owner. |
| Would future partner access require replacing core child ids | NO. `babies.id` likewise. |

What must stay extensible now:

- `user_id` means the **owning account**, not the author. The composite links (`…, user_id`) stay correct under grants, because a row written by a grantee is still owned by the entity's owner.
- New functions set `user_id` from the entity's owner, not from "whoever is signed in".
- Access rules stay in policies, where a grant clause can be added later without changing keys.
- Storage paths stay prefixed by the owner id.
- No author column is added now.

---

## 17. Children without a pregnancy episode

Owner decision recorded: a child may exist with no pregnancy episode, by design. `babies.pregnancy_episode_id` is nullable permanently. No later tightening is planned.

Reasons include legacy children, direct child creation, adoption, surrogacy and other paths where the account holder has no corresponding pregnancy. No origin field is added in 41B.

Rule for interface and context code: never assume a child has an episode. A null link is a normal state, not corruption. The First Year kept-chapter card appears only when a chapter exists.

---

## 18. Corrected subphases

Each changed object is assigned to exactly one subphase.

**41B.1A — Foundation schema (amended file)**
`pregnancy_episodes` with its primary key, `(id, user_id)` unique, `NOT NULL` dates, date CHECK, `expected_count` CHECK, ended-state CHECK, one-open index, user index, `updated_at` trigger, revoke and grants, RLS, four policies. Twelve link columns, FKs and indexes. `journeys.current_pregnancy_episode_id`, FK and index. `babies (id, user_id)`. Validate file. Rollback file. Strengthened static test.

**41B.1A-C1 — Isolated rehearsal** (section 19).

**41B.1B — Backfill and compatibility**
`family_entity_backfill_log`. Episode backfill by the rules in section 4. Pointer backfill. Derivable child links. One-way sync from `pregnancy_journeys` to the pointed episode. Dry-run counts, the timestamp tolerance, and rollback rehearsal. No client change.

**41B.1C — Enabling constraints and write paths**, in this internal order:

1. Readers become episode-aware, with the compatibility rule of section 7. No schema change.
2. Server functions for the singleton records (reflection, week photo, week media, birth plan, hospital bag) and the client switch to them. New photo uploads use unique storage paths. The binding trigger of section 7 on the eleven tables.
3. Enabling constraint migration: the five unique-key splits of section 2; `babies.archived_at`; the two `babies` index replacements; `INSERT` and `UPDATE` on episodes for signed-in clients with the transition trigger.
4. Journey functions: the save behaviour of section 9 with result codes; status changes, pause and return-to-active as one function; `save_first_year_journey` made non-destructive, repeat-safe and guarded on the server (today the lifecycle guard exists in the client only, so a stale tab or a direct call replaces every baby); `delete_active_journey` per decision 6; `save_ttc_journey` refusing only an open pregnancy; the First Year validators reading the current cohort; the mirror direction flips; the read-helper write is removed; a non-destructive switch between pregnancy and First Year contexts; the data export gains `pregnancy_episodes` and the two First Year tables it omits today.
5. Client resolver and the server readers of section 8 move to the pointer.

Steps 1 and 2 ship before step 3, so no client is left writing against a constraint that no longer exists.

**41B.1D — Final tightening and validation**
Row 19 added `NOT VALID` and validated only when no pointerless pregnancy journey remains (section 4). Rows 23–26 (baby composite RESTRICT links) and removal of the four single-column baby FKs. Memory FK to RESTRICT, `delete_baby_permanently`, and direct delete on `babies` revoked. RLS validation. Account deletion integrity. Context-contamination tests. Rollback rehearsal. Release gate. SG-1 alongside.

Functions, corrected. The closed design counted five.

| Function | Change | Subphase |
|---|---|---|
| Sync from `pregnancy_journeys` to the pointed episode (trigger function) | new, temporary; `SECURITY DEFINER` with a pinned search path, as `touch_companion_conversation` already is, because the client holds no write privilege on episodes yet | 41B.1B |
| `save_pregnancy_journey` | replaced | 41B.1C |
| `save_first_year_journey` | replaced | 41B.1C |
| `delete_active_journey` | replaced | 41B.1C |
| `save_ttc_journey` | amended | 41B.1C |
| Pregnancy status change (end, pause, return to active) | new | 41B.1C |
| Episode transition trigger | new | 41B.1C |
| Binding trigger for the eleven pregnancy record tables | new | 41B.1C |
| Singleton writers: reflection, week photo, week media, birth plan, hospital bag | new, five | 41B.1C |
| Confirm or hide unbound records | new | 41B.1C |
| `validate_first_year_entry`, `_memory`, `_care_event` | amended to the current cohort | 41B.1C |
| `delete_baby_permanently` | new | 41B.1D |

Four replaced or amended journey functions, three amended validators, eleven new. All `SECURITY INVOKER` except the temporary sync trigger.

**After 41B, not inside it:** retiring `pregnancy_journeys` writes and the `saved_journeys` fallback.

Legacy constraints changed or removed, corrected:

| # | Constraint | Subphase |
|---|---|---|
| 1 | `reflections_user_id_week_key` | 41B.1C |
| 2 | `week_photos_user_id_week_key` | 41B.1C |
| 3 | `week_media_memories_user_id_week_media_type_key` | 41B.1C |
| 4 | `birth_plans_user_id_key` | 41B.1C |
| 5 | `hospital_bag_items_user_id_category_item_key_key` | 41B.1C |
| 6 | `babies_user_birth_order_idx` | 41B.1C |
| 7 | `babies_one_primary_per_user_idx` | 41B.1C |
| 8 | `first_year_entries_baby_id_fkey` | 41B.1D |
| 9 | `first_year_care_events_baby_id_fkey` | 41B.1D |
| 10 | `first_year_memories_baby_id_fkey` | 41B.1D |
| 11 | `first_year_reminders_baby_id_fkey` | 41B.1D |

Five becomes eleven. New constraints rise from 26 to 37: the original ledger, plus eight partial unique indexes for the four additional tables, two `babies` partial unique indexes, and the episode date CHECK. Two triggers are added beside them: episode transitions and record binding.

---

## 19. Rehearsal, runtime tests and account deletion

Environment: a new isolated hosted Supabase project in the WesellProducts organisation, approved by the owner. Cost is confirmed with the owner before the project is created. Project ref must differ from `wogepxfipdipogyogced`. Synthetic fixtures only.

The fifteen-step sequence in the brief stands. Additions from this review:

- Record the Postgres version and the default privileges on new tables before anything else.
- Before applying 41B.1A, **characterise today's behaviour on the baseline** with synthetic data: a second pregnancy overwriting week records; First Year setup re-run with baby-scoped memories (the SET NULL against CHECK interaction recorded as unverified in the closed design).
- Force one failure inside the foundation file and confirm nothing persists.

Runtime tests A–L stand. Amended and added:

| Test | Statement |
|---|---|
| B (amended) | A second **open** pregnancy is rejected: active with active, and active with paused. |
| M | An episode cannot be created without both dates, or with dates the save function would refuse. |
| N | `authenticated` cannot insert, update or delete an episode directly in 41B.1A. |
| O | `anon` holds no privilege on `pregnancy_episodes`. |
| P | A pointer on a `first_year` or `ttc` journey is accepted; a pointer to an ended episode is accepted. |
| Q | The rollback file refuses to run when an episode or a link exists. |

**Account deletion.** Account to episode is CASCADE; episode to dependants is RESTRICT. Static analysis says whole-account deletion should succeed, because every dependant also cascades from the account and Postgres runs the restrict checks after the first round of cascades. Two reviewers disagreed on whether it depends on trigger order, so it is treated as unproven. The rehearsal runs the **real** deletion path with a synthetic user holding an episode, episode-bound rows, a linked child, child-bound First Year rows and a populated pointer, and records the trigger order on `auth.users`.

Known weakness to fix in an approved phase (the function is in a frozen area): the deletion function removes storage first and the account second. If the database delete fails, the media is already gone. If that happens at rehearsal: STOP RELEASE and redesign the order.

Storage path rule for 41B.1C: a path needs to be unique, not to name the episode; the row carries the episode. New week photos reuse the shape video and voice already use, `{userId}/{week}/{type}/{id}.{ext}`. No folder level is added. This matters because the deletion sweep stops at a fixed depth and lists at most 1,000 entries per folder without paging; a deeper path would be skipped silently and left behind after account deletion.

---

## 20. Phase 41A risk reconciliation

Implemented currently: NO for every row.

| 41A finding | Sev | Previous 41B.0 response | Drift effect | Corrected response | Subphase | Status |
|---|---|---|---|---|---|---|
| 1 New pregnancy keeps old status and outcome | P1 | New episode; reject save over active | MATERIAL | New episode whenever none is open; idempotent re-save; date correction bounded; ended episodes never touched (section 9) | 41B.1C | DESIGN-ADDRESSED |
| 2 Reflections shared across pregnancies | P0 | Episode link and unique split | MATERIAL | As before, plus readers scoped first and writes through a function (sections 2, 18) | 41B.1C | DESIGN-ADDRESSED |
| 3 Week photos and media keyed by user and week | P0 | Episode link only | MATERIAL | Unique splits for both tables; unique storage paths; files no longer overwritten | 41B.1C | DESIGN-ADDRESSED |
| 4 Toolkit records carry over | P0 | Episode link on eight tables | MATERIAL | Unique splits for birth plan and hospital bag; per-episode seeding; lists scoped to the episode; no writes without a current pregnancy chapter | 41B.1C | DESIGN-ADDRESSED |
| 5 First Year setup deletes all babies | P0 | Archive, RESTRICT links | MATERIAL | Archive-aware uniqueness (section 3); then RESTRICT | 41B.1C, 41B.1D | DESIGN-ADDRESSED |
| 6 Pregnancy from First Year repoints without archiving | P2 | Cohort kept; explicit transition | MATERIAL | Cohort kept and reachable through a non-destructive context switch; pending commit no longer flips lifecycle silently | 41B.1C | DESIGN-ADDRESSED |
| 9 Companion not scoped to pregnancy or child | P2 | Client resolver only | MATERIAL | Client resolver and both server readers read the pointer; unbound rows excluded | 41B.1C | DESIGN-ADDRESSED |
| 10 No plurality field | P2 | `expected_count` | NONE | Unchanged | 41B.1A, 41B.1C | DESIGN-ADDRESSED |

New integrity risks found by this reconciliation:

| # | Risk | Sev | Response | Subphase |
|---|---|---|---|---|
| N1 | A read helper writes, and reports a hard-coded `active` status from the legacy row | P1 | Remove the write; bound the fallback | 41B.1C |
| N2 | Storage files, not only rows, are overwritten or deleted across pregnancies | P0 | Unique paths; replace and remove act on the loaded row's own path | 41B.1C |
| N3 | Stale browser sessions fail to save after a constraint change | P1 | Internal ordering of 41B.1C | 41B.1C |
| N4 | Sign-in commits a device-held pending pregnancy into a First Year or TTC account | P1 | Guard and ask | 41B.1C |
| N5 | Status changes are a direct client update with no transition rule | P2 | Server function | 41B.1C |
| N6 | Episodes go stale between backfill and write-path migration | P1 | One-way sync | 41B.1B |
| N7 | Pregnancy toolkit is writable by First Year and TTC users with no pregnancy | P2 | The binding trigger refuses a row when there is no current pregnancy chapter | 41B.1C |
| N8 | First Year home takes the first baby by birth order, not the primary | P2 | Current-cohort primary rule; PX-B child selector | 41B.1C |
| N9 | Server journal readers use two different episode boundaries | P2 (flag off) | Pointer-based | 41B.1C |
| N10 | Account deletion removes media before the account | P1 | Rehearsal test; reorder in an approved phase | 41B.1A-C1 |
| N11 | After a loss or birth, the screens offer no way to save a new pregnancy or start TTC | P1 | New-episode path; PX-B transition design | 41B.1C |
| N12 | One lifecycle pointer cannot show pregnancy and First Year together. The First Year validators refuse every entry, memory and care event unless lifecycle is `first_year`, so a parent who starts a new pregnancy can no longer log for the child they already have | P2 | Non-destructive switch now; full concurrency in Phase 43 | 41B.1C, Phase 43 |
| N13 | Journal consent is one account-level switch covering every pregnancy and child | P2 | Recorded for Phases 44 and 45 | later |
| N14 | `midwife_questions.appointment_id` has no foreign key and can cross pregnancies | P3 | Same-episode check in the write function | 41B.1C |
| N15 | Repository and live schema differ | P1 for rehearsal fidelity | Section 14 | 41B.1A-C1 |
| N16 | A local build with no `.env` reaches production | P0, separate | `stabilisation-local-dev-production-safety.md` | stabilisation task |
| N17 | `save_first_year_journey` has no lifecycle guard on the server. A stale tab, a second run or a direct call replaces every baby, and each run while lifecycle is `pregnancy` adds another archive row | P0 | Server guard; repeat-safe | 41B.1C |
| N18 | One legacy row can hold a new pregnancy's dates with an earlier pregnancy's status | P1 | Backfill treats it as ambiguous (section 4); new saves never reuse an ended episode | 41B.1B, 41B.1C |
| N19 | A raised error from the save function would block sign-in on every attempt | P1 | Result codes, not exceptions (section 9) | 41B.1C |
| N20 | "Remove this journey" hard-deletes the pregnancy, leaves its records to be inherited, and reports success even when nothing was deleted | P1 | Decision 6 | 41B.1C |
| N21 | The First Year block on sensitive statuses reads the single pregnancy row whatever the lifecycle, so an earlier loss refuses First Year for a later baby | P2 | Read the pointed episode only | 41B.1C |
| N22 | The data export is a fixed list of 24 tables. It omits care events, reminders and the legacy journey row, and would omit episodes | P2 | Extend the list | 41B.1C |
| N23 | The pregnancy week is computed from today for every status, so it keeps advancing after a pregnancy has ended | P2 | An ended episode's week stops at `ended_at`. Date mathematics: audit first | PX-B review, 41B.1C |
| N24 | The TTC positive-test handover writes nothing and leaves no link to the TTC journey; a stale positive test can raise the handover again in a later cycle | P3 | Recorded for the TTC-to-pregnancy transition design | PX-B, Phase 43 |

Eight findings become eight plus twenty-four.

---

## 21. Interface requirements discovered by the architecture

Not built in 41B.0-R. Assigned to PX-B, designed by Claude before 41B.1C so each is built once, then implemented by Claude Code in the repository.

| Requirement | Why the architecture needs it |
|---|---|
| Expected count at pregnancy setup | `expected_count`; plural-aware copy |
| "What happened to the earlier pregnancy?" | Only when an open episode exists and the person starts another |
| Pregnancy selector | Past chapters; never a silent choice |
| Child selector | More than one current child with no single primary |
| Confirm-or-hide for earlier notes | Section 7 |
| Current cohort and earlier children | Section 3; the word "archived" is not shown |
| Loss-aware presentation | Section 6; ended pregnancy as a readable chapter |
| Switch between pregnancy and First Year | N12 |
| Starting again after a loss or birth | N11 |
| Pending pregnancy found at sign-in | N4 |
| Removing a pregnancy | Decision 6: what is kept, what is hidden |
| Account settings for a First Year account | The page recognises only pregnancy and TTC today; a First Year parent is told they have no saved journey |
| Navigation after a loss | Header, account link and post-login routing follow lifecycle only and still lead to "My Week" |
| One rule for revealing kept memories | My Journey shows them directly after a birth; the kept week page hides them behind a reveal |

These map onto the PX-B journey concepts already requested: TTC home; My Week; First Year Today; historical pregnancy chapter; multiple-pregnancy selector; multiple-child selector; TTC to pregnancy; pregnancy to First Year; later pregnancy with existing children; loss-aware state. Journey logic and visual design are reviewed together.

---

## 22. Superseded passages in the 41B.0 documents

Mark each "SUPERSEDED BY 41B.0-R" and keep the original text.

| Document | Passage | Superseded by |
|---|---|---|
| Target model §2.1 | "At most one `active` episode per user" | One open episode (section 6) |
| Target model §2.2 | child link "nullable: legacy and direct adds" | Nullable by design, permanently (section 17) |
| Target model §2.4 | `active_pregnancy_episode_id` | `current_pregnancy_episode_id` |
| Target model §4 | pointer implied cleared on end | Pointer kept (section 6) |
| Target model §7 | constraints changed 5; client write paths 17; new constraints 26; functions 5; deterministic 3 / derivable 2 | 11; 74 in the rebuilt inventory; 37; 18; section 4 |
| Target model §8, §9 | "READY FOR 41B.1 IMPLEMENTATION" | Readiness suspended until the pending SQL is amended and rehearsed |
| Migration plan §2 | backfill 1 and derivable 1 as independent | Identity rule and state table (section 4) |
| Migration plan §5 | nine-step order; step 8 holds the reflections split | Section 18 |
| Migration plan §6 | "shown only with the current active episode" | Section 7 |
| Migration plan §7 | 17 write paths | `phase41b0r-write-path-inventory.md` |
| Context contract §1 | pointer "null otherwise" | Permitted outside lifecycle `pregnancy` |
| Context contract §2 | "pregnancy ends → none or ttc (clear pointer)"; "rejected until the person states what happened" | Sections 6 and 9 |
| Context contract §4 | "the only personal-context source" | Section 8 |
| RLS plan §2 | row 3; row 19; rows 20–21 in the tightening step | Sections 6, 12, 18 |
| RLS plan §3 | "Constraints changed / removed = 5" | Eleven (section 18) |
| RLS plan §4 | `save_pregnancy_journey` "reject over an active one"; `end_pregnancy_episode` "clear pointer" | Sections 9 and 6 |
| Test and rollback §2 | "delete backfilled episodes by a batch marker" | Section 5 |
| Test and rollback §3 | point-in-time backup; catalogue matches repository | Sections 11 and 14 |
| Test and rollback §4 | index `(user_id, status)`; `(pregnancy_episode_id)` | S3 |
| 41B.1A implementation doc | "No drift" | Section 12 |

---

## 23. Parked and separate tracks

- **IVF-SAVE-R — IVF timeline save release reconciliation.** Parked. The saved IVF timeline is two columns on `ttc_journeys`, written only by `saveIVFTimelineContext` and `clearIVFTimelineContext` behind a flag that is off. It has no link to a pregnancy episode and 41B adds none. Any IVF-to-pregnancy link is Phase 43 work. It resumes with an audit of the existing implementation, not a rebuild.
- **Local development safety.** Separate stabilisation task; documented with a proposed fix awaiting approval.
- **SG-1.** Lifecycle CHECK governance (section 15).

---

## 24. Decisions for the owner at this gate

The design above is complete without them, using the recommended option in each case.

1. Rename the pointer to `current_pregnancy_episode_id`. Recommended: yes.
2. `SELECT`-only access to episodes for signed-in clients in 41B.1A; `INSERT` and `UPDATE` behind a transition trigger from 41B.1C; never `DELETE`. Recommended: yes.
3. Keep the pointer on the journey after the move to First Year, as the kept-chapter reference. Recommended: yes.
4. The 60-day bound that separates a date correction from a new pregnancy on legacy calls. Recommended: yes; the number is a judgement.
5. Keep the column name `archived_at` with the meaning fixed in section 3. Recommended: yes.
6. What "Remove this journey" means for a pregnancy that has saved records. Recommended: a `removed` ended status that hides the chapter, keeps the records and states no outcome (section 6). The alternative is to offer only a status change or permanent deletion, which needs a deletion feature that does not exist yet. This one changes the pending SQL (S13), so it is needed before 41B.1A is amended.

---

## 25. Final report

| Field | Value |
|---|---|
| Historical 41B.0 closure preserved | YES |
| Architecture drift confirmed | YES |
| D1–D10 reconciled | 10 / 10 |
| S1–S8 reconciled | 8 / 8 |
| Additional drift discovered | 24 integrity risks (section 20), 5 further SQL amendments (S9–S13), functions 5 → 18, legacy constraints 5 → 11, write paths 17 → 74 |
| D11 recorded separately | YES |
| 24-table ownership model still valid | YES. The same 24 objects; one service-only audit table added. |
| Pregnancy episode model still valid | AMENDED |
| Child model still valid | AMENDED |
| Context model still valid | AMENDED |
| Backfill model still valid | AMENDED |
| Loss-aware behaviour protected | YES |
| Kept-chapter compatibility protected | YES |
| Archive semantics compatible with constraints | YES, after the two index replacements |
| Partner / co-parent future compatibility protected | YES |
| Children without pregnancy episode intentionally supported | YES |
| Recovery gate achievable | YES |
| Repository / live schema drift items | 10 |
| Pending 41B.1A SQL | NEEDS AMENDMENT |
| 41B.1A-C1 ready to plan | YES, once the SQL is amended |
| 41B.1B started | NO |
| Database changes | 0 |
| Customer rows read | 0 |
| Product code changes | 0 |
| Deployment | NO |
| Canonical future implementation owner | CLAUDE CODE |
| Lovable future implementation dependency | None as builder. Three unavoidable operational dependencies remain: hosting and publishing of the built site; the managed production database, which can be migrated only through the platform; and backup and restore, which only the platform can perform. |
| Connected creative tools verified | 21st.dev: callable; free tier, two code retrievals a day, hosted generation off. Higgsfield: callable; free plan, 10 credits; Nano Banana, Nano Banana Pro, Nano Banana 2 and Seedance 2.5 listed. Taste: available as the design-taste-frontend skill. Browser tooling: working. No tool was used to generate anything in this phase. |

Not yet done: the five 41B.0 documents and `roadmap.md` are unchanged in the repository. This session can read the repository but has no write path to it. The superseding text is in section 22 and the roadmap entry is drafted separately.

## 26. Decision

**A. 41B.0-R CLOSED PASS / READY TO AMEND 41B.1A**

Subject to owner review of section 24, where decision 6 must be settled before the SQL is amended, and to the documents being committed once repository write access exists.

No implementation has begun. The pending SQL has not been amended. No rehearsal database has been created.

---

## 27. Recovery addendum (3 October 2026) — owner decisions recorded after this document

Provenance. Sections above are the original 41B.0-R text, authored on 2 October 2026 in a Claude session that had read access to the repository but no write path to it. The files were staged in that session's handover folder and never committed. On 3 October 2026 the text was restored into this repository by replaying the session's recorded Write and Edit operations in order; the restored content is byte-identical to the final staged version. Nothing above this addendum has been rewritten.

Owner decisions on section 24, as recorded in the 41B.1A amendment brief of 3 October 2026. Where a decision differs from the recommendation above, the recommendation is SUPERSEDED and the original text is kept for history.

| § 24 item | Owner decision | Effect on this document |
|---|---|---|
| 1 Pointer name | APPROVED AS RECOMMENDED: `current_pregnancy_episode_id`. The pointer represents the Pregnancy chapter currently presented; it is not equivalent to medical or journey "active" status. | Sections 6, 12 (S9) and 18 stand. |
| 2 Episode access in 41B.1A | APPROVED AS RECOMMENDED: authenticated clients receive `SELECT` only; no direct `INSERT`, `UPDATE` or `DELETE`. New write paths arrive only through controlled 41B.1C transitions. | Section 12 (S4) and section 18 stand. |
| 3 Pointer after Pregnancy → First Year | APPROVED AS RECOMMENDED: `current_pregnancy_episode_id` is kept for kept-chapter and current-context compatibility. The durable historical relationship is `babies.pregnancy_episode_id`. When a later pregnancy begins the pointer may move; earlier pregnancies remain reachable through durable history and entity links. | Section 6 stands. |
| 4 Sixty-day bound | **SUPERSEDED.** No automatic threshold may decide "date correction" versus "new pregnancy". Rules: same dates on the open episode → idempotent success; explicit "update my dates" → update the existing open episode after validation; explicit "start a new pregnancy" → the new-pregnancy transition flow; a legacy or background save with different dates → `needs_confirmation`. A date delta may support diagnostics or interface explanation only and must never establish entity ownership. Governing rule: no personal context is safer than wrong personal context. | Supersedes the row "Legacy call with different dates over an open episode" in section 9 and item 4 of section 24. The `needs_confirmation` result code already defined in section 9 is the required outcome for that case. |
| 5 `archived_at` | APPROVED AS RECOMMENDED: `babies.archived_at` is kept, meaning the child has left the current First Year cohort. It does not mean a deleted child. "Archived child" is never user-facing language. | Section 3 stands. |
| 6 "Remove this journey" | **OWNER RESOLUTION REPLACING CONDITIONAL S13.** Product semantics approved: removal stops the pregnancy being open; removes it from normal current-journey presentation; preserves its records; preserves export and account ownership; prevents those records leaking into another pregnancy; states no pregnancy outcome; preserves account deletion behaviour. It is not permanent deletion. The representation must be EPISODE-LOCAL and must NOT automatically widen the shared legacy `pregnancy_journey_status` enum. | Section 6 and S13 above recommend "an extra ended status on episodes only, `removed`". Because the pending SQL declares `pregnancy_episodes.status` with the shared enum, adding `removed` to that enum would widen it, which this decision excludes. The concrete episode-local representation is therefore still to be confirmed and returned at the 41B.1A amendment gate before any SQL is edited; this addendum records the decision and does not choose the column or value. |

Later repository facts that affect this document's status rows, recorded without rewriting them:

- N16 and the separate stabilisation track (`stabilisation-local-dev-production-safety.md`): the fix landed on `main` as commit `b487c7aa` (LOCAL-0, "prevent silent production backend fallback") before this restoration. See the recovery addendum in that document.
- The repository state reviewed above was commit `9593d13`. This restoration was made on branch `feat/41b1a-family-entity-foundation` from `main` at `4f280362`. The pending 41B.1A SQL is unchanged by this restoration and still NEEDS AMENDMENT.

---

## 28. Final S13 resolution (owner, 3 October 2026) — "Remove this journey"

Owner resolution received after section 27. It replaces conditional S13 and the `removed` status recommendation in section 6. The original text above is kept for history.

**Representation.** An episode-local nullable timestamp: `pregnancy_episodes.removed_at timestamptz NULL`. Not any of: a new `removed` value in `pregnancy_journey_status`; any widening of the shared legacy enum; `pregnancy_loss`; `no_longer_pregnant`; `given_birth`; permanent deletion of the episode; deletion of its dependent records.

**Meaning.** The person explicitly removed this Pregnancy chapter from normal and current journey presentation while the retained episode and its owned records continue to exist. It is not a medical outcome. It is not permanent deletion.

**Open-pregnancy semantics.** OPEN PREGNANCY = `status IN ('active', 'paused') AND removed_at IS NULL`. The one-open uniqueness rule excludes rows where `removed_at IS NOT NULL`; a removed episode never blocks a later pregnancy. Any query that decides whether a pregnancy is open or current must consider `removed_at`.

**Outcome semantics.** Removal states no outcome. A removed open pregnancy keeps `outcome_date = NULL`. Its status is not rewritten into an ended or outcome status merely to make it non-open. The `removed_at` dimension is intentionally orthogonal to the status dimension.

**41B.1A.** The foundation file adds `removed_at`, uses the open-pregnancy predicate in `pregnancy_episodes_one_open_per_user_idx`, and reflects the column in the validate, rollback and static-test artefacts. No removal write path is implemented in 41B.1A.

**Required 41B.1C transition behaviour (recorded, not implemented).** When "Remove this journey" is explicitly confirmed, one server function in one transaction must:

1. require ownership of the pointed Pregnancy episode;
2. permit removal only for an appropriate open, no-outcome episode unless a later approved design explicitly expands the feature;
3. set `pregnancy_episodes.removed_at` to the server or database timestamp;
4. if `journeys.current_pregnancy_episode_id` points to that episode, clear that current pointer as part of the controlled transaction;
5. retain the pregnancy episode;
6. retain all Pregnancy-owned records;
7. retain export and account ownership;
8. leave `outcome_date` null;
9. prevent the removed episode from being returned as the person's open or current Pregnancy;
10. prevent its records from ever being inherited by another Pregnancy.

The transition returns an explicit result code. It replaces the `delete_active_journey('pregnancy')` branch described in J4 of the write-path inventory.

**Visibility and history.** `removed_at IS NOT NULL` means hidden from normal and current journey presentation. It does not mean hard deleted. Removed chapters are not automatically exposed in normal history UI. Future export and account-control behaviour may still include retained records as the approved product and privacy design requires.

**Account deletion.** A removed pregnancy remains owned by the account and is removed when the approved whole-account deletion workflow runs. The account-deletion implementation is not changed in 41B.1A; runtime compatibility stays a rehearsal and release-gate test.

Superseded by this section: section 6 paragraph "Remove this journey" (the `removed` status recommendation); section 12 row S13; section 13 "status list and the ended-state CHECK accept `removed`"; section 24 item 6's recommended option. Decision 6's product semantics in section 27 stand.

---

## 29. Pre-rehearsal hardening note (3 October 2026) — account deletion under RESTRICT

Added after the pre-push review of the amended 41B.1A files. Section 19's sentence "Static analysis says whole-account deletion should succeed, because every dependant also cascades from the account and Postgres runs the restrict checks after the first round of cascades" is withdrawn as overstated; the original text is kept above.

Corrected statement: RESTRICT checks queued by the nested cascade `DELETE` on `pregnancy_episodes` fire at the end of that nested statement. Whether a bound dependant still exists then depends on the alphabetical firing order of the RI triggers on `auth.users`, whose names embed OIDs. OIDs differ between a rehearsal project and production, so the order observed at 41B.1A-C1 does not transfer. Rehearsal remains required and remains insufficient on its own.

Consequences, recorded without changing any file in this phase:

- 41B.1A is unaffected: nothing is bound and no pointer is populated, so RESTRICT has nothing to act on.
- **Mandatory pre-41B.1B gate (owner decision or evidence):** one of (1) a structure-only read of production `pg_trigger` order on `auth.users` (0 customer rows) proving the episode cascade fires after every dependant cascade; (2) an owner-approved design change such as `NO ACTION DEFERRABLE INITIALLY DEFERRED` on the 13 ownership links; (3) explicit deletion ordering in the `delete-account` function. None is chosen here; none is authorised by this note.
- Rehearsal execution contract, restated: each SQL file runs as exactly one transaction under a runner that wraps the file (Supabase CLI migration runner, or `psql -1 -v ON_ERROR_STOP=1 -f`); statement-by-statement GUI execution is forbidden; the rollback runs as the table owner, because an RLS-constrained role could see zero rows and defeat its guards.
