import { useEffect, useRef, useState } from "react";
import { Camera, Lock, X, ImagePlus } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface Props {
  userId: string;
  week: number;
  chapterTitle: string;
}

type LoadState = "loading" | "empty" | "uploading" | "loaded" | "error";

/**
 * Slot — Weekly photo memory.
 *
 * One primary photo per (user, week). Designed as a chapter memory, not a
 * gallery dump. Stored in the private `weekly-photos` bucket, with a row in
 * `week_photos` linking storage_path → user/week. Surfaces as a thumbnail on
 * /my-journey to form the keepsake spine.
 *
 * Premium quiet treatment:
 *  - Empty: a soft parchment frame inviting capture, with privacy seal.
 *  - Uploaded: the photo as the chapter's image, replace/remove options.
 */
const SlotPhotoMemory = ({ userId, week, chapterTitle }: Props) => {
  const [state, setState] = useState<LoadState>("loading");
  const [signedUrl, setSignedUrl] = useState<string | null>(null);
  const [storagePath, setStoragePath] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  // Load any existing photo for this week
  useEffect(() => {
    let cancelled = false;
    (async () => {
      const { data, error } = await supabase
        .from("week_photos")
        .select("storage_path")
        .eq("user_id", userId)
        .eq("week", week)
        .maybeSingle();
      if (cancelled) return;
      if (error) {
        setState("error");
        setError("Couldn't load your photo");
        return;
      }
      if (data?.storage_path) {
        setStoragePath(data.storage_path);
        const { data: urlData } = await supabase.storage
          .from("weekly-photos")
          .createSignedUrl(data.storage_path, 60 * 60); // 1h
        if (cancelled) return;
        if (urlData?.signedUrl) {
          setSignedUrl(urlData.signedUrl);
          setState("loaded");
        } else {
          setState("empty");
        }
      } else {
        setState("empty");
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [userId, week]);

  const handleFiles = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    const file = files[0];
    if (!file.type.startsWith("image/")) {
      setError("Please choose an image");
      return;
    }
    if (file.size > 8 * 1024 * 1024) {
      setError("Photos up to 8MB");
      return;
    }
    setError(null);
    setState("uploading");

    const ext = file.name.split(".").pop()?.toLowerCase() || "jpg";
    const path = `${userId}/${week}.${ext}`;

    // If a previous photo exists at a different path, remove it first
    if (storagePath && storagePath !== path) {
      await supabase.storage.from("weekly-photos").remove([storagePath]);
    }

    const { error: uploadErr } = await supabase.storage
      .from("weekly-photos")
      .upload(path, file, { upsert: true, contentType: file.type });

    if (uploadErr) {
      setState("error");
      setError("Couldn't save your photo");
      return;
    }

    const { error: dbErr } = await supabase
      .from("week_photos")
      .upsert(
        { user_id: userId, week, storage_path: path },
        { onConflict: "user_id,week" }
      );
    if (dbErr) {
      setState("error");
      setError("Couldn't save your photo");
      return;
    }

    const { data: urlData } = await supabase.storage
      .from("weekly-photos")
      .createSignedUrl(path, 60 * 60);
    setStoragePath(path);
    setSignedUrl(urlData?.signedUrl ?? null);
    setState("loaded");
  };

  const handleRemove = async () => {
    if (!storagePath) return;
    setState("uploading");
    await supabase.storage.from("weekly-photos").remove([storagePath]);
    await supabase
      .from("week_photos")
      .delete()
      .eq("user_id", userId)
      .eq("week", week);
    setStoragePath(null);
    setSignedUrl(null);
    setState("empty");
  };

  return (
    <section className="relative py-16 sm:py-20 md:py-24 border-t border-border/30">
      {/* Section label */}
      <div className="flex items-center gap-3 mb-7 sm:mb-8">
        <span
          aria-hidden="true"
          className="block w-6 h-px"
          style={{ backgroundColor: "hsl(var(--stage-pregnancy-accent) / 0.55)" }}
        />
        <p
          className="font-sans text-[10.5px] sm:text-[11px] font-light tracking-[0.24em] uppercase"
          style={{ color: "hsl(var(--stage-pregnancy-accent))" }}
        >
          A photo for this chapter
        </p>
      </div>

      <h2 className="font-serif text-[1.55rem] sm:text-[1.85rem] md:text-[2.05rem] text-foreground leading-[1.18] mb-3 sm:mb-4 max-w-[26ch]">
        One image to keep this week.
      </h2>
      <p className="font-sans text-[13.5px] sm:text-[14px] font-light italic text-foreground/55 mb-8 sm:mb-10 max-w-[42ch]">
        A bump photo, a quiet moment, your hand on your belly — anything that holds the feel of this week.
      </p>

      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => handleFiles(e.target.files)}
      />

      {state === "loading" && (
        <div
          className="rounded-[28px] border bg-card/60 h-[260px] sm:h-[320px] animate-pulse"
          style={{ borderColor: "hsl(var(--stage-pregnancy-accent) / 0.18)" }}
        />
      )}

      {(state === "empty" || state === "uploading") && !signedUrl && (
        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          disabled={state === "uploading"}
          className="group relative w-full rounded-[28px] border-2 border-dashed flex flex-col items-center justify-center gap-4 px-6 py-16 sm:py-20 transition-all hover:shadow-[0_8px_40px_-16px_hsl(var(--stage-pregnancy-accent)/0.28)]"
          style={{
            borderColor: "hsl(var(--stage-pregnancy-accent) / 0.3)",
            background:
              "linear-gradient(180deg, hsl(var(--card)) 0%, hsl(var(--stage-pregnancy) / 0.18) 100%)",
          }}
        >
          <span
            className="w-14 h-14 rounded-full flex items-center justify-center"
            style={{
              backgroundColor: "hsl(var(--stage-pregnancy-accent) / 0.1)",
              color: "hsl(var(--stage-pregnancy-accent))",
            }}
          >
            <Camera size={22} strokeWidth={1.4} />
          </span>
          <p className="font-serif italic text-[1.05rem] text-foreground/70 text-center max-w-[28ch]">
            {state === "uploading" ? "Holding your photo…" : "Capture this week."}
          </p>
          <span className="font-sans text-[12px] font-light tracking-[0.18em] uppercase text-foreground/45">
            {state === "uploading" ? "Saving" : "Choose a photo"}
          </span>
          <div className="flex items-center gap-2 mt-2 text-foreground/40">
            <Lock size={11} strokeWidth={1.6} />
            <span className="font-sans text-[10.5px] font-light tracking-[0.18em] uppercase">
              Private to you
            </span>
          </div>
        </button>
      )}

      {state === "loaded" && signedUrl && (
        <figure
          className="relative rounded-[28px] overflow-hidden border bg-card shadow-[0_8px_40px_-16px_hsl(var(--stage-pregnancy-accent)/0.22)]"
          style={{ borderColor: "hsl(var(--stage-pregnancy-accent) / 0.18)" }}
        >
          <img
            src={signedUrl}
            alt={`Week ${week} — ${chapterTitle}`}
            className="w-full max-h-[560px] object-cover"
          />
          {/* Top privacy seal */}
          <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/35 backdrop-blur-sm text-white/95">
            <Lock size={11} strokeWidth={1.8} />
            <span className="font-sans text-[10.5px] font-light tracking-[0.18em] uppercase">
              Private
            </span>
          </div>
          {/* Action row */}
          <div className="absolute top-4 right-4 flex items-center gap-2">
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              className="px-3 py-1.5 rounded-full bg-black/35 backdrop-blur-sm text-white/95 hover:bg-black/50 transition-colors flex items-center gap-1.5"
              aria-label="Replace photo"
            >
              <ImagePlus size={12} strokeWidth={1.8} />
              <span className="font-sans text-[10.5px] font-light tracking-[0.18em] uppercase">
                Replace
              </span>
            </button>
            <button
              type="button"
              onClick={handleRemove}
              className="w-8 h-8 rounded-full bg-black/35 backdrop-blur-sm text-white/95 hover:bg-black/50 transition-colors flex items-center justify-center"
              aria-label="Remove photo"
            >
              <X size={14} strokeWidth={1.8} />
            </button>
          </div>
          <figcaption
            className="px-5 py-4 border-t font-sans text-[12px] font-light tracking-[0.16em] uppercase text-foreground/55"
            style={{ borderColor: "hsl(var(--stage-pregnancy-accent) / 0.16)" }}
          >
            Week {week} · {chapterTitle} · Held privately
          </figcaption>
        </figure>
      )}

      {error && (
        <p className="font-sans text-[12.5px] font-light text-destructive mt-3">
          {error}
        </p>
      )}
    </section>
  );
};

export default SlotPhotoMemory;
