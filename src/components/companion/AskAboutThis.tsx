/**
 * AIC-J4 — the one contextual hand-off affordance.
 *
 * Pressing it opens the shared companion panel carrying entry provenance for
 * what the person was reading. It is not an answer surface: it renders no
 * transcript, calls no model, sends no hidden user message, and creates no
 * second conversation runtime.
 *
 * Routing rule:
 *   contextual hand-off  -> the site-wide panel (stay on the content)
 *   broad or free-text   -> `/ask` (a full page for a longer conversation)
 *
 * Suggestions passed here are transient presentation state only. They are
 * never written into JourneyContextV1 and never persisted.
 */

import { useNavigate } from "react-router-dom";
import { MessageCircle } from "lucide-react";
import { useCompanionEntryHandoff } from "./useCompanionEntryHandoff";

export interface AskAboutThisEntry {
  stage?: string | null;
  journey?: string | null;
  topic?: string | null;
  /** Short content label, e.g. "Week 21". Never a personal fact. */
  title?: string | null;
}

export interface AskAboutThisProps {
  /** Visible button copy. Must describe the content, not the person. */
  label: string;
  entry: AskAboutThisEntry;
  /** Presentation-only starter chips for this hand-off. */
  suggestions?: string[];
  /** Optional line under the button. */
  description?: string;
  /** `panel` keeps the person on the page; `ask` opens the full page. */
  destination?: "panel" | "ask";
  className?: string;
}

const BASE_CLASS =
  "inline-flex min-h-[44px] items-center justify-center gap-2 rounded-pill px-5 py-3 font-sans text-[13.5px] font-medium transition-colors";

const AskAboutThis = ({
  label,
  entry,
  suggestions,
  description,
  destination = "panel",
  className,
}: AskAboutThisProps) => {
  const navigate = useNavigate();
  const handoff = useCompanionEntryHandoff();

  const open = () => {
    if (destination === "panel" && handoff) {
      handoff({ entry, suggestions });
      return;
    }
    const params = new URLSearchParams();
    if (entry.stage) params.set("stage", entry.stage);
    if (entry.journey) params.set("journey", entry.journey);
    if (entry.topic) params.set("topic", entry.topic);
    const search = params.toString();
    navigate({ pathname: "/ask", search: search ? `?${search}` : "" });
  };


  return (
    <div className={className}>
      <button
        type="button"
        onClick={open}
        className={`${BASE_CLASS} border border-border/60 text-foreground hover:bg-parchment/60`}
      >
        <MessageCircle size={15} aria-hidden="true" />
        {label}
      </button>
      {description && (
        <p className="mt-2 font-sans text-[13px] font-light text-muted-foreground leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
};

export default AskAboutThis;
