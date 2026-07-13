import IVFTopicPage from "@/components/ivf/IVFTopicPage";
import { ivfTopicConfigs } from "@/data/ivfTopicData";
import SeoHead from "@/components/seo/SeoHead";

const AfterTransfer = () => (
  <>
    <SeoHead
      title="After Embryo Transfer | IVF Two-Week Wait Support"
      description="Supportive guidance for after embryo transfer, including the IVF two-week wait, symptoms, uncertainty, testing and emotional support."
      canonical="https://thestartofyou.com/ivf/after-transfer"
    />
    <IVFTopicPage config={ivfTopicConfigs["after-transfer"]} />
  </>
);
export default AfterTransfer;
