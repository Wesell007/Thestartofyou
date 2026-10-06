import pathlib, shutil, json
C1 = pathlib.Path(r"C:\Users\Administrator\.c1"); W = C1 / "c1_15"
REPO = pathlib.Path(r"C:\Users\Administrator\Desktop\Thestartofyou"); E = REPO / "docs/strategy/evidence/41b1a-c1"
SECS = ["columns", "enums", "functions", "triggers", "rls", "policies", "constraints", "indexes", "grants"]
rd = lambda p: pathlib.Path(p).read_text(encoding="utf-8", errors="replace")
shutil.copy(C1 / "c1_15_pre_safe_state.log", E / "21-c1-15-pre-rollback-safe-state.log")
shutil.copy(W / "c1_15_success.rollback.log", E / "21a-c1-15-rollback-success.log")
shutil.copy(W / "post_verify.log", E / "21b-c1-15-post-rollback-verification.log")
snap = W / "c1_15_post"
parts = ["# 41B.1A-C1 — 21c C1.15 post-rollback nine-section catalogue (Project 1)", "",
         "Captured 2026-10-05T22:47:39Z (UTC) in a fresh psql session (read-only, `postgres`) immediately after the successful rollback committed. Same queries, ordering and line formats as `02-baseline-catalogue.md`. The functions section below uses `md5(pg_get_functiondef)` with `true/false` security (the C1.5-onward capture format); the `md5(prosrc)` form that matches the baseline file line for line is appended as the final block and both forms were compared (`21d-c1-15-diff-vs-c1-1-baseline.md`).", "",
         "Section hashes (count, md5 of sorted lines, as captured):", "```text", rd(snap / "hashes.txt").strip(), "```", ""]
for s in SECS:
    lines = [x for x in rd(snap / f"sec_{s}.txt").splitlines() if x.strip()]
    parts += [f"## {s} ({len(lines)})", "```text", *lines, "```", ""]
pl = [x for x in rd(snap / "sec_functions_prosrc.txt").splitlines() if x.strip()]
parts += [f"## functions by md5(prosrc), baseline-file format ({len(pl)})", "```text", *pl, "```", ""]
(E / "21c-c1-15-post-rollback-catalogue.md").write_text("\n".join(parts), encoding="utf-8", newline="\n")
shutil.copy(W / "compare_vs_c1_1.md", E / "21d-c1-15-diff-vs-c1-1-baseline.md")
shutil.copy(W / "compare_vs_c1_1.json", E / "21d-c1-15-diff-vs-c1-1-baseline.json")
# pre-rollback snapshot equality with C1.14 reference
shutil.copy(C1 / "c1_13" / "pre_c1_15.vs.c1_15_pre.diff.txt", E / "21f-c1-15-pre-rollback-vs-c1-14-reference.diff.txt")
H = E / "21g-c1-15-harness"; H.mkdir(exist_ok=True)
for f in ("c1_15_post_verify.sql", "compare_c1_15.py", "c1_14_safe_state_queries.sql"):
    shutil.copy(C1 / f, H / f)
# status
p = E / "00-identity.md"; s = rd(p)
old = "Rollback file NOT executed. C1.15 NOT STARTED."
new = "Rollback file NOT executed in C1.14. C1.15 PASS (2026-10-05T22:48Z; see `21e-c1-15-summary.md`): frozen 41B.1A rollback completed successfully on Project 1; the full post-rollback structural catalogue equals the C1.1 pre-foundation baseline under the fixed exclusions, all 21 legacy fixture rows and three synthetic users survive unchanged, and no unrelated object was removed. Rollback `0d008955…` exit 0 in 0.51 s (one transaction, no refusal, no error/warning/notice); fresh-session inventory shows every 41B.1A object class absent; nine-section diff versus `02-baseline-catalogue.md` EMPTY with no exclusion needed; legacy tuple-identity and content fingerprints unchanged; history 47; marker intact. 41B.1A foundation NO LONGER PRESENT on Project 1. C1.16 NOT STARTED."
assert s.count(old) == 1; p.write_text(s.replace(old, new), encoding="utf-8", newline="\n")
r = REPO / "roadmap.md"; t = rd(r)
old2 = "- [ ] C1.15 onward NOT STARTED. Successful rollback NOT run. 41B.1A NOT applied to production."
new2 = "- [x] C1.15 PASS — frozen 41B.1A rollback completed successfully on Project 1; the full post-rollback structural catalogue equals the C1.1 pre-foundation baseline under the fixed exclusions, all 21 legacy fixture rows and three synthetic users survive unchanged, and no unrelated object was removed (2026-10-05): safe-state gate all zero immediately before; rollback `0d008955…` through the hash-gated single-transaction psql runner as `postgres`, exit 0 in 0.51 s, no refusal, no error/warning/notice, no CASCADE in the file; fresh session: `pregnancy_episodes`, 13 link columns, 13 ownership FKs, episode indexes/CHECKs/trigger/policies and `babies_id_user_id_key` all absent, scratch 0; nine-section diff against `02-baseline-catalogue.md` EMPTY (289/5/25/35/34/114/141/86/34 lines, functions matched by both prosrc and functiondef), no exclusion needed; legacy fixture 21 in the C1.2 shape with tuple-identity and content fingerprints unchanged; users 3; history 47; marker intact. Evidence `21*-c1-15-*`.\n- [ ] C1.16 onward NOT STARTED. Forward migration NOT reapplied. 41B.1A NOT applied to production."
assert t.count(old2) == 1
nl = "\r\n" if "\r\n" in t else "\n"
r.write_text(t.replace(old2, new2.replace("\n", nl)), encoding="utf-8", newline="")
print("evidence built; status updated")
