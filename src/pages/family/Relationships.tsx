import FamilyTopicPage from "@/components/family/topic/FamilyTopicPage";
import { familyTopics } from "@/data/familyTopicData";

export default function Relationships() {
  return <FamilyTopicPage config={familyTopics["relationships"]} />;
}
