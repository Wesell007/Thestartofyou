import IVFTopicPage from "@/components/ivf/IVFTopicPage";
import { ivfTopicConfigs } from "@/data/ivfTopicData";
import SeoHead from "@/components/seo/SeoHead";

const BeforeTransfer = () => (
  <>
    <SeoHead
      title="Before Embryo Transfer | IVF Preparation & Support"
      description="Gentle guidance for the days before embryo transfer, including practical preparation, emotions, questions and support during IVF."
      canonical="https://thestartofyou.com/ivf/before-transfer"
    />
    <IVFTopicPage config={ivfTopicConfigs["before-transfer"]} />
  </>
);
export default BeforeTransfer;
