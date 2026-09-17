import { getAllArticles } from "../src/data/articleData";
import { heroImageMap, topicFallbackMap } from "../src/lib/articleHeroImage";
import { execSync } from "node:child_process";
const a: any[] = getAllArticles();
const ttc = a.filter(x => String(x.journey).includes("concei"));
const heroKeys = new Set(Object.keys(heroImageMap as any));
const rows = ttc.map(x => {
  const slug = x.slug;
  let inbound: string[] = [];
  try {
    const out = execSync(`rg -l --no-messages "articles/${slug}\\b" src scripts | grep -v articleData.ts || true`, {encoding:"utf8"});
    inbound = out.trim().split("\n").filter(Boolean);
  } catch {}
  const srcs = x.sources || [];
  return {
    slug,
    journey: x.journey,
    hero: heroKeys.has(slug),
    sources: srcs.length,
    structured: srcs.filter((s:any)=>typeof s!=="string").length,
    related: (x.relatedArticles||x.related||[]).length,
    inbound,
  };
});
console.log(JSON.stringify(rows, null, 0));
console.log("heroMapSize", heroKeys.size, "topicFallbacks", Object.keys(topicFallbackMap as any));
