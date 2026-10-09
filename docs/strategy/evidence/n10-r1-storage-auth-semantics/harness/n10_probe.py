# N10.1 hosted Storage/Auth semantics probe. All remote calls via n10lib (guarded) or n10_psql.sh (marker-gated).
# Usage: python -I n10_probe.py <command>
import datetime, hashlib, json, os, pathlib, secrets, stat, subprocess, sys, time
sys.path.insert(0, r"C:\Users\Administrator\.n10r1")
import n10lib

N10 = n10lib.N10
WORK = N10 / "work"
REF = n10lib.target()
BUCKET = "n10-probe"
USERS = N10 / "n10r1.users.json"     # protected: passwords and A's pre-deletion tokens
IDS = WORK / "user_ids.json"         # non-secret
ORIGINAL = b"N10.1 synthetic probe object uploaded with user A's own JWT.\n"
CONTROL = b"N10.1 synthetic control object uploaded with user C's own JWT.\n"
STALE = b"N10.1 stale-JWT upload attempt after Auth deletion.\n"


def now():
    return datetime.datetime.now(datetime.timezone.utc).isoformat()


def save(name, obj):
    out = json.dumps(obj, indent=1)
    n10lib.assert_no_secret(out)
    (WORK / name).write_text(out + "\n", encoding="utf-8", newline="\n")
    print(out)


def sql(query, label):
    f = WORK / f"{label}.sql"
    f.write_text("\\pset footer off\n" + query + "\n", encoding="utf-8", newline="\n")
    r = subprocess.run(["bash", str(N10 / "n10_psql.sh"), "-q", "-f", str(f)], capture_output=True, text=True, env=dict(os.environ, G3_EXPECT_REF=REF))
    out = r.stdout + r.stderr
    n10lib.assert_no_secret(out)
    (WORK / f"{label}.log").write_text(out, encoding="utf-8", newline="\n")
    if r.returncode != 0:
        n10lib.die(f"sql {label} failed")
    return out


def users():
    return json.loads(USERS.read_text()) if USERS.exists() else {}


def write_users(u):
    USERS.write_text(json.dumps(u), encoding="utf-8")
    os.chmod(USERS, stat.S_IRUSR | stat.S_IWUSR)


def uid(n):
    return users()[n]["id"]


# ------------------------------------------------------------------ setup
def cmd_bucket():
    st, t = n10lib.project_call("POST", "/storage/v1/bucket", body={"id": BUCKET, "name": BUCKET, "public": False})
    st2, t2 = n10lib.project_call("GET", f"/storage/v1/bucket/{BUCKET}")
    b = json.loads(t2) if st2 == 200 else {}
    save("02a-bucket.json", {"create_http": st, "create_response": json.loads(t) if t.startswith("{") else t[:200],
                             "get_http": st2, "bucket": {k: b.get(k) for k in ("id", "name", "public", "owner", "owner_id", "file_size_limit", "allowed_mime_types", "created_at")}})


def cmd_users():
    u = users(); ids = {}
    for n in ("A", "C"):
        if n in u:
            continue
        email = f"n10r1-{n.lower()}@example.invalid"; pw = secrets.token_urlsafe(24)
        st, t = n10lib.project_call("POST", "/auth/v1/admin/users", body={"email": email, "password": pw, "email_confirm": True, "user_metadata": {"synthetic": True, "purpose": f"N10.1 probe user {n}"}})
        if st not in (200, 201):
            n10lib.die(f"create {n} failed {st}")
        u[n] = {"id": json.loads(t)["id"], "email": email, "password": pw}
        write_users(u)
    for n in ("A", "C"):
        st, t = n10lib.project_call("POST", "/auth/v1/token?grant_type=password", key="anon", body={"email": u[n]["email"], "password": u[n]["password"]})
        j = json.loads(t) if st == 200 else {}
        u[n]["access_token"] = j.get("access_token"); u[n]["refresh_token"] = j.get("refresh_token")
        u[n]["token_expires_at"] = j.get("expires_at")
        write_users(u)
        ids[n] = {"id": u[n]["id"], "email": u[n]["email"], "signin_http": st, "session_user_matches": (j.get("user") or {}).get("id") == u[n]["id"],
                  "role": (j.get("user") or {}).get("role"), "access_token_expires_at": j.get("expires_at"), "expires_in": j.get("expires_in")}
    save("user_ids.json", ids)


def upload(name, path, data, label):
    u = users()[name]
    st, t = n10lib.project_call("POST", f"/storage/v1/object/{BUCKET}/{path}", key="anon", bearer=u["access_token"], raw=data,
                                headers={"Content-Type": "text/plain", "x-upsert": "false"})
    return {"label": label, "as_user": name, "path": f"{BUCKET}/{path}", "http": st, "response": json.loads(t) if t.startswith("{") else t[:300], "at": now()}


def cmd_upload():
    res = [upload("A", f"{uid('A')}/r1-original.txt", ORIGINAL, "A original (user JWT)"),
           upload("C", f"{uid('C')}/control.txt", CONTROL, "C control (user JWT)")]
    save("02b-uploads.json", res)


# ------------------------------------------------------------------ observation
def objects_rows(label):
    out = sql(f"""\\pset format unaligned
\\pset tuples_only on
select name, coalesce(owner::text,'NULL'), coalesce(owner_id,'NULL'), coalesce((metadata->>'size'),'?'), id::text from storage.objects where bucket_id = '{BUCKET}' order by name;""", label)
    rows = [l.split("|") for l in out.splitlines() if l.count("|") == 4]
    return [{"name": r[0], "owner": r[1], "owner_id": r[2], "size": r[3], "id": r[4]} for r in rows]


def api_object(path):
    st, t = n10lib.project_call("GET", f"/storage/v1/object/authenticated/{BUCKET}/{path}")
    return {"http": st, "sha256": hashlib.sha256(t.encode()).hexdigest() if st == 200 else None, "bytes": len(t.encode()) if st == 200 else None}


def auth_user(name):
    st, t = n10lib.project_call("GET", f"/auth/v1/admin/users/{uid(name)}")
    return {"http": st, "present": st == 200}


def control_fp(label):
    rows = [r for r in objects_rows(label) if r["name"].startswith(uid("C"))]
    st, t = n10lib.project_call("GET", f"/auth/v1/admin/users/{uid('C')}")
    j = json.loads(t) if st == 200 else {}
    return {"auth_http": st, "auth_fields": {k: j.get(k) for k in ("id", "email", "created_at", "email_confirmed_at")},
            "objects": rows, "object_api": api_object(f"{uid('C')}/control.txt")}


def cmd_pre():
    a = uid("A")
    rep = {"at": now(), "auth_A": auth_user("A"),
           "auth_users_rows": sql(f"select id, email from auth.users order by email;", "03-pre-auth"),
           "objects": objects_rows("03-pre-objects"),
           "A_original_api": api_object(f"{a}/r1-original.txt"),
           "expected_sha256": hashlib.sha256(ORIGINAL).hexdigest(),
           "control_C": control_fp("03-pre-control")}
    rep["owner_id_equals_A"] = any(r["name"] == f"{a}/r1-original.txt" and r["owner_id"] == a for r in rep["objects"])
    save("03-pre-state.json", rep)


# ------------------------------------------------------------------ R1 .. R4
def cmd_r1():
    flag = WORK / "r1_attempted.flag"
    if flag.exists():
        n10lib.die("R1 already attempted; never retried")
    flag.write_text(now())
    a = uid("A"); t0 = time.time(); started = now()
    st, t = n10lib.project_call("DELETE", f"/auth/v1/admin/users/{a}", body={"should_soft_delete": False})
    res = {"path": "DELETE /auth/v1/admin/users/{id} (service role, body {should_soft_delete:false}) = auth.admin.deleteUser hard delete",
           "user_id": a, "started_at": started, "elapsed_s": round(time.time() - t0, 3), "http": st,
           "response": json.loads(t) if t.strip().startswith("{") else t[:300], "attempts": 1}
    time.sleep(2)
    res["auth_A_after"] = auth_user("A")
    res["auth_users_rows_after"] = sql("select id, email from auth.users order by email;", "04-post-auth")
    res["objects_after"] = objects_rows("04-post-objects")
    res["A_original_api_after"] = api_object(f"{a}/r1-original.txt")
    res["control_C_after"] = control_fp("04-post-control")
    save("04-r1-result.json", res)


def cmd_r4():
    flag = WORK / "r4_attempted.flag"
    if flag.exists():
        n10lib.die("R4 already attempted")
    flag.write_text(now())
    u = users()["A"]
    rep = {"at": now(), "stale_token_expires_at": u.get("token_expires_at"),
           "note": "access token issued to A before R1; never printed"}
    st, t = n10lib.project_call("GET", "/auth/v1/user", key="anon", bearer=u["access_token"])
    rep["getUser_with_stale_jwt"] = {"http": st, "response": json.loads(t) if t.strip().startswith("{") else t[:200]}
    rep["upload_with_stale_jwt"] = upload("A", f"{u['id']}/r4-stale-upload.txt", STALE, "A stale-JWT upload after deletion")
    rep["objects_after_upload"] = objects_rows("07-r4-objects")
    rep["stale_object_api"] = api_object(f"{u['id']}/r4-stale-upload.txt")
    st2, t2 = n10lib.project_call("POST", "/auth/v1/token?grant_type=refresh_token", key="anon", body={"refresh_token": u["refresh_token"]})
    j2 = json.loads(t2) if t2.strip().startswith("{") else {}
    rep["refresh_with_stale_refresh_token"] = {"http": st2, "error": j2.get("error") or j2.get("error_code") or j2.get("code"), "msg": j2.get("msg") or j2.get("error_description") or j2.get("message"), "new_session_issued": bool(j2.get("access_token"))}
    rep["control_C_after"] = control_fp("07-r4-control")
    save("07-r4-result.json", rep)


def cmd_purge():
    a = uid("A")
    names = [r["name"] for r in objects_rows("10-purge-before") if r["name"].startswith(a + "/")]
    st, t = n10lib.project_call("DELETE", f"/storage/v1/object/{BUCKET}", body={"prefixes": names}) if names else (None, "[]")
    rep = {"at": now(), "removed_via": "Storage API DELETE /storage/v1/object/{bucket} {prefixes} (service role)", "requested": names, "http": st,
           "removed": [x.get("name") for x in json.loads(t)] if t.strip().startswith("[") else t[:200],
           "objects_after": objects_rows("10-purge-after"), "control_C_after": control_fp("10-purge-control")}
    save("10-purge.json", rep)


if __name__ == "__main__":
    {"bucket": cmd_bucket, "users": cmd_users, "upload": cmd_upload, "pre": cmd_pre, "r1": cmd_r1, "r4": cmd_r4, "purge": cmd_purge}[sys.argv[1]]()
