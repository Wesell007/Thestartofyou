## Phase 12.8a — Birth Plan Export & Print QA: Sign-off

QA passed on all required checks. No code changes proposed.

- Section order: correct (birth → environment → pain_relief → partner_support → labour → monitoring → feeding → after_birth → midwife_notes).
- Empty state: both actions disabled at top and bottom mounts, helper line visible.
- Partial plan: printable includes only completed sections with parent name, due date, intro, prepared date and footer.
- Print preview: only `#birth-plan-print` visible; nav, progress, toolkit chrome and page footer hidden; white background, black text, A4 margins.
- Mobile 390×844: no overflow, action row stacks cleanly.
- Copy audit: no em dashes, en dashes, "guaranteed", "fixed plan", "must", or diagnosis language in user-facing surfaces. Required intro line present verbatim.
- No dependency, schema, migration, route, sitemap, saved journey, other toolkit, My Week, My Journey or AI changes.
- `bunx tsgo --noEmit` clean.

Recommendation: sign off Phase 12.8. Approve this plan to close the QA phase (no files will be modified).