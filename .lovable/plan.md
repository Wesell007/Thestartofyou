# Phase 17D — First Year Daily Check-in Polish Build

Presentation, copy, UX and accessibility polish only. No schema, migration, RLS, trigger, route guard, auth intent, sitemap, robots, public content, AI, media or data-model change.

## Copy fixes

- Nappies placeholder: "Two changes this morning…"
- Recent days intro: "Gaps are part of it."
- Recovery hint: "How your body feels today, in your own words."
- Delete dialog: title "Remove this note?", body "This note will be removed. You can always write another one.", confirm "Remove note".
- Save toast: "Saved" for a new note, "Updated" when replacing one.
- No banned wording remains ("normal", "abnormal", "safe", "unsafe", risk phrasing, "diagnosis", etc.).

## Clarity and flow

- Per-field save button reads "Save" when nothing is stored, "Update" when a note exists, "Saving…" in flight, then a quiet "Saved"/"Updated" state that fades back.
- Small "Saved" marker beside each field label when a note exists for that field, date and target.
- "Saved today" renamed to "What you saved today".
- Each row in that list gains an "Edit" action that scrolls to and focuses the matching field (and switches the baby target first when needed).
- "Recent days" grouped under date subheadings, with kind and baby name shown per note.
- Eight per-field save buttons stay. Sections stay open.

## Mobile and accessibility

- Save, edit and remove controls raised to `min-h-11` with comfortable horizontal padding.
- `focus-visible:ring-sage` applied to save, edit and remove controls so focus matches the textareas.
- Per-lane `role="status"` live region announcing save confirmation alongside the toast.
- Character counter appears only past ~1800 characters.
- Heading order, labels and keyboard save/edit/delete all preserved.

## Multiples polish

- "Writing for Ada" / "Writing for all babies" line above the baby fields.
- Saving with "All babies" confirms "Saved for Ada and Bo".
- Changing the selected baby shows a one-line notice that the fields now show that baby's notes.
- Fan-out logic unchanged.

## Export wording

- Account Settings download copy explicitly lists "First Year daily notes". No change to the export structure.

## Technical notes

New pure helper `src/components/firstyear/today/saveLabels.ts` holds `saveButtonLabel`, `joinNames`, `saveConfirmation` and `writingForLabel`, with a matching small unit test file. `NoteField` gains `fieldId`, `saved` and the counter; the page tracks a per-kind `justSaved` state and derives "has a saved note" from today's entries.

## Files changed

- `src/pages/firstyear/FirstYearToday.tsx`
- `src/components/firstyear/today/NoteField.tsx`
- `src/components/firstyear/today/BabySelector.tsx`
- `src/components/firstyear/today/saveLabels.ts` (new)
- `src/components/firstyear/today/saveLabels.test.ts` (new)
- `src/pages/AccountSettings.tsx` (one wording line)

## Files not changed

`src/lib/firstYearEntries.ts`, `src/lib/firstYearEntriesSchema.ts`, `src/lib/firstYearJourney.ts`, `src/lib/firstYearCopy.ts`, `src/App.tsx`, `src/lib/authIntent.ts`, migrations, RLS, triggers, sitemap, robots, public First Year pages.

## QA

Disposable accounts only. Single baby (save each field, Save→Update, saved marker, edit focus, calm remove, recent grouping), twins (writing-for line, "Saved for Ada and Bo", target-change notice, fan-out intact), empty state, 390px mobile, keyboard and live-region pass, banned-word grep. Then `npx tsgo --noEmit -p tsconfig.json`, `npx vitest run`, `npm run build`, with sitemap and dist reported.
