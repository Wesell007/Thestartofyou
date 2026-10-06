import pathlib, shutil
C1 = pathlib.Path(r"C:\Users\Administrator\.c1")
REPO = pathlib.Path(r"C:\Users\Administrator\Desktop\Thestartofyou"); E = REPO / "docs/strategy/evidence/41b1a-c1"
SECS = ["columns", "enums", "functions", "triggers", "rls", "policies", "constraints", "indexes", "grants"]
rd = lambda p: pathlib.Path(p).read_text(encoding="utf-8", errors="replace")
shutil.copy(C1 / "c1_14_safe_state_pre.log", E / "20-c1-14-safe-state-queries-before-cleanup.log")
shutil.copy(C1 / "c1_14_cleanup.log", E / "20a-c1-14-cleanup-transaction.log")
shutil.copy(C1 / "c1_14_safe_state_post.log", E / "20b-c1-14-safe-state-queries-after-cleanup.log")
snap = C1 / "c1_13" / "pre_c1_15"
parts = ["# 41B.1A-C1 — 20c C1.14 pre-C1.15 nine-section catalogue (Project 1, 41B.1A foundation installed, safe state)", "",
         "Captured 2026-10-05T22:30:41Z (UTC) through the psql wrapper (read-only, `postgres`) immediately after the C1.14 cleanup transaction. This is the authoritative immediately-before-successful-rollback structural state for C1.15. It is NOT expected to equal the C1.1 baseline (the foundation is intentionally still installed); it diffs EMPTY against the C1.13 `final` snapshot (`19d-c1-13-catalogues/final.md`) and its integration-channel hashes equal the C1.12 post-state.", "",
         "Section hashes (count, md5 of sorted lines):", "```text", rd(snap / "hashes.txt").strip(), "```", ""]
for s in SECS:
    lines = [x for x in rd(snap / f"sec_{s}.txt").splitlines() if x.strip()]
    parts += [f"## {s} ({len(lines)})", "```text", *lines, "```", ""]
(E / "20c-c1-14-pre-c1-15-catalogue.md").write_text("\n".join(parts), encoding="utf-8", newline="\n")
(E / "20d-c1-14-catalogue-diff-vs-c1-13-final.txt").write_text(rd(C1 / "c1_14" / "final.vs.pre_c1_15.diff.txt"), encoding="utf-8", newline="\n")
H = E / "20f-c1-14-harness"; H.mkdir(exist_ok=True)
for f in ("c1_14_safe_state_queries.sql", "c1_14_cleanup.sql"):
    shutil.copy(C1 / f, H / f)
# status
p = E / "00-identity.md"; s = rd(p)
old = "Successful rollback NOT run. C1.14 NOT STARTED."
new = "Successful rollback NOT run. C1.14 PASS (2026-10-05T22:31Z; see `20e-c1-14-summary.md`): Project 1 is in rollback-safe state: no Pregnancy Episode rows, pointers, bound links, later-phase Pregnancy Episode FKs, babies-key dependants or C1 scratch objects remain; legacy fixture preserved and 41B.1A foundation still installed. Section K safe-state set itemised (17 checks, all 0) before and after the explicit cleanup transaction, which touched 0 rows and 0 objects; legacy fixture 21 in the C1.2 shape; users 3; pre-C1.15 nine-section catalogue captured (equal to the C1.13 final snapshot); history 47. Rollback file NOT executed. C1.15 NOT STARTED."
assert s.count(old) == 1; p.write_text(s.replace(old, new), encoding="utf-8", newline="\n")
r = REPO / "roadmap.md"; t = rd(r)
old2 = "- [ ] C1.14 onward NOT STARTED. Successful rollback NOT run. 41B.1A NOT applied to production."
new2 = "- [x] C1.14 PASS — Project 1 is in rollback-safe state: no Pregnancy Episode rows, pointers, bound links, later-phase Pregnancy Episode FKs, babies-key dependants or C1 scratch objects remain; legacy fixture preserved and 41B.1A foundation still installed (2026-10-05): section K safe-state set run itemised as `postgres` (episodes 0, pointers 0, twelve link counts 0, later-phase FKs 0, babies-key dependants 0, scratch 0) before and after the plan's explicit cleanup transaction, which found nothing to clean (0 rows, 0 objects; no state created); legacy fixture 21 in the C1.2 shape, users 3; foundation intact (table, 13 validated RESTRICT links, 13 link columns and indexes, babies key, open unique index, 3 CHECKs, trigger, RLS, 4 policies, authenticated SELECT-only); pre-C1.15 nine-section catalogue captured and equal to the C1.13 final snapshot; history 47; rollback file not executed. Evidence `20*-c1-14-*`.\n- [ ] C1.15 onward NOT STARTED. Successful rollback NOT run. 41B.1A NOT applied to production."
assert t.count(old2) == 1
nl = "\r\n" if "\r\n" in t else "\n"
r.write_text(t.replace(old2, new2.replace("\n", nl)), encoding="utf-8", newline="")
print("evidence built; status updated")
