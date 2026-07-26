import { Link } from "react-router-dom";
import { ImagePlus } from "lucide-react";

interface PhotoItem {
  week: number;
  url: string;
  caption?: string | null;
}

interface Props {
  photos: PhotoItem[];
  currentWeek: number;
}

const PhotoJournal = ({ photos, currentWeek }: Props) => {
  const accent = "hsl(var(--stage-pregnancy-accent))";

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
          The weeks you have chosen to see again.
        </p>
      </div>

      {photos.length === 0 ? (
        <div
          className="relative rounded-[22px] keepsake-surface aspect-[5/3] sm:aspect-[16/9] flex items-center justify-center overflow-hidden"
          style={{ borderColor: "hsl(var(--stage-pregnancy-accent) / 0.18)" }}
        >
          {/* Corner ticks — the frame is held, not empty */}
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
              No photos kept yet. When it feels right, you can begin with this week.
            </p>
            <Link
              to={`/my-week/${currentWeek}`}
              className="inline-flex items-center gap-2 rounded-full px-5 py-2 font-sans text-[11.5px] font-medium tracking-[0.2em] uppercase transition-colors hover:bg-[hsl(var(--stage-pregnancy-accent)/0.1)]"
              style={{ color: accent, border: "1px solid hsl(var(--stage-pregnancy-accent) / 0.44)" }}
            >
              <ImagePlus size={12} strokeWidth={1.8} />
              Add a photo memory
            </Link>
          </div>
        </div>
      ) : (
        <ul className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
          {photos.map((p) => (
            <li key={p.week}>
              <Link
                to={`/my-week/${p.week}`}
                className="group block rounded-[16px] overflow-hidden relative aspect-square"
                style={{ border: "1px solid hsl(var(--stage-pregnancy-accent) / 0.18)" }}
              >
                <img
                  src={p.url}
                  alt={`Photo saved in week ${p.week}`}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
                <span
                  className="absolute bottom-0 left-0 right-0 px-3 py-2 font-sans text-[10px] font-medium tracking-[0.24em] uppercase text-white"
                  style={{
                    background:
                      "linear-gradient(180deg, transparent, hsl(222 14% 8% / 0.55))",
                  }}
                >
                  Week {p.week}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default PhotoJournal;
