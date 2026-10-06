# C1.17 / C1.2 on Project 2: create the three synthetic Auth users through the Supabase Auth admin endpoint using the
# Project 2 service-role key (listed through the authenticated CLI into run2.apikeys.json, mode 600, never printed),
# verify a genuine password sign-in for each, and record ids (non-secret) in run2.user_ids.json.
import json, os, secrets, subprocess, sys, urllib.request, urllib.error, datetime, pathlib, stat
C1 = pathlib.Path(r"C:\Users\Administrator\.c1")
REF = (C1 / "target_ref2.txt").read_text().strip(); assert REF == "dlftnirrnirlkhxpofoq", "STOP: target_ref2 is not Project 2"
for d in (C1 / "denylist2.txt").read_text().split(): assert d != REF, "STOP: denylisted"
URL = f"https://{REF}.supabase.co"
keys_path = C1 / "run2.apikeys.json"
if not keys_path.exists():
    out = subprocess.run(["bash", str(C1 / "c2_cli.sh"), "projects", "api-keys", "--project-ref", REF, "-o", "json"], capture_output=True, text=True)
    body = out.stdout[out.stdout.find("["):] if "[" in out.stdout else ""
    if out.returncode != 0 or not body:
        print("STOP: could not list Project 2 API keys through the CLI (rc=%d)" % out.returncode); sys.exit(2)
    keys_path.write_text(body, encoding="utf-8"); os.chmod(keys_path, stat.S_IRUSR | stat.S_IWUSR)
keys = {e["name"]: e["api_key"] for e in json.load(open(keys_path, encoding="utf-8")) if e.get("name") in ("anon", "service_role")}
assert "anon" in keys and "service_role" in keys, "STOP: anon/service_role keys not present"
SECRETS = set(keys.values())
def call(method, path, headers, body=None):
    req = urllib.request.Request(URL + path, method=method, data=(json.dumps(body).encode() if body is not None else None))
    for k, v in headers.items(): req.add_header(k, v)
    if body is not None: req.add_header("Content-Type", "application/json")
    try:
        with urllib.request.urlopen(req, timeout=30) as r: return r.status, r.read().decode()
    except urllib.error.HTTPError as e: return e.code, e.read().decode()
HSR = {"apikey": keys["service_role"], "Authorization": "Bearer " + keys["service_role"]}
users_path = C1 / "run2.users.json"
users = json.load(open(users_path, encoding="utf-8")) if users_path.exists() else {}
report = {"project_ref": REF, "created_at": datetime.datetime.now(datetime.timezone.utc).isoformat(), "users": {}}
for label in ("A", "B", "C"):
    email = f"c1-user-{label.lower()}@example.invalid"
    if label not in users:
        pw = secrets.token_urlsafe(24); SECRETS.add(pw)
        st, txt = call("POST", "/auth/v1/admin/users", HSR, {"email": email, "password": pw, "email_confirm": True, "user_metadata": {"synthetic": True}})
        if st not in (200, 201):
            print("STOP: user creation failed for", label, st, txt[:200].replace(keys["service_role"], "[REDACTED]")); sys.exit(3)
        u = json.loads(txt); users[label] = {"id": u["id"], "email": email, "password": pw}
        users_path.write_text(json.dumps(users, indent=1), encoding="utf-8"); os.chmod(users_path, stat.S_IRUSR | stat.S_IWUSR)
    SECRETS.add(users[label]["password"])
    # genuine sign-in verification (password grant with the anon key)
    st, txt = call("POST", "/auth/v1/token?grant_type=password", {"apikey": keys["anon"]}, {"email": email, "password": users[label]["password"]})
    sess = json.loads(txt) if st == 200 else {}; tok = sess.get("access_token", ""); SECRETS.add(tok); SECRETS.add(sess.get("refresh_token", ""))
    su = sess.get("user", {})
    report["users"][label] = {"id": users[label]["id"], "email": email, "created_http": "existing" if "id" in users[label] else None, "login_http": st, "session_user_id_matches": su.get("id") == users[label]["id"], "role": su.get("role"), "aud": su.get("aud")}
    print(label, users[label]["id"], email, "login", st, "match", su.get("id") == users[label]["id"], su.get("role"))
(C1 / "run2.user_ids.json").write_text(json.dumps({l: users[l]["id"] for l in users}, indent=1), encoding="utf-8")
out = json.dumps(report, indent=1)
for s in SECRETS: assert not s or s not in out, "STOP: secret would leak"
(C1 / "c2" / "c1_2_users_report.json").write_text(out, encoding="utf-8", newline="\n")
print("users ok:", all(v["login_http"] == 200 and v["session_user_id_matches"] and v["role"] == "authenticated" for v in report["users"].values()))
