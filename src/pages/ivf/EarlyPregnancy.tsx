import IVFTopicPage from "@/components/ivf/IVFTopicPage";
import { ivfTopicConfigs } from "@/data/ivfTopicData";
import SeoHead from "@/components/seo/SeoHead";

const EarlyPregnancy = () => (
  <>
    <SeoHead
      title="Early Pregnancy After IVF | Support After Treatment"
      description="Calm support for early pregnancy after IVF, including uncertainty, appointments, emotions and moving from treatment into pregnancy care."
      canonical="https://thestartofyou.com/ivf/early-pregnancy"
    />
    <IVFTopicPage config={ivfTopicConfigs["early-pregnancy"]} />
  </>
);
export default EarlyPregnancy;
