import HubAISupport from "@/components/shared/HubAISupport";

const PreparingAISupport = () => (
  <HubAISupport
    heading="Not sure if you need it? Ask."
    emotionalPrompt="Is this actually essential, or am I just adding to the list?"
    description="Get guidance tailored to your situation — what matters, what can wait, and what you can let go of."
    suggestions={["Do I really need this?", "What should I prioritise?", "What can wait until after baby arrives?"]}
    context="Preparing for baby"
    stageBg="--stage-preparing"
    stageAccent="--stage-preparing-accent"
  />
);

export default PreparingAISupport;
