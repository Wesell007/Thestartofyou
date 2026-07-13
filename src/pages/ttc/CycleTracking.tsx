import TTCSubtopicPage from "@/components/ttc/TTCSubtopicPage";
import { ttcPageConfigs } from "@/data/ttcTopicData";
import SeoHead from "@/components/seo/SeoHead";
import hero from "@/assets/ttc-stage-cycle.jpg";
const Page = () => (
  <>
    <SeoHead
      title="Cycle Tracking When Trying to Conceive | The Start of You"
      description="Practical support for tracking your cycle, understanding patterns, noticing fertile signs and using tracking without pressure."
      canonical="https://thestartofyou.com/trying-to-conceive/cycle-tracking"
    />
    <TTCSubtopicPage config={ttcPageConfigs["cycle-tracking"]} heroImage={hero} />
  </>
);
export default Page;
