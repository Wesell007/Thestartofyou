// Runs before `vite dev` and `vite build` (predev/prebuild hooks); writes public/sitemap.xml.
//
// Reads route data straight from src/data/*.ts as text (regex extraction) so
// the generator has no dependency on Vite path aliases at runtime. This keeps
// it reliable under `bunx tsx` without a tsconfig-paths shim.

import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const BASE_URL = "https://thestartofyou.com";

// ── Static route groups ────────────────────────────────────────────────
const core = ["/", "/about", "/support", "/product", "/preparing-for-baby"];

const pregnancyStatic = [
  "/pregnancy",
  "/pregnancy/baby",
  "/pregnancy/body",
  "/pregnancy/diet-and-exercise",
  "/pregnancy/feelings",
  "/pregnancy/health-and-safety",
  "/pregnancy/preparing-for-baby",
  "/pregnancy/first-trimester",
  "/pregnancy/second-trimester",
  "/pregnancy/third-trimester",
];
const pregnancyWeeks = Array.from({ length: 42 }, (_, i) => `/pregnancy/week/${i + 1}`);

const ttc = [
  "/trying-to-conceive",
  "/trying-to-conceive/age-and-fertility",
  "/trying-to-conceive/conditions",
  "/trying-to-conceive/cycle-tracking",
  "/trying-to-conceive/fertility",
  "/trying-to-conceive/ivf-and-treatment",
  "/trying-to-conceive/male-fertility",
  "/trying-to-conceive/ovulation",
  "/trying-to-conceive/preconception-health",
  "/trying-to-conceive/pregnancy-tests",
  "/trying-to-conceive/two-week-wait",
  // TTC StagePage routes (Phase 9.10 SEO allowlist).
  "/trying-to-conceive/understanding-your-cycle",
  "/trying-to-conceive/timing-and-tracking",
  "/trying-to-conceive/waiting-and-testing",
];

const ivf = [
  "/ivf",
  "/ivf/before-transfer",
  "/ivf/after-transfer",
  "/ivf/early-pregnancy",
];

// /ivf-timeline is listed here as the single canonical mount (also conceptually a tool).
const tools = ["/due-date-calculator", "/ovulation-calculator", "/ivf-timeline"];

const familyStatic = [
  "/family",
  "/family/growing-families",
  "/family/relationships",
  "/family/family-basics",
  "/family/health-safety",
  "/family/travel-days-out",
  "/family/play-connection",
];

const firstYearStatic = [
  "/first-year",
  "/first-year/0-3-months",
  "/first-year/3-6-months",
  "/first-year/6-9-months",
  "/first-year/9-12-months",
  "/first-year/feeding",
  "/first-year/sleep",
  "/first-year/development",
  "/first-year/care-and-safety",
  "/first-year/postpartum-recovery",
  "/first-year/emotional-wellbeing",
  "/first-year/body-and-hormones",
  "/first-year/checkups-and-warning-signs",
];

const toddlerStatic = [
  "/toddler",
  "/toddler/development-milestones",
  "/toddler/behaviour-emotions",
  "/toddler/speech-language",
  "/toddler/sleep",
  "/toddler/food-feeding",
  "/toddler/potty-learning",
  "/toddler/health-safety",
  "/toddler/play-connection",
  "/toddler/12-17-months",
  "/toddler/18-23-months",
  "/toddler/2-years",
  "/toddler/30-months",
  "/toddler/3-years",
];

// ── Dynamic extraction from data files ─────────────────────────────────
const readSrc = (p: string) => readFileSync(resolve(p), "utf8");

// Legacy articles: every top-level `slug: "..."` in articleData.ts.
function extractLegacyArticleSlugs(): string[] {
  const src = readSrc("src/data/articleData.ts");
  const slugs = [...src.matchAll(/^\s*slug:\s*"([^"]+)"/gm)].map((m) => m[1]);
  return Array.from(new Set(slugs));
}

// Hub articles: each object literal that contains slug + status. Only
// entries with status === "ready" are emitted.
function extractHubArticles(file: string): Array<{ slug: string; topic: string }> {
  const src = readSrc(file);
  const re = /\{\s*slug:\s*"([^"]+)"[\s\S]*?status:\s*"(ready|draft)"/g;
  const out: Array<{ slug: string; topic: string }> = [];
  for (const m of src.matchAll(re)) {
    const [chunk, slug, status] = [m[0], m[1], m[2]];
    if (status !== "ready") continue;
    const topicMatch = chunk.match(/topic:\s*"([^"]+)"/);
    if (!topicMatch) continue;
    out.push({ slug, topic: topicMatch[1] });
  }
  return out;
}

// Redirected legacy slugs — excluded so only the canonical article is indexed.
const legacyArticleRedirects = new Set(["signs-of-ovulation"]);
const legacyArticleUrls = extractLegacyArticleSlugs()
  .filter((s) => !legacyArticleRedirects.has(s))
  .map((s) => `/articles/${s}`);
const familyArticleUrls = extractHubArticles("src/data/familyArticleData.ts").map(
  (a) => `/family/${a.topic}/${a.slug}`,
);
const firstYearArticleUrls = extractHubArticles("src/data/firstYearArticleData.ts").map(
  (a) => `/first-year/${a.topic}/${a.slug}`,
);
const toddlerArticleUrls = extractHubArticles("src/data/toddlerArticleData.ts").map(
  (a) => `/toddler/${a.topic}/${a.slug}`,
);

// ── Assembly ───────────────────────────────────────────────────────────
const ordered = [
  ...core,
  ...pregnancyStatic,
  ...pregnancyWeeks,
  ...ttc,
  ...ivf,
  ...tools,
  ...familyStatic,
  ...familyArticleUrls,
  ...firstYearStatic,
  ...firstYearArticleUrls,
  ...toddlerStatic,
  ...toddlerArticleUrls,
  ...legacyArticleUrls,
];

const seen = new Set<string>();
const entries: string[] = [];
for (const path of ordered) {
  if (path.includes("?")) throw new Error(`Sitemap must not contain query strings: ${path}`);
  if (!path.startsWith("/")) throw new Error(`Sitemap entry must start with '/': ${path}`);
  if (seen.has(path)) continue;
  seen.add(path);
  entries.push(path);
}

const xml = [
  `<?xml version="1.0" encoding="UTF-8"?>`,
  `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
  ...entries.map((p) => `  <url><loc>${BASE_URL}${p}</loc></url>`),
  `</urlset>`,
  ``,
].join("\n");

writeFileSync(resolve("public/sitemap.xml"), xml);

console.log(
  `sitemap.xml written (${entries.length} entries): core=${core.length} pregnancy=${
    pregnancyStatic.length + pregnancyWeeks.length
  } ttc=${ttc.length} ivf=${ivf.length} tools=${tools.length} family=${
    familyStatic.length + familyArticleUrls.length
  } firstYear=${firstYearStatic.length + firstYearArticleUrls.length} toddler=${
    toddlerStatic.length + toddlerArticleUrls.length
  } legacyArticles=${legacyArticleUrls.length}`,
);
