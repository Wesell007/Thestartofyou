import TTCTopicPage from "@/components/ttc/TTCTopicPage";
import { ttcPageConfigs } from "@/data/ttcTopicData";
import hero from "@/assets/week2-ovulation.jpg";
const Page = () => <TTCTopicPage config={ttcPageConfigs["ovulation"]} heroImage={hero} />;
export default Page;
