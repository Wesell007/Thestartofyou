import { Link } from "react-router-dom";
import { Sparkles, ArrowRight } from "lucide-react";

interface Props {
  week: number;
  seed: string;
}

/**
 * Prominent-but-calm AI companion card. Links to
 * /ask?stage=pregnancy&week=<n>&seed=<safe-topic>. No AskPage changes.
 */
const SectionAskAI = ({ week, seed }: Props) => {
  const params = new URLSearchParams();
  params.set("stage", "pregnancy");
  params.set("week", String(week));
  params.set("seed", seed);
  const href = `/ask?${params.toString()}`;

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
          Ask AI about this week
        </p>
      </div>

      <Link
        to={href}
        className="group block rounded-[24px] keepsake-surface px-6 sm:px-9 py-8 sm:py-10 transition-shadow hover:shadow-[0_28px_64px_-28px_hsl(var(--stage-pregnancy-accent)/0.28)]"
        style={{
          borderColor: "hsl(var(--stage-pregnancy-accent) / 0.2)",
          background:
            "linear-gradient(135deg, hsl(var(--card)) 0%, hsl(var(--stage-pregnancy) / 0.22) 100%)",
        }}
      >
        <div className="flex items-start gap-4">
          <span
            aria-hidden="true"
            className="mt-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-full border"
            style={{
              background: "hsl(var(--stage-pregnancy) / 0.55)",
              borderColor: "hsl(var(--stage-pregnancy-accent) / 0.2)",
            }}
          >
            <Sparkles
              size={17}
              strokeWidth={1.6}
              style={{ color: "hsl(var(--stage-pregnancy-accent))" }}
            />
          </span>
          <div className="flex-1">
            <h2 className="font-serif text-[1.4rem] sm:text-[1.55rem] text-foreground leading-[1.18] mb-3 max-w-[26ch]">
              Ask a quiet question about week {week}.
            </h2>
            <p className="font-sans text-[14.5px] sm:text-[15px] font-light text-foreground/70 leading-[1.72] max-w-[46ch] mb-5">
              AI can help you understand what may be happening this week, prepare
              questions for your midwife, or soften a worry into words. It is not a
              substitute for medical care.
            </p>
            <span
              className="inline-flex items-center gap-2 font-sans text-[11.5px] font-medium tracking-[0.2em] uppercase"
              style={{ color: "hsl(var(--stage-pregnancy-accent))" }}
            >
              Ask about this week
              <ArrowRight
                size={13}
                strokeWidth={1.6}
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
