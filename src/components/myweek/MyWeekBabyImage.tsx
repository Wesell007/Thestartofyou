const babyImages = import.meta.glob(
  "../../assets/myweek-weekly-babies/myweek-baby-week-*.{png,jpg}",
  {
    eager: true,
    import: "default",
  },
) as Record<string, string>;

interface Props {
  week: number;
  className?: string;
  imgClassName?: string;
  /** Set for genuinely above-the-fold/critical instances only. */
  eager?: boolean;
}

const getBabyImage = (week: number) => {
  const w = Math.min(Math.max(Math.round(week), 1), 42);
  const suffix = String(w).padStart(2, "0");
  const base = `../../assets/myweek-weekly-babies/myweek-baby-week-${suffix}`;
  return babyImages[`${base}.jpg`] ?? babyImages[`${base}.png`];
};

const MyWeekBabyImage = ({ week, className, imgClassName, eager = false }: Props) => {
  const w = Math.min(Math.max(Math.round(week), 1), 42);
  const src = getBabyImage(w);
  const alt =
    w >= 41
      ? `Soft rendered birth-transition illustration for week ${w}`
      : w <= 4
      ? `Soft rendered earliest pregnancy development illustration for week ${w}`
      : `Soft rendered week-specific pregnancy development illustration for week ${w}`;

  return (
    <div className={className} data-baby-week={w}>
      <img
        src={src}
        alt={alt}
        loading={eager ? "eager" : "lazy"}
        decoding="async"
        className={imgClassName}
      />
    </div>
  );
};


export default MyWeekBabyImage;