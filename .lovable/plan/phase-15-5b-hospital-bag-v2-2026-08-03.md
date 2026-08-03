# Phase 15.5B: Hospital Bag v2

Presentation and interaction upgrade to the Hospital Bag tool only. No migrations, no schema, RLS, route, sitemap, analytics or AI changes. Birth Plan v2 is out of scope.

## What changes for the user

1. **Category order and label.** Categories display as Documents, Mum or birthing parent, Baby, Birth partner, After birth and comfort. The stored key `comfort` stays the same; only its visible label changes from "Comfort items" to "After birth and comfort".
2. **Collapsible cards.** Each category becomes a collapsible card with heading, intro, packed count, slim progress bar, item list, and a quiet "Packed" chip when everything in it is done. Completed categories start collapsed; any card can be reopened with a click or tap.
3. **Packed items settle.** Within a category, unpacked items list first and packed items sit below. Derived at render only, stored rows and `sort_order` untouched.
4. **Still to pack strip.** A calm strip under the main progress card lists up to five unpacked items. No urgency, countdowns, or week-based nudges.
5. **Print checklist.** "Print checklist" and "Save as PDF" buttons using `window.print()` and a hidden print-only DOM block, grouped by category, checkbox glyph for unpacked and tick for packed, custom items included, with the line "This is a guide, not a rule." No PDF library, no server export.
6. **Accessibility and copy.** Collapsible headers are real buttons with correct `aria-expanded`; progress bars use `role="progressbar"` with readable value text; print controls hidden in print; mobile layout stays clean.

## Technical detail

**`src/lib/hospitalBagSchema.ts`**
- Reorder `HOSPITAL_BAG_CATEGORIES` to documents, parent, baby, partner, comfort; change the `comfort` label to "After birth and comfort" (intro copy adjusted to match).
- Add two pure helpers with focused Vitest coverage in `src/lib/hospitalBagSchema.test.ts`:
  - `sortItemsForDisplay(rows)` — unpacked first, then packed, each group stable by `sort_order` then `created_at`.
  - `unpackedPreview(rows, limit = 5)` — first N unpacked labels in category display order for the "Still to pack" strip.

**`src/components/pregnancy-toolkit/HospitalBagCategory.tsx`**
- Wrap the header in a `<button type="button" aria-expanded aria-controls>` toggling a local `open` state, initialised closed when the category is fully packed (and only on the initial mount, so toggling the last item does not snap the card shut mid-interaction).
- Header gains a slim per-category progress bar with `role="progressbar"`, `aria-valuenow/min/max` and a visible "x of y" readout, plus a quiet "Packed" chip at 100%.
- Item list rendered through `sortItemsForDisplay`; toggle, add and delete callbacks unchanged, so optimistic writes in `useHospitalBag` keep working.

**`src/components/pregnancy-toolkit/HospitalBagProgress.tsx`**
- Add `role="progressbar"` and value attributes to the existing bar; keep the current copy and status label.

**New `src/components/pregnancy-toolkit/HospitalBagStillToPack.tsx`**
- Small strip titled "Still to pack" rendering up to five unpacked labels, plus a quiet "and N more" line when there are extras. Hidden when nothing is left.

**New `src/components/pregnancy-toolkit/HospitalBagActions.tsx`**
- Mirrors `BirthPlanActions`: "Print checklist" and "Save as PDF" (toast pointing at the print dialog destination), both calling `window.print()`, wrapper marked `print:hidden`, disabled with a calm hint when there are no rows.

**New `src/components/pregnancy-toolkit/HospitalBagPrintable.tsx`**
- Off-screen block `id="hospital-bag-print"` with brand, title, parent name and due date when available, the guide line, category groups with `[ ]` / tick glyphs, custom items inline, and a prepared-on footer.

**`src/index.css`**
- Generalise the existing print block so both `#birth-plan-print` and `#hospital-bag-print` become visible in print, and add a `hbp-*` rule set alongside the `bpp-*` rules. Birth Plan print output must stay byte-identical in appearance.

**`src/pages/PregnancyToolkitHospitalBag.tsx`**
- Compose the still-to-pack strip, actions and printable; keep the existing load, seed, error, save-pill and journey-status gating exactly as-is (print affordances respect the same gating as the rest of the page).

## Verification

- `npx tsgo --noEmit -p tsconfig.json`
- `npx vitest run src/lib/hospitalBagSchema.test.ts`
- Playwright pass on `/pregnancy-toolkit/hospital-bag`: seeded items present, toggle, custom add, custom delete, ordering, collapse/expand, still-to-pack strip, print DOM contents, mobile width, console clean.
