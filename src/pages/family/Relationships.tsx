import FamilyTopicPage from "@/components/family/topic/FamilyTopicPage";
import { familyTopics } from "@/data/familyTopicData";
import SeoHead from "@/components/seo/SeoHead";

export default function Relationships() {
  return (
    <>
      <SeoHead
        title="Family relationships guidance | The Start of You"
        description="Calm guidance for sharing family life, setting boundaries and staying connected through everyday parenthood."
        canonical="https://thestartofyou.com/family/relationships"
      />
      <FamilyTopicPage config={familyTopics["relationships"]} />
    </>
  );
}
