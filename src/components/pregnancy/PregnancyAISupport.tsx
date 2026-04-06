import HubAISupport from "@/components/shared/HubAISupport";

const PregnancyAISupport = () => (
  <HubAISupport
    description="If something feels unclear or unexpected, you can ask a question and get guidance that helps you understand what's happening at your stage."
    suggestions={["Is it normal to feel this tired?", "Why have my symptoms changed?", "What should I be aware of?"]}
    context="Pregnancy"
    stageBg="--stage-pregnancy"
    stageAccent="--stage-pregnancy-accent"
  />
);

export default PregnancyAISupport;
