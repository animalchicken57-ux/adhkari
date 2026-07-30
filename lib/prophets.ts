// ============================================================
//  قصص الأنبياء — نبذة مختصرة عن كل نبي وأبرز دروسه
//  Stories of the prophets — a short note on each and its lesson
// ============================================================

import type { Bilingual } from "@/lib/books";

export type Prophet = {
  id: string;
  emoji: string;
  name: Bilingual;
  title: Bilingual;
  story: Bilingual;
  lesson: Bilingual;
};

export const PROPHETS: Prophet[] = [
  {
    id: "adam",
    emoji: "🌍",
    name: { ar: "آدم عليه السلام", en: "Adam (peace be upon him)" },
    title: { ar: "أبو البشر", en: "Father of Humanity" },
    story: {
      ar: "أوّل إنسان خلقه الله بيده ونفخ فيه من روحه، وأسجد له الملائكة، وأسكنه الجنة ثم أهبطه إلى الأرض ليكون خليفة فيها. لمّا أخطأ بادر بالتوبة فتاب الله عليه.",
      en: "The first human, whom Allah created by His own hand and gave life from His spirit. The angels prostrated to him, and he dwelt in Paradise before descending to earth as its steward. When he erred, he hastened to repent, and Allah accepted his repentance.",
    },
    lesson: {
      ar: "الخطأ وارد من كل إنسان، والعبرة في المبادرة إلى التوبة.",
      en: "Everyone slips; what counts is turning back quickly in repentance.",
    },
  },
  {
    id: "nuh",
    emoji: "🚢",
    name: { ar: "نوح عليه السلام", en: "Nuh (peace be upon him)" },
    title: { ar: "شيخ المرسلين", en: "The Elder of the Messengers" },
    story: {
      ar: "دعا قومه إلى التوحيد نحو ألف سنة إلا خمسين عامًا، ليلًا ونهارًا سرًّا وجهرًا، فلم يؤمن معه إلا قليل. فأمره الله ببناء السفينة ونجّاه ومن معه من الطوفان.",
      en: "He called his people to worship Allah alone for nearly a thousand years, night and day, in private and in public — yet only a few believed. Allah commanded him to build the ark, and saved him and those with him from the flood.",
    },
    lesson: {
      ar: "الصبر على الدعوة والثبات، ولو طال الزمن وقلّ المستجيبون.",
      en: "Patience and steadfastness in calling to good, however long it takes and however few respond.",
    },
  },
  {
    id: "ibrahim",
    emoji: "🕋",
    name: { ar: "إبراهيم عليه السلام", en: "Ibrahim (peace be upon him)" },
    title: { ar: "خليل الرحمن", en: "The Friend of the Most Merciful" },
    story: {
      ar: "حطّم أصنام قومه ودعاهم إلى عبادة الله وحده، فألقوه في النار فجعلها الله بردًا وسلامًا عليه. وبنى مع ابنه إسماعيل الكعبة المشرّفة.",
      en: "He shattered his people's idols and called them to worship Allah alone. They cast him into the fire, and Allah made it cool and safe for him. With his son Isma'il he raised the foundations of the Ka'bah.",
    },
    lesson: {
      ar: "الحقّ لا يُترك خوفًا من الناس، ومن توكّل على الله كفاه.",
      en: "Truth is not abandoned out of fear of people; whoever relies on Allah is sufficed by Him.",
    },
  },
  {
    id: "yusuf",
    emoji: "👑",
    name: { ar: "يوسف عليه السلام", en: "Yusuf (peace be upon him)" },
    title: { ar: "الصدّيق", en: "The Truthful" },
    story: {
      ar: "ألقاه إخوته في البئر حسدًا، فبِيع عبدًا، ثم سُجن ظلمًا بعد أن عفّ عن الحرام، ثم مكّنه الله في الأرض وصار على خزائن مصر، فعفا عن إخوته حين قدروا عليه.",
      en: "Thrown into a well by his envious brothers, sold into slavery, then imprisoned unjustly after refusing sin. Allah later established him over the treasuries of Egypt — and when his brothers stood before him, he forgave them.",
    },
    lesson: {
      ar: "العاقبة للصابرين، والعفو عند المقدرة من شِيَم الكرام.",
      en: "The outcome belongs to the patient, and forgiveness when you have the upper hand is the mark of noble character.",
    },
  },
  {
    id: "musa",
    emoji: "🌊",
    name: { ar: "موسى عليه السلام", en: "Musa (peace be upon him)" },
    title: { ar: "كليم الله", en: "The One Who Spoke with Allah" },
    story: {
      ar: "نشأ في قصر فرعون الذي كان يذبح أبناء بني إسرائيل، ثم بعثه الله إليه بالآيات، فأنجى الله به قومه وشقّ لهم البحر وأغرق فرعون وجنده.",
      en: "Raised in the palace of the very Pharaoh who was slaughtering the sons of the Children of Israel. Allah sent him back with clear signs, split the sea for his people, and drowned Pharaoh and his army.",
    },
    lesson: {
      ar: "لا يأس مع الله؛ فمع الضيق يجعل الله المخرج من حيث لا تحتسب.",
      en: "Never despair — Allah opens a way out from where you never expected.",
    },
  },
  {
    id: "ayyub",
    emoji: "🤲",
    name: { ar: "أيّوب عليه السلام", en: "Ayyub (peace be upon him)" },
    title: { ar: "مثال الصبر", en: "The Model of Patience" },
    story: {
      ar: "ابتُلي في جسده وماله وولده سنين طويلة فما شكا إلا إلى الله، ولم يزل ذاكرًا شاكرًا حتى كشف الله عنه وردّ إليه أهله ومثلهم معهم.",
      en: "Tested for long years in his body, wealth, and children, he complained to none but Allah, remaining in remembrance and gratitude — until Allah lifted the affliction and restored his family and the like of them with them.",
    },
    lesson: {
      ar: "الصبر الجميل لا شكوى فيه إلا إلى الله، والفرج قريب.",
      en: "Beautiful patience complains to Allah alone, and relief is never far.",
    },
  },
  {
    id: "yunus",
    emoji: "🐋",
    name: { ar: "يونس عليه السلام", en: "Yunus (peace be upon him)" },
    title: { ar: "ذو النون", en: "Companion of the Whale" },
    story: {
      ar: "غادر قومه مغاضبًا قبل أن يُؤذن له، فالتقمه الحوت، فنادى في الظلمات: «لا إله إلا أنت سبحانك إني كنت من الظالمين»، فاستجاب الله له ونجّاه.",
      en: "He left his people in anger before he was permitted to, and the whale swallowed him. From within the darkness he called out: “There is no god but You, glory be to You — I have indeed been among the wrongdoers.” Allah answered him and delivered him.",
    },
    lesson: {
      ar: "دعاء ذي النون مفتاح الفرج، وما دعا به مكروب إلا فرّج الله عنه.",
      en: "The supplication of Yunus is a key to relief — no distressed person calls with it but Allah eases their burden.",
    },
  },
  {
    id: "isa",
    emoji: "🌿",
    name: { ar: "عيسى عليه السلام", en: "Isa (peace be upon him)" },
    title: { ar: "روح الله وكلمته", en: "A Spirit and Word from Allah" },
    story: {
      ar: "وُلد بمعجزة من غير أب، وتكلّم في المهد صبيًّا، وأيّده الله بمعجزات كإبراء الأكمه والأبرص وإحياء الموتى بإذن الله، ورفعه الله إليه.",
      en: "Born miraculously without a father, he spoke in the cradle as an infant. Allah supported him with signs — healing the blind and the leper and reviving the dead by Allah's permission — and then raised him to Himself.",
    },
    lesson: {
      ar: "المعجزات كلها بإذن الله وحده، ولا يُعبد إلا هو.",
      en: "Every miracle happens only by Allah's permission, and He alone is worshipped.",
    },
  },
  {
    id: "muhammad",
    emoji: "🕌",
    name: { ar: "محمد ﷺ", en: "Muhammad ﷺ" },
    title: { ar: "خاتم النبيّين", en: "The Seal of the Prophets" },
    story: {
      ar: "خاتم الأنبياء، بُعث رحمةً للعالمين، صبر على أذى قومه وهاجر إلى المدينة، وبلّغ الرسالة وأدّى الأمانة حتى أتمّ الله به الدين، وعُرف بالصادق الأمين قبل البعثة.",
      en: "The final prophet, sent as a mercy to all creation. He bore his people's harm patiently, migrated to Madinah, and conveyed the message in full until Allah completed the religion through him. Even before prophethood he was known as the Truthful, the Trustworthy.",
    },
    lesson: {
      ar: "خير الهدي هديه ﷺ في الرحمة والصدق وحسن الخلق.",
      en: "The best example is his ﷺ — in mercy, truthfulness, and beautiful character.",
    },
  },
];
