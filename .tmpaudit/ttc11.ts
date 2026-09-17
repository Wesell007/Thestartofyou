import { getAllArticles, getArticle } from "../src/data/articleData";
const all=getAllArticles();
const inbound=new Map<string,string[]>();
for(const a of all){ const d:any=getArticle(a.slug); for(const r of (d.relatedSlugs||[])){ if(!inbound.has(r))inbound.set(r,[]); inbound.get(r)!.push(a.slug);} }
for(const s of ["trying-to-conceive-explained","signs-of-ovulation","how-long-implantation-takes","chemical-pregnancy","can-you-get-pregnant-on-your-period","hcg-levels-explained","implantation-bleeding","fertile-window","two-week-wait"]){
  const d:any=getArticle(s); console.log(s,"| relatedOut:",JSON.stringify(d?.relatedSlugs||[]),"| relatedIn:",JSON.stringify(inbound.get(s)||[]));
}
const ttc=all.filter((x:any)=>String(x.journey).includes("concei"));
console.log("ttc with no relatedSlugs:",ttc.filter((x:any)=>!(getArticle(x.slug) as any)?.relatedSlugs?.length).map(x=>x.slug).join(","));
