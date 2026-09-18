import { getAllArticles } from "@/data/articleData";
const all: any[] = getAllArticles() as any;
const ttc = all.filter((a:any)=>JSON.stringify(a.journey ?? a.journeys ?? "").toLowerCase().includes("trying"));
const anyString = ttc.filter((a)=> (a.sources||[]).some((s:any)=>typeof s==="string"));
const allString = ttc.filter((a)=> (a.sources||[]).length && (a.sources||[]).every((s:any)=>typeof s==="string"));
const none = ttc.filter((a)=>!(a.sources||[]).length);
console.log("ttc",ttc.length,"anyString",anyString.length,"allString",allString.length,"noSources",none.length);
console.log("ANY:", anyString.map(a=>a.slug).join("\n  "));
console.log("NONE:", none.map(a=>a.slug).join(", "));
