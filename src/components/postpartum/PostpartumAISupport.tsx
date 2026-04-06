import HubAISupport from "@/components/shared/HubAISupport";

const PostpartumAISupport = () => (
  <HubAISupport
    description="If something feels unclear, whether it's about recovery, your baby, or how you're feeling, you can ask and get guidance tailored to this stage."
    suggestions={["Is this normal postpartum?", "When will things settle?", "What should I focus on now?"]}
    context="Postpartum recovery"
    stageBg="--stage-postpartum"
    stageAccent="--stage-postpartum-accent"
  />
);

export default PostpartumAISupport;
