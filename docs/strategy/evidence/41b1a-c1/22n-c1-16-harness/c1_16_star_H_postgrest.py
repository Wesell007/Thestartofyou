# C1.16 — starred rows H-1..H-5 re-run through PostgREST with a genuine JWT for synthetic user A (authoritative channel).
# Secrets read from protected local files, used only in headers/bodies, never printed or written to evidence.
import json, sys, urllib.request, urllib.error, hashlib, datetime, pathlib
C1 = pathlib.Path(r"C:\Users\Administrator\.c1")
REF = (C1 / "target_ref.txt").read_text().strip(); assert REF == "wwtcnbjhttjtklpxhrkd"
for d in (C1 / "denylist.txt").read_text().split(): assert d != REF
URL = f"https://{REF}.supabase.co"
A = "b09cd318-8f3e-4853-8d97-fc10267b3d69"; B = "820f49d1-2ebc-4bf1-a1e5-f6d32491bbbb"; EA1 = "00000000-0000-4c10-8000-00000000ea01"
anon = next(e["api_key"] for e in json.load(open(C1 / "run1.apikeys.json", encoding="utf-8")) if e.get("name") == "anon")
users = json.load(open(C1 / "run1.users.json", encoding="utf-8")); SECRETS = {anon, users["A"]["password"]}
ev = {"stage": "C1.16 star H", "project_ref": REF, "started_at": datetime.datetime.now(datetime.timezone.utc).isoformat(), "cases": []}
def call(method, path, headers, body=None):
    req = urllib.request.Request(URL + path, method=method, data=(json.dumps(body).encode() if body is not None else None))
    for k, v in headers.items(): req.add_header(k, v)
    if body is not None: req.add_header("Content-Type", "application/json")
    try:
        with urllib.request.urlopen(req, timeout=30) as r: return r.status, r.read().decode()
    except urllib.error.HTTPError as e: return e.code, e.read().decode()
def record(case, method, path, status, text, expected, ok, note=""):
    try: parsed = json.loads(text) if text else None
    except Exception: parsed = text[:300]
    ev["cases"].append({"case": case, "actor": "authenticated A (genuine JWT)", "request": f"{method} {path}", "http_status": status, "body": parsed, "expected": expected, "pass": bool(ok), "note": note})
    print(f"{case:<5} {method:<6} {path:<60} -> {status} {'PASS' if ok else 'FAIL'} {note}")
st, txt = call("POST", "/auth/v1/token?grant_type=password", {"apikey": anon}, {"email": users["A"]["email"], "password": users["A"]["password"]})
sess = json.loads(txt) if st == 200 else {}; tok = sess.get("access_token", ""); SECRETS.update([tok, sess.get("refresh_token", "")]); u = sess.get("user", {})
auth_ok = st == 200 and bool(tok) and u.get("id") == A and u.get("role") == "authenticated"
ev["auth"] = {"http_status": st, "user_id": u.get("id"), "role": u.get("role"), "aud": u.get("aud"), "access_token_length": len(tok), "access_token_sha256_prefix": hashlib.sha256(tok.encode()).hexdigest()[:12] if tok else None, "token_stored": False, "fabricated": False, "pass": auth_ok}
print("AUTH", st, u.get("id"), u.get("role"), "PASS" if auth_ok else "FAIL")
if not auth_ok: sys.exit(2)
HA = {"apikey": anon, "Authorization": "Bearer " + tok, "Prefer": "return=representation"}
SEL = "/rest/v1/pregnancy_episodes?select=id,user_id,status,removed_at&order=id"
denied = lambda st, txt: st in (401, 403) and isinstance(json.loads(txt) if txt else {}, dict) and json.loads(txt).get("code") == "42501"
st, txt = call("GET", SEL, HA); rows = json.loads(txt) if st == 200 else []
record("H-1", "GET", SEL, st, txt, "200, rows of A only (E-A1)", st == 200 and {r["id"] for r in rows} == {EA1} and all(r["user_id"] == A for r in rows), f"ids={[r['id'][-4:] for r in rows]}")
p = SEL + f"&user_id=eq.{B}"; st, txt = call("GET", p, HA)
record("H-2", "GET", p, st, txt, "200, zero rows", st == 200 and json.loads(txt) == [])
body = {"id": "00000000-0000-4c10-8000-00000000ec16", "user_id": A, "lmp_date": "2025-01-01", "due_date": "2025-10-08", "status": "given_birth", "ended_at": "2025-10-01T10:00:00Z", "outcome_date": "2025-10-01"}
st, txt = call("POST", "/rest/v1/pregnancy_episodes", HA, body); record("H-3", "POST", "/rest/v1/pregnancy_episodes", st, txt, "42501", denied(st, txt))
p = f"/rest/v1/pregnancy_episodes?id=eq.{EA1}"
st, txt = call("PATCH", p, HA, {"expected_count": 2}); record("H-4", "PATCH", p, st, txt, "42501", denied(st, txt))
st, txt = call("DELETE", p, HA); record("H-5", "DELETE", p, st, txt, "42501", denied(st, txt))
st, txt = call("GET", SEL, HA); rows = json.loads(txt) if st == 200 else []
record("post", "GET", SEL, st, txt, "E-A1 still present, unchanged", st == 200 and {r["id"] for r in rows} == {EA1})
ev["finished_at"] = datetime.datetime.now(datetime.timezone.utc).isoformat()
ev["summary"] = {"cases": len(ev["cases"]), "pass": sum(c["pass"] for c in ev["cases"]), "fail": [c["case"] for c in ev["cases"] if not c["pass"]]}
out = json.dumps(ev, indent=1)
for s in SECRETS: assert not s or s not in out
(C1 / "c1_16" / "star_H_postgrest.json").write_text(out, encoding="utf-8", newline="\n"); print(json.dumps(ev["summary"]))
