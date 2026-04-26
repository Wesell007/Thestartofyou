import PregnancyTopicPage from "@/components/pregnancy/PregnancyTopicPage";
import { pregnancyTopicConfigs } from "@/data/pregnancyTopicData";

const DietAndExerciseTopic = () => {
  const config = pregnancyTopicConfigs["diet-and-exercise"]!;
  return <PregnancyTopicPage config={config} />;
};

export default DietAndExerciseTopic;
