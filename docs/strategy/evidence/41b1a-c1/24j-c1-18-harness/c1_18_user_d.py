# C1.18 — create disposable synthetic User D on PROJECT 1 through the Auth admin endpoint (service-role key from the
# protected run1.apikeys.json, never printed), verify a genuine password sign-in, and record only the non-secret id.
import json, os, secrets, sys, urllib.request, urllib.error, datetime, pathlib, stat
C1 = pathlib.Path(r"C:\Users\Administrator\.c1")
REF = (C1 / "target_ref.txt").read_text().strip(); assert REF == "wwtcnbjhttjtklpxhrkd", "STOP: not Project 1"
for d in (C1 / "denylist.txt").read_text().split(): assert d != REF, "STOP: denylisted"
URL = f"https://{REF}.supabase.co"
keys = {e["name"]: e["api_key"] for e in json.load(open(C1 / "run1.apikeys.json", encoding="utf-8")) if e.get("name") in ("anon", "service_role")}
def call(method, path, headers, body=None):
    req = urllib.request.Request(URL + path, method=method, data=(json.dumps(body).encode() if body is not None else None))
    for k, v in headers.items(): req.add_header(k, v)
    if body is not None: req.add_header("Content-Type", "application/json")
    try:
        with urllib.request.urlopen(req, timeout=30) as r: return r.status, r.read().decode()
    except urllib.error.HTTPError as e: return e.code, e.read().decode()
HSR = {"apikey": keys["service_role"], "Authorization": "Bearer " + keys["service_role"]}
path = C1 / "run1.userD.json"
if path.exists():
    print("STOP: run1.userD.json already exists; not creating a second User D"); sys.exit(3)
email = "c1-user-d-deletion@example.invalid"; pw = secrets.token_urlsafe(24)
st, txt = call("POST", "/auth/v1/admin/users", HSR, {"email": email, "password": pw, "email_confirm": True, "user_metadata": {"synthetic": True, "purpose": "C1.18 disposable deletion subject"}})
if st not in (200, 201): print("STOP: create failed", st); sys.exit(2)
uid = json.loads(txt)["id"]
path.write_text(json.dumps({"id": uid, "email": email, "password": pw}), encoding="utf-8"); os.chmod(path, stat.S_IRUSR | stat.S_IWUSR)
st2, txt2 = call("POST", "/auth/v1/token?grant_type=password", {"apikey": keys["anon"]}, {"email": email, "password": pw})
u = (json.loads(txt2).get("user") or {}) if st2 == 200 else {}
rep = {"created_at": datetime.datetime.now(datetime.timezone.utc).isoformat(), "create_http": st, "user_id": uid, "email": email, "login_http": st2, "session_user_matches": u.get("id") == uid, "role": u.get("role"), "aud": u.get("aud")}
out = json.dumps(rep, indent=1)
for s in (pw, keys["service_role"], keys["anon"], json.loads(txt2).get("access_token", "") if st2 == 200 else ""):
    assert not s or s not in out
(C1 / "c1_18" / "user_d_report.json").write_text(out, encoding="utf-8", newline="\n"); print(out)
