import { Link } from "react-router-dom";
import { Sparkles, ArrowRight } from "lucide-react";
import { useCompanionIdentity } from "@/hooks/useCompanionIdentity";
import { toneLabel } from "@/lib/companion";

interface Props {
  week: number;
  seed: string;
}

/**
 * AI companion card. Copy adapts to the user's saved companion name/tone
 * (display-only). No companion data is sent to the AI backend; href params
 * remain stage/week/seed only.
 */
const SectionAskAI = ({ week, seed }: Props) => {
  const params = new URLSearchParams();
  params.set("stage", "pregnancy");
  params.set("week", String(week));
  params.set("seed", seed);
  const href = `/ask?${params.toString()}`;

  const { name, tone } = useCompanionIdentity();
  const eyebrow = name ? `Ask ${name} about this week` : "Ask AI about this week";
  const ctaLabel = name ? `Ask ${name}` : "Ask about this week";
  const heading = name
    ? `Ask ${name} a quiet question about week ${week}.`
    : `Ask a quiet question about week ${week}.`;

  return (
    <section className="relative pt-4 pb-12">
      <div className="flex items-center gap-3 mb-5">
        <span
          aria-hidden="true"
          className="block w-5 h-px"
          style={{ backgroundColor: "hsl(var(--stage-pregnancy-accent) / 0.55)" }}
        />
        <p
          className="font-sans text-[10.5px] font-medium tracking-[0.26em] uppercase"
          style={{ color: "hsl(var(--stage-pregnancy-accent))" }}
        >
          {eyebrow}
        </p>
        {tone && (
          <span
            className="ml-1 inline-flex items-center rounded-full px-2 py-0.5 font-sans text-[9.5px] font-medium tracking-[0.2em] uppercase"
            style={{
              color: "hsl(var(--stage-pregnancy-accent))",
              backgroundColor: "hsl(var(--stage-pregnancy) / 0.45)",
              border: "1px solid hsl(var(--stage-pregnancy-accent) / 0.25)",
            }}
          >
            {toneLabel(tone)}
          </span>
        )}
      </div>

      <Link
        to={href}
        className="group relative block rounded-[24px] keepsake-surface px-6 sm:px-9 py-8 sm:py-10 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_30px_70px_-28px_hsl(var(--stage-pregnancy-accent)/0.34)]"
        style={{
          borderColor: "hsl(var(--stage-pregnancy-accent) / 0.28)",
          background:
            "linear-gradient(135deg, hsl(var(--card)) 0%, hsl(var(--stage-pregnancy) / 0.34) 100%)",
          boxShadow:
            "inset 0 0 0 1px hsl(var(--stage-pregnancy-accent) / 0.12)",
        }}
      >
        <div className="flex items-start gap-4 sm:gap-5">
          <span
            aria-hidden="true"
            className="mt-1 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border"
            style={{
              background: "hsl(var(--stage-pregnancy) / 0.65)",
              borderColor: "hsl(var(--stage-pregnancy-accent) / 0.32)",
              boxShadow:
                "0 0 0 6px hsl(var(--stage-pregnancy) / 0.35), 0 8px 20px -12px hsl(var(--stage-pregnancy-accent) / 0.5)",
            }}
          >
            <Sparkles
              size={18}
              strokeWidth={1.7}
              style={{ color: "hsl(var(--stage-pregnancy-accent))" }}
            />
          </span>
          <div className="flex-1">
            <h2 className="font-serif text-[1.4rem] sm:text-[1.55rem] text-foreground leading-[1.18] mb-3 max-w-[26ch]">
              {heading}
            </h2>
            <p className="font-sans text-[14.5px] sm:text-[15px] font-normal text-foreground/78 leading-[1.72] max-w-[46ch] mb-5">
              Your companion can help you explore this week's prompts and
              questions, prepare notes for your midwife, or soften a worry into
              words. It is not a substitute for medical care.
            </p>
            <span
              className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 font-sans text-[11.5px] font-medium tracking-[0.2em] uppercase transition-colors group-hover:bg-[hsl(var(--stage-pregnancy-accent)/0.12)]"
              style={{
                color: "hsl(var(--stage-pregnancy-accent))",
                border: "1px solid hsl(var(--stage-pregnancy-accent) / 0.42)",
              }}
            >
              {ctaLabel}
              <ArrowRight
                size={13}
                strokeWidth={1.8}
                className="transition-transform group-hover:translate-x-0.5"
              />
            </span>
          </div>
        </div>
      </Link>
    </section>
  );
};

export default SectionAskAI;
