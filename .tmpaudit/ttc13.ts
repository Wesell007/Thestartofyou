import { getAllArticles } from "../src/data/articleData";
const all=getAllArticles();
const ttc=all.filter((x:any)=>String(x.journey).includes("concei"));
const single=ttc.filter((x:any)=>(Array.isArray(x.journey)?x.journey.length:1)===1);
console.log("ttc",ttc.length,"single",single.length,"multi",ttc.length-single.length);
console.log("multi:",ttc.filter((x:any)=>x.journey.length>1).map((x:any)=>`${x.slug}[${x.journey}]`).join(", "));
const ivf=all.filter((x:any)=>String(x.journey).includes("ivf"));
console.log("ivf records",ivf.length,ivf.map((x:any)=>x.slug).join(", "));
