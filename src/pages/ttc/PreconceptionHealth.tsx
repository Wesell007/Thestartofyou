import TTCTopicPage from "@/components/ttc/TTCTopicPage";
import { ttcPageConfigs } from "@/data/ttcTopicData";
import SeoHead from "@/components/seo/SeoHead";
import hero from "@/assets/ttc-preconception-health.jpg";
const Page = () => (
  <>
    <SeoHead
      title="Preconception Health | Preparing to Try for a Baby"
      description="Practical preconception guidance on health, folic acid, appointments, lifestyle basics and preparing your body before pregnancy."
      canonical="https://thestartofyou.com/trying-to-conceive/preconception-health"
    />
    <TTCTopicPage config={ttcPageConfigs["preconception-health"]} heroImage={hero} editorialClarity />
  </>
);
export default Page;
