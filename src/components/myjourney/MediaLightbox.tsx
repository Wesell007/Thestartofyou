import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { cn } from "@/lib/utils";

export type LightboxTile =
  | { kind: "photo"; week: number; url: string; caption?: string | null }
  | { kind: "video"; week: number; url: string; caption?: string | null; mimeType?: string | null }
  | { kind: "voice"; week: number; url: string; caption?: string | null; mimeType?: string | null };

interface Props {
  tiles: LightboxTile[];
  index: number | null;
  onIndexChange: (index: number) => void;
  onClose: () => void;
}

/**
 * Full-screen media viewer for My Journey. Uses the Radix Dialog primitive
 * directly so we can override the shadcn default max-width and keep the
 * frame calm and large. Focus is trapped by the primitive; Esc closes.
 * Left/right arrows cycle through the visible tile list.
 */
const MediaLightbox = ({ tiles, index, onIndexChange, onClose }: Props) => {
  const open = index !== null && index >= 0 && index < tiles.length;
  const tile = open ? tiles[index] : null;

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        onIndexChange((index! - 1 + tiles.length) % tiles.length);
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        onIndexChange((index! + 1) % tiles.length);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, index, tiles.length, onIndexChange]);

  const accent = "hsl(var(--stage-pregnancy-accent))";

  return (
    <DialogPrimitive.Root open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay
          className={cn(
            "fixed inset-0 z-50 bg-black/85 backdrop-blur-sm",
            "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
          )}
        />
        <DialogPrimitive.Content
          className={cn(
            "fixed inset-0 z-50 flex flex-col items-center justify-center p-4 sm:p-8",
            "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
            "focus:outline-none",
          )}
          onOpenAutoFocus={(e) => e.preventDefault()}
        >
          <DialogPrimitive.Title className="sr-only">
            {tile ? `Kept memory from week ${tile.week}` : "Kept memory"}
          </DialogPrimitive.Title>
          <DialogPrimitive.Description className="sr-only">
            Full-screen view of a saved photo, video or voice note from your pregnancy journey.
          </DialogPrimitive.Description>

          {tile && (
            <>
              {/* Top bar: week badge + close */}
              <div className="w-full max-w-[1100px] flex items-center justify-between mb-4 sm:mb-5">
                <span
                  className="inline-flex items-center rounded-full px-3 py-1 font-sans text-[10.5px] font-medium tracking-[0.24em] uppercase text-white"
                  style={{ background: "hsl(0 0% 100% / 0.14)", border: "1px solid hsl(0 0% 100% / 0.2)" }}
                >
                  Week {tile.week}
                </span>
                <DialogPrimitive.Close
                  className="inline-flex items-center rounded-full px-3 py-1 font-sans text-[10.5px] font-medium tracking-[0.24em] uppercase text-white/85 hover:text-white transition-colors"
                  style={{ background: "hsl(0 0% 100% / 0.08)", border: "1px solid hsl(0 0% 100% / 0.18)" }}
                >
                  Close
                </DialogPrimitive.Close>
              </div>

              {/* Media frame */}
              <div className="relative w-full max-w-[1100px] flex-1 min-h-0 flex items-center justify-center">
                {tiles.length > 1 && (
                  <button
                    type="button"
                    aria-label="Previous memory"
                    onClick={() => onIndexChange((index! - 1 + tiles.length) % tiles.length)}
                    className="hidden sm:flex absolute left-0 -translate-x-[calc(100%+8px)] items-center justify-center h-11 w-11 rounded-full text-white/85 hover:text-white transition-colors"
                    style={{ background: "hsl(0 0% 100% / 0.08)", border: "1px solid hsl(0 0% 100% / 0.18)" }}
                  >
                    <ChevronLeft size={20} strokeWidth={1.8} />
                  </button>
                )}
                <div className="w-full flex items-center justify-center">
                  {tile.kind === "photo" ? (
                    <img
                      src={tile.url}
                      alt={`Photo saved in week ${tile.week}`}
                      className="max-w-full max-h-[75vh] w-auto h-auto object-contain rounded-[16px]"
                      style={{ border: "1px solid hsl(0 0% 100% / 0.12)" }}
                    />
                  ) : tile.kind === "voice" ? (
                    <div
                      className="w-full max-w-[560px] rounded-[18px] px-6 py-7"
                      style={{
                        background: "hsl(0 0% 100% / 0.06)",
                        border: "1px solid hsl(0 0% 100% / 0.16)",
                      }}
                    >
                      <p className="font-sans text-[10.5px] font-medium tracking-[0.26em] uppercase text-white/70 mb-4">
                        Voice note
                      </p>
                      <audio
                        key={tile.url}
                        src={tile.url}
                        controls
                        preload="metadata"
                        className="w-full"
                      />
                    </div>
                  ) : (
                    <video
                      key={tile.url}
                      src={tile.url}
                      controls
                      preload="metadata"
                      playsInline
                      muted
                      className="max-w-full max-h-[75vh] w-auto h-auto rounded-[16px] bg-black"
                      style={{ border: "1px solid hsl(0 0% 100% / 0.12)" }}
                    />
                  )}
                </div>
                {tiles.length > 1 && (
                  <button
                    type="button"
                    aria-label="Next memory"
                    onClick={() => onIndexChange((index! + 1) % tiles.length)}
                    className="hidden sm:flex absolute right-0 translate-x-[calc(100%+8px)] items-center justify-center h-11 w-11 rounded-full text-white/85 hover:text-white transition-colors"
                    style={{ background: "hsl(0 0% 100% / 0.08)", border: "1px solid hsl(0 0% 100% / 0.18)" }}
                  >
                    <ChevronRight size={20} strokeWidth={1.8} />
                  </button>
                )}
              </div>

              {/* Caption + open link */}
              <div className="w-full max-w-[1100px] mt-4 sm:mt-6 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
                <div className="flex-1 min-w-0">
                  {tile.caption && (
                    <p className="font-serif italic text-white/85 text-[14.5px] sm:text-[15px] leading-[1.6] max-w-[62ch]">
                      {tile.caption}
                    </p>
                  )}
                </div>
                <Link
                  to={`/my-week/${tile.week}`}
                  onClick={onClose}
                  className="group inline-flex items-center gap-2 font-sans text-[11.5px] font-medium tracking-[0.22em] uppercase text-white/85 hover:text-white transition-colors shrink-0"
                  style={{ color: "hsl(0 0% 100% / 0.9)" }}
                >
                  Open Week {tile.week}
                  <ArrowRight size={13} strokeWidth={1.7} className="transition-transform group-hover:translate-x-0.5" />
                </Link>
              </div>

              {/* Mobile prev/next below caption */}
              {tiles.length > 1 && (
                <div className="sm:hidden mt-4 flex items-center justify-between w-full max-w-[1100px]">
                  <button
                    type="button"
                    aria-label="Previous memory"
                    onClick={() => onIndexChange((index! - 1 + tiles.length) % tiles.length)}
                    className="inline-flex items-center justify-center h-10 w-10 rounded-full text-white/85"
                    style={{ background: "hsl(0 0% 100% / 0.08)", border: "1px solid hsl(0 0% 100% / 0.18)" }}
                  >
                    <ChevronLeft size={18} strokeWidth={1.8} />
                  </button>
                  <span className="font-sans text-[10.5px] font-medium tracking-[0.24em] uppercase text-white/60">
                    {index! + 1} / {tiles.length}
                  </span>
                  <button
                    type="button"
                    aria-label="Next memory"
                    onClick={() => onIndexChange((index! + 1) % tiles.length)}
                    className="inline-flex items-center justify-center h-10 w-10 rounded-full text-white/85"
                    style={{ background: "hsl(0 0% 100% / 0.08)", border: "1px solid hsl(0 0% 100% / 0.18)" }}
                  >
                    <ChevronRight size={18} strokeWidth={1.8} />
                  </button>
                </div>
              )}
            </>
          )}
          <span aria-hidden="true" style={{ color: accent }} className="sr-only" />
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
};

export default MediaLightbox;
