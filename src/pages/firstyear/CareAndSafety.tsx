import SeoHead from "@/components/seo/SeoHead";
import { renderFirstYearTopic } from "@/components/firstyear/topic/FirstYearTopicPage";

const CareAndSafety = () => (
  <>
    <SeoHead
      title="Baby Care and Safety in the First Year | The Start of You"
      description="Practical first-year guidance on safe sleep, everyday baby care, home safety and knowing when to ask for advice."
      canonical="https://thestartofyou.com/first-year/care-and-safety"
    />
    {renderFirstYearTopic("care-and-safety")}
  </>
);

export default CareAndSafety;
