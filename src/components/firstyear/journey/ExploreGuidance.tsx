import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { firstYearTopicConfigs, type FirstYearTopicSlug } from "@/data/firstYearTopicData";
import GuideThumb from "./GuideThumb";
import {
  FY_ARROW,
  FY_FOCUS_RING,
  FY_HEADING,
  FY_ROW_BODY,
  FY_ROW_TITLE,
} from "./firstYearStyles";

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
  <section className="pb-10" aria-labelledby="gentle-reading">
    <div className="border-t border-border/50 pt-6">
      <h2 id="gentle-reading" className={`${FY_HEADING} text-[1.28rem] sm:text-[1.34rem] mb-1.5`}>
        Gentle reading
      </h2>
      <p className={`${FY_ROW_BODY} max-w-[52ch] mb-2`}>
        Reading for when you want it. Nothing here needs your attention today.
      </p>
      <ul className="list-none p-0 m-0 divide-y divide-border/50">
        {ROWS.map((row) => (
          <li key={row.title}>
            <Link
              to={row.href}
              className={`group flex min-h-11 items-center gap-3.5 rounded-sm py-3 transition-colors ${FY_FOCUS_RING}`}
            >
              <GuideThumb
                src={row.topic ? firstYearTopicConfigs[row.topic]?.heroImage : undefined}
                size="sm"
              />
              <span className="min-w-0 flex-1">
                <span className={`block ${FY_ROW_TITLE}`}>{row.title}</span>
                <span className={`mt-0.5 block ${FY_ROW_BODY}`}>{row.detail}</span>
              </span>
              <ArrowRight
                aria-hidden="true"
                size={16}
                strokeWidth={1.8}
                className={`shrink-0 ${FY_ARROW} transition-transform group-hover:translate-x-0.5`}
              />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  </section>
);

export default ExploreGuidance;
