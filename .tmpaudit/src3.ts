import { getAllArticles } from "@/data/articleData";
import { ttcFlagshipOverrides } from "@/data/ttcFlagshipOverrides";
const all: any[] = getAllArticles() as any;
const structured = new Map<string,{label:string;publisher?:string;year?:string|number;url:string}>();
all.forEach((a)=>(a.sources||[]).forEach((s:any)=>{ if(typeof s==="object") structured.set(`${(s.publisher||"").toLowerCase()}||${s.label.toLowerCase()}`, s); }));
const labelSets: Record<string,string[]> = {};
all.forEach((a)=>{ const ss=(a.sources||[]).filter((s:any)=>typeof s==="string"); if(ss.length && JSON.stringify(a.journey??a.journeys??"").toLowerCase().includes("trying")) labelSets[a.slug]=ss; });
Object.entries(ttcFlagshipOverrides as any).forEach(([slug,o]: any)=>{ if(o.sources) labelSets[slug]=o.sources.filter((s:any)=>typeof s==="string"); });
const distinct = new Set<string>();
Object.values(labelSets).forEach(ss=>ss.forEach(s=>distinct.add(s)));
console.log("articles", Object.keys(labelSets).length, "distinct strings", distinct.size);
const split = (s:string)=>{ const m=s.split(/\s+[—–-]\s+|:\s+/); return m.length>1? {pub:m[0].trim(), title:m.slice(1).join(" — ").trim()} : {pub:"", title:s.trim()}; };
[...distinct].sort().forEach(s=>{
  const {pub,title}=split(s);
  const hit = structured.get(`${pub.toLowerCase()}||${title.toLowerCase()}`);
  console.log((hit?"MATCH  ":"NOMATCH")+" | "+s+" | "+(hit? hit.url : `pub=${pub} title=${title}`));
});
console.log("\n--- per article ---");
Object.entries(labelSets).forEach(([k,v])=>console.log(k, JSON.stringify(v)));
