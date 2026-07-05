import FamilyTopicPage from "@/components/family/topic/FamilyTopicPage";
import { familyTopics } from "@/data/familyTopicData";

export default function HealthSafety() {
  return <FamilyTopicPage config={familyTopics["health-safety"]} />;
}
