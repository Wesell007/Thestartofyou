import SeoHead from "@/components/seo/SeoHead";
import PregnancyTopicPage from "@/components/pregnancy/PregnancyTopicPage";
import { pregnancyTopicConfigs } from "@/data/pregnancyTopicData";

const HealthAndSafetyTopic = () => {
  const config = pregnancyTopicConfigs["health-and-safety"]!;
  return (
    <>
      <SeoHead
        title="Pregnancy Health and Safety | The Start of You"
        description="Clear pregnancy guidance on health, safety, warning signs, appointments and when to ask your midwife, GP or local service for advice."
        canonical="https://thestartofyou.com/pregnancy/health-and-safety"
      />
      <PregnancyTopicPage config={config} />
    </>
  );
};

export default HealthAndSafetyTopic;
