# WC-2A — Post-Optimisation Rebaseline (audit, measurement, decision only)

No production code, assets, config, or dependencies change. No WC-2B, WC-2C or WC-3 work begins. The output is a report plus a verdict.

## What this phase does

1. **Freeze verification.** Re-measure the frozen WC-2A state and confirm each stated figure: `logo-dark.png` 400x267 / 19,165 B, `journal-hero.mp4` 5,981,381 B with poster-first two-gate loading intact, the 28-file WC-2A.3-i batch at 5,513,604 B, the 12-file WC-2A.3-ii batch at 3,768,903 B, the 5-file WC-2A.3-iii batch at 824,323 B. Confirm the combined targeted baseline 114,673,945 B → 16,088,211 B and report it explicitly as repository/targeted-asset weight, never as a per-route saving.
2. **New production baseline.** `npm run build`, then serve the built output with `npm run preview`. Every measurement uses a fresh browser context with cache disabled, desktop 1280x1800 and mobile 390x844 measured in independent runs, with the mobile DPR used stated explicitly (DPR 3 for rendered-pixel requirements unless a lower value is justified and documented).
3. **Route set resolved from `src/App.tsx`,** no invented aliases: `/`, `/pregnancy`, `/pregnancy/body`, `/articles/heartburn-in-pregnancy`, `/journal`, `/pregnancy/week/17`, `/pregnancy/week/34`, `/pregnancy/week/35`, `/trying-to-conceive`, `/first-year/0-3-months`, plus one real Family route, one real Toddler age/topic route, and one IVF route if it materially uses the shared image system.
4. **Per route and viewport:** LCP element, LCP resource and its bytes, indicative LCP timing (labelled indicative, not field data), total transferred bytes, total image bytes, image request count, largest five image requests, JS bytes, CSS bytes, font bytes where measurable, CLS, console/page errors, and any 4xx/5xx asset responses.
5. **Residual over-delivery.** For each LCP and significant above-fold image: source dimensions, encoded bytes, CSS rendered dimensions, physical-pixel requirement at the tested DPR, source-to-required width ratio, and a class of A appropriately sized, B mildly oversized, C materially oversized, or D severely oversized. DPR is accounted for; intrinsic-vs-CSS mismatch alone is not called waste.
6. **Mobile over-delivery quantified** for 1920px Journal photography, 1264px hero photography, pregnancy heroes, article heroes, topic heroes, week imagery and homepage imagery: bytes transferred today, dimensions actually required at the tested mobile DPR, and realistic smaller dimensions that would still render sharply.
7. **Temporary responsive candidates** for the highest-impact over-delivered images only, written outside `src/assets` to a scratch directory, using the proven q84 / 4:4:4 / progressive / optimised recipe at justified widths (roughly 640, 960, 1280 where the rendering requirement supports them). Report current bytes, candidate width and bytes, projected mobile and desktop saving, and a visual verdict at the intended DPR.
8. **Modern-format experiment,** temporary only, on a very small photographic sample, using tooling already present. WebP and AVIF versus the current optimised JPEG, with bytes, visual result and incremental percentage saving. If equivalent-quality encoding cannot be done reliably with existing tooling, that is reported rather than worked around; no dependency is added and `vite-imagetools` is not installed.
9. **Premature loading analysis.** Per route: which images are requested during initial load, whether they are above fold, whether visible in the initial viewport, whether they are legitimate LCP or near-LCP resources, and whether they could have been deferred. Bytes split into ABOVE-FOLD REQUIRED versus BELOW-FOLD REQUESTED EARLY. No lazy/eager or fetchPriority attribute is changed.
10. **`/journal` deep dive:** poster bytes, every Journal image request with above/below fold status, eager/lazy status, source dimensions, mobile rendered dimensions, responsive-sizing potential and deferred-loading potential. Network evidence confirming `journal-hero.mp4` bytes before activation equal 0, with WC-2A.2 behaviour untouched.
11. **Homepage deep dive:** the current largest image resources on `/` and whether residual weight comes from oversized photography, myweek-baby PNG imagery, eagerly loaded below-fold content, repeated assets, or another class.
12. **Week pages:** use 17, 34 and 35 to judge whether the wider week-image system has a real residual problem. The 126-image library is not reopened unless measurements show one.
13. **WC-2B decision** with quantified current mobile bytes, achievable responsive bytes, absolute and percentage saving, routes benefiting, implementation complexity and maintenance cost, ending in verdict A, B, C or D.
14. **WC-2C decision** with quantified below-fold early bytes, routes affected, unnecessary request count and likely initial-load reduction, ending in verdict A, B, C or D.
15. **Ordering recommendation** between WC-2B and WC-2C based on residual byte cost and user-visible impact, including the option to skip one or close WC-2.
16. **Diminishing-returns assessment** separating meaningful user-facing gain from technical perfection, weighted towards keeping the codebase maintainable.
17. **Boundary confirmations.** `AI_SOURCE_ROUTING_VERSION = 30B-source-routing-v1`, grounding candidates 0, approvals 0, `listGroundingEligibleSlugs() = []`, Phase 30K parked at Stage 2, with `src/lib/grounding/*` and `docs/ai/grounding-approvals/*` untouched. Source diff confirmed free of rebaseline production edits; build, typecheck and tests run only to validate the frozen baseline.

## Carry-forward register (recorded, not actioned)

Real-browser H.264 Journal hero playback verification before final launch; dead `TrimesterHeroImage`, `TrimesterAbout`, `PregnancyTimeline` components; the historical WC-2A.3-ii per-file Before-byte discrepancy; deployment-level SPA soft-404 HTTP 200 behaviour from WC-1.

## Deliverable

A single report covering all 25 requested items, ending with the WC-2B verdict, the WC-2C verdict, recommended ordering, whether WC-2 can close without WC-2B, and the exact next recommended phase. Work stops after the report.

## Technical notes

Measurement is scripted with the pre-installed Playwright and Python imaging tooling under a scratch directory (`/tmp/`), reading the `vite preview` production server. Candidate encodes live only in that scratch directory. No file under `src/`, no route, SEO, sitemap, robots, Vite config or `package.json` entry is modified.
