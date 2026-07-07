import FamilyTopicPage from "@/components/family/topic/FamilyTopicPage";
import { familyTopics } from "@/data/familyTopicData";
import SeoHead from "@/components/seo/SeoHead";

export default function HealthSafety() {
  return (
    <>
      <SeoHead
        title="Family health and safety guidance | The Start of You"
        description="Careful, practical guidance for safer homes, family sick days and knowing when to ask for help."
        canonical="https://thestartofyou.com/family/health-safety"
      />
      <FamilyTopicPage config={familyTopics["health-safety"]} />
    </>
  );
}
