## Phase 15.4 — Inline AI Companion Planning (no code changes)

Document: `/mnt/documents/phase-15-4-inline-ai-companion-plan.md`

### Executive summary
The companion is currently a link, not a presence: `SectionAskAI` decorates a navigation to `/ask`, and companion identity is display-only (never sent to the model). Recommendation for version one is a single inline companion card in `/my-week`, in the slot `SectionAskAI` already occupies, upgraded from a link into a working one-question surface that streams a short answer in place and hands off to `/ask` with continuity. Reuse `ai-search` unchanged so red-flag interception, NHS grounding, the safety prompt and rate limiting all carry over.

### Recommended inline format
Small card with progressive disclosure — eyebrow with companion name, optional tone pill, three week-band prompt chips, one text input, inline streamed answer (visually truncated, sources shown collapsed), standing non-medical disclaimer, "Continue in Ask" and "Ask something else". No floating bubble, no bottom sheet, no chat thread, one AI entry point only.

### Version one scope
Pure `buildCompanionContext` helper with tests, week-band chip data, the inline card with full error/loading states, active-status gating, and handoff via the existing `askNavigation` contract. No new edge function, migration, RLS, analytics, prompt or route changes.

### Top 10 product decisions
1. One AI entry point in My Week, in the existing `SectionAskAI` position.
2. Card with inline answer, not chat, bubble or sheet.
3. Reuse `ai-search` and `useAISearch`; no companion-specific function yet.
4. Context = week, trimester, due day/month, tone, plus a one-clause page hint.
5. First name and companion name stay in UI copy, never in the model request.
6. Memory-blind v1: no reflection text, no media, not even a "has memories" flag.
7. Three question-shaped chips per week band; never symptom-led.
8. Card renders only when journey status is `active`; sensitive states keep existing quiet surfaces.
9. Handoff carries question + context (and optionally previous answer, clamped) into `/ask`.
10. `ai-reflect` stays the reflection tool; the companion points to it rather than duplicating it.

### Technical risks
500-char `context` cap (clamp and test), shared 12/min rate limit now hit from two surfaces, 503 grounding failures must preserve the typed question, inline layout shift and answer truncation at mobile width, abort/reset correctness on week change and unmount.

### Privacy risks
Drift toward sending reflections or memory flags, persona confusion from a named companion, free-text questions leaking into logs/analytics, due date as quasi-identifier (send day and month only), and answers persisting on an unattended screen.

### Recommended next build phase
Phase 15.4B: inline companion card in `/my-week` exactly as scoped above, memory-blind, with mobile/desktop QA and a live 429/503 check.
