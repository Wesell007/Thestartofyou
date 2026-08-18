import { Link } from "react-router-dom";
import { ArrowRight, Baby, HeartHandshake, Moon } from "lucide-react";
import { getStageGuidance } from "@/lib/firstYearStageGuidance";
import { firstYearMonthImages } from "@/data/firstYearMonthData";
import GuideThumb from "./GuideThumb";
import {
  FY_CARD_BODY,
  FY_CARD_TITLE,
  FY_FOCUS_RING,
  FY_HEADING,
  FY_INTRO,
  FY_KICKER,
} from "./firstYearStyles";

type Props = {
  /** First baby's date of birth. Renders nothing when unusable. */
  dateOfBirth: string | null | undefined;
  babyCount: number;
};

const ICONS = [Baby, Moon, HeartHandshake];

/**
 * Age-aware guidance for the signed-in home. Insight first, reading second:
 * short tiles derived from published month content, then one quiet onward
 * link. Purely derived at read time, and no stage is ever stored.
 */
const StageGuidanceSection = ({ dateOfBirth, babyCount }: Props) => {
  const guidance = getStageGuidance(dateOfBirth, babyCount);
  if (!guidance) return null;

  const monthImage = firstYearMonthImages[guidance.readMore.monthSlug]?.hero.src;

  return (
    <section className="pb-10" aria-labelledby="for-this-stage">
      <span
        className={`${FY_KICKER} mb-3`}
        style={{
          color: "hsl(var(--stage-firstyear-deep))",
          backgroundColor: "hsl(var(--stage-firstyear) / 0.9)",
          border: "1px solid hsl(var(--stage-firstyear-accent) / 0.28)",
        }}
      >
        {guidance.kicker}
      </span>
      <h2 id="for-this-stage" className={`${FY_HEADING} mb-2.5`}>
        {guidance.heading}
      </h2>
      <p className={`${FY_INTRO} mb-5`}>{guidance.intro}</p>

      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 list-none p-0 m-0">
        {guidance.insights.map((insight, index) => {
          const Icon = ICONS[index % ICONS.length];
          return (
            <li
              key={insight.title}
              className="h-full rounded-[18px] border px-5 py-5"
              style={{
                borderColor: "hsl(var(--stage-firstyear-accent) / 0.24)",
                background:
                  index === 2
                    ? "linear-gradient(145deg, hsl(var(--stage-recovery) / 0.85), hsl(var(--stage-firstyear-cream)))"
                    : "var(--gradient-firstyear-today)",
              }}
            >
              <span
                aria-hidden="true"
                className="mb-3 flex h-9 w-9 items-center justify-center rounded-full"
                style={{
                  backgroundColor:
                    index === 2
                      ? "hsl(var(--stage-recovery-soft) / 0.7)"
                      : "hsl(var(--stage-firstyear-soft) / 0.75)",
                }}
              >
                <Icon
                  size={16}
                  strokeWidth={1.7}
                  style={{
                    color:
                      index === 2
                        ? "hsl(var(--stage-recovery-deep))"
                        : "hsl(var(--stage-firstyear-deep))",
                  }}
                />
              </span>
              <span className={`block ${FY_CARD_TITLE}`}>{insight.title}</span>
              <span className={`mt-1.5 block ${FY_CARD_BODY} break-words`}>{insight.body}</span>
            </li>
          );
        })}
      </ul>

      <Link
        to={guidance.readMore.href}
        className={`group mt-4 flex min-h-11 items-center gap-4 rounded-[16px] border px-4 py-3 transition-colors hover:border-foreground/25 ${FY_FOCUS_RING}`}
        style={{ borderColor: "hsl(var(--border))" }}
      >
        <GuideThumb src={monthImage} size="sm" icon={Baby} />
        <span className="min-w-0 flex-1">
          <span className="block font-sans text-[14.5px] font-medium leading-snug text-foreground/90">
            {guidance.readMore.label}
          </span>
          <span className="mt-0.5 block font-sans text-[13px] leading-[1.6] text-foreground/65">
            A longer read for when you want it.
          </span>
        </span>
        <ArrowRight
          aria-hidden="true"
          size={16}
          strokeWidth={1.7}
          className="shrink-0 text-foreground/45 transition-transform group-hover:translate-x-0.5"
        />
      </Link>

      <p className="mt-4 font-sans text-[14px] leading-[1.7] text-foreground/75 max-w-[54ch]">
        {guidance.parentLine}{" "}
        <Link
          to={guidance.parentHref}
          className={`rounded-sm text-foreground font-medium underline underline-offset-4 decoration-border transition-colors hover:decoration-foreground/50 ${FY_FOCUS_RING}`}
        >
          {guidance.parentLabel}
        </Link>
      </p>
    </section>
  );
};

export default StageGuidanceSection;
