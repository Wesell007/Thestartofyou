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
 * Slot — From earlier weeks (Companion foundation).
 *
 * Surfaces only when the user has 2+ past reflections. Brings forward ONE
 * earlier week's theme + reflection excerpt as a quiet recall card. The
 * beginning of "the system is starting to know you" — without becoming a
 * feed. Lays the data + UI foundation for future companion recall like
 * "what was I feeling in week 4?"
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

  // Surface a meaningful earlier week — pick the oldest, which feels furthest
  // back and gives the strongest sense of "kept over time".
  const recall = past[past.length - 1];
  const identity = getWeekIdentity(recall.week);
  const excerpt =
    recall.content.length > 160
      ? recall.content.slice(0, 160).trimEnd() + "…"
      : recall.content;

  return (
    <section className="relative py-14 sm:py-16 md:py-20 border-t border-border/30">
      <div className="flex items-center gap-3 mb-6 sm:mb-7">
        <span
          aria-hidden="true"
          className="block w-6 h-px"
          style={{ backgroundColor: "hsl(var(--stage-pregnancy-accent) / 0.55)" }}
        />
        <p
          className="font-sans text-[10.5px] sm:text-[11px] font-light tracking-[0.24em] uppercase"
          style={{ color: "hsl(var(--stage-pregnancy-accent))" }}
        >
          From earlier weeks
        </p>
      </div>

      <Link
        to="/my-journey"
        className="group block rounded-[24px] border bg-card/70 backdrop-blur-sm px-5 sm:px-7 py-6 sm:py-7 transition-all hover:shadow-[0_10px_36px_-14px_hsl(var(--stage-pregnancy-accent)/0.24)]"
        style={{ borderColor: "hsl(var(--stage-pregnancy-accent) / 0.18)" }}
      >
        <div className="flex items-baseline justify-between gap-4 mb-3">
          <p
            className="font-sans text-[10.5px] font-medium tracking-[0.24em] uppercase"
            style={{ color: "hsl(var(--stage-pregnancy-accent))" }}
          >
            Week {recall.week} · {identity.chapterTitle}
          </p>
          <span className="font-sans text-[10.5px] font-light tracking-[0.18em] uppercase text-foreground/40 group-hover:text-foreground/70 transition-colors">
            Held
          </span>
        </div>

        <p className="font-serif italic text-[1.05rem] sm:text-[1.1rem] text-foreground/82 leading-snug mb-3">
          {identity.theme}
        </p>

        <p
          className="font-serif italic text-[14.5px] sm:text-[15px] text-foreground/68 leading-[1.75] border-l-2 pl-4"
          style={{ borderColor: "hsl(var(--stage-pregnancy-accent) / 0.42)" }}
        >
          "{excerpt}"
        </p>

        <div className="flex items-center gap-1.5 mt-5 font-sans text-[12px] font-light tracking-[0.16em] uppercase text-foreground/55 group-hover:text-foreground/80 transition-colors">
          See your journey
          <ArrowUpRight
            size={13}
            strokeWidth={1.5}
            className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </div>
      </Link>

      <p className="font-sans text-[12px] font-light italic text-foreground/40 mt-5 max-w-[42ch]">
        The system is beginning to remember — your reflections are being held week by week.
      </p>
    </section>
  );
};

export default SlotCompanionRecall;
