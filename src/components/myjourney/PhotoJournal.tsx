import { useState } from "react";
import { Link } from "react-router-dom";
import { ImagePlus, Video as VideoIcon, Play } from "lucide-react";
import MediaLightbox, { type LightboxTile } from "./MediaLightbox";

interface PhotoItem {
  week: number;
  url: string;
  caption?: string | null;
}

export interface VideoItem {
  week: number;
  url: string;
  caption?: string | null;
  mimeType?: string | null;
  durationSeconds?: number | null;
}

interface Props {
  photos: PhotoItem[];
  videos?: VideoItem[];
  currentWeek: number;
}

type Tile =
  | { kind: "photo"; week: number; url: string; caption?: string | null; hasVideo: boolean }
  | { kind: "video"; week: number; url: string; caption?: string | null; mimeType?: string | null };

const PhotoJournal = ({ photos, videos = [], currentWeek }: Props) => {
  const accent = "hsl(var(--stage-pregnancy-accent))";
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const photoWeeks = new Set(photos.map((p) => p.week));
  const tiles: Tile[] = [
    ...photos.map<Tile>((p) => ({
      kind: "photo",
      week: p.week,
      url: p.url,
      caption: p.caption ?? null,
      hasVideo: videos.some((v) => v.week === p.week),
    })),
    ...videos
      .filter((v) => !photoWeeks.has(v.week))
      .map<Tile>((v) => ({
        kind: "video",
        week: v.week,
        url: v.url,
        caption: v.caption ?? null,
        mimeType: v.mimeType ?? null,
      })),
  ].sort((a, b) => b.week - a.week);

  const lightboxTiles: LightboxTile[] = tiles.map((t) =>
    t.kind === "photo"
      ? { kind: "photo", week: t.week, url: t.url, caption: t.caption ?? null }
      : { kind: "video", week: t.week, url: t.url, caption: t.caption ?? null, mimeType: t.mimeType ?? null },
  );

  return (
    <section className="mb-12 sm:mb-14">
      <div className="mb-5">
        <h2
          className="font-sans text-[10.5px] font-medium tracking-[0.3em] uppercase mb-2"
          style={{ color: accent }}
        >
          Photo journal
        </h2>
        <p className="font-serif text-foreground/75 text-[14.5px] leading-[1.55]">
          The weeks you have chosen to see again — photos and videos.
        </p>
      </div>

      {tiles.length === 0 ? (
        <div
          className="relative rounded-[22px] keepsake-surface aspect-[5/3] sm:aspect-[16/9] flex items-center justify-center overflow-hidden"
          style={{ borderColor: "hsl(var(--stage-pregnancy-accent) / 0.18)" }}
        >
          {[
            { top: 16, left: 16, rot: 0 },
            { top: 16, right: 16, rot: 90 },
            { bottom: 16, right: 16, rot: 180 },
            { bottom: 16, left: 16, rot: 270 },
          ].map((c, i) => (
            <span
              key={i}
              aria-hidden="true"
              className="absolute pointer-events-none"
              style={{
                ...c,
                width: 16,
                height: 16,
                borderTop: "1px solid hsl(var(--stage-pregnancy-accent) / 0.5)",
                borderLeft: "1px solid hsl(var(--stage-pregnancy-accent) / 0.5)",
                transform: `rotate(${c.rot}deg)`,
              }}
            />
          ))}
          <div className="flex flex-col items-center text-center px-6 py-8">
            <p
              className="font-sans text-[10px] font-medium tracking-[0.3em] uppercase mb-3"
              style={{ color: accent }}
            >
              A frame held
            </p>
            <p className="font-serif text-foreground/80 text-[15px] sm:text-[15.5px] leading-[1.6] max-w-[40ch] mb-5">
              No photos or videos kept yet. When it feels right, you can begin with this week.
            </p>
            <Link
              to={`/my-week/${currentWeek}`}
              className="inline-flex items-center gap-2 rounded-full px-5 py-2 font-sans text-[11.5px] font-medium tracking-[0.2em] uppercase transition-colors hover:bg-[hsl(var(--stage-pregnancy-accent)/0.1)]"
              style={{ color: accent, border: "1px solid hsl(var(--stage-pregnancy-accent) / 0.44)" }}
            >
              <ImagePlus size={12} strokeWidth={1.8} />
              Add a memory
            </Link>
          </div>
        </div>
      ) : (
        <ul className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
          {tiles.map((t, i) => (
            <li key={`${t.kind}-${t.week}`}>
              <button
                type="button"
                onClick={() => setOpenIndex(i)}
                aria-label={
                  t.kind === "photo"
                    ? `Open photo from week ${t.week}`
                    : `Open video from week ${t.week}`
                }
                className="group block w-full rounded-[16px] overflow-hidden relative aspect-square text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--stage-pregnancy-accent))] focus-visible:ring-offset-2"
                style={{ border: "1px solid hsl(var(--stage-pregnancy-accent) / 0.18)" }}
              >
                {t.kind === "photo" ? (
                  <img
                    src={t.url}
                    alt={`Photo saved in week ${t.week}`}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                ) : (
                  <>
                    <video
                      src={t.url}
                      preload="metadata"
                      playsInline
                      muted
                      className="w-full h-full object-cover pointer-events-none"
                    />
                    <span
                      aria-hidden="true"
                      className="absolute inset-0 flex items-center justify-center"
                    >
                      <span
                        className="inline-flex items-center justify-center h-11 w-11 rounded-full text-white"
                        style={{
                          background: "hsl(222 14% 8% / 0.55)",
                          border: "1px solid hsl(0 0% 100% / 0.4)",
                        }}
                      >
                        <Play size={16} strokeWidth={2} fill="currentColor" />
                      </span>
                    </span>
                  </>
                )}
                {(t.kind === "video" || (t.kind === "photo" && t.hasVideo)) && (
                  <span
                    className="absolute top-2 right-2 inline-flex items-center gap-1 rounded-full px-2 py-0.5 font-sans text-[9px] font-medium tracking-[0.2em] uppercase text-white"
                    style={{ background: "hsl(222 14% 8% / 0.65)" }}
                    aria-label={t.kind === "video" ? "Video" : "Video also kept for this week"}
                  >
                    <VideoIcon size={10} strokeWidth={1.8} aria-hidden="true" />
                    Video
                  </span>
                )}
                <div
                  className="absolute bottom-0 left-0 right-0 px-3 py-2 text-white"
                  style={{
                    background: "linear-gradient(180deg, transparent, hsl(222 14% 8% / 0.65))",
                  }}
                >
                  <span className="block font-sans text-[10px] font-medium tracking-[0.24em] uppercase">
                    Week {t.week}
                  </span>
                  {t.caption && (
                    <span className="block font-serif italic text-[12px] leading-[1.3] text-white/90 truncate mt-0.5">
                      {t.caption}
                    </span>
                  )}
                </div>
              </button>
            </li>
          ))}
        </ul>
      )}

      <MediaLightbox
        tiles={lightboxTiles}
        index={openIndex}
        onIndexChange={setOpenIndex}
        onClose={() => setOpenIndex(null)}
      />
    </section>
  );
};

export default PhotoJournal;
