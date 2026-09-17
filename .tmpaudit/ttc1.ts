import { getAllArticles } from "../src/data/articleData";
const a: any[] = getAllArticles();
console.log("total", a.length);
const j: Record<string, number> = {};
for (const x of a) j[x.journey] = (j[x.journey]||0)+1;
console.log(j);
const ttc = a.filter(x => String(x.journey).includes("concei") || String(x.journey)==="ttc");
console.log("ttc", ttc.length);
console.log(JSON.stringify(ttc.map(x=>({slug:x.slug,topic:x.topic,title:x.title,src:(x.sources||[]).length,structured:(x.sources||[]).filter((s:any)=>typeof s!=="string").length,hero:!!(x.heroImage||x.image),qa:!!x.quickAnswer,secs:(x.editorialSections||[]).length,take:(x.keyTakeaways||[]).length,upd:x.lastUpdated})),null,0));
