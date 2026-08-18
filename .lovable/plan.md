# Phase 26D — Memories App Redesign

Visual and UX redesign of `/my-first-year/memories` only, so it reads as the same app as the new First Year home and Today page. No schema, storage, upload, signed URL, delete, routing or sitemap changes.

## What the page becomes

```text
Back to First Year            (quiet top link)
Memories hero                 (eyebrow, serif display line, warm intro)
Keep a memory                 (primary peach card/button -> opens sheet)
Filter chips                  (only with multiples: Everyone / each baby)
Memory shelf                  (month-grouped polaroid-style cards)
Empty state                   (calm, one invitation, no scolding)
Privacy note                  (single quiet line at the foot)
```

The current page shows a permanently open form above a plain list inside two identical grey-ish cards. The redesign turns adding into a deliberate act (a sheet, exactly like Today's log sheets) and gives the saved memories the whole page.

## Add and edit move into a sheet

- A single peach primary card at the top: eyebrow "Keepsakes", serif line "Keep a memory", one short helper line, and a soft mark. Tapping it opens the memory sheet.
- The sheet uses the same dialog shell, spacing, chips, field styles and centred Cancel link as the Today sheets, via `sheetControls.tsx` constants.
- Editing a memory opens the same sheet pre-filled, with the title "Edit this memory". "Copy forward" from a daily note (route state `sourceEntryId`) opens the sheet automatically with the note text and focus in the note field, exactly as it behaves today.
- Everything inside the form keeps its current behaviour: who it is about, optional title, the moment, when it happened, optional photo, add/replace/remove photo, save, cancel.

## Memory cards

- Cards become soft paper keepsakes: `rounded-[26px]`, parchment surface, warm peach hairline border, warm shadow, gentle alternating tilt on the photo thumbnail only (no tilt on the card body, so long notes stay easy to read).
- Photo memories get a polaroid treatment: image at the top of the card with a parchment mat and a small caption strip; tapping opens the existing single-photo viewer unchanged.
- Each card shows a date chip, a scope chip when there is more than one baby, the title in serif, and the note in warm readable body text.
- Edit and Remove become quiet icon-and-label actions in a row at the foot of the card, not two underlined links competing with the note.
- Month headings stay, restyled as the shared uppercase eyebrow with a hairline rule.

## Empty state

One parchment card with a soft mark, "Nothing kept yet", a warm sentence about the small things, and the same "Keep a memory" action. No counts, no progress, no prompts to do better.

## Technical notes

Files touched:

- `src/pages/firstyear/FirstYearMemories.tsx` — layout, hero, sheet open state, filter chips, privacy note. Data loading, validation, save, photo and delete handlers stay as they are.
- `src/components/firstyear/memories/MemoryForm.tsx` — restyled to the sheet field and chip language.
- `src/components/firstyear/memories/MemoryList.tsx` — new keepsake card layout and month headings.
- `src/components/firstyear/memories/MemoryPhotoField.tsx` — restyled to match sheet controls.
- `src/components/firstyear/memories/MemoryScopeSelector.tsx` — chips reuse `CHIP_BASE`/`CHIP_SELECTED`.
- `src/components/firstyear/memories/MemoryPhotoViewer.tsx` — card radius and border only.
- New `src/components/firstyear/memories/MemorySheet.tsx` — thin dialog shell wrapping `MemoryForm`, mirroring `LogSheet.tsx`.
- New `src/components/firstyear/memories/MemoryHeroCard.tsx` and `MemoryEmptyState.tsx` for the top card and empty state.
- `src/components/firstyear/journey/firstYearStyles.ts` — add a memory tint only if the existing `FY_TYPE_TINT.note` values are not enough.

Colour, radius, shadow and type all come from existing First Year tokens and constants; no new hardcoded colours. Filtering by baby is client-side over the already loaded list, so no query changes.

Copy stays within the guardrails: no score, tracker, milestone, normal, ideal or safe language, British English, no dashes.

## Checks

Typecheck, lint, build, the existing memories tests (`firstYearMemoriesSchema`, `firstYearMemoryPhoto`), plus Playwright screenshots at 390px and 1440px for the shelf, the sheet, a photo memory and the empty state.
