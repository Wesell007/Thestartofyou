import TTCTopicPage from "@/components/ttc/TTCTopicPage";
import { ttcPageConfigs } from "@/data/ttcTopicData";
import SeoHead from "@/components/seo/SeoHead";
import hero from "@/assets/ttc-fertility-hero.jpg";
const Page = () => (
  <>
    <SeoHead
      title="Fertility Support When Trying to Conceive | The Start of You"
      description="A calm fertility guide covering timing, cycle patterns, lifestyle basics, support and when to ask for help while trying to conceive."
      canonical="https://thestartofyou.com/trying-to-conceive/fertility"
    />
    <TTCTopicPage config={ttcPageConfigs["fertility"]} heroImage={hero} />
  </>
);
export default Page;
