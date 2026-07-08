import SeoHead from "@/components/seo/SeoHead";
import ToddlerTopicPage from "@/components/toddler/topic/ToddlerTopicPage";
import { toddlerTopicConfigs } from "@/data/toddlerTopicData";

const BehaviourEmotions = () => (
  <>
    <SeoHead
      title="Toddler Behaviour and Big Feelings | The Start of You"
      description="Calm guidance on toddler tantrums, big feelings, emotional development and supporting behaviour without shame or fear."
      canonical="https://thestartofyou.com/toddler/behaviour-emotions"
    />
    <ToddlerTopicPage config={toddlerTopicConfigs["behaviour-emotions"]} />
  </>
);

export default BehaviourEmotions;
