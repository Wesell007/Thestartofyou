import TTCSubtopicPage from "@/components/ttc/TTCSubtopicPage";
import { ttcPageConfigs } from "@/data/ttcTopicData";
import hero from "@/assets/article-hero-implantation-bleeding.jpg";
const Page = () => <TTCSubtopicPage config={ttcPageConfigs["pregnancy-tests"]} heroImage={hero} />;
export default Page;
