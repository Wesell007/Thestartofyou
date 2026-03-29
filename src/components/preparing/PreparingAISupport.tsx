import HubAISupport from "@/components/shared/HubAISupport";

const PreparingAISupport = () => (
  <HubAISupport
    description="If you're unsure about what you need or what matters most, you can ask and get guidance tailored to your situation."
    suggestions={["Do I really need this?", "What should I prioritise?", "What can wait?"]}
    context="Preparing for baby"
  />
);

export default PreparingAISupport;
