import { Link } from "react-router-dom";
import { ArrowRight, CalendarDays, MapPin } from "lucide-react";
import { Appointment, formatAppointmentDate } from "@/lib/appointmentSchema";

const accent = "hsl(var(--stage-pregnancy-accent))";
const softBorder = "hsl(var(--stage-pregnancy-accent) / 0.16)";

const preview = (value: string | null, max = 120): string | null => {
  if (!value) return null;
  const trimmed = value.trim();
  if (!trimmed) return null;
  return trimmed.length > max ? `${trimmed.slice(0, max).trimEnd()}…` : trimmed;
};

interface Props {
  appointment: Appointment;
}

const AppointmentCard = ({ appointment }: Props) => {
  const when = formatAppointmentDate(appointment.appointment_at);
  const title = appointment.appointment_type?.trim() || "Appointment note";
  const questionsPreview = preview(appointment.questions, 100);
  const notesPreview = preview(appointment.notes, 100);
  const followPreview = preview(appointment.follow_up, 100);

  return (
    <Link
      to={`/pregnancy-toolkit/appointments/${appointment.id}`}
      className="group block h-full transition-shadow hover:shadow-[0_18px_44px_-24px_hsl(var(--stage-pregnancy-accent)/0.28)]"
    >
      <div
        className="h-full rounded-[20px] keepsake-surface px-5 py-5 flex flex-col gap-3"
        style={{ borderColor: softBorder }}
      >
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="font-serif text-[1.05rem] sm:text-[1.15rem] text-foreground/88 leading-[1.25]">
              {title}
            </h3>
            <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 font-sans text-[12px] text-foreground/60">
              {when ? (
                <span className="inline-flex items-center gap-1.5">
                  <CalendarDays size={12} strokeWidth={1.6} style={{ color: accent }} />
                  {when}
                </span>
              ) : (
                <span className="italic text-foreground/50">Date not set</span>
              )}
              {appointment.week != null ? (
                <span
                  className="inline-flex items-center rounded-full px-2 py-0.5 font-medium tracking-[0.14em] uppercase text-[10px]"
                  style={{
                    background: "hsl(var(--stage-pregnancy) / 0.55)",
                    color: accent,
                  }}
                >
                  Week {appointment.week}
                </span>
              ) : null}
              {appointment.location ? (
                <span className="inline-flex items-center gap-1.5">
                  <MapPin size={12} strokeWidth={1.6} style={{ color: accent }} />
                  {appointment.location}
                </span>
              ) : null}
            </div>
          </div>
          <ArrowRight
            size={14}
            strokeWidth={1.6}
            className="transition-transform group-hover:translate-x-0.5 shrink-0 mt-1"
            style={{ color: accent }}
          />
        </div>

        {questionsPreview ? (
          <div>
            <p
              className="font-sans text-[10px] font-medium tracking-[0.22em] uppercase mb-1"
              style={{ color: accent }}
            >
              Questions
            </p>
            <p className="font-serif text-[13.5px] text-foreground/75 leading-[1.6]">
              {questionsPreview}
            </p>
          </div>
        ) : null}

        {notesPreview ? (
          <div>
            <p
              className="font-sans text-[10px] font-medium tracking-[0.22em] uppercase mb-1 text-foreground/50"
            >
              Notes
            </p>
            <p className="font-serif text-[13.5px] text-foreground/75 leading-[1.6]">
              {notesPreview}
            </p>
          </div>
        ) : null}

        {followPreview ? (
          <div>
            <p
              className="font-sans text-[10px] font-medium tracking-[0.22em] uppercase mb-1 text-foreground/50"
            >
              Follow up
            </p>
            <p className="font-serif text-[13.5px] text-foreground/75 leading-[1.6]">
              {followPreview}
            </p>
          </div>
        ) : null}
      </div>
    </Link>
  );
};

export default AppointmentCard;
