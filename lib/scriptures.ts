// ============================================================
//  الكتب السماوية الخمسة — الإيمان بالكتب ركن من أركان الإيمان
//  The five revealed scriptures — belief in them is a pillar of faith
// ============================================================

import type { Bilingual } from "@/lib/books";

export type Scripture = {
  id: string;
  icon: string;
  name: Bilingual;
  prophet: Bilingual;
  desc: Bilingual;
  ayah: Bilingual;
  ref: Bilingual;
};

export const SCRIPTURES: Scripture[] = [
  {
    id: "suhuf",
    icon: "📜",
    name: { ar: "الصُّحُف", en: "The Scrolls (Suhuf)" },
    prophet: { ar: "إبراهيم وموسى عليهما السلام", en: "Ibrahim & Musa (peace be upon them)" },
    desc: {
      ar: "صحائف أُنزلت على إبراهيم وموسى عليهما السلام، ذكرها الله في القرآن ولم يبقَ منها شيء بين أيدي الناس اليوم.",
      en: "Scrolls revealed to Ibrahim and Musa (peace be upon them). Allah mentions them in the Qur'an; none of their text remains with people today.",
    },
    ayah: {
      ar: "صُحُفِ إِبْرَاهِيمَ وَمُوسَىٰ",
      en: "The scriptures of Ibrahim and Musa.",
    },
    ref: { ar: "الأعلى: ١٩", en: "Al-A'la 87:19" },
  },
  {
    id: "tawrat",
    icon: "📕",
    name: { ar: "التَّوْراة", en: "The Tawrat (Torah)" },
    prophet: { ar: "موسى عليه السلام", en: "Musa (peace be upon him)" },
    desc: {
      ar: "أنزلها الله على موسى عليه السلام هدىً ونورًا لبني إسرائيل، وفيها الأحكام والمواعظ. نؤمن بأنها حقّ أُنزل من عند الله.",
      en: "Revealed to Musa (peace be upon him) as guidance and light for the Children of Israel, containing rulings and admonitions. We believe it was truly sent down by Allah.",
    },
    ayah: {
      ar: "إِنَّا أَنزَلْنَا التَّوْرَاةَ فِيهَا هُدًى وَنُورٌ",
      en: "Indeed, We sent down the Torah, in which was guidance and light.",
    },
    ref: { ar: "المائدة: ٤٤", en: "Al-Ma'idah 5:44" },
  },
  {
    id: "zabur",
    icon: "📗",
    name: { ar: "الزَّبُور", en: "The Zabur (Psalms)" },
    prophet: { ar: "داود عليه السلام", en: "Dawud (peace be upon him)" },
    desc: {
      ar: "أنزله الله على داود عليه السلام، وهو مواعظ وأذكار وتسبيح وثناء على الله، وكان داود عليه السلام يُرتّله بصوت حسن.",
      en: "Revealed to Dawud (peace be upon him) — admonitions, remembrance, glorification and praise of Allah, which he recited with a beautiful voice.",
    },
    ayah: {
      ar: "وَآتَيْنَا دَاوُودَ زَبُورًا",
      en: "And to Dawud We gave the Zabur.",
    },
    ref: { ar: "النساء: ١٦٣", en: "An-Nisa 4:163" },
  },
  {
    id: "injil",
    icon: "📘",
    name: { ar: "الإنجيل", en: "The Injil (Gospel)" },
    prophet: { ar: "عيسى عليه السلام", en: "Isa (peace be upon him)" },
    desc: {
      ar: "أنزله الله على عيسى عليه السلام مصدّقًا لما بين يديه من التوراة، وفيه هدى ونور وموعظة للمتّقين.",
      en: "Revealed to Isa (peace be upon him), confirming the Tawrat that came before it, containing guidance, light, and admonition for the God-conscious.",
    },
    ayah: {
      ar: "وَآتَيْنَاهُ الْإِنجِيلَ فِيهِ هُدًى وَنُورٌ",
      en: "And We gave him the Gospel, in which was guidance and light.",
    },
    ref: { ar: "المائدة: ٤٦", en: "Al-Ma'idah 5:46" },
  },
  {
    id: "quran",
    icon: "🕌",
    name: { ar: "القرآن الكريم", en: "The Noble Qur'an" },
    prophet: { ar: "محمد ﷺ", en: "Muhammad ﷺ" },
    desc: {
      ar: "خاتم الكتب السماوية، أنزله الله على نبيّنا محمد ﷺ مهيمنًا على ما قبله وناسخًا له، تكفّل الله بحفظه فلم يتغيّر منه حرف، وهو صالح لكل زمان ومكان.",
      en: "The final revealed Book, sent down upon our Prophet Muhammad ﷺ — confirming and superseding what came before. Allah Himself guaranteed its preservation, so not a letter of it has changed, and it remains for all times and places.",
    },
    ayah: {
      ar: "إِنَّا نَحْنُ نَزَّلْنَا الذِّكْرَ وَإِنَّا لَهُ لَحَافِظُونَ",
      en: "Indeed, it is We who sent down the Reminder, and indeed, We will be its guardian.",
    },
    ref: { ar: "الحجر: ٩", en: "Al-Hijr 15:9" },
  },
];
