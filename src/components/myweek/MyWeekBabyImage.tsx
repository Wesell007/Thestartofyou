const babyImages = import.meta.glob("@/assets/myweek-weekly-babies/myweek-baby-week-*.png", {
  eager: true,
  import: "default",
}) as Record<string, string>;

interface Props {
  week: number;
  className?: string;
  imgClassName?: string;
}

const getBabyImage = (week: number) => {
  const w = Math.min(Math.max(Math.round(week), 1), 42);
  const suffix = String(w).padStart(2, "0");
  return babyImages[`/src/assets/myweek-weekly-babies/myweek-baby-week-${suffix}.png`];
};

const MyWeekBabyImage = ({ week, className, imgClassName }: Props) => {
  const w = Math.min(Math.max(Math.round(week), 1), 42);
  const src = getBabyImage(w);

  return (
    <div className={className} data-baby-week={w}>
      <img
        src={src}
        alt={`Soft rendered fetal development illustration for week ${w}`}
        loading="eager"
        decoding="async"
        className={imgClassName}
      />
    </div>
  );
};

export default MyWeekBabyImage;