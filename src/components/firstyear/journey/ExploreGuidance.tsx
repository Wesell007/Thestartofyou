import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { firstYearTopicConfigs, type FirstYearTopicSlug } from "@/data/firstYearTopicData";
import GuideThumb from "./GuideThumb";
import { FY_FOCUS_RING } from "./firstYearStyles";

type Row = { title: string; detail: string; href: string; topic?: FirstYearTopicSlug };

/**
 * The quietest block on the First Year home. Public guidance lives here so it
 * supports the personal surfaces above rather than defining the page.
 */
const ROWS: Row[] = [
  {
    title: "Feeding",
    detail: "However you are feeding, what tends to happen along the way.",
    href: "/first-year/feeding",
    topic: "feeding",
  },
  {
    title: "Sleep",
    detail: "Rest rhythms through the year, and why they move about.",
    href: "/first-year/sleep",
    topic: "sleep",
  },
  {
    title: "Development",
    detail: "What babies often do, at their own pace.",
    href: "/first-year/development",
    topic: "development",
  },
  {
    title: "Nappies and care",
    detail: "Everyday care, skin, bathing and keeping things simple.",
    href: "/first-year/care-and-safety",
    topic: "care-and-safety",
  },
  {
    title: "Check-ups and questions",
    detail: "Routine checks, and signs worth asking about.",
    href: "/first-year/checkups-and-warning-signs",
    topic: "checkups-and-warning-signs",
  },
];

const ExploreGuidance = () => (
  <section className="pb-10" aria-labelledby="explore-guidance">
    <div className="border-t border-border/50 pt-6">
      <h2
        id="explore-guidance"
        className="font-serif text-[1.2rem] leading-[1.3] text-foreground/90 mb-1.5"
      >
        Explore guidance
      </h2>
      <p className="font-sans text-[13.5px] leading-[1.7] text-foreground/70 max-w-[52ch] mb-3">
        Reading for when you want it. Nothing here needs your attention today.
      </p>
      <ul className="list-none p-0 m-0 divide-y divide-border/40">
        {ROWS.map((row) => (
          <li key={row.title}>
            <Link
              to={row.href}
              className={`group flex min-h-11 items-center gap-3.5 rounded-sm py-3 transition-colors hover:text-foreground ${FY_FOCUS_RING}`}
            >
              <GuideThumb
                src={row.topic ? firstYearTopicConfigs[row.topic]?.heroImage : undefined}
                size="sm"
              />
              <span className="min-w-0 flex-1">
                <span className="block font-sans text-[14.5px] font-medium leading-snug text-foreground/85">
                  {row.title}
                </span>
                <span className="mt-0.5 block font-sans text-[13px] leading-[1.6] text-foreground/65">
                  {row.detail}
                </span>
              </span>
              <ArrowRight
                aria-hidden="true"
                size={15}
                strokeWidth={1.6}
                className="shrink-0 text-foreground/40 transition-transform group-hover:translate-x-0.5"
              />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  </section>
);

export default ExploreGuidance;
