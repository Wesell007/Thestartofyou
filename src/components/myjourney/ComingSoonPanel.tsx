const items = [
  { label: "Birth plan", note: "Draft your preferences, kept in one place." },
  { label: "Hospital bag", note: "A checklist that remembers what matters." },
  { label: "Appointment notes", note: "Questions, dates and what was said." },
  { label: "AI memory", note: "Your Ask conversations, kept in context." },
];

const ComingSoonPanel = () => {
  const accent = "hsl(var(--stage-pregnancy-accent))";
  return (
    <section
      className="rounded-[22px] px-6 sm:px-8 py-7 sm:py-8 mt-2 mb-12"
      style={{
        background: "hsl(var(--card) / 0.6)",
        border: "1px dashed hsl(var(--stage-pregnancy-accent) / 0.28)",
      }}
      aria-label="Coming later to your journey"
    >
      <p
        className="font-sans text-[10px] font-medium tracking-[0.3em] uppercase mb-3"
        style={{ color: accent }}
      >
        Coming later
      </p>
      <p className="font-serif italic text-foreground/65 text-[14.5px] leading-[1.55] mb-5 max-w-[46ch]">
        Quiet tools we're preparing, so your journey holds more than words alone.
      </p>
      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
        {items.map((it) => (
          <li key={it.label} aria-disabled className="opacity-80">
            <p className="font-serif font-medium text-foreground/80 text-[15px] leading-[1.35] mb-1">
              {it.label}
            </p>
            <p className="font-serif italic text-foreground/55 text-[13.5px] leading-[1.5]">
              {it.note}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default ComingSoonPanel;
