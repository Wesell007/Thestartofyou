# AIC-R1 — Resume at Step 3: Frontend Release

Backend (`ai-search`) is live and verified at revision `e35d39a0`; rollback target is the prior deployment at `c2d4264b`. No backend redeploy, no product behaviour change, no voice.

## Publish safety check (already done)

Current HEAD is `3f2c272f`, a merge of the validated `e35d39a0` into `c2d4264b`. Its only content change versus the validated state is the archival rename of the release plan document. No unrelated or unvalidated application changes are included, so publishing is safe and matches the validated release state.

## Steps

1. **Publish the frontend** to thestartofyou.com and record the returned deployment reference and timestamp. Frontend rollback target: the currently published build.
2. **Immediate site health** (production, headless browser): homepage, navigation, companion launcher, `/ask`, console/runtime errors, a live ai-search request, CORS headers. Any material failure → stop and report a rollback recommendation rather than pressing on.
3. **Surface inventory**: confirm production exposes exactly two companion answer surfaces (global panel, `/ask`) and both answer an ordinary request.
4. **J5 behaviour**: ordinary eligible answer shows Next steps only after completion; nothing during streaming; old actions clear on a new accepted turn.
5. **Journey states (TTC / Pregnancy / First Year)**: exercised only if an approved, safe QA saved state exists. No customer data will be created or altered, and no QA state will be manufactured. Anything not exercisable is reported as NOT RUNTIME-VERIFIED. `/first-year/12-months` will be checked as reachable public content.
6. **Signed out / unknown**: zero personal actions, no fabricated lifecycle wording, contextual Ask still usable.
7. **Safety composition (client side)**: RED, CRISIS, clarification and unsupported responses show no ordinary Next steps and leak no reason or category; previous actions clear when a suppressed response starts. AMBER stays OFF; kill switch untouched.
8. **Panel/Ask parity**: same IDs, labels, destinations and order for the same available state; limitations reported where the same state cannot be exercised on both.
9. **Mobile ~390px and desktop ~1440px smoke**: collisions, overflow, clipping, tap targets, hierarchy, duplicated controls.
10. **Release health**: read existing observability (edge function logs, browser console/network) for errors after publish. No new analytics, no prompt or personal-context logging.
11. **Documentation, only if every gate passes**: update `roadmap.md` to AIC-J5 PRODUCTION ACTIVATED, AIC-J6 CLOSED PASS, Journey AI PRODUCTION RELEASED, AIC-R1 CLOSED PASS, and update `docs/ai/release-gate.md` with revisions, timestamps, rollback targets, checks performed, NOT RUNTIME-VERIFIED items, and the unchanged memory/history/grounding/voice state.
12. **Final report**: the full 80-field AIC-R1 report, retaining verified backend evidence and replacing pending frontend/smoke fields with actual results. Stop after the report.

## Guardrails

No backend redeploy, no schema, RLS, secrets, analytics, persistence, prompt, grounding, memory, history or voice changes. No production writes for QA. If the frontend release fails materially, the recommendation is to roll the frontend back while the healthy backend stays deployed.

## Publishing note

Publishing requires your approval in the tool card; if it is declined again the release stays paused and AIC-R1 stays open.
