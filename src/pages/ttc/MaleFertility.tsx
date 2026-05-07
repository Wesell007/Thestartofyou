import TTCTopicPage from "@/components/ttc/TTCTopicPage";
import { ttcPageConfigs } from "@/data/ttcTopicData";
import hero from "@/assets/topic-body-hero.jpg";
const Page = () => <TTCTopicPage config={ttcPageConfigs["male-fertility"]} heroImage={hero} />;
export default Page;
