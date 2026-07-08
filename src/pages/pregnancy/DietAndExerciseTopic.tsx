import SeoHead from "@/components/seo/SeoHead";
import PregnancyTopicPage from "@/components/pregnancy/PregnancyTopicPage";
import { pregnancyTopicConfigs } from "@/data/pregnancyTopicData";

const DietAndExerciseTopic = () => {
  const config = pregnancyTopicConfigs["diet-and-exercise"]!;
  return (
    <>
      <SeoHead
        title="Pregnancy Diet and Exercise | The Start of You"
        description="Calm, practical guidance on eating well, movement, exercise, hydration and looking after your body during pregnancy."
        canonical="https://thestartofyou.com/pregnancy/diet-and-exercise"
      />
      <PregnancyTopicPage config={config} />
    </>
  );
};

export default DietAndExerciseTopic;
