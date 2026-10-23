import { pg, fixtures, snapshot } from "./ctx.mts";
const fx = fixtures();
for (const l of ["B", "C", "D", "E", "F", "G"]) { const s = await snapshot(fx[l].requestId!); console.log(l, s.status, s.has_user, JSON.stringify(Object.fromEntries(Object.entries(s.rest).filter(([k]) => /analytics|auth_deleted_at|final_sweep|next_attempt_at|lease|completed_at/.test(k))))); }
console.log((await pg.unsafe("select now()"))[0]);
await pg.end();
