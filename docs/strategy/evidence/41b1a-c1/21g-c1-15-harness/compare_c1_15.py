# C1.15 — compare the post-rollback nine-section catalogue with the authoritative C1.1 baseline
# (docs/strategy/evidence/41b1a-c1/02-baseline-catalogue.md, functions also 02c). Exclusions: none needed in the
# public-schema capture (marker present in both; OIDs never captured; migration bookkeeping outside the capture).
import re, sys, json, pathlib, hashlib
E = pathlib.Path(r"C:\Users\Administrator\Desktop\Thestartofyou\docs\strategy\evidence\41b1a-c1")
POST = pathlib.Path(sys.argv[1])          # directory with sec_*.txt (+ sec_functions_prosrc.txt)
OUT = pathlib.Path(sys.argv[2])
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

base = parse_md(E / "02-baseline-catalogue.md")
base_fdef = [l for l in lines(E / "02c-functions-functiondef-md5.txt") if not l.startswith("#")]
post = {s: lines(POST / f"sec_{s}.txt") for s in SECS}
post_prosrc = lines(POST / "sec_functions_prosrc.txt")

report = {"sections": {}, "all_empty": True}
md = ["# C1.15 post-rollback catalogue versus the C1.1 baseline (`02-baseline-catalogue.md`)", "",
      "Set difference per section on identical line formats. Functions are compared twice: `md5(prosrc)` lines against the baseline file's functions section, and `md5(pg_get_functiondef)` lines (security normalised to t/f) against `02c-functions-functiondef-md5.txt`. Approved exclusions per plan C1.15: `supabase_migrations` bookkeeping (outside the capture), object OIDs (never captured), `c1_rehearsal_marker` (present in both captures, so not a difference). No exclusion was needed to make any section empty.", "",
      "| Section | Baseline lines | Post-rollback lines | Removed (in baseline, missing now) | Added (present now, not in baseline) | Result |", "|---|---|---|---|---|---|"]
for s in SECS:
    if s == "functions":
        b, p = base["functions"], post_prosrc
        b2, p2 = tf(base_fdef), tf(post["functions"])
        rem, add = sorted(set(b) - set(p)), sorted(set(p) - set(b))
        rem2, add2 = sorted(set(b2) - set(p2)), sorted(set(p2) - set(b2))
        ok = not (rem or add or rem2 or add2)
        report["sections"][s] = {"baseline": len(b), "post": len(p), "removed": rem, "added": add, "functiondef_removed": rem2, "functiondef_added": add2, "empty": ok,
                                 "baseline_hash_prosrc": h(tf(b)), "post_hash_prosrc": h(tf(p)), "baseline_hash_functiondef": h(b2), "post_hash_functiondef": h(p2)}
        md.append(f"| functions (prosrc + functiondef) | {len(b)} | {len(p)} | {len(rem)} / {len(rem2)} | {len(add)} / {len(add2)} | {'EMPTY' if ok else '**DIFFERENCES**'} |")
    else:
        b, p = base[s], post[s]
        rem, add = sorted(set(b) - set(p)), sorted(set(p) - set(b))
        ok = not (rem or add)
        report["sections"][s] = {"baseline": len(b), "post": len(p), "removed": rem, "added": add, "empty": ok, "baseline_hash": h(b), "post_hash": h(p)}
        md.append(f"| {s} | {len(b)} | {len(p)} | {len(rem)} | {len(add)} | {'EMPTY' if ok else '**DIFFERENCES**'} |")
    report["all_empty"] &= ok
md += ["", f"Overall diff versus the C1.1 baseline: **{'EMPTY' if report['all_empty'] else 'NON-EMPTY'}**.", ""]
for s, v in report["sections"].items():
    for key in ("removed", "added", "functiondef_removed", "functiondef_added"):
        for l in v.get(key, []):
            md.append(f"- {s} {key}: `{l}`")
if report["all_empty"]:
    md += ["No line differs in any section: every 41B.1A object is gone and every pre-existing object (table, column, enum, function body, trigger, RLS flag, policy, constraint, index, grant) is present with an identical definition. Nothing was removed by dependency behaviour.", ""]
md += ["## Section hashes (count|md5 of sorted lines; security as t/f)", "", "| Section | C1.1 baseline | C1.15 post-rollback |", "|---|---|---|"]
for s, v in report["sections"].items():
    if s == "functions":
        md.append(f"| functions (prosrc) | `{v['baseline_hash_prosrc']}` | `{v['post_hash_prosrc']}` |")
        md.append(f"| functions (functiondef) | `{v['baseline_hash_functiondef']}` | `{v['post_hash_functiondef']}` |")
    else:
        md.append(f"| {s} | `{v['baseline_hash']}` | `{v['post_hash']}` |")
md.append("")
OUT.with_suffix(".md").write_text("\n".join(md), encoding="utf-8", newline="\n")
OUT.with_suffix(".json").write_text(json.dumps(report, indent=1), encoding="utf-8", newline="\n")
print("ALL_EMPTY" if report["all_empty"] else "DIFFERENCES")
for s, v in report["sections"].items():
    print(s, v["baseline"], v["post"], "removed", len(v["removed"]), "added", len(v["added"]), ("fdef " + str(len(v.get("functiondef_removed", []))) + "/" + str(len(v.get("functiondef_added", [])))) if s == "functions" else "")
