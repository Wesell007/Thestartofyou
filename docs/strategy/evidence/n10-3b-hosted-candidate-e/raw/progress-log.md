# N10.3B progress log (local, non-secret)
- 2026-10-09T07:2xZ pre-flight: dbpass 11 B, pat 44 B (metadata only); target_ref.txt written; self-test 52/52.
- 07:25:47Z identity GET PASS (name/ref/org xzickmpbmsjgkowcqpbg/eu-west-2/17.11.0.003/ACTIVE_HEALTHY/created 04:03:09Z).
- psql identity PASS: postgres db, PG 17.11, 0 auth users, no migrations, no public objects, no buckets, 0 objects.
- marker schema n103b_rehearsal created (scratch; remove in §35).
- migration list 49 local / 0 remote; dry-run 49; db push 07:26:37Z-07:26:43Z rc=0; history 49 rows.
- §9 seed buckets: '--project-ref' alone rejected (SeedMutuallyExclusiveFlagsError: needs --linked); allowlist -> '--linked --project-ref <target>'; self-test 53/53.
- §9 retry: StorageAuthTokenError (PAT lacks Storage privilege). STOPPED per owner rule. first-year-memories NOT created.
- CLI wrote supabase/.temp/linked-project.json (ref=target only, gitignored); guard now asserts it names only the target.
- No destructive action yet; no functions deployed; no secrets set; no users created.
- 07:35:48Z owner replaced PAT (44 B, metadata only). Pre-retry: target_ref exact; sealed 0007797c clean; no project-ref; linked-project.json ref = target only.
- self-test 49/53 at first: new link-metadata guard correctly refused fake-ref accept cases run against the REAL sealed copy (stale fixture). Self-test now uses a throwaway sealed clone + 4 link cases -> 57/57.
- §9 retry with new PAT: identical StorageAuthTokenError. STOPPED. first-year-memories NOT created; only weekly-photos (private).
- read-only diagnostics: GET api-keys 200 (names/types only); GET storage/buckets 200 ['weekly-photos']; GET config/storage 403 "Missing required permission(s): storage_config_read".
- 2026-10-09 (post owner final PAT, 07:50:51Z): self-test 57/57; Storage Config read 200; seed buckets still StorageAuthTokenError.
  Diagnosis: CLI requests GET api-keys?reveal=true -> 403 (identical message). Non-reveal listing returns legacy anon/service_role JWTs (claims verified role+ref; saved n103b.anon_key / n103b.service_key; never printed).
  first-year-memories created via Storage API POST /storage/v1/bucket {public:false} -> 200; both buckets private; no others. CLI seed deviation CLOSED (owner).
- Recovery checks A-G PASS (41B.1A: public.pregnancy_episodes absent; '41b' hits were pg_opfamily + a UUID-named migration).
- §10 catalogue PASS (raw/10-catalogue.txt). cron fired 54x with 0 pg_net requests (no-op while Vault empty).
- §11 inventory (raw/11-privileges.txt, 11b): worker callable = 10 N10 private fns + 10 public INVOKER fns (9 trigger fns, 1 immutable normaliser: SAFE) + 12 net.* fns via PUBLIC; no non-N10 SECURITY DEFINER callable; pg_terminate/cancel own-backend only.
  net.http_request_queue and net._http_response ACL: =arwdDxtm/supabase_admin (ALL to PUBLIC); schema net =U to PUBLIC.
  T10: postgres cannot revoke (WARNING no privileges could be revoked) - not fixable by a postgres-run migration.
- §12 worker password generated locally (40 chars), set via local SCRAM verifier (plaintext never sent). /config/database/pooler needs database_pooling_config_read (not granted); pooler verified empirically:
  Supavisor aws-0-eu-west-2.pooler.supabase.com:6543 user account_deletion_worker.<ref> -> connected. N10_DB_URL saved locally.
- §13 probes as real worker over pooler (raw/13-worker-probes.txt): auth/storage/vault/cron schemas denied; private table + public tables denied; internal N10 fns denied; trigger fn direct call errors; cannot terminate other roles' backends; positives OK.
  EXCESS: worker can net.http_get/http_post (arbitrary outbound HTTP), SELECT/UPDATE/DELETE net.http_request_queue (which will carry the M2 cron request's Authorization: Bearer <service_role JWT> once Vault is set) and _http_response.
- HOLD: N10.3B HOLD - WORKER EFFECTIVE PRIVILEGE SURFACE TOO BROAD. Stopped before §14. Vault values NOT set, functions NOT deployed, no users, no destructive action, predictions not written.
- N10.3A M3 patch pushed 0007797c..2dcab66f (6bd5561b fix, c4181b1f tests, 2dcab66f docs). M3 c2f34cb3f112...
- Sealed src-2dcab66f; guard -> 2dcab66f; self-test 58 -> 60/60 (rest/v1 allowed on target only).
- M3 dry-run only M3; applied 09:31:31Z; history 50. Cron jobid 2 hardened. Queue proof (rolled back) PASS. Invoke secret 43 chars (n103b.invoke_secret).
- jwt_exp 3600 (mgmt API). Function secrets 5 set. Deployed delete-account v1 (verify_jwt true), worker v1 (false). Boundary C1-C12/D1-D6 PASS. Probes after M3 identical. postgrest exposes public,graphql_public only. §11 PASS WITH PG_NET PLATFORM RESIDUAL.
- Users C P S A F B D Q N created 09:36Z. Predictions committed 24df06d5 at 09:37:14Z (local).
- Fixtures 32 uploads PASS (midwife_questions fixture category invalid - harness).
- P: PASS except download -> CDN HIT residual (same credential only; origin denies; cache keyed per credential). S: PASS; worker processed S+P 09:42:08. Post-purge: all cached/signed paths stopped by first poll (<=~30 s).
- Vault set 09:43:07Z (url+invoke). Cron 12 runs pre-vault, 0 net. Post-vault each minute 200 {"ok":true}.
- A: first two attempts sent {} -> 400 "Deletion must be explicitly confirmed" (harness; no request). Third with {confirmed:true} 10:01:09Z: all PASS; U1 <=3 s.
- Logs endpoint: logs.all removed (410) -> /analytics/endpoints/logs with single table `logs`, column source.
- 10:05-10:27: B bulk 1112 PASS (3 remove calls); F release+cron 10:07 PASS; D (cron raced D2b) + L SKIP LOCKED PASS; N anomaly REPRODUCED via service-role move, purge_attention + alert PASS; Q seeded sweep PASS; retention PASS; advisors 0 N10 errors; secret audit 0 literal hits; final catalogue identical; scratch schema dropped 10:26.
- 10:28 recreated marker schema for follow-up: T = CDN residual while purge withheld (blocker t_blocker, 25 min, background) ; then P/S real completion expected ~10:58 via cron. Final cleanup must be repeated.
