import SeoHead from "@/components/seo/SeoHead";
import ToddlerTopicPage from "@/components/toddler/topic/ToddlerTopicPage";
import { toddlerTopicConfigs } from "@/data/toddlerTopicData";

const Sleep = () => (
  <>
    <SeoHead
      title="Toddler Sleep and Bedtime | The Start of You"
      description="Practical support for toddler sleep, bedtime battles, night waking, routines and gentle reassurance through changing sleep rhythms."
      canonical="https://thestartofyou.com/toddler/sleep"
    />
    <ToddlerTopicPage config={toddlerTopicConfigs["sleep"]} />
  </>
);

export default Sleep;
