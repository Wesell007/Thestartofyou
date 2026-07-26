import { Link } from "react-router-dom";
import { MY_WEEK_PANELS } from "@/lib/journeyStatusCopy";

const accent = "hsl(var(--stage-pregnancy-accent))";

const SectionPregnancyComplete = () => {
  const copy = MY_WEEK_PANELS.given_birth;
  return (
    <section className="pt-8 pb-12">
      <div
        className="rounded-[22px] keepsake-surface px-6 sm:px-10 py-9 sm:py-12"
        style={{ borderColor: "hsl(var(--stage-pregnancy-accent) / 0.18)" }}
      >
        <p
          className="font-sans text-[10.5px] font-medium tracking-[0.3em] uppercase mb-5"
          style={{ color: accent }}
        >
          {copy.kicker}
        </p>
        <h2 className="font-serif text-[1.7rem] sm:text-[2rem] leading-[1.15] text-foreground/90 mb-4">
          {copy.title}
        </h2>
        <p className="font-serif text-foreground/80 text-[15.5px] leading-[1.65] max-w-[52ch] mb-8">
          {copy.body}
        </p>
        <div className="flex flex-col sm:flex-row flex-wrap gap-3">
          <Link
            to="/first-year"
            className="inline-flex items-center justify-center rounded-pill bg-terracotta text-terracotta-foreground px-5 py-2.5 text-sm font-medium shadow-cta hover:bg-terracotta-hover transition-all"
          >
            Open First Year
          </Link>
          <Link
            to="/my-journey"
            className="inline-flex items-center justify-center rounded-pill border border-border/60 bg-parchment px-5 py-2.5 text-sm text-foreground/85 hover:border-foreground/25 transition-colors"
          >
            Open My Journey
          </Link>
          <Link
            to="/account-settings"
            className="inline-flex items-center justify-center rounded-pill px-5 py-2.5 text-sm text-foreground/70 hover:text-foreground underline underline-offset-4 decoration-foreground/25"
          >
            Manage in Account Settings
          </Link>
        </div>
      </div>
    </section>
  );
};

export default SectionPregnancyComplete;
