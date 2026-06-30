import { Check } from "lucide-react";

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

const accent = "hsl(var(--stage-toddler-accent))";
const accentSoft = "hsl(var(--stage-toddler-accent) / 0.08)";
const accentMid = "hsl(var(--stage-toddler-accent) / 0.22)";
const accentBorder = "hsl(var(--stage-toddler-accent) / 0.22)";
const accentBorderStrong = "hsl(var(--stage-toddler-accent) / 0.3)";
const deep = "hsl(var(--stage-toddler-deep))";
const deepSoft = "hsl(var(--stage-toddler-deep) / 0.72)";

const ToddlerWhatThisCovers = () => {
  return (
    <section className="py-24 md:py-28 bg-parchment">
      <div className="container mx-auto px-5 sm:px-8 md:px-10 max-w-4xl">
        <div className="text-center mb-12 md:mb-14">
          <span className="mx-auto block h-px w-10 mb-6" style={{ backgroundColor: accentMid }} />
          <p className="font-sans text-[11px] font-light tracking-[0.34em] uppercase mb-3" style={{ color: accent }}>
            What this hub covers
          </p>
          <h2 className="font-serif text-[2rem] md:text-[2.4rem] mb-4 leading-tight" style={{ color: deep }}>
            The toddler years, gently mapped
          </h2>
          <p className="font-sans text-[15px] font-light max-w-xl mx-auto leading-relaxed" style={{ color: deepSoft }}>
            Honest guidance across the eight areas parents ask about most, written to be read in a quiet moment.
          </p>
        </div>

        <div
          className="relative rounded-[26px] border bg-parchment p-7 sm:p-10 md:p-12 overflow-hidden"
          style={{
            borderColor: accentBorder,
            boxShadow:
              "0 22px 56px -36px rgba(70,40,20,0.26), inset 0 1px 0 hsl(0 0% 100% / 0.7)",
          }}
        >
          <span
            className="pointer-events-none absolute -top-16 -left-16 h-56 w-56 rounded-full blur-3xl opacity-70"
            style={{ background: "hsl(var(--stage-toddler) / 0.35)" }}
            aria-hidden
          />
          <ul className="relative grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
            {pillars.map(({ title, body }) => (
              <li key={title} className="flex items-start gap-3.5">
                <span
                  className="mt-0.5 grid place-items-center h-6 w-6 rounded-full shrink-0 border"
                  style={{
                    backgroundColor: accentSoft,
                    borderColor: accentBorderStrong,
                  }}
                  aria-hidden
                >
                  <Check size={12} strokeWidth={2.2} style={{ color: accent }} />
                </span>
                <div>
                  <h3 className="font-serif text-[1.1rem] mb-1" style={{ color: deep }}>
                    {title}
                  </h3>
                  <p className="font-sans text-[14.5px] font-light leading-relaxed" style={{ color: deepSoft }}>
                    {body}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default ToddlerWhatThisCovers;
