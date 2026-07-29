// ============================================================
//  كتب إسلامية مشهورة مع نبذة عنها
//  Well-known Islamic books with a short description
// ============================================================

export type Bilingual = { ar: string; en: string };

export type Book = {
  id: string;
  icon: string;
  title: Bilingual;
  author: Bilingual;
  category: Bilingual;
  desc: Bilingual;
};

export const BOOKS: Book[] = [
  {
    id: "bukhari",
    icon: "📗",
    title: { ar: "صحيح البخاري", en: "Sahih al-Bukhari" },
    author: { ar: "الإمام محمد بن إسماعيل البخاري", en: "Imam Muhammad al-Bukhari" },
    category: { ar: "الحديث", en: "Hadith" },
    desc: {
      ar: "أصحّ كتاب بعد كتاب الله، جمع فيه البخاري الأحاديث الصحيحة عن النبي ﷺ بعد جهدٍ استمرّ سنوات، ورتّبها على الأبواب الفقهية.",
      en: "The most authentic book after the Qur'an. Al-Bukhari gathered rigorously verified hadiths of the Prophet ﷺ over many years, arranged by topic.",
    },
  },
  {
    id: "muslim",
    icon: "📘",
    title: { ar: "صحيح مسلم", en: "Sahih Muslim" },
    author: { ar: "الإمام مسلم بن الحجّاج النيسابوري", en: "Imam Muslim ibn al-Hajjaj" },
    category: { ar: "الحديث", en: "Hadith" },
    desc: {
      ar: "ثاني أصحّ كتب الحديث، تميّز بحُسن الترتيب وجمع طرق الحديث الواحد في موضع واحد، وهو عمدة أهل العلم.",
      en: "The second most authentic hadith collection, famous for its excellent arrangement and gathering the chains of each hadith in one place.",
    },
  },
  {
    id: "riyad",
    icon: "🌿",
    title: { ar: "رياض الصالحين", en: "Riyad as-Salihin" },
    author: { ar: "الإمام يحيى النووي", en: "Imam an-Nawawi" },
    category: { ar: "الحديث والآداب", en: "Hadith & Manners" },
    desc: {
      ar: "مجموعة أحاديث صحيحة في الأخلاق والآداب والرقائق، سهلة ومناسبة للمبتدئ والعامّة، من أكثر الكتب انتشارًا في البيوت.",
      en: "A widely loved collection of authentic hadiths on ethics, manners, and heart-softening reminders — accessible for everyone.",
    },
  },
  {
    id: "nawawi40",
    icon: "🔢",
    title: { ar: "الأربعون النووية", en: "The Forty Hadith of an-Nawawi" },
    author: { ar: "الإمام يحيى النووي", en: "Imam an-Nawawi" },
    category: { ar: "الحديث", en: "Hadith" },
    desc: {
      ar: "اثنان وأربعون حديثًا جامعة تُعدّ قواعد للإسلام، حفظها كثير من طلبة العلم لأهميتها واختصارها.",
      en: "Forty-two comprehensive hadiths that form pillars of the religion — short, memorized by students of knowledge for their importance.",
    },
  },
  {
    id: "ibnkathir",
    icon: "📖",
    title: { ar: "تفسير ابن كثير", en: "Tafsir Ibn Kathir" },
    author: { ar: "الحافظ إسماعيل بن كثير", en: "Al-Hafiz Ibn Kathir" },
    category: { ar: "التفسير", en: "Qur'an Tafsir" },
    desc: {
      ar: "من أشهر كتب تفسير القرآن بالمأثور، يفسّر الآية بالآية ثم بالحديث ثم بأقوال الصحابة، معتمدٌ عند أهل العلم.",
      en: "One of the most renowned tafsirs, explaining the Qur'an by the Qur'an, then hadith, then the sayings of the companions.",
    },
  },
  {
    id: "raheeq",
    icon: "🕋",
    title: { ar: "الرحيق المختوم", en: "The Sealed Nectar" },
    author: { ar: "صفيّ الرحمن المباركفوري", en: "Safi-ur-Rahman al-Mubarakpuri" },
    category: { ar: "السيرة النبوية", en: "Prophetic Biography" },
    desc: {
      ar: "كتاب في سيرة النبي ﷺ فاز بالمركز الأول في مسابقة عالمية، يعرض حياته الشريفة بأسلوب موثّق وجميل.",
      en: "An award-winning biography of the Prophet ﷺ, presenting his blessed life in a well-documented and beautiful style.",
    },
  },
  {
    id: "hisn",
    icon: "🤲",
    title: { ar: "حصن المسلم", en: "Fortress of the Muslim (Hisn al-Muslim)" },
    author: { ar: "سعيد بن علي القحطاني", en: "Sa'id ibn Ali al-Qahtani" },
    category: { ar: "الأذكار والأدعية", en: "Adhkar & Supplications" },
    desc: {
      ar: "مجموعة من الأذكار والأدعية الصحيحة لمختلف المناسبات اليومية، من أكثر الكتب اقتناءً لصغره وفائدته.",
      en: "A pocket collection of authentic supplications for daily occasions — one of the most widely owned booklets for its usefulness.",
    },
  },
  {
    id: "adhkar-nawawi",
    icon: "📿",
    title: { ar: "الأذكار", en: "Al-Adhkar" },
    author: { ar: "الإمام يحيى النووي", en: "Imam an-Nawawi" },
    category: { ar: "الأذكار والأدعية", en: "Adhkar & Supplications" },
    desc: {
      ar: "كتابٌ جامع لأذكار اليوم والليلة وأدعية المناسبات مع ذكر فضائلها، مرجعٌ أصيل في باب الذِّكر.",
      en: "A comprehensive reference on the remembrances of day and night and supplications for various occasions, with their virtues.",
    },
  },
  {
    id: "zad",
    icon: "🧭",
    title: { ar: "زاد المعاد", en: "Zad al-Ma'ad" },
    author: { ar: "الإمام ابن قيّم الجوزية", en: "Imam Ibn al-Qayyim" },
    category: { ar: "السيرة والفقه", en: "Biography & Fiqh" },
    desc: {
      ar: "يجمع بين سيرة النبي ﷺ وهديه في العبادات والمعاملات والطبّ، من أنفس كتب ابن القيّم.",
      en: "Combines the Prophet's ﷺ biography with his guidance in worship, dealings, and medicine — among Ibn al-Qayyim's finest works.",
    },
  },
  {
    id: "bulugh",
    icon: "⚖️",
    title: { ar: "بلوغ المرام", en: "Bulugh al-Maram" },
    author: { ar: "الحافظ ابن حجر العسقلاني", en: "Al-Hafiz Ibn Hajar al-Asqalani" },
    category: { ar: "أحاديث الأحكام", en: "Hadith of Rulings" },
    desc: {
      ar: "مجموعة أحاديث الأحكام الفقهية مرتّبة على أبواب الفقه، يعتمده الدارسون لمعرفة أدلّة الأحكام.",
      en: "A collection of hadiths related to legal rulings, arranged by fiqh chapters — a staple for students learning the evidences of rulings.",
    },
  },
];

export function tr(item: Bilingual, lang: "ar" | "en"): string {
  return item[lang] ?? item.ar;
}
