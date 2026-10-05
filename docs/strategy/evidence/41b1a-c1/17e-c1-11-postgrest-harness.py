# 41B.1A-C1 C1.11 — authoritative PostgREST channel (plan section H). Project 1 only.
# Secrets (anon key, service-role key, user passwords, access/refresh tokens) are read from protected local files
# and used only in request headers/bodies; they are never printed, logged or written to the evidence JSON.
import json, sys, urllib.request, urllib.error, hashlib, datetime, pathlib

C1 = pathlib.Path(r"C:\Users\Administrator\.c1")
REF = (C1 / "target_ref.txt").read_text().strip()
assert REF == "wwtcnbjhttjtklpxhrkd", "STOP: target_ref is not Project 1"
for d in (C1 / "denylist.txt").read_text().split():
    assert d != REF, "STOP: denylisted target"
URL = f"https://{REF}.supabase.co"
A = "b09cd318-8f3e-4853-8d97-fc10267b3d69"
B = "820f49d1-2ebc-4bf1-a1e5-f6d32491bbbb"
C = "6e65487d-ddb0-43b6-a623-fb24b5318dab"
EA1 = "00000000-0000-4c10-8000-00000000ea01"
EB1 = "00000000-0000-4c10-8000-00000000eb01"
TMP = "00000000-0000-4c10-8000-00000000ec11"   # service_role temporary row for user C (H-8), deleted again by service_role

keys = {e["name"]: e["api_key"] for e in json.load(open(C1 / "run1.apikeys.json", encoding="utf-8")) if e.get("name") in ("anon", "service_role")}
assert "anon" in keys and "service_role" in keys, "STOP: anon/service_role keys not found"
users = json.load(open(C1 / "run1.users.json", encoding="utf-8"))
assert users["A"]["id"] == A if "id" in users["A"] else True

ev = {"stage": "C1.11", "project_ref": REF, "endpoint": URL, "started_at": datetime.datetime.now(datetime.timezone.utc).isoformat(), "cases": []}
SECRETS = set()

def redact(s):
    for sec in SECRETS:
        if sec and sec in s:
            s = s.replace(sec, "[REDACTED]")
    return s

def call(method, path, headers, body=None):
    req = urllib.request.Request(URL + path, method=method, data=(json.dumps(body).encode() if body is not None else None))
    for k, v in headers.items():
        req.add_header(k, v)
    if body is not None:
        req.add_header("Content-Type", "application/json")
    try:
        with urllib.request.urlopen(req, timeout=30) as r:
            return r.status, r.read().decode()
    except urllib.error.HTTPError as e:
        return e.code, e.read().decode()

def record(case, actor, method, path, status, text, expected, ok, note=""):
    try:
        parsed = json.loads(text) if text else None
    except Exception:
        parsed = text[:300]
    row = {"case": case, "actor": actor, "request": f"{method} {path}", "http_status": status, "body": parsed, "expected": expected, "pass": bool(ok), "note": note}
    ev["cases"].append(row)
    print(f"{case:<6} {actor:<14} {method:<6} {path:<60} -> {status} {'PASS' if ok else 'FAIL'} {note}")

SECRETS.update([keys["anon"], keys["service_role"], users["A"]["password"]])

# ---- genuine sign-in for A (Supabase Auth password grant, anon key as apikey) ----
st, txt = call("POST", "/auth/v1/token?grant_type=password", {"apikey": keys["anon"]}, {"email": users["A"]["email"], "password": users["A"]["password"]})
sess = json.loads(txt) if st == 200 else {}
tok = sess.get("access_token", "")
SECRETS.update([tok, sess.get("refresh_token", "")])
u = sess.get("user", {})
auth_ok = st == 200 and bool(tok) and u.get("id") == A and u.get("role") == "authenticated" and u.get("aud") == "authenticated"
ev["auth"] = {"endpoint": "POST /auth/v1/token?grant_type=password", "http_status": st, "user_id": u.get("id"), "role": u.get("role"), "aud": u.get("aud"),
              "email": u.get("email"), "token_type": sess.get("token_type"), "expires_in": sess.get("expires_in"),
              "access_token_length": len(tok), "access_token_sha256_prefix": hashlib.sha256(tok.encode()).hexdigest()[:12] if tok else None,
              "token_stored": False, "fabricated": False, "pass": auth_ok}
print("AUTH", st, "user", u.get("id"), "role", u.get("role"), "aud", u.get("aud"), "PASS" if auth_ok else "FAIL")
if not auth_ok:
    json.dump(ev, open(C1 / "c1_11_postgrest.json", "w", encoding="utf-8"), indent=1); sys.exit(2)

HA = {"apikey": keys["anon"], "Authorization": "Bearer " + tok}
HANON = {"apikey": keys["anon"]}
HSR = {"apikey": keys["service_role"], "Authorization": "Bearer " + keys["service_role"]}
SEL = "/rest/v1/pregnancy_episodes?select=id,user_id,status,removed_at&order=id"

# H-1 ★ authenticated as A: SELECT own episodes -> rows of A only
st, txt = call("GET", SEL, HA)
rows = json.loads(txt) if st == 200 else []
ok = st == 200 and len(rows) >= 1 and all(r["user_id"] == A for r in rows) and {r["id"] for r in rows} == {EA1}
record("H-1", "authenticated A", "GET", SEL, st, txt, "200, rows of A only (E-A1)", ok, f"ids={[r['id'][-4:] for r in rows]}")
# H-2 ★ authenticated as A: SELECT where user_id = B -> zero rows, no error
p = SEL + f"&user_id=eq.{B}"
st, txt = call("GET", p, HA)
rows = json.loads(txt) if st == 200 else None
record("H-2", "authenticated A", "GET", p, st, txt, "200, zero rows", st == 200 and rows == [])
# H-2b explicit: SELECT by E-B1 id -> zero rows
p = SEL + f"&id=eq.{EB1}"
st, txt = call("GET", p, HA)
rows = json.loads(txt) if st == 200 else None
record("H-2b", "authenticated A", "GET", p, st, txt, "200, zero rows (E-B1 invisible)", st == 200 and rows == [])
# H-3 ★ authenticated as A: INSERT episode for A -> 42501
body = {"id": "00000000-0000-4c10-8000-00000000ec03", "user_id": A, "lmp_date": "2025-01-01", "due_date": "2025-10-08", "status": "given_birth", "ended_at": "2025-10-01T10:00:00Z", "outcome_date": "2025-10-01"}
st, txt = call("POST", "/rest/v1/pregnancy_episodes", {**HA, "Prefer": "return=representation"}, body)
j = json.loads(txt) if txt else {}
ok = st in (401, 403) and isinstance(j, dict) and j.get("code") == "42501"
record("H-3", "authenticated A", "POST", "/rest/v1/pregnancy_episodes", st, txt, "42501 permission denied", ok)
# H-4 ★ authenticated as A: UPDATE own episode -> 42501
p = f"/rest/v1/pregnancy_episodes?id=eq.{EA1}"
st, txt = call("PATCH", p, {**HA, "Prefer": "return=representation"}, {"expected_count": 2})
j = json.loads(txt) if txt else {}
record("H-4", "authenticated A", "PATCH", p, st, txt, "42501 permission denied", st in (401, 403) and isinstance(j, dict) and j.get("code") == "42501")
# H-5 ★ authenticated as A: DELETE own episode -> 42501
st, txt = call("DELETE", p, {**HA, "Prefer": "return=representation"})
j = json.loads(txt) if txt else {}
record("H-5", "authenticated A", "DELETE", p, st, txt, "42501 permission denied", st in (401, 403) and isinstance(j, dict) and j.get("code") == "42501")
# H-6 authenticated as A via PostgREST (same as H-1)
st, txt = call("GET", SEL, HA)
rows = json.loads(txt) if st == 200 else []
record("H-6", "authenticated A", "GET", SEL, st, txt, "same as H-1", st == 200 and {r["id"] for r in rows} == {EA1} and all(r["user_id"] == A for r in rows))
# H-7 anon: SELECT -> 42501
st, txt = call("GET", SEL, HANON)
j = json.loads(txt) if txt else {}
record("H-7", "anon", "GET", SEL, st, txt, "42501 permission denied", st in (401, 403) and isinstance(j, dict) and j.get("code") == "42501")
# H-8 service_role: SELECT all, INSERT, UPDATE succeed (bypasses RLS)
st, txt = call("GET", SEL, HSR)
rows = json.loads(txt) if st == 200 else []
record("H-8a", "service_role", "GET", SEL, st, txt, "200, all rows (A and B)", st == 200 and {r["id"] for r in rows} == {EA1, EB1}, f"ids={[r['id'][-4:] for r in rows]}")
body = {"id": TMP, "user_id": C, "lmp_date": "2026-09-01", "due_date": "2027-06-08", "status": "active"}
st, txt = call("POST", "/rest/v1/pregnancy_episodes", {**HSR, "Prefer": "return=representation"}, body)
rows = json.loads(txt) if st == 201 else []
record("H-8b", "service_role", "POST", "/rest/v1/pregnancy_episodes", st, txt, "201, row for C inserted (temporary)", st == 201 and rows and rows[0]["id"] == TMP and rows[0]["user_id"] == C)
p = f"/rest/v1/pregnancy_episodes?id=eq.{TMP}"
st, txt = call("PATCH", p, {**HSR, "Prefer": "return=representation"}, {"expected_count": 3})
rows = json.loads(txt) if st == 200 else []
record("H-8c", "service_role", "PATCH", p, st, txt, "200, expected_count updated to 3", st == 200 and rows and rows[0]["expected_count"] == 3)
# cleanup of the temporary H-8 row through the same approved administrative path
st, txt = call("DELETE", p, {**HSR, "Prefer": "return=representation"})
rows = json.loads(txt) if st == 200 else []
record("H-8-cleanup", "service_role", "DELETE", p, st, txt, "200, temporary row removed", st == 200 and rows and rows[0]["id"] == TMP)
# final count through service_role
st, txt = call("GET", SEL, HSR)
rows = json.loads(txt) if st == 200 else []
record("post", "service_role", "GET", SEL, st, txt, "exactly E-A1 and E-B1 remain", st == 200 and {r["id"] for r in rows} == {EA1, EB1})

ev["finished_at"] = datetime.datetime.now(datetime.timezone.utc).isoformat()
ev["summary"] = {"cases": len(ev["cases"]), "pass": sum(c["pass"] for c in ev["cases"]), "fail": [c["case"] for c in ev["cases"] if not c["pass"]]}
out = redact(json.dumps(ev, indent=1))
for sec in SECRETS:
    assert not sec or sec not in out, "STOP: secret would leak into evidence"
(C1 / "c1_11_postgrest.json").write_text(out, encoding="utf-8", newline="\n")
print(json.dumps(ev["summary"]))
