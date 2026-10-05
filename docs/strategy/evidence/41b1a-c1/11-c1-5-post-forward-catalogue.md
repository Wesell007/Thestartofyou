# 41B.1A-C1 — 11 Post-forward catalogue (Project 1, after the frozen 41B.1A forward file)

Captured 2026-10-05T19:28:31Z (UTC) from `tsoy-41b1a-c1-run1` (`wwtcnbjhttjtklpxhrkd`), PostgreSQL 17.11, after the C1.4 forward application and before the validate file. Public schema, catalogue metadata only, no rows read. Same nine sections, queries, ordering and line formats as `02-baseline-catalogue.md` (and `docs/strategy/phase41b1a-live-catalogue-snapshot.md`) so the files diff directly. Captured read-only with psql 17.11 through the C1 wrapper (`08b-c1_psql-wrapper.sh`, direct endpoint, role `postgres`, `-1 -v ON_ERROR_STOP=1`); the integration channel returned identical counts and section hashes three minutes earlier (19:25:55Z).

Format notes: as in the baseline, policy roles print `{}` for the public pseudo-role, function security prints `true/false`, policy expressions are whitespace-normalised, and the functions section hashes bodies with `md5(prosrc)` exactly as `02-baseline-catalogue.md` does (its 25 lines are identical to the baseline's; the integration channel's `md5(prosrc)` section hash is `25|c4a01c43648862bc267784f572393037` for both). The functions row of the table below uses `md5(pg_get_functiondef(oid))`, the method of `02c-functions-functiondef-md5.txt` and of every earlier section-hash record (`99`, `07`, `08a`, `09e`); all 25 functiondef hashes equal `02c` line for line. Section hashes (count|md5 of the sorted lines, security as `t/f`):

| Section | Baseline (C1.1) | Post-forward (C1.5) |
|---|---|---|
| columns | `289|089827c5211d2e8e0e34e57aa854eb49` | `315|f0281fd66e61ca80ee8dfdff9dd9076f` |
| enums | `5|e01eb2548fddcc41e7f642a4337f3019` | `5|e01eb2548fddcc41e7f642a4337f3019` |
| functions | `25|920ec2f6ef04bb28c0544cba706e2f6c` | `25|920ec2f6ef04bb28c0544cba706e2f6c` |
| triggers | `35|c76db9052a48890ef16e7106f8627abf` | `36|a4b05c5abb99287b808c5b7725fd507b` |
| rls | `34|5c82068f66de6c08d25a0647333b2c19` | `35|a02d18c7827236a4a0b239e641b0fc3e` |
| policies | `114|e87cd9928f64cef637fe1798ea939fc9` | `118|c5a61c1cbd875a2278c27248f6035d3f` |
| constraints | `141|ece1b4e90c32a1bf1b61202f95bf4b30` | `161|9c67159cf4c5092259d395a0892b8d30` |
| indexes | `86|b844916ed32fa546ebdc04f7f427957a` | `104|001b4ec0c45d85d8ed48ff0bc2153a64` |
| grants | `34|22bb3e64a7ac85dc6565d9047b457d2a` | `35|0a9026c0907ba7d6718455b992d6f911` |

## columns (315)
```text
ai_rate_limits|rate_key|text|text|NO|
ai_rate_limits|request_count|integer|int4|NO|0
ai_rate_limits|updated_at|timestamp with time zone|timestamptz|NO|now()
ai_rate_limits|window_started_at|timestamp with time zone|timestamptz|NO|now()
archived_journeys|ended_at|timestamp with time zone|timestamptz|NO|now()
archived_journeys|ended_reason|text|text|NO|
archived_journeys|id|uuid|uuid|NO|gen_random_uuid()
archived_journeys|lifecycle|text|text|NO|
archived_journeys|snapshot|jsonb|jsonb|NO|
archived_journeys|started_at|timestamp with time zone|timestamptz|NO|
archived_journeys|user_id|uuid|uuid|NO|
babies|birth_order|smallint|int2|NO|1
babies|created_at|timestamp with time zone|timestamptz|NO|now()
babies|date_of_birth|date|date|NO|
babies|id|uuid|uuid|NO|gen_random_uuid()
babies|is_primary|boolean|bool|NO|true
babies|name|text|text|YES|
babies|pregnancy_episode_id|uuid|uuid|YES|
babies|updated_at|timestamp with time zone|timestamptz|NO|now()
babies|user_id|uuid|uuid|NO|
baby_movement_notes|created_at|timestamp with time zone|timestamptz|NO|now()
baby_movement_notes|id|uuid|uuid|NO|gen_random_uuid()
baby_movement_notes|noted_at|timestamp with time zone|timestamptz|NO|now()
baby_movement_notes|notes|text|text|YES|
baby_movement_notes|pattern_label|text|text|YES|
baby_movement_notes|pregnancy_episode_id|uuid|uuid|YES|
baby_movement_notes|updated_at|timestamp with time zone|timestamptz|NO|now()
baby_movement_notes|user_id|uuid|uuid|NO|
birth_plans|answers|jsonb|jsonb|NO|'{}'::jsonb
birth_plans|completion|integer|int4|NO|0
birth_plans|created_at|timestamp with time zone|timestamptz|NO|now()
birth_plans|id|uuid|uuid|NO|gen_random_uuid()
birth_plans|notes|text|text|YES|
birth_plans|pregnancy_episode_id|uuid|uuid|YES|
birth_plans|updated_at|timestamp with time zone|timestamptz|NO|now()
birth_plans|user_id|uuid|uuid|NO|
c1_rehearsal_marker|created_at|timestamp with time zone|timestamptz|NO|now()
c1_rehearsal_marker|project_ref|text|text|NO|
c1_rehearsal_marker|run_label|text|text|NO|
companion_conversations|archived_at|timestamp with time zone|timestamptz|YES|
companion_conversations|created_at|timestamp with time zone|timestamptz|NO|now()
companion_conversations|id|uuid|uuid|NO|gen_random_uuid()
companion_conversations|last_message_at|timestamp with time zone|timestamptz|NO|now()
companion_conversations|title|text|text|YES|
companion_conversations|updated_at|timestamp with time zone|timestamptz|NO|now()
companion_conversations|user_id|uuid|uuid|NO|auth.uid()
companion_memories|category|USER-DEFINED|companion_memory_category|NO|'other'::companion_memory_category
companion_memories|created_at|timestamp with time zone|timestamptz|NO|now()
companion_memories|id|uuid|uuid|NO|gen_random_uuid()
companion_memories|normalised_value|text|text|YES|
companion_memories|source|USER-DEFINED|companion_memory_source|NO|
companion_memories|updated_at|timestamp with time zone|timestamptz|NO|now()
companion_memories|user_id|uuid|uuid|NO|auth.uid()
companion_memories|value|text|text|NO|
companion_messages|client_message_id|text|text|YES|
companion_messages|content|text|text|NO|
companion_messages|conversation_id|uuid|uuid|NO|
companion_messages|created_at|timestamp with time zone|timestamptz|NO|now()
companion_messages|id|uuid|uuid|NO|gen_random_uuid()
companion_messages|role|text|text|NO|
companion_messages|updated_at|timestamp with time zone|timestamptz|NO|now()
companion_messages|user_id|uuid|uuid|NO|auth.uid()
contraction_events|created_at|timestamp with time zone|timestamptz|NO|now()
contraction_events|ended_at|timestamp with time zone|timestamptz|YES|
contraction_events|id|uuid|uuid|NO|gen_random_uuid()
contraction_events|pregnancy_episode_id|uuid|uuid|YES|
contraction_events|session_id|uuid|uuid|NO|
contraction_events|started_at|timestamp with time zone|timestamptz|NO|
contraction_events|updated_at|timestamp with time zone|timestamptz|NO|now()
contraction_events|user_id|uuid|uuid|NO|
contraction_sessions|created_at|timestamp with time zone|timestamptz|NO|now()
contraction_sessions|ended_at|timestamp with time zone|timestamptz|YES|
contraction_sessions|id|uuid|uuid|NO|gen_random_uuid()
contraction_sessions|notes|text|text|YES|
contraction_sessions|pregnancy_episode_id|uuid|uuid|YES|
contraction_sessions|started_at|timestamp with time zone|timestamptz|NO|now()
contraction_sessions|updated_at|timestamp with time zone|timestamptz|NO|now()
contraction_sessions|user_id|uuid|uuid|NO|
email_delivery_claims|claimed_at|timestamp with time zone|timestamptz|NO|now()
email_delivery_claims|completed_at|timestamp with time zone|timestamptz|YES|
email_delivery_claims|lease_until|timestamp with time zone|timestamptz|NO|
email_delivery_claims|message_id|text|text|NO|
email_delivery_claims|status|text|text|NO|
email_delivery_claims|updated_at|timestamp with time zone|timestamptz|NO|now()
email_send_log|created_at|timestamp with time zone|timestamptz|NO|now()
email_send_log|error_message|text|text|YES|
email_send_log|id|uuid|uuid|NO|gen_random_uuid()
email_send_log|message_id|text|text|YES|
email_send_log|metadata|jsonb|jsonb|YES|
email_send_log|recipient_email|text|text|NO|
email_send_log|status|text|text|NO|
email_send_log|template_name|text|text|NO|
email_send_state|auth_email_ttl_minutes|integer|int4|NO|15
email_send_state|batch_size|integer|int4|NO|10
email_send_state|id|integer|int4|NO|1
email_send_state|retry_after_until|timestamp with time zone|timestamptz|YES|
email_send_state|send_delay_ms|integer|int4|NO|200
email_send_state|transactional_email_ttl_minutes|integer|int4|NO|60
email_send_state|updated_at|timestamp with time zone|timestamptz|NO|now()
email_unsubscribe_tokens|created_at|timestamp with time zone|timestamptz|NO|now()
email_unsubscribe_tokens|email|text|text|NO|
email_unsubscribe_tokens|id|uuid|uuid|NO|gen_random_uuid()
email_unsubscribe_tokens|token|text|text|NO|
email_unsubscribe_tokens|used_at|timestamp with time zone|timestamptz|YES|
first_year_care_events|amount_ml|numeric|numeric|YES|
first_year_care_events|baby_id|uuid|uuid|NO|
first_year_care_events|created_at|timestamp with time zone|timestamptz|NO|now()
first_year_care_events|ended_at|timestamp with time zone|timestamptz|YES|
first_year_care_events|event_type|text|text|NO|
first_year_care_events|feed_method|text|text|YES|
first_year_care_events|id|uuid|uuid|NO|gen_random_uuid()
first_year_care_events|metadata|jsonb|jsonb|NO|'{}'::jsonb
first_year_care_events|nappy_type|text|text|YES|
first_year_care_events|note|text|text|YES|
first_year_care_events|occurred_at|timestamp with time zone|timestamptz|NO|
first_year_care_events|side|text|text|YES|
first_year_care_events|sleep_kind|text|text|YES|
first_year_care_events|started_at|timestamp with time zone|timestamptz|YES|
first_year_care_events|updated_at|timestamp with time zone|timestamptz|NO|now()
first_year_care_events|user_id|uuid|uuid|NO|
first_year_entries|answered|boolean|bool|NO|false
first_year_entries|baby_id|uuid|uuid|YES|
first_year_entries|created_at|timestamp with time zone|timestamptz|NO|now()
first_year_entries|entry_date|date|date|NO|
first_year_entries|id|uuid|uuid|NO|gen_random_uuid()
first_year_entries|kind|text|text|NO|
first_year_entries|lane|text|text|NO|
first_year_entries|note|text|text|YES|
first_year_entries|tags|ARRAY|_text|NO|'{}'::text[]
first_year_entries|updated_at|timestamp with time zone|timestamptz|NO|now()
first_year_entries|user_id|uuid|uuid|NO|
first_year_journeys|archived_pregnancy_journey_id|uuid|uuid|YES|
first_year_journeys|source_pregnancy_lmp_date|date|date|YES|
first_year_journeys|started_at|timestamp with time zone|timestamptz|NO|now()
first_year_journeys|status_changed_at|timestamp with time zone|timestamptz|YES|
first_year_journeys|status|USER-DEFINED|first_year_journey_status|NO|'active'::first_year_journey_status
first_year_journeys|updated_at|timestamp with time zone|timestamptz|NO|now()
first_year_journeys|user_id|uuid|uuid|NO|
first_year_memories|baby_id|uuid|uuid|YES|
first_year_memories|created_at|timestamp with time zone|timestamptz|NO|now()
first_year_memories|id|uuid|uuid|NO|gen_random_uuid()
first_year_memories|memory_date|date|date|NO|
first_year_memories|memory_scope|text|text|NO|'family'::text
first_year_memories|note|text|text|NO|
first_year_memories|photo_height|integer|int4|YES|
first_year_memories|photo_mime|text|text|YES|
first_year_memories|photo_path|text|text|YES|
first_year_memories|photo_size_bytes|bigint|int8|YES|
first_year_memories|photo_width|integer|int4|YES|
first_year_memories|source_entry_id|uuid|uuid|YES|
first_year_memories|title|text|text|YES|
first_year_memories|updated_at|timestamp with time zone|timestamptz|NO|now()
first_year_memories|user_id|uuid|uuid|NO|
first_year_reminders|baby_id|uuid|uuid|YES|
first_year_reminders|created_at|timestamp with time zone|timestamptz|NO|now()
first_year_reminders|due_at|timestamp with time zone|timestamptz|NO|
first_year_reminders|id|uuid|uuid|NO|gen_random_uuid()
first_year_reminders|label|text|text|YES|
first_year_reminders|reminder_type|text|text|NO|
first_year_reminders|status|text|text|NO|'active'::text
first_year_reminders|updated_at|timestamp with time zone|timestamptz|NO|now()
first_year_reminders|user_id|uuid|uuid|NO|
hospital_bag_items|category|text|text|NO|
hospital_bag_items|created_at|timestamp with time zone|timestamptz|NO|now()
hospital_bag_items|id|uuid|uuid|NO|gen_random_uuid()
hospital_bag_items|is_custom|boolean|bool|NO|false
hospital_bag_items|item_key|text|text|NO|
hospital_bag_items|label|text|text|NO|
hospital_bag_items|packed_at|timestamp with time zone|timestamptz|YES|
hospital_bag_items|pregnancy_episode_id|uuid|uuid|YES|
hospital_bag_items|sort_order|integer|int4|NO|0
hospital_bag_items|updated_at|timestamp with time zone|timestamptz|NO|now()
hospital_bag_items|user_id|uuid|uuid|NO|
journeys|current_pregnancy_episode_id|uuid|uuid|YES|
journeys|lifecycle|text|text|NO|
journeys|started_at|timestamp with time zone|timestamptz|NO|now()
journeys|updated_at|timestamp with time zone|timestamptz|NO|now()
journeys|user_id|uuid|uuid|NO|
midwife_questions|answer_notes|text|text|YES|
midwife_questions|answered|boolean|bool|NO|false
midwife_questions|appointment_id|uuid|uuid|YES|
midwife_questions|category|text|text|NO|
midwife_questions|created_at|timestamp with time zone|timestamptz|NO|now()
midwife_questions|follow_up|boolean|bool|NO|false
midwife_questions|id|uuid|uuid|NO|gen_random_uuid()
midwife_questions|pregnancy_episode_id|uuid|uuid|YES|
midwife_questions|question|text|text|NO|
midwife_questions|updated_at|timestamp with time zone|timestamptz|NO|now()
midwife_questions|user_id|uuid|uuid|NO|
pregnancy_appointments|appointment_at|timestamp with time zone|timestamptz|YES|
pregnancy_appointments|appointment_type|text|text|YES|
pregnancy_appointments|created_at|timestamp with time zone|timestamptz|NO|now()
pregnancy_appointments|follow_up|text|text|YES|
pregnancy_appointments|id|uuid|uuid|NO|gen_random_uuid()
pregnancy_appointments|location|text|text|YES|
pregnancy_appointments|notes|text|text|YES|
pregnancy_appointments|pregnancy_episode_id|uuid|uuid|YES|
pregnancy_appointments|questions|text|text|YES|
pregnancy_appointments|updated_at|timestamp with time zone|timestamptz|NO|now()
pregnancy_appointments|user_id|uuid|uuid|NO|
pregnancy_appointments|week|integer|int4|YES|
pregnancy_episodes|created_at|timestamp with time zone|timestamptz|NO|now()
pregnancy_episodes|due_date|date|date|NO|
pregnancy_episodes|ended_at|timestamp with time zone|timestamptz|YES|
pregnancy_episodes|expected_count|smallint|int2|YES|
pregnancy_episodes|id|uuid|uuid|NO|gen_random_uuid()
pregnancy_episodes|lmp_date|date|date|NO|
pregnancy_episodes|outcome_date|date|date|YES|
pregnancy_episodes|removed_at|timestamp with time zone|timestamptz|YES|
pregnancy_episodes|started_at|timestamp with time zone|timestamptz|NO|now()
pregnancy_episodes|status_changed_at|timestamp with time zone|timestamptz|YES|
pregnancy_episodes|status|USER-DEFINED|pregnancy_journey_status|NO|'active'::pregnancy_journey_status
pregnancy_episodes|updated_at|timestamp with time zone|timestamptz|NO|now()
pregnancy_episodes|user_id|uuid|uuid|NO|
pregnancy_journeys|due_date|date|date|NO|
pregnancy_journeys|lmp_date|date|date|NO|
pregnancy_journeys|outcome_date|date|date|YES|
pregnancy_journeys|started_at|timestamp with time zone|timestamptz|NO|now()
pregnancy_journeys|status_changed_at|timestamp with time zone|timestamptz|YES|
pregnancy_journeys|status|USER-DEFINED|pregnancy_journey_status|NO|'active'::pregnancy_journey_status
pregnancy_journeys|updated_at|timestamp with time zone|timestamptz|NO|now()
pregnancy_journeys|user_id|uuid|uuid|NO|
pregnancy_symptom_notes|created_at|timestamp with time zone|timestamptz|NO|now()
pregnancy_symptom_notes|follow_up|text|text|YES|
pregnancy_symptom_notes|id|uuid|uuid|NO|gen_random_uuid()
pregnancy_symptom_notes|mention_at_appointment|boolean|bool|NO|false
pregnancy_symptom_notes|noted_at|timestamp with time zone|timestamptz|NO|now()
pregnancy_symptom_notes|notes|text|text|YES|
pregnancy_symptom_notes|personal_severity|smallint|int2|YES|
pregnancy_symptom_notes|pregnancy_episode_id|uuid|uuid|YES|
pregnancy_symptom_notes|symptom_label|text|text|NO|
pregnancy_symptom_notes|updated_at|timestamp with time zone|timestamptz|NO|now()
pregnancy_symptom_notes|user_id|uuid|uuid|NO|
profiles|baby_illustration_style|USER-DEFINED|baby_illustration_style|YES|
profiles|companion_journal_context_enabled|boolean|bool|NO|false
profiles|companion_name|text|text|YES|
profiles|companion_tone|text|text|YES|
profiles|created_at|timestamp with time zone|timestamptz|NO|now()
profiles|first_name|text|text|YES|
profiles|id|uuid|uuid|NO|gen_random_uuid()
profiles|updated_at|timestamp with time zone|timestamptz|NO|now()
profiles|user_id|uuid|uuid|NO|
reflections|content|text|text|NO|''::text
reflections|created_at|timestamp with time zone|timestamptz|NO|now()
reflections|first_written_at|timestamp with time zone|timestamptz|YES|
reflections|first_written_content|text|text|YES|
reflections|id|uuid|uuid|NO|gen_random_uuid()
reflections|pregnancy_episode_id|uuid|uuid|YES|
reflections|updated_at|timestamp with time zone|timestamptz|NO|now()
reflections|user_id|uuid|uuid|NO|
reflections|week|integer|int4|NO|
saved_journeys|created_at|timestamp with time zone|timestamptz|NO|now()
saved_journeys|due_date|date|date|NO|
saved_journeys|id|uuid|uuid|NO|gen_random_uuid()
saved_journeys|journey_type|text|text|NO|'pregnancy'::text
saved_journeys|lmp_date|date|date|NO|
saved_journeys|updated_at|timestamp with time zone|timestamptz|NO|now()
saved_journeys|user_id|uuid|uuid|NO|
suppressed_emails|created_at|timestamp with time zone|timestamptz|NO|now()
suppressed_emails|email|text|text|NO|
suppressed_emails|id|uuid|uuid|NO|gen_random_uuid()
suppressed_emails|metadata|jsonb|jsonb|YES|
suppressed_emails|reason|text|text|NO|
ttc_journeys|actively_trying|text|text|YES|
ttc_journeys|current_cycle_start|date|date|YES|
ttc_journeys|cycle_length_days|integer|int4|YES|
ttc_journeys|cycle_regularity|text|text|YES|
ttc_journeys|expected_period_date|date|date|YES|
ttc_journeys|fertile_window_end|date|date|YES|
ttc_journeys|fertile_window_start|date|date|YES|
ttc_journeys|id|uuid|uuid|NO|gen_random_uuid()
ttc_journeys|ivf_consideration|text|text|YES|
ttc_journeys|ivf_transfer_date|date|date|YES|
ttc_journeys|ivf_transfer_type|text|text|YES|
ttc_journeys|last_period_date|date|date|YES|
ttc_journeys|likely_ovulation_date|date|date|YES|
ttc_journeys|period_length_days|integer|int4|YES|
ttc_journeys|positive_test_status|text|text|YES|
ttc_journeys|possible_test_date|date|date|YES|
ttc_journeys|stage|text|text|YES|
ttc_journeys|started_at|timestamp with time zone|timestamptz|NO|now()
ttc_journeys|support_status|text|text|YES|
ttc_journeys|tracks_symptoms|text|text|YES|
ttc_journeys|updated_at|timestamp with time zone|timestamptz|NO|now()
ttc_journeys|user_id|uuid|uuid|NO|
ttc_journeys|uses_ovulation_tests|text|text|YES|
ttc_logs|created_at|timestamp with time zone|timestamptz|NO|now()
ttc_logs|id|uuid|uuid|NO|gen_random_uuid()
ttc_logs|journey_id|uuid|uuid|NO|
ttc_logs|log_date|date|date|NO|
ttc_logs|log_type|text|text|NO|
ttc_logs|notes|text|text|YES|
ttc_logs|updated_at|timestamp with time zone|timestamptz|NO|now()
ttc_logs|user_id|uuid|uuid|NO|
ttc_logs|value|text|text|YES|
week_media_memories|caption|text|text|YES|
week_media_memories|created_at|timestamp with time zone|timestamptz|NO|now()
week_media_memories|duration_seconds|integer|int4|YES|
week_media_memories|file_size_bytes|bigint|int8|NO|
week_media_memories|id|uuid|uuid|NO|gen_random_uuid()
week_media_memories|media_type|text|text|NO|
week_media_memories|mime_type|text|text|NO|
week_media_memories|pregnancy_episode_id|uuid|uuid|YES|
week_media_memories|storage_path|text|text|NO|
week_media_memories|updated_at|timestamp with time zone|timestamptz|NO|now()
week_media_memories|user_id|uuid|uuid|NO|
week_media_memories|week|integer|int4|NO|
week_photos|caption|text|text|YES|
week_photos|created_at|timestamp with time zone|timestamptz|NO|now()
week_photos|id|uuid|uuid|NO|gen_random_uuid()
week_photos|pregnancy_episode_id|uuid|uuid|YES|
week_photos|storage_path|text|text|NO|
week_photos|updated_at|timestamp with time zone|timestamptz|NO|now()
week_photos|user_id|uuid|uuid|NO|
week_photos|week|integer|int4|NO|
```

## enums (5)
```text
baby_illustration_style|default,light,medium,deep
companion_memory_category|preference,personal_detail,plan,relationship,support_preference,other
companion_memory_source|explicit_command,settings
first_year_journey_status|active,paused,completed
pregnancy_journey_status|active,given_birth,no_longer_pregnant,pregnancy_loss,paused
```

## functions (25)
```text
claim_email_delivery|p_message_id text, p_lease_seconds integer|true|5a5e83c89942429c2de94af570283481
complete_email_delivery|p_queue_name text, p_queue_message_id bigint, p_message_id text, p_template_name text, p_recipient_email text|true|b9b842819dfbfbaf9ef6ce9038a8cf34
consume_ai_rate_limit|p_key text, p_limit integer, p_window_seconds integer|true|c1302c150b1bdd972e3f6ba35c216878
delete_active_journey|p_lifecycle text|false|2189e96d4274dc790143aff992e24fa2
delete_email|queue_name text, message_id bigint|true|2cd34cff7c6bdf2db1f6935ec51dc8db
email_queue_dispatch||true|3fbf638ebd923b22242ad18e9c97fd9b
email_queue_wake||true|33381986701860bacc0059e01a56f984
enqueue_email|queue_name text, payload jsonb|true|4483879669e0c80ecb876151dee937d2
move_to_dlq|source_queue text, dlq_name text, message_id bigint, payload jsonb|true|121ff5ca3d6e8e9fe91e278ab48a947a
normalise_companion_memory|p_value text|false|faa6b3510860f68750960495551fb5ed
read_email_batch|queue_name text, batch_size integer, vt integer|true|dc27c68544dfcdf9792bc9fd50bf705c
release_email_delivery|p_message_id text|true|a19b376d224e2a130f05b81d29d0bee2
save_first_year_journey|p_babies jsonb|false|c5592b26b48e86dd9b5ae8dd01452028
save_pregnancy_journey|p_lmp_date date, p_due_date date|false|157aa72c2f1a23f86fe89da6b00b4e4d
save_ttc_journey|p_stage text, p_last_period_date date, p_cycle_length_days integer, p_period_length_days integer, p_cycle_regularity text, p_actively_trying text, p_uses_ovulation_tests text, p_tracks_symptoms text, p_support_status text, p_ivf_consideration text, p_likely_ovulation_date date, p_fertile_window_start date, p_fertile_window_end date, p_expected_period_date date, p_possible_test_date date|false|87c3aff94cae456a255213fcea6c4e55
set_updated_at||false|5b733ab523bad442e4b10f836de9e4ba
touch_companion_conversation||true|b2117221a114bb090d0ee72488eee183
validate_baby_date_of_birth||false|d927d47375f04019c83e1e349e426b63
validate_companion_conversation||false|cb059ef81ec59aa48557b9b44cd46e6c
validate_companion_memory||false|7bf2a1a0ca6e7ad8e85c77dd5f175b99
validate_companion_message||false|b18ac549bdc9ce29902a2ebb1296a8f3
validate_first_year_care_event||false|e189d01ff9a8f82a546fa036e9da8bd7
validate_first_year_entry||false|9c3eb7f2ae9195ed93c49ab5c0c941bb
validate_first_year_memory||false|e942f5362c64ebd0e4f3254cdb71c24a
validate_first_year_reminder||false|7f7a8ea199bc1951c509de67bcbd2400
```

## triggers (36)
```text
babies|babies_set_updated_at|c7e2464cfe3cc3e00969101b2cbe404e
babies|babies_validate_date_of_birth|d91003fe059e970723b4d905fc974f4a
baby_movement_notes|baby_movement_notes_set_updated_at|4797b6ddbf75e930344ec80b43f98e4e
birth_plans|birth_plans_set_updated_at|3078d20c7d8e396fe0994567ec2dda87
companion_conversations|companion_conversations_set_updated_at|5c75f3cd2cd304d95a20caa404573bdf
companion_conversations|companion_conversations_validate|530a5e4a2f78afe4bcf653d2fdfc0d08
companion_memories|companion_memories_set_updated_at|40540ee0e048ab2b2e4faad099fcc6c4
companion_memories|companion_memories_validate|962f1304f2ac5566aeb97ce392f172ef
companion_messages|companion_messages_set_updated_at|e5065340903a3e677f1fd885fe58a5f0
companion_messages|companion_messages_touch_conversation|9bbda42dbcea5b4db5f76f1efb7d7479
companion_messages|companion_messages_validate|0c683a0942fb099f2ecaf3fea5371998
contraction_events|contraction_events_set_updated_at|e270b0a90b7312d4ee14eba88ade72de
contraction_sessions|contraction_sessions_set_updated_at|5d51ef73d850cb9e29d46667f9d12277
first_year_care_events|first_year_care_events_set_updated_at|ff5f4b6e14f630c77e0aa98749da2261
first_year_care_events|first_year_care_events_validate|73357c9c15d84f07429f8110e207a325
first_year_entries|first_year_entries_set_updated_at|120035a8cc11d9504a56f18ae4888d59
first_year_entries|first_year_entries_validate|526a3b33b8ebea5908cdf4a7183bcc9b
first_year_journeys|first_year_journeys_set_updated_at|a5f3a80b4bce1f0fad132dd772243d9e
first_year_memories|first_year_memories_set_updated_at|4be2d6b6067395536e8c370139a27675
first_year_memories|first_year_memories_validate|6191b2d1ddea32a7b66d096c32c45b4d
first_year_reminders|first_year_reminders_set_updated_at|ceafe34312544259e8fdd060f243bb5f
first_year_reminders|first_year_reminders_validate|805c4492557ad4e862c8f55a1931631f
hospital_bag_items|hospital_bag_items_set_updated_at|607fd209b71748bbc12c2fb68474428b
journeys|journeys_set_updated_at|a23e164943c480856d189edd3ba81c7e
midwife_questions|set_updated_at_midwife_questions|101f2d03e42813a9680f7d1968d13fe6
pregnancy_appointments|pregnancy_appointments_set_updated_at|bdd2a3196c58f4e3d393d5c92663c7ee
pregnancy_episodes|pregnancy_episodes_set_updated_at|168ef023745594e33f8756c2d93cb2b8
pregnancy_journeys|pregnancy_journeys_set_updated_at|0451c36598dfeee6ba6e068bc9bab93c
pregnancy_symptom_notes|set_updated_at_pregnancy_symptom_notes|c20b7ef3ae074a6974ade7f7925a8d8a
profiles|profiles_updated_at|3c5a259cf4d3be0c86a146e15e8ef45d
reflections|reflections_set_updated_at|bf6b329eda8d19645f0e62c517af1cca
saved_journeys|saved_journeys_updated_at|d45ea90651cbc27ac0855b830784e286
ttc_journeys|ttc_journeys_set_updated_at|3ca9015713b036177c881d8ec662562d
ttc_logs|ttc_logs_set_updated_at|6a133e8eb4e4bcbfba01a0f0dac6f1e6
week_media_memories|week_media_memories_set_updated_at|4e221746aa9bf992d44c2234d5bab34e
week_photos|week_photos_set_updated_at|49d2d3e675af0cede6ce2582e15211ed
```

## rls (35)
```text
ai_rate_limits|true
archived_journeys|true
babies|true
baby_movement_notes|true
birth_plans|true
c1_rehearsal_marker|true
companion_conversations|true
companion_memories|true
companion_messages|true
contraction_events|true
contraction_sessions|true
email_delivery_claims|true
email_send_log|true
email_send_state|true
email_unsubscribe_tokens|true
first_year_care_events|true
first_year_entries|true
first_year_journeys|true
first_year_memories|true
first_year_reminders|true
hospital_bag_items|true
journeys|true
midwife_questions|true
pregnancy_appointments|true
pregnancy_episodes|true
pregnancy_journeys|true
pregnancy_symptom_notes|true
profiles|true
reflections|true
saved_journeys|true
suppressed_emails|true
ttc_journeys|true
ttc_logs|true
week_media_memories|true
week_photos|true
```

## policies (118)
```text
archived_journeys|Users insert own archived journeys|INSERT|{}|PERMISSIVE||(auth.uid() = user_id)
archived_journeys|Users view own archived journeys|SELECT|{}|PERMISSIVE|(auth.uid() = user_id)|
babies|Users can create their own babies|INSERT|{authenticated}|PERMISSIVE||(auth.uid() = user_id)
babies|Users can delete their own babies|DELETE|{authenticated}|PERMISSIVE|(auth.uid() = user_id)|
babies|Users can update their own babies|UPDATE|{authenticated}|PERMISSIVE|(auth.uid() = user_id)|(auth.uid() = user_id)
babies|Users can view their own babies|SELECT|{authenticated}|PERMISSIVE|(auth.uid() = user_id)|
baby_movement_notes|baby_movement_notes_delete_own|DELETE|{authenticated}|PERMISSIVE|(auth.uid() = user_id)|
baby_movement_notes|baby_movement_notes_insert_own|INSERT|{authenticated}|PERMISSIVE||(auth.uid() = user_id)
baby_movement_notes|baby_movement_notes_select_own|SELECT|{authenticated}|PERMISSIVE|(auth.uid() = user_id)|
baby_movement_notes|baby_movement_notes_update_own|UPDATE|{authenticated}|PERMISSIVE|(auth.uid() = user_id)|(auth.uid() = user_id)
birth_plans|Users can delete their own birth plan|DELETE|{authenticated}|PERMISSIVE|(auth.uid() = user_id)|
birth_plans|Users can insert their own birth plan|INSERT|{authenticated}|PERMISSIVE||(auth.uid() = user_id)
birth_plans|Users can update their own birth plan|UPDATE|{authenticated}|PERMISSIVE|(auth.uid() = user_id)|(auth.uid() = user_id)
birth_plans|Users can view their own birth plan|SELECT|{authenticated}|PERMISSIVE|(auth.uid() = user_id)|
companion_conversations|Owners create their conversations|INSERT|{authenticated}|PERMISSIVE||(user_id = auth.uid())
companion_conversations|Owners delete their conversations|DELETE|{authenticated}|PERMISSIVE|(user_id = auth.uid())|
companion_conversations|Owners read their conversations|SELECT|{authenticated}|PERMISSIVE|(user_id = auth.uid())|
companion_conversations|Owners update their conversations|UPDATE|{authenticated}|PERMISSIVE|(user_id = auth.uid())|(user_id = auth.uid())
companion_memories|Users can create their own companion memories|INSERT|{authenticated}|PERMISSIVE||(auth.uid() = user_id)
companion_memories|Users can delete their own companion memories|DELETE|{authenticated}|PERMISSIVE|(auth.uid() = user_id)|
companion_memories|Users can read their own companion memories|SELECT|{authenticated}|PERMISSIVE|(auth.uid() = user_id)|
companion_memories|Users can update their own companion memories|UPDATE|{authenticated}|PERMISSIVE|(auth.uid() = user_id)|(auth.uid() = user_id)
companion_messages|Owners create their messages|INSERT|{authenticated}|PERMISSIVE||((user_id = auth.uid()) AND (EXISTS ( SELECT 1 FROM companion_conversations c WHERE ((c.id = companion_messages.conversation_id) AND (c.user_id = auth.uid())))))
companion_messages|Owners delete their messages|DELETE|{authenticated}|PERMISSIVE|((user_id = auth.uid()) AND (EXISTS ( SELECT 1 FROM companion_conversations c WHERE ((c.id = companion_messages.conversation_id) AND (c.user_id = auth.uid())))))|
companion_messages|Owners read their messages|SELECT|{authenticated}|PERMISSIVE|((user_id = auth.uid()) AND (EXISTS ( SELECT 1 FROM companion_conversations c WHERE ((c.id = companion_messages.conversation_id) AND (c.user_id = auth.uid())))))|
companion_messages|Owners update their messages|UPDATE|{authenticated}|PERMISSIVE|((user_id = auth.uid()) AND (EXISTS ( SELECT 1 FROM companion_conversations c WHERE ((c.id = companion_messages.conversation_id) AND (c.user_id = auth.uid())))))|((user_id = auth.uid()) AND (EXISTS ( SELECT 1 FROM companion_conversations c WHERE ((c.id = companion_messages.conversation_id) AND (c.user_id = auth.uid())))))
contraction_events|contraction_events_delete_own|DELETE|{authenticated}|PERMISSIVE|(auth.uid() = user_id)|
contraction_events|contraction_events_insert_own|INSERT|{authenticated}|PERMISSIVE||(auth.uid() = user_id)
contraction_events|contraction_events_select_own|SELECT|{authenticated}|PERMISSIVE|(auth.uid() = user_id)|
contraction_events|contraction_events_update_own|UPDATE|{authenticated}|PERMISSIVE|(auth.uid() = user_id)|(auth.uid() = user_id)
contraction_sessions|contraction_sessions_delete_own|DELETE|{authenticated}|PERMISSIVE|(auth.uid() = user_id)|
contraction_sessions|contraction_sessions_insert_own|INSERT|{authenticated}|PERMISSIVE||(auth.uid() = user_id)
contraction_sessions|contraction_sessions_select_own|SELECT|{authenticated}|PERMISSIVE|(auth.uid() = user_id)|
contraction_sessions|contraction_sessions_update_own|UPDATE|{authenticated}|PERMISSIVE|(auth.uid() = user_id)|(auth.uid() = user_id)
email_send_log|Service role can insert send log|INSERT|{}|PERMISSIVE||(auth.role() = 'service_role'::text)
email_send_log|Service role can read send log|SELECT|{}|PERMISSIVE|(auth.role() = 'service_role'::text)|
email_send_log|Service role can update send log|UPDATE|{}|PERMISSIVE|(auth.role() = 'service_role'::text)|(auth.role() = 'service_role'::text)
email_send_state|Service role can manage send state|ALL|{}|PERMISSIVE|(auth.role() = 'service_role'::text)|(auth.role() = 'service_role'::text)
email_unsubscribe_tokens|Service role can insert tokens|INSERT|{}|PERMISSIVE||(auth.role() = 'service_role'::text)
email_unsubscribe_tokens|Service role can mark tokens as used|UPDATE|{}|PERMISSIVE|(auth.role() = 'service_role'::text)|(auth.role() = 'service_role'::text)
email_unsubscribe_tokens|Service role can read tokens|SELECT|{}|PERMISSIVE|(auth.role() = 'service_role'::text)|
first_year_care_events|Users can create their own care events|INSERT|{authenticated}|PERMISSIVE||(auth.uid() = user_id)
first_year_care_events|Users can delete their own care events|DELETE|{authenticated}|PERMISSIVE|(auth.uid() = user_id)|
first_year_care_events|Users can update their own care events|UPDATE|{authenticated}|PERMISSIVE|(auth.uid() = user_id)|(auth.uid() = user_id)
first_year_care_events|Users can view their own care events|SELECT|{authenticated}|PERMISSIVE|(auth.uid() = user_id)|
first_year_entries|Users can create their own first year entries|INSERT|{authenticated}|PERMISSIVE||(auth.uid() = user_id)
first_year_entries|Users can delete their own first year entries|DELETE|{authenticated}|PERMISSIVE|(auth.uid() = user_id)|
first_year_entries|Users can update their own first year entries|UPDATE|{authenticated}|PERMISSIVE|(auth.uid() = user_id)|(auth.uid() = user_id)
first_year_entries|Users can view their own first year entries|SELECT|{authenticated}|PERMISSIVE|(auth.uid() = user_id)|
first_year_journeys|Users can create their own first year journey|INSERT|{authenticated}|PERMISSIVE||(auth.uid() = user_id)
first_year_journeys|Users can delete their own first year journey|DELETE|{authenticated}|PERMISSIVE|(auth.uid() = user_id)|
first_year_journeys|Users can update their own first year journey|UPDATE|{authenticated}|PERMISSIVE|(auth.uid() = user_id)|(auth.uid() = user_id)
first_year_journeys|Users can view their own first year journey|SELECT|{authenticated}|PERMISSIVE|(auth.uid() = user_id)|
first_year_memories|Users can create their own memories|INSERT|{authenticated}|PERMISSIVE||(auth.uid() = user_id)
first_year_memories|Users can remove their own memories|DELETE|{authenticated}|PERMISSIVE|(auth.uid() = user_id)|
first_year_memories|Users can update their own memories|UPDATE|{authenticated}|PERMISSIVE|(auth.uid() = user_id)|(auth.uid() = user_id)
first_year_memories|Users can view their own memories|SELECT|{authenticated}|PERMISSIVE|(auth.uid() = user_id)|
first_year_reminders|Users can create their own reminders|INSERT|{authenticated}|PERMISSIVE||(auth.uid() = user_id)
first_year_reminders|Users can delete their own reminders|DELETE|{authenticated}|PERMISSIVE|(auth.uid() = user_id)|
first_year_reminders|Users can update their own reminders|UPDATE|{authenticated}|PERMISSIVE|(auth.uid() = user_id)|(auth.uid() = user_id)
first_year_reminders|Users can view their own reminders|SELECT|{authenticated}|PERMISSIVE|(auth.uid() = user_id)|
hospital_bag_items|own rows delete|DELETE|{authenticated}|PERMISSIVE|(auth.uid() = user_id)|
hospital_bag_items|own rows insert|INSERT|{authenticated}|PERMISSIVE||(auth.uid() = user_id)
hospital_bag_items|own rows select|SELECT|{authenticated}|PERMISSIVE|(auth.uid() = user_id)|
hospital_bag_items|own rows update|UPDATE|{authenticated}|PERMISSIVE|(auth.uid() = user_id)|(auth.uid() = user_id)
journeys|Users delete own journey pointer|DELETE|{}|PERMISSIVE|(auth.uid() = user_id)|
journeys|Users insert own journey pointer|INSERT|{}|PERMISSIVE||(auth.uid() = user_id)
journeys|Users update own journey pointer|UPDATE|{}|PERMISSIVE|(auth.uid() = user_id)|
journeys|Users view own journey pointer|SELECT|{}|PERMISSIVE|(auth.uid() = user_id)|
midwife_questions|midwife_questions_delete_own|DELETE|{authenticated}|PERMISSIVE|(auth.uid() = user_id)|
midwife_questions|midwife_questions_insert_own|INSERT|{authenticated}|PERMISSIVE||(auth.uid() = user_id)
midwife_questions|midwife_questions_select_own|SELECT|{authenticated}|PERMISSIVE|(auth.uid() = user_id)|
midwife_questions|midwife_questions_update_own|UPDATE|{authenticated}|PERMISSIVE|(auth.uid() = user_id)|(auth.uid() = user_id)
pregnancy_appointments|Users can delete their own appointments|DELETE|{authenticated}|PERMISSIVE|(auth.uid() = user_id)|
pregnancy_appointments|Users can insert their own appointments|INSERT|{authenticated}|PERMISSIVE||(auth.uid() = user_id)
pregnancy_appointments|Users can update their own appointments|UPDATE|{authenticated}|PERMISSIVE|(auth.uid() = user_id)|(auth.uid() = user_id)
pregnancy_appointments|Users can view their own appointments|SELECT|{authenticated}|PERMISSIVE|(auth.uid() = user_id)|
pregnancy_episodes|pregnancy_episodes_delete_own|DELETE|{authenticated}|PERMISSIVE|(auth.uid() = user_id)|
pregnancy_episodes|pregnancy_episodes_insert_own|INSERT|{authenticated}|PERMISSIVE||(auth.uid() = user_id)
pregnancy_episodes|pregnancy_episodes_select_own|SELECT|{authenticated}|PERMISSIVE|(auth.uid() = user_id)|
pregnancy_episodes|pregnancy_episodes_update_own|UPDATE|{authenticated}|PERMISSIVE|(auth.uid() = user_id)|(auth.uid() = user_id)
pregnancy_journeys|Users delete own pregnancy journey|DELETE|{}|PERMISSIVE|(auth.uid() = user_id)|
pregnancy_journeys|Users insert own pregnancy journey|INSERT|{}|PERMISSIVE||(auth.uid() = user_id)
pregnancy_journeys|Users update own pregnancy journey|UPDATE|{}|PERMISSIVE|(auth.uid() = user_id)|
pregnancy_journeys|Users view own pregnancy journey|SELECT|{}|PERMISSIVE|(auth.uid() = user_id)|
pregnancy_symptom_notes|pregnancy_symptom_notes_delete_own|DELETE|{authenticated}|PERMISSIVE|(auth.uid() = user_id)|
pregnancy_symptom_notes|pregnancy_symptom_notes_insert_own|INSERT|{authenticated}|PERMISSIVE||(auth.uid() = user_id)
pregnancy_symptom_notes|pregnancy_symptom_notes_select_own|SELECT|{authenticated}|PERMISSIVE|(auth.uid() = user_id)|
pregnancy_symptom_notes|pregnancy_symptom_notes_update_own|UPDATE|{authenticated}|PERMISSIVE|(auth.uid() = user_id)|(auth.uid() = user_id)
profiles|Users insert own profile|INSERT|{}|PERMISSIVE||(auth.uid() = user_id)
profiles|Users update own profile|UPDATE|{}|PERMISSIVE|(auth.uid() = user_id)|
profiles|Users view own profile|SELECT|{}|PERMISSIVE|(auth.uid() = user_id)|
reflections|Users delete own reflections|DELETE|{}|PERMISSIVE|(auth.uid() = user_id)|
reflections|Users insert own reflections|INSERT|{}|PERMISSIVE||(auth.uid() = user_id)
reflections|Users update own reflections|UPDATE|{}|PERMISSIVE|(auth.uid() = user_id)|
reflections|Users view own reflections|SELECT|{}|PERMISSIVE|(auth.uid() = user_id)|
saved_journeys|Users delete own journey|DELETE|{}|PERMISSIVE|(auth.uid() = user_id)|
saved_journeys|Users insert own journey|INSERT|{}|PERMISSIVE||(auth.uid() = user_id)
saved_journeys|Users update own journey|UPDATE|{}|PERMISSIVE|(auth.uid() = user_id)|
saved_journeys|Users view own journey|SELECT|{}|PERMISSIVE|(auth.uid() = user_id)|
suppressed_emails|Service role can insert suppressed emails|INSERT|{}|PERMISSIVE||(auth.role() = 'service_role'::text)
suppressed_emails|Service role can read suppressed emails|SELECT|{}|PERMISSIVE|(auth.role() = 'service_role'::text)|
ttc_journeys|Users delete own ttc journey|DELETE|{}|PERMISSIVE|(auth.uid() = user_id)|
ttc_journeys|Users insert own ttc journey|INSERT|{}|PERMISSIVE||(auth.uid() = user_id)
ttc_journeys|Users update own ttc journey|UPDATE|{}|PERMISSIVE|(auth.uid() = user_id)|(auth.uid() = user_id)
ttc_journeys|Users view own ttc journey|SELECT|{}|PERMISSIVE|(auth.uid() = user_id)|
ttc_logs|Users can delete their own ttc logs|DELETE|{authenticated}|PERMISSIVE|(auth.uid() = user_id)|
ttc_logs|Users can insert their own ttc logs|INSERT|{authenticated}|PERMISSIVE||(auth.uid() = user_id)
ttc_logs|Users can update their own ttc logs|UPDATE|{authenticated}|PERMISSIVE|(auth.uid() = user_id)|(auth.uid() = user_id)
ttc_logs|Users can view their own ttc logs|SELECT|{authenticated}|PERMISSIVE|(auth.uid() = user_id)|
week_media_memories|Users delete own week media|DELETE|{authenticated}|PERMISSIVE|(auth.uid() = user_id)|
week_media_memories|Users insert own week media|INSERT|{authenticated}|PERMISSIVE||(auth.uid() = user_id)
week_media_memories|Users update own week media|UPDATE|{authenticated}|PERMISSIVE|(auth.uid() = user_id)|(auth.uid() = user_id)
week_media_memories|Users view own week media|SELECT|{authenticated}|PERMISSIVE|(auth.uid() = user_id)|
week_photos|Users delete own week photos|DELETE|{}|PERMISSIVE|(auth.uid() = user_id)|
week_photos|Users insert own week photos|INSERT|{}|PERMISSIVE||(auth.uid() = user_id)
week_photos|Users update own week photos|UPDATE|{}|PERMISSIVE|(auth.uid() = user_id)|
week_photos|Users view own week photos|SELECT|{}|PERMISSIVE|(auth.uid() = user_id)|
```

## constraints (161)
```text
ai_rate_limits|ai_rate_limits_pkey|PRIMARY KEY (rate_key)
ai_rate_limits|ai_rate_limits_request_count_check|CHECK ((request_count >= 0))
archived_journeys|archived_journeys_ended_reason_check|CHECK ((ended_reason = ANY (ARRAY['transitioned'::text, 'completed'::text, 'user_ended'::text])))
archived_journeys|archived_journeys_pkey|PRIMARY KEY (id)
archived_journeys|archived_journeys_user_id_fkey|FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE
babies|babies_birth_order_range|CHECK (((birth_order >= 1) AND (birth_order <= 4)))
babies|babies_id_user_id_key|UNIQUE (id, user_id)
babies|babies_name_length|CHECK (((name IS NULL) OR (char_length(name) <= 60)))
babies|babies_pkey|PRIMARY KEY (id)
babies|babies_pregnancy_episode_owner_fkey|FOREIGN KEY (pregnancy_episode_id, user_id) REFERENCES pregnancy_episodes(id, user_id) ON DELETE RESTRICT NOT VALID
babies|babies_user_id_fkey|FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE
baby_movement_notes|baby_movement_notes_pkey|PRIMARY KEY (id)
baby_movement_notes|baby_movement_notes_pregnancy_episode_owner_fkey|FOREIGN KEY (pregnancy_episode_id, user_id) REFERENCES pregnancy_episodes(id, user_id) ON DELETE RESTRICT NOT VALID
baby_movement_notes|baby_movement_notes_user_id_fkey|FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE
birth_plans|birth_plans_completion_check|CHECK (((completion >= 0) AND (completion <= 100)))
birth_plans|birth_plans_pkey|PRIMARY KEY (id)
birth_plans|birth_plans_pregnancy_episode_owner_fkey|FOREIGN KEY (pregnancy_episode_id, user_id) REFERENCES pregnancy_episodes(id, user_id) ON DELETE RESTRICT NOT VALID
birth_plans|birth_plans_user_id_fkey|FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE
birth_plans|birth_plans_user_id_key|UNIQUE (user_id)
c1_rehearsal_marker|c1_rehearsal_marker_pkey|PRIMARY KEY (project_ref)
companion_conversations|companion_conversations_pkey|PRIMARY KEY (id)
companion_conversations|companion_conversations_user_id_fkey|FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE
companion_memories|companion_memories_pkey|PRIMARY KEY (id)
companion_memories|companion_memories_user_id_fkey|FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE
companion_memories|companion_memories_value_length|CHECK (((char_length(btrim(value)) >= 1) AND (char_length(btrim(value)) <= 240)))
companion_messages|companion_messages_client_message_id_check|CHECK (((client_message_id IS NULL) OR ((char_length(client_message_id) >= 8) AND (char_length(client_message_id) <= 100))))
companion_messages|companion_messages_content_check|CHECK (((char_length(content) >= 1) AND (char_length(content) <= 8000)))
companion_messages|companion_messages_conversation_id_fkey|FOREIGN KEY (conversation_id) REFERENCES companion_conversations(id) ON DELETE CASCADE
companion_messages|companion_messages_pkey|PRIMARY KEY (id)
companion_messages|companion_messages_role_check|CHECK ((role = ANY (ARRAY['user'::text, 'assistant'::text])))
companion_messages|companion_messages_user_id_fkey|FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE
contraction_events|contraction_events_pkey|PRIMARY KEY (id)
contraction_events|contraction_events_pregnancy_episode_owner_fkey|FOREIGN KEY (pregnancy_episode_id, user_id) REFERENCES pregnancy_episodes(id, user_id) ON DELETE RESTRICT NOT VALID
contraction_events|contraction_events_session_id_user_id_fkey|FOREIGN KEY (session_id, user_id) REFERENCES contraction_sessions(id, user_id) ON DELETE CASCADE
contraction_events|contraction_events_user_id_fkey|FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE
contraction_sessions|contraction_sessions_id_user_id_key|UNIQUE (id, user_id)
contraction_sessions|contraction_sessions_pkey|PRIMARY KEY (id)
contraction_sessions|contraction_sessions_pregnancy_episode_owner_fkey|FOREIGN KEY (pregnancy_episode_id, user_id) REFERENCES pregnancy_episodes(id, user_id) ON DELETE RESTRICT NOT VALID
contraction_sessions|contraction_sessions_user_id_fkey|FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE
email_delivery_claims|email_delivery_claims_pkey|PRIMARY KEY (message_id)
email_delivery_claims|email_delivery_claims_status_check|CHECK ((status = ANY (ARRAY['processing'::text, 'sent'::text])))
email_send_log|email_send_log_pkey|PRIMARY KEY (id)
email_send_log|email_send_log_status_check|CHECK ((status = ANY (ARRAY['pending'::text, 'sent'::text, 'suppressed'::text, 'failed'::text, 'rate_limited'::text, 'bounced'::text, 'complained'::text, 'dlq'::text])))
email_send_state|email_send_state_id_check|CHECK ((id = 1))
email_send_state|email_send_state_pkey|PRIMARY KEY (id)
email_unsubscribe_tokens|email_unsubscribe_tokens_email_key|UNIQUE (email)
email_unsubscribe_tokens|email_unsubscribe_tokens_pkey|PRIMARY KEY (id)
email_unsubscribe_tokens|email_unsubscribe_tokens_token_key|UNIQUE (token)
first_year_care_events|first_year_care_events_amount_range|CHECK (((amount_ml IS NULL) OR ((amount_ml > (0)::numeric) AND (amount_ml <= (2000)::numeric))))
first_year_care_events|first_year_care_events_amount_shape|CHECK (((event_type = ANY (ARRAY['feed'::text, 'pump'::text])) OR (amount_ml IS NULL)))
first_year_care_events|first_year_care_events_baby_id_fkey|FOREIGN KEY (baby_id) REFERENCES babies(id) ON DELETE CASCADE
first_year_care_events|first_year_care_events_event_type_check|CHECK ((event_type = ANY (ARRAY['feed'::text, 'sleep'::text, 'nappy'::text, 'pump'::text, 'note'::text])))
first_year_care_events|first_year_care_events_feed_method_check|CHECK (((feed_method IS NULL) OR (feed_method = ANY (ARRAY['breast'::text, 'bottle'::text, 'expressed'::text, 'formula'::text, 'solids'::text]))))
first_year_care_events|first_year_care_events_feed_shape|CHECK (((event_type = 'feed'::text) OR (feed_method IS NULL)))
first_year_care_events|first_year_care_events_nappy_shape|CHECK (((event_type = 'nappy'::text) OR (nappy_type IS NULL)))
first_year_care_events|first_year_care_events_nappy_type_check|CHECK (((nappy_type IS NULL) OR (nappy_type = ANY (ARRAY['wet'::text, 'dirty'::text, 'both'::text, 'wee'::text, 'poo'::text, 'dry'::text]))))
first_year_care_events|first_year_care_events_note_length|CHECK (((note IS NULL) OR (char_length(note) <= 2000)))
first_year_care_events|first_year_care_events_pkey|PRIMARY KEY (id)
first_year_care_events|first_year_care_events_range|CHECK (((ended_at IS NULL) OR (started_at IS NULL) OR (ended_at > started_at)))
first_year_care_events|first_year_care_events_side_check|CHECK (((side IS NULL) OR (side = ANY (ARRAY['left'::text, 'right'::text, 'both'::text]))))
first_year_care_events|first_year_care_events_side_shape|CHECK (((event_type = ANY (ARRAY['feed'::text, 'pump'::text])) OR (side IS NULL)))
first_year_care_events|first_year_care_events_sleep_kind_check|CHECK (((sleep_kind IS NULL) OR (sleep_kind = ANY (ARRAY['nap'::text, 'night'::text]))))
first_year_care_events|first_year_care_events_sleep_kind_shape|CHECK (((event_type = 'sleep'::text) OR (sleep_kind IS NULL)))
first_year_care_events|first_year_care_events_sleep_shape|CHECK ((((event_type = 'sleep'::text) AND (started_at IS NOT NULL)) OR (event_type = 'feed'::text) OR ((event_type <> ALL (ARRAY['sleep'::text, 'feed'::text])) AND (started_at IS NULL) AND (ended_at IS NULL))))
first_year_care_events|first_year_care_events_user_id_fkey|FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE
first_year_entries|first_year_entries_baby_id_fkey|FOREIGN KEY (baby_id) REFERENCES babies(id) ON DELETE CASCADE
first_year_entries|first_year_entries_kind_check|CHECK ((kind = ANY (ARRAY['rhythm'::text, 'feeding'::text, 'sleep'::text, 'nappies'::text, 'recovery'::text, 'wellbeing'::text, 'rest_support'::text, 'question'::text])))
first_year_entries|first_year_entries_lane_baby|CHECK ((((lane = 'baby'::text) AND (baby_id IS NOT NULL)) OR ((lane = 'parent'::text) AND (baby_id IS NULL))))
first_year_entries|first_year_entries_lane_check|CHECK ((lane = ANY (ARRAY['baby'::text, 'parent'::text])))
first_year_entries|first_year_entries_lane_kind|CHECK ((((lane = 'baby'::text) AND (kind = ANY (ARRAY['rhythm'::text, 'feeding'::text, 'sleep'::text, 'nappies'::text]))) OR ((lane = 'parent'::text) AND (kind = ANY (ARRAY['recovery'::text, 'wellbeing'::text, 'rest_support'::text, 'question'::text])))))
first_year_entries|first_year_entries_note_length|CHECK (((note IS NULL) OR (char_length(note) <= 2000)))
first_year_entries|first_year_entries_pkey|PRIMARY KEY (id)
first_year_entries|first_year_entries_tags_count|CHECK (((array_length(tags, 1) IS NULL) OR (array_length(tags, 1) <= 8)))
first_year_entries|first_year_entries_user_id_fkey|FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE
first_year_journeys|first_year_journeys_archived_pregnancy_journey_id_fkey|FOREIGN KEY (archived_pregnancy_journey_id) REFERENCES archived_journeys(id) ON DELETE SET NULL
first_year_journeys|first_year_journeys_pkey|PRIMARY KEY (user_id)
first_year_journeys|first_year_journeys_user_id_fkey|FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE
first_year_memories|first_year_memories_baby_id_fkey|FOREIGN KEY (baby_id) REFERENCES babies(id) ON DELETE SET NULL
first_year_memories|first_year_memories_note_check|CHECK (((btrim(note) <> ''::text) AND (char_length(btrim(note)) <= 2000)))
first_year_memories|first_year_memories_photo_complete|CHECK ((((photo_path IS NULL) AND (photo_mime IS NULL) AND (photo_size_bytes IS NULL)) OR ((photo_path IS NOT NULL) AND (photo_mime IS NOT NULL) AND (photo_size_bytes IS NOT NULL))))
first_year_memories|first_year_memories_photo_dimensions|CHECK ((((photo_width IS NULL) OR ((photo_width > 0) AND (photo_width <= 20000))) AND ((photo_height IS NULL) OR ((photo_height > 0) AND (photo_height <= 20000)))))
first_year_memories|first_year_memories_photo_mime_allowed|CHECK (((photo_mime IS NULL) OR (photo_mime = ANY (ARRAY['image/jpeg'::text, 'image/png'::text, 'image/webp'::text, 'image/heic'::text, 'image/heif'::text]))))
first_year_memories|first_year_memories_photo_path_length|CHECK (((photo_path IS NULL) OR ((char_length(photo_path) >= 1) AND (char_length(photo_path) <= 512))))
first_year_memories|first_year_memories_photo_size_range|CHECK (((photo_size_bytes IS NULL) OR ((photo_size_bytes > 0) AND (photo_size_bytes <= 8388608))))
first_year_memories|first_year_memories_pkey|PRIMARY KEY (id)
first_year_memories|first_year_memories_scope_baby_check|CHECK ((((memory_scope = 'baby'::text) AND (baby_id IS NOT NULL)) OR ((memory_scope <> 'baby'::text) AND (baby_id IS NULL))))
first_year_memories|first_year_memories_scope_check|CHECK ((memory_scope = ANY (ARRAY['family'::text, 'baby'::text, 'all_babies'::text])))
first_year_memories|first_year_memories_source_entry_id_fkey|FOREIGN KEY (source_entry_id) REFERENCES first_year_entries(id) ON DELETE SET NULL
first_year_memories|first_year_memories_title_check|CHECK (((title IS NULL) OR (char_length(btrim(title)) <= 120)))
first_year_memories|first_year_memories_user_id_fkey|FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE
first_year_reminders|first_year_reminders_baby_id_fkey|FOREIGN KEY (baby_id) REFERENCES babies(id) ON DELETE CASCADE
first_year_reminders|first_year_reminders_label_length|CHECK (((label IS NULL) OR (char_length(label) <= 140)))
first_year_reminders|first_year_reminders_pkey|PRIMARY KEY (id)
first_year_reminders|first_year_reminders_reminder_type_check|CHECK ((reminder_type = ANY (ARRAY['feed'::text, 'sleep'::text, 'nappy'::text, 'moment'::text])))
first_year_reminders|first_year_reminders_status_check|CHECK ((status = ANY (ARRAY['active'::text, 'done'::text])))
first_year_reminders|first_year_reminders_user_id_fkey|FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE
hospital_bag_items|hospital_bag_items_category_check|CHECK ((category = ANY (ARRAY['parent'::text, 'baby'::text, 'partner'::text, 'documents'::text, 'comfort'::text])))
hospital_bag_items|hospital_bag_items_pkey|PRIMARY KEY (id)
hospital_bag_items|hospital_bag_items_pregnancy_episode_owner_fkey|FOREIGN KEY (pregnancy_episode_id, user_id) REFERENCES pregnancy_episodes(id, user_id) ON DELETE RESTRICT NOT VALID
hospital_bag_items|hospital_bag_items_user_id_category_item_key_key|UNIQUE (user_id, category, item_key)
hospital_bag_items|hospital_bag_items_user_id_fkey|FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE
journeys|journeys_current_pregnancy_episode_owner_fkey|FOREIGN KEY (current_pregnancy_episode_id, user_id) REFERENCES pregnancy_episodes(id, user_id) ON DELETE RESTRICT NOT VALID
journeys|journeys_lifecycle_check|CHECK ((lifecycle = ANY (ARRAY['ttc'::text, 'ivf'::text, 'pregnancy'::text, 'postpartum'::text, 'first_year'::text])))
journeys|journeys_pkey|PRIMARY KEY (user_id)
journeys|journeys_user_id_fkey|FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE
midwife_questions|midwife_questions_category_check|CHECK ((category = ANY (ARRAY['symptoms_body'::text, 'baby_movements'::text, 'scans_tests'::text, 'birth_preferences'::text, 'feeding'::text, 'recovery'::text, 'practical'::text, 'other'::text])))
midwife_questions|midwife_questions_pkey|PRIMARY KEY (id)
midwife_questions|midwife_questions_pregnancy_episode_owner_fkey|FOREIGN KEY (pregnancy_episode_id, user_id) REFERENCES pregnancy_episodes(id, user_id) ON DELETE RESTRICT NOT VALID
midwife_questions|midwife_questions_user_id_fkey|FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE
pregnancy_appointments|pregnancy_appointments_pkey|PRIMARY KEY (id)
pregnancy_appointments|pregnancy_appointments_pregnancy_episode_owner_fkey|FOREIGN KEY (pregnancy_episode_id, user_id) REFERENCES pregnancy_episodes(id, user_id) ON DELETE RESTRICT NOT VALID
pregnancy_appointments|pregnancy_appointments_user_id_fkey|FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE
pregnancy_appointments|pregnancy_appointments_week_check|CHECK (((week IS NULL) OR ((week >= 1) AND (week <= 42))))
pregnancy_episodes|pregnancy_episodes_dates_check|CHECK (((due_date > lmp_date) AND (due_date <= (lmp_date + 300))))
pregnancy_episodes|pregnancy_episodes_ended_at_status_check|CHECK (((status = ANY (ARRAY['active'::pregnancy_journey_status, 'paused'::pregnancy_journey_status])) = (ended_at IS NULL)))
pregnancy_episodes|pregnancy_episodes_expected_count_check|CHECK (((expected_count IS NULL) OR ((expected_count >= 1) AND (expected_count <= 4))))
pregnancy_episodes|pregnancy_episodes_id_user_id_key|UNIQUE (id, user_id)
pregnancy_episodes|pregnancy_episodes_pkey|PRIMARY KEY (id)
pregnancy_episodes|pregnancy_episodes_user_id_fkey|FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE
pregnancy_journeys|pregnancy_journeys_pkey|PRIMARY KEY (user_id)
pregnancy_journeys|pregnancy_journeys_user_id_fkey|FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE
pregnancy_symptom_notes|pregnancy_symptom_notes_personal_severity_check|CHECK (((personal_severity IS NULL) OR ((personal_severity >= 1) AND (personal_severity <= 3))))
pregnancy_symptom_notes|pregnancy_symptom_notes_pkey|PRIMARY KEY (id)
pregnancy_symptom_notes|pregnancy_symptom_notes_pregnancy_episode_owner_fkey|FOREIGN KEY (pregnancy_episode_id, user_id) REFERENCES pregnancy_episodes(id, user_id) ON DELETE RESTRICT NOT VALID
pregnancy_symptom_notes|pregnancy_symptom_notes_user_id_fkey|FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE
profiles|profiles_companion_name_check|CHECK (((companion_name IS NULL) OR ((char_length(TRIM(BOTH FROM companion_name)) >= 1) AND (char_length(TRIM(BOTH FROM companion_name)) <= 24))))
profiles|profiles_companion_tone_check|CHECK (((companion_tone IS NULL) OR (companion_tone = ANY (ARRAY['calm'::text, 'practical'::text, 'warm'::text]))))
profiles|profiles_pkey|PRIMARY KEY (id)
profiles|profiles_user_id_fkey|FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE
profiles|profiles_user_id_key|UNIQUE (user_id)
reflections|reflections_pkey|PRIMARY KEY (id)
reflections|reflections_pregnancy_episode_owner_fkey|FOREIGN KEY (pregnancy_episode_id, user_id) REFERENCES pregnancy_episodes(id, user_id) ON DELETE RESTRICT NOT VALID
reflections|reflections_user_id_fkey|FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE NOT VALID
reflections|reflections_user_id_week_key|UNIQUE (user_id, week)
reflections|reflections_week_check|CHECK (((week >= 1) AND (week <= 45)))
saved_journeys|saved_journeys_pkey|PRIMARY KEY (id)
saved_journeys|saved_journeys_user_id_fkey|FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE
saved_journeys|saved_journeys_user_id_key|UNIQUE (user_id)
suppressed_emails|suppressed_emails_email_key|UNIQUE (email)
suppressed_emails|suppressed_emails_pkey|PRIMARY KEY (id)
suppressed_emails|suppressed_emails_reason_check|CHECK ((reason = ANY (ARRAY['unsubscribe'::text, 'bounce'::text, 'complaint'::text])))
ttc_journeys|ttc_journeys_ivf_transfer_paired_chk|CHECK ((((ivf_transfer_date IS NULL) AND (ivf_transfer_type IS NULL)) OR ((ivf_transfer_date IS NOT NULL) AND (ivf_transfer_type IS NOT NULL) AND (ivf_transfer_type = ANY (ARRAY['3day'::text, '5day'::text])))))
ttc_journeys|ttc_journeys_pkey|PRIMARY KEY (id)
ttc_journeys|ttc_journeys_user_id_fkey|FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE
ttc_journeys|ttc_journeys_user_id_key|UNIQUE (user_id)
ttc_logs|ttc_logs_journey_id_fkey|FOREIGN KEY (journey_id) REFERENCES ttc_journeys(id) ON DELETE CASCADE
ttc_logs|ttc_logs_log_type_check|CHECK ((log_type = ANY (ARRAY['period'::text, 'ovulation_test'::text, 'pregnancy_test'::text, 'mood'::text, 'cramps'::text, 'discharge'::text, 'energy'::text, 'note'::text])))
ttc_logs|ttc_logs_pkey|PRIMARY KEY (id)
ttc_logs|ttc_logs_user_id_fkey|FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE
week_media_memories|week_media_memories_duration_seconds_check|CHECK (((duration_seconds IS NULL) OR (duration_seconds > 0)))
week_media_memories|week_media_memories_file_size_bytes_check|CHECK ((file_size_bytes > 0))
week_media_memories|week_media_memories_media_type_check|CHECK ((media_type = ANY (ARRAY['video'::text, 'voice_note'::text])))
week_media_memories|week_media_memories_pkey|PRIMARY KEY (id)
week_media_memories|week_media_memories_pregnancy_episode_owner_fkey|FOREIGN KEY (pregnancy_episode_id, user_id) REFERENCES pregnancy_episodes(id, user_id) ON DELETE RESTRICT NOT VALID
week_media_memories|week_media_memories_user_id_fkey|FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE
week_media_memories|week_media_memories_user_id_week_media_type_key|UNIQUE (user_id, week, media_type)
week_media_memories|week_media_memories_week_check|CHECK (((week >= 1) AND (week <= 42)))
week_photos|week_photos_pkey|PRIMARY KEY (id)
week_photos|week_photos_pregnancy_episode_owner_fkey|FOREIGN KEY (pregnancy_episode_id, user_id) REFERENCES pregnancy_episodes(id, user_id) ON DELETE RESTRICT NOT VALID
week_photos|week_photos_user_id_fkey|FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE NOT VALID
week_photos|week_photos_user_id_week_key|UNIQUE (user_id, week)
```

## indexes (104)
```text
ai_rate_limits|ai_rate_limits_pkey|CREATE UNIQUE INDEX ai_rate_limits_pkey ON public.ai_rate_limits USING btree (rate_key)
archived_journeys|archived_journeys_pkey|CREATE UNIQUE INDEX archived_journeys_pkey ON public.archived_journeys USING btree (id)
archived_journeys|archived_journeys_user_idx|CREATE INDEX archived_journeys_user_idx ON public.archived_journeys USING btree (user_id, ended_at DESC)
babies|babies_id_user_id_key|CREATE UNIQUE INDEX babies_id_user_id_key ON public.babies USING btree (id, user_id)
babies|babies_one_primary_per_user_idx|CREATE UNIQUE INDEX babies_one_primary_per_user_idx ON public.babies USING btree (user_id) WHERE is_primary
babies|babies_pkey|CREATE UNIQUE INDEX babies_pkey ON public.babies USING btree (id)
babies|babies_pregnancy_episode_idx|CREATE INDEX babies_pregnancy_episode_idx ON public.babies USING btree (pregnancy_episode_id, user_id)
babies|babies_user_birth_order_idx|CREATE UNIQUE INDEX babies_user_birth_order_idx ON public.babies USING btree (user_id, birth_order)
babies|babies_user_id_idx|CREATE INDEX babies_user_id_idx ON public.babies USING btree (user_id)
baby_movement_notes|baby_movement_notes_pkey|CREATE UNIQUE INDEX baby_movement_notes_pkey ON public.baby_movement_notes USING btree (id)
baby_movement_notes|baby_movement_notes_pregnancy_episode_idx|CREATE INDEX baby_movement_notes_pregnancy_episode_idx ON public.baby_movement_notes USING btree (pregnancy_episode_id, user_id)
baby_movement_notes|baby_movement_notes_user_noted_at_idx|CREATE INDEX baby_movement_notes_user_noted_at_idx ON public.baby_movement_notes USING btree (user_id, noted_at DESC)
birth_plans|birth_plans_pkey|CREATE UNIQUE INDEX birth_plans_pkey ON public.birth_plans USING btree (id)
birth_plans|birth_plans_pregnancy_episode_idx|CREATE INDEX birth_plans_pregnancy_episode_idx ON public.birth_plans USING btree (pregnancy_episode_id, user_id)
birth_plans|birth_plans_user_id_key|CREATE UNIQUE INDEX birth_plans_user_id_key ON public.birth_plans USING btree (user_id)
c1_rehearsal_marker|c1_rehearsal_marker_pkey|CREATE UNIQUE INDEX c1_rehearsal_marker_pkey ON public.c1_rehearsal_marker USING btree (project_ref)
companion_conversations|companion_conversations_pkey|CREATE UNIQUE INDEX companion_conversations_pkey ON public.companion_conversations USING btree (id)
companion_conversations|companion_conversations_user_recent_idx|CREATE INDEX companion_conversations_user_recent_idx ON public.companion_conversations USING btree (user_id, last_message_at DESC)
companion_memories|companion_memories_pkey|CREATE UNIQUE INDEX companion_memories_pkey ON public.companion_memories USING btree (id)
companion_memories|companion_memories_user_normalised_idx|CREATE UNIQUE INDEX companion_memories_user_normalised_idx ON public.companion_memories USING btree (user_id, normalised_value)
companion_memories|companion_memories_user_updated_idx|CREATE INDEX companion_memories_user_updated_idx ON public.companion_memories USING btree (user_id, updated_at DESC)
companion_messages|companion_messages_client_id_idx|CREATE UNIQUE INDEX companion_messages_client_id_idx ON public.companion_messages USING btree (conversation_id, client_message_id) WHERE (client_message_id IS NOT NULL)
companion_messages|companion_messages_conversation_idx|CREATE INDEX companion_messages_conversation_idx ON public.companion_messages USING btree (conversation_id, created_at)
companion_messages|companion_messages_pkey|CREATE UNIQUE INDEX companion_messages_pkey ON public.companion_messages USING btree (id)
contraction_events|contraction_events_pkey|CREATE UNIQUE INDEX contraction_events_pkey ON public.contraction_events USING btree (id)
contraction_events|contraction_events_pregnancy_episode_idx|CREATE INDEX contraction_events_pregnancy_episode_idx ON public.contraction_events USING btree (pregnancy_episode_id, user_id)
contraction_events|contraction_events_session_started_at_idx|CREATE INDEX contraction_events_session_started_at_idx ON public.contraction_events USING btree (session_id, started_at)
contraction_events|contraction_events_user_started_at_idx|CREATE INDEX contraction_events_user_started_at_idx ON public.contraction_events USING btree (user_id, started_at DESC)
contraction_sessions|contraction_sessions_id_user_id_key|CREATE UNIQUE INDEX contraction_sessions_id_user_id_key ON public.contraction_sessions USING btree (id, user_id)
contraction_sessions|contraction_sessions_pkey|CREATE UNIQUE INDEX contraction_sessions_pkey ON public.contraction_sessions USING btree (id)
contraction_sessions|contraction_sessions_pregnancy_episode_idx|CREATE INDEX contraction_sessions_pregnancy_episode_idx ON public.contraction_sessions USING btree (pregnancy_episode_id, user_id)
contraction_sessions|contraction_sessions_user_started_at_idx|CREATE INDEX contraction_sessions_user_started_at_idx ON public.contraction_sessions USING btree (user_id, started_at DESC)
email_delivery_claims|email_delivery_claims_pkey|CREATE UNIQUE INDEX email_delivery_claims_pkey ON public.email_delivery_claims USING btree (message_id)
email_send_log|email_send_log_pkey|CREATE UNIQUE INDEX email_send_log_pkey ON public.email_send_log USING btree (id)
email_send_log|idx_email_send_log_created|CREATE INDEX idx_email_send_log_created ON public.email_send_log USING btree (created_at DESC)
email_send_log|idx_email_send_log_message_sent_unique|CREATE UNIQUE INDEX idx_email_send_log_message_sent_unique ON public.email_send_log USING btree (message_id) WHERE (status = 'sent'::text)
email_send_log|idx_email_send_log_message|CREATE INDEX idx_email_send_log_message ON public.email_send_log USING btree (message_id)
email_send_log|idx_email_send_log_recipient|CREATE INDEX idx_email_send_log_recipient ON public.email_send_log USING btree (recipient_email)
email_send_state|email_send_state_pkey|CREATE UNIQUE INDEX email_send_state_pkey ON public.email_send_state USING btree (id)
email_unsubscribe_tokens|email_unsubscribe_tokens_email_key|CREATE UNIQUE INDEX email_unsubscribe_tokens_email_key ON public.email_unsubscribe_tokens USING btree (email)
email_unsubscribe_tokens|email_unsubscribe_tokens_pkey|CREATE UNIQUE INDEX email_unsubscribe_tokens_pkey ON public.email_unsubscribe_tokens USING btree (id)
email_unsubscribe_tokens|email_unsubscribe_tokens_token_key|CREATE UNIQUE INDEX email_unsubscribe_tokens_token_key ON public.email_unsubscribe_tokens USING btree (token)
email_unsubscribe_tokens|idx_unsubscribe_tokens_token|CREATE INDEX idx_unsubscribe_tokens_token ON public.email_unsubscribe_tokens USING btree (token)
first_year_care_events|first_year_care_events_active_feed_idx|CREATE UNIQUE INDEX first_year_care_events_active_feed_idx ON public.first_year_care_events USING btree (baby_id) WHERE ((event_type = 'feed'::text) AND (started_at IS NOT NULL) AND (ended_at IS NULL) AND ((metadata ->> 'feed_mode'::text) = 'breast'::text))
first_year_care_events|first_year_care_events_active_sleep_idx|CREATE UNIQUE INDEX first_year_care_events_active_sleep_idx ON public.first_year_care_events USING btree (baby_id) WHERE ((event_type = 'sleep'::text) AND (ended_at IS NULL))
first_year_care_events|first_year_care_events_pkey|CREATE UNIQUE INDEX first_year_care_events_pkey ON public.first_year_care_events USING btree (id)
first_year_care_events|first_year_care_events_user_baby_time_idx|CREATE INDEX first_year_care_events_user_baby_time_idx ON public.first_year_care_events USING btree (user_id, baby_id, occurred_at DESC)
first_year_care_events|first_year_care_events_user_time_idx|CREATE INDEX first_year_care_events_user_time_idx ON public.first_year_care_events USING btree (user_id, occurred_at DESC)
first_year_entries|first_year_entries_baby_unique_idx|CREATE UNIQUE INDEX first_year_entries_baby_unique_idx ON public.first_year_entries USING btree (user_id, baby_id, entry_date, kind) WHERE (lane = 'baby'::text)
first_year_entries|first_year_entries_parent_unique_idx|CREATE UNIQUE INDEX first_year_entries_parent_unique_idx ON public.first_year_entries USING btree (user_id, entry_date, kind) WHERE ((lane = 'parent'::text) AND (baby_id IS NULL))
first_year_entries|first_year_entries_pkey|CREATE UNIQUE INDEX first_year_entries_pkey ON public.first_year_entries USING btree (id)
first_year_entries|first_year_entries_user_baby_date_idx|CREATE INDEX first_year_entries_user_baby_date_idx ON public.first_year_entries USING btree (user_id, baby_id, entry_date DESC)
first_year_entries|first_year_entries_user_date_idx|CREATE INDEX first_year_entries_user_date_idx ON public.first_year_entries USING btree (user_id, entry_date DESC)
first_year_journeys|first_year_journeys_pkey|CREATE UNIQUE INDEX first_year_journeys_pkey ON public.first_year_journeys USING btree (user_id)
first_year_memories|first_year_memories_pkey|CREATE UNIQUE INDEX first_year_memories_pkey ON public.first_year_memories USING btree (id)
first_year_memories|first_year_memories_user_date_idx|CREATE INDEX first_year_memories_user_date_idx ON public.first_year_memories USING btree (user_id, memory_date DESC, created_at DESC)
first_year_reminders|first_year_reminders_pkey|CREATE UNIQUE INDEX first_year_reminders_pkey ON public.first_year_reminders USING btree (id)
first_year_reminders|first_year_reminders_user_due_idx|CREATE INDEX first_year_reminders_user_due_idx ON public.first_year_reminders USING btree (user_id, due_at)
first_year_reminders|first_year_reminders_user_status_due_idx|CREATE INDEX first_year_reminders_user_status_due_idx ON public.first_year_reminders USING btree (user_id, status, due_at)
hospital_bag_items|hospital_bag_items_pkey|CREATE UNIQUE INDEX hospital_bag_items_pkey ON public.hospital_bag_items USING btree (id)
hospital_bag_items|hospital_bag_items_pregnancy_episode_idx|CREATE INDEX hospital_bag_items_pregnancy_episode_idx ON public.hospital_bag_items USING btree (pregnancy_episode_id, user_id)
hospital_bag_items|hospital_bag_items_user_category_idx|CREATE INDEX hospital_bag_items_user_category_idx ON public.hospital_bag_items USING btree (user_id, category)
hospital_bag_items|hospital_bag_items_user_id_category_item_key_key|CREATE UNIQUE INDEX hospital_bag_items_user_id_category_item_key_key ON public.hospital_bag_items USING btree (user_id, category, item_key)
journeys|journeys_current_pregnancy_episode_idx|CREATE INDEX journeys_current_pregnancy_episode_idx ON public.journeys USING btree (current_pregnancy_episode_id, user_id)
journeys|journeys_pkey|CREATE UNIQUE INDEX journeys_pkey ON public.journeys USING btree (user_id)
midwife_questions|midwife_questions_pkey|CREATE UNIQUE INDEX midwife_questions_pkey ON public.midwife_questions USING btree (id)
midwife_questions|midwife_questions_pregnancy_episode_idx|CREATE INDEX midwife_questions_pregnancy_episode_idx ON public.midwife_questions USING btree (pregnancy_episode_id, user_id)
midwife_questions|midwife_questions_user_created_at_idx|CREATE INDEX midwife_questions_user_created_at_idx ON public.midwife_questions USING btree (user_id, created_at DESC)
midwife_questions|midwife_questions_user_open_idx|CREATE INDEX midwife_questions_user_open_idx ON public.midwife_questions USING btree (user_id) WHERE (answered = false)
pregnancy_appointments|pregnancy_appointments_pkey|CREATE UNIQUE INDEX pregnancy_appointments_pkey ON public.pregnancy_appointments USING btree (id)
pregnancy_appointments|pregnancy_appointments_pregnancy_episode_idx|CREATE INDEX pregnancy_appointments_pregnancy_episode_idx ON public.pregnancy_appointments USING btree (pregnancy_episode_id, user_id)
pregnancy_appointments|pregnancy_appointments_user_appointment_at_idx|CREATE INDEX pregnancy_appointments_user_appointment_at_idx ON public.pregnancy_appointments USING btree (user_id, appointment_at DESC)
pregnancy_episodes|pregnancy_episodes_id_user_id_key|CREATE UNIQUE INDEX pregnancy_episodes_id_user_id_key ON public.pregnancy_episodes USING btree (id, user_id)
pregnancy_episodes|pregnancy_episodes_one_open_per_user_idx|CREATE UNIQUE INDEX pregnancy_episodes_one_open_per_user_idx ON public.pregnancy_episodes USING btree (user_id) WHERE ((status = ANY (ARRAY['active'::pregnancy_journey_status, 'paused'::pregnancy_journey_status])) AND (removed_at IS NULL))
pregnancy_episodes|pregnancy_episodes_pkey|CREATE UNIQUE INDEX pregnancy_episodes_pkey ON public.pregnancy_episodes USING btree (id)
pregnancy_episodes|pregnancy_episodes_user_id_idx|CREATE INDEX pregnancy_episodes_user_id_idx ON public.pregnancy_episodes USING btree (user_id)
pregnancy_journeys|pregnancy_journeys_pkey|CREATE UNIQUE INDEX pregnancy_journeys_pkey ON public.pregnancy_journeys USING btree (user_id)
pregnancy_symptom_notes|pregnancy_symptom_notes_pkey|CREATE UNIQUE INDEX pregnancy_symptom_notes_pkey ON public.pregnancy_symptom_notes USING btree (id)
pregnancy_symptom_notes|pregnancy_symptom_notes_pregnancy_episode_idx|CREATE INDEX pregnancy_symptom_notes_pregnancy_episode_idx ON public.pregnancy_symptom_notes USING btree (pregnancy_episode_id, user_id)
pregnancy_symptom_notes|pregnancy_symptom_notes_user_noted_at_idx|CREATE INDEX pregnancy_symptom_notes_user_noted_at_idx ON public.pregnancy_symptom_notes USING btree (user_id, noted_at DESC)
profiles|profiles_pkey|CREATE UNIQUE INDEX profiles_pkey ON public.profiles USING btree (id)
profiles|profiles_user_id_key|CREATE UNIQUE INDEX profiles_user_id_key ON public.profiles USING btree (user_id)
reflections|idx_reflections_user_week|CREATE INDEX idx_reflections_user_week ON public.reflections USING btree (user_id, week)
reflections|reflections_pkey|CREATE UNIQUE INDEX reflections_pkey ON public.reflections USING btree (id)
reflections|reflections_pregnancy_episode_idx|CREATE INDEX reflections_pregnancy_episode_idx ON public.reflections USING btree (pregnancy_episode_id, user_id)
reflections|reflections_user_id_week_key|CREATE UNIQUE INDEX reflections_user_id_week_key ON public.reflections USING btree (user_id, week)
saved_journeys|saved_journeys_pkey|CREATE UNIQUE INDEX saved_journeys_pkey ON public.saved_journeys USING btree (id)
saved_journeys|saved_journeys_user_id_key|CREATE UNIQUE INDEX saved_journeys_user_id_key ON public.saved_journeys USING btree (user_id)
suppressed_emails|idx_suppressed_emails_email|CREATE INDEX idx_suppressed_emails_email ON public.suppressed_emails USING btree (email)
suppressed_emails|suppressed_emails_email_key|CREATE UNIQUE INDEX suppressed_emails_email_key ON public.suppressed_emails USING btree (email)
suppressed_emails|suppressed_emails_pkey|CREATE UNIQUE INDEX suppressed_emails_pkey ON public.suppressed_emails USING btree (id)
ttc_journeys|ttc_journeys_pkey|CREATE UNIQUE INDEX ttc_journeys_pkey ON public.ttc_journeys USING btree (id)
ttc_journeys|ttc_journeys_user_id_key|CREATE UNIQUE INDEX ttc_journeys_user_id_key ON public.ttc_journeys USING btree (user_id)
ttc_logs|ttc_logs_journey_idx|CREATE INDEX ttc_logs_journey_idx ON public.ttc_logs USING btree (journey_id)
ttc_logs|ttc_logs_pkey|CREATE UNIQUE INDEX ttc_logs_pkey ON public.ttc_logs USING btree (id)
ttc_logs|ttc_logs_user_date_idx|CREATE INDEX ttc_logs_user_date_idx ON public.ttc_logs USING btree (user_id, log_date DESC)
week_media_memories|idx_week_media_memories_user_week|CREATE INDEX idx_week_media_memories_user_week ON public.week_media_memories USING btree (user_id, week)
week_media_memories|week_media_memories_pkey|CREATE UNIQUE INDEX week_media_memories_pkey ON public.week_media_memories USING btree (id)
week_media_memories|week_media_memories_pregnancy_episode_idx|CREATE INDEX week_media_memories_pregnancy_episode_idx ON public.week_media_memories USING btree (pregnancy_episode_id, user_id)
week_media_memories|week_media_memories_user_id_week_media_type_key|CREATE UNIQUE INDEX week_media_memories_user_id_week_media_type_key ON public.week_media_memories USING btree (user_id, week, media_type)
week_photos|idx_week_photos_user_week|CREATE INDEX idx_week_photos_user_week ON public.week_photos USING btree (user_id, week)
week_photos|week_photos_pkey|CREATE UNIQUE INDEX week_photos_pkey ON public.week_photos USING btree (id)
week_photos|week_photos_pregnancy_episode_idx|CREATE INDEX week_photos_pregnancy_episode_idx ON public.week_photos USING btree (pregnancy_episode_id, user_id)
week_photos|week_photos_user_id_week_key|CREATE UNIQUE INDEX week_photos_user_id_week_key ON public.week_photos USING btree (user_id, week)
```

## grants (35)
```text
ai_rate_limits|{postgres=arwdDxtm/postgres,service_role=arwdDxtm/postgres}
archived_journeys|{postgres=arwdDxtm/postgres,anon=arwdDxtm/postgres,authenticated=arwdDxtm/postgres,service_role=arwdDxtm/postgres}
babies|{postgres=arwdDxtm/postgres,authenticated=arwdDxtm/postgres,service_role=arwdDxtm/postgres}
baby_movement_notes|{postgres=arwdDxtm/postgres,authenticated=arwdDxtm/postgres,service_role=arwdDxtm/postgres}
birth_plans|{postgres=arwdDxtm/postgres,authenticated=arwdDxtm/postgres,service_role=arwdDxtm/postgres}
c1_rehearsal_marker|{postgres=arwdDxtm/postgres,service_role=arwdDxtm/postgres}
companion_conversations|{postgres=arwdDxtm/postgres,anon=arwdDxtm/postgres,authenticated=arwdDxtm/postgres,service_role=arwdDxtm/postgres}
companion_memories|{postgres=arwdDxtm/postgres,anon=arwdDxtm/postgres,authenticated=arwdDxtm/postgres,service_role=arwdDxtm/postgres}
companion_messages|{postgres=arwdDxtm/postgres,anon=arwdDxtm/postgres,authenticated=arwdDxtm/postgres,service_role=arwdDxtm/postgres}
contraction_events|{postgres=arwdDxtm/postgres,authenticated=arwdDxtm/postgres,service_role=arwdDxtm/postgres}
contraction_sessions|{postgres=arwdDxtm/postgres,authenticated=arwdDxtm/postgres,service_role=arwdDxtm/postgres}
email_delivery_claims|{postgres=arwdDxtm/postgres,service_role=arwdDxtm/postgres}
email_send_log|{postgres=arwdDxtm/postgres,anon=arwdDxtm/postgres,authenticated=arwdDxtm/postgres,service_role=arwdDxtm/postgres}
email_send_state|{postgres=arwdDxtm/postgres,anon=arwdDxtm/postgres,authenticated=arwdDxtm/postgres,service_role=arwdDxtm/postgres}
email_unsubscribe_tokens|{postgres=arwdDxtm/postgres,anon=arwdDxtm/postgres,authenticated=arwdDxtm/postgres,service_role=arwdDxtm/postgres}
first_year_care_events|{postgres=arwdDxtm/postgres,anon=arwdDxtm/postgres,authenticated=arwdDxtm/postgres,service_role=arwdDxtm/postgres}
first_year_entries|{postgres=arwdDxtm/postgres,authenticated=arwdDxtm/postgres,service_role=arwdDxtm/postgres}
first_year_journeys|{postgres=arwdDxtm/postgres,authenticated=arwdDxtm/postgres,service_role=arwdDxtm/postgres}
first_year_memories|{postgres=arwdDxtm/postgres,authenticated=arwdDxtm/postgres,service_role=arwdDxtm/postgres}
first_year_reminders|{postgres=arwdDxtm/postgres,anon=arwdDxtm/postgres,authenticated=arwdDxtm/postgres,service_role=arwdDxtm/postgres}
hospital_bag_items|{postgres=arwdDxtm/postgres,authenticated=arwdDxtm/postgres,service_role=arwdDxtm/postgres}
journeys|{postgres=arwdDxtm/postgres,anon=arwdDxtm/postgres,authenticated=arwdDxtm/postgres,service_role=arwdDxtm/postgres}
midwife_questions|{postgres=arwdDxtm/postgres,authenticated=arwdDxtm/postgres,service_role=arwdDxtm/postgres}
pregnancy_appointments|{postgres=arwdDxtm/postgres,authenticated=arwdDxtm/postgres,service_role=arwdDxtm/postgres}
pregnancy_episodes|{postgres=arwdDxtm/postgres,service_role=arwdDxtm/postgres,authenticated=r/postgres}
pregnancy_journeys|{postgres=arwdDxtm/postgres,anon=arwdDxtm/postgres,authenticated=arwdDxtm/postgres,service_role=arwdDxtm/postgres}
pregnancy_symptom_notes|{postgres=arwdDxtm/postgres,authenticated=arwdDxtm/postgres,service_role=arwdDxtm/postgres}
profiles|{postgres=arwdDxtm/postgres,anon=arwdDxtm/postgres,authenticated=arwdDxtm/postgres,service_role=arwdDxtm/postgres}
reflections|{postgres=arwdDxtm/postgres,anon=arwdDxtm/postgres,authenticated=arwdDxtm/postgres,service_role=arwdDxtm/postgres}
saved_journeys|{postgres=arwdDxtm/postgres,anon=arwdDxtm/postgres,authenticated=arwdDxtm/postgres,service_role=arwdDxtm/postgres}
suppressed_emails|{postgres=arwdDxtm/postgres,anon=arwdDxtm/postgres,authenticated=arwdDxtm/postgres,service_role=arwdDxtm/postgres}
ttc_journeys|{postgres=arwdDxtm/postgres,anon=arwdDxtm/postgres,authenticated=arwdDxtm/postgres,service_role=arwdDxtm/postgres}
ttc_logs|{postgres=arwdDxtm/postgres,authenticated=arwdDxtm/postgres,service_role=arwdDxtm/postgres}
week_media_memories|{postgres=arwdDxtm/postgres,anon=arwdDxtm/postgres,authenticated=arwdDxtm/postgres,service_role=arwdDxtm/postgres}
week_photos|{postgres=arwdDxtm/postgres,anon=arwdDxtm/postgres,authenticated=arwdDxtm/postgres,service_role=arwdDxtm/postgres}
```

