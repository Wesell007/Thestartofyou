# Parses the C1.8 transcript into a per-case result table and a 13-row relationship matrix.
import re, sys, json, pathlib
log = pathlib.Path(sys.argv[1]).read_text(encoding="utf-8").splitlines()
cases = []
i = 0
while i < len(log):
    m = re.match(r"^### CASE (\S+?)\|(.+?)\|(OK|FK)$", log[i])
    if not m:
        i += 1; continue
    table, tag, expect = m.groups()
    j = i + 1
    block = []
    while j < len(log) and not log[j].startswith("### CASE") and not log[j].startswith("=== "):
        block.append(log[j]); j += 1
    text = "\n".join(block)
    errs = re.findall(r"ERROR:\s+(\w+): (.*)", text)
    fk = re.search(r'violates foreign key constraint "([a-z_]+)"', text)
    detail = re.search(r"DETAIL:\s+(.*)", text)
    acks = re.findall(r"^(INSERT 0 1|UPDATE 1|UPDATE 2|UPDATE \d+|DELETE 1)$", text, re.M)
    rolled = "ROLLBACK" in text
    if expect == "OK":
        ok = (not errs) and bool(acks)
        verdict = "accepted" if ok else "UNEXPECTED"
    else:
        ok = len(errs) == 1 and errs[0][0] == "23503" and fk is not None and fk.group(1) == ("journeys_current_pregnancy_episode_owner_fkey" if table == "journeys" else f"{table}_pregnancy_episode_owner_fkey") and rolled and not acks
        verdict = "rejected" if ok else "UNEXPECTED"
    # residue / read-back value: last table row of a select in the block
    cases.append({"table": table, "case": tag, "expect": expect, "verdict": verdict, "ok": ok,
                  "sqlstate": errs[0][0] if errs else "", "constraint": fk.group(1) if fk else "",
                  "detail": detail.group(1) if detail else "", "acks": acks, "errors": [e[1][:160] for e in errs]})
    i = j
tables = []
for c in cases:
    if c["table"] not in tables: tables.append(c["table"])
matrix = []
for t in tables:
    tc = [c for c in cases if c["table"] == t]
    same = [c for c in tc if c["expect"] == "OK"]
    cross = [c for c in tc if c["expect"] == "FK"]
    matrix.append({"table": t, "cases": len(tc), "same_user_required": len(same), "same_user_accepted": sum(c["ok"] for c in same),
                   "cross_user_required": len(cross), "cross_user_rejected": sum(c["ok"] for c in cross),
                   "sqlstates": sorted({c["sqlstate"] for c in cross}), "constraints": sorted({c["constraint"] for c in cross}),
                   "all_ok": all(c["ok"] for c in tc)})
summary = {"cases": len(cases), "ok": sum(c["ok"] for c in cases), "unexpected": [c for c in cases if not c["ok"]],
           "tables": len(tables), "same_required": sum(1 for c in cases if c["expect"] == "OK"), "same_ok": sum(1 for c in cases if c["expect"] == "OK" and c["ok"]),
           "cross_required": sum(1 for c in cases if c["expect"] == "FK"), "cross_ok": sum(1 for c in cases if c["expect"] == "FK" and c["ok"])}
pathlib.Path(sys.argv[2]).write_text(json.dumps({"summary": summary, "matrix": matrix, "cases": cases}, indent=1), encoding="utf-8", newline="\n")
print(json.dumps(summary, indent=1))
for m in matrix:
    print(f"{m['table']:<24} cases={m['cases']:>2} same {m['same_user_accepted']}/{m['same_user_required']} cross {m['cross_user_rejected']}/{m['cross_user_required']} {m['sqlstates']} {m['constraints']} {'OK' if m['all_ok'] else 'FAIL'}")
