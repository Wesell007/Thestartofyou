import TTCSubtopicPage from "@/components/ttc/TTCSubtopicPage";
import { ttcPageConfigs } from "@/data/ttcTopicData";
import hero from "@/assets/ttc-stage-cycle.jpg";
const Page = () => <TTCSubtopicPage config={ttcPageConfigs["cycle-tracking"]} heroImage={hero} />;
export default Page;
