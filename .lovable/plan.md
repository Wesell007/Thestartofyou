
# IVF Pass 2 — Hub Premium Rebuild

Hub-only. No stage page, TTC, Pregnancy, nav, routing, or article changes.

## Files

- `src/pages/IVF.tsx` — new section order + reuse existing components
- `src/components/ivf/IVFHero.tsx` — right column rebuilt: single photo + truth band; calculator stays the anchor
- `src/components/ivf/IVFStages.tsx` — premium per-stage themed cards, larger imagery
- `src/components/ivf/IVFWhatMakesDifferent.tsx` — recomposed to 3 compact points on parchment, lilac hairlines
- `src/components/ivf/IVFCommonQuestions.tsx` — slimmed to a compact 4-question pill grid (hub-wide)
- `src/components/ivf/IVFReflection.tsx` — retuned to a quiet text-only endcap (no textarea, no CTA)
- `src/assets/ivf-hero-moment.jpg` — already generated (lavender + tea, calm window light)

## Section order in `IVF.tsx`

```text
IVFHero
IVFPathwayPosition
IVFWhatThisCovers
IVFWhatMakesDifferent   ← new on hub
IVFAISupport
IVFStages               ← rebuilt cards
IVFCommonQuestions      ← new on hub (slimmed)
IVFReflection           ← new on hub (retuned)
IVFFinalCTA
```

## Hero
- Left: keep eyebrow, headline, paragraph, calculator (remove the tiny inline "3 stages / 14 day wait" stat row to declutter)
- Right: replace prompt-button stack and small emotional card with one photographic moment (ivf-hero-moment.jpg) + a quieter truth band (italic line + thin lavender hairline + two restrained stats moved from calculator)
- Soften ambient glow opacity by ~10%

## Editorial beat (`IVFWhatMakesDifferent`)
- 3 statements: procedure-based timing, frequent monitoring, waiting periods feel different
- Parchment background, lilac hairlines top/bottom, pull-quote kept, stat row dropped

## Stage cards
- Per-stage theme via inline HSL (matches Pass 1 IVF_THEME)
- Image column grows to 280px on md; mobile image full-bleed h-56
- 44px icon disc + "Stage 0X" chip overlaid on image bottom-left
- Card surface gets a faint stage-tinted background; emotional chip themed per stage with lilac dot
- Hover: -translate-y-0.5, image scale-[1.04] 600ms, border intensifies
- Removed the single "featured" override; all 3 cards equally premium
- Section sits on `bg-parchment-dark` to create tonal layering

## Common questions
- 4 IVF-wide questions in a 2×2 pill grid, deep-linking to `/ask?q=`
- Centered eyebrow + serif H2; no decoration beyond lilac hairline above

## Reflection
- Centered, text-only: italic serif line + supporting sans line
- Lilac hairlines above and below; no textarea, no journal CTA

## Lilac strengthening (no token changes)
- Tonal layering: hub alternates parchment / parchment-dark
- Recurring `h-px max-w-32` lilac dividers between major beats
- Eyebrow rails standardised across sections
- Stage tints sourced from Pass 1 themes for hub ↔ stage continuity

## Responsive
- Desktop: 2-col hero balanced; right never louder than calculator
- iPad: hero stays 2-col at md; stage cards keep image-left layout; common questions 2-col
- Mobile: single-column; hero image max-h 360px; stage cards image-top; quiet reflection centred

## Out of scope
IVF stage page template, TTC, Pregnancy, articles, navbar, routing, design tokens, IVFAISupport internals, IVFFinalCTA internals.

## Pause
Pause after build for review before any Pass 3.
