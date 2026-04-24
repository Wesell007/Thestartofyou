import { Link } from "react-router-dom";
import { getWeekIdentity } from "@/data/myWeekContent";

interface Props {
  week: number;
  reflection: string;
}

const truncate = (s: string, max: number) => {
  if (s.length <= max) return s;
  const slice = s.slice(0, max);
  const lastSpace = slice.lastIndexOf(" ");
  return (lastSpace > max * 0.6 ? slice.slice(0, lastSpace) : slice).trimEnd() + "…";
};

const MomentCard = ({ week, reflection }: Props) => {
  const identity = getWeekIdentity(week);
  const accent = "hsl(var(--stage-pregnancy-accent))";
  return (
    <Link
      to={`/my-week/${week}`}
      className="group block rounded-[20px] keepsake-surface px-5 sm:px-6 py-5 sm:py-6 transition-all hover:shadow-[0_22px_56px_-26px_hsl(var(--stage-pregnancy-accent)/0.26)]"
      style={{ borderColor: "hsl(var(--stage-pregnancy-accent) / 0.14)" }}
    >
      <p
        className="font-sans text-[10px] font-medium tracking-[0.28em] uppercase mb-3"
        style={{ color: accent }}
      >
        Week {week}
      </p>
      <p
        className="font-serif italic text-foreground/78 text-[14.5px] sm:text-[15px] leading-[1.7] border-l-2 pl-4 mb-3"
        style={{ borderColor: "hsl(var(--stage-pregnancy-accent) / 0.4)" }}
      >
        "{truncate(reflection, 160)}"
      </p>
      <p className="font-serif italic text-foreground/45 text-[12.5px] leading-[1.5]">
        {identity.chapterTitle}
      </p>
    </Link>
  );
};

export default MomentCard;
