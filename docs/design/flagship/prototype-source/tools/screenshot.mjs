// DESIGN-ONLY / NON-RUNTIME. Renders the flagship prototypes with the repository's Playwright (dev dependency)
// and writes PNG review captures to ../review/. Touches no application code.
// Usage (from anywhere):  node C:\Users\Administrator\.tsoy-design\flagship-prototypes\tools\screenshot.mjs [article my-week ...]
import { createRequire } from "node:module";
import { mkdirSync, existsSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const require = createRequire("C:/Users/Administrator/Desktop/Thestartofyou/package.json");
const { chromium } = require("playwright");

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const out = resolve(root, "review");
mkdirSync(out, { recursive: true });

// Fixed name map: canonical full-page captures plus per-state element captures (never DOM-derived names).
const CONCEPTS = {
  article: { states: [] },
  "my-week": { states: ["a-owner-active", "b-digital-active", "c-ttc-ivf", "d-historical", "e-paused"] },
  companion: { states: ["answer", "not-found", "escalation", "owner-cue"] },
  activation: { states: ["scan", "account", "claim", "outcomes"] },
  homepage: { states: [] },
};
const VIEWPORTS = { desktop: { width: 1440, height: 900 }, mobile: { width: 390, height: 844 } };
const FONT_CHECKS = ['300 1em "TSOY Display"', '400 1em "TSOY UI"', '400 1em "TSOY Read"'];

const wanted = process.argv.slice(2);
const names = Object.keys(CONCEPTS).filter((n) => wanted.length === 0 || wanted.includes(n));
const browser = await chromium.launch();
let failures = 0;
for (const name of names) {
  const file = resolve(root, `${name}.html`);
  if (!existsSync(file)) { console.log("skip (no file)", name); continue; }
  for (const [vp, size] of Object.entries(VIEWPORTS)) {
    const page = await browser.newPage({ viewport: size, deviceScaleFactor: 1 });
    await page.goto(pathToFileURL(file).href, { waitUntil: "load" });
    await page.evaluate(() => document.fonts.ready);
    const fontsOk = await page.evaluate((checks) => checks.map((c) => [c, document.fonts.check(c)]), FONT_CHECKS);
    for (const [c, ok] of fontsOk) if (!ok) { console.log("FONT NOT LOADED:", c, "in", name, vp); failures++; }
    await page.screenshot({ path: resolve(out, `${name}-${vp}.png`), fullPage: true });
    console.log("wrote", `${name}-${vp}.png`);
    for (const state of CONCEPTS[name].states) {
      const el = page.locator(`#state-${state}`);
      if ((await el.count()) === 0) { console.log("MISSING STATE", name, state); failures++; continue; }
      await el.screenshot({ path: resolve(out, `${name}-${state}-${vp}.png`) });
      console.log("wrote", `${name}-${state}-${vp}.png`);
    }
    await page.close();
  }
}
await browser.close();
if (failures) { console.log(`FAILED checks: ${failures}`); process.exit(1); }
