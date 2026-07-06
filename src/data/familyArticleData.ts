export type FamilyArticleTopic =
  | "growing-families"
  | "relationships"
  | "family-basics"
  | "health-safety"
  | "travel-days-out"
  | "play-connection";

export interface FamilyArticle {
  slug: string;
  topic: FamilyArticleTopic;
  title: string;
  description: string;
  readTime: string;
  medicallyReviewed?: boolean;
  status: "draft" | "ready";
  seoTitle?: string;
  seoDescription?: string;
  lastUpdated?: string;
  reviewedBy?: string;
  intro?: string;
  sections?: { heading: string; body: string[] }[];
  keyTakeaways?: string[];
  relatedSlugs?: string[];
}

const rawFamilyArticles: FamilyArticle[] = [
  // Growing families
  {
    slug: "preparing-for-another-baby",
    topic: "growing-families",
    title: "Preparing for another baby",
    description:
      "Quiet ways to ready your home, your body and your family for a second (or third) arrival.",
    readTime: "5 min read",
    status: "draft",
  },
  {
    slug: "helping-your-child-adjust-to-a-new-sibling",
    topic: "growing-families",
    title: "Helping your child adjust to a new sibling",
    description:
      "Calm, honest ways to prepare an older child for a new baby, and to support them through the mix of feelings that follow.",
    readTime: "6 min read",
    status: "ready",
    seoTitle: "Helping your child adjust to a new sibling",
    seoDescription:
      "A calm guide to helping an older child prepare for a new baby and settle into life as a sibling, without expecting constant excitement.",
    lastUpdated: "July 2026",
    intro:
      "A new baby is a big change for the whole family, and often the biggest change for your first child. They are being asked to share their people, their space and their rhythm, sometimes before they have the words for any of it. This piece is a gentle guide to preparing them, supporting them and sitting with the mixed feelings that come with becoming a sibling.",
    sections: [
      {
        heading: "Why a new sibling can feel big for a child",
        body: [
          "For a young child, a new baby is not just an addition to the family. It is a shift in almost everything they know. Who holds them, who sleeps where, how mornings run, how much of you is available at any moment.",
          "Even children who seem thrilled about the baby can feel wobbly once life actually changes. Regressions, clinginess, sudden anger or quiet withdrawal are all common. None of it means you have done something wrong, and none of it means they do not love their sibling.",
        ],
      },
      {
        heading: "Talk about the baby in simple, steady ways",
        body: [
          "Young children take in more from your tone than your words. Talking about the baby in a calm, matter-of-fact way tends to land better than big announcements or a lot of build-up.",
          "Keep the information age-appropriate. A toddler might just need to know that a baby is growing in your tummy and will come to live with you. An older child might have questions about hospitals, feeding or where the baby will sleep. Answer what they ask, and leave the rest for another day.",
        ],
      },
      {
        heading: "Keep some familiar routines where possible",
        body: [
          "In the weeks around the birth, familiar routines are a kind of anchor. The same bedtime book, the same walk to nursery, the same person doing bath time when they can.",
          "You do not need to protect every routine perfectly. What helps most is choosing one or two small ones that stay steady even when everything else is in flux.",
        ],
      },
      {
        heading: "Make space for mixed feelings",
        body: [
          "It is normal for an older child to love the baby and also feel jealous, sad, cross or left out. These feelings are not a problem to fix. They are part of adjusting to something big.",
          "You can gently name what you notice without judging it. Something like, \"It's hard when I'm feeding the baby and you want me too,\" is often enough. Feeling understood tends to soften the feeling itself.",
        ],
      },
      {
        heading: "Small ways to involve your child",
        body: [
          "Involvement works best when it is optional and low pressure. Fetching a nappy, choosing the baby's outfit, singing during nappy changes, or being the one who tells visitors the baby's name.",
          "Watch for signs they want a break from being the helper. Some children love the role, others need long stretches where they are simply the child again, not the big brother or big sister.",
        ],
      },
      {
        heading: "After the baby arrives",
        body: [
          "The first few weeks are often a period of adjustment for everyone. Try to protect small pockets of one-to-one time with your older child, even ten minutes on the sofa or a short walk. It does not need to be elaborate.",
          "Expect ups and downs. A child who seemed fine in the first week may struggle in the third, when the newness has worn off and the reality has settled in. Meeting that with warmth rather than worry usually helps most.",
        ],
      },
      {
        heading: "When it may help to ask for support",
        body: [
          "If your older child seems persistently withdrawn, very distressed for weeks, or their behaviour is worrying you, it can help to speak to your health visitor, GP or their nursery or school.",
          "Ask for support for yourself too. Looking after a new baby while holding space for an older child's feelings is genuinely hard, and you do not need to do it alone.",
        ],
      },
    ],
    keyTakeaways: [
      "A new sibling is a big adjustment, and mixed feelings are normal, not a sign of a problem.",
      "Calm, matter-of-fact conversations tend to help more than long build-ups.",
      "Protecting one or two familiar routines gives your older child a steady anchor.",
      "Naming feelings gently often softens them more than trying to fix them.",
      "Involvement should feel optional, not a new job to perform.",
      "Ask for support from your health visitor, GP or nursery if something feels stuck.",
    ],
    relatedSlugs: [
      "preparing-for-another-baby",
      "building-family-routines",
      "building-family-traditions",
    ],
  },

  // Relationships
  {
    slug: "setting-boundaries-with-grandparents",
    topic: "relationships",
    title: "Setting boundaries with grandparents",
    description:
      "Warm, clear ways to hold your parenting choices while keeping close family relationships intact.",
    readTime: "6 min read",
    status: "ready",
    seoTitle: "Setting boundaries with grandparents",
    seoDescription:
      "A calm, respectful guide to setting family boundaries with grandparents in a way that protects your child, your rhythm and the wider relationship.",
    lastUpdated: "July 2026",
    intro:
      "Grandparents are often one of the great gifts of family life. They also arrive with their own memories of parenting, their own instincts and their own ideas about how things should be done. This piece is about holding your own parenting choices with clarity and kindness, so the relationship stays warm and your family rhythm stays steady.",
    sections: [
      {
        heading: "Why grandparent boundaries can feel sensitive",
        body: [
          "Boundaries with grandparents often touch two things at once. The practical question of how you want family life to run, and the emotional history of your own upbringing. That can make even small conversations feel weighted.",
          "It helps to remember that most grandparents want to be involved and are trying their best from where they stand. A boundary is not a judgement of them or how they parented. It is simply information about how your family works now.",
        ],
      },
      {
        heading: "Start with what matters most",
        body: [
          "You do not need a long list of rules. Most families find one or two things that genuinely matter to them, and everything else can flex.",
          "It might be nap times being protected, or sweets before dinner, or a certain way of saying goodbye. Naming what matters to you first, quietly and to yourself, makes it easier to be clear later without turning every visit into a negotiation.",
        ],
      },
      {
        heading: "Be clear without making it a battle",
        body: [
          "Clarity and warmth can sit in the same sentence. \"We're keeping screens off before nursery, so it's easier if the tablet stays away in the morning,\" tends to land better than a long explanation or a reluctant hint.",
          "Short, kind and specific usually goes further than firm or apologetic. You are giving useful information, not asking permission.",
        ],
      },
      {
        heading: "Keep the focus on your child and family rhythm",
        body: [
          "Framing a boundary around your child, rather than around the grandparent, often takes the personal edge out of it. \"She sleeps better if bath time stays at the same time,\" is easier to hear than \"we don't like it when you keep her up.\"",
          "This is not a trick. It is genuinely what most boundaries are about. Your family has a rhythm, and small consistencies help everyone, including visiting grandparents, know where they fit.",
        ],
      },
      {
        heading: "What to do when boundaries are ignored",
        body: [
          "Sometimes a boundary needs to be said more than once. That is normal, not a sign the relationship is broken. Old habits and different generations of parenting can take a little time to shift.",
          "If something keeps happening, try naming it calmly and directly, ideally without an audience. Repeat the boundary, explain briefly why it matters, and leave space for them to adjust. Consistency from you is usually what makes the change stick.",
        ],
      },
      {
        heading: "When distance or extra support may be needed",
        body: [
          "In most families, boundaries settle over time and the relationship carries on. Occasionally, though, a dynamic stays hard even after honest conversations, and it starts to weigh on you or your child.",
          "If that happens, it is fair to take a little more space, shorten visits, or reshape how contact looks for a while. Family relationships can change shape without ending.",
          "If a relationship ever feels unsafe, coercive or harmful to you or your child, please know that support from a trusted professional, such as your GP, health visitor or a family counsellor, is available.",
        ],
      },
      {
        heading: "Practical phrases you can adapt",
        body: [
          "\"We're trying to keep things calm before bed, so we're going to head up now.\"",
          "\"Thanks for offering, we're doing it this way for now and it's really helping.\"",
          "\"He's not eating sweets before dinner at the moment. There's fruit in the bowl if he's hungry.\"",
          "\"I know it's different to how you did it. This is what's working for us right now.\"",
          "Small, warm phrases like these can be repeated as often as needed, without heat and without apology.",
        ],
      },
    ],
    keyTakeaways: [
      "Most grandparents want to be involved, and a boundary is information, not a judgement.",
      "Focus on one or two things that genuinely matter, and let the rest flex.",
      "Short, warm, specific language usually lands better than long explanations.",
      "Framing boundaries around your child and family rhythm takes the personal edge out.",
      "Consistency from you is often what makes a boundary settle over time.",
      "If a relationship ever feels unsafe or coercive, support from a trusted professional is available.",
    ],
    relatedSlugs: [
      "sharing-the-mental-load",
      "building-family-routines",
      "helping-your-child-adjust-to-a-new-sibling",
    ],
  },
  {
    slug: "sharing-the-mental-load",
    topic: "relationships",
    title: "Sharing the mental load in family life",
    description:
      "A balanced look at the invisible planning behind family life and how to share ownership of it more fairly.",
    readTime: "6 min read",
    status: "ready",
    seoTitle: "Sharing the mental load in family life",
    seoDescription:
      "A calm, non-blaming guide to making the invisible planning of family life visible, and sharing ownership of it more fairly.",
    lastUpdated: "July 2026",
    intro:
      "Behind every family week there is a quiet layer of planning that rarely gets seen. Remembering the school forms, tracking who is running low on socks, noticing that a friend's birthday is next Thursday. This piece is about that invisible work, and about sharing it in a way that feels fair without turning family life into a spreadsheet.",
    sections: [
      {
        heading: "What the mental load can look like",
        body: [
          "The mental load is the thinking, planning and remembering that keeps family life moving. It sits underneath the practical tasks and often stays invisible until something is missed.",
          "It can include noticing when the fridge is empty, keeping a mental list of upcoming appointments, tracking which child has grown out of which shoes, or holding in mind the emotional temperature of the house.",
        ],
      },
      {
        heading: "Why it can feel so heavy",
        body: [
          "Practical tasks have a beginning and an end. The mental load does not. It runs quietly in the background, even on days off, and often shows up most at bedtime, when the day is meant to be finished.",
          "It can also be hard to describe. When someone asks what you did today and the honest answer includes twenty small acts of noticing and planning, it can feel easier to say \"not much\" than to try to explain.",
        ],
      },
      {
        heading: "Talk about tasks before resentment builds",
        body: [
          "Conversations about the mental load tend to go better when they happen before anyone is already frustrated. A calm moment at the weekend usually lands better than a hard word at 7pm on a Wednesday.",
          "Try starting with what you are noticing rather than what the other person is not doing. Something like, \"I've been holding a lot of the planning lately and I'd like us to look at it together,\" opens a conversation without putting anyone on the defensive.",
        ],
      },
      {
        heading: "Share ownership, not just help",
        body: [
          "Being asked to help is different from owning a task. If one person always holds the plan and the other steps in when asked, the mental load has not moved, only the doing.",
          "Sharing ownership means the whole task moves, including the noticing, the deciding and the following up. Whoever owns bedtime owns the pyjamas, the bath timing, the story and the moment it all starts to unravel.",
        ],
      },
      {
        heading: "Make invisible tasks visible",
        body: [
          "It is easier to share what everyone can see. Some families find it helpful to sit down together and list what actually runs a normal week, from meal planning to washing to remembering birthdays.",
          "The point is not a perfect list. It is a shared picture. Once the work is visible, it becomes possible to talk about who is best placed to hold each part, and what could be simplified, dropped or done less often.",
        ],
      },
      {
        heading: "What to do if conversations keep going in circles",
        body: [
          "Sometimes these conversations get stuck in the same loop. It can help to slow down and separate two things: the practical question of who does what, and the emotional question of feeling seen and appreciated.",
          "Both matter. Practical changes without acknowledgement can feel hollow, and acknowledgement without practical change tends to wear thin. Naming which one you need in a given moment can move a conversation forward.",
          "If conflict feels stuck, unsafe or overwhelming, speaking to a couples counsellor, family therapist or another trusted professional can help.",
        ],
      },
      {
        heading: "Practical ideas you can try",
        body: [
          "Choose one recurring task and hand over the whole thing, including the noticing. Packed lunches, laundry, the nursery bag, the family calendar.",
          "Set a short weekly check-in, even ten minutes, to look at the week ahead together. It removes the need for one person to hold everything in their head.",
          "Notice appreciation out loud. Naming the invisible work you can see the other person doing tends to be quietly powerful, in both directions.",
        ],
      },
    ],
    keyTakeaways: [
      "The mental load is the invisible planning behind family life, not just the tasks themselves.",
      "Sharing help is not the same as sharing ownership.",
      "Calm conversations before resentment builds tend to go further than difficult ones in the moment.",
      "Making the work visible is often the first real step towards sharing it.",
      "Practical change and feeling appreciated usually need to move together.",
      "If conversations stay stuck, a counsellor or trusted professional can help.",
    ],
    relatedSlugs: [
      "building-family-routines",
      "setting-boundaries-with-grandparents",
      "building-family-traditions",
    ],
  },

  // Family basics
  {
    slug: "building-family-routines",
    topic: "family-basics",
    title: "Building family routines that actually work",
    description:
      "How to build flexible family routines that support real life, without turning your days into a schedule you dread.",
    readTime: "6 min read",
    status: "ready",
    seoTitle: "Building family routines that actually work",
    seoDescription:
      "A calm, realistic guide to family routines that hold in real life, without perfectionism or rigid schedules.",
    lastUpdated: "July 2026",
    intro:
      "Family routines get a lot of attention, and most of it can feel like pressure. The best routines are not the ones that look impressive on paper. They are the ones your family can actually live with on a normal Tuesday, when someone has slept badly and the washing machine is beeping. This piece is about building routines that support your days rather than run them.",
    sections: [
      {
        heading: "Why family routines help",
        body: [
          "Children tend to feel calmer when they have a rough sense of what happens next. Not a rigid timetable, just a familiar shape to the day. Morning, meals, some kind of wind-down, bed.",
          "Routines can also lighten the load for parents. When the shape of the day is known, there are fewer decisions to make in the moment, and fewer negotiations over things that could simply be the way things are done here.",
        ],
      },
      {
        heading: "Start with the moments that already happen every day",
        body: [
          "Rather than inventing a new routine from scratch, look at what already repeats in your day. Waking, breakfast, leaving the house, coming home, dinner, bath, bed. These moments are already anchors.",
          "Choose one or two of them to make slightly more predictable. A short song at the start of bath time, the same order to the bedtime books, a particular seat for breakfast. Small consistencies add up.",
        ],
      },
      {
        heading: "Keep routines small and realistic",
        body: [
          "The routines most likely to hold are the ones that fit inside your real life, not the life you would have on a perfect week.",
          "If mornings are already tight, the routine needs to be short enough to survive a slow start. If evenings often run late, bedtime cannot depend on everything happening by six o'clock. Realistic beats ideal every time.",
        ],
      },
      {
        heading: "Make room for different ages and needs",
        body: [
          "A routine that works for a toddler may not work for a school-age child, and a routine that works for one child may need small tweaks for another.",
          "Rather than one shared routine everyone has to fit into, think about a shared shape with individual pockets. Everyone eats around the same time. One child needs more wind-down before bed, another does not. The overall rhythm holds, the details flex.",
        ],
      },
      {
        heading: "What to do when routines fall apart",
        body: [
          "Every family routine falls apart sometimes. Illness, holidays, a hard week at work, a growth spurt, a new sibling. This is not a failure of the routine. It is what routines have to survive.",
          "The gentlest way back is usually to pick one or two anchor moments and start there. Rebuilding a whole day at once tends to feel overwhelming. Rebuilding bedtime, or the first ten minutes of the morning, is often enough to steady the rest.",
        ],
      },
      {
        heading: "Practical ideas you can try this week",
        body: [
          "Choose one small anchor to make more predictable, and let the rest of the day stay as it is.",
          "Do a short evening reset with your child, five to ten minutes of the same simple things in the same order, so bedtime does not have to carry all the calm.",
          "Notice the routines you already have without realising. Many families are running on more rhythm than they think, and can build gently from what is already there.",
        ],
      },
      {
        heading: "When it may help to ask for support",
        body: [
          "If daily routines feel consistently overwhelming, or if your child's sleep, eating or behaviour is worrying you, it can help to speak to your health visitor, GP or nursery.",
          "Asking for support is not a sign the routine has failed. It is often part of finding one that fits your family as it actually is.",
        ],
      },
    ],
    keyTakeaways: [
      "Routines work best when they support your real life, not an idealised version of it.",
      "Small anchors matter more than a full schedule.",
      "The same rough shape can flex for different ages and needs.",
      "Routines fall apart sometimes, and rebuilding from one moment is usually enough.",
      "Ask for support if daily life feels consistently overwhelming.",
    ],
    relatedSlugs: [
      "building-family-traditions",
      "sharing-the-mental-load",
      "helping-your-child-adjust-to-a-new-sibling",
    ],
  },
  {
    slug: "managing-childcare-costs",
    topic: "family-basics",
    title: "Managing childcare costs",
    description:
      "A practical look at nursery, childminders, family help and the funded hours in the UK.",
    readTime: "6 min read",
    status: "draft",
  },

  // Health and safety
  {
    slug: "making-your-home-safer",
    topic: "health-safety",
    title: "Making your home safer",
    description:
      "Room-by-room ideas for reducing everyday risks as your child grows more curious and mobile.",
    readTime: "5 min read",
    medicallyReviewed: true,
    status: "draft",
  },
  {
    slug: "when-to-ask-for-help",
    topic: "health-safety",
    title: "When to ask for help",
    description:
      "Signs it's time to speak to your GP, health visitor or 111, and how to trust your instinct.",
    readTime: "4 min read",
    medicallyReviewed: true,
    status: "draft",
  },

  // Travel and days out
  {
    slug: "travelling-with-young-children",
    topic: "travel-days-out",
    title: "Travelling with young children",
    description:
      "Practical, warm ways to make journeys with young children calmer, without pretending travel is always easy.",
    readTime: "6 min read",
    status: "ready",
    seoTitle: "Travelling with young children",
    seoDescription:
      "A realistic guide to travelling with young children, covering planning, packing, expectations and what to do when a journey goes off plan.",
    lastUpdated: "July 2026",
    intro:
      "Travelling with young children is rarely as relaxed as the photos suggest. Even short trips can involve more logistics than the destination itself. This piece is about making journeys feel a little steadier, without needing everything to run perfectly, and without pretending that travel with small children is ever quite the same as travel without them.",
    sections: [
      {
        heading: "Why travelling with children can feel like a lot",
        body: [
          "Travel takes children away from the routines that usually hold their day. New places, new food, new sounds, and often less sleep than usual. It is a lot to take in, even when the trip is a happy one.",
          "For parents, the load is different but real. You are carrying the plan, the bags, the snacks, the emotional weather and often a small human at the same time. Naming that this is genuinely hard, not something you should be finding easy, tends to help before anything practical does.",
        ],
      },
      {
        heading: "Plan around the hardest moments",
        body: [
          "Rather than planning around the ideal version of the trip, it can help to plan around the moments you already know will be hard. Nap times, hunger, the last hour of a long journey, arriving somewhere new.",
          "If you can, timing departures around sleep, keeping food easy to reach, and building in a soft landing at the other end can take a lot of pressure off the middle of the journey.",
        ],
      },
      {
        heading: "Pack for needs, not every possible scenario",
        body: [
          "It is tempting to pack for every possible thing that could happen. In practice, an overstuffed bag is often harder to move through a station or an airport than it is helpful when you arrive.",
          "A useful test is to think about the next few hours, not the whole trip. Nappies, snacks, water, a change of clothes, one comfort item, one quiet activity. Most other things can be sorted at the destination.",
        ],
      },
      {
        heading: "Keep expectations flexible",
        body: [
          "Young children rarely travel in a straight line. A journey that looked simple on paper can shift shape once you are actually in it.",
          "Holding the plan lightly tends to help. If a train is late, if a nap happens in the wrong place, if a meltdown lands in the middle of an airport lounge, the trip is not ruined. It is just travelling with young children.",
        ],
      },
      {
        heading: "Build in pauses where you can",
        body: [
          "Short pauses often do more than one long break. A few minutes off the train, a walk around the terminal, a stop at a service station where everyone can move and eat properly.",
          "Where possible, aim for a slower start and a slower end. Arriving with time to spare at one end, and time to settle at the other, softens the parts of the day that usually feel hardest.",
        ],
      },
      {
        heading: "What to do when the journey goes off plan",
        body: [
          "At some point, a journey will go off plan. A delay, an illness, a lost comforter, a tantrum with a big audience. In the moment, the most useful thing is often to lower the bar of what counts as a success.",
          "Getting everyone somewhere safe, warm and fed is enough. The rest of the day does not need to be salvaged. Children usually settle faster than the adults expect, especially once they feel that you are steady.",
        ],
      },
      {
        heading: "Practical ideas before you leave",
        body: [
          "Do the boring admin the day before, not on the morning of travel. Passports, tickets, chargers, car seat, buggy.",
          "Prepare a small \"first-hour\" bag with snacks, water, wipes and one quiet activity, so you are not digging through a suitcase in the first ten minutes.",
          "Talk your child through what will happen in simple terms. Not a full itinerary, just the shape. We will get in the car, then a train, then Grandma's house.",
          "Give yourself permission for the trip to be imperfect. That is often when the good bits show up.",
        ],
      },
    ],
    keyTakeaways: [
      "Travel disrupts routines, and it is normal for both children and parents to feel it.",
      "Planning around the hardest moments takes more pressure off than planning for the ideal ones.",
      "Packing for the next few hours usually beats packing for every possibility.",
      "Holding the plan lightly makes off-plan moments feel less like failure.",
      "Small pauses often carry a journey more than one long break.",
      "Getting everyone somewhere safe, warm and fed is a good enough day.",
    ],
    relatedSlugs: [
      "making-car-journeys-calmer",
      "building-family-routines",
      "screen-time-as-a-family",
    ],
  },
  {
    slug: "making-car-journeys-calmer",
    topic: "travel-days-out",
    title: "Making car journeys calmer",
    description:
      "Small comforts, timings and distractions that make everyday car journeys feel less fraught.",
    readTime: "5 min read",
    status: "ready",
    seoTitle: "Making car journeys calmer",
    seoDescription:
      "A grounded guide to calmer car journeys with young children, covering preparation, comfort, snacks, breaks and realistic expectations.",
    lastUpdated: "July 2026",
    intro:
      "Car journeys with young children can be some of the more testing parts of family life, even when the trip itself is short. Confined space, no way to reach each other easily, and a small person whose mood can shift quickly. This piece is about small, practical ways to make everyday car journeys feel a little calmer, without needing to overhaul how you travel.",
    sections: [
      {
        heading: "Why car journeys can be hard for children",
        body: [
          "Cars ask a lot of young children. They cannot move much, they cannot see as much as we can, and they often cannot easily reach the people they most want to be near.",
          "Add tiredness, hunger, or a change in routine and even a short journey can feel long. It is not a sign that anything is wrong with your child or your parenting. It is simply a hard environment for a small nervous system.",
        ],
      },
      {
        heading: "Prepare the car before everyone is tired",
        body: [
          "The calmest journeys usually start before anyone gets in the car. A quick check that snacks are within reach, water is topped up, a favourite soft toy is where it should be, and any music or story is ready to go.",
          "Two minutes of preparation while everyone is still in the house tends to save ten minutes of stress once you are already on the road.",
        ],
      },
      {
        heading: "Think in stages, not one long journey",
        body: [
          "For young children, the idea of a two-hour drive is meaningless. It helps to break the journey into smaller shapes, even in your own head.",
          "First the drive to the motorway, then the stretch to the service station, then the last bit to where we are going. Naming small milestones out loud can turn a long journey into a series of shorter, more manageable ones.",
        ],
      },
      {
        heading: "Snacks, comfort and simple activities",
        body: [
          "Snacks that are easy to hold, not too messy and not too sugary tend to travel best. Bits of fruit, crackers, oatcakes, small sandwiches.",
          "A familiar comfort item, a small blanket, or a favourite soft toy can quietly settle a child more than any activity. Alongside that, one simple thing to look at or listen to, a story, a playlist, a window book, is usually enough. You do not need to entertain the whole journey.",
        ],
      },
      {
        heading: "When your child gets upset in the car",
        body: [
          "Sometimes a journey turns and your child becomes properly upset. It is one of the harder moments of family life, because you cannot easily reach them and you may not be able to stop straight away.",
          "A calm, steady voice helps more than trying to fix it in the moment. Naming what you can, \"I know, this bit feels long, we're going to stop soon,\" often lands even when they cannot answer.",
          "Where it is safe and possible, pulling in for a few minutes to reset can shift the whole rest of the journey. It is not a failure of the trip. It is a small, kind pause.",
        ],
      },
      {
        heading: "Helping yourself stay calm too",
        body: [
          "Driving while a child is unsettled is genuinely hard. Your own nervous system is doing a lot of work at the same time as theirs.",
          "Where you can, keep your own basics steady. Water, a snack you like, a playlist that does not add to the noise. Small kindnesses to yourself in the driver's seat quietly carry the whole family.",
        ],
      },
      {
        heading: "Practical ideas for the next journey",
        body: [
          "Pack a small \"car bag\" that lives near the door, with snacks, wipes, a spare top and one quiet activity, so it is one less thing to remember.",
          "Time journeys around naps or after meals where possible, rather than into hunger or overtired stretches.",
          "Talk your child through the shape of the trip in simple terms before you set off.",
          "Let the journey be quieter than you might think it needs to be. Music low, conversation gentle, plenty of window time.",
        ],
      },
    ],
    keyTakeaways: [
      "Cars are a hard environment for young children, and hard journeys are not a sign of a problem.",
      "A little preparation before anyone gets in the car saves a lot of stress on the road.",
      "Breaking a long drive into smaller stages helps children and adults alike.",
      "One comfort item and one simple activity usually beats a bag full of options.",
      "A calm voice and a safe short pause can reset an unsettled journey.",
      "Looking after yourself in the driver's seat quietly steadies everyone else.",
    ],
    relatedSlugs: [
      "travelling-with-young-children",
      "building-family-routines",
      "screen-time-as-a-family",
    ],
  },

  // Play and connection
  {
    slug: "building-family-traditions",
    topic: "play-connection",
    title: "Building family traditions without adding pressure",
    description:
      "Simple, low-pressure ways to build family rituals that help children feel connected, without turning family life into a performance.",
    readTime: "5 min read",
    status: "ready",
    seoTitle: "Building family traditions without adding pressure",
    seoDescription:
      "A warm guide to creating simple, flexible family traditions that help children feel connected, without perfectionism.",
    lastUpdated: "July 2026",
    intro:
      "Family traditions do not have to be elaborate to matter. Often the ones children remember most are small, quiet and slightly ordinary. A particular breakfast on a Sunday, the way you always walk home from a certain place, the song at the end of the day. This piece is about building rituals that feel like your family, without adding another thing you feel you have to do well.",
    sections: [
      {
        heading: "What family traditions can give children",
        body: [
          "Traditions give children a felt sense of belonging. This is something we do. These are our people. This is how our year has a shape.",
          "They also give the calendar texture. A predictable ritual to look forward to can be a quiet source of steadiness, especially in seasons when other things feel uncertain.",
        ],
      },
      {
        heading: "Traditions do not need to be big",
        body: [
          "A tradition is really just something you do more than once, on purpose, together. It does not need a theme, a hashtag or a Pinterest board.",
          "Pancakes on Saturdays, a walk after Sunday lunch, a candle at dinner on Friday nights. Small rituals that repeat tend to hold more weight than one-off grand gestures.",
        ],
      },
      {
        heading: "Start with what your family already enjoys",
        body: [
          "The most durable traditions usually grow out of things you already like doing. If your family loves being outside, a seasonal walk is more likely to stick than a craft afternoon nobody actually wants.",
          "Notice what already brings you together without effort, and let those things become slightly more intentional. Naming something as \"our thing\" is often enough to turn it into a tradition.",
        ],
      },
      {
        heading: "Make traditions flexible as children grow",
        body: [
          "The rituals that suit a toddler will not always suit a nine-year-old. That is not a failure, it is the tradition evolving.",
          "Try to hold the shape lightly. If a Sunday film afternoon slowly becomes a Sunday walk and hot chocolate, the thread is still there. What matters is the togetherness, not the exact activity.",
        ],
      },
      {
        heading: "Simple ideas for weekly, seasonal and everyday rituals",
        body: [
          "Weekly: a shared breakfast, a Friday night dinner at home, a Sunday phone call to a grandparent, a family walk after lunch.",
          "Seasonal: the first walk after the clocks change, a picnic on the same day each summer, one shared task at the start of a school holiday.",
          "Everyday: the same goodbye at the door, a song at bath time, a question at dinner, a bedtime phrase that never changes.",
        ],
      },
      {
        heading: "When traditions feel hard or emotional",
        body: [
          "Some traditions carry weight. Birthdays after a loss, holidays that used to look different, first years without someone you love. It is normal for these rituals to feel tender.",
          "You are allowed to keep them, change them or step away from them for a year. Traditions serve the family, not the other way around.",
        ],
      },
      {
        heading: "Practical ideas you can try",
        body: [
          "Choose one small ritual to name out loud this month, even something as simple as \"we always read this book on Sunday nights\".",
          "Let your child suggest a tradition. It might be something surprising, and being invited to shape family life is meaningful in itself.",
          "Keep a light hold on what a tradition should look like. If it changes shape over the years, that is usually a sign it is alive, not that it is broken.",
        ],
      },
    ],
    keyTakeaways: [
      "Small, repeating rituals often matter more to children than big set-piece traditions.",
      "The best traditions usually grow out of things your family already enjoys.",
      "Traditions should evolve as children grow, not stay frozen.",
      "It is fine, and sometimes needed, to change or pause a tradition in a hard year.",
      "Naming something as \"our thing\" is often the whole tradition.",
    ],
    relatedSlugs: [
      "building-family-routines",
      "screen-time-as-a-family",
      "helping-your-child-adjust-to-a-new-sibling",
    ],
  },
  {
    slug: "screen-time-as-a-family",
    topic: "play-connection",
    title: "Screen time as a family",
    description:
      "A calm, non-judgemental way to think about screens, boundaries and shared time together.",
    readTime: "5 min read",
    status: "ready",
    seoTitle: "Screen time as a family",
    seoDescription:
      "A balanced, non-judgemental guide to family screen time, focused on connection, shared rhythm and simple boundaries rather than fear.",
    lastUpdated: "July 2026",
    intro:
      "Screens are woven through most family lives now, and conversations about them often carry more guilt than they need to. This piece is about looking at screen time honestly, keeping some of it shared, and creating simple boundaries your family can actually stick to, without turning screens into the villain of your week.",
    sections: [
      {
        heading: "Why screen time can feel so loaded",
        body: [
          "Few parenting topics carry as much quiet worry as screens. There is a constant hum of advice, warnings and comparison, and it can be hard to tell what is helpful and what is just noise.",
          "Most families are doing a version of the same thing, using screens in the moments where they help, and quietly wishing there was slightly less of it. Naming that honestly, without judgement, is a good place to start.",
        ],
      },
      {
        heading: "Start with how screens are actually used",
        body: [
          "Before changing anything, it can help to notice how screens already fit into your week. Not in a way that makes you feel bad, just clearly. Which moments genuinely help? Which ones creep in out of habit?",
          "That kind of gentle noticing is usually more useful than any hard rule. Once you can see the pattern, small changes become easier to choose.",
        ],
      },
      {
        heading: "Shared screen time can still be connection",
        body: [
          "Not all screen time is the same. Watching something together on a sofa, laughing at the same thing, or looking at family photos on a phone is a very different experience to a child scrolling alone.",
          "Shared screens can be part of connection, not the opposite of it. Talking about what you are watching, pausing to ask a question, or choosing something together turns passive time into something more relational.",
        ],
      },
      {
        heading: "Create simple boundaries that your family can repeat",
        body: [
          "Boundaries around screens tend to hold better when they are simple and repeatable rather than clever or complicated. \"No screens at the table,\" or \"nothing on before nursery,\" or \"one show after tea,\" are the kinds of rules a family can actually live with.",
          "The point is not to be strict for the sake of it. It is to remove the daily negotiation, so screens are one less thing to argue about.",
        ],
      },
      {
        heading: "Make space for screen-free moments without making screens the enemy",
        body: [
          "It helps most children if some parts of the day are quietly screen-free. Meals, the first part of the morning, the last part of the evening, or a particular weekend walk.",
          "Framing these as calm family moments rather than a punishment tends to land better. \"This is our slow bit of the day,\" carries more warmth than \"put that down now.\"",
        ],
      },
      {
        heading: "What to do when screen time becomes a battle",
        body: [
          "Sometimes screens tip into being a flashpoint. Every ending is a fight, every request feels loaded, and the mood in the house shifts every time a device appears.",
          "When that happens, it is worth stepping back from the specific arguments and looking at the pattern. Is the timing wrong, is your child tired or hungry, is there simply too much on offer? Small changes to the shape of the day often ease the battles more than tighter rules do.",
        ],
      },
      {
        heading: "Practical ideas you can try this week",
        body: [
          "Pick one screen-free anchor in the day, meals, the walk to nursery, or the first ten minutes of the morning, and keep it consistent.",
          "Choose one shared screen moment on purpose, a show or short film together, so screens are not only a solo activity.",
          "Warn your child before a screen ends, so the ending is less of a shock. A two-minute heads-up usually helps more than a sudden switch off.",
          "Notice your own screen use in front of them, gently and without guilt. Small shifts in the adults often quietly change the whole family's rhythm.",
        ],
      },
    ],
    keyTakeaways: [
      "Most families feel the same quiet worry about screens, and that alone is not a sign of a problem.",
      "Noticing how screens already fit into your week is more useful than any hard rule.",
      "Shared screen time can be genuine connection, not the opposite of it.",
      "Simple, repeatable boundaries hold better than complicated ones.",
      "A calm framing works better than treating screens as the enemy.",
      "Small shifts in your own screen use often carry the family further than rules alone.",
    ],
    relatedSlugs: [
      "building-family-traditions",
      "building-family-routines",
      "sharing-the-mental-load",
    ],
  },
];

export function getFamilyArticlesByTopic(topic: FamilyArticleTopic) {
  return familyArticles.filter((article) => article.topic === topic);
}

// ─── Placeholder body injection ─────────────────────────────────────────
function withFamilyDefaults(article: FamilyArticle, all: FamilyArticle[]): FamilyArticle {
  const sibling = all.find(
    (a) => a.topic === article.topic && a.slug !== article.slug
  );
  return {
    ...article,
    intro:
      article.intro ??
      `This piece on ${article.title.toLowerCase()} is being prepared. The outline below is a placeholder while the full guidance is written and reviewed.`,
    sections: article.sections ?? [
      {
        heading: "What this will cover",
        body: [
          `A calm, practical look at ${article.title.toLowerCase()}, written for real family life rather than perfect conditions.`,
          "This section is a placeholder while the full article is being written.",
        ],
      },
      {
        heading: "What often helps",
        body: [
          "Small, everyday ideas you can try without turning family life into a project.",
        ],
      },
      {
        heading: "When to seek support",
        body: [
          "Signs it may be worth speaking to your GP, health visitor or another trusted source.",
        ],
      },
    ],
    keyTakeaways: article.keyTakeaways ?? [
      "You don't need to have this figured out perfectly.",
      "Small, quiet changes tend to hold better than big overhauls.",
      "Ask for support early rather than waiting until things feel heavy.",
    ],
    relatedSlugs:
      article.relatedSlugs ?? (sibling ? [sibling.slug] : undefined),
    lastUpdated:
      article.lastUpdated ?? (article.medicallyReviewed ? "2026-07" : undefined),
    reviewedBy:
      article.reviewedBy ??
      (article.medicallyReviewed ? "Jenny Joines" : undefined),
  };
}

export const familyArticles: FamilyArticle[] = rawFamilyArticles.map((a) =>
  withFamilyDefaults(a, rawFamilyArticles)
);
