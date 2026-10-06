import pathlib, shutil
C1 = pathlib.Path(r"C:\Users\Administrator\.c1"); W = C1 / "c1_18"
REPO = pathlib.Path(r"C:\Users\Administrator\Desktop\Thestartofyou"); E = REPO / "docs/strategy/evidence/41b1a-c1"
rd = lambda p: pathlib.Path(p).read_text(encoding="utf-8", errors="replace")
cp = lambda s, d: shutil.copy(s, E / d)
cp(W / "preflight.log", "24-c1-18-preflight.log")
cp(W / "fixture.log", "24a-c1-18-fixture.log")
cp(W / "user_d_report.json", "24b-c1-18-user-d-report.json")
cp(W / "graph_pre.log", "24c-c1-18-graph-pre.log")
(E / "24d-c1-18-fk-and-triggers.log").write_text(rd(W / "fk_triggers.log") + "\n" + rd(W / "parent_triggers.log"), encoding="utf-8", newline="\n")
cp(W / "delete_result.json", "24f-c1-18-delete-result.json")
cp(W / "graph_post.log", "24g-c1-18-graph-post.log")
(E / "24h-c1-18-catalogue-diff.txt").write_text("c1_18_pre vs c1_18_post (nine sections)\n" + rd(C1 / "c1_13" / "c1_18_pre.vs.c1_18_post.diff.txt") + "\npre hashes:\n" + rd(C1 / "c1_13" / "c1_18_pre" / "hashes.txt") + "post hashes:\n" + rd(C1 / "c1_13" / "c1_18_post" / "hashes.txt") + "\nfinal state:\n" + rd(W / "final_state.txt"), encoding="utf-8", newline="\n")
cp(W / "functions_list.log", "24i-c1-18-functions-list.log")
H = E / "24j-c1-18-harness"; H.mkdir(exist_ok=True)
for f in ("c1_18_user_d.py", "c1_18_fixture_template.sql", "c1_18_graph_template.sql", "c1_18_fk_triggers_template.sql", "c1_18_parent_triggers.sql", "c1_18_delete.py", "c1_18_preflight.sql"):
    shutil.copy(C1 / f, H / f)
p = E / "00-identity.md"; s = rd(p)
old = "Project 2 foundation NOT present after C1.15. C1.18 NOT STARTED."
new = "Project 2 foundation NOT present after C1.15. C1.18 OBSERVATION PASS — EXPLORATORY, Project 1 only (2026-10-06T23:27Z; see `24e-c1-18-summary.md`): the plan's real `auth.admin.deleteUser` path (HTTP 200, one attempt) removed disposable synthetic User D with a connected graph (journey pointer, given_birth episode, 7 episode-bound rows, linked baby, 4 First Year child rows); 0 orphans across all 28 user-owned tables; control users and legacy fixture unchanged; nine-section catalogue PRE vs POST EMPTY. On Project 1 the `pregnancy_episodes` cascade trigger (`RI_ConstraintTrigger_a_19067`) sorts last on `auth.users`; trigger order is OID/name-based and not portable. The Edge Function's storage-first stage was not exercised. PRODUCTION ACCOUNT-DELETION GATE REMAINS OPEN. C1.19 NOT STARTED."
assert s.count(old) == 1; p.write_text(s.replace(old, new), encoding="utf-8", newline="\n")
r = REPO / "roadmap.md"; t = rd(r)
old2 = "- [ ] C1.18 onward NOT STARTED. Project 2 foundation NOT present after C1.15; Project 1 foundation present (validated). 41B.1A NOT applied to production."
new2 = "- [x] C1.18 OBSERVATION PASS — EXPLORATORY, Project 1 only, not a C1 PASS criterion (2026-10-06): real `auth.admin.deleteUser` (HTTP 200, one attempt) deleted disposable synthetic User D holding a populated journey pointer, a given_birth episode, 7 episode-bound rows, a linked baby and 4 First Year child rows; 0 orphans; controls and legacy fixture unchanged; catalogue PRE vs POST EMPTY. Here the episode cascade trigger on `auth.users` sorts last (`RI_ConstraintTrigger_a_19067`), so all bound rows cascaded before the RESTRICT checks; that order is OID/name-based and does not transfer to production. Edge Function storage-first stage (N10) not exercised. **Production account-deletion gate remains OPEN** (route still to be chosen). Evidence `24*-c1-18-*`.\n- [ ] C1.19 onward NOT STARTED. Project 1 foundation present (validated); Project 2 foundation absent. 41B.1A NOT applied to production. READY FOR 41B.1B = NO."
assert t.count(old2) == 1
nl = "\r\n" if "\r\n" in t else "\n"
r.write_text(t.replace(old2, new2.replace("\n", nl)), encoding="utf-8", newline="")
print("evidence built; status updated")
