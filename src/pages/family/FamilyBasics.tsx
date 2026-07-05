import FamilyTopicPage from "@/components/family/topic/FamilyTopicPage";
import { familyTopics } from "@/data/familyTopicData";

export default function FamilyBasics() {
  return <FamilyTopicPage config={familyTopics["family-basics"]} />;
}
