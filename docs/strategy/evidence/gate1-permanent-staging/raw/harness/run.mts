// Guarded runner for tsoy-staging. Usage:
//   tsx run.mts cli <log> <supabase args...>     ("@DBURL" -> guard-built session-pooler URL)
//   tsx run.mts sql <log> <file.sql>             (psql as postgres over the session pooler)
//   tsx run.mts probe <host>                     (connection test, prints identity only)
import { spawnSync } from "node:child_process";
import { writeFileSync } from "node:fs";
import { assertStagingTarget } from "../Desktop/Thestartofyou/scripts/staging-target-guard.ts";
// @ts-ignore
import { secret, redact, REF, D } from "./lib.mjs";

const POOLER = process.env.STAGING_POOLER_HOST ?? "aws-0-eu-west-2.pooler.supabase.com";
const user = `postgres.${REF}`;
assertStagingTarget(user);
const dbUrl = () => `postgresql://${encodeURIComponent(user)}:${encodeURIComponent(secret("db.pass"))}@${POOLER}:5432/postgres`;
const [kind, out, ...rest] = process.argv.slice(2);
const save = (t: string) => { const r = redact(t); if (out) writeFileSync(out, r); process.stdout.write(r); };

if (kind === "cli") {
  if (rest.some((a) => ["link", "reset", "delete"].includes(a))) throw new Error("runner: forbidden CLI verb");
  for (let i = 0; i < rest.length; i++) if (rest[i] === "--project-ref") assertStagingTarget(rest[i + 1]);
  const args = rest.map((a) => (a === "@DBURL" ? dbUrl() : a));
  const r = spawnSync("npx.cmd", ["--yes", "supabase@2.120.0", ...args], { cwd: `${D}/stage`, shell: true, encoding: "utf8" });
  save(`[staging_cli] target=${REF} cmd=supabase ${rest.join(" ")}\n${r.stdout ?? ""}${r.stderr ?? ""}\nexit=${r.status}\n`);
  process.exit(r.status ?? 1);
} else if (kind === "sql" || kind === "probe") {
  const file = kind === "sql" ? rest[0] : null;
  const args = ["-X", "-v", "ON_ERROR_STOP=1", "-h", POOLER, "-p", "5432", "-U", user, "-d", "postgres",
    ...(file ? ["-f", file] : ["-c", "select current_user, current_setting('server_version') v"])];
  const r = spawnSync("C:/Program Files/PostgreSQL/17/bin/psql.exe", args,
    { env: { ...process.env, PGPASSWORD: secret("db.pass"), PGSSLMODE: "require", PGCONNECT_TIMEOUT: "20" }, encoding: "utf8" });
  save(`[staging_sql] target=${REF} host=${POOLER} ${file ?? "probe"}\n${r.stdout ?? ""}${r.stderr ?? ""}\nexit=${r.status}\n`);
  process.exit(r.status ?? 1);
}
