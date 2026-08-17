# Phase 26A — First Year App Experience Reframe Strategy

Audit only. No build in this phase.

## 1. Honest product verdict

First Year is functionally complete and safe, but it currently reads as a private reading room with a note pad attached, not as a personalised app. Pregnancy (My Week) is further ahead as a product: it has an inline companion card, week artwork, memory capture and a clear emotional spine. First Year has the data foundations (babies, entries, memories, photos, stage derivation) but the surface does not yet express them.

The gap is presentation and hierarchy, not architecture.

## 2. Why it feels too article-led

Measured on `/my-first-year` as it stands (11 mounted sections):

- Hero panel, baby summary: 0 article links
- "For this stage": 3 guidance links plus 1 parent link
- Today, Recently saved, Memories, Kept chapter: personal, 4 internal app links
- Two support lanes: 3 + 4 = 7 public guide links
- What comes next: closing tail

So roughly 11 of the 15 outbound links on the signed-in home lead out to public guide pages, and the two support lanes occupy the widest, most visually prominent block below the fold. The personal state (today's note, recent notes, memories) is squeezed between two blocks of navigation. Every card also uses the same treatment — white surface, thin accent border, serif title, small grey detail — so a memory looks identical to an article link. Nothing signals "this is yours".

## 3. Recommended new home hierarchy

```text
1  Hero            baby name(s), age in weeks/months, companion presence
2  Today           primary action card, visually the heaviest element
3  Ask Cindy       inline companion card with age-aware chips
4  Recently saved  quiet glance back (merged visually under Today)
5  Memories        keepsake strip with photo thumbnails
6  For this stage  age-aware guidance, 3 cards max
7  For you         parent recovery and wellbeing, single lane
8  Kept chapter    only when a pregnancy chapter exists
9  Explore guidance  collapsed/secondary block replacing both support lanes
10 What comes next   light tail
```

Changes from today: support lanes drop from two full lanes (7 links) to one parent lane plus a single compact "Explore guidance" block; Today and the companion move above everything navigational.

## 4. Recommended Cindy / AI presence

Existing infrastructure, confirmed:

- `supabase/functions/ai-search` — streaming SSE edge function, origin-locked, already live
- `src/hooks/useAISearch.ts` — streaming client with cancellation and error copy
- `src/lib/companionContext.ts` — pure builder that deliberately excludes names, notes and media; currently pregnancy-week shaped only
- `src/components/myweek/SectionAskAI.tsx` — the proven inline card pattern
- `src/hooks/useCompanionIdentity.ts`, `src/lib/companion.ts` — name and tone from `profiles`
- `src/components/shared/HubAISupport.tsx`, `AskLink`, `askNavigation` — public hub pattern

So no backend work is required for a First Year companion. What is missing is a First Year context builder (baby age band + tone + page hint, no names, no note text) and the three placements.

Placements:

- `/my-first-year` — an "Ask {name}" card in slot 3, with age-band chips ("What can I expect around 4 months?", "Help me think about what to ask at the next check-up", "How do I look after myself this week?")
- `/my-first-year/today` — after a successful save, one quiet line: "Talk this through with {name}", pre-filling only a generic prompt, never the note text
- `/my-first-year/memories` — an optional "Help me put this into words" action on the compose form

Privacy boundary to hold in 26B: private note and memory text is never sent implicitly. If we want "help me make sense of this note", it must be an explicit per-note button whose payload is that single note, sent only on that click, with visible wording saying so. Recommendation: ship 26B without note-sending, and treat note-aware help as a separate later phase with its own consent copy.

Every companion surface keeps the existing boundary line: not a replacement for a midwife, GP or health visitor.

## 5. Recommended UI direction

Move from flat white cards to a layered, tinted app surface:

- Tinted page field rather than near-white: a soft baby-blue wash already exists (`--stage-firstyear` at 0.35) but is barely visible; raise it and add a warm cream band behind the personal block
- Three card weights instead of one: primary (Today, Ask Cindy) with gradient fill and stronger shadow; secondary (Memories, stage guidance) with tinted fill; tertiary (Explore guidance) as plain list rows, not cards
- Icon pills for section kickers — small rounded tinted chips with a lucide icon, replacing the uppercase letter-spaced label everywhere
- Soft gradients on the hero and the two primary cards only
- Photo memories get rounded thumbnails with a soft inner border, so the memories strip reads visually as a keepsake row
- Keep serif headings, keep 15px body, keep the calm tone; add colour and depth, not decoration

## 6. Recommended colour system

All as tokens in `index.css`, no hardcoded hex in components:

- Baby blue `--stage-firstyear` family (exists) — baby-side surfaces, Today card
- Sage (exists) — companion/Cindy surfaces and focus ring, already the focus colour
- Warm cream — new `--stage-firstyear-cream`, the personal band background
- Soft peach — new `--stage-firstyear-peach`, memories and keepsake accents
- Rose/postpartum `--stage-postpartum` (exists) — recovery cards
- Lavender (exists) — parent emotional wellbeing
- Two gradient tokens: `--gradient-firstyear-today` (blue to cream) and `--gradient-firstyear-companion` (sage to cream)

Contrast: every accent used for text must be checked at AA on its own surface; accents below AA are used for borders and fills only.

## 7. Today redesign direction

- Header card with baby name, age today and date, on the blue-to-cream gradient
- Baby and parent lanes get distinct tints (blue / rose) and icon pills, so the form reads as two moments rather than one long stack
- Softer saved state: "Saved" confirmation replaces the input in place rather than a separate summary far below
- "What you saved today" becomes a warm recap card with the day's notes as quoted lines
- One companion line after saving
- No counts, no streaks, no targets — unchanged rule

## 8. Memories redesign direction

- "Save a moment" card on peach/cream with a warm invitation, not a form header
- Photo field shows a proper rounded preview with a soft frame
- Memory cards get a date ribbon and a keepsake surface; photo memories show a thumbnail inline
- Stronger empty state: one illustration-free but warmly worded panel that explains what a memory is and offers the first prompt
- Optional "Help me put this into words" companion action on the compose form only
- Stays chronological and text-first; not a gallery grid

## 9. Article-link reduction

Stay on the home page (personal or age-relevant):

- "For this stage" — 3 cards, unchanged
- Parent lane — reduced from 4 to 3: recovery, body and hormones, emotional wellbeing

Move into a single lower "Explore guidance" block, as plain rows:

- Development, Nappies and care, Check-ups and questions, Questions to bring up

Net effect: outbound public-guide links on the home fall from 11 to about 7, and only 4 of them appear above the Explore block.

## 10. Files likely to change in Phase 26B

- `src/index.css`, `tailwind.config.ts` — new tokens and gradients
- `src/pages/firstyear/MyFirstYear.tsx` — new section order
- `src/components/firstyear/journey/*` — Hero, BabySummary, Today, RecentlySaved, Memories, StageGuidance, SupportLane, WhatComesNext
- New: `FirstYearAskCompanion.tsx`, `ExploreGuidance.tsx`, `src/lib/firstYearCompanionContext.ts` (+ test)
- `src/pages/firstyear/FirstYearToday.tsx`
- `src/pages/firstyear/FirstYearMemories.tsx`, `src/components/firstyear/memories/*`

## 11. Files that must not change

- `supabase/migrations/**`, no schema change
- `supabase/functions/**` including `ai-search`
- `src/integrations/supabase/client.ts`, `types.ts`
- `src/lib/firstYearEntries*.ts`, `firstYearMemories*.ts`, `firstYearJourney.ts`, `firstYearStage*.ts` logic (presentation only)
- `scripts/generate-sitemap.ts`, `public/robots.txt`, `src/App.tsx` routes
- Public article data and public First Year hub pages

## 12. Is AI backend work needed?

No. `ai-search` already streams and is origin-locked. Phase 26B needs only a client-side First Year context builder and UI. Note-aware assistance would need new consent copy but still no new backend.

## 13. Risks and open questions

- Colour risk: adding six tints can tip into childish. Mitigation: tints at low alpha, one accent per section, no more than two gradients on a page.
- Contrast risk on tinted surfaces; needs an AA pass.
- Companion expectation: an "Ask Cindy" card invites clinical questions. The boundary line and the existing refusal behaviour in `ai-search` must be verified against First Year phrasing before shipping.
- Open: should "Explore guidance" be collapsed by default or always visible as rows?
- Open: do you want the companion card visible when the user skipped naming a companion (falls back to "Ask AI"), or hidden entirely?

## 14. Should Phase 26B proceed?

Yes, as a presentation and hierarchy phase with one new client-side companion surface, no schema and no backend change. Suggested split if you prefer smaller steps: 26B visual system and home hierarchy, 26C Today and Memories, 26D companion placements.
