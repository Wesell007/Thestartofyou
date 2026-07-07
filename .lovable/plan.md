# Phase 7.7b — Checkups & Warning Signs image mappings

## Scope

Single-file change to `src/components/firstyear/article/firstYearArticleImages.ts`. All chosen assets are already imported at the top of the file, so no new imports, no new assets, no image generation.

## Asset choices (reuse existing imports)

**`postnatal-checks-and-appointments`**
- hero: `heroHealing` (`postpartum-stage-early-days.jpg`) — calm, non-clinical early-days home moment.
- body: `bodyBonding` (`guidance-card-bonding.jpg`) — parent tending to baby, warm and unhurried.

**`when-to-ask-for-help-after-birth`**
- hero: `heroRecoveryFeel` (`postpartum-stage-early-weeks.jpg`) — reflective, supported parent moment.
- body: `bodyRecoveryFeel` (`postpartum-journey.jpg`) — gentle support moment with baby nearby.

Both articles use `afterSectionIndex: 1` so the body image sits between section 2 and section 3.

## Edit

Append two entries at the end of `firstYearArticleImageMap`, matching the existing pattern exactly:

```ts
// bespoke future: calm parent and baby preparing for an early postnatal appointment at home
"postnatal-checks-and-appointments": {
  hero: {
    src: heroHealing,
    alt: "A calm parent and baby moment during early postnatal care",
  },
  body: [
    {
      afterSectionIndex: 1,
      src: bodyBonding,
      alt: "A parent keeping simple notes and questions during the first year",
      caption: "Early checks are there to support you and your baby, not to test whether you have everything figured out.",
    },
  ],
},
// bespoke future: reassuring parent and baby support moment after birth, calm and non-clinical
"when-to-ask-for-help-after-birth": {
  hero: {
    src: heroRecoveryFeel,
    alt: "A parent holding their baby in a calm and supportive first-year moment",
  },
  body: [
    {
      afterSectionIndex: 1,
      src: bodyRecoveryFeel,
      alt: "A gentle parent and baby moment after birth",
      caption: "Asking for help after birth is part of being supported, not a sign that you have failed.",
    },
  ],
},
```

No existing entries removed or changed. No new imports needed (all four symbols are already imported and previously reused).

## Verification

1. `tsgo` typecheck.
2. Playwright at 1280×1800 on both direct routes: confirm hero image renders, body image renders between section 2 and section 3, medical review label present, sources list present, related guidance ready-only, no placeholder text.
3. Regression check: `/first-year/care-and-safety/safe-sleep-and-home-safety`, `/first-year/postpartum-recovery/healing-after-birth`, `/first-year/development/baby-development-in-the-first-year`, `/articles/complete-guide-morning-sickness`, `/toddler` still render as expected.
4. Report First Year article counts: total, ready, draft, and the exact remaining draft slugs (from `rawFirstYearArticles` in `src/data/firstYearArticleData.ts` — inspection only, no edit).

## Out of scope

Article copy, status, sources, SEO, routes, article components, topic pages, cards, and any Pregnancy / TTC / IVF / Postpartum / Family / Toddler files.
