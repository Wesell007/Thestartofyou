import { getAllArticles, getArticle } from "../src/data/articleData";
const ttc = getAllArticles().filter((x:any)=>String(x.journey).includes("concei"));
const none:string[]=[], stringOnly:string[]=[], mixed:string[]=[];
for(const x of ttc){ const d:any=getArticle(x.slug); const s=d.sources||[];
  if(!s.length) none.push(x.slug);
  else if(s.every((v:any)=>typeof v==="string")) stringOnly.push(x.slug);
  else if(s.some((v:any)=>typeof v==="string")) mixed.push(x.slug);
}
console.log("noSources",none.length,JSON.stringify(none));
console.log("stringOnly",stringOnly.length,JSON.stringify(stringOnly));
console.log("mixed",mixed.length,JSON.stringify(mixed));
