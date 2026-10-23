# 02 — Source and hashes

- Sealed source: `4b561385db2c56cc1cd30aeccb0e32be5a1601af` (`feat(n10-d14.1): durable analytics-identity erasure gating completion (M7)`), clone clean (0 changes), no remote.
- Predictions: `7c10c065` (`00-predictions-before-execution.md`), committed and pushed **before** any hosted action. Not edited afterwards.
- No source change was required during D14.2; no reseal.

## Staging

The working copy of the sealed clone has CRLF line endings (`core.autocrlf=true` on this workstation): M7 hashes `299d60bd…` there. To push the committed bytes, staging was rebuilt with `git -c core.autocrlf=false archive 4b561385 supabase`:

- 53 pre-M7 migrations: **0 / 53 mismatches** between the staged file and `git show 4b561385:<path>` (`raw/02-stage-hashes.txt`); 0 CR bytes.
- M7 `20261015053138_n10_analytics_erasure.sql` held back for the baseline, then restored for its own push: sha256 **`8dde2626170055505f82734c7c54962e961ce1d0b38c8082659b3ae18efa5768`** (= committed LF blob).
- M1–M6 sha256 (unchanged since N10.5): M1 `bc73c427…`, M2 `99c42be0…`, M3 `c2f34cb3…`, M4 `63348e3a…`, M5 `b6899e9a…`, M6 `9f9acf6f…`.
- Staged `config.toml`: only `project_id` changed from the repository's production-looking value to `jjrhizafpikmyvfapcic` (never used as authority; every command named the target explicitly). The repository file is unchanged.
- Edge Functions staged the same way (0 CR bytes); only `account-deletion-worker` was deployed (see 12).
- 41B.1A (`docs/strategy/migrations-pending/`) was **not** staged or applied.
- After execution the hosted bodies of all six M7-defined functions are byte-identical to the committed M7 text (`raw/05-function-body-diff.txt`).
