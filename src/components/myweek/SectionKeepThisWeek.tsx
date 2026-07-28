import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import SlotReflection from "@/components/myweek/SlotReflection";
import SlotPhotoMemory from "@/components/myweek/SlotPhotoMemory";
import SlotVideoMemory from "@/components/myweek/SlotVideoMemory";
import type { MyWeekEntry } from "@/data/myWeekContent";

interface Props {
  userId: string;
  week: number;
  chapterTitle: string;
  content: MyWeekEntry;
}

type KeptState = { reflection: boolean; photo: boolean; video: boolean };

const summariseKept = (k: KeptState): string => {
  const parts: string[] = [];
  if (k.reflection) parts.push("reflection");
  if (k.photo) parts.push("photo");
  if (k.video) parts.push("video");
  if (parts.length === 0) return "";
  if (parts.length === 1) return parts[0];
  if (parts.length === 2) return `${parts[0]} and ${parts[1]}`;
  return `${parts[0]}, ${parts[1]} and ${parts[2]}`;
};

/**
 * SectionKeepThisWeek — one unified capture section for the weekly memory
 * experience: reflection, photo, and video live together under a single
 * quiet header, with a "captured this week" indicator and a subtle link
 * back into My Journey when at least one item is kept.
 */
const SectionKeepThisWeek = ({ userId, week, chapterTitle, content }: Props) => {
  const [kept, setKept] = useState<KeptState>({ reflection: false, photo: false, video: false });
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const [r, p, v] = await Promise.all([
        supabase
          .from("reflections")
          .select("content")
          .eq("user_id", userId)
          .eq("week", week)
          .maybeSingle(),
        supabase
          .from("week_photos")
          .select("storage_path")
          .eq("user_id", userId)
          .eq("week", week)
          .maybeSingle(),
        supabase
          .from("week_media_memories")
          .select("storage_path")
          .eq("user_id", userId)
          .eq("week", week)
          .eq("media_type", "video")
          .maybeSingle(),
      ]);
      if (cancelled) return;
      setKept({
        reflection: Boolean(r.data?.content && (r.data.content as string).trim().length > 0),
        photo: Boolean(p.data?.storage_path),
        video: Boolean(v.data?.storage_path),
      });
    })();
    return () => {
      cancelled = true;
    };
  }, [userId, week, refreshKey]);

  const onSaved = useCallback(() => setRefreshKey((n) => n + 1), []);
  const anyKept = kept.reflection || kept.photo || kept.video;
  const summary = summariseKept(kept);

  return (
    <section className="relative pt-14 pb-2">
      {anyKept && (
        <div className="flex items-center gap-3 mb-6">
          <span
            aria-hidden="true"
            className="block w-5 h-px"
            style={{ backgroundColor: "hsl(var(--stage-pregnancy-accent) / 0.55)" }}
          />
          <p
            className="font-sans text-[10.5px] font-medium tracking-[0.26em] uppercase"
            style={{ color: "hsl(var(--stage-pregnancy-accent))" }}
          >
            Captured this week · {summary}
          </p>
        </div>
      )}

      <SlotReflection content={content} userId={userId} week={week} onSaved={onSaved} />

      <div
        aria-hidden="true"
        className="mx-auto my-8 h-px w-16"
        style={{ backgroundColor: "hsl(var(--stage-pregnancy-accent) / 0.22)" }}
      />

      <SlotPhotoMemory
        userId={userId}
        week={week}
        chapterTitle={chapterTitle}
        onSaved={onSaved}
      />

      <div
        aria-hidden="true"
        className="mx-auto my-8 h-px w-16"
        style={{ backgroundColor: "hsl(var(--stage-pregnancy-accent) / 0.22)" }}
      />

      <SlotVideoMemory userId={userId} week={week} onSaved={onSaved} />

      {anyKept && (
        <div className="mt-10 flex justify-center">
          <Link
            to="/my-journey"
            className="font-sans text-[12px] font-medium tracking-[0.2em] uppercase transition-opacity hover:opacity-80"
            style={{ color: "hsl(var(--stage-pregnancy-accent))" }}
          >
            See this week in My Journey →
          </Link>
        </div>
      )}
    </section>
  );
};

export default SectionKeepThisWeek;
