import FamilyTopicPage from "@/components/family/topic/FamilyTopicPage";
import { familyTopics } from "@/data/familyTopicData";

export default function TravelDaysOut() {
  return <FamilyTopicPage config={familyTopics["travel-days-out"]} />;
}
