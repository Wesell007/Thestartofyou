import { Link } from "react-router-dom";

import { buildAuthUrl } from "@/lib/authIntent";
import type { NavLifecycle } from "@/lib/navLifecycle";
import ttcImage from "@/assets/home-stage-ttc.jpg";
import pregnancyImage from "@/assets/home-stage-pregnancy.jpg";
import firstYearImage from "@/assets/home-stage-first-year.jpg";

/**
 * The editorial opening of the public journey decision page.
 *
 * The continue / sign-in line is presentation only: it reflects the account
 * state resolved elsewhere and never writes, selects or implies a lifecycle.
 */

type Props = {
  authed: boolean | null;
  lifecycle: NavLifecycle | null;
  accountLink: { href: string; label: string };
};

const stageMarkers = [
  { label: "Trying to Conceive", image: ttcImage, alt: "A couple sitting together at home" },
  { label: "Pregnancy", image: pregnancyImage, alt: "A pregnant woman resting by a window" },
  { label: "First Year", image: firstYearImage, alt: "A parent holding their young baby" },
] as const;

const continueLabel: Record<NavLifecycle, string> = {
  ttc: "Continue My TTC Journey",
  pregnancy: "Continue My Week",
  first_year: "Continue My First Year",
};

const StartJourneyOpening = ({ authed, lifecycle, accountLink }: Props) => (
  <section className="bg-parchment pt-28 pb-16 md:pt-36 md:pb-24" aria-labelledby="start-journey-heading">
    <div className="container mx-auto max-w-4xl px-5 text-center sm:px-6 md:px-10">
      <p className="font-sans text-[10.5px] font-medium uppercase tracking-[0.26em] text-sage">
        Your journey
      </p>
      <h1
        id="start-journey-heading"
        className="mt-5 font-serif text-[2.35rem] leading-[1.08] text-foreground sm:text-[3rem] md:text-[3.4rem]"
      >
        Start where you are
      </h1>
      <p className="mx-auto mt-6 max-w-xl font-sans text-[15px] font-light leading-[1.8] text-muted-foreground">
        The Start of You changes with you. Choose the journey that best reflects where you are
        today, and we'll shape the experience around that stage.
      </p>
      <p className="mx-auto mt-4 max-w-lg font-serif text-[16px] italic leading-relaxed text-foreground/70">
        You can move into a different journey later as things change.
      </p>

      <p className="mt-7 font-sans text-[13px] font-light text-muted-foreground">
        {authed && lifecycle ? (
          <>
            Already have a journey?{" "}
            <Link
              to={accountLink.href}
              className="font-medium text-foreground underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage/40"
            >
              {continueLabel[lifecycle]}
            </Link>
          </>
        ) : authed ? (
          <>You haven't started a saved journey yet. Choose where you'd like to begin.</>
        ) : (
          <>
            Already have a journey?{" "}
            <Link
              to={buildAuthUrl("sign_in")}
              className="font-medium text-foreground underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage/40"
            >
              Sign in to continue where you left off
            </Link>
          </>
        )}
      </p>

      <div className="mt-16 flex items-center justify-center gap-3 sm:gap-8">
        {stageMarkers.map(({ label, image, alt }, index) => (
          <div key={label} className="flex items-center gap-3 sm:gap-8">
            {index > 0 && <span aria-hidden="true" className="h-px w-6 bg-sage/40 sm:w-16" />}
            <div className="flex flex-col items-center gap-3">
              <img
                src={image}
                alt={alt}
                loading="lazy"
                className="h-14 w-14 rounded-full object-cover shadow-soft sm:h-16 sm:w-16"
              />
              <span className="font-sans text-[11px] tracking-[0.08em] text-muted-foreground sm:text-[12px]">
                {label}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default StartJourneyOpening;
