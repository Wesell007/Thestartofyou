# G3 harness: synthetic users, account graphs, trigger-order assertions, real GoTrue deletions,
# post-state checks. Every DB call goes through g3_psql.sh (marker-gated); every HTTP call through g3lib.
# Usage: python -I g3h.py <command> [args]
import datetime, json, os, pathlib, re, secrets, stat, subprocess, sys, time
sys.path.insert(0, r"C:\Users\Administrator\.g3")
import g3lib

G3 = g3lib.G3
WORK = G3 / "work"
SQLD, LOGD = WORK / "sql", WORK / "logs"
SQLD.mkdir(parents=True, exist_ok=True); LOGD.mkdir(parents=True, exist_ok=True)
REF = g3lib.target()
USERS_FILE = G3 / "g3.users.json"          # protected: includes synthetic passwords
IDS_FILE = WORK / "user_ids.json"           # non-secret
CODES = {"C": "c0", "A": "a1", "B": "b2", "S1": "d1", "S2": "d2", "D": "e1", "E": "e2"}
BOUND = ["reflections", "week_photos", "week_media_memories", "pregnancy_appointments", "pregnancy_symptom_notes",
         "baby_movement_notes", "birth_plans", "hospital_bag_items", "midwife_questions", "contraction_sessions",
         "contraction_events", "babies"]
DEPENDANT_ACCOUNT_TABLES = ["journeys"] + BOUND  # the 13 tables holding Episode ownership FKs
# supabase_auth_admin runs with search_path=auth; hosted GoTrue writes the table unqualified.
AUTH_DELETE = re.compile(r'DELETE FROM ("auth"\.)?"users" AS users WHERE users\.id = \$1')
FIRST_YEAR = ["first_year_entries", "first_year_care_events", "first_year_reminders", "first_year_memories"]


def now():
    return datetime.datetime.now(datetime.timezone.utc).isoformat()


def psql(sql, label, quiet_tx=False):
    f = SQLD / f"{label}.sql"
    f.write_text(sql, encoding="utf-8", newline="\n")
    env = dict(os.environ, G3_EXPECT_REF=REF)
    r = subprocess.run(["bash", str(G3 / "g3_psql.sh"), "-q", "-P", "pager=off", "-f", str(f)], capture_output=True, text=True, env=env)
    out = r.stdout + r.stderr
    g3lib.assert_no_secret(out)
    (LOGD / f"{label}.log").write_text(f"-- {now()} exit={r.returncode}\n{out}", encoding="utf-8", newline="\n")
    return r.returncode, out


def q(sql, label):
    """Run a query; return rows as lists (unaligned, '|' separated, tuples only)."""
    rc, out = psql("\\pset format unaligned\n\\pset tuples_only on\n\\pset footer off\n\\pset fieldsep '|'\n" + sql, label)
    if rc != 0:
        g3lib.die(f"query {label} failed: {out[-400:]}")
    return [l.split("|") for l in out.splitlines() if l.strip() and not l.startswith("psql:")]


def uid_of(name):
    return json.loads(IDS_FILE.read_text())[name]["id"]


def oid(code, n):
    return f"00000000-0000-4a3a-8000-{code}{n:010x}"


# --------------------------------------------------------------------------- users
def cmd_users(names):
    users = json.loads(USERS_FILE.read_text()) if USERS_FILE.exists() else {}
    ids = json.loads(IDS_FILE.read_text()) if IDS_FILE.exists() else {}
    for n in names:
        if n in users:
            print(f"{n}: already exists, not recreated"); continue
        email = f"g3-{n.lower()}-ad1@example.invalid"; pw = secrets.token_urlsafe(24)
        st, txt = g3lib.auth_call("POST", "/auth/v1/admin/users", {"email": email, "password": pw, "email_confirm": True,
                                  "user_metadata": {"synthetic": True, "purpose": f"G3 AD-1 rehearsal user {n}"}})
        if st not in (200, 201):
            g3lib.die(f"create {n} failed {st}")
        u = json.loads(txt)
        users[n] = {"id": u["id"], "email": email, "password": pw}
        USERS_FILE.write_text(json.dumps(users), encoding="utf-8"); os.chmod(USERS_FILE, stat.S_IRUSR | stat.S_IWUSR)
        st2, txt2 = g3lib.auth_call("POST", "/auth/v1/token?grant_type=password", {"email": email, "password": pw}, key="anon")
        su = (json.loads(txt2).get("user") or {}) if st2 == 200 else {}
        ids[n] = {"id": u["id"], "email": email, "created_at": now(), "create_http": st, "login_http": st2,
                  "session_user_matches": su.get("id") == u["id"], "role": su.get("role")}
        out = json.dumps(ids, indent=1); g3lib.assert_no_secret(out)
        IDS_FILE.write_text(out + "\n", encoding="utf-8", newline="\n")
        print(n, json.dumps(ids[n]))


# --------------------------------------------------------------------------- graph
def graph_sql(name, scratch_y=None):
    u, c = uid_of(name), CODES[name]
    E1, E0, b1, b2, ses = oid(c, 0xE1), oid(c, 0xE0), oid(c, 0xB1), oid(c, 0xB2), oid(c, 0x5E)
    r = lambda n: oid(c, 0x100 + n)
    s = [f"-- G3 fully connected account graph for synthetic user {name} ({u}); one transaction, as postgres, no bypass",
         "SET LOCAL lock_timeout = '5s';",
         f"insert into public.journeys (user_id, lifecycle) values ('{u}', 'first_year');",
         f"insert into public.pregnancy_episodes (id, user_id, lmp_date, due_date, status, status_changed_at, outcome_date, expected_count, ended_at) values ('{E1}', '{u}', date '2025-12-15', date '2026-09-21', 'given_birth', timestamptz '2026-09-20T09:00:00Z', date '2026-09-20', 2, timestamptz '2026-09-20T09:00:00Z');",
         f"insert into public.pregnancy_episodes (id, user_id, lmp_date, due_date, status, removed_at) values ('{E0}', '{u}', date '2025-01-10', date '2025-10-17', 'active', timestamptz '2025-03-01T10:00:00Z');",
         f"insert into public.babies (id, user_id, name, date_of_birth, birth_order, is_primary, pregnancy_episode_id) values ('{b1}', '{u}', 'G3 twin 1', date '2026-09-20', 1, true, '{E1}');",
         f"insert into public.babies (id, user_id, name, date_of_birth, birth_order, is_primary, pregnancy_episode_id) values ('{b2}', '{u}', 'G3 twin 2', date '2026-09-20', 2, false, '{E1}');",
         f"insert into public.reflections (id, user_id, week, content, pregnancy_episode_id) values ('{r(1)}', '{u}', 20, 'G3 synthetic reflection', '{E1}');",
         f"insert into public.week_photos (id, user_id, week, storage_path, pregnancy_episode_id) values ('{r(2)}', '{u}', 20, '{u}/20.jpg', '{E1}');",
         f"insert into public.week_media_memories (id, user_id, week, media_type, mime_type, storage_path, file_size_bytes, pregnancy_episode_id) values ('{r(3)}', '{u}', 20, 'voice_note', 'audio/mpeg', '{u}/20-voice.mp3', 1000, '{E1}');",
         f"insert into public.pregnancy_appointments (id, user_id, week, appointment_type, pregnancy_episode_id) values ('{r(4)}', '{u}', 20, 'G3 synthetic appointment', '{E1}');",
         f"insert into public.pregnancy_symptom_notes (id, user_id, symptom_label, pregnancy_episode_id) values ('{r(5)}', '{u}', 'G3 synthetic symptom', '{E1}');",
         f"insert into public.baby_movement_notes (id, user_id, pregnancy_episode_id) values ('{r(6)}', '{u}', '{E1}');",
         f"insert into public.birth_plans (id, user_id, completion, pregnancy_episode_id) values ('{r(7)}', '{u}', 50, '{E1}');",
         f"insert into public.hospital_bag_items (id, user_id, category, item_key, label, pregnancy_episode_id) values ('{r(8)}', '{u}', 'baby', 'g3_item', 'G3 synthetic item', '{E1}');",
         f"insert into public.midwife_questions (id, user_id, category, question, pregnancy_episode_id) values ('{r(9)}', '{u}', 'other', 'G3 synthetic question', '{E1}');",
         f"insert into public.contraction_sessions (id, user_id, started_at, ended_at, pregnancy_episode_id) values ('{ses}', '{u}', timestamptz '2026-09-19T20:00:00Z', timestamptz '2026-09-19T21:00:00Z', '{E1}');",
         f"insert into public.contraction_events (id, user_id, session_id, started_at, ended_at, pregnancy_episode_id) values ('{r(11)}', '{u}', '{ses}', timestamptz '2026-09-19T20:10:00Z', timestamptz '2026-09-19T20:11:00Z', '{E1}');",
         f"insert into public.first_year_entries (id, user_id, baby_id, lane, kind, entry_date, note) values ('{r(21)}', '{u}', '{b1}', 'baby', 'rhythm', date '2026-10-05', 'G3 synthetic entry twin 1');",
         f"insert into public.first_year_entries (id, user_id, baby_id, lane, kind, entry_date, note) values ('{r(22)}', '{u}', '{b2}', 'baby', 'rhythm', date '2026-10-05', 'G3 synthetic entry twin 2');",
         f"insert into public.first_year_care_events (id, user_id, baby_id, event_type, occurred_at, note) values ('{r(23)}', '{u}', '{b1}', 'note', timestamptz '2026-10-05T10:00:00Z', 'G3 synthetic care note');",
         f"insert into public.first_year_reminders (id, user_id, baby_id, reminder_type, due_at, label) values ('{r(24)}', '{u}', '{b1}', 'moment', now() + interval '1 day', 'G3 synthetic reminder');",
         f"insert into public.first_year_memories (id, user_id, baby_id, memory_scope, memory_date, note) values ('{r(25)}', '{u}', '{b1}', 'baby', date '2026-10-05', 'G3 synthetic memory');",
         f"update public.journeys set current_pregnancy_episode_id = '{E1}' where user_id = '{u}';"]
    if scratch_y:
        s += [f"insert into g3_scratch.y_parent (id, user_id) values ('{oid(c, 0xF1)}', '{u}');",
              f"insert into g3_scratch.x_dependant (id, user_id, y_id, pregnancy_episode_id) values ('{oid(c, 0xF2)}', '{u}', '{oid(c, 0xF1)}', '{E1}');"]
    return "\n".join(s) + "\n"


def cmd_graph(name, scratch=False):
    sql = graph_sql(name, scratch_y=scratch)
    f = SQLD / f"graph_{name}.sql"; f.write_text(sql, encoding="utf-8", newline="\n")
    env = dict(os.environ, G3_EXPECT_REF=REF)
    r = subprocess.run(["bash", str(G3 / "g3_psql.sh"), "-1", "-e", "-f", str(f)], capture_output=True, text=True, env=env)
    out = r.stdout + r.stderr; g3lib.assert_no_secret(out)
    (LOGD / f"graph_{name}.log").write_text(f"-- {now()} exit={r.returncode}\n{out}", encoding="utf-8", newline="\n")
    print(f"graph {name}: exit {r.returncode}; errors: {[l for l in out.splitlines() if 'ERROR' in l]}")
    if r.returncode != 0:
        sys.exit(r.returncode)


# --------------------------------------------------------------------------- state queries
def user_tables():
    rows = q("select table_schema||'.'||table_name from information_schema.columns where column_name='user_id' and table_schema in ('public','g3_scratch') order by 1;", "user_tables")
    return [r[0] for r in rows]


def owned_counts(name, label):
    u = uid_of(name)
    tabs = user_tables()
    sql = " union all ".join(f"select '{t}', count(*) from {t} where user_id = '{u}'" for t in tabs) + ";\n"
    sql += f"select 'auth.users', count(*) from auth.users where id = '{u}';\n"
    return {r[0]: int(r[1]) for r in q(sql, label)}


def graph_shape(name, label):
    u, c = uid_of(name), CODES[name]
    E1 = oid(c, 0xE1)
    parts = [f"select '{t}', count(*) from public.{t} where pregnancy_episode_id = '{E1}' and user_id = '{u}'" for t in BOUND]
    parts.append(f"select 'journeys.pointer', count(*) from public.journeys where current_pregnancy_episode_id = '{E1}' and user_id = '{u}'")
    parts.append(f"select 'episodes', count(*) from public.pregnancy_episodes where user_id = '{u}'")
    parts.append(f"select 'episodes.removed', count(*) from public.pregnancy_episodes where user_id = '{u}' and removed_at is not null")
    parts.append(f"select 'first_year.child_rows', (select count(*) from public.first_year_entries where user_id='{u}')+(select count(*) from public.first_year_care_events where user_id='{u}')+(select count(*) from public.first_year_reminders where user_id='{u}')+(select count(*) from public.first_year_memories where user_id='{u}')")
    parts.append(f"select 'cross_owner_links', (select count(*) from public.babies b join public.pregnancy_episodes e on e.id=b.pregnancy_episode_id where b.user_id<>e.user_id and b.user_id='{u}')")
    return {r[0]: int(r[1]) for r in q(" union all ".join(parts) + ";", label)}


def orphans(label):
    tabs = [t for t in user_tables() if t.startswith("public.")]
    parts = [f"select 'no_auth_user:{t}', count(*) from {t} x where not exists (select 1 from auth.users u where u.id = x.user_id)" for t in tabs]
    parts += [f"select 'missing_episode:{t}', count(*) from public.{t} x where x.pregnancy_episode_id is not null and not exists (select 1 from public.pregnancy_episodes e where e.id = x.pregnancy_episode_id)" for t in BOUND]
    parts.append("select 'missing_episode:journeys.pointer', count(*) from public.journeys j where j.current_pregnancy_episode_id is not null and not exists (select 1 from public.pregnancy_episodes e where e.id = j.current_pregnancy_episode_id)")
    parts += [f"select 'missing_baby:{t}', count(*) from public.{t} x where x.baby_id is not null and not exists (select 1 from public.babies b where b.id = x.baby_id)" for t in FIRST_YEAR]
    parts.append("select 'missing_session:contraction_events', count(*) from public.contraction_events x where not exists (select 1 from public.contraction_sessions s where s.id = x.session_id)")
    rows = q(" union all ".join(parts) + ";", label)
    return {r[0]: int(r[1]) for r in rows}


def fingerprint(name, label):
    u = uid_of(name)
    tabs = [t for t in user_tables() if t.startswith("public.")]
    parts = [f"select '{t}', count(*), coalesce(md5(string_agg(md5(to_jsonb(x)::text), ',' order by md5(to_jsonb(x)::text))), '-') from {t} x where user_id = '{u}'" for t in tabs]
    parts.append(f"select 'auth.users', count(*), coalesce(md5(string_agg(md5(concat_ws('|', id, email, email_confirmed_at, created_at, deleted_at, raw_user_meta_data::text)), ',')), '-') from auth.users where id = '{u}'")
    rows = q(" union all ".join(parts) + ";", label)
    return {r[0]: [int(r[1]), r[2]] for r in rows}


def trigger_order(label):
    rows = q("""select t.tgname, t.oid, k.conrelid::regclass::text, k.conname, t.tgfoid::regproc::text
from pg_trigger t join pg_constraint k on k.oid = t.tgconstraint
where t.tgrelid = 'auth.users'::regclass and t.tgisinternal and t.tgfoid::regproc::text like '%del%'
order by t.tgname;""", label)
    return [{"pos": i + 1, "tgname": r[0], "oid": int(r[1]), "child": r[2], "constraint": r[3], "function": r[4].strip('"')} for i, r in enumerate(rows)]


def classify(order, extra=None):
    pos = {o["child"]: o["pos"] for o in order}
    ep = pos["pregnancy_episodes"]
    deps = {t: pos[t] for t in DEPENDANT_ACCOUNT_TABLES}
    res = {"episode_trigger_position": ep, "total_delete_triggers": len(order),
           "dependants_before_episode": sorted([t for t, p in deps.items() if p < ep]),
           "dependants_after_episode": sorted([t for t, p in deps.items() if p > ep])}
    res["class"] = ("FAVOURABLE: episode cascade after all 13 dependant cascades" if not res["dependants_after_episode"] else
                    "UNFAVOURABLE: episode cascade before all 13 dependant cascades" if not res["dependants_before_episode"] else "MIXED")
    if extra:
        res["scratch_y_parent_position"] = pos.get(extra)
        res["episode_before_scratch_y"] = pos.get(extra, 0) > ep
    return res


def pss(label):
    rows = q("""select s.queryid, s.calls, regexp_replace(s.query, '\\s+', ' ', 'g')
from extensions.pg_stat_statements s join pg_roles r on r.oid = s.userid
where r.rolname = 'supabase_auth_admin';""", label)
    return {r[0]: {"calls": int(r[1]), "query": r[2]} for r in rows}


def pss_delta(before, after):
    d = []
    for k, v in after.items():
        prev = before.get(k, {"calls": 0})["calls"]
        if v["calls"] != prev:
            d.append({"calls_delta": v["calls"] - prev, "query": v["query"][:300]})
    return sorted(d, key=lambda x: x["query"])


# --------------------------------------------------------------------------- deletion (one attempt per user)
def cmd_delete(name):
    flag = WORK / f"delete_attempted_{name}.flag"
    if flag.exists():
        g3lib.die(f"a deletion attempt for {name} was already made; never retried")
    u = uid_of(name)
    flag.write_text(now())
    t0 = time.time(); started = now()
    st, body = g3lib.auth_call("DELETE", f"/auth/v1/admin/users/{u}", {"should_soft_delete": False})
    finished = now()
    try:
        parsed = json.loads(body) if body else None
    except Exception:
        parsed = body[:500]
    res = {"user": name, "user_id": u, "path": "DELETE /auth/v1/admin/users/{id} with service role, body {should_soft_delete:false} (auth.admin.deleteUser hard delete)",
           "started_at": started, "finished_at": finished, "elapsed_s": round(time.time() - t0, 3), "http_status": st, "response": parsed, "attempts": 1}
    out = json.dumps(res, indent=1); g3lib.assert_no_secret(out)
    return res


def run_delete_case(name, case, control="C", extra_y=None):
    """Full evidence bundle for one real deletion."""
    rep = {"case": case, "user": name, "user_id": uid_of(name)}
    rep["trigger_order"] = trigger_order(f"{case}_order")
    rep["order_classification"] = classify(rep["trigger_order"], extra_y)
    rep["graph_shape_pre"] = graph_shape(name, f"{case}_shape_pre")
    rep["owned_pre"] = owned_counts(name, f"{case}_owned_pre")
    rep["control_fingerprint_pre"] = fingerprint(control, f"{case}_ctl_pre")
    before = pss(f"{case}_pss_before")
    rep["delete"] = cmd_delete(name)
    time.sleep(2)
    after = pss(f"{case}_pss_after")
    rep["gotrue_statement_delta"] = pss_delta(before, after)
    rep["auth_users_delete_calls_delta"] = sum(x["calls_delta"] for x in rep["gotrue_statement_delta"] if AUTH_DELETE.fullmatch(x["query"].strip()))
    rep["gotrue_delete_like_statements"] = [x for x in rep["gotrue_statement_delta"] if x["query"].upper().startswith("DELETE")]
    rep["gotrue_public_dml_delta"] = [x for x in rep["gotrue_statement_delta"] if re.search(r'(delete|update|insert)[^;]*\b("?public"?\.)', x["query"], re.I)]
    rep["owned_post"] = owned_counts(name, f"{case}_owned_post")
    rep["orphans_post"] = orphans(f"{case}_orphans_post")
    rep["control_fingerprint_post"] = fingerprint(control, f"{case}_ctl_post")
    rep["control_unchanged"] = rep["control_fingerprint_pre"] == rep["control_fingerprint_post"]
    rep["orphans_total"] = sum(rep["orphans_post"].values())
    rep["owned_post_total"] = sum(rep["owned_post"].values())
    out = json.dumps(rep, indent=1); g3lib.assert_no_secret(out)
    (WORK / f"{case}.json").write_text(out + "\n", encoding="utf-8", newline="\n")
    print(json.dumps({k: rep[k] for k in ("case", "order_classification", "auth_users_delete_calls_delta", "control_unchanged", "orphans_total", "owned_post_total")} | {"http": rep["delete"]["http_status"], "response": rep["delete"]["response"], "public_dml_by_gotrue": rep["gotrue_public_dml_delta"]}, indent=1))
    return rep


if __name__ == "__main__":
    cmd = sys.argv[1]
    if cmd == "users":
        cmd_users(sys.argv[2:])
    elif cmd == "graph":
        cmd_graph(sys.argv[2], scratch=len(sys.argv) > 3 and sys.argv[3] == "scratch")
    elif cmd == "shape":
        print(json.dumps(graph_shape(sys.argv[2], f"shape_{sys.argv[2]}"), indent=1))
    elif cmd == "order":
        o = trigger_order(f"order_{sys.argv[2]}")
        print(json.dumps({"classification": classify(o, sys.argv[3] if len(sys.argv) > 3 else None), "order": o}, indent=1))
    elif cmd == "orphans":
        print(json.dumps(orphans("orphans_adhoc"), indent=1))
    elif cmd == "fingerprint":
        print(json.dumps(fingerprint(sys.argv[2], f"fp_{sys.argv[2]}"), indent=1))
    elif cmd == "case":
        run_delete_case(sys.argv[2], sys.argv[3], extra_y=sys.argv[4] if len(sys.argv) > 4 else None)
    else:
        g3lib.die("unknown command")
