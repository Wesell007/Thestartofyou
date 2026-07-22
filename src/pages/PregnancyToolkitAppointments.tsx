import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, Plus } from "lucide-react";
import SeoHead from "@/components/seo/SeoHead";
import MyWeekHeader from "@/components/myweek/MyWeekHeader";
import MyWeekFooter from "@/components/myweek/MyWeekFooter";
import PageLoadState from "@/components/shared/PageLoadState";
import AppointmentCard from "@/components/pregnancy-toolkit/AppointmentCard";
import { useAppointments } from "@/hooks/usePregnancyAppointments";
import { formatAppointmentDate, groupAppointments } from "@/lib/appointmentSchema";

const accent = "hsl(var(--stage-pregnancy-accent))";
const softBorder = "hsl(var(--stage-pregnancy-accent) / 0.16)";
const iconBg = "hsl(var(--stage-pregnancy) / 0.5)";

const NewButton = ({ label = "New appointment" }: { label?: string }) => (
  <Link
    to="/pregnancy-toolkit/appointments/new"
    className="group inline-flex items-center gap-2 rounded-full px-4 py-2 font-sans text-[11.5px] font-medium tracking-[0.22em] uppercase transition-shadow hover:shadow-[0_10px_28px_-16px_hsl(var(--stage-pregnancy-accent)/0.5)]"
    style={{
      background: "hsl(var(--stage-pregnancy) / 0.6)",
      color: accent,
      border: `1px solid ${softBorder}`,
    }}
  >
    <Plus size={13} strokeWidth={1.8} />
    {label}
  </Link>
);

const PregnancyToolkitAppointments = () => {
  const { loadState, rows, errorMessage, reload } = useAppointments();

  if (loadState === "loading") {
    return <PageLoadState message="Opening your appointment notes…" />;
  }
  if (loadState === "error") {
    return (
      <PageLoadState
        error={errorMessage ?? "We couldn't open your appointments."}
        onRetry={reload}
      />
    );
  }

  const { upcoming, past } = groupAppointments(rows);
  const next = upcoming[0] ?? null;
  const latestUpdated = rows.reduce<null | typeof rows[number]>((acc, r) => {
    if (!acc) return r;
    return new Date(r.updated_at).getTime() > new Date(acc.updated_at).getTime() ? r : acc;
  }, null);

  return (
    <div className="min-h-screen bg-parchment-grain page-vignette relative">
      <SeoHead
        title="Appointment notes | Pregnancy toolkit"
        description="Your private pregnancy appointment notebook."
        canonical="https://thestartofyou.com/pregnancy-toolkit/appointments"
        noindex
      />
      <MyWeekHeader />
      <main className="relative mx-auto w-full max-w-[820px] px-5 sm:px-8 md:px-10 pt-20 sm:pt-24 lg:pt-28 pb-20 sm:pb-24">
        {/* Hero */}
        <section className="mb-10 sm:mb-12">
          <div className="flex items-center gap-3 mb-5">
            <span
              aria-hidden="true"
              className="block w-6 h-px"
              style={{ backgroundColor: "hsl(var(--stage-pregnancy-accent) / 0.6)" }}
            />
            <p
              className="font-sans text-[10.5px] font-medium tracking-[0.28em] uppercase"
              style={{ color: accent }}
            >
              Pregnancy toolkit
            </p>
          </div>
          <h1 className="font-serif text-[1.9rem] sm:text-[2.25rem] leading-[1.15] text-foreground/90 mb-4">
            Appointment notes
          </h1>
          <p className="font-serif italic text-foreground/70 text-[15.5px] sm:text-[16px] leading-[1.65] max-w-[54ch]">
            A private place to keep questions, notes and follow up reminders from your pregnancy appointments.
          </p>
          <p className="mt-3 font-sans text-[12.5px] text-foreground/55 max-w-[54ch]">
            This is your private notebook. It is not a medical record.
          </p>
        </section>

        {/* Summary + CTA */}
        {rows.length > 0 ? (
          <section
            className="mb-10 rounded-[20px] keepsake-surface px-6 py-6 flex flex-col sm:flex-row gap-5 sm:items-center sm:justify-between"
            style={{ borderColor: softBorder }}
            aria-label="Appointment summary"
          >
            <div className="flex flex-col gap-2">
              <div className="flex items-baseline gap-3">
                <span
                  className="font-serif text-[1.9rem] leading-none"
                  style={{ color: accent }}
                >
                  {rows.length}
                </span>
                <span className="font-sans text-[12px] text-foreground/60 tracking-[0.14em] uppercase">
                  {rows.length === 1 ? "note saved" : "notes saved"}
                </span>
              </div>
              {next ? (
                <p className="font-serif italic text-[14px] text-foreground/70 leading-[1.55]">
                  Next up: {next.appointment_type?.trim() || "Appointment"}
                  {formatAppointmentDate(next.appointment_at)
                    ? ` on ${formatAppointmentDate(next.appointment_at)}`
                    : ""}
                  .
                </p>
              ) : latestUpdated ? (
                <p className="font-serif italic text-[14px] text-foreground/70 leading-[1.55]">
                  Last updated: {new Date(latestUpdated.updated_at).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                  .
                </p>
              ) : null}
            </div>
            <NewButton />
          </section>
        ) : null}

        {/* Empty state */}
        {rows.length === 0 ? (
          <section
            className="mb-10 rounded-[20px] keepsake-surface px-6 py-10 text-center flex flex-col items-center gap-5"
            style={{ borderColor: softBorder }}
          >
            <span
              aria-hidden="true"
              className="flex h-12 w-12 items-center justify-center rounded-full border"
              style={{ background: iconBg, borderColor: softBorder }}
            >
              <Plus size={18} strokeWidth={1.6} style={{ color: accent }} />
            </span>
            <div className="max-w-[42ch]">
              <h2 className="font-serif text-[1.35rem] text-foreground/85 mb-2">
                Start your first note
              </h2>
              <p className="font-serif italic text-[14.5px] text-foreground/65 leading-[1.6]">
                Save a question you want to ask, or a date coming up. Little notes add up gently over the weeks.
              </p>
            </div>
            <NewButton label="Save first appointment" />
          </section>
        ) : null}

        {/* Upcoming */}
        {upcoming.length > 0 ? (
          <section className="mb-10" aria-label="Upcoming appointments">
            <div className="flex items-center gap-3 mb-4">
              <span
                aria-hidden="true"
                className="block w-5 h-px"
                style={{ backgroundColor: "hsl(var(--stage-pregnancy-accent) / 0.55)" }}
              />
              <p
                className="font-sans text-[10.5px] font-medium tracking-[0.26em] uppercase"
                style={{ color: accent }}
              >
                Upcoming
              </p>
            </div>
            <div className="grid grid-cols-1 gap-4">
              {upcoming.map((a) => (
                <AppointmentCard key={a.id} appointment={a} />
              ))}
            </div>
          </section>
        ) : null}

        {/* Past / saved */}
        {past.length > 0 ? (
          <section className="mb-10" aria-label="Past or saved notes">
            <div className="flex items-center gap-3 mb-4">
              <span
                aria-hidden="true"
                className="block w-5 h-px"
                style={{ backgroundColor: "hsl(var(--stage-pregnancy-accent) / 0.4)" }}
              />
              <p className="font-sans text-[10.5px] font-medium tracking-[0.26em] uppercase text-foreground/50">
                Past or saved notes
              </p>
            </div>
            <div className="grid grid-cols-1 gap-4">
              {past.map((a) => (
                <AppointmentCard key={a.id} appointment={a} />
              ))}
            </div>
          </section>
        ) : null}

        {/* Return links */}
        <section
          className="rounded-[20px] keepsake-surface px-6 py-6 flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between"
          style={{ borderColor: softBorder }}
          aria-label="Return links"
        >
          <Link
            to="/pregnancy-toolkit"
            className="group inline-flex items-center gap-2 font-sans text-[12px] font-medium tracking-[0.22em] uppercase"
            style={{ color: accent }}
          >
            <ArrowLeft
              size={12}
              strokeWidth={1.8}
              className="transition-transform group-hover:-translate-x-0.5"
            />
            Back to toolkit
          </Link>
          <Link
            to="/my-week"
            className="group inline-flex items-center gap-2 font-sans text-[12px] font-medium tracking-[0.22em] uppercase"
            style={{ color: accent }}
          >
            Open my week
            <ArrowRight
              size={12}
              strokeWidth={1.8}
              className="transition-transform group-hover:translate-x-0.5"
            />
          </Link>
        </section>
      </main>
      <MyWeekFooter contextual={null} />
    </div>
  );
};

export default PregnancyToolkitAppointments;
