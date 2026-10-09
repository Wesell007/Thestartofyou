# N10.1 — 00 Identity

Hosted Supabase Storage/Auth semantics probe. Executed 2026-10-09 (UTC) by Claude Code. The owner created the disposable project in the dashboard and supplied the ref and credential files.

| Item | Value | Evidence |
|---|---|---|
| Project | `tsoy-n10-r1-rehearsal` | `raw/00a` |
| Ref | `gbhwpzofnswlryqjoumw` (owner-confirmed; the only allowed target) | `raw/00a` |
| Organisation | id `xzickmpbmsjgkowcqpbg`, the WesellProducts organisation id recorded for C1 and G3 | `raw/00a` |
| Region | `eu-west-2` | `raw/00a` |
| PostgreSQL | `17.11.0.003`; server `PostgreSQL 17.11 on x86_64-pc-linux-gnu` | `raw/00a`, `raw/00b` |
| Status | `ACTIVE_HEALTHY`; created 2026-10-09T01:03:50Z | `raw/00a` |
| Initial state | 0 Auth users, 0 buckets, 0 objects, 0 public tables | `raw/00b` |
| Storage catalogue (read-only) | `storage.objects` FKs: only `objects_bucketId_fkey → storage.buckets(id)`; 0 FKs from the `storage` schema to `auth.users`; `owner` uuid (nullable, no FK), `owner_id` text (nullable); 0 non-internal triggers on `auth.users`; 73 Storage migrations including `drop-owner-foreign-key` | `raw/00b` |
| Marker | `public.n10r1_rehearsal_marker` = `gbhwpzofnswlryqjoumw / N10.1-storage-auth-semantics` (RLS on; anon/authenticated revoked) | `raw/02-setup.*` |

No TSOY schema was replayed, no 41B migration was applied, and production was not accessed.
