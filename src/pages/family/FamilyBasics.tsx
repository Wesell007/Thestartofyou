import FamilyTopicPage from "@/components/family/topic/FamilyTopicPage";
import { familyTopics } from "@/data/familyTopicData";
import SeoHead from "@/components/seo/SeoHead";

export default function FamilyBasics() {
  return (
    <>
      <SeoHead
        title="Family routines and practical planning | The Start of You"
        description="Practical support for family routines, childcare planning and calmer everyday home life."
        canonical="https://thestartofyou.com/family/family-basics"
      />
      <FamilyTopicPage config={familyTopics["family-basics"]} />
    </>
  );
}
