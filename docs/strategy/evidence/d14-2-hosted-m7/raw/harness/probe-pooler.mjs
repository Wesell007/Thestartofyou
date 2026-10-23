import { mgmt, redact } from "./lib.mjs";
const r = await mgmt("/config/database/pooler");
console.log("status", r.status);
if (Array.isArray(r.json)) for (const p of r.json) console.log(redact(JSON.stringify({ host: p.db_host, port: p.db_port, user: p.db_user, mode: p.pool_mode, type: p.database_type })));
else console.log(redact(r.text).slice(0, 300));
