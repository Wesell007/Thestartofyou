import pathlib, shutil, json
C1 = pathlib.Path(r"C:\Users\Administrator\.c1"); W = C1 / "c1_16"
REPO = pathlib.Path(r"C:\Users\Administrator\Desktop\Thestartofyou"); E = REPO / "docs/strategy/evidence/41b1a-c1"
SECS = ["columns", "enums", "functions", "triggers", "rls", "policies", "constraints", "indexes", "grants"]
rd = lambda p: pathlib.Path(p).read_text(encoding="utf-8", errors="replace")
def catalogue_md(label, title, note):
    snap = C1 / "c1_13" / label
    parts = [f"# {title}", "", note, "", "Section hashes (count, md5 of sorted lines, as captured):", "```text", rd(snap / "hashes.txt").strip(), "```", ""]
    for s in SECS:
        lines = [x for x in rd(snap / f"sec_{s}.txt").splitlines() if x.strip()]
        parts += [f"## {s} ({len(lines)})", "```text", *lines, "```", ""]
    return "\n".join(parts)
shutil.copy(C1 / "c1_16_pre_verify.log", E / "22-c1-16-pre-reapplication-verification.log")
shutil.copy(W / "pre_vs_c1_1.md", E / "22a-c1-16-pre-reapplication-diff-vs-c1-1.md")
shutil.copy(W / "forward.log", E / "22b-c1-16-forward-reapplication.log")
(E / "22c-c1-16-post-forward-catalogue.md").write_text(catalogue_md("c1_16_post_forward", "41B.1A-C1 — 22c C1.16 post-forward catalogue (second application)", "Captured 2026-10-06T00:04:37Z in a fresh psql session immediately after the second forward application, before validation. Compared with the first application (`11-c1-5-post-forward-catalogue.md`) in `22d`."), encoding="utf-8", newline="\n")
shutil.copy(W / "post_forward_vs_c1_5.md", E / "22d-c1-16-post-forward-diff-vs-c1-5.md")
shutil.copy(W / "post_forward_vs_c1_5.json", E / "22d-c1-16-post-forward-diff-vs-c1-5.json")
shutil.copy(W / "validate.log", E / "22e-c1-16-validate-reapplication.log")
(E / "22f-c1-16-post-validate-catalogue.md").write_text(catalogue_md("c1_16_post_validate", "41B.1A-C1 — 22f C1.16 post-validation catalogue (second validated application)", "Captured 2026-10-06T00:05:34Z in a fresh psql session immediately after the second validation. Diffs EMPTY against the first validated state (`20c-c1-14-pre-c1-15-catalogue.md` / C1.13 `r1_pre` snapshot), see `22g`."), encoding="utf-8", newline="\n")
(E / "22g-c1-16-post-validate-diffs.txt").write_text("## c1_16_post_validate vs pre_c1_15 (C1.14 pre-rollback validated reference)\n" + rd(C1 / "c1_13" / "pre_c1_15.vs.c1_16_post_validate.diff.txt") + "\n## c1_16_post_validate vs r1_pre (C1.13 first validated snapshot)\n" + rd(C1 / "c1_13" / "r1_pre.vs.c1_16_post_validate.diff.txt") + "\n## c1_16_post_validate vs c1_16_final (after the starred rows)\n" + rd(C1 / "c1_13" / "c1_16_post_validate.vs.c1_16_final.diff.txt") + "\n## c1_15_post vs c1_16_pre (pre-reapplication equals post-rollback)\n" + rd(C1 / "c1_13" / "c1_15_post.vs.c1_16_pre.diff.txt"), encoding="utf-8", newline="\n")
shutil.copy(W / "fixture_episodes.log", E / "22h-c1-16-episode-fixture.log")
shutil.copy(W / "star_I.log", E / "22i-c1-16-star-I.log"); shutil.copy(W / "star_I.json", E / "22i-c1-16-star-I.json")
shutil.copy(W / "star_J.log", E / "22j-c1-16-star-J.log"); shutil.copy(W / "star_J.json", E / "22j-c1-16-star-J.json")
shutil.copy(W / "star_H_postgrest.json", E / "22k-c1-16-star-H-postgrest.json"); shutil.copy(W / "star_H_psql.log", E / "22k-c1-16-star-H-psql.log")
shutil.copy(W / "post_forward_fk_state.txt", E / "22l-c1-16-fk-state-post-forward.txt"); shutil.copy(W / "post_validate_fk_state.txt", E / "22l-c1-16-fk-state-post-validate.txt"); shutil.copy(W / "final_state.txt", E / "22l-c1-16-final-state.txt")
H = E / "22n-c1-16-harness"; H.mkdir(exist_ok=True)
for f in ("compare_generic.py", "c1_16_fixture_episodes.sql", "C1_16_star_I.sql", "C1_16_star_J.sql", "c1_16_star_H_postgrest.py", "C1_16_star_H_psql.sql", "gen_c1_8.py"):
    shutil.copy(C1 / f, H / f)
# reproducibility matrix
fw = json.load(open(W / "post_forward_vs_c1_5.json", encoding="utf-8"))
si = json.load(open(W / "star_I.json", encoding="utf-8")); sj = json.load(open(W / "star_J.json", encoding="utf-8")); sh = json.load(open(W / "star_H_postgrest.json", encoding="utf-8"))
rows = ["# 41B.1A-C1 — 22m C1.16 reproducibility matrix (Project 1)", "", "| Area | First application reference | Second application | Identical |", "|---|---|---|---|"]
names = {"columns": "columns", "enums": "enums/types", "functions": "functions (prosrc + functiondef)", "triggers": "triggers", "rls": "RLS/table state", "policies": "policies", "constraints": "constraints", "indexes": "indexes", "grants": "grants/ACL"}
for s in SECS:
    v = fw["sections"][s]; rows.append(f"| {names[s]} | C1.5 (`11-c1-5-post-forward-catalogue.md`), {v['reference']} lines | C1.16 post-forward, {v['captured']} lines | {'YES' if v['empty'] else '**NO**'} |")
val_empty = rd(C1 / "c1_13" / "pre_c1_15.vs.c1_16_post_validate.diff.txt").strip() == "EMPTY" and rd(C1 / "c1_13" / "r1_pre.vs.c1_16_post_validate.diff.txt").strip() == "EMPTY"
rows.append(f"| validated structure (all nine sections) | first validated state (C1.7 → C1.13 `r1_pre` / C1.14 `pre_c1_15`) | C1.16 post-validate | {'YES' if val_empty else '**NO**'} |")
rows += ["", "## Starred behavioural rows re-run after re-application", "", "| Section | Rows | Result |", "|---|---|---|",
         f"| I ★ (same-user accepted, cross-user rejected 23503 naming the relationship FK) | {si['summary']['cases']} cases over 13 relationships | {si['summary']['same_ok']}/{si['summary']['same_required']} accepted, {si['summary']['cross_ok']}/{si['summary']['cross_required']} rejected; unexpected {len(si['summary']['unexpected'])} |",
         f"| J ★ (one active; second active 23505; active+paused 23505; removal then new active; removed row retained unchanged) | {sj['summary']['cases']} cases | {sj['summary']['ok']}/{sj['summary']['cases']} as expected; unexpected {len(sj['summary']['unexpected'])} |",
         f"| H ★ (H-1..H-5, genuine A JWT through PostgREST; psql dual-GUC corroboration) | {sh['summary']['cases']} PostgREST cases + 5 psql cases | PostgREST {sh['summary']['pass']}/{sh['summary']['cases']}; psql: H-1 only E-A1, H-2 zero rows, H-3/H-4/H-5 SQLSTATE 42501 |", ""]
(E / "22m-c1-16-reproducibility-matrix.md").write_text("\n".join(rows), encoding="utf-8", newline="\n")
ok = fw["all_empty"] and val_empty and not si["summary"]["unexpected"] and not sj["summary"]["unexpected"] and not sh["summary"]["fail"]
print("all identical and starred rows pass:", ok)
p = E / "00-identity.md"; s = rd(p)
old = "41B.1A foundation NO LONGER PRESENT on Project 1. C1.16 NOT STARTED."
new = "41B.1A foundation was absent after C1.15. C1.16 PASS (2026-10-06T00:07Z; see `22o-c1-16-summary.md`): frozen 41B.1A foundation successfully re-applied on Project 1 after complete rollback; the second application reproduces the original application structure exactly, with legacy fixture and migration history unchanged; the validated state also reproduced exactly (forward exit 0, nine-section diff versus C1.5 EMPTY; validate exit 0, diff versus the first validated state EMPTY; starred rows of sections I, J and H re-run and identical; episode fixture E-A1/E-B1 recreated for those rows and left in place; legacy fixture 21 with unchanged fingerprints; users 3; history 47). 41B.1A foundation PRESENT on Project 1 again (validated). C1.17 NOT STARTED."
assert s.count(old) == 1; p.write_text(s.replace(old, new), encoding="utf-8", newline="\n")
r = REPO / "roadmap.md"; t = rd(r)
old2 = "- [ ] C1.16 onward NOT STARTED. Forward migration NOT reapplied. 41B.1A NOT applied to production."
new2 = "- [x] C1.16 PASS — frozen 41B.1A foundation successfully re-applied on Project 1 after complete rollback; the second application reproduces the original application structure exactly, with legacy fixture and migration history unchanged; the validated state reproduced exactly (2026-10-06): pre-state equal to the C1.1 baseline; forward `e6ad0bc8…` exit 0 in 0.56 s, nine-section diff versus the C1.5 post-forward catalogue EMPTY (13 links NOT VALID, ACL `authenticated=r`, 4 policies, RLS on); validate `8645fd67…` exit 0, nine-section diff versus the first validated state EMPTY (13/13 validated, RESTRICT); starred rows of sections I (26 cases), J (7 cases) and H (H-1..H-5 through PostgREST with a genuine User A JWT plus psql corroboration) re-run with identical results; episode fixture E-A1/E-B1 recreated for those rows and retained; legacy fixture 21 with unchanged tuple and content fingerprints; users 3; history 47; no scratch, lock or idle session. Evidence `22*-c1-16-*`.\n- [ ] C1.17 onward NOT STARTED. Project 2 NOT touched. 41B.1A NOT applied to production."
assert t.count(old2) == 1
nl = "\r\n" if "\r\n" in t else "\n"
r.write_text(t.replace(old2, new2.replace("\n", nl)), encoding="utf-8", newline="")
print("evidence built; status updated")
