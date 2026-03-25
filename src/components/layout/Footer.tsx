const Footer = () => {
  return (
    <footer className="bg-parchment-dark relative overflow-hidden">
      {/* Wavy divider top */}
      <div className="absolute top-0 left-0 right-0 overflow-hidden leading-none">
        <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full" preserveAspectRatio="none" aria-hidden="true">
          <path d="M0,40 C240,70 480,10 720,40 C960,70 1200,10 1440,40 L1440,0 L0,0 Z" fill="hsl(40,30%,96%)" />
        </svg>
      </div>

      <div className="container mx-auto px-6 md:px-10 max-w-6xl pt-28 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-16">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <svg width="24" height="28" viewBox="0 0 28 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <rect x="1" y="1" width="22" height="28" rx="2" stroke="hsl(100,18%,52%)" strokeWidth="1.5" fill="none"/>
                <path d="M5 8 Q14 4 23 8" stroke="hsl(100,18%,52%)" strokeWidth="1.2" fill="none"/>
                <path d="M14 4 L14 1" stroke="hsl(100,18%,52%)" strokeWidth="1.2"/>
                <circle cx="14" cy="3" r="1.5" fill="hsl(100,18%,52%)"/>
              </svg>
              <span className="font-serif text-foreground text-base">
                The Start of You
              </span>
            </div>
            <p className="font-sans text-sm font-light text-muted-foreground leading-relaxed max-w-xs">
              Your trusted companion through pregnancy, offering calm guidance and space for reflection.
            </p>
          </div>

          {/* Links */}
          {[
            {
              heading: "About",
              links: ["Our Story", "Editorial Standards", "Contact"],
            },
            {
              heading: "Resources",
              links: ["Weekly Guides", "Journal Prompts", "Support"],
            },
            {
              heading: "Legal",
              links: ["Privacy Policy", "Terms of Service", "Cookie Policy"],
            },
          ].map((col) => (
            <div key={col.heading}>
              <h4 className="font-serif text-foreground text-base mb-4">{col.heading}</h4>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="font-sans text-sm font-light text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 pt-6 border-t border-parchment-deeper flex flex-col md:flex-row justify-between items-center gap-3 text-xs font-light text-muted-foreground font-sans">
          <span>© 2026 The Start of You. All rights reserved.</span>
          <span className="flex items-center gap-1.5">
            <span>♡</span> Made with care for expecting parents
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
