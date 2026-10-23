import { readFileSync } from "node:fs";
import { projectUrl, redact } from "./lib.mjs";
const k = JSON.parse(readFileSync("C:/Users/Administrator/.d142/d142.keys.json", "utf8"));
for (const [who, key] of [["anon", k.anon], ["service_role", k.service]]) {
  for (const path of ["/rest/v1/account_deletion_requests?select=id&limit=1", "/rest/v1/rpc/n10_alerts_pending_count"]) {
    const r = await fetch(projectUrl + path, { method: path.includes("rpc") ? "POST" : "GET", headers: { apikey: key, Authorization: `Bearer ${key}`, "Accept-Profile": "private", "Content-Profile": "private", "Content-Type": "application/json" }, body: path.includes("rpc") ? "{}" : undefined });
    const t = await r.text();
    let code = ""; try { const j = JSON.parse(t); code = `${j.code} ${String(j.message).slice(0, 80)}`; } catch { code = t.slice(0, 80); }
    console.log(redact(`${who} ${path.split("?")[0]} Accept-Profile: private -> ${r.status} ${code}`));
  }
}
