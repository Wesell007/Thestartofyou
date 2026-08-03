# Phase 15.5C: Birth Plan v2

Presentation, ordering and export polish only. No migrations, schema, RLS, routes, sitemap, analytics, AI or sharing changes. Stored answer keys and the answers JSON shape stay exactly as they are.

## What changes for the user

The birth plan stops reading as one long form of nine identical cards. It becomes four calm bands, each section quietly marked as answered or not yet, completed sections tucked away until reopened, and one export block at the foot instead of two.

### 1. Four bands

- **On the day** — Birth preferences, Labour preferences, Pain relief preferences, Birth environment
- **People and decisions** — Birth partner and support, Monitoring and interventions
- **After birth** — After birth and skin to skin, Feeding after birth
- **Your own words** — Notes for your midwife

Notes for your midwife is promoted into its own closing band with a slightly warmer framing, rather than sitting as the ninth identical card.

### 2. Section state markers

Each section header shows a quiet chip: "Answered" (with a preference count where chips are selected, e.g. "Answered · 3 preferences") or "Not yet". Wording stays gentle: "Not yet" rather than "Incomplete" or "Missing".

### 3. Collapse completed sections

Sections that are already answered start collapsed on load. The header becomes a real button with `aria-expanded` and controls the body region. Once a section is opened it stays open for the rest of the visit, so editing a section never causes it to fold away while typing or after a chip toggle.

### 4. Export placement

The duplicate export block above the sections is removed. The full export block (Print birth plan, Save as PDF) lives once at the foot, after the summary. A single compact print link sits inside the progress card, shown only when there is something to print.

### 5. Printable output

Still browser print only, no PDF library, no server PDF. The printed sheet gains:

- the same four band headings
- answered sections only, unanswered ones omitted entirely
- selected preferences and notes as today
- prepared-on date, optional parent name, optional due date (already present)
- the existing disclaimer, kept verbatim in meaning
- a new blank "Notes from my care team" ruled area at the end for handwriting during a discussion

Bands with no answered sections do not print a heading.

### 6. Copy and safety

Every band and section stays framed as preferences to discuss. No language implying certainty, instruction, medical reassurance, or that the plan determines what happens on the day. The existing "preferences, not guarantees" note stays.

## Technical detail

**src/lib/birthPlanSchema.ts**
- Add `BIRTH_PLAN_BANDS`: an ordered array of `{ id, title, intro, sectionKeys }` referencing existing `BirthPlanSectionKey` values. Purely presentational; `BIRTH_PLAN_SECTIONS` and all keys remain unchanged so `calculateCompletion` and existing rows are untouched.
- Add pure helpers `sectionsForBand(bandId)` and `answeredCount(answer)` plus `bandHasAnswers(answers, band)`.
- Add `src/lib/birthPlanSchema.test.ts` (Vitest) covering: every existing section key appears in exactly one band, band order is stable, `answeredCount` handles chips-only, notes-only and empty answers, and `bandHasAnswers` is false for a band with no answered sections.

**src/components/pregnancy-toolkit/BirthPlanSection.tsx**
- Header becomes a `<button type="button">` with `aria-expanded` and `aria-controls` on the body wrapper, mirroring the collapsible pattern already used in `HospitalBagCategory.tsx`.
- Accepts `open` and `onToggle` props so the page owns open state (needed for "answered sections start collapsed, then stay open").
- Adds the Answered / Not yet chip in the header.
- Chip toggling and the notes textarea `onBlur` commit path stay exactly as they are.

**New src/components/pregnancy-toolkit/BirthPlanBand.tsx**
- Renders a band heading (small uppercase eyebrow plus serif title and one-line intro) and its section cards, with the Your own words band styled slightly warmer.

**src/pages/PregnancyToolkitBirthPlan.tsx**
- Maps over bands instead of the flat section list.
- Holds `openSections` state, seeded once from initial answers (unanswered open, answered collapsed) after load, and never re-seeded so editing does not collapse anything.
- Removes the top `BirthPlanActions` block; keeps the bottom one.
- Passes a compact print affordance into `BirthPlanProgress` when `hasAnyAnswered`.

**src/components/pregnancy-toolkit/BirthPlanProgress.tsx**
- Optional `onPrint` prop rendering a small text-button print link, hidden when absent. `print:hidden` applied.

**src/components/pregnancy-toolkit/BirthPlanPrintable.tsx**
- Iterate bands, skipping bands with no answered sections; keep existing `bpp-*` class conventions and add `bpp-band`, `bpp-band-title`, `bpp-care-notes`, `bpp-rule`.
- Append the ruled "Notes from my care team" block after the sections, before the footer.

**src/index.css**
- Add print rules for the new `bpp-band*` and `bpp-care-notes` classes inside the existing `@media print` block. No edits to any `#hospital-bag-print` or shared print reset rules, so Hospital Bag print is untouched.

## QA

- Playwright pass at desktop (1280) and mobile (390) widths: band grouping and order, Answered / Not yet chips, collapse and reopen with `aria-expanded`, single export block, chips and notes still saving, completion percentage still updating, console clean.
- Print DOM inspection for the birth plan: four bands, answered only, disclaimer, care-team ruled area.
- Print DOM inspection for Hospital Bag to confirm no regression.
- `npx tsgo --noEmit -p tsconfig.json` and the focused schema tests, with exact output returned.
