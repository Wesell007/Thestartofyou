import { Check } from "lucide-react";

const STAGE_BG = "--stage-ivf";
const STAGE_ACCENT = "--stage-ivf-accent";

const hubBullets = [
  "Understanding IVF: what it is and how the process is structured",
  "Medication, scans, and following your protocol with less overwhelm",
  "Egg collection, embryo transfer, and the two-week wait",
  "Emotional support across waiting, hope, and difficult moments",
];

const IVFWhatThisCovers = () => {
  return (
    <section className="pb-14 md:pb-20 bg-parchment">
      <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl">
        <div
          className="relative rounded-[2rem] bg-card border p-8 sm:p-10 md:p-14 overflow-hidden"
          style={{
            borderColor: `hsl(var(${STAGE_ACCENT}) / 0.18)`,
            boxShadow: `0 1px 0 hsl(var(--parchment) / 0.9) inset, 0 30px 70px -40px hsl(var(${STAGE_ACCENT}) / 0.35)`,
          }}
        >
          {/* Decorative lilac wash */}
          <div
            aria-hidden
            className="pointer-events-none absolute -top-20 -right-20 w-72 h-72 rounded-full blur-3xl opacity-60"
            style={{ background: `hsl(var(${STAGE_BG}) / 0.5)` }}
          />
          <svg
            aria-hidden
            className="hidden md:block absolute top-6 right-8 w-16 opacity-50 pointer-events-none"
            viewBox="0 0 64 96" fill="none"
          >
            <path d="M32 4 Q 32 48 32 92" stroke={`hsl(var(${STAGE_ACCENT}))`} strokeWidth="0.7" opacity="0.5" />
            <path d="M32 24 Q 18 26 10 18" stroke={`hsl(var(${STAGE_ACCENT}))`} strokeWidth="0.7" opacity="0.4" />
            <path d="M32 24 Q 46 26 54 18" stroke={`hsl(var(${STAGE_ACCENT}))`} strokeWidth="0.7" opacity="0.4" />
            <path d="M32 50 Q 18 52 10 44" stroke={`hsl(var(${STAGE_ACCENT}))`} strokeWidth="0.7" opacity="0.4" />
            <path d="M32 50 Q 46 52 54 44" stroke={`hsl(var(${STAGE_ACCENT}))`} strokeWidth="0.7" opacity="0.4" />
            <circle cx="10" cy="18" r="1.6" fill={`hsl(var(${STAGE_ACCENT}))`} opacity="0.5" />
            <circle cx="54" cy="18" r="1.6" fill={`hsl(var(${STAGE_ACCENT}))`} opacity="0.5" />
            <circle cx="10" cy="44" r="2" fill={`hsl(var(${STAGE_ACCENT}))`} opacity="0.5" />
            <circle cx="54" cy="44" r="2" fill={`hsl(var(${STAGE_ACCENT}))`} opacity="0.5" />
          </svg>

          <div className="relative grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
            <div className="md:col-span-5">
              <p
                className="font-sans text-[11px] font-light tracking-[0.24em] uppercase mb-3"
                style={{ color: `hsl(var(${STAGE_ACCENT}))` }}
              >
                Our starting point
              </p>
              <h2 className="font-serif text-2xl sm:text-3xl md:text-[2rem] text-foreground leading-tight mb-4">
                What this hub <span className="italic font-normal">covers</span>
              </h2>
              <p className="font-sans text-[15px] font-light text-muted-foreground leading-relaxed mb-6">
                IVF is a medically structured process with an emotional pace of
                its own. This hub brings the practical, the clinical, and the
                emotional together so you can move through each stage with more
                clarity.
              </p>
              <div
                className="pl-4 border-l-2"
                style={{ borderColor: `hsl(var(${STAGE_ACCENT}) / 0.35)` }}
              >
                <p className="font-serif italic text-[14px] text-foreground/55 leading-relaxed">
                  "Structure for the protocol. Care for everything around it."
                </p>
              </div>
            </div>

            <ul className="md:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 content-start">
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
                  <span className="font-sans text-[14px] font-light text-foreground/85 leading-relaxed">
                    {b}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IVFWhatThisCovers;
