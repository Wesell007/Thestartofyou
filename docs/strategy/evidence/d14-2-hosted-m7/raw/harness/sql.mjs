// Run a SQL file as postgres via psql over the session pooler; output redacted. Usage: node sql.mjs file.sql [outlog]
import { spawnSync } from "node:child_process";
import { writeFileSync } from "node:fs";
import { secret, redact, REF, POOLER_HOST } from "./lib.mjs";
import { assertTarget } from "./guard.mjs";
const [file, out] = process.argv.slice(2);
const user = `postgres.${REF}`; assertTarget(user);
const r = spawnSync("C:/Program Files/PostgreSQL/17/bin/psql.exe",
  ["-X", "-v", "ON_ERROR_STOP=1", "-h", POOLER_HOST, "-p", "5432", "-U", user, "-d", "postgres", "-f", file],
  { env: { ...process.env, PGPASSWORD: secret("d142.dbpass"), PGSSLMODE: "require", PGCONNECT_TIMEOUT: "20" }, encoding: "utf8" });
const text = redact(`[d142_sql] target=${REF} file=${file}\n` + (r.stdout || "") + (r.stderr || "") + `\nexit=${r.status}\n`);
if (out) writeFileSync(out, text);
process.stdout.write(text);
process.exit(r.status ?? 1);
