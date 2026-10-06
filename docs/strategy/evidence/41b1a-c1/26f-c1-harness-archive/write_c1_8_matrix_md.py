# Writes the 13-row ownership result matrix (markdown) from c1_8_matrix.json.
import json, sys, pathlib
d = json.load(open(sys.argv[1], encoding="utf-8"))
ORDER = ["journeys","reflections","week_photos","week_media_memories","pregnancy_appointments","pregnancy_symptom_notes","baby_movement_notes","birth_plans","hospital_bag_items","midwife_questions","contraction_sessions","contraction_events","babies"]
A, B, C = "A", "B", "C"
owner = {t: "A (legacy a1xx rows; new rows inserted for A)" for t in ORDER}
owner["birth_plans"] = "A legacy a107 for updates; B for inserts (UNIQUE user_id)"
owner["babies"] = "A for inserts (no legacy A baby); B legacy b001/b002 for updates"
owner["journeys"] = "A, B and C pointer rows (one per user)"
same_ep = {t: "E-A1" for t in ORDER}; same_ep["birth_plans"] = "E-A1 (updates) / E-B1 (B inserts)"; same_ep["babies"] = "E-A1 (A inserts) / E-B1 (B b001 update)"; same_ep["journeys"] = "E-A1 (A), E-B1 (B)"
cross_ep = {t: "E-B1" for t in ORDER}; cross_ep["birth_plans"] = "E-B1 (A update) / E-A1 (B inserts)"; cross_ep["babies"] = "E-B1 (A inserts) / E-A1 (B b002 update)"; cross_ep["journeys"] = "E-B1 (A), E-A1 (B and C)"
m = {x["table"]: x for x in d["matrix"]}
cases = d["cases"]
out = ["# 41B.1A-C1 — 14b C1.8 ownership result matrix (Project 1, after validation)", "",
       "Source: `14-c1-8-ownership-matrix.log` (transcript of `14a-c1-8-ownership-matrix.sql`), parsed mechanically by the case markers; machine form `14c-c1-8-matrix.json`. Every case is listed below the matrix, so no relationship or case can be omitted silently. Same-owner acceptance is proven by the read-back `select` after each accepted statement (the stored link equals the intended episode); cross-owner rejection is proven by the server error (SQLSTATE and constraint name) followed by `ROLLBACK TO SAVEPOINT` and a read-back or residue count showing the row did not acquire the foreign episode.", "",
       "## 13-row matrix", "",
       "| # | Relationship | Row owner / rows used | Same-owner episode | Same-owner result | Cross-owner episode | Cross-owner result | SQLSTATE | Constraint |", "|---|---|---|---|---|---|---|---|---|"]
for i, t in enumerate(ORDER, 1):
    x = m[t]
    same = f"accepted {x['same_user_accepted']}/{x['same_user_required']}"
    cross = f"rejected {x['cross_user_rejected']}/{x['cross_user_required']}"
    out.append(f"| {i} | `{t}` | {owner[t]} | {same_ep[t]} | {same} | {cross_ep[t]} | {cross} | {','.join(x['sqlstates'])} | `{'`, `'.join(x['constraints'])}` |")
s = d["summary"]
out += ["", f"Totals: relationships {s['tables']}/13; cases {s['cases']}; same-owner cases accepted {s['same_ok']}/{s['same_required']}; cross-owner cases rejected {s['cross_ok']}/{s['cross_required']}; unexpected {len(s['unexpected'])}.", "",
        "## Every case", "", "| Relationship | Case (plan section I) | Expected | Outcome | SQLSTATE | Constraint | Server detail |", "|---|---|---|---|---|---|---|"]
for c in cases:
    out.append(f"| `{c['table']}` | {c['case']} | {'accepted' if c['expect']=='OK' else 'FK violation'} | {c['verdict']}{'' if c['ok'] else ' **UNEXPECTED**'} | {c['sqlstate']} | {('`'+c['constraint']+'`') if c['constraint'] else ''} | {c['detail'].replace('|','\\|')} |")
out.append("")
pathlib.Path(sys.argv[2]).write_text("\n".join(out), encoding="utf-8", newline="\n")
print("written", sys.argv[2], "rows", len(ORDER), "cases", len(cases))
