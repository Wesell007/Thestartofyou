import { Check } from "lucide-react";

const STAGE_BG = "--stage-ivf";
const STAGE_ACCENT = "--stage-ivf-accent";

const hubBullets = [
  "Understanding IVF: what it is, when it's used, and how the process is structured",
  "Medication, injections, scans, and how to follow your protocol with less overwhelm",
  "Egg collection, embryo transfer, and what each clinical stage actually feels like",
  "The two-week wait: what's normal, what isn't, and how to cope with the uncertainty",
  "Emotional support through waiting, hope, setbacks, and decision-making",
  "What happens after results: early pregnancy, next steps, or trying again",
];

const IVFWhatThisCovers = () => {
  return (
    <section className="pb-14 md:pb-20 bg-parchment">
      <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl">
        <div
          className="relative rounded-[2rem] bg-card border p-8 sm:p-10 md:p-14 overflow-hidden"
          style={{
            borderColor: `hsl(var(${STAGE_ACCENT}) / 0.18)`,
            boxShadow: `0 1px 0 hsl(var(--parchment) / 0.9) inset, 0 22px 50px -30px hsl(var(${STAGE_ACCENT}) / 0.28)`,
          }}
        >
          <p
            className="font-sans text-[11px] font-light tracking-[0.24em] uppercase mb-3"
            style={{ color: `hsl(var(${STAGE_ACCENT}))` }}
          >
            Our starting point
          </p>
          <h2 className="font-serif text-2xl sm:text-3xl md:text-[2rem] text-foreground leading-tight mb-4">
            What this hub <span className="italic font-normal">covers</span>
          </h2>
          <p className="font-sans text-[15px] font-light text-muted-foreground leading-relaxed max-w-2xl mb-8">
            IVF is a medically structured process with an emotional pace of its
            own. This hub brings the practical, the clinical, and the emotional
            together so you can move through each stage with more clarity.
          </p>

          <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-4">
            {hubBullets.map((b) => (
              <li key={b} className="flex items-start gap-3">
                <span
                  aria-hidden="true"
                  className="mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full shrink-0"
                  style={{
                    background: `hsl(var(${STAGE_BG}) / 0.9)`,
                    color: `hsl(var(${STAGE_ACCENT}))`,
                  }}
                >
                  <Check size={12} strokeWidth={2.4} />
                </span>
                <span className="font-sans text-[14.5px] font-light text-foreground/85 leading-relaxed">
                  {b}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default IVFWhatThisCovers;
