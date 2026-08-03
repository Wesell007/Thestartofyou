# Phase 15.5A — Pregnancy Toolkit Upgrades Plan

Planning only. No code, migrations, RLS, storage, routes, sitemap, analytics or AI changes proposed for this phase.

## 1. Executive summary

The Pregnancy Toolkit already has seven working, privately saved tools. Hospital Bag and Birth Plan are the two most emotionally meaningful and the two closest to being "app quality", but both stop just short of feeling finished.

Hospital Bag is functionally complete (seeded defaults, saved progress, custom items, per category counts) yet flat: five equal cards, no sense of order, no packing rhythm, no way to take the list with you, and one category name that does not match how people actually pack ("Comfort items" rather than an "After birth" grouping).

Birth Plan is richer (nine sections, chips plus notes, progress, summary, print and Save as PDF) but the reading order buries the most important content, every section looks identical regardless of whether it matters to the user, and the printable output is the only way to bring it into a hospital room.

Recommendation: build **Hospital Bag v2 first**. It is the lowest risk, has zero medical sensitivity, needs no schema change, and delivers the biggest visible quality jump for the least work. Birth Plan v2 (reorder, focus mode, better printable) follows immediately after in the same phase if scope allows.

No migrations are required for the recommended scope.

## 2. Current Pregnancy Toolkit status

`/pregnancy-toolkit` is a hub listing seven tools, each with a live status line read from its own table:

| Tool | Route | Storage | Status line |
| --- | --- | --- | --- |
| Birth plan | `/pregnancy-toolkit/birth-plan` | `birth_plans` | completion based |
| Hospital bag | `/pregnancy-toolkit/hospital-bag` | `hospital_bag_items` | packed progress |
| Appointment notes | `/pregnancy-toolkit/appointments` | `pregnancy_appointments` | count based |
| Baby movement notes | `/pregnancy-toolkit/baby-movements` | `baby_movement_notes` | count based |
| Contraction timer | `/pregnancy-toolkit/contraction-timer` | `contraction_sessions` | session based |
| Symptom notes | `/pregnancy-toolkit/symptom-notes` | `pregnancy_symptom_notes` | count based |
| Questions for midwife | `/pregnancy-toolkit/questions-for-midwife` | `midwife_questions` | count based |

Shared conventions worth preserving: `MyWeekHeader` / `MyWeekFooter`, `PageStatusNotice`, `PageLoadState` for loading and error, a fixed `SaveStatePill`, `keepsake-surface` cards, stage pregnancy accent tokens, `noindex` SEO, back to toolkit and open my journey links at the foot of every tool.

Journey status gating already exists at the hub: non active statuses show a gentle notice, and `pregnancy_loss` hides the tool grid behind a reveal.

Two tools are ahead of the pack on polish: Birth Plan (export actions, printable, summary) and Contraction Timer. Hospital Bag is the plainest of the seven.

## 3. Hospital Bag — current state

**What it already does**

- Seeds 27 default items on first open, upserted on `user_id,category,item_key`, so the list survives reload and cannot duplicate.
- Saves progress: each item has `packed_at`, toggled with an optimistic write and a save pill.
- Supports custom items: free text up to 80 characters, slugified key, appended with `sort_order` max plus 10, deletable (only custom items can be deleted).
- Groups items into five categories: Mum or birthing parent, Baby, Birth partner, Documents, Comfort items.
- Shows a progress card, a per category "x of y" count, and a three number summary (packed, still to pack, in your list) plus last updated.
- Carries a clear non prescriptive disclaimer: "This is a guide, not a rule."

**Answers to the product questions**

- Saved progress: yes, already.
- Custom items: yes, already, per category.
- Clear grouping: partly. The five groups are sensible but visually identical and always fully expanded, so the page reads as one long undifferentiated list of 27 rows.
- Should the next version group by Mum, Baby, Birth partner, Documents and After birth? Yes with one change: keep the first four, and re think the fifth. "Comfort items" is a bag packing idea; "After birth" is a moment based idea and maps better to how people think in late pregnancy. Recommendation: keep the four core groups, rename and re scope the fifth to **After birth and comfort**, and move the small calming items into it rather than creating a sixth group. Renaming is copy only; re parenting existing rows would need data work, so keep existing `item_key` values and category keys untouched and change only the label and intro.
- Tick as packed: yes, already; keep the interaction identical and only improve its feel.
- Add own items: yes, already; keep.
- Print or download view: yes, and it is the single most requested real world behaviour for this tool. Browser print first, matching the Birth Plan pattern.
- Simplest premium version one: see below.
- What waits for the app: multi bag support, reminders, photos of packed bags, sharing with a birth partner.

## 4. Hospital Bag — recommended upgrade (v2)

Presentation and interaction only. No schema change.

1. **Collapsible category cards with a real sense of progress.** Each category keeps its heading, intro and count, gains a slim progress bar and collapses once every item in it is packed (with a quiet "Packed" chip and a tap to reopen). This turns a 27 row wall into a short, satisfying sequence.
2. **Category ordering that matches packing order.** Present in a deliberate order — Documents, Mum or birthing parent, Baby, Birth partner, After birth and comfort — rather than the current alphabetical side effect of the sort. Sorting inside a category stays as is.
3. **Packed items settle to the bottom of their category** with a short transition, so what is left to do is always at eye level. Toggling back restores the original position.
4. **A gentle "what's left" strip** under the progress card listing up to five unpacked essentials, purely as a shortcut. No urgency language, no countdown, no week based nagging.
5. **Copy and label pass.** Rename the fifth category label to "After birth and comfort" with a matching intro. Keep every existing item label and key.
6. **A printable checklist view** using the exact `BirthPlanPrintable` pattern: hidden on screen, rendered for print, grouped by category, checkbox glyphs for unpacked, tick for packed, includes custom items, no user name unless already available, includes the same "guide, not a rule" line. Paired with a `HospitalBagActions` card offering Print checklist and Save as PDF, mirroring `BirthPlanActions` including the disabled empty state.
7. **Empty and error states already handled** by `PageLoadState`; no change needed.
8. **Accessibility**: collapsible headers become real buttons with `aria-expanded`, the progress bar gets `role="progressbar"` with value text, and the reordering announcement stays silent to avoid noise for screen readers.

Explicitly not in v2: reordering by drag, multiple bags, per item notes, quantities, photos, reminders, partner sharing.

## 5. Birth Plan — current state

**What it already does**

- Nine sections, each with a title, calm intro, optional multi select preference chips and a free text notes field: Birth preferences, Birth environment, Pain relief preferences, Birth partner and support, Labour preferences, Monitoring and interventions, Feeding after birth, After birth and skin to skin, Notes for your midwife.
- Saves the whole answers object per change, stores a computed completion, shows a progress card with a five step status ladder (Not started through Ready to review).
- Renders a summary of everything answered.
- Offers Print birth plan and Save as PDF (both `window.print()`, the second with a toast explaining the print destination), disabled until at least one section is answered.
- Renders `BirthPlanPrintable` with parent name from auth metadata and due date from the active journey.
- Carries a strong, correct disclaimer: preferences, not guarantees, plans can change on the day.

**Answers to the product questions**

- Editable and personal enough? Partly. Chips plus notes is the right model, but nine identical cards presented at equal weight make it feel like a form to complete rather than a plan the user owns. Nothing signals which sections the user has actually engaged with.
- Should birth preferences move higher? They are already first in `BIRTH_PLAN_SECTIONS`. The real ordering problem is elsewhere: "Notes for your midwife", which is often the most important section for the user, sits last and is easily missed, and the export actions sit above the sections before there is anything to export.
- Print or download? Already present and working. Keep browser print; improve the printable layout rather than adding a PDF library.
- Read only share later? Yes, but not now. See section 7.
- What v1 (that is, the v2 upgrade) should include: reorder plus focus, section state, printable polish, action placement.
- What should not be built yet: AI drafting, sharing links, clinician templates, hospital specific presets, versioning.

## 6. Birth Plan — recommended upgrade (v2)

Presentation, ordering and export polish only. No schema change: the answers JSON shape stays exactly as it is.

1. **Reordered flow into three quiet groups**, presented as labelled bands rather than new pages:
   - *On the day*: Birth preferences, Labour preferences, Pain relief preferences, Birth environment.
   - *People and decisions*: Birth partner and support, Monitoring and interventions.
   - *After birth*: After birth and skin to skin, Feeding after birth.
   - *Your own words*: Notes for your midwife, lifted out of last place into its own closing band with a slightly larger presentation, since it is the section a midwife reads first.
2. **Section state at a glance.** Each card shows an unobtrusive "Answered" or "Not yet" marker and the answered chip count, so the plan reads as a set of decisions made rather than a form outstanding.
3. **A collapse behaviour for completed sections**, same mechanic as the Hospital Bag categories, so a well filled plan is scannable in one screen.
4. **Export actions move to the bottom only**, plus a single compact "Print" affordance in the progress card once there is content. Two full action blocks on one page is currently noisy.
5. **Printable improvements**: group the printed output under the same four bands, print only answered sections, keep the disclaimer and the "prepared on" date, keep parent name and due date optional, and add a blank "Notes from my care team" ruled area at the end so the printed page is useful in a real appointment.
6. **Wording pass** across intros and the summary to remove anything that could read as instruction or certainty, and to keep every section framed as a preference to discuss.

Explicitly not in v2: reordering sections by the user, custom sections, adding new choice chips by hand, AI assisted drafting, multi plan support.

## 7. Print and download options

- **Browser print first, for both tools.** `window.print()` with a print only DOM block is already proven in this codebase, adds no dependency, produces a correct A4 page, and gives users Save as PDF for free on every modern browser and on iOS and Android share sheets.
- **No PDF library.** Adding jsPDF or pdfmake means bundle weight, font loading, layout duplication and a second rendering path to maintain, for output that is not better than the browser's.
- **No server rendered PDF.** That would need an edge function, storage and a delivery path, and is out of scope for this phase and probably for the whole pre app period.
- **One shared print stylesheet convention** so Hospital Bag and Birth Plan print with the same typography, margins and footer.
- Recommended labels: "Print checklist" / "Print birth plan", plus "Save as PDF" with the existing toast hint.

## 8. Sharing options

Not now. When it comes, the sensible ladder is:

1. **Print and hand over** — already the answer for the hospital bag and the birth plan, and the one every midwife accepts.
2. **Read only link with an expiring token** — a separate share table with a random token, a public read only route, explicit user action to create, a visible expiry, and one tap revoke. This is a real feature with real privacy weight and belongs in its own phase with its own migration and RLS review.
3. **Partner account access** — full multi user, app era only.

Do not add sharing to Hospital Bag or Birth Plan in 15.5B.

## 9. Privacy considerations

- Both tools hold sensitive health adjacent content, particularly Birth Plan notes and "Notes for your midwife", which can include previous birth trauma, loss and mental health context. Treat the notes field as the most sensitive text in the product.
- Current model is correct: rows scoped to `auth.uid()` under RLS, pages `noindex`, nothing rendered for signed out users.
- Analytics must never carry item labels, custom item text, chip selections or notes content. Counts and completion percentages only, and only if a tracked event already exists. This phase proposes no analytics change.
- Printing is a user initiated local action and sends nothing anywhere; keep it that way and avoid any "email me my plan" shortcut until email content handling has been reviewed.
- Parent name in the printable comes from auth metadata, not from a stored profile field, and should remain optional so a user can print an unnamed plan.
- Journey status gating must be respected on both tools, including the `pregnancy_loss` path, so a print action never appears unprompted in a sensitive state.

## 10. Technical considerations

- **No migrations needed** for the recommended scope. Hospital Bag v2 is presentation over existing rows. Birth Plan v2 reorders a static array and changes rendering; the stored `answers` JSON keys are untouched.
- Section order for Birth Plan should be expressed as an explicit band structure in `src/lib/birthPlanSchema.ts` rather than by reshuffling `BIRTH_PLAN_SECTIONS`, so nothing that reads by key is affected and `calculateCompletion` keeps counting the same nine sections.
- Hospital Bag category order should come from the order of `HOSPITAL_BAG_CATEGORIES`, with the page mapping over that array as it already does; the hook's internal `sortRows` can stay untouched since the page groups by category itself.
- Collapse state is local UI state only, not persisted, so no schema and no extra writes.
- `hospital_bag_items` is still accessed through an `any` cast because generated types lag; if types are regenerated at some point this cast can be removed, but that is not part of this phase.
- New print CSS should live alongside the existing print rules rather than in a new global sheet, and every interactive control needs `print:hidden`.
- Tests: pure additions to `hospitalBagSchema` or `birthPlanSchema` helpers (band grouping, "what's left" selection) should get focused Vitest coverage; presentational changes get a manual mobile and desktop pass plus a Playwright screenshot check.
- Risk of regression is concentrated in the Hospital Bag toggle path, since reordering packed items and optimistic updates interact. Keep the reorder purely derived from `packed_at` at render time.

## 11. Recommended Phase 15.5B build scope

**Primary: Hospital Bag v2**

- Category ordering, collapsible cards, per category progress bar, packed items settling to the bottom.
- "What's left" shortcut strip.
- Fifth category relabelled to "After birth and comfort".
- `HospitalBagActions` and `HospitalBagPrintable`, mirroring the birth plan pattern.
- Accessibility and copy pass.

**Secondary, same phase if scope allows: Birth Plan v2**

- Four band grouping with "Notes for your midwife" promoted to its own closing band.
- Answered / not yet markers and collapse for completed sections.
- Export actions consolidated to the foot of the page plus a compact print affordance in the progress card.
- Printable grouped by band, answered sections only, plus a "Notes from my care team" area.

**Likely files**

- `src/pages/PregnancyToolkitHospitalBag.tsx`
- `src/components/pregnancy-toolkit/HospitalBagCategory.tsx`
- `src/components/pregnancy-toolkit/HospitalBagProgress.tsx`
- new `src/components/pregnancy-toolkit/HospitalBagActions.tsx`
- new `src/components/pregnancy-toolkit/HospitalBagPrintable.tsx`
- `src/lib/hospitalBagSchema.ts` (category order and label, plus a small "what's left" helper)
- `src/pages/PregnancyToolkitBirthPlan.tsx`
- `src/components/pregnancy-toolkit/BirthPlanSection.tsx`
- `src/components/pregnancy-toolkit/BirthPlanPrintable.tsx`
- `src/lib/birthPlanSchema.ts` (band definitions only)
- test files alongside the two schema modules

## 12. What not to build yet

- Any AI inside Hospital Bag or Birth Plan (drafting, summarising, suggesting items).
- Sharing links, partner access, or emailing a plan.
- Server generated PDFs or a PDF library.
- Drag to reorder, multiple bags, multiple plans, plan versioning.
- Per item quantities, notes or photos in the hospital bag.
- Reminders, notifications or week triggered nudges.
- Hospital or trust specific templates and anything resembling a clinical form.
- Any change to `hospital_bag_items` or `birth_plans` schema.

## 13. Final recommendation

Build **Hospital Bag v2 first**, then Birth Plan v2 in the same phase if scope allows.

Why first: it is the plainest of the seven tools, so the quality jump is most visible; it carries no medical sensitivity, so the copy risk is near zero; it needs no migration and no RLS thought; and it establishes the print pattern reuse that Birth Plan v2 then benefits from. Birth Plan is the higher value tool but also the higher risk one, and it is better upgraded second, on top of a print convention that has already been proven twice.

Print and download should be browser based first, for both tools, with no library and no server work. Sharing, AI and multi bag or multi plan support all wait for the app.

Migrations needed: none.
