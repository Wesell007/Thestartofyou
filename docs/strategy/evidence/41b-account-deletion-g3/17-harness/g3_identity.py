# G3 step 3/4: first remote identity check, management plane only, target project only.
import json, sys, datetime, pathlib
sys.path.insert(0, r"C:\Users\Administrator\.g3")
import g3lib

ref = g3lib.target()
st, txt = g3lib.mgmt_get(f"/v1/projects/{ref}")
if st != 200:
    g3lib.die(f"project GET returned {st}")
p = json.loads(txt)
org_slug = p.get("organization_id") or p.get("organization_slug")
st2, txt2 = g3lib.mgmt_get(f"/v1/organizations/{org_slug}")
org = json.loads(txt2) if st2 == 200 else {}
rep = {
    "checked_at": datetime.datetime.now(datetime.timezone.utc).isoformat(),
    "endpoint": "GET /v1/projects/{ref}, GET /v1/organizations/{slug}",
    "ref": p.get("id") or p.get("ref"),
    "name": p.get("name"),
    "organization_slug": org_slug,
    "organization_name": org.get("name"),
    "region": p.get("region"),
    "status": p.get("status"),
    "created_at": p.get("created_at"),
    "database": {k: (p.get("database") or {}).get(k) for k in ("host", "version", "postgres_engine", "release_channel")},
}
expected = {"ref": "czhopceorfqxdbfvlnap", "name": "tsoy-ad1-g3-rehearsal", "organization_name": "WesellProducts", "region": "eu-west-2", "status": "ACTIVE_HEALTHY", "db_version": "17.11.0.003"}
checks = {
    "ref": rep["ref"] == expected["ref"],
    "name": rep["name"] == expected["name"],
    "organization": rep["organization_name"] == expected["organization_name"],
    "region": rep["region"] == expected["region"],
    "status": rep["status"] == expected["status"],
    "postgres_version": rep["database"]["version"] == expected["db_version"],
    "db_host": rep["database"]["host"] == f"db.{expected['ref']}.supabase.co",
}
rep["expected"] = expected
rep["checks"] = checks
rep["identity_match"] = all(checks.values())
out = json.dumps(rep, indent=1)
g3lib.assert_no_secret(out)
pathlib.Path(sys.argv[1]).write_text(out + "\n", encoding="utf-8", newline="\n")
print(out)
sys.exit(0 if rep["identity_match"] else 5)
