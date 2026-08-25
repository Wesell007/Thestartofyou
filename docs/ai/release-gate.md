# Release gate for AI changes

Every future AI change — prompt edit, mode addition, source-routing change, model change, new AI surface, context change — must pass this gate before it ships. Record the completed checklist in the phase report. A failed item blocks release; it is never waived silently.

## A. Scope and intent

- [ ] The change is inside the supported scope in `purpose-and-scope.md`
- [ ] The change does not add an unsupported behaviour, directly or as a side effect
- [ ] The safety categories affected are named explicitly
- [ ] If a new surface is added, its mode, context builder and visibility rules are documented

## B. Data and privacy

- [ ] The exact data sent to the model is listed, field by field
- [ ] Data minimisation confirmed: nothing beyond the coarse allowlist reaches the request
- [ ] No journal, note, reflection, memory, media or log content is sent
- [ ] Context stays inside the 500-character cap
- [ ] Privacy impact considered and written down, including anything newly persisted
- [ ] No real user data accessed during QA; all QA used synthetic input
- [ ] No personal or health data added to logs, analytics or error messages

## C. Safety

- [ ] Source routing reviewed: the change cannot send a question to an irrelevant or emergency-only page
- [ ] Urgent escalation reviewed: every Red and Crisis path in `escalation-matrix.md` for the affected journeys still escalates, escalation-first
- [ ] Any new hard pattern checked for false positives on routine questions
- [ ] Banned-phrase tests pass
- [ ] Ambiguity handling checked: broad terms still clarify, urgent wording still bypasses clarification
- [ ] Recap-only surfaces still carry no clinical or escalation wording
- [ ] Prompt-injection spot check: an instruction embedded in the question or context does not change behaviour

## D. Output hygiene

- [ ] No external links, markdown links or raw URLs survive in any answer
- [ ] No "Sources", "References" or "Further reading" section appears
- [ ] No retrieval wording is exposed
- [ ] The approved trust line is present and unchanged, and no superseded trust copy has returned
- [ ] The single approved fallback line is used for a genuine inability to answer

## E. Experience QA

- [ ] `/ask` regression: empty, clarification, answer, follow-up and urgent states
- [ ] Companion panel regression: launcher visibility, route-to-mode, session-only turns, "Start again", 404 suppression, stop and retry
- [ ] Mobile QA at 390px: no horizontal overflow, readable measure, 44px tap targets
- [ ] Desktop QA at 1440px: answer column contained, hierarchy intact
- [ ] Loading, empty, error, cancelled and rate-limited states all render sensibly
- [ ] Keyboard and screen-reader behaviour preserved: labelled controls, visible focus, semantic headings

## F. Engineering checks

- [ ] `npx tsgo --noEmit -p tsconfig.json` passes
- [ ] `npx vitest run` passes in full
- [ ] `npm run build` passes
- [ ] `npm run lint` passes
- [ ] New behaviour has focused tests, and the evaluation dataset was extended if a new risk was introduced
- [ ] No schema, RLS, auth, route, SEO or sitemap change was made unintentionally

## G. Rollback

- [ ] Rollback plan written: which prompt, model, source list or flag returns to which previous value
- [ ] Rollback is possible without a database migration
- [ ] Model and prompt version recorded in the phase report so a regression can be attributed
- [ ] The kill-switch route is known and tested (see `observability-and-incidents.md`)
