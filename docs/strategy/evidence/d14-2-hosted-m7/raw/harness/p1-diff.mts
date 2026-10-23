import { readFileSync } from "node:fs";
import { pg, snapshot, say, writeLog } from "./ctx.mts";
const lines = readFileSync("../raw/05-fixtures-pre-m7.txt", "utf8").split("\n");
for (const label of ["A final", "B final", "C final", "D final", "E final"]) {
  const line = lines.find((l) => l.startsWith(label + " "))!;
  const before = JSON.parse(line.slice(label.length + 1));
  const after = await snapshot(before.id);
  const diffs: string[] = [];
  for (const k of new Set([...Object.keys(before.rest), ...Object.keys(after.rest)])) {
    if (k.startsWith("analytics_")) continue;
    if (JSON.stringify(before.rest[k]) !== JSON.stringify(after.rest[k])) diffs.push(`${k}: ${JSON.stringify(before.rest[k])} -> ${JSON.stringify(after.rest[k])}`);
  }
  for (const k of ["status", "has_user", "auth_user", "media"]) if (before[k] !== after[k]) diffs.push(`${k}: ${before[k]} -> ${after[k]}`);
  const an = Object.fromEntries(Object.entries(after.rest).filter(([k]) => k.startsWith("analytics_")));
  say(`P1 ${label[0]} status=${after.status} has_user=${after.has_user} pre-existing-column diffs: ${diffs.length ? diffs.join("; ") : "none"} | ${JSON.stringify(an)}`);
}
writeLog("../raw/08-p1-row-diff.txt");
await pg.end();
