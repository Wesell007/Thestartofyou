import SeoHead from "@/components/seo/SeoHead";
import { renderFirstYearTopic } from "@/components/firstyear/topic/FirstYearTopicPage";

const Development = () => (
  <>
    <SeoHead
      title="Baby Development in the First Year | The Start of You"
      description="A reassuring guide to baby development, milestones, movement, play and what to do when progress feels uneven."
      canonical="https://thestartofyou.com/first-year/development"
    />
    {renderFirstYearTopic("development")}
  </>
);

export default Development;
