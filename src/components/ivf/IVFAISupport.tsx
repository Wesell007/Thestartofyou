import HubAISupport from "@/components/shared/HubAISupport";

const IVFAISupport = () => (
  <HubAISupport
    emotionalPrompt="What's been on your mind since your transfer?"
    description="IVF can bring more questions, especially during waiting periods. You can ask about your stage, what to expect next, or anything that's been on your mind."
    suggestions={["Is this normal at this stage?", "Should I be feeling something?", "What happens next?"]}
    context="IVF journey"
    stageBg="--stage-ivf"
    stageAccent="--stage-ivf-accent"
  />
);

export default IVFAISupport;
