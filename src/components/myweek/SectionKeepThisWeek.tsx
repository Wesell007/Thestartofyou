import SectionLabel from "@/components/myweek/SectionLabel";
import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import SlotReflection from "@/components/myweek/SlotReflection";
import SlotPhotoMemory from "@/components/myweek/SlotPhotoMemory";
import SlotVideoMemory from "@/components/myweek/SlotVideoMemory";
import SlotVoiceMemory from "@/components/myweek/SlotVoiceMemory";
import { TapedFrame } from "@/components/myweek/PregnancyDecor";
import type { MyWeekEntry } from "@/data/myWeekContent";

interface Props {
  userId: string;
  week: number;
  chapterTitle: string;
  content: MyWeekEntry;
}

type KeptState = {
  reflection: boolean;
  photo: boolean;
  video: boolean;
  voice: boolean;
};

const summariseKept = (k: KeptState): string => {
  const parts: string[] = [];
  if (k.reflection) parts.push("reflection");
  if (k.photo) parts.push("photo");
  if (k.video) parts.push("video");
  if (k.voice) parts.push("voice note");
  if (parts.length === 0) return "";
  if (parts.length === 1) return parts[0];
  return `${parts.slice(0, -1).join(", ")} and ${parts[parts.length - 1]}`;
};

/**
 * SectionKeepThisWeek — one unified capture section for the weekly memory
 * experience: reflection, photo, video and voice note live together under a single
 * quiet header, with a "captured this week" indicator and a subtle link
 * back into My Journey when at least one item is kept.
 */
const SectionKeepThisWeek = ({ userId, week, chapterTitle, content }: Props) => {
  const [kept, setKept] = useState<KeptState>({
    reflection: false,
    photo: false,
    video: false,
    voice: false,
  });
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const [r, p, media] = await Promise.all([
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
          .select("media_type, storage_path")
          .eq("user_id", userId)
          .eq("week", week),
      ]);
      if (cancelled) return;
      const rows = media.data ?? [];
      const hasMedia = (type: string) =>
        rows.some((row) => row.media_type === type && Boolean(row.storage_path));
      setKept({
        reflection: Boolean(r.data?.content && (r.data.content as string).trim().length > 0),
        photo: Boolean(p.data?.storage_path),
        video: hasMedia("video"),
        voice: hasMedia("voice_note"),
      });
    })();
    return () => {
      cancelled = true;
    };
  }, [userId, week, refreshKey]);

  const onSaved = useCallback(() => setRefreshKey((n) => n + 1), []);
  const anyKept = kept.reflection || kept.photo || kept.video || kept.voice;
  const summary = summariseKept(kept);

  return (
    <section className="relative pt-2 pb-2">
      <div className="mb-6">
        <SectionLabel className="mb-3">This week's memory</SectionLabel>
        <p className="font-serif text-foreground/70 text-[14.5px] leading-[1.6] max-w-[46ch]">
          A reflection, a photo, a short video or a voice note. Keep what feels
          right.
        </p>
        {anyKept && (
          <p className="mt-3 font-sans text-[10.5px] font-medium tracking-[0.24em] uppercase text-foreground/55">
            Captured this week · {summary}
          </p>
        )}
      </div>

      <SlotReflection content={content} userId={userId} week={week} onSaved={onSaved} />

      <div
        aria-hidden="true"
        className="mx-auto my-8 h-px w-16"
        style={{ backgroundColor: "hsl(var(--stage-pregnancy-accent) / 0.22)" }}
      />

      <TapedFrame>
        <SlotPhotoMemory
          userId={userId}
          week={week}
          chapterTitle={chapterTitle}
          onSaved={onSaved}
        />
      </TapedFrame>

      <div
        aria-hidden="true"
        className="mx-auto my-8 h-px w-16"
        style={{ backgroundColor: "hsl(var(--stage-pregnancy-accent) / 0.22)" }}
      />

      <TapedFrame>
        <SlotVideoMemory userId={userId} week={week} onSaved={onSaved} />
      </TapedFrame>

      <div
        aria-hidden="true"
        className="mx-auto my-8 h-px w-16"
        style={{ backgroundColor: "hsl(var(--stage-pregnancy-accent) / 0.22)" }}
      />

      <div className="pregnancy-paper relative overflow-hidden rounded-[22px] px-6 sm:px-8 pt-1 pb-6 sm:pb-7">
        <SmallSprig className="-right-4 -bottom-5 w-[84px] rotate-12" opacity={0.26} />
        <div className="relative">
          <SlotVoiceMemory userId={userId} week={week} onSaved={onSaved} />
        </div>
      </div>

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
