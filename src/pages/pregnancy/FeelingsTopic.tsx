import PregnancyTopicPage from "@/components/pregnancy/PregnancyTopicPage";
import { pregnancyTopicConfigs } from "@/data/pregnancyTopicData";

const FeelingsTopic = () => {
  const config = pregnancyTopicConfigs["feelings"]!;
  return <PregnancyTopicPage config={config} />;
};

export default FeelingsTopic;
