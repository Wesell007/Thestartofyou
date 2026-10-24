// DESIGN-ONLY / NON-RUNTIME. Renders the Step 3B prototypes (../3b/*.html) with the repository's Playwright and writes
// PNG review captures to ../3b/review/. Uses the Edge channel when available so the H.264 hero draft decodes; falls back
// to open-source Chromium (poster shown instead of video). Touches no application code.
// Usage: node screenshot-3b.mjs [my-week companion homepage]
import { createRequire } from "node:module";
import { mkdirSync, existsSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const require = createRequire("C:/Users/Administrator/Desktop/Thestartofyou/package.json");
const { chromium } = require("playwright");

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..", "3b");
const out = resolve(root, "review");
mkdirSync(out, { recursive: true });
const BASE = process.env.BASE_URL || "http://127.0.0.1:4310/3b/";

// Fixed name map. Each capture: file name -> page (with query/hash) and optional element selector.
const CAPTURES = {
  "my-week": [
    { name: "my-week-12", url: "my-week.html#week-12" },
    { name: "my-week-8", url: "my-week.html#week-8", el: "main" },
    { name: "my-week-20", url: "my-week.html#week-20", el: "main" },
    { name: "my-week-30", url: "my-week.html#week-30", el: "main" },
    { name: "my-week-40", url: "my-week.html#week-40", el: "main" },
    { name: "my-week-growth-sheet", url: "my-week.html#week-12", el: "#growth-system" },
    { name: "my-week-plate-8", url: "my-week.html#week-8", el: ".plate" },
    { name: "my-week-plate-12", url: "my-week.html#week-12", el: ".plate" },
    { name: "my-week-plate-20", url: "my-week.html#week-20", el: ".plate" },
    { name: "my-week-plate-30", url: "my-week.html#week-30", el: ".plate" },
    { name: "my-week-plate-40", url: "my-week.html#week-40", el: ".plate" },
  ],
  companion: [
    { name: "companion-answer", url: "companion.html", el: "#state-answer" },
    { name: "companion-not-found", url: "companion.html", el: "#state-not-found" },
    { name: "companion-seek-help", url: "companion.html", el: "#state-seek-help" },
    { name: "companion-owner-cue", url: "companion.html", el: "#state-owner-cue" },
    { name: "companion", url: "companion.html" },
  ],
  homepage: [
    { name: "homepage", url: "homepage.html" },
    { name: "homepage-hero", url: "homepage.html", el: "#hero" },
    { name: "homepage-hero-poster", url: "homepage.html?poster=1", el: "#hero" },
    { name: "homepage-hero-h2", url: "homepage.html?h=2", el: "#hero" },
    { name: "homepage-hero-h3", url: "homepage.html?h=3", el: "#hero" },
  ],
};
const VIEWPORTS = { desktop: { width: 1440, height: 900 }, mobile: { width: 390, height: 844 } };
const FONT_CHECKS = ['300 1em "TSOY Display"', '400 1em "TSOY UI"', '400 1em "TSOY Read"'];

const wanted = process.argv.slice(2);
const names = Object.keys(CAPTURES).filter((n) => wanted.length === 0 || wanted.includes(n));
const channel = process.env.BROWSER_CHANNEL || "msedge";
let browser; try { browser = await chromium.launch({ channel }); } catch { console.log("channel", channel, "unavailable, using chromium"); browser = await chromium.launch(); }
let failures = 0;
for (const name of names) {
  if (!existsSync(resolve(root, `${name}.html`))) { console.log("skip (no file)", name); continue; }
  for (const [vp, size] of Object.entries(VIEWPORTS)) {
    for (const cap of CAPTURES[name]) {
      const page = await browser.newPage({ viewport: size, deviceScaleFactor: 1 });
      await page.goto(BASE + cap.url, { waitUntil: "load" });
      await page.evaluate(() => document.fonts.ready);
      const fontsOk = await page.evaluate((checks) => checks.map((c) => [c, document.fonts.check(c)]), FONT_CHECKS);
      for (const [c, ok] of fontsOk) if (!ok) { console.log("FONT NOT LOADED:", c, "in", cap.name, vp); failures++; }
      await page.waitForTimeout(600); // let the hero video reach its first frame and the fade-swap settle
      const file = resolve(out, `${cap.name}-${vp}.png`);
      if (cap.el) {
        const el = page.locator(cap.el).first();
        if ((await el.count()) === 0) { console.log("MISSING", cap.name, cap.el); failures++; await page.close(); continue; }
        await el.screenshot({ path: file });
      } else {
        await page.screenshot({ path: file, fullPage: true });
      }
      console.log("wrote", `${cap.name}-${vp}.png`);
      await page.close();
    }
  }
}
await browser.close();
if (failures) { console.log(`FAILED checks: ${failures}`); process.exit(1); }
