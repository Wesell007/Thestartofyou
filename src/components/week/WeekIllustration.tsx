/**
 * Inline SVG illustrations for pregnancy weeks 1–40.
 * Each icon represents the baby's approximate size comparison
 * using the brand palette (sage, terracotta, lavender, warm tones).
 */

interface Props {
  week: number;
  className?: string;
}

const WeekIllustration = ({ week, className = "w-10 h-10" }: Props) => {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {getIllustration(week)}
    </svg>
  );
};

function getIllustration(week: number) {
  switch (week) {
    // Weeks 1-3: Tiny dot / seed — microscopic stage
    case 1:
      return (
        <>
          <circle cx="24" cy="24" r="3" fill="hsl(147 25% 55%)" opacity="0.6" />
          <circle cx="24" cy="24" r="8" stroke="hsl(147 25% 55%)" strokeWidth="1" strokeDasharray="2 2" opacity="0.3" />
          <circle cx="24" cy="24" r="14" stroke="hsl(147 25% 55%)" strokeWidth="0.5" strokeDasharray="2 3" opacity="0.15" />
        </>
      );
    case 2:
      return (
        <>
          <circle cx="24" cy="24" r="4" fill="hsl(147 25% 55%)" opacity="0.7" />
          <circle cx="24" cy="24" r="9" stroke="hsl(147 25% 55%)" strokeWidth="1" strokeDasharray="2 2" opacity="0.3" />
        </>
      );
    case 3:
      return (
        <>
          <circle cx="24" cy="25" r="5" fill="hsl(147 25% 55%)" opacity="0.75" />
          <ellipse cx="24" cy="20" rx="2" ry="1.5" fill="hsl(147 25% 65%)" opacity="0.5" />
        </>
      );
    // Week 4: Poppy seed
    case 4:
      return (
        <>
          <ellipse cx="24" cy="24" rx="4" ry="5.5" fill="hsl(25 60% 45%)" />
          <ellipse cx="24" cy="23" rx="2.5" ry="3.5" fill="hsl(25 60% 55%)" opacity="0.5" />
          <line x1="24" y1="18" x2="24" y2="15" stroke="hsl(147 25% 55%)" strokeWidth="1.5" strokeLinecap="round" />
        </>
      );
    // Week 5: Sesame seed
    case 5:
      return (
        <>
          <ellipse cx="24" cy="24" rx="5" ry="7" fill="hsl(38 50% 65%)" transform="rotate(-15 24 24)" />
          <ellipse cx="23" cy="23" rx="3" ry="4.5" fill="hsl(38 50% 75%)" opacity="0.5" transform="rotate(-15 24 24)" />
          <path d="M22 18 Q24 14 26 18" stroke="hsl(147 25% 55%)" strokeWidth="1" fill="none" strokeLinecap="round" />
        </>
      );
    // Week 6: Lentil
    case 6:
      return (
        <>
          <ellipse cx="24" cy="24" rx="8" ry="5.5" fill="hsl(25 45% 50%)" />
          <ellipse cx="22" cy="23" rx="5" ry="3" fill="hsl(25 45% 60%)" opacity="0.4" />
        </>
      );
    // Week 7: Blueberry
    case 7:
      return (
        <>
          <circle cx="24" cy="25" r="8" fill="hsl(260 35% 50%)" />
          <circle cx="24" cy="25" r="6" fill="hsl(260 35% 58%)" opacity="0.4" />
          <circle cx="24" cy="22" r="2" fill="hsl(260 30% 65%)" opacity="0.5" />
          <path d="M21 17 L24 15 L27 17" stroke="hsl(147 25% 50%)" strokeWidth="1.2" fill="none" strokeLinecap="round" />
        </>
      );
    // Week 8: Raspberry
    case 8:
      return (
        <>
          <circle cx="24" cy="25" r="9" fill="hsl(340 45% 50%)" />
          {[0, 60, 120, 180, 240, 300].map((angle, i) => (
            <circle key={i} cx={24 + 5 * Math.cos((angle * Math.PI) / 180)} cy={25 + 5 * Math.sin((angle * Math.PI) / 180)} r="2.5" fill="hsl(340 45% 58%)" opacity="0.6" />
          ))}
          <path d="M21 16 Q24 12 27 16" stroke="hsl(147 25% 50%)" strokeWidth="1.2" fill="none" />
        </>
      );
    // Week 9: Grape
    case 9:
      return (
        <>
          <circle cx="24" cy="26" r="8" fill="hsl(280 30% 45%)" />
          <circle cx="24" cy="24" r="6" fill="hsl(280 30% 55%)" opacity="0.4" />
          <line x1="24" y1="18" x2="24" y2="14" stroke="hsl(147 25% 50%)" strokeWidth="1.5" strokeLinecap="round" />
          <ellipse cx="22" cy="14" rx="3" ry="2" fill="hsl(147 25% 55%)" opacity="0.7" />
        </>
      );
    // Week 10: Kumquat / olive
    case 10:
      return (
        <>
          <ellipse cx="24" cy="24" rx="7" ry="9" fill="hsl(80 40% 50%)" />
          <ellipse cx="23" cy="22" rx="4" ry="5" fill="hsl(80 40% 60%)" opacity="0.4" />
          <line x1="24" y1="15" x2="24" y2="11" stroke="hsl(147 25% 45%)" strokeWidth="1.5" strokeLinecap="round" />
        </>
      );
    // Week 11: Fig
    case 11:
      return (
        <>
          <ellipse cx="24" cy="25" rx="8" ry="10" fill="hsl(320 25% 40%)" />
          <ellipse cx="23" cy="23" rx="5" ry="6" fill="hsl(320 25% 50%)" opacity="0.35" />
          <path d="M22 15 Q24 11 26 15" stroke="hsl(147 25% 50%)" strokeWidth="1.5" fill="hsl(147 25% 55%)" opacity="0.6" />
        </>
      );
    // Week 12: Lime
    case 12:
      return (
        <>
          <circle cx="24" cy="24" r="10" fill="hsl(120 40% 50%)" />
          <circle cx="22" cy="22" r="6" fill="hsl(120 40% 60%)" opacity="0.35" />
          <circle cx="24" cy="24" r="4" fill="hsl(120 40% 45%)" opacity="0.2" />
          <line x1="24" y1="14" x2="24" y2="10" stroke="hsl(147 25% 40%)" strokeWidth="1.5" strokeLinecap="round" />
        </>
      );
    // Week 13: Peach
    case 13:
      return (
        <>
          <circle cx="24" cy="25" r="11" fill="hsl(20 70% 70%)" />
          <circle cx="22" cy="23" r="7" fill="hsl(20 70% 78%)" opacity="0.4" />
          <path d="M24 14 Q22 12 24 10" stroke="hsl(147 25% 50%)" strokeWidth="1.5" fill="none" strokeLinecap="round" />
          <ellipse cx="26" cy="13" rx="3" ry="2" fill="hsl(147 25% 55%)" opacity="0.6" />
        </>
      );
    // Week 14: Lemon
    case 14:
      return (
        <>
          <ellipse cx="24" cy="24" rx="10" ry="11" fill="hsl(50 80% 60%)" />
          <ellipse cx="22" cy="22" rx="6" ry="7" fill="hsl(50 80% 72%)" opacity="0.4" />
          <ellipse cx="24" cy="14" rx="2" ry="1.5" fill="hsl(50 60% 50%)" />
        </>
      );
    // Week 15: Apple
    case 15:
      return (
        <>
          <circle cx="24" cy="25" r="11" fill="hsl(5 60% 50%)" />
          <circle cx="22" cy="23" r="7" fill="hsl(5 60% 60%)" opacity="0.3" />
          <line x1="24" y1="14" x2="25" y2="10" stroke="hsl(25 40% 35%)" strokeWidth="1.5" strokeLinecap="round" />
          <ellipse cx="27" cy="12" rx="3" ry="2" fill="hsl(147 25% 55%)" opacity="0.7" />
        </>
      );
    // Week 16: Avocado
    case 16:
      return (
        <>
          <ellipse cx="24" cy="24" rx="9" ry="12" fill="hsl(100 30% 40%)" />
          <ellipse cx="24" cy="27" rx="5" ry="6" fill="hsl(50 40% 65%)" />
          <circle cx="24" cy="28" r="3.5" fill="hsl(25 40% 35%)" />
        </>
      );
    // Week 17: Pomegranate
    case 17:
      return (
        <>
          <circle cx="24" cy="25" r="11" fill="hsl(0 50% 45%)" />
          <circle cx="22" cy="23" r="7" fill="hsl(0 50% 55%)" opacity="0.3" />
          <path d="M20 14 L24 11 L28 14" fill="hsl(0 40% 40%)" />
        </>
      );
    // Week 18: Sweet potato
    case 18:
      return (
        <>
          <ellipse cx="24" cy="24" rx="13" ry="8" fill="hsl(15 55% 50%)" transform="rotate(-20 24 24)" />
          <ellipse cx="22" cy="23" rx="8" ry="5" fill="hsl(15 55% 60%)" opacity="0.3" transform="rotate(-20 24 24)" />
        </>
      );
    // Week 19: Mango
    case 19:
      return (
        <>
          <ellipse cx="24" cy="24" rx="11" ry="13" fill="hsl(40 75% 55%)" transform="rotate(10 24 24)" />
          <ellipse cx="22" cy="22" rx="7" ry="8" fill="hsl(40 75% 65%)" opacity="0.4" transform="rotate(10 24 24)" />
          <ellipse cx="20" cy="22" rx="3" ry="5" fill="hsl(5 60% 55%)" opacity="0.3" transform="rotate(10 24 24)" />
        </>
      );
    // Week 20: Banana
    case 20:
      return (
        <>
          <path d="M14 30 Q12 20 20 14 Q28 8 32 16 Q28 14 22 18 Q16 24 16 30 Z" fill="hsl(50 85% 60%)" />
          <path d="M16 28 Q14 22 20 16 Q26 12 28 18" stroke="hsl(50 85% 70%)" strokeWidth="2" fill="none" opacity="0.5" />
        </>
      );
    // Week 21: Carrot
    case 21:
      return (
        <>
          <path d="M24 38 L18 14 Q24 10 30 14 Z" fill="hsl(25 75% 55%)" />
          <path d="M24 38 L21 18 Q24 14 27 18 Z" fill="hsl(25 75% 62%)" opacity="0.4" />
          <path d="M20 13 Q18 8 20 10 M24 11 Q24 6 24 8 M28 13 Q30 8 28 10" stroke="hsl(147 30% 50%)" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        </>
      );
    // Week 22: Papaya
    case 22:
      return (
        <>
          <ellipse cx="24" cy="24" rx="12" ry="14" fill="hsl(30 70% 60%)" />
          <ellipse cx="24" cy="26" rx="6" ry="8" fill="hsl(15 60% 55%)" opacity="0.5" />
          <circle cx="23" cy="27" r="1.5" fill="hsl(25 40% 30%)" opacity="0.6" />
          <circle cx="26" cy="25" r="1.2" fill="hsl(25 40% 30%)" opacity="0.6" />
        </>
      );
    // Week 23: Grapefruit
    case 23:
      return (
        <>
          <circle cx="24" cy="24" r="13" fill="hsl(10 65% 60%)" />
          <circle cx="22" cy="22" r="8" fill="hsl(10 65% 70%)" opacity="0.35" />
          <ellipse cx="27" cy="13" rx="3" ry="2" fill="hsl(147 25% 55%)" opacity="0.6" />
        </>
      );
    // Week 24: Corn
    case 24:
      return (
        <>
          <ellipse cx="24" cy="24" rx="7" ry="15" fill="hsl(48 70% 55%)" />
          {[-4, 0, 4, 8].map((y, i) => (
            <ellipse key={i} cx="24" cy={16 + y * 1} rx="6" ry="2" fill="hsl(48 70% 65%)" opacity="0.4" />
          ))}
          <path d="M18 10 Q16 6 20 8 M24 8 Q24 4 24 6 M30 10 Q32 6 28 8" stroke="hsl(147 30% 50%)" strokeWidth="1.2" fill="none" />
        </>
      );
    // Week 25: Cauliflower
    case 25:
      return (
        <>
          {[[20, 20], [28, 20], [24, 26], [18, 26], [30, 26]].map(([cx, cy], i) => (
            <circle key={i} cx={cx} cy={cy} r="6" fill="hsl(60 10% 90%)" />
          ))}
          <path d="M20 32 Q18 36 16 34 M28 32 Q30 36 32 34" stroke="hsl(147 30% 50%)" strokeWidth="1.5" fill="none" />
        </>
      );
    // Week 26: Lettuce
    case 26:
      return (
        <>
          <circle cx="24" cy="24" r="13" fill="hsl(120 35% 55%)" />
          <path d="M16 20 Q24 16 32 20 Q28 28 24 30 Q20 28 16 20 Z" fill="hsl(120 35% 62%)" opacity="0.5" />
          <path d="M20 22 Q24 18 28 22" stroke="hsl(120 35% 45%)" strokeWidth="0.8" fill="none" opacity="0.4" />
        </>
      );
    // Week 27: Rutabaga
    case 27:
      return (
        <>
          <ellipse cx="24" cy="26" rx="11" ry="12" fill="hsl(280 20% 60%)" />
          <ellipse cx="24" cy="30" rx="9" ry="8" fill="hsl(50 40% 70%)" />
          <path d="M22 14 Q20 8 22 10 M26 14 Q28 8 26 10" stroke="hsl(147 30% 50%)" strokeWidth="1.5" fill="none" />
        </>
      );
    // Week 28: Eggplant
    case 28:
      return (
        <>
          <ellipse cx="24" cy="26" rx="8" ry="14" fill="hsl(280 35% 35%)" />
          <ellipse cx="22" cy="24" rx="5" ry="9" fill="hsl(280 35% 45%)" opacity="0.3" />
          <path d="M20 13 Q24 8 28 13" fill="hsl(147 25% 50%)" />
          <line x1="24" y1="12" x2="24" y2="8" stroke="hsl(147 25% 40%)" strokeWidth="1.5" strokeLinecap="round" />
        </>
      );
    // Week 29: Butternut squash
    case 29:
      return (
        <>
          <ellipse cx="24" cy="30" rx="10" ry="9" fill="hsl(35 60% 60%)" />
          <ellipse cx="24" cy="18" rx="6" ry="8" fill="hsl(35 60% 55%)" />
          <ellipse cx="22" cy="28" rx="6" ry="5" fill="hsl(35 60% 68%)" opacity="0.3" />
          <line x1="24" y1="10" x2="24" y2="7" stroke="hsl(147 25% 45%)" strokeWidth="1.5" strokeLinecap="round" />
        </>
      );
    // Week 30: Cabbage
    case 30:
      return (
        <>
          <circle cx="24" cy="24" r="14" fill="hsl(120 30% 50%)" />
          <circle cx="24" cy="24" r="10" fill="hsl(120 30% 58%)" opacity="0.5" />
          <circle cx="24" cy="24" r="6" fill="hsl(120 30% 65%)" opacity="0.5" />
          <circle cx="24" cy="24" r="3" fill="hsl(120 30% 72%)" opacity="0.5" />
        </>
      );
    // Week 31: Coconut
    case 31:
      return (
        <>
          <circle cx="24" cy="24" r="13" fill="hsl(25 40% 35%)" />
          <circle cx="22" cy="22" r="8" fill="hsl(25 40% 42%)" opacity="0.4" />
          <circle cx="20" cy="18" r="2" fill="hsl(25 30% 25%)" />
          <circle cx="26" cy="17" r="1.5" fill="hsl(25 30% 25%)" />
        </>
      );
    // Week 32: Jicama
    case 32:
      return (
        <>
          <ellipse cx="24" cy="25" rx="13" ry="12" fill="hsl(35 30% 70%)" />
          <ellipse cx="22" cy="23" rx="8" ry="7" fill="hsl(35 30% 78%)" opacity="0.4" />
          <path d="M22 13 Q24 9 26 13" stroke="hsl(147 25% 50%)" strokeWidth="1.5" fill="none" />
        </>
      );
    // Week 33: Pineapple
    case 33:
      return (
        <>
          <ellipse cx="24" cy="28" rx="9" ry="12" fill="hsl(40 65% 50%)" />
          {[0, 1, 2, 3].map((row) => (
            <line key={row} x1="16" y1={20 + row * 5} x2="32" y2={20 + row * 5} stroke="hsl(40 65% 40%)" strokeWidth="0.6" opacity="0.4" />
          ))}
          <path d="M18 16 Q16 8 20 12 M24 14 Q24 6 24 10 M30 16 Q32 8 28 12" stroke="hsl(147 35% 50%)" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        </>
      );
    // Week 34: Cantaloupe
    case 34:
      return (
        <>
          <circle cx="24" cy="24" r="14" fill="hsl(35 55% 60%)" />
          <circle cx="22" cy="22" r="9" fill="hsl(35 55% 68%)" opacity="0.35" />
          {[30, 90, 150].map((angle, i) => (
            <line key={i} x1={24 + 14 * Math.cos((angle * Math.PI) / 180)} y1={24 + 14 * Math.sin((angle * Math.PI) / 180)} x2="24" y2="24" stroke="hsl(35 45% 50%)" strokeWidth="0.5" opacity="0.3" />
          ))}
        </>
      );
    // Week 35: Honeydew
    case 35:
      return (
        <>
          <circle cx="24" cy="24" r="14" fill="hsl(100 30% 70%)" />
          <circle cx="22" cy="22" r="9" fill="hsl(100 30% 78%)" opacity="0.4" />
        </>
      );
    // Week 36: Romaine lettuce
    case 36:
      return (
        <>
          <ellipse cx="24" cy="24" rx="8" ry="15" fill="hsl(110 35% 50%)" />
          <ellipse cx="24" cy="22" rx="5" ry="11" fill="hsl(110 35% 60%)" opacity="0.4" />
          <path d="M24 9 Q22 6 24 4 Q26 6 24 9" fill="hsl(110 35% 45%)" />
        </>
      );
    // Week 37: Swiss chard
    case 37:
      return (
        <>
          <ellipse cx="24" cy="22" rx="10" ry="14" fill="hsl(140 35% 45%)" />
          <path d="M24 36 L24 22" stroke="hsl(140 30% 60%)" strokeWidth="2.5" strokeLinecap="round" />
          <ellipse cx="24" cy="20" rx="7" ry="10" fill="hsl(140 35% 55%)" opacity="0.4" />
        </>
      );
    // Week 38: Leek
    case 38:
      return (
        <>
          <rect x="21" y="20" width="6" height="20" rx="3" fill="hsl(80 20% 85%)" />
          <path d="M18 20 Q18 8 24 6 Q30 8 30 20" fill="hsl(140 35% 50%)" />
          <path d="M20 18 Q20 10 24 8 Q28 10 28 18" fill="hsl(140 35% 58%)" opacity="0.4" />
        </>
      );
    // Week 39: Watermelon
    case 39:
      return (
        <>
          <ellipse cx="24" cy="24" rx="15" ry="13" fill="hsl(130 40% 40%)" />
          <ellipse cx="24" cy="24" rx="15" ry="13" fill="hsl(130 40% 50%)" opacity="0.3" />
          {[0, 1, 2, 3].map((i) => (
            <line key={i} x1={12 + i * 2} y1="12" x2={16 + i * 2} y2="36" stroke="hsl(130 40% 35%)" strokeWidth="0.6" opacity="0.3" />
          ))}
        </>
      );
    // Week 40: Pumpkin — full term!
    case 40:
      return (
        <>
          <ellipse cx="24" cy="25" rx="14" ry="13" fill="hsl(25 70% 55%)" />
          <ellipse cx="20" cy="25" rx="6" ry="12" fill="hsl(25 70% 60%)" opacity="0.3" />
          <ellipse cx="28" cy="25" rx="6" ry="12" fill="hsl(25 70% 50%)" opacity="0.2" />
          <rect x="22" y="10" width="4" height="5" rx="2" fill="hsl(147 25% 45%)" />
          <path d="M22 13 Q18 10 16 13" stroke="hsl(147 25% 50%)" strokeWidth="1.2" fill="none" />
        </>
      );
    default:
      // Fallback: generic circle
      return (
        <circle cx="24" cy="24" r="10" fill="hsl(147 25% 55%)" opacity="0.4" />
      );
  }
}

export default WeekIllustration;
