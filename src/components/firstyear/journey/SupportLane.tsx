import { Link } from "react-router-dom";
import { FY_FOCUS_RING } from "./firstYearStyles";


export type SupportCard = {
  title: string;
  detail: string;
  href: string;
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

  const accent =
    side === "baby"
      ? "hsl(var(--stage-firstyear-accent))"
      : "hsl(var(--stage-recovery-accent))";
  const border =
    side === "baby"
      ? "hsl(var(--stage-firstyear-accent) / 0.18)"
      : "hsl(var(--stage-recovery-accent) / 0.18)";
  const wash =
    side === "baby"
      ? "hsl(var(--stage-firstyear) / 0.5)"
      : "hsl(var(--stage-recovery) / 0.5)";

  return (
    <section className="pb-10">
      <p
        className="font-sans text-[10.5px] font-medium tracking-[0.3em] uppercase mb-3"
        style={{ color: accent }}
      >
        {kicker}
      </p>
      <h2 className="font-serif text-[1.35rem] sm:text-[1.55rem] leading-[1.2] text-foreground/90 mb-2.5">
        {heading}
      </h2>
      <p className="font-sans text-[14px] leading-[1.7] text-foreground/70 max-w-[52ch] mb-5">
        {intro}
      </p>

      <ul
        className={
          halfWidth
            ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3.5"
            : "grid grid-cols-1 sm:grid-cols-2 gap-3.5"
        }
      >

        {cards.map((card) => (
          <li key={`${card.title}-${card.href}`}>
            <Link
              to={card.href}
              className={`group block h-full rounded-[18px] border px-5 py-5 transition-colors hover:border-foreground/25 ${FY_FOCUS_RING}`}
              style={{ borderColor: border, backgroundColor: wash }}
            >
              <span className="block font-serif text-[1.05rem] leading-snug text-foreground/90">
                {card.title}
              </span>
              <span className="mt-1.5 block font-sans text-[13px] leading-[1.6] text-foreground/65">
                {card.detail}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default SupportLane;
