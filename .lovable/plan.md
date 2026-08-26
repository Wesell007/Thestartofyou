# Phase 29H — Memory Schema and RLS Design Review

Documentation-only phase. No tables, no migrations, no RLS policies, no application code, no UI, no memory behaviour. Nothing in the running product changes.

## What gets created

**`docs/ai/memory-schema-rls-design.md`** — a single implementation-ready design document covering:

1. **Scope and non-goals** — restates the 29G boundary: Category F (health, fertility, safety-sensitive) excluded entirely; journal and reflection content off by default and unbuildable until a separate design exists; no chat history, no voice, no RAG, no grounding, no partner mode.

2. **Proposed tables (design only)**
   - `ai_memory_items` — user-visible remembered items: `id`, `user_id`, `memory_type`, `journey`, `sensitivity_level`, `source`, `value`, `user_visible_label`, `consent_version`, `created_at`, `updated_at`, `review_at`, `expires_at`, `disabled_at`, `deleted_at`.
   - `ai_memory_consents` — one row per user: `memory_level`, the five per-category enable flags, `consent_version`, timestamps, `disabled_at`. Memory off by default; `sensitive_memory_enabled` and `journal_content_enabled` pinned false in this design.
   - `ai_memory_events` — audit log: `id`, `user_id`, `memory_item_id`, `event_type`, `event_source`, `created_at`, `metadata` (summary only, never the raw value, never prompts or transcripts).

3. **Enums and constraints** — proposed enum values for `memory_type`, `journey`, `sensitivity_level`, `source`, `memory_level` and `event_type`; value length caps; required `user_id`; soft-delete semantics; a write-time Category F blocker; a blocker on journal/reflection sources; uniqueness and default rules.

4. **RLS design** — draft pseudo-SQL policies inside the document only (owner-scoped select/insert/update/soft-delete, no anonymous access, no cross-user access, no partner or child access, deleted and disabled rows excluded by default, service-role reads only through controlled functions later), plus the grant block that a future migration would need to carry.

5. **RLS threat model** — cross-user read, cross-user update, accidental service-role over-read, deleted memory reuse, disabled memory reuse, journal content leakage, sensitive content insertion, account deletion mismatch. Each with the control that prevents it.

6. **Consent and deletion behaviour** — memory off, turning on, pausing, delete one, delete all, account deletion, export later, disabled, expired, consent version changes. Explicit rules: pausing stops use but keeps records; deletion removes from AI context immediately; deleted memory is never passed to the model; account deletion must delete or anonymise per the future account deletion policy.

7. **Edge function access design** — server-side only, after authentication, consent checks before selection, deleted/disabled/expired filters, journey and mode scoping, memory capped inside the existing 500-character context budget and dropped first when the budget is tight, never Category F, never journal content.

8. **Write-time validation rules** — length limits, enum validation, sensitivity classification, source validation, Category F blocker, no raw journal or media content, no exact dates without a future approved reason, no medical values, no diagnosis labels, no child identifiers, no free-text ingestion from ordinary conversation. Writes only from explicit user action.

9. **Pre-migration review checklist** — privacy/legal review, consent copy approval, schema review, RLS review, account deletion behaviour, export behaviour, audit logging, sensitive content blocker, eval tests, memory-off kill switch, rollback plan, no real user data in tests, and separate review of the migration itself.

## Documents updated

- `docs/ai/privacy-notes.md` — point the memory preconditions at the new schema design.
- `docs/ai/release-gate.md` — extend the memory gate so schema, RLS and deletion review are explicit gate items.
- `docs/ai/roadmap.md` — 29H pending validation during the work, closing only once the design document is complete and validation passes; 29I to 29L unchanged.
- `docs/ai/README.md` — index the new document and update the closed-phase list.

## Validation

`npm run typecheck` and `npm run build`. No tests required — no application files or JSON datasets change.

## Report

Ends with the fifteen-point Phase 29H report. Stops there. Phase 29I is not started.
