import TTCTopicPage from "@/components/ttc/TTCTopicPage";
import { ttcPageConfigs } from "@/data/ttcTopicData";
import hero from "@/assets/topic-health-hero.jpg";
const Page = () => <TTCTopicPage config={ttcPageConfigs["ivf-and-treatment"]} heroImage={hero} />;
export default Page;
