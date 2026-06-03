import TTCSubtopicPage from "@/components/ttc/TTCSubtopicPage";
import { ttcPageConfigs } from "@/data/ttcTopicData";
import hero from "@/assets/ttc-pregnancy-tests.jpg";
const Page = () => <TTCSubtopicPage config={ttcPageConfigs["pregnancy-tests"]} heroImage={hero} />;
export default Page;
