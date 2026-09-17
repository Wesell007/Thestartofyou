import { getArticle } from "../src/data/articleData";
import { readFileSync } from "node:fs";
import { execSync } from "node:child_process";
// collect all internal hrefs appearing in TTC surfaces
const files = execSync(`rg -l "" src/components/ttc src/pages/TTCHub.tsx src/pages/ttc src/data/ttcTopicData.ts src/data/ttcFlagshipOverrides.ts src/data/ttcStageData.ts 2>/dev/null || true`,{encoding:"utf8"}).trim().split("\n").filter(Boolean);
const routes = new Set<string>();
const app = readFileSync("src/App.tsx","utf8");
for(const m of app.matchAll(/path="([^"]+)"/g)) routes.add(m[1]);
const links = new Map<string,Set<string>>();
for(const f of files){ const s=readFileSync(f,"utf8");
  for(const m of s.matchAll(/"(\/[a-z0-9\-\/]+)"/g)){ const h=m[1];
    if(!links.has(h)) links.set(h,new Set()); links.get(h)!.add(f); } }
const bad:string[]=[];
const ok:string[]=[];
for(const [h,fs] of links){
  if(h.startsWith("/articles/")){ const slug=h.slice(10); (getArticle(slug)?ok:bad).push(`${h} <- ${[...fs].join(",")}`); continue; }
  let matched = routes.has(h);
  if(!matched){ // dynamic patterns
    const seg=h.split("/").filter(Boolean);
    for(const r of routes){ const rs=r.split("/").filter(Boolean); if(rs.length!==seg.length) continue;
      if(rs.every((p,i)=>p.startsWith(":")||p===seg[i])) { matched=true; break; } } }
  (matched?ok:bad).push(`${h} <- ${[...fs].join(",")}`);
}
console.log("files scanned",files.length,"distinct internal links",links.size,"resolving",ok.length,"unresolved",bad.length);
console.log(bad.join("\n"));
