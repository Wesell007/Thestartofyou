import TTCTopicPage from "@/components/ttc/TTCTopicPage";
import { ttcPageConfigs } from "@/data/ttcTopicData";
import SeoHead from "@/components/seo/SeoHead";
import hero from "@/assets/ttc-age-and-fertility.jpg";
const Page = () => (
  <>
    <SeoHead
      title="Age and Fertility | Trying to Conceive Guide"
      description="Supportive guidance on age, fertility, egg quality, timing and knowing when to ask for advice while trying to conceive."
      canonical="https://thestartofyou.com/trying-to-conceive/age-and-fertility"
    />
    <TTCTopicPage config={ttcPageConfigs["age-and-fertility"]} heroImage={hero} />
  </>
);
export default Page;
