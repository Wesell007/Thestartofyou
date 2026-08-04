# UI polish: Kept Chapter week illustration fallback

Phase 16.1B is closed. This is a separate, presentation-only fix. No schema, migration, RPC, RLS, route, AI, consent, First Year, dashboard or Postpartum work.

## Reproduction result (done)

Ran a signed-in headless pass over `/my-week/12`, `/my-week/36` and `/my-week/40`:

- Week 36 illustration request: `200`, but `content-type: text/html`, `naturalWidth/Height = 0` — the image never decodes, so the browser paints the raw alt text inside the circle. Exactly the screenshot symptom.
- Weeks 23, 35, 38 (surfaced via `/my-journey`) behave identically, so this is **not** a week 36 descriptor problem. The week 36 pointer is present and well formed alongside all 42 default weeks plus light/medium/deep variants.
- Cause: in this sandbox the `/__l5e/assets-v1/...` path falls through to the SPA HTML shell. On the hosted preview the same URLs serve the real PNGs, so this is a load-failure class, not a broken asset.
- No JavaScript console errors were raised; the only defect is the visible alt text.

Conclusion: **do not touch the week 36 asset descriptor or any realism asset.** Fix the missing failure state instead.

## Change

Single file: `src/pages/KeptChapter.tsx`.

- Track the illustration source that failed rather than a bare boolean: `failedIllustrationSrc` state, with `imageFailed = failedIllustrationSrc === realism.src`. This resets itself whenever the week or resolved source changes, with no extra effect.
- Add `onError` on the circular illustration `<img>` to record the failed source.
- When it fails, stop rendering the `<img>` and render a decorative fallback inside the same circle: identical `w-[140px] h-[140px] sm:w-[160px] sm:h-[160px]` box, the existing pregnancy-tinted radial gradient and accent border, plus a soft concentric accent mark drawn with existing `--stage-pregnancy` / `--stage-pregnancy-accent` tokens. Marked `aria-hidden`, so no raw alt text is visible and no layout shift occurs.
- Preserve the description for assistive tech with a visually hidden `<span className="sr-only">{realismAlt}</span>` in the fallback state.

`resolveRealismForWeek`, `defaultRealismAltForWeek`, the resolver module, tone variants, `/my-week`, `/my-journey` and all surrounding layout stay untouched.

## Re-check

Re-run the same signed-in pass over week 36, one earlier week and one later week, and confirm: fallback renders cleanly where the asset cannot decode, no raw alt text is visible, no console errors, and `/my-week` and `/my-journey` are unchanged. Then run `npx tsgo --noEmit -p tsconfig.json`.
