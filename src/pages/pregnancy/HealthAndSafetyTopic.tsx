import PregnancyTopicPage from "@/components/pregnancy/PregnancyTopicPage";
import { pregnancyTopicConfigs } from "@/data/pregnancyTopicData";

const HealthAndSafetyTopic = () => {
  const config = pregnancyTopicConfigs["health-and-safety"]!;
  return <PregnancyTopicPage config={config} />;
};

export default HealthAndSafetyTopic;
