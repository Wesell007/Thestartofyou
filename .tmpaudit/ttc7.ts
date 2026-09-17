import { getAllArticles } from "../src/data/articleData";
import { readFileSync } from "node:fs";
const sm = readFileSync("public/sitemap.xml","utf8");
const ttc = getAllArticles().filter((x:any)=>String(x.journey).includes("concei"));
const missing = ttc.filter(x=>!sm.includes(`/articles/${x.slug}<`)).map(x=>x.slug);
console.log("ttc",ttc.length,"inSitemap",ttc.length-missing.length,"missing",missing.length,JSON.stringify(missing));
const ttcRoutes=[...sm.matchAll(/<loc>[^<]*?(\/trying-to-conceive[^<]*|\/ivf[^<]*|\/ovulation-calculator)<\/loc>/g)].map(m=>m[1]);
console.log("ttc/ivf routes in sitemap",JSON.stringify(ttcRoutes));
