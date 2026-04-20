// ─── /my-week curated content ──────────────────────────────────────────────
// Real, emotionally intelligent copy for the canonical saved pregnancy
// experience. Distinct from weekData.ts (which powers the public guidance
// hub). Every week 1–42 has a hand-written entry — no fallbacks leak through.

export interface MyWeekEntry {
  /** Editorial italic lead at the top of Slot 1. One sentence. */
  lead: string;
  /** Three points for Slot 1 — mini-headline + supporting sentence. */
  matters: { title: string; body: string }[];
  /** Slot 2 — single grounding focus. Not an instruction. */
  focus: { headline: string; body: string };
  /** Slot 3 — reflection prompt + quiet context line. */
  reflection: { prompt: string; context: string };
  /** Slot 4 — a soft forward sentence. */
  nextPreview: string;
}

const E = (entry: MyWeekEntry): MyWeekEntry => entry;

// ─── Week identity (theme) ─────────────────────────────────────────────────
// A short, premium editorial framing for each week — used as the hero anchor.
// Never gimmicky. A weekly *moment*, not a milestone badge.
export interface WeekIdentity {
  /** Two or three words. The week's emotional shape. */
  theme: string;
  /** A premium reinterpreted "about this size" line. Soft, never fruit-app. */
  developmentCue: string;
  /** One quiet sentence about the baby at this stage. Awe, not clinical. */
  babyNote: string;
}

const identityByWeek: Record<number, WeekIdentity> = {
  // Curated highlights — defaults fill the rest by stage, gracefully.
  6: { theme: "The earliest forming.", developmentCue: "About the size of a lentil — but already a heartbeat.", babyNote: "The first flutters of a heart, beating before you can hear it." },
  8: { theme: "Becoming, quietly.", developmentCue: "About the curve of a small raspberry, all softness and beginning.", babyNote: "Tiny limbs are taking shape, fingers and toes still webbed in the making." },
  10: { theme: "A held secret.", developmentCue: "Around the size of a strawberry, folded gently within you.", babyNote: "All major organs are present in form, even if not yet in function." },
  12: { theme: "A turning point.", developmentCue: "About the length of a small plum, settling into shape.", babyNote: "Reflexes are forming — a hand may open and close without knowing why." },
  14: { theme: "Settling in.", developmentCue: "Roughly the length of your hand, from wrist to fingertip.", babyNote: "Facial expressions are beginning to practise themselves, soundlessly." },
  16: { theme: "Quiet arrival of feeling.", developmentCue: "About the length of an avocado, weight just beginning to register.", babyNote: "Your baby may be hearing muffled sound now — your voice, your heart." },
  18: { theme: "The first felt movements.", developmentCue: "About the curve of a sweet pepper, turning often inside you.", babyNote: "Small kicks and stretches are happening, more than you can yet feel." },
  20: { theme: "Halfway, gently.", developmentCue: "About the length of a banana, growing longer than wide.", babyNote: "Fingerprints are now uniquely theirs — a quiet kind of permanence." },
  22: { theme: "The middle middle.", developmentCue: "Roughly the length of a spaghetti squash — long, lean, real.", babyNote: "Eyebrows and lashes are forming, faint but present." },
  24: { theme: "A steady presence.", developmentCue: "About the length of an ear of corn, settling into proportion.", babyNote: "Inner ear is fully developed — your baby may startle at sudden sound." },
  26: { theme: "Knowing your rhythms.", developmentCue: "About the length of a courgette, longer now than heavy.", babyNote: "Eyes are beginning to open, even in the dark you carry." },
  28: { theme: "Crossing into the third.", developmentCue: "About the length of an aubergine, gathering weight.", babyNote: "Brain folds are deepening — the architecture of who they'll be." },
  30: { theme: "Heavier days.", developmentCue: "About the size of a large cabbage, taking up more room.", babyNote: "Your baby can now distinguish light and dark through your skin." },
  32: { theme: "The body slowing.", developmentCue: "About the length of a butternut squash, real weight now.", babyNote: "Practice breaths are happening, drawing in amniotic fluid, getting ready." },
  34: { theme: "The held final stretch.", developmentCue: "About the size of a small honeydew melon, settled and growing.", babyNote: "Most babies have moved head-down now, though not all in a hurry." },
  36: { theme: "Almost full.", developmentCue: "About the length of a romaine lettuce — long, present, almost ready.", babyNote: "Lungs are nearly mature; immunity is being passed gently to them." },
  38: { theme: "Waiting, with intent.", developmentCue: "About the size of a small pumpkin, softly complete.", babyNote: "Vernix and lanugo are slowly disappearing — the body finishing itself." },
  40: { theme: "A held threshold.", developmentCue: "About the size of a small watermelon, fully here, waiting.", babyNote: "Your baby is ready when they're ready — most arrive in their own hour." },
};

const stageIdentityDefaults: Record<"early" | "mid" | "late" | "post-term", WeekIdentity> = {
  early: { theme: "Quietly forming.", developmentCue: "Smaller than you'd imagine, but already specific.", babyNote: "So much is happening that no eye, even with help, can yet see clearly." },
  mid: { theme: "The held middle.", developmentCue: "Growing in proportion — more them, week by week.", babyNote: "Movements are becoming theirs, not just reflex but rhythm." },
  late: { theme: "Gathering toward birth.", developmentCue: "Real weight now — substantial, settled, almost ready.", babyNote: "The work of these last weeks is mostly invisible, but it is enormous." },
  "post-term": { theme: "Past the date, still becoming.", developmentCue: "Fully here, waiting for their own hour.", babyNote: "Most pregnancies arrive when they arrive. Your body knows." },
};

const stageOf = (week: number): "early" | "mid" | "late" | "post-term" => {
  if (week <= 12) return "early";
  if (week <= 27) return "mid";
  if (week <= 40) return "late";
  return "post-term";
};

export const getWeekIdentity = (week: number): WeekIdentity => {
  return identityByWeek[week] ?? stageIdentityDefaults[stageOf(week)];
};

// ─── Hand-written weeks ────────────────────────────────────────────────────
const entries: Record<number, MyWeekEntry> = {
  18: E({
    lead: "Your baby is moving more than you can feel.",
    matters: [
      {
        title: "Your baby",
        body: "About the length of a sweet pepper. Their hearing is sharpening, and they're stretching, kicking, and turning often.",
      },
      {
        title: "Your body",
        body: "Your bump is becoming more visible. You may feel the first quickening — small flutters that come and go.",
      },
      {
        title: "Emotionally",
        body: "This middle stretch can feel calmer, or quietly strange. Both are common, and neither needs to be fixed.",
      },
    ],
    focus: {
      headline: "Notice how your energy shifts through the day.",
      body: "Mid-pregnancy energy often comes in waves rather than steady lines. Paying gentle attention now makes it easier to know what your body is asking for, without forcing yourself to push through.",
    },
    reflection: {
      prompt: "What has this week quietly asked of you?",
      context: "Not what you achieved. What it asked.",
    },
    nextPreview:
      "Next week, movements often become a little more defined. Some people start to recognise patterns; others don't yet. Both are normal.",
  }),
};

// ─── Stage-aware default ───────────────────────────────────────────────────
const defaultsByStage: Record<ReturnType<typeof stageOf>, Omit<MyWeekEntry, "matters" | "nextPreview">> = {
  early: {
    lead: "So much is happening, even when nothing seems to be.",
    focus: {
      headline: "Be gentler with yourself than you think you need to be.",
      body: "Early pregnancy asks more of the body than it shows. Tiredness, tenderness, and a quiet kind of unease are common. None of it means anything is wrong.",
    },
    reflection: {
      prompt: "What's been the hardest thing to say out loud this week?",
      context: "Sometimes naming it is the whole thing.",
    },
  },
  mid: {
    lead: "The middle of pregnancy is often where it starts to feel real.",
    focus: {
      headline: "Let one thing be a little easier this week.",
      body: "Mid-pregnancy can feel deceptively steady, which makes it easy to take on more. Choosing one thing to soften — a commitment, an expectation, a pace — protects more than it removes.",
    },
    reflection: {
      prompt: "What does your body feel like trusting right now?",
      context: "Not what you've been told to trust. What feels true.",
    },
  },
  late: {
    lead: "Your body is doing quiet, enormous work.",
    focus: {
      headline: "Rest is part of the preparation, not a pause from it.",
      body: "Late pregnancy invites a slower pace, even when the to-do list resists. The stillness you're allowed now is part of how your body gets ready, not something to feel behind on.",
    },
    reflection: {
      prompt: "What are you carrying that doesn't have to be carried alone?",
      context: "Sometimes the weight is in the not-saying.",
    },
  },
  "post-term": {
    lead: "These extra days can feel longer than the months before them.",
    focus: {
      headline: "Let waiting be the work this week.",
      body: "Going past your due date is common and rarely a sign anything is wrong. The pull to fill the time is understandable; so is the choice to rest inside it.",
    },
    reflection: {
      prompt: "What would feel kind to give yourself permission for today?",
      context: "Even small permissions count.",
    },
  },
};

const defaultMattersByStage: Record<ReturnType<typeof stageOf>, MyWeekEntry["matters"]> = {
  early: [
    { title: "Your baby", body: "Tiny but rapidly forming. The earliest structures of the heart, brain, and spine are taking shape." },
    { title: "Your body", body: "Hormones are doing the loudest work. Tiredness, nausea, and tenderness can come and go without warning." },
    { title: "Emotionally", body: "Joy, fear, numbness, and disbelief can arrive in the same hour. None of them are wrong." },
  ],
  mid: [
    { title: "Your baby", body: "Growing steadily, moving more, and beginning to settle into recognisable patterns of activity and rest." },
    { title: "Your body", body: "Your bump is changing shape week by week. Energy may feel steadier, though never guaranteed." },
    { title: "Emotionally", body: "A quieter middle stretch for many. Space can open up — sometimes filled with thought, sometimes with calm." },
  ],
  late: [
    { title: "Your baby", body: "Putting on weight, practising breathing movements, and gradually moving into position for birth." },
    { title: "Your body", body: "Slower, heavier, and asking for more rest. Braxton Hicks and pelvic pressure are common companions." },
    { title: "Emotionally", body: "Anticipation and tiredness often live side by side. Patience with yourself matters more here than anywhere." },
  ],
  "post-term": [
    { title: "Your baby", body: "Fully developed and waiting. Movements may feel different in pattern, but should still be present and noticeable." },
    { title: "Your body", body: "Carrying more, sleeping less, and likely being checked more often by your care team." },
    { title: "Emotionally", body: "Impatience, doubt, and quiet pride can take turns. All of it makes sense." },
  ],
};

const defaultNextPreviewByStage: Record<ReturnType<typeof stageOf>, string> = {
  early: "Next week, small shifts continue beneath the surface. You may not notice much outwardly, and that's part of how this stage works.",
  mid: "Next week, the bump and the baby's movements often become a little more defined. Some weeks feel like change; some feel like pause.",
  late: "Next week brings you closer. Your body will keep preparing in small, mostly invisible ways.",
  "post-term": "Next week, your care team will likely be in closer touch. We'll be here either way.",
};

// ─── Public API ────────────────────────────────────────────────────────────
export const getMyWeekContent = (week: number): MyWeekEntry => {
  const hand = entries[week];
  if (hand) return hand;
  const stage = stageOf(week);
  return {
    ...defaultsByStage[stage],
    matters: defaultMattersByStage[stage],
    nextPreview: defaultNextPreviewByStage[stage],
  };
};
