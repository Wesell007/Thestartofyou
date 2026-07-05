import FamilyTopicPage from "@/components/family/topic/FamilyTopicPage";
import { familyTopics } from "@/data/familyTopicData";

export default function PlayConnection() {
  return <FamilyTopicPage config={familyTopics["play-connection"]} />;
}
