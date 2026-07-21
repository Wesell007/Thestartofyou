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
  const [loadError, setLoadError] = useState(false);
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoaded(false);
      setLoadError(false);
      const { data, error } = await supabase
        .from("reflections")
        .select("week, content, updated_at")
        .eq("user_id", userId)
        .lt("week", currentWeek)
        .order("week", { ascending: false });
      if (cancelled) return;
      if (error) {
        setLoadError(true);
        setLoaded(true);
        return;
      }
      const filtered = (data ?? []).filter(
        (r) => r.content && r.content.trim().length > 0
      );
      setPast(filtered);
      setLoaded(true);
    })();
    return () => {
      cancelled = true;
    };
  }, [userId, currentWeek, attempt]);

  if (!loaded) return null;
  if (loadError) {
    return (
      <section className="relative pt-10 pb-2" role="alert">
        <p className="font-serif italic text-sm text-foreground/60">Earlier reflections could not be loaded.</p>
        <button type="button" onClick={() => setAttempt((n) => n + 1)} className="mt-2 font-sans text-xs underline">Try again</button>
      </section>
    );
  }
  if (past.length < 2) return null;

  // The oldest reflection gives the strongest sense of "kept over time".
  const recall = past[past.length - 1];
  const identity = getWeekIdentity(recall.week);
  const weeksAgo = currentWeek - recall.week;
  const excerpt =
    recall.content.length > 150
      ? recall.content.slice(0, 150).trimEnd() + "…"
      : recall.content;

  return (
    <section className="relative pt-10 pb-2">
      <div className="flex items-center gap-3 mb-4">
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

      <p className="font-serif italic text-[14px] text-foreground/55 mb-5 max-w-[40ch]">
        You wrote this {weeksAgo} {weeksAgo === 1 ? "week" : "weeks"} ago. Held since.
      </p>

      {/* Flat treatment. No inner card; the rail itself is the surface.
          The recall reads as a quote, not another nested object. */}
      <Link to={`/my-week/${recall.week}`} className="group block">
        <p
          className="font-serif italic text-[15px] sm:text-[15.5px] text-foreground/72 leading-[1.8] border-l-2 pl-5"
          style={{ borderColor: "hsl(var(--stage-pregnancy-accent) / 0.5)" }}
        >
          "{excerpt}"
        </p>

        <div className="flex items-center justify-between gap-3 mt-4 pl-5">
          <span
            className="font-sans text-[10px] font-medium tracking-[0.26em] uppercase"
            style={{ color: "hsl(var(--stage-pregnancy-accent))" }}
          >
            Week {recall.week} · {identity.chapterTitle}
          </span>
          <span className="inline-flex items-center gap-1.5 font-sans text-[10.5px] font-medium tracking-[0.22em] uppercase text-foreground/55 group-hover:text-foreground/80 transition-colors">
            Open
            <ArrowUpRight
              size={11}
              strokeWidth={1.6}
              className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </span>
        </div>
      </Link>
    </section>
  );
};

export default SlotCompanionRecall;
