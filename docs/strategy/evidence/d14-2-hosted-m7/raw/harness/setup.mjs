import { writeFileSync, existsSync, readFileSync } from "node:fs";
import { randomBytes, pbkdf2Sync, createHmac, createHash } from "node:crypto";
import { mgmt, redact, projectUrl, secret } from "./lib.mjs";
const D = "C:/Users/Administrator/.d142";
const log = [];
const say = (s) => { const t = redact(s); log.push(t); console.log(t); };

// 1. API keys (non-reveal listing); only types/names printed.
const k = await mgmt("/api-keys?reveal=false");
say(`api-keys status ${k.status}`);
const keys = {};
for (const x of k.json ?? []) {
  say(`key name=${x.name} type=${x.type} has_value=${typeof x.api_key === "string" && x.api_key.length > 0}`);
  if (x.type === "legacy" && x.name === "anon") keys.anon = x.api_key;
  if (x.type === "legacy" && x.name === "service_role") keys.service = x.api_key;
}
const claims = (jwt) => JSON.parse(Buffer.from(jwt.split(".")[1], "base64url").toString());
for (const [n, v] of Object.entries(keys)) { const c = claims(v); say(`${n}: role=${c.role} ref=${c.ref} iss=${c.iss}`); }
writeFileSync(`${D}/d142.keys.json`, JSON.stringify(keys));

// 2. jwt_exp only.
const a = await mgmt("/config/auth");
say(`config/auth status ${a.status} jwt_exp=${a.json?.jwt_exp}`);

// 3. Bucket first-year-memories via Storage API (private).
const b = await fetch(`${projectUrl}/storage/v1/bucket`, { method: "POST",
  headers: { Authorization: `Bearer ${keys.service}`, apikey: keys.service, "Content-Type": "application/json" },
  body: JSON.stringify({ id: "first-year-memories", name: "first-year-memories", public: false }) });
say(`create bucket first-year-memories status ${b.status} ${redact(await b.text()).slice(0, 120)}`);

// 4. Worker password + SCRAM-SHA-256 verifier computed locally (plaintext never sent).
const wp = `${D}/d142.workerpass`;
if (!existsSync(wp)) writeFileSync(wp, randomBytes(32).toString("base64url"));
const pw = readFileSync(wp, "utf8").trim();
const salt = randomBytes(16), iter = 4096;
const salted = pbkdf2Sync(pw, salt, iter, 32, "sha256");
const clientKey = createHmac("sha256", salted).update("Client Key").digest();
const storedKey = createHash("sha256").update(clientKey).digest();
const serverKey = createHmac("sha256", salted).update("Server Key").digest();
const verifier = `SCRAM-SHA-256$${iter}:${salt.toString("base64")}$${storedKey.toString("base64")}:${serverKey.toString("base64")}`;
writeFileSync(`${D}/d142.workerverifier.sql`, `alter role account_deletion_worker with login password '${verifier}';\nselect rolname, rolcanlogin, rolpassword is null as no_password from pg_authid where rolname='account_deletion_worker';\n`);
say(`worker password file length ${pw.length}; verifier sql written (not printed)`);
writeFileSync(`${D}/raw/02-setup.txt`, log.join("\n") + "\n");
