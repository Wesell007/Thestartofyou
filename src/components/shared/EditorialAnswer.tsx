import ReactMarkdown from "react-markdown";
import { Heart, LifeBuoy } from "lucide-react";
import { Sprig } from "@/components/shared/StageBotanical";

interface Props {
  markdown: string;
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

const calloutMeta: Record<
  "help" | "seek" | "reassurance",
  { label: string; Icon: typeof Heart; accent: string; surface: string; border: string; sprigTone: "sage" | "ttc" }
> = {
  help: {
    label: "What may help",
    Icon: Heart,
    accent: "text-lavender",
    surface: "bg-gradient-to-br from-lavender-bg/35 via-card to-card",
    border: "border-lavender/20",
    sprigTone: "sage",
  },
  seek: {
    label: "When to seek support",
    Icon: LifeBuoy,
    accent: "text-terracotta",
    surface: "bg-gradient-to-br from-terracotta/[0.06] via-card to-card",
    border: "border-terracotta/25",
    sprigTone: "ttc",
  },
  reassurance: {
    label: "A gentle reminder",
    Icon: Heart,
    accent: "text-sage",
    surface: "bg-gradient-to-br from-sage-bg/45 via-card to-card",
    border: "border-sage/20",
    sprigTone: "sage",
  },
};

/**
 * Premium editorial prose — generous measure, confident rhythm, soft list
 * markers, restrained heading hierarchy. No internal chips or dividers; the
 * body is meant to flow as one continuous reading experience.
 */
const proseClasses = `
  prose prose-base max-w-none font-sans font-light text-foreground/85
  prose-p:text-[16px] md:prose-p:text-[17px] prose-p:font-light prose-p:leading-[1.85] prose-p:text-foreground/85 prose-p:mb-6 last:prose-p:mb-0
  prose-strong:text-foreground prose-strong:font-medium
  prose-em:text-foreground/80
  prose-li:text-[16px] md:prose-li:text-[17px] prose-li:text-foreground/85 prose-li:leading-[1.8] prose-li:mb-2.5
  prose-ul:my-6 prose-ol:my-6 prose-ul:pl-1 prose-ol:pl-1
  [&_ul>li]:relative [&_ul>li]:pl-7
  [&_ul>li]:before:content-[''] [&_ul>li]:before:absolute [&_ul>li]:before:left-0 [&_ul>li]:before:top-[0.78em]
  [&_ul>li]:before:w-3.5 [&_ul>li]:before:h-px [&_ul>li]:before:bg-current [&_ul>li]:before:opacity-35
  [&_ul]:list-none
  prose-h3:font-serif prose-h3:text-[1.2rem] md:prose-h3:text-[1.35rem] prose-h3:text-foreground prose-h3:mt-10 prose-h3:mb-3 prose-h3:font-normal prose-h3:tracking-[-0.01em] prose-h3:leading-[1.3]
  prose-h4:font-serif prose-h4:text-[1.05rem] prose-h4:text-foreground prose-h4:mt-8 prose-h4:mb-2.5 prose-h4:font-medium
  prose-blockquote:border-l-2 prose-blockquote:border-sage/40 prose-blockquote:pl-5 prose-blockquote:italic prose-blockquote:text-foreground/75 prose-blockquote:font-light prose-blockquote:my-7
`;

const EditorialAnswer = ({ markdown }: Props) => {
  const modules = splitIntoModules(markdown);

  if (modules.length === 0) {
    return (
      <article className={`${proseClasses} max-w-[68ch] mx-auto`}>
        <ReactMarkdown>{markdown}</ReactMarkdown>
      </article>
    );
  }

  const blocks = groupIntoBlocks(modules);

  return (
    <div className="max-w-[68ch] mx-auto space-y-12 md:space-y-16">
      {blocks.map((block, blockIdx) => {
        if (block.kind === "flow") {
          return (
            <div key={`flow-${blockIdx}`} className="space-y-10 md:space-y-12">
              {block.items.map((m, i) => (
                <section key={i}>
                  {m.heading && (
                    <h2 className="font-serif text-[1.55rem] md:text-[1.85rem] text-foreground leading-[1.22] tracking-[-0.014em] mb-5 md:mb-6">
                      {m.heading}
                    </h2>
                  )}
                  <article className={proseClasses}>
                    <ReactMarkdown>{m.body}</ReactMarkdown>
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
            className={`relative ${meta.surface} border ${meta.border} rounded-[1.75rem] px-7 py-9 md:px-11 md:py-11 shadow-soft overflow-hidden`}
          >
            <Sprig tone={meta.sprigTone} className="absolute top-6 right-6 w-8 h-8 opacity-20" />
            <div className={`flex items-center gap-2.5 mb-5 ${meta.accent}`}>
              <Icon size={14} strokeWidth={1.75} />
              <span className="font-sans text-[10px] font-medium tracking-[0.24em] uppercase">
                {meta.label}
              </span>
            </div>
            {m.heading && (
              <h3 className="font-serif text-[1.35rem] md:text-[1.55rem] text-foreground leading-[1.25] tracking-[-0.012em] mb-4">
                {m.heading}
              </h3>
            )}
            <article className={proseClasses}>
              <ReactMarkdown>{m.body}</ReactMarkdown>
            </article>
          </aside>
        );
      })}
    </div>
  );
};

export default EditorialAnswer;
