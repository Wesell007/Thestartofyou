Phase 28C Close-out Verification

Run the final checks required to close Phase 28C, then confirm closure and stop before any next phase.

Scope
- No further UI, logic, schema, validation, RLS, care-event, route, sitemap, AI, Cindy, reminders or notification changes.
- This is purely verification and reporting.

Acceptance already confirmed
- Nano Banana was used inside Lovable before implementation.
- Today card now leads /my-ttc-journey and uses existing derived TTC data only.
- The old six-tile dashboard has been reduced into quiet Cycle details.
- The timeline has been reshaped into a softer cycle path.
- What may be useful today now appears higher.
- Notes, calendar, Ask, pregnancy handover, remove journey footer and AlertDialog behaviour remain unchanged.
- No schema, RLS, storage, auth, AI, route, cycle maths, logging, calculator, pregnancy handover, SEO or sitemap changes.

Checks
1. Run `npm run build` and confirm it exits 0.
2. Run `npx vitest run` and confirm the test suite passes.
3. Run `npx tsgo --noEmit -p tsconfig.json` and confirm typecheck passes.
4. If any targeted tests exist for the changed components, run them directly.
5. Report the pass/fail result and, if all pass, mark Phase 28C closed.

Stop criteria
- Do not start Phase 28D or any other new phase until explicitly instructed to do so.
