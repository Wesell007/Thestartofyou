import SeoHead from "@/components/seo/SeoHead";
import { renderFirstYearTopic } from "@/components/firstyear/topic/FirstYearTopicPage";

const EmotionalWellbeing = () => (
  <>
    <SeoHead
      title="Emotional Wellbeing After Birth | The Start of You"
      description="Gentle support for the emotional side of the first year, including feeling changed, overwhelmed or unsure when to ask for help."
      canonical="https://thestartofyou.com/first-year/emotional-wellbeing"
    />
    {renderFirstYearTopic("emotional-wellbeing")}
  </>
);

export default EmotionalWellbeing;
