# AIC-R1 — Journey AI production activation and release gate

Release only. No architecture change, no new features, no voice, no prompt/grounding/memory/history/schema/RLS/safety-logic change.

## Pre-flight (read-only)

Confirm HEAD carries the final J6 state (already spot-checked: `Keep exploring` in `AskPage`, `Ask about this stage` in `IVFAISupport`, `MAX_MONTH = 11`, `MAX_NEXT_ACTIONS = 2`, `X-Companion-Next-Actions` set and CORS-exposed in `ai-search`). Remaining checks: `ArticleAISupport` copy, `/first-year/12-months` still content-only, latest-answer lifecycle and `/ask` placement fixes, transition-behaviour fix.

Reconcile the baseline of 101 files / 1165 tests. Any unexpected divergence stops the release.

## Validation gate before any deploy

`npm test` (1165/1165 or reconciled, 0 timeouts), cache-defeated typecheck twice, `DENO_DIR=/tmp/denodir deno check --no-lock supabase/functions/ai-search/index.ts`, `npm run lint` (exactly 1 pre-existing error and 10 pre-existing warnings, 0 new), `npm run build`. Any new failure stops the release.

## Configuration and rollback snapshot

Record production state only, changing nothing: `AI_MEMORY_ENABLED`, `AI_CONVERSATION_HISTORY_ENABLED`, `AI_AMBER_CLASSIFIER_ENABLED`, kill switch, voice flags, `AI_SOURCE_ROUTING_VERSION` (expected `30B-source-routing-v1`). Expected programme state: memory OFF/gated, history OFF/gated, voice OFF/paused, grounding parked. Any unexpected difference stops the release before deployment.

Record rollback references: current deployed `ai-search` revision, current published frontend release, and the new release revision. No identifiable rollback target means no deployment.

## Step 1 — backend first

Deploy only `supabase/functions/ai-search`. No migration, no schema/RLS change, no new secret, no other function, no voice.

Then verify the contract against production with synthetic, non-customer input:

- ordinary eligible response returns `allow`; streaming and `X-Conversation-Id` behaviour unchanged
- RED and CRISIS return `suppress`, deterministic wording unchanged
- clarification and unsupported return `suppress` where deterministically reachable
- AMBER: if the flag is OFF, do not enable it — record the branch as not production-triggerable and rely on engineering evidence
- kill switch: do not toggle for testing — record as not deliberately triggered
- no safety category, reason, score, rule or classifier output exposed
- header actually readable from browser JavaScript, not just visible in network tooling

Any incorrect production-verifiable branch rolls `ai-search` back and stops the release before the client ships.

## Step 2 — backward-compatibility window

With the new backend and the still-old published client, confirm the companion works unchanged and the unknown header is ignored. Document the result.

## Step 3 — frontend

Only after the backend gate passes, publish the same validated revision. If the deploy mechanism would bundle unrelated unvalidated changes, stop and report.

## Step 4 — production smoke

Exactly two answer surfaces: the global panel and `/ask`. Using approved QA/test accounts only — never customer data:

- TTC: correct saved context, TTC starters, contextual Ask, one action `Open My TTC Journey` → `/my-ttc-journey`
- Pregnancy: `View My Week` plus `Read week N guidance` for the saved week; public week-20 content while saved week is 25 must not shift personal state
- First Year: `Open Today` plus `Read month N guidance` for a saved 0–11 age; `/first-year/12-months` stays reachable content and yields zero personal actions
- Signed out and unknown personal state: zero actions, no fabricated saved-journey wording
- Safety composition: suppressed responses show no actions and clear any previous ones
- Lifecycle: new turn clears actions, streaming shows none, completed eligible shows them, failed shows none
- Panel and `/ask` parity of IDs, labels, destinations and order
- Mobile ~390px and desktop ~1440px: zero collisions between Next steps, composer, bottom nav and launcher; no clipping or horizontal overflow

Any saved state that cannot be reached with approved QA data is reported as NOT RUNTIME-VERIFIED rather than manufactured.

## Health, rollback, documentation

Check existing deployment observability for function errors, client runtime errors, CORS/header errors. Backend regression rolls back `ai-search`; frontend regression rolls back the client while a healthy backend may remain. No migration rollback exists because the release has zero schema, RLS and data changes.

Only after both layers pass, update `roadmap.md` (AIC-J5 PRODUCTION ACTIVATED, AIC-J6 CLOSED PASS, Journey AI PRODUCTION RELEASED) and the companion release documentation with deployed revisions, verified and non-verifiable checks, rollback targets, and the unchanged memory/history/voice/grounding states.

## Report

Return all 80 fields, including explicit deployment identifiers, flag states, header results, smoke results, and the AIC-R1 close/do-not-close verdict. Stop after the report; voice does not begin automatically.
