import SeoHead from "@/components/seo/SeoHead";
import PregnancyTopicPage from "@/components/pregnancy/PregnancyTopicPage";
import { pregnancyTopicConfigs } from "@/data/pregnancyTopicData";

const PreparingForBabyTopic = () => {
  const config = pregnancyTopicConfigs["preparing-for-baby"]!;
  return (
    <>
      <SeoHead
        title="Preparing for Baby | Birth, Home and Newborn Planning"
        description="Practical pregnancy guidance for preparing for birth, planning your home, packing a hospital bag and getting ready for your baby."
        canonical="https://thestartofyou.com/pregnancy/preparing-for-baby"
      />
      <PregnancyTopicPage config={config} />
    </>
  );
};

export default PreparingForBabyTopic;
