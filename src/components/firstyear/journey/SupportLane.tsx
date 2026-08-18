import { Link } from "react-router-dom";
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

export type SupportCard = {
  title: string;
  detail: string;
  href: string;
  /** Existing public topic, used only to pick up its published image. */
  topic?: FirstYearTopicSlug;
};

type Props = {
  kicker: string;
  heading: string;
  intro: string;
  cards: SupportCard[];
  /** Which stage palette the lane uses. */
  side: "baby" | "you";
  /**
   * Set when the lane sits in the two-column desktop grid, so its cards stay
   * in a single column once the lane is only half the page wide.
   */
  halfWidth?: boolean;
};

/**
 * A group of quiet links into existing public guidance. Purely navigational:
 * nothing here reads or writes journey data.
 */
const SupportLane = ({ kicker, heading, intro, cards, side, halfWidth = false }: Props) => {
  const forYou = side === "you";
  const tint = forYou ? "stage-recovery-accent" : "stage-firstyear-accent";

  const accent = forYou
    ? "hsl(var(--stage-recovery-deep))"
    : "hsl(var(--stage-firstyear-deep))";
  const border = forYou
    ? "hsl(var(--stage-recovery-accent) / 0.24)"
    : "hsl(var(--stage-firstyear-accent) / 0.22)";
  const kickerWash = forYou
    ? "hsl(var(--stage-recovery) / 0.9)"
    : "hsl(var(--stage-firstyear) / 0.9)";
  const cardWash = forYou
    ? "linear-gradient(150deg, hsl(var(--stage-recovery) / 0.9), hsl(var(--stage-firstyear-cream)))"
    : "linear-gradient(150deg, hsl(var(--stage-firstyear) / 0.85), hsl(var(--stage-firstyear-cream)))";

  return (
    <section className="pb-10">
      <span
        className={`${FY_KICKER} mb-3`}
        style={{ color: accent, backgroundColor: kickerWash, border: `1px solid ${border}` }}
      >
        {kicker}
      </span>
      <h2 className={`${FY_HEADING} mb-2.5`}>{heading}</h2>
      <p className={`${FY_INTRO} mb-5`}>{intro}</p>

      <ul
        className={
          halfWidth
            ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3.5 list-none p-0 m-0"
            : "grid grid-cols-1 sm:grid-cols-2 gap-3.5 list-none p-0 m-0"
        }
      >
        {cards.map((card) => (
          <li key={`${card.title}-${card.href}`}>
            <Link
              to={card.href}
              className={`group flex h-full items-start gap-4 rounded-[18px] border px-4 py-4 transition-colors hover:border-foreground/25 ${FY_FOCUS_RING}`}
              style={{ borderColor: border, background: cardWash }}
            >
              <GuideThumb
                src={card.topic ? firstYearTopicConfigs[card.topic]?.heroImage : undefined}
                size="sm"
                tint={tint}
              />
              <span className="min-w-0 flex-1">
                <span className={`block ${FY_CARD_TITLE}`}>{card.title}</span>
                <span className={`mt-1 block ${FY_CARD_BODY}`}>{card.detail}</span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default SupportLane;
