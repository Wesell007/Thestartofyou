# WC-2A.5 — Article Hero Thumbnail Source Selection

Scope: create dedicated small thumbnail sources for the 44px article rows on the Pregnancy topic pages, and point only that slot at them. No responsive infrastructure, no loading-behaviour changes, no hero re-encoding. WC-2B, WC-2C and WC-3 stay closed.

## Verified current state

- The 44 CSS px slot is in `src/components/pregnancy/PregnancyTopicPage.tsx` (grouped article lists): a `w-11 h-11` rounded box wrapping an `object-cover`, `loading="lazy"` image.
- Its source comes from `resolveImage(link.href, link.image)`, which reads `HREF_IMAGE_MAP` (92 href to full-size hero mappings) with a per-topic `TOPIC_FALLBACK`.
- The same map also feeds the "Start here" cards, which render at `aspect-[4/3]` roughly 370px wide — a legitimate large use that must keep the full-size hero.
- On `/pregnancy/body` the grouped lists render 20 links (6 groups, capped at 4 each) resolving to **17 unique full-size heroes totalling 3,329,364 B** (159–222 KB each, ~1264px wide) purely for 44px display.
- `resolveArticleHero` / `resolveArticleHeroBySlug` in `src/lib/articleHeroImage.ts` is a separate resolver used by article routes and MyWeek weekly reads; article hero rendering is untouched by this phase.

## Plan

1. **Manifest** — Enumerate, per Pregnancy topic page (body, baby, feelings, health-and-safety, diet-and-exercise, preparing-for-baby), every asset resolved into the 44px slot: slug/href, asset path, dimensions, bytes, rendered CSS size desktop and mobile, DPR-3 requirement, whether the same asset is also used large elsewhere, and whether it is requested in the initial route window. Report the exact unique count. If the manifest does not reconcile, stop and report before writing files.
2. **Size trial** — Generate temporary 192 / 256 / 320px-wide candidates from a representative set (skin detail, gradient, fine-edge, text-free scan imagery) and compare against the full-size source rendered in the real 44px slot at desktop DPR 1 and mobile DPR 3, plus a modest enlarged inspection. Select the single smallest width that stays fully sharp, including the hover/scale treatment. Only one width unless evidence forces more.
3. **Encode** — JPEG q84, 4:4:4, progressive, optimize on, aspect ratio preserved, no crop change (CSS `object-fit` keeps doing the cropping). No WebP/AVIF.
4. **Asset location** — New files only, in `src/assets/article-thumbnails/`, named `<source-basename>-thumb.jpg`. Originals untouched.
5. **Source-selection change** — Add a thumbnail-specific map in `PregnancyTopicPage.tsx` keyed the same way as `HREF_IMAGE_MAP`, used only by the 44px row resolver, with graceful fallback to the existing full-size asset when a thumbnail is absent. `Start here` cards and every article route continue resolving the original hero. No article image schema redesign.
6. **Route scope** — All six Pregnancy topic pages benefit through the one shared component. Trace whether TTC, IVF, First Year, Family and Toddler hubs use the same component and mapping; only include them if the identical defect is fixed by the same mapping, otherwise report them as separate later work.
7. **Measurement** — `npm run build` + `npm run preview`, fresh context, cache disabled, desktop 1280x1800 DPR 1 and mobile 390x844 DPR 3, `/pregnancy/body` before vs after: LCP element/resource/bytes, total image bytes, affected thumbnail count and bytes, five largest image requests, indicative LCP, CLS, console errors, 4xx/5xx. Also classify the thumbnail requests as above-fold / near-fold / prefetched / lazy without changing loading behaviour.
8. **Hero acceptance gate** — For representative articles confirm: topic row uses the new small source, article route still uses the original ~1264px hero at unchanged quality, no broken or oversized-thumbnail rendering.
9. **Validation** — `npm test`, `npm run lint`, `npm run typecheck`, `npm run build`. Pre-existing lint warnings left alone.
10. **Report** — the 36-point completion report, including the WC-2A.5 CLOSE / DO-NOT-CLOSE verdict and whether WC-2 can close without WC-2B/WC-2C. Stop after the report.

## Preserved and untouched

WC-2A.1 logo, WC-2A.2 journal hero video, WC-2A.3 optimised assets, WC-2A.4 MyWeek family (3 PNG / 39 JPEG, 42/42 resolver), the seven decorative alpha PNGs, grounding (`30B-source-routing-v1`, 0 candidates, 0 approvals, Phase 30K parked), and the full carry-forward register.
