import SeoHead from "@/components/seo/SeoHead";
import ToddlerTopicPage from "@/components/toddler/topic/ToddlerTopicPage";
import { toddlerTopicConfigs } from "@/data/toddlerTopicData";

const PlayConnection = () => (
  <>
    <SeoHead
      title="Toddler Play and Connection | The Start of You"
      description="Simple toddler play ideas and everyday connection guidance for learning, communication and warm parent-child moments."
      canonical="https://thestartofyou.com/toddler/play-connection"
    />
    <ToddlerTopicPage config={toddlerTopicConfigs["play-connection"]} />
  </>
);

export default PlayConnection;
