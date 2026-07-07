import SeoHead from "@/components/seo/SeoHead";
import { renderFirstYearTopic } from "@/components/firstyear/topic/FirstYearTopicPage";

const Sleep = () => (
  <>
    <SeoHead
      title="Baby Sleep in the First Year | The Start of You"
      description="Calm guidance on newborn sleep, settling, sleep expectations and the changing rhythm of rest through your baby's first year."
      canonical="https://thestartofyou.com/first-year/sleep"
    />
    {renderFirstYearTopic("sleep")}
  </>
);

export default Sleep;
