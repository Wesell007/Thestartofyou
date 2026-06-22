import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

const questions = [
  { q: "How long does an IVF cycle typically take?", sub: "From stimulation to test day" },
  { q: "What does the two-week wait actually mean?", sub: "Why this window feels different" },
  { q: "When are HCG and beta tests usually done?", sub: "Timing, accuracy, and what to expect" },
  { q: "What is the difference between fresh and frozen transfer?", sub: "How each pathway is paced" },
];

const IVFCommonQuestions = () => {
  return (
    <section className="bg-parchment py-14 md:py-20">
      <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl">
        <div
          className="h-px max-w-32 mx-auto mb-12"
          style={{ backgroundColor: 'hsl(var(--stage-ivf-accent) / 0.20)' }}
        />

        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-6" style={{ backgroundColor: 'hsl(var(--stage-ivf-accent) / 0.3)' }} />
            <span className="font-sans text-[11px] font-light tracking-[0.2em] uppercase" style={{ color: 'hsl(var(--stage-ivf-accent))' }}>
              Questions across IVF
            </span>
            <div className="h-px w-6" style={{ backgroundColor: 'hsl(var(--stage-ivf-accent) / 0.3)' }} />
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl text-foreground leading-tight">
            Common questions across IVF
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {questions.map((item, i) => (
            <Link
              key={item.q}
              to={`/ask?q=${encodeURIComponent(item.q)}`}
              className="group relative flex items-center justify-between gap-4 rounded-2xl border bg-card/80 px-5 py-4 transition-all overflow-hidden"
              style={{ borderColor: 'hsl(var(--stage-ivf-accent) / 0.16)' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'hsl(var(--stage-ivf) / 0.12)';
                e.currentTarget.style.borderColor = 'hsl(var(--stage-ivf-accent) / 0.36)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '';
                e.currentTarget.style.borderColor = 'hsl(var(--stage-ivf-accent) / 0.16)';
              }}
            >
              <span
                aria-hidden
                className="absolute left-0 top-0 bottom-0 w-[2px]"
                style={{ backgroundColor: 'hsl(var(--stage-ivf-accent) / 0.45)' }}
              />
              <div className="min-w-0 flex items-baseline gap-3">
                <span
                  className="font-sans text-[10px] font-light tracking-[0.18em] tabular-nums"
                  style={{ color: 'hsl(var(--stage-ivf-accent) / 0.7)' }}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div className="min-w-0">
                  <p className="font-serif text-[15.5px] text-foreground leading-snug">
                    {item.q}
                  </p>
                  <p className="font-sans text-[11px] font-light text-muted-foreground/65 mt-1">
                    {item.sub}
                  </p>
                </div>
              </div>
              <ArrowUpRight
                size={15}
                className="shrink-0 opacity-50 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all"
                style={{ color: 'hsl(var(--stage-ivf-accent))' }}
              />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default IVFCommonQuestions;
