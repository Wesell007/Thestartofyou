import { ttcPageConfigs } from "../src/data/ttcTopicData";
import { getAllArticles, getArticle } from "../src/data/articleData";
const map = new Map<string,string[]>();
let prompts=0;
for(const [slug,c] of Object.entries<any>(ttcPageConfigs)){
  prompts += (c.aiPrompts||[]).length;
  const hrefs:string[] = [...(c.startHere||[]).map((s:any)=>s.href), ...(c.groups||[]).flatMap((g:any)=>g.links.map((l:any)=>l.href))];
  for(const h of hrefs){ if(!map.has(h)) map.set(h,[]); map.get(h)!.push(slug); }
}
const ttc = getAllArticles().filter((x:any)=>String(x.journey).includes("concei"));
const rows = ttc.map((x:any)=>{ const d:any=getArticle(x.slug); const s=d.sources||[];
 return {slug:x.slug, topics:(map.get(`/articles/${x.slug}`)||[]).join("|")||"NONE",
  src: s.every((v:any)=>typeof v==="string")?"label-only":"structured",
  hero: d.hero?.src?"yes":"fallback", secs:(d.editorialSections||[]).length};});
console.log(rows.map(r=>`${r.slug} | ${r.topics} | ${r.src} | hero:${r.hero} | secs:${r.secs}`).join("\n"));
console.log("--- non-article destinations ---");
for(const [h,t] of map) if(!h.startsWith("/articles/")) console.log(h,"<-",t.join("|"));
console.log("aiPrompts total", prompts);
