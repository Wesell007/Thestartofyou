# Compare a G3 nine-section capture directory against a C1 catalogue markdown reference.
# Usage: g3_compare.py <capture dir> <reference .md> <functions mode: prosrc|def> <out .md> <title>
# The G3 marker table is renamed to the C1 marker name before comparison (identical definition),
# and that is the only normalisation applied.
import re, sys, json, pathlib, hashlib
cap, ref_md, fmode, out, title = pathlib.Path(sys.argv[1]), pathlib.Path(sys.argv[2]), sys.argv[3], pathlib.Path(sys.argv[4]), sys.argv[5]
SECS = ["columns", "enums", "functions", "triggers", "rls", "policies", "constraints", "indexes", "grants"]
def parse_md(p):
    res, cur = {}, None
    for l in p.read_text(encoding="utf-8").splitlines():
        m = re.match(r"^## (\w+) \((\d+)\)$", l)
        if m:
            cur = m.group(1); res[cur] = []; continue
        if l.startswith("```"):
            continue
        if cur in SECS and l.strip():
            res[cur].append(l.rstrip())
    return res
def lines(p):
    return [l.rstrip() .replace("g3_rehearsal_marker", "c1_rehearsal_marker") for l in p.read_text(encoding="utf-8").splitlines() if l.strip()]
h = lambda L: f"{len(L)}|{hashlib.md5(chr(10).join(sorted(L)).encode()).hexdigest()}"
ref = parse_md(ref_md)
rep = {"reference": ref_md.name, "functions_mode": fmode, "normalisation": "g3_rehearsal_marker -> c1_rehearsal_marker", "sections": {}, "all_empty": True}
md = [f"# {title}", "", f"Reference: `{ref_md.name}` (C1). Functions compared by `{'md5(prosrc)' if fmode == 'prosrc' else 'md5(pg_get_functiondef)'}`. Only normalisation: the G3 marker table name is mapped to the C1 marker name (identical definition).", "",
      "| Section | Reference | G3 | Removed | Added | Result |", "|---|---|---|---|---|---|"]
for s in SECS:
    b = ref.get(s, [])
    p = lines(cap / ("sec_functions_prosrc.txt" if (s == "functions" and fmode == "prosrc") else "sec_functions_def.txt" if s == "functions" else f"sec_{s}.txt"))
    rem, add = sorted(set(b) - set(p)), sorted(set(p) - set(b))
    ok = not rem and not add
    rep["sections"][s] = {"reference": len(b), "captured": len(p), "removed": rem, "added": add, "empty": ok, "reference_hash": h(b), "captured_hash": h(p)}
    rep["all_empty"] &= ok
    md.append(f"| {s} | {len(b)} | {len(p)} | {len(rem)} | {len(add)} | {'EMPTY' if ok else '**DIFFERENCES**'} |")
md += ["", f"Overall: **{'EMPTY' if rep['all_empty'] else 'NON-EMPTY'}**", ""]
for s, v in rep["sections"].items():
    for k in ("removed", "added"):
        for l in v[k]:
            md.append(f"- {s} {k}: `{l}`")
out.write_text("\n".join(md) + "\n", encoding="utf-8", newline="\n")
out.with_suffix(".json").write_text(json.dumps(rep, indent=1) + "\n", encoding="utf-8", newline="\n")
print("ALL_EMPTY" if rep["all_empty"] else "DIFFERENCES")
for s, v in rep["sections"].items():
    print(f"{s}: ref {v['reference']} g3 {v['captured']} removed {len(v['removed'])} added {len(v['added'])}")
