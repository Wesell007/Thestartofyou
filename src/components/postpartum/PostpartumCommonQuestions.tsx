import { Link } from "react-router-dom";
import { ChevronRight, Search } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const questions = [
  { q: "How long does recovery take?", sub: "What to expect and when" },
  { q: "Is it normal to feel overwhelmed?", sub: "Emotional adjustment in the early weeks" },
  { q: "When will my baby sleep more?", sub: "Sleep patterns and development" },
  { q: "When will things feel easier?", sub: "The gradual shift into rhythm" },
  { q: "How do I know if I need more support?", sub: "Recognising when to reach out" },
];

const PostpartumCommonQuestions = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) navigate(`/ask?q=${encodeURIComponent(query)}&stage=postpartum`);
  };

  return (
    <section className="bg-parchment py-16 md:py-24">
      <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-14">
          {/* Left — header + AI search */}
          <div className="md:col-span-2">
            <p
              className="font-sans text-[11px] font-light tracking-[0.2em] uppercase mb-4"
              style={{ color: 'hsl(var(--stage-postpartum-accent))' }}
            >
              Questions & Support
            </p>
            <h2 className="font-serif text-2xl sm:text-3xl text-foreground leading-tight mb-3">
              Common questions
            </h2>
            <p className="font-sans text-sm font-light text-muted-foreground leading-relaxed mb-8">
              Questions many people ask during postpartum, answered with care. Or ask your own below.
            </p>

            {/* AI search panel */}
            <div
              className="rounded-xl p-5 border border-border/30"
              style={{ backgroundColor: 'hsl(var(--stage-postpartum) / 0.15)' }}
            >
              <p
                className="font-sans text-[11px] font-light tracking-[0.15em] uppercase mb-3"
                style={{ color: 'hsl(var(--stage-postpartum-accent))' }}
              >
                Ask anything about postpartum
              </p>
              <form onSubmit={handleSearch}>
                <div className="relative">
                  <Search
                    size={14}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground/40"
                  />
                  <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Is this normal postpartum?"
                    className="w-full bg-background border border-border rounded-lg pl-10 pr-4 py-3 font-sans text-sm font-light text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:ring-1 transition-all"
                    style={{ '--tw-ring-color': 'hsl(var(--stage-postpartum-accent) / 0.3)' } as React.CSSProperties}
                  />
                </div>
              </form>
              <div className="flex flex-wrap gap-2 mt-3">
                {["Recovery timeline", "Sleep help", "Feeling overwhelmed"].map((chip) => (
                  <button
                    key={chip}
                    onClick={() => navigate(`/ask?q=${encodeURIComponent(chip)}&stage=postpartum`)}
                    className="font-sans text-[11px] font-light px-3 py-1.5 rounded-full border transition-colors hover:bg-background/60"
                    style={{
                      borderColor: 'hsl(var(--stage-postpartum-accent) / 0.2)',
                      color: 'hsl(var(--stage-postpartum-accent))',
                    }}
                  >
                    {chip}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right — questions list */}
          <div className="md:col-span-3">
            {questions.map((item, i) => (
              <Link
                key={i}
                to={`/ask?q=${encodeURIComponent(item.q)}&stage=postpartum`}
                className="group flex items-center justify-between py-4 sm:py-5 border-b transition-all hover:pl-1"
                style={{ borderColor: 'hsl(var(--stage-postpartum) / 0.3)' }}
              >
                <div className="flex flex-col gap-0.5 min-w-0">
                  <p className="font-serif text-base sm:text-lg text-foreground leading-snug group-hover:text-foreground/70 transition-colors">
                    {item.q}
                  </p>
                  <p className="font-sans text-xs font-light text-muted-foreground/70">
                    {item.sub}
                  </p>
                </div>
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 ml-4 group-hover:scale-110 transition-transform"
                  style={{ backgroundColor: 'hsl(var(--stage-postpartum) / 0.25)' }}
                >
                  <ChevronRight
                    size={14}
                    style={{ color: 'hsl(var(--stage-postpartum-accent) / 0.6)' }}
                  />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PostpartumCommonQuestions;
