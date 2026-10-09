# N10.1 first remote identity check: management plane, target project only.
import json, sys, datetime, pathlib
sys.path.insert(0, r"C:\Users\Administrator\.n10r1")
import n10lib

ref = n10lib.target()
st, txt = n10lib.mgmt_get(f"/v1/projects/{ref}")
if st != 200:
    n10lib.die(f"project GET returned {st}")
p = json.loads(txt)
WESELL_ORG_ID = "xzickmpbmsjgkowcqpbg"  # WesellProducts: org id of the C1 projects (41b1a-c1/26) and G3 (41b-account-deletion-g3/00)
rep = {
    "checked_at": datetime.datetime.now(datetime.timezone.utc).isoformat(),
    "endpoint": "GET /v1/projects/{ref}",
    "ref": p.get("id") or p.get("ref"),
    "name": p.get("name"),
    "organization_id": p.get("organization_id") or p.get("organization_slug"),
    "region": p.get("region"),
    "status": p.get("status"),
    "created_at": p.get("created_at"),
    "database": {k: (p.get("database") or {}).get(k) for k in ("host", "version", "postgres_engine", "release_channel")},
}
exp = {"ref": "gbhwpzofnswlryqjoumw", "name": "tsoy-n10-r1-rehearsal", "organization_id": WESELL_ORG_ID, "region": "eu-west-2", "status": "ACTIVE_HEALTHY", "db_version": "17.11.0.003"}
rep["checks"] = {
    "ref": rep["ref"] == exp["ref"], "name": rep["name"] == exp["name"],
    "organization (WesellProducts by id)": rep["organization_id"] == exp["organization_id"],
    "region": rep["region"] == exp["region"], "status": rep["status"] == exp["status"],
    "postgres_version": rep["database"]["version"] == exp["db_version"],
    "db_host": rep["database"]["host"] == f"db.{exp['ref']}.supabase.co",
}
rep["expected"] = exp
rep["identity_match"] = all(rep["checks"].values())
out = json.dumps(rep, indent=1)
n10lib.assert_no_secret(out)
pathlib.Path(sys.argv[1]).write_text(out + "\n", encoding="utf-8", newline="\n")
print(out)
sys.exit(0 if rep["identity_match"] else 5)
