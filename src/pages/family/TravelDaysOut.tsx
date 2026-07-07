import FamilyTopicPage from "@/components/family/topic/FamilyTopicPage";
import { familyTopics } from "@/data/familyTopicData";
import SeoHead from "@/components/seo/SeoHead";

export default function TravelDaysOut() {
  return (
    <>
      <SeoHead
        title="Family travel and days out guidance | The Start of You"
        description="Simple guidance for travelling with children, calmer car journeys and planning family days out without overdoing it."
        canonical="https://thestartofyou.com/family/travel-days-out"
      />
      <FamilyTopicPage config={familyTopics["travel-days-out"]} />
    </>
  );
}
