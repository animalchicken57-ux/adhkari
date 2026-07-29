// ============================================================
//  معلومات طريفة عن الإسلام — Fun facts about Islam
// ============================================================

import type { Bilingual } from "@/lib/books";

export type FunFact = {
  id: string;
  emoji: string;
  text: Bilingual;
};

export const FUN_FACTS: FunFact[] = [
  {
    id: "basmala-count",
    emoji: "🔢",
    text: {
      ar: "كل سور القرآن تبدأ بالبسملة إلا سورة التوبة، وسورة النمل وحدها فيها بسملتان — واحدة في أوّلها وأخرى داخل رسالة سليمان عليه السلام.",
      en: "Every surah of the Qur'an opens with the Basmala except at-Tawbah — and an-Naml has two: one at its start and another inside Sulayman's letter.",
    },
  },
  {
    id: "middle-letter",
    emoji: "📖",
    text: {
      ar: "أطول سورة في القرآن هي البقرة (٢٨٦ آية)، وأقصرها سورة الكوثر (٣ آيات).",
      en: "The longest surah is al-Baqarah with 286 verses; the shortest is al-Kawthar with just 3.",
    },
  },
  {
    id: "maryam",
    emoji: "🌸",
    text: {
      ar: "مريم عليها السلام هي المرأة الوحيدة التي ذُكر اسمها صراحةً في القرآن، وسُمّيت باسمها سورة كاملة.",
      en: "Maryam (peace be upon her) is the only woman mentioned by name in the Qur'an — and an entire surah carries her name.",
    },
  },
  {
    id: "honey-bee",
    emoji: "🐝",
    text: {
      ar: "هناك سور في القرآن سُمّيت بأسماء حيوانات وحشرات: البقرة، النحل، النمل، العنكبوت، الفيل.",
      en: "Several surahs are named after animals and insects: the Cow, the Bee, the Ant, the Spider, and the Elephant.",
    },
  },
  {
    id: "qibla-change",
    emoji: "🧭",
    text: {
      ar: "كان المسلمون يصلّون نحو بيت المقدس نحو ستة عشر شهرًا قبل أن يأمر الله بتحويل القبلة إلى الكعبة.",
      en: "Muslims prayed toward Jerusalem for about sixteen months before Allah commanded the qibla be turned to the Ka'bah.",
    },
  },
  {
    id: "first-word",
    emoji: "🖋️",
    text: {
      ar: "أوّل كلمة نزلت من القرآن هي «اقْرَأْ» — فبدأ الوحي بالأمر بالقراءة والعلم.",
      en: "The very first word revealed of the Qur'an was “Read” — revelation began with a command to seek knowledge.",
    },
  },
  {
    id: "kaaba-cloth",
    emoji: "🕋",
    text: {
      ar: "كسوة الكعبة تُصنع من الحرير الطبيعي الأسود وتُطرّز بخيوط مذهّبة، وتُستبدل بكسوة جديدة كل عام.",
      en: "The Ka'bah's covering is woven from black silk embroidered with gold-plated thread, and is replaced with a new one every year.",
    },
  },
  {
    id: "salman",
    emoji: "🌍",
    text: {
      ar: "من صحابة النبي ﷺ من جاء من بلاد بعيدة: سلمان من فارس، وصهيب من الروم، وبلال من الحبشة.",
      en: "The Prophet's ﷺ companions came from far and wide: Salman from Persia, Suhayb from Rome, and Bilal from Abyssinia.",
    },
  },
  {
    id: "zero-hour",
    emoji: "🔭",
    text: {
      ar: "علماء المسلمين طوّروا علم الجبر والخوارزميات، وكلمة «Algorithm» مشتقة من اسم العالِم المسلم الخوارزمي.",
      en: "Muslim scholars developed algebra and algorithms — the word “algorithm” comes from the name of the scholar al-Khwarizmi.",
    },
  },
  {
    id: "smile-charity",
    emoji: "😊",
    text: {
      ar: "قال النبي ﷺ إنّ تبسّمك في وجه أخيك صدقة — فحتى الابتسامة لها أجر.",
      en: "The Prophet ﷺ said that smiling at your brother is charity — even a smile carries reward.",
    },
  },
  {
    id: "laylat-qadr",
    emoji: "✨",
    text: {
      ar: "ليلة القدر خير من ألف شهر، أي أفضل من أكثر من ثلاث وثمانين سنة من العبادة.",
      en: "Laylat al-Qadr is better than a thousand months — more than eighty-three years of worship in a single night.",
    },
  },
  {
    id: "fasting-worldwide",
    emoji: "🌙",
    text: {
      ar: "لأنّ التقويم الهجري قمري، فإنّ رمضان يتنقّل عبر فصول السنة ويعود إلى الفصل نفسه كل ثلاث وثلاثين سنة تقريبًا.",
      en: "Because the Hijri calendar is lunar, Ramadan drifts through the seasons and returns to the same one roughly every thirty-three years.",
    },
  },
  {
    id: "names-99",
    emoji: "📿",
    text: {
      ar: "لله أسماء حسنى كثيرة، اشتهر منها تسعة وتسعون اسمًا، من أحصاها دخل الجنة.",
      en: "Allah has many beautiful names; ninety-nine are the most well known, and whoever embraces them enters Paradise.",
    },
  },
  {
    id: "first-mosque",
    emoji: "🕌",
    text: {
      ar: "أوّل مسجد بُني في الإسلام هو مسجد قباء في المدينة، وقد شارك النبي ﷺ بنفسه في بنائه.",
      en: "The first mosque built in Islam was Masjid Quba in Madinah, and the Prophet ﷺ took part in building it himself.",
    },
  },
  {
    id: "water-wudu",
    emoji: "💧",
    text: {
      ar: "نهى النبي ﷺ عن الإسراف في ماء الوضوء حتى لو كان المسلم على نهر جارٍ — درسٌ مبكّر في ترشيد الماء.",
      en: "The Prophet ﷺ forbade wasting water in wudu even beside a flowing river — an early lesson in conservation.",
    },
  },
  {
    id: "hijrah-calendar",
    emoji: "📅",
    text: {
      ar: "التقويم الهجري لا يبدأ بمولد النبي ﷺ ولا بوفاته، بل بهجرته من مكة إلى المدينة.",
      en: "The Hijri calendar starts neither at the Prophet's ﷺ birth nor his passing, but at his migration from Makkah to Madinah.",
    },
  },
  {
    id: "quran-memorizers",
    emoji: "🧠",
    text: {
      ar: "ملايين المسلمين حول العالم يحفظون القرآن كاملًا عن ظهر قلب، وكثير منهم لا يتحدّث العربية لغةً أمّ.",
      en: "Millions of Muslims worldwide have memorized the entire Qur'an by heart — many of them not native Arabic speakers.",
    },
  },
  {
    id: "friday",
    emoji: "🌟",
    text: {
      ar: "يوم الجمعة أفضل أيام الأسبوع في الإسلام، وفيه ساعة لا يُرَدّ فيها دعاء العبد.",
      en: "Friday is the best day of the week in Islam, containing an hour in which supplication is not turned away.",
    },
  },
  {
    id: "coffee",
    emoji: "☕",
    text: {
      ar: "يُنسب انتشار شرب القهوة إلى الصوفية في اليمن الذين استعانوا بها للسهر في الذِّكر والعبادة.",
      en: "The spread of coffee drinking is traced to Sufis in Yemen, who used it to stay awake for remembrance and worship.",
    },
  },
  {
    id: "green-dome",
    emoji: "💚",
    text: {
      ar: "المسجد النبوي يتّسع لأكثر من مليون مصلٍّ في مواسم الذروة، وفيه مظلّات آلية تُفتح وتُغلق حسب الشمس.",
      en: "The Prophet's Mosque holds over a million worshippers at peak times, and has motorized umbrellas that open and close with the sun.",
    },
  },
];
