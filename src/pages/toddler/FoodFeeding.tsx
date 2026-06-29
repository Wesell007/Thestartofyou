import ToddlerTopicPage from "@/components/toddler/topic/ToddlerTopicPage";
import { toddlerTopicConfigs } from "@/data/toddlerTopicData";

const FoodFeeding = () => (
  <ToddlerTopicPage config={toddlerTopicConfigs["food-feeding"]} />
);

export default FoodFeeding;
