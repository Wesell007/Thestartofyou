// DESIGN-ONLY / NON-RUNTIME. One-time download of the three stand-in OFL families (variable TTFs + OFL.txt)
// from the google/fonts repository into ../fonts/<family>/. Binaries are never committed to Git.
import { mkdirSync, writeFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
const root = resolve(dirname(fileURLToPath(import.meta.url)), "..", "fonts");
const BASE = "https://raw.githubusercontent.com/google/fonts/main/ofl";
const families = {
  cormorantgaramond: ["CormorantGaramond[wght].ttf", "CormorantGaramond-Italic[wght].ttf", "OFL.txt"],
  publicsans: ["PublicSans[wght].ttf", "PublicSans-Italic[wght].ttf", "OFL.txt"],
  sourceserif4: ["SourceSerif4[opsz,wght].ttf", "SourceSerif4-Italic[opsz,wght].ttf", "OFL.txt"],
};
let failed = 0;
for (const [dir, files] of Object.entries(families)) {
  mkdirSync(resolve(root, dir), { recursive: true });
  for (const f of files) {
    const url = `${BASE}/${dir}/${encodeURIComponent(f)}`;
    const res = await fetch(url);
    if (!res.ok) { console.log("MISSING", res.status, url); failed++; continue; }
    const buf = Buffer.from(await res.arrayBuffer());
    writeFileSync(resolve(root, dir, f), buf);
    console.log("fetched", dir, f, Math.round(buf.length / 1024) + " KB");
  }
}
process.exit(failed ? 1 : 0);
