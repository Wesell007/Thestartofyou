import SeoHead from "@/components/seo/SeoHead";
import ToddlerTopicPage from "@/components/toddler/topic/ToddlerTopicPage";
import { toddlerTopicConfigs } from "@/data/toddlerTopicData";

const DevelopmentMilestones = () => (
  <>
    <SeoHead
      title="Toddler Development and Milestones | The Start of You"
      description="A reassuring guide to toddler development, milestones, movement, communication, play and what to do when progress feels different."
      canonical="https://thestartofyou.com/toddler/development-milestones"
    />
    <ToddlerTopicPage config={toddlerTopicConfigs["development-milestones"]} />
  </>
);

export default DevelopmentMilestones;
