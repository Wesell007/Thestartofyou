import PregnancyTopicPage from "@/components/pregnancy/PregnancyTopicPage";
import { pregnancyTopicConfigs } from "@/data/pregnancyTopicData";

const BabyTopic = () => {
  const config = pregnancyTopicConfigs.baby!;
  return <PregnancyTopicPage config={config} />;
};

export default BabyTopic;
