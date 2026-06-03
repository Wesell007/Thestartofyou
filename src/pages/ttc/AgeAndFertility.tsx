import TTCTopicPage from "@/components/ttc/TTCTopicPage";
import { ttcPageConfigs } from "@/data/ttcTopicData";
import hero from "@/assets/ttc-age-and-fertility.jpg";
const Page = () => <TTCTopicPage config={ttcPageConfigs["age-and-fertility"]} heroImage={hero} />;
export default Page;
