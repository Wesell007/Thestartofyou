# Phase 17C — First Year Daily Check-in Polish and UX Audit

Audit only. No build in this phase. Recommendation at the end: a small Phase 17D polish build should proceed, presentation and copy only, no schema change.

## What is working well

- The two-lane split ("For your baby" / "For you") is clear and emotionally right, and the parent lane is genuinely given equal weight.
- Route guards are thorough: TTC, active pregnancy, sensitive pregnancy statuses, missing pointer and missing setup each land somewhere sensible.
- No streaks, scores, targets or "you missed a day" anywhere. The Today card explicitly says skipping days is fine.
- Every field is optional, labelled with a real `<label>`, and has an `aria-describedby` hint.
- The multiples selector is a real radio group with one tab stop, so keyboard and screen reader users get arrow-key selection.
- Delete goes through `ConfirmDialog` rather than a browser confirm.
- Footer safety line points to midwife, GP or health visitor on both pages.

## What feels unclear or heavy

1. **Eight fields, eight separate Save buttons.** A tired parent must press Save eight times to record a full day. The page reads as a form to complete rather than a note to jot. This is the single biggest weight problem.
2. **No sense of which fields are already saved.** A field that has a saved note looks identical to an empty one, and the button still says "Save" rather than "Update". The saved note also appears a second time in "Saved today", so the same sentence is on screen twice with no visual link between them.
3. **No edit affordance in "Saved today".** Entries there can only be removed. Editing means scrolling back up and finding the matching field, which is not obvious.
4. **Multiples draft switching is confusing.** Drafts are keyed by the current selection, so switching from "All babies" to a named baby swaps the textarea contents with no explanation. Nothing tells the parent that the field now belongs to a different baby.
5. **"Recent days" is a flat list.** Each row repeats date, kind and name in one uppercase run. Several notes from the same day are not visually grouped.
6. **Section length on mobile.** Four textareas plus four buttons per card is a long scroll before the parent reaches "Saved today".

## Copy issues found

- Nappies placeholder is `"Normal today…"` — uses a word we avoid.
- "Gaps are normal." in the Recent days intro — same word.
- Recovery hint "This is not a check for anything." is defensive and draws attention to the clinical framing it is trying to avoid.
- Save button label is a bare "Save" everywhere, so it never reflects "already saved".
- "Saved for today" toast and "Saved today" heading use near-identical wording for two different things.
- Delete dialog says "This will delete the note from today" — "delete" is harsher than the rest of the page's voice.
- Empty state "Nothing saved yet today, and that is completely fine." is good, but it sits in a card that only appears useful once something exists.

## Safety language issues found

- `"Normal today…"` and `"Gaps are normal."` are the only two banned-list hits. Both are incidental, not clinical claims.
- No occurrences of safe, unsafe, risk, fine, okay, diagnosis, symptom checker or abnormal in these surfaces.
- Header disclaimer ("Nothing is measured, scored or compared, and it is never advice") and the footer escalation line are both correct and should stay.
- Nappies field hint mentions a health visitor, which is the right framing; keep it.

## Mobile UX issues found

- Long uninterrupted scroll: header, four fields, four buttons, four fields, four buttons, then saved notes.
- Save buttons are `py-2` with 13px text, roughly 34px tall — under the 44px tap target guideline.
- "Remove this note" is a small underlined 12.5px link, also under the tap target size and easy to hit by accident near note text.
- No sticky or nearby confirmation after saving; on a phone the toast may appear far from the field just used.

## Accessibility issues found

- Save success is announced only by the toast. There is no per-field live region tying the confirmation to the field.
- `focus-visible:ring-2 focus-visible:ring-offset-2` on the save and remove buttons has no ring colour class, so it inherits the default rather than the sage focus colour used on the textareas. Inconsistent focus appearance.
- No character counter, so the 2000 cap is silent until validation rejects.
- Duplicate content: a saved note appears in the field and again in "Saved today" with no `aria` relationship, which is verbose for a screen reader.
- Heading order is sound (single h1, h2 per section) and landmarks are correct.

## Multiples UX issues found

- "All babies" is explained only inside the fieldset helper text; after selection nothing on the field itself says who the note is for.
- Saving with "All babies" silently writes one row per baby, and the confirmation does not mention that.
- Switching selection replaces draft text with no signal (see above).
- The "Saved today" list does show the baby name per entry, which is the strongest part of the multiples experience.

## Export wording issues found

- Export key is `first_year_notes`, while the table is `first_year_entries` and the UI calls them "notes". The key is fine, but the Account Settings surface has no human-readable line telling the parent their First Year daily notes are included.

## Recommended small polish fixes (Phase 17D scope)

Copy
- Replace nappies placeholder with `"Two changes this morning…"`.
- Replace "Gaps are normal." with "Gaps are part of it."
- Replace recovery hint with "How your body feels today, in your own words."
- Delete dialog: "Remove this note?" / "This note will be removed. You can always write another one." / confirm "Remove note".
- Toast on save: "Saved" for a new note, "Updated" when replacing an existing one.

Clarity and flow
- Save button label becomes "Save" when the field is empty of a saved note and "Update" when one exists, with a quiet "Saved" state after a successful write.
- Add a small saved marker beside each field label when a note exists for that field, date and target.
- Add an "Edit" action to each "Saved today" row that scrolls to and focuses the matching field.
- Rename "Saved today" to "What you saved today" so it reads as a recap rather than a second form.
- Group "Recent days" entries under a date subheading, then list kind and baby name per note.

Mobile and accessibility
- Raise save and remove controls to `min-h-11` and add horizontal padding for a comfortable tap target.
- Add `focus-visible:ring-sage` to save and remove buttons so focus matches the textareas.
- Add a `role="status"` per-lane live region for save confirmation in addition to the toast.
- Show a character counter only once a note passes ~1800 characters.

Multiples
- Show the current target inline above the baby fields: "Writing for Ada" or "Writing for all babies".
- When "All babies" is chosen, the save confirmation says "Saved for Ada and Bo".
- When the selection changes, show a one-line note that the fields now show that baby's notes.

Export
- Add a plain-English line in Account Settings listing "First Year daily notes" among the included data.

## Files that would change

- `src/pages/firstyear/FirstYearToday.tsx` (copy, save labels, saved markers, edit action, recent-notes grouping, live region, target line)
- `src/components/firstyear/today/NoteField.tsx` (saved marker slot, character counter, focus ring)
- `src/components/firstyear/today/BabySelector.tsx` (inline target confirmation copy)
- `src/components/firstyear/journey/TodayCard.tsx` (minor summary wording only, if needed)
- `src/pages/AccountSettings.tsx` (one export wording line)

## Files that must not change

- `src/lib/firstYearEntries.ts` (data layer, lookup-then-update save pattern)
- `src/lib/firstYearEntriesSchema.ts` (except the two placeholder/hint strings if they were to move here — they are not there today, so no change)
- Any migration, RLS policy, trigger or table definition
- `src/lib/firstYearJourney.ts`, `src/lib/firstYearCopy.ts`, route table in `src/App.tsx`, `src/lib/authIntent.ts`
- Sitemap, robots, public First Year hub pages

## QA plan

- Unit: existing 146 tests stay green; no new logic to test unless the save-label resolver is extracted as a pure helper (recommended, one small test file).
- Playwright on disposable accounts only, live account untouched:
  - Single baby: save each of the eight fields, confirm labels flip to "Update", edit via the recap link, remove a note.
  - Twins: "All babies" fan-out confirmation names both babies; switching target swaps drafts with the inline notice showing.
  - Empty state: fresh account sees the calm empty copy and no recap or recent sections.
  - Mobile 390px: tap targets, scroll length, toast position, no overflow.
  - Keyboard-only: tab through both lanes, arrow-key the radio group, save with Enter, confirm the live region announces.
- Grep the two pages for the banned word list after the copy edits.
- Production build and sitemap diff check.

## Risks and open questions

- Low risk overall: presentation and copy only, no data-layer or schema change.
- Open question: should the eight per-field Save buttons collapse into one "Save today's notes" per lane? That is a genuine interaction change rather than polish, so it is listed here as a question rather than proposed work. Per-field saving is safer for a tired parent who writes one line and leaves.
- Open question: should sections stay open? Recommendation is yes, keep them open. Collapsing hides the parent lane, and hidden recovery fields would quietly deprioritise the parent.

## Product questions answered

- Today card placement is right: below the baby summary, above the support lanes. It is the only interactive thing on an otherwise reading page, so it should come before the guidance links.
- The card stays reassurance-shaped, not dashboard-shaped, because it shows a count with no target attached. Keep it that way.
- The check-in page is understandable but currently reads as a form. The polish above shifts it towards a note.
- Eight fields is one or two too many on a single screen, but the fix is visual grouping and clearer saved state, not removing fields.
- Save/edit/delete is the weakest flow and is the main target of Phase 17D.
- The page does still feel warm and non-clinical; only two words break the tone rule.

## Recommendation

Proceed with a small Phase 17D polish build limited to the fixes listed above.
