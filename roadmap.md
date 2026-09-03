# Roadmap

## Completed
- WC-3a — Shared Breadcrumb Foundation — CLOSED PASS
- WC-3b — Existing Breadcrumb Migration — CLOSED PASS
- WC-3c — Canonical Breadcrumb Coverage & Hierarchy — CLOSED PASS (see debt below)
- WC-3d — BreadcrumbList Structured Data Integration — CLOSED PASS (resolved families only)
- WC-3e — Final Navigation / IA Corrections — CLOSED PASS. WC-3 — CLOSED PASS.
- WC-4 — Companion / Ask Experience Consolidation — CLOSED PASS. WEBSITE COMPLETION — CLOSED PASS.

## Carry-forward: dead components (do not delete without review)
- `src/components/week/WeekHero.tsx` — unreachable; live week experience is `Week1Page…Week42Page` via `PregnancyWeekRoute.tsx`
- `src/components/trimester/TrimesterHero.tsx` — unreachable; live trimester heroes are `FirstTriHero`/`SecondTriHero`/`ThirdTriHero`

## Debt
- Legacy article hierarchy: 156 articles in `/articles/:slug`, 87 with authoritative topic ownership, 69 unresolved (54 TTC, 4 pregnancy, 3 postpartum, 3 preparing-for-baby, 2 IVF, 2 first-year, 1 support).
  `ArticleHeader.tsx` and `FlagshipHero.tsx` remain WC-3c/WC-3d DEFERRED — AUTHORITATIVE ARTICLE TOPIC DATA REQUIRED, so `/articles/:slug` has no visible trail and no BreadcrumbList.
  Proposal recorded only: optional `journeyTopic: { journey; topicSlug }` field on `ArticleData`; nine non-Pregnancy/TTC/IVF journey articles need a product decision.

## Closed
- AIC-1 — CLOSED PASS. Authoritative architecture doc `docs/ai/companion-architecture.md` + minimum shared foundation: `src/lib/companion/companionRequest.ts` (single request boundary, shared mode resolution). `/ask` mode fork removed (previously always `general`). Backend, prompts, grounding, UI and privacy boundaries unchanged.

## Not started
- AIC-2 Journey Context (SAFE TO BEGIN), AIC-3 Permissioned Memory, AIC-4 Conversation Continuity, AIC-5 Safety/Emotional Intelligence, AIC-6/7 Voice — do not begin before AIC-1 closes.

- AIC-2 — Journey Context: CLOSED PASS (structured provenance-separated context, shared personal resolver, strict server validation, ai-search deployed and smoke-tested). AIC-3 not started.
- Debt: pregnancy-week formula still duplicated in MyWeek/MyJourney/KeptChapter (canonical helper now at src/lib/pregnancyWeek.ts, pages intentionally unrefactored).

- AIC-3 — Permissioned Memory: CLOSED PASS (implementation), RELEASE STILL GATED.
  Built: `companion_memories` table (DB-owned ownership, generated normalised value, owner-only RLS, 50-row cap, credential backstop, account-delete cascade); pure policy + intent layers, shared `useCompanionMemoryInteraction`, confirmation UI on both surfaces, `/account` management section, export inclusion; `ai-search` user-token retrieval behind authoritative `AI_MEMORY_ENABLED` with an escaped `<permissioned_memory>` block. Docs: `docs/ai/companion-memory.md`, `docs/ai/adr/ADR-AIC3.md`.
  Flags: `VITE_COMPANION_MEMORY_ENABLED` (client UX) and `AI_MEMORY_ENABLED` (server, authoritative) are both OFF. Release remains blocked by the outstanding legal/privacy review in `docs/ai/memory-mvp-readiness.md`.
  Deferred by design: `confirmed_suggestion` source, suggested memories, conversation history (AIC-4), emotional modelling (AIC-5), voice (AIC-6/7).

## In progress
- AIC-4 — CLOSED PASS (implementation; persistent history remains flag-gated OFF). Conversation Continuity: one shared conversation runtime across CompanionPanel and /ask; session continuity for anonymous and signed-in-with-persistence-off; flag-gated account-owned persistent history (`companion_conversations` / `companion_messages`, owner-only RLS with parent-conversation ownership enforcement); bounded escaped `<conversation_history>` prompt block; AskPage pseudo-continuity removal; New/Clear/Delete conversation UI; docs + ADR-AIC4-01…11.

- AIC-5 AUDIT — CLOSED PASS (audit/documentation only; no production safety or AI runtime code changed). Deliverables: `docs/ai/companion-safety-emotional-continuity.md`, `docs/ai/companion-architecture.md` safety section, `docs/ai/adr/ADR-AIC5-proposals.md` (ADR-AIC5-01…08, all PROPOSED).
  Carried forward: (1) rate limit before urgent routing — REACHABLE SAFETY GAP; (2) `first_year_day_recap` escalation suppression — CONDITIONALLY REACHABLE via crafted mode; (3) persistence before safety — retention observation, no current impact; (4) urgent before `AI_SEARCH_DISABLED` — positive property to preserve; (5) AMBER — principal missing state; (6) deterministic RED/CRISIS cannot be downgraded; (7) classifier dependency OPTIONAL; (8) emotional and safety-state persistence remain 0; (9) preview `useCompanion must be used inside CompanionProvider` — NOT REPRODUCIBLE, watch item; (10) grounding frozen at `30B-source-routing-v1` (0 candidates, 0 approvals) and all memory/history flags remain OFF.
  Next recommended build phase: AIC-5A — Deterministic Safety Foundation. AIC-6/7 NOT STARTED.
- AIC-5A DETERMINISTIC SAFETY FOUNDATION — CLOSED PASS. Shared `decideSafety` router (`_shared/safetyRouter.ts` + `_shared/safetyState.ts`) runs before rate limiting, persistence, mode behaviour and the kill switch; RED/CRISIS survive quota exhaustion, limiter failure, recap mode and a paused companion with zero model/grounding calls. Audit gaps 5.1 and 5.2 resolved; 5.4 preserved. No classifier, AMBER, UNSUPPORTED, emotional modelling, UI, grounding, memory or history changes; memory/history flags remain OFF. ADR-AIC5-01/02 ACCEPTED, 03…08 still PROPOSED.
  Next: AIC-5B Structured Output Probe. NOT STARTED.
