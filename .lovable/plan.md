# UI polish: Kept Chapter week illustration fallback

Phase 16.1B is closed. This is a separate, small, presentation-only fix logged from the Kept Chapter visual QA note. No schema, RPC, route, AI or consent work.

## What was checked

- `src/pages/KeptChapter.tsx` renders the circular week illustration with `resolveRealismForWeek(week, tone)` and `defaultRealismAltForWeek(week)` — the same resolver used by `/my-week` and `/my-journey`.
- `src/lib/myWeekRealismIllustrations.ts` resolves week 36 correctly: `src/assets/myweek-weekly-realism/week-36.png.asset.json` exists, all 42 default weeks are present, and the resolver falls back to the nearest week rather than an empty `src`.
- The Kept Chapter `<img>` has **no `onError` handling**, so any single failed image request leaves the raw alt text inside the circle, which is exactly the symptom in the screenshot.
- Asset URL check in this sandbox is inconclusive: `/__l5e/assets-v1/...` returns `text/html` here, so a live-preview reproduction is needed to confirm whether the week 36 pointer itself is failing or whether this was a transient load failure.

## Plan

1. Reproduce on the live preview: open Kept Chapter at week 36 (and two other weeks) and record the network status and content type for the illustration request.
2. Regardless of the reproduction outcome, make the illustration resilient in `src/pages/KeptChapter.tsx`:
   - add local `imageFailed` state and an `onError` handler on the illustration `<img>`;
   - when it fails, hide the broken image and render a calm decorative fallback inside the existing circle (the current pregnancy-tinted radial gradient plus a soft accent mark), with the alt text moved to a visually hidden element so screen readers keep the description and sighted users never see raw alt text.
3. If step 1 shows the week 36 pointer itself is broken (not a transient failure), re-point or regenerate only that asset descriptor; no other weeks are touched.
4. Re-check the same three weeks on the live preview and confirm the illustration renders and no console errors appear.

## Out of scope

No changes to the resolver, tone variants, `/my-week`, `/my-journey`, layout, copy or tokens beyond the fallback described above. Phase 16.2 is not started.
