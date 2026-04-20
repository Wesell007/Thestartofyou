import ReactMarkdown from "react-markdown";
import { Heart, LifeBuoy, Sparkles, Compass, BookOpen } from "lucide-react";
import { Sprig } from "@/components/shared/StageBotanical";

interface Props {
  markdown: string;
}

type ModuleTone = "neutral" | "help" | "seek" | "reassurance" | "next" | "expect";

interface AnswerModule {
  tone: ModuleTone;
  heading?: string;
  body: string; // markdown
  index: number;
}

/**
 * Heuristically classify an H2/H3 heading into an editorial module type.
 * Falls back to "neutral" for normal narrative headings.
 */
const classify = (heading: string): ModuleTone => {
  const h = heading.toLowerCase();
  if (/(seek|call|emergency|urgent|doctor|midwife|gp|warning|red flag|when to)/.test(h)) return "seek";
  if (/(may help|what helps|try|tips|practical|gentle|do now|do today|relief|coping)/.test(h)) return "help";
  if (/(remember|reassur|gentle reminder|kind|truth|you are not|it.s okay|trust)/.test(h)) return "reassurance";
  if (/(next|continue|follow up|after|coming|further)/.test(h)) return "next";
  if (/(expect|happening|going on|means|why|normal)/.test(h)) return "expect";
  return "neutral";
};

/**
 * Split the long-form markdown into modules at H2/H3 boundaries.
 * Anything before the first heading becomes an opening "neutral" block.
 */
const splitIntoModules = (md: string): AnswerModule[] => {
  const lines = md.split("\n");
  const modules: AnswerModule[] = [];
  let currentHeading: string | undefined;
  let currentBuffer: string[] = [];
  let idx = 0;

  const flush = () => {
    const body = currentBuffer.join("\n").trim();
    if (!body && !currentHeading) return;
    modules.push({
      tone: currentHeading ? classify(currentHeading) : "neutral",
      heading: currentHeading,
      body,
      index: idx++,
    });
    currentBuffer = [];
  };

  for (const line of lines) {
    const headingMatch = line.match(/^(#{2,3})\s+(.+?)\s*$/);
    if (headingMatch) {
      flush();
      currentHeading = headingMatch[2].replace(/[*_`]/g, "").trim();
    } else {
      currentBuffer.push(line);
    }
  }
  flush();

  return modules.filter((m) => m.heading || m.body);
};

const toneStyles: Record<
  ModuleTone,
  {
    label: string;
    Icon: typeof Heart;
    accent: string; // text color
    chipBg: string;
    cardBg?: string; // optional surface for emphasised modules
    cardBorder?: string;
    rule: string;
  }
> = {
  neutral: {
    label: "Context",
    Icon: BookOpen,
    accent: "text-sage-muted",
    chipBg: "bg-sage-bg/40",
    rule: "bg-border/30",
  },
  expect: {
    label: "What this means",
    Icon: Sparkles,
    accent: "text-sage",
    chipBg: "bg-sage-bg/55",
    rule: "bg-sage/30",
  },
  help: {
    label: "What may help",
    Icon: Heart,
    accent: "text-lavender",
    chipBg: "bg-lavender-bg/55",
    cardBg: "bg-gradient-to-br from-lavender-bg/30 via-card to-card",
    cardBorder: "border-lavender/20",
    rule: "bg-lavender/30",
  },
  seek: {
    label: "When to seek support",
    Icon: LifeBuoy,
    accent: "text-terracotta",
    chipBg: "bg-terracotta/10",
    cardBg: "bg-gradient-to-br from-terracotta/[0.05] via-card to-card",
    cardBorder: "border-terracotta/20",
    rule: "bg-terracotta/30",
  },
  reassurance: {
    label: "A gentle reminder",
    Icon: Heart,
    accent: "text-sage",
    chipBg: "bg-sage-bg/55",
    cardBg: "bg-gradient-to-br from-sage-bg/40 via-card to-card",
    cardBorder: "border-sage/20",
    rule: "bg-sage/30",
  },
  next: {
    label: "What to do next",
    Icon: Compass,
    accent: "text-sage",
    chipBg: "bg-sage-bg/50",
    rule: "bg-sage/30",
  },
};

/** Shared prose styling — premium editorial reading rhythm. */
const proseClasses = `
  prose prose-sm max-w-none font-sans font-light text-foreground
  prose-p:text-[15px] prose-p:font-light prose-p:leading-[1.9] prose-p:text-foreground/80 prose-p:mb-4 last:prose-p:mb-0
  prose-strong:text-foreground prose-strong:font-medium
  prose-li:text-[15px] prose-li:text-foreground/80 prose-li:leading-[1.85] prose-li:mb-2
  prose-ul:my-4 prose-ol:my-4 prose-ul:pl-1 prose-ol:pl-1
  [&_ul>li]:relative [&_ul>li]:pl-6
  [&_ul>li]:before:content-[''] [&_ul>li]:before:absolute [&_ul>li]:before:left-0 [&_ul>li]:before:top-[0.7em]
  [&_ul>li]:before:w-3 [&_ul>li]:before:h-px [&_ul>li]:before:bg-current [&_ul>li]:before:opacity-40
  [&_ul]:list-none
  prose-h4:font-serif prose-h4:text-[1rem] prose-h4:text-foreground prose-h4:mt-6 prose-h4:mb-2 prose-h4:font-medium
`;

const EditorialAnswer = ({ markdown }: Props) => {
  const modules = splitIntoModules(markdown);

  // Fallback: if no headings were found, render the full markdown as a single neutral module
  if (modules.length === 0) {
    return (
      <article className={proseClasses}>
        <ReactMarkdown>{markdown}</ReactMarkdown>
      </article>
    );
  }

  const total = modules.length;

  return (
    <div className="space-y-10 md:space-y-14">
      {modules.map((m) => {
        const style = toneStyles[m.tone];
        const Icon = style.Icon;
        const isCard = Boolean(style.cardBg);
        const number = String(m.index + 1).padStart(2, "0");
        const totalLabel = String(total).padStart(2, "0");

        return (
          <section key={m.index} className="relative">
            {/* Module header */}
            {m.heading && (
              <header className="mb-5 md:mb-6">
                <div className="flex items-center gap-3 mb-3">
                  <span
                    className={`inline-flex items-center gap-2 ${style.chipBg} ${style.accent} font-sans text-[10px] font-medium tracking-[0.22em] uppercase rounded-full px-3 py-1.5`}
                  >
                    <Icon size={11} strokeWidth={1.75} />
                    {style.label}
                  </span>
                  <span className={`h-px flex-1 ${style.rule} opacity-60`} />
                  <span className="font-sans text-[10px] font-light tracking-widest uppercase text-muted-foreground/45 tabular-nums">
                    {number} / {totalLabel}
                  </span>
                </div>
                <h2 className="font-serif text-[1.45rem] md:text-[1.7rem] text-foreground leading-[1.2] tracking-[-0.012em]">
                  {m.heading}
                </h2>
              </header>
            )}

            {/* Module body — either flat editorial or a soft card surface */}
            {isCard ? (
              <div
                className={`relative ${style.cardBg} border ${style.cardBorder} rounded-[1.5rem] px-6 py-7 md:px-9 md:py-9 shadow-soft overflow-hidden`}
              >
                <Sprig
                  tone={m.tone === "seek" ? "ttc" : "sage"}
                  className="absolute top-5 right-5 w-7 h-7 opacity-25"
                />
                <article className={proseClasses}>
                  <ReactMarkdown>{m.body}</ReactMarkdown>
                </article>
              </div>
            ) : (
              <article className={proseClasses}>
                <ReactMarkdown>{m.body}</ReactMarkdown>
              </article>
            )}

            {/* Editorial divider between modules */}
            {m.index < total - 1 && (
              <div className="flex items-center justify-center mt-10 md:mt-14">
                <span className="h-px w-8 bg-border/40" />
                <span className="mx-3 w-1 h-1 rounded-full bg-sage/40" />
                <span className="h-px w-8 bg-border/40" />
              </div>
            )}
          </section>
        );
      })}
    </div>
  );
};

export default EditorialAnswer;
