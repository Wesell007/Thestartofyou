/**
 * Mobile-only sticky in-page anchor under the hero.
 * Reinforces that both tracks are first-class.
 */
const FYStickyTrackNav = () => {
  return (
    <div className="md:hidden sticky top-[64px] z-30 border-y border-border/40 bg-background/85 backdrop-blur-md">
      <div className="container mx-auto px-5 max-w-5xl">
        <div className="flex items-stretch h-11">
          <a
            href="#baby"
            className="flex-1 flex items-center justify-center gap-2 font-sans text-[12px] font-light"
            style={{ color: 'hsl(var(--stage-firstyear-deep))' }}
          >
            <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: 'hsl(var(--stage-firstyear-accent))' }} />
            Baby track
          </a>
          <div className="w-px bg-border/50" />
          <a
            href="#recovery"
            className="flex-1 flex items-center justify-center gap-2 font-sans text-[12px] font-light"
            style={{ color: 'hsl(var(--stage-recovery-deep))' }}
          >
            <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: 'hsl(var(--stage-recovery-accent))' }} />
            Recovery track
          </a>
        </div>
      </div>
    </div>
  );
};

export default FYStickyTrackNav;
