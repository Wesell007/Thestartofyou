# C1.18 — the plan's observation path: the real Supabase Auth admin deletion (auth.admin.deleteUser), i.e.
# DELETE /auth/v1/admin/users/{id} with the Project 1 service-role key, for disposable User D. EXACTLY ONE attempt.
# The key is read from the protected file and never printed; the evidence holds status, sanitised body and timings only.
import json, sys, time, urllib.request, urllib.error, datetime, pathlib
C1 = pathlib.Path(r"C:\Users\Administrator\.c1")
REF = (C1 / "target_ref.txt").read_text().strip(); assert REF == "wwtcnbjhttjtklpxhrkd", "STOP: not Project 1"
for d in (C1 / "denylist.txt").read_text().split(): assert d != REF, "STOP: denylisted"
marker = C1 / "c1_18" / "delete_attempted.flag"
if marker.exists(): print("STOP: a deletion attempt was already made; not retrying"); sys.exit(4)
D = json.load(open(C1 / "run1.userD.json", encoding="utf-8"))
sr = next(e["api_key"] for e in json.load(open(C1 / "run1.apikeys.json", encoding="utf-8")) if e.get("name") == "service_role")
URL = f"https://{REF}.supabase.co/auth/v1/admin/users/{D['id']}"
req = urllib.request.Request(URL, method="DELETE"); req.add_header("apikey", sr); req.add_header("Authorization", "Bearer " + sr)
marker.write_text(datetime.datetime.now(datetime.timezone.utc).isoformat())
t0 = time.time(); started = datetime.datetime.now(datetime.timezone.utc).isoformat()
try:
    with urllib.request.urlopen(req, timeout=60) as r: st, body = r.status, r.read().decode()
except urllib.error.HTTPError as e: st, body = e.code, e.read().decode()
finished = datetime.datetime.now(datetime.timezone.utc).isoformat(); el = round(time.time() - t0, 3)
try: parsed = json.loads(body) if body else None
except Exception: parsed = body[:500]
safe = {"observation_path": "auth.admin.deleteUser equivalent: DELETE /auth/v1/admin/users/{user_id} (service role)", "user_id": D["id"], "email": D["email"], "started_at": started, "finished_at": finished, "elapsed_s": el, "http_status": st, "response": parsed, "attempts": 1}
out = json.dumps(safe, indent=1)
for s in (sr, D["password"]): assert s not in out
(C1 / "c1_18" / "delete_result.json").write_text(out, encoding="utf-8", newline="\n"); print(out)
