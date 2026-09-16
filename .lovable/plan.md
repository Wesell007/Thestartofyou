# Phase 34H.3 — IVF save release gate resolution

Feature stays OFF. No activation, no deployment, no schema change, no flag change, no consent UX.
Two tracks only: a human privacy/legal review pack, and an audit of where the production build gets the feature switch.

## Track A — privacy/legal review pack

Create `docs/content/phase34h3-ivf-save-privacy-legal-review-pack.md`, written for a real human reviewer, readable without the engineering roadmap:

1. Executive summary — what the feature is, the two values saved, the purpose, and that it is currently off and never activated publicly.
2. Exact data stored (`ivf_transfer_date`, `ivf_transfer_type`) and the explicit list of what is not stored; derived timeline recalculated from the two source values.
3. How data is collected — no automatic collection; calculating, choosing a date or type, signing in and loading the timeline never write; writes happen only on Save / Update / Remove.
4. Who can save — authenticated, active Trying to Conceive journey, existing TTC record; never creates a journey; lifecycles stay ttc / pregnancy / first_year.
5. Storage and access model — values live on the existing TTC journey record, one row per user, existing user-scoped access controls, no new public access, no separate IVF table.
6. User control — explicit save, update, remove; removal clears only the two values.
7. Deletion behaviour — remove clears the two values; TTC journey deletion removes the row; account deletion cascades; no automated expiry; no retention job; backup retention recorded as NOT ESTABLISHED BY REPOSITORY TRUTH.
8. Data not exposed elsewhere — URL, query, hash, localStorage, sessionStorage, cookies, auth metadata, analytics, logs, Companion, AI and grounding all recorded NO.
9. Authentication handoff — full-page `/auth` flow, accepted signed-out re-entry decision, no hidden temporary storage.
10. Privacy notice finding — coverage gap identified YES; change required recorded as FOR HUMAN REVIEWER TO DECIDE, not as a legal conclusion.
11. Proposed user copy, every block marked PROPOSED / NOT YET HUMAN-APPROVED, matching the copy currently built.
12. Reviewer decision table with blank fields: name, role, date, then sections A–J (privacy notice, copy, lawful processing, special-category, explicit consent, retention, deletion, backup retention, additional documentation, final approval).

All human fields stay blank / NOT PROVIDED. No invented reviewer, date, lawful basis, consent decision or self-approval. A YES on explicit consent keeps activation blocked and needs a new phase — stated in the pack.

## Track B — production flag verification (audit only)

Create `docs/content/phase34h3-ivf-save-production-flag-verification.md`.

Audit, changing nothing: repository build scripts and Vite config, CI workflow, repository environment files, project secret/environment configuration available through project tooling, publish/deployment settings, and any hosting configuration that is genuinely inspectable. Anything that cannot be inspected is recorded NOT VERIFIED rather than assumed.

Record the required findings exactly: hosting/deployment provider, production build mechanism, environment-variable configuration location, whether `VITE_IVF_TIMELINE_SAVE_ENABLED` can be supplied at build time, the exact value-setting workflow, whether it needs a repository change, rebuild required YES, redeploy required YES, and whether rollback by FALSE + rebuild + redeploy is achievable.

The flag is not set. No `.env.production` created. Nothing deployed.

If the injection point verifies, document the controlled release sequence (approval, notice changes, any implementation changes, release QA, set flag true, build, deploy, synthetic smoke test, remove synthetic values, confirm zero test values) and the rollback sequence, noting that turning the feature off must not delete existing user data.

## Documentation and closure

Update `roadmap.md` with the 34H.3 entry. Phase 34H.2 evidence is left intact apart from a cross-reference if needed.

Completion report returns every field listed in the request. Closure is Outcome A (technical release configuration pass, blocked on human privacy/legal approval) if the injection point verifies, otherwise Outcome B (pack ready, blocked on both gates). Either way: flag off, not deployed, not activated, schema unchanged, no IVF lifecycle, no AI access, ready to activate = NO.

## Validation

Documentation-only phase: no source changes expected. Run the test suite, typecheck and lint to confirm the repository is unchanged in behaviour, and report exact counts.
