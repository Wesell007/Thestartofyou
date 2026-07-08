import SeoHead from "@/components/seo/SeoHead";
import PregnancyTopicPage from "@/components/pregnancy/PregnancyTopicPage";
import { pregnancyTopicConfigs } from "@/data/pregnancyTopicData";

const FeelingsTopic = () => {
  const config = pregnancyTopicConfigs["feelings"]!;
  return (
    <>
      <SeoHead
        title="Pregnancy Feelings and Emotional Wellbeing | The Start of You"
        description="Gentle support for pregnancy emotions, anxiety, identity, relationships and the feelings that can come with becoming a parent."
        canonical="https://thestartofyou.com/pregnancy/feelings"
      />
      <PregnancyTopicPage config={config} />
    </>
  );
};

export default FeelingsTopic;
