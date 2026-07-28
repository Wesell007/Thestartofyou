interface Props {
  reflections: number;
  photos: number;
  videos: number;
  weeksKept: number;
}

const MomentsKeptSummary = ({ reflections, photos, videos, weeksKept }: Props) => {
  const accent = "hsl(var(--stage-pregnancy-accent))";
  const items = [
    { label: "Reflections", value: reflections },
    { label: "Photos", value: photos },
    { label: "Videos", value: videos },
    { label: "Weeks kept", value: weeksKept },
  ];
  const isEmpty = reflections + photos + videos + weeksKept === 0;

  return (
    <section
      className="rounded-[22px] keepsake-surface px-6 sm:px-8 py-6 sm:py-7 mb-12 sm:mb-14"
      style={{ borderColor: "hsl(var(--stage-pregnancy-accent) / 0.16)" }}
    >
      <p
        className="font-sans text-[10px] font-medium tracking-[0.3em] uppercase mb-4"
        style={{ color: accent }}
      >
        Moments kept
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
        {items.map((item) => (
          <div key={item.label}>
            <p
              className="font-serif font-medium text-foreground leading-none mb-2"
              style={{ fontSize: "clamp(1.7rem, 3.2vw, 2.15rem)" }}
            >
              {item.value}
            </p>
            <p className="font-sans text-[10.5px] font-medium tracking-[0.22em] uppercase text-foreground/70">
              {item.label}
            </p>
          </div>
        ))}
      </div>
      {isEmpty && (
        <p className="font-serif text-foreground/75 text-[14.5px] leading-[1.6] mt-5 max-w-[46ch]">
          Nothing kept yet, and that's alright. Anything you save from My Week will gather here.
        </p>
      )}
    </section>
  );
};

export default MomentsKeptSummary;
