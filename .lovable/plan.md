# AIC-1 — AI Companion Architecture Audit & Foundation

Audit-first slice. The verification below was done against source before writing this plan, so the plan states current state, not assumptions.

## What the audit already confirms

**One backend, one model, one safety path.** Both surfaces call `useAISearch` → `POST /functions/v1/ai-search` with the anon key, streaming SSE. The edge function owns rate limiting (12/min, 100/hour by IP+UA fingerprint via `consume_ai_rate_limit`), urgent-pattern escalation before any model call, the `AI_SEARCH_DISABLED` kill switch, mode config (`_shared/aiModes.ts`), grounding fetch (`_shared/aiSources.ts`, external pages stripped to text, URLs never given to the model), and the Lovable AI Gateway call (`AI_MODEL_ID = google/gemini-2.5-flash`). No alternate production chat endpoint exists; `ai-reflect` is a separate non-chat function.

**Request contract is already single and narrow:** `{ query, context?, mode? }`, validated by `_shared/validation.ts`. No history, no IDs, no auth-derived data is sent.

**Two real divergences found (the only foundation work AIC-1 needs):**

1. `AskPage` calls `ask(query, context)` with **no `mode`**, so `/ask` always runs the general prompt while the panel resolves a journey mode from the route. Same backend, different mode selection — a genuine intelligence fork.
2. Context construction is duplicated: the panel uses `buildCompanionPanelContext`; `/ask` passes whatever arrives in router state/`ctx`, and appends `Previous question:`/`Previous answer:` strings into the same `context` field as pseudo-continuity. The panel has no continuity at all.

Everything else (sanitisation via `sanitiseAnswerForDisplay`, identity via `useCompanionIdentity`, error/abort handling in `useAISearch`) is already shared.

Classification: **B — mostly shared, small foundation cleanup needed.**

## Scope of this slice

### 1. Documentation (main deliverable)

Create `docs/ai/companion-architecture.md` as the authoritative programme document, covering: surface model, both request-flow traces (all 20 audit points each), backend inventory, `ai-search` ownership, prompt-layer matrix (core identity / safety / journey / mode / preferences / context / knowledge / tools, each marked IMPLEMENTED / PARTIAL / ABSENT / COUPLED), context-field inventory (available in client? sent? used by prompt? persisted? user-controlled?), existing profile/journey data inventory, conversation-state and persistence status, identity flow, safety and grounding boundaries, NHS/external-source fallback flow, error and streaming inventory, voice-readiness coupling notes, known constraints, and the future insertion points for context, memory, continuity, safety and voice.

ADRs recorded: ADR-AIC1-01 one brain multiple surfaces; -02 central journey-context construction; -03 memory separate from turn context and session history; -04 grounding governance independently gated; -05 voice consumes the same intelligence layer. Plus ADR-AIC1-06 recording the `/ask` missing-mode finding and its resolution.

### 2. Minimum foundation code

- Add a shared companion request contract module (types + a single `askCompanion`-style helper wrapping the existing `useAISearch` call shape) so both surfaces send an identical payload and there is one place for AIC-2 to attach structured context.
- Route `/ask` through the same mode resolution the panel uses, derived from the existing `stage`/`journey` query params and route, so mode selection stops forking. Behaviour change is limited to `/ask` now selecting the journey prompt it was always meant to use; no UI change.
- Mark the `Previous question/answer` string-in-context pattern as a documented interim continuity mechanism owned by AIC-4, without changing it.

No backend, prompt, grounding, schema, RLS, memory or UI changes. Grounding stays at `30B-source-routing-v1`, 0 candidates, 0 approvals.

### 3. Tests

Focused tests only for what changes: mode parity between `/ask` and panel, the shared request contract shape, and that sanitisation and identity paths remain shared. No snapshots.

## Validation

`npm test`, `npm run lint`, `npm run typecheck`, `npm run build`, against the 73 file / 723 test baseline and the known lint baseline (1 prefer-const, 10 react-refresh). Target: 0 new findings.

Then the 51-point completion report. AIC-2 will not be started.

## Open question

If you would rather AIC-1 be **documentation only** — leaving the `/ask` missing-mode fork recorded as a finding for AIC-2 rather than fixed now — say so and I will drop section 2 and its tests.
