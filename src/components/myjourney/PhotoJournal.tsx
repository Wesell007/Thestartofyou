import { Link } from "react-router-dom";

interface PhotoItem {
  week: number;
  url: string;
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
        <p className="font-serif italic text-foreground/55 text-[14.5px] leading-[1.5]">
          The weeks you have chosen to see again.
        </p>
      </div>

      {photos.length === 0 ? (
        <div
          className="rounded-[20px] keepsake-surface px-6 sm:px-7 py-7 sm:py-8"
          style={{ borderColor: "hsl(var(--stage-pregnancy-accent) / 0.16)" }}
        >
          <p className="font-serif italic text-foreground/68 text-[15px] leading-[1.6] max-w-[46ch] mb-4">
            No photos kept yet. When it feels right, you can begin with this week.
          </p>
          <Link
            to={`/my-week/${currentWeek}`}
            className="inline-flex items-center rounded-full px-5 py-2 font-sans text-[11.5px] font-medium tracking-[0.2em] uppercase transition-all hover:bg-[hsl(var(--stage-pregnancy-accent)/0.08)]"
            style={{ color: accent, border: "1px solid hsl(var(--stage-pregnancy-accent) / 0.4)" }}
          >
            Add a photo memory
          </Link>
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
