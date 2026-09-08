# AIC-JA3 — Documentation Closure Only

No behaviour, test, deployment or flag changes. Two artefacts only.

## 1. Create `docs/ai/aic-ja3-selected-journal-entry.md`

The file does not exist; it was omitted from the change list. Create it documenting the final implemented state (verified against the actual code):

- Explicit one-request permission semantics (typed click → transient handoff → consumed on next request → cleared)
- `JournalEntryRefV1` contract: `version: 1`, `source`, `id` only; exactly 3 keys; UUID id
- Server-authoritative strict parser (`journalEntryRefContract.ts`), construction-only client mirror with parity tests
- No raw journal text ever sent from the browser
- RLS/user-token ownership; server re-authorises under the caller's session
- Source allowlist: `pregnancy_reflection`, `first_year_entry`, `first_year_memory`, `ttc_note`
- Pregnancy lifecycle/week authority (canonical pregnancy-week logic, immutable `created_at` vs saved journey start; never `updated_at`; fail-closed cross-episode)
- First Year baby isolation (current baby only; `all_babies` excluded; parent/family distinction)
- TTC journey isolation
- Deterministic selected-entry safety composition on the exact rendered string; zero selected input to AMBER; zero new model calls/classifiers
- Selected safety evaluated before ordinary rate limiting; background reads remain zero on all controlled branches
- Selected/background precedence and sanitized-text dedupe (no internal ids in model contract, headers, metadata or logs)
- J4 pending-context replacement behaviour
- Handoff consume/clear lifecycle (one request, session-only)
- Selected transparency header (`X-Companion-Journal-Entry: used|none`, completed answers only, CORS-exposed)
- Combined transparency UI (`CompanionJournalNote` wording)
- Privacy/logging/persistence boundaries: nothing persisted, logged or sent to analytics
- Flags OFF; production OFF; legal/privacy gate OPEN

Also record the accepted JA3 V1 UI coverage limitation:

- CTA present: First Year memory items, TTC note/log items
- Not exposed: Pregnancy reflection surfaces, First Year Today entry surfaces
- Reason: those render surfaces do not expose a stable authoritative persistent row id suitable for the typed-ref contract; no ids fabricated or derived
- Classified as a release-coverage limitation, not an engineering safety failure

## 2. Roadmap touch-up

Update the existing `## AIC-JA3` section title/body minimally to record:

- `AIC-JA3 — ENGINEERING CLOSED PASS / PRODUCTION OFF`
- `Journal Text Awareness — BACKGROUND + EXPLICIT ENTRY ENGINEERING READY / PRODUCTION OFF`

No other roadmap edits.

## Validation

- Re-read the created doc against the code for accuracy; confirm roadmap lines present. No test run needed (docs only).
