# WC-2 — Final Closure Gate (Audit + Decision Only)

Approve this to switch me into build mode so I can run the measurement pass. No production code, assets, config or dependencies will be changed.

## Scope

Audit, measurement and a formal CLOSE / DO-NOT-CLOSE decision for WC-2. WC-2B, WC-2C and WC-3 are not started. Grounding files and `src/lib/grounding/*` are not touched.

## Steps

1. Freeze and verify the completed WC-2A state on disk: logo-dark.png (400x267, 19,165 B), journal-hero.mp4 (5,981,381 B) with poster-first two-gate loading intact, WC-2A.3-i (28 assets, 5,513,604 B), -ii (12 Journal photos, 3,768,903 B), -iii (5 week assets, 824,323 B), WC-2A.4 (3 PNG + 39 JPEG = 42, 4,620,506 B, 42/42 resolver integrity), WC-2A.5 (52 thumbnails, 822,683 B — source selection, not repository bytes removed).
2. Restate the historical targeted-asset accounting exactly as agreed, naming which families are included and excluding WC-2A.5 originals from any "removed" figure.
3. Build and serve the production output (`npm run build`, `npm run preview`), then measure each route in a fresh browser context with cache disabled, one independent run per route/viewport, at desktop 1280x1800 DPR1 and mobile 390x844 DPR3, using the previous rebaseline's bounded measurement window (navigation start, DOMContentLoaded, window load, LCP, window end, deferred-media request starts) rather than open-ended network idle.
4. Routes resolved from `App.tsx`, no invented aliases: `/`, `/pregnancy`, `/pregnancy/body`, `/articles/heartburn-in-pregnancy`, `/journal`, `/pregnancy/week/17`, `/pregnancy/week/34`, `/pregnancy/week/35`, `/trying-to-conceive`, `/first-year/0-3-months`, `/family/play-connection`, `/toddler/12-17-months`, `/ivf`. Any route that does not resolve is reported, not substituted.
5. Per-route/viewport table: LCP element and resource, LCP bytes, indicative LCP timing, deduplicated total initial bytes, image bytes, image request count, largest five image requests, JS/CSS/font bytes, CLS, console/page errors, 4xx/5xx responses. Source-file, encoded and transferred bytes kept conceptually separate.
6. Confirm the two headline corrections: homepage image payload and MyWeek bytes/request count (stating plainly that lazy images still arrive later), and `/pregnancy/body` thumbnails in grouped rows with full-size assets preserved on Start here cards, hero LCP and article hero routes.
7. Journal final state: poster asset and bytes, image bytes, Journal photo requests, mp4 request start, video bytes before activation, deferred behaviour, LCP, CLS. No reopening.
8. Weeks 17, 34, 35: assets decode, image bytes, LCP selection, no regression, no reason to reopen the wider week library.
9. Reassess WC-2B against the new state and quantify remaining over-delivery, separating meaningful route saving from diminishing return. Verdict A/B/C/D.
10. Reassess WC-2C for genuinely premature critical-window loading, not normal lazy-load heuristics. Verdict A/B/C/D.
11. Measure the seven decorative transparent PNGs' practical route impact and return BLOCKER or BACKLOG with evidence. No conversion.
12. Re-measure the articleHeroImage JS chunk in the current build: filename, raw and transferred bytes, affected routes, measurable LCP/interaction impact, high-level root cause, and classification A/B/C.
13. Diminishing-returns assessment across current LCP weights, route payloads, mobile behaviour, routes still affected and maintenance cost on a ~200-route editorial site.
14. Apply the WC-2 closure criteria and return a verdict; any failed criterion returns DO NOT CLOSE with the exact blocker.
15. If closing, record WC-2 CLOSED PASS with WC-2B and WC-2C explicitly NOT IMPLEMENTED — closed as non-blocking/backlog, plus a backlog record, and name the next Website Completion phase without starting it.
16. Verify grounding preservation: `AI_SOURCE_ROUTING_VERSION = 30B-source-routing-v1`, 0 candidates, 0 approvals, `listGroundingEligibleSlugs() = []`, Phase 30K parked at Stage 2.
17. Return the full carry-forward register (H.264 playback check, dead TrimesterHeroImage / TrimesterAbout / PregnancyTimeline / MyWeekChapter, WC-2A.3-ii Before-byte discrepancy, deployment SPA soft-404, articleHeroImage JS finding, seven decorative PNGs), adding only genuinely new findings, actioning none.
18. Frozen-state validation: `npm test`, `npm run typecheck`, `npm run build`, plus lint to confirm the known baseline (1 prefer-const error, 10 react-refresh warnings), and a source-diff check showing no production edits from this gate.

## Output

The requested 35-point final report, ending with the WC-2 CLOSE / DO-NOT-CLOSE verdict, its exact supporting evidence, and the exact next recommended Website Completion phase. Stop after the report.
