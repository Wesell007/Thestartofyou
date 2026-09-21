import { Link } from "react-router-dom";

export const FIRST_YEAR_MONTH_DESTINATIONS = [
  { label: "Newborn", href: "/first-year/newborn" },
  { label: "1 month", href: "/first-year/1-month" },
  { label: "2 months", href: "/first-year/2-months" },
  { label: "3 months", href: "/first-year/3-months" },
  { label: "4 months", href: "/first-year/4-months" },
  { label: "5 months", href: "/first-year/5-months" },
  { label: "6 months", href: "/first-year/6-months" },
  { label: "7 months", href: "/first-year/7-months" },
  { label: "8 months", href: "/first-year/8-months" },
  { label: "9 months", href: "/first-year/9-months" },
  { label: "10 months", href: "/first-year/10-months" },
  { label: "11 months", href: "/first-year/11-months" },
  { label: "12 months", href: "/first-year/12-months" },
] as const;

const FYMonthMap = () => (
  <section className="border-y border-border/50 bg-parchment-dark py-12 md:py-16" data-first-year-month-map>
    <div className="container mx-auto max-w-5xl px-5 sm:px-8 md:px-10">
      <p className="mb-3 font-sans text-[11px] font-light uppercase tracking-[0.24em] text-foreground/60">
        Month by month
      </p>
      <h2 className="mb-3 font-serif text-2xl leading-tight text-foreground sm:text-3xl">
        Find your baby&apos;s age.
      </h2>
      <p className="mb-7 max-w-xl font-sans text-[14px] font-light leading-relaxed text-muted-foreground">
        Choose a month for guidance on development, feeding, sleep, care and how this stage may feel for you.
      </p>
      <nav aria-label="First Year month guides" className="grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-7">
        {FIRST_YEAR_MONTH_DESTINATIONS.map((item) => (
          <Link
            key={item.href}
            to={item.href}
            className="inline-flex min-h-11 items-center justify-center rounded-lg border border-stage-firstyear-accent/25 bg-card px-3 text-center font-sans text-[13px] font-light text-stage-firstyear-deep transition-colors hover:bg-stage-firstyear-soft/50"
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </div>
  </section>
);

export default FYMonthMap;