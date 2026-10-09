# 01 — Target guard and offline self-test

**Result: PASS.** Fresh guard directory `C:\Users\Administrator\.n103b\` (not `.g3` / `.n10r1`, both absent). Credentials were saved there by the owner or generated there; none was printed, echoed or committed.

## Guard components

| Component | Enforces |
|---|---|
| `n103b_guard.sh` (shared) | target from `target_ref.txt` must be a 20-letter ref, equal the caller's `N103B_EXPECT_REF`, and not be denylisted; any argument naming a denylisted ref, another project's host or another ref is refused |
| `n103b_cli.sh` | Supabase CLI 2.120.0 runs only inside the sealed clone (HEAD = sealed commit, clean, no stored `project-ref`, any `linked-project.json` must name only the target); exact command allowlist; every command carries an explicit target (`--project-ref` or a `--db-url` built internally from the protected password file, redacted from output) |
| `n103b_psql.sh` | owner sessions only to `db.<target>.supabase.co` and only after the in-database marker equals the target; worker sessions only with a URL for `account_deletion_worker.<target>`; files run only with a matching SHA-256 |
| `n103blib.py` | Management API `GET /v1/projects/<target>[...]` only; project calls only to `https://<target>.supabase.co/{auth,storage,functions,rest}/v1/...`; raw URLs (signed URLs) only on the exact target host; every output leak-checked against all local credential values and credential patterns |

Denylist: production `wogepxfipdipogyogced`; C1 `wwtcnbjhttjtklpxhrkd`, `dlftnirrnirlkhxpofoq`; G3 `czhopceorfqxdbfvlnap`; N10.1 `gbhwpzofnswlryqjoumw`.

## Self-test history (all offline: stubbed HTTP, fake ref, dry-run wrappers)

| Run | Result | Why it changed |
|---|---|---|
| initial build | 52/52 | — |
| pre-flight (owner inputs present) | 52/52 | `raw/01-guard-selftest-preflight-52.log` |
| after `seed buckets` flag correction | 53/53 | CLI requires `--linked` with `--project-ref`; allowlist changed to that exact form + a refusal case without the target |
| after link-metadata hardening | 49/53 → 57/57 | the new "link metadata must name only the target" check correctly refused the fake-ref accept cases run against the real sealed copy; the self-test was moved to a throwaway sealed clone and 4 link cases were added |
| after the M3 patch | 58/58 | guard repointed to the new sealed commit `2dcab66f`; a case refusing the superseded `0007797c` copy was added |
| final | **60/60** | `/rest/v1/` (Data API, target host only) allowed for the §32 app-write spot check; `/graphql/v1` and other paths still refused (`raw/01-guard-selftest-final-60.log`) |

Cases covered include: each denylisted ref as target or argument; another project's ref/host; lookalike hosts; missing/empty/malformed target; missing or mismatched expected ref; 0-byte token; `link`, `db reset`, deploy-all, non-N10 deploy, caller-supplied `--db-url`; stored link / foreign link metadata; superseded sealed commit; SQL files with wrong/missing hash; worker URLs for the wrong role or project; Management API org-wide listing and traversal; credential leak detection.

After the run the scratch marker schema was dropped, so owner psql sessions now fail closed ("marker check failed") unless explicitly run with `--no-marker`.
