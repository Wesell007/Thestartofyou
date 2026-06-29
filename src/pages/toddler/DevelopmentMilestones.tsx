import ToddlerTopicPage from "@/components/toddler/topic/ToddlerTopicPage";
import { toddlerTopicConfigs } from "@/data/toddlerTopicData";

const DevelopmentMilestones = () => (
  <ToddlerTopicPage config={toddlerTopicConfigs["development-milestones"]} />
);

export default DevelopmentMilestones;
