import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Leaf, MessageCircle } from "lucide-react";
import { buildWeekQuestionNavigation, weekReflectionDraftKey } from "@/lib/publicWeekInteraction";

interface PublicWeekReflectionAskProps {
  week: number;
  reflectionPrompt?: string;
  reflectionPrompts: string[];
  askChips: string[];
  askPlaceholder?: string;
  askHeading?: string;
}

const readDraft = (week: number) => {
  try {
    return window.localStorage.getItem(weekReflectionDraftKey(week)) ?? "";
  } catch {
    return "";
  }
};

const PublicWeekReflectionAsk = ({
  week,
  reflectionPrompt = "What does this week feel like for you?",
  reflectionPrompts,
  askChips,
  askPlaceholder = "What would you like to ask about this week?",
  askHeading = "A question on your mind?",
}: PublicWeekReflectionAskProps) => {
  const navigate = useNavigate();
  const [reflection, setReflection] = useState(() => readDraft(week));
  const [question, setQuestion] = useState("");
  const [saveMessage, setSaveMessage] = useState("");

  const saveDraft = () => {
    const value = reflection.trim();
    if (!value) {
      setSaveMessage("Write a reflection before saving your draft.");
      return;
    }

    try {
      window.localStorage.setItem(weekReflectionDraftKey(week), value);
      setSaveMessage("Draft saved on this device.");
    } catch {
      setSaveMessage("This browser could not save the draft. Copy it before leaving this page.");
    }
  };

  const ask = (value: string) => {
    const trimmed = value.trim();
    if (!trimmed) return;
    const destination = buildWeekQuestionNavigation(week, trimmed);
    navigate(destination.to, { state: destination.state });
  };

  const submitQuestion = (event: FormEvent) => {
    event.preventDefault();
    ask(question);
  };

  return (
    <section className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl pb-16 md:pb-24">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-card rounded-3xl border border-border/40 border-t-2 border-t-sage/40 p-7 sm:p-8 md:p-9 shadow-card-brand">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-9 h-9 rounded-full bg-sage-bg flex items-center justify-center shrink-0" aria-hidden="true">
              <Leaf size={14} className="text-sage" />
            </span>
            <div className="min-w-0">
              <p className="font-sans text-[10.5px] font-semibold tracking-[0.24em] uppercase text-sage">A moment for reflection</p>
              <h3 className="font-serif text-[1.3rem] sm:text-[1.35rem] text-foreground mt-0.5 leading-snug">{reflectionPrompt}</h3>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 mb-4">
            {reflectionPrompts.map((prompt) => (
              <button
                key={prompt}
                type="button"
                onClick={() => setReflection((current) => current || prompt)}
                className="font-sans text-[11.5px] font-medium bg-sage-bg/70 text-foreground/80 rounded-full px-3 py-1.5 border border-sage/20 hover:border-sage/50 transition-colors"
              >
                {prompt}
              </button>
            ))}
          </div>
          <label htmlFor={`week-${week}-reflection`} className="sr-only">Week {week} reflection</label>
          <textarea
            id={`week-${week}-reflection`}
            rows={4}
            value={reflection}
            onChange={(event) => {
              setReflection(event.target.value);
              setSaveMessage("");
            }}
            placeholder="Write your thoughts here… this is just for you."
            className="w-full bg-parchment/80 border border-border/40 rounded-xl px-4 py-3.5 font-sans text-[13.5px] text-foreground placeholder:text-foreground/45 resize-none focus:outline-none focus:border-sage focus:ring-1 focus:ring-sage/30 transition-all leading-relaxed"
          />
          <button
            type="button"
            onClick={saveDraft}
            className="inline-flex items-center gap-2 mt-4 bg-terracotta text-terracotta-foreground rounded-pill px-5 py-2.5 font-sans text-[13px] font-medium hover:bg-terracotta-hover transition-colors"
          >
            Save draft on this device <ArrowRight size={12} />
          </button>
          {saveMessage && <p role="status" className="mt-3 font-sans text-xs text-foreground/65">{saveMessage}</p>}
        </div>

        <form onSubmit={submitQuestion} className="bg-card rounded-3xl border border-border/40 border-t-2 border-t-lavender/50 p-7 sm:p-8 md:p-9 shadow-card-brand">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-9 h-9 rounded-full bg-lavender-bg flex items-center justify-center shrink-0" aria-hidden="true">
              <MessageCircle size={14} className="text-lavender-foreground" />
            </span>
            <div className="min-w-0">
              <p className="font-sans text-[10.5px] font-semibold tracking-[0.24em] uppercase text-sage">Ask about week {week}</p>
              <h3 className="font-serif text-[1.3rem] sm:text-[1.35rem] text-foreground mt-0.5 leading-snug">{askHeading}</h3>
            </div>
          </div>
          <p className="font-sans text-[13px] text-foreground/70 leading-relaxed mb-4">Get a calm, evidence-led answer tailored to where you are right now.</p>
          <label htmlFor={`week-${week}-question`} className="sr-only">Ask a question about pregnancy week {week}</label>
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              id={`week-${week}-question`}
              type="text"
              value={question}
              onChange={(event) => setQuestion(event.target.value)}
              placeholder={askPlaceholder}
              className="min-w-0 flex-1 bg-parchment/80 border border-border/40 rounded-full px-5 py-3.5 font-sans text-[13.5px] text-foreground placeholder:text-foreground/45 focus:outline-none focus:border-sage focus:ring-1 focus:ring-sage/30 transition-all"
            />
            <button
              type="submit"
              disabled={!question.trim()}
              className="rounded-full bg-terracotta text-terracotta-foreground px-5 py-3 font-sans text-[13px] font-medium disabled:opacity-45"
            >
              Ask
            </button>
          </div>
          <p className="font-sans text-[10.5px] font-semibold tracking-[0.22em] uppercase text-foreground/55 mt-5 mb-2.5">Popular at this stage</p>
          <div className="flex flex-wrap gap-2">
            {askChips.map((chip) => (
              <button
                key={chip}
                type="button"
                onClick={() => ask(chip)}
                className="font-sans text-[12px] font-medium text-foreground/80 bg-parchment-dark/60 border border-border/40 hover:border-sage/50 hover:text-foreground px-3.5 py-1.5 rounded-full transition-colors"
              >
                {chip}
              </button>
            ))}
          </div>
        </form>
      </div>
    </section>
  );
};

export default PublicWeekReflectionAsk;
