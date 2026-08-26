# Phase 29G — Permissioned Memory and Personalisation Design

Documentation and specification only. No application code, no schema, no tables, no RLS, no UI, no memory behaviour is built in this phase.

## What this produces

A single authoritative design document for how the companion could remember things later, plus updates to the existing governance docs so the design is bound into the release process and roadmap.

## Files to create or update

**New: `docs/ai/memory-design.md`** — the full specification, with these sections:

1. **Principles** — permissioned, transparent, editable, deletable, reversible, minimal, journey-aware, off by default for anything sensitive, separate from chat history, journal content and clinical records. Headline rule stated up front: the companion never silently remembers anything from a conversation.
2. **Taxonomy** — six categories (A explicit preferences, B journey state, C user-saved facts, D companion continuity, E private journal and reflections, F health/fertility/safety-sensitive content), each with examples, sensitivity rating, default state, retention expectation and whether it may ever be sent to the model.
3. **Permission model** — five levels: Memory off (default), Basic preferences, Journey context, Saved by me, Sensitive memory (not implemented, gated on future review). Each level defines what can and cannot be saved, where consent appears, how it is turned off, what deletion does, and behaviour when memory is off.
4. **User controls specification** — memory settings section, view/edit/delete-one/delete-all, pause, later export, later activity log, a plain explanation surface, and a separate journal-content toggle that stays off by default. Specified as behaviour and copy requirements, not built.
5. **Consent copy** — plain warm British English drafts for each moment: default-off explanation, turning on basic memory, saving a single item, using journey context, pausing, deleting, journal not used, sensitive-information notice. Avoids the banned phrasing listed in the brief.
6. **Data boundary specification** — the fields a future memory record would need (id, user, type, journey, sensitivity, source, value, timestamps, expiry/review, user-visible label, consent version, deleted_at, disabled_at) described as a contract only, with an explicit note that no migration, table or policy is created here.
7. **AI usage rules** — relevance-bounded selection, character budget consistent with the existing 500-character context cap, never pass deleted/disabled/journal/sensitive data, no awkward memory mentions, support for "what do you remember about me?", correction and deletion paths.
8. **Exclusions** — an explicit list of what is decided against, so a later phase cannot quietly widen scope.

**Update: `docs/ai/privacy-notes.md`** — expand section 5 (preconditions for memory) to reference the new design document and align its list with the permission model and data boundary defined there.

**Update: `docs/ai/release-gate.md`** — add a memory-specific gate block that must pass before any memory implementation ships: privacy/legal review, approved consent copy, approved sensitivity taxonomy, deletion and export behaviour specified and wired to account deletion, RLS design reviewed, audit-logging approach reviewed, no real user data in testing, memory eval prompts added, rollback plan, memory-off kill switch, incident process updated.

**Update: `docs/ai/eval-dataset-v1.md`** — documentation-only description of eleven memory evaluation scenarios (memory off, what do you remember, forget this, save a preference, sensitive health disclosure, journal-like disclosure, diagnosis request using remembered context, delete memory, cross-journey leakage, deleted-memory reuse, inferring pregnancy from private text). The JSON dataset is not modified, so the harness is unaffected.

**Update: `docs/ai/roadmap.md`** — mark 29G as pending validation during the work, not closed. It is only marked closed once the docs are complete, `npm run typecheck` and `npm run build` pass, and the report confirms no application code, schema, route, auth, SEO or sitemap change. Record the approved sequence: 29H memory schema and RLS design review, 29I memory settings UI prototype, 29J explicit saved-memory MVP, 29K memory eval harness, 29L controlled rollout behind a feature flag. The existing content-grounding audit, voice readiness audit and Fable-led companion UI redesign move to a separate track. None of these are started.

## Validation

Docs-only change, so no runtime impact. `npm run typecheck` and `npm run build` are run to confirm nothing regressed. Tests are not run because no application file or JSON dataset changes.

## Report

Closes with the fourteen-point Phase 29G report requested, then stops. Phase 29H is not begun.
