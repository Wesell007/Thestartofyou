import { getArticle } from "../src/data/articleData";
const slugs=["implantation-bleeding","trying-to-conceive-explained","signs-of-ovulation","two-week-wait","ovulation-signs","fertile-window","how-long-implantation-takes","when-to-take-a-pregnancy-test","faint-positive-pregnancy-test","chemical-pregnancy","trying-again-after-miscarriage","can-you-get-pregnant-on-your-period","how-long-to-try-before-getting-help","pcos-and-trying-to-conceive","endometriosis-and-trying-to-conceive","irregular-periods-and-trying-to-conceive","fertility-tests-for-women","fertility-tests-for-men","what-happens-at-a-fertility-appointment","amh-test-explained"];
const claim=/(\b\d+(\.\d+)?\s?(%|per cent|percent)\b)|(\b(around|about|roughly|up to|approximately|most|nearly)\s+\d+)|(\b\d+\s*(in|out of)\s*\d+\b)/gi;
for(const s of slugs){ const d:any=getArticle(s); if(!d){console.log(s,"MISSING");continue;}
 const text=JSON.stringify({q:d.quickAnswer,t:d.keyTakeaways,e:d.editorialSections,f:d.faq,st:d.standfirst,sec:d.sections,c:d.content});
 const m=[...new Set((text.match(claim)||[]))];
 console.log(`${s} | sources=${JSON.stringify(d.sources)} | claims=${m.length} ${JSON.stringify(m.slice(0,8))}`);
}
