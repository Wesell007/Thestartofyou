import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

/**
 * One substantial editorial journey section: photography, positioning, what
 * the saved journey offers, a static product glimpse and the canonical start.
 * Presentation only — no reads, no writes.
 */

export type StartJourneySectionProps = {
  id: string;
  eyebrow: string;
  title: string;
  positioning: string;
  body: string;
  expectations: readonly string[];
  supportLine?: string;
  image: string;
  imageAlt: string;
  preview: ReactNode;
  previewLabel: string;
  primary: { label: string; href: string };
  secondary: { label: string; href: string };
  tertiary?: { label: string; href: string };
  reverse?: boolean;
  surface: string;
};

const StartJourneySection = ({
  id,
  eyebrow,
  title,
  positioning,
  body,
  expectations,
  supportLine,
  image,
  imageAlt,
  preview,
  previewLabel,
  primary,
  secondary,
  tertiary,
  reverse = false,
  surface,
}: StartJourneySectionProps) => (
  <section className={`${surface} py-20 md:py-28`} aria-labelledby={`${id}-heading`}>
    <div className="container mx-auto max-w-6xl px-5 sm:px-6 md:px-10">
      <div
        className={`grid items-center gap-10 md:gap-14 lg:grid-cols-[0.9fr_1.1fr] ${
          reverse ? "lg:[&>*:first-child]:order-2" : ""
        }`}
      >
        <div>
          <img
            src={image}
            alt={imageAlt}
            loading="lazy"
            className="aspect-[4/5] w-full rounded-[3px] object-cover shadow-soft"
          />
        </div>

        <div>
          <p className="font-sans text-[10.5px] font-medium uppercase tracking-[0.24em] text-muted-foreground">
            {eyebrow}
          </p>
          <h2
            id={`${id}-heading`}
            className="mt-4 font-serif text-[2rem] leading-[1.12] text-foreground sm:text-[2.5rem]"
          >
            {title}
          </h2>
          <p className="mt-4 max-w-xl font-serif text-[17px] italic leading-relaxed text-foreground/75">
            {positioning}
          </p>
          <p className="mt-4 max-w-xl font-sans text-[14.5px] font-light leading-[1.8] text-muted-foreground">
            {body}
          </p>

          <ul className="mt-7 space-y-2.5 border-t border-border/60 pt-6">
            {expectations.map((item) => (
              <li key={item} className="flex gap-3 font-sans text-[13.5px] font-light text-muted-foreground">
                <span aria-hidden="true" className="mt-2 h-1 w-1 shrink-0 rounded-full bg-sage" />
                {item}
              </li>
            ))}
          </ul>

          {supportLine && (
            <p className="mt-5 max-w-xl font-sans text-[13px] font-light leading-relaxed text-muted-foreground">
              {supportLine}
            </p>
          )}

          <div className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-4">
            <Link
              to={primary.href}
              className="inline-flex min-h-11 items-center gap-2.5 rounded-pill bg-terracotta px-7 py-3 font-sans text-[13.5px] font-medium text-terracotta-foreground shadow-cta transition-colors hover:bg-terracotta-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage/50 focus-visible:ring-offset-2"
            >
              {primary.label}
              <ArrowRight size={14} aria-hidden="true" />
            </Link>
            <Link
              to={secondary.href}
              className="inline-flex min-h-11 items-center font-sans text-[13px] font-medium text-foreground underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage/40"
            >
              {secondary.label}
            </Link>
            {tertiary && (
              <Link
                to={tertiary.href}
                className="inline-flex min-h-11 items-center font-sans text-[12.5px] font-light text-muted-foreground underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage/40"
              >
                {tertiary.label}
              </Link>
            )}
          </div>
        </div>
      </div>

      <div className="mt-14">
        <p className="mb-5 font-sans text-[10.5px] font-medium uppercase tracking-[0.22em] text-muted-foreground">
          {previewLabel}
        </p>
        {preview}
        <p className="mt-4 font-sans text-[11px] text-muted-foreground">
          Illustrative only · Nothing personal shown
        </p>
      </div>
    </div>
  </section>
);

export default StartJourneySection;
