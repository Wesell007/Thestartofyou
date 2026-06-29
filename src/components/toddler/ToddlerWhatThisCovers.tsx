const pillars = [
  { title: "Development", body: "Movement, fine motor skills and how toddlers learn through doing." },
  { title: "Behaviour", body: "Tantrums, big feelings, boundaries and what is age-typical." },
  { title: "Speech & language", body: "Words, sentences, understanding and when to seek support." },
  { title: "Sleep", body: "Naps fading, night waking, transitions and routines that hold." },
  { title: "Food & eating", body: "Picky days, refusals, mealtimes and growing independence." },
  { title: "Potty training", body: "Readiness signs, gentle starts and what's normal along the way." },
  { title: "Health & illness", body: "Common toddler bugs, fevers and when something needs a GP." },
  { title: "Play & connection", body: "Calm play ideas, screen time and emotional attunement." },
];

const ToddlerWhatThisCovers = () => {
  return (
    <section className="py-24 md:py-28">
      <div className="container mx-auto px-5 sm:px-8 md:px-10 max-w-4xl">
        <div className="text-center mb-14 md:mb-16">
          <span className="mx-auto block h-px w-10 mb-6" style={{ backgroundColor: "hsl(var(--stage-toddler-accent) / 0.5)" }} />
          <p className="font-sans text-[11px] font-light tracking-[0.34em] uppercase mb-3" style={{ color: "hsl(var(--stage-toddler-accent))" }}>
            What this hub covers
          </p>
          <h2 className="font-serif text-[2rem] md:text-[2.4rem] mb-4 leading-tight" style={{ color: "hsl(var(--stage-toddler-deep))" }}>
            The toddler years, gently mapped
          </h2>
          <p className="font-sans text-[15px] font-light text-foreground/65 max-w-xl mx-auto leading-relaxed">
            Honest guidance across the eight areas parents ask about most, written to be read in a quiet moment.
          </p>
        </div>

        <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
          {pillars.map(({ title, body }) => (
            <li key={title} className="flex gap-4">
              <span className="mt-2.5 h-px w-7 shrink-0" style={{ backgroundColor: "hsl(var(--stage-toddler-accent) / 0.6)" }} />
              <div>
                <h3 className="font-serif text-[1.15rem] mb-1.5" style={{ color: "hsl(var(--stage-toddler-deep))" }}>
                  {title}
                </h3>
                <p className="font-sans text-[14.5px] font-light text-foreground/65 leading-relaxed">
                  {body}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default ToddlerWhatThisCovers;
