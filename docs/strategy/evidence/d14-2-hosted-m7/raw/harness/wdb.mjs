// Worker connection: Postgres.js, prepare:false, max:1, transaction pooler 6543 as account_deletion_worker.<ref>.
import postgres from "postgres";
import { dbUrl, secret } from "./lib.mjs";
export function workerSql() {
  return postgres(dbUrl({ user: "account_deletion_worker", password: secret("d142.workerpass"), port: 6543 }),
    { prepare: false, max: 1, idle_timeout: 5, connect_timeout: 20, ssl: "require", onnotice: () => {} });
}
export const execOf = (sql) => async (text, params) => await sql.unsafe(text, params);
