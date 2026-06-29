import ToddlerTopicPage from "@/components/toddler/topic/ToddlerTopicPage";
import { toddlerTopicConfigs } from "@/data/toddlerTopicData";

const PottyLearning = () => (
  <ToddlerTopicPage config={toddlerTopicConfigs["potty-learning"]} />
);

export default PottyLearning;
