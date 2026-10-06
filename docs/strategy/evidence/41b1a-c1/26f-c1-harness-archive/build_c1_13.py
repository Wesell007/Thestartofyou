import re, pathlib, shutil, json
C1 = pathlib.Path(r"C:\Users\Administrator\.c1"); W = C1 / "c1_13"
REPO = pathlib.Path(r"C:\Users\Administrator\Desktop\Thestartofyou"); E = REPO / "docs/strategy/evidence/41b1a-c1"
SECS = ["columns", "enums", "functions", "triggers", "rls", "policies", "constraints", "indexes", "grants"]

def rd(p): return pathlib.Path(p).read_text(encoding="utf-8", errors="replace")
def refusal(r):
    t = rd(W / f"{r}.rollback.log")
    m = re.search(r"ERROR:\s+(ROLLBACK REFUSED:[^\n]*)", t)
    st = re.search(r"^START (\S+)", t, re.M); en = re.search(r"^END (\S+) rc=(\d+)", t, re.M)
    after = [l for l in t.split("ERROR:  ROLLBACK REFUSED", 1)[1].splitlines()[1:] if l.strip() and not l.startswith(("CONTEXT", "[c1_psql]", "END "))] if m else ["(no refusal)"]
    return m.group(1).strip() if m else "", st.group(1) if st else "", en.group(1) if en else "", en.group(2) if en else "", len(after)
def guards(label):
    t = rd(W / f"{label}.guards.log"); m = re.search(r"g1_episode_rows[^\n]*\n[-+]+\n\s*([^\n]+)", t, re.S)
    return [x.strip() for x in m.group(1).split("|")] if m else []
def hashes(label): return rd(W / label / "hashes.txt").strip().splitlines()
def diff_empty(pre, post): return rd(W / f"{pre}.vs.{post}.diff.txt").strip() == "EMPTY"

# 19: four rollback-refusal transcripts
out = []
for r, title in (("r1", "R1 — episode rows exist (fixture present)"), ("combined", "Combined-state — all five guards true"), ("r2", "R2 — later-phase FK (safe state + c1_scratch_episode_dep)"), ("r3", "R3 — babies-key dependant (safe state + c1_scratch_baby_dep)")):
    out += [f"######## {title} ########", rd(W / f"{r}.rollback.log").rstrip(), ""]
(E / "19-c1-13-rollback-refusals.log").write_text("\n".join(out), encoding="utf-8", newline="\n")
# 19a: setup / cleanup transcripts (not rollback executions)
out = []
for l in ("combined_setup", "combined_cleanup", "r2_setup", "r2_cleanup", "r3_setup", "r3_cleanup"):
    out += [f"######## {l} ########", rd(W / f"{l}.log").rstrip(), ""]
(E / "19a-c1-13-setup-cleanup-transcripts.log").write_text("\n".join(out), encoding="utf-8", newline="\n")
# 19b: safe-state transition (separate)
(E / "19b-c1-13-safe-state-transition.log").write_text(rd(W / "safe_state.log"), encoding="utf-8", newline="\n")
# 19c: guard states at every checkpoint
labels = ["initial", "r1_pre", "r1_post", "combined_pre", "combined_post", "safe_state", "r2_pre", "r2_post", "r3_pre", "r3_post", "final"]
shutil.copy(C1 / "c1_13_initial_state.log", W / "initial.guards.log")
rows = ["# 41B.1A-C1 — 19c C1.13 guard states at every checkpoint (Project 1)", "", "Columns are the five frozen rollback guards in order (1 episode rows; 2 later-phase FKs on pregnancy_episodes; 3 journeys pointers; 4 bound rows in the 12 looped tables; 5 dependants of babies_id_user_id_key) plus the scratch-object count. Source: `c1_13_state.sql` run as `postgres` read-only; raw logs in `19d-c1-13-catalogues/<checkpoint>.guards.log`.", "", "| Checkpoint | G1 episodes | G2 later-phase FK | G3 pointers | G4 bound rows | G5 babies-key dependants | scratch objects |", "|---|---|---|---|---|---|---|"]
for l in labels:
    g = guards(l); rows.append(f"| {l} | " + " | ".join(g) + " |" if g else f"| {l} | (missing) |")
(E / "19c-c1-13-guard-states.md").write_text("\n".join(rows) + "\n", encoding="utf-8", newline="\n")
# 19d: catalogues (nine sections per snapshot) + guards logs + hashes
D = E / "19d-c1-13-catalogues"; D.mkdir(exist_ok=True)
for l in ["r1_pre", "r1_post", "combined_pre", "combined_post", "r2_pre", "r2_post", "r3_pre", "r3_post", "final"]:
    parts = [f"# C1.13 nine-section catalogue snapshot: {l}", "", "hashes (section count md5-of-sorted-lines):", *hashes(l), ""]
    for s in SECS:
        lines = [x for x in rd(W / l / f"sec_{s}.txt").splitlines() if x.strip()]
        parts += [f"## {s} ({len(lines)})", "```text", *lines, "```", ""]
    (D / f"{l}.md").write_text("\n".join(parts), encoding="utf-8", newline="\n")
for l in labels:
    shutil.copy(W / f"{l}.guards.log", D / f"{l}.guards.log")
# 19e: diffs
out = ["# 41B.1A-C1 — 19e C1.13 per-case POST-versus-PRE catalogue diffs", ""]
pairs = [("r1_pre", "r1_post"), ("combined_pre", "combined_post"), ("r2_pre", "r2_post"), ("r3_pre", "r3_post"), ("r1_pre", "final")]
for a, b in pairs:
    out += [f"## {a} vs {b}", "```text", rd(W / f"{a}.vs.{b}.diff.txt").rstrip(), "```", ""]
(E / "19e-c1-13-catalogue-diffs.md").write_text("\n".join(out), encoding="utf-8", newline="\n")
# 19f: four-run matrix
EXP = {"r1": ("fixture present (E-A1, E-B1)", "1", "ROLLBACK REFUSED: public.pregnancy_episodes holds 2 row(s). This file never destroys history."),
       "combined": ("fixture present + A pointer -> E-A1 + reflections a101 -> E-A1 + c1_scratch_episode_dep FK + c1_scratch_baby_dep FK", "1, 2, 3, 4, 5", "ROLLBACK REFUSED: public.pregnancy_episodes holds 2 row(s). This file never destroys history."),
       "r2": ("safe state + c1_scratch_episode_dep FK -> pregnancy_episodes(id, user_id)", "2", "ROLLBACK REFUSED: 1 foreign key(s) from a later phase reference pregnancy_episodes."),
       "r3": ("safe state + c1_scratch_baby_dep FK -> babies(id, user_id)", "5", "ROLLBACK REFUSED: 1 foreign key(s) depend on babies_id_user_id_key.")}
GUARD = {"r1": "1", "combined": "1 (earliest wins)", "r2": "2", "r3": "5"}
m = ["# 41B.1A-C1 — 19f C1.13 four-run rollback-refusal matrix (Project 1)", "", "Every run: frozen rollback file (SHA-256 `0d00895514b4e2dc623383436952fd534d5f879cdf4011024596dae303a36077`, wrapper hash gate) through `c1_psql.sh` (psql 17.11, direct endpoint, `postgres` table owner, `-1`, `ON_ERROR_STOP=1`); a per-case PRE nine-section snapshot immediately before, a POST snapshot from a fresh session immediately after, and the diff POST-vs-PRE required EMPTY. Exactly four rollback executions; the safe-state transition between the combined run and R2 is recorded separately in `19b-c1-13-safe-state-transition.log`.", "", "| Run | Unsafe setup | Guards true | Expected guard | Actual message | Exit | Statements after refusal | POST-vs-PRE diff | PASS |", "|---|---|---|---|---|---|---|---|---|"]
allok = True; results = {}
for r, pre, post in (("r1", "r1_pre", "r1_post"), ("combined", "combined_pre", "combined_post"), ("r2", "r2_pre", "r2_post"), ("r3", "r3_pre", "r3_post")):
    msg, st, en, rc, after = refusal(r); setup, gt, exp = EXP[r]; empty = diff_empty(pre, post)
    ok = msg == exp and rc == "3" and after == 0 and empty and hashes(pre) == hashes(post)
    allok &= ok; results[r] = {"message": msg, "exit": rc, "start": st, "end": en, "diff_empty": empty, "ok": ok}
    m.append(f"| {r.upper() if r != 'combined' else 'Combined-state'} | {setup} | {gt} | {GUARD[r]} | `{msg}` | {rc} | {after} | {'EMPTY' if empty else '**DIFFERENCES**'} | {'PASS' if ok else '**FAIL**'} |")
m += ["", f"All four PASS: {'YES' if allok else 'NO'}. Fifth refusal: none. Final catalogue (`final`) versus the R1 pre-run snapshot: {'EMPTY' if diff_empty('r1_pre', 'final') else 'DIFFERENCES'} (every 41B.1A foundation object intact after all four refusals, both scratch tables gone).", ""]
(E / "19f-c1-13-rollback-matrix.md").write_text("\n".join(m), encoding="utf-8", newline="\n")
# 19h: harness
H = E / "19h-c1-13-harness"; H.mkdir(exist_ok=True)
for f in ("c1_13_driver.sh", "c1_13_capture_template.sql", "c1_13_state.sql", "c1_13_combined_setup.sql", "c1_13_combined_cleanup.sql", "c1_13_safe_state.sql", "c1_13_r2_setup.sql", "c1_13_r2_cleanup.sql", "c1_13_r3_setup.sql", "c1_13_r3_cleanup.sql"):
    shutil.copy(C1 / f, H / f)
shutil.copy(C1 / "c1_13_initial_state.log", E / "19i-c1-13-initial-state.log")
json.dump(results, open(W / "results.json", "w"), indent=1)
print("allok", allok); print(json.dumps(results, indent=1))
