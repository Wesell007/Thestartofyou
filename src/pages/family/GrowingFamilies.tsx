import FamilyTopicPage from "@/components/family/topic/FamilyTopicPage";
import { familyTopics } from "@/data/familyTopicData";

export default function GrowingFamilies() {
  return <FamilyTopicPage config={familyTopics["growing-families"]} />;
}
