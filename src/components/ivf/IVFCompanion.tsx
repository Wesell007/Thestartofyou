import { useNavigate } from "react-router-dom";
import { Sparkles } from "lucide-react";
import { navigateToAsk } from "@/lib/askNavigation";
import {
  PromptInput,
  PromptInputBody,
  PromptInputFooter,
  PromptInputSubmit,
  PromptInputTextarea,
  PromptInputTools,
} from "@/components/ai-elements/prompt-input";
import type { IVFDestination } from "@/data/ivfTopicData";

interface IVFCompanionProps {
  prompts: IVFDestination[];
  context?: string;
}

const IVFCompanion = ({ prompts, context = "IVF" }: IVFCompanionProps) => {
  const navigate = useNavigate();
  const ask = (question: string) => {
    if (!question.trim()) return;
    navigateToAsk(navigate, question, { journey: "ivf", context, stage: "ivf" });
  };

  return (
    <section className="bg-parchment py-14 md:py-20" aria-labelledby="ivf-companion-heading">
      <div className="container mx-auto max-w-5xl px-5 sm:px-6 md:px-10">
        <div className="grid gap-8 border-y border-border/50 py-10 md:grid-cols-5 md:gap-14">
          <div className="md:col-span-2">
            <div className="mb-4 flex items-center gap-2 text-stage-ivf-accent">
              <Sparkles size={15} aria-hidden="true" />
              <p className="font-sans text-[11px] font-light uppercase tracking-[0.2em]">Your Companion</p>
            </div>
            <h2 id="ivf-companion-heading" className="mb-3 font-serif text-2xl leading-tight text-foreground sm:text-3xl">
              Ask about this stage
            </h2>
            <p className="font-sans text-[15px] font-light leading-relaxed text-muted-foreground">
              Get an AI-generated answer grounded in our guidance. It cannot assess symptoms or replace your clinic.
            </p>
          </div>
          <div className="md:col-span-3">
            <PromptInput
              className="rounded-lg border-border/60 bg-card shadow-card-brand"
              onSubmit={({ text }) => ask(text)}
            >
              <PromptInputBody>
                <PromptInputTextarea aria-label="Ask the Companion" placeholder="Ask about IVF..." />
              </PromptInputBody>
              <PromptInputFooter>
                <PromptInputTools>
                  <span className="font-sans text-xs font-light text-muted-foreground">AI-generated guidance</span>
                </PromptInputTools>
                <PromptInputSubmit aria-label="Ask the Companion" title="Ask the Companion" />
              </PromptInputFooter>
            </PromptInput>
            <div className="mt-4 grid gap-2 sm:grid-cols-2">
              {prompts.slice(0, 4).map((prompt) => (
                <button
                  key={prompt.href}
                  type="button"
                  onClick={() => ask(prompt.label)}
                  className="rounded-lg border border-border/50 bg-card px-4 py-3 text-left font-sans text-sm font-light text-foreground/75 transition-colors hover:border-stage-ivf-accent/40 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  {prompt.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IVFCompanion;