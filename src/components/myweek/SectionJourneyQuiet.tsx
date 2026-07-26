import { Link } from "react-router-dom";
import { MY_WEEK_PANELS } from "@/lib/journeyStatusCopy";

const accent = "hsl(var(--stage-pregnancy-accent))";

const SectionJourneyQuiet = () => {
  const copy = MY_WEEK_PANELS.pregnancy_loss;
  return (
    <section className="pt-10 pb-14">
      <div
        className="rounded-[24px] keepsake-surface px-6 sm:px-10 py-10 sm:py-14"
        style={{ borderColor: "hsl(var(--stage-pregnancy-accent) / 0.14)" }}
      >
        <p
          className="font-sans text-[10.5px] font-medium tracking-[0.3em] uppercase mb-5"
          style={{ color: accent }}
        >
          {copy.kicker}
        </p>
        <h2 className="font-serif text-[1.7rem] sm:text-[2rem] leading-[1.15] text-foreground/90 mb-5">
          {copy.title}
        </h2>
        <p className="font-serif text-foreground/80 text-[15.5px] leading-[1.7] max-w-[50ch] mb-8">
          {copy.body}
        </p>
        <Link
          to="/account-settings"
          className="inline-flex items-center justify-center rounded-pill border border-border/60 bg-parchment px-5 py-2.5 text-sm text-foreground/85 hover:border-foreground/25 transition-colors"
        >
          Manage in Account Settings
        </Link>
      </div>
    </section>
  );
};

export default SectionJourneyQuiet;
