import { Link } from "react-router-dom";

/** Compact closing choice. Three journeys, no default, no writes. */

const options = [
  { label: "Trying to Conceive", href: "/setup/trying-to-conceive" },
  { label: "Pregnancy", href: "/setup/pregnancy" },
  { label: "First Year", href: "/setup/first-year" },
] as const;

const StartJourneyFinalCta = () => (
  <section className="bg-parchment-dark py-16 md:py-20" aria-labelledby="start-journey-final-heading">
    <div className="container mx-auto max-w-3xl px-5 text-center sm:px-6 md:px-10">
      <h2
        id="start-journey-final-heading"
        className="font-serif text-[1.75rem] leading-[1.16] text-foreground sm:text-[2.05rem]"
      >
        Start where you are today
      </h2>
      <p className="mx-auto mt-4 max-w-lg font-sans text-[14px] font-light leading-[1.75] text-muted-foreground">
        Choose one journey to begin. Nothing is locked in.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        {options.map(({ label, href }) => (
          <Link
            key={href}
            to={href}
            className="inline-flex min-h-11 items-center rounded-pill border border-border bg-card px-6 py-3 font-sans text-[13.5px] font-medium text-foreground transition-colors hover:border-sage focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage/50 focus-visible:ring-offset-2"
          >
            {label}
          </Link>
        ))}
      </div>
    </div>
  </section>
);

export default StartJourneyFinalCta;
