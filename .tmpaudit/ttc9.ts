import { ttcTopics } from "../src/data/ttcTopicData";
for(const t of (ttcTopics as any[])){
  console.log(`## ${t.slug} [${t.kind}] ${t.label} -> ${t.mainHref}`);
  for(const s of (t.articles||[])){
    console.log(`   - ${s.title||s.label} :: ${s.href} ${s.kind?`(${s.kind})`:""}`);
  }
}
