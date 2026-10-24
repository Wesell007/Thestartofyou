// DESIGN-ONLY / NON-RUNTIME. Extracts still frames from a local MP4 with the repository's Playwright (Chromium),
// for critique and poster selection. Usage: node frames.mjs <video.mp4> <outdir> [t1,t2,...]
import { createRequire } from "node:module";
import { mkdirSync, writeFileSync } from "node:fs";
import { resolve, basename } from "node:path";
import { pathToFileURL } from "node:url";

const require = createRequire("C:/Users/Administrator/Desktop/Thestartofyou/package.json");
const { chromium } = require("playwright");

const [video, outdir, times = "0,2,4,6,8,9.8"] = process.argv.slice(2);
mkdirSync(outdir, { recursive: true });
const channel = process.env.BROWSER_CHANNEL || "msedge"; // open-source Chromium has no H.264; Edge/Chrome do
let browser; try { browser = await chromium.launch({ channel }); } catch (e) { console.log("channel", channel, "unavailable, falling back to chromium"); browser = await chromium.launch(); }
const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
if (/^https?:/.test(video)) await page.goto(new URL(video).origin + "/3b/", { waitUntil: "load" });
const src = /^https?:/.test(video) ? video : pathToFileURL(resolve(video)).href; // file:// is blocked from about:blank, so pass an http URL from the local review server
await page.setContent(`<video id="v" src="${src}" muted playsinline preload="auto" style="width:1280px;height:720px;display:block;background:#000"></video>`);
await page.waitForFunction(() => { const v = document.getElementById("v"); return v.readyState >= 2; }, null, { timeout: 60000 });
const meta = await page.evaluate(() => { const v = document.getElementById("v"); return { d: v.duration, w: v.videoWidth, h: v.videoHeight }; });
console.log(basename(video), "duration", meta.d.toFixed(2), "size", meta.w + "x" + meta.h);
// Seeking a paused <video> did not repaint in this environment, so play it and capture frames as playback passes each time.
const targets = times.split(",").map(Number).sort((a, b) => a - b);
await page.evaluate(() => document.getElementById("v").play());
for (const t of targets) {
  const tt = Math.min(t, meta.d - 0.1);
  await page.waitForFunction((tt) => document.getElementById("v").currentTime >= tt, tt, { timeout: 30000, polling: 20 });
  const file = resolve(outdir, `${basename(video.split("?")[0], ".mp4")}-t${String(tt).replace(".", "_")}.jpg`);
  await page.locator("#v").screenshot({ path: file, type: "jpeg", quality: 90 });
  console.log("wrote", file);
}
await browser.close();
