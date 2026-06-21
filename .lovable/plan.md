# TTC premium-parity — Pass 1 (hub only)

Pass 1 of the approved 3-pass uplift. Scope: TTC hub page only. Topic + subtopic pages (Pass 3) and the 6-tile supporting-guides map (Pass 2) deferred. Pregnancy untouched.

## Guardrails (from approval)

- Premium quality, not literal port. TTC stays lighter, cooler, earlier-stage, more exploratory — not "Pregnancy in green".
- Left-edge hero photo is direction, not a hard copy. TTC keeps more breathing room (image strip ~22% on desktop vs Pregnancy's 24%; content pushed less far right).
- Sprigs used sparingly — major sections + cards only, not on every element. One decorative per surface.
- Stage cards stay calm: prioritise image treatment, hierarchy, inline child links, clear CTA. Restrained accents.
- AI block stays immediately useful for cycle/timing questions — utility chips kept intact, premium polish layered over.

## 1. `TTCHero` uplift

- Drop the three radial colour blurs.
- Introduce left-edge lifestyle photograph (newly generated TTC image: hands holding a warm ceramic mug on linen, eucalyptus sprigs, morning window light — no nursery, no baby items).
  - Desktop: ~22% width edge-bleed, soft gradient fade to parchment.
  - Mobile: rounded-3xl image strip on top, eyebrow chip floating on the image.
- Right-shift content with `md:pl-[18%]` (slightly less than Pregnancy's `pl-[20%]`) for more breathing room.
- Keep both the calculator card and the common-questions panel — they are TTC's tool-first identity. Place common questions beneath the calculator in the right column, so the hero stays visibly tool-first.
- Upgrade calculator card chrome: tinted icon medallion next to eyebrow, hairline gradient accent across the card top edge, layered inset+drop shadow, one faint sprig hovering above the card (desktop only).
- Keep stat anchors and italic emotional quote; trim the three-dash colour trail (visual noise).

## 2. New `TTCWhatThisCovers` card

- New file `src/components/ttc/TTCWhatThisCovers.tsx` modelled on `PregnancyWhatThisCovers`.
- Single rounded white card on parchment, accent-tinted border, **one** sprig in corner (restrained).
- Eyebrow "OUR STARTING POINT" → serif H2 "What this hub covers" with italic span → intro paragraph → TTC-specific 2-col grid of 6 check bullets → muted handover line acknowledging the IVF path.
- Replaces `TTCWhatThisIs` in `TTC.tsx`. `TTCWhatThisIs` file kept in repo but removed from hub.

## 3. `TTCStages` → premium 3-stage map (calm)

Only the existing 3-stage row is upgraded. The 6-tile supporting-guides map remains Pass 2.

Per stage card:
- Existing photographic thumbnail kept.
- Floating eyebrow chip on the image ("STAGE 01 / 02 / 03") — Pregnancy trimester-card pattern.
- Per-stage accent — three TTC green-family variations (sage / eucalyptus / mineral) so the row reads cohesive but differentiated.
- One small sprig in card corner (one decorative element per card, no stacking).
- Inline list of **2 child links** per stage, drawn from existing TTC topic data, no duplicate surfacing:
  - Stage 01 *Understanding your cycle*: Cycle tracking, Age and fertility
  - Stage 02 *Timing and tracking*: Ovulation, Preconception health
  - Stage 03 *Waiting and testing*: Two-week wait, Pregnancy tests
- "Explore stage →" CTA at card foot.
- Hover: lift + shadow growth + accent border. Nothing else.

## 4. `TTCAISupport` uplift

- Adopt the Pregnancy AI-panel composition:
  - Tinted full-width band (refine TTC tint).
  - Centred composition (drop the 2/3 split).
  - One sprig in the gutter, restrained.
  - Trust microcopy beneath the bar ("Trusted, calm guidance — never a replacement for medical advice.").
- Keep TTC-specific suggested-question chips (cycle, ovulation, timing, testing) — utility-first stays intact.
- Move the TTC pull quote to a quieter position under the band.

## 5. Compress `TTCFocus` + `TTCWhatToExpect` + `TTCWhatMakesDifferent`

- `TTCFocus` kept as the primary editorial band ("What to focus on right now"). Typography tightened to the new rhythm.
- `TTCWhatMakesDifferent` compressed into a quiet italic-serif interlude band between focus and AI (same role as Pregnancy's "Your body shifts week by week"). Single line, soft tinted full-width band, no card chrome.
- `TTCWhatToExpect` removed from the hub (duplicated by `TTCFocus` + `TTCCommonQuestions`). Component file kept in repo.

## 6. `TTC.tsx` order after Pass 1

```text
1.  TTCHero                  (upgraded)
2.  TTCWhatThisCovers        (new — replaces TTCWhatThisIs)
3.  TTCStages                (upgraded — 3 premium stage tiles)
4.  TTCFocus                 (tightened)
5.  TTCWhatMakesDifferent    (compressed to italic interlude)
6.  TTCAISupport             (upgraded)
7.  TTCCommonQuestions       (unchanged)
8.  TTCEmotionalReminder     (unchanged)
9.  TTCReflection            (unchanged)
10. TTCCapture               (unchanged)
11. TTCPathways              (unchanged — Pass 2 will restyle)
12. TTCFinalCTA              (unchanged)
```

Removed from hub: `TTCWhatThisIs`, `TTCWhatToExpect` (files kept).

## Files touched

- `src/pages/TTC.tsx`
- `src/components/ttc/TTCHero.tsx`
- `src/components/ttc/TTCWhatThisCovers.tsx` (new)
- `src/components/ttc/TTCStages.tsx`
- `src/components/ttc/TTCAISupport.tsx`
- `src/components/ttc/TTCFocus.tsx` (typography pass)
- `src/components/ttc/TTCWhatMakesDifferent.tsx` (compress to interlude)
- `src/assets/ttc-hero-lifestyle.jpg` (already generated)

## Out of scope (deferred)

- Pass 2: 6-tile TTC supporting-guides topic map + `TTCPathways` restyle.
- Pass 3: `TTCTopicPage` + `TTCSubtopicPage` premium uplift.
- IVF, Pregnancy, articles, navbar, week pages.

## Review gate

Pause after Pass 1 ships for hub review before opening Pass 2 or Pass 3.
