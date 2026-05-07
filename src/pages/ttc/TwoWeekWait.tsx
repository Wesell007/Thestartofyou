import TTCSubtopicPage from "@/components/ttc/TTCSubtopicPage";
import { ttcPageConfigs } from "@/data/ttcTopicData";
import hero from "@/assets/ttc-stage-waiting.jpg";
const Page = () => <TTCSubtopicPage config={ttcPageConfigs["two-week-wait"]} heroImage={hero} />;
export default Page;
