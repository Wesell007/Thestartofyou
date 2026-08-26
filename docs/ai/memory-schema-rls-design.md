# Memory schema and RLS design review

Phase 29H. **Design and review only.** Nothing in this document is built. No migration, table, enum, index, grant, RLS policy, storage bucket, edge function or application code is created by this phase. Every SQL fragment below is illustrative pseudo-SQL written to be reviewed, not executed.

This document turns the data boundary contract in `memory-design.md` into a table shape, a policy model, a deletion model and a validation model that a future team can review before a migration is ever written.

## 0. Scope and non-goals

Carried forward unchanged from Phase 29G. This phase does not widen any of it.

**In scope of the design.** Three future tables, their columns, enums and constraints; owner-scoped RLS; consent representation; deletion, pause, expiry and account-deletion behaviour; server-side access rules for future edge functions; write-time validation; and the checklist that must pass before a migration is authored.

**Out of scope, and explicitly not designed here.**

- **Category F** — health, fertility, loss, mental health, abuse, baby health and medication content. Not a storable category. There is no `sensitivity_level` value, no `memory_type` value and no consent flag in this design that permits it. The only design work relating to category F is the blocker that rejects it.
- **Journal, reflection, note, log and media content.** Off by default and unbuildable. `journal_content_enabled` exists in the consent table solely so the future default is explicit and auditable; it is pinned false, there is no `source` value that admits journal text, and no derived or hashed form of private writing is designed here. There is deliberately no back door: no "summary of journal", no embedding, no derived sentiment field.
- Persisted chat history, voice, RAG, Start of You article grounding, vector search, proactive nudges, partner or family shared memory, agentic actions.
- Any change to auth, routes, SEO or sitemap.

No real user data was read in producing this document. Every example value below is synthetic.

## 1. Schema design

Three tables in the `public` schema. All are owner-scoped to `auth.users`, all use soft delete, and all carry `created_at` and `updated_at` with the existing `public.set_updated_at()` trigger pattern.

### 1.1 Enums

Proposed as Postgres enums so an unknown value is rejected by the database rather than by application code alone.

```text
ai_memory_type        preference | journey_state | saved_fact | continuity
ai_memory_journey     ttc | pregnancy | first_year | general
ai_memory_sensitivity low | medium | sensitive
ai_memory_source      user_setting | user_saved | journey_setup
ai_memory_level       off | basic_preferences | journey_context | saved_by_me
ai_memory_event_type  created | updated | disabled | enabled | deleted |
                      deleted_all | expired | consent_changed | write_rejected
ai_memory_event_source user_action | system_expiry | account_deletion | kill_switch
```

Notes on the deliberate omissions.

- `ai_memory_type` has no `journal` and no `health` member. Categories E and F from the taxonomy have no representation, so a row describing them cannot be constructed even by a service-role insert.
- `ai_memory_sensitivity` stops at `sensitive`. There is no `special_category` value. `sensitive` is the ceiling that journey state occupies, and even that is only writable when the matching consent flag is on.
- `ai_memory_source` admits three deliberate origins only. There is no `conversation`, no `inferred`, no `journal`, no `import`. This is the single most important enum in the design: the companion cannot write memory from a conversation because no source value describes that.
- `ai_memory_level` has no `sensitive_memory` member. The level exists in the permission model as a named gate, not as a storable state.

### 1.2 `public.ai_memory_items`

User-visible remembered items. One row per item; a person is expected to have a handful, not hundreds.

| Column | Type | Null | Notes |
| --- | --- | --- | --- |
| `id` | `uuid` | no | primary key, `gen_random_uuid()` |
| `user_id` | `uuid` | no | references `auth.users(id)` on delete cascade |
| `memory_type` | `ai_memory_type` | no | |
| `journey` | `ai_memory_journey` | no | `general` for journey-neutral preferences |
| `sensitivity_level` | `ai_memory_sensitivity` | no | classified at write time, never by the model |
| `source` | `ai_memory_source` | no | how the row came to exist |
| `value` | `text` | no | the stored value, hard length cap |
| `user_visible_label` | `text` | no | the plain-words label shown in settings |
| `consent_version` | `text` | no | the consent version in force at write time |
| `created_at` | `timestamptz` | no | `now()` |
| `updated_at` | `timestamptz` | no | `now()`, maintained by trigger |
| `review_at` | `timestamptz` | yes | when the person should be asked to confirm the item is still right |
| `expires_at` | `timestamptz` | yes | hard expiry; required for continuity rows |
| `disabled_at` | `timestamptz` | yes | paused: retained, not read |
| `deleted_at` | `timestamptz` | yes | soft delete: retained briefly for audit, never read |

Constraints, as pseudo-SQL for review:

```sql
-- length caps: memory is a label, not a document
CHECK (char_length(value) BETWEEN 1 AND 240)
CHECK (char_length(user_visible_label) BETWEEN 1 AND 80)
CHECK (char_length(consent_version) BETWEEN 1 AND 40)

-- continuity is short-lived by construction
CHECK (memory_type <> 'continuity' OR expires_at IS NOT NULL)

-- sensitivity ceiling per type; nothing may claim a level above 'sensitive'
CHECK (memory_type <> 'preference'    OR sensitivity_level IN ('low','medium'))
CHECK (memory_type <> 'saved_fact'    OR sensitivity_level IN ('low','medium'))
CHECK (memory_type <> 'continuity'    OR sensitivity_level IN ('low','medium'))
CHECK (memory_type <> 'journey_state' OR sensitivity_level IN ('low','medium','sensitive'))

-- source must match the type: no conversation-sourced rows exist at all
CHECK (
     (memory_type = 'preference'    AND source IN ('user_setting','user_saved'))
  OR (memory_type = 'journey_state' AND source = 'journey_setup')
  OR (memory_type = 'saved_fact'    AND source = 'user_saved')
  OR (memory_type = 'continuity'    AND source = 'user_saved')
)

-- soft delete is terminal: a deleted row is never revived, a new row is written instead
CHECK (deleted_at IS NULL OR disabled_at IS NULL OR disabled_at <= deleted_at)
```

Category F blocker. A `CHECK` constraint cannot read a pattern list safely and cannot be changed without a migration, so the blocker is a `BEFORE INSERT OR UPDATE` trigger, mirroring the existing `validate_first_year_*` trigger pattern in this project:

```sql
-- pseudo-SQL, not created in this phase
CREATE FUNCTION public.validate_ai_memory_item() RETURNS trigger AS $$
BEGIN
  -- 1. no source may describe conversation capture, inference, journal or media
  IF NEW.source NOT IN ('user_setting','user_saved','journey_setup') THEN
    RAISE EXCEPTION 'That is not something the companion keeps' USING ERRCODE = '22023';
  END IF;

  -- 2. category F pattern blocker over value and user_visible_label
  --    symptom, bleeding, cramping, loss, miscarriage, stillbirth, termination,
  --    IVF/IUI/treatment, medication and dosage shapes, diagnosis labels,
  --    mental health and self-harm terms, abuse and safety terms
  IF public.ai_memory_looks_sensitive(NEW.value)
     OR public.ai_memory_looks_sensitive(NEW.user_visible_label) THEN
    RAISE EXCEPTION 'That is not something the companion keeps' USING ERRCODE = '22023';
  END IF;

  -- 3. no exact dates, no medical values, no identifiers
  IF public.ai_memory_contains_date_or_measure(NEW.value) THEN
    RAISE EXCEPTION 'That is not something the companion keeps' USING ERRCODE = '22023';
  END IF;

  -- 4. the item must be permitted by the person's current consent row
  IF NOT public.ai_memory_write_allowed(NEW.user_id, NEW.memory_type) THEN
    RAISE EXCEPTION 'Memory is not switched on for this' USING ERRCODE = '42501';
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public, pg_temp;
```

The trigger is the last line of defence, not the first. Classification and rejection also happen in the edge function before the write, so the person gets a kind message rather than a database error. The database-level blocker exists because a future service-role code path must not be able to bypass it.

Indexes:

```sql
-- the only hot read path: live memory for one person in one journey
CREATE INDEX ai_memory_items_live_idx
  ON public.ai_memory_items (user_id, journey, memory_type)
  WHERE deleted_at IS NULL AND disabled_at IS NULL;

-- the settings list
CREATE INDEX ai_memory_items_user_created_idx
  ON public.ai_memory_items (user_id, created_at DESC)
  WHERE deleted_at IS NULL;

-- expiry and review sweeps
CREATE INDEX ai_memory_items_expiry_idx
  ON public.ai_memory_items (expires_at)
  WHERE deleted_at IS NULL AND expires_at IS NOT NULL;

-- one live preference per label per journey, to stop duplicate drift
CREATE UNIQUE INDEX ai_memory_items_one_live_preference_idx
  ON public.ai_memory_items (user_id, journey, user_visible_label)
  WHERE deleted_at IS NULL AND memory_type = 'preference';
```

A per-user row cap (proposed: 50 live items) is enforced in the write path and re-checked in the trigger, so memory cannot quietly become a store.

### 1.3 `public.ai_memory_consents`

One row per person. Absence of a row means memory off; the design never treats a missing row as consent.

| Column | Type | Null | Notes |
| --- | --- | --- | --- |
| `id` | `uuid` | no | primary key |
| `user_id` | `uuid` | no | unique, references `auth.users(id)` on delete cascade |
| `memory_level` | `ai_memory_level` | no | default `off` |
| `basic_preferences_enabled` | `boolean` | no | default false |
| `journey_context_enabled` | `boolean` | no | default false |
| `saved_by_me_enabled` | `boolean` | no | default false |
| `journal_content_enabled` | `boolean` | no | default false, pinned false by constraint |
| `sensitive_memory_enabled` | `boolean` | no | default false, pinned false by constraint |
| `consent_version` | `text` | no | the version of the copy the person agreed to |
| `paused_at` | `timestamptz` | yes | pause: nothing written, nothing read, nothing deleted |
| `created_at` | `timestamptz` | no | |
| `updated_at` | `timestamptz` | no | |
| `disabled_at` | `timestamptz` | yes | consent record retired, for example by a kill switch or a withdrawn consent version |

`paused_at` is listed alongside the fields the brief named because pause and disable are different states and the design needs both: `paused_at` is the person's own reversible pause, `disabled_at` is a system-side retirement of the consent record.

Constraints:

```sql
CHECK (sensitive_memory_enabled = false)   -- not implementable in this design
CHECK (journal_content_enabled  = false)   -- blocked until a separate reviewed design exists

CHECK (
     (memory_level = 'off' AND basic_preferences_enabled = false
                           AND journey_context_enabled  = false
                           AND saved_by_me_enabled      = false)
  OR (memory_level <> 'off')
)

CHECK (memory_level <> 'journey_context' OR journey_context_enabled = true)
CHECK (memory_level <> 'saved_by_me'     OR saved_by_me_enabled     = true)
CHECK (char_length(consent_version) BETWEEN 1 AND 40)

UNIQUE (user_id)
```

Behavioural rules the constraints encode:

- **Off is the default.** No row, or `memory_level = 'off'`, both mean nothing is written and nothing is read.
- **`sensitive_memory_enabled` can never be true** in this design. Making it settable is a schema change that requires the full memory gate plus a separate clinical and legal review.
- **`journal_content_enabled` can never be true** until a separate reviewed design exists. Flipping the constraint alone is not sufficient: there is no `source` value and no `memory_type` that could hold journal-derived content, by construction.
- **Turning memory off never deletes anything.** Off and pause both change what is read and written; deletion is a separate explicit action with its own copy and its own confirm.
- **Delete-all is a separate action** from every switch on the settings surface, and is never a side effect of changing a level.

### 1.4 `public.ai_memory_events`

Accountability log. It records that something happened, never what was said.

| Column | Type | Null | Notes |
| --- | --- | --- | --- |
| `id` | `uuid` | no | primary key |
| `user_id` | `uuid` | no | references `auth.users(id)` on delete cascade |
| `memory_item_id` | `uuid` | yes | nullable: consent and delete-all events have no single item |
| `event_type` | `ai_memory_event_type` | no | |
| `event_source` | `ai_memory_event_source` | no | |
| `created_at` | `timestamptz` | no | |
| `metadata` | `jsonb` | no | default `{}`, summary only |

Rules on `metadata`, enforced by a validation trigger rather than by convention:

- Allowed keys only: `memory_type`, `journey`, `sensitivity_level`, `consent_version`, `item_count`, `reason_code`. Any other key is rejected.
- Every value is an enum member, a short code or an integer. No free text.
- **No raw memory value**, no `user_visible_label`, no question, no answer, no prompt, no transcript, no journal content, no identifiers beyond `user_id` and `memory_item_id`.
- `reason_code` for a `write_rejected` event is a code such as `sensitive_pattern`, `over_length`, `not_consented`, `row_cap`. It never carries the rejected text.
- Retention: events are pruned on a fixed schedule (proposed: 180 days) and are deleted with the account.
- Development and testing use synthetic data only.

`ai_memory_events` deliberately mirrors the existing log-hygiene rule in `privacy-notes.md`: the `ai-search` function logs only failure categories and statuses. Memory logging holds the same line.

### 1.5 Grants

Every table would carry grants in the same migration that creates it, per the project rule. Anon is granted nothing on any of the three tables.

```sql
GRANT SELECT, INSERT, UPDATE ON public.ai_memory_items    TO authenticated;
GRANT SELECT, INSERT, UPDATE ON public.ai_memory_consents TO authenticated;
GRANT SELECT                 ON public.ai_memory_events   TO authenticated;
GRANT ALL ON public.ai_memory_items, public.ai_memory_consents,
             public.ai_memory_events TO service_role;
-- no GRANT to anon on any memory table
-- no DELETE grant to authenticated: deletion is soft, via UPDATE of deleted_at
-- events are insert-only from SECURITY DEFINER functions, never from the client
```

Withholding `DELETE` from `authenticated` is deliberate: it makes soft delete the only client-reachable path, so a delete can always be audited and a hard purge is always a controlled server-side action.

## 2. RLS design

All three tables would have `ENABLE ROW LEVEL SECURITY`. All policies are `TO authenticated` and owner-scoped on `auth.uid() = user_id`. There is no anonymous policy, no cross-user policy, and no partner, child or family policy in this phase.

```sql
-- ai_memory_items ---------------------------------------------------------

-- read: own rows only, and live rows only by default
CREATE POLICY ai_memory_items_select_own
  ON public.ai_memory_items FOR SELECT TO authenticated
  USING (auth.uid() = user_id AND deleted_at IS NULL);

-- the settings list needs to show paused items, so disabled_at is not filtered
-- in the policy; live-only filtering for AI reads happens in the access function below

-- write: own rows only, and only rows the consent record permits
CREATE POLICY ai_memory_items_insert_own
  ON public.ai_memory_items FOR INSERT TO authenticated
  WITH CHECK (
    auth.uid() = user_id
    AND deleted_at IS NULL
    AND public.ai_memory_write_allowed(auth.uid(), memory_type)
  );

-- update: own rows only, and a deleted row can never be edited back to life
CREATE POLICY ai_memory_items_update_own
  ON public.ai_memory_items FOR UPDATE TO authenticated
  USING (auth.uid() = user_id AND deleted_at IS NULL)
  WITH CHECK (auth.uid() = user_id);

-- soft delete is an UPDATE under the policy above; no DELETE policy exists

-- ai_memory_consents ------------------------------------------------------

CREATE POLICY ai_memory_consents_select_own
  ON public.ai_memory_consents FOR SELECT TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY ai_memory_consents_insert_own
  ON public.ai_memory_consents FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = user_id
              AND sensitive_memory_enabled = false
              AND journal_content_enabled  = false);

CREATE POLICY ai_memory_consents_update_own
  ON public.ai_memory_consents FOR UPDATE TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id
              AND sensitive_memory_enabled = false
              AND journal_content_enabled  = false);

-- ai_memory_events --------------------------------------------------------

-- read-only to the owner, so a future activity log can be shown honestly
CREATE POLICY ai_memory_events_select_own
  ON public.ai_memory_events FOR SELECT TO authenticated
  USING (auth.uid() = user_id);

-- no INSERT, UPDATE or DELETE policy: events are written only by
-- SECURITY DEFINER functions owned by the server side
```

The live-read surface for AI use is a single controlled function rather than a table read, so the filter set can never be forgotten at a call site:

```sql
-- pseudo-SQL. SECURITY INVOKER on purpose: it runs under the caller's RLS,
-- so it can never return another person's rows even if called with the wrong id.
CREATE FUNCTION public.ai_memory_for_context(p_journey ai_memory_journey)
RETURNS TABLE (memory_type ai_memory_type, user_visible_label text, value text)
LANGUAGE sql STABLE SECURITY INVOKER SET search_path = public AS $$
  SELECT i.memory_type, i.user_visible_label, i.value
  FROM public.ai_memory_items i
  JOIN public.ai_memory_consents c ON c.user_id = i.user_id
  WHERE i.user_id = auth.uid()
    AND c.memory_level <> 'off'
    AND c.paused_at IS NULL
    AND c.disabled_at IS NULL
    AND i.deleted_at IS NULL
    AND i.disabled_at IS NULL
    AND (i.expires_at IS NULL OR i.expires_at > now())
    AND i.journey IN (p_journey, 'general')
    AND (
         (i.memory_type = 'preference'    AND c.basic_preferences_enabled)
      OR (i.memory_type = 'journey_state' AND c.journey_context_enabled)
      OR (i.memory_type = 'continuity'    AND c.journey_context_enabled)
      OR (i.memory_type = 'saved_fact'    AND c.saved_by_me_enabled)
    )
  ORDER BY i.created_at
  LIMIT 8;
$$;
```

Every AI read goes through this function. Nothing else reads the table for prompt purposes.

### 2.1 RLS threat model

| Threat | How it would happen | Control in this design |
| --- | --- | --- |
| **Cross-user read** | A query filters by a client-supplied `user_id` instead of the session | Every policy is `USING (auth.uid() = user_id)`; the context function is `SECURITY INVOKER` and takes no user id parameter, so there is no id to tamper with |
| **Cross-user update** | An update sets `user_id` to someone else, or edits another person's row | `USING` and `WITH CHECK` both pin `auth.uid() = user_id`, so neither the source nor the target row can belong to anyone else |
| **Accidental service-role over-read** | An edge function uses the service-role key, which **bypasses RLS entirely**, and selects the whole table or another person's rows to "enrich" an answer | This is the single largest risk in the design and is treated as such. Service-role code must never `select * from ai_memory_items`. Future functions read memory only through one named, narrow access module that derives the user id from a verified JWT, applies the same consent and filter set, and returns at most the capped projection. Any direct table read from a function is a release blocker at review. A negative test asserting that no memory table name appears in an edge function outside the access module belongs in the eval phase |
| **Deleted memory reuse** | A cached context object, a replayed request or an unfiltered read reintroduces a deleted item | `deleted_at IS NULL` is in the select policy, in the access function and in the AI usage rules. Memory context is rebuilt per request and never cached across requests. Delete is terminal: a deleted row is never revived, only replaced by a new row |
| **Disabled or paused memory reuse** | Pause changes the settings UI but a read path still returns the row | The access function filters `disabled_at IS NULL` on the item and `paused_at IS NULL` on the consent record. Pause is checked on the consent row, so one flag stops every category at once |
| **Journal content leakage** | Journal text is copied into a memory value by a well-meaning future feature | No `source` value and no `memory_type` admits it; `journal_content_enabled` is pinned false; the write trigger rejects long and date-bearing values; the 240-character cap makes verbatim writing impractical. The block is structural, not a flag |
| **Sensitive content insertion** | A person types a category F fact into a save box, or a future feature classifies it wrongly | Rejected twice: in the write path with a plain, kind message, and in the database trigger with a `22023`. A `write_rejected` event is logged with a reason code and no text. No `sensitivity_level` value exists that could carry it |
| **Account deletion mismatch** | Memory outlives the account because the deletion function was not updated | `ON DELETE CASCADE` from `auth.users` on all three tables, **plus** explicit deletes in `supabase/functions/delete-account/index.ts` added in the same change that creates the tables, plus a gate item that blocks release until both exist |
| **Consent drift** | Copy changes and old rows silently inherit new meaning | `consent_version` is stored on every item and on the consent row; a version change re-prompts and does not retroactively widen what may be read |
| **Kill-switch bypass** | Memory keeps being read during an incident | The kill switch is a server-side flag checked before the access function is called, and `disabled_at` on the consent row is the persistent equivalent. Neither requires a deploy or a migration |

## 3. Consent and deletion behaviour

| State or action | What happens to writes | What happens to reads | What happens to stored rows |
| --- | --- | --- | --- |
| **Memory off** (default, or no consent row) | Nothing is written | Nothing is read; companion behaves exactly as today | Untouched. Off is not delete |
| **Turning memory on** | Writes allowed for the enabled categories only, from the next explicit action | Reads allowed for the enabled categories only | Nothing is created by the act of turning it on |
| **Pausing memory** | Stopped | Stopped | Untouched and still listed, with one-tap resume |
| **Deleting one memory** | Not applicable | That item leaves AI context on the very next request | `deleted_at` set. Excluded from every read path. Purged on the retention schedule |
| **Deleting all memory** | Not applicable | All items leave AI context immediately | All rows soft-deleted, one `deleted_all` event with a count. Journal, journeys and account are untouched, and the copy says so |
| **Account deletion** | Not applicable | Not applicable | Cascade from `auth.users`, plus explicit deletes in `delete-account`, plus an anonymised or deleted event trail per the account deletion policy. Verified by a test before release |
| **Export** | Not applicable | Not applicable | Later phase. Memory joins the existing account export path when one exists, as labelled items with their categories and dates |
| **Disabled memory** | Blocked for that item | Excluded | Retained; a system-side state, distinct from the person's own pause |
| **Expired memory** | Not applicable | Excluded from the moment `expires_at` passes, without waiting for a sweep | Swept to soft-deleted on a schedule; the read filter does not rely on the sweep having run |
| **Consent version change** | Blocked for categories whose copy changed, until the person re-confirms | Continues only for items whose stored `consent_version` is still valid under the change | Untouched; a re-confirm updates the version, it does not rewrite items |

Non-negotiables:

- Pausing stops future use. It does not delete.
- Deleting removes the item from AI context immediately, on the next request, with no cache to wait out.
- Account deletion must delete or anonymise memory according to the account deletion policy in force, and the check belongs in the same change as the tables.
- Deleted memory is never passed to the model, in any mode, under any level, for any reason.

## 4. Edge function access design

Design only. No function is created or changed in this phase.

1. **Never from the browser.** Client code never selects memory to build a prompt. The settings surface reads a person's own items for display; that is a different path and never feeds the model.
2. **Authenticate first.** The function verifies the JWT and derives the user id from it. A user id in the request body is never trusted and never used.
3. **One access module.** A single named module owns memory retrieval. Every AI function imports it. Direct table access from anywhere else is a review failure.
4. **Consent before selection.** The consent row is read first. `memory_level = 'off'`, a set `paused_at`, a set `disabled_at`, or no row at all, all short-circuit to no memory, with no further query.
5. **Filter set, always.** `deleted_at IS NULL`, `disabled_at IS NULL`, `expires_at` in the future, journey matches the current journey or `general`, category enabled by consent.
6. **Journey and mode scoped.** A first-year request never sees trying-to-conceive memory. Modes that already restrict wording keep those restrictions; memory unlocks nothing.
7. **Explicit field selection.** Only `memory_type`, `user_visible_label` and `value` leave the module. The record is never spread, serialised or forwarded, exactly as `pregnancyAiContext.ts` requires today.
8. **Inside the existing budget.** Memory shares the existing 500-character context cap with route context, it does not extend it. When the budget is tight, memory is dropped first, then continuity, then journey state, with preferences last.
9. **Never category F.** No path retrieves it, because no path can store it.
10. **Never journal or reflection content**, unless a separate future reviewed design exists, which it does not.
11. **Kill switch first.** A server-side flag short-circuits retrieval globally before any query runs, without a deploy or a migration.
12. **Log hygiene.** The module logs a count and a category list at most. Never a value, never a label, never the question.

## 5. Data validation rules

Write-time validation, applied in the edge function for a kind message and re-applied in the database trigger as the real boundary.

- **Length.** `value` 1 to 240 characters, `user_visible_label` 1 to 80. Longer input is rejected, never truncated and stored.
- **Enums.** `memory_type`, `journey`, `sensitivity_level` and `source` must be valid enum members and must satisfy the type-to-source and type-to-sensitivity pairings above.
- **Sensitivity classification.** Assigned at write time from the type and the content check. Never asked of the model, never inferred from the conversation.
- **Source validation.** Only `user_setting`, `user_saved` and `journey_setup`. There is no source for conversational capture, so ordinary free-text ingestion from a chat turn is impossible by construction.
- **Category F blocker.** A pattern check over the value and label covering symptoms, bleeding and pain descriptions, loss and termination, fertility treatment, medication names and dosage shapes, diagnosis labels, mental health and self-harm wording, and abuse or safety wording. On a match the write is rejected with a plain message, and a `write_rejected` event is logged with a reason code and no text.
- **No raw journal, reflection, note, log or media content.** No source admits it; no field is sized for it; media paths and URLs are rejected outright.
- **No exact dates.** Due dates, last period dates, birth dates and appointment dates are rejected. Coarse stage only: a week number or a coarse age band, matching what `pregnancyAiContext.ts` already allows. A future approved reason would need its own review, not a config change.
- **No medical values.** Measurements, weights, dosages, test results and readings are rejected.
- **No diagnosis labels.** Conditions and clinical terms are rejected outright, whether or not they read as sensitive in isolation.
- **No identifiers.** No names, no email addresses, no child names or child identifiers, no user ids, no pregnancy or journey ids inside `value`. The companion name preference remains UI copy only, as it is today.
- **Explicit action only.** Every write traces to a deliberate user action: a settings change, a journey setup step, or a per-item save with a visible confirmation of exactly what will be stored. No write happens as a side effect of asking a question, reading an answer or viewing a recap.
- **Row cap.** A per-user live-item cap, checked in the write path and in the trigger, so memory cannot grow into a store.

## 6. Review checklist before any migration is authored

Every item must be complete and recorded. A failed item blocks the migration, not just the release.

- [ ] Privacy and legal review of memory as special category data completed and recorded in writing
- [ ] Consent copy approved and a consent version string agreed
- [ ] Schema reviewed: tables, columns, types, defaults, nullability and row caps
- [ ] Enums reviewed, including the deliberate absence of journal, conversation, inferred and category F members
- [ ] Constraints and indexes reviewed, including the partial unique index and the expiry index
- [ ] Grants reviewed: no anon grant, no client `DELETE` grant, `service_role` justified per table
- [ ] RLS policies reviewed as owner-scoped, with grants written in the same migration
- [ ] Service-role access path reviewed: one named access module, no direct table reads elsewhere
- [ ] Account deletion behaviour reviewed and joined to `supabase/functions/delete-account/index.ts` in the same change
- [ ] Export behaviour reviewed alongside the person's other data
- [ ] Audit logging reviewed: allowed metadata keys only, no values, labels, questions, answers or health content
- [ ] Sensitive content blocker designed, with the pattern list reviewed and a plain rejection message approved
- [ ] Journal, reflection and media exclusion confirmed structural, not merely a flag
- [ ] Memory evaluation tests written for the eleven scenarios in `eval-dataset-v1.md`
- [ ] Memory-off kill switch designed, global, effective without a deploy or a migration
- [ ] Rollback plan written and possible without a migration
- [ ] No real user data in any test; every case synthetic
- [ ] The migration itself reviewed separately, as its own change, after every item above passes

## 7. Open questions for the reviewer

Recorded rather than resolved, because each needs a decision from outside this document.

1. Retention period for `ai_memory_events`, and whether the activity log is user-visible from the start.
2. Whether soft-deleted items are purged on a schedule or immediately, and how that interacts with the audit trail.
3. Whether `journey_state` earns its place at all, given route-derived context already covers the same ground.
4. Whether the consent version is a single string or a per-category version.
5. How a stage change that follows a loss clears journey memory without ever asking why.
