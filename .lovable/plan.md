# Phase 21A — First Year Onboarding Upgrade Strategy

Audit and recommendations only. No code changed in this phase.

## 1. Current setup flow

`/setup/first-year` (`src/pages/setup/FirstYearSetup.tsx`) runs four steps inside one keepsake card, with a "Step N of 4" line and a Cancel link:

1. **Intro** — mode-aware copy from `FIRST_YEAR_SETUP_COPY` (transition vs direct), Begin / Not right now.
2. **Who has arrived?** — radio list of One baby / Twins / Triplets / Four babies, one shared date of birth, optional name per baby.
3. **Companion** — three session-only radio choices (Continue gently / Personalise Cindy with my pregnancy journey / Decide later). Nothing is stored, and direct users lose the "personalise" option.
4. **Review** — summary, then `save_first_year_journey` RPC and redirect to `/my-first-year`.

Guard logic lives in `src/lib/firstYearEntry.ts`: pointer `first_year` redirects into the product, no pointer means direct mode, pregnancy `given_birth` means transition mode, everything else redirects quietly.

## 2. What is working

- The two-mode split is clean and safe: direct users never see pregnancy language.
- Validation is pure and honest (`firstYearSetupSchema.ts`): 1-4 babies, no future DOB, max ~5 years back, 60-char names, birth order from row position.
- Focus moves to each step heading, errors are announced, and the save error is a calm sentence.
- Multiples already work end to end, including the copy layer (`describeBabies`, `babyAgeSentence`).

## 3. What feels unclear

- **No value explanation anywhere.** The user enters a DOB and lands on the dashboard. Nothing tells them what Daily Check-in, Memories, guidance by age or the recovery lane are for.
- **"Four babies" is a dead end** and reads oddly next to Twins and Triplets. There is no signal about the limit.
- **The companion step is confusing.** It asks about a personalisation that does nothing and is never stored, while the real companion name (`profiles.companion_name`) is set elsewhere in `/setup` and `/account-settings`. Direct First Year users may never have seen that screen, so Cindy can appear with no introduction at all.
- **No stage framing.** `getFirstYearAge` already derives days, weeks, calendar months and `isInFirstYear`, but setup never mentions the baby's stage, and a 3-year-old DOB is silently accepted.
- **Returning loses your place.** `ScrollToTop` forces the top of the page on every route change, so a tap into a support card and back drops the user at the hero.
- **The return link sits at the top** of `/my-first-year/today` and `/my-first-year/memories`, inviting an exit before the user has done anything.

## 4. Recommended new setup flow

Six steps, shared by both modes, with mode-specific copy only:

1. **Welcome** — what First Year is (transition: your pregnancy chapter is kept; direct: no pregnancy mention).
2. **Who has arrived?** — count, shared DOB, optional names (unchanged mechanics, better wording).
3. **Your baby's stage** — derived from DOB, shown back as a sentence, with the over-12-months path handled here.
4. **What your First Year home gives you** — the value moment, read-only, one Continue button.
5. **Your companion** — name choice, plus the Cindy introduction for anyone with no companion set.
6. **Review and start** — as today, with stage and companion name added to the summary.

Direct and transition users share the sequence; only step 1 and step 5 copy differ. Steps 3 and 4 are read-only, so the flow gets longer but not heavier.

## 5. Recommended "Who has arrived?" wording

Keep the heading. Replace the four fixed radios with:

- One baby
- Twins
- Triplets
- **More than three** (reveals a number control)

"More than three" is honest, avoids the odd "Four babies" label, and leaves room for the limit message. When selected, show a small stepper or select bound to 4 only, with the quiet line: "We can set up four babies at the moment. If you have more, choose four for now and tell us — we will make room."

## 6. Recommended baby count UX

- Radios stay the primary control (fast for the 98% case).
- The reveal shows one row per baby using the existing `BABY_ROW_LABELS`, so nothing changes in `buildBabyPayload`.
- Keep `MAX_BABIES = 4` and the existing validation message, but surface the cap in the UI before the user hits it rather than after.
- Keep one shared DOB with the existing "This date is used for every baby" hint. Per-baby DOB is not needed and adds friction.

## 7. Recommended companion name approach

- **Cindy stays the default.** She is already the voice across the product.
- Offer the same three suggestions plus a custom field, reusing `SUGGESTED_NAMES`, `validateCompanionName` and `TONE_OPTIONS` from `src/lib/companion.ts`.
- **Store in `profiles.companion_name` / `companion_tone`** — the columns already exist and `useCompanionIdentity` already reads them. No schema change.
- Transition users who already have a name saved see it prefilled with a quiet "Keep [name]" option; they are not asked again from scratch.
- Direct users with no saved name get the full choice, defaulting to Cindy.
- Existing Cindy copy stays as a fallback wherever no name is set.
- The current three-option session-only companion step is **retired** and replaced by this. It stores nothing today, so nothing is lost.

## 8. Recommended Cindy introduction approach

Make it part of the companion step, not a separate step and not a post-setup card — a short block above the name choice, shown only when no companion name is stored (so direct users always see it, most transition users do not). Content:

- who she is: a calm companion inside your First Year space
- what she gives: gentle, plain-language answers about the early months and your recovery
- her tone: unhurried, never alarming
- what she does not do: she does not track anything, and she does not read your private notes
- the boundary line: she does not replace your midwife, GP or health visitor

## 9. Recommended baby age and stage approach

Derive from DOB with `getFirstYearAge` — no new storage. Map to four labels in a new pure helper:

```text
0-27 days      newborn
28 days-11 mo  baby
12-23 months   older baby / early toddler
24 months+     toddler
```

For DOB over 12 months (`isInFirstYear === false`), take option 4 plus a soft version of option 3: allow setup, label the stage plainly, and say "First Year is built around the first twelve months, so some guidance will be behind you. You are welcome to carry on." Link to existing public toddler guidance where it already exists. No routing block, no toddler product build.

## 10. Recommended post-DOB value explanation

Step 4, headed "Here's what your First Year home gives you", as five or six quiet rows (no icons-heavy grid):

1. A daily note for your baby's rhythm and how you are doing
2. Memories for the small things you want to keep
3. Guidance that follows your baby's age
4. Support for feeding, sleep, nappies and the questions in between
5. A place for your own recovery, not just the baby's
6. Your pregnancy chapter, kept (transition mode only)

Copy is stage-aware where it is cheap: a newborn sees the recovery line first, an older baby sees guidance first.

## 11. Recommended return-to-position behaviour

Option 1, narrowly scoped. `ScrollToTop` currently forces `scrollTo(0,0)` on every pathname change, which defeats the browser. Recommendation: allow the browser's native `POP` restoration by skipping the reset when the navigation type is `POP` (via `useNavigationType`), keeping the reset for `PUSH`. That fixes back-button returns everywhere at almost no cost. No route state, no anchors, no "from" params.

## 12. Recommended "Back to your First Year journey" placement

**Move it fully to the bottom** on `/my-first-year/today` and `/my-first-year/memories`. Both are short, single-task pages where the header already offers escape, so a duplicate top link only invites early exit.

Keep `/my-pregnancy-chapter`'s link at the bottom as well, but this page is Phase 20B-adjacent and emotionally sensitive, so treat it as the lowest-priority item and leave it if anything looks risky.

## 13. Files likely to change in Phase 21B

- `src/pages/setup/FirstYearSetup.tsx` — six-step state machine
- `src/components/firstyear/setup/StepIntro.tsx`, `StepBabies.tsx`, `StepReview.tsx`
- `src/components/firstyear/setup/StepCompanion.tsx` — rewritten as name choice plus introduction
- New: `StepStage.tsx`, `StepValue.tsx`
- `src/components/firstyear/setup/firstYearSetupConstants.ts` — count options, value rows, retire `COMPANION_OPTIONS`
- `src/lib/firstYearEntry.ts` — copy for the new steps
- `src/lib/firstYearDates.ts` or a new `firstYearStage.ts` — the four-label stage helper plus tests
- `src/components/layout/ScrollToTop.tsx` — POP-aware
- `src/pages/firstyear/FirstYearToday.tsx`, `FirstYearMemories.tsx` — return link placement

## 14. Schema changes needed

**None.** `profiles.companion_name` and `companion_tone` already exist; stage is derived from `babies.date_of_birth` at read time. No migration in Phase 21B.

## 15. Files that must not change

- All Phase 20B spacing work: `FirstYearHeroPanel.tsx`, `TodayCard.tsx`, `MyPregnancyChapter.tsx` padding and copy
- `src/lib/firstYearJourney.ts` and the `save_first_year_journey` RPC
- `src/components/firstyear/setup/firstYearSetupSchema.ts` validation rules (labels only, no rule changes)
- `src/integrations/supabase/*`, migrations, routes in `App.tsx`, sitemap, robots
- Memories and Daily Check-in feature logic

## 16. QA plan

- Unit tests: stage helper boundaries (27/28 days, 11/12 months, 23/24 months), count reveal, companion name validation reuse.
- Flow tests: direct mode and transition mode through all six steps; back and forward preserves the draft; validation errors still route to the babies step.
- Companion: no stored name shows the introduction; stored name prefills and hides it.
- Over-12-months DOB: setup completes, stage labelled, no clinical wording.
- Navigation: dashboard to support card and back restores scroll; forward navigation still starts at the top.
- Visual: 390px and 1440px, header clearance, focus rings, no overflow, no console errors.
- Typecheck, tests, lint, build, sitemap unchanged.

## 17. Risks and open questions

- Six steps risks feeling long for a sleep-deprived parent. Mitigation: steps 3 and 4 are read-only and short.
- Removing the "Personalise Cindy" option may read as a lost feature to transition users, though it never did anything. Copy should not reference it.
- Changing `ScrollToTop` affects every route in the app, not just First Year. Needs a careful pass over public pages.
- Open: should over-12-months users be offered the toddler hub link now, or only after toddler product work?
- Open: should tone selection appear in First Year setup, or stay in account settings to keep the step short?

## 18. Should Phase 21B proceed?

Yes. No schema change, no route change, no backend risk, and the highest-value item (the missing value explanation) is pure presentation. Recommended order for 21B: baby count wording, stage step, value step, companion step, then the two navigation items last.
