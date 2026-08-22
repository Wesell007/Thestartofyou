Phase 28E Close-out Verification

Run the final checks required to close Phase 28E, then confirm closure and stop before any next phase.

Scope
- No further UI, logic, schema, validation, RLS, care-event, route, sitemap, AI, Cindy, reminders or notification changes.
- This is purely verification and reporting.

Acceptance already confirmed
- Nano Banana was used inside Lovable before implementation.
- One prioritised support moment now appears on /my-ttc-journey.
- Two-week wait support, possible test day support, negative/unclear test support, and period-arrived support each appear when relevant.
- Support actions use the existing notes flow; guidance actions use existing routes; Ask remains a plain route link.
- No inline Ask Cindy, no TTC AI mode, no new log types, no automatic cycle reset, and no automatic pregnancy journey creation were added.
- Schema, RLS, storage, auth, AI, cycle maths, calculator logic, pregnancy handover, SEO, sitemap, and routes remain unchanged.

Checks
1. Run `npx tsgo --noEmit -p tsconfig.json` and confirm typecheck passes.
2. Run `npx vitest run` and confirm the test suite passes.
3. Run `npm run build` and confirm it exits 0.
4. If any targeted tests exist for the changed components, run them directly.
5. Report the pass/fail result and, if all pass, mark Phase 28E closed.

Stop criteria
- Do not start Phase 28F or any other new phase until explicitly instructed to do so.
