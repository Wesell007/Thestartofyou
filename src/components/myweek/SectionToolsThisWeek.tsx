import { Link } from "react-router-dom";
import {
  Calculator,
  MessageCircleQuestion,
  ClipboardList,
  Activity,
  Footprints,
  Briefcase,
  ScrollText,
  Timer,
  ArrowRight,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

type ToolCard = {
  key: string;
  title: string;
  hint: string;
  icon: LucideIcon;
} & (
  | { kind: "live"; to: string }
  | { kind: "coming-soon" }
);

const TOOLS: Record<string, ToolCard> = {
  dueDate: {
    key: "dueDate",
    title: "Due date calculator",
    hint: "Estimate your due date and weeks to go.",
    icon: Calculator,
    kind: "live",
    to: "/due-date-calculator",
  },
  midwifeQuestions: {
    key: "midwifeQuestions",
    title: "Questions for midwife",
    hint: "A place to gather things to ask.",
    icon: MessageCircleQuestion,
    kind: "coming-soon",
  },
  appointments: {
    key: "appointments",
    title: "Appointment notes",
    hint: "Keep dates and what was said.",
    icon: ClipboardList,
    kind: "coming-soon",
  },
  symptoms: {
    key: "symptoms",
    title: "Symptoms tracker",
    hint: "Notice patterns, gently.",
    icon: Activity,
    kind: "coming-soon",
  },
  kickCounter: {
    key: "kickCounter",
    title: "Kick counter",
    hint: "Time your baby's movements when it helps.",
    icon: Footprints,
    kind: "coming-soon",
  },
  hospitalBag: {
    key: "hospitalBag",
    title: "Hospital bag",
    hint: "A quiet checklist for later.",
    icon: Briefcase,
    kind: "coming-soon",
  },
  birthPlan: {
    key: "birthPlan",
    title: "Birth plan",
    hint: "Your preferences, held in one place.",
    icon: ScrollText,
    kind: "coming-soon",
  },
  contractionCounter: {
    key: "contractionCounter",
    title: "Contraction counter",
    hint: "Time contractions when you need to.",
    icon: Timer,
    kind: "coming-soon",
  },
};

const getWeekTools = (week: number): ToolCard[] => {
  if (week >= 37) return [TOOLS.contractionCounter, TOOLS.hospitalBag, TOOLS.birthPlan];
  if (week >= 34) return [TOOLS.hospitalBag, TOOLS.birthPlan, TOOLS.kickCounter];
  if (week >= 24) return [TOOLS.kickCounter, TOOLS.appointments, TOOLS.symptoms];
  if (week >= 13) return [TOOLS.appointments, TOOLS.symptoms, TOOLS.midwifeQuestions];
  return [TOOLS.dueDate, TOOLS.midwifeQuestions, TOOLS.appointments];
};

const CardShell = ({ children }: { children: React.ReactNode }) => (
  <div
    className="h-full rounded-[20px] keepsake-surface px-5 py-6 flex flex-col"
    style={{ borderColor: "hsl(var(--stage-pregnancy-accent) / 0.14)" }}
  >
    {children}
  </div>
);

const CardInner = ({ tool }: { tool: ToolCard }) => {
  const Icon = tool.icon;
  const isComing = tool.kind === "coming-soon";
  return (
    <>
      <span
        aria-hidden="true"
        className="flex h-9 w-9 items-center justify-center rounded-full border mb-4"
        style={{
          background: "hsl(var(--stage-pregnancy) / 0.5)",
          borderColor: "hsl(var(--stage-pregnancy-accent) / 0.16)",
        }}
      >
        <Icon
          size={15}
          strokeWidth={1.6}
          style={{ color: "hsl(var(--stage-pregnancy-accent))" }}
        />
      </span>
      <h3 className="font-serif text-[1.05rem] sm:text-[1.1rem] text-foreground/88 leading-[1.25] mb-2">
        {tool.title}
      </h3>
      <p className="font-sans text-[13px] font-light text-foreground/60 leading-[1.6] flex-1">
        {tool.hint}
      </p>
      <span
        className={`mt-4 inline-flex items-center gap-1.5 font-sans text-[10.5px] font-medium tracking-[0.22em] uppercase ${
          isComing ? "text-foreground/40" : ""
        }`}
        style={isComing ? undefined : { color: "hsl(var(--stage-pregnancy-accent))" }}
      >
        {isComing ? (
          "Coming soon"
        ) : (
          <>
            Open
            <ArrowRight size={11} strokeWidth={1.6} />
          </>
        )}
      </span>
    </>
  );
};

interface Props {
  week: number;
}

const SectionToolsThisWeek = ({ week }: Props) => {
  const tools = getWeekTools(week).slice(0, 3);

  return (
    <section className="relative pt-4 pb-12">
      <div className="flex items-center gap-3 mb-5">
        <span
          aria-hidden="true"
          className="block w-5 h-px"
          style={{ backgroundColor: "hsl(var(--stage-pregnancy-accent) / 0.55)" }}
        />
        <p
          className="font-sans text-[10.5px] font-medium tracking-[0.26em] uppercase"
          style={{ color: "hsl(var(--stage-pregnancy-accent))" }}
        >
          Tools for this week
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {tools.map((tool) =>
          tool.kind === "live" ? (
            <Link
              key={tool.key}
              to={tool.to}
              className="group block h-full transition-shadow hover:shadow-[0_18px_44px_-24px_hsl(var(--stage-pregnancy-accent)/0.28)]"
            >
              <CardShell>
                <CardInner tool={tool} />
              </CardShell>
            </Link>
          ) : (
            <div key={tool.key} className="h-full opacity-80">
              <CardShell>
                <CardInner tool={tool} />
              </CardShell>
            </div>
          )
        )}
      </div>
    </section>
  );
};

export default SectionToolsThisWeek;
