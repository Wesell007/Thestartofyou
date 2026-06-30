# Toddler Age Pages — Phase 3

Build 5 Toddler age stage-guide pages (age ranges, not individual month pages) and wire the hub age strip to them.

## Files to create

- `src/data/toddlerAgeData.ts` — typed registry of the 5 age configs (slug, eyebrow, title, ageRangeLabel, standfirst, optional stageSummary, whatChanges, developmentAreas[], commonQuestions[], gentleSupport, ai*, relatedTopics, previousAge, nextAge). Adds a small `TODDLER_TOPIC_LABELS` lookup so the template can label related/topic-link cards without pulling in the topic template.
- `src/components/toddler/age/ToddlerAgePage.tsx` — shared age-page template.
- `src/pages/toddler/age/TwelveToSeventeenMonths.tsx`
- `src/pages/toddler/age/EighteenToTwentyThreeMonths.tsx`
- `src/pages/toddler/age/TwoYears.tsx`
- `src/pages/toddler/age/ThirtyMonths.tsx`
- `src/pages/toddler/age/ThreeYears.tsx`

## Files to edit

- `src/App.tsx` — import the 5 page wrappers and register `/toddler/12-17-months`, `/toddler/18-23-months`, `/toddler/2-years`, `/toddler/30-months`, `/toddler/3-years` directly after the existing toddler topic routes, above `/:journey/:stage` and the catch-all.
- `src/components/toddler/ToddlerAgeNav.tsx` — swap the 5 hub age pills from `/ask?q=…` to the 5 real routes. Visuals unchanged.

## Page structure (template)

Navbar → Hero (stage-led card: breadcrumb `Toddler › <title>`, eyebrow `Toddler age guide · <eyebrow>`, H1, age-range pill, standfirst, optional stage summary card) → "What changes around this age" parchment card with 5–7 bullets → "Development areas" grid (each card links to its existing topic route; user-facing label "Potty training" routes to `/toddler/potty-learning`) → `HubAISupport` with `stageBg="--stage-toddler"`, `stageAccent="--stage-toddler-accent"` and age-specific prompts → Common questions accordion (5 Qs) → Gentle support panel → Related toddler topics (3–4 cards) → Previous / next age pager → soft "Back to the Toddler hub" link → Footer.

## Design and content rules

Tokens used only: `--stage-toddler`, `--stage-toddler-soft`, `--stage-toddler-accent`, `--stage-toddler-deep`, `--parchment`. No new CSS, no image generation, no woodland hero marks, no childish graphics, no medical-style layout. UK English; variability language ("many toddlers", "you might notice", "some children", "worth a calm conversation with your health visitor or GP if"). No fixed milestones, no medical overclaim, no long article copy.

## Out of scope

No edits to: toddler topic template, toddler topic data, topic hero images, hub hero video/poster, Navbar, Footer, TTC, Pregnancy, First Year, IVF, legacy Postpartum, Journal. No new nav items, journeys, article pages, or individual month pages.

## Verification

Playwright at 1280 / 1024 / 390 for `/toddler` and all 5 new routes plus one existing topic route. Confirm hub age cards link to the new pages, no horizontal scroll, hero readable, cards and AI support stack cleanly, prev/next pager works, related topic links work.
