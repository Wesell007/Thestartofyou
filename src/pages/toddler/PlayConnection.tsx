import ToddlerTopicPage from "@/components/toddler/topic/ToddlerTopicPage";
import { toddlerTopicConfigs } from "@/data/toddlerTopicData";

const PlayConnection = () => (
  <ToddlerTopicPage config={toddlerTopicConfigs["play-connection"]} />
);

export default PlayConnection;
