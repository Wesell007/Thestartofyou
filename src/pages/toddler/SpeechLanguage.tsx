import ToddlerTopicPage from "@/components/toddler/topic/ToddlerTopicPage";
import { toddlerTopicConfigs } from "@/data/toddlerTopicData";

const SpeechLanguage = () => (
  <ToddlerTopicPage config={toddlerTopicConfigs["speech-language"]} />
);

export default SpeechLanguage;
