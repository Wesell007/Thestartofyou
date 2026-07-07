import SeoHead from "@/components/seo/SeoHead";
import { renderFirstYearTopic } from "@/components/firstyear/topic/FirstYearTopicPage";

const Feeding = () => (
  <>
    <SeoHead
      title="Baby Feeding in the First Year | The Start of You"
      description="Gentle first-year feeding guidance covering newborn rhythms, bottle and breastfeeding questions, feeding worries and when to ask for support."
      canonical="https://thestartofyou.com/first-year/feeding"
    />
    {renderFirstYearTopic("feeding")}
  </>
);

export default Feeding;
