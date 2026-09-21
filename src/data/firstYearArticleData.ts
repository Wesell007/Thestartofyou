export type FirstYearArticleTopic =
  | "feeding"
  | "sleep"
  | "development"
  | "care-and-safety"
  | "postpartum-recovery"
  | "emotional-wellbeing"
  | "body-and-hormones"
  | "checkups-and-warning-signs";

export interface FirstYearArticle {
  slug: string;
  topic: FirstYearArticleTopic;
  /** Explicitly opts this First Year article into the intentional text-led hero treatment. */
  suppressHeroImage?: true;
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
  /** Links out to published surfaces in other parts of the site. */
  crossLinks?: { label: string; href: string; context?: string }[];
  sources?: {
    label: string;
    publisher: string;
    url: string;
    year?: string;
  }[];
}

const rawFirstYearArticles: FirstYearArticle[] = [
  // Feeding
  {
    slug: "newborn-feeding-rhythms",
    suppressHeroImage: true,
    topic: "feeding",
    title: "Newborn feeding rhythms",
    description:
      "What feeding often looks like in the early weeks, from cluster feeds to quiet stretches, and how to read your baby's cues.",
    readTime: "6 min read",
    status: "ready",
    medicallyReviewed: true,
    reviewedBy: "Jenny Joines",
    lastUpdated: "July 2026",
    seoTitle: "Newborn feeding rhythms | The Start of You",
    seoDescription:
      "A calm guide to newborn feeding patterns, frequent feeds, night feeds and responsive feeding in the early months.",
    intro:
      "Newborn feeding rarely follows a tidy pattern. It moves in bursts and quiet stretches, changes from day to day, and often looks different from the guides you may have read in pregnancy. That does not mean anything is going wrong. It means your baby is very new, and the two of you are learning together. This piece is a calm map of what feeding tends to look like in the early weeks, whether you are breastfeeding, bottle feeding or doing a bit of both.",
    sections: [
      {
        heading: "Why newborn feeding can feel irregular",
        body: [
          "In the first weeks, babies have small tummies, quickly changing needs and a body clock that is still finding its rhythm. Feeds can be close together at some points in the day, and further apart at others. That is completely typical.",
          "Try to hold the picture loosely. Rather than expecting a schedule, it can help to think of feeding as a slow conversation you are building with your baby.",
        ],
      },
      {
        heading: "Feeding often can be normal in the early weeks",
        body: [
          "Frequent feeding, sometimes called cluster feeding, is common in the newborn period. Some evenings a baby may want to feed again and again over a short stretch of hours. It can feel intense, but it is usually a normal part of early feeding, not a sign that anything is wrong with your milk or your baby.",
          "Whether you are breastfeeding or bottle feeding, feeding little and often in the early weeks tends to work with, rather than against, how newborns are built.",
        ],
      },
      {
        heading: "Watching your baby, not just the clock",
        body: [
          "Early feeding cues include stirring, turning the head, opening the mouth, bringing hands to the face and rooting. Crying is a later cue, so responding earlier often makes feeds calmer for both of you.",
          "Wet and dirty nappies, alert moments and steady growth over time are usually more reassuring than the exact number of minutes on the clock between feeds.",
        ],
      },
      {
        heading: "Breastfeeding, bottle feeding and mixed feeding can all have rhythms",
        body: [
          "Rhythms exist across all feeding routes. Breastfed babies often feed frequently as they help stimulate milk supply. Bottle-fed babies can also be fed responsively, with slow-paced feeds and pauses that let them lead.",
          "Mixed feeding is common too, and can look many different ways. Whatever the mix, gentle, responsive feeding tends to feel more sustainable than trying to force a strict pattern.",
        ],
      },
      {
        heading: "Night feeds and tiredness",
        body: [
          "Night feeds are a normal part of newborn life. Babies wake often to feed for good reasons, and it usually takes weeks or months before longer stretches emerge.",
          "It can help to lower your expectations of the nights, keep the room calm and dim, and share what you can with a partner or trusted person during the day. Rest is not always available in one block, but small pockets of it still count.",
        ],
      },
      {
        heading: "When to ask for advice",
        body: [
          "If feeding feels painful, your baby seems unwell, nappies change suddenly, weight gain is worrying, or you are unsure what to do next, ask your midwife, health visitor, GP or the appropriate local service for advice.",
          "Feeding support is there for anyone who wants it, including parents who are bottle feeding. Asking early often makes things easier, and there is no need to wait until something feels serious.",
        ],
      },
      {
        heading: "Practical ideas you can try",
        body: [
          "Keep a simple, low-pressure kit within reach for feeds: water, a snack, something to lean against, and something to do or watch during longer sessions. Small comforts matter when feeds are frequent.",
          "Try to notice, without judgement, what tends to help your baby settle to feed and what tends to unsettle them. Over time, gentle patterns tend to appear on their own, without needing to enforce a schedule.",
        ],
      },
    ],
    keyTakeaways: [
      "Irregular feeding is typical in the newborn period.",
      "Cluster feeding is common and usually not a sign that anything is wrong.",
      "Watching cues tends to work better than watching the clock.",
      "Breastfeeding, bottle feeding and mixed feeding can all be responsive.",
      "Night feeds are normal for a good while, and rest often comes in small pockets.",
      "Ask for support early if anything about feeding worries you.",
    ],
    relatedSlugs: [
      "bottle-and-breastfeeding-questions",
      "newborn-sleep-expectations",
      "baby-care-basics",
    ],
    sources: [
      {
        label: "Breastfeeding: the first few days",
        publisher: "NHS",
        url: "https://www.nhs.uk/baby/breastfeeding-and-bottle-feeding/breastfeeding/the-first-few-days/",
      },
      {
        label: "Bottle feeding advice",
        publisher: "NHS",
        url: "https://www.nhs.uk/baby/breastfeeding-and-bottle-feeding/bottle-feeding/advice/",
      },
      {
        label: "How to combine breast and bottle feeding",
        publisher: "NHS",
        url: "https://www.nhs.uk/baby/breastfeeding-and-bottle-feeding/bottle-feeding/combine-breast-and-bottle/",
      },
      {
        label: "Responsive Feeding Infosheet",
        publisher: "UNICEF UK Baby Friendly Initiative",
        url: "https://www.unicef.org.uk/babyfriendly/baby-friendly-resources/relationship-building-resources/responsive-feeding-infosheet/",
      },
    ],
  },
  {
    slug: "bottle-and-breastfeeding-questions",
    topic: "feeding",
    suppressHeroImage: true,
    title: "Bottle and breastfeeding questions",
    description:
      "Gentle answers to the everyday questions that come up whether you're breastfeeding, bottle-feeding or doing both.",
    readTime: "7 min read",
    status: "ready",
    medicallyReviewed: true,
    reviewedBy: "Jenny Joines",
    lastUpdated: "July 2026",
    seoTitle: "Bottle and breastfeeding questions | The Start of You",
    seoDescription:
      "Balanced guidance for breastfeeding, bottle feeding, expressing, mixed feeding and changing feeding plans.",
    intro:
      "Feeding questions come up constantly in the first year, and they rarely have one clean answer. What works for one family may not work for another, and what works one week may quietly shift the next. This piece takes some of the most common questions across breastfeeding, bottle feeding, expressing and mixed feeding and offers calm, balanced information, without pushing any single route.",
    sections: [
      {
        heading: "Why feeding questions can feel emotional",
        body: [
          "Feeding is tied up with sleep, closeness, worry about growth, and messages you may have absorbed long before your baby arrived. It is not unusual for a small practical question to feel much bigger than it looks.",
          "How you feed your baby is a personal decision shaped by your circumstances, health and family. There is no single right route, and changing your mind at any point is allowed.",
        ],
      },
      {
        heading: "Breastfeeding questions",
        body: [
          "Common early questions include how often to feed, how to tell whether a feed is going well, and what to do about tenderness. In the first weeks, frequent feeding is usually helpful for supply, and steady wet and dirty nappies are generally reassuring signs.",
          "If breastfeeding feels painful, or you are unsure whether feeds are working, feeding support is available through your midwife, health visitor and local infant feeding services. Asking early tends to make things easier.",
        ],
      },
      {
        heading: "Bottle feeding questions",
        body: [
          "Whether you are feeding expressed milk or infant formula, bottle feeding can still be done responsively, following your baby's cues rather than pushing to finish every bottle. Paced feeding, upright positioning and pauses can all help your baby feed calmly.",
          "For formula feeding, following NHS guidance on preparing and storing feeds safely matters. It is worth reading the guidance directly rather than relying on memory, especially in the tired early weeks.",
        ],
      },
      {
        heading: "Expressing and mixed feeding",
        body: [
          "Expressing milk, by hand or with a pump, can be useful for many reasons, including sharing feeds, easing full breasts or feeding a baby who cannot latch. It is a skill that often takes a little practice before it feels comfortable.",
          "Mixed feeding, which combines breastfeeding with bottles of expressed milk or formula, is common and can be arranged in many different ways. Introducing bottles gradually and continuing to follow your baby's cues tends to make the transition smoother.",
        ],
      },
      {
        heading: "Changing your feeding plan",
        body: [
          "Feeding plans often shift over the first year. You might move from exclusive breastfeeding to mixed feeding, from bottles of expressed milk to formula, or back again. None of this reflects on you as a parent.",
          "If you are thinking about a change, it can help to make the shift slowly where possible and to ask for support from your midwife, health visitor or infant feeding team, particularly if you have questions about supply, comfort or how your baby is settling.",
        ],
      },
      {
        heading: "When to ask for advice",
        body: [
          "If feeding feels painful, your baby seems unwell, nappies change suddenly, weight gain is worrying, or you are unsure what to do next, ask your midwife, health visitor, GP or the appropriate local service for advice.",
          "There is no need to work things out alone. Reaching out early is often the difference between a small wobble and a longer struggle, whichever way you are feeding.",
        ],
      },
      {
        heading: "Practical ideas you can try",
        body: [
          "Keep the messages you have absorbed in perspective. Try to focus on your baby in front of you and what feels workable in your family, rather than what an ideal feeding day should look like.",
          "Save trusted sources somewhere easy to find on your phone, so that when a question comes up at three in the morning, you are reading calm, evidence-based guidance rather than scrolling through opinions.",
        ],
      },
    ],
    keyTakeaways: [
      "Feeding questions often feel bigger than they look, and that is understandable.",
      "Responsive feeding applies to bottle feeding as well as breastfeeding.",
      "Formula feeding is safest when guidance on preparation and storage is followed directly.",
      "Expressing and mixed feeding are common and can be arranged in many ways.",
      "Changing your feeding plan is allowed at any point.",
      "Support is available and asking early is usually easier than waiting.",
    ],
    relatedSlugs: [
      "newborn-feeding-rhythms",
      "baby-care-basics",
      "helping-your-baby-settle",
    ],
    sources: [
      {
        label: "Breastfeeding: the first few days",
        publisher: "NHS",
        url: "https://www.nhs.uk/baby/breastfeeding-and-bottle-feeding/breastfeeding/the-first-few-days/",
      },
      {
        label: "Bottle feeding advice",
        publisher: "NHS",
        url: "https://www.nhs.uk/baby/breastfeeding-and-bottle-feeding/bottle-feeding/advice/",
      },
      {
        label: "How to make up baby formula",
        publisher: "NHS",
        url: "https://www.nhs.uk/baby/breastfeeding-and-bottle-feeding/bottle-feeding/making-up-baby-formula/",
      },
      {
        label: "Expressing and storing breast milk",
        publisher: "NHS",
        url: "https://www.nhs.uk/baby/breastfeeding-and-bottle-feeding/breastfeeding/expressing-breast-milk/",
      },
      {
        label: "Infant formula and responsive bottle feeding",
        publisher: "UNICEF UK Baby Friendly Initiative",
        url: "https://www.unicef.org.uk/babyfriendly/baby-friendly-resources/bottle-feeding-resources/infant-formula-responsive-bottle-feeding-guide-for-parents/",
      },
    ],
  },


  // Sleep
  {
    slug: "newborn-sleep-expectations",
    topic: "sleep",
    title: "Newborn sleep expectations",
    description:
      "What newborn sleep is actually like, why it feels so unpredictable, and what quietly shifts across the first months.",
    readTime: "6 min read",
    status: "ready",
    medicallyReviewed: true,
    reviewedBy: "Jenny Joines",
    lastUpdated: "July 2026",
    seoTitle: "Newborn sleep expectations | The Start of You",
    seoDescription:
      "A calm guide to newborn sleep, frequent waking, safer sleep and realistic rest in the first months.",
    intro:
      "Newborn sleep rarely looks like the tidy graphics online. It often comes in short bursts, at unexpected hours, with more waking than any of us are quite prepared for. That is not a sign that anything is wrong. It is how tiny babies are built. This piece is a calm map of what tends to happen in the first weeks and months, so you can meet it with a little less worry and a lot more self kindness.",
    sections: [
      {
        heading: "Why newborn sleep can feel unpredictable",
        body: [
          "Newborns spend a lot of time asleep, but they do it in short stretches spread across the day and night. Their tummies are small, they wake often to feed, and their body clocks are still finding their rhythm. All of that is completely typical in the first weeks.",
          "It can feel confusing when one day looks nothing like the next. Try to hold the picture loosely. In these early months, unpredictability is the pattern, not a problem you need to fix.",
        ],
      },
      {
        heading: "Frequent waking is normal in the early months",
        body: [
          "Waking often overnight is expected for young babies. Feeding, comfort and closeness all play a part, and night waking gradually eases as your baby grows. There is no single age when this changes for every baby.",
          "If you can, let go of comparisons. A friend's baby who sleeps for longer stretches is not a sign that yours is doing something wrong. Babies vary hugely, and so do families.",
        ],
      },
      {
        heading: "Day and night may take time to settle",
        body: [
          "In the first weeks, many babies do not yet know the difference between day and night. Bright, gentle light and normal daytime sounds in the daytime, and calmer, dimmer, quieter evenings, can slowly help the pattern shift.",
          "This is not a routine you are enforcing. It is more like a background rhythm your baby can lean into over time.",
        ],
      },
      {
        heading: "Rest does not always come in long stretches",
        body: [
          "Broken sleep is one of the hardest parts of early parenthood. It helps to think of rest, not sleep, as the goal. Lying down when your baby naps, letting someone else hold them for an hour, or taking a slower morning all count.",
          "Sleep debt in the early weeks is real. Small pockets of rest, added up over a day, genuinely help.",
        ],
      },
      {
        heading: "Safer sleep still matters every time",
        body: [
          "For sleep, follow current safer sleep guidance from trusted sources such as the NHS and The Lullaby Trust. Their advice is written to be simple, clear and easy to return to, whether it is a night feed or a lunchtime nap.",
          "Because early days are so tiring, it helps to set up your baby's sleep space in advance, so the safer choice is also the easy choice at three in the morning.",
        ],
      },
      {
        heading: "Looking after yourself when sleep is broken",
        body: [
          "You cannot fully catch up on lost sleep, but you can soften the edges. Ask for support with feeds, chores or the older-child school run where possible. Accept help that is offered, even if the house is a bit chaotic.",
          "Broken sleep affects mood, appetite and patience. If it is starting to feel heavier than tiredness, it is worth talking to your midwife, health visitor or GP.",
        ],
      },
      {
        heading: "Practical ideas you can try",
        body: [
          "Keep a low light near the bed for night feeds, so you are not switching on bright overhead lights. Consider a simple, repeatable settling pattern such as a feed, a cuddle, then the sleep space, without expecting it to work every time.",
          "Share the load where you can. Even one long stretch of unbroken rest, taken in turns with a partner or trusted person, can make the next day feel more possible.",
        ],
      },
    ],
    keyTakeaways: [
      "Newborns sleep in short, unpredictable stretches, and that is normal.",
      "Frequent night waking is expected and eases gradually over time.",
      "Rest, not perfect sleep, is a realistic goal in the early weeks.",
      "Follow current safer sleep guidance from the NHS and The Lullaby Trust for every sleep.",
      "Ask for support if broken sleep starts to feel heavier than tiredness.",
    ],
    relatedSlugs: [
      "helping-your-baby-settle",
      "safe-sleep-and-home-safety",
      "newborn-feeding-rhythms",
    ],
    crossLinks: [
      {
        label: "Baby sleep in the first year",
        href: "/articles/baby-sleep-first-year",
        context: "How sleep changes across the whole first year.",
      },
    ],
    sources: [
      {
        label: "Helping your baby to sleep",
        publisher: "NHS",
        url: "https://www.nhs.uk/conditions/baby/caring-for-a-newborn/helping-your-baby-to-sleep/",
      },
      {
        label: "Safer sleep advice",
        publisher: "The Lullaby Trust",
        url: "https://www.lullabytrust.org.uk/safer-sleep-advice/",
      },
      {
        label: "Caring for your baby at night",
        publisher: "UNICEF UK Baby Friendly Initiative",
        url: "https://www.unicef.org.uk/babyfriendly/baby-friendly-resources/sleep-and-night-time-resources/caring-for-your-baby-at-night/",
      },
    ],
  },
  {
    slug: "helping-your-baby-settle",
    topic: "sleep",
    suppressHeroImage: true,
    title: "Helping your baby settle",
    description:
      "Calm, low-pressure ways to help your baby drift off, without rigid routines or sleep-training pressure.",
    readTime: "6 min read",
    status: "ready",
    medicallyReviewed: true,
    reviewedBy: "Jenny Joines",
    lastUpdated: "July 2026",
    seoTitle: "Helping your baby settle | The Start of You",
    seoDescription:
      "Gentle guidance for settling your baby with responsive care, calm patterns and safer sleep in mind.",
    intro:
      "Settling a baby is one of those things that looks straightforward from the outside and feels anything but from where you are standing. Some evenings it comes easily. Others take much longer, for reasons you may never quite know. This piece is a gentle guide to steady, responsive ways of helping your baby settle, without promising that any one method will work every time.",
    sections: [
      {
        heading: "Why settling can vary from baby to baby",
        body: [
          "Every baby has their own temperament, and every day brings different feeds, wake windows and moods. What soothes your baby one evening may not work the next. That does not mean you are doing anything wrong.",
          "It helps to hold your expectations gently. Settling is a conversation with your baby, not a technique you get right or wrong.",
        ],
      },
      {
        heading: "Start with simple needs",
        body: [
          "When your baby is unsettled, it is usually worth running through the basics first. Are they hungry, too warm or too cool, in need of a nappy change, or simply wanting to be held.",
          "Small, calm adjustments often help more than complicated routines. A feed, a cuddle, or being carried close can steady both of you.",
        ],
      },
      {
        heading: "Use calm repetition without forcing a routine",
        body: [
          "Repeating a similar wind down each evening can help your baby recognise that it is nearly time to rest. Low light, quiet voices, a feed, a cuddle, and their sleep space is enough. It does not need to look like a schedule.",
          "Try not to measure success by how quickly your baby drops off. Some nights simply take longer.",
        ],
      },
      {
        heading: "Responsive care is not spoiling your baby",
        body: [
          "Responding to your baby's cries and cues in the first year is not a bad habit you are building. It is how they learn that the world is safe and that their needs will be met.",
          "You cannot cuddle a young baby too much. Closeness is a valid, useful settling tool.",
        ],
      },
      {
        heading: "Keep safer sleep in the picture",
        body: [
          "For sleep, follow current safer sleep guidance from trusted sources such as the NHS and The Lullaby Trust. Even when you are tired, keep the sleep space simple, clear and set up the same way each time.",
          "If you feed your baby to sleep, gently move them to their safer sleep space when you can. It is worth planning in advance so the safer choice is also the easy choice.",
        ],
      },
      {
        heading: "When settling feels hard",
        body: [
          "Long evenings of crying are exhausting and can feel very lonely. If you feel yourself becoming overwhelmed, it is completely okay to put your baby down somewhere safe, step out of the room for a moment, and take a few breaths.",
          "If unsettled evenings continue, or something about your baby's crying feels different, it is worth speaking to your health visitor or GP.",
        ],
      },
      {
        heading: "Practical ideas you can try",
        body: [
          "Try skin-to-skin contact, gentle movement, low light and a calm voice. Some babies settle better with a change of scene, such as a slow walk with the pram or being held upright against your chest.",
          "Share the settling with another person when you can, so no one is doing every hard evening alone.",
        ],
      },
    ],
    keyTakeaways: [
      "Every baby settles differently, and there is no single technique that always works.",
      "Start with the basics, such as feeding, warmth and closeness.",
      "Gentle repetition helps more than a strict routine.",
      "Responding to your baby is not spoiling them.",
      "Keep safer sleep guidance in the picture at every sleep.",
      "Ask for support if evenings feel consistently overwhelming.",
    ],
    relatedSlugs: [
      "newborn-sleep-expectations",
      "safe-sleep-and-home-safety",
      "feeling-like-yourself-again",
    ],
    sources: [
      {
        label: "Soothing a crying baby",
        publisher: "NHS",
        url: "https://www.nhs.uk/conditions/baby/caring-for-a-newborn/soothing-a-crying-baby/",
      },
      {
        label: "Safer sleep advice",
        publisher: "The Lullaby Trust",
        url: "https://www.lullabytrust.org.uk/safer-sleep-advice/",
      },
      {
        label: "Responsive feeding: supporting close and loving relationships",
        publisher: "UNICEF UK Baby Friendly Initiative",
        url: "https://www.unicef.org.uk/babyfriendly/baby-friendly-resources/relationship-building-resources/responsive-feeding-infosheet/",
      },
    ],
  },
  {
    slug: "when-sleep-suddenly-changes",
    topic: "sleep",
    title: "When your baby's sleep suddenly changes",
    description:
      "Why a settled baby can start waking again, what tends to be behind it, and what actually helps, without treating sleep regressions as fixed stages.",
    readTime: "6 min read",
    status: "ready",
    lastUpdated: "September 2026",
    seoTitle: "When your baby's sleep suddenly changes | The Start of You",
    seoDescription:
      "Why a settled baby can start waking again in the first year, what commonly disturbs a sleep pattern, and what tends to help.",
    intro:
      "Sleep can suddenly feel different, even when you thought you had found a rhythm. A baby who was settling well starts waking again, naps shorten, bedtime unravels. It is disorientating, and it is one of the most searched-for things in the first year.",
    sections: [
      {
        heading: "About the phrase \"sleep regression\"",
        body: [
          "You will see \"four month sleep regression\" and similar phrases everywhere. It is a useful shorthand parents use for a patch of disrupted sleep, and if it describes your week then it describes your week.",
          "It is worth knowing that it is not a medical or developmental diagnosis, and UK health guidance does not set out fixed regressions at particular ages or say how long they last. So rather than working out which regression you are in, it is usually more useful to look at what has actually changed.",
        ],
      },
      {
        heading: "Sleep was always going to change",
        body: [
          "Babies' sleep patterns vary from birth, just as adults' do. Some need more sleep than others, and how much they need changes across the first year.",
          "A settled few weeks is not a permanent state you can lose; it is one part of a pattern that keeps moving.",
        ],
      },
      {
        heading: "Things that commonly disturb a settled pattern",
        body: [
          "New skills. Rolling, sitting, pulling up and other new abilities often bubble up at night. Babies practise them at the least convenient hour.",
          "Being unwell, or teething discomfort.",
          "Changes in routine or surroundings, such as travel, a new room, or a return to work.",
          "Changing sleep needs, as naps drop or shift and daytime sleep rebalances.",
          "Hunger or feeding changes. Worth saying clearly: starting solids will not make your baby sleep through the night, and extra night waking is not a sign your baby is ready for solids.",
        ],
      },
      {
        heading: "What tends to help",
        body: [
          "Keep day and night distinct. During the day, open the curtains, play and do not worry too much about noise. At night, keep lights low, keep your voice quiet, avoid playing, and settle them again without much stimulation.",
          "Keep a simple bedtime routine. A bath, fresh nappy and night clothes, a story, dimmed lights, a song, a goodnight cuddle. Familiar order does more than any single step.",
          "Wind down beforehand. Excitement close to bedtime can wake a baby up again.",
          "Stay consistent for longer than feels natural. Patches of disrupted sleep usually pass, and constant changes of approach make it harder to tell what is working.",
        ],
      },
      {
        heading: "Safe sleep stays the same",
        body: [
          "Whatever is happening with sleep, the safe-sleep basics do not change. Your baby should sleep in the same room as you for at least the first six months, day and night, which reduces the risk of sudden infant death syndrome.",
          "Follow the NHS safe-sleep advice and the Lullaby Trust guidance rather than any settling suggestion that conflicts with it, and if you use a sling, use it safely.",
          "If your baby falls asleep in the car seat during a drive, take them out and put them on a firm, flat surface as soon as you can.",
        ],
      },
      {
        heading: "When to ask for advice",
        body: [
          "Speak to your health visitor, GP or NHS 111 if your baby seems unwell, if feeding or weight gain is a worry, if the change in sleep is accompanied by anything that concerns you, or if broken nights are affecting how you are coping.",
          "Health visitors talk about sleep constantly; you do not need a serious reason to ask.",
        ],
      },
      {
        heading: "How this can feel for you",
        body: [
          "Broken sleep after a settled stretch hits harder than broken sleep you were braced for. It is normal to feel resentful, foggy and less patient than you want to be.",
          "Sharing nights where you can, lowering your standards for a while and telling someone how tired you are all count as strategies.",
        ],
      },
    ],
    keyTakeaways: [
      "Sleep patterns vary and keep changing through the first year.",
      "\"Sleep regression\" is a common parent term, not a fixed developmental stage, and there is no set age or duration.",
      "New skills, illness, teething, routine changes and shifting sleep needs are common reasons a pattern changes.",
      "Solids will not make your baby sleep through the night.",
      "Clear day and night cues plus a simple, consistent bedtime routine help most.",
      "Safe-sleep guidance, including room-sharing for at least six months, does not change.",
    ],
    relatedSlugs: [
      "helping-your-baby-settle",
      "newborn-sleep-expectations",
      "baby-development-in-the-first-year",
    ],
    crossLinks: [
      {
        label: "Teething",
        href: "/first-year/care-and-safety/teething",
        context: "What teething tends to involve, and what it does not explain.",
      },
    ],
    sources: [
      {
        label: "Helping your baby to sleep",
        publisher: "NHS",
        url: "https://www.nhs.uk/baby/caring-for-a-newborn/helping-your-baby-to-sleep/",
      },
      {
        label: "Your baby's first solid foods",
        publisher: "NHS",
        url: "https://www.nhs.uk/baby/weaning-and-feeding/babys-first-solid-foods/",
      },
      {
        label: "Baby development",
        publisher: "NHS Start for Life",
        url: "https://www.nhs.uk/start-for-life/baby/baby-development/",
      },
    ],
  },



  // Development
  {
    slug: "baby-development-in-the-first-year",
    suppressHeroImage: true,
    topic: "development",
    title: "Baby development in the first year",
    description:
      "A gentle map of what unfolds in the first year, without turning every week into a checklist.",
    readTime: "7 min read",
    status: "ready",
    medicallyReviewed: true,
    reviewedBy: "Jenny Joines",
    lastUpdated: "July 2026",
    seoTitle: "Baby development in the first year | The Start of You",
    seoDescription:
      "A calm guide to baby development in the first year, including movement, communication, play and milestones.",
    intro:
      "Baby development in the first year is often described in bright lists of firsts, but in real life it tends to unfold much more quietly. Small changes build over weeks and months, and no two babies move through them in quite the same order. This piece is a calm map of what tends to happen, so you can hold the bigger picture without turning every day into a checklist.",
    sections: [
      {
        heading: "Development is more than milestones",
        body: [
          "Milestones can be useful signposts, but they are only part of the story. Development also shows up in how your baby watches your face, settles into your arms, notices a new sound or reaches for something that has caught their eye.",
          "Holding the picture loosely tends to help. Your baby is learning all the time, even in the quiet moments that do not look like anything on a list.",
        ],
      },
      {
        heading: "Movement and strength build gradually",
        body: [
          "In the early months, babies slowly gain control of their head, then their upper body, then their hands, hips and legs. Rolling, sitting, reaching, crawling in some form, pulling to stand and eventually cruising or walking tend to appear over a wide range of ages.",
          "Time on their tummy while awake and supervised, floor play and being carried in different positions all give your baby chances to practise. There is no need to rush any single stage.",
        ],
      },
      {
        heading: "Senses, play and curiosity",
        body: [
          "Your baby's senses sharpen quickly. In the first months, faces, contrast, gentle sounds and being held close are often the most interesting things in the world. Later on, textures, simple toys, mirrors and everyday objects become fascinating.",
          "Play in the first year does not need to be elaborate. Talking through what you are doing, showing them small things around the house and giving them safe time on the floor are all real learning.",
        ],
      },
      {
        heading: "Communication starts before words",
        body: [
          "Long before first words, babies communicate through eye contact, facial expressions, small sounds, cooing and babbling. Turn-taking, where you respond to their sounds and pause for theirs, is one of the most important building blocks of language.",
          "Reading, singing, naming what you see and simply chatting through the day all support communication. First words often arrive somewhere in the second half of the year, but the range is wide and varies a lot.",
        ],
      },
      {
        heading: "Feeding, sleep and development can overlap",
        body: [
          "New skills, growth spurts and changes around feeding or sleep often bump into each other. A baby learning to roll or pull up may briefly wake more at night. A baby starting solids may still want lots of milk feeds.",
          "This overlap is normal. It rarely means you have done something wrong. It usually means several things are changing at once, which takes energy.",
        ],
      },
      {
        heading: "Connection supports learning",
        body: [
          "Warm, responsive care is one of the strongest supports for development. When your baby feels safe, they have more energy for exploring, playing and learning new things.",
          "You do not need to be endlessly patient or endlessly playful. Ordinary responsive moments across the day, including comfort when they are upset, add up over time.",
        ],
      },
      {
        heading: "Practical ideas you can try",
        body: [
          "Attend the routine baby reviews offered by your health visiting team when you can. These check-ins are a good place to talk through anything you have noticed and to ask questions without needing a particular reason.",
          "If you are worried about your baby's development, or something feels different from what you expected, ask your health visitor, GP or the appropriate local service for advice.",
        ],
      },
    ],
    keyTakeaways: [
      "Development in the first year is gradual and rarely tidy.",
      "Milestones are signposts, not deadlines.",
      "Movement, senses, play and communication all develop alongside each other.",
      "Everyday responsive moments support learning as much as structured play.",
      "New skills often overlap with changes in feeding or sleep.",
      "Routine reviews and health visitor contacts are useful places to ask questions.",
    ],
    relatedSlugs: [
      "when-milestones-feel-uneven",
      "baby-care-basics",
      "newborn-sleep-expectations",
    ],
    crossLinks: [
      {
        label: "Baby milestones in the first year",
        href: "/articles/baby-milestones-first-year",
        context: "The full milestone guide, month by month.",
      },
    ],
    sources: [
      {
        label: "Baby development: your baby's first year",
        publisher: "NHS Start for Life",
        url: "https://www.nhs.uk/start-for-life/baby/baby-development/",
      },
      {
        label: "Baby's development",
        publisher: "NHS",
        url: "https://www.nhs.uk/conditions/baby/babys-development/",
      },
      {
        label: "Baby reviews: height, weight and development checks",
        publisher: "NHS",
        url: "https://www.nhs.uk/baby/babys-development/height-weight-and-reviews/baby-reviews/",
      },
      {
        label: "Personal Child Health Record (PCHR)",
        publisher: "RCPCH",
        url: "https://www.rcpch.ac.uk/resources/personal-child-health-record-pchr",
      },
    ],
  },
  {
    slug: "when-milestones-feel-uneven",
    suppressHeroImage: true,
    topic: "development",
    title: "When milestones feel uneven",
    description:
      "Why babies rarely develop in straight lines, and when a gentle chat with your health visitor can help.",
    readTime: "6 min read",
    status: "ready",
    medicallyReviewed: true,
    reviewedBy: "Jenny Joines",
    lastUpdated: "July 2026",
    seoTitle: "When baby milestones feel uneven | The Start of You",
    seoDescription:
      "Supportive guidance for parents when baby milestones feel uneven, delayed or different from what they expected.",
    intro:
      "When one area of your baby's development seems to race ahead while another feels slower, it can be hard not to worry. Uneven development is common, and often part of how babies learn. At the same time, if something feels off to you, that instinct is worth listening to. This piece holds both truths gently: many differences are normal, and worries are still worth talking through.",
    sections: [
      {
        heading: "Why milestones can feel emotional",
        body: [
          "Milestone lists are useful, but they can also weigh heavy. It is easy to start scanning your baby for what they are not doing yet, rather than noticing what they are doing.",
          "If you have felt a knot in your chest when reading a development chart, you are not alone. Many parents feel this at some point in the first year.",
        ],
      },
      {
        heading: "Development does not always move evenly",
        body: [
          "Babies often focus on one area at a time. Some pour their energy into movement, others into sounds, others into watching and listening carefully before doing much visible on the outside.",
          "A pause in one area does not always mean a problem. It can simply mean their attention has moved somewhere else for a while.",
        ],
      },
      {
        heading: "One area can move faster than another",
        body: [
          "It is common for a baby to be ahead of expectations in one area, such as babbling or gross motor skills, while being closer to the later end of the range in another. Over time, these often even out.",
          "The wider picture across weeks and months usually tells you more than any single snapshot on any single day.",
        ],
      },
      {
        heading: "Try not to compare babies too closely",
        body: [
          "Babies of similar ages can look very different in what they do. Family patterns, prematurity, temperament, health and simple individual differences all shape the picture.",
          "If comparisons with other babies leave you feeling worse, it is okay to step back from that content or those conversations for a while.",
        ],
      },
      {
        heading: "What to notice over time",
        body: [
          "Rather than fixing on a single milestone, it can help to look at broader patterns. Is your baby generally responsive to you, interested in the world around them, and gradually adding new skills, even in small ways?",
          "Keeping a loose sense of these patterns is more useful than tracking any single item on a checklist.",
        ],
      },
      {
        heading: "When to ask for advice",
        body: [
          "If you are worried about your baby's development, or something feels different from what you expected, ask your health visitor, GP or the appropriate local service for advice. They can talk things through with you, do gentle checks and refer on if helpful.",
          "You do not need a long list of concerns before making contact. Wanting to talk something through is reason enough.",
        ],
      },
      {
        heading: "Practical ideas you can try",
        body: [
          "Note down what you have noticed in simple language, including when it started and how often you see it. This can help conversations with a health visitor or GP feel less rushed.",
          "Keep responsive play, comfort and everyday chatting going as usual. These support your baby regardless of exactly where they are on any given chart.",
        ],
      },
    ],
    keyTakeaways: [
      "Uneven development between areas is common in the first year.",
      "A pause in one area often reflects focus on another.",
      "The wider pattern over weeks tends to say more than a single day.",
      "Comparisons with other babies can add pressure without adding clarity.",
      "Worries are worth discussing with a health visitor or GP, even without a long list.",
      "Warm, everyday care supports your baby whatever the picture looks like.",
    ],
    relatedSlugs: [
      "baby-development-in-the-first-year",
      "baby-care-basics",
      "when-to-ask-for-help-after-birth",
    ],
    sources: [
      {
        label: "Baby's development",
        publisher: "NHS",
        url: "https://www.nhs.uk/conditions/baby/babys-development/",
      },
      {
        label: "Baby development: your baby's first year",
        publisher: "NHS Start for Life",
        url: "https://www.nhs.uk/start-for-life/baby/baby-development/",
      },
      {
        label: "Baby reviews: height, weight and development checks",
        publisher: "NHS",
        url: "https://www.nhs.uk/baby/babys-development/height-weight-and-reviews/baby-reviews/",
      },
      {
        label: "Personal Child Health Record (PCHR)",
        publisher: "RCPCH",
        url: "https://www.rcpch.ac.uk/resources/personal-child-health-record-pchr",
      },
    ],
  },

  // Care and safety
  {
    slug: "baby-care-basics",
    suppressHeroImage: true,
    topic: "care-and-safety",
    title: "Baby care basics",
    description:
      "Nappies, baths, cord care and the small everyday practicalities of looking after a new baby.",
    readTime: "6 min read",
    status: "ready",
    medicallyReviewed: true,
    reviewedBy: "Jenny Joines",
    lastUpdated: "July 2026",
    seoTitle: "Baby care basics in the first year | The Start of You",
    seoDescription:
      "Practical guidance for everyday baby care, changing, bathing, soothing and knowing when to ask for advice.",
    intro:
      "Looking after a new baby is made up of a hundred small tasks that no one really trains you for. Nappies, baths, soothing, dressing, cord care, and the constant checking that everything is okay. This piece is a calm, practical walk through the everyday basics, so the small things feel less like a test and more like a rhythm you can grow into.",
    sections: [
      {
        heading: "Why baby care can feel like a lot at first",
        body: [
          "Everything is new, and each task feels bigger than it will in a few months. You are learning your baby at the same time as recovering from birth, which is a lot to hold.",
          "Give yourself permission to be slow and careful. Confidence tends to grow with repetition, not with reading more.",
        ],
      },
      {
        heading: "Changing and dressing your baby",
        body: [
          "Newborns need frequent nappy changes, and the routine of clean, cream if needed, and fresh nappy becomes familiar quickly. Change your baby on a safe, low surface, and keep everything you need within reach so you never have to step away.",
          "Dress your baby in layers that are easy to add or remove, so you can adjust to the room and the weather without a full change of outfit.",
        ],
      },
      {
        heading: "Bathing and everyday skin care",
        body: [
          "Newborns do not need daily baths. A gentle top and tail wash with warm water is often enough in the early weeks, with a full bath a few times a week when it feels right.",
          "Plain water is usually all a young baby's skin needs. If you use products, choose ones designed for babies and keep them simple.",
        ],
      },
      {
        heading: "Cord care and early healing",
        body: [
          "The umbilical cord stump usually dries and falls off in the first couple of weeks. Keep the area clean and dry, and let air reach it when you can. Fold the nappy down away from the stump so it is not rubbed.",
          "If the skin around the stump looks red, swollen or has an unusual smell, or if you are worried, contact your midwife, health visitor or GP.",
        ],
      },
      {
        heading: "Soothing and comfort",
        body: [
          "Cuddles, closeness, gentle rocking and a calm voice are the everyday tools of comfort. Being held is one of the most powerful things you can offer a young baby.",
          "You will slowly learn what tends to help your baby, and it may look different from what helps a friend's baby. That is completely okay.",
        ],
      },
      {
        heading: "When something does not feel right",
        body: [
          "You will get to know your baby's usual colour, feeding, crying and alertness. When something feels off, that instinct is worth listening to.",
          "If you are worried about your baby, or something feels urgent, ask for medical advice from the appropriate local service. Do not wait to be certain before reaching out.",
        ],
      },
      {
        heading: "Practical ideas you can try",
        body: [
          "Keep a small basket of essentials, such as nappies, wipes, a spare vest and a muslin, in the room where you spend the most time. It saves a lot of trips.",
          "Ask another parent or your midwife to show you a nappy change or a bath in person if it feels daunting. Watching someone do it once often helps far more than reading.",
        ],
      },
    ],
    keyTakeaways: [
      "Everyday baby care becomes familiar with quiet repetition.",
      "Newborns do not need daily baths, and simple skin care is usually best.",
      "Keep the cord area clean, dry and free from rubbing while it heals.",
      "Cuddles and closeness are a valid, useful part of care.",
      "Trust your instinct when something feels different, and ask for advice.",
    ],
    relatedSlugs: [
      "safe-sleep-and-home-safety",
      "newborn-sleep-expectations",
      "when-to-ask-for-help-after-birth",
    ],
    sources: [
      {
        label: "Washing and bathing your baby",
        publisher: "NHS",
        url: "https://www.nhs.uk/conditions/baby/caring-for-a-newborn/washing-and-bathing-your-baby/",
      },
      {
        label: "Nappies: what you need to know",
        publisher: "NHS",
        url: "https://www.nhs.uk/conditions/baby/caring-for-a-newborn/nappies/",
      },
      {
        label: "Getting to know your newborn",
        publisher: "NHS",
        url: "https://www.nhs.uk/conditions/baby/caring-for-a-newborn/getting-to-know-your-newborn/",
      },
      {
        label: "Spotting signs of serious illness in babies and toddlers",
        publisher: "NHS",
        url: "https://www.nhs.uk/conditions/baby/health/spotting-signs-of-serious-illness/",
      },
    ],
  },
  {
    slug: "safe-sleep-and-home-safety",
    suppressHeroImage: true,
    topic: "care-and-safety",
    title: "Safe sleep and home safety",
    description:
      "A calm summary of current UK safe-sleep guidance and small changes that make your home feel steadier.",
    readTime: "7 min read",
    status: "ready",
    medicallyReviewed: true,
    reviewedBy: "Jenny Joines",
    lastUpdated: "July 2026",
    seoTitle: "Safe sleep and home safety for babies | The Start of You",
    seoDescription:
      "Careful guidance on safer sleep and everyday home safety for your baby's first year.",
    intro:
      "Safety advice can feel loud in the first year. There are lists, warnings, and a lot of very confident voices online. This piece pulls it back to something calmer. A short summary of safer sleep, plus everyday home safety ideas you can quietly build into your day. The aim is not to make you anxious. It is to help the safer choice become the easy choice.",
    sections: [
      {
        heading: "Why safety advice can feel overwhelming",
        body: [
          "There is a lot of safety information out there, and much of it is written from a worst-case angle. That is understandable, but it can leave new parents feeling on edge.",
          "It helps to lean on a small number of trusted sources rather than trying to hold every piece of advice in your head.",
        ],
      },
      {
        heading: "Safer sleep basics to keep returning to",
        body: [
          "For sleep, follow current safer sleep guidance from trusted sources such as the NHS and The Lullaby Trust. Their advice is written to be simple, clear and easy to remember.",
          "Rather than trying to memorise every detail at once, read the guidance calmly, and return to it whenever you need a refresher.",
        ],
      },
      {
        heading: "Thinking about the room your baby sleeps in",
        body: [
          "A calm, uncluttered sleep space is usually a safer one. Keep the area around your baby's sleep space clear, and set it up in advance so night feeds do not require decisions.",
          "If you are unsure whether a particular product or setup is right, check current guidance from The Lullaby Trust or the NHS rather than guessing.",
        ],
      },
      {
        heading: "Everyday home safety in the first year",
        body: [
          "As your baby grows, home safety expands beyond sleep. Trusted UK sources such as RoSPA and the Child Accident Prevention Trust offer clear guidance on the areas that matter most in the first year, such as falls, burns, choking and drowning risks.",
          "You do not need to do everything at once. Working through one room at a time makes it feel less overwhelming.",
        ],
      },
      {
        heading: "Keep safety simple and repeatable",
        body: [
          "Try to build safe habits that do not rely on remembering in the moment. Putting the kettle handle to the back, keeping small objects up high, and closing stair gates every time all help.",
          "Everyone who looks after your baby, including grandparents and friends, should know the basics too.",
        ],
      },
      {
        heading: "When to ask for advice",
        body: [
          "If you are worried about your baby, or something feels urgent, ask for medical advice from the appropriate local service. Your health visitor is also a good first port of call for general safety and development questions.",
          "There is no such thing as a silly question when it comes to your baby's safety.",
        ],
      },
      {
        heading: "Practical ideas you can try",
        body: [
          "Set up your baby's sleep space in advance so tired-brain decisions are already made. Do a slow walk through each room once your baby is moving, from their eye level, to spot obvious risks.",
          "Bookmark a small handful of trusted safety pages, so you always know where to look rather than searching from scratch each time.",
        ],
      },
    ],
    keyTakeaways: [
      "Lean on a small number of trusted sources rather than every voice online.",
      "Safer sleep guidance from the NHS and The Lullaby Trust is simple and worth returning to.",
      "Set up your baby's sleep space in advance to make the safer choice the easy choice.",
      "Home safety grows with your baby, and one room at a time is enough.",
      "Ask your health visitor or GP if something is worrying you.",
    ],
    relatedSlugs: [
      "newborn-sleep-expectations",
      "baby-care-basics",
      "when-to-ask-for-help-after-birth",
    ],
    sources: [
      {
        label: "Safer sleep advice",
        publisher: "The Lullaby Trust",
        url: "https://www.lullabytrust.org.uk/safer-sleep-advice/",
      },
      {
        label: "Baby and toddler safety",
        publisher: "NHS",
        url: "https://www.nhs.uk/conditions/baby/babys-development/safety/baby-and-toddler-safety/",
      },
      {
        label: "Home safety advice",
        publisher: "RoSPA",
        url: "https://www.rospa.com/home-safety/advice",
      },
      {
        label: "Child safety advice",
        publisher: "Child Accident Prevention Trust",
        url: "https://capt.org.uk/child-safety-advice/",
      },
    ],
  },

  // Postpartum recovery
  {
    slug: "healing-after-birth",
    topic: "postpartum-recovery",
    suppressHeroImage: true,
    title: "Healing after birth",
    description:
      "What physical recovery can look like in the first weeks, whether you had a vaginal birth or a caesarean.",
    readTime: "7 min read",
    status: "ready",
    medicallyReviewed: true,
    reviewedBy: "Jenny Joines",
    lastUpdated: "July 2026",
    seoTitle: "Healing after birth | The Start of You",
    seoDescription:
      "Gentle guidance on physical healing, rest, soreness, bleeding, stitches, scars and recovery after birth.",
    intro:
      "Healing after birth is quieter and slower than most of us are led to expect. Your body has just done something enormous, and the first weeks are less a return to normal and more a gentle rebuilding. This piece walks through what physical healing can look like, so you can meet it with a little more patience and a little less pressure.",
    sections: [
      {
        heading: "Why healing can take time",
        body: [
          "Whether you had a vaginal birth or a caesarean, your body is repairing tissues, adjusting to a huge hormonal shift and finding a new rhythm. That work happens under the surface, even on days when nothing outward seems to be changing.",
          "It is common for the first six weeks to feel tender and tiring, and for full recovery to take longer than that. There is no single timeline that fits every parent, and comparing yourself to anyone else rarely helps.",
        ],
      },
      {
        heading: "Rest matters, even when rest is difficult",
        body: [
          "Rest is one of the few things that reliably supports early healing. That does not always mean sleep. It can mean lying down while feeding, staying in your pyjamas for another morning, or letting someone else answer the door.",
          "In the first weeks, protecting your energy is a form of care, not laziness. If you can, let visits be short and let expectations of yourself be small.",
        ],
      },
      {
        heading: "Bleeding, soreness and tenderness",
        body: [
          "Some bleeding after birth is expected and gradually eases over the weeks that follow. Its colour and flow can change as your body settles, and pads are usually more comfortable than tampons during this time.",
          "Soreness around your bottom, perineum or tummy is also common. Warm baths, gentle movement and taking things slowly often help. If something feels beyond what you would expect, you do not have to wait to ask.",
        ],
      },
      {
        heading: "Stitches, wounds and scars",
        body: [
          "If you had stitches after a tear, an episiotomy or a caesarean, the area may feel tight, tender or unfamiliar for a while. Keeping it clean and dry, and letting it heal in its own time, is usually the quiet work of recovery.",
          "Caesarean scars in particular can feel numb, sensitive or a little pulling in the early weeks. Most people find these sensations soften over months rather than days.",
        ],
      },
      {
        heading: "Pelvic floor and core awareness",
        body: [
          "Your pelvic floor has been through a lot during pregnancy and birth. Gentle pelvic floor exercises, once you feel able, can support long-term recovery, and there is no rush to start heavy activity.",
          "Your tummy muscles also need time. Rather than pushing towards a workout, small, mindful movements and good posture during feeds tend to serve early healing better.",
        ],
      },
      {
        heading: "When to ask for advice",
        body: [
          "Trust your instincts. You know your body better than anyone, and you are allowed to raise concerns even when you are not sure whether something counts as a problem.",
          "If bleeding, pain, mood, temperature, wounds or any other symptoms worry you, ask for advice from your midwife, GP or the appropriate local service. It is always reasonable to check.",
        ],
      },
      {
        heading: "Practical ideas you can try",
        body: [
          "Keep water, snacks, pads and anything you need within arm's reach of where you feed. Small setups like this quietly protect your energy through the day.",
          "Say yes when someone offers a meal, a walk with the pram or a load of washing. Accepting help is part of recovery, not a shortcut around it.",
        ],
      },
    ],
    keyTakeaways: [
      "Healing after birth is gradual, and six weeks is a starting point rather than a finish line.",
      "Rest is a form of care, and small setups can protect your energy through the day.",
      "Bleeding and soreness are common early on and usually ease over the weeks that follow.",
      "Stitches, wounds and caesarean scars each heal in their own time and often feel odd before they feel settled.",
      "Gentle pelvic floor and core awareness supports long-term recovery more than pushing hard early on.",
      "You are always allowed to ask a midwife or GP if something does not feel right.",
    ],
    relatedSlugs: [
      "what-recovery-can-feel-like",
      "body-changes-after-birth",
      "postnatal-checks-and-appointments",
      "when-parenthood-feels-heavy",
    ],
    crossLinks: [
      {
        label: "Postpartum recovery timeline",
        href: "/articles/postpartum-recovery-timeline",
        context: "The wider recovery guide this sits inside.",
      },
      {
        label: "Stitches, tears and perineal healing",
        href: "/first-year/postpartum-recovery/stitches-tears-and-perineal-healing",
        context: "The detailed guide to stitches, tears and perineal healing.",
      },
    ],
    sources: [
      {
        label: "Your body after the birth",
        publisher: "NHS",
        url: "https://www.nhs.uk/pregnancy/labour-and-birth/your-body/",
      },
      {
        label: "Recovery after a caesarean section",
        publisher: "NHS",
        url: "https://www.nhs.uk/tests-and-treatments/caesarean-section/recovery/",
      },
      {
        label: "First- and second-degree tears",
        publisher: "RCOG",
        url: "https://www.rcog.org.uk/for-the-public/perineal-tears-and-episiotomies-in-childbirth/first-and-second-degree-tears/",
      },
      {
        label: "Your pelvic floor",
        publisher: "RCOG",
        url: "https://www.rcog.org.uk/for-the-public/perineal-tears-and-episiotomies-in-childbirth/your-pelvic-floor/",
      },
    ],
  },
  {
    slug: "what-recovery-can-feel-like",
    topic: "postpartum-recovery",
    suppressHeroImage: true,
    title: "What recovery can feel like",
    description:
      "The tender, tiring, quietly emotional side of the early weeks, and why it takes longer than the world lets on.",
    readTime: "6 min read",
    status: "ready",
    medicallyReviewed: true,
    reviewedBy: "Jenny Joines",
    lastUpdated: "July 2026",
    seoTitle: "What recovery can feel like after birth | The Start of You",
    seoDescription:
      "A calm guide to what postpartum recovery can feel like, including tiredness, body changes, emotions and support.",
    intro:
      "Recovery after birth is not one experience. It is a slow, layered process that shifts from week to week, and it very rarely looks the way the world implies. This piece is a gentle map of what recovery can feel like, so you can hold your own experience with a little more kindness.",
    sections: [
      {
        heading: "Recovery is not always a straight line",
        body: [
          "There are often better days followed by heavier ones, and that is a normal part of healing. A quieter week does not undo a harder one, and a hard afternoon does not mean you have gone backwards.",
          "Try to hold the picture in weeks and months rather than in days. Recovery tends to become visible only when you look back a little.",
        ],
      },
      {
        heading: "Your body may feel unfamiliar",
        body: [
          "In the early weeks, your body may not feel like yours in the way it once did. Movement, posture, balance and even how clothes sit can feel different, and that can be strange to sit with.",
          "This is a real part of recovery, not a sign that something has gone wrong. Familiarity often returns in small pieces rather than all at once.",
        ],
      },
      {
        heading: "Tiredness can shape everything",
        body: [
          "Broken sleep and constant care shape how everything else feels. Tasks that would once have felt small can feel bigger, and emotions can sit closer to the surface.",
          "Naming tiredness for what it is can help. Rather than pushing through, it can be worth letting the day be smaller so that rest, when it comes, is easier to take.",
        ],
      },
      {
        heading: "Emotions and recovery often overlap",
        body: [
          "Physical recovery and emotional adjustment often move together. Feeling tearful, tender, protective or unsure is very common in the early weeks and does not mean anything is wrong.",
          "It is worth giving your feelings the same patience you would give a friend. There is no correct way to feel about becoming a parent, or about becoming a parent again.",
        ],
      },
      {
        heading: "Support can make recovery easier",
        body: [
          "Recovery often goes better when it is shared. That might be a partner, a family member, a friend, a health visitor or a group of other parents you barely know yet.",
          "You do not have to explain everything to be supported. Sometimes company is enough, and sometimes a small practical hand is enough.",
        ],
      },
      {
        heading: "When recovery feels harder than expected",
        body: [
          "There are seasons in the first year where recovery genuinely feels harder than you expected, and that is worth taking seriously rather than pushing past.",
          "If bleeding, pain, mood, temperature, wounds or any other symptoms worry you, ask for advice from your midwife, GP or the appropriate local service. Asking early tends to make things easier, not harder.",
        ],
      },
      {
        heading: "Practical ideas you can try",
        body: [
          "Keep the day small when you can. Fewer plans, fewer errands and lower expectations of yourself tend to make recovery feel steadier.",
          "When someone asks how you are, try answering more honestly than usual. It is often the beginning of the support you need.",
        ],
      },
    ],
    keyTakeaways: [
      "Recovery is layered and rarely linear, and better days do not cancel out harder ones.",
      "Your body may feel unfamiliar for a while, and that is a normal part of healing.",
      "Tiredness shapes how everything else feels, so smaller days can be a form of care.",
      "Emotional adjustment often moves alongside physical recovery.",
      "Support, even in small forms, tends to make recovery easier.",
      "If something feels harder than expected, it is always reasonable to ask for advice.",
    ],
    relatedSlugs: [
      "healing-after-birth",
      "feeling-like-yourself-again",
      "body-changes-after-birth",
      "when-parenthood-feels-heavy",
    ],
    sources: [
      {
        label: "Your body after the birth",
        publisher: "NHS",
        url: "https://www.nhs.uk/pregnancy/labour-and-birth/your-body/",
      },
      {
        label: "Your 6-week postnatal check",
        publisher: "NHS",
        url: "https://www.nhs.uk/baby/support-and-services/your-6-week-postnatal-check/",
      },
      {
        label: "Sleep and tiredness after having a baby",
        publisher: "NHS",
        url: "https://www.nhs.uk/baby/support-and-services/sleep-and-tiredness-after-having-a-baby/",
      },
      {
        label: "Your body after the birth (the first 6 weeks)",
        publisher: "Tommy's",
        url: "https://www.tommys.org/pregnancy-information/after-birth/your-body-after-birth",
      },
    ],
  },

  // Emotional wellbeing
  {
    slug: "feeling-like-yourself-again",
    topic: "emotional-wellbeing",
    suppressHeroImage: true,
    title: "Feeling like yourself again",
    description:
      "Why identity shifts so much after birth, and the small returns to yourself that quietly gather over time.",
    readTime: "5 min read",
    status: "ready",
    medicallyReviewed: true,
    reviewedBy: "Jenny Joines",
    lastUpdated: "July 2026",
    seoTitle: "Feeling like yourself again after birth | The Start of You",
    seoDescription:
      "A calm guide to why you may not feel like yourself after birth, how identity shifts, and small ways to feel more grounded in the first year.",
    intro:
      "In the weeks and months after birth, many parents quietly wonder when they will feel like themselves again. It is a soft, common question, and it does not usually have a tidy answer. Your body has been through a great deal, your sleep is different, your days are shaped around someone new, and your inner world is rearranging itself alongside all of it. This piece is a gentle look at why that shift happens, and at the small returns to yourself that gather over time.",
    sections: [
      {
        heading: "Why you may not feel like yourself straight away",
        body: [
          "Feeling different after birth is not a sign that anything has gone wrong. It is a fair response to a real change. In a short space of time, your body, your routines, your relationships and your sense of what a day looks like have all shifted at once.",
          "It is normal to move between feeling capable and feeling lost, sometimes in the same afternoon. That does not mean you are struggling. It usually means you are adjusting to something big while also caring for a very new person.",
        ],
      },
      {
        heading: "Body, sleep and hormones after birth",
        body: [
          "Recovery takes longer than many parents expect. Your body is healing at its own pace, sleep is broken into short pieces, and hormones continue to shift for a good while after birth. Any one of these can quietly affect how grounded you feel.",
          "Try to hold this loosely rather than as a checklist. You are not meant to feel like your pre-birth self while so much is still settling. Small kindnesses to your body, like food, water, rest and gentle movement when you can, matter more than any single fix.",
        ],
      },
      {
        heading: "Identity after becoming a parent",
        body: [
          "Becoming a parent is a real identity shift. Old parts of you are still there, but they are being reshaped around a new relationship and a new set of responsibilities. It can feel like a quiet grief for who you were, even when you love who you are becoming.",
          "That double feeling is not a contradiction. Many parents carry both, and it does not mean they love their baby any less. Naming the shift, even privately, can make it feel less confusing.",
        ],
      },
      {
        heading: "The emotional load of caring for a baby",
        body: [
          "A lot of the work of early parenthood is invisible. Holding the small details in mind, noticing feeds, sleep, temperature, moods and appointments, is real cognitive effort, even on quiet days.",
          "It is worth remembering that carrying this load will use energy, even when the day looked calm from the outside. Feeling tired or a bit blurred is not a sign of weakness, it is a sign of a full mind.",
        ],
      },
      {
        heading: "Small ways to feel more grounded",
        body: [
          "Feeling more like yourself often comes back through small, ordinary things rather than a single big change. A few minutes outside, a familiar meal, a slow shower, a phone call with someone who knows you well.",
          "You do not have to reclaim a whole day. Even a short pocket of time that feels a little like your own life can quietly help. Try to give those small returns some room, rather than saving them for when things settle down.",
        ],
      },
      {
        heading: "Talking honestly about how you feel",
        body: [
          "Many parents keep the harder feelings to themselves, in case they sound ungrateful or worrying. Saying out loud that you feel changed, tired or unsure of yourself is not a failure. It is often the beginning of feeling less alone in it.",
          "Choose someone who tends to listen well, whether that is a partner, a friend, a family member or a health professional. It does not need to be a big conversation. Even a few honest sentences can shift how heavy something feels.",
        ],
      },
      {
        heading: "When it helps to ask for support",
        body: [
          "There is no set point at which asking for support becomes reasonable. If something has been sitting with you for a while, or is getting in the way of everyday life, that is enough of a reason to talk to someone.",
          "If your mood, anxiety, exhaustion or ability to cope worries you, speak to your midwife, health visitor or GP. Reaching out is part of looking after yourself, not a sign that you are getting parenthood wrong.",
        ],
      },
    ],
    keyTakeaways: [
      "Feeling different after birth is a fair response to a real change, not a sign something is wrong.",
      "Body, sleep and hormones are still settling for a long time after birth.",
      "Identity shifts are common, and can include a quiet grief for who you were.",
      "Small, ordinary moments often help you feel more like yourself again.",
      "Talking honestly, even briefly, can make hard feelings feel less alone.",
      "If your mood or ability to cope worries you, it is always okay to ask a midwife, health visitor or GP.",
    ],
    relatedSlugs: [
      "when-parenthood-feels-heavy",
      "what-recovery-can-feel-like",
      "hormones-sweat-and-hair-loss",
    ],
    sources: [
      {
        label: "Mental health in pregnancy and after birth",
        publisher: "NHS",
        url: "https://www.nhs.uk/pregnancy/keeping-well/mental-health/",
      },
      {
        label: "Baby",
        publisher: "NHS Start for Life",
        url: "https://www.nhs.uk/start-for-life/baby/",
      },
      {
        label: "Services and support for parents",
        publisher: "NHS",
        url: "https://www.nhs.uk/conditions/baby/support-and-services/services-and-support-for-parents/",
      },
      {
        label: "About maternal mental health",
        publisher: "Maternal Mental Health Alliance",
        url: "https://maternalmentalhealthalliance.org/about-maternal-mental-health/",
      },
    ],
  },
  {
    slug: "when-parenthood-feels-heavy",
    topic: "emotional-wellbeing",
    title: "When parenthood feels heavy",
    description:
      "The difference between baby blues, low mood and something that deserves support, without alarm.",
    readTime: "6 min read",
    status: "ready",
    medicallyReviewed: true,
    reviewedBy: "Jenny Joines",
    lastUpdated: "July 2026",
    seoTitle: "When parenthood feels heavy | The Start of You",
    seoDescription:
      "A careful UK guide for parents who feel overwhelmed, low or anxious after birth, and gentle ways to take a first step towards support.",
    intro:
      "Parenthood can feel heavy, even when you love your baby. Some days there is joy and softness, and other days feel long, unclear or quietly hard. This is not a sign that you are getting anything wrong. It is a common experience, and it is one of the things this part of life asks parents to hold. This piece is a gentle guide to noticing when things feel heavier than they should, and to how you might take a first step towards support.",
    sections: [
      {
        heading: "When parenthood feels heavier than expected",
        body: [
          "It is not unusual for early parenthood to feel harder than you imagined. Sleep is broken, days blur, and small tasks can take much longer than they used to. That heaviness does not mean you are failing.",
          "It can help to notice how you feel over time, rather than reading too much into any single day. If more days feel weighed down than light, that is worth paying attention to, gently.",
        ],
      },
      {
        heading: "Love and struggle can exist together",
        body: [
          "Many parents feel deep love for their baby and also feel low, anxious or overwhelmed at times. These feelings can sit alongside each other without cancelling each other out.",
          "You do not need to feel one way before it is fair to say the other. Love does not protect anyone from tiredness, worry or emotional weight, and needing support does not take anything away from how much you care.",
        ],
      },
      {
        heading: "Anxiety, low mood and feeling overwhelmed",
        body: [
          "Some parents notice a period of tearfulness in the first days after birth. Others find that low mood, anxiety or overwhelm builds more slowly over the weeks and months that follow. Both are experiences many parents share.",
          "Signs that something is asking for more attention can include feelings that do not lift, worry that feels loud in your head, sleep that suffers even when your baby sleeps, or a sense of being disconnected. Noticing these does not mean labelling yourself, only paying yourself some care.",
        ],
      },
      {
        heading: "Exhaustion and the invisible emotional load",
        body: [
          "Tiredness after birth is not only physical. Holding the small details of a baby's life in mind, and being on call so much of the time, is real emotional work.",
          "When that load builds without pause, it can quietly wear thin the sense that you are coping. Naming that as tiredness of the mind, not just the body, can make it feel a little more real and a little less confusing.",
        ],
      },
      {
        heading: "Why it can be hard to say you are struggling",
        body: [
          "Parents often worry about being seen as ungrateful, dramatic or not managing. Some worry about how professionals might respond, or feel there are people with harder lives who deserve support more.",
          "None of these worries make your feelings any less real. Support is not something you have to earn by reaching a certain level of distress. It is there for parents who feel weighed down, tired, low or unsure, as much as for anyone else.",
        ],
      },
      {
        heading: "Who you can speak to",
        body: [
          "Your GP, midwife or health visitor is a good first point of contact. You can be honest about how you have been feeling, and they will listen without needing you to have tidy words for it.",
          "There are also UK charities that support parents through this part of life, such as Mind, PANDAS Foundation and the Maternal Mental Health Alliance. They can be a gentle place to read, listen or reach out at your own pace.",
        ],
      },
      {
        heading: "Taking the first step towards support",
        body: [
          "A first step is often smaller than it feels. It might be booking a GP appointment, telling one person how you have been, or writing down a few honest sentences before you say them out loud.",
          "If you feel unable to keep yourself or your baby safe, seek urgent local help immediately. In any other moment when things feel heavy, it is still absolutely okay to ask for support, well before things reach that point.",
        ],
      },
    ],
    keyTakeaways: [
      "Feeling heavy in early parenthood is common and does not mean you are failing.",
      "Love and struggle can exist at the same time.",
      "Low mood, anxiety and overwhelm are real experiences worth paying attention to gently.",
      "Exhaustion after birth is emotional as well as physical.",
      "You do not need to reach a certain point of distress to be allowed to ask for support.",
      "A GP, midwife or health visitor is a good place to start when you want to talk.",
    ],
    relatedSlugs: [
      "feeling-like-yourself-again",
      "when-to-ask-for-help-after-birth",
      "postnatal-checks-and-appointments",
    ],
    sources: [
      {
        label: "Postnatal depression overview",
        publisher: "NHS",
        url: "https://www.nhs.uk/mental-health/conditions/post-natal-depression/overview/",
      },
      {
        label: "Mental health in pregnancy and after birth",
        publisher: "NHS",
        url: "https://www.nhs.uk/pregnancy/keeping-well/mental-health/",
      },
      {
        label: "Postnatal depression",
        publisher: "Royal College of Psychiatrists",
        url: "https://www.rcpsych.ac.uk/mental-health/mental-illnesses-and-mental-health-problems/postnatal-depression",
      },
      {
        label: "Postnatal depression and perinatal mental health",
        publisher: "Mind",
        url: "https://www.mind.org.uk/information-support/types-of-mental-health-problems/postnatal-depression-and-perinatal-mental-health/postnatal-depression/",
      },
      {
        label: "PANDAS Foundation",
        publisher: "PANDAS Foundation",
        url: "https://pandasfoundation.org.uk/",
      },
    ],
  },


  // Body and hormones
  {
    slug: "body-changes-after-birth",
    topic: "body-and-hormones",
    suppressHeroImage: true,
    title: "Body changes after birth",
    description:
      "What's normal in the weeks and months after birth, from your bump softening to how your body carries itself.",
    readTime: "6 min read",
    status: "ready",
    medicallyReviewed: true,
    reviewedBy: "Jenny Joines",
    lastUpdated: "July 2026",
    seoTitle: "Body changes after birth | The Start of You",
    seoDescription:
      "Supportive guidance on body changes after birth, including bleeding, breasts, pelvic floor, scars, skin and body image.",
    intro:
      "Bodies change after birth, sometimes in ways that feel expected and sometimes in ways that are quietly surprising. This piece walks through common changes calmly, without any pressure to look or feel a certain way. Everyone's recovery is a little different, and that is genuinely okay.",
    sections: [
      {
        heading: "Why body changes can feel surprising",
        body: [
          "Pregnancy and birth change your body in many small ways at once, and not all of them settle back to how things were before. That can feel strange, especially when the changes are not the ones you were expecting.",
          "There is no single set of changes that happens to everyone. Reading about a friend's experience or a headline online often paints a narrower picture than real life.",
        ],
      },
      {
        heading: "Bleeding, breasts and hormones",
        body: [
          "Bleeding after birth is expected and eases gradually over the weeks that follow. Your breasts also change as feeding gets going or hormones shift, and they can feel fuller, softer or more sensitive at different points.",
          "Hormonal changes are quietly behind a lot of what your body does in the first months, from mood to sweat to skin. This is a normal part of the picture rather than something to fix.",
        ],
      },
      {
        heading: "Your abdomen, posture and strength",
        body: [
          "Your tummy will feel softer than before, and it can take a long time for muscles and skin to settle. There is no need to rush this, and gentle movement usually helps more than pushing.",
          "Posture often shifts too, especially when you are lifting, carrying and feeding for hours a day. Small adjustments, like sitting well supported during feeds, can quietly ease your back and shoulders.",
        ],
      },
      {
        heading: "Pelvic floor changes",
        body: [
          "Your pelvic floor has done a huge amount of work and often needs time to feel like itself. Some leaking or heaviness in the early weeks is common and usually improves with gentle pelvic floor exercises.",
          "If symptoms are not easing, or you are noticing anything that feels beyond a passing shift, it is worth speaking to your GP or health visitor.",
        ],
      },
      {
        heading: "Scars, stitches and skin",
        body: [
          "Caesarean scars, perineal stitches and stretch marks all soften and change over time, though they rarely disappear completely. In the early weeks they can feel tender, numb or sensitive to touch.",
          "Skin changes, from pigmentation to dryness, are also common. Most quietly settle as your hormones balance out over the months.",
        ],
      },
      {
        heading: "Body image after birth",
        body: [
          "It is very normal to feel unsure about your body after birth, and to have days where you feel more at home in yourself than others. This has nothing to do with your worth as a person or a parent.",
          "Try to speak to yourself with the same gentleness you would offer a friend. Comparing your body to how it was before, or to anyone else's, rarely leads anywhere kind.",
        ],
      },
      {
        heading: "Practical ideas you can try",
        body: [
          "Wear things that feel comfortable rather than things that used to fit. Clothes are meant to serve you, especially in this season.",
          "If bleeding, pain, mood, temperature, wounds or any other symptoms worry you, ask for advice from your midwife, GP or the appropriate local service.",
        ],
      },
    ],
    keyTakeaways: [
      "Body changes after birth are common and vary widely from person to person.",
      "Bleeding, breast changes and hormonal shifts are all part of the early weeks.",
      "Your tummy, posture and pelvic floor usually settle gradually with time and gentle movement.",
      "Scars, stitches and skin changes often soften over months rather than days.",
      "Feelings about your body can shift day to day, and kindness towards yourself matters.",
      "It is always reasonable to ask a midwife or GP if something does not feel right.",
    ],
    relatedSlugs: [
      "healing-after-birth",
      "hormones-sweat-and-hair-loss",
      "what-recovery-can-feel-like",
    ],
    crossLinks: [
      {
        label: "Pelvic floor exercises in pregnancy",
        href: "/articles/pelvic-floor-exercises-in-pregnancy",
        context: "The same exercises many people return to after birth.",
      },
      {
        label: "Your body after birth",
        href: "/articles/your-body-after-birth",
        context: "The fuller guide to physical changes after birth.",
      },
    ],
    sources: [
      {
        label: "Your body after the birth",
        publisher: "NHS",
        url: "https://www.nhs.uk/pregnancy/labour-and-birth/your-body/",
      },
      {
        label: "Your post-pregnancy body",
        publisher: "NHS",
        url: "https://www.nhs.uk/baby/support-and-services/your-post-pregnancy-body/",
      },
      {
        label: "Your pelvic floor",
        publisher: "RCOG",
        url: "https://www.rcog.org.uk/for-the-public/perineal-tears-and-episiotomies-in-childbirth/your-pelvic-floor/",
      },
      {
        label: "Body changes when you have a new baby",
        publisher: "Tommy's",
        url: "https://www.tommys.org/pregnancy-information/after-birth/body-changes-when-you-have-new-baby",
      },
    ],
  },
  {
    slug: "hormones-sweat-and-hair-loss",
    topic: "body-and-hormones",
    suppressHeroImage: true,
    title: "Hormones, sweat and hair loss",
    description:
      "The hormonal shifts that quietly steer the early months, and why hair loss and night sweats aren't a worry.",
    readTime: "5 min read",
    status: "ready",
    medicallyReviewed: true,
    reviewedBy: "Jenny Joines",
    lastUpdated: "July 2026",
    seoTitle: "Hormones, sweat and hair loss after birth | The Start of You",
    seoDescription:
      "Reassuring guidance on hormones, night sweats, hair shedding and body changes after birth.",
    intro:
      "The weeks after birth bring one of the biggest hormonal shifts your body will ever go through. Night sweats, hair shedding and unfamiliar mood dips can all sit inside that shift. This piece gently explains what is usually going on, so you can meet these changes with more calm and less worry.",
    sections: [
      {
        heading: "Why hormones can feel intense after birth",
        body: [
          "During pregnancy your body carried very high levels of certain hormones. After birth those levels drop quickly, and other hormones rise as feeding and recovery get going.",
          "That shift is enormous, even when nothing looks unusual from the outside. It quietly steers a lot of what your body and mind are doing in the first months.",
        ],
      },
      {
        heading: "Sweating and temperature changes",
        body: [
          "Many parents notice they sweat more after birth, especially at night. This is often linked to your body letting go of extra fluid and to hormonal changes, and it usually eases over a few weeks.",
          "Cooler bedding, breathable layers and a glass of water beside the bed can make this easier to live with while it settles.",
        ],
      },
      {
        heading: "Hair shedding after birth",
        body: [
          "Hair often thickens during pregnancy because less of it sheds than usual. After birth, that pause ends and the extra hair falls out over a few months, which can look and feel dramatic.",
          "This kind of shedding is a normal part of the hormonal shift and is not the same as ongoing hair loss. Most people find their hair settles back into its usual pattern over time.",
        ],
      },
      {
        heading: "Breast changes and feeding shifts",
        body: [
          "Whether you are breastfeeding, bottle-feeding or doing both, your breasts change as hormones and feeding patterns settle. They can feel fuller, softer, tender or unfamiliar at different points.",
          "Nipples can also be sensitive in the early weeks, especially while feeding is being learnt. Gentle support from a midwife, health visitor or feeding specialist can make a real difference.",
        ],
      },
      {
        heading: "Mood, tiredness and hormones",
        body: [
          "Mood dips, tearfulness and feeling more sensitive than usual are common in the first weeks, and hormones are one part of that picture. Tiredness and adjustment sit alongside it.",
          "None of this means you are struggling to cope. It means your body and mind are doing a lot at once.",
        ],
      },
      {
        heading: "When to ask for advice",
        body: [
          "You do not have to know exactly what is wrong to bring something up. Health professionals are used to gentle, uncertain questions and take them seriously.",
          "If bleeding, pain, mood, temperature, wounds or any other symptoms worry you, ask for advice from your midwife, GP or the appropriate local service.",
        ],
      },
      {
        heading: "Practical ideas you can try",
        body: [
          "Keep water nearby through the day and night. Small, steady sips help with sweat, feeding and general recovery.",
          "Be kind about your hair. Softer styling, a gentler brush and lower expectations for a season are often the easiest way through the shedding phase.",
        ],
      },
    ],
    keyTakeaways: [
      "Hormones shift dramatically after birth and quietly shape a lot of the early months.",
      "Night sweats are common and usually ease over a few weeks.",
      "Postpartum hair shedding is a normal hormonal pattern and different from ongoing hair loss.",
      "Breasts can feel very different as feeding and hormones settle.",
      "Mood dips and heightened sensitivity often sit alongside hormonal change and tiredness.",
      "It is always reasonable to ask a midwife or GP if something does not feel right.",
    ],
    relatedSlugs: [
      "body-changes-after-birth",
      "what-recovery-can-feel-like",
      "feeling-like-yourself-again",
    ],
    sources: [
      {
        label: "Your body after the birth",
        publisher: "NHS",
        url: "https://www.nhs.uk/pregnancy/labour-and-birth/your-body/",
      },
      {
        label: "Your post-pregnancy body",
        publisher: "NHS",
        url: "https://www.nhs.uk/baby/support-and-services/your-post-pregnancy-body/",
      },
      {
        label: "Hair loss",
        publisher: "NHS",
        url: "https://www.nhs.uk/symptoms/hair-loss/",
      },
      {
        label: "Body changes when you have a new baby",
        publisher: "Tommy's",
        url: "https://www.tommys.org/pregnancy-information/after-birth/body-changes-when-you-have-new-baby",
      },
    ],
  },

  // Check-ups and warning signs
  {
    slug: "postnatal-checks-and-appointments",
    topic: "checkups-and-warning-signs",
    suppressHeroImage: true,
    title: "Postnatal checks and appointments",
    description:
      "What to expect from your six-week check, your baby's reviews and the appointments that quietly matter.",
    readTime: "5 min read",
    status: "ready",
    medicallyReviewed: true,
    reviewedBy: "Jenny Joines",
    lastUpdated: "July 2026",
    seoTitle: "Postnatal checks and appointments | The Start of You",
    seoDescription:
      "A calm UK guide to postnatal checks after birth, including midwife visits, health visitor support, the GP check and baby reviews.",
    intro:
      "In the weeks after birth, a quiet rhythm of appointments usually begins. Midwives, health visitors, GPs and baby review services each play a part, and it can be hard to hold it all in your head while you are also recovering and getting to know your baby. This piece is a calm map of what those early appointments are for, so you can use them without feeling like you need to have everything figured out.",
    sections: [
      {
        heading: "Why postnatal checks exist",
        body: [
          "Postnatal checks are there to look after both you and your baby in the weeks and months after birth. They give you a regular chance to talk about how you are healing, how feeding is going, how you are feeling emotionally and how your baby is growing.",
          "Appointment timing and support can vary by area, so it is always okay to ask your midwife, health visitor, GP or local service what applies to you. Nothing about using these appointments means you are struggling.",
        ],
      },
      {
        heading: "Early midwife contact after birth",
        body: [
          "In the first days after birth, a midwife usually stays in touch to check on your recovery and your baby. This might include visits at home, phone calls or clinic appointments, depending on where you live and how your birth went.",
          "These early contacts often cover feeding, bleeding, how you are moving and sleeping, and how your baby is settling. It is a good moment to mention anything that feels off, even if it seems small.",
        ],
      },
      {
        heading: "Health visitor support",
        body: [
          "The health visiting service takes over from midwifery care once your baby is a little older, usually within the first couple of weeks. Health visitors are there to support your family through the early years, not only when something is wrong.",
          "You can talk to a health visitor about feeding, sleep, your baby's development, your own wellbeing and everyday practical worries. They can also point you towards local services if you would like more support.",
        ],
      },
      {
        heading: "The GP postnatal check",
        body: [
          "Around six to eight weeks after birth, you are usually offered a postnatal check with your GP. This appointment is about you, not only about your baby, and covers how you are recovering physically and emotionally.",
          "It can help to think ahead of time about anything you would like to raise, whether that is bleeding, scars, pain, mood, contraception or simply how you are coping. There is no need to have tidy answers ready.",
        ],
      },
      {
        heading: "Baby checks and routine reviews",
        body: [
          "Your baby will usually be offered a newborn physical examination in the first days, followed by regular reviews with the health visiting service. These reviews often look at feeding, growth, development and safe sleep, and give you a chance to ask questions.",
          "Reviews are not tests to pass. They are gentle chances to notice how your baby is doing over time, and to raise anything you have been wondering about.",
        ],
      },
      {
        heading: "What you can ask about",
        body: [
          "You can bring almost anything to a postnatal appointment. Feeding worries, healing questions, sleep, crying, weight, your mood, your relationship, going back to work, other children at home, or simply feeling unsure are all fair to mention.",
          "If something has been on your mind more than once, it is usually worth saying out loud. You do not need to have a clear question, and it is fine to say you are not sure what you are asking.",
        ],
      },
      {
        heading: "Keeping simple notes between appointments",
        body: [
          "A few small notes between appointments can make a real difference. You might jot down feeding patterns, questions as they come up, or moments you have felt worried, so you do not have to remember it all on the day.",
          "Notes can live anywhere that suits you, from a page in a notebook to a few lines in your phone. The aim is not a perfect log, only enough to help you feel prepared and heard when you talk to someone.",
        ],
      },
    ],
    keyTakeaways: [
      "Postnatal checks are for both you and your baby, not only for problems.",
      "Midwife, health visitor and GP care usually overlap in the early weeks.",
      "Appointment timing and services can vary by area, so it is always okay to ask what applies to you.",
      "The six to eight week GP check is a chance to talk about your own recovery and wellbeing.",
      "Baby reviews are gentle check-ins, not tests to pass.",
      "A few notes between appointments can help you feel prepared and heard.",
    ],
    relatedSlugs: [
      "when-to-ask-for-help-after-birth",
      "healing-after-birth",
      "what-recovery-can-feel-like",
    ],
    sources: [
      {
        label: "Your body after the birth",
        publisher: "NHS",
        url: "https://www.nhs.uk/pregnancy/labour-and-birth/after-the-birth/your-body/",
      },
      {
        label: "Baby reviews",
        publisher: "NHS",
        url: "https://www.nhs.uk/conditions/baby/babys-development/height-weight-and-reviews/baby-reviews/",
      },
      {
        label: "Services and support for parents",
        publisher: "NHS",
        url: "https://www.nhs.uk/conditions/baby/support-and-services/services-and-support-for-parents/",
      },
      {
        label: "Baby",
        publisher: "NHS Start for Life",
        url: "https://www.nhs.uk/start-for-life/baby/",
      },
    ],
  },
  {
    slug: "when-to-ask-for-help-after-birth",
    topic: "checkups-and-warning-signs",
    suppressHeroImage: true,
    title: "When to ask for help after birth",
    description:
      "Signs it's worth calling your GP, midwife or 111, and how to trust your instinct without second-guessing it.",
    readTime: "5 min read",
    status: "ready",
    medicallyReviewed: true,
    reviewedBy: "Jenny Joines",
    lastUpdated: "July 2026",
    seoTitle: "When to ask for help after birth | The Start of You",
    seoDescription:
      "A calm UK guide to asking for help after birth, including physical recovery, feeding, baby worries, emotional wellbeing and practical support.",
    intro:
      "Asking for help after birth is not a sign that something has gone wrong. It is part of recovery. Bodies are healing, feeding is being learned, sleep is broken and emotions can move quickly. Knowing who you can turn to, and feeling allowed to reach out, is part of being well supported. This piece is a gentle guide to noticing when it might be time to ask, and to how you might start that conversation.",
    sections: [
      {
        heading: "Asking for help is part of recovery",
        body: [
          "Reaching out is not a test of how much you can cope with alone. It is a normal part of the early weeks, and the people you might contact are used to hearing from parents at all stages of recovery.",
          "If something has been on your mind more than once, or if a small worry has quietly grown, it is usually worth mentioning. You do not need to wait until things feel serious.",
        ],
      },
      {
        heading: "Physical recovery worries",
        body: [
          "Bleeding, pain, healing wounds, headaches, and how your body is moving are all fair to ask about. Recovery is not always tidy, and something that feels off, even mildly, is worth raising.",
          "If bleeding, pain, mood, temperature, feeding, your baby's behaviour or anything else worries you, ask your midwife, health visitor, GP or the appropriate local service for advice.",
        ],
      },
      {
        heading: "Feeding worries",
        body: [
          "Feeding often takes time to settle, whether you are breastfeeding, bottle feeding or doing a mix. Pain, worry about your baby's intake, or feeds that feel unmanageable are all reasons to ask for support early.",
          "Feeding support is there for anyone who wants it, including parents who are bottle feeding. Asking sooner tends to be easier than waiting until things feel stuck.",
        ],
      },
      {
        heading: "Baby behaviour and illness worries",
        body: [
          "You know your baby better than anyone. If they seem unusually quiet, unusually unsettled, feed very differently from before, or simply do not feel right, that is worth mentioning, even if you cannot fully explain why.",
          "Trust your instinct rather than trying to talk yourself out of a worry. Health visitors, GPs and NHS 111 can help you think it through, and it is always okay to check.",
        ],
      },
      {
        heading: "Emotional wellbeing worries",
        body: [
          "Emotions after birth can move quickly. Low mood, anxiety, intrusive thoughts, feeling numb, or simply not feeling like yourself are all worth talking about with your GP, midwife or health visitor.",
          "You do not need to have a diagnosis in mind, and you do not need to prove that things are bad enough. Saying that you are not feeling right is more than enough to begin a conversation.",
        ],
      },
      {
        heading: "Practical support and exhaustion",
        body: [
          "Tiredness after birth is real and can affect how everything else feels. If you are running on very little rest, or if practical things at home feel overwhelming, that is worth mentioning too.",
          "Support can look like a friend or family member helping for an afternoon, a health visitor pointing you towards local groups, or simply being honest with your GP about how much you are carrying.",
        ],
      },
      {
        heading: "What to say when you contact someone",
        body: [
          "You do not need a polished script. A simple sentence such as \"I am not sure if this is normal, but…\" or \"Something has been worrying me since…\" is enough to open the conversation.",
          "If you ever feel unable to keep yourself or your baby safe, please seek urgent local help immediately. At any other time, it is always okay to ask a question you are unsure about.",
        ],
      },
    ],
    keyTakeaways: [
      "Asking for help is a normal part of recovery, not a sign of failing.",
      "You do not need to wait until things feel serious to reach out.",
      "Trust your instinct about your body and your baby.",
      "Emotional wellbeing is as valid a reason to ask for help as physical recovery.",
      "A simple, honest sentence is enough to start a conversation with a professional.",
      "If you ever feel unable to keep yourself or your baby safe, seek urgent local help immediately.",
    ],
    relatedSlugs: [
      "postnatal-checks-and-appointments",
      "feeling-like-yourself-again",
      "newborn-feeding-rhythms",
    ],
    sources: [
      {
        label: "Your body after the birth",
        publisher: "NHS",
        url: "https://www.nhs.uk/pregnancy/labour-and-birth/after-the-birth/your-body/",
      },
      {
        label: "Postnatal depression",
        publisher: "NHS",
        url: "https://www.nhs.uk/mental-health/conditions/post-natal-depression/",
      },
      {
        label: "Baby health",
        publisher: "NHS",
        url: "https://www.nhs.uk/conditions/baby/health/",
      },
      {
        label: "Baby support and services",
        publisher: "NHS",
        url: "https://www.nhs.uk/baby/support-and-services/",
      },
      {
        label: "Life as a parent",
        publisher: "NCT",
        url: "https://www.nct.org.uk/life-parent",
      },
    ],
  },
{
    slug: "teething",
    topic: "care-and-safety",
    title: "Teething: what to expect and what helps",
    description:
      "When teeth may arrive, what teething can look like, what helps with sore gums, and what teething does not explain.",
    readTime: "6 min read",
    status: "ready",
    seoTitle: "Teething: what to expect and what helps | The Start of You",
    seoDescription:
      "A calm guide to teething timing, common signs, what genuinely helps, and the symptoms teething does not explain.",
    intro:
      "There is often a stretch of days where your baby seems different and you cannot quite name why. More dribble than usual. More chewing. Shorter naps. Teething gets blamed for a lot, and sometimes it is the reason. This is a calm look at what teething tends to involve, what genuinely helps, and, just as importantly, what teething does not explain.",
    sections: [
      {
        heading: "When teeth tend to arrive",
        body: [
          "Most babies start teething at around six months, but the range is genuinely wide. Some babies start before four months, some after twelve, and a few are born with a tooth already through. None of that is a sign of anything being ahead or behind.",
          "Teeth usually arrive in a rough order: the bottom front teeth first, then the top front teeth, then the ones either side, then the back teeth later in the second year. Most children have all their milk teeth by two to three years old.",
        ],
      },
      {
        heading: "What teething can look like",
        body: [
          "Some teeth arrive with no fuss at all. When there are signs, they are usually mild and last a few days: a sore, red patch of gum where the tooth is coming through, a slightly raised temperature but under 38C, one flushed cheek or a rash on the face, rubbing an ear on the same side, more dribbling than usual, gnawing and chewing on hands, toys and anything else within reach, and being more fretful and sleeping less well.",
        ],
      },
      {
        heading: "What teething does not explain",
        body: [
          "This part matters more than the list above. Teething is not a reason to wait and see when your baby seems unwell.",
          "A temperature of 38C or higher is not teething, and should be treated as a fever in its own right. There is no evidence that teething causes diarrhoea. Persistent distress, being off feeds, vomiting or a baby who simply is not themselves all deserve looking at separately.",
          "You know your baby. If any symptom worries you, get advice from a GP or call NHS 111 rather than putting it down to teeth.",
        ],
      },
      {
        heading: "What helps",
        body: [
          "A teething ring: chilling one in the fridge can soothe sore gums. Never freeze it, as a frozen ring can damage the gums, and never tie one around your baby's neck.",
          "Gentle gum rubbing with a clean finger, and comfort and distraction: being held, played with or carried often does more than any product.",
          "Something safe to chew if your baby is six months or older and eating solids, such as raw fruit or vegetables. Stay with them while they eat, in case of choking. Rusks are best avoided because nearly all contain sugar.",
          "Wiping dribble gently from the face can help prevent a rash.",
        ],
      },
      {
        heading: "About medicines and gels",
        body: [
          "If your baby is in pain, a sugar-free painkiller can help. Paracetamol can be given from two months old and ibuprofen from three months. Children under sixteen should never have aspirin. Always follow the instructions with the medicine, and ask a pharmacist or GP if you are unsure.",
          "There is a lack of evidence that teething gels work, so rings and simple painkillers come first. If you do use a gel, it must be one made for young children and bought from a pharmacy; general oral pain gels are not suitable. Homeopathic teething products are not recommended.",
        ],
      },
      {
        heading: "Looking after new teeth",
        body: [
          "Register your baby with a dentist once teeth start coming through, and start brushing with fluoride toothpaste as soon as the first tooth appears. Sugary foods and drinks can cause decay even when there are only a few teeth.",
        ],
      },
      {
        heading: "How this can feel for you",
        body: [
          "Teething weeks are tiring in a low-level, unglamorous way. Broken nights and a grumbly baby wear you down, and it is hard not to second-guess whether it really is teeth. Doing the simple things, and checking anything that worries you rather than sitting with it, is enough.",
        ],
      },
    ],
    keyTakeaways: [
      "Teething usually starts around six months, but the range is wide and normal.",
      "Signs are often mild and short-lived.",
      "A temperature of 38C or above, or diarrhoea, is not explained by teething.",
      "Chilled (never frozen) teething rings, gum rubbing and comfort are the first things to try.",
      "Paracetamol from two months and ibuprofen from three months can be used for pain; teething gels have little evidence behind them.",
      "Brush with fluoride toothpaste from the very first tooth.",
    ],
    relatedSlugs: ["baby-care-basics", "when-to-ask-for-help-after-birth"],
    crossLinks: [
      {
        label: "Baby care basics",
        href: "/first-year/care-and-safety/baby-care-basics",
      },
      {
        label: "When to ask for help after birth",
        href: "/first-year/checkups-and-warning-signs/when-to-ask-for-help-after-birth",
      },
    ],
    sources: [
      {
        label: "Baby teething symptoms",
        publisher: "NHS",
        url: "https://www.nhs.uk/baby/babys-development/teething/baby-teething-symptoms/",
      },
      {
        label: "Tips for helping your teething baby",
        publisher: "NHS",
        url: "https://www.nhs.uk/baby/babys-development/teething/tips-for-helping-your-teething-baby/",
      },
    ],
  },
  {
    slug: "colic-and-evening-crying",
    topic: "care-and-safety",
    title: "Colic and evening crying",
    description:
      "What colic means in UK guidance, why evenings can be hardest, what helps, what to avoid, and when to get advice.",
    readTime: "7 min read",
    status: "ready",
    seoTitle: "Colic and evening crying | The Start of You",
    seoDescription:
      "A calm guide to colic and evening crying: what it means, what genuinely helps, what the evidence does not support, and when to get advice.",
    intro:
      "Some evenings a baby cries and cries, and nothing you try seems to reach them. It is one of the hardest experiences of early parenthood, partly because it tends to land at the end of the day when you have the least left to give. This is what colic means in UK guidance, what genuinely helps, and when to ask for help.",
    sections: [
      {
        heading: "Why evenings are often the hardest part",
        body: [
          "Afternoon and evening are the most common times for babies to cry and be difficult to comfort. Crying overall tends to increase at around two weeks old and gradually reduce by around three months. That pattern is common, and it is not a sign that you are missing something obvious.",
        ],
      },
      {
        heading: "What colic means",
        body: [
          "Colic is the word used when a baby who is otherwise healthy cries a great deal: more than three hours a day, on more than three days a week, for at least a week. Alongside the crying, you might notice that your baby is very hard to settle, clenches their fists, goes red in the face, pulls their knees up or arches their back, or is windy with a rumbling tummy.",
          "It often starts in the first few weeks and usually stops by three to four months.",
          "Nobody knows exactly what causes it. It may be that young babies find digestion harder, and in some cases crying is linked to something else such as a cows' milk allergy.",
        ],
      },
      {
        heading: "It is not always colic",
        body: [
          "Crying has plenty of other explanations: hunger, a dirty nappy, wind, reflux or constipation. If you are not sure what is going on, that is a good reason to speak to your health visitor, call NHS 111 or see your GP rather than to assume.",
        ],
      },
      {
        heading: "What can help",
        body: [
          "Babies with colic do not usually need to see a doctor, and the things most likely to help are simple: hold and cuddle your baby while they are crying, sit or hold them upright during feeds so they swallow less air, wind them after feeds, rock them gently over your shoulder, in a Moses basket or crib, or in the pram, try a warm bath, and try gentle background sound such as the radio, which can distract some babies.",
          "Keep feeding as usual; if you are breastfeeding, you do not need to change your diet.",
        ],
      },
      {
        heading: "What the evidence does not support",
        body: [
          "This is the part that is easy to miss when you are exhausted and reading reviews at 9pm.",
          "Colic remedies sold in pharmacies and shops, including gripe water and anti-colic drops, herbal preparations and probiotic supplements, are not recommended, and there is no evidence that they help colic. Spinal manipulation and cranial osteopathy are also not advised: there is little evidence they work, and they may hurt your baby.",
          "If you want to try something, your health visitor is the better first stop.",
        ],
      },
      {
        heading: "When to get advice",
        body: [
          "Call NHS 111 or see a GP if you are worried about your baby's crying, your baby has colic and nothing seems to be working, you are finding it hard to cope, your baby is not growing or gaining weight as expected, or symptoms of colic are still there after four months of age.",
          "Go to A&E or call 999 if your baby has a weak or high-pitched cry, or their cry does not sound like their normal cry. Trust your instincts if you think something is seriously wrong, particularly alongside other worrying symptoms.",
        ],
      },
      {
        heading: "How this can feel for you",
        body: [
          "Prolonged crying is genuinely hard to sit with. Feeling frustrated, tearful or numb does not make you a bad parent; it makes you a tired one. If you need to, it is safe to put your baby down somewhere safe, such as their cot, and step away for a couple of minutes to breathe.",
          "Cry-sis runs a free helpline on 0800 448 0737, 9am to 10pm, seven days a week. Your health visitor, family and other parents are also worth leaning on.",
        ],
      },
    ],
    keyTakeaways: [
      "Crying often peaks in the afternoon and evening, rises around two weeks and eases by around three months.",
      "Colic describes frequent, hard-to-soothe crying in an otherwise healthy baby, usually settling by three to four months.",
      "The cause is not known.",
      "Holding, upright feeding, winding, gentle motion and a warm bath are the things most worth trying.",
      "Gripe water, anti-colic drops, herbal and probiotic remedies are not recommended, and cranial osteopathy and spinal manipulation should be avoided.",
      "Contact NHS 111 or a GP if you are worried or struggling; a weak, high-pitched or unusual cry needs urgent help.",
    ],
    relatedSlugs: [
      "newborn-sleep-expectations",
      "newborn-feeding-rhythms",
      "when-parenthood-feels-heavy",
    ],
    crossLinks: [
      {
        label: "Newborn sleep expectations",
        href: "/first-year/sleep/newborn-sleep-expectations",
      },
      {
        label: "Newborn feeding rhythms",
        href: "/first-year/feeding/newborn-feeding-rhythms",
      },
      {
        label: "When parenthood feels heavy",
        href: "/first-year/emotional-wellbeing/when-parenthood-feels-heavy",
      },
    ],
    sources: [
      {
        label: "Colic",
        publisher: "NHS",
        url: "https://www.nhs.uk/conditions/colic/",
      },
      {
        label: "Soothing a crying baby",
        publisher: "NHS",
        url: "https://www.nhs.uk/baby/caring-for-a-newborn/soothing-a-crying-baby/",
      },
    ],
  },
  {
    slug: "introducing-solid-foods",
    topic: "feeding",
    title: "Introducing solid foods",
    description:
      "When to start solids in the UK, the three readiness signs, how textures progress, allergenic foods, and staying safe while your baby learns to eat.",
    readTime: "8 min read",
    status: "ready",
    seoTitle: "Introducing solid foods | The Start of You",
    seoDescription:
      "A calm, practical guide to starting solids in the UK: readiness signs, textures, allergenic foods, and staying safe at mealtimes.",
    intro:
      "Starting solids is messier and slower than most people expect, and that is fine. The first few months of eating are really about getting used to tastes, textures and the whole business of moving food around a mouth. Milk is still doing the heavy lifting. This guide covers weaning in the UK sense of introducing complementary solid foods, not about stopping breastfeeding.",
    sections: [
      {
        heading: "When to start",
        body: [
          "Introducing a variety of foods alongside breast milk or first infant formula from around six months helps set your child up for healthier eating.",
          "There are good reasons to wait until around six months. Breast milk or first infant formula provides the energy and nutrients your baby needs until then, apart from vitamin D in some cases. Breastfeeding only, up to around six months, helps protect against illness and infection. Waiting also gives your baby time to develop enough to cope with solid foods and to feed themselves, and often means they move on to a range of textures more quickly.",
          "If your baby was born prematurely, ask your health visitor or GP when to start.",
        ],
      },
      {
        heading: "The three readiness signs",
        body: [
          "Look for these three together, from around six months. Your baby can stay sitting and hold their head steady, coordinate eyes, hands and mouth well enough to look at food, pick it up and put it in their mouth themselves, and swallow food rather than spitting it back out.",
        ],
      },
      {
        heading: "Signs that are easily misread",
        body: [
          "Chewing fists, waking more at night, and wanting extra milk feeds are all normal baby behaviours and are not signs of readiness for solids. Starting solids will not make your baby sleep through the night. Sometimes a little extra milk is all that is needed until they are ready.",
        ],
      },
      {
        heading: "How to begin",
        body: [
          "Start with a small amount of food before a usual milk feed. Do not worry about how much goes in. Most of your baby's energy and nutrients still come from milk.",
          "A few things that make it easier: allow plenty of time, especially at first; go at your baby's pace and let them show you when they are hungry or full; stop when they have had enough, a firmly closed mouth or a turned head says it clearly; if you are spoon feeding, wait for them to open their mouth; never force your baby to eat, try again another time; and keep offering variety, including foods they seem to reject, as it can take ten tries or more for a baby to get used to a new food.",
          "Some days they will eat plenty, some days almost nothing. That is normal.",
        ],
      },
      {
        heading: "Textures",
        body: [
          "Foods can start as purées, soft cooked pieces, cereals or baby rice mixed with milk, and progress towards mashed, lumpy food and finger foods. Some babies move quickly and may barely need smooth blended food at all.",
        ],
      },
      {
        heading: "Salt, sugar and foods to avoid",
        body: [
          "Do not add salt or sugar to your baby's food or cooking water, including stock cubes and gravy. Salt is not good for a baby's kidneys and sugar causes tooth decay. Some other foods need to be avoided in the first year; check the NHS list of foods to avoid giving babies.",
        ],
      },
      {
        heading: "Foods that can trigger allergies",
        body: [
          "From around six months, allergenic foods can be introduced one at a time, so you can spot any reaction. These include eggs, nuts and peanuts, cows' milk, gluten-containing foods, beans, lentils and peas, seeds, soya, shellfish, fish, celery, mustard and sulphur dioxide.",
          "Serve them safely: nuts and seeds finely ground or as butters, eggs without a red lion stamp never raw or lightly cooked, shellfish never raw or lightly cooked.",
          "Once a food has been introduced and tolerated, keep it in your baby's usual diet. Evidence shows that delaying peanut and hen's eggs beyond six to twelve months may increase the risk of developing an allergy to them.",
          "If your baby already has a diagnosed food allergy or eczema, or there is a family history of food allergies, eczema, asthma or hay fever, speak to your GP or health visitor before you start.",
        ],
      },
      {
        heading: "Spotting a reaction",
        body: [
          "Reactions usually happen within minutes, though symptoms can take up to two hours, and for some allergies such as cows' milk up to three days. Signs include swollen lips or face, red itchy watery eyes, wheezing and coughing, a red itchy rash, worsening eczema, being sick, tummy pain, diarrhoea or constipation.",
          "Most reactions are mild. Anaphylaxis is rare but is a medical emergency: it starts quickly and can cause breathing problems, a swollen throat or tongue, or a raised itchy rash. Call 999.",
          "Never cut out a major food such as milk on your own, as your child may miss out on nutrients they need. Talk to your health visitor or GP, who can refer you to a registered dietitian.",
        ],
      },
      {
        heading: "Staying safe while your baby learns to eat",
        body: [
          "Always stay with your baby while they are eating. Babies gag fairly often as they learn to manage food, and gagging is noisy and usually resolves itself; choking is quiet and needs immediate action. Make sure you know what to do: read the NHS guidance on what to do if your baby is choking, and consider a local baby first-aid course.",
        ],
      },
      {
        heading: "How this can feel for you",
        body: [
          "Mealtimes can feel like a lot: the mess, the waste, the worry about how little went in. It helps to remember what this stage is actually for. You are introducing tastes and skills, not hitting targets.",
        ],
      },
    ],
    keyTakeaways: [
      "Start solids at around six months, alongside breast milk or infant formula.",
      "Look for all three readiness signs together.",
      "Night waking and fist chewing are not readiness signs, and solids will not make a baby sleep through.",
      "Move from purées and soft pieces towards lumps and finger foods at your baby's pace.",
      "Introduce allergenic foods one at a time from around six months, in safe forms, and keep them in the diet.",
      "No added salt or sugar, and never leave your baby alone while eating.",
      "Ask a GP or health visitor first if there is existing allergy, eczema or a family history.",
    ],
    relatedSlugs: [
      "newborn-feeding-rhythms",
      "bottle-and-breastfeeding-questions",
      "safe-sleep-and-home-safety",
    ],
    crossLinks: [
      {
        label: "Newborn feeding rhythms",
        href: "/first-year/feeding/newborn-feeding-rhythms",
      },
      {
        label: "Bottle and breastfeeding questions",
        href: "/first-year/feeding/bottle-and-breastfeeding-questions",
      },
      {
        label: "Safe sleep and home safety",
        href: "/first-year/care-and-safety/safe-sleep-and-home-safety",
      },
    ],
    sources: [
      {
        label: "Your baby's first solid foods",
        publisher: "NHS",
        url: "https://www.nhs.uk/baby/weaning-and-feeding/babys-first-solid-foods/",
      },
      {
        label: "Food allergies in babies and young children",
        publisher: "NHS",
        url: "https://www.nhs.uk/baby/weaning-and-feeding/food-allergies-in-babies-and-young-children/",
      },
    ],
  },
  {
    slug: "newborn-quirks-and-reflexes",
    topic: "care-and-safety",
    title: "Normal newborn quirks and reflexes",
    description:
      "What to make of the noises, jerks, marks and movements of a brand new baby, and when something needs urgent attention.",
    readTime: "6 min read",
    status: "ready",
    seoTitle: "Normal newborn quirks and reflexes | The Start of You",
    seoDescription:
      "A calm guide to newborn reflexes, breathing, soft spots and other ordinary quirks, plus the signs that need urgent help.",
    intro:
      "New babies do a lot of surprising things. Most of them are ordinary, and knowing what they are makes the first weeks calmer.",
    sections: [
      {
        heading: "Startling and jerky movements",
        body: [
          "Babies are born with reflexes. A sudden noise or a feeling of falling can make your baby fling out their arms and then draw them back in. Newborns also turn towards a touch on the cheek and open their mouth looking for a feed, and they grip a finger placed in their palm surprisingly tightly. These reflexes fade over the first few months as your baby's movements become more deliberate.",
        ],
      },
      {
        heading: "Noisy breathing, snuffles and hiccups",
        body: [
          "Newborn breathing is irregular. It speeds up, slows down, and can pause briefly before settling back into a rhythm. Small snuffly noises are common because their nasal passages are narrow. Hiccups are frequent and do not usually bother the baby.",
          "Breathing that is fast and stays fast, grunting with every breath, the skin pulling in under the ribs, or a baby who goes pale, blue, grey or blotchy needs urgent help.",
        ],
      },
      {
        heading: "The soft spots",
        body: [
          "There is a diamond-shaped patch near the front of your baby's head where the skull bones have not yet joined, and a smaller one towards the back. These are the fontanelles, and it is usually a year or more before the bones close over. They are covered by a tough membrane, so ordinary washing and handling will not hurt them. A soft spot that is sunken, or one that is bulging when your baby is calm and upright, should be checked.",
        ],
      },
      {
        heading: "Their eyes",
        body: [
          "Newborns can see, but their focus is limited and their eyesight develops gradually over the first months. It is normal for a newborn's eyes to drift apart from each other occasionally, and this should settle by around four months. Mention it to your health visitor or GP if it does not.",
        ],
      },
      {
        heading: "Bumps, bruises and an odd-shaped head",
        body: [
          "Swelling and bruising on the head, and sometimes bloodshot eyes, are common after birth, especially after a forceps or ventouse delivery. This is caused by the squeezing of birth and settles on its own. Ask your midwife if you are worried.",
        ],
      },
      {
        heading: "The cord",
        body: [
          "The umbilical stump takes about a week to dry out and drop off. Keep it clean and dry and let it do its thing. Tell your midwife, health visitor or GP if you notice bleeding or discharge.",
        ],
      },
      {
        heading: "Sneezing, sicking up and odd noises in sleep",
        body: [
          "Babies sneeze to clear their noses, bring up small amounts of milk, and make grunts and squeaks in their sleep. Forceful vomiting after most feeds, or a baby who is not putting on weight, is worth raising with your health visitor.",
        ],
      },
      {
        heading: "Get urgent help if your baby",
        body: [
          "Call 111 or 999 if your baby is under three months and has a temperature of 38C or higher, is working hard to breathe, grunting, or pausing for long periods, looks pale, blue, grey or blotchy, is floppy, unusually difficult to wake, or will not respond to you, or has a rash that does not fade when you press a glass against it.",
          "If you are worried about your baby and cannot get through to anyone, call 111. If they are seriously unwell, call 999.",
        ],
      },
      {
        heading: "Trust the \"not like themselves\" feeling",
        body: [
          "You will learn your baby's normal faster than you expect. If something feels different and you cannot explain why, that is reason enough to ask. Nobody minds being asked about a newborn.",
        ],
      },
    ],
    keyTakeaways: [
      "Newborn reflexes, irregular breathing, snuffles and hiccups are usually ordinary and fade over the first months.",
      "The soft spots on your baby's head are protected by a tough membrane and can be washed and handled normally.",
      "Bruising or swelling on the head after birth usually settles on its own.",
      "Fast or laboured breathing, pale, blue, grey or blotchy skin, floppiness, or an unresponsive baby need urgent help.",
      "A rash that does not fade under a pressed glass needs urgent medical attention.",
      "Trust your own sense that something is different, and ask for advice without waiting.",
    ],
    relatedSlugs: [
      "baby-care-basics",
      "newborn-sleep-expectations",
      "newborn-skin-spots-and-marks",
      "common-illnesses-in-the-first-year",
    ],
    crossLinks: [
      {
        label: "Baby care basics",
        href: "/first-year/care-and-safety/baby-care-basics",
      },
      {
        label: "Newborn sleep expectations",
        href: "/first-year/sleep/newborn-sleep-expectations",
      },
    ],
    sources: [
      {
        label: "Getting to know your newborn",
        publisher: "NHS",
        url: "https://www.nhs.uk/pregnancy/labour-and-birth/getting-to-know-your-newborn/",
      },
      {
        label: "Rashes in babies and children",
        publisher: "NHS",
        url: "https://www.nhs.uk/conditions/rashes-babies-and-children/",
      },
      {
        label: "High temperature (fever) in children",
        publisher: "NHS",
        url: "https://www.nhs.uk/conditions/fever-in-children/",
      },
    ],
  },
  {
    slug: "newborn-skin-spots-and-marks",
    topic: "care-and-safety",
    title: "Newborn skin: spots, marks and dry patches",
    description:
      "What is behind common newborn spots, rashes, cradle cap and birthmarks, and how to tell routine skin changes from something that needs checking.",
    readTime: "6 min read",
    status: "ready",
    seoTitle: "Newborn skin: spots, marks and dry patches | The Start of You",
    seoDescription:
      "A calm guide to common newborn skin changes, cradle cap, birthmarks and nappy rash, and the signs of a rash that needs urgent attention.",
    intro:
      "Newborn skin changes constantly in the first weeks. Most of what appears needs nothing at all.",
    sections: [
      {
        heading: "Why newborn skin is so delicate",
        body: [
          "At birth the top layer of your baby's skin is very thin and easily damaged. Over the first month, or longer for premature babies, it matures and builds its own protective barrier. That is why plain water is best for bathing for at least the first month, without cleansers, lotions or medicated wipes. Vernix, the white sticky coating some babies are born with, is a natural moisturiser that also protects against infection, so leave it on the skin rather than wiping it off.",
          "Babies born after their due date often have dry, cracked-looking skin because the vernix was absorbed before birth. Peeling in the first weeks is common and usually needs nothing.",
        ],
      },
      {
        heading: "Spots and blotches in the first weeks",
        body: [
          "Spots and rashes are very common in newborns. Tiny white pinhead spots across the nose and cheeks, and blotchy red patches with a small pale centre that come and go across the body in the first days, are both familiar newborn patterns. They typically clear on their own. Heat and overwrapping can bring spots out, so a slightly cooler room and one fewer layer often helps.",
        ],
      },
      {
        heading: "Cradle cap",
        body: [
          "Cradle cap looks like patches of greasy white or yellow scales on the scalp and face that form a crust and flake off, and it can also affect the nappy area and skin creases. The skin under the scales may look pink or red on white skin, or lighter or darker than the surrounding skin on brown or black skin. It is harmless, it is not itchy or painful, it does not bother your baby, and it cannot be caught from other babies. It usually clears by itself within a few months. Do not pick at the crusts.",
        ],
      },
      {
        heading: "Birthmarks",
        body: [
          "The most common newborn birthmarks are small pink or red V-shaped marks on the forehead, eyelids or neck, sometimes called stork marks. Marks on the face tend to fade gradually, and marks on the neck can take longer. Raised dark red marks can appear in the first days or weeks, grow for a while and then fade slowly over a longer period. Show any birthmark to your midwife or health visitor so it can be noted.",
        ],
      },
      {
        heading: "Nappy rash and sore creases",
        body: [
          "Sore, red skin in the nappy area is usually caused by wetness rubbing against the skin. Frequent nappy changes, time without a nappy, plain water or fragrance-free wipes, and a thin layer of barrier cream at each change usually settle it. Ask a pharmacist if the rash is spreading, weeping, has spots around the edge, or is not improving after a few days, as it may need a different treatment.",
        ],
      },
      {
        heading: "When a rash is not routine",
        body: [
          "Get urgent medical help if your baby has a rash and is unwell, is breathing quickly or with difficulty, looks pale, blue, grey or blotchy, is unusually sleepy or hard to rouse, has swelling of the lips, mouth, throat or tongue, or has a rash that looks like bruising and does not fade when you press a clear glass firmly against it. A baby under three months with a temperature of 38C or higher needs urgent advice.",
          "Otherwise, if a rash is spreading, blistering, weeping, or your baby seems uncomfortable with it, speak to your health visitor or GP.",
        ],
      },
    ],
    keyTakeaways: [
      "Newborn skin is thin and delicate; plain water is best for bathing in the first month.",
      "Vernix protects the skin and is best left on rather than wiped off.",
      "Small white spots, blotchy patches and peeling skin are common and usually clear on their own.",
      "Cradle cap is harmless, does not bother the baby and usually clears within a few months.",
      "Most birthmarks fade over time; show them to your midwife or health visitor.",
      "A rash alongside being unwell, breathing difficulty, or one that does not fade under a pressed glass needs urgent medical help.",
    ],
    relatedSlugs: [
      "baby-care-basics",
      "newborn-quirks-and-reflexes",
      "common-illnesses-in-the-first-year",
    ],
    crossLinks: [
      {
        label: "Baby care basics",
        href: "/first-year/care-and-safety/baby-care-basics",
      },
    ],
    sources: [
      {
        label: "Getting to know your newborn",
        publisher: "NHS",
        url: "https://www.nhs.uk/pregnancy/labour-and-birth/getting-to-know-your-newborn/",
      },
      {
        label: "Cradle cap",
        publisher: "NHS",
        url: "https://www.nhs.uk/conditions/cradle-cap/",
      },
      {
        label: "Rashes in babies and children",
        publisher: "NHS",
        url: "https://www.nhs.uk/conditions/rashes-babies-and-children/",
      },
      {
        label: "High temperature (fever) in children",
        publisher: "NHS",
        url: "https://www.nhs.uk/conditions/fever-in-children/",
      },
    ],
  },
  {
    slug: "common-illnesses-in-the-first-year",
    topic: "care-and-safety",
    title: "Common illnesses in the first year",
    description:
      "What is normal when your baby is ill, what can help, and when to get medical advice or urgent help.",
    readTime: "7 min read",
    status: "ready",
    seoTitle: "Common illnesses in the first year | The Start of You",
    seoDescription:
      "A calm, practical guide to colds, high temperatures and tummy bugs in the first year, and the signs that mean you should get help.",
    intro:
      "Babies pick up a lot of infections in their first year, especially once they are around other children. Most are mild and pass in a few days. This page is about telling the ordinary from the urgent.",
    sections: [
      {
        heading: "Read this part first: get help straight away",
        body: [
          "Call 999 or go to A&E if your baby is having trouble breathing, is grunting with every breath, or the skin is sucking in under their ribs, looks pale, blue, grey or blotchy, is floppy, will not wake up properly, or does not respond to you, has a rash that does not fade when you press a clear glass firmly against it, has swelling of the lips, mouth, throat or tongue, or has a fit or seizure for the first time.",
          "Call 111 for urgent advice if your baby is under three months old and has a temperature of 38C or higher, is three to six months old and has a temperature of 39C or higher, has a high temperature lasting five days or more, has stopped feeding, is not keeping fluids down, or has far fewer wet nappies than usual, has other signs of illness alongside a temperature such as a rash, or simply is not themselves in a way that worries you.",
          "Trusting that last instinct is not overreacting. Health professionals would far rather check a baby who turns out to be fine.",
        ],
      },
      {
        heading: "Coughs and colds",
        body: [
          "Colds are the most common illness of the first year, and several in a winter is not unusual. Expect a snuffly nose, a cough, some disturbed sleep and a smaller appetite. Keep feeds going, offer them more often and in smaller amounts if your baby is struggling, and keep the room comfortably warm rather than hot. Cough and cold medicines are not suitable for babies; ask a pharmacist before giving anything.",
          "Watch the breathing rather than the noise. Noise alone is not the measure. Effort is.",
        ],
      },
      {
        heading: "A high temperature",
        body: [
          "A high temperature is 38C or more, and it is a natural response to infection. It usually returns to normal within one to four days. Keep offering fluids, keep breastfeeding as normal if you are, check on your baby regularly including at night, and look for signs of dehydration.",
          "Paracetamol or ibuprofen can be given if your baby is distressed or uncomfortable, but check the packaging or ask a pharmacist or GP if you are unsure. Paracetamol is not for babies under two months. Ibuprofen is not for babies under three months, under 5kg, dehydrated, or with chickenpox, and not for children with asthma unless a doctor has recommended it. Never give aspirin to a child under sixteen. Do not undress your baby or sponge them down to cool them, and do not alternate paracetamol and ibuprofen unless a health professional has told you to.",
        ],
      },
      {
        heading: "Tummy bugs: being sick and diarrhoea",
        body: [
          "Diarrhoea and vomiting are common and are usually a stomach bug. Vomiting usually stops within a day or two and diarrhoea within five to seven days. The most important thing is fluids. Carry on breast or bottle feeding, and if your baby is being sick, try smaller feeds more often. If your baby is on formula or solids, small sips of water between feeds can help. Do not make formula weaker than usual, do not give fruit juice or fizzy drinks, and do not give under-twelves medicine to stop diarrhoea.",
          "Call 111 if you are worried about a baby under twelve months, if they stop feeding while ill, if they show signs of dehydration such as fewer wet nappies, or if they cannot keep any fluid down.",
          "Stomach bugs spread easily. Wash hands often with soap and water, wash soiled clothing and bedding separately on a hot wash, and clean taps, handles and surfaces daily.",
        ],
      },
      {
        heading: "Looking after them at home",
        body: [
          "Most illnesses in the first year need rest, fluids and a calm adult. Keep them at home, keep the routine loose, and accept that sleep and feeding will be off for a few days and will come back.",
        ],
      },
      {
        heading: "Your baby's reviews",
        body: [
          "Your health visiting team offers reviews during the first year, and they are a good moment to raise anything that has been niggling at you, including repeated infections or a cough that keeps coming back. You do not have to wait for a review to make contact.",
        ],
      },
    ],
    keyTakeaways: [
      "Trouble breathing, pale, blue, grey or blotchy skin, floppiness, an unresponsive baby, a non-fading rash, or a first seizure need 999 or A&E.",
      "A temperature of 38C or higher under three months, or 39C or higher from three to six months, needs a call to 111.",
      "Colds are common; watch breathing effort rather than the amount of noise.",
      "Fluids matter most during a high temperature or tummy bug; do not dilute formula or give under-twelves anti-diarrhoea medicine.",
      "Paracetamol and ibuprofen have age and weight limits; check before giving either.",
      "Trust your instinct that something is not right, and use your health visiting reviews to raise ongoing concerns.",
    ],
    relatedSlugs: [
      "when-to-ask-for-help-after-birth",
      "newborn-quirks-and-reflexes",
      "newborn-skin-spots-and-marks",
    ],
    crossLinks: [
      {
        label: "Checkups and warning signs",
        href: "/first-year/checkups-and-warning-signs",
      },
      {
        label: "When to ask for help after birth",
        href: "/first-year/checkups-and-warning-signs/when-to-ask-for-help-after-birth",
      },
    ],
    sources: [
      {
        label: "High temperature (fever) in children",
        publisher: "NHS",
        url: "https://www.nhs.uk/conditions/fever-in-children/",
      },
      {
        label: "Diarrhoea and vomiting",
        publisher: "NHS",
        url: "https://www.nhs.uk/conditions/diarrhoea-and-vomiting/",
      },
      {
        label: "Rashes in babies and children",
        publisher: "NHS",
        url: "https://www.nhs.uk/conditions/rashes-babies-and-children/",
      },
    ],
  },
{
    slug: "stitches-tears-and-perineal-healing",
    topic: "postpartum-recovery",
    title: "Stitches, tears and perineal healing",
    description:
      "What healing can look like after a tear or an episiotomy, how to stay comfortable, and when to ask for help.",
    readTime: "7 min read",
    status: "ready",
    seoTitle: "Stitches, tears and perineal healing | The Start of You",
    seoDescription:
      "Calm UK guidance on healing after a perineal tear or episiotomy, comfort while peeing and pooing, and the signs that need a midwife or GP.",
    intro:
      "If you had stitches after your baby was born, the first days can feel strange and tender in a way nobody quite prepares you for. Sitting, standing, going to the loo, even shifting in bed can all feel like something to think about. This piece walks through what perineal healing usually looks like, what tends to help, and the signs that mean it is time to ask someone.",
    sections: [
      {
        heading: "How common tears and episiotomies are",
        body: [
          "Up to nine in ten women having their first vaginal birth have a tear, a graze or an episiotomy. It is one of the most ordinary parts of birth, even though it is rarely talked about beforehand.",
          "Tears vary. Some are small and heal quickly on their own. Others need stitching, and an episiotomy, a cut made to widen the opening during birth, is always repaired afterwards. Whatever happened for you, the healing follows a broadly similar shape.",
        ],
      },
      {
        heading: "What healing tends to look like",
        body: [
          "Stitches are made with dissolvable thread, so they do not usually need to be taken out. Most people find they heal within about a month, though the area can feel tight, itchy or oddly numb for a while before it feels like yours again.",
          "Soreness in the first week or two is expected. It often eases week by week rather than day by day, so it is worth measuring progress in fortnights, not mornings.",
        ],
      },
      {
        heading: "Keeping the area clean and comfortable",
        body: [
          "Bathe or shower the area with plain warm water once a day, then pat it dry gently. There is no need for salts, additives or special products, and it is better to keep things simple while the skin is healing.",
          "Change your pad regularly and wash your hands before and after. Letting the area have some time in fresh air, lying on a towel on your bed without underwear for a little while, can feel surprisingly good.",
        ],
      },
      {
        heading: "Peeing, pooing and the bits nobody mentions",
        body: [
          "Peeing can sting in the first days. Pouring warm water over the area while you go, or going while you are in the shower, often takes the edge off it.",
          "For pooing, hold a clean pad gently against your stitches while you go. It sounds odd; it genuinely helps. Wipe from front to back to keep things clean.",
          "Try to avoid getting constipated, since straining is uncomfortable and can make piles worse. Fibre in your food and plenty of fluids help, and your midwife, GP or pharmacist can suggest a gentle laxative if you need one. It is very unlikely that your stitches will break.",
        ],
      },
      {
        heading: "Managing pain",
        body: [
          "Paracetamol is usually the first thing to reach for and is safe while breastfeeding. Ibuprofen is generally considered safe too, but check with your midwife, GP or pharmacist first. Aspirin is not recommended while breastfeeding.",
          "A cold pack wrapped in a towel, held against the area for a short while, can ease soreness. Never put ice straight onto your skin.",
          "If you are still in pain after two or three weeks, that is worth mentioning to your midwife, health visitor or GP rather than waiting it out.",
        ],
      },
      {
        heading: "Pelvic floor exercises help here too",
        body: [
          "Gentle pelvic floor exercises support healing in this area by improving the blood flow around it, and they help with leaking later on. There is no rush and no need to push. Small, regular squeezes, when you remember, do more than an occasional determined effort.",
        ],
      },
      {
        heading: "Sex, later on",
        body: [
          "Pain during sex in the first months after a tear or an episiotomy is very common. There is no timetable you have to meet. If it hurts, stopping is the right response, and it is something to raise with your GP rather than something to endure.",
        ],
      },
      {
        heading: "When to ask for help",
        body: [
          "Contact your midwife, health visitor or GP if your stitches become more painful rather than less, there is discharge that smells unpleasant or any pus, the skin around the tear or cut looks red and swollen, you have real difficulty peeing, you are leaking poo or pooing without meaning to, you cannot hold in wind, constipation will not settle, or you notice raised or itchy scar tissue as things heal.",
          "The first three can mean an infection, which is treatable and much easier dealt with early. The bowel and bladder symptoms deserve a proper conversation, not quiet acceptance, and can be raised at your postnatal check or sooner.",
        ],
      },
    ],
    keyTakeaways: [
      "Tears, grazes and episiotomies are very common, and stitches usually dissolve and heal within about a month.",
      "Plain warm water and gentle drying are all the area needs.",
      "Warm water while you pee and a clean pad held against your stitches while you poo both take the edge off.",
      "Paracetamol is the usual first choice; check before taking ibuprofen while breastfeeding.",
      "Increasing pain, smelly discharge, redness or swelling can mean infection and need a professional the same day.",
      "Any leaking of wind, pee or poo, or pain during sex, is worth raising rather than living with.",
    ],
    relatedSlugs: [
      "healing-after-birth",
      "body-changes-after-birth",
      "when-to-ask-for-help-after-birth",
    ],
    crossLinks: [
      {
        label: "Postpartum recovery hub",
        href: "/first-year/postpartum-recovery",
        context: "Explore more on postpartum recovery",
      },
    ],
    sources: [
      {
        label: "Episiotomy and perineal tears",
        publisher: "NHS",
        url: "https://www.nhs.uk/pregnancy/labour-and-birth/episiotomy-and-perineal-tears/",
      },
      {
        label: "Your body after the birth",
        publisher: "NHS",
        url: "https://www.nhs.uk/pregnancy/labour-and-birth/your-body/",
      },
      {
        label: "Your 6-week postnatal check",
        publisher: "NHS",
        url: "https://www.nhs.uk/baby/support-and-services/your-6-week-postnatal-check/",
      },
    ],
  },
  {
    slug: "separated-tummy-muscles",
    topic: "body-and-hormones",
    title: "Separated tummy muscles after birth",
    description:
      "Why the muscles down the middle of your tummy separate in pregnancy, how they usually recover, and when to ask for a physio referral.",
    readTime: "6 min read",
    status: "ready",
    seoTitle: "Separated tummy muscles after birth | The Start of You",
    seoDescription:
      "Gentle UK guidance on diastasis recti after birth: why it happens, how it usually settles, what helps, and when to speak to your GP.",
    intro:
      "Somewhere in the first weeks, a lot of people notice their tummy feels soft in the middle, or that a ridge appears when they sit up from lying down. It is a common part of recovery, it has a name, and for most people it settles. This piece explains what is happening and what genuinely helps.",
    sections: [
      {
        heading: "What is actually happening",
        body: [
          "Two long muscles run down the middle of your tummy. During pregnancy the growing womb pushes them apart, and they become longer and weaker to make room. This is called diastasis recti, or divarication.",
          "It is common, and it usually amounts to a separation of around two finger widths, though the amount varies a lot from person to person. It is not a sign that anything went wrong.",
        ],
      },
      {
        heading: "How it usually recovers",
        body: [
          "For most people, the separation returns to normal by around the time their baby is eight weeks old. That happens quietly, without a programme or a plan, as the tissues shorten again.",
          "Because the recovery is gradual, the middle of your tummy can look and feel unfamiliar for a while. That is worth expecting rather than worrying about in the early weeks.",
        ],
      },
      {
        heading: "What helps",
        body: [
          "Regular pelvic floor and deep tummy muscle exercises support the recovery, and good posture through the day does more than people expect, particularly during long feeds when it is easy to sink and round forward.",
          "It is sensible to hold off on sit-ups, planks and high-impact exercise in the early weeks, and to avoid heavy lifting and straining on the toilet while things are still knitting back together. Gentle, frequent and unhurried beats determined and occasional.",
        ],
      },
      {
        heading: "When to speak to someone",
        body: [
          "If the gap is still obvious eight weeks after the birth, contact your GP. A separation that stays open can put strain on your back, and it is worth having looked at rather than waiting to see.",
          "Also speak to your GP if you have tummy pain or discomfort. In either case, your GP can refer you to a physiotherapist, who can give you exercises suited to your body rather than general advice. Physiotherapy is the proper route here, and asking for it is entirely reasonable.",
          "Your postnatal check is a natural moment to raise it if you would rather not book separately, though you do not have to wait for it.",
        ],
      },
      {
        heading: "A note on how this gets talked about",
        body: [
          "Abdominal separation gets pulled into a lot of conversation about getting your body back. Try to set that aside. This is about how your middle works, not how it looks, and the goal is a body that feels supported when you lift your baby, not a particular shape by a particular week.",
        ],
      },
    ],
    keyTakeaways: [
      "The tummy muscles commonly separate during pregnancy, often by about two finger widths.",
      "For most people the separation settles by around eight weeks after birth.",
      "Pelvic floor and deep tummy exercises, plus good posture, support the recovery.",
      "Sit-ups, planks, high-impact exercise, heavy lifting and straining are best left for later.",
      "If the gap is still obvious at eight weeks, or you have tummy pain, contact your GP, who can refer you to a physiotherapist.",
    ],
    relatedSlugs: [
      "body-changes-after-birth",
      "healing-after-birth",
      "postnatal-checks-and-appointments",
    ],
    crossLinks: [
      {
        label: "Body and hormones hub",
        href: "/first-year/body-and-hormones",
        context: "Explore more on body changes after birth",
      },
    ],
    sources: [
      {
        label: "Your post-pregnancy body",
        publisher: "NHS",
        url: "https://www.nhs.uk/baby/support-and-services/your-post-pregnancy-body/",
      },
      {
        label: "Your body after the birth",
        publisher: "NHS",
        url: "https://www.nhs.uk/pregnancy/labour-and-birth/your-body/",
      },
    ],
  },
  {
    slug: "sex-and-intimacy-after-birth",
    topic: "body-and-hormones",
    title: "Sex and intimacy after birth",
    description:
      "There is no set date for starting again, what comfort and closeness can look like, and why contraception matters earlier than most people expect.",
    readTime: "6 min read",
    status: "ready",
    seoTitle: "Sex and intimacy after birth | The Start of You",
    seoDescription:
      "Calm UK guidance on sex after birth, including comfort after a tear or caesarean, painful sex, and contraception from three weeks.",
    intro:
      "Sex after birth is one of those subjects that gets reduced to a single number, usually six weeks, and then left there. In practice there are no rules about when to start again, and the more useful questions are about comfort, closeness and contraception. This piece covers all three.",
    sections: [
      {
        heading: "There is no set date",
        body: [
          "There is no fixed point at which sex becomes allowed. Some people feel ready sooner than they expected; many take considerably longer. Tiredness and soreness both play their part, and so does simply having very little left at the end of the day.",
          "If you had a caesarean, sex sits alongside the other activities you pick back up when they feel comfortable, which for many people is not for around six weeks. If you had stitches, the same applies: readiness is a feeling, not a date on a calendar.",
        ],
      },
      {
        heading: "Comfort, and what can help",
        body: [
          "Hormonal changes after birth, particularly while breastfeeding, can leave the vagina drier than usual. A water-based lubricant from a pharmacy often makes a real difference. Avoid oil-based lubricants, which can irritate and can damage latex condoms and diaphragms.",
          "Going slowly, choosing a moment when you are not exhausted, and being able to stop without it being a problem all matter more than technique.",
        ],
      },
      {
        heading: "If it hurts",
        body: [
          "Pain during sex in the first few months is very common after a tear or an episiotomy. If it hurts, stop. That is not giving up on anything, it is the right response.",
          "Closeness does not have to mean penetration. Holding, lying together, and other kinds of intimacy are a legitimate part of finding your way back to each other, and for many couples they come first by some distance.",
          "If sex is still painful, tell your GP, or raise it at your postnatal check. It is a common thing to bring up and there is usually something that can help.",
        ],
      },
      {
        heading: "Contraception comes sooner than people expect",
        body: [
          "This is the part that catches people out. You can become pregnant again from three weeks after giving birth, including if you are breastfeeding and even if your periods have not come back. If you do not want to conceive again straight away, contraception needs to be in place within 21 days.",
          "Some methods can be started immediately after birth, including the implant, the injection, the progestogen-only pill and condoms. A coil can be fitted within 48 hours of birth, or otherwise from about four weeks.",
          "The combined pill, patch and vaginal ring are usually started from three weeks if you are not breastfeeding and do not have risk factors for blood clots, and usually from around six weeks if you are breastfeeding. A diaphragm or cap needs refitting after birth and is usually used from about six weeks.",
          "Breastfeeding itself only offers reliable protection under narrow conditions: exclusive breastfeeding, a baby under six months, and no periods yet. It is not something to rely on casually.",
          "Your midwife, health visitor, GP or a sexual health clinic can talk through which method suits you, and that conversation is part of routine postnatal care.",
        ],
      },
      {
        heading: "Your relationship, more broadly",
        body: [
          "The first months change the rhythm between partners as much as anything physical. Feeling touched out, feeling distant, or feeling like desire has simply gone quiet are all common. Talking about it, even briefly, tends to help more than waiting for it to resolve itself.",
        ],
      },
    ],
    keyTakeaways: [
      "There are no rules about when to have sex again after birth.",
      "Dryness is common; a water-based lubricant helps, and oil-based ones can damage condoms and diaphragms.",
      "Pain during sex is very common in the first months after a tear or episiotomy. Stop if it hurts, and tell your GP.",
      "Closeness without penetration counts.",
      "Pregnancy is possible from three weeks after birth, so contraception should be sorted within 21 days.",
      "Which method suits you depends on breastfeeding and your health, so ask your midwife, GP or a sexual health clinic.",
    ],
    relatedSlugs: [
      "healing-after-birth",
      "postnatal-checks-and-appointments",
      "feeling-like-yourself-again",
    ],
    crossLinks: [
      {
        label: "Body and hormones hub",
        href: "/first-year/body-and-hormones",
        context: "Explore more on body changes after birth",
      },
    ],
    sources: [
      {
        label: "Sex and contraception after birth",
        publisher: "NHS",
        url: "https://www.nhs.uk/baby/support-and-services/sex-and-contraception-after-birth/",
      },
      {
        label: "Episiotomy and perineal tears",
        publisher: "NHS",
        url: "https://www.nhs.uk/pregnancy/labour-and-birth/episiotomy-and-perineal-tears/",
      },
      {
        label: "Caesarean section: recovery",
        publisher: "NHS",
        url: "https://www.nhs.uk/tests-and-treatments/caesarean-section/recovery/",
      },
      {
        label: "Your 6-week postnatal check",
        publisher: "NHS",
        url: "https://www.nhs.uk/baby/support-and-services/your-6-week-postnatal-check/",
      },
    ],
  },
];

export function getFirstYearArticlesByTopic(topic: FirstYearArticleTopic) {
  return firstYearArticles.filter((article) => article.topic === topic);
}

// ─── Placeholder body injection for drafts ─────────────────────────────
// Draft article routes are gated at the page level, so placeholder body copy
// should never render. Ready articles supply their own content directly and
// bypass these defaults.
function withFirstYearDefaults(
  article: FirstYearArticle,
  all: FirstYearArticle[]
): FirstYearArticle {
  const sibling = all.find(
    (a) => a.topic === article.topic && a.slug !== article.slug
  );
  return {
    ...article,
    sections: article.sections ?? [],
    keyTakeaways: article.keyTakeaways ?? [],
    relatedSlugs:
      article.relatedSlugs ?? (sibling ? [sibling.slug] : undefined),
    lastUpdated:
      article.lastUpdated ?? (article.medicallyReviewed ? "July 2026" : undefined),
    reviewedBy:
      article.reviewedBy ??
      (article.medicallyReviewed ? "Jenny Joines" : undefined),
  };
}

export const firstYearArticles: FirstYearArticle[] = rawFirstYearArticles.map(
  (a) => withFirstYearDefaults(a, rawFirstYearArticles)
);
