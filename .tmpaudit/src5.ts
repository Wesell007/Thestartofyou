import { getAllArticles } from "@/data/articleData";
const all:any[]=getAllArticles() as any;
for(const s of ["irregular-periods-and-trying-to-conceive","how-long-to-try-before-getting-help"]){
  const a=all.find(x=>x.slug===s); const out:string[]=[];
  const walk=(o:any)=>{ if(typeof o==="string"){ if(/\d\d?\s?%|\b\d{1,3}\b/.test(o)&&o.length>40) out.push(o); } else if(o&&typeof o==="object") Object.values(o).forEach(walk); };
  walk(a); console.log("=== "+s); out.forEach(x=>console.log("  >",x.slice(0,300)));
}
