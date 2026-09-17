import { getAllArticles, getArticle } from "../src/data/articleData";
const all = getAllArticles();
const ttc = all.filter((x:any)=>String(x.journey).includes("concei"));
let heroYes=0,heroNo:string[]=[], bodyYes=0, bodyNo:string[]=[];
for(const x of ttc){ const d:any=getArticle(x.slug);
  if(d.hero?.src) heroYes++; else heroNo.push(x.slug);
  const secs=d.editorialSections||[]; const imgs=secs.filter((s:any)=>s.image||s.imageSrc).length;
  if(imgs>0) bodyYes++; else bodyNo.push(`${x.slug}(${secs.length}sec)`);
}
console.log("heroExplicit",heroYes,"noExplicitHero",heroNo.length);
console.log(JSON.stringify(heroNo));
console.log("bodyImagery",bodyYes,"noBodyImagery",bodyNo.length);
console.log(JSON.stringify(bodyNo));
