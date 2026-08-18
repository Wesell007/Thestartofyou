import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { firstYearTopicConfigs, type FirstYearTopicSlug } from "@/data/firstYearTopicData";
import GuideThumb from "./GuideThumb";
import {
  FY_CARD_BODY,
  FY_CARD_TITLE,
  FY_FOCUS_RING,
  FY_HEADING,
  FY_INTRO,
  FY_KICKER,
} from "./firstYearStyles";

export type ForYouCard = {
  title: string;
  detail: string;
  href: string;
  /** Existing public topic, used only to pick up its published image. */
  topic?: FirstYearTopicSlug;
};

type Props = {
  cards: ForYouCard[];
};

/**
 * The parent side of the First Year home: a warm rose to lavender band that
 * separates the reading for you from the reading about your baby. Purely
 * navigational, into existing public guidance only.
 */
const ForYouBlock = ({ cards }: Props) => (
  <section className="pb-10" aria-labelledby="a-moment-for-you">
    <div
      className="-mx-4 sm:-mx-8 md:-mx-10 px-4 sm:px-8 md:px-10 py-9 sm:py-11 rounded-[26px]"
      style={{
        background:
          "linear-gradient(140deg, hsl(var(--stage-firstyear-rose)) 0%, hsl(var(--stage-firstyear-lilac)) 62%, hsl(var(--stage-firstyear-cream)) 100%)",
      }}
    >
      <span
        className={`${FY_KICKER} mb-3`}
        style={{
          color: "hsl(var(--parchment))",
          backgroundColor: "hsl(var(--stage-recovery-deep))",
        }}
      >
        For you
      </span>
      <h2 id="a-moment-for-you" className={`${FY_HEADING} mb-2.5`}>
        A moment for you
      </h2>
      <p className={`${FY_INTRO} mb-6`}>
        Your recovery is part of this too. This side of the journey is yours.
      </p>

      <ul className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 list-none p-0 m-0">
        {cards.map((card) => (
          <li key={card.href}>
            <Link
              to={card.href}
              className={`group flex h-full flex-col rounded-[20px] border px-4 py-4 transition-colors hover:border-foreground/25 ${FY_FOCUS_RING}`}
              style={{
                borderColor: "hsl(var(--stage-recovery-accent) / 0.22)",
                backgroundColor: "hsl(var(--parchment) / 0.85)",
              }}
            >
              <GuideThumb
                src={card.topic ? firstYearTopicConfigs[card.topic]?.heroImage : undefined}
                size="md"
                tint="stage-recovery-accent"
              />
              <span className={`mt-3 block ${FY_CARD_TITLE}`}>{card.title}</span>
              <span className={`mt-1 block ${FY_CARD_BODY}`}>{card.detail}</span>
              <span
                className="mt-3 inline-flex items-center gap-1.5 font-sans text-[12.5px] font-medium"
                style={{ color: "hsl(var(--stage-recovery-deep))" }}
              >
                Read this
                <ArrowRight
                  aria-hidden="true"
                  size={13}
                  strokeWidth={1.8}
                  className="transition-transform group-hover:translate-x-0.5"
                />
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  </section>
);

export default ForYouBlock;
