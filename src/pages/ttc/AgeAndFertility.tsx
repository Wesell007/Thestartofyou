import TTCTopicPage from "@/components/ttc/TTCTopicPage";
import { ttcPageConfigs } from "@/data/ttcTopicData";
import hero from "@/assets/topic-feelings-hero.jpg";
const Page = () => <TTCTopicPage config={ttcPageConfigs["age-and-fertility"]} heroImage={hero} />;
export default Page;
