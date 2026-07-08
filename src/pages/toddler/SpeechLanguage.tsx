import SeoHead from "@/components/seo/SeoHead";
import ToddlerTopicPage from "@/components/toddler/topic/ToddlerTopicPage";
import { toddlerTopicConfigs } from "@/data/toddlerTopicData";

const SpeechLanguage = () => (
  <>
    <SeoHead
      title="Toddler Speech and Language | The Start of You"
      description="Supportive guidance on toddler speech, communication, language development and knowing when to ask for advice."
      canonical="https://thestartofyou.com/toddler/speech-language"
    />
    <ToddlerTopicPage config={toddlerTopicConfigs["speech-language"]} />
  </>
);

export default SpeechLanguage;
