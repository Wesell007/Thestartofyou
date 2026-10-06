# Compare a captured nine-section directory (sec_*.txt + sec_functions_prosrc.txt) against a catalogue markdown
# evidence file whose functions section uses md5(prosrc) (02-baseline-catalogue.md or 11-c1-5-post-forward-catalogue.md).
# Functions are also compared by md5(pg_get_functiondef) against 02c (functions never changed in C1).
import re, sys, json, pathlib, hashlib
E = pathlib.Path(r"C:\Users\Administrator\Desktop\Thestartofyou\docs\strategy\evidence\41b1a-c1")
POST, OUT, BASE_MD, TITLE = pathlib.Path(sys.argv[1]), pathlib.Path(sys.argv[2]), E / sys.argv[3], sys.argv[4]
SECS = ["columns", "enums", "functions", "triggers", "rls", "policies", "constraints", "indexes", "grants"]
def parse_md(p):
    out, cur = {}, None
    for l in p.read_text(encoding="utf-8").splitlines():
        m = re.match(r"^## (\w+) \((\d+)\)$", l)
        if m: cur = m.group(1); out[cur] = []; continue
        if l.startswith("```"): continue
        if cur and l.strip(): out[cur].append(l.rstrip("\r\n"))
    return out
def lines(p): return [l.rstrip("\r\n") for l in p.read_text(encoding="utf-8").splitlines() if l.strip()]
tf = lambda L: [re.sub(r"\|true\|", "|t|", re.sub(r"\|false\|", "|f|", l)) for l in L]
h = lambda L: f"{len(L)}|{hashlib.md5(chr(10).join(sorted(L)).encode()).hexdigest()}"
base = parse_md(BASE_MD); base_fdef = [l for l in lines(E / "02c-functions-functiondef-md5.txt") if not l.startswith("#")]
post = {s: lines(POST / f"sec_{s}.txt") for s in SECS}; post_prosrc = lines(POST / "sec_functions_prosrc.txt")
rep = {"reference": sys.argv[3], "sections": {}, "all_empty": True}
md = [f"# {TITLE}", "", f"Reference: `{sys.argv[3]}`. Set difference per section on identical line formats; functions compared by `md5(prosrc)` against the reference file and by `md5(pg_get_functiondef)` (t/f) against `02c-functions-functiondef-md5.txt`.", "",
      "| Section | Reference lines | Captured lines | Removed | Added | Result |", "|---|---|---|---|---|---|"]
for s in SECS:
    if s == "functions":
        b, p, b2, p2 = base["functions"], post_prosrc, tf(base_fdef), tf(post["functions"])
        rem, add, rem2, add2 = sorted(set(b)-set(p)), sorted(set(p)-set(b)), sorted(set(b2)-set(p2)), sorted(set(p2)-set(b2))
        ok = not (rem or add or rem2 or add2)
        rep["sections"][s] = {"reference": len(b), "captured": len(p), "removed": rem, "added": add, "functiondef_removed": rem2, "functiondef_added": add2, "empty": ok, "reference_hash_prosrc": h(tf(b)), "captured_hash_prosrc": h(tf(p)), "reference_hash_functiondef": h(b2), "captured_hash_functiondef": h(p2)}
        md.append(f"| functions (prosrc / functiondef) | {len(b)} | {len(p)} | {len(rem)} / {len(rem2)} | {len(add)} / {len(add2)} | {'EMPTY' if ok else '**DIFFERENCES**'} |")
    else:
        b, p = base[s], post[s]; rem, add = sorted(set(b)-set(p)), sorted(set(p)-set(b)); ok = not (rem or add)
        rep["sections"][s] = {"reference": len(b), "captured": len(p), "removed": rem, "added": add, "empty": ok, "reference_hash": h(b), "captured_hash": h(p)}
        md.append(f"| {s} | {len(b)} | {len(p)} | {len(rem)} | {len(add)} | {'EMPTY' if ok else '**DIFFERENCES**'} |")
    rep["all_empty"] &= ok
md += ["", f"Overall diff: **{'EMPTY' if rep['all_empty'] else 'NON-EMPTY'}**.", ""]
for s, v in rep["sections"].items():
    for key in ("removed", "added", "functiondef_removed", "functiondef_added"):
        for l in v.get(key, []): md.append(f"- {s} {key}: `{l}`")
md += ["", "| Section | Reference hash | Captured hash |", "|---|---|---|"]
for s, v in rep["sections"].items():
    if s == "functions":
        md.append(f"| functions (prosrc) | `{v['reference_hash_prosrc']}` | `{v['captured_hash_prosrc']}` |"); md.append(f"| functions (functiondef) | `{v['reference_hash_functiondef']}` | `{v['captured_hash_functiondef']}` |")
    else: md.append(f"| {s} | `{v['reference_hash']}` | `{v['captured_hash']}` |")
md.append("")
OUT.with_suffix(".md").write_text("\n".join(md), encoding="utf-8", newline="\n"); OUT.with_suffix(".json").write_text(json.dumps(rep, indent=1), encoding="utf-8", newline="\n")
print("ALL_EMPTY" if rep["all_empty"] else "DIFFERENCES")
for s, v in rep["sections"].items(): print(s, v["reference"], v["captured"], "removed", len(v["removed"]), "added", len(v["added"]))
