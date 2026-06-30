import HubAISupport from "@/components/shared/HubAISupport";

const FirstYearAISupport = () => (
  <HubAISupport
    description="If something feels unclear, whether it's about development, sleep, or routines, you can ask and get guidance tailored to your stage."
    suggestions={["Is this normal at this age?", "Why has routine changed?", "What should I focus on now?"]}
    context="First year with baby"
    stageBg="--stage-firstyear"
    stageAccent="--stage-firstyear-accent"
    stage="first-year"
  />
);

export default FirstYearAISupport;
