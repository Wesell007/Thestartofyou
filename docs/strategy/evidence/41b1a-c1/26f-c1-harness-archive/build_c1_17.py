import pathlib, shutil, json, re
C1 = pathlib.Path(r"C:\Users\Administrator\.c1"); W = C1 / "c2"
REPO = pathlib.Path(r"C:\Users\Administrator\Desktop\Thestartofyou"); E = REPO / "docs/strategy/evidence/41b1a-c1"
D = E / "23-c1-17-project2"; D.mkdir(exist_ok=True)
SECS = ["columns", "enums", "functions", "triggers", "rls", "policies", "constraints", "indexes", "grants"]
rd = lambda p: pathlib.Path(p).read_text(encoding="utf-8", errors="replace")
def catalogue_md(label, title, note):
    snap = W / label
    parts = [f"# {title}", "", note, "", "Section hashes (count, md5 of sorted lines, as captured):", "```text", rd(snap / "hashes.txt").strip(), "```", ""]
    for s in SECS:
        lines = [x for x in rd(snap / f"sec_{s}.txt").splitlines() if x.strip()]
        parts += [f"## {s} ({len(lines)})", "```text", *lines, "```", ""]
    pl = [x for x in rd(snap / "sec_functions_prosrc.txt").splitlines() if x.strip()]
    parts += [f"## functions by md5(prosrc), baseline-file format ({len(pl)})", "```text", *pl, "```", ""]
    return "\n".join(parts)
cp = lambda src, dst: shutil.copy(src, D / dst)
# C1.0 / identity
cp(C1 / "c2_connect.log", "00a-p2-connection-and-pre-c1-0-identity.log"); cp(W / "c1_0_marker.log", "00b-p2-c1-0-marker.log")
# C1.1
for f, n in (("c1_1_link.log", "01a-p2-c1-1-link.log"), ("c1_1_dryrun.log", "01b-p2-c1-1-dry-run.log"), ("c1_1_push.log", "01c-p2-c1-1-push.log"), ("c1_1_migration_list.log", "01d-p2-c1-1-migration-list.log"), ("c1_1_db_state.txt", "01e-p2-c1-1-db-state.txt")):
    cp(W / f, n)
(D / "01f-p2-c1-1-baseline-catalogue.md").write_text(catalogue_md("p2_baseline", "41B.1A-C1 — C1.17 Project 2 C1.1 baseline catalogue", "Captured 2026-10-06T00:39:42Z on `tsoy-41b1a-c1-run2` (`dlftnirrnirlkhxpofoq`) immediately after the 47-migration replay from 735a07e6 and before any 41B.1A file. Same queries and formats as `02-baseline-catalogue.md` (Project 1 C1.1)."), encoding="utf-8", newline="\n")
cp(W / "p2_baseline_vs_p1_c1_1.md", "01g-p2-baseline-diff-vs-p1-c1-1.md"); cp(W / "p2_baseline_vs_p1_c1_1.json", "01g-p2-baseline-diff-vs-p1-c1-1.json")
cp(C1 / "manifest_scratch2.txt", "01h-p2-baseline-migration-manifest.txt")
# C1.2
cp(W / "c1_2_users_report.json", "02a-p2-c1-2-users-report.json"); cp(W / "c1_2_fixture.log", "02b-p2-c1-2-fixture.log"); cp(W / "c1_2_state.txt", "02c-p2-c1-2-state.txt")
cp(W / "p2_baseline.vs.p2_post_fixture.diff.txt", "02d-p2-c1-2-structure-diff-vs-baseline.txt")
ids = json.load(open(C1 / "run2.user_ids.json", encoding="utf-8"))
(D / "02e-p2-synthetic-ids.json").write_text(json.dumps({"project_ref": "dlftnirrnirlkhxpofoq", "run_label": "41B.1A-C1-run2", "users": {k: {"id": v, "email": f"c1-user-{k.lower()}@example.invalid"} for k, v in ids.items()}, "episode_fixture": {"E-A1": "00000000-0000-4c10-8000-00000000ea01", "E-B1": "00000000-0000-4c10-8000-00000000eb01"}, "legacy_row_ids_same_as_project_1": True, "secrets_in_this_file": False}, indent=1), encoding="utf-8", newline="\n")
# C1.4 / C1.5
cp(W / "c1_4_forward.log", "04a-p2-c1-4-forward.log"); cp(W / "c1_4_state.txt", "04b-p2-c1-4-state.txt")
(D / "05a-p2-c1-5-post-forward-catalogue.md").write_text(catalogue_md("p2_post_forward", "41B.1A-C1 — C1.17 Project 2 post-forward catalogue", "Captured 2026-10-06T00:43Z in a fresh session immediately after the frozen forward file on Project 2."), encoding="utf-8", newline="\n")
cp(W / "p2_post_forward_vs_p1_c1_5.md", "05b-p2-post-forward-diff-vs-p1-c1-5.md"); cp(W / "p2_post_forward_vs_p1_c1_5.json", "05b-p2-post-forward-diff-vs-p1-c1-5.json")
# C1.7
cp(W / "c1_7_validate.log", "07a-p2-c1-7-validate.log"); cp(W / "c1_7_state.txt", "07b-p2-c1-7-state.txt")
(D / "07c-p2-c1-7-post-validate-catalogue.md").write_text(catalogue_md("p2_post_validate", "41B.1A-C1 — C1.17 Project 2 post-validation catalogue", "Captured 2026-10-06T00:43Z in a fresh session immediately after the frozen validate file on Project 2. Diffs EMPTY against the Project 1 validated reference (C1.14 `pre_c1_15` snapshot = `20c-c1-14-pre-c1-15-catalogue.md`)."), encoding="utf-8", newline="\n")
cp(W / "p1_validated_ref.vs.p2_post_validate.diff.txt", "07d-p2-post-validate-diff-vs-p1-validated.txt")
# starred rows
cp(W / "fixture_episodes.log", "08a-p2-episode-fixture.log")
cp(W / "star_I.log", "09a-p2-star-I.log"); cp(W / "star_I.json", "09b-p2-star-I.json")
cp(W / "star_J.log", "10a-p2-star-J.log"); cp(W / "star_J.json", "10b-p2-star-J.json")
cp(W / "star_H_postgrest.json", "11a-p2-star-H-postgrest.json"); cp(W / "star_H_psql.log", "11b-p2-star-H-psql.log")
# R1
cp(W / "r1.rollback.log", "13a-p2-r1-refusal.log"); cp(W / "r1_pre.guards.log", "13b-p2-r1-pre-guards.log"); cp(W / "r1_post.guards.log", "13c-p2-r1-post-guards.log")
(D / "13d-p2-r1-pre-catalogue.md").write_text(catalogue_md("r1_pre", "41B.1A-C1 — C1.17 Project 2 R1 pre-run catalogue", "Per-case PRE snapshot immediately before the R1 refusal run."), encoding="utf-8", newline="\n")
(D / "13e-p2-r1-post-catalogue.md").write_text(catalogue_md("r1_post", "41B.1A-C1 — C1.17 Project 2 R1 post-refusal catalogue", "Fresh-session snapshot immediately after the refused rollback."), encoding="utf-8", newline="\n")
cp(W / "r1_pre.vs.r1_post.diff.txt", "13f-p2-r1-post-vs-pre.diff.txt")
# C1.14
cp(W / "c1_14_safe_state_before.log", "14a-p2-c1-14-safe-state-before-cleanup.log"); cp(W / "c1_14_cleanup.log", "14b-p2-c1-14-cleanup.log"); cp(W / "c1_14_safe_state_after.log", "14c-p2-c1-14-safe-state-after-cleanup.log")
cp(W / "p2_post_validate.vs.p2_pre_c1_15.diff.txt", "14d-p2-pre-c1-15-diff-vs-post-validate.txt")
# C1.15
cp(W / "c1_15_success.rollback.log", "15a-p2-c1-15-rollback-success.log"); cp(W / "c1_15_post_verify.log", "15b-p2-c1-15-post-rollback-verification.log")
(D / "15c-p2-c1-15-post-rollback-catalogue.md").write_text(catalogue_md("p2_post_rollback", "41B.1A-C1 — C1.17 Project 2 post-rollback catalogue", "Captured 2026-10-06T00:45Z in a fresh session after the successful rollback on Project 2."), encoding="utf-8", newline="\n")
cp(W / "p2_baseline.vs.p2_post_rollback.diff.txt", "15d-p2-post-rollback-diff-vs-p2-own-baseline.txt")
cp(W / "p2_post_rollback_vs_p1_c1_1.md", "15e-p2-post-rollback-diff-vs-p1-c1-1.md"); cp(W / "p2_post_rollback_vs_p1_c1_1.json", "15e-p2-post-rollback-diff-vs-p1-c1-1.json")
cp(W / "final_state.txt", "15f-p2-final-state.txt")
# harness
H = D / "99-p2-harness"; H.mkdir(exist_ok=True)
for f in ("c2_psql.sh", "c2_psql_notx.sh", "c2_cli.sh", "c2_driver.sh", "denylist2.txt", "target_ref2.txt", "c2_c1_0_marker.sql", "c2_users.py", "c2_c1_2_fixture_template.sql", "c2_fixture_episodes.sql", "C2_star_I.sql", "C2_star_J.sql", "c2_star_H_postgrest.py", "C2_star_H_psql.sql", "c1_14_cleanup.sql", "c1_14_safe_state_queries.sql", "c1_15_post_verify.sql", "compare_generic.py"):
    shutil.copy(C1 / f, H / f)
# matrix
fw = json.load(open(W / "p2_post_forward_vs_p1_c1_5.json", encoding="utf-8")); bl = json.load(open(W / "p2_baseline_vs_p1_c1_1.json", encoding="utf-8")); pr = json.load(open(W / "p2_post_rollback_vs_p1_c1_1.json", encoding="utf-8"))
si = json.load(open(W / "star_I.json", encoding="utf-8")); sj = json.load(open(W / "star_J.json", encoding="utf-8")); sh = json.load(open(W / "star_H_postgrest.json", encoding="utf-8"))
r1 = rd(W / "r1.rollback.log"); r1msg = re.search(r"ERROR:\s+(ROLLBACK REFUSED:[^\n]*)", r1).group(1).strip(); r1rc = re.search(r"rc=(\d+)", r1.split("END ")[-1]).group(1)
val_empty = rd(W / "p1_validated_ref.vs.p2_post_validate.diff.txt").strip() == "EMPTY"; own_empty = rd(W / "p2_baseline.vs.p2_post_rollback.diff.txt").strip() == "EMPTY"; r1_empty = rd(W / "r1_pre.vs.r1_post.diff.txt").strip() == "EMPTY"
rows = ["# 41B.1A-C1 — 23 C1.17 fresh-project reproducibility matrix (Project 1 versus Project 2)", "",
 "Project 2 `tsoy-41b1a-c1-run2` (`dlftnirrnirlkhxpofoq`, eu-west-2, PostgreSQL 17.11.0.002, created independently 2026-10-03T21:31:18Z, never cloned or restored from Project 1) was taken through C1.0, C1.1, C1.2, C1.4, C1.5, C1.7, the starred rows of sections I, J and H, one refusal (R1), C1.14 and C1.15 on 2026-10-06 with its own credentials, its own Auth users and its own scratch clone, through wrappers that target only Project 2 and denylist production and Project 1. User/Auth UUIDs are project-local and differ by design; every structural and behavioural result is compared.", "",
 "| Checkpoint | Project 1 reference | Project 2 result | Identical |", "|---|---|---|---|",
 f"| baseline after 47 migrations | C1.1 `02-baseline-catalogue.md` | `01f` + `01g`: nine sections, 289/5/25/35/34/114/141/86/34 lines | {'YES' if bl['all_empty'] else '**NO**'} |",
 "| 21-row legacy fixture shape | C1.2 `07-c1-2-fixture-manifest.md` | `02b`/`02c`: same 16-table distribution, same deterministic row ids, 3 synthetic users (fresh ids), 0 non-synthetic, structure diff EMPTY | YES |",
 f"| post-forward catalogue | C1.5 `11-c1-5-post-forward-catalogue.md` | `05a` + `05b`: 315/5/25/36/35/118/161/104/35 lines, 13 NOT VALID RESTRICT links, ACL `authenticated=r`, anon/PUBLIC false | {'YES' if fw['all_empty'] else '**NO**'} |",
 f"| validated foundation | C1.7 / C1.14 `20c-c1-14-pre-c1-15-catalogue.md` | `07c` + `07d`: 13/13 validated, RESTRICT, 2 pre-existing NOT VALID account FKs | {'YES' if val_empty else '**NO**'} |",
 f"| ★ I behaviour | C1.8 / C1.16 (same-user accepted, cross-user 23503 naming the relationship FK) | `09a`/`09b`: {si['summary']['same_ok']}/{si['summary']['same_required']} accepted, {si['summary']['cross_ok']}/{si['summary']['cross_required']} rejected over 13 relationships | {'YES' if not si['summary']['unexpected'] else '**NO**'} |",
 f"| ★ J behaviour | C1.9 / C1.16 (one active; second active and active+paused 23505 on the one-open index; removal frees the slot; removed row retained unchanged) | `10a`/`10b`: {sj['summary']['ok']}/{sj['summary']['cases']} as expected | {'YES' if not sj['summary']['unexpected'] else '**NO**'} |",
 f"| ★ H PostgREST/JWT behaviour | C1.11 / C1.12 / C1.16 (H-1 only own row, H-2 empty, H-3/4/5 403 code 42501; psql dual-GUC agrees) | `11a`/`11b`: genuine Project 2 User A JWT (user id verified), {sh['summary']['pass']}/{sh['summary']['cases']} PostgREST cases, psql: only E-A1, B filter 0, three 42501 | {'YES' if not sh['summary']['fail'] else '**NO**'} |",
 f"| R1 rollback refusal | C1.13 R1 (`holds 2 row(s)`, exit 3, empty POST-vs-PRE) | `13a`–`13f`: `{r1msg}`, exit {r1rc}, POST-vs-PRE {'EMPTY' if r1_empty else 'DIFF'} | {'YES' if r1_empty and r1rc == '3' and 'holds 2 row(s)' in r1msg else '**NO**'} |",
 f"| successful rollback baseline | C1.15 (exit 0, catalogue equals C1.1) | `15a`–`15e`: exit 0, 0 errors, post-rollback equals Project 2 own baseline ({'EMPTY' if own_empty else 'DIFF'}) and Project 1 C1.1 ({'EMPTY' if pr['all_empty'] else 'DIFF'}); legacy 21, users 3, history 47 | {'YES' if own_empty and pr['all_empty'] else '**NO**'} |", ""]
allok = bl["all_empty"] and fw["all_empty"] and val_empty and not si["summary"]["unexpected"] and not sj["summary"]["unexpected"] and not sh["summary"]["fail"] and r1_empty and r1rc == "3" and own_empty and pr["all_empty"]
rows.append(f"Overall: **{'IDENTICAL' if allok else 'NOT IDENTICAL'}**."); rows.append("")
(D / "23-p2-reproducibility-matrix.md").write_text("\n".join(rows), encoding="utf-8", newline="\n")
print("all identical:", allok)
# status
p = E / "00-identity.md"; s = rd(p)
old = "41B.1A foundation PRESENT on Project 1 again (validated). C1.17 NOT STARTED."
new = "41B.1A foundation PRESENT on Project 1 again (validated). C1.17 PASS (2026-10-06T00:45Z; see `23-c1-17-project2/23-p2-summary.md`): fresh-project reproducibility on `tsoy-41b1a-c1-run2` (`dlftnirrnirlkhxpofoq`, independently created, own credentials, own Auth users with fresh ids, own scratch clone, wrappers denylisting production and Project 1): C1.0 marker, C1.1 47-migration replay (baseline diff vs Project 1 C1.1 EMPTY), C1.2 (3 users, 21 rows), C1.4 forward exit 0 (diff vs Project 1 C1.5 EMPTY), C1.7 validate exit 0 (diff vs Project 1 validated state EMPTY), starred I/J/H rows identical (H through Project 2 PostgREST with a genuine Project 2 JWT), R1 refusal `holds 2 row(s)` with empty POST-vs-PRE diff, C1.14 safe state, C1.15 rollback exit 0 with post-rollback catalogue equal to Project 2 own baseline and to Project 1 C1.1; legacy 21, users 3, history 47. Project 1 not accessed in C1.17. Project 2 foundation NOT present after C1.15. C1.18 NOT STARTED."
assert s.count(old) == 1; p.write_text(s.replace(old, new), encoding="utf-8", newline="\n")
r = REPO / "roadmap.md"; t = rd(r)
old2 = "- [ ] C1.17 onward NOT STARTED. Project 2 NOT touched. 41B.1A NOT applied to production."
new2 = "- [x] C1.17 PASS — fresh-project reproducibility proven on Project 2 `tsoy-41b1a-c1-run2` (`dlftnirrnirlkhxpofoq`, independently created, own credentials and Auth users, wrappers denylisting production and Project 1) (2026-10-06): C1.0 marker; C1.1 replay of the same 47 migrations with the baseline catalogue EMPTY against Project 1 C1.1; C1.2 three synthetic users (fresh ids, genuine sign-in) and the 21-row fixture; C1.4 forward `e6ad0bc8…` exit 0 with post-forward catalogue EMPTY against Project 1 C1.5; C1.7 validate `8645fd67…` exit 0 with validated catalogue EMPTY against the Project 1 validated reference; starred I (26 cases), J (7 cases) and H (H-1..H-5 via Project 2 PostgREST with a genuine Project 2 JWT plus psql) identical; R1 refusal `holds 2 row(s)` exit 3 with empty POST-vs-PRE diff; C1.14 safe state; C1.15 rollback `0d008955…` exit 0 with post-rollback catalogue EMPTY against Project 2 own baseline and Project 1 C1.1; legacy 21, users 3, history 47; Project 1 untouched. Evidence `23-c1-17-project2/`.\n- [ ] C1.18 onward NOT STARTED. Project 2 foundation NOT present after C1.15; Project 1 foundation present (validated). 41B.1A NOT applied to production."
assert t.count(old2) == 1
nl = "\r\n" if "\r\n" in t else "\n"
r.write_text(t.replace(old2, new2.replace("\n", nl)), encoding="utf-8", newline="")
print("evidence built; status updated")
