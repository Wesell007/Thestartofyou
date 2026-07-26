Plan approved for Phase 13.2d Journey Status Cleanup.

To apply the two small UI fixes, please switch to build mode so I can edit:
1. `src/components/journey-status/JourneyStatusSection.tsx` — show "Updated {d MMM yyyy}" when `status_changed_at` exists, with a guard for malformed dates.
2. `src/pages/MyJourney.tsx` — add "Open First Year" link when `status === "given_birth"`.

Out of scope: schema, migrations, functions, AI, routes, sitemap, robots, public pages, TTC, companion, Birth Plan, Hospital Bag, photos, captions, reflections.

Verification after edits: `bunx tsgo --noEmit`.