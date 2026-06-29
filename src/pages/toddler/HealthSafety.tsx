import ToddlerTopicPage from "@/components/toddler/topic/ToddlerTopicPage";
import { toddlerTopicConfigs } from "@/data/toddlerTopicData";

const HealthSafety = () => (
  <ToddlerTopicPage config={toddlerTopicConfigs["health-safety"]} />
);

export default HealthSafety;
