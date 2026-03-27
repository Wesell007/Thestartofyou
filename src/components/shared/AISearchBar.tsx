import { useState } from "react";
import { Search, ArrowUpRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface AISearchBarProps {
  /** Placeholder text — rotates if multiple provided */
  placeholder?: string;
  /** Suggested prompts shown below */
  suggestions?: string[];
  /** Context passed to AI (e.g. "Week 12 of pregnancy") */
  context?: string;
  /** Visual variant */
  variant?: "hero" | "section";
}

const AISearchBar = ({
  placeholder = "What's on your mind today?",
  suggestions = [
    "Is this normal?",
    "What should I expect this week?",
    "I feel overwhelmed",
  ],
  context,
  variant = "section",
}: AISearchBarProps) => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleAsk = () => {
    if (!query.trim()) return;
    const params = new URLSearchParams({ q: query.trim() });
    if (context) params.set("ctx", context);
    navigate(`/ask?${params.toString()}`);
  };

  const handleSuggestion = (s: string) => {
    const params = new URLSearchParams({ q: s });
    if (context) params.set("ctx", context);
    navigate(`/ask?${params.toString()}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleAsk();
  };

  const isHero = variant === "hero";

  return (
    <div className={isHero ? "" : "max-w-xl mx-auto"}>
      {/* Search input */}
      <div
        className={`relative bg-card border border-border ${
          isHero ? "rounded-pill" : "rounded-lg"
        } px-5 py-4 flex items-center gap-3 shadow-card-brand focus-within:border-sage focus-within:shadow-soft transition-all`}
      >
        <Search size={18} className="text-sage-muted shrink-0" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="flex-1 bg-transparent font-sans text-sm font-light text-foreground placeholder:text-muted-foreground focus:outline-none"
        />
        <button
          onClick={handleAsk}
          className="bg-terracotta text-terracotta-foreground rounded-pill px-5 py-2 font-sans text-sm font-medium shadow-cta hover:bg-terracotta-hover transition-all shrink-0"
        >
          Ask now
        </button>
      </div>

      {/* Suggestion chips */}
      {suggestions.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-4 justify-center">
          {suggestions.map((s) => (
            <button
              key={s}
              onClick={() => handleSuggestion(s)}
              className="font-sans text-xs font-light text-muted-foreground border border-border rounded-pill px-3.5 py-1.5 hover:border-sage hover:text-foreground transition-all bg-card"
            >
              {s}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default AISearchBar;
