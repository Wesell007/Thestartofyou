# Phase 20B — Signed-in Visual QA (no code changes expected)

QA only. No schema, routes, copy or spacing changes unless the QA exposes a real defect.

## Prerequisite

Sign in to the preview with a test account (not the live personal account). The session injects on the next turn; QA runs then.

## QA steps

1. Restore the injected preview session in Playwright (cookies plus localStorage) before navigating.
2. Capture screenshots at 390px and 1440px for:
   - `/my-first-year`
   - `/my-first-year/today`
   - `/my-first-year/memories`
   - `/my-pregnancy-chapter`
3. Per route, confirm: title/hero clears the fixed header, no double padding, no horizontal overflow (`scrollWidth` vs `clientWidth`).
4. On `/my-first-year`: confirm Today is the primary action, Memories reads as secondary, support lanes look balanced at both widths.
5. Accessibility: tab through interactive elements to confirm visible focus rings; dump heading order (h1/h2/h3) per route.
6. Collect console errors, page errors, and failed app network requests across the run.

## Report

Signed-in browser status, account used, per-route results at both widths, overflow, focus and heading order, console/page/network results, whether any code change was needed, remaining blockers, and whether Phase 20B can close.

## If a defect appears

Report it first with evidence and a proposed minimal fix. Do not fix without approval.
