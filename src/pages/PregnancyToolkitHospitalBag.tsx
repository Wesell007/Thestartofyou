import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import SeoHead from "@/components/seo/SeoHead";
import MyWeekHeader from "@/components/myweek/MyWeekHeader";
import PageStatusNotice from "@/components/journey-status/PageStatusNotice";
import MyWeekFooter from "@/components/myweek/MyWeekFooter";
import PageLoadState from "@/components/shared/PageLoadState";
import HospitalBagProgress from "@/components/pregnancy-toolkit/HospitalBagProgress";
import HospitalBagCategoryCard from "@/components/pregnancy-toolkit/HospitalBagCategory";
import HospitalBagStillToPack from "@/components/pregnancy-toolkit/HospitalBagStillToPack";
import HospitalBagActions from "@/components/pregnancy-toolkit/HospitalBagActions";
import HospitalBagPrintable from "@/components/pregnancy-toolkit/HospitalBagPrintable";
import { useHospitalBag } from "@/hooks/useHospitalBag";
import { HOSPITAL_BAG_CATEGORIES } from "@/lib/hospitalBagSchema";
import { supabase } from "@/integrations/supabase/client";
import { getActivePregnancyJourney } from "@/lib/savedJourney";


const accent = "hsl(var(--stage-pregnancy-accent))";
const softBorder = "hsl(var(--stage-pregnancy-accent) / 0.16)";

const SaveStatePill = ({ state }: { state: "idle" | "saving" | "saved" | "error" }) => {
  if (state === "idle") return null;
  const label =
    state === "saving" ? "Saving…" : state === "saved" ? "Saved" : "Save failed";
  return (
    <span
      aria-live="polite"
      className="fixed bottom-[calc(4.75rem+env(safe-area-inset-bottom))] md:bottom-5 right-5 rounded-full px-4 py-1.5 font-sans text-[11.5px] font-medium tracking-[0.18em] uppercase shadow-md"
      style={{
        background:
          state === "error"
            ? "hsl(0 65% 55%)"
            : state === "saving"
              ? "hsl(var(--stage-pregnancy) / 0.9)"
              : accent,
        color: state === "saving" ? "hsl(var(--foreground) / 0.75)" : "white",
      }}
    >
      {label}
    </span>
  );
};

const PregnancyToolkitHospitalBag = () => {
  const {
    loadState,
    saveState,
    rows,
    progress,
    updatedAt,
    errorMessage,
    togglePacked,
    addCustomItem,
    deleteCustomItem,
    reload,
  } = useHospitalBag();

  if (loadState === "loading" || loadState === "seeding") {
    return (
      <PageLoadState
        message={loadState === "seeding" ? "Setting up your checklist…" : "Opening your hospital bag…"}
      />
    );
  }
  if (loadState === "error") {
    return (
      <PageLoadState
        error={errorMessage ?? "We couldn't open your hospital bag."}
        onRetry={reload}
      />
    );
  }

  const rowsByCategory = HOSPITAL_BAG_CATEGORIES.map((cat) => ({
    meta: cat,
    items: rows.filter((r) => r.category === cat.key),
  }));

  const updated = updatedAt
    ? new Date(updatedAt).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : null;

  return (
    <div className="min-h-screen bg-parchment-grain page-vignette relative">
      <SeoHead
        title="Hospital bag | The Start of You"
        description="Your private hospital bag checklist."
        canonical="https://thestartofyou.com/pregnancy-toolkit/hospital-bag"
        noindex
      />
      <MyWeekHeader />
      <main className="relative mx-auto w-full max-w-[760px] px-5 sm:px-8 md:px-10 pt-20 sm:pt-24 lg:pt-28 pb-24">
        <PageStatusNotice />
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
            Hospital bag
          </h1>
          <p className="font-serif italic text-foreground/70 text-[15.5px] sm:text-[16px] leading-[1.65] max-w-[54ch]">
            A calm checklist for the things you may want to pack for birth, baby and the first hours afterwards.
          </p>
          <p
            className="mt-4 rounded-[14px] border px-4 py-3 font-serif italic text-foreground/70 text-[13.5px] leading-[1.65] max-w-[58ch]"
            style={{
              background: "hsl(var(--stage-pregnancy) / 0.35)",
              borderColor: softBorder,
            }}
          >
            This is a guide, not a rule. Every birth and every hospital is different, so adapt it to what feels right for you and what your care team suggests.
          </p>
        </section>

        {/* Progress */}
        <div className="mb-10">
          <HospitalBagProgress progress={progress} updatedAt={updatedAt} />
        </div>

        {/* Categories */}
        <div className="space-y-5 mb-12">
          {rowsByCategory.map(({ meta, items }) => (
            <HospitalBagCategoryCard
              key={meta.key}
              category={meta}
              items={items}
              onToggle={togglePacked}
              onAdd={(label) => void addCustomItem(meta.key, label)}
              onDelete={deleteCustomItem}
            />
          ))}
        </div>

        {/* Summary */}
        <section
          className="rounded-[20px] keepsake-surface px-6 py-6 mb-10"
          style={{ borderColor: softBorder }}
          aria-label="Summary"
        >
          <p
            className="font-sans text-[10.5px] font-medium tracking-[0.26em] uppercase mb-3"
            style={{ color: accent }}
          >
            Where you are
          </p>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="font-serif text-[1.4rem] text-foreground/85">{progress.packed}</p>
              <p className="font-sans text-[11px] text-foreground/55 mt-1">Packed</p>
            </div>
            <div>
              <p className="font-serif text-[1.4rem] text-foreground/85">
                {progress.total - progress.packed}
              </p>
              <p className="font-sans text-[11px] text-foreground/55 mt-1">Still to pack</p>
            </div>
            <div>
              <p className="font-serif text-[1.4rem] text-foreground/85">{progress.total}</p>
              <p className="font-sans text-[11px] text-foreground/55 mt-1">In your list</p>
            </div>
          </div>
          {updated && (
            <p className="mt-4 font-sans text-[11px] text-foreground/50 text-center">
              Last updated {updated}
            </p>
          )}
        </section>

        {/* Return links */}
        <section
          className="rounded-[20px] keepsake-surface px-6 py-6 flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between"
          style={{ borderColor: softBorder }}
          aria-label="Return"
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
            to="/my-journey"
            className="group inline-flex items-center gap-2 font-sans text-[12px] font-medium tracking-[0.22em] uppercase"
            style={{ color: accent }}
          >
            Open my journey
            <ArrowRight
              size={12}
              strokeWidth={1.8}
              className="transition-transform group-hover:translate-x-0.5"
            />
          </Link>
        </section>
      </main>
      <MyWeekFooter contextual={null} />
      <SaveStatePill state={saveState} />
    </div>
  );
};

export default PregnancyToolkitHospitalBag;
