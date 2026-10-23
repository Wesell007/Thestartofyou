import { writeFileSync } from "node:fs";
import { mgmt, redact } from "./lib.mjs";
const tag = process.argv[2];
for (const t of ["security", "performance"]) {
  const r = await mgmt(`/advisors/${t}`);
  writeFileSync(`../raw/13-advisors-${tag}-${t}.json`, redact(r.text));
  const lints = r.json?.lints ?? [];
  const sum = {};
  for (const l of lints) { const k = `${l.level} ${l.name}`; sum[k] = (sum[k] ?? 0) + 1; }
  console.log(`${tag} ${t} status=${r.status} total=${lints.length}`, JSON.stringify(sum));
  for (const l of lints.filter((l) => /private|n10|analytics|account_deletion/i.test(JSON.stringify(l.metadata ?? {}) + l.detail)))
    console.log(`  ${l.level} ${l.name} :: ${l.detail}`);
}
