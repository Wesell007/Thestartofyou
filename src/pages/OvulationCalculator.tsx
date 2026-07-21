import { useSearchParams, Link, useNavigate } from "react-router-dom";
import { useMemo, useState } from "react";
import { parseISO, addDays, format, isAfter, isBefore, isValid, startOfDay } from "date-fns";
import {
  ArrowRight,
  ArrowUpRight,
  Calendar as CalendarIcon,
  Egg,
  Hourglass,
  Info,
  RefreshCw,
  Sparkles,
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import OvulationResult from "@/components/ttc/OvulationResult";
import SeoHead from "@/components/seo/SeoHead";

const STAGE_BG = "--stage-ttc";
const STAGE_ACCENT = "--stage-ttc-accent";

const Eyebrow = ({ children }: { children: React.ReactNode }) => (
  <p
    className="font-sans text-[11px] font-light tracking-[0.24em] uppercase mb-3"
    style={{ color: `hsl(var(${STAGE_ACCENT}))` }}
  >
    {children}
  </p>
);

/* ---------------- HERO ---------------- */
const Hero = () => (
  <section className="relative bg-parchment overflow-hidden pt-[104px] pb-10 sm:pt-[120px] sm:pb-14 md:pt-[140px] md:pb-20">
    <div
      className="pointer-events-none absolute inset-x-0 top-0 h-48 md:h-72 -z-0"
      style={{
        background: `linear-gradient(180deg, hsl(var(${STAGE_BG}) / 0.55) 0%, transparent 100%)`,
      }}
    />
    <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl relative z-10">
      <div className="grid grid-cols-1 md:grid-cols-[1.1fr_0.9fr] gap-10 md:gap-14 items-center">
        <div>
          <Eyebrow>The TTC Tool</Eyebrow>
          <h1 className="font-serif text-[2.1rem] sm:text-4xl md:text-[3rem] text-foreground leading-[1.08] mb-5">
            Ovulation <span className="italic font-normal">calculator.</span>
          </h1>
          <p className="font-sans text-[15px] sm:text-base font-light text-muted-foreground leading-relaxed mb-7 max-w-md">
            Estimate your fertile window based on your cycle dates and get a
            clearer idea of when you may be most likely to conceive.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
            <a
              href="#calculator"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("calculator")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="inline-flex items-center justify-center gap-2 bg-terracotta text-terracotta-foreground rounded-pill px-7 py-3.5 font-sans text-[13px] font-medium shadow-cta hover:bg-terracotta-hover hover:-translate-y-0.5 transition-all duration-300"
            >
              <CalendarIcon size={15} />
              Calculate now
            </a>
            <Link
              to="/trying-to-conceive/ovulation"
              className="inline-flex items-center gap-1.5 font-sans text-[13px] font-medium tracking-wide px-3 py-3.5"
              style={{ color: `hsl(var(${STAGE_ACCENT}))` }}
            >
              Learn how ovulation works
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>

        <div className="relative">
          <div
            className="relative rounded-[1.75rem] border p-8 sm:p-10 bg-card overflow-hidden"
            style={{
              borderColor: `hsl(var(${STAGE_ACCENT}) / 0.18)`,
              boxShadow: `0 1px 0 hsl(0 0% 100% / 0.95) inset, 0 22px 60px -30px hsl(var(${STAGE_ACCENT}) / 0.4)`,
            }}
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -top-20 -right-20 w-56 h-56 rounded-full"
              style={{
                background: `radial-gradient(circle, hsl(var(${STAGE_BG}) / 0.85) 0%, transparent 70%)`,
              }}
            />
            <div className="relative flex flex-col items-center text-center">
              <div
                className="w-20 h-20 rounded-full flex items-center justify-center mb-5"
                style={{
                  background: `linear-gradient(135deg, hsl(var(${STAGE_BG})) 0%, hsl(var(${STAGE_BG}) / 0.55) 100%)`,
                  boxShadow: `0 1px 0 hsl(0 0% 100% / 0.9) inset, 0 12px 28px -16px hsl(var(${STAGE_ACCENT}) / 0.45)`,
                }}
              >
                <Egg size={32} strokeWidth={1.3} style={{ color: `hsl(var(${STAGE_ACCENT}))` }} />
              </div>
              <p
                className="font-sans text-[10.5px] font-light tracking-[0.22em] uppercase mb-2"
                style={{ color: `hsl(var(${STAGE_ACCENT}))` }}
              >
                A gentle estimate
              </p>
              <p className="font-serif italic text-[17px] text-foreground/75 leading-snug max-w-[16rem]">
                Find the days you may be most likely to conceive.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

/* ---------------- CALCULATOR FORM ---------------- */
const CalculatorForm = () => {
  const navigate = useNavigate();
  const [lmp, setLmp] = useState<string>("");
  const [cycle, setCycle] = useState<number>(28);
  const [error, setError] = useState<string>("");

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!lmp) {
      setError("Please enter the first day of your last period.");
      return;
    }
    const lmpDate = parseISO(lmp);
    const today = startOfDay(new Date());
    if (!isValid(lmpDate) || isAfter(lmpDate, today) || isBefore(lmpDate, addDays(today, -90))) {
      setError("Please enter a valid period date from the last 90 days.");
      return;
    }
    if (cycle < 20 || cycle > 45) {
      setError("Please enter a cycle length between 20 and 45 days.");
      return;
    }
    setError("");
    navigate(`/trying-to-conceive/ovulation-calculator?lmp=${lmp}&cycle=${cycle}`);
    setTimeout(() => {
      document.getElementById("results")?.scrollIntoView({ behavior: "smooth" });
    }, 50);
  };

  return (
    <section id="calculator" className="bg-parchment pb-14 md:pb-20">
      <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-3xl">
        <div
          className="relative rounded-[2rem] bg-card border p-7 sm:p-10 md:p-12 overflow-hidden"
          style={{
            borderColor: `hsl(var(${STAGE_ACCENT}) / 0.2)`,
            boxShadow: `0 1px 0 hsl(0 0% 100% / 0.95) inset, 0 24px 60px -32px hsl(var(${STAGE_ACCENT}) / 0.3)`,
          }}
        >
          <Eyebrow>Your details</Eyebrow>
          <h2 className="font-serif text-2xl sm:text-3xl text-foreground leading-tight mb-3">
            Calculate your <span className="italic font-normal">fertile window</span>
          </h2>
          <p className="font-sans text-[14.5px] font-light text-muted-foreground leading-relaxed mb-8 max-w-xl">
            Enter the first day of your last period and your usual cycle length
            to estimate your fertile window and likely ovulation day.
          </p>

          <form onSubmit={onSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <label className="block">
                <span className="font-sans text-[12px] font-medium tracking-[0.06em] uppercase text-foreground/70 mb-2 block">
                  First day of your last period
                </span>
                <input
                  type="date"
                  value={lmp}
                  min={format(addDays(new Date(), -90), "yyyy-MM-dd")}
                  max={format(new Date(), "yyyy-MM-dd")}
                  onChange={(e) => setLmp(e.target.value)}
                  className="w-full rounded-xl border bg-parchment/50 px-4 py-3.5 font-sans text-[14.5px] text-foreground focus:outline-none focus:ring-2 transition-all"
                  style={{
                    borderColor: `hsl(var(${STAGE_ACCENT}) / 0.25)`,
                  }}
                />
              </label>

              <label className="block">
                <span className="font-sans text-[12px] font-medium tracking-[0.06em] uppercase text-foreground/70 mb-2 block">
                  Average cycle length (days)
                </span>
                <input
                  type="number"
                  min={20}
                  max={45}
                  value={cycle}
                  onChange={(e) => setCycle(Number(e.target.value))}
                  className="w-full rounded-xl border bg-parchment/50 px-4 py-3.5 font-sans text-[14.5px] text-foreground focus:outline-none focus:ring-2 transition-all"
                  style={{
                    borderColor: `hsl(var(${STAGE_ACCENT}) / 0.25)`,
                  }}
                />
                <span className="font-sans text-[12px] font-light text-muted-foreground/80 mt-1.5 block">
                  Most cycles fall between 21 and 35 days. Default is 28.
                </span>
              </label>
            </div>

            {error && (
              <p className="font-sans text-[13px] text-terracotta">{error}</p>
            )}

            <button
              type="submit"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-terracotta text-terracotta-foreground rounded-pill px-8 py-4 font-sans text-[13.5px] font-medium shadow-cta hover:bg-terracotta-hover hover:-translate-y-0.5 transition-all duration-300"
            >
              <Sparkles size={15} />
              Calculate my fertile window
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

/* ---------------- HOW IT WORKS ---------------- */
const howItWorks = [
  {
    icon: Egg,
    title: "Your fertile window",
    desc: "You are most likely to conceive in the few days leading up to ovulation and on the day you ovulate.",
  },
  {
    icon: RefreshCw,
    title: "Ovulation timing can vary",
    desc: "Even with a regular cycle, ovulation may not happen on exactly the same day every month.",
  },
  {
    icon: Info,
    title: "Use this as a guide",
    desc: "This tool can help you estimate timing, but it should be used as a guide rather than a guarantee.",
  },
];

const HowItWorks = () => (
  <section className="py-14 md:py-20 bg-parchment">
    <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl">
      <div className="mb-10 max-w-2xl">
        <Eyebrow>How this works</Eyebrow>
        <h2 className="font-serif text-2xl sm:text-3xl md:text-[2rem] text-foreground leading-tight mb-4">
          A gentle <span className="italic font-normal">guide to ovulation</span>
        </h2>
        <p className="font-sans text-[15px] font-light text-muted-foreground leading-relaxed">
          Ovulation usually happens around 14 days before your next period, but
          timing can vary from person to person and from cycle to cycle. This
          calculator uses your cycle information to estimate your likely fertile
          window, which includes the days leading up to ovulation and the day of
          ovulation itself.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
        {howItWorks.map(({ icon: Icon, title, desc }) => (
          <div
            key={title}
            className="bg-card rounded-[1.5rem] border p-7"
            style={{
              borderColor: `hsl(var(${STAGE_ACCENT}) / 0.16)`,
              boxShadow: `0 1px 0 hsl(0 0% 100% / 0.95) inset, 0 14px 36px -24px hsl(var(${STAGE_ACCENT}) / 0.22)`,
            }}
          >
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
              style={{
                background: `linear-gradient(135deg, hsl(var(${STAGE_BG})) 0%, hsl(var(${STAGE_BG}) / 0.55) 100%)`,
              }}
            >
              <Icon size={20} strokeWidth={1.5} style={{ color: `hsl(var(${STAGE_ACCENT}))` }} />
            </div>
            <h3 className="font-serif text-[1.2rem] text-foreground leading-tight mb-2">
              {title}
            </h3>
            <p className="font-sans text-[13.5px] font-light text-muted-foreground leading-relaxed">
              {desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

/* ---------------- DISCLAIMER ---------------- */
const Disclaimer = () => (
  <section className="pb-14 md:pb-20 bg-parchment">
    <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-3xl">
      <div
        className="rounded-[1.5rem] border p-7 sm:p-9"
        style={{
          background: `hsl(var(${STAGE_BG}) / 0.45)`,
          borderColor: `hsl(var(${STAGE_ACCENT}) / 0.2)`,
        }}
      >
        <div className="flex items-start gap-4">
          <div
            className="shrink-0 w-10 h-10 rounded-full flex items-center justify-center"
            style={{
              background: `hsl(var(--card))`,
              color: `hsl(var(${STAGE_ACCENT}))`,
            }}
          >
            <Info size={18} strokeWidth={1.5} />
          </div>
          <div>
            <p
              className="font-sans text-[11px] font-light tracking-[0.24em] uppercase mb-2"
              style={{ color: `hsl(var(${STAGE_ACCENT}))` }}
            >
              A quick note
            </p>
            <p className="font-sans text-[14.5px] font-light text-foreground/80 leading-relaxed">
              This calculator provides an estimate based on the information you
              enter. It cannot confirm ovulation or predict pregnancy. If your
              cycles are irregular, or if you have concerns about your fertility
              or reproductive health, it may help to speak to a qualified
              healthcare professional.
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
);

/* ---------------- RELATED ---------------- */
const related = [
  {
    label: "Ovulation",
    desc: "Understand ovulation signs, timing, and your most fertile days.",
    href: "/trying-to-conceive/ovulation",
    icon: Egg,
  },
  {
    label: "Cycle Tracking",
    desc: "Learn how your cycle works and how to track it without feeling overwhelmed.",
    href: "/trying-to-conceive/cycle-tracking",
    icon: RefreshCw,
  },
  {
    label: "The Two-Week Wait",
    desc: "Support for the waiting period between ovulation and testing.",
    href: "/trying-to-conceive/two-week-wait",
    icon: Hourglass,
  },
];

const Related = () => (
  <section className="py-14 md:py-20 bg-parchment">
    <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-6xl">
      <div className="mb-10">
        <Eyebrow>Keep exploring</Eyebrow>
        <h2 className="font-serif text-2xl sm:text-3xl md:text-[2rem] text-foreground leading-tight">
          You may also want to <span className="italic font-normal">explore</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {related.map(({ label, desc, href, icon: Icon }) => (
          <Link
            key={label}
            to={href}
            className="group relative bg-card rounded-[1.5rem] border p-7 transition-all duration-500 hover:-translate-y-1 hover:shadow-lg overflow-hidden"
            style={{
              borderColor: `hsl(var(${STAGE_ACCENT}) / 0.16)`,
              boxShadow: `0 1px 0 hsl(0 0% 100% / 0.95) inset, 0 14px 36px -24px hsl(var(${STAGE_ACCENT}) / 0.22)`,
            }}
          >
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
              style={{
                background: `linear-gradient(135deg, hsl(var(${STAGE_BG})) 0%, hsl(var(${STAGE_BG}) / 0.55) 100%)`,
              }}
            >
              <Icon size={20} strokeWidth={1.5} style={{ color: `hsl(var(${STAGE_ACCENT}))` }} />
            </div>
            <h3 className="font-serif text-[1.2rem] text-foreground leading-tight mb-2">
              {label}
            </h3>
            <p className="font-sans text-[13.5px] font-light text-muted-foreground leading-relaxed mb-5">
              {desc}
            </p>
            <span
              className="inline-flex items-center gap-1.5 font-sans text-[12px] font-medium tracking-wide transition-transform duration-300 group-hover:translate-x-0.5"
              style={{ color: `hsl(var(${STAGE_ACCENT}))` }}
            >
              Read more
              <ArrowUpRight size={14} />
            </span>
          </Link>
        ))}
      </div>
    </div>
  </section>
);

/* ---------------- CLOSE ---------------- */
const PageClose = () => (
  <section className="py-16 md:py-24 bg-parchment">
    <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-2xl text-center">
      <h2 className="font-serif text-2xl sm:text-3xl md:text-[2rem] text-foreground leading-tight mb-5">
        A small <span className="italic font-normal">step forward</span>
      </h2>
      <p className="font-sans text-[15px] sm:text-base font-light text-muted-foreground leading-relaxed">
        Trying to conceive can bring a lot of questions. Understanding your
        fertile window is one gentle way to feel more informed about your cycle
        and your next step.
      </p>
    </div>
  </section>
);

/* ---------------- PAGE ---------------- */
const OvulationCalculator = () => {
  const [params] = useSearchParams();

  const data = useMemo(() => {
    const lmpStr = params.get("lmp");
    const cycleStr = params.get("cycle");
    if (!lmpStr || !/^\d{4}-\d{2}-\d{2}$/.test(lmpStr)) return null;

    const lmp = parseISO(lmpStr);
    const cycleLength = cycleStr ? Number(cycleStr) : 28;
    const today = startOfDay(new Date());
    if (
      !isValid(lmp) ||
      isAfter(lmp, today) ||
      isBefore(lmp, addDays(today, -90)) ||
      !Number.isInteger(cycleLength) ||
      cycleLength < 20 ||
      cycleLength > 45
    ) return null;
    const ovulationDay = addDays(lmp, cycleLength - 14);
    const fertileStart = addDays(ovulationDay, -5);
    const fertileEnd = ovulationDay;
    const testDay = addDays(ovulationDay, 15);

    return { lmp, cycleLength, ovulationDay, fertileStart, fertileEnd, testDay };
  }, [params]);

  return (
    <div className="min-h-screen font-sans bg-parchment">
      <SeoHead
        title="Ovulation Calculator | Estimate Your Fertile Window"
        description="Use our ovulation calculator to estimate your fertile window and likely ovulation days, with calm guidance for trying to conceive."
        canonical="https://thestartofyou.com/ovulation-calculator"
      />
      <Navbar />
      <main>
        {data ? (
          <div id="results" className="pt-[92px] md:pt-[112px]">
            <OvulationResult {...data} />
          </div>
        ) : (
          <>
            <Hero />
            <CalculatorForm />
          </>
        )}
        <HowItWorks />
        <Disclaimer />
        <Related />
        <PageClose />
      </main>
      <Footer />
    </div>
  );
};

export default OvulationCalculator;
