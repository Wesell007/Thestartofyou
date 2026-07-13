import TTCTopicPage from "@/components/ttc/TTCTopicPage";
import { ttcPageConfigs } from "@/data/ttcTopicData";
import SeoHead from "@/components/seo/SeoHead";
import hero from "@/assets/ttc-male-fertility.jpg";
const Page = () => (
  <>
    <SeoHead
      title="Male Fertility and Trying to Conceive | The Start of You"
      description="Practical guidance on sperm health, male fertility, testing, lifestyle basics and supporting both partners while trying to conceive."
      canonical="https://thestartofyou.com/trying-to-conceive/male-fertility"
    />
    <TTCTopicPage config={ttcPageConfigs["male-fertility"]} heroImage={hero} />
  </>
);
export default Page;
