import SeoHead from "@/components/seo/SeoHead";
import PregnancyTopicPage from "@/components/pregnancy/PregnancyTopicPage";
import { pregnancyTopicConfigs } from "@/data/pregnancyTopicData";

const BabyTopic = () => {
  const config = pregnancyTopicConfigs.baby!;
  return (
    <>
      <SeoHead
        title="Baby Development in Pregnancy | The Start of You"
        description="Follow your baby's development through pregnancy with calm guidance on growth, movement, scans and what changes week by week."
        canonical="https://thestartofyou.com/pregnancy/baby"
      />
      <PregnancyTopicPage config={config} />
    </>
  );
};

export default BabyTopic;
