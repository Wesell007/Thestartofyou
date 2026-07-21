## Phase 11.8a.1 — First Year Month Guide Format Rework

Reposition the four live month guides (Newborn, 1m, 2m, 3m) from card-stacked utility pages to premium, article-led baby age guides with a strong parallel parent thread. No new routes, no 4–12m pages.

### Files to edit
- `src/data/firstYearMonthData.ts` — extend the `MonthGuide` type and rewrite content for all four months to the new depth.
- `src/components/firstyear/month/FirstYearMonthPage.tsx` — restructure sections into an editorial flow.
- `src/components/firstyear/new/FYPhaseNav.tsx` — update hub heading + subcopy only (keep age pills as is).

Only touch `src/pages/firstyear/MonthPage.tsx` if a layout wiring change is required (not expected).

### Data model changes (`firstYearMonthData.ts`)
Extend `MonthGuide` with new fields; keep old ones for continuity:

```text
shortVersion:  { baby, feeding, sleep, you, whenToAsk }   // renamed from atAGlance intent
babyEditorial: { intro, subsections: [{ heading, body }] } // 5–7 subsections
feedingSection:{ intro, points: string[], whenToAsk: string }
sleepSection:  { intro, points: string[], safeSleep: string, whenToAsk: string }
youEditorial:  { intro, subsections: [{ heading, body }] } // parent thread
feelsHardIntro: string  // short reality-naming paragraph
whatHelpsIntro: string
```

Keep existing: `hero`, `phase`, `support`, `questions`, `related`, `sources`, SEO, adjacency helpers.
Retain `atAGlance` only if still referenced elsewhere; otherwise remove.

Rewrite all four months to hit the depth bar:
- 1 standfirst, 1 short version, 5–7 baby subsections, dedicated feeding, dedicated sleep, parent section, 4 feels-hard, 4 what-helps, 3–4 support signposts, 4–6 questions, 3–5 UK sources (NHS, Start for Life, UNICEF Baby Friendly, Lullaby Trust, Tommy's, NCT, NICE).

### Component changes (`FirstYearMonthPage.tsx`)
New section order:

```text
1.  Hero (editorial standfirst, phase pill, prev/next, back to hub)
2.  The short version           (premium overview card, 5 rows)
3.  What your baby may be doing (editorial intro + 5–7 subsections with serif h3s)
4.  Feeding this month          (dedicated editorial + points + when to ask)
5.  Sleep this month            (dedicated editorial + safe sleep + when to ask)
6.  You this month              (parent editorial subsections)
7.  What often feels hard       (intro paragraph + numbered rows)
8.  What can help               (intro paragraph + numbered rows)
9.  When to ask for support     (existing panel, HV/GP/midwife/111)
10. Common questions            (hub-style cards, Read + Ask)
11. Related guidance
12. References and guidance
13. Foot rail prev/next
```

Visual language:
- Editorial sections use `max-w-3xl`, serif h2 kickers, generous vertical rhythm, hairline dividers between subsections rather than card walls.
- Feeding + Sleep get soft tinted panels (firstyear-soft / recovery-soft respectively) so the dual-track brand still reads.
- Keep existing card treatments for Short Version, Support, Questions, Related, References.
- No new imagery.

### Hub heading update (`FYPhaseNav.tsx`)
Replace "Go to your baby's age" with:
- Heading: `Your baby's first year, month by month`
- Subcopy: `Choose your baby's age for a deeper guide to development, feeding, sleep, care and how this stage may feel for you.`

Keep the age pill grid and existing links (Newborn–3m to guides, 4–12m to phase hubs) untouched.

### Guardrails
- UK English, no em/en dashes in new copy (route hyphens fine).
- No milestone pressure ("your baby should"), no fear language, no diagnosis.
- Only verified live First Year article slugs in Read links; no `href="#"`.
- No changes to routes, sitemap, robots, redirects, SEO infra, or any other stage/domain.
- No 4–12m month pages created.

### Verification
- `bunx tsgo --noEmit` passes.
- Manually load `/first-year/newborn`, `/1-month`, `/2-months`, `/3-months` and confirm new sections render.
- Hub `/first-year` shows updated heading + subcopy above the age pills.
- Ask CTAs point to `/ask?stage=first-year&month=<slug>&topic=<topic>`.
- All Read links resolve to existing First Year article routes.

### Deliverable
Report on files inspected/edited, hub heading, each of the four month pages, baby focus vs parent thread balance, feeding + sleep sections, questions, Ask CTAs, article links, references, visual result, preservation checks, typecheck result, and readiness to continue with 4–12 months.
