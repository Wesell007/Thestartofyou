import FamilyTopicPage from "@/components/family/topic/FamilyTopicPage";
import { familyTopics } from "@/data/familyTopicData";
import SeoHead from "@/components/seo/SeoHead";

export default function PlayConnection() {
  return (
    <>
      <SeoHead
        title="Family play and connection guidance | The Start of You"
        description="Warm ideas for family play, traditions, screen time and everyday connection."
        canonical="https://thestartofyou.com/family/play-connection"
      />
      <FamilyTopicPage config={familyTopics["play-connection"]} />
    </>
  );
}
