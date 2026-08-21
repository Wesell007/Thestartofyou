# Phase 27B — Correction Pass (presentation only)

The first pass restyled surfaces but did not raise the pregnancy journey to the Nano Banana standard. This pass generates the missing decorative artwork, fixes the broken baby illustration, and rebuilds the keepsake treatment on `/my-week`, `/my-journey`, the toolkit and the pregnancy bottom nav.

## Confirmed issue: the broken baby illustration

The 42 weekly realism illustrations exist only as CDN pointer files (`src/assets/myweek-weekly-realism/week-NN.png.asset.json`, all 42 present). Requesting one of those `/__l5e/assets-v1/...` URLs in the preview returns a 2.2 KB HTML document instead of a PNG, so the browser fails to decode it and falls back to alt text. The pointer data is correct; the image simply does not resolve in this environment.

Fix (presentation only): keep the pointer as the primary source, and add a graceful visual fallback so the card is never empty — a generated watercolour "baby this week" illustration behind a soft vignette, revealed by an `onError` state on the image. No change to the resolver logic, tone preference, week calculation or alt copy rules.

## Nano Banana assets to generate

Small, decorative, transparent PNGs, saved to `src/assets/pregnancy-nano/` and uploaded as Lovable asset pointers. All are decorative (`alt=""`, `aria-hidden`) except the baby fallback, which carries the existing cautious alt copy.

1. `baby-watercolour-fallback.png` — soft abstract watercolour womb/curled-form illustration in cream, blush and sage. Used as the fallback visual in the "Baby this week" card.
2. `botanical-eucalyptus-sprig.png` and `botanical-sprig-small.png` — watercolour botanical accents for the hero corner, journey hero and journal bridge cards.
3. `watercolour-wash-blush.png` and `watercolour-wash-sage.png` — soft wash panels behind the hero and reflection areas.
4. `tape-strip.png` — torn washi tape strip for taped-polaroid photo/video/voice memory frames.
5. `journal-corner-mark.png` — small ribbon/bookmark mark for the journal bridge card.

Each will be reported with what it is, where it is used, why, and decorative vs content-bearing.

## `/my-week`

- Hero: watercolour wash panel plus a botanical sprig in the top corner, thin serif chapter title, small uppercase week/trimester label, paper due-date pill.
- Baby this week: framed keepsake panel, illustration with the watercolour fallback, size cue kept, warmer serif/label hierarchy.
- Body and emotional cards: paired paper cards with fine hairline rules, botanical detail, warmer ink.
- Reflection and media capture: keepsake treatment — taped-polaroid frames for photo and video, a soft paper card with a quiet mic affordance for voice, private-to-you chip on the reflection card. Save, upload and autosave behaviour untouched.
- Journal bridge: warmer paper card with corner mark and botanical accent, existing approved copy only.

## `/my-journey`

- Story-led hero with wash and botanical accent.
- Trimester rail and chapter cards made more tactile; current chapter card gets a distinct keepsake treatment.
- Photo journal preview rendered as small taped prints.
- Reflection highlights styled as saved journal fragments on paper.
- Pregnancy film card warmed with a soft wash and a quiet play affordance.
- Journal bridge card matched to the `/my-week` treatment.

## Toolkit

Same paper/watercolour system: warm paper cards, fine line icons in soft bubbles, dotted dividers, small uppercase labels. Behaviour, entries and data untouched.

## Mobile navigation

Pregnancy bottom nav refined to feel as app-ready as the First Year nav: warmer active tint, cream paper bar, safe-area inset, 56px targets. Destinations unchanged. No fourth Memories tab.

## Constraints

No changes to logic, routes, data, schema, RLS, storage, AI, upload behaviour, toolkit data, Ask Cindy, First Year, public pregnancy pages, sitemap or SEO. No board image, no journal PDF pages, no scanned pages. No hardcoded hex in touched files — HSL tokens only.

## Later-phase notes

Pregnancy Memories tab needs a real route; journal-owner variant needs real ownership state; insert-card QR welcome needs a new route.

## Verification

Playwright screenshots at 390px and 1440px on `/my-week`, `/my-journey`, `/pregnancy-toolkit`; overflow and console checks; hex scan of touched files; typecheck, targeted tests, full test suite, build. Closes with the requested 20-point correction report.
