# 00 — Identity gate

**Result: PASS.** First remote operation was a read-only Management API identity GET (`raw/00-identity-project.json`), followed by a psql baseline read (`raw/00-identity-psql.txt`).

| Check | Expected (owner-confirmed) | Observed |
|---|---|---|
| Name | `tsoy-n10-3b-rehearsal` | `tsoy-n10-3b-rehearsal` |
| Ref | `toqeefrwnsjuhjmobodg` | `toqeefrwnsjuhjmobodg` |
| Organisation | WesellProducts | `xzickmpbmsjgkowcqpbg` (WesellProducts) |
| Region | eu-west-2 | `eu-west-2` |
| PostgreSQL | 17.11.0.003 / PG17 | `17.11.0.003`, engine 17, `PostgreSQL 17.11 on aarch64` |
| Status | ACTIVE_HEALTHY | `ACTIVE_HEALTHY` |
| Created | this rehearsal | `2026-10-09T04:03:09Z` (same day, before any N10.3B work) |

Baseline (psql, `postgres` on `db.toqeefrwnsjuhjmobodg.supabase.co`): `current_database = postgres`; 0 `auth.users`; no `supabase_migrations` history; 0 public tables/functions; no `private` schema; no worker role; no buckets; 0 objects; pg_cron/pg_net absent; Vault 0.3.1. The project started in the expected disposable state; no TSOY migrations were present.

Production (`wogepxfipdipogyogced`) and the retired refs were never contacted. Every remote call went through the N10.3B guard (01).
