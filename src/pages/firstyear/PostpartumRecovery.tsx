import SeoHead from "@/components/seo/SeoHead";
import { renderFirstYearTopic } from "@/components/firstyear/topic/FirstYearTopicPage";

const PostpartumRecovery = () => (
  <>
    <SeoHead
      title="Postpartum Recovery After Birth | The Start of You"
      description="Supportive guidance for healing after birth, physical recovery, rest, changing symptoms and the early postnatal weeks."
      canonical="https://thestartofyou.com/first-year/postpartum-recovery"
    />
    {renderFirstYearTopic("postpartum-recovery")}
  </>
);

export default PostpartumRecovery;
