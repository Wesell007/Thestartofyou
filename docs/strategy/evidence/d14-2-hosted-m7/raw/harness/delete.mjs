// Guarded deletion of the D14.2 disposable project only (after evidence push 4072bf27).
import { spawnSync } from "node:child_process";
import { writeFileSync } from "node:fs";
import { secret, redact, mgmt } from "./lib.mjs";
import { assertTarget, ALLOWED_REF } from "./guard.mjs";
const ref = process.argv[2];
assertTarget(ref); if (ref !== ALLOWED_REF) throw new Error("GUARD: not the D14.2 ref");
const s = await mgmt("");
console.log(`pre-delete status=${s.status} project_status=${s.json?.status} name=${s.json?.name}`);
const t0 = new Date().toISOString();
const r = spawnSync("npx.cmd", ["--yes", "supabase@2.120.0", "projects", "delete", ref, "--yes"], { shell: true, encoding: "utf8", env: { ...process.env, SUPABASE_ACCESS_TOKEN: secret("d142.pat") } });
const out = redact(`[d142_delete] ${t0} supabase projects delete ${ref} --yes\n${r.stdout}${r.stderr}\nexit=${r.status}\n`);
writeFileSync("../raw/16-delete.txt", out); console.log(out.split("\n").filter((l) => !/npm notice|new version|recommend/i.test(l)).join("\n"));
