import HubAISupport from "@/components/shared/HubAISupport";

const PreparingAISupport = () => (
  <HubAISupport
    heading="Not sure? Ask before you buy."
    emotionalPrompt="Do I actually need this, or am I just trying to feel more in control?"
    description="Get honest guidance on what matters, what can wait, and what you can skip entirely. No product lists — just clarity."
    placeholder="Do I really need…?"
    suggestions={["Do I need a changing table?", "What's the minimum for feeding?", "Can I skip a baby monitor?", "What can I borrow instead?"]}
    context="Preparing for baby"
    stageBg="--stage-preparing"
    stageAccent="--stage-preparing-accent"
    stage="preparing"
  />
);

export default PreparingAISupport;
