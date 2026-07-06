# Phase 4.5 — Trimester landing → complete guide connection

Add one small editorial card to each trimester landing page, linking to its matching upgraded complete guide article. Place it between "Where to go deeper" and the FAQ.

## Files to edit

Three page files only:
- `src/pages/trimester/FirstTrimester.tsx`
- `src/pages/trimester/SecondTrimester.tsx`
- `src/pages/trimester/ThirdTrimester.tsx`

New shared component (kept tiny to avoid duplication):
- `src/components/trimester/TrimesterCompleteGuideCard.tsx`

No other files touched. No article data, topic data, template, route, SEO, calculator, product, About, AI, saved-journey, or design-token changes.

## Component

`TrimesterCompleteGuideCard` accepts `{ title, description, ctaLabel, href }` and renders a single quiet editorial card:

- Section wrapper: `bg-parchment` with the standard `container mx-auto px-5 sm:px-6 md:px-10 max-w-6xl` and `py-12 md:py-16`.
- Card: `max-w-3xl mx-auto rounded-2xl border border-border/40 bg-card p-6 sm:p-8 md:p-10` — matches the existing landing-page card language (soft border, parchment card surface, rounded, generous padding).
- Content stack:
  - Eyebrow: `stage-label` reading `Complete guide`.
  - Title: `font-serif text-[1.35rem] sm:text-[1.5rem] md:text-[1.65rem] text-foreground leading-snug`.
  - Description: `font-sans text-[15px] text-foreground/70 leading-relaxed max-w-xl`.
  - CTA: `<Link>` with `inline-flex items-center gap-1.5 font-sans text-[13px] font-light text-sage hover:text-sage-muted transition-colors` and an `ArrowRight` icon that nudges on hover (same pattern as `FirstTriFAQ` / `ThirdTriFAQ` "See all FAQs" and `ThirdTriDeeper` links).

Mobile: single column, natural stack, no horizontal overflow, tap-friendly CTA. Reuses existing tokens only.

## Placement

Insert `<TrimesterCompleteGuideCard ... />` in each page between the "Where to go deeper" component and the FAQ:

- `FirstTrimester.tsx`: after `<FirstTriDeeper />`, before `<FirstTriFAQ />`.
- `SecondTrimester.tsx`: after `<SecondTriDeeper />`, before `<SecondTriFAQ />`.
- `ThirdTrimester.tsx`: after `<ThirdTriDeeper />`, before `<ThirdTriFAQ />`.

## Card copy

| Page | Title | Description | CTA | Href |
|---|---|---|---|---|
| First trimester | First trimester: a complete guide | A calmer, deeper walkthrough of early symptoms, appointments, emotions and when to ask for support. | Read the complete first trimester guide | `/articles/first-trimester-complete-guide` |
| Second trimester | Second trimester: a complete guide | A fuller guide to body changes, movement, scans, emotions and the middle weeks of pregnancy. | Read the complete second trimester guide | `/articles/second-trimester-complete-guide` |
| Third trimester | Third trimester: a complete guide | A practical guide to late pregnancy, baby movements, appointments, labour signs and getting ready for birth. | Read the complete third trimester guide | `/articles/third-trimester-complete-guide` |

Eyebrow is `Complete guide` on all three.

## Verification

- `tsgo` (typecheck only, no other builds).
- Load `/pregnancy/first-trimester`, `/pregnancy/second-trimester`, `/pregnancy/third-trimester`: card present, correctly placed, correct href, no layout regressions, no source lists added, mobile has no overflow.
- Load the three `/articles/...-complete-guide` routes: still render via `ArticleFlagshipTemplate` unchanged.

## Guardrails

No NHS / NICE / Tommy's / RCOG / GOV.UK source lists on landing pages. No article-content duplication. One card per page. No redirects, noindex, canonical, or route changes. No redesign of the landing pages.
