import FamilyTopicPage from "@/components/family/topic/FamilyTopicPage";
import { familyTopics } from "@/data/familyTopicData";
import SeoHead from "@/components/seo/SeoHead";

export default function GrowingFamilies() {
  return (
    <>
      <SeoHead
        title="Growing families guidance | The Start of You"
        description="Support for preparing for another baby, helping siblings adjust and navigating change as your family grows."
        canonical="https://thestartofyou.com/family/growing-families"
      />
      <FamilyTopicPage config={familyTopics["growing-families"]} />
    </>
  );
}
