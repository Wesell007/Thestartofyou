import { getAllArticles,getArticle } from "../src/data/articleData";
const ttc=getAllArticles().filter((x:any)=>String(x.journey).includes("concei"));
for(const a of ttc){ const d:any=getArticle(a.slug); const t=JSON.stringify(d);
 const hits=[...new Set((t.match(/\/(pregnancy[a-z0-9\-\/]*|due-date[a-z\-]*|articles\/first-trimester[a-z\-]*)/g)||[]))];
 const rel=(d.relatedSlugs||[]).filter((s:string)=>{const r:any=getArticle(s);return r&&String(r.journey).includes("pregnancy");});
 if(hits.length||rel.length) console.log(a.slug,"| links:",JSON.stringify(hits),"| relatedPregnancy:",JSON.stringify(rel));
}
