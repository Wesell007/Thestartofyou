import SeoHead from "@/components/seo/SeoHead";
import PregnancyTopicPage from "@/components/pregnancy/PregnancyTopicPage";
import { pregnancyTopicConfigs } from "@/data/pregnancyTopicData";

const BodyTopic = () => {
  const config = pregnancyTopicConfigs.body!;
  return (
    <>
      <SeoHead
        title="Pregnancy Body Changes and Symptoms | The Start of You"
        description="Supportive guidance on pregnancy body changes, symptoms, discomforts and when to ask for advice if something worries you."
        canonical="https://thestartofyou.com/pregnancy/body"
      />
      <PregnancyTopicPage config={config} />
    </>
  );
};

export default BodyTopic;
