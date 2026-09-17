import { ttcTopics } from "../src/data/ttcTopicData";
for(const [slug,t] of Object.entries<any>(ttcTopics as any)){
  const subs=(t.subtopics||[]).map((s:any)=>s.slug||s.title);
  const links=(t.articles||t.library||t.guidance||[]).map((a:any)=>a.slug||a.href||a.title);
  console.log(`## ${slug} :: ${t.title||""}`);
  console.log("  keys:", Object.keys(t).join(","));
  console.log("  subtopics:", JSON.stringify(subs));
  console.log("  library:", JSON.stringify(links));
}
