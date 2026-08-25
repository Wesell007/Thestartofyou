import type React from "react";
import ReactMarkdown from "react-markdown";
import { Heart, LifeBuoy, Sparkles } from "lucide-react";
import { Sprig } from "@/components/shared/StageBotanical";

interface Props {
  markdown: string;
  /**
   * Render anchors as plain text. Used wherever AI answers are shown so no
   * clickable external source link can reach the reader.
   */
  disableLinks?: boolean;
}

type ModuleTone = "neutral" | "help" | "seek" | "reassurance";

interface AnswerModule {
  tone: ModuleTone;
  heading?: string;
  body: string;
}

/**
 * Heuristically classify an H2/H3 heading. We deliberately collapse most
 * headings into "neutral" so the answer reads as one fluid editorial piece,
 * and reserve framed callouts for the few moments that genuinely deserve
 * stronger emphasis (help, seek, reassurance).
 */
const classify = (heading: string): ModuleTone => {
  const h = heading.toLowerCase();
  if (/(seek|call|emergency|urgent|red flag|warning|when to (call|see|contact))/.test(h)) return "seek";
  if (/(may help|what helps|tips|practical|gentle (steps|practices)|relief|coping|do today|do now)/.test(h)) return "help";
  if (/(remember|reassur|gentle reminder|you are not|it.s okay|trust your|kind reminder)/.test(h)) return "reassurance";
  return "neutral";
};

/** Split markdown at H2/H3 boundaries. */
const splitIntoModules = (md: string): AnswerModule[] => {
  const lines = md.split("\n");
  const modules: AnswerModule[] = [];
  let currentHeading: string | undefined;
  let currentBuffer: string[] = [];

  const flush = () => {
    const body = currentBuffer.join("\n").trim();
    if (!body && !currentHeading) return;
    modules.push({
      tone: currentHeading ? classify(currentHeading) : "neutral",
      heading: currentHeading,
      body,
    });
    currentBuffer = [];
    currentHeading = undefined;
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

/**
 * Group consecutive neutral modules into a single fluid block so the body
 * reads as one continuous editorial piece rather than many fragments.
 */
type Block =
  | { kind: "flow"; items: AnswerModule[] }
  | { kind: "callout"; tone: "help" | "seek" | "reassurance"; module: AnswerModule };

const groupIntoBlocks = (modules: AnswerModule[]): Block[] => {
  const blocks: Block[] = [];
  let flow: AnswerModule[] = [];

  const flushFlow = () => {
    if (flow.length) {
      blocks.push({ kind: "flow", items: flow });
      flow = [];
    }
  };

  for (const m of modules) {
    if (m.tone === "neutral") {
      flow.push(m);
    } else {
      flushFlow();
      blocks.push({ kind: "callout", tone: m.tone, module: m });
    }
  }
  flushFlow();
  return blocks;
};

type CalloutTone = "help" | "seek" | "reassurance";

const calloutMeta: Record<
  CalloutTone,
  {
    label: string;
    Icon: typeof Heart;
    accent: string;
    surface: string;
    border: string;
    sprigTone: "sage" | "ttc";
    bulletClass: string;
    iconRing: string;
  }
> = {
  help: {
    label: "What may help",
    Icon: Sparkles,
    accent: "text-lavender",
    surface: "bg-gradient-to-br from-lavender-bg/40 via-card to-card",
    border: "border-lavender/25",
    sprigTone: "sage",
    bulletClass: "[&_ul>li]:before:bg-lavender/60",
    iconRing: "bg-lavender/10 ring-1 ring-lavender/20",
  },
  seek: {
    label: "When to seek support",
    Icon: LifeBuoy,
    accent: "text-terracotta",
    surface: "bg-gradient-to-br from-terracotta/[0.07] via-card to-card",
    border: "border-terracotta/30",
    sprigTone: "ttc",
    bulletClass: "[&_ul>li]:before:bg-terracotta/65",
    iconRing: "bg-terracotta/10 ring-1 ring-terracotta/25",
  },
  reassurance: {
    label: "A gentle reminder",
    Icon: Heart,
    accent: "text-sage",
    surface: "bg-gradient-to-br from-sage-bg/50 via-card to-card",
    border: "border-sage/25",
    sprigTone: "sage",
    bulletClass: "[&_ul>li]:before:bg-sage/65",
    iconRing: "bg-sage/10 ring-1 ring-sage/25",
  },
};

/**
 * Premium editorial prose — generous measure, confident rhythm, soft list
 * markers, restrained heading hierarchy. No internal chips or dividers; the
 * body is meant to flow as one continuous reading experience.
 */
/**
 * Premium editorial prose with refined custom bullets:
 *  - <ul> uses a small soft circle marker (outer ring + inner dot) in sage tone
 *  - <ol> uses elegant serif numerals in sage
 * Callouts override the bullet colour via `bulletClass` for tonal cohesion.
 */
const proseClasses = `
  prose prose-base max-w-none font-sans font-light text-foreground/85
  prose-p:text-[16px] md:prose-p:text-[17px] prose-p:font-light prose-p:leading-[1.85] prose-p:text-foreground/85 prose-p:mb-6 last:prose-p:mb-0
  prose-strong:text-foreground prose-strong:font-medium
  prose-em:text-foreground/80
  prose-li:text-[16px] md:prose-li:text-[17px] prose-li:text-foreground/85 prose-li:leading-[1.8] prose-li:mb-3
  prose-ul:my-6 prose-ol:my-6 prose-ul:pl-1 prose-ol:pl-1
  [&_ul]:list-none [&_ul>li]:relative [&_ul>li]:pl-8
  [&_ul>li]:before:content-[''] [&_ul>li]:before:absolute [&_ul>li]:before:left-[6px] [&_ul>li]:before:top-[0.72em]
  [&_ul>li]:before:w-[7px] [&_ul>li]:before:h-[7px] [&_ul>li]:before:rounded-full [&_ul>li]:before:bg-sage/55
  [&_ul>li]:after:content-[''] [&_ul>li]:after:absolute [&_ul>li]:after:left-[2px] [&_ul>li]:after:top-[0.58em]
  [&_ul>li]:after:w-[15px] [&_ul>li]:after:h-[15px] [&_ul>li]:after:rounded-full [&_ul>li]:after:border [&_ul>li]:after:border-sage/25
  [&_ol]:list-none [&_ol]:[counter-reset:step] [&_ol>li]:relative [&_ol>li]:pl-10 [&_ol>li]:[counter-increment:step]
  [&_ol>li]:before:content-[counter(step,decimal-leading-zero)] [&_ol>li]:before:absolute [&_ol>li]:before:left-0 [&_ol>li]:before:top-[0.15em]
  [&_ol>li]:before:font-serif [&_ol>li]:before:text-[0.78rem] [&_ol>li]:before:tracking-[0.12em] [&_ol>li]:before:text-sage [&_ol>li]:before:opacity-80
  prose-h3:font-serif prose-h3:text-[1.22rem] md:prose-h3:text-[1.4rem] prose-h3:text-foreground prose-h3:mt-10 prose-h3:mb-3 prose-h3:font-normal prose-h3:tracking-[-0.01em] prose-h3:leading-[1.28]
  prose-h4:font-serif prose-h4:text-[1.05rem] prose-h4:text-foreground prose-h4:mt-8 prose-h4:mb-2.5 prose-h4:font-medium
  prose-blockquote:border-l-2 prose-blockquote:border-sage/40 prose-blockquote:pl-5 prose-blockquote:italic prose-blockquote:text-foreground/75 prose-blockquote:font-light prose-blockquote:my-7
`;

const EditorialAnswer = ({ markdown, disableLinks = false }: Props) => {
  const modules = splitIntoModules(markdown);
  // Answers are grounded against approved sources, but the reader is shown a
  // plain trust line instead of links, so anchors render as plain text.
  const mdComponents = disableLinks
    ? ({ a: ({ children }: { children?: React.ReactNode }) => <>{children}</> } as const)
    : undefined;

  if (modules.length === 0) {
    return (
      <article className={`${proseClasses} max-w-[62ch]`}>
        <ReactMarkdown components={mdComponents}>{markdown}</ReactMarkdown>
      </article>
    );
  }

  const blocks = groupIntoBlocks(modules);

  return (
    <div className="max-w-[62ch] space-y-6 md:space-y-8">
      {blocks.map((block, blockIdx) => {
        if (block.kind === "flow") {
          return (
            <div key={`flow-${blockIdx}`} className="space-y-5 md:space-y-6">
              {block.items.map((m, i) => (
                <section key={i}>
                  {m.heading && (
                    <h2 className="font-serif text-[1.45rem] md:text-[1.7rem] text-foreground leading-[1.25] tracking-[-0.014em] mb-4 md:mb-5">
                      {m.heading}
                    </h2>
                  )}
                  <article className={proseClasses}>
                    <ReactMarkdown components={mdComponents}>{m.body}</ReactMarkdown>
                  </article>
                </section>
              ))}
            </div>
          );
        }

        const meta = calloutMeta[block.tone];
        const Icon = meta.Icon;
        const m = block.module;

        return (
          <aside
            key={`callout-${blockIdx}`}
            className={`group relative ${meta.surface} border ${meta.border} rounded-[1.5rem] px-6 py-8 md:px-10 md:py-10 shadow-[0_2px_24px_-12px_hsl(var(--foreground)/0.08)] overflow-hidden`}
          >
            {/* Soft top accent line */}
            <div className={`absolute top-0 left-10 right-10 h-px ${meta.accent} opacity-20 bg-current`} />
            <Sprig tone={meta.sprigTone} className="absolute -top-2 -right-2 w-20 h-20 opacity-[0.09] rotate-12" />

            {/* Label row with icon medallion */}
            <div className="flex items-center gap-3 mb-6">
              <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full ${meta.iconRing} ${meta.accent}`}>
                <Icon size={14} strokeWidth={1.75} />
              </span>
              <span className={`font-sans text-[10.5px] font-medium tracking-[0.26em] uppercase ${meta.accent}`}>
                {meta.label}
              </span>
              <span className={`flex-1 h-px bg-current opacity-15 ${meta.accent}`} />
            </div>

            {m.heading && (
              <h3 className="font-serif text-[1.4rem] md:text-[1.65rem] text-foreground leading-[1.22] tracking-[-0.014em] mb-5 max-w-[32ch]">
                {m.heading}
              </h3>
            )}
            <article className={`${proseClasses} ${meta.bulletClass} [&_ul>li]:after:border-current [&_ul>li]:after:opacity-25 ${meta.accent.replace('text-', '[&_ul>li]:after:text-')}`}>
              <ReactMarkdown components={mdComponents}>{m.body}</ReactMarkdown>
            </article>
          </aside>
        );
      })}
    </div>
  );
};

export default EditorialAnswer;
