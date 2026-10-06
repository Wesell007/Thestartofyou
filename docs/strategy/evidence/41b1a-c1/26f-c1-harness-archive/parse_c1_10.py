# Parses the C1.10 transcript. Marker: ### CASE id|rule|desc|values|EXPECT|plan|equivalent
# EXPECT: OK (accepted + read back), CK:<constraint> (23514 naming it), NN:<column> (23502 naming the column).
import re, sys, json, pathlib
log = pathlib.Path(sys.argv[1]).read_text(encoding="utf-8").splitlines()
cases = []; i = 0
while i < len(log):
    m = re.match(r"^### CASE (\S+)\|([^|]+)\|([^|]+)\|([^|]+)\|(OK|CK:[a-z_]+|NN:[a-z_]+)\|(plan|equivalent)$", log[i])
    if not m:
        i += 1; continue
    cid, rule, desc, vals, expect, origin = m.groups()
    j = i + 1; block = []
    while j < len(log) and not log[j].startswith("### CASE") and not log[j].startswith("=== "):
        block.append(log[j]); j += 1
    text = "\n".join(block)
    errs = re.findall(r"ERROR:\s+(\w+): (.*)", text)
    ck = re.search(r'violates check constraint "([a-z_]+)"', text)
    nn = re.search(r'null value in column "([a-z_]+)"', text)
    detail = re.search(r"DETAIL:\s+(.*)", text)
    acks = re.findall(r"^INSERT 0 1$", text, re.M)
    rolled = "ROLLBACK" in text
    res = re.search(r"residue\s*\n-+\s*\n\s*(\d+)", text)
    residue = int(res.group(1)) if res else None
    readback = [l.strip() for l in block if l.startswith(" ") and "|" in l and not set(l.strip()) <= set("-+|")]
    if expect == "OK":
        ok = (not errs) and len(acks) == 1 and bool(readback) and residue == 0
        actual_c = ""
    elif expect.startswith("CK:"):
        ok = len(errs) == 1 and errs[0][0] == "23514" and ck is not None and ck.group(1) == expect[3:] and rolled and not acks and residue == 0
        actual_c = ck.group(1) if ck else ""
    else:
        ok = len(errs) == 1 and errs[0][0] == "23502" and nn is not None and nn.group(1) == expect[3:] and rolled and not acks and residue == 0
        actual_c = ("NOT NULL " + nn.group(1)) if nn else ""
    cases.append({"id": cid, "rule": rule, "description": desc, "values": vals, "origin": origin, "expect": expect,
                  "actual": ("accepted" if not errs else "rejected"), "ok": ok, "sqlstate": errs[0][0] if errs else "", "constraint": actual_c,
                  "detail": detail.group(1) if detail else "", "residue": residue, "readback": readback[-1:] if readback else []})
    i = j
by_rule = {}
for c in cases:
    r = by_rule.setdefault(c["rule"], {"cases": 0, "ok": 0, "accepted_req": 0, "accepted_ok": 0, "rejected_req": 0, "rejected_ok": 0, "plan": 0, "equivalent": 0})
    r["cases"] += 1; r["ok"] += c["ok"]; r[c["origin"]] += 1
    if c["expect"] == "OK": r["accepted_req"] += 1; r["accepted_ok"] += c["ok"]
    else: r["rejected_req"] += 1; r["rejected_ok"] += c["ok"]
summary = {"cases": len(cases), "ok": sum(c["ok"] for c in cases), "unexpected": [c["id"] for c in cases if not c["ok"]],
           "plan_cases": sum(1 for c in cases if c["origin"] == "plan"), "plan_ok": sum(1 for c in cases if c["origin"] == "plan" and c["ok"]), "by_rule": by_rule}
pathlib.Path(sys.argv[2]).write_text(json.dumps({"summary": summary, "cases": cases}, indent=1), encoding="utf-8", newline="\n")
print(json.dumps(summary, indent=1))
for c in cases:
    print(f"{c['id']} {c['rule']:<16} {('OK ' if c['ok'] else 'FAIL')} exp={c['expect']:<46} got={c['actual']} {c['sqlstate']} {c['constraint']} residue={c['residue']} [{c['origin']}]")
