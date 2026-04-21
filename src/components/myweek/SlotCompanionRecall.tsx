import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { getWeekIdentity } from "@/data/myWeekContent";

interface Props {
  userId: string;
  currentWeek: number;
}

interface PastReflection {
  week: number;
  content: string;
  updated_at: string;
}

/**
 * Right-rail slot — From earlier weeks (Companion foundation).
 *
 * Surfaces only when the user has 2+ past reflections. Brings forward ONE
 * earlier week's actual reflection — a real, cumulative signal that the
 * record is being kept. Phrased to make the continuity unmistakable
 * ("You wrote this in week X").
 */
const SlotCompanionRecall = ({ userId, currentWeek }: Props) => {
  const [past, setPast] = useState<PastReflection[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const { data } = await supabase
        .from("reflections")
        .select("week, content, updated_at")
        .eq("user_id", userId)
        .lt("week", currentWeek)
        .order("week", { ascending: false });
      if (cancelled) return;
      const filtered = (data ?? []).filter(
        (r) => r.content && r.content.trim().length > 0
      );
      setPast(filtered);
      setLoaded(true);
    })();
    return () => {
      cancelled = true;
    };
  }, [userId, currentWeek]);

  if (!loaded) return null;
  if (past.length < 2) return null;

  // The oldest reflection — strongest sense of "kept over time".
  const recall = past[past.length - 1];
  const identity = getWeekIdentity(recall.week);
  const weeksAgo = currentWeek - recall.week;
  const excerpt =
    recall.content.length > 150
      ? recall.content.slice(0, 150).trimEnd() + "…"
      : recall.content;

  return (
    <section className="relative pt-10 pb-2">
      <div className="flex items-center gap-3 mb-5">
        <span
          aria-hidden="true"
          className="block w-5 h-px"
          style={{ backgroundColor: "hsl(var(--stage-pregnancy-accent) / 0.55)" }}
        />
        <p
          className="font-sans text-[10.5px] font-light tracking-[0.24em] uppercase"
          style={{ color: "hsl(var(--stage-pregnancy-accent))" }}
        >
          From earlier weeks
        </p>
      </div>

      <p className="font-serif italic text-[14.5px] text-foreground/55 mb-5 max-w-[40ch]">
        You wrote this {weeksAgo} {weeksAgo === 1 ? "week" : "weeks"} ago — held since.
      </p>

      <Link
        to="/my-journey"
        className="group block rounded-[20px] keepsake-surface px-6 py-6 transition-all duration-500 hover:shadow-[0_22px_56px_-26px_hsl(var(--stage-pregnancy-accent)/0.28),0_3px_12px_-6px_hsl(222_14%_12%/0.06)]"
      >
        <div className="flex items-baseline justify-between gap-4 mb-3">
          <p
            className="font-sans text-[10px] font-medium tracking-[0.26em] uppercase"
            style={{ color: "hsl(var(--stage-pregnancy-accent))" }}
          >
            Week {recall.week} · {identity.chapterTitle}
          </p>
          <span className="font-sans text-[9.5px] font-medium tracking-[0.22em] uppercase text-foreground/40">
            Held
          </span>
        </div>

        <p
          className="font-serif italic text-[14.5px] text-foreground/72 leading-[1.75] border-l-2 pl-4"
          style={{ borderColor: "hsl(var(--stage-pregnancy-accent) / 0.5)" }}
        >
          "{excerpt}"
        </p>

        <div className="flex items-center gap-1.5 mt-5 font-sans text-[11px] font-medium tracking-[0.22em] uppercase text-foreground/55 group-hover:text-foreground/80 transition-colors">
          See your record
          <ArrowUpRight
            size={12}
            strokeWidth={1.5}
            className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </div>
      </Link>
    </section>
  );
};

export default SlotCompanionRecall;
