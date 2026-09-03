# Phase 29J — explicit saved-memory MVP pre-build gate

## Status

**NOT READY FOR IMPLEMENTATION.**

This document records the outcome of a pre-build review. No migration, schema, table, RLS policy, edge function, application code, route, SEO change or AI behaviour change has been made. The companion still has no memory. The gate is held open by genuine blockers that must be closed before any code is written.

The MVP scope is deliberately narrow: Category A explicit preferences and Category C explicit user-saved preferences only, written by a deliberate save action, visible to the user, behind a feature flag, and not passed into any AI request until a later separately approved phase.

> **AIC-3 note.** The memory mechanism has since been built behind two feature flags
> (`VITE_COMPANION_MEMORY_ENABLED` for the interface, `AI_MEMORY_ENABLED` for retrieval and
> injection). **This gate is not closed by that work.** The blockers below, including the
> external legal and privacy review, remain outstanding, and memory stays off until they are
> resolved. See `docs/ai/companion-memory.md`.

## 1. Files changed

- `docs/ai/memory-mvp-readiness.md` (new)
- `docs/ai/roadmap.md`
- `docs/ai/release-gate.md`
- `docs/ai/README.md`

No source, schema, migration, route, SEO or sitemap file was touched.

## 2. Gate review summary

Phase 29J is a planning gate, not an implementation phase. Its purpose is to confirm whether the full memory gate in `release-gate.md` can be satisfied before building begins. The review outcome is that several mandatory gate items remain outstanding.

The memory gate items from `release-gate.md` section H were checked against the current state:

- Legal and privacy review of memory as special category data — **OUTSTANDING**
- Consent copy approved, with a consent version recorded — **OUTSTANDING**
- Sensitivity taxonomy approved, including category F exclusion — **DESIGN APPROVED** in `memory-design.md`, **REVIEW NOT RECORDED**
- Memory off by default, opt-in separate from account creation and analytics — **DESIGN APPROVED**, **NOT BUILT**
- Journal/reflection/media separate toggle, default off — **DESIGN APPROVED**, **NOT BUILT**
- Deletion wired into account deletion in the same change — **DESIGNED**, **NOT BUILT**
- Export behaviour specified — **DESIGNED**, **NOT BUILT**
- Schema and RLS reviewed against `memory-schema-rls-design.md` — **DESIGN REVIEW COMPLETE**, **MIGRATION REVIEW CANNOT HAPPEN YET**
- Service-role access path reviewed — **DESIGNED**, **NOT BUILT**
- Deleted, disabled, paused and expired memory excluded from reads — **DESIGNED**, **NOT BUILT**
- Category F and journal content blocked structurally — **DESIGNED**, **NOT BUILT**
- Migration reviewed separately — **CANNOT PROCEED UNTIL MIGRATION DRAFT EXISTS**
- Audit logging approach reviewed — **DESIGNED**, **NOT BUILT**
- No real user data in testing — **HOLDS TODAY**, must be re-asserted at build
- Memory evaluation prompts added and passing — **SCENARIOS IN PROSE ONLY**, not dataset rows
- Rollback plan defined, possible without migration — **DESIGNED**, **NOT BUILT**
- Memory-off kill switch defined and tested — **DESIGNED**, **NOT BUILT**
- Incident process updated — **NOT YET UPDATED**
- Companion cannot write memory from conversation — **DESIGNED**, **NOT BUILT**

The gate is **not satisfiable today**. Implementation must not begin.

## 3. Blockers before implementation

The following blockers must be closed before any migration or code is written:

1. **Recorded privacy and legal sign-off.** Memory will hold personal and health-adjacent data. A recorded review of memory as special category data is required, with the outcome written into this document or a linked record.
2. **Signed-off consent copy with a recorded version string.** The prototype copy in `memory-design.md` and `memory-settings-prototype.md` is a draft. Final, approved copy must exist, and the version string that will be stored against every item must be fixed before the first write path is built.
3. **Memory evaluation rows currently exist as prose only.** The eleven scenarios in `eval-dataset-v1.md` must become real rows in `eval-dataset-v1.json` or a new `eval-dataset-memory-v1.json`, with deterministic checks, before the build phase closes.
4. **Migration review cannot happen until a migration draft exists.** This is a procedural blocker, not a design flaw. It will be resolved naturally by 29J.1, but 29J.1 must not start until the first three blockers are closed.

Secondary but mandatory items that can be completed during the build phase itself, provided the four blockers above are closed first:

- Build and test the memory-off kill switch.
- Update `observability-and-incidents.md` with memory-specific severities.
- Confirm account deletion wiring in the same change as the tables.

## 4. MVP scope

The smallest slice that would be useful and safe to ship once the gate closes:

### Included

- **Category A — explicit preferences.** Companion tone, answer length preference, British wording/units preference. These are low-sensitivity, structured choices already surfaced in settings today. A chosen companion name remains UI copy only and is never sent as context.
- **Category C — user-saved preferences.** Short factual preferences saved by a deliberate per-item action, such as "prefers gentle reminders" or "wants practical next steps". Only low to medium sensitivity; sensitive patterns are rejected.
- **User-visible saved items only.** Every item appears in memory settings with its label, category, journey and added date.
- **Explicit save action only.** Nothing is saved automatically, inferred, or captured from a conversation. The save action shows a plain confirmation of what will be stored.
- **Per-item edit, delete and delete-all.** Immediate effect for the next AI request.
- **Pause memory.** Stops reads and writes without deleting anything, with one-tap resume.
- **Feature flag, default off.** No memory is written or read unless the flag and the user's own consent are both on.
- **Journey scoping.** Items belong to `general` or a specific journey; cross-journey leakage is blocked by design.

### Deliberately not in the MVP

- Category B journey state is not included. Route-derived context already handles stage awareness, and adding journey-state memory raises loss and transition questions that are out of scope for this first slice.
- Category D continuity is not included. It requires expiry handling and adds complexity without a clear user need at this stage.
- Category E journal content is not included and has its own separate toggle pinned off.
- Category F sensitive content is not included and is structurally rejected.

## 5. Excluded memory types

The following are explicitly out of scope for the MVP and for the whole approved roadmap unless a new review approves them separately:

- Persisted chat history or conversation transcripts.
- Verbatim or derived journal, reflection, note, log or media content.
- Category F content: symptoms, bleeding or pain descriptions, loss, miscarriage, stillbirth, termination, fertility treatment details, medication, diagnosis labels, mental health or self-harm terms, domestic abuse or safety concerns, baby health concerns.
- Voice memory, voice transcription, or audio retention.
- Retrieval-augmented generation over stored memory.
- Vector search or embeddings over memory.
- Start of You article grounding via memory.
- Proactive nudges or reminders derived from memory.
- Partner or family shared memory.
- Agentic actions taken from memory.
- Any inferred profiling, health verdict, diagnosis or risk score.

## 6. Feature flag plan

A single server-side feature flag, `memory_mvp_enabled`, controls whether the memory surfaces are reachable at all.

### Flag behaviour

- **Default: false.** The companion behaves exactly as it does today. No memory settings entry point is visible. No save action is offered. No read path exists.
- **When true.** Signed-in users who have passed the consent flow can see memory settings, save preferences, and have those preferences read by the companion within the existing 500-character context cap.
- **Kill switch.** A separate `memory_reads_disabled` flag, checked before any memory retrieval query, can disable memory reads globally without a deploy or migration. This is independent of the feature flag and is the incident response path.

### Rollback

If a problem is detected after rollout, the first response is the kill switch (`memory_reads_disabled`). The second response is flipping the feature flag off. Neither requires a migration. Model or prompt version rollbacks follow the existing `versioning.md` rules.

## 7. Migration-readiness checklist

This checklist must be complete before a migration draft is written. Items marked OUTSTANDING block the migration.

- [ ] Privacy and legal review completed and recorded in writing.
- [ ] Consent copy approved and the consent version string agreed.
- [ ] Schema reviewed: `public.ai_memory_items`, `public.ai_memory_consents`, `public.ai_memory_events`, including columns, types, defaults, nullability and row caps.
- [ ] Enums reviewed, including the deliberate absence of `journal`, `conversation`, `inferred` and category F members.
- [ ] Constraints and indexes reviewed, including the partial unique index and the expiry index.
- [ ] Grants reviewed: no `anon` grant on memory tables, no client `DELETE` grant, `service_role` justified per table.
- [ ] RLS policies reviewed as owner-scoped, with grants written in the same migration.
- [ ] Service-role access path reviewed: one named access module, no direct table reads elsewhere.
- [ ] Account deletion wiring reviewed and joined to `supabase/functions/delete-account/index.ts` in the same change.
- [ ] Export behaviour reviewed alongside the person's other data.
- [ ] Audit logging reviewed: allowed metadata keys only, no values, labels, questions, answers or health content.
- [ ] Sensitive content blocker designed, pattern list reviewed, and plain rejection message approved.
- [ ] Journal, reflection and media exclusion confirmed structural, not merely a flag.
- [ ] Memory-off kill switch designed, global, effective without a deploy or migration.
- [ ] Rollback plan written and possible without a migration.
- [ ] No real user data in any test; every case synthetic.
- [ ] The migration itself reviewed as its own change, after every item above passes.

## 8. UI-readiness checklist

The Phase 29I prototype already demonstrates the intended settings surface. Before implementation, the following must be true:

- [ ] Final copy approved and versioned, including consent, save confirmation, pause, delete, delete-all and error messages.
- [ ] Memory settings entry point placement agreed (account settings, companion menu, or both).
- [ ] Save action design agreed: where it appears, what it stores, and the confirmation shown.
- [ ] Empty, paused, off and populated states designed.
- [ ] Mobile design at 390px: readable measure, 44px tap targets, no overflow.
- [ ] Keyboard and screen-reader behaviour preserved: labelled switches, visible focus, semantic headings.
- [ ] Sensitive memory shown as unavailable and switchless, not merely disabled.
- [ ] Journal boundary card shown with no toggle.
- [ ] Companion cannot write memory from a conversation; the only save paths are explicit.

## 9. AI-readiness checklist

Before memory is passed into any AI request, the following must be true:

- [ ] Memory context builder follows the same explicit-field pattern as `pregnancyAiContext.ts`.
- [ ] Only category A and category C items are read, and only when the feature flag and user consent are both on.
- [ ] Memory shares the existing 500-character context cap; it does not extend it.
- [ ] Route context is still the primary source; memory is dropped first if the budget is tight.
- [ ] Deleted, disabled, paused and expired memory is excluded from every read path.
- [ ] Category F content is never sent because it is never stored.
- [ ] Journal and reflection content is never sent because it has no representation.
- [ ] Memory is not sent in recap-only or other non-clinical modes.
- [ ] Companion never narrates memory awkwardly or claims to remember everything.
- [ ] "What do you remember about me?" can be answered honestly from the live item list.
- [ ] "Forget that" deletes or corrects the item and confirms plainly.
- [ ] Kill switch disables memory reads globally without a deploy.

## 10. Evaluation requirements

The memory evaluation must be written before the build phase closes. It must cover at least the following scenarios, derived from `eval-dataset-v1.md` and `memory-design.md`:

1. Memory off: no memory is read or sent.
2. Asking "what do you remember about me?" when memory is off.
3. Asking to forget something when nothing is saved.
4. Saving a category A preference with explicit action.
5. Saving a category C user-saved fact with explicit action.
6. Attempting to save category F content and receiving a plain rejection.
7. Sharing journal-like content and confirming it is not stored.
8. Asking for a verdict using remembered context and confirming no health verdict is produced.
9. Deleting one memory and confirming it is no longer used.
10. Cross-journey leakage: first-year request does not see TTC memory.
11. Reuse of deleted memory: deleted item is not returned.
12. Feature flag off: no memory path is reachable.
13. Kill switch on: memory reads disabled globally.
14. Pause: stored items are not read while paused.

Each scenario needs at least one deterministic check that does not require calling the model, plus model-graded checks for tone and banned-phrase hygiene where appropriate.

## 11. Recommended implementation sequence

Once the gate closes, build in this order. Do not start 29J.1 until the blockers in section 3 are resolved.

### 29J.1 — migration and schema

- Write the migration that creates `public.ai_memory_items`, `public.ai_memory_consents` and `public.ai_memory_events` exactly as designed in `memory-schema-rls-design.md`.
- Include enums, constraints, indexes, grants and owner-scoped RLS policies in the same migration.
- Add the validation trigger that rejects category F, conversation-sourced, inferred or journal-derived writes.
- Add `ON DELETE CASCADE` from `auth.users`.
- Add the single controlled memory access function.
- Review the migration as its own change.
- No application code or AI behaviour change in this phase.

### 29J.2 — memory writes and settings persistence

- Build the backend write path: explicit save, edit, soft delete, delete-all, pause.
- Build the settings UI persistence, using the approved copy and version string.
- Wire per-item and delete-all actions.
- Ensure the companion still does not read memory in this phase; the read path is stubbed or absent.

### 29J.3 — memory read path behind feature flag

- Build the access module that retrieves live memory for the current journey only.
- Connect the access module to the companion context builder, behind the feature flag and the kill switch.
- Keep memory inside the 500-character cap.
- Add the "what do you remember about me?" response path.
- No journal, no category F, no conversation capture.

### 29J.4 — memory eval harness and controlled rollout

- Convert the evaluation scenarios into dataset rows and deterministic checks.
- Run the harness against the built code.
- Update `observability-and-incidents.md` with memory-specific severities.
- Conduct controlled rollout behind the feature flag with the kill switch live.

## 12. Docs updated

The following documents were updated to reflect the Phase 29J pre-build gate:

- `docs/ai/README.md` — added `memory-mvp-readiness.md` to the contents table and the closed phases list.
- `docs/ai/roadmap.md` — rewrote Phase 29J as a pre-build gate, added 29J.1 to 29J.4 as future sub-phases, and recorded that 29J.1 and 29K are not started.
- `docs/ai/release-gate.md` — added a status note at the top of section H confirming the gate is not yet satisfiable and pointing to this document.

## 13. Validation result

Checks run on the repository after the documentation changes:

- `npm run typecheck` — pass.
- `npm run build` — pass.

No tests were required because no application files or JSON datasets changed.

## 14. Risks and remaining gaps

| Risk | Mitigation | Status |
| --- | --- | --- |
| Legal/privacy review delays build. | Scheduled as the first blocker. No code until recorded. | Outstanding |
| Consent copy drift between prototype and final. | Fix a version string and store it on every item. | Outstanding |
| Category F pattern blocker is too broad or too narrow. | Define the pattern list with clinical and legal input; test near-miss cases. | Outstanding |
| Service-role code bypasses RLS. | Use one named access module; review every function for direct table reads. | Designed, not built |
| Journey-state memory added prematurely. | Exclude category B from the MVP; revisit after the first slice is stable. | Controlled |
| Journal toggle quietly widened later. | Pin `journal_content_enabled = false` by constraint; require a separate design review to change. | Controlled |
| Feature flag leaks memory to AI when toggled on without kill switch. | Build kill switch first, before any read path connects to the companion. | Controlled |
| Evaluation scenarios remain prose only. | Convert to dataset rows as part of 29J.4 exit criteria. | Outstanding |
| Account deletion misses memory tables. | Add explicit deletes in the same change as the tables; gate release on a test. | Designed, not built |
| Rollback depends on a deploy. | Kill switch and feature flag both avoid migration; document the exact rollback order. | Designed, not built |

## 15. Whether Phase 29J can move to implementation

**No.**

Phase 29J cannot move to implementation until the following are complete:

1. Recorded privacy and legal sign-off for memory as special category data.
2. Signed-off consent copy with a fixed version string.
3. Memory evaluation scenarios converted from prose to dataset rows with deterministic checks.
4. Migration review performed on an actual migration draft (which requires 29J.1 to be written, and 29J.1 must not start until 1-3 are closed).

Once those four items are closed, 29J.1 can begin. Until then, this gate remains open and no memory persistence, read, write or AI connection is added to the product.
