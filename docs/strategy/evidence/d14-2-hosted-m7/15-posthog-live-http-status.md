# 15 — PostHog live HTTP status (P12)

**POSTHOG LIVE HTTP E2E = NOT RUN / DEFERRED TO CONTROLLED ACTIVATION.**

- No dedicated non-production PostHog project exists. The production TSOY PostHog project was **not** used.
- No PostHog key was requested, created or stored. No `POSTHOG_*` secret exists on the disposable project (12).
- The adapter (`_shared/analyticsErasureProvider.ts`), its host allow-list (`https://eu.posthog.com`, `https://us.posthog.com`) and its request construction were **not changed**. No test-only provider was added to production source. The hosted proofs simulated the provider result only at the neutral `AnalyticsEraser` boundary inside the rehearsal harness (10, 11).
- Request construction (`POST {host}/api/projects/{id}/persons/bulk_delete/`, `{distinct_ids:[uuid], delete_events:true, delete_recordings:true, keep_person:false}`, Bearer key) and response/error classification remain covered by the local suite (`src/test/n10AnalyticsErasure.test.ts`) at `4b561385`.

What controlled activation must still prove with the real backend-only credential (project-scoped `phx_` key, `person:write` only):
1. a live `bulk_delete` for a known synthetic distinct id returns 202 with `persons_found` and is classified `resolved`;
2. a wrong key or project gives a permanent failure, leading to attention;
3. the key never appears in logs, the database, pg_net or the client.

This deferral does **not** fail the hosted M7 core (brief §20).
