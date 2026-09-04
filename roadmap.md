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
- AIC-5B STRUCTURED OUTPUT FEASIBILITY — CLOSED PASS (controlled probe only; 0 production runtime changes, 0 deployments). Dev-only probe `scripts/probes/safetyStructuredOutputProbe.ts` + pure validator `src/lib/safety/safetyClassifierProbeSchema.ts` (0 production imports). Evidence on the production gateway path (`ai.gateway.lovable.dev/v1/chat/completions`, `google/gemini-2.5-flash`, temperature 0): strict `json_schema` accepted and enforced — 25/25 structurally valid including schema-conflict and injection cases, malformed schema rejected 400, plain `json_object` mode 0/8 valid. STRUCTURED OUTPUT — SUPPORTED; classifier FEASIBLE but dependency remains OPTIONAL (AIC-5D decides). ADR-AIC5-08 ACCEPTED, ADR-AIC5-06 resolved; 03…07 still PROPOSED. Frozen: source routing `30B-source-routing-v1`, grounding 0/0, eligible slugs [], memory/history flags OFF, safety and emotion persistence 0.
  Next: AIC-5C. NOT STARTED.

- AIC-5C UNSUPPORTED + CLARIFICATION CONSOLIDATION — CLOSED PASS. Shared server boundary (`_shared/clarificationRules.ts` + `_shared/companionBoundaryRules.ts`) owns clarification and a precision-first UNSUPPORTED capability boundary for every surface; runs GREEN-only after `decideSafety`, ordinary quota and the kill switch, before any grounding or model call. Structured transport via `X-Companion-Boundary` / `X-Companion-Clarification-Topic` headers — 0 prose markers. Client is display-only (`src/lib/companion/clarificationDisplay.ts`); `src/lib/askClarification.ts` DELETED, 0 remaining client decision authority. Bounded relevant-history referent rule reuses the AIC-4 turns already loaded (no second store, conservative: unrelated/empty/failed history clarifies). Validation: 84 files / 891 tests, typecheck + build pass, lint baseline unchanged (1 pre-existing generated-file error, 10 pre-existing warnings). Deployed: `ai-search` only; live smoke tests confirmed clarify, both unsupported categories and an unaffected ordinary answer. No classifier, AMBER, UNSUPPORTED-state expansion, migration, analytics, raw logging or UI redesign. ADR-AIC5-09/10 ACCEPTED; frozen systems (grounding `30B-source-routing-v1` 0/0, memory/history flags OFF, JourneyContext) unchanged.
  Next: AIC-5D AMBER / Reassurance / Uncertainty. NOT STARTED.

  Original scope: Move authoritative clarification decisions from `src/lib/askClarification.ts` into shared server modules consumed by `ai-search`; add a precision-first deterministic UNSUPPORTED capability boundary (diagnosis/prescribing action, unavailable external action); structured (non-prose) clarification metadata transport to the browser; client becomes display-only. No classifier, no AMBER, no UI redesign, no migration.

- AIC-5D — AMBER, uncertainty & reassurance: selective hybrid build (deterministic
  eligibility gate, release-gated structured GREEN→AMBER classifier, trusted AMBER and
  cautious-uncertainty guidance, global no-definitive-medical-verdict rule). Engineering
  slice; production classifier release stays gated behind AI_AMBER_CLASSIFIER_ENABLED=OFF.

- AIC-5D CLOSURE VALIDATION — CLOSED PASS. Route A direct isolated actual-module proof of
  `_shared/amberClassifier.ts` against the real gateway (`google/gemini-2.5-flash`, stream false,
  temperature 0, strict json_schema, max_tokens 512, 1500 ms AbortController, 0 retries):
  green 999 ms, amber 1200 ms, amber 1104 ms; production config untouched, flag OFF throughout.
  Closure tests added (12): first-year conflict + routine restraint + recap semantics, flag-OFF
  semantics, real AbortController timeout branch, no-substring-censorship, exact guidance
  injection counts. 86 files / 929 tests (from 86 / 917); 0 production source changes,
  0 deployments, 0 migrations, 0 client changes. ADR-AIC5-11 ACCEPTED (engineering only);
  PRODUCTION AMBER CLASSIFIER RELEASE — GATED, AI_AMBER_CLASSIFIER_ENABLED = OFF.
  Next: AIC-5E. NOT STARTED.

- TYPECHECK BASELINE RESTORATION — CLOSED PASS (validation tooling only; 0 production runtime
  changes, 0 deployments, 0 migrations). Audit trail, preserved intentionally: the original
  AIC-5D implementation report recorded `npm run typecheck` PASS; that result was invalid,
  produced by stale `tsconfig.app.tsbuildinfo` incremental state. A clean-cache run exposed 18
  errors, all in `supabase/functions/ai-search/index.ts` (1 x TS2307 remote Deno std import,
  14 x TS2304 `Deno` global, 3 x TS2339 discriminated-union narrowing). Root cause: the AIC-5D
  test `src/test/aiSearchAmberRouting.test.ts` used a static-literal dynamic import of the edge
  function, pulling Deno code into the browser TypeScript project (`tsconfig.app.json`,
  strict false), unlike the three existing endpoint tests which deliberately use a non-literal
  `endpointModule` specifier. Fix: restored that established non-literal convention in the one
  test; the real shipped `ai-search/index.ts` still executes under Vitest via the Deno `serve`
  stub, 0 assertions weakened, 0 tests removed. Cache cleared: `tsconfig.app.tsbuildinfo`,
  `tsconfig.node.tsbuildinfo`. Clean-cache typecheck PASS, repeat run PASS; 86 files / 929 tests
  PASS; lint at known baseline (1 generated-file prefer-const error, 10 react-refresh warnings,
  0 new); build PASS.
  Deno-specific check (read-only, `deno check --no-lock supabase/functions/ai-search/index.ts`,
  deno 2.6.10): the 3 TS2339 narrowing errors did NOT reproduce, confirming they were
  wrong-project-environment artifacts. It did surface one separate strict-mode finding not
  visible to the app project — TS2322 at index.ts:642, optional `X-Conversation-Id` header in an
  object literal widened to `string | undefined` against `HeadersInit`. Reported, NOT fixed:
  production source is out of scope for this slice. No runtime failure is implied (the deployed
  function runs under the Supabase Deno toolchain); carried forward as a type-only debt item.
  AIC-5D ENGINEERING — FORMALLY CLOSED PASS. PRODUCTION AMBER CLASSIFIER RELEASE — GATED.
  AI_AMBER_CLASSIFIER_ENABLED — OFF. AIC-5E — SAFE TO BEGIN. NOT STARTED.
