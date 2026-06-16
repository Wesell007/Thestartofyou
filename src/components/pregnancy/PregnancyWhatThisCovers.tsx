import { Check } from "lucide-react";

const STAGE_BG = "--stage-pregnancy";
const STAGE_ACCENT = "--stage-pregnancy-accent";

const hubBullets = [
  "How your body changes, what symptoms are normal, and when to seek reassurance",
  "Your baby's development, scan appointments, and what to expect at each stage",
  "Emotional wellbeing, anxiety, and how to feel supported through the weeks",
  "Health and safety: medicines, vaccinations, appointments, and common concerns",
  "Diet, nutrition, food safety, and safe ways to stay active during pregnancy",
  "Preparing for birth and baby: decisions, planning, and late-pregnancy choices",
];

const PregnancyWhatThisCovers = () => {
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
          <p className="font-sans text-[15px] font-light text-muted-foreground leading-relaxed max-w-2xl mb-3">
            Pregnancy brings physical changes, emotional shifts, and plenty of
            questions. This hub gathers trusted guidance across every stage so
            you can feel informed, reassured, and prepared.
          </p>
          <p className="font-sans text-[13.5px] font-light text-muted-foreground/80 leading-relaxed max-w-2xl mb-8">
            If you arrived here after IVF, the cautious early weeks and clinic
            handover are held inside the IVF pathway — pregnancy picks up the
            forward journey from there.
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

export default PregnancyWhatThisCovers;
