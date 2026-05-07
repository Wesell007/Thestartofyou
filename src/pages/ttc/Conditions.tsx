import TTCSubtopicPage from "@/components/ttc/TTCSubtopicPage";
import { ttcPageConfigs } from "@/data/ttcTopicData";
import hero from "@/assets/topic-health-hero.jpg";
const Page = () => <TTCSubtopicPage config={ttcPageConfigs["conditions"]} heroImage={hero} />;
export default Page;
