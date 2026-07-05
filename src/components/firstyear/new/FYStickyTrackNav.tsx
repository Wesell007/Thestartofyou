/**
 * Mobile-only sticky in-page anchor under the hero.
 * Reinforces that both tracks are first-class.
 */
const FYStickyTrackNav = () => {
  return (
    <div className="md:hidden sticky top-[64px] z-30 border-y border-border/40 bg-background/90 backdrop-blur-md shadow-[0_4px_14px_-10px_rgba(20,30,60,0.25)]">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="flex items-stretch gap-2 py-2">
          <a
            href="#baby-topics"
            className="flex-1 flex items-center justify-center gap-2 rounded-full px-4 py-2 font-sans text-[12px] font-light border transition-all active:scale-[0.98]"
            style={{
              color: 'hsl(var(--stage-firstyear-deep))',
              backgroundColor: 'hsl(var(--stage-firstyear-soft) / 0.5)',
              borderColor: 'hsl(var(--stage-firstyear-accent) / 0.28)',
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: 'hsl(var(--stage-firstyear-accent))' }} />
            For your baby
          </a>
          <a
            href="#recovery-topics"
            className="flex-1 flex items-center justify-center gap-2 rounded-full px-4 py-2 font-sans text-[12px] font-light border transition-all active:scale-[0.98]"
            style={{
              color: 'hsl(var(--stage-recovery-deep))',
              backgroundColor: 'hsl(var(--stage-recovery-soft) / 0.5)',
              borderColor: 'hsl(var(--stage-recovery-accent) / 0.28)',
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: 'hsl(var(--stage-recovery-accent))' }} />
            For you
          </a>
        </div>
      </div>
    </div>
  );
};

export default FYStickyTrackNav;
