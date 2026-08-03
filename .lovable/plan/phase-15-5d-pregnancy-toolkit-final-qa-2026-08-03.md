# Phase 15.5D: Pregnancy Toolkit Final QA

QA-only pass across the Pregnancy Toolkit after Hospital Bag v2 and Birth Plan v2. No new features. Fixes only if a real defect or regression is found.

## What will be checked

**Toolkit hub** (`/pregnancy-toolkit`): loads for a signed-in active pregnancy journey, all seven cards present, status lines correct (Hospital Bag packed progress, Birth Plan completion), navigation into each tool, non-active journey notice, loss reveal behaviour, no horizontal overflow on mobile, clean desktop layout, clean console.

**Hospital Bag v2**: category order (Documents, Mum or birthing parent, Baby, Birth partner, After birth and comfort) with the stored comfort key unchanged, collapse/expand including reopening completed categories, packed items settling below unpacked, toggle saves and optimistic behaviour, custom add and delete, "Still to pack" strip, print checklist DOM (grouped categories, custom items, "This is a guide, not a rule."), browser Save as PDF path, mobile layout, console.

**Birth Plan v2**: four bands in order, "Notes for your midwife" inside Your own words, saved answers load, chip and note saves, progress recalculation, Answered / Not yet markers, answered sections collapsed by default, sections staying open while editing, single export block, compact print link only when there is content, print output limited to answered sections with empty bands skipped and "Notes from my care team" present, browser Save as PDF path, mobile layout, console.

**Other tools smoke test**: Appointments, Baby movements, Contraction timer, Symptom notes, Questions for midwife — page loads, existing entries render, add flow where safe, save state, back-to-toolkit link, mobile layout, console. No rewrites.

**Print isolation**: printing Hospital Bag shows only its block, printing Birth Plan shows only its block, no cross-leakage, screen-only buttons hidden, readable print styling.

**Journey status gating**: code review (plus live test where the account supports it) that active pregnancy shows tools normally and loss, paused, no longer pregnant, and given birth do not surface tools unprompted. No writes of sensitive journey-status data.

## How it will be done

- Playwright scripts under `/tmp/browser/` against `http://localhost:8080` with the injected session, at desktop (1280 wide) and mobile (390 wide) viewports, capturing screenshots, console output, and print-block DOM via `page.emulate_media(media="print")`.
- Static review of `PregnancyToolkit.tsx`, the seven tool pages, `hospitalBagSchema.ts`, `birthPlanSchema.ts`, the Hospital Bag and Birth Plan printable components, and the print rules in `src/index.css`.
- `npx tsgo --noEmit -p tsconfig.json`
- `npx vitest run src/lib/hospitalBagSchema.test.ts src/lib/birthPlanSchema.test.ts`, plus any other existing toolkit-area tests.

## Fix policy

Only defects surfaced by this QA get fixed, kept as small and presentational as possible. Out of bounds: AI, routes, sitemap, analytics, RLS, storage, schema, migrations, sharing, PDF library, server export, and any new Hospital Bag or Birth Plan features. Anything found that needs a larger change is reported, not built.

## Report

Files changed (if any); hub, Hospital Bag, Birth Plan, other-tools, print, journey-status, desktop, mobile, and console results; typecheck and Vitest results; defects found and fixes applied; whether 15.5D and all of 15.5 can be closed.

## Stop point

Stops after the QA report. No Phase 15.6, AI drafting, sharing, or new toolkit features.
