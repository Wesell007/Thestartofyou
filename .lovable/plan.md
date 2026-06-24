
# Step 3 — First Year topic-page system

Build the 8-page topic layer underneath the First Year hub. Hub itself is not rebuilt. No month pages. No new `/postpartum` hub. No nav changes.

## Files

**Created**
- `src/data/firstYearTopicData.ts` — types, `FIRST_YEAR_TOPIC_INDEX`, and all 8 configs (slug, side, eyebrow, title, intro, hero image, what-this-covers bullets, 3 featured guidance items, 3 AI prompts, related links, `medicallyReviewed` flag).
- `src/components/firstyear/topic/FirstYearTopicPage.tsx` — reusable template (Hero → What this topic covers → Featured guidance → AI support → Related topics → Gentle endcap) + `renderFirstYearTopic(slug)` helper.
- `src/pages/firstyear/Feeding.tsx`, `Sleep.tsx`, `Development.tsx`, `CareAndSafety.tsx`, `PostpartumRecovery.tsx`, `EmotionalWellbeing.tsx`, `BodyAndHormones.tsx`, `CheckupsAndWarningSigns.tsx` — thin wrappers, one per slug.

**Edited**
- `src/App.tsx` — add 8 imports and 8 routes above the catch-all and above `/:journey/:stage`:
  - `/first-year/feeding`, `/first-year/sleep`, `/first-year/development`, `/first-year/care-and-safety`
  - `/first-year/postpartum-recovery`, `/first-year/emotional-wellbeing`, `/first-year/body-and-hormones`, `/first-year/checkups-and-warning-signs`
- `src/components/firstyear/new/FYTopicClusters.tsx` — add `slug` to each `Cluster`, wrap whole `ClusterCard` in a `<Link to={/first-year/<slug>}>` with a quiet hover lift and corner arrow. Chips remain visual only. No other hub change (layout, copy, section order, divider all preserved).

**Not touched**: every other `FY*` hub component, Navbar, Footer, all TTC/IVF/Pregnancy/legacy Postpartum files.

## Template behaviour

- Side-driven theming via tokens only — Baby uses `--stage-firstyear*`, Recovery uses `--stage-recovery*`. Drives top wash, card borders, eyebrow colour, chip tints, AI block tokens, same-side related row. Cross-side related row uses the other side's accent so the pairing is visually felt.
- Hero: tinted top wash, eyebrow `First Year · {Baby's first year | Postpartum recovery}`, H1, 2–3 sentence intro, photo with soft tinted halo. No sprigs, no Pregnancy motifs. Two-column 7/5 at `md+`, stacked on mobile in eyebrow → H1 → intro → image order.
- What this topic covers: card lifted into the hero band, short italic lead, 4–6 bullets in 2-col at `md+`.
- Featured guidance: 3 editorial cards (image + realistic British-English title + one-line "why") linking to `/ask?q=<encoded title>`. No lorem, no placeholder thumbs — uses curated existing assets only (`firstyear-stage-*`, `postpartum-stage-*`, `guidance-firstyear`, `guidance-postpartum`, `myweek-baby-*`, `article-hero-*-sleep`). Section header "Featured guidance" (never "Articles").
- AI support: existing `HubAISupport` with topic-specific `heading`, `description`, `suggestions`, `context`, and the side's `stageBg`/`stageAccent` tokens so it sits embedded in the page rather than feeling like a generic chatbot block.
- Related topics: row 1 "More in {own side}" with 3 same-side siblings; row 2 "From the other side" with 2 cross-side links per the pairing map in the brief.
- Gentle endcap: one calm closing line (side-specific, no pressure), Medically reviewed trust line repeated where required, two quiet pill links — "Back to First Year" and the cross-side hub anchor (`/first-year#recovery-topics` for baby, `/first-year#baby-topics` for recovery).
- Medically reviewed trust line ("✔ Medically reviewed by Jenny Joines") shown near hero **and** in endcap on: `care-and-safety`, `postpartum-recovery`, `emotional-wellbeing`, `body-and-hormones`, `checkups-and-warning-signs`.

## Responsive

- **Desktop**: max-w 6xl, 7/5 two-column hero, 3-up featured grid at `lg+`, controlled prose width.
- **Tablet (`md`)**: hero stays 2-col with the image column narrower so neither side cramps; featured grid is 2-up at `sm/md` and 3-up only at `lg+`; same-side related row is 2-up at `sm` / 3-up at `lg`; cross-side row stays 2-up.
- **Mobile**: hero stacks (eyebrow → H1 → intro → image), all grids collapse to 1-col, AI prompt chips wrap, endcap buttons stack with full tap area, no horizontal scroll.

## QA before sign-off

All 8 routes load and are reachable from the hub cluster cards. Baby pages render with `--stage-firstyear*`; Recovery pages with `--stage-recovery*`. Cross-side related links present on both sides. Medical trust line present on the 5 medical pages. No lorem, no placeholder thumbs. `/postpartum` redirect and First Year hub layout otherwise unchanged.

## Return after build

A. Changed files
B. All 8 routes live and reachable from the hub
C. Baby pages use First Year tokens; Recovery pages use Recovery tokens
D. Cross-side related links present on both sides
E. First Year hub not rebuilt
F. Any compromises noticed during implementation
