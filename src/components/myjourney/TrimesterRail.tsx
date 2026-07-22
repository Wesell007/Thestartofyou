interface Props {
  currentWeek: number;
}

const SEGMENTS = [
  { label: "Trimester 1", min: 1, max: 13 },
  { label: "Trimester 2", min: 14, max: 27 },
  { label: "Trimester 3", min: 28, max: 42 },
];

const TrimesterRail = ({ currentWeek }: Props) => {
  const accent = "hsl(var(--stage-pregnancy-accent))";
  return (
    <section className="mb-12 sm:mb-14" aria-label="Trimester progress">
      <div className="flex items-end justify-between mb-2.5">
        {SEGMENTS.map((seg) => {
          const active = currentWeek >= seg.min && currentWeek <= seg.max;
          return (
            <div key={seg.label} className="flex-1 text-center">
              <p
                className="font-sans text-[10px] font-medium tracking-[0.28em] uppercase"
                style={{ color: active ? accent : "hsl(var(--foreground) / 0.4)" }}
              >
                {seg.label}
              </p>
            </div>
          );
        })}
      </div>
      <div className="flex gap-2">
        {SEGMENTS.map((seg) => {
          const span = seg.max - seg.min + 1;
          const clamped = Math.max(0, Math.min(currentWeek - seg.min + 1, span));
          const pct = (clamped / span) * 100;
          return (
            <div
              key={seg.label}
              className="flex-1 h-[6px] rounded-full overflow-hidden"
              style={{ background: "hsl(var(--stage-pregnancy-accent) / 0.12)" }}
            >
              <div
                className="h-full rounded-full transition-all"
                style={{
                  width: `${pct}%`,
                  background: "hsl(var(--stage-pregnancy-accent) / 0.72)",
                }}
              />
            </div>
          );
        })}
      </div>
      <div className="flex justify-between mt-2 font-sans text-[10.5px] tracking-[0.18em] uppercase text-foreground/45">
        <span>Week 1</span>
        <span>Week {currentWeek} · today</span>
        <span>Week 42</span>
      </div>
    </section>
  );
};

export default TrimesterRail;
