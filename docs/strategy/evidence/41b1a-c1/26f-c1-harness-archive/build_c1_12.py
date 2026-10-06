import json, re, pathlib, shutil
C1 = pathlib.Path(r"C:\Users\Administrator\.c1")
REPO = pathlib.Path(r"C:\Users\Administrator\Desktop\Thestartofyou")
E = REPO / "docs/strategy/evidence/41b1a-c1"
A = "b09cd318-8f3e-4853-8d97-fc10267b3d69"
pr = json.load(open(C1 / "c1_12_postgrest.json", encoding="utf-8"))
log = (C1 / "c1_12_grant_rls_corroboration.log").read_text(encoding="utf-8")
pre = (C1 / "c1_12_prestate.log").read_text(encoding="utf-8")

def block(tag):
    m = re.search(r"### CASE " + re.escape(tag) + r"\|.*?\n(.*?)(?=\n### CASE|\n=== )", log, re.S)
    return m.group(1) if m else ""
ctx = block("CTX")
assert "authenticated | postgres" in ctx and A in ctx and "| on" in ctx, "psql context not as required"
priv = block("PRIV"); assert re.search(r"\n\s*t\s*\|\s*f\s*\|\s*f\s*\|\s*f\s*$", priv, re.M), "authenticated privileges not SELECT-only"
def err(tag):
    m = re.search(r"ERROR:\s+(\w+): (.*)", block(tag)); return (m.group(1), m.group(2).strip()) if m else ("", "")
ps = {op: err(op) for op in ("INSERT", "UPDATE", "DELETE")}
sel = lambda c: next(x for x in pr["cases"] if x["case"] == c)
def pgr(c):
    x = sel(c); b = x["body"]
    return (x["http_status"], b.get("code") if isinstance(b, dict) else "", b.get("message") if isinstance(b, dict) else "")
acl = re.search(r"\{postgres=[^}]+\}", pre).group(0)
rows = []
allok = True
for op in ("INSERT", "UPDATE", "DELETE"):
    st, code, msg = pgr(op); sql, m2 = ps[op]
    ok = sel(op)["pass"] and code == "42501" and sql == "42501" and msg == "permission denied for table pregnancy_episodes" and m2 == "permission denied for table pregnancy_episodes"
    allok &= ok
    rows.append(f"| {op} | NO (`has_table_privilege` = f; ACL `authenticated=r`) | YES (`pregnancy_episodes_{op.lower()}_own`) | HTTP {st}, code {code}, `{msg}` | SQLSTATE {sql}, `{m2}` | table privilege denied (not RLS, not CHECK, not FK, not unique) | {'PASS' if ok else '**FAIL**'} |")
sel_ok = sel("SEL-pre")["pass"] and sel("SEL-post")["pass"] and sel("SEL-B")["pass"] and sel("RESIDUE")["pass"]
out = ["# 41B.1A-C1 — 18b C1.12 grant-versus-RLS matrix (Project 1)", "",
 f"Authoritative channel: PostgREST with a genuine JWT for synthetic user A (Supabase Auth password grant, HTTP {pr['auth']['http_status']}, user `{pr['auth']['user_id']}`, role `{pr['auth']['role']}`, token length {pr['auth']['access_token_length']}, not stored, not fabricated); machine record `18a-c1-12-postgrest.json`. Corroborating channel: `18-c1-12-grant-rls-corroboration.log` (psql as `postgres`, `set local role authenticated`, both `request.jwt.claim.sub` and `request.jwt.claims` = A, `auth.uid()` = A, `row_security = on`, rollback-only). ACL and policies from `18d-c1-12-prestate.log`.", "",
 f"Raw ACL (`pg_class.relacl`): `{acl}`. `role_table_grants` for `authenticated`: SELECT only. `has_table_privilege('authenticated', …)`: SELECT t, INSERT f, UPDATE f, DELETE f (as owner query and again as the switched `authenticated` role). `anon`: f/f/f/f; PUBLIC: no SELECT. `service_role`: all. Policies: exactly `pregnancy_episodes_select_own` (SELECT, USING `auth.uid() = user_id`), `pregnancy_episodes_insert_own` (INSERT, WITH CHECK `auth.uid() = user_id`), `pregnancy_episodes_update_own` (UPDATE, USING and WITH CHECK `auth.uid() = user_id`), `pregnancy_episodes_delete_own` (DELETE, USING `auth.uid() = user_id`), all PERMISSIVE for `authenticated`.", "",
 "| Operation | ACL says role has privilege | Policy exists | PostgREST (genuine A JWT) | psql (authenticated, dual GUC) | Expected reason | PASS |", "|---|---|---|---|---|---|---|", *rows, "",
 f"Channels agree on all three operations: {'YES' if allok else 'NO'}. SELECT sanity (`SEL-pre`, `SEL-post`, `SEL-B`, `RESIDUE`): {'PASS' if sel_ok else 'FAIL'} — A reads exactly E-A1 before and after the denied writes with an identical row, the B filter returns `[]`, and the attempted insert id is absent; psql shows the same (E-A1 only, `b_rows_visible = 0`, `residue = 0`, owner view 2 rows with E-A1 `expected_count = 1`).", "",
 "Interpretation (plan C1.12): policy presence never confers a privilege. At 41B.1A `authenticated` holds SELECT only; the INSERT, UPDATE and DELETE owner policies are inert because the corresponding table privileges are absent; they are the row rules prepared for the later controlled write path (41B.1C may grant INSERT/UPDATE under the transition trigger; DELETE is never granted directly). Nothing was granted or changed in C1.12.", ""]
(E / "18b-c1-12-grant-rls-matrix.md").write_text("\n".join(out), encoding="utf-8", newline="\n")
print("matrix ok:", allok and sel_ok)
for op in ("INSERT", "UPDATE", "DELETE"): print(op, pgr(op), ps[op])
shutil.copy(C1 / "c1_12_grant_rls_corroboration.log", E / "18-c1-12-grant-rls-corroboration.log")
shutil.copy(C1 / "c1_12_postgrest.json", E / "18a-c1-12-postgrest.json")
shutil.copy(C1 / "C1_12_grant_rls_corroboration.sql", E / "18c-c1-12-grant-rls-corroboration.sql")
shutil.copy(C1 / "c1_12_prestate.log", E / "18d-c1-12-prestate.log")
shutil.copy(C1 / "c1_12_postgrest.py", E / "18e-c1-12-postgrest-harness.py")
p = E / "00-identity.md"; s = p.read_text(encoding="utf-8")
old = "structure identical to C1.10). C1.12 NOT STARTED."
new = "structure identical to C1.10). C1.12 PASS (2026-10-05T21:48Z; see `18f-c1-12-summary.md`): grant-vs-RLS interaction proven: authenticated retains SELECT-only table privilege; INSERT/UPDATE/DELETE owner policies do not confer missing privileges, and all three direct writes are denied with PostgreSQL 42501 on PostgREST and psql (ACL `authenticated=r`, `has_table_privilege` t/f/f/f, four policies intact, SELECT-under-RLS still returns only E-A1, zero residue, no grant or policy change, structure identical to C1.11). C1.13 NOT STARTED."
assert s.count(old) == 1; p.write_text(s.replace(old, new), encoding="utf-8", newline="\n")
r = REPO / "roadmap.md"; t = r.read_text(encoding="utf-8")
old2 = "- [ ] C1.12 onward NOT STARTED. Rollback file NOT run. 41B.1A NOT applied to production."
new2 = "- [x] C1.12 PASS — grant-vs-RLS interaction proven: authenticated retains SELECT-only table privilege; INSERT/UPDATE/DELETE owner policies do not confer missing privileges, and all three direct writes are denied with PostgreSQL 42501 on PostgREST and psql (2026-10-05): raw ACL `{postgres=arwdDxtm/postgres,service_role=arwdDxtm/postgres,authenticated=r/postgres}`, `role_table_grants` authenticated SELECT only, `has_table_privilege` t/f/f/f, four owner policies intact; genuine User A JWT through PostgREST: INSERT/UPDATE/DELETE 403 code 42501 `permission denied for table pregnancy_episodes`; psql as `authenticated` with dual JWT GUCs: SQLSTATE 42501 for all three; SELECT under RLS still returns only E-A1 on both channels; zero residue; no grant, policy or RLS change; catalogue identical to C1.11; history 47. Evidence `18*-c1-12-*`.\n- [ ] C1.13 onward NOT STARTED. Rollback file NOT run. 41B.1A NOT applied to production."
assert t.count(old2) == 1
nl = "\r\n" if "\r\n" in t else "\n"
r.write_text(t.replace(old2, new2.replace("\n", nl)), encoding="utf-8", newline="")
print("status updated")
