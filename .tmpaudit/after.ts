import { getAllArticles } from "@/data/articleData";
import { ttcFlagshipOverrides } from "@/data/ttcFlagshipOverrides";
const all:any[]=getAllArticles() as any;
const ttc=all.filter(a=>JSON.stringify(a.journey??"").toLowerCase().includes("trying"));
const sets: Record<string, any[]> = {};
ttc.forEach(a=>{ if((a.sources||[]).length) sets[a.slug]=a.sources; });
Object.entries(ttcFlagshipOverrides as any).forEach(([slug,o]:any)=>{ if(o.sources && ttc.find(a=>a.slug===slug)) sets[slug]=o.sources; });
let full=0, partial=0, none=0;
Object.entries(sets).forEach(([slug,ss])=>{
  const st=ss.filter((s:any)=>typeof s==="object").length, lb=ss.filter((s:any)=>typeof s==="string").length;
  if(lb===0) full++; else if(st>0){partial++; console.log("PARTIAL",slug,st+"/"+ss.length);} else {none++; console.log("STILL LABEL-ONLY",slug);}
});
console.log("sets",Object.keys(sets).length,"fully structured",full,"mixed",partial,"still label-only",none);
