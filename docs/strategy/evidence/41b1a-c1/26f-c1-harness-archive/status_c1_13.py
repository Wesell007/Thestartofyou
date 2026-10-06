import pathlib
REPO = pathlib.Path(r"C:\Users\Administrator\Desktop\Thestartofyou"); E = REPO / "docs/strategy/evidence/41b1a-c1"
p = E / "00-identity.md"; s = p.read_text(encoding="utf-8")
old = "structure identical to C1.11). C1.13 NOT STARTED."
new = "structure identical to C1.11). C1.13 PASS (2026-10-05T22:25Z; see `19g-c1-13-summary.md`): rollback refusal matrix proven: R1 refuses on episode history, combined all-guards state refuses on guard 1 proving frozen precedence, R2 refuses on a later-phase Pregnancy Episode FK, and R3 refuses on a babies-key dependant; every failed rollback leaves an empty per-case POST-vs-PRE catalogue diff. Exactly four rollback executions (exit 3 each, no statement after the refusal). Episode fixture E-A1/E-B1 removed during the approved safe-state transition (recorded separately); legacy fixture remains 21; links 0, pointers 0, scratch 0; every 41B.1A foundation object intact (13 validated RESTRICT links, babies key, 4 policies, trigger, 4 indexes); history 47. Successful rollback NOT run. C1.14 NOT STARTED."
assert s.count(old) == 1; p.write_text(s.replace(old, new), encoding="utf-8", newline="\n")
r = REPO / "roadmap.md"; t = r.read_text(encoding="utf-8")
old2 = "- [ ] C1.13 onward NOT STARTED. Rollback file NOT run. 41B.1A NOT applied to production."
new2 = "- [x] C1.13 PASS — rollback refusal matrix proven: R1 refuses on episode history, combined all-guards state refuses on guard 1 proving frozen precedence, R2 refuses on a later-phase Pregnancy Episode FK, and R3 refuses on a babies-key dependant; every failed rollback leaves an empty per-case POST-vs-PRE catalogue diff (2026-10-05): frozen rollback `0d008955…` run four times on Project 1 through the hash-gated single-transaction runner (exit 3 each; `holds 2 row(s)` ×2, `1 foreign key(s) from a later phase reference pregnancy_episodes`, `1 foreign key(s) depend on babies_id_user_id_key`); guards 3/4 proven only inside the combined state behind guard 1, never fabricated; safe-state transition recorded separately (pointer and link unbound, E-A1/E-B1 deleted, legacy fixture 21 preserved); scratch tables removed; final catalogue equals the R1 pre-run snapshot; history 47. Successful rollback NOT run; C1.14 NOT executed. Evidence `19*-c1-13-*`.\n- [ ] C1.14 onward NOT STARTED. Successful rollback NOT run. 41B.1A NOT applied to production."
assert t.count(old2) == 1
nl = "\r\n" if "\r\n" in t else "\n"
r.write_text(t.replace(old2, new2.replace("\n", nl)), encoding="utf-8", newline="")
print("status updated")
