import TTCSubtopicPage from "@/components/ttc/TTCSubtopicPage";
import { ttcPageConfigs } from "@/data/ttcTopicData";
import SeoHead from "@/components/seo/SeoHead";
import hero from "@/assets/ttc-stage-waiting.jpg";
const Page = () => (
  <>
    <SeoHead
      title="Two-Week Wait Guide | Symptoms, Testing and Support"
      description="Supportive guidance for the two-week wait, including symptoms, testing timing, uncertainty and looking after yourself while you wait."
      canonical="https://thestartofyou.com/trying-to-conceive/two-week-wait"
    />
    <TTCSubtopicPage config={ttcPageConfigs["two-week-wait"]} heroImage={hero} />
  </>
);
export default Page;
