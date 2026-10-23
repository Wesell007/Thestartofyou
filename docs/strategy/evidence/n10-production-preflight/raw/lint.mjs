import { readFileSync } from "node:fs";
import { assertReadOnlySql } from "./guard.mjs";
for (const f of process.argv.slice(2)) { const s = readFileSync(f, "utf8"); assertReadOnlySql(s); console.log(`LINT OK ${f} (${s.length} chars)`); }
