import { Link } from "react-router-dom";
import { SmallSprig, WatercolourWash } from "@/components/myweek/PregnancyDecor";
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
import { PG_HELPER, PG_ICON_BUBBLE } from "./pregnancyStyles";

type ToolCard = {
  key: string;
  title: string;
  hint: string;
  icon: LucideIcon;
  to: string;
};

const TOOLS: Record<string, ToolCard> = {
  dueDate: {
    key: "dueDate",
    title: "Due date calculator",
    hint: "Estimate your due date and weeks to go.",
    icon: Calculator,
    to: "/due-date-calculator",
  },
  midwifeQuestions: {
    key: "midwifeQuestions",
    title: "Questions for midwife",
    hint: "Save questions for your care team.",
    icon: MessageCircleQuestion,
    to: "/pregnancy-toolkit/questions-for-midwife",
  },
  appointments: {
    key: "appointments",
    title: "Appointment notes",
    hint: "Dates, questions and what was said.",
    icon: ClipboardList,
    to: "/pregnancy-toolkit/appointments",
  },
  symptoms: {
    key: "symptoms",
    title: "Pregnancy symptom notes",
    hint: "A private place for symptom notes.",
    icon: Activity,
    to: "/pregnancy-toolkit/symptom-notes",
  },
  kickCounter: {
    key: "kickCounter",
    title: "Baby movement notes",
    hint: "Notice your baby's usual pattern.",
    icon: Footprints,
    to: "/pregnancy-toolkit/baby-movements",
  },
  hospitalBag: {
    key: "hospitalBag",
    title: "Hospital bag",
    hint: "Pack the essentials, calmly.",
    icon: Briefcase,
    to: "/pregnancy-toolkit/hospital-bag",
  },
  birthPlan: {
    key: "birthPlan",
    title: "Birth plan",
    hint: "Your preferences, in one place.",
    icon: ScrollText,
    to: "/pregnancy-toolkit/birth-plan",
  },
  contractionCounter: {
    key: "contractionCounter",
    title: "Contraction timer",
    hint: "Time contractions calmly.",
    icon: Timer,
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
    className="relative h-full overflow-hidden pregnancy-paper rounded-[22px] px-5 py-6 flex flex-col transition-colors duration-300 group-hover:border-[hsl(var(--stage-pregnancy-accent)/0.32)]"
  >
    <WatercolourWash tone="sage" opacity={0.22} className="!absolute" />
    <SmallSprig className="-right-4 -bottom-5 w-[76px] rotate-12" opacity={0.24} />
    <div className="relative flex h-full flex-col">{children}</div>
  </div>
);

const CardInner = ({ tool }: { tool: ToolCard }) => {
  const Icon = tool.icon;
  return (
    <>
      <span
        aria-hidden="true"
        className={`${PG_ICON_BUBBLE} mb-4`}
      >
        <Icon
          size={15}
          strokeWidth={1.7}
          style={{ color: "hsl(var(--stage-pregnancy-accent))" }}
        />
      </span>
      <h3 className="font-serif text-[1.05rem] sm:text-[1.1rem] text-foreground leading-[1.25] mb-2">
        {tool.title}
      </h3>
      <p className={`${PG_HELPER} flex-1`}>
        {tool.hint}
      </p>
      <span
        className="mt-4 inline-flex items-center gap-1.5 font-sans text-[10.5px] font-medium tracking-[0.22em] uppercase"
        style={{ color: "hsl(var(--stage-pregnancy-accent))" }}
      >
        Open
        <ArrowRight
          size={11}
          strokeWidth={1.8}
          className="transition-transform group-hover:translate-x-0.5"
        />
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
        {tools.map((tool) => (
          <Link
            key={tool.key}
            to={tool.to}
            className="group block h-full transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_20px_48px_-24px_hsl(var(--stage-pregnancy-accent)/0.32)]"
          >
            <CardShell>
              <CardInner tool={tool} />
            </CardShell>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default SectionToolsThisWeek;
