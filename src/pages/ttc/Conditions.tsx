import TTCSubtopicPage from "@/components/ttc/TTCSubtopicPage";
import { ttcPageConfigs } from "@/data/ttcTopicData";
import SeoHead from "@/components/seo/SeoHead";
import hero from "@/assets/ttc-conditions.jpg";
const Page = () => (
  <>
    <SeoHead
      title="Fertility Conditions and Trying to Conceive | The Start of You"
      description="Calm guidance on health conditions, cycle changes and fertility concerns that may affect trying to conceive, with support on when to ask for advice."
      canonical="https://thestartofyou.com/trying-to-conceive/conditions"
    />
    <TTCSubtopicPage config={ttcPageConfigs["conditions"]} heroImage={hero} />
  </>
);
export default Page;
