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
    title: "Questions for Midwife",
    hint: "Save questions you want to bring to your midwife.",
    icon: MessageCircleQuestion,
    kind: "live",
    to: "/pregnancy-toolkit/questions-for-midwife",
  },
  appointments: {
    key: "appointments",
    title: "Appointment notes",
    hint: "Keep dates and what was said.",
    icon: ClipboardList,
    kind: "live",
    to: "/pregnancy-toolkit/appointments",
  },
  symptoms: {
    key: "symptoms",
    title: "Pregnancy Symptom Notes",
    hint: "A private place to note symptoms and questions you may want to raise.",
    icon: Activity,
    kind: "live",
    to: "/pregnancy-toolkit/symptom-notes",
  },
  kickCounter: {
    key: "kickCounter",
    title: "Baby movement notes",
    hint: "A calm place to notice your baby's usual pattern.",
    icon: Footprints,
    kind: "live",
    to: "/pregnancy-toolkit/baby-movements",
  },
  hospitalBag: {
    key: "hospitalBag",
    title: "Hospital bag",
    hint: "A quiet checklist for later.",
    icon: Briefcase,
    kind: "live",
    to: "/pregnancy-toolkit/hospital-bag",
  },

  birthPlan: {
    key: "birthPlan",
    title: "Birth plan",
    hint: "Your preferences, held in one place.",
    icon: ScrollText,
    kind: "live",
    to: "/pregnancy-toolkit/birth-plan",
  },
  contractionCounter: {
    key: "contractionCounter",
    title: "Contraction timer",
    hint: "Time contractions and keep notes.",
    icon: Timer,
    kind: "live",
    to: "/pregnancy-toolkit/contraction-timer",
  },
};

const getWeekTools = (week: number): ToolCard[] => {
  if (week >= 37) return [TOOLS.contractionCounter, TOOLS.hospitalBag, TOOLS.birthPlan];
  if (week >= 34) return [TOOLS.hospitalBag, TOOLS.birthPlan, TOOLS.appointments];
  if (week >= 30) return [TOOLS.hospitalBag, TOOLS.birthPlan, TOOLS.appointments];
  if (week >= 28) return [TOOLS.birthPlan, TOOLS.kickCounter, TOOLS.midwifeQuestions];
  if (week >= 24) return [TOOLS.appointments, TOOLS.kickCounter, TOOLS.symptoms];
  if (week >= 13) return [TOOLS.appointments, TOOLS.midwifeQuestions, TOOLS.symptoms];
  if (week >= 6) return [TOOLS.appointments, TOOLS.midwifeQuestions, TOOLS.symptoms];
  if (week >= 4) return [TOOLS.dueDate, TOOLS.symptoms];
  return [TOOLS.dueDate];
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
