// ─── Toddler Topic Registry ───────────────────────────────────────────────
// Typed configs for the 8 Toddler subtopic gateway pages. UK English.
// Calm, grounded, practical. Short editorial answers, not long articles.

export type ToddlerTopicSlug =
  | "development-milestones"
  | "behaviour-emotions"
  | "speech-language"
  | "sleep"
  | "food-feeding"
  | "potty-learning"
  | "health-safety"
  | "play-connection";

export type ToddlerIllustrationKind =
  | "deer"
  | "rabbit"
  | "butterfly"
  | "leaf"
  | "bird";

export interface ToddlerQA {
  q: string;
  a: string;
}

export interface ToddlerTopicConfig {
  slug: ToddlerTopicSlug;
  eyebrow: string;
  title: string;
  standfirst: string;
  whatThisCovers: {
    lead: string;
    bullets: string[];
  };
  commonQuestions: ToddlerQA[];
  aiHeading: string;
  aiDescription: string;
  aiPlaceholder: string;
  aiPrompts: string[];
  related: ToddlerTopicSlug[];
  medicallyReviewed?: boolean;
  illustration: ToddlerIllustrationKind;
}

const development: ToddlerTopicConfig = {
  slug: "development-milestones",
  eyebrow: "Development",
  title: "Development & milestones",
  standfirst:
    "Toddler development rarely runs in a straight line. Some weeks bring a leap, others feel quiet. Here is what tends to happen between roughly twelve months and three years, and what is worth a calm word with your GP or health visitor.",
  whatThisCovers: {
    lead:
      "A grounded look at how toddlers move, learn and grow, and the wide range of normal in between.",
    bullets: [
      "Walking, climbing, running and the messy middle in between",
      "Fine motor skills — pointing, stacking, scribbling, feeding themselves",
      "Coordination and the daily practice of falling and trying again",
      "Independence, copying, and the urge to do it themselves",
      "Cognitive leaps — pretend play, problem solving, simple memory",
      "What is normal variation, and when a quiet word with your health visitor helps",
    ],
  },
  commonQuestions: [
    { q: "When should my toddler be walking?", a: "Most children walk independently between 12 and 17 months. A small number take a little longer and are still within the typical range. If your toddler is not walking by 18 months, mention it at your next check-up — usually it is reassurance, sometimes a referral to make sure everything is on track." },
    { q: "Why does my toddler keep falling?", a: "Falling is part of how toddlers learn balance. New walkers fall many times a day. As long as the falls are typical for the activity and your child seems otherwise well, this is normal practice rather than a problem." },
    { q: "Is it normal to skip crawling?", a: "Yes. Some babies bottom-shuffle, roll, or simply pull themselves up and walk. Skipping crawling does not predict any problem when other development is on track." },
    { q: "How can I help my toddler's development without pushing?", a: "Slow, repetitive, real-life play tends to do more than toys or screens. Talking through what you are doing, reading the same books, time outdoors and unhurried mealtimes all feed development quietly." },
    { q: "When should I worry about a milestone?", a: "Trust your quiet sense. If your toddler is losing skills they used to have, not responding to their name, not walking by 18 months, or you simply have a steady worry, speak to your GP or health visitor. Early input is helpful, not alarmist." },
  ],
  aiHeading: "Ask about toddler development",
  aiDescription:
    "If something about your toddler's movement, coordination or independence is on your mind, ask in plain words and get a calm, considered answer.",
  aiPlaceholder: "What's on your mind about development?",
  aiPrompts: [
    "When should my toddler be walking?",
    "Is it normal to skip crawling?",
    "How do I help fine motor skills?",
    "Should I worry about late milestones?",
  ],
  related: ["speech-language", "play-connection", "behaviour-emotions"],
  illustration: "deer",
};

const behaviour: ToddlerTopicConfig = {
  slug: "behaviour-emotions",
  eyebrow: "Behaviour",
  title: "Behaviour & emotions",
  standfirst:
    "Big feelings in a small body. Tantrums, defiance and clinginess are not signs of poor parenting — they are signs of a brain still learning how to handle a complicated world. Here is what tends to help, and what to expect along the way.",
  whatThisCovers: {
    lead: "Honest guidance for the loud, tearful, repetitive parts of toddlerhood.",
    bullets: [
      "Tantrums — why they happen and what tends to help in the moment",
      "Big feelings your toddler cannot yet name",
      "Setting calm, consistent boundaries without shouting",
      "Separation, clinginess and the gentle work of trust",
      "Hitting, biting and throwing — typical phases and how to respond",
      "Looking after yourself when the day is relentless",
    ],
  },
  commonQuestions: [
    { q: "Why does my toddler have so many tantrums?", a: "Tantrums peak roughly between 18 months and 3 years. Your toddler's brain is wired for big emotions long before it is wired for language or self-control. A calm presence, fewer words and a steady boundary usually helps more than reasoning in the moment." },
    { q: "How do I set boundaries without shouting?", a: "Decide the boundary in advance, hold it kindly, and let your toddler have their feelings about it. You can be warm and firm at the same time. Most days you will not get it perfect — repair afterwards still counts." },
    { q: "Is hitting and biting normal?", a: "Between 1 and 3 years, yes, it usually is. Toddlers hit and bite when they cannot find words for frustration. Name the feeling, stop the behaviour calmly, and offer another way to communicate. It typically fades with time and language." },
    { q: "My toddler is so clingy — is something wrong?", a: "Separation anxiety can come in waves until around 3 years and often spikes around big changes. Clinginess is usually a sign of secure attachment doing its job, not a problem. Short, predictable goodbyes help more than long ones." },
    { q: "What do I do when I lose my patience?", a: "All parents lose patience sometimes. Step away if you safely can, take a breath, come back, and repair simply — \"I'm sorry I shouted. I love you.\" If you feel persistently overwhelmed, low or detached, please speak to your GP. Parental mental health in the toddler years is real and worth support." },
  ],
  aiHeading: "Ask about toddler behaviour",
  aiDescription:
    "Tantrums, defiance, separation, big feelings — ask in plain words and get a calm, considered answer.",
  aiPlaceholder: "What's happening with your toddler?",
  aiPrompts: [
    "Why does my toddler have tantrums?",
    "How do I set calm boundaries?",
    "Is hitting normal at this age?",
    "How do I handle separation anxiety?",
  ],
  related: ["speech-language", "sleep", "play-connection"],
  illustration: "rabbit",
};

const speech: ToddlerTopicConfig = {
  slug: "speech-language",
  eyebrow: "Speech & language",
  title: "Speech & language",
  standfirst:
    "Children pick up words at very different speeds, and the range of normal is wide. Here is what tends to happen between one and three years, and how to know when a friendly speech and language referral is worth asking for.",
  whatThisCovers: {
    lead: "How toddlers move from sounds to words to sentences, and what gentle support looks like.",
    bullets: [
      "First words — what to expect from around 12 months",
      "Sentence growth from two-word phrases onwards",
      "Understanding, which often runs ahead of speech",
      "Bilingual and multilingual homes — what is and isn't a concern",
      "Late talkers and what genuinely helps at home",
      "When to speak to your GP or health visitor about a referral",
    ],
  },
  commonQuestions: [
    { q: "How many words should my toddler have?", a: "Very rough guides: a handful of words by 18 months, around 50 words and the start of two-word phrases by 2 years, short sentences by 2.5–3 years. There is a wide range of normal — quiet children with strong understanding are usually fine." },
    { q: "Should I worry about a late talker?", a: "If your toddler has few or no words by 18 months, isn't following simple instructions, isn't using gestures like pointing, or you simply have a quiet worry, mention it at a check-up. Speech and language referrals are common, helpful and not alarmist." },
    { q: "Will being bilingual delay speech?", a: "No. Bilingual children may mix languages and have a slightly smaller vocabulary in each language early on, but their total vocabulary across languages is comparable to monolingual peers. It is not a cause of speech delay." },
    { q: "How can I help my toddler talk more?", a: "Slow your own talking down, narrate everyday life, read the same books over and over, get face-to-face, and leave gentle pauses for them to fill. Toddlers learn language from real back-and-forth, not from screens." },
    { q: "Is screen time bad for speech?", a: "Passive screen time, especially under 2, is not linked with strong language gains and replaces the back-and-forth time that is. Occasional, shared screen use is unlikely to cause lasting harm — but it is not a substitute for talking with you." },
  ],
  aiHeading: "Ask about toddler speech",
  aiDescription:
    "If something about your toddler's words, understanding or speech feels uncertain, ask in plain words and get a calm answer.",
  aiPlaceholder: "What's on your mind about speech?",
  aiPrompts: [
    "When should I worry about late talking?",
    "Does being bilingual delay speech?",
    "How do I help my toddler talk more?",
    "When should I ask for a speech referral?",
  ],
  related: ["development-milestones", "behaviour-emotions", "play-connection"],
  illustration: "bird",
};

const sleep: ToddlerTopicConfig = {
  slug: "sleep",
  eyebrow: "Sleep",
  title: "Sleep",
  standfirst:
    "Toddler sleep is rarely linear. Naps shift, bedtimes get tested, and night waking can return without warning. Here is a calm look at what tends to be typical and what tends to help.",
  whatThisCovers: {
    lead: "Honest guidance through nap transitions, bedtime resistance and broken nights.",
    bullets: [
      "How much sleep toddlers actually need",
      "Nap transitions — two to one, and eventually none",
      "Bedtime resistance and the slow art of a steady routine",
      "Night waking, nightmares and night terrors",
      "Early mornings and what genuinely helps",
      "When to speak to your GP or health visitor about sleep",
    ],
  },
  commonQuestions: [
    { q: "How much sleep does my toddler need?", a: "Most toddlers need around 11 to 14 hours across 24 hours, including naps. Variation between children is normal — focus on how rested your toddler seems in the day, not only on the hours." },
    { q: "When will my toddler drop their nap?", a: "Most children move from two naps to one between 12 and 18 months. The single nap often fades between 3 and 4 years. Some children need a rest period in its place for a while afterwards." },
    { q: "Why is bedtime suddenly a battle?", a: "Bedtime resistance is common between 18 months and 3 years and often coincides with developmental leaps or changes at home. A short, predictable routine and a calm, boring response to stalling tends to help more than new tactics." },
    { q: "What do I do about night waking?", a: "Brief night waking is normal at any age. Persistent waking that exhausts the household is worth thinking about — overtiredness, an early bedtime, a too-long nap, illness, or simply a phase can all play a part. If you are worried, or sleep is broken for weeks, speak to your health visitor or GP." },
    { q: "How do I handle early mornings?", a: "Most toddlers wake somewhere between 6 and 7am. Earlier than that is harder to shift than parents hope. Blackout, a calm response, and resisting the urge to make wake-up too rewarding tend to help slowly over weeks rather than days." },
  ],
  aiHeading: "Ask about toddler sleep",
  aiDescription:
    "If toddler sleep feels uncertain or hard, ask in plain words and get a calm, considered answer.",
  aiPlaceholder: "What's happening with sleep?",
  aiPrompts: [
    "How much sleep does my toddler need?",
    "When will my toddler drop their nap?",
    "Why is bedtime such a battle?",
    "How do I handle night waking?",
  ],
  related: ["behaviour-emotions", "development-milestones", "health-safety"],
  illustration: "leaf",
};

const food: ToddlerTopicConfig = {
  slug: "food-feeding",
  eyebrow: "Food & feeding",
  title: "Food & feeding",
  standfirst:
    "Picky days, sudden refusals, the meal they loved last week and won't touch now — toddler eating can feel strange after the easier weaning months. Here is what tends to be typical, and what is worth a calm word with your GP or health visitor.",
  whatThisCovers: {
    lead: "Practical, low-pressure guidance for the toddler years at the table.",
    bullets: [
      "Why picky eating is so common between 1 and 4 years",
      "Refusal, dropped foods and the wide range of normal",
      "Snacks, milk, and how they affect appetite",
      "Family meals and eating the same food together",
      "Building independence at mealtimes",
      "When to speak to your GP or health visitor",
    ],
  },
  commonQuestions: [
    { q: "Why has my toddler suddenly become so picky?", a: "Neophobia — a wariness of new foods — is a normal developmental stage that often shows up between 1 and 2 years and can last into the early school years. It rarely affects growth and tends to soften with time and repeated, pressure-free exposure." },
    { q: "How much should my toddler eat?", a: "Toddler appetites vary hugely day to day. Most do well with three small meals and two snacks. Trust the longer-term pattern across a week rather than any single meal." },
    { q: "Should I make a separate meal if they refuse?", a: "Generally no. Offering the same family meal — with at least one component your toddler usually accepts — keeps mealtimes lower-pressure long-term. Short-order cooking tends to make picky eating worse over time." },
    { q: "Is it OK that my toddler drinks a lot of milk?", a: "Around 300–400ml of full-fat milk a day is enough for most toddlers. Much more than that can blunt appetite for solid food and contribute to iron-poor diets. If you are unsure, mention it at a check-up." },
    { q: "When should I worry about my toddler's eating?", a: "If your toddler is losing weight, refusing whole food groups for long periods, gagging or distressed at most meals, or you have a steady worry, please speak to your GP or health visitor. Sometimes it is a phase, sometimes it is worth more support." },
  ],
  aiHeading: "Ask about toddler feeding",
  aiDescription:
    "Picky eating, refusals, snacks, mealtimes — ask in plain words and get a calm, considered answer.",
  aiPlaceholder: "What's happening at mealtimes?",
  aiPrompts: [
    "How do I handle picky eating?",
    "How much should my toddler eat?",
    "Should I make a separate meal?",
    "When should I worry about eating?",
  ],
  related: ["health-safety", "behaviour-emotions", "development-milestones"],
  illustration: "leaf",
};

const potty: ToddlerTopicConfig = {
  slug: "potty-learning",
  eyebrow: "Potty learning",
  title: "Potty learning",
  standfirst:
    "There is no perfect age and no perfect method. Potty learning tends to go more smoothly when you wait for readiness than when you start by the calendar. Here is a calm, pressure-free look at what helps.",
  whatThisCovers: {
    lead: "Honest guidance on readiness, starting out, accidents and night dryness.",
    bullets: [
      "Signs of readiness — and why they matter more than age",
      "What the first days and weeks usually look like",
      "Accidents and how to respond without shame",
      "Out and about, nursery and travel",
      "Night dryness and why it often takes much longer",
      "When to ask a health visitor or GP for support",
    ],
  },
  commonQuestions: [
    { q: "When should we start potty training?", a: "Most children show readiness signs between 2 and 3 years — dry nappies for longer stretches, interest in the toilet, ability to follow simple instructions and tell you they need to go. Starting once readiness is there tends to go much more smoothly than starting earlier." },
    { q: "What are the signs of readiness?", a: "Staying dry for a couple of hours, telling you they have done a wee or poo (during or after), interest in the toilet, the ability to pull trousers down with help, and following simple two-step instructions. You don't need every sign — a cluster is enough." },
    { q: "How long does it take?", a: "Many children get the hang of daytime in a few weeks, with occasional accidents for months afterwards. Some take longer, especially with poos. There is no race." },
    { q: "What do I do about accidents?", a: "Stay calm, change them matter-of-factly, and don't make it a moment. Shame slows learning. If accidents suddenly return after a settled period, think about illness, change at home, or simply a regression — usually short-lived." },
    { q: "What about night dryness?", a: "Night dryness is a separate skill and often takes months or years after daytime is reliable. Bedwetting up to age 5 is not usually anything to act on. If you are worried after that, your GP or health visitor can help." },
  ],
  aiHeading: "Ask about potty learning",
  aiDescription:
    "Readiness, accidents, night dryness — ask in plain words and get a calm, considered answer.",
  aiPlaceholder: "What's on your mind about potty learning?",
  aiPrompts: [
    "When should we start potty training?",
    "What are the signs of readiness?",
    "How do I handle accidents?",
    "When will my toddler be dry at night?",
  ],
  related: ["development-milestones", "behaviour-emotions", "health-safety"],
  illustration: "butterfly",
};

const health: ToddlerTopicConfig = {
  slug: "health-safety",
  eyebrow: "Health & safety",
  title: "Health & safety",
  standfirst:
    "Toddlers catch a lot of bugs, take a lot of small tumbles and explore everything within reach. Here is a calm overview of common toddler illnesses, home safety and the signs that mean it is time to seek help.",
  whatThisCovers: {
    lead: "Practical, reassuring guidance on toddler health and the home environment.",
    bullets: [
      "Common toddler bugs — colds, tummy bugs, hand-foot-and-mouth, ear infections",
      "Fevers — what is and isn't usually a worry",
      "Childproofing the home as your toddler becomes faster and braver",
      "Falls, bumps and the typical accidents of the toddler years",
      "Vaccinations, check-ups and the role of your health visitor",
      "When to speak to your GP, call 111, or go to A&E",
    ],
  },
  commonQuestions: [
    { q: "When should I worry about a fever?", a: "Many fevers in toddlers are caused by ordinary viruses and pass in a few days. Speak to a GP or call 111 if your toddler has a fever lasting more than 5 days, seems unusually drowsy or unwell, has a rash that doesn't fade under a glass, is breathing fast, or you simply feel something is wrong. Trust that instinct." },
    { q: "What about a head bump?", a: "Most toddler head bumps are minor. Seek medical help if your toddler loses consciousness, vomits repeatedly, is unusually drowsy, has a fit, or doesn't seem themselves in the hours afterwards. When in doubt, call 111 or 999." },
    { q: "How often will my toddler be ill?", a: "Six to twelve viral illnesses a year is typical for a toddler, especially in their first year of nursery or playgroup. It feels relentless but is usually a sign of an immune system getting on with its job." },
    { q: "What home safety changes matter most?", a: "Stair gates, window restrictors, locked cupboards for medicines and cleaning products, hot drinks out of reach, and small objects off the floor. Most serious toddler accidents at home are predictable and preventable." },
    { q: "When should I call 111 or 999?", a: "Call 999 for serious breathing difficulty, loss of consciousness, severe bleeding, a fit, or a rash that doesn't fade under a glass. Call 111 for advice when you are worried but it doesn't feel like an emergency. Never feel you are wasting their time." },
  ],
  aiHeading: "Ask about toddler health",
  aiDescription:
    "Common bugs, fevers, accidents, home safety — ask in plain words and get a calm, considered answer.",
  aiPlaceholder: "What's on your mind about health?",
  aiPrompts: [
    "When should I worry about a fever?",
    "What do I do about a head bump?",
    "How often will my toddler be ill?",
    "When should I call 111?",
  ],
  related: ["food-feeding", "sleep", "development-milestones"],
  medicallyReviewed: true,
  illustration: "leaf",
};

const play: ToddlerTopicConfig = {
  slug: "play-connection",
  eyebrow: "Play & connection",
  title: "Play & connection",
  standfirst:
    "Toddlers learn through play and through connection with you — usually at the same time. Here is a calm look at independent play, screen time, books and the small daily rituals that build security.",
  whatThisCovers: {
    lead: "Practical ideas for play and connection that don't demand a Pinterest set-up.",
    bullets: [
      "Independent play and how to grow it gently",
      "Screen time — what tends to help and what doesn't",
      "Books, reading the same story (again) and language growth",
      "Outdoor play and unstructured movement",
      "Quiet rituals — bedtime, mealtimes, small daily anchors",
      "Parent-child connection on the days you have nothing left",
    ],
  },
  commonQuestions: [
    { q: "Is my toddler getting enough independent play?", a: "Even ten or fifteen minutes of self-led play is a real skill at this age. Start small, sit nearby with your own quiet thing, and resist the urge to direct. It usually grows steadily through the toddler years." },
    { q: "How much screen time is OK?", a: "Official guidance varies, but most reflect: under 18 months, very little; up to 2, only short, shared, high-quality content; older toddlers, modest amounts alongside plenty of non-screen time. What matters most is what screens replace — not the minutes themselves." },
    { q: "Why does my toddler want the same book every night?", a: "Repetition is how toddlers consolidate language, story and security. Reading the same book over and over is not boring to them — it is reassuring. It is one of the strongest things you can do for early literacy." },
    { q: "Do I need to play 'educational' games?", a: "No. Pouring, sorting, climbing, walking to the shop, kitchen helping and being read to all do enormous developmental work. Toys are useful, but they are not the source of learning." },
    { q: "How do I connect with my toddler when I'm exhausted?", a: "Connection doesn't need to be elaborate. Sitting on the floor without a phone for ten minutes, a slow cuddle at bedtime, or naming what they are doing while they play all count. The toddler years ask a lot — small, regular moments are usually enough." },
  ],
  aiHeading: "Ask about play & connection",
  aiDescription:
    "Independent play, screen time, books, daily rituals — ask in plain words and get a calm, considered answer.",
  aiPlaceholder: "What's on your mind about play?",
  aiPrompts: [
    "How much screen time is OK?",
    "How do I encourage independent play?",
    "Why does my toddler want the same book?",
    "How do I connect when I'm exhausted?",
  ],
  related: ["behaviour-emotions", "speech-language", "development-milestones"],
  illustration: "butterfly",
};

export const toddlerTopicConfigs: Record<ToddlerTopicSlug, ToddlerTopicConfig> = {
  "development-milestones": development,
  "behaviour-emotions": behaviour,
  "speech-language": speech,
  "sleep": sleep,
  "food-feeding": food,
  "potty-learning": potty,
  "health-safety": health,
  "play-connection": play,
};

export const TODDLER_TOPIC_INDEX: Record<
  ToddlerTopicSlug,
  { title: string; eyebrow: string }
> = {
  "development-milestones": { title: development.title, eyebrow: development.eyebrow },
  "behaviour-emotions": { title: behaviour.title, eyebrow: behaviour.eyebrow },
  "speech-language": { title: speech.title, eyebrow: speech.eyebrow },
  "sleep": { title: sleep.title, eyebrow: sleep.eyebrow },
  "food-feeding": { title: food.title, eyebrow: food.eyebrow },
  "potty-learning": { title: potty.title, eyebrow: potty.eyebrow },
  "health-safety": { title: health.title, eyebrow: health.eyebrow },
  "play-connection": { title: play.title, eyebrow: play.eyebrow },
};
