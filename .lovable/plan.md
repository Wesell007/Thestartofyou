# AIC-JA4 — Text Journal Evaluation & Production Release Gate

Evaluation-only phase. No deployment, no publish, no flag changes, no media, no voice, no legal conclusions.

## Objective

Evaluate JA2 (background journal awareness) and JA3 (explicit "Ask about this entry") as one integrated system, decide technical release readiness, and prepare activation and rollback runbooks without executing them.

## Step 1 — Baseline confirmation (before any change)

- Record current revision.
- Run the full test suite and confirm the expected baseline: 109 files, 1238 tests, 1238 passing, 0 timeouts.
- Record lint baseline (expected 1 error, 10 warnings).
- If the baseline has drifted, stop and report before any remediation.

## Step 2 — Static architecture audit (read-only)

Verified against repository truth, not against earlier plans:

- Exactly two answer surfaces (CompanionPanel, /ask) and one runtime (useCompanionConversation → useAISearch → ai-search); count any journal-specific endpoint, inline card, modal chat, second runtime or direct model call (expected 0).
- Both journal flags from definition to runtime use; server flag authoritative, client flag UI-only, no request or profile value able to bypass server OFF, no second flag family, no committed override enabling production.
- Data flow for both paths: table, selected fields, ownership mechanism, lifecycle check, baby check, sanitisation, bounds, safety assessment, rendered block, prompt placement, transparency.
- Identity and ownership: verified bearer token, PostgREST under caller token, RLS, zero service-role journal reads, zero request-body user-id authority.
- Isolation: Pregnancy episode boundary on immutable created_at with updated_at never used for episode proof; First Year baby isolation and all_babies exclusion; TTC current-journey-only note scoping.
- Source allowlist regression: confirm no titles, tags, tracker values, care-event fields, appointments, captions, media, paths, ids or URLs have crept into model-visible text.
- Media boundary: zero photo, video, audio, transcription or image-model paths.
- S1 bounds: background 5 entries / 300 chars / 1200 total; selected 1800 chars; the assessed string is exactly the rendered string.
- Prompt authority: safety > saved journey > selected journal > background journal > memory/history/page/grounding. Record the actual order rather than rewriting it.
- Selected/background dedupe: server-internal identifiers only, zero model, header, metadata, analytics or log visibility.
- Composition with J2 (journey state authoritative), J3 (zero journal-derived starters), J4 (explicit selection replaces pending generic handoff), J5 (saved-journey actions only).
- Memory (AIC-3) and persistent history (AIC-4): zero journal writes of text, ids, source or metadata.
- Handoff lifecycle: pending, replace, remove, consume-once, clear on close/route/auth/lifecycle change, no localStorage, sessionStorage or cross-tab carry-over.
- Transparency headers and copy, exact strings from the repository, and the completed-answer-only rule.
- Query bounds: finite reads, single-entry selected, no N+1; record worst-case query counts per composition.

## Step 3 — Isolated on-state evaluation

Exercised locally with test flags ON and fixtures only. Production configuration stays OFF; no customer journal content or preferences are used.

Permission matrix evidence for all seven combinations of server flag, background permission and selected entry, including the terminal-selected case (background reads 0, ordinary model calls 0).

Safety matrix: current RED, current CRISIS, selected RED, selected CRISIS, background risky-entry drop (not terminal), rate limit, kill switch, clarification, unsupported, recap, AMBER and other controlled branches — recording selected reads, background reads, model calls, headers, transparency and next-actions for each.

Mutation cases: edit before send uses the newest server value; delete, ownership change, lifecycle change or disallowed log_type yields zero selected context; never a client-captured text fallback.

Failure cases with mocks: auth lookup, profile read, lifecycle read, journal row read, malformed response, timeout — all fail closed for enrichment, with no database internals exposed.

Prompt-injection regression on both blocks with structural payloads (angle tags, closing delimiters, fenced system blocks, instruction text).

## Step 4 — Runtime UI verification

Local preview with test flags ON, at roughly 390px and 1440px, on both surfaces: account setting, CTA hierarchy and touch targets, panel opening, pending indicator and Remove, composer, streaming, completed transparency, J5 next steps, bottom navigation and launcher. Record overflow, collisions, clipped controls and layout shifts.

## Step 5 — CTA coverage decision

Re-inspect current render surfaces for stable authoritative row ids. If Pregnancy reflection and First Year Today surfaces still lack them, keep coverage unchanged and classify as an accepted release-coverage limitation (not P0/P1). No fabricated or derived ids.

## Step 6 — Remediation (only if needed)

Smallest safe fixes strictly inside JA2/JA3 text scope. No schema change, no new surface or endpoint, no media, no voice, no unrelated cleanup. Anything requiring schema redesign, new lifecycle architecture or broader redesign stops and is reported instead.

Focused tests added only where evaluation exposes a real coverage gap, across flags, permission, ownership, per-journey isolation, safety, composition, handoff, transparency, privacy and structural containment.

## Step 7 — Final validation

Full test suite (all passing, 0 timeouts), typecheck twice, Deno check on ai-search and every journal server module, lint (baseline only), build. Exact arithmetic reported.

## Step 8 — Documentation and verdict

Create `docs/ai/aic-ja4-text-journal-release-gate.md` covering architecture, combined flow, flag and permission matrices, safety matrix, isolation results, prompt composition, privacy boundaries, runtime verification, CTA coverage, findings by severity, remediation, legal gate state, activation runbook (Phase A code release with flags OFF; Phase B post-approval activation), rollback runbook (server flag OFF first, then client flag; no schema drop, no data deletion), and the release verdict.

Update the roadmap only after the verdict. On a technical pass:

- `AIC-JA4 — ENGINEERING RELEASE GATE CLOSED PASS / PRODUCTION HOLD`
- `Journal Text Awareness — TECHNICALLY RELEASE READY / PRODUCTION OFF`
- `Legal/privacy activation gate — OPEN`

Then return the full 171-field completion report and stop.

## Boundaries

No deployment, no publish, no production flag change, no production QA, no schema or migration, no media, no voice, no legal or privacy conclusion, no changes to AIC-5, grounding, memory, history or J2–J5 semantics.
