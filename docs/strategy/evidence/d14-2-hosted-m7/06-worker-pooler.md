# 06 — Real worker login through the pooler (P4)

Connection exactly as the runtime builds it (`accountDeletionRuntime.ts`): Postgres.js `postgres(url, { prepare: false, max: 1, idle_timeout: 5, connect_timeout: … })`, URL user `account_deletion_worker.jjrhizafpikmyvfapcic`, host `aws-0-eu-west-2.pooler.supabase.com`, port **6543** (Supavisor transaction mode), TLS required. The password is the locally generated high-entropy secret whose SCRAM verifier was set on the role; it is stored only in `.d142/` outside Git. The same URL shape was set as the Edge Function secret `N10_DB_URL` and passes `isDedicatedRoleUrl`.

| Check | Pre-M7 (`raw/04-worker-pooler-prem7.txt`) | Post-M7 (`raw/09-proofs-p2-p8.txt`) |
|---|---|---|
| `current_user` / `session_user` | `account_deletion_worker` / `account_deletion_worker` | `account_deletion_worker` |
| Worker-surface call | `n10_alerts_pending_count()` → 0 | every surface function used in 07–13 (incl. `n10_analytics_due`, `n10_record_analytics`) |
| `select … from private.account_deletion_requests` | **42501** permission denied | **42501** |
| `update private.account_deletion_requests …` | — | **42501** |
| `select … from auth.users` | **42501** (no `auth` schema usage) | — |

Every post-M7 proof in 07–13 (and the deployed Edge Function in 12) ran its database work through this connection. `postgres` was used only for read-only snapshots, the documented synthetic time-shifts and the deliberately refused owner writes in 08; it was never a substitute for the worker proof.

**P4: PASS.**
