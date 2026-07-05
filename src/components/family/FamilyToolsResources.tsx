import {
  ArrowRight,
  Baby,
  Wallet,
  Plane,
  CalendarClock,
  type LucideIcon,
} from "lucide-react";

type Tool = {
  title: string;
  body: string;
  href: string;
  Icon: LucideIcon;
};

const tools: Tool[] = [
  {
    title: "Second-time parents",
    body: "Gentle guidance for preparing your home, your mind and your child for a new baby.",
    href: "#family-growing",
    Icon: Baby,
  },
  {
    title: "Family finances",
    body: "Simple starting points for budgeting, childcare costs and planning ahead.",
    href: "#family-basics",
    Icon: Wallet,
  },
  {
    title: "Travelling with children",
    body: "Practical help for trips, packing, routines and calmer journeys.",
    href: "#family-travel",
    Icon: Plane,
  },
  {
    title: "Family routines",
    body: "Support for building rhythms that make everyday family life feel lighter.",
    href: "#family-basics",
    Icon: CalendarClock,
  },
];

const accent = "hsl(var(--stage-family-accent))";
const accentSoft = "hsl(var(--stage-family-accent) / 0.1)";
const accentBorder = "hsl(var(--stage-family-accent) / 0.26)";
const accentBorderStrong = "hsl(var(--stage-family-accent) / 0.36)";
const deep = "hsl(var(--stage-family-deep))";
const deepSoft = "hsl(var(--stage-family-deep) / 0.72)";

const FamilyToolsResources = () => {
  return (
    <section
      className="py-24 md:py-28"
      style={{
        background:
          "linear-gradient(to bottom, hsl(var(--parchment)) 0%, hsl(var(--stage-family) / 0.45) 100%)",
      }}
    >
      <div className="container mx-auto px-5 sm:px-8 md:px-10 max-w-5xl">
        <div className="text-center mb-14 md:mb-16">
          <span
            className="mx-auto block h-px w-10 mb-6"
            style={{ backgroundColor: "hsl(var(--stage-family-accent) / 0.5)" }}
          />
          <p
            className="font-sans text-[11px] font-light tracking-[0.34em] uppercase mb-3"
            style={{ color: accent }}
          >
            Tools & resources
          </p>
          <h2
            className="font-serif text-[2rem] md:text-[2.4rem] mb-4 leading-tight"
            style={{ color: deep }}
          >
            A few useful places to start
          </h2>
          <p
            className="font-sans text-[15px] font-light max-w-xl mx-auto leading-relaxed"
            style={{ color: deepSoft }}
          >
            Practical companions for the parts of family life you keep circling back to.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-7">
          {tools.map(({ title, body, href, Icon }) => (
            <a
              key={title}
              href={href}
              className="group relative flex h-full flex-col rounded-[22px] border p-8 md:p-9 overflow-hidden transition-all duration-300 hover:-translate-y-[3px] hover:shadow-[0_28px_60px_-30px_rgba(70,50,20,0.42)]"
              style={{
                borderColor: accentBorder,
                background:
                  "linear-gradient(155deg, hsl(var(--parchment)) 0%, hsl(var(--stage-family-soft) / 0.55) 100%)",
                boxShadow:
                  "0 16px 36px -28px rgba(70,50,20,0.26), inset 0 1px 0 hsl(0 0% 100% / 0.65)",
              }}
            >
              <span
                className="pointer-events-none absolute -top-20 -left-20 h-52 w-52 rounded-full blur-3xl opacity-80 transition-opacity duration-500 group-hover:opacity-100"
                style={{ background: "hsl(var(--stage-family-accent) / 0.2)" }}
                aria-hidden
              />
              <div className="relative flex items-center gap-3.5 mb-5">
                <span
                  className="grid place-items-center h-11 w-11 rounded-full border shrink-0"
                  style={{
                    backgroundColor: "hsl(var(--parchment))",
                    borderColor: accentBorderStrong,
                    boxShadow: "inset 0 1px 0 hsl(0 0% 100% / 0.85)",
                  }}
                  aria-hidden
                >
                  <Icon size={17} strokeWidth={1.6} style={{ color: accent }} />
                </span>
                <p
                  className="font-sans text-[10.5px] font-light tracking-[0.3em] uppercase"
                  style={{ color: accent }}
                >
                  Resource
                </p>
              </div>
              <h3
                className="relative font-serif text-[1.4rem] md:text-[1.55rem] mb-2.5 leading-snug"
                style={{ color: deep }}
              >
                {title}
              </h3>
              <p
                className="relative font-sans text-[14.75px] font-light leading-relaxed mb-7"
                style={{ color: deepSoft }}
              >
                {body}
              </p>
              <div className="relative mt-auto flex items-center justify-between">
                <span
                  className="font-sans text-[12.5px] font-medium tracking-wide"
                  style={{ color: accent }}
                >
                  Open
                </span>
                <span
                  className="inline-flex items-center justify-center h-10 w-10 rounded-full border transition-all duration-300 group-hover:translate-x-1 group-hover:shadow-[0_10px_22px_-12px_rgba(70,50,20,0.45)]"
                  style={{
                    borderColor: accentBorderStrong,
                    backgroundColor: accentSoft,
                  }}
                  aria-hidden
                >
                  <ArrowRight size={15} strokeWidth={1.8} style={{ color: accent }} />
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FamilyToolsResources;
