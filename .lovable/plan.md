# Phase 7.8b — Emotional wellbeing image mappings

## Approach

Generate two new bespoke hero images (approved) and reuse two existing not-yet-imported body assets for the two Emotional Wellbeing articles.

## New hero images

Both generated at 1024×1024 into `src/assets/`, `fast` tier, warm natural light, editorial soft realism.

1. `src/assets/article-hero-emotional-feeling-like-yourself.jpg`
   Prompt: "A parent sitting quietly on the edge of a soft bed near a sleeping baby in warm morning light, editorial soft-focus photography, calm and reflective, gentle beige and cream tones, natural window light, understated home setting, unstyled real-feeling moment, no eye contact with camera, no logos, no text."
2. `src/assets/article-hero-emotional-supportive-moment.jpg`
   Prompt: "A parent holding their baby with another adult standing nearby offering quiet support at home, editorial soft-focus photography, warm morning light, supportive and steady mood, cream and sage tones, unstyled real moment, no crying, no distress, no clinical setting, no logos, no text."

If either generation is refused by moderation, retry with a lightly-reworded variant of the same brief.

## Body images (reuse existing assets, not yet imported here)

- `feeling-like-yourself-again` body: `src/assets/postpartum-stage-adjustment.jpg`.
- `when-parenthood-feels-heavy` body: `src/assets/guidance-card-emotional.jpg`.

Neither is currently imported in `firstYearArticleImages.ts`, so no duplicate imports.

## Edit to `src/components/firstyear/article/firstYearArticleImages.ts`

Add four imports at the top (alongside existing ones):

```ts
import heroFeelingLikeYourself from "@/assets/article-hero-emotional-feeling-like-yourself.jpg";
import heroSupportiveMoment from "@/assets/article-hero-emotional-supportive-moment.jpg";
import bodyEmotionalAdjustment from "@/assets/postpartum-stage-adjustment.jpg";
import bodyEmotionalSupport from "@/assets/guidance-card-emotional.jpg";
```

Append two entries to `firstYearArticleImageMap`:

```ts
// bespoke future: quiet parent and baby moment at home, calm emotional recovery after birth
"feeling-like-yourself-again": {
  hero: {
    src: heroFeelingLikeYourself,
    alt: "A parent holding their baby in a quiet first-year moment at home",
  },
  body: [
    {
      afterSectionIndex: 1,
      src: bodyEmotionalAdjustment,
      alt: "A calm parent and baby moment during emotional recovery after birth",
      caption: "Feeling like yourself again can happen slowly, through rest, support and small moments that help you feel grounded.",
    },
  ],
},
// bespoke future: calm supportive parent and baby moment after birth, emotionally honest but not crisis-led
"when-parenthood-feels-heavy": {
  hero: {
    src: heroSupportiveMoment,
    alt: "A parent and baby in a calm supportive moment after birth",
  },
  body: [
    {
      afterSectionIndex: 1,
      src: bodyEmotionalSupport,
      alt: "A gentle support moment for a parent caring for their baby",
      caption: "Parenthood can feel heavy and still be full of love. Support is allowed before everything feels too much.",
    },
  ],
},
```

No existing entries or imports removed. Only `firstYearArticleImages.ts` + two new asset files change.

## Verification

1. `tsgo` typecheck.
2. Playwright at 1280×1800 on both direct routes: hero renders, body renders between section 2 and section 3, medical review label, sources list, related guidance ready-only, no placeholder text.
3. Mobile viewport 375×812 on both routes: confirm no image overflow.
4. Duplication check: the two new hero srcs are used exactly once each; the two body srcs are used exactly once each within the map.
5. Regression on `/first-year/checkups-and-warning-signs/postnatal-checks-and-appointments`, `/first-year/development/baby-development-in-the-first-year`, `/articles/complete-guide-morning-sickness`, `/toddler`.

## Out of scope

Article copy, status, sources, SEO, routes, article components, topic pages, cards, and any Pregnancy / TTC / IVF / Family / Toddler files.
