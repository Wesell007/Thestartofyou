# Toddler Topic Pages — Premium Polish Pass

Single-file polish of `src/components/toddler/topic/ToddlerTopicPage.tsx`. No route, data, asset, nav, or cross-journey changes.

## File touched
- `src/components/toddler/topic/ToddlerTopicPage.tsx` (only)

`Check` icon from lucide-react is already used elsewhere in the project, so no new deps. No edits to `toddlerTopicData.ts` needed.

## Polish moves

### Hero
- Apricot-to-parchment vertical wash plus soft apricot bloom behind the H1.
- Breadcrumb stays outside the card (mb-10/12, lighter weight, subtle hover).
- Parchment hero card: 28px radius, 1px apricot border, warm soft shadow + inner highlight, padding `p-7 sm:p-10 md:p-14`.
- Accent rule + eyebrow → H1 scale `2.3rem → 3.1rem` with tighter leading → standfirst constrained to `max-w-[34rem]` at 16px for readability.
- Medically reviewed pill: stronger border, mt-9.

### Illustration
- Existing `ToddlerIllustrations` only.
- Moved inside the hero card: `absolute -bottom-6 -right-4` (md scales up), `w-40 md:w-56 lg:w-64`, `opacity-[0.26]`, `hidden md:block`, `pointer-events-none`. Integrated, never floating.

### What this covers
- 26px radius card, warmer apricot border, layered shadow + inner highlight.
- Serif italic lead with faint apricot left rule.
- Apricot-ringed `Check` markers (subtle, premium, not generic checklist), two-column on md+, single on mobile, generous row gap.

### Common questions
- 18px radius accordion items, warmer apricot border.
- Hover: -1px lift + warm shadow.
- Open state: faint apricot tint fill + 2px apricot left accent bar.
- Trigger typography bumped to 17–18px serif; answer at 15px with `max-w-prose` and looser leading.

### AI support
- Section wash kept; container tightened to `max-w-3xl`.
- Centred editorial eyebrow "Ask anything" above the panel.
- Panel: 28px radius, stronger apricot border, layered shadow, `parchment/85` with subtle backdrop blur.
- Footnote smaller and muted.

### More toddler topics
- Eyebrow + H2 "Continue exploring".
- Cards: 20px radius, parchment, apricot border, soft rest shadow, -2px hover lift, equal heights via `h-full flex flex-col justify-between`.
- Chevron pinned bottom-right inside a circular apricot-soft chip; nudges 1px on hover.
- Grid `1 / 2 / 3` at mobile / md / lg.

### Final CTA
- Centred `max-w-2xl` panel, 28px radius, apricot border.
- Apricot-to-parchment 160° gradient, warm shadow.
- Stronger button affordance with deeper hover shadow.
- `pb-28 md:pb-32` for breathing room above Footer.

## Technical rules
- Only existing `--stage-toddler*` and `--parchment` tokens.
- No new CSS tokens, no new dependencies, no route changes, no data model changes, no asset changes.

## Verification
- Playwright at 1280 / 1024 / 390 across all 8 routes (`development-milestones`, `behaviour-emotions`, `speech-language`, `sleep`, `food-feeding`, `potty-learning`, `health-safety`, `play-connection`).
- Full-page screenshots + targeted hero card, accordion, related grid shots.
- Confirm no horizontal scroll, illustration hidden on mobile, sections stack cleanly, CTA spaced from Footer, routes intact.

## Out of scope
No month pages, age pages, article pages, Family/Parent hubs, nav changes, or asset changes. Navbar, Footer, TTC, Pregnancy, First Year, IVF, legacy Postpartum, Journal untouched.
