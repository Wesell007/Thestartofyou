// Run the pinned Supabase CLI from the staging dir with a guard-built --db-url / env token; output redacted.
// Usage: node cli.mjs <outlog> <args...>   (the token "@DBURL" is replaced by the guard-built session-pooler URL)
import { spawnSync } from "node:child_process";
import { writeFileSync } from "node:fs";
import { secret, redact, dbUrl, REF } from "./lib.mjs";
import { assertTarget } from "./guard.mjs";
const [out, ...args] = process.argv.slice(2);
const forbidden = ["link", "reset"];
if (args.some((a) => forbidden.includes(a))) throw new Error("GUARD: forbidden CLI verb");
const real = args.map((a) => (a === "@DBURL" ? dbUrl() : a));
for (const a of args) if (/--project-ref/.test(a)) assertTarget(args[args.indexOf(a) + 1]);
const r = spawnSync("npx.cmd", ["--yes", "supabase@2.120.0", ...real], {
  cwd: "C:/Users/Administrator/.d142/stage", shell: true, encoding: "utf8",
  env: { ...process.env, SUPABASE_ACCESS_TOKEN: secret("d142.pat") },
});
const text = redact(`[d142_cli] target=${REF} sealed=4b561385 cmd=supabase ${args.join(" ")}\n${r.stdout || ""}${r.stderr || ""}\nexit=${r.status}\n`);
writeFileSync(out, text); process.stdout.write(text); process.exit(r.status ?? 1);
