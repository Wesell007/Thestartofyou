import { assertTarget } from "./guard.mjs";
const base = "https://wogepxfipdipogyogced.supabase.co"; assertTarget(base);
const anon = (await import("node:fs")).readFileSync("C:/Users/Administrator/Desktop/Thestartofyou/scripts/public-backend-defaults.ts", "utf8").match(/eyJ[A-Za-z0-9_.-]+/)?.[0];
for (const p of ["/auth/v1/health", "/rest/v1/"]) {
  const t0 = Date.now();
  try {
    const r = await fetch(base + p, { headers: { apikey: anon } , signal: AbortSignal.timeout(20000) });
    const body = await r.text();
    console.log(`${new Date().toISOString()} GET ${p} -> ${r.status} (${Date.now() - t0} ms) ${p.includes("health") ? body.slice(0, 120) : "[body not recorded]"}`);
  } catch (e) { console.log(`GET ${p} -> error ${e.name} (${Date.now() - t0} ms)`); }
}
