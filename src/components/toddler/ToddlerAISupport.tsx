import HubAISupport from "@/components/shared/HubAISupport";

const ToddlerAISupport = () => {
  return (
    <HubAISupport
      heading="Ask anything about the toddler years"
      description="From midnight wake-ups to picky meals and the daily push-pull of independence — ask in plain words and get a calm, considered answer."
      placeholder="What's happening with your toddler?"
      suggestions={[
        "Why does my toddler have tantrums?",
        "How much sleep does a 2 year old need?",
        "When should I worry about speech?",
        "How do I handle picky eating?",
        "When can we start potty training?",
      ]}
      context="toddler"
      stageBg="--stage-toddler"
      stageAccent="--stage-toddler-accent"
    />
  );
};

export default ToddlerAISupport;
