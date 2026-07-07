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
    topic: "feeding",
    title: "Newborn feeding rhythms",
    description:
      "What feeding often looks like in the early weeks, from cluster feeds to quiet stretches, and how to read your baby's cues.",
    readTime: "5 min read",
    status: "draft",
  },
  {
    slug: "bottle-and-breastfeeding-questions",
    topic: "feeding",
    title: "Bottle and breastfeeding questions",
    description:
      "Gentle answers to the everyday questions that come up whether you're breastfeeding, bottle-feeding or doing both.",
    readTime: "6 min read",
    status: "draft",
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

  // Development
  {
    slug: "baby-development-in-the-first-year",
    topic: "development",
    title: "Baby development in the first year",
    description:
      "A gentle map of what unfolds in the first year, without turning every week into a checklist.",
    readTime: "6 min read",
    status: "draft",
  },
  {
    slug: "when-milestones-feel-uneven",
    topic: "development",
    title: "When milestones feel uneven",
    description:
      "Why babies rarely develop in straight lines, and when a gentle chat with your health visitor can help.",
    readTime: "4 min read",
    status: "draft",
  },

  // Care and safety
  {
    slug: "baby-care-basics",
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
    title: "Feeling like yourself again",
    description:
      "Why identity shifts so much after birth, and the small returns to yourself that quietly gather over time.",
    readTime: "5 min read",
    status: "draft",
  },
  {
    slug: "when-parenthood-feels-heavy",
    topic: "emotional-wellbeing",
    title: "When parenthood feels heavy",
    description:
      "The difference between baby blues, low mood and something that deserves support, without alarm.",
    readTime: "6 min read",
    status: "draft",
  },

  // Body and hormones
  {
    slug: "body-changes-after-birth",
    topic: "body-and-hormones",
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
    title: "Postnatal checks and appointments",
    description:
      "What to expect from your six-week check, your baby's reviews and the appointments that quietly matter.",
    readTime: "5 min read",
    medicallyReviewed: true,
    status: "draft",
  },
  {
    slug: "when-to-ask-for-help-after-birth",
    topic: "checkups-and-warning-signs",
    title: "When to ask for help after birth",
    description:
      "Signs it's worth calling your GP, midwife or 111, and how to trust your instinct without second-guessing it.",
    readTime: "5 min read",
    medicallyReviewed: true,
    status: "draft",
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
