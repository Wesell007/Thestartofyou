import { Check } from "lucide-react";
import sprigImg from "@/assets/topic-mini-sprig.png";

const STAGE_BG = "--stage-ttc";
const STAGE_ACCENT = "--stage-ttc-accent";

const hubBullets = [
  "How your cycle works, what ovulation looks like, and when your fertile window opens",
  "Cycle tracking that helps without taking over: what's useful, what's noise",
  "Preconception health: nutrition, supplements, and small steady habits that matter",
  "The emotional shape of trying: hope, waiting, and the weeks that feel uneven",
  "Pregnancy tests, two-week-wait questions, and how to read what your body is telling you",
  "Honest guidance on age, conditions, male fertility, and when to seek a clinic",
];

const TTCWhatThisCovers = () => {
  return (
    <section className="pt-10 md:pt-14 pb-14 md:pb-20 bg-parchment">
      <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl">
        <div
          className="relative rounded-[2rem] bg-card border p-8 sm:p-10 md:p-14 overflow-hidden"
          style={{
            borderColor: `hsl(var(${STAGE_ACCENT}) / 0.18)`,
            boxShadow: `0 1px 0 hsl(var(--parchment) / 0.9) inset, 0 22px 50px -30px hsl(var(${STAGE_ACCENT}) / 0.28)`,
          }}
        >
          <img
            src={sprigImg}
            alt=""
            aria-hidden="true"
            className="hidden md:block absolute -top-4 right-6 w-16 lg:w-20 opacity-40 pointer-events-none select-none rotate-12"
          />

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
            Trying to conceive isn't a checklist, it's a stretch of time with
            its own questions, rhythms, and quiet uncertainty. This hub gathers
            calm, practical guidance for every part of it.
          </p>
          <p className="font-sans text-[13.5px] font-light text-muted-foreground/80 leading-relaxed max-w-2xl mb-8">
            If your path moves toward treatment, the IVF guide picks up from
            there. TTC stays with cycle, timing, and the wait.
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

export default TTCWhatThisCovers;
