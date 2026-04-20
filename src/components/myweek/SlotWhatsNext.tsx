import { ArrowRight } from "lucide-react";
import type { WeekData } from "@/data/weekData";

interface Props {
  data: WeekData;
  nextWeek: number | null;
  weeksToGo?: number;
}

const SlotWhatsNext = ({ data, nextWeek, weeksToGo }: Props) => {
  if (!nextWeek) return null;

  return (
    <section className="py-12 sm:py-16 md:py-20 border-t border-border/40">
      <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-2xl">
        <p
          className="font-sans text-[11px] font-light tracking-[0.22em] uppercase mb-6 sm:mb-7"
          style={{ color: "hsl(var(--stage-pregnancy-accent))" }}
        >
          What's next
        </p>

        <h2 className="font-serif text-[1.3rem] sm:text-[1.5rem] md:text-[1.7rem] text-foreground leading-snug mb-4 max-w-lg">
          Looking toward week {nextWeek}
        </h2>

        <p className="font-sans text-[15px] font-light text-muted-foreground leading-relaxed mb-6 sm:mb-7 max-w-lg">
          {data.nextWeekPreview ?? "A little more growth, a little more change. We'll be here."}
        </p>

        {typeof weeksToGo === "number" && weeksToGo > 0 && (
          <p className="font-sans text-[13px] font-light text-muted-foreground/60 italic">
            About {weeksToGo} weeks to go.
          </p>
        )}
      </div>
    </section>
  );
};

export default SlotWhatsNext;
