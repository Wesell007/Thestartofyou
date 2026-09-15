import IVFCompanion from "@/components/ivf/IVFCompanion";
import type { IVFDestination } from "@/data/ivfTopicData";

const prompts: IVFDestination[] = [
  "Is this normal at this stage?",
  "Should I be feeling something by now?",
  "What happens next after transfer?",
  "How do I manage the two-week wait?",
].map((label) => ({ label, href: `ask:${encodeURIComponent(label)}`, kind: "ai" }));

const IVFAISupport = () => <IVFCompanion prompts={prompts} context="IVF" />;

export default IVFAISupport;