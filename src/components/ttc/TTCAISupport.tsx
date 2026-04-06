import HubAISupport from "@/components/shared/HubAISupport";

const TTCAISupport = () => (
  <HubAISupport
    description="If something feels unclear, you can ask about your cycle, timing, or what to expect next."
    suggestions={["When am I most fertile?", "Am I ovulating?", "When should I test?"]}
    context="Trying to conceive"
    stageBg="--stage-ttc"
    stageAccent="--stage-ttc-accent"
  />
);

export default TTCAISupport;
