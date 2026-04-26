import PregnancyTopicPage from "@/components/pregnancy/PregnancyTopicPage";
import { pregnancyTopicConfigs } from "@/data/pregnancyTopicData";

const BodyTopic = () => {
  const config = pregnancyTopicConfigs.body!;
  return <PregnancyTopicPage config={config} />;
};

export default BodyTopic;
