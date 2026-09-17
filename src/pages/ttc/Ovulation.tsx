import TTCTopicPage from "@/components/ttc/TTCTopicPage";
import { ttcPageConfigs } from "@/data/ttcTopicData";
import SeoHead from "@/components/seo/SeoHead";
import hero from "@/assets/week2-ovulation.jpg";
const Page = () => (
  <>
    <SeoHead
      title="Ovulation and Fertile Window Guide | The Start of You"
      description="Understand ovulation, fertile windows, ovulation signs and cycle timing with calm guidance for trying to conceive."
      canonical="https://thestartofyou.com/trying-to-conceive/ovulation"
    />
    <TTCTopicPage config={ttcPageConfigs["ovulation"]} heroImage={hero} editorialClarity />
  </>
);
export default Page;
