# 41B.1A-C1 — 11a Post-forward catalogue versus C1.1 baseline (Project 1)

Compared: `11-c1-5-post-forward-catalogue.md` (Project 1 after the C1.4 forward application, captured 2026-10-05T19:28:31Z) against `02-baseline-catalogue.md` (Project 1 after the 47-migration replay, 2026-10-03T23:38Z). Set difference per section on identical line formats; no normalisation was needed because both files were produced by the same queries on the same server. Machine diff: `11a-c1-5-catalogue-diff.json`.

## Result by section

| Section | Baseline | Post-forward | Removed | Added | Verdict |
|---|---|---|---|---|---|
| columns | 289 | 315 | 0 | 26 | only 41B.1A additions |
| enums | 5 | 5 | 0 | 0 | identical |
| functions | 25 | 25 | 0 | 0 | identical |
| triggers | 35 | 36 | 0 | 1 | only 41B.1A additions |
| rls | 34 | 35 | 0 | 1 | only 41B.1A additions |
| policies | 114 | 118 | 0 | 4 | only 41B.1A additions |
| constraints | 141 | 161 | 0 | 20 | only 41B.1A additions |
| indexes | 86 | 104 | 0 | 18 | only 41B.1A additions |
| grants | 34 | 35 | 0 | 1 | only 41B.1A additions |

Every baseline line is present unchanged in the post-forward capture: YES. Lines classified UNEXPECTED: 0.

## Added lines by class

| Class | Expected | Found |
|---|---|---|
| `pregnancy_episodes` columns | 13 | 13 |
| ownership link columns (`journeys.current_pregnancy_episode_id` + 12 `pregnancy_episode_id`) | 13 | 13 |
| `pregnancy_episodes` constraints | 6 | 6 |
| composite RESTRICT ownership FKs, all `NOT VALID` | 13 | 13 |
| `babies_id_user_id_key` constraint | 1 | 1 |
| `pregnancy_episodes` indexes | 4 | 4 |
| ownership link indexes | 13 | 13 |
| `babies_id_user_id_key` index | 1 | 1 |
| triggers (`pregnancy_episodes_set_updated_at`) | 1 | 1 |
| RLS rows (`pregnancy_episodes|true`) | 1 | 1 |
| policies (`pregnancy_episodes_*_own`) | 4 | 4 |
| grant rows (`pregnancy_episodes` ACL) | 1 | 1 |
| enum changes (added + removed) | 0 | 0 |
| function changes (added + removed) | 0 | 0 |

## Every added line

### columns

| Line | Class |
|---|---|
| `babies\|pregnancy_episode_id\|uuid\|uuid\|YES\|` | EXPECTED 41B.1A: ownership link column |
| `baby_movement_notes\|pregnancy_episode_id\|uuid\|uuid\|YES\|` | EXPECTED 41B.1A: ownership link column |
| `birth_plans\|pregnancy_episode_id\|uuid\|uuid\|YES\|` | EXPECTED 41B.1A: ownership link column |
| `contraction_events\|pregnancy_episode_id\|uuid\|uuid\|YES\|` | EXPECTED 41B.1A: ownership link column |
| `contraction_sessions\|pregnancy_episode_id\|uuid\|uuid\|YES\|` | EXPECTED 41B.1A: ownership link column |
| `hospital_bag_items\|pregnancy_episode_id\|uuid\|uuid\|YES\|` | EXPECTED 41B.1A: ownership link column |
| `journeys\|current_pregnancy_episode_id\|uuid\|uuid\|YES\|` | EXPECTED 41B.1A: ownership link column |
| `midwife_questions\|pregnancy_episode_id\|uuid\|uuid\|YES\|` | EXPECTED 41B.1A: ownership link column |
| `pregnancy_appointments\|pregnancy_episode_id\|uuid\|uuid\|YES\|` | EXPECTED 41B.1A: ownership link column |
| `pregnancy_episodes\|created_at\|timestamp with time zone\|timestamptz\|NO\|now()` | EXPECTED 41B.1A: pregnancy_episodes columns |
| `pregnancy_episodes\|due_date\|date\|date\|NO\|` | EXPECTED 41B.1A: pregnancy_episodes columns |
| `pregnancy_episodes\|ended_at\|timestamp with time zone\|timestamptz\|YES\|` | EXPECTED 41B.1A: pregnancy_episodes columns |
| `pregnancy_episodes\|expected_count\|smallint\|int2\|YES\|` | EXPECTED 41B.1A: pregnancy_episodes columns |
| `pregnancy_episodes\|id\|uuid\|uuid\|NO\|gen_random_uuid()` | EXPECTED 41B.1A: pregnancy_episodes columns |
| `pregnancy_episodes\|lmp_date\|date\|date\|NO\|` | EXPECTED 41B.1A: pregnancy_episodes columns |
| `pregnancy_episodes\|outcome_date\|date\|date\|YES\|` | EXPECTED 41B.1A: pregnancy_episodes columns |
| `pregnancy_episodes\|removed_at\|timestamp with time zone\|timestamptz\|YES\|` | EXPECTED 41B.1A: pregnancy_episodes columns |
| `pregnancy_episodes\|started_at\|timestamp with time zone\|timestamptz\|NO\|now()` | EXPECTED 41B.1A: pregnancy_episodes columns |
| `pregnancy_episodes\|status_changed_at\|timestamp with time zone\|timestamptz\|YES\|` | EXPECTED 41B.1A: pregnancy_episodes columns |
| `pregnancy_episodes\|status\|USER-DEFINED\|pregnancy_journey_status\|NO\|'active'::pregnancy_journey_status` | EXPECTED 41B.1A: pregnancy_episodes columns |
| `pregnancy_episodes\|updated_at\|timestamp with time zone\|timestamptz\|NO\|now()` | EXPECTED 41B.1A: pregnancy_episodes columns |
| `pregnancy_episodes\|user_id\|uuid\|uuid\|NO\|` | EXPECTED 41B.1A: pregnancy_episodes columns |
| `pregnancy_symptom_notes\|pregnancy_episode_id\|uuid\|uuid\|YES\|` | EXPECTED 41B.1A: ownership link column |
| `reflections\|pregnancy_episode_id\|uuid\|uuid\|YES\|` | EXPECTED 41B.1A: ownership link column |
| `week_media_memories\|pregnancy_episode_id\|uuid\|uuid\|YES\|` | EXPECTED 41B.1A: ownership link column |
| `week_photos\|pregnancy_episode_id\|uuid\|uuid\|YES\|` | EXPECTED 41B.1A: ownership link column |

### triggers

| Line | Class |
|---|---|
| `pregnancy_episodes\|pregnancy_episodes_set_updated_at\|168ef023745594e33f8756c2d93cb2b8` | EXPECTED 41B.1A: pregnancy_episodes triggers |

### rls

| Line | Class |
|---|---|
| `pregnancy_episodes\|true` | EXPECTED 41B.1A: pregnancy_episodes rls |

### policies

| Line | Class |
|---|---|
| `pregnancy_episodes\|pregnancy_episodes_delete_own\|DELETE\|{authenticated}\|PERMISSIVE\|(auth.uid() = user_id)\|` | EXPECTED 41B.1A: pregnancy_episodes policies |
| `pregnancy_episodes\|pregnancy_episodes_insert_own\|INSERT\|{authenticated}\|PERMISSIVE\|\|(auth.uid() = user_id)` | EXPECTED 41B.1A: pregnancy_episodes policies |
| `pregnancy_episodes\|pregnancy_episodes_select_own\|SELECT\|{authenticated}\|PERMISSIVE\|(auth.uid() = user_id)\|` | EXPECTED 41B.1A: pregnancy_episodes policies |
| `pregnancy_episodes\|pregnancy_episodes_update_own\|UPDATE\|{authenticated}\|PERMISSIVE\|(auth.uid() = user_id)\|(auth.uid() = user_id)` | EXPECTED 41B.1A: pregnancy_episodes policies |

### constraints

| Line | Class |
|---|---|
| `babies\|babies_id_user_id_key\|UNIQUE (id, user_id)` | EXPECTED 41B.1A: babies composite key |
| `babies\|babies_pregnancy_episode_owner_fkey\|FOREIGN KEY (pregnancy_episode_id, user_id) REFERENCES pregnancy_episodes(id, user_id) ON DELETE RESTRICT NOT VALID` | EXPECTED 41B.1A: composite RESTRICT ownership FK (NOT VALID) |
| `baby_movement_notes\|baby_movement_notes_pregnancy_episode_owner_fkey\|FOREIGN KEY (pregnancy_episode_id, user_id) REFERENCES pregnancy_episodes(id, user_id) ON DELETE RESTRICT NOT VALID` | EXPECTED 41B.1A: composite RESTRICT ownership FK (NOT VALID) |
| `birth_plans\|birth_plans_pregnancy_episode_owner_fkey\|FOREIGN KEY (pregnancy_episode_id, user_id) REFERENCES pregnancy_episodes(id, user_id) ON DELETE RESTRICT NOT VALID` | EXPECTED 41B.1A: composite RESTRICT ownership FK (NOT VALID) |
| `contraction_events\|contraction_events_pregnancy_episode_owner_fkey\|FOREIGN KEY (pregnancy_episode_id, user_id) REFERENCES pregnancy_episodes(id, user_id) ON DELETE RESTRICT NOT VALID` | EXPECTED 41B.1A: composite RESTRICT ownership FK (NOT VALID) |
| `contraction_sessions\|contraction_sessions_pregnancy_episode_owner_fkey\|FOREIGN KEY (pregnancy_episode_id, user_id) REFERENCES pregnancy_episodes(id, user_id) ON DELETE RESTRICT NOT VALID` | EXPECTED 41B.1A: composite RESTRICT ownership FK (NOT VALID) |
| `hospital_bag_items\|hospital_bag_items_pregnancy_episode_owner_fkey\|FOREIGN KEY (pregnancy_episode_id, user_id) REFERENCES pregnancy_episodes(id, user_id) ON DELETE RESTRICT NOT VALID` | EXPECTED 41B.1A: composite RESTRICT ownership FK (NOT VALID) |
| `journeys\|journeys_current_pregnancy_episode_owner_fkey\|FOREIGN KEY (current_pregnancy_episode_id, user_id) REFERENCES pregnancy_episodes(id, user_id) ON DELETE RESTRICT NOT VALID` | EXPECTED 41B.1A: composite RESTRICT ownership FK (NOT VALID) |
| `midwife_questions\|midwife_questions_pregnancy_episode_owner_fkey\|FOREIGN KEY (pregnancy_episode_id, user_id) REFERENCES pregnancy_episodes(id, user_id) ON DELETE RESTRICT NOT VALID` | EXPECTED 41B.1A: composite RESTRICT ownership FK (NOT VALID) |
| `pregnancy_appointments\|pregnancy_appointments_pregnancy_episode_owner_fkey\|FOREIGN KEY (pregnancy_episode_id, user_id) REFERENCES pregnancy_episodes(id, user_id) ON DELETE RESTRICT NOT VALID` | EXPECTED 41B.1A: composite RESTRICT ownership FK (NOT VALID) |
| `pregnancy_episodes\|pregnancy_episodes_dates_check\|CHECK (((due_date > lmp_date) AND (due_date <= (lmp_date + 300))))` | EXPECTED 41B.1A: pregnancy_episodes constraints |
| `pregnancy_episodes\|pregnancy_episodes_ended_at_status_check\|CHECK (((status = ANY (ARRAY['active'::pregnancy_journey_status, 'paused'::pregnancy_journey_status])) = (ended_at IS NULL)))` | EXPECTED 41B.1A: pregnancy_episodes constraints |
| `pregnancy_episodes\|pregnancy_episodes_expected_count_check\|CHECK (((expected_count IS NULL) OR ((expected_count >= 1) AND (expected_count <= 4))))` | EXPECTED 41B.1A: pregnancy_episodes constraints |
| `pregnancy_episodes\|pregnancy_episodes_id_user_id_key\|UNIQUE (id, user_id)` | EXPECTED 41B.1A: pregnancy_episodes constraints |
| `pregnancy_episodes\|pregnancy_episodes_pkey\|PRIMARY KEY (id)` | EXPECTED 41B.1A: pregnancy_episodes constraints |
| `pregnancy_episodes\|pregnancy_episodes_user_id_fkey\|FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE` | EXPECTED 41B.1A: pregnancy_episodes constraints |
| `pregnancy_symptom_notes\|pregnancy_symptom_notes_pregnancy_episode_owner_fkey\|FOREIGN KEY (pregnancy_episode_id, user_id) REFERENCES pregnancy_episodes(id, user_id) ON DELETE RESTRICT NOT VALID` | EXPECTED 41B.1A: composite RESTRICT ownership FK (NOT VALID) |
| `reflections\|reflections_pregnancy_episode_owner_fkey\|FOREIGN KEY (pregnancy_episode_id, user_id) REFERENCES pregnancy_episodes(id, user_id) ON DELETE RESTRICT NOT VALID` | EXPECTED 41B.1A: composite RESTRICT ownership FK (NOT VALID) |
| `week_media_memories\|week_media_memories_pregnancy_episode_owner_fkey\|FOREIGN KEY (pregnancy_episode_id, user_id) REFERENCES pregnancy_episodes(id, user_id) ON DELETE RESTRICT NOT VALID` | EXPECTED 41B.1A: composite RESTRICT ownership FK (NOT VALID) |
| `week_photos\|week_photos_pregnancy_episode_owner_fkey\|FOREIGN KEY (pregnancy_episode_id, user_id) REFERENCES pregnancy_episodes(id, user_id) ON DELETE RESTRICT NOT VALID` | EXPECTED 41B.1A: composite RESTRICT ownership FK (NOT VALID) |

### indexes

| Line | Class |
|---|---|
| `babies\|babies_id_user_id_key\|CREATE UNIQUE INDEX babies_id_user_id_key ON public.babies USING btree (id, user_id)` | EXPECTED 41B.1A: babies composite key index |
| `babies\|babies_pregnancy_episode_idx\|CREATE INDEX babies_pregnancy_episode_idx ON public.babies USING btree (pregnancy_episode_id, user_id)` | EXPECTED 41B.1A: ownership link index |
| `baby_movement_notes\|baby_movement_notes_pregnancy_episode_idx\|CREATE INDEX baby_movement_notes_pregnancy_episode_idx ON public.baby_movement_notes USING btree (pregnancy_episode_id, user_id)` | EXPECTED 41B.1A: ownership link index |
| `birth_plans\|birth_plans_pregnancy_episode_idx\|CREATE INDEX birth_plans_pregnancy_episode_idx ON public.birth_plans USING btree (pregnancy_episode_id, user_id)` | EXPECTED 41B.1A: ownership link index |
| `contraction_events\|contraction_events_pregnancy_episode_idx\|CREATE INDEX contraction_events_pregnancy_episode_idx ON public.contraction_events USING btree (pregnancy_episode_id, user_id)` | EXPECTED 41B.1A: ownership link index |
| `contraction_sessions\|contraction_sessions_pregnancy_episode_idx\|CREATE INDEX contraction_sessions_pregnancy_episode_idx ON public.contraction_sessions USING btree (pregnancy_episode_id, user_id)` | EXPECTED 41B.1A: ownership link index |
| `hospital_bag_items\|hospital_bag_items_pregnancy_episode_idx\|CREATE INDEX hospital_bag_items_pregnancy_episode_idx ON public.hospital_bag_items USING btree (pregnancy_episode_id, user_id)` | EXPECTED 41B.1A: ownership link index |
| `journeys\|journeys_current_pregnancy_episode_idx\|CREATE INDEX journeys_current_pregnancy_episode_idx ON public.journeys USING btree (current_pregnancy_episode_id, user_id)` | EXPECTED 41B.1A: ownership link index |
| `midwife_questions\|midwife_questions_pregnancy_episode_idx\|CREATE INDEX midwife_questions_pregnancy_episode_idx ON public.midwife_questions USING btree (pregnancy_episode_id, user_id)` | EXPECTED 41B.1A: ownership link index |
| `pregnancy_appointments\|pregnancy_appointments_pregnancy_episode_idx\|CREATE INDEX pregnancy_appointments_pregnancy_episode_idx ON public.pregnancy_appointments USING btree (pregnancy_episode_id, user_id)` | EXPECTED 41B.1A: ownership link index |
| `pregnancy_episodes\|pregnancy_episodes_id_user_id_key\|CREATE UNIQUE INDEX pregnancy_episodes_id_user_id_key ON public.pregnancy_episodes USING btree (id, user_id)` | EXPECTED 41B.1A: pregnancy_episodes indexes |
| `pregnancy_episodes\|pregnancy_episodes_one_open_per_user_idx\|CREATE UNIQUE INDEX pregnancy_episodes_one_open_per_user_idx ON public.pregnancy_episodes USING btree (user_id) WHERE ((status = ANY (ARRAY['active'::pregnancy_journey_status, 'paused'::pregnancy_journey_status])) AND (removed_at IS NULL))` | EXPECTED 41B.1A: pregnancy_episodes indexes |
| `pregnancy_episodes\|pregnancy_episodes_pkey\|CREATE UNIQUE INDEX pregnancy_episodes_pkey ON public.pregnancy_episodes USING btree (id)` | EXPECTED 41B.1A: pregnancy_episodes indexes |
| `pregnancy_episodes\|pregnancy_episodes_user_id_idx\|CREATE INDEX pregnancy_episodes_user_id_idx ON public.pregnancy_episodes USING btree (user_id)` | EXPECTED 41B.1A: pregnancy_episodes indexes |
| `pregnancy_symptom_notes\|pregnancy_symptom_notes_pregnancy_episode_idx\|CREATE INDEX pregnancy_symptom_notes_pregnancy_episode_idx ON public.pregnancy_symptom_notes USING btree (pregnancy_episode_id, user_id)` | EXPECTED 41B.1A: ownership link index |
| `reflections\|reflections_pregnancy_episode_idx\|CREATE INDEX reflections_pregnancy_episode_idx ON public.reflections USING btree (pregnancy_episode_id, user_id)` | EXPECTED 41B.1A: ownership link index |
| `week_media_memories\|week_media_memories_pregnancy_episode_idx\|CREATE INDEX week_media_memories_pregnancy_episode_idx ON public.week_media_memories USING btree (pregnancy_episode_id, user_id)` | EXPECTED 41B.1A: ownership link index |
| `week_photos\|week_photos_pregnancy_episode_idx\|CREATE INDEX week_photos_pregnancy_episode_idx ON public.week_photos USING btree (pregnancy_episode_id, user_id)` | EXPECTED 41B.1A: ownership link index |

### grants

| Line | Class |
|---|---|
| `pregnancy_episodes\|{postgres=arwdDxtm/postgres,service_role=arwdDxtm/postgres,authenticated=r/postgres}` | EXPECTED 41B.1A: pregnancy_episodes grants |

## Removed lines

None.

## G-11 legacy constraints and indexes (plan section C), definition unchanged

| Name | Kind | Unchanged | Post-forward line |
|---|---|---|---|
| `reflections_user_id_week_key` | constraint | YES | `reflections\|reflections_user_id_week_key\|UNIQUE (user_id, week)` |
| `week_photos_user_id_week_key` | constraint | YES | `week_photos\|week_photos_user_id_week_key\|UNIQUE (user_id, week)` |
| `week_media_memories_user_id_week_media_type_key` | constraint | YES | `week_media_memories\|week_media_memories_user_id_week_media_type_key\|UNIQUE (user_id, week, media_type)` |
| `birth_plans_user_id_key` | constraint | YES | `birth_plans\|birth_plans_user_id_key\|UNIQUE (user_id)` |
| `hospital_bag_items_user_id_category_item_key_key` | constraint | YES | `hospital_bag_items\|hospital_bag_items_user_id_category_item_key_key\|UNIQUE (user_id, category, item_key)` |
| `first_year_entries_baby_id_fkey` | constraint | YES | `first_year_entries\|first_year_entries_baby_id_fkey\|FOREIGN KEY (baby_id) REFERENCES babies(id) ON DELETE CASCADE` |
| `first_year_care_events_baby_id_fkey` | constraint | YES | `first_year_care_events\|first_year_care_events_baby_id_fkey\|FOREIGN KEY (baby_id) REFERENCES babies(id) ON DELETE CASCADE` |
| `first_year_memories_baby_id_fkey` | constraint | YES | `first_year_memories\|first_year_memories_baby_id_fkey\|FOREIGN KEY (baby_id) REFERENCES babies(id) ON DELETE SET NULL` |
| `first_year_reminders_baby_id_fkey` | constraint | YES | `first_year_reminders\|first_year_reminders_baby_id_fkey\|FOREIGN KEY (baby_id) REFERENCES babies(id) ON DELETE CASCADE` |
| `contraction_sessions_id_user_id_key` | constraint | YES | `contraction_sessions\|contraction_sessions_id_user_id_key\|UNIQUE (id, user_id)` |
| `babies_user_birth_order_idx` | index | YES | `babies\|babies_user_birth_order_idx\|CREATE UNIQUE INDEX babies_user_birth_order_idx ON public.babies USING btree (user_id, birth_order)` |
| `babies_one_primary_per_user_idx` | index | YES | `babies\|babies_one_primary_per_user_idx\|CREATE UNIQUE INDEX babies_one_primary_per_user_idx ON public.babies USING btree (user_id) WHERE is_primary` |

## Pre-existing, allowed, unchanged

`c1_rehearsal_marker` (rehearsal identity artefact) and the known repo/live drift objects (`email_delivery_claims`, `rate_limited`, the three delivery functions, the redefined email-queue functions, 41B.0-R §14) are present in both captures with identical lines, so they do not appear in the diff. No `c1_scratch%` object exists.

## Verdict

The post-forward catalogue equals the C1.1 baseline plus exactly the 41B.1A foundation objects: nothing missing, nothing extra, nothing altered.
