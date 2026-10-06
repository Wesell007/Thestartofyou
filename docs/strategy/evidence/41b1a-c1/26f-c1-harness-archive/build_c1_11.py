import json, re, pathlib, shutil
C1 = pathlib.Path(r"C:\Users\Administrator\.c1")
REPO = pathlib.Path(r"C:\Users\Administrator\Desktop\Thestartofyou")
E = REPO / "docs/strategy/evidence/41b1a-c1"
pr = json.load(open(C1 / "c1_11_postgrest.json", encoding="utf-8"))
log = (C1 / "c1_11_rls_corroboration.log").read_text(encoding="utf-8")

def block(tag):
    m = re.search(r"### CASE " + re.escape(tag) + r"\|.*?\n(.*?)(?=\n### CASE|\n=== )", log, re.S)
    return m.group(1) if m else ""
def psql_result(tag):
    b = block(tag)
    err = re.search(r"ERROR:\s+(\w+): (.*)", b)
    if err: return f"{err.group(1)} {err.group(2)}"
    ids = re.findall(r"(00000000-0000-4c10-8000-00000000[0-9a-f]{4}) \| ([0-9a-f-]{36})", b)
    cnt = re.search(r"rows_visible_for_b_filter\s*\n-+\s*\n\s*(\d+)", b)
    return f"rows {[(i[-4:], u[:8]) for i, u in ids]}" + (f"; count with B filter = {cnt.group(1)}" if cnt else "")
sel = lambda c: next(x for x in pr["cases"] if x["case"] == c)
def pr_result(c):
    x = sel(c); b = x["body"]
    if isinstance(b, list): return f"HTTP {x['http_status']}, rows {[(r['id'][-4:], r['user_id'][:8]) for r in b]}"
    if isinstance(b, dict): return f"HTTP {x['http_status']}, code {b.get('code')}: {b.get('message')}"
    return f"HTTP {x['http_status']}"
auth = pr["auth"]
rows = [
 ("H-1 *", "authenticated as A (genuine JWT)", "SELECT own episodes", "rows of A only", pr_result("H-1"), psql_result("H-1"), sel("H-1")["pass"]),
 ("H-2 *", "authenticated as A", "SELECT where user_id = B", "zero rows, no error", pr_result("H-2") + " / by E-B1 id: " + pr_result("H-2b"), psql_result("H-2"), sel("H-2")["pass"] and sel("H-2b")["pass"]),
 ("H-3 *", "authenticated as A", "INSERT episode for A", "42501 permission denied", pr_result("H-3"), psql_result("H-3"), sel("H-3")["pass"]),
 ("H-4 *", "authenticated as A", "UPDATE own episode (E-A1 expected_count)", "42501", pr_result("H-4"), psql_result("H-4"), sel("H-4")["pass"]),
 ("H-5 *", "authenticated as A", "DELETE own episode (E-A1)", "42501", pr_result("H-5"), psql_result("H-5"), sel("H-5")["pass"]),
 ("H-6", "authenticated as A via PostgREST", "SELECT with the A JWT", "same as H-1", pr_result("H-6"), "(PostgREST-only row; H-1 psql shown above)", sel("H-6")["pass"]),
 ("H-7", "anon (anon key, no user JWT)", "SELECT", "42501", pr_result("H-7"), psql_result("H-7"), sel("H-7")["pass"]),
 ("H-8", "service_role", "SELECT all; INSERT (temporary row for C); UPDATE it", "succeeds (bypasses RLS)", pr_result("H-8a") + " / INSERT " + pr_result("H-8b") + " / UPDATE " + pr_result("H-8c") + " / cleanup DELETE " + pr_result("H-8-cleanup"), "(PostgREST-only row per plan)", all(sel(c)["pass"] for c in ("H-8a", "H-8b", "H-8c", "H-8-cleanup", "post"))),
 ("H-9", "postgres (owner)", "SELECT all", "succeeds", "(psql-only row per plan)", psql_result("H-9"), "ea01" in psql_result("H-9") and "eb01" in psql_result("H-9")),
]
def agree(pg, ps):
    if "only row" in pg or "only row" in ps: return "n/a (single channel by plan)"
    if "42501" in pg and "42501" in ps: return "YES"
    if "rows" in pg and "rows" in ps:
        a = set(re.findall(r"'([0-9a-f]{4})'", pg)); b = set(re.findall(r"'([0-9a-f]{4})'", ps))
        return "YES" if a == b else "**NO**"
    return "**NO**"
out = ["# 41B.1A-C1 — 17b C1.11 RLS channel-agreement matrix (Project 1)", "",
 f"Authoritative channel: PostgREST at the Project 1 endpoint with a genuine JWT obtained by signing synthetic user A in through Supabase Auth (`POST /auth/v1/token?grant_type=password`, HTTP {auth['http_status']}, session user `{auth['user_id']}`, role `{auth['role']}`, aud `{auth['aud']}`, token length {auth['access_token_length']}, token not stored, not fabricated). Machine record `17a-c1-11-postgrest.json` (secrets redacted at source; request headers never recorded). Corroborating channel: `17-c1-11-rls-corroboration.log` (psql as `postgres`, then `set local role authenticated` with both `request.jwt.claim.sub` and `request.jwt.claims` set to A; `auth.uid()` read back as A; `row_security = on`; then `set local role anon`; rollback-only). Starred rows are marked `*`.", "",
 "| H case | Actor | Operation | Expected (plan section H) | PostgREST status/result | psql result | Channels agree | PASS |", "|---|---|---|---|---|---|---|---|"]
allok = True
for h, actor, op, exp, pg, ps, ok in rows:
    ag = agree(pg, ps); good = bool(ok) and ag != "**NO**"; allok &= good
    out.append(f"| {h} | {actor} | {op} | {exp} | {pg} | {ps} | {ag} | {'PASS' if good else '**FAIL**'} |")
out += ["", f"All rows PASS: {'YES' if allok else 'NO'}. Owner isolation: through PostgREST with the A JWT the only row returned is E-A1 (`...ea01`, user_id A); the B filter and the E-B1 id filter both return an empty array with HTTP 200; no row of another user was ever returned. Every authenticated write (INSERT, UPDATE, DELETE) was refused with code 42501 on both channels, so no write succeeded. Interpretation recorded per plan section H: policy presence never grants a privilege; the four owner policies exist for the later controlled write path.", ""]
(E / "17b-c1-11-channel-agreement-matrix.md").write_text("\n".join(out), encoding="utf-8", newline="\n")
print("matrix all ok:", allok)
for c in pr["cases"]:
    if isinstance(c["body"], dict): print(c["case"], c["http_status"], c["body"].get("code"), c["body"].get("message"))

shutil.copy(C1 / "c1_11_rls_corroboration.log", E / "17-c1-11-rls-corroboration.log")
shutil.copy(C1 / "c1_11_postgrest.json", E / "17a-c1-11-postgrest.json")
shutil.copy(C1 / "C1_11_rls_corroboration.sql", E / "17c-c1-11-rls-corroboration.sql")
shutil.copy(C1 / "c1_11_prestate.txt", E / "17d-c1-11-prestate.txt")
shutil.copy(C1 / "c1_11_postgrest.py", E / "17e-c1-11-postgrest-harness.py")

p = E / "00-identity.md"; s = p.read_text(encoding="utf-8")
old = "catalogue identical to C1.9. C1.11 NOT STARTED."
new = "catalogue identical to C1.9. C1.11 PASS (2026-10-05T20:59Z; see `17f-c1-11-summary.md`): genuine-JWT PostgREST RLS matrix proven; authenticated users see only their own Pregnancy Episodes, the psql dual-GUC channel agrees, and anon/service-role behaviour matches the approved matrix (H-1..H-9: A sees only E-A1, B filter empty, authenticated INSERT/UPDATE/DELETE 42501 on both channels, anon 42501 on both channels, service_role SELECT/INSERT/UPDATE succeed with the temporary row deleted again; no secret stored; nothing persisted; structure identical to C1.10). C1.12 NOT STARTED."
assert s.count(old) == 1; p.write_text(s.replace(old, new), encoding="utf-8", newline="\n")
r = REPO / "roadmap.md"; t = r.read_text(encoding="utf-8")
old2 = "- [ ] C1.11 onward NOT STARTED. Rollback file NOT run. 41B.1A NOT applied to production."
new2 = "- [x] C1.11 PASS — genuine-JWT PostgREST RLS matrix proven; authenticated users see only their own Pregnancy Episodes, the psql dual-GUC channel agrees, and anon/service-role behaviour matches the approved matrix (2026-10-05): synthetic user A signed in through Supabase Auth (real session, role authenticated); through PostgREST the A SELECT returns only E-A1, the user_id = B and id = E-B1 filters return empty 200s, INSERT/UPDATE/DELETE return 403 code 42501; anon SELECT 401 code 42501; service_role SELECT all / INSERT / UPDATE succeed (temporary row for C deleted again); psql with `set local role authenticated` + both JWT claim GUCs (`auth.uid()` = A) and `set local role anon` agrees on every corroborated row; no bypass, no policy/grant change, no secret in evidence; nothing persisted; catalogue identical to C1.10; history 47. Evidence `17*-c1-11-*`.\n- [ ] C1.12 onward NOT STARTED. Rollback file NOT run. 41B.1A NOT applied to production."
assert t.count(old2) == 1
nl = "\r\n" if "\r\n" in t else "\n"
r.write_text(t.replace(old2, new2.replace("\n", nl)), encoding="utf-8", newline="")
print("status updated")
