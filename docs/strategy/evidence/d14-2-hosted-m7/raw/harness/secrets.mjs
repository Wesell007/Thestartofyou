import { writeFileSync, existsSync, readFileSync } from "node:fs";
import { randomBytes } from "node:crypto";
import { mgmt, dbUrl, secret, redact } from "./lib.mjs";
const D = "C:/Users/Administrator/.d142";
if (!existsSync(`${D}/d142.invoke`)) writeFileSync(`${D}/d142.invoke`, randomBytes(32).toString("base64url"));
const set = [
  ["N10_DB_URL", dbUrl({ user: "account_deletion_worker", password: secret("d142.workerpass"), port: 6543 })],
  ["N10_VERIFIED_TOKEN_WINDOW_SECONDS", "3600"],
  ["N10_TOKEN_WINDOW_VERIFICATION", "management-api:2026-10-23"],
  ["N10_WORKER_INVOKE_SECRET", secret("d142.invoke")],
  ["N10_COMPLETED_ROW_RETENTION_DAYS", "30"],
  ["N10_ENVIRONMENT", "rehearsal"],
];
const r = await mgmt("/secrets", { method: "POST", body: set.map(([name, value]) => ({ name, value })) });
console.log("set secrets status", r.status, redact(r.text).slice(0, 200));
const l = await mgmt("/secrets");
const names = (l.json ?? []).map((s) => s.name).sort();
console.log("secret names:", names.join(", "));
console.log("POSTHOG_* present:", names.filter((n) => n.startsWith("POSTHOG")).length, "| LOVABLE/alert present:", names.filter((n) => /LOVABLE|ALERT/.test(n)).length);
