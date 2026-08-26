# Memory Gate Evidence Pack

## What this document is

This is a structured review pack for a privacy/legal reviewer and an internal product reviewer. It is **not implementation**. It is **not legal approval**. It does not create any code, schema, table, migration, RLS policy, edge function, route, SEO entry or application behaviour.

The companion currently has no memory. No memory is being written. No memory is being read. No memory is passed to the AI. Nothing in this document starts that work.

## 1. Product summary of the proposed explicit saved-memory MVP

The smallest useful memory slice, to be built only after the gate closes, is a user-controlled preference store:

- **Category A — explicit preferences.** Low-sensitivity structured choices the person already makes in settings: companion tone, answer length, British wording and units. A chosen companion name stays UI copy only and is never sent to the model.
- **Category C — user-saved preferences.** Short factual preferences saved one at a time by a deliberate action, such as "prefers gentle reminders" or "wants practical next steps".
- **Explicit save only.** Nothing is captured from a conversation, inferred from behaviour, or saved automatically.
- **User-visible.** Every saved item appears in memory settings with its label, category, journey and added date.
- **Editable and deletable.** Per-item edit, per-item delete, delete-all, and pause/resume.
- **Behind a feature flag.** Default off. The product behaves exactly as it does today unless the flag and the person's own consent are both on.
- **Not sent to AI in the MVP.** The MVP covers only write, settings and delete. AI reads would follow in a later separately approved sub-phase (29J.3).

## 2. What memory would allow later

If the gate closes and the MVP ships safely, later phases could consider:

- Slightly richer answer personalisation from explicit preferences (tone, length, style).
- A "what does my companion remember about me?" viewer.
- Journey-aware retrieval so a first-year request does not see trying-to-conceive preferences, and vice versa.
- Optional continuity with a short expiry, if a separate design review approves it.

None of these are approved or designed in detail. The roadmap explicitly leaves them for future phases.

## 3. What is explicitly excluded

The MVP and the whole approved roadmap exclude:

- Persisted chat history or conversation transcripts.
- Verbatim or derived journal, reflection, note, log or media content.
- Category F health, fertility and safety-sensitive content: symptoms, bleeding or pain, loss, miscarriage, stillbirth, termination, fertility treatment details, medication, diagnosis labels, mental health or self-harm terms, domestic abuse or safety concerns, baby health concerns.
- Voice memory, voice transcription, or audio retention.
- Retrieval-augmented generation over stored memory.
- Vector search or embeddings over memory.
- Start of You article grounding via memory.
- Proactive nudges or reminders derived from memory.
- Partner or family shared memory.
- Agentic actions taken from memory.
- Inferred profiling of any kind.
- Any use of memory to produce a verdict, diagnosis or risk score.

## 4. The current blockers from Phase 29J

Phase 29J closed as a pre-build readiness review. It confirmed that the gate is not yet satisfiable. The blockers are:

1. **Recorded privacy and legal sign-off.** Memory will hold personal and health-adjacent data. A recorded review of memory as special category data is required.
2. **Signed-off consent copy with a recorded version string.** The copy below is a draft. Final, approved copy must exist, and the version string stored against every item must be fixed before the first write path is built.
3. **Memory evaluation rows currently exist as prose only.** The eleven scenarios in `eval-dataset-v1.md` must become real dataset rows with deterministic checks before the build phase closes.
4. **Migration review cannot happen until a migration draft exists.** This is procedural and resolves during 29J.1, which must not start until blockers 1-3 are closed.

## 5. The consent copy that needs review (draft only)

All copy below is a **draft** awaiting review and sign-off. It must not be treated as approved language.

### Memory off, the default

> Right now your companion starts fresh every time. It does not keep anything you type, and it does not build a picture of you in the background. You can change that whenever you like, and change it back.

### Turning on basic memory

> If you turn this on, your companion can keep a few small preferences, like how you want it to sound and whether you prefer short answers. That is all it keeps at this level. You can see the list, change it, or clear it at any point.

### Saving an individual memory

> Would you like your companion to keep this? It will be saved as: "prefers gentle reminders". You will find it in your memory settings, and you can edit or remove it whenever you want.

### Using journey context (not in MVP)

> Your companion can use where you are in your journey, such as your week or your baby's age, so answers fit the chapter you are in. It uses the stage only. It does not keep your dates, your notes or anything you have written privately.

### Deleting memory

> This clears everything your companion has kept. Your journal, your journeys and your account stay exactly as they are. Your companion will simply start fresh from here.

### Pausing memory

> Pausing stops your companion adding anything new and stops it using what it already has. Nothing is deleted while it is paused, and you can pick it back up whenever you are ready.

### Journal not used by default

> Your journal, reflections, photos and voice notes are yours. Your companion does not read them, and it will not use them in answers unless you ask it to with the separate switch below.

### Sensitive information notice

> Some things are better not stored. Your companion does not keep details about symptoms, treatment, loss, medication or how you are coping, even if you mention them in a conversation. If you need support with any of that, it will be gone when you close the conversation.

### When a save is declined

> This is not something your companion keeps. Nothing has been saved. You can carry on talking about it here, and it will be gone when you close the conversation.

## 6. The proposed consent versioning approach

- A single consent version string is recorded on every saved memory item and on the consent row itself.
- The version is bumped only when the approved copy materially changes.
- A material change invalidates writes for the affected categories until the person re-confirms.
- The version string is short, opaque and stable, for example `memory-v1-2026-08-26`.
- No retroactive rewrite of existing items happens when the version changes; instead, the affected items stop being read until re-confirmed.

## 7. The data categories involved

### MVP categories only

| Category | Examples | Sensitivity | Source |
| --- | --- | --- | --- |
| A. Explicit preferences | Tone, answer length, British wording/units | Low to medium | User setting |
| C. User-saved preferences | "Prefers gentle reminders", "wants practical next steps" | Low to medium | Explicit per-item save |

### Not involved in the MVP

| Category | Why it is excluded |
| --- | --- |
| B. Journey state | Route-derived context already handles stage awareness; loss and transition questions need a separate review |
| D. Continuity | Expiry handling adds complexity without a clear user need in the first slice |
| E. Journal and reflections | Separate toggle pinned off; no representation in the schema |
| F. Health, fertility and safety-sensitive content | Structurally unstorable; no enum member, no source value, no on switch |

## 8. The technical controls already designed

The following are designed in `memory-design.md` and `memory-schema-rls-design.md`. Nothing is built yet.

- **Owner-scoped RLS.** Every policy filters by `auth.uid() = user_id`. No anon policy. No cross-user policy.
- **No client `DELETE` grant.** Deletion is a soft delete via `UPDATE` of `deleted_at`, so it can be audited.
- **Structural exclusion of category F.** The `ai_memory_type` enum has no `health` or `sensitive` member. The `ai_memory_source` enum has no `conversation` or `inferred` member. A database trigger rejects matching patterns.
- **Structural exclusion of journal content.** No source value admits journal text; `journal_content_enabled` is pinned false by constraint.
- **Single controlled read function.** `public.ai_memory_for_context` is the only path for AI retrieval; direct table reads from edge functions are a review failure.
- **Service-role access module.** Future functions read memory through one named module, never by selecting the table directly, because service role bypasses RLS.
- **Kill switch.** A server-side flag can disable memory reads globally without a deploy or migration.
- **Feature flag.** `memory_mvp_enabled`, default false, gates whether any surface is reachable.
- **Context cap.** Memory shares the existing 500-character cap with route context; it does not extend it.
- **Row cap and length caps.** Per-user live-item cap and hard caps on `value` (240) and `user_visible_label` (80) prevent memory becoming a document store.
- **Account deletion wiring.** `ON DELETE CASCADE` plus explicit deletes in `supabase/functions/delete-account/index.ts`, added in the same change as the tables.
- **Audit logging with no content.** Events record that something happened, not what was said. No value, label, question, answer or health content in logs.

## 9. Deletion, pause and export expectations

| Action | Effect on reads | Effect on stored rows |
| --- | --- | --- |
| Delete one item | Item leaves AI context on next request | `deleted_at` set; excluded from every read path |
| Delete all memory | All items leave AI context immediately | All rows soft-deleted; journal, journeys and account untouched |
| Pause memory | All reads and writes stopped | Rows untouched; one-tap resume |
| Turn memory off | Reads and writes stopped for that level | Rows untouched; deletion is a separate action |
| Account deletion | Not applicable | Cascade from `auth.users` plus explicit delete in account-deletion function |
| Export | Not applicable | Later phase; memory joins the account export as labelled items with categories and dates |

## 10. The AI usage boundary

- The companion never silently remembers anything from a conversation.
- Memory is written only by explicit user action: a settings change, a journey setup step, or a per-item save.
- Memory is read only through the single controlled access function, only when the feature flag and consent are on, and only for the current journey or `general`.
- Deleted, disabled, paused and expired memory is excluded from every read path.
- Category F content is never sent because it is never stored.
- Journal and reflection content is never sent because it has no representation.
- Memory does not unlock wording that existing non-clinical modes forbid.
- The companion never says "I remember everything" or implies a complete picture of the person.
- "What do you remember about me?" is answered honestly from the live item list.
- "Forget that" deletes or corrects the item and confirms plainly.

## 11. The Category F exclusion

Category F is health, fertility and safety-sensitive content. It is not merely "off by default"; it is structurally unstorable.

- The `ai_memory_type` enum has no member for health or sensitive content.
- The `ai_memory_sensitivity` enum has no value above `sensitive`, and journey state is the only type that can reach `sensitive`.
- The `ai_memory_source` enum has no `conversation`, `inferred`, `journal` or `import` member.
- A `BEFORE INSERT OR UPDATE` trigger rejects values matching a pattern list covering symptoms, bleeding, pain, loss, fertility treatment, medication, diagnosis labels, mental health, self-harm, abuse and baby health concerns.
- The rejection message is plain and kind: "This is not something your companion keeps."
- A `write_rejected` audit event is logged with a reason code, never the rejected text.

## 12. The journal/reflection exclusion

- Journal entries, reflections, photos, videos and voice notes are not used for memory by default.
- A separate `journal_content_enabled` toggle exists in the consent design but is pinned false by a database constraint.
- There is no `memory_type` or `source` value that admits journal-derived content, even for a derived or hashed form.
- No verbatim journal text, no summary of journal entries, no sentiment score, no embedding of private writing is designed or permitted.
- The journal boundary card in the settings UI has no toggle in the MVP.

## 13. The service-role over-read risk

This is the single largest technical risk in the design.

**Risk.** Edge functions use the Supabase service role, which bypasses RLS. A future function could accidentally `select * from ai_memory_items` to "enrich" an answer, exposing another person's data.

**Mitigation.**

- Service-role code reads memory only through one named access module.
- That module derives the user id from a verified JWT, never from a request body.
- It applies the same consent, live-row, journey, expiry and category filters as the RLS path.
- It returns at most the capped projection (`memory_type`, `user_visible_label`, `value`) for the current journey.
- Direct table reads from edge functions are a release-blocker at review.
- A negative test asserting that no memory table name appears outside the access module belongs in the evaluation phase.

## 14. Reviewer questions

Questions for the privacy/legal reviewer:

1. Is the proposed category A and C scope acceptable as a first memory slice, given the structural exclusion of category F and journal content?
2. Does the draft consent copy meet the standard for explicit, granular and reversible consent for special category health data?
3. Is the proposed consent version string and re-consent behaviour sufficient?
4. Are the proposed retention limits (continuity in days, preferences on monthly review, journey state cleared on stage change) appropriate?
5. Does the account-deletion wiring plan, including cascade and explicit delete, meet deletion requirements?
6. Is the audit-log metadata approach (no values, labels, questions or answers) acceptable?
7. Should the activity log be user-visible from launch, or deferred?

Questions for the internal product reviewer:

8. Does the MVP solve a real user problem without the higher-risk categories?
9. Is the explicit-save-only UX acceptable, given it deliberately does not auto-capture anything?
10. Should category B journey state be added to the MVP, or kept out as designed?
11. Is the feature-flag-and-kill-switch rollout plan sufficient for a staged release?

## 15. Sign-off checklist

Before any migration or code is written, the following must be signed off and recorded:

- [ ] Privacy and legal review of memory as special category data, recorded in writing.
- [ ] Consent copy approved and the consent version string agreed.
- [ ] Sensitivity taxonomy approved, including category F exclusion.
- [ ] MVP scope approved: category A and category C only; no category B, D, E or F in the MVP.
- [ ] Structural exclusion of category F and journal content confirmed acceptable.
- [ ] Deletion, pause and account-deletion behaviour approved.
- [ ] Service-role access module approach approved.
- [ ] Feature flag and kill switch approach approved.
- [ ] Memory evaluation scenarios approved as the basis for the dataset.
- [ ] Clear statement recorded that implementation remains blocked until this checklist is complete.

## 16. Implementation remains blocked

**This is not implementation. This is not legal approval. Memory is not active, not being written, not being read, and not passed to the AI.**

The companion still has no memory. Phase 29J.1 (migration and schema) must not begin until the sign-off checklist in section 15 is complete and recorded. Until then, the memory gate stays open and no memory persistence, read, write or AI connection is added to the product.
