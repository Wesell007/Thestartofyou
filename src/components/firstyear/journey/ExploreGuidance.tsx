import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { FY_FOCUS_RING } from "./firstYearStyles";

type Row = { title: string; detail: string; href: string };

/**
 * The quietest block on the First Year home. Public guidance lives here so it
 * supports the personal surfaces above rather than defining the page.
 */
const ROWS: Row[] = [
  {
    title: "Development",
    detail: "What babies often do, at their own pace.",
    href: "/first-year/development",
  },
  {
    title: "Nappies and care",
    detail: "Everyday care, skin, bathing and keeping things simple.",
    href: "/first-year/care-and-safety",
  },
  {
    title: "Check-ups and questions",
    detail: "Routine checks, and signs worth asking about.",
    href: "/first-year/checkups-and-warning-signs",
  },
  {
    title: "Questions to bring up",
    detail: "What is worth raising with your midwife, GP or health visitor.",
    href: "/first-year/checkups-and-warning-signs",
  },
];

const ExploreGuidance = () => (
  <section className="pb-10" aria-labelledby="explore-guidance">
    <div className="border-t border-border/50 pt-6">
      <h2
        id="explore-guidance"
        className="font-serif text-[1.15rem] leading-[1.3] text-foreground/85 mb-1.5"
      >
        Explore guidance
      </h2>
      <p className="font-sans text-[13px] leading-[1.7] text-foreground/60 max-w-[52ch] mb-3">
        Reading for when you want it. Nothing here needs your attention today.
      </p>
      <ul className="list-none p-0 m-0 divide-y divide-border/40">
        {ROWS.map((row) => (
          <li key={row.title}>
            <Link
              to={row.href}
              className={`group flex min-h-11 items-center justify-between gap-4 rounded-sm py-3 transition-colors hover:text-foreground ${FY_FOCUS_RING}`}
            >
              <span className="min-w-0">
                <span className="block font-sans text-[14px] leading-snug text-foreground/80">
                  {row.title}
                </span>
                <span className="mt-0.5 block font-sans text-[12.5px] leading-[1.6] text-foreground/55">
                  {row.detail}
                </span>
              </span>
              <ArrowRight
                aria-hidden="true"
                size={15}
                strokeWidth={1.6}
                className="shrink-0 text-foreground/35 transition-transform group-hover:translate-x-0.5"
              />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  </section>
);

export default ExploreGuidance;
