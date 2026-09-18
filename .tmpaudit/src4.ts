import { getAllArticles } from "@/data/articleData";
import { ttcFlagshipOverrides } from "@/data/ttcFlagshipOverrides";
const slugs=["implantation-bleeding","how-long-implantation-takes","trying-to-conceive-explained","fertile-window","irregular-periods-and-trying-to-conceive","faint-positive-pregnancy-test","how-long-to-try-before-getting-help","fertility-tests-for-men"];
const all:any[]=getAllArticles() as any;
const re=/(around 6|about 12|about 48|About 80%|about 80%|roughly 10)/;
for(const s of slugs){
  const a=all.find(x=>x.slug===s);
  const blobs:string[]=[];
  const walk=(o:any)=>{ if(typeof o==="string"){ if(re.test(o)) blobs.push(o); } else if(o&&typeof o==="object") Object.values(o).forEach(walk); };
  walk(a); walk((ttcFlagshipOverrides as any)[s]);
  console.log("=== "+s);
  blobs.forEach(b=>console.log("   >",b));
}
