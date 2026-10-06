# Parses the C1.9 transcript into a per-case table (markdown + JSON). OK = must succeed (no error); UV = must be a
# unique violation (23505) on pregnancy_episodes_one_open_per_user_idx followed by ROLLBACK TO SAVEPOINT.
import re, sys, json, pathlib
log = pathlib.Path(sys.argv[1]).read_text(encoding="utf-8").splitlines()
IDX = "pregnancy_episodes_one_open_per_user_idx"
cases = []
i = 0
while i < len(log):
    m = re.match(r"^### CASE (\S+?)\|(.+?)\|(OK|UV)$", log[i])
    if not m:
        i += 1; continue
    tag, desc, expect = m.groups()
    j = i + 1; block = []
    while j < len(log) and not log[j].startswith("### CASE") and not log[j].startswith("=== "):
        block.append(log[j]); j += 1
    text = "\n".join(block)
    errs = re.findall(r"ERROR:\s+(\w+): (.*)", text)
    uq = re.search(r'violates unique constraint "([a-z_]+)"', text)
    detail = re.search(r"DETAIL:\s+(.*)", text)
    acks = re.findall(r"^(INSERT 0 1|UPDATE 1)$", text, re.M)
    rolled = "ROLLBACK" in text
    # read-back rows: non-header table lines
    rows = [l.strip() for l in block if l.startswith(" ") and "|" in l and not set(l.strip()) <= set("-+|")]
    if expect == "OK":
        ok = not errs
        # boolean read-backs must not contain 'f' in a boolean-only row
        for l in rows:
            cells = [c.strip() for c in l.split("|")]
            if cells and all(c in ("t", "f") for c in cells) and "f" in cells:
                ok = False
        verdict = "as expected" if ok else "UNEXPECTED"
    else:
        ok = len(errs) == 1 and errs[0][0] == "23505" and uq is not None and uq.group(1) == IDX and rolled and not acks
        verdict = "rejected by " + IDX if ok else "UNEXPECTED"
    cases.append({"case": tag, "description": desc, "expect": expect, "verdict": verdict, "ok": ok,
                  "sqlstate": errs[0][0] if errs else "", "index": uq.group(1) if uq else "", "detail": detail.group(1) if detail else "",
                  "acks": acks, "readback": rows[-3:], "errors": [e[1][:160] for e in errs]})
    i = j
summary = {"cases": len(cases), "ok": sum(c["ok"] for c in cases), "unexpected": [c["case"] for c in cases if not c["ok"]],
           "uv_required": sum(1 for c in cases if c["expect"] == "UV"), "uv_ok": sum(1 for c in cases if c["expect"] == "UV" and c["ok"]),
           "ok_required": sum(1 for c in cases if c["expect"] == "OK"), "ok_ok": sum(1 for c in cases if c["expect"] == "OK" and c["ok"])}
pathlib.Path(sys.argv[2]).write_text(json.dumps({"summary": summary, "cases": cases}, indent=1), encoding="utf-8", newline="\n")
print(json.dumps(summary, indent=1))
for c in cases:
    print(f"{c['case']:<12} {c['expect']} {'OK ' if c['ok'] else 'FAIL'} {c['sqlstate']:<6} {c['index']:<42} {c['description'][:80]}")
