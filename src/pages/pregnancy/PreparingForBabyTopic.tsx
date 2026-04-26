import PregnancyTopicPage from "@/components/pregnancy/PregnancyTopicPage";
import { pregnancyTopicConfigs } from "@/data/pregnancyTopicData";

const PreparingForBabyTopic = () => {
  const config = pregnancyTopicConfigs["preparing-for-baby"]!;
  return <PregnancyTopicPage config={config} />;
};

export default PreparingForBabyTopic;
