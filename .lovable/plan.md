# Phase 28D — TTC Cycle Notes Rebuild

Rebuild the notes and logging area of `/my-ttc-journey` so it reads as a private cycle journal rather than a form. Presentation and UX only, on top of the existing `ttc_logs` data and the existing save, edit and delete behaviour.

## What changes for the user

**Section reframe.** "Your cycle calendar and notes" becomes "Your private cycle notes", with quiet supporting copy: small notes for this cycle, only you can see this, add what helps and leave the rest. No suggestion that anything must be logged daily.

**Quick note chips.** A row of soft sage chips above the notes opens the existing entry panel with a type, and where sensible a value, preselected. Only chips that map cleanly onto existing log types are added:

- Period started (period + started)
- Ovulation test (ovulation_test)
- Pregnancy test (pregnancy_test)
- Feeling (mood)
- Body note (cramps)
- Energy (energy)
- Note (note)

Discharge stays available inside the panel's type list. No new log types, no schema change.

**Gentler composer.** The entry sheet keeps its current fields, validation and save logic, but reads as writing a private note: softer serif heading, the chosen type shown as a clear chip, warmer helper copy, a taller notes field, distinct save and cancel actions at 44px, and the existing privacy line kept.

**Per-cycle grouping.** Notes are grouped in the UI only, using each log's existing `log_date` against the journey's current cycle start: "This cycle" first, then "Earlier notes" when older logs exist. Earlier notes stay collapsed behind a quiet toggle so the current cycle leads. No archive table, no storage change.

**Calendar supports the notes.** Section rhythm becomes: quick chips, this cycle's notes, calendar reference, earlier notes. The calendar keeps its current logic and markers but sits inside a quieter framing so it no longer dominates the section.

**Empty states.** "No notes yet for this cycle." with "You can add one small note whenever it helps." and "You do not need to track everything." No progress or performance language.

**Edit and delete.** Same behaviour. Presentation polish only: labelled 44px controls, visible focus rings, and the existing confirm dialog retained (no browser confirm).

**Today card.** Its "Add a note" action keeps calling the same panel opener, so it lands in the same private notes flow.

## Technical notes

- New component `src/components/ttc/journey/TTCNotesSection.tsx` owns the section layout: chips, grouped lists, calendar slot and empty states. `MyTTCJourney.tsx` swaps its current notes block for this component and passes the existing handlers (`openPanelForDate`, `openPanelForEdit`, `refetchLogs`, `logError`).
- `TTCLogEntryPanel.tsx` gains optional `initialType` and `initialValue` props for the chips, defaulting to today's current behaviour. Save, update and validation paths untouched.
- `TTCLogList.tsx` keeps its data handling; styling and control sizing polished, delete dialog unchanged.
- Grouping helper (pure, in `src/lib/ttcLogs.ts` or a small local util) splits logs by the current cycle start date derived from the journey's existing `last_period_date`. No cycle maths changes.
- Styling comes only from `ttcStyles.ts` tokens, TTC paper classes and TTC botanical or wash decor. No hex values.
- Nano Banana is used inside Lovable first to refine the private cycle journal composition, following the 28B system, 28B.1 green correction and 28C Today-first layout.

## Untouched

Schema, RLS, storage, auth, AI, cycle derivation, stage computation, ovulation calculator, setup flow, pregnancy handover, Ask, bottom nav, routes, SEO, sitemap, pregnancy and First Year surfaces. No two-week wait companion, negative test flow, inline Ask Cindy, TTC AI mode or reminders in this phase.

## Verification

Playwright at 390px and 1440px across `/my-ttc-journey`, `/setup/trying-to-conceive`, `/ovulation-calculator`, `/trying-to-conceive`, one TTC topic page, one TTC article, one signed-in pregnancy route and one signed-in First Year route. Checks: chips open the panel with the right type, save, edit and delete still work, calendar still works, 44px targets, visible focus, no overflow, no console errors, no hardcoded colours, copy guardrails clean. Then `npx tsgo --noEmit -p tsconfig.json`, targeted Vitest coverage for the grouping helper, `npx vitest run`, and `npm run build`. Report follows the 27 point format, then stop.
