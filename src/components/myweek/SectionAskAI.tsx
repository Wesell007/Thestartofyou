/**
 * AIC-J4 — a contextual entry point into the one companion panel.
 *
 * This card is no longer an answer surface: it holds no transcript, calls no
 * model and renders no answer. Pressing it opens the shared panel carrying
 * entry provenance (pregnancy, this week) plus presentation-only suggestions.
 * Nothing is sent on the person's behalf.
 */

import { Sparkles } from "lucide-react";
import { useCompanionIdentity } from "@/hooks/useCompanionIdentity";
import { toneLabel } from "@/lib/companion";
import AskAboutThis from "@/components/companion/AskAboutThis";

interface Props {
  week: number;
  seed: string;
  /** Kept for the surrounding layout only. Never sent to the AI (Phase 29F). */
  dueDate?: Date | null;
}

const accent = "hsl(var(--stage-pregnancy-accent))";

const suggestionsFor = (week: number): string[] => [
  `What should I remember about week ${week}?`,
  "Help me write a reflection for this week.",
  "What could I ask my midwife at this stage?",
];

const SectionAskAI = ({ week }: Props) => {
  const { name, tone } = useCompanionIdentity();

  const eyebrow = name ? `Ask ${name} about this week` : "Ask about this week";
  const heading = name
    ? `Ask ${name} a quiet question about week ${week}.`
    : `Ask a quiet question about week ${week}.`;

  return (
    <section className="relative pt-2 pb-11 sm:pb-12">
      <div className="flex items-center gap-3 mb-5">
        <span
          aria-hidden="true"
          className="block w-5 h-px"
          style={{ backgroundColor: "hsl(var(--stage-pregnancy-accent) / 0.55)" }}
        />
        <p
          className="font-sans text-[10.5px] font-medium tracking-[0.26em] uppercase"
          style={{ color: accent }}
        >
          {eyebrow}
        </p>
        {tone && (
          <span
            className="ml-1 inline-flex items-center rounded-full px-2 py-0.5 font-sans text-[9.5px] font-medium tracking-[0.2em] uppercase"
            style={{
              color: accent,
              backgroundColor: "hsl(var(--stage-pregnancy) / 0.45)",
              border: "1px solid hsl(var(--stage-pregnancy-accent) / 0.25)",
            }}
          >
            {toneLabel(tone)}
          </span>
        )}
      </div>

      <div
        className="relative rounded-[24px] keepsake-surface px-5 sm:px-9 py-7 sm:py-9"
        style={{
          borderColor: "hsl(var(--stage-pregnancy-accent) / 0.28)",
          background:
            "linear-gradient(135deg, hsl(var(--card)) 0%, hsl(var(--stage-pregnancy) / 0.34) 100%)",
          boxShadow: "inset 0 0 0 1px hsl(var(--stage-pregnancy-accent) / 0.12)",
        }}
      >
        <div className="flex items-start gap-4 sm:gap-5">
          <span
            aria-hidden="true"
            className="mt-1 hidden sm:flex h-12 w-12 shrink-0 items-center justify-center rounded-full border"
            style={{
              background: "hsl(var(--stage-pregnancy) / 0.65)",
              borderColor: "hsl(var(--stage-pregnancy-accent) / 0.32)",
            }}
          >
            <Sparkles size={18} strokeWidth={1.7} style={{ color: accent }} />
          </span>

          <div className="flex-1 min-w-0">
            <h2 className="font-serif text-[1.35rem] sm:text-[1.55rem] text-foreground leading-[1.18] mb-3 max-w-[26ch]">
              {heading}
            </h2>
            <p className="font-sans text-[14.5px] sm:text-[15px] text-foreground/78 leading-[1.72] max-w-[46ch] mb-5">
              Your companion opens beside this page, so you keep your place. It is
              not a substitute for medical care.
            </p>

            <AskAboutThis
              label={name ? `Ask ${name} about week ${week}` : `Ask about week ${week}`}
              entry={{ stage: "pregnancy", title: `Week ${week}` }}
              suggestions={suggestionsFor(week)}
              description="Nothing is asked until you write or choose a question."
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default SectionAskAI;
