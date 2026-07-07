// ─── Family Topic Registry ───────────────────────────────────────────────
// Typed configs for the 6 Family Hub topic pages. UK English.
// Warm, calm, editorial. Short answers, not long articles.

import growingFamiliesImage from "@/assets/family-topic-growing-families.jpg.asset.json";
import relationshipsImage from "@/assets/family-topic-relationships.jpg.asset.json";
import familyBasicsImage from "@/assets/family-topic-family-basics.jpg.asset.json";
import healthSafetyImage from "@/assets/family-topic-health-safety.jpg.asset.json";
import travelDaysOutImage from "@/assets/family-topic-travel-days-out.jpg.asset.json";
import playConnectionImage from "@/assets/family-topic-play-connection.jpg.asset.json";

export type FamilyTopicSlug =
  | "growing-families"
  | "relationships"
  | "family-basics"
  | "health-safety"
  | "travel-days-out"
  | "play-connection";

export interface FamilyQA {
  q: string;
  a: string;
}

export interface FamilyAreaInside {
  title: string;
  body: string;
}

export interface FamilyArticleGroup {
  label: string;
  description?: string;
  slugs: string[];
}

export interface FamilyTopicConfig {
  slug: FamilyTopicSlug;
  eyebrow: string;
  title: string;
  standfirst: string;
  intro: string;
  heroImage: {
    src: string;
    alt: string;
  };
  whatThisCovers: {
    lead: string;
    bullets: string[];
  };
  areasInside: FamilyAreaInside[];
  /** Ordered ready-article slugs surfaced as the Start Here row (max 3). */
  startHere?: string[];
  /** Optional display-only groups for the grouped guidance container. */
  articleGroups?: FamilyArticleGroup[];
  commonQuestions: FamilyQA[];
  aiHeading: string;
  aiDescription: string;
  aiPlaceholder: string;
  aiPrompts: string[];
  related: FamilyTopicSlug[];
}

const growingFamilies: FamilyTopicConfig = {
  slug: "growing-families",
  eyebrow: "Growing families",
  title: "Growing families",
  standfirst:
    "When your family is changing, the practical questions and emotional shifts often arrive together.",
  intro:
    "Whether you are thinking about another baby, adjusting to a new sibling or finding the rhythm of a blended family, this is a calm place to think it through.",
  heroImage: {
    src: growingFamiliesImage.url,
    alt: "Family preparing for a new baby at home",
  },
  whatThisCovers: {
    lead:
      "A grounded look at what tends to shift when a family grows, and the small things that help most.",
    bullets: [
      "Deciding if and when to try for another baby",
      "Second-time parenting and the confidence that comes with it",
      "Preparing an older child for a new sibling",
      "Age gaps — what is realistic, what is manageable",
      "Sibling jealousy, adjustment and the messy middle",
      "Blended family life and finding shared rhythms",
    ],
  },
  areasInside: [
    { title: "Preparing for another baby", body: "Thinking it through calmly, from timing to what actually changes." },
    { title: "Second-time parents", body: "What is easier the second time, and what quietly is not." },
    { title: "Sibling transitions", body: "Helping an older child through the shift without overloading them." },
    { title: "Age gaps", body: "Realistic pictures of small, medium and larger gaps." },
    { title: "Blended family rhythms", body: "Building steady patterns when families come together." },
  ],
  commonQuestions: [
    {
      q: "When is the 'right' time to try for another baby?",
      a: "There is no universal right time. Most families weigh sleep, energy, work, finances and how settled the older child feels. If both of you keep landing on 'not yet, but soon', that is often information worth listening to.",
    },
    {
      q: "How do I prepare my older child for a new baby?",
      a: "Slow, honest, low-pressure. Talk about the baby in ordinary moments, involve them in small choices, and protect their one-to-one time with you both. Big changes like a new room or nursery are easier a few months before the baby arrives, not right after.",
    },
    {
      q: "My older child is being difficult since the baby arrived. Is this normal?",
      a: "Very. Regression, big feelings and clinginess after a sibling arrives are almost universal. It usually eases with time, calm boundaries and reliable one-to-one moments — even ten quiet minutes counts.",
    },
    {
      q: "What is a good age gap between siblings?",
      a: "Every gap has trade-offs. Close gaps can mean more intense early years but shared play later. Larger gaps often feel calmer at home but ask more of the older child. Neither is better — pick what fits your family, not the internet's opinion.",
    },
    {
      q: "How do we settle into life as a blended family?",
      a: "Slowly. Shared routines, small rituals and clear, calm expectations do more than big gestures. Give every relationship time to find its own shape without forcing closeness.",
    },
  ],
  aiHeading: "Ask about growing your family",
  aiDescription:
    "A quiet space to think through the shifts, without the pressure to have it all figured out today.",
  aiPlaceholder: "Ask about siblings, age gaps or preparing for another baby...",
  aiPrompts: [
    "How do I prepare my child for a new baby?",
    "What is a good age gap between children?",
    "How do I manage sibling jealousy?",
  ],
  related: ["relationships", "family-basics", "play-connection"],
  startHere: [
    "preparing-for-another-baby",
    "helping-your-child-adjust-to-a-new-sibling",
  ],
  articleGroups: [
    {
      label: "New siblings and family change",
      slugs: [
        "preparing-for-another-baby",
        "helping-your-child-adjust-to-a-new-sibling",
        "second-time-parenting",
      ],
    },
  ],
};

const relationships: FamilyTopicConfig = {
  slug: "relationships",
  eyebrow: "Relationships",
  title: "Relationships",
  standfirst:
    "Family life is shaped by the relationships around your child, from your partner to grandparents, friends and the people who help you carry the load.",
  intro:
    "Small, steady work on the adult relationships in your family is often the thing that helps the most, quietly, over time.",
  heroImage: {
    src: relationshipsImage.url,
    alt: "Parents sharing a calm conversation at home",
  },
  whatThisCovers: {
    lead:
      "The relationships that hold family life together, and the small conversations that keep them healthy.",
    bullets: [
      "You and your partner — reconnecting after children",
      "Grandparents, in-laws and gentle boundaries",
      "Making parent friends without forcing it",
      "Family communication when everyone is tired",
      "Sharing the mental load more fairly",
      "Repair after arguments and hard weeks",
    ],
  },
  areasInside: [
    { title: "You and your partner", body: "Staying connected in the middle of family life." },
    { title: "Grandparents and boundaries", body: "Kind, clear conversations that protect everyone." },
    { title: "Making parent friends", body: "Finding your people slowly, not performatively." },
    { title: "Family communication", body: "How families talk when the days are full." },
    { title: "Sharing the mental load", body: "Naming the invisible work, then dividing it." },
  ],
  commonQuestions: [
    {
      q: "How do we reconnect after having children?",
      a: "Small and consistent beats big and rare. A ten-minute honest catch-up most evenings does more than one intense conversation a month. Try to talk about something other than the children at least once a day.",
    },
    {
      q: "How do I set boundaries with grandparents without causing a row?",
      a: "Boundaries land better when they are clear, kind and repeatable. Explain the 'why' once, keep the message short, and hold the line calmly. You are not asking permission, you are sharing how your family works.",
    },
    {
      q: "How do I make parent friends?",
      a: "Show up more than once to the same place — a baby group, park, class, school gate. Friendship usually grows out of familiarity, not one big moment. Say yes to the small invitations even when you are tired.",
    },
    {
      q: "How can we share the mental load more fairly?",
      a: "Start by naming it. Write down everything one of you tracks in a normal week — appointments, birthdays, snacks, laundry, uniform, gifts. Divide by ownership, not tasks, so the person in charge of each area also holds the thinking.",
    },
    {
      q: "We are arguing more than we used to. Is that a bad sign?",
      a: "Not always. Tired, stretched families argue more. What matters is whether you repair — a short honest apology, a hug, a reset. If arguments feel unsafe, escalate quickly or shut you down, that is worth outside support.",
    },
  ],
  aiHeading: "Ask about relationships",
  aiDescription:
    "For the quieter questions about partnerships, family and the people around your children.",
  aiPlaceholder: "Ask about your partner, grandparents or the mental load...",
  aiPrompts: [
    "How do I set boundaries with grandparents?",
    "How do we share the mental load better?",
    "How do I make parent friends?",
  ],
  related: ["growing-families", "family-basics", "play-connection"],
  startHere: [
    "sharing-the-mental-load",
    "setting-boundaries-with-grandparents",
  ],
  articleGroups: [
    {
      label: "Sharing family life",
      slugs: ["sharing-the-mental-load"],
    },
    {
      label: "Wider family boundaries",
      slugs: ["setting-boundaries-with-grandparents"],
    },
    {
      label: "Staying close",
      slugs: ["staying-connected-as-parents"],
    },
  ],
};

const familyBasics: FamilyTopicConfig = {
  slug: "family-basics",
  eyebrow: "Family basics",
  title: "Family basics",
  standfirst:
    "The everyday parts of family life can feel small on their own, but together they shape how supported the home feels.",
  intro:
    "Routines, childcare, money, moving home and the shape of working life — the practical pieces that quietly hold everything together.",
  heroImage: {
    src: familyBasicsImage.url,
    alt: "Family planning everyday routines at home",
  },
  whatThisCovers: {
    lead:
      "The steady, practical work of running a family, without the pressure to have it all optimised.",
    bullets: [
      "Family routines that hold up on tired days",
      "Childcare decisions and the trade-offs behind each option",
      "Money conversations that do not derail the week",
      "Moving home with children",
      "Balancing work and family life",
      "Small systems that lighten the daily load",
    ],
  },
  areasInside: [
    { title: "Family routines", body: "Simple rhythms that make ordinary days easier." },
    { title: "Childcare decisions", body: "Comparing options without the guilt spiral." },
    { title: "Finances", body: "Talking about money as a team, calmly." },
    { title: "Moving home", body: "Big changes with small children, gently." },
    { title: "Work and family life", body: "Trade-offs, boundaries and honest conversations." },
  ],
  commonQuestions: [
    {
      q: "How can we make routines easier?",
      a: "Aim for anchor points, not a full schedule. A steady wake-up, meal times and bedtime are usually enough. Let the middle of the day breathe. Written routines only help if everyone can actually see them.",
    },
    {
      q: "How do we manage childcare costs?",
      a: "Start by mapping what you are entitled to — funded hours, tax-free childcare, employer support and family help. Compare true weekly cost, not headline rate. And factor in travel, holidays and the invoice you actually receive.",
    },
    {
      q: "How do I balance work and family life?",
      a: "Balance is rarely 50/50 — it moves week to week. Protect a small number of non-negotiables (school pick-ups, bedtime, one evening) and let the rest flex. If work regularly overruns the non-negotiables, that is a conversation, not a personal failing.",
    },
    {
      q: "Should we move home now the family has grown?",
      a: "Look at the whole picture — space, schools, commute, community, cost, and whether you actually like the area. Bigger is not always better. Some families thrive with less space and more support nearby.",
    },
    {
      q: "How do we talk about money without it turning into an argument?",
      a: "Set a regular short money check-in — fifteen minutes, same time each week or fortnight. Same numbers, same questions. Predictable conversations feel much less loaded than surprise ones.",
    },
  ],
  aiHeading: "Ask about the practical side of family life",
  aiDescription:
    "For the small logistical questions that quietly pile up when nobody is looking.",
  aiPlaceholder: "Ask about routines, childcare, money or work...",
  aiPrompts: [
    "How can we make routines easier?",
    "How do we manage childcare costs?",
    "How do I balance work and family life?",
  ],
  related: ["relationships", "growing-families", "travel-days-out"],
  startHere: [
    "building-family-routines",
    "managing-childcare-costs",
  ],
  articleGroups: [
    {
      label: "Routines and practical planning",
      slugs: [
        "building-family-routines",
        "managing-childcare-costs",
        "calmer-evenings-after-busy-days",
      ],
    },
  ],
};

const healthSafety: FamilyTopicConfig = {
  slug: "health-safety",
  eyebrow: "Health & safety",
  title: "Health and safety",
  standfirst:
    "Calm guidance for keeping family life safe, steady and supported without turning every worry into an emergency.",
  intro:
    "The point is not to fear-proof your home — it is to know what actually matters, and where a quiet word with your GP is worth it.",
  heroImage: {
    src: healthSafetyImage.url,
    alt: "Parent caring for a child at home",
  },
  whatThisCovers: {
    lead:
      "Practical safety, everyday illness and the steady question of when to ask for help.",
    bullets: [
      "Home safety without turning the house into a fortress",
      "Car safety and correctly fitted seats",
      "Illness in the family and looking after each other",
      "Children's mental health and emotional wellbeing",
      "When to trust your instinct and call your GP",
      "Building a small support network you can lean on",
    ],
  },
  areasInside: [
    { title: "Home safety", body: "The things that actually matter at each age." },
    { title: "Car safety", body: "Seats, fitting and calm car journeys." },
    { title: "Illness in the family", body: "When one person is unwell, everyone feels it." },
    { title: "Mental health in children", body: "Noticing what is normal and what needs a quiet word." },
    { title: "When to ask for help", body: "Trusting your instinct without waiting until crisis." },
  ],
  commonQuestions: [
    {
      q: "How do I know when to ask for help?",
      a: "If a worry keeps returning after a night's sleep, that is usually the signal. GPs and health visitors would much rather see you early than late. 'It is probably nothing' is a fine reason to call — most of parenting is ruling things out.",
    },
    {
      q: "How do I make our home safer without it feeling like a hospital?",
      a: "Focus on the top few risks at each age — stairs, hot drinks, small objects, water, medication, cleaning products, and windows. You do not need to buy every gadget. Boring, well-placed changes usually outperform expensive kit.",
    },
    {
      q: "How do I support my child's mental health?",
      a: "Small steady things. Predictable time together, honest conversations at their level, sleep, movement, food and time outside. Notice patterns — sleep, appetite, mood, friendships. If something feels off for more than a few weeks, mention it to your GP or school.",
    },
    {
      q: "When should I take a child to A&E vs the GP?",
      a: "A&E for breathing difficulty, unresponsiveness, a serious head injury, a fit that does not stop, or a limp/blotchy rash with a fever. GP or 111 for most other things. If unsure, 111 will help you decide — that is what it is for.",
    },
    {
      q: "How can I look after myself when everyone is unwell?",
      a: "Lower every non-essential standard for the week. Simple food, extra screens, early nights. Ask for help sooner than you think you need it, even if it is just someone dropping shopping at the door.",
    },
  ],
  aiHeading: "Ask about health and safety",
  aiDescription:
    "A steady place to think through worries, without turning every question into an emergency.",
  aiPlaceholder: "Ask about safety, illness or mental health...",
  aiPrompts: [
    "How do I know when to ask for help?",
    "How do I make our home safer?",
    "How do I support my child's mental health?",
  ],
  related: ["family-basics", "growing-families", "play-connection"],
  startHere: [
    "making-your-home-safer",
    "when-to-ask-for-help",
  ],
  articleGroups: [
    {
      label: "Feeling safer and knowing when to ask",
      slugs: [
        "making-your-home-safer",
        "when-to-ask-for-help",
        "family-sick-days-at-home",
      ],
    },
  ],
};

const travelDaysOut: FamilyTopicConfig = {
  slug: "travel-days-out",
  eyebrow: "Travel & days out",
  title: "Travel and days out",
  standfirst:
    "Getting out with children can take planning, patience and a little flexibility. This is a calm place to start.",
  intro:
    "From a walk to the park to a long-haul flight, small changes to how you plan can make the difference between an ordeal and a good day.",
  heroImage: {
    src: travelDaysOutImage.url,
    alt: "Family getting ready for a day out",
  },
  whatThisCovers: {
    lead:
      "Practical support for getting out with children, without the pressure to make every day out perfect.",
    bullets: [
      "Travelling with babies, toddlers and school-age children",
      "Holidays with kids — what actually works",
      "Planning realistic days out",
      "Packing without carrying the whole house",
      "Long car journeys and how to keep them calm",
      "What to do when a plan quietly falls apart",
    ],
  },
  areasInside: [
    { title: "Travelling with children", body: "Journeys of every length, made steadier." },
    { title: "Holidays with kids", body: "Honest expectations, better memories." },
    { title: "Days out", body: "Small trips that actually work for your family." },
    { title: "Packing and planning", body: "Just enough, not the whole house." },
    { title: "Car journeys", body: "Rhythm, snacks and quiet ways to pass the miles." },
  ],
  commonQuestions: [
    {
      q: "How do we travel with young children without it being a nightmare?",
      a: "Lower expectations, wider timings, more snacks. Book the schedule around the child's day where you can. Long journeys are almost always easier with one adult 'on shift' at a time rather than both trying to manage everything at once.",
    },
    {
      q: "What should I pack for a family day out?",
      a: "One change of clothes per child, snacks, water, wipes, a small first-aid pouch and one comfort item. Everything else is optional. A small tote inside a bigger bag makes it easy to grab essentials without unpacking the lot.",
    },
    {
      q: "How do I make car journeys calmer?",
      a: "Set off well fed and well rested. Break the journey every two hours if you can. Audiobooks, story podcasts and gentle music travel better than screens for younger children. And keep expectations honest — a few tears in a five-hour journey are normal.",
    },
    {
      q: "Are holidays with young children actually worth it?",
      a: "Often yes, but not always the way people expect. It is rarely a rest — it is a change of scenery with the same job. If you go in with that framing, holidays become much more enjoyable.",
    },
    {
      q: "The plan is falling apart mid-day. What do I do?",
      a: "Stop, feed, hydrate, breathe. Pick the smallest possible next step — not the original plan. Getting home an hour earlier than intended is not a failed day out. It is often the wisest bit of parenting you will do that week.",
    },
  ],
  aiHeading: "Ask about getting out with children",
  aiDescription:
    "A grounded place to plan journeys, days out and holidays that actually fit your family.",
  aiPlaceholder: "Ask about travel, packing, holidays or car journeys...",
  aiPrompts: [
    "How do we travel with young children?",
    "What should I pack for a family day out?",
    "How do I make car journeys calmer?",
  ],
  related: ["family-basics", "play-connection", "growing-families"],
  startHere: [
    "travelling-with-young-children",
    "making-car-journeys-calmer",
  ],
  articleGroups: [
    {
      label: "Journeys and days out",
      slugs: [
        "travelling-with-young-children",
        "making-car-journeys-calmer",
        "planning-family-days-out",
      ],
    },
  ],
};

const playConnection: FamilyTopicConfig = {
  slug: "play-connection",
  eyebrow: "Play & connection",
  title: "Play, fun and connection",
  standfirst:
    "Family connection often grows through ordinary moments, small rituals and the things you do together again and again.",
  intro:
    "You do not need bigger toys or busier weekends. Steady rhythms, small traditions and unhurried time together tend to do more.",
  heroImage: {
    src: playConnectionImage.url,
    alt: "Family playing together at home",
  },
  whatThisCovers: {
    lead:
      "The everyday moments that quietly build closeness, and the traditions worth keeping.",
    bullets: [
      "Family traditions, big and small",
      "Birthdays, celebrations and the pressure to make them perfect",
      "Screen time as a family — honestly",
      "Simple play ideas that actually work",
      "Making memories without staging them",
      "Protecting one-to-one time with each child",
    ],
  },
  areasInside: [
    { title: "Family traditions", body: "Small rituals that shape how family life feels." },
    { title: "Birthdays and celebrations", body: "Honest, unhurried ways to mark the days." },
    { title: "Screen time as a family", body: "A calm approach without moral panic." },
    { title: "Play ideas", body: "Low-effort, high-connection things to try." },
    { title: "Making memories", body: "The ordinary moments children actually remember." },
  ],
  commonQuestions: [
    {
      q: "How do we build family traditions?",
      a: "Start with things you already do. A Friday film, Sunday walk, birthday breakfast, holiday routine. Traditions are just things you do more than twice on purpose. The children will call them 'ours' before you notice.",
    },
    {
      q: "How much screen time is okay as a family?",
      a: "Quality and context matter more than a clock. Watching a film together is different to a child alone on a tablet for hours. Aim for screens that end cleanly, do not replace sleep or outdoor time, and mostly happen in shared spaces.",
    },
    {
      q: "What are simple play ideas for connection?",
      a: "Follow the child's lead for ten minutes with no phone in the room. Read the same book they keep asking for. Cook together, walk together, build something small. Connection lives in low-effort repetition, not big events.",
    },
    {
      q: "How do we make birthdays feel special without exhausting ourselves?",
      a: "Small rituals repeated every year matter more than the party. A birthday breakfast, a chosen tea, a story of the day they were born. Save the bigger events for milestone years so they still feel like a milestone.",
    },
    {
      q: "How do I make sure each child gets one-to-one time?",
      a: "Short, regular and unhurried beats long and rare. Twenty minutes each week, with no other children and no phone, is usually enough for a young child to feel seen. Older children often prefer walks, drives or shared tasks over sit-down chats.",
    },
  ],
  aiHeading: "Ask about play, fun and connection",
  aiDescription:
    "For the small, everyday moments that quietly shape how family life feels.",
  aiPlaceholder: "Ask about traditions, screens, play or one-to-one time...",
  aiPrompts: [
    "How do we build family traditions?",
    "How much screen time is okay as a family?",
    "What are simple play ideas for connection?",
  ],
  related: ["relationships", "growing-families", "travel-days-out"],
  startHere: [
    "building-family-traditions",
    "screen-time-as-a-family",
  ],
  articleGroups: [
    {
      label: "Play, connection and screens",
      slugs: [
        "building-family-traditions",
        "screen-time-as-a-family",
        "simple-family-play-ideas",
      ],
    },
  ],
};

export const familyTopics: Record<FamilyTopicSlug, FamilyTopicConfig> = {
  "growing-families": growingFamilies,
  relationships,
  "family-basics": familyBasics,
  "health-safety": healthSafety,
  "travel-days-out": travelDaysOut,
  "play-connection": playConnection,
};

export const FAMILY_TOPIC_INDEX: Record<
  FamilyTopicSlug,
  { eyebrow: string; title: string }
> = {
  "growing-families": { eyebrow: growingFamilies.eyebrow, title: growingFamilies.title },
  relationships: { eyebrow: relationships.eyebrow, title: relationships.title },
  "family-basics": { eyebrow: familyBasics.eyebrow, title: familyBasics.title },
  "health-safety": { eyebrow: healthSafety.eyebrow, title: healthSafety.title },
  "travel-days-out": { eyebrow: travelDaysOut.eyebrow, title: travelDaysOut.title },
  "play-connection": { eyebrow: playConnection.eyebrow, title: playConnection.title },
};
