Phase 12.5b — database-only foundation for Baby Movement Notes and Contraction Timer. No frontend files change.

## One migration, three tables

### baby_movement_notes
- Columns: `id`, `user_id` → `auth.users(id) ON DELETE CASCADE`, `noted_at`, `pattern_label`, `notes`, `created_at`, `updated_at`.
- Index: `(user_id, noted_at DESC)`.
- Trigger: `BEFORE UPDATE` → `public.set_updated_at()`.

### contraction_sessions
- Columns: `id`, `user_id` → `auth.users(id) ON DELETE CASCADE`, `started_at`, `ended_at`, `notes`, `created_at`, `updated_at`.
- `UNIQUE (id, user_id)` to support the composite FK from events.
- Index: `(user_id, started_at DESC)`.
- Trigger: `BEFORE UPDATE` → `public.set_updated_at()`.

### contraction_events
- Columns: `id`, `session_id`, `user_id` → `auth.users(id) ON DELETE CASCADE`, `started_at`, `ended_at`, `created_at`, `updated_at`.
- Composite FK `(session_id, user_id)` → `contraction_sessions (id, user_id) ON DELETE CASCADE` — prevents attaching an event to another user's session.
- Indexes: `(session_id, started_at)` and `(user_id, started_at DESC)`.
- Trigger: `BEFORE UPDATE` → `public.set_updated_at()`.

## Grants (each table)
- `GRANT SELECT, INSERT, UPDATE, DELETE ... TO authenticated`
- `GRANT ALL ... TO service_role`
- No grants to `anon`.

## RLS (each table)
- `ENABLE ROW LEVEL SECURITY`.
- Four owner-scoped policies: select / insert / update / delete, all using `auth.uid() = user_id` (with matching `WITH CHECK` on insert/update).

## Safety posture
- No fields for kick targets, count goals, safety verdicts, labour status, urgency, diagnosis, or reassurance. These remain notes / timing only.

## Not changed
- No routes, pages, UI, hooks, toolkit hub, My Week, My Journey, sitemap, robots, redirects, AI logic. Coming-soon cards stay non-clickable.

## Verification after apply
- `bunx tsgo --noEmit`.
- Confirm tables, grants, RLS, four policies each, indexes, triggers, and the composite FK.

## Recommended next phase
- Phase 12.5c: Baby Movement Notes hook and UI page (still coming-soon on the hub until 12.5e).

Switch to build mode so I can submit the migration for approval.