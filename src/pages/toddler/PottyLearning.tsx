import SeoHead from "@/components/seo/SeoHead";
import ToddlerTopicPage from "@/components/toddler/topic/ToddlerTopicPage";
import { toddlerTopicConfigs } from "@/data/toddlerTopicData";

const PottyLearning = () => (
  <>
    <SeoHead
      title="Potty Training and Toilet Learning | The Start of You"
      description="Calm, practical support for potty training signs, toilet learning, accidents and building confidence without pressure."
      canonical="https://thestartofyou.com/toddler/potty-learning"
    />
    <ToddlerTopicPage config={toddlerTopicConfigs["potty-learning"]} />
  </>
);

export default PottyLearning;
