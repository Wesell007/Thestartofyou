# G3 §14 Episode-local protection (13 refusals) and §15 ownership matrix (26 cases).
# One psql transaction ending in ROLLBACK; every case runs in its own PL/pgSQL subtransaction and is undone.
# Results are emitted as NOTICE lines and parsed into JSON. Run as postgres; no bypass; no residue.
import json, os, re, subprocess, sys
sys.path.insert(0, r"C:\Users\Administrator\.g3")
import g3lib, g3h

D, E = g3h.uid_of("D"), g3h.uid_of("E")
ED, EE = g3h.oid("e1", 0xE1), g3h.oid("e2", 0xE1)  # one active episode each, created inside the rolled-back transaction
CLASSES = ["journeys"] + g3h.BOUND
FK = {t: ("journeys_current_pregnancy_episode_owner_fkey" if t == "journeys" else f"{t}_pregnancy_episode_owner_fkey") for t in CLASSES}


def dependant(t, u, ep, n):
    i = g3h.oid("e9", n)
    return {
        "journeys": f"insert into public.journeys (user_id, lifecycle, current_pregnancy_episode_id) values ('{u}', 'pregnancy', '{ep}');",
        "reflections": f"insert into public.reflections (id, user_id, week, content, pregnancy_episode_id) values ('{i}', '{u}', 21, 'G3 matrix', '{ep}');",
        "week_photos": f"insert into public.week_photos (id, user_id, week, storage_path, pregnancy_episode_id) values ('{i}', '{u}', 21, '{u}/21.jpg', '{ep}');",
        "week_media_memories": f"insert into public.week_media_memories (id, user_id, week, media_type, mime_type, storage_path, file_size_bytes, pregnancy_episode_id) values ('{i}', '{u}', 21, 'voice_note', 'audio/mpeg', '{u}/21.mp3', 1000, '{ep}');",
        "pregnancy_appointments": f"insert into public.pregnancy_appointments (id, user_id, week, appointment_type, pregnancy_episode_id) values ('{i}', '{u}', 21, 'G3 matrix', '{ep}');",
        "pregnancy_symptom_notes": f"insert into public.pregnancy_symptom_notes (id, user_id, symptom_label, pregnancy_episode_id) values ('{i}', '{u}', 'G3 matrix', '{ep}');",
        "baby_movement_notes": f"insert into public.baby_movement_notes (id, user_id, pregnancy_episode_id) values ('{i}', '{u}', '{ep}');",
        "birth_plans": f"insert into public.birth_plans (id, user_id, completion, pregnancy_episode_id) values ('{i}', '{u}', 10, '{ep}');",
        "hospital_bag_items": f"insert into public.hospital_bag_items (id, user_id, category, item_key, label, pregnancy_episode_id) values ('{i}', '{u}', 'baby', 'g3_matrix', 'G3 matrix', '{ep}');",
        "midwife_questions": f"insert into public.midwife_questions (id, user_id, category, question, pregnancy_episode_id) values ('{i}', '{u}', 'other', 'G3 matrix', '{ep}');",
        "contraction_sessions": f"insert into public.contraction_sessions (id, user_id, started_at, pregnancy_episode_id) values ('{i}', '{u}', now(), '{ep}');",
        "contraction_events": f"insert into public.contraction_sessions (id, user_id, started_at) values ('{g3h.oid('e8', n)}', '{u}', now()); insert into public.contraction_events (id, user_id, session_id, started_at, pregnancy_episode_id) values ('{i}', '{u}', '{g3h.oid('e8', n)}', now(), '{ep}');",
        "babies": f"insert into public.babies (id, user_id, name, date_of_birth, birth_order, is_primary, pregnancy_episode_id) values ('{i}', '{u}', 'G3 matrix', date '2026-09-20', 1, true, '{ep}');",
    }[t]


def block(tag, k, t, body_setup, attempt):
    # setup + attempt in a subtransaction; the attempt's outcome is reported, then everything is undone.
    return f"""DO $g3$
DECLARE st text; cn text;
BEGIN
  BEGIN
    {body_setup}
    BEGIN
      {attempt}
      RAISE NOTICE 'G3|{tag}|{k}|{t}|ACCEPTED||';
    EXCEPTION WHEN OTHERS THEN
      GET STACKED DIAGNOSTICS st = RETURNED_SQLSTATE, cn = CONSTRAINT_NAME;
      RAISE NOTICE 'G3|{tag}|{k}|{t}|REFUSED|%|%', st, cn;
    END;
    RAISE EXCEPTION 'g3_undo';
  EXCEPTION WHEN OTHERS THEN
    IF SQLERRM <> 'g3_undo' THEN RAISE NOTICE 'G3|{tag}|{k}|{t}|SETUP_ERROR|%|%', SQLSTATE, SQLERRM; END IF;
  END;
END $g3$;"""


sql = ["\\set ON_ERROR_STOP 1", "BEGIN;", "SET LOCAL lock_timeout = '5s';",
       f"insert into public.pregnancy_episodes (id, user_id, lmp_date, due_date, status) values ('{ED}', '{D}', date '2026-03-01', date '2026-12-06', 'active'), ('{EE}', '{E}', date '2026-03-01', date '2026-12-06', 'active');"]
# §14: one dependant of class k bound to ED, then a direct privileged delete of ED
for k, t in enumerate(CLASSES, 1):
    sql.append(block("LOCAL", k, t, dependant(t, D, ED, 0x300 + k), f"delete from public.pregnancy_episodes where id = '{ED}';"))
# control: with no dependant, the same delete succeeds (proves the refusals come from the dependants)
sql.append(block("LOCAL", 0, "no_dependant_control", "null;", f"delete from public.pregnancy_episodes where id = '{ED}';"))
# §15: same-user link accepted / cross-user link rejected for every class
for k, t in enumerate(CLASSES, 1):
    sql.append(block("SAME", k, t, "null;", dependant(t, D, ED, 0x400 + k)))
    sql.append(block("CROSS", k, t, "null;", dependant(t, D, EE, 0x500 + k)))
sql.append("ROLLBACK;")
sql.append("select (select count(*) from public.pregnancy_episodes where user_id in ('%s','%s')) as residue_episodes, (select count(*) from public.journeys where user_id in ('%s','%s')) + (select count(*) from public.babies where user_id in ('%s','%s')) + (select count(*) from public.contraction_sessions where user_id in ('%s','%s')) as residue_rows;" % (D, E, D, E, D, E, D, E))
f = g3h.SQLD / "matrix_local_ownership.sql"
f.write_text("\n".join(sql) + "\n", encoding="utf-8", newline="\n")
env = dict(os.environ, G3_EXPECT_REF=g3h.REF)
r = subprocess.run(["bash", str(g3h.G3 / "g3_psql.sh"), "-f", str(f)], capture_output=True, text=True, env=env)
out = r.stdout + r.stderr
g3lib.assert_no_secret(out)
(g3h.LOGD / "matrix_local_ownership.log").write_text(out, encoding="utf-8", newline="\n")
rows = [l.split("G3|", 1)[1].split("|") for l in out.splitlines() if "NOTICE:  G3|" in l]
res = {"local": [], "control": None, "same": [], "cross": [], "exit": r.returncode}
for tag, k, t, outcome, st, cn in rows:
    rec = {"k": int(k), "table": t, "outcome": outcome, "sqlstate": st, "constraint": cn, "expected_constraint": FK.get(t)}
    if tag == "LOCAL" and t == "no_dependant_control":
        res["control"] = rec
    else:
        res[tag.lower()].append(rec)
res["residue"] = [l.strip() for l in out.splitlines() if re.match(r"^\s*\d+\s*\|\s*\d+\s*$", l)]
res["local_pass"] = sum(1 for x in res["local"] if x["outcome"] == "REFUSED" and x["sqlstate"] == "23503" and x["constraint"] == x["expected_constraint"])
res["same_pass"] = sum(1 for x in res["same"] if x["outcome"] == "ACCEPTED")
res["cross_pass"] = sum(1 for x in res["cross"] if x["outcome"] == "REFUSED" and x["sqlstate"] == "23503" and x["constraint"] == x["expected_constraint"])
res["setup_errors"] = [x for x in res["local"] + res["same"] + res["cross"] if x["outcome"] == "SETUP_ERROR"]
outj = json.dumps(res, indent=1)
g3lib.assert_no_secret(outj)
(g3h.WORK / "matrix_local_ownership.json").write_text(outj + "\n", encoding="utf-8", newline="\n")
print(json.dumps({k: res[k] for k in ("exit", "local_pass", "control", "same_pass", "cross_pass", "setup_errors", "residue")}, indent=1))
