import { useEffect, useRef, useState } from "react";
import { Lock, X, ImagePlus } from "lucide-react";
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
 * Empty state is now a held frame, not an upload prompt:
 *   - Four corner ticks suggest a kept space
 *   - Centred chapter title and "Awaiting" seal sit inside the frame
 *   - The tiny "add a photo" affordance lives in the lower margin —
 *     present but never the protagonist
 */
const SlotPhotoMemory = ({ userId, week, chapterTitle }: Props) => {
  const [state, setState] = useState<LoadState>("loading");
  const [signedUrl, setSignedUrl] = useState<string | null>(null);
  const [storagePath, setStoragePath] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

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
          .createSignedUrl(data.storage_path, 60 * 60);
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
    <section className="relative pt-10 pb-2">
      {/* Section label */}
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
          A photo for this chapter
        </p>
      </div>

      <h2 className="font-serif text-[1.4rem] sm:text-[1.55rem] text-foreground leading-[1.18] mb-2 max-w-[26ch]">
        One image to keep this week.
      </h2>
      <p className="font-sans text-[13px] font-light italic text-foreground/55 mb-7 max-w-[42ch]">
        A bump photo, your hand on your belly — anything that holds the feel of this week.
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
          className="rounded-[24px] bg-card/60 h-[260px] animate-pulse"
          style={{ border: "1px solid hsl(var(--stage-pregnancy-accent) / 0.14)" }}
        />
      )}

      {(state === "empty" || state === "uploading") && !signedUrl && (
        <div className="space-y-4">
          {/* Held frame — corner ticks suggest a kept space */}
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            disabled={state === "uploading"}
            className="group relative w-full aspect-[4/5] sm:aspect-[5/6] rounded-[24px] overflow-hidden flex items-center justify-center transition-all duration-700 hover:bg-[hsl(var(--stage-pregnancy)/0.18)]"
            style={{
              background:
                "linear-gradient(180deg, hsl(var(--card)) 0%, hsl(var(--stage-pregnancy) / 0.14) 100%)",
              boxShadow:
                "inset 0 1px 0 hsl(0 0% 100% / 0.5), 0 1px 0 hsl(var(--stage-pregnancy-accent) / 0.08)",
            }}
            aria-label={`Add a photo for week ${week}`}
          >
            {/* Corner ticks */}
            {[
              { top: 18, left: 18, rot: 0 },
              { top: 18, right: 18, rot: 90 },
              { bottom: 18, right: 18, rot: 180 },
              { bottom: 18, left: 18, rot: 270 },
            ].map((c, i) => (
              <span
                key={i}
                aria-hidden="true"
                className="absolute pointer-events-none"
                style={{
                  ...c,
                  width: 18,
                  height: 18,
                  borderTop: "1px solid hsl(var(--stage-pregnancy-accent) / 0.5)",
                  borderLeft: "1px solid hsl(var(--stage-pregnancy-accent) / 0.5)",
                  transform: `rotate(${c.rot}deg)`,
                }}
              />
            ))}

            {/* Held centre — chapter title in waiting */}
            <div className="relative flex flex-col items-center text-center px-6">
              <span
                className="font-sans text-[10px] font-medium tracking-[0.28em] uppercase mb-3"
                style={{ color: "hsl(var(--stage-pregnancy-accent))" }}
              >
                Week {week}
              </span>
              <p className="font-serif italic text-[1.3rem] sm:text-[1.45rem] text-foreground/68 leading-snug max-w-[18ch]">
                {chapterTitle}
              </p>
              <span className="font-sans text-[10px] font-light tracking-[0.3em] uppercase text-foreground/40 mt-5">
                {state === "uploading" ? "Holding…" : "A frame held for this week"}
              </span>
            </div>
          </button>

          {/* Quiet affordance — sits below, never the protagonist */}
          <div className="flex items-center justify-between gap-3 px-1">
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              disabled={state === "uploading"}
              className="font-sans text-[11px] font-medium tracking-[0.22em] uppercase text-foreground/55 hover:text-foreground/85 transition-colors"
            >
              {state === "uploading" ? "Saving" : "Add a photo"}
            </button>
            <span className="flex items-center gap-1.5 text-foreground/40">
              <Lock size={10} strokeWidth={1.6} />
              <span className="font-sans text-[10px] font-medium tracking-[0.22em] uppercase">
                Private to you
              </span>
            </span>
          </div>
        </div>
      )}

      {state === "loaded" && signedUrl && (
        <figure
          className="relative rounded-[24px] overflow-hidden held-image bg-card"
        >
          <img
            src={signedUrl}
            alt={`Week ${week} — ${chapterTitle}`}
            className="w-full max-h-[520px] object-cover"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none"
            style={{
              boxShadow: "inset 0 0 80px hsl(222 14% 12% / 0.08)",
            }}
          />
          <div className="absolute top-3 left-3 flex items-center gap-2 px-2.5 py-1 rounded-full bg-foreground/40 backdrop-blur-md text-background/95">
            <Lock size={10} strokeWidth={1.8} />
            <span className="font-sans text-[10px] font-medium tracking-[0.22em] uppercase">
              Private
            </span>
          </div>
          <div className="absolute top-3 right-3 flex items-center gap-2">
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              className="px-2.5 py-1 rounded-full bg-foreground/40 backdrop-blur-md text-background/95 hover:bg-foreground/55 transition-colors flex items-center gap-1.5"
              aria-label="Replace photo"
            >
              <ImagePlus size={11} strokeWidth={1.8} />
              <span className="font-sans text-[10px] font-medium tracking-[0.22em] uppercase">
                Replace
              </span>
            </button>
            <button
              type="button"
              onClick={handleRemove}
              className="w-7 h-7 rounded-full bg-foreground/40 backdrop-blur-md text-background/95 hover:bg-foreground/55 transition-colors flex items-center justify-center"
              aria-label="Remove photo"
            >
              <X size={12} strokeWidth={1.8} />
            </button>
          </div>
          <figcaption
            className="px-5 py-3 border-t font-serif italic text-[12.5px] text-foreground/60 tracking-wide flex items-center justify-between"
            style={{
              borderColor: "hsl(var(--stage-pregnancy-accent) / 0.16)",
              background: "hsl(var(--stage-pregnancy) / 0.18)",
            }}
          >
            <span>Week {week} · {chapterTitle}</span>
            <span className="font-sans not-italic text-[10px] font-medium tracking-[0.22em] uppercase text-foreground/45">
              Held privately
            </span>
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
