// ============================================================
//  أدعية لمواقف الحياة اليومية — Supplications for everyday moments
// ============================================================

import type { Bilingual } from "@/lib/books";

export type Dua = {
  id: string;
  icon: string;
  when: Bilingual;
  arabic: string;
  meaning: Bilingual;
  source: Bilingual;
};

export const DUAS: Dua[] = [
  {
    id: "study",
    icon: "📚",
    when: { ar: "قبل المذاكرة وطلب العلم", en: "Before studying or seeking knowledge" },
    arabic: "رَبِّ زِدْنِي عِلْمًا",
    meaning: {
      ar: "ربِّ زدني علمًا نافعًا وفهمًا.",
      en: "My Lord, increase me in knowledge.",
    },
    source: { ar: "طه: ١١٤", en: "Ta-Ha 20:114" },
  },
  {
    id: "exam",
    icon: "📝",
    when: { ar: "عند صعوبة الأمر أو الاختبار", en: "When something feels hard, or before a test" },
    arabic: "اللَّهُمَّ لَا سَهْلَ إِلَّا مَا جَعَلْتَهُ سَهْلًا، وَأَنْتَ تَجْعَلُ الْحَزْنَ إِذَا شِئْتَ سَهْلًا",
    meaning: {
      ar: "لا يسير إلا ما يسّرته أنت يا الله، وأنت وحدك تجعل الصعب سهلًا.",
      en: "O Allah, nothing is easy except what You make easy, and You make hardship easy if You will.",
    },
    source: { ar: "رواه ابن حبّان", en: "Reported by Ibn Hibban" },
  },
  {
    id: "worry",
    icon: "😟",
    when: { ar: "عند الهمّ والحزن", en: "When worried or grieving" },
    arabic: "حَسْبُنَا اللَّهُ وَنِعْمَ الْوَكِيلُ",
    meaning: {
      ar: "كفانا الله ونعم الوكيل الذي نتوكّل عليه.",
      en: "Allah is sufficient for us, and He is the best Disposer of affairs.",
    },
    source: { ar: "آل عمران: ١٧٣", en: "Al 'Imran 3:173" },
  },
  {
    id: "distress",
    icon: "🌊",
    when: { ar: "عند الكرب الشديد", en: "In deep distress" },
    arabic: "لَا إِلَٰهَ إِلَّا أَنْتَ سُبْحَانَكَ إِنِّي كُنْتُ مِنَ الظَّالِمِينَ",
    meaning: {
      ar: "دعوة يونس عليه السلام في بطن الحوت، ما دعا بها مكروب إلا فرّج الله عنه.",
      en: "The supplication of Yunus from within the whale — no distressed person calls with it but Allah relieves them.",
    },
    source: { ar: "الأنبياء: ٨٧", en: "Al-Anbiya 21:87" },
  },
  {
    id: "parents",
    icon: "👨‍👩‍👧",
    when: { ar: "الدعاء للوالدين", en: "For your parents" },
    arabic: "رَبِّ ارْحَمْهُمَا كَمَا رَبَّيَانِي صَغِيرًا",
    meaning: {
      ar: "ربِّ ارحم والديّ كما ربّياني وأنا صغير.",
      en: "My Lord, have mercy upon them as they raised me when I was small.",
    },
    source: { ar: "الإسراء: ٢٤", en: "Al-Isra 17:24" },
  },
  {
    id: "travel",
    icon: "🧳",
    when: { ar: "عند السفر", en: "When travelling" },
    arabic: "سُبْحَانَ الَّذِي سَخَّرَ لَنَا هَٰذَا وَمَا كُنَّا لَهُ مُقْرِنِينَ وَإِنَّا إِلَىٰ رَبِّنَا لَمُنْقَلِبُونَ",
    meaning: {
      ar: "سبحان من ذلّل لنا هذه المركبة وما كنّا نقدر عليها، وإنّا إلى ربّنا راجعون.",
      en: "Glory to Him who has subjected this to us, for we could never have done it ourselves — and to our Lord we shall surely return.",
    },
    source: { ar: "الزخرف: ١٣-١٤", en: "Az-Zukhruf 43:13-14" },
  },
  {
    id: "morning",
    icon: "🌅",
    when: { ar: "عند الاستيقاظ", en: "On waking up" },
    arabic: "الْحَمْدُ لِلَّهِ الَّذِي أَحْيَانَا بَعْدَ مَا أَمَاتَنَا وَإِلَيْهِ النُّشُورُ",
    meaning: {
      ar: "الحمد لله الذي ردّ إلينا الحياة بعد النوم، وإليه البعث يوم القيامة.",
      en: "Praise be to Allah who gave us life after taking it, and to Him is the resurrection.",
    },
    source: { ar: "رواه البخاري", en: "Reported by al-Bukhari" },
  },
  {
    id: "sleep",
    icon: "🛏️",
    when: { ar: "قبل النوم", en: "Before sleeping" },
    arabic: "بِاسْمِكَ اللَّهُمَّ أَمُوتُ وَأَحْيَا",
    meaning: {
      ar: "باسمك يا الله أنام وأستيقظ، فأمري كلّه إليك.",
      en: "In Your name, O Allah, I die and I live.",
    },
    source: { ar: "رواه البخاري", en: "Reported by al-Bukhari" },
  },
  {
    id: "leaving-home",
    icon: "🚪",
    when: { ar: "عند الخروج من البيت", en: "When leaving home" },
    arabic: "بِسْمِ اللَّهِ تَوَكَّلْتُ عَلَى اللَّهِ، وَلَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ",
    meaning: {
      ar: "باسم الله خرجت، وعليه توكّلت، ولا حول ولا قوة إلا به.",
      en: "In the name of Allah, I place my trust in Allah; there is no might nor power except with Allah.",
    },
    source: { ar: "رواه أبو داود والترمذي", en: "Reported by Abu Dawud & at-Tirmidhi" },
  },
  {
    id: "forgiveness",
    icon: "🤍",
    when: { ar: "طلب المغفرة", en: "Seeking forgiveness" },
    arabic: "رَبَّنَا ظَلَمْنَا أَنْفُسَنَا وَإِنْ لَمْ تَغْفِرْ لَنَا وَتَرْحَمْنَا لَنَكُونَنَّ مِنَ الْخَاسِرِينَ",
    meaning: {
      ar: "دعاء آدم عليه السلام حين أخطأ، اعترافٌ بالذنب وطلبٌ للرحمة.",
      en: "The supplication of Adam after his slip — an admission of fault and a plea for mercy.",
    },
    source: { ar: "الأعراف: ٢٣", en: "Al-A'raf 7:23" },
  },
  {
    id: "guidance",
    icon: "🧭",
    when: { ar: "طلب الثبات والهداية", en: "Asking for steadfastness and guidance" },
    arabic: "يَا مُقَلِّبَ الْقُلُوبِ ثَبِّتْ قَلْبِي عَلَىٰ دِينِكَ",
    meaning: {
      ar: "يا من بيده القلوب يقلّبها كيف يشاء، ثبّت قلبي على دينك.",
      en: "O Turner of hearts, make my heart firm upon Your religion.",
    },
    source: { ar: "رواه الترمذي", en: "Reported by at-Tirmidhi" },
  },
  {
    id: "goodness",
    icon: "🌿",
    when: { ar: "دعاء جامع للدنيا والآخرة", en: "A comprehensive du'a for this life and the next" },
    arabic: "رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ",
    meaning: {
      ar: "أكثر ما كان النبي ﷺ يدعو به، يجمع خير الدنيا والآخرة والنجاة من النار.",
      en: "The supplication the Prophet ﷺ made most often — gathering the good of this world, the next, and safety from the Fire.",
    },
    source: { ar: "البقرة: ٢٠١", en: "Al-Baqarah 2:201" },
  },
];
