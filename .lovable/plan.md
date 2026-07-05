
## Our Story Page — Premium Strategy Upgrade

Route stays at `/about`. This is a strategy, copy and visual polish pass across the existing About components, plus one new Journal Connection section. No new routes, tokens, assets or shared-logic edits.

### Files to edit
1. `src/pages/About.tsx` — insert `AboutJournalConnection` in the new section order
2. `src/components/about/AboutHero.tsx` — H1 + supporting copy + italic line refresh; 4-item stat card with warm gradient
3. `src/components/about/AboutProblem.tsx` — 3 cards with the exact provided copy; warm gradient cards
4. `src/components/about/AboutApproach.tsx` — reframed as "What we built" with heading *"So we built something connected"* and 4 warm cards (Stage-by-stage guidance, Tools when they help, AI support in context, A journal for what matters)
5. `src/components/about/AboutEcosystem.tsx` — reframed as *"One journey, connected across every stage"* — 8 link cards to existing routes only (`/trying-to-conceive`, `/pregnancy`, `/first-year`, `/toddler`, `/family`, `/product`, `/due-date-calculator`, `/ask`), soft sage borders, warm gradient
6. `src/components/about/AboutAdaptive.tsx` — 6 warm cards (TTC, Pregnancy, First year, Toddler, Family, The journal) with the exact provided one-liners
7. `src/components/about/AboutDifferent.tsx` — 4 sharpened numbered cards, warm gradient
8. `src/components/about/AboutMission.tsx` — refreshed "Why this exists" copy, keeps `clear · calm · human` phrase treatment
9. `src/components/about/AboutCTA.tsx` — "Start where you are" with 4 pathway link cards → `/pregnancy`, `/due-date-calculator`, `/product`, `/family`

### Files to create
10. `src/components/about/AboutJournalConnection.tsx` — eyebrow "Physical and digital", heading *"Some moments need somewhere offline to live"*, two warm cards ("The site guides you", "The journal holds it"), soft secondary CTA "View the journal" → `/product`

### New section order in `About.tsx`
```text
AboutHero
AboutProblem
AboutApproach          ← reframed "What we built"
AboutEcosystem         ← reframed "One journey, connected"
AboutAdaptive          ← "Support that adapts to where you are"
AboutJournalConnection ← NEW
AboutDifferent         ← "Designed differently"
AboutMission           ← "Why this exists"
AboutCTA               ← "Start where you are"
```

### Visual polish (existing tokens only)
- Warm card gradient on Problem, Approach, Adaptive, Journal Connection, Different, Ecosystem and CTA link cards: `bg-gradient-to-br from-white via-[#FBF8F1] to-[#F4EFE4]`
- Soft sage borders (`border-sage/20`), rounded editorial cards (`rounded-2xl`), hairline dividers (`editorial-rule`, `section-divider`), consistent `stage-label` eyebrows, serif headings, sage accents
- Mobile: all grids stack cleanly, no horizontal scroll

### Out of scope (unchanged)
`/about` route, Navbar, Footer, global tokens, article system, AskPage, AISearchBar, HubAISupport, `aiStageStyles`, auth, setup, saved journey logic, sibling hubs, product page, product images, edge functions. No new routes, assets or tokens. No article changes.

### Verification
- `tsgo` typecheck
- Playwright `/about` at 1280, 1024 and 390 — screenshot each; confirm no horizontal scroll, mobile stacks, Journal Connection renders
- Click-through confirm all CTA links resolve to existing routes
- Spot-check `/product`, `/pregnancy`, `/family`, `/first-year`, `/toddler` still render
