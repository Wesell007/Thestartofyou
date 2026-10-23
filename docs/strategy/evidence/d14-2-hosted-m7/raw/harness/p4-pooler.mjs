import { workerSql } from "./wdb.mjs";
import { redact } from "./lib.mjs";
const sql = workerSql();
const out = [];
const r = await sql.unsafe("select current_user, session_user, current_setting('server_version') v, inet_server_port() port");
out.push(`identity ${JSON.stringify(r[0])}`);
out.push(`alerts_pending_count ${JSON.stringify((await sql.unsafe("select private.n10_alerts_pending_count() n"))[0])}`);
try { await sql.unsafe("select count(*) from private.account_deletion_requests"); out.push("table select: ALLOWED (unexpected)"); }
catch (e) { out.push(`table select: ${e.code} ${e.message}`); }
try { await sql.unsafe("select count(*) from auth.users"); out.push("auth.users select: ALLOWED (unexpected)"); }
catch (e) { out.push(`auth.users select: ${e.code} ${e.message}`); }
await sql.end();
console.log(redact(out.join("\n")));
