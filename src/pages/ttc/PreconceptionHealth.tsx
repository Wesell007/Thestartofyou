import TTCTopicPage from "@/components/ttc/TTCTopicPage";
import { ttcPageConfigs } from "@/data/ttcTopicData";
import hero from "@/assets/ttc-preconception-health.jpg";
const Page = () => <TTCTopicPage config={ttcPageConfigs["preconception-health"]} heroImage={hero} />;
export default Page;
