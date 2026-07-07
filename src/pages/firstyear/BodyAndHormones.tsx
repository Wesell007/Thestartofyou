import SeoHead from "@/components/seo/SeoHead";
import { renderFirstYearTopic } from "@/components/firstyear/topic/FirstYearTopicPage";

const BodyAndHormones = () => (
  <>
    <SeoHead
      title="Body and Hormones After Birth | The Start of You"
      description="Calm guidance on postpartum body changes, hormones, sweating, hair loss and the physical shifts that can follow birth."
      canonical="https://thestartofyou.com/first-year/body-and-hormones"
    />
    {renderFirstYearTopic("body-and-hormones")}
  </>
);

export default BodyAndHormones;
