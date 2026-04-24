import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import MyWeekBabyImage from "@/components/myweek/MyWeekBabyImage";
import { getWeekIdentity } from "@/data/myWeekContent";

interface Props {
  currentWeek: number;
}

const CurrentChapterCard = ({ currentWeek }: Props) => {
  const identity = getWeekIdentity(currentWeek);
  const accent = "hsl(var(--stage-pregnancy-accent))";

  return (
    <Link
      to="/my-week"
      className="group block rounded-[28px] keepsake-surface overflow-hidden transition-all duration-500 hover:shadow-[0_36px_80px_-32px_hsl(var(--stage-pregnancy-accent)/0.32),0_8px_24px_-12px_hsl(222_14%_12%/0.1)] mb-14 sm:mb-16 lg:mb-20"
      style={{ border: "1px solid hsl(var(--stage-pregnancy-accent) / 0.22)" }}
    >
      <div className="flex flex-col sm:flex-row items-stretch">
        <div
          className="shrink-0 flex items-center justify-center sm:w-[200px] py-6 sm:py-8"
          style={{
            background:
              "radial-gradient(circle at 50% 50%, hsl(var(--stage-pregnancy) / 0.5), hsl(var(--card)) 75%)",
            borderBottom: "1px solid hsl(var(--stage-pregnancy-accent) / 0.14)",
          }}
        >
          <div
            className="w-[120px] h-[120px] sm:w-[140px] sm:h-[140px] rounded-full overflow-hidden flex items-center justify-center"
            style={{ border: "1px solid hsl(var(--stage-pregnancy-accent) / 0.22)" }}
          >
            <MyWeekBabyImage
              week={currentWeek}
              className="w-full h-full flex items-center justify-center"
              imgClassName="w-full h-full object-cover"
            />
          </div>
        </div>
        <div className="px-7 sm:px-9 py-7 sm:py-9 flex-1 min-w-0 flex flex-col justify-center">
          <p
            className="font-sans text-[10px] font-medium tracking-[0.3em] uppercase mb-3"
            style={{ color: accent }}
          >
            Current chapter · Week {currentWeek}
          </p>
          <h2 className="font-serif font-medium text-foreground text-[1.85rem] sm:text-[2.15rem] leading-[1.05] mb-3">
            {identity.chapterTitle}
          </h2>
          <p className="font-serif italic text-foreground/60 text-[15.5px] sm:text-[16px] leading-[1.5] mb-6 max-w-[40ch]">
            {identity.theme}
          </p>
          <span className="inline-flex items-center gap-2 font-sans text-[11.5px] font-medium tracking-[0.22em] uppercase text-foreground/75 group-hover:text-foreground transition-colors">
            Continue this week
            <ArrowRight size={13} strokeWidth={1.7} className="transition-transform group-hover:translate-x-0.5" />
          </span>
        </div>
      </div>
    </Link>
  );
};

export default CurrentChapterCard;
