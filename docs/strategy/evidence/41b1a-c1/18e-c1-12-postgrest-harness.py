# 41B.1A-C1 C1.12 — authoritative PostgREST channel for the grant-vs-RLS proof (authenticated user A only).
# Secrets (anon key, user password, access/refresh tokens) are read from protected local files, used only in request
# headers/bodies, and never printed, logged or written to the evidence JSON. The service-role key is NOT used here.
import json, sys, urllib.request, urllib.error, hashlib, datetime, pathlib

C1 = pathlib.Path(r"C:\Users\Administrator\.c1")
REF = (C1 / "target_ref.txt").read_text().strip()
assert REF == "wwtcnbjhttjtklpxhrkd", "STOP: target_ref is not Project 1"
for d in (C1 / "denylist.txt").read_text().split():
    assert d != REF, "STOP: denylisted target"
URL = f"https://{REF}.supabase.co"
A = "b09cd318-8f3e-4853-8d97-fc10267b3d69"
B = "820f49d1-2ebc-4bf1-a1e5-f6d32491bbbb"
EA1 = "00000000-0000-4c10-8000-00000000ea01"
EB1 = "00000000-0000-4c10-8000-00000000eb01"

anon = next(e["api_key"] for e in json.load(open(C1 / "run1.apikeys.json", encoding="utf-8")) if e.get("name") == "anon")
users = json.load(open(C1 / "run1.users.json", encoding="utf-8"))
SECRETS = {anon, users["A"]["password"]}
ev = {"stage": "C1.12", "project_ref": REF, "endpoint": URL, "started_at": datetime.datetime.now(datetime.timezone.utc).isoformat(), "cases": []}

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

def record(case, op, method, path, status, text, expected, ok, note=""):
    try:
        parsed = json.loads(text) if text else None
    except Exception:
        parsed = text[:300]
    ev["cases"].append({"case": case, "operation": op, "actor": "authenticated A (genuine JWT)", "request": f"{method} {path}", "http_status": status, "body": parsed, "expected": expected, "pass": bool(ok), "note": note})
    print(f"{case:<10} {method:<6} {path:<60} -> {status} {'PASS' if ok else 'FAIL'} {note}")

# genuine sign-in
st, txt = call("POST", "/auth/v1/token?grant_type=password", {"apikey": anon}, {"email": users["A"]["email"], "password": users["A"]["password"]})
sess = json.loads(txt) if st == 200 else {}
tok = sess.get("access_token", ""); SECRETS.update([tok, sess.get("refresh_token", "")])
u = sess.get("user", {})
auth_ok = st == 200 and bool(tok) and u.get("id") == A and u.get("role") == "authenticated" and u.get("aud") == "authenticated"
ev["auth"] = {"endpoint": "POST /auth/v1/token?grant_type=password", "http_status": st, "user_id": u.get("id"), "role": u.get("role"), "aud": u.get("aud"), "token_type": sess.get("token_type"), "access_token_length": len(tok), "access_token_sha256_prefix": hashlib.sha256(tok.encode()).hexdigest()[:12] if tok else None, "token_stored": False, "fabricated": False, "pass": auth_ok}
print("AUTH", st, "user", u.get("id"), "role", u.get("role"), "PASS" if auth_ok else "FAIL")
if not auth_ok:
    json.dump(ev, open(C1 / "c1_12_postgrest.json", "w", encoding="utf-8"), indent=1); sys.exit(2)

HA = {"apikey": anon, "Authorization": "Bearer " + tok, "Prefer": "return=representation"}
SEL = "/rest/v1/pregnancy_episodes?select=id,user_id,status,expected_count,removed_at&order=id"
def denied(st, txt):
    j = json.loads(txt) if txt else {}
    return st in (401, 403) and isinstance(j, dict) and j.get("code") == "42501" and j.get("message") == "permission denied for table pregnancy_episodes"

# pre read (SELECT sanity): own row only
st, txt = call("GET", SEL, HA)
rows = json.loads(txt) if st == 200 else []
record("SEL-pre", "SELECT own", "GET", SEL, st, txt, "200, only E-A1", st == 200 and {r["id"] for r in rows} == {EA1} and all(r["user_id"] == A for r in rows), f"ids={[r['id'][-4:] for r in rows]}")
pre_ea1 = rows[0] if rows else None
# INSERT: otherwise valid, non-open row for A (so no CHECK, FK or unique index could be the reason)
body = {"id": "00000000-0000-4c10-8000-00000000ec12", "user_id": A, "lmp_date": "2025-01-01", "due_date": "2025-10-08", "status": "given_birth", "ended_at": "2025-10-01T10:00:00Z", "outcome_date": "2025-10-01", "expected_count": 1}
st, txt = call("POST", "/rest/v1/pregnancy_episodes", HA, body)
record("INSERT", "INSERT episode for A", "POST", "/rest/v1/pregnancy_episodes", st, txt, "401/403, code 42501, permission denied for table pregnancy_episodes", denied(st, txt))
# UPDATE: own row E-A1, valid change (same field/value as C1.11 H-4)
p = f"/rest/v1/pregnancy_episodes?id=eq.{EA1}"
st, txt = call("PATCH", p, HA, {"expected_count": 2})
record("UPDATE", "UPDATE own episode E-A1 expected_count 1 -> 2", "PATCH", p, st, txt, "401/403, code 42501", denied(st, txt))
# DELETE: own row E-A1
st, txt = call("DELETE", p, HA)
record("DELETE", "DELETE own episode E-A1", "DELETE", p, st, txt, "401/403, code 42501", denied(st, txt))
# post read: own row still present and unchanged; B still invisible; inserted id absent
st, txt = call("GET", SEL, HA)
rows = json.loads(txt) if st == 200 else []
same = bool(rows) and pre_ea1 is not None and rows[0] == pre_ea1
record("SEL-post", "SELECT own after denied writes", "GET", SEL, st, txt, "200, only E-A1, identical to SEL-pre", st == 200 and {r["id"] for r in rows} == {EA1} and same, f"identical_to_pre={same}")
p2 = SEL + f"&user_id=eq.{B}"
st, txt = call("GET", p2, HA)
record("SEL-B", "SELECT where user_id = B", "GET", p2, st, txt, "200, zero rows", st == 200 and json.loads(txt) == [])
p3 = SEL + "&id=eq.00000000-0000-4c10-8000-00000000ec12"
st, txt = call("GET", p3, HA)
record("RESIDUE", "SELECT the attempted insert id", "GET", p3, st, txt, "200, zero rows", st == 200 and json.loads(txt) == [])

ev["finished_at"] = datetime.datetime.now(datetime.timezone.utc).isoformat()
ev["summary"] = {"cases": len(ev["cases"]), "pass": sum(c["pass"] for c in ev["cases"]), "fail": [c["case"] for c in ev["cases"] if not c["pass"]]}
out = json.dumps(ev, indent=1)
for s in SECRETS:
    assert not s or s not in out, "STOP: secret would leak into evidence"
(C1 / "c1_12_postgrest.json").write_text(out, encoding="utf-8", newline="\n")
print(json.dumps(ev["summary"]))
