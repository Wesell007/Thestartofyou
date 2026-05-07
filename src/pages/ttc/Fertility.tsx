import TTCTopicPage from "@/components/ttc/TTCTopicPage";
import { ttcPageConfigs } from "@/data/ttcTopicData";
import hero from "@/assets/ttc-journey.jpg";
const Page = () => <TTCTopicPage config={ttcPageConfigs["fertility"]} heroImage={hero} />;
export default Page;
