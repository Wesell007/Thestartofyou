import TTCTopicPage from "@/components/ttc/TTCTopicPage";
import { ttcPageConfigs } from "@/data/ttcTopicData";
import SeoHead from "@/components/seo/SeoHead";
import hero from "@/assets/ttc-ivf-treatment.jpg";
const Page = () => (
  <>
    <SeoHead
      title="Fertility Treatment and IVF When Trying to Conceive"
      description="Gentle guidance on fertility treatment, IVF, appointments, decisions and emotional support while trying to conceive."
      canonical="https://thestartofyou.com/trying-to-conceive/ivf-and-treatment"
    />
    <TTCTopicPage config={ttcPageConfigs["ivf-and-treatment"]} heroImage={hero} />
  </>
);
export default Page;
