import TTCSubtopicPage from "@/components/ttc/TTCSubtopicPage";
import { ttcPageConfigs } from "@/data/ttcTopicData";
import SeoHead from "@/components/seo/SeoHead";
import hero from "@/assets/ttc-pregnancy-tests.jpg";
const Page = () => (
  <>
    <SeoHead
      title="Pregnancy Tests and Early Results | The Start of You"
      description="Calm guidance on pregnancy tests, early results, faint lines, timing and what to do when the answer is not clear yet."
      canonical="https://thestartofyou.com/trying-to-conceive/pregnancy-tests"
    />
    <TTCSubtopicPage config={ttcPageConfigs["pregnancy-tests"]} heroImage={hero} />
  </>
);
export default Page;
